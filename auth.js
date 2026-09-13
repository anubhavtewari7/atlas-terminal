// auth.js -- Auth.js v5 (next-auth@5) configuration.
// Requires the following Vercel environment variables:
//   AUTH_SECRET          -- generate with:  npx auth secret
//   AUTH_GOOGLE_ID       -- Google Cloud Console > OAuth 2.0 credentials
//   AUTH_GOOGLE_SECRET   -- same credential
//
// Add https://nautilus-terminal.vercel.app/api/auth/callback/google as an
// authorized redirect URI in the Google Cloud Console.
//
// Auth enforcement is opt-in: the authorized callback returns true (open access)
// unless AUTH_SECRET and AUTH_GOOGLE_ID are both present in the environment.
// Adding those env vars to Vercel is the only step needed to enable auth --
// no code change required.

import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    authorized({ auth: session }) {
      // Only enforce authentication when credentials are configured.
      // When AUTH_SECRET or AUTH_GOOGLE_ID are absent, the terminal stays open.
      const authEnabled =
        !!process.env.AUTH_SECRET && !!process.env.AUTH_GOOGLE_ID
      if (!authEnabled) return true
      return !!session
    },
  },
})
