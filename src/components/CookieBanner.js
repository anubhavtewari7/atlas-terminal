'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie_consent')) setVisible(true)
    } catch { setVisible(true) }
  }, [])

  const accept = () => {
    try { localStorage.setItem('cookie_consent', 'accepted') } catch {}
    setVisible(false)
  }
  const decline = () => {
    try { localStorage.setItem('cookie_consent', 'declined') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
      <p className="text-slate-300 text-sm flex-1">
        We use essential functional cookies only &mdash; no tracking or advertising.{' '}
        <a href="/legal/cookies" className="text-cyan-400 underline">
          Cookie Policy
        </a>
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={decline}
          className="px-3 py-1.5 text-sm text-slate-400 border border-slate-600 rounded hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Decline non-essential cookies"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="px-3 py-1.5 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Accept cookies"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
