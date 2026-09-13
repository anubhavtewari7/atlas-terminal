// /api/missions/route.js -- server-backed mission history per authenticated user.
//
// Storage strategy (upgrade path):
//   1. NOW  -- In-memory Map (resets on cold start / serverless restart).
//              Missions also persist in localStorage via useMissionHistory, so
//              users experience no data loss between sessions.
//   2. NEXT -- Drop in Vercel KV:
//              import { kv } from '@vercel/kv'
//              Replace get/set/del calls below with kv.get / kv.set / kv.del.
//              No other code change needed.
//   3. AUTH -- When auth is active, missions are scoped per user (email).
//              Without auth, a shared anonymous bucket is used.
//
// Endpoints:
//   GET  /api/missions          -- list missions for current user
//   POST /api/missions          -- append a mission
//   DELETE /api/missions?id=N   -- remove mission by timestamp id

import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { MAX_MISSION_HISTORY } from '@/lib/terminal-constants'

// In-memory fallback store. Keyed by user id (email or 'anon').
// Swap for kv.get/kv.set/kv.del when Vercel KV is provisioned.
const memStore = new Map()

function storeGet(userId) {
  return memStore.get(userId) || []
}
function storeSet(userId, missions) {
  memStore.set(userId, missions)
}

async function getUserId(request) {
  // When Auth.js is active we can pull the session here.
  // For now return 'anon' so the route works without auth.
  try {
    const { auth } = await import('@/auth')
    const session = await auth()
    return session?.user?.email || 'anon'
  } catch {
    return 'anon'
  }
}

export async function GET(request) {
  const rl = rateLimit(request, { limit: 30, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  const userId = await getUserId(request)
  const missions = storeGet(userId)
  return NextResponse.json({ missions })
}

export async function POST(request) {
  const rl = rateLimit(request, { limit: 10, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { query, primaryHub, hubCount, topPartner, directive } = body ?? {}
  if (typeof query !== 'string' || !query.trim() || query.length > 500) {
    return NextResponse.json({ error: 'query must be a non-empty string (max 500 chars)' }, { status: 400 })
  }

  const mission = {
    id:          Date.now(),
    query:       query.trim(),
    timestamp:   Date.now(),
    primaryHub:  typeof primaryHub === 'string'  ? primaryHub  : null,
    hubCount:    typeof hubCount   === 'number'   ? hubCount    : 0,
    topPartner:  typeof topPartner === 'string'   ? topPartner  : null,
    directive:   directive ?? null,
  }

  const userId   = await getUserId(request)
  const existing = storeGet(userId)
  const updated  = [...existing, mission].slice(-MAX_MISSION_HISTORY)
  storeSet(userId, updated)

  return NextResponse.json({ mission }, { status: 201 })
}

export async function DELETE(request) {
  const rl = rateLimit(request, { limit: 20, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  if (!id || !Number.isFinite(id)) {
    return NextResponse.json({ error: 'id query param required (numeric timestamp)' }, { status: 400 })
  }

  const userId  = await getUserId(request)
  const updated = storeGet(userId).filter(m => m.id !== id)
  storeSet(userId, updated)

  return NextResponse.json({ ok: true })
}
