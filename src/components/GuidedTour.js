"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, X, Map } from 'lucide-react'

const STEPS = [
  {
    id: 'welcome',
    target: null,
    position: 'center',
    emoji: '🌍',
    title: 'Welcome to Atlas Terminal',
    content: 'Your AI-powered supply chain intelligence platform. Type any material or component and Atlas maps the best global sourcing hubs in 10 seconds — with duty rates, freight costs, ESG scores, risk flags, and live market data.',
  },
  {
    id: 'mission',
    target: 'mission',
    position: 'right',
    emoji: '🎯',
    title: 'Active Mission',
    content: 'Click here to define your sourcing mission. Be specific — include the material, application, and any constraints. e.g. "IATF-certified brake pads for passenger vehicles" or "neodymium magnets for EV motor assembly". The more context, the sharper the intelligence.',
  },
  {
    id: 'globe',
    target: 'globe',
    position: 'right',
    emoji: '🌐',
    title: 'Live 3D Supply Chain Globe',
    content: 'Red markers = active supply chain risks tied to physical locations. Green markers = verified sourcing opportunities. Click any marker to load full hub intelligence into the Advisory HUD below. Drag to rotate, scroll to zoom, or use the pause button to freeze rotation.',
  },
  {
    id: 'ports',
    target: 'ports',
    position: 'right',
    emoji: '⚓',
    title: 'Logistics Throughput',
    content: 'Real-time port congestion organised by seaboard — West Coast US, East Coast US, Asia Pacific, and West Mexico. Status indicators: Stable (green) = clear sailing, Moderate (amber) = add 1-2 day buffer, Watch (orange) = expect disruption. Click "View all" for the full 26-port global monitor.',
  },
  {
    id: 'risks',
    target: 'risks',
    position: 'right',
    emoji: '🛡️',
    title: 'Global Threat Radar',
    content: 'Risk factors surfaced specifically for your active mission — Section 301 tariffs, geopolitical disruptions, compliance gaps, forced labour exposure, commodity price volatility. HIGH = act now, MEDIUM = monitor closely. Click any risk to load full exposure detail and mitigation strategies into the HUD.',
  },
  {
    id: 'hubs',
    target: 'hubs',
    position: 'right',
    emoji: '🏭',
    title: 'Sourcing Hubs',
    content: 'Ranked list of the best global sourcing hubs for your material. Click any hub to load full intelligence: duty rates by HTS code, freight cost estimates, ESG scores and sustainability notes, target suppliers filtered by annual turnover ($10M → >$1B), and compliance flags. Use example queries to see this come alive.',
  },
  {
    id: 'market',
    target: 'market',
    position: 'left',
    emoji: '📈',
    title: 'Price Trend Index',
    content: 'Indicative quarterly pricing trend for your mission\'s commodity category. Helps you time procurement decisions — spot seasonal dips before committing to long-term supply agreements or locking in volumes. Hover each bar for the exact index value.',
  },
  {
    id: 'fx',
    target: 'fx',
    position: 'left',
    emoji: '💱',
    title: 'Live FX Rates',
    content: 'Live currency exchange rates with sourcing impact notes — refreshed every 5 minutes. CNY weakness = Chinese suppliers cost less in USD. EUR strength = European partners cost more. Always know your FX exposure before signing a supply agreement. Click ⟳ to refresh now.',
  },
  {
    id: 'directive',
    target: 'directive',
    position: 'top',
    emoji: '⚡',
    title: 'Strategic Advisory HUD',
    content: 'The intelligence centre. Click any globe marker or sidebar item to populate this panel with: AI-generated sourcing recommendation, target hub and primary partner, tariff and compliance alerts, ESG scorecard, freight lead times, and target suppliers filterable by annual turnover. Click "Generate RFQ" to draft a procurement email instantly.',
  },
  {
    id: 'tools',
    target: 'tools',
    position: 'top',
    emoji: '🔧',
    title: '8-Tool Procurement Suite',
    content: 'Everything a procurement team needs in one terminal: HS Code Lookup (find the right tariff classification), Mission Archive (replay past scans), Supplier Comparison (side-by-side hub analysis), Total Landed Cost Calculator, Incoterms Guide, Trade Risk Score, Global Port Monitor (26 ports), and Compliance Checklist.',
  },
  {
    id: 'pdf',
    target: 'pdf',
    position: 'top',
    emoji: '📄',
    title: 'Export & Share',
    content: 'Export PDF generates a complete Executive Mission Brief — hubs, risks, FX snapshot, duty rates, ESG scores, and supplier list — ready to drop into a procurement meeting or board deck. Or just copy the URL: every scan is fully shareable. Send the link and your colleague sees exactly what you see.',
  },
  {
    id: 'done',
    target: null,
    position: 'center',
    emoji: '🚀',
    title: 'You\'re Ready to Source',
    content: 'Run your first scan. Type any material and Atlas maps the global supply chain for you in 10 seconds. Start with one of the examples in the Sourcing Hubs panel, or define your own mission.',
    cta: true,
  },
]

