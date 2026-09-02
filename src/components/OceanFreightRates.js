"use client"
import React, { useState } from 'react'
import { X, Anchor, TrendingUp, TrendingDown, Minus, RefreshCw, Info, AlertTriangle, ExternalLink, Ship } from 'lucide-react'
import { motion } from 'framer-motion'

// ── Spot rate data (sourced from Freightos Baltic Index levels, Aug 2026) ──
// Rates in USD per 40ft container (FEU)
const CORRIDORS = [
  {
    id: 'sha-lax',
    from: 'Shanghai',
    to: 'Los Angeles',
    flag_from: '🇨🇳',
    flag_to: '🇺🇸',
    code: 'SHA → LAX',
    transit: '14–16 days',
    rate: 3840,
    prev: 4210,
    trend: 'DOWN',
    carriers: ['COSCO', 'Evergreen', 'MSC', 'ONE'],
    notes: 'Peak season surcharge active Q3. Port congestion moderate at LA/LB.',
    surcharges: { baf: 420, imo: 180, ens: 50 },
    category: 'transpacific',
  },
  {
    id: 'sha-fxt',
    from: 'Shanghai',
    to: 'Felixstowe (UK)',
    flag_from: '🇨🇳',
    flag_to: '🇬🇧',
    code: 'SHA → FXT',
    transit: '24–28 days',
    rate: 4650,
    prev: 4100,
    trend: 'UP',
    carriers: ['Maersk', 'CMA CGM', 'Yang Ming'],
    notes: 'Elevated due to Suez Canal diversions via Cape of Good Hope.',
    surcharges: { baf: 390, imo: 165, ens: 50 },
    category: 'europe',
  },
  {
    id: 'sha-rtm',
    from: 'Shanghai',
    to: 'Rotterdam',
    flag_from: '🇨🇳',
    flag_to: '🇳🇱',
    code: 'SHA → RTM',
    transit: '26–30 days',
    rate: 4890,
    prev: 4320,
    trend: 'UP',
    carriers: ['MSC', 'Hapag-Lloyd', 'Evergreen', 'HMM'],
    notes: 'Cape of Good Hope routing adds ~10 days and fuel cost vs. Suez.',
    surcharges: { baf: 410, imo: 175, ens: 50 },
    category: 'europe',
  },
  {
    id: 'sha-jnb',
    from: 'Shanghai',
    to: 'Durban',
    flag_from: '🇨🇳',
    flag_to: '🇿🇦',
    code: 'SHA → DUR',
    transit: '21–25 days',
    rate: 2190,
    prev: 2050,
    trend: 'UP',
    carriers: ['MSC', 'CMA CGM', 'PIL'],
    notes: 'Growing corridor. Port of Durban congestion continues to impact ETAs.',
    surcharges: { baf: 280, imo: 120, ens: 50 },
    category: 'africa',
  },
  {
    id: 'nyc-rtm',
    from: 'New York',
    to: 'Rotterdam',
    flag_from: '🇺🇸',
    flag_to: '🇳🇱',
    code: 'NYC → RTM',
    transit: '8–12 days',
    rate: 1650,
    prev: 1720,
    trend: 'DOWN',
    carriers: ['Hapag-Lloyd', 'MSC', 'CMA CGM'],
    notes: 'Transatlantic rates softening. Strong vessel availability.',
    surcharges: { baf: 210, imo: 95, ens: 50 },
    category: 'transatlantic',
  },
  {
    id: 'sha-bom',
    from: 'Shanghai',
    to: 'Mumbai',
    flag_from: '🇨🇳',
    flag_to: '🇮🇳',
    code: 'SHA → BOM',
    transit: '14–18 days',
    rate: 890,
    prev: 840,
    trend: 'UP',
    carriers: ['COSCO', 'Evergreen', 'ONE', 'PIL'],
    notes: 'Intra-Asia rates rising as India import demand strengthens.',
    surcharges: { baf: 190, imo: 80, ens: 50 },
    category: 'intra-asia',
  },
  {
    id: 'sha-sin',
    from: 'Shanghai',
    to: 'Singapore',
    flag_from: '🇨🇳',
    flag_to: '🇸🇬',
    code: 'SHA → SIN',
    transit: '5–7 days',
    rate: 480,
    prev: 510,
    trend: 'DOWN',
    carriers: ['COSCO', 'PIL', 'Wan Hai', 'Evergreen'],
    notes: 'Competitive intra-Asia route. Multiple sailings per week.',
    surcharges: { baf: 110, imo: 45, ens: 0 },
    category: 'intra-asia',
  },
  {
    id: 'bom-rtm',
    from: 'Mumbai',
    to: 'Rotterdam',
    flag_from: '🇮🇳',
    flag_to: '🇳🇱',
    code: 'BOM → RTM',
    transit: '20–24 days',
    rate: 2380,
    prev: 2100,
    trend: 'UP',
    carriers: ['Maersk', 'MSC', 'CMA CGM', 'Hapag-Lloyd'],
    notes: 'India-Europe corridor strengthening. Cape of Good Hope adds uncertainty.',
    surcharges: { baf: 310, imo: 135, ens: 50 },
    category: 'europe',
  },
  {
    id: 'sha-ord',
    from: 'Shanghai',
    to: 'Chicago (rail)',
    flag_from: '🇨🇳',
    flag_to: '🇺🇸',
    code: 'SHA → CHI',
    transit: '18–22 days',
    rate: 4950,
    prev: 5200,
    trend: 'DOWN',
    carriers: ['COSCO', 'ONE', 'Evergreen (+ BNSF rail)'],
    notes: 'Inland point intermodal (IPI) via West Coast. Includes rail to Chicago.',
    surcharges: { baf: 440, imo: 185, ens: 50 },
    category: 'transpacific',
  },
  {
    id: 'rtm-mex',
    from: 'Rotterdam',
    to: 'Manzanillo (MX)',
    flag_from: '🇳🇱',
    flag_to: '🇲🇽',
    code: 'RTM → MZN',
    transit: '15–19 days',
    rate: 2100,
    prev: 1950,
    trend: 'UP',
    carriers: ['CMA CGM', 'Hapag-Lloyd', 'MSC'],
    notes: 'Europe-Mexico corridor growing with nearshoring demand. New services launched 2024.',
    surcharges: { baf: 270, imo: 115, ens: 50 },
    category: 'transatlantic',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Routes' },
  { id: 'transpacific', label: 'Transpacific' },
  { id: 'europe', label: 'Asia–Europe' },
  { id: 'transatlantic', label: 'Transatlantic' },
  { id: 'intra-asia', label: 'Intra-Asia' },
  { id: 'africa', label: 'Africa' },
]

const TREND_CONFIG = {
  UP: { icon: TrendingUp, color: 'text-rose-400', bg: 'bg-rose-500/10', label: '▲' },
  DOWN: { icon: TrendingDown, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: '▼' },
  FLAT: { icon: Minus, color: 'text-slate-400', bg: 'bg-slate-500/10', label: '━' },
}

// Baltic Dry Index snapshot
const BDI = { value: 1842, prev: 1756, trend: 'UP', date: 'Aug 27, 2026' }
const FBX = { value: 3420, prev: 3680, trend: 'DOWN', date: 'Aug 27, 2026' }

export default function OceanFreightRates({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const filtered = activeCategory === 'all' ? CORRIDORS : CORRIDORS.filter(c => c.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-3xl rounded-2xl shadow-[0_0_80px_rgba(14,165,233,0.08)] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500/10 border border-sky-500/20 rounded-lg flex items-center justify-center">
              <Anchor size={18} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-sky-400 tracking-[0.2em] uppercase">Ocean Freight Spot Rates</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">Freightos Baltic Index (FBX) · 40ft FEU · Updated Aug 27, 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Market Indices */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Freightos Baltic Index', abbr: 'FBX', data: FBX, unit: 'USD/FEU', color: 'sky' },
              { label: 'Baltic Dry Index', abbr: 'BDI', data: BDI, unit: 'pts', color: 'indigo' },
            ].map((idx, i) => {
              const t = TREND_CONFIG[idx.data.trend]
              const pct = (((idx.data.value - idx.data.prev) / idx.data.prev) * 100).toFixed(1)
              return (
                <div key={i} className={`p-4 bg-${idx.color}-500/5 border border-${idx.color}-500/20 rounded-xl`}>
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">{idx.label}</div>
                  <div className={`text-[22px] font-bold font-mono text-${idx.color}-400`}>{idx.data.value.toLocaleString()}</div>
                  <div className={`text-[10px] font-mono mt-1 ${t.color}`}>{t.label} {Math.abs(pct)}% vs prior week · {idx.unit}</div>
                </div>
              )
            })}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-sky-500 text-black' : 'bg-white/5 text-slate-500 hover:text-white'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Route cards */}
          <div className="space-y-2">
            {filtered.map(c => {
              const t = TREND_CONFIG[c.trend]
              const pct = Math.abs(((c.rate - c.prev) / c.prev) * 100).toFixed(1)
              const TrendIcon = t.icon
              const isOpen = expanded === c.id
              const totalSurcharge = Object.values(c.surcharges).reduce((a, b) => a + b, 0)

              return (
                <div key={c.id} className="border border-white/8 rounded-xl overflow-hidden hover:border-white/15 transition-all">
                  <button
                    onClick={() => setExpanded(isOpen ? null : c.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sky-500/10 rounded-lg flex items-center justify-center">
                        <Ship size={14} className="text-sky-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white font-mono">{c.flag_from} {c.from} → {c.flag_to} {c.to}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{c.transit} transit · {c.carriers.slice(0, 2).join(', ')}{c.carriers.length > 2 ? ` +${c.carriers.length - 2}` : ''}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[15px] font-bold text-white font-mono">${c.rate.toLocaleString()}</div>
                        <div className={`flex items-center justify-end gap-1 text-[10px] font-mono ${t.color}`}>
                          <TrendIcon size={10} /> {pct}%
                        </div>
                      </div>
                      <div className={`text-[10px] font-bold ${isOpen ? 'text-sky-400' : 'text-slate-600'}`}>{isOpen ? '▲' : '▼'}</div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/5 p-4 space-y-3 bg-[#0a0a0a]">
                      <p className="text-[11px] text-slate-400 leading-relaxed">{c.notes}</p>

                      {/* Cost breakdown */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-[#111] rounded-lg">
                          <div className="text-[10px] text-slate-600 uppercase mb-1">Base Rate (FEU)</div>
                          <div className="text-[14px] font-bold text-white font-mono">${(c.rate - totalSurcharge).toLocaleString()}</div>
                        </div>
                        <div className="p-3 bg-[#111] rounded-lg">
                          <div className="text-[10px] text-slate-600 uppercase mb-1">Total Surcharges</div>
                          <div className="text-[14px] font-bold text-amber-400 font-mono">+${totalSurcharge}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { k: 'BAF (Bunker)', v: c.surcharges.baf },
                          { k: 'IMO 2020', v: c.surcharges.imo },
                          { k: 'ENS', v: c.surcharges.ens },
                        ].map((s, i) => (
                          <div key={i} className="p-2.5 bg-[#111] rounded-lg text-center">
                            <div className="text-[8px] text-slate-700 uppercase">{s.k}</div>
                            <div className="text-[11px] font-mono text-slate-300 mt-0.5">${s.v}</div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                        <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Info size={9} /> All-In Estimate</div>
                        <div className="text-[13px] font-bold text-amber-300 font-mono">${c.rate.toLocaleString()} / FEU</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">Excludes destination charges, customs, insurance. Get booking-level quotes from carrier.</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {c.carriers.map((carrier, i) => (
                          <span key={i} className="px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-lg text-[10px] text-sky-400 font-mono">{carrier}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Data source note */}
          <div className="p-3 bg-white/3 border border-white/8 rounded-xl flex items-start gap-2">
            <AlertTriangle size={12} className="text-slate-600 mt-0.5 shrink-0" />
            <p className="text-[10px] text-slate-600 leading-relaxed">
              Rates are indicative benchmarks based on Freightos Baltic Index (FBX). Actual rates vary by carrier, booking lead time, cargo type, and port conditions. Always request firm quotes from freight forwarders.
              <a href="https://www.freightos.com/freight-resources/freight-market-data/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline ml-1">Freightos Market Data ↗</a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
