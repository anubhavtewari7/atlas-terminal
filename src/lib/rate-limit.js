// ── rate-limit.js ────────────────────────────────────────────────────────────
// Sliding-window rate limiter for Next.js API routes.
//
// Strategy (in priority order):
//   1. Vercel KV (Redis-backed) -- works across all instances in prod.
//      Requires KV_REST_API_URL + KV_REST_API_TOKEN env vars (set in
//      Vercel dashboard: Storage -> Create Database -> KV).
//   2. In-process Map -- single-instance fallback for local dev and
//      environments without KV configured.

import { NextResponse } from 'next/server'

// ── In-process fallback ──────────────────────────────────────────────────────
const store = new Map()

function inProcessLimit(ip, limit, windowMs) {
  const now  = Date.now()
  const hits = (store.get(ip) || []).filter(t => now - t < windowMs)
  hits.push(now)
  store.set(ip, hits)
  if (store.size > 1000) {
    for (const [key, times] of store) {
      if (times.every(t => now - t >= windowMs)) store.delete(key)
    }
  }
  return hits.length
}

// ── Vercel KV helpers ────────────────────────────────────────────────────────
// Lazy-load @vercel/kv so the module doesn't throw when KV env vars are absent.
let _kv = null
async function getKV() {
  if (_kv) return _kv
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  try {
    const mod = await import('@vercel/kv')
    _kv = mod.kv
    return _kv
  } catch { return null }
}

async function kvLimit(ip, limit, windowMs) {
  const kv = await getKV()
  if (!kv) return null          // KV not available, caller falls back to in-process

  const key = `rl:${ip}`
  const windowSec = Math.ceil(windowMs / 1000)

  try {
    // INCR is atomic across instances; set TTL on first write
    const count = await kv.incr(key)
    if (count === 1) await kv.expire(key, windowSec)
    return count
  } catch {
    return null                 // KV error -> caller falls back to in-process
  }
}

// ── Public API ───────────────────────────────────────────────────────────────
/**
 * @param {Request}  req
 * @param {object}   opts
 * @param {number}   opts.limit      -- max requests per window (default 30)
 * @param {number}   opts.windowMs   -- sliding window in ms (default 60_000)
 * @returns {Promise<{ ok: boolean, response?: NextResponse }>}
 */
export async function rateLimit(req, { limit = 30, windowMs = 60_000 } = {}) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'anonymous'

  // Try distributed KV first; fall back to in-process
  let count = await kvLimit(ip, limit, windowMs)
  if (count === null) count = inProcessLimit(ip, limit, windowMs)

  if (count > limit) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Too many requests. Please wait and try again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(windowMs / 1000)),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      ),
    }
  }

  return { ok: true, response: null }
}
