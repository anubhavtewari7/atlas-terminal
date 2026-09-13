// auth.js -- Auth.js v5 (next-auth@5) configuration.
// Requires the following Vercel environment variables:
//   AUTH_SECRET          -- generate with:  npx auth secret
//   AUTH_GOOGLE_ID       -- Google Cloud Console > OAuth 2.0 credentials
//   AUTH_GOOGLE_SECRET   -- same credential
//
// Add https://atlas-terminal-tau.vercel.app/api/auth/callback/google as an
// authorized redirect URI in the Google Cloud Console.

import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  // Pages override -- custom sign-in page
  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    // Allow any Google account -- narrow to a specific domain if needed:
    // authorized({ auth }) { return auth?.user?.email?.endsWith('@yourcompany.com') }
    authorized({ auth }) {
      return !!auth
    },
  },
})
