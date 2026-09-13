"use client"
import React, { useState } from 'react'
import { X, ShieldOff, AlertTriangle, CheckCircle, Search, Info, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

// ── ECCN category rules (keyword → ECCN + description) ──────────────────────
// Source: BIS Export Administration Regulations (EAR) 15 CFR Part 774
import { analyzeExportControls } from '@/lib/export-controls'

export default function DualUseChecker({ onClose }) {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState(null)

  function run() {
    if (!description.trim()) return
    setResult(analyzeExportControls(description))
  }

  const EXAMPLES = [
    'Ring laser gyroscope for inertial navigation system',
    'Commercial injection-molded ABS housing for consumer electronics',
    'Thermal imaging FPA sensor for industrial inspection',
    'Standard stainless steel fasteners M8 bolt',
    'AES-256 encryption hardware security module',
  ]

  const verdictStyle = !result ? {} :
    result.level === 'itar'       ? { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' } :
    result.level === 'controlled' ? { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' } :
    result.level === 'possible'   ? { bg: 'bg-amber-500/8', border: 'border-amber-500/20', text: 'text-amber-300' } :
    { bg: 'bg-amber-500/8', border: 'border-amber-500/20', text: 'text-amber-300' }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto pb-24 md:pb-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <ShieldOff size={14} className="text-rose-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-widest">Dual-Use / Export Control</div>
              <div className="text-[11px] text-slate-500">EAR / ITAR classification heuristic — not legal advice</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
            <AlertTriangle size={11} className="text-amber-500/70 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 leading-relaxed">
              This is a <span className="text-amber-400/80">heuristic screening tool</span>, not a formal ECCN classification. Always consult a licensed export compliance attorney or BIS for binding determinations. Violations carry civil penalties up to $1M and criminal penalties.
            </p>
          </div>

          {/* Input */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Product Description</label>
            <p className="text-[10px] text-slate-500 mb-2">Include function, materials, performance specs, and intended end-use. More detail = better classification.</p>
            <textarea
              value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Describe the product including: function, performance specs, materials, end-use application, and any defense/aerospace/encryption context…"
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 resize-none leading-relaxed"
            />
            {/* Examples */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {EXAMPLES.map((ex, i) => (
                <button key={i} onClick={() => setDescription(ex)}
                  className="text-[8px] text-slate-500 hover:text-slate-400 border border-white/8 hover:border-white/20 rounded px-2 py-1 transition-colors truncate max-w-[200px]">
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={run}
            disabled={!description.trim()}
            className="w-full h-10 bg-rose-500/80 text-white font-bold uppercase text-[11px] hover:bg-rose-500 rounded-xl tracking-widest flex items-center justify-center gap-1.5 transition-all disabled:opacity-30"
          >
            <Search size={11} /> Screen for Export Controls
          </button>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

              {/* Verdict banner */}
              <div className={`p-4 rounded-xl border ${verdictStyle.bg} ${verdictStyle.border}`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <AlertTriangle size={16} className={verdictStyle.text} />
                  <span className={`text-sm font-black uppercase tracking-widest ${verdictStyle.text}`}>
                    {result.verdict}
                  </span>
                </div>
                {result.level === 'unknown' ? (
                  <>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{result.summary}</p>
                    {result.recommendation && (
                      <p className="text-[11px] text-amber-300/70 leading-relaxed mt-1.5">{result.recommendation}</p>
                    )}
                  </>
                ) : (
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {result.hits.length} control trigger{result.hits.length > 1 ? 's' : ''} detected. Review each finding below and consult your export compliance team.
                  </p>
                )}
              </div>

              {/* Findings */}
              {result.hits.map((hit, i) => (
                <div key={i} className={`rounded-xl border overflow-hidden ${
                  hit.color === 'rose'  ? 'border-rose-500/20 bg-rose-500/5' :
                  'border-amber-500/20 bg-amber-500/5'
                }`}>
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        hit.color === 'rose' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>{hit.eccn}</span>
                      <span className="text-xs font-bold text-white">{hit.title}</span>
                    </div>
                    <div className="flex gap-1">
                      {hit.regime.map(r => (
                        <span key={r} className="text-[8px] font-bold text-slate-500 border border-white/8 rounded px-1.5 py-0.5">{r}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    <p className="text-[11px] text-slate-400 leading-relaxed">{hit.desc}</p>
                    <div className={`text-[10px] font-bold leading-relaxed ${hit.color === 'rose' ? 'text-rose-400' : 'text-amber-400'}`}>
                      ⚡ {hit.action}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {hit.matchedKeywords.map(kw => (
                        <span key={kw} className="text-[8px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-500">
                          matched: &quot;{kw}&quot;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* EAR99 positive signals if mixed */}
              {result.ear99Signals.length > 0 && (
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                  <div className="text-[10px] font-bold text-amber-300 mb-1">Commercial-use terms present (not a classification):</div>
                  <div className="flex flex-wrap gap-1">
                    {result.ear99Signals.map(kw => (
                      <span key={kw} className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5 text-emerald-500/70">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              <div className="p-3 rounded-lg bg-white/3 border border-white/8">
                <div className="text-[10px] font-bold text-slate-400 mb-2">Official Resources</div>
                <div className="space-y-1">
                  {[
                    ['BIS SNAP-R (license applications)', 'https://snapr.bis.doc.gov'],
                    ['Consolidated Screening List (CSL)', 'https://www.trade.gov/consolidated-screening-list'],
                    ['USML Category lookup (ITAR)', 'https://www.ecfr.gov/current/title-22/chapter-I/subchapter-M/part-121'],
                    ['BIS CCL ECCN lookup', 'https://www.bis.doc.gov/eccn'],
                  ].map(([label, url]) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] text-sky-400/70 hover:text-sky-400 transition-colors">
                      <ExternalLink size={9} /> {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
