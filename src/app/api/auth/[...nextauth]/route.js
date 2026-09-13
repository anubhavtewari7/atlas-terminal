// /api/auth/[...nextauth]/route.js
// Auth.js v5 catch-all handler -- handles Google OAuth sign-in, callbacks,
// session tokens, and sign-out. No logic lives here; everything is in auth.js.
import { handlers } from '@/auth'

export const { GET, POST } = handlers
