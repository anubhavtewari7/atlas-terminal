"use client"
import React from 'react'
import { X, BarChart3, ExternalLink, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SupplierComparison({ hubs, onClose }) {
  if (!hubs || hubs.length === 0) return null

  const getBestForMetric = (metric) => {
    let best = null, bestVal = Infinity
    hubs.forEach(h => {
      let val
      if (metric === 'duty') {
        const raw = h.customs?.duty_rate || ''
        // Guard against future non-percentage duty formats (e.g. "$0.35/kg")
        // silently parsing to 0 and wrongly winning "cheapest".
        val = raw.includes('%') ? (parseFloat(raw) || 0) : Infinity
      }
      if (metric === 'freight') val = parseFloat((h.logistics?.freight_cost_estimate || '').replace(/[^0-9.]/g, '')) || 999
      if (metric === 'lead') val = h.logistics?.port_wait_days || 99
      if (metric === 'esg') val = { 'AA': 0, 'A+': 1, 'A': 2, 'A-': 3, 'B+': 4, 'B': 5, 'B-': 6, 'C': 7 }[h.esg?.ethical_rating] ?? 5
      if (val < bestVal) { bestVal = val; best = h.id }
    })
    return best
  }

  const bestDuty   = getBestForMetric('duty')
  const bestFreight = getBestForMetric('freight')
  const bestLead   = getBestForMetric('lead')
  const bestESG    = getBestForMetric('esg')

  const metrics = [
    { label: 'HTS Code',       key: h => h.customs?.hts_code || 'N/A',              bestId: null },
    { label: 'Import Duty',    key: h => h.customs?.duty_rate || 'N/A',             bestId: bestDuty },
    { label: 'Compliance',     key: h => h.customs?.compliance_note || 'N/A',       bestId: null, wrap: true },
    { label: 'Est. Freight',   key: h => h.logistics?.freight_cost_estimate || 'N/A', bestId: bestFreight },
    { label: 'Lead Time',      key: h => `${h.logistics?.port_wait_days ?? 'N/A'} Days`, bestId: bestLead },
    { label: 'ESG Rating',     key: h => h.esg?.ethical_rating || 'N/A',            bestId: bestESG },
    { label: 'CO₂ Intensity',  key: h => h.esg?.carbon_footprint || 'N/A',         bestId: null },
    { label: 'Industry KPI',   key: h => h.industry_kpi ? `${h.industry_kpi.label}: ${h.industry_kpi.value}` : 'N/A', bestId: null, wrap: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#090909] border border-white/10 w-full max-w-[95vw] rounded-2xl shadow-[0_0_100px_rgba(56,189,248,0.1)] overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 size={22} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-sky-400 tracking-[0.15em] uppercase">Supplier Region Comparison</h2>
              <p className="text-[13px] text-slate-500 mt-0.5">Side-by-side analysis · {hubs.length} global sourcing regions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 text-slate-500 hover:text-white active:text-white transition-all rounded-lg hover:bg-white/5 active:bg-white/5">
            <X size={22} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1 custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-[#0d0d0d] sticky top-0 z-10">
                <td className="px-6 py-5 text-[12px] text-slate-500 uppercase font-bold tracking-widest min-w-[130px]">Metric</td>
                {hubs.map((hub, i) => (
                  <td key={i} className="px-6 py-5 text-center min-w-[180px]">
                    <div className="text-[12px] text-emerald-400 font-bold uppercase tracking-widest mb-1">{hub.hub}</div>
                    <div className="text-[17px] text-white font-bold leading-snug">{hub.title}</div>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {(hub.companies || []).slice(0, 2).map((c, ci) => (
                        <a key={ci} href={c.website} target="_blank" rel="noopener noreferrer"
                          className="text-[12px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-lg hover:bg-sky-500/20 active:bg-sky-500/20 transition-all flex items-center gap-1.5"
                        >
                          {c.name} <ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, mi) => (
                <tr key={mi} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-all">
                  <td className="px-6 py-5 text-[13px] text-slate-400 uppercase font-bold tracking-wider">
                    {metric.label}
                  </td>
                  {hubs.map((hub, hi) => {
                    const value  = metric.key(hub)
                    const isBest = metric.bestId && metric.bestId === hub.id
                    return (
                      <td key={hi} className="px-6 py-5 text-center">
                        <div className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          ${isBest
                            ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold'
                            : 'text-slate-200'}
                          ${metric.wrap ? 'text-[13px] leading-snug max-w-[180px] text-center' : 'text-[15px] font-mono'}`}
                        >
                          {isBest && <CheckCircle size={13} className="text-emerald-400 shrink-0" />}
                          <span className={metric.wrap ? 'whitespace-normal' : 'whitespace-nowrap'}>{value}</span>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-8 py-4 border-t border-white/5 flex items-center gap-3 shrink-0 bg-[#090909]">
          <CheckCircle size={14} className="text-emerald-400" />
          <span className="text-[13px] text-slate-500 font-mono">Green highlighted cells = best-in-class for that metric across all regions.</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
