"use client"
import React, { useState } from 'react'
import { X, Search, FileText, ShieldAlert, CheckCircle, AlertTriangle, Loader2, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TariffLookup({ onClose }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/tariff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: query })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (err) {
      setError('Lookup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRateColor = (rate) => {
    if (!rate || rate === 'Free' || rate === '0%' || rate === 'N/A') return 'text-emerald-400'
    const num = parseFloat(rate)
    if (num > 20) return 'text-rose-400'
    if (num > 5) return 'text-amber-400'
    return 'text-emerald-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-3xl rounded-2xl shadow-[0_0_80px_rgba(56,189,248,0.1)] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500/10 border border-sky-500/20 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-sky-400 tracking-[0.2em] uppercase">HS / Tariff Code Lookup</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">WTO & CBP Schedule B — Global Duty Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white active:text-white transition-all"><X size={20} /></button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="p-6 border-b border-white/5">
          <div className="flex gap-3">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. Automotive sun visors, Microchips, Beef patties, Lithium batteries..."
              className="flex-1 bg-[#111] border border-white/10 px-5 py-3 text-[13px] font-mono text-white placeholder:text-slate-700 focus:outline-none focus:border-sky-500 transition-all rounded-xl"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 bg-sky-500 text-black font-bold text-[12px] uppercase tracking-widest hover:bg-sky-400 transition-all disabled:opacity-50 rounded-xl flex items-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? 'Scanning...' : 'Lookup'}
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="p-4 md:p-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-[13px]">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {!result && !loading && !error && (
            <div className="text-center py-8 text-slate-700 text-[12px] font-mono">
              Enter a product name or description to retrieve HTS codes and applicable duty rates worldwide.
            </div>
          )}

          {result && (
            <div className="space-y-5">
              {result.source === 'usitc_live' ? (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                    Live data — U.S. International Trade Commission official HTS database
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200 leading-snug">
                    {result.description}
                  </p>
                </div>
              )}
              {/* Code Header */}
              <div className="flex items-start justify-between p-5 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">{result.chapter}</div>
                  <div className="text-[28px] font-mono font-bold text-white tracking-wider">{result.hts_code}</div>
                  {result.source === 'usitc_live' && (
                    <div className="text-[12px] text-slate-400 mt-1">{result.description}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-600 uppercase mb-1">Unit</div>
                  <div className="text-[12px] font-mono text-slate-300">{result.unit}</div>
                </div>
              </div>

              {/* Duty Rates Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'General (MFN) Rate', value: result.mfn_rate, icon: '🇺🇸', highlight: true },
                  { label: 'Preferential/FTA Rate', value: result.special_rate || 'Not specified', icon: '🤝' },
                  { label: 'Column 2 (Non-NTR) Rate', value: result.column2_rate || 'Not specified', icon: '⚠️' },
                  { label: 'HS6 Code', value: result.hs6_code, icon: '🌐' },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${item.highlight ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#111] border-white/5'}`}>
                    <div className="text-[9px] text-slate-500 uppercase font-bold mb-2 tracking-widest">{item.icon} {item.label}</div>
                    <div className={`text-[16px] font-bold font-mono ${item.highlight ? 'text-amber-400' : getRateColor(item.value)}`}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* FTAs */}
              {result.free_trade_agreements?.length > 0 && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold mb-3 tracking-widest flex items-center gap-2">
                    <CheckCircle size={12} /> Free Trade Agreement Rates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.free_trade_agreements.map((fta, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono rounded-lg">{fta}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Notes */}
              {result.special_notes && (
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                  <div className="text-[10px] text-rose-400 uppercase font-bold mb-2 tracking-widest flex items-center gap-2">
                    <ShieldAlert size={12} /> Compliance Notes
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">{result.special_notes}</p>
                </div>
              )}

              {/* USITC Link */}
              <a
                href={`https://hts.usitc.gov/search?query=${encodeURIComponent(result.hts_code)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#111] border border-white/5 rounded-xl hover:border-sky-500/30 active:border-sky-500/30 transition-all group"
              >
                <span className="text-[11px] text-slate-500 font-mono">Verify on USITC Official Database →</span>
                <ExternalLink size={12} className="text-sky-400 opacity-50 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}