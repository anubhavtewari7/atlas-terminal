// /api/auth/[...nextauth]/route.js
//
// Auth.js v5 catch-all handler -- disabled until next-auth is installed.
// See auth.js at the project root for setup instructions.

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { error: 'Auth not configured. See auth.js for setup instructions.' },
    { status: 503 }
  )
}

export async function POST() {
  return NextResponse.json(
    { error: 'Auth not configured. See auth.js for setup instructions.' },
    { status: 503 }
  )
}
