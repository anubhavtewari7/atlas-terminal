"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SUGGESTIONS = [
  'IATF-certified brake pads for passenger vehicles',
  'Neodymium magnets for EV motor assembly',
  'Semiconductor wafers for automotive ECU',
  'Food-grade soy for QSR supply chain',
  'Titanium sponge for aerospace structural parts',
  'Corrugated packaging boxes for e-commerce fulfillment',
  'Thermoplastic polyurethane (TPU) pellets for injection molding',
  'Copper cathodes for electrical wire manufacturing',
  'Generic pharmaceutical APIs (Paracetamol & Amoxicillin)',
  'Hydraulic pumps & valves for industrial machinery',
  'Cotton yarn & denim fabric for garment manufacturing',
  'Multilayer ceramic capacitors (MLCC) for circuit boards',
  'Double-sided glass fiber woven roving for construction',
  'Lithium hydroxide battery grade for cathode synthesis',
  'Polyurethane coating for automotive exterior trim'
]

const EXAMPLES = SUGGESTIONS.slice(0, 4)

export default function HeroSearch() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const matches = query.trim()
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : []

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/terminal?q=${encodeURIComponent(q)}`)
  }

  const handleSelectSuggestion = (s) => {
    setQuery(s)
    setIsFocused(false)
    router.push(`/terminal?q=${encodeURIComponent(s)}`)
  }

  return (
    <div style={{ marginTop: '2rem', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. IATF-certified brake pads for passenger vehicles"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '13px',
              fontFamily: 'inherit',
              outline: 'none',
              minWidth: 0,
              boxSizing: 'border-box'
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {/* Inline Auto-Complete Suggestions Dropdown */}
          {isFocused && matches.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '6px',
              background: '#0a0a0a',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              zIndex: 50,
              maxHeight: '220px',
              overflowY: 'auto'
            }}>
              {matches.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSuggestion(s)}
                  style={{
                    padding: '10px 14px',
                    fontSize: '12px',
                    color: '#e2e8f0',
                    cursor: 'pointer',
                    borderBottom: idx === matches.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56,189,248,0.15)'; e.currentTarget.style.color = '#38bdf8' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e2e8f0' }}
                >
                  🔍 {s}
                </div>
              ))}
            </div>
          )}
        </div>
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

