"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const EXAMPLES = [
  'IATF-certified brake pads for passenger vehicles',
  'Neodymium magnets for EV motor assembly',
  'Semiconductor wafers for automotive ECU',
  'Food-grade soy for QSR supply chain',
]

export default function HeroSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/terminal?q=${encodeURIComponent(q)}`)
  }

  return (
    <div style={{ marginTop: '2rem', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. IATF-certified brake pads for passenger vehicles"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#fff',
            fontSize: '13px',
            fontFamily: 'inherit',
            outline: 'none',
            minWidth: 0,
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(0,229,160,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
        />
        <button type="submit" style={{
          background: '#00e5a0',
          color: '#000',
          border: 'none',
          borderRadius: '10px',
          padding: '12px 20px',
          fontWeight: 700,
          fontSize: '13px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          letterSpacing: '0.05em',
        }}>
          Scan →
        </button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
        {EXAMPLES.map((ex) => (
          <button key={ex} onClick={() => router.push(`/terminal?q=${encodeURIComponent(ex)}`)}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
              padding: '4px 12px',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'rgba(0,229,160,0.4)'; e.target.style.color = '#00e5a0' }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = 'rgba(255,255,255,0.45)' }}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
