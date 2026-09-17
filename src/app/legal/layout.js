import Link from 'next/link'
import NautilusLogo from '@/components/NautilusLogo'

export const metadata = {
  metadataBase: new URL('https://nautilus-terminal.vercel.app'),
}

export default function LegalLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#030303] text-slate-300">
      {/* Top nav */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <NautilusLogo size={20} className="text-sky-400" />
            <div className="leading-none">
              <span className="text-[9px] font-bold tracking-[0.35em] text-sky-400 uppercase block">
                NAUTILUS
              </span>
              <span className="text-[7px] text-slate-600 uppercase tracking-[0.2em]">
                Terminal
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-[11px] text-slate-500 flex-wrap justify-end">
            <Link href="/legal/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/legal/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/legal/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
            <Link href="/legal/refund" className="hover:text-slate-300 transition-colors">Refund</Link>
            <Link href="/legal/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
            <Link href="/legal/data-sources" className="hover:text-slate-300 transition-colors">Data Sources</Link>
            <Link href="/legal/data-deletion" className="hover:text-slate-300 transition-colors">Data Deletion</Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6 mt-16">
        <div className="max-w-3xl mx-auto text-center text-[10px] text-slate-700">
          &copy; {new Date().getFullYear()} Nautilus Terminal. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
