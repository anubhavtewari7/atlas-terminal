// auth.js -- Auth.js v5 (next-auth@5) stub.
//
// Google OAuth is not yet active. To enable it:
//   1. Find a version of next-auth compatible with your Next.js version:
//        npm info next-auth versions --json | tail
//   2. Add to package.json dependencies: "next-auth": "<compatible version>"
//   3. Run npm install locally and commit the updated package-lock.json
//   4. Uncomment the implementation below and remove the stub exports
//   5. Add to Vercel env: AUTH_SECRET  AUTH_GOOGLE_ID  AUTH_GOOGLE_SECRET
//   6. Add redirect URI: https://nautilus-terminal.vercel.app/api/auth/callback/google
//
// ---- Implementation (uncomment when next-auth is installed) ----
// import NextAuth from 'next-auth'
// import Google from 'next-auth/providers/google'
//
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google],
//   pages: { signIn: '/auth/signin' },
//   callbacks: {
//     authorized({ auth: session }) {
//       const authEnabled = !!process.env.AUTH_SECRET && !!process.env.AUTH_GOOGLE_ID
//       if (!authEnabled) return true
//       return !!session
//     },
//   },
// })
// ----------------------------------------------------------------

// Stub exports -- keep the module importable without next-auth installed.
export const handlers = { GET: null, POST: null }
export const signIn  = async () => {}
export const signOut = async () => {}
export const auth    = async () => null
