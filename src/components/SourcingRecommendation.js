"use client"
import React from 'react'
import { X, ShieldAlert, Factory, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

function severityBadge(severity) {
  if (severity === 'CRITICAL') return 'text-rose-400 border-rose-500/40 bg-rose-500/10'
  if (severity === 'HIGH')     return 'text-amber-400 border-amber-500/40 bg-amber-500/10'
  return 'text-slate-400 border-white/10 bg-white/5'
}

export default function SourcingRecommendation({ opportunities, risks, intelBrief, query, onClose }) {
  const primary   = opportunities[0] || null
  const backup    = opportunities[1] || null

  // Timing logic
  const criticalRisks = risks.filter(r => r.severity === 'CRITICAL')
  const highRisks     = risks.filter(r => r.severity === 'HIGH')
  let timing, timingColor
  if (criticalRisks.length > 0) {
    timing      = 'HOLD — resolve critical risk first'
    timingColor = 'text-rose-400'
  } else if (highRisks.length >= 2) {
    timing      = 'HEDGE — place partial orders, maintain buffer stock'
    timingColor = 'text-amber-400'
  } else if (highRisks.length === 1) {
    timing      = 'PROCEED WITH CAUTION — monitor risk closely'
    timingColor = 'text-amber-400'
  } else {
    timing      = 'BUY NOW — favorable conditions'
    timingColor = 'text-emerald-400'
  }

  // Why this hub
  const score = primary?.stability_score ?? null
  const hubReason = primary
    ? score !== null && score !== undefined
      ? `${primary.hub} scores ${score}/100 for supply-chain stability, making it a ${score >= 60 ? 'low-risk' : score >= 35 ? 'moderate-risk' : 'higher-risk'} primary source for ${primary.title || query}. ${score >= 60 ? 'Strong logistics infrastructure and political stability support reliable delivery.' : score >= 35 ? 'Monitor geopolitical developments closely before committing to large orders.' : 'Consider dual-sourcing to offset concentration risk.'}`
      : `${primary.hub} is identified as a leading hub for ${primary.title || query}. Evaluate local market conditions and logistics before finalising your supplier list.`
    : 'No sourcing hub data available.'

  // Next steps
  const steps = []
  if (primary) steps.push(`Request RFQ from top 3 suppliers in ${primary.hub}`)
  if (backup)  steps.push(`Qualify backup supplier in ${backup.hub} as contingency`)
  const firstHighRisk = [...criticalRisks, ...highRisks][0]
  if (firstHighRisk) steps.push(`Initiate risk mitigation for: ${firstHighRisk.title || firstHighRisk.risk}`)
  steps.push('Run Tariff Calculator for HS code before finalising landed cost')
  steps.push('Run Sanctions Check on shortlisted suppliers before contract')

  // Top 3 risks
  const topRisks = risks.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-2xl rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.08)] max-h-[90vh] flex flex-col font-mono"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div>
            <h2 className="text-[11px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <CheckCircle size={14} /> Sourcing Recommendation
            </h2>
            {query && (
              <p className="text-[12px] text-slate-300 mt-1 uppercase tracking-widest truncate max-w-sm">{query}</p>
            )}
          </div>
          <button onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5 custom-scrollbar">

          {/* Section 1: Primary Sourcing Plan */}
          <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-xl p-4 space-y-2">
            <h3 className="text-[10px] font-bold text-emerald-400 tracking-[0.25em] uppercase flex items-center gap-2 mb-3">
              <Factory size={12} /> Primary Sourcing Plan
            </h3>
            {primary ? (
              <>
                <Row label="SOURCE FROM" value={primary.hub} valueClass="text-white font-bold" />
                <Row label="SUPPLIER TYPE" value={primary.title} />
                <Row label="STABILITY SCORE" value={`${primary.stability_score ?? 'N/A'} / 100`} valueClass={primary.stability_score >= 60 ? 'text-emerald-400' : primary.stability_score >= 35 ? 'text-amber-400' : 'text-rose-400'} />
                <div className="pt-1">
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">WHY THIS HUB</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{hubReason}</p>
                </div>
              </>
            ) : (
              <p className="text-[11px] text-slate-500 italic">No primary hub identified.</p>
            )}
          </div>

          {/* Section 2: Backup Plan */}
          <div className="bg-[#0a0a0a] border border-sky-500/20 rounded-xl p-4 space-y-2">
            <h3 className="text-[10px] font-bold text-sky-400 tracking-[0.25em] uppercase flex items-center gap-2 mb-3">
              <ShieldAlert size={12} /> Backup Plan
            </h3>
            <Row label="FALLBACK HUB"  value={backup?.hub ?? 'Diversified domestic sourcing'} valueClass="text-white font-bold" />
            <Row label="FALLBACK TYPE" value={backup?.title ?? 'Onshore/nearshore alternative'} />
            <div className="pt-1">
              <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">TRIGGER</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">Activate if primary supplier fails delivery or risk score drops below 30</p>
            </div>
          </div>

          {/* Section 3: Timing */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-[0.25em] uppercase flex items-center gap-2 mb-3">
              <Clock size={12} /> Timing Recommendation
            </h3>
            <p className={`text-[15px] font-bold uppercase tracking-wider ${timingColor}`}>{timing}</p>
          </div>

          {/* Section 4: Active Risks */}
          <div className="bg-[#0a0a0a] border border-rose-500/15 rounded-xl p-4">
            <h3 className="text-[10px] font-bold text-rose-400 tracking-[0.25em] uppercase flex items-center gap-2 mb-3">
              <AlertTriangle size={12} /> Active Risks to Factor In
            </h3>
            {topRisks.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic">No active risk factors identified</p>
            ) : (
              <div className="space-y-2">
                {topRisks.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${severityBadge(r.severity)}`}>
                      {r.severity || 'RISK'}
                    </span>
                    <span className="text-[11px] text-slate-300 font-bold uppercase leading-snug">{r.title || r.risk}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Next Steps */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-[0.25em] uppercase flex items-center gap-2 mb-3">
              <ArrowRight size={12} /> Recommended Next Steps
            </h3>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                  <span className="text-emerald-400 font-bold shrink-0">{i + 1}.</span>
                  <span className="flex items-center gap-1"><ArrowRight size={9} className="text-emerald-500 shrink-0" />{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/5 shrink-0">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest">
            Analysis based on {opportunities.length} sourcing hub{opportunities.length !== 1 ? 's' : ''} and {risks.length} active risk factor{risks.length !== 1 ? 's' : ''} identified by ATLAS Terminal
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Row({ label, value, valueClass = 'text-slate-200' }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-[9px] text-slate-500 uppercase tracking-widest shrink-0">{label}</div>
      <div className={`text-[11px] text-right ${valueClass}`}>{value}</div>
    </div>
  )
}
