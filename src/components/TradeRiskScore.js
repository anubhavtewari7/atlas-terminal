"use client"
import React, { useState } from 'react'
import { X, Loader2, AlertTriangle, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TradeRiskScore({ onClose }) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [product, setProduct] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAssess = async (e) => {
    e.preventDefault()
    if (!origin.trim() || !destination.trim()) return
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await fetch('/api/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, product })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch {
      setError('Risk assessment failed. Please retry.')
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (score) => {
    if (score >= 65) return { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500/30', label: 'HIGH' }
    if (score >= 35) return { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30', label: 'MEDIUM' }
    return { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'LOW' }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-3xl rounded-2xl shadow-[0_0_80px_rgba(239,68,68,0.08)] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center justify-center">
              <ShieldAlert size={18} className="text-rose-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-rose-400 tracking-[0.2em] uppercase">Trade Lane Risk Score</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">Composite risk index for any global trade corridor</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <form onSubmit={handleAssess} className="p-6 border-b border-white/5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Origin Country / Port</label>
              <input autoFocus value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. Shanghai, China"
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[13px] font-mono text-white focus:outline-none focus:border-rose-500 transition-all rounded-xl placeholder:text-slate-700" />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Destination Country / Port</label>
              <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Los Angeles, USA"
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[13px] font-mono text-white focus:outline-none focus:border-rose-500 transition-all rounded-xl placeholder:text-slate-700" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Product / Cargo (optional)</label>
            <input value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. Automotive components, Electronics, Perishables"
              className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[13px] font-mono text-white focus:outline-none focus:border-rose-500 transition-all rounded-xl placeholder:text-slate-700" />
          </div>
          <button type="submit" disabled={loading || !origin || !destination}
            className="w-full h-12 bg-rose-500 text-white font-bold text-[12px] uppercase tracking-widest hover:bg-rose-400 disabled:opacity-50 transition-all rounded-xl flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing Lane...</> : <><ShieldAlert size={16} /> Run Risk Assessment</>}
          </button>
        </form>

        {error && <div className="m-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-[12px] flex items-center gap-2"><AlertTriangle size={14} />{error}</div>}

        {result && (() => {
          const overall = getRiskColor(result.overall_score)
          return (
            <div className="p-6 space-y-5 max-h-[50vh] overflow-y-auto custom-scrollbar">
              {/* Overall score */}
              <div className={`p-5 border ${overall.border} rounded-xl bg-[#0f0f0f]`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{origin} → {destination}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Transit: {result.transit_days} days · Buffer: {result.recommended_buffer}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[42px] font-bold font-mono leading-none ${overall.text}`}>{result.overall_score}</div>
                    <div className={`text-[11px] font-bold ${overall.text}`}>{result.rating} RISK</div>
                  </div>
                </div>
                {/* Score bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${overall.bg} rounded-full transition-all`} style={{ width: `${result.overall_score}%` }} />
                </div>
              </div>

              {/* Risk components */}
              <div className="grid grid-cols-1 gap-2">
                {Object.values(result.components || {}).map((comp, i) => {
                  const c = getRiskColor(comp.score)
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#111] border border-white/5 rounded-xl">
                      <div className="w-24 shrink-0">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">{comp.label}</div>
                        <div className={`text-[14px] font-bold font-mono ${c.text}`}>{comp.score}/100</div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                          <div className={`h-full ${c.bg} rounded-full`} style={{ width: `${comp.score}%` }} />
                        </div>
                        <div className="text-[10px] text-slate-500">{comp.detail}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Key alert + alternative */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                  <div className="text-[9px] text-rose-400 uppercase font-bold mb-1 tracking-widest">⚠️ Key Alert</div>
                  <p className="text-[11px] text-slate-300 leading-snug">{result.key_alert}</p>
                </div>
                <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                  <div className="text-[9px] text-sky-400 uppercase font-bold mb-1 tracking-widest">🔄 Alternative Route</div>
                  <p className="text-[11px] text-slate-300 leading-snug">{result.alternative_route}</p>
                </div>
              </div>
              <div className="p-3 bg-[#111] border border-white/5 rounded-xl text-[11px] text-slate-500 font-mono">
                💼 Cargo Insurance Estimate: <span className="text-white font-bold">{result.insurance_premium_estimate}</span>
              </div>
            </div>
          )
        })()}
      </motion.div>
    </motion.div>
  )
}
