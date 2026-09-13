// middleware.js -- Auth guard for /terminal routes.
//
// Uses Auth.js v5 edge-compatible middleware. The authorized callback in auth.js
// controls whether a session is required: when AUTH_SECRET and AUTH_GOOGLE_ID
// are absent from Vercel env vars, all requests pass through (open access).
// Add both env vars to Vercel to activate Google OAuth enforcement.
//
// To enable auth:
//   1. Run:  npx auth secret  (copies AUTH_SECRET to .env.local)
//   2. Create OAuth 2.0 credentials at console.cloud.google.com
//   3. Add to Vercel env:  AUTH_SECRET  AUTH_GOOGLE_ID  AUTH_GOOGLE_SECRET
//   4. Add redirect URI:   https://nautilus-terminal.vercel.app/api/auth/callback/google

export { auth as default } from '@/auth'

export const config = {
  matcher: ['/terminal/:path*'],
}
