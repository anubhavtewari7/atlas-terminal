// middleware.js -- Auth guard for protected routes.
//
// The terminal is protected by Google OAuth only when AUTH_SECRET and
// AUTH_GOOGLE_ID are set in Vercel environment variables. When those vars are
// absent (local dev without credentials, or pre-auth production deploy), the
// middleware passes every request through unchanged so the terminal stays
// accessible.
//
// To enable auth:
//   1. Run:  npx auth secret  (copies AUTH_SECRET to .env.local)
//   2. Create OAuth 2.0 credentials at console.cloud.google.com
//   3. Add to Vercel env:  AUTH_SECRET  AUTH_GOOGLE_ID  AUTH_GOOGLE_SECRET
//   4. Add redirect URI:   https://atlas-terminal-tau.vercel.app/api/auth/callback/google

import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default async function middleware(request) {
  // Auth enforcement is opt-in -- only active when credentials are configured.
  // This means adding the env vars is the only deploy step needed to enable auth;
  // no code change is required.
  const authEnabled =
    !!process.env.AUTH_SECRET && !!process.env.AUTH_GOOGLE_ID

  if (!authEnabled) {
    return NextResponse.next()
  }

  // Delegate to Auth.js session check
  const session = await auth()
  if (!session) {
    const signIn = new URL('/auth/signin', request.url)
    signIn.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signIn)
  }

  return NextResponse.next()
}

export const config = {
  // Protect the terminal route. Exclude static assets and API routes.
  matcher: ['/terminal/:path*'],
}
