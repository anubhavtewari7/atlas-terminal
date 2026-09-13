"use client"

// Sign-in page -- disabled until Google OAuth is configured.
// See auth.js at the project root for setup instructions.
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import NautilusLogo from '@/components/NautilusLogo'

export default function SignInPage() {
  const router = useRouter()

  // Auth is not yet configured -- redirect to terminal (open access).
  useEffect(() => {
    router.replace('/terminal')
  }, [router])

  return (
    <main className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <NautilusLogo size={28} className="text-sky-400" />
          <div>
            <span className="text-[10px] font-bold tracking-[0.35em] text-sky-400 uppercase block">
              NAUTILUS
            </span>
            <span className="text-[8px] text-slate-600 uppercase tracking-[0.2em]">
              Terminal
            </span>
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-slate-500 text-xs">Redirecting to terminal...</p>
        </div>
        <p className="text-center text-[10px] text-slate-700 mt-6">
          <a href="/legal/terms" className="underline hover:text-slate-500">Terms</a>
          {' '}·{' '}
          <a href="/legal/disclaimer" className="underline hover:text-slate-500">Disclaimer</a>
        </p>
      </div>
    </main>
  )
}