// Clamp tooltip so it never goes off-screen
function clampedStyle(raw, tooltipW, tooltipH, windowW, windowH) {
  const pad = 12
  let style = { ...raw }

  // Convert to absolute left/top for clamping
  const left  = style.left  !== undefined ? style.left  : (windowW - tooltipW - (style.right  || 0))
  const top   = style.top   !== undefined ? style.top   : (windowH - tooltipH - (style.bottom || 0))

  const clampedLeft = Math.min(Math.max(pad, left), windowW - tooltipW - pad)
  const clampedTop  = Math.min(Math.max(pad, top),  windowH - tooltipH - pad)

  // If we had a transform translate, absorb it
  if (style.transform) style = { ...style, transform: undefined }

  return { ...style, left: clampedLeft, top: clampedTop }
}

// Liquid glass card style — shared by modal and tooltip
const GLASS = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 55%, rgba(56,189,248,0.06) 100%)',
  backdropFilter: 'blur(44px) saturate(160%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(44px) saturate(160%) brightness(1.08)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.14), 0 0 0 0.5px rgba(255,255,255,0.06)',
}

// Thin specular highlight drawn inside each card
function GlassHighlight() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
      borderRadius: 999, pointerEvents: 'none',
    }} />
  )
}

export default function GuidedTour({ onComplete, onStartScan }) {
  const [step, setStep]   = useState(0)
  const [rect, setRect]   = useState(null)
  const [win,  setWin]    = useState({ w: 1440, h: 900 })
  const [, forceRender]   = useState(0)

  const current = STEPS[step]
  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1

  // Track window size
  useEffect(() => {
    const update = () => setWin({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Find and measure target element
  useEffect(() => {
    if (!current.target) { setRect(null); return }

    const measure = () => {
      const el = document.querySelector(`[data-tour="${current.target}"]`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        setTimeout(() => {
          setRect(el.getBoundingClientRect())
          forceRender(n => n + 1)
        }, 350)
      } else {
        setRect(null)
      }
    }
    measure()
  }, [step, current.target])

  const goNext = useCallback(() => {
    if (isLast) { onComplete(); return }
    // If next step's target doesn't exist, skip it
    let nextStep = step + 1
    while (nextStep < STEPS.length - 1 && STEPS[nextStep].target) {
      const el = document.querySelector(`[data-tour="${STEPS[nextStep].target}"]`)
      if (el) break
      nextStep++
    }
    setStep(nextStep)
  }, [step, isLast, onComplete])

  const goPrev = useCallback(() => setStep(s => Math.max(0, s - 1)), [])

  // Tooltip positioning
  const TOOLTIP_W = 320
  const TOOLTIP_H = 240
  const PAD = 16

  const rawStyle = () => {
    if (!rect) return {}
    switch (current.position) {
      case 'right':  return { left: rect.right  + PAD, top: rect.top + rect.height / 2 - TOOLTIP_H / 2 }
      case 'left':   return { left: rect.left   - TOOLTIP_W - PAD, top: rect.top + rect.height / 2 - TOOLTIP_H / 2 }
      case 'bottom': return { left: rect.left   + rect.width / 2 - TOOLTIP_W / 2, top: rect.bottom + PAD }
      case 'top':    return { left: rect.left   + rect.width / 2 - TOOLTIP_W / 2, top: rect.top - TOOLTIP_H - PAD }
      default:       return {}
    }
  }

  const tooltipStyle = rect
    ? clampedStyle(rawStyle(), TOOLTIP_W, TOOLTIP_H, win.w, win.h)
    : {}

  const spotlightPad = 8

  return (
    <div className="fixed inset-0 z-[500]">

      {/* ── FULL DARK OVERLAY ── */}
      <div className="absolute inset-0 bg-black/75" />

      {/* ── SPOTLIGHT (positioned over target element) ── */}
      <AnimatePresence mode="wait">
        {rect && current.position !== 'center' && (
          <motion.div
            key={`spot-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              left:   rect.left   - spotlightPad,
              top:    rect.top    - spotlightPad,
              width:  rect.width  + spotlightPad * 2,
              height: rect.height + spotlightPad * 2,
              borderRadius: 14,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
              border: '2px solid rgba(56,189,248,0.55)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── CENTER MODAL or POSITIONED TOOLTIP — single AnimatePresence so old fully exits before new enters ── */}
      <AnimatePresence mode="wait">
        {current.position === 'center' ? (
          /* CENTERED MODAL (welcome / done) */
          <motion.div
            key={`center-${step}`}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            <div
              className="relative rounded-2xl p-8"
              style={{ width: 440, ...GLASS }}
            >
              <GlassHighlight />
              <div className="text-5xl mb-5">{current.emoji}</div>
              <h2 className="text-[13px] font-bold text-sky-300 tracking-[0.2em] uppercase mb-3">{current.title}</h2>
              <p className="text-[13px] text-white/80 leading-relaxed font-sans mb-8">{current.content}</p>

              {/* Progress dots */}
              <div className="flex gap-1.5 mb-6">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-5 bg-sky-300' : 'w-1.5 bg-white/20'}`} />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={onComplete} className="text-[10px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest font-bold">
                  Skip tour
                </button>
                <div className="flex gap-2">
                  {!isFirst && (
                    <button onClick={goPrev}
                      className="flex items-center gap-1 px-4 h-9 border border-white/15 text-white/60 hover:text-white text-[10px] font-bold uppercase rounded-lg transition-all backdrop-blur-sm">
                      <ChevronLeft size={13} /> Back
                    </button>
                  )}
                  {current.cta ? (
                    <button onClick={() => { onComplete(); onStartScan?.() }}
                      className="flex items-center gap-1.5 px-5 h-9 bg-emerald-500 text-black font-bold text-[10px] uppercase rounded-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Start Scanning <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button onClick={goNext}
                      className="flex items-center gap-1.5 px-5 h-9 bg-sky-500 text-black font-bold text-[10px] uppercase rounded-lg hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                      {isFirst ? 'Take the Tour' : 'Next'} <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : rect ? (
          /* POSITIONED TOOLTIP (spotlight steps) */
          <motion.div
            key={`tip-${step}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute rounded-xl"
            style={{ ...tooltipStyle, width: TOOLTIP_W, zIndex: 2, ...GLASS }}
          >
            <div className="relative p-5">
              <GlassHighlight />
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl leading-none">{current.emoji}</span>
                  <h3 className="text-[10px] font-bold text-sky-300 tracking-[0.18em] uppercase leading-snug">{current.title}</h3>
                </div>
                <button onClick={onComplete} className="text-white/25 hover:text-white/70 transition-colors ml-2 mt-0.5 shrink-0">
                  <X size={13} />
                </button>
              </div>

              {/* Content */}
              <p className="text-[12px] text-white/80 leading-relaxed font-sans mb-4">{current.content}</p>

              {/* Progress dots */}
              <div className="flex gap-1 mb-4">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-0.5 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-sky-300' : 'w-1 bg-white/15'}`} />
                ))}
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/25 font-mono">{step + 1} / {STEPS.length}</span>
                <div className="flex gap-1.5">
                  <button onClick={goPrev}
                    className="flex items-center gap-0.5 px-3 h-7 border border-white/15 text-white/60 hover:text-white text-[9px] font-bold uppercase rounded-lg transition-all backdrop-blur-sm">
                    <ChevronLeft size={11} /> Back
                  </button>
                  <button onClick={goNext}
                    className="flex items-center gap-0.5 px-3 h-7 bg-sky-400/90 text-black font-bold text-[9px] uppercase rounded-lg hover:bg-sky-300 transition-all backdrop-blur-sm">
                    {isLast ? 'Done' : 'Next'} <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

    </div>
  )
}
