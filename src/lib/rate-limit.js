// ── rate-limit.js ────────────────────────────────────────────────────────────
// In-process sliding-window rate limiter for Next.js API routes.
//
// State lives in module memory, so it resets on cold starts but works well
// for Vercel edge/serverless where each isolate handles one request at a time.
// For multi-replica deploys, replace the Map with Vercel KV or Upstash Redis.
//
// Usage:
//   import { rateLimit } from '@/lib/rate-limit'
//
//   export async function POST(req) {
//     const rl = rateLimit(req, { limit: 10, windowMs: 60_000 })
//     if (!rl.ok) return rl.response   // 429 already built
//     ...
//   }

import { NextResponse } from 'next/server'

// ip → array of timestamps (ms) within the current window
const store = new Map()

/**
 * @param {Request}  req
 * @param {object}   opts
 * @param {number}   opts.limit      -- max requests per window (default 30)
 * @param {number}   opts.windowMs   -- sliding window in ms (default 60_000)
 * @returns {{ ok: boolean, response?: NextResponse }}
 */
export function rateLimit(req, { limit = 30, windowMs = 60_000 } = {}) {
  // Best-effort IP extraction; falls back to a generic key when headers are absent.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'anonymous'

  const now  = Date.now()
  const hits = (store.get(ip) || []).filter(t => now - t < windowMs)
  hits.push(now)
  store.set(ip, hits)

  // Evict stale keys every ~1000 requests to prevent unbounded memory growth.
  if (store.size > 1000) {
    for (const [key, times] of store) {
      if (times.every(t => now - t >= windowMs)) store.delete(key)
    }
  }

  if (hits.length > limit) {
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

  return {
    ok: true,
    response: null,
  }
}
