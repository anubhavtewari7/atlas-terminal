"use client"
import React, { useState } from 'react'
import { X, Loader2, AlertTriangle, CheckSquare, Square, ClipboardList, ShieldCheck, Download, Copy } from 'lucide-react'
import { motion } from 'framer-motion'

const COMPLIANCE_RULES = {
  // [productKeyword]: { [destinationKeyword]: [requirements] }
  beef: {
    usa: ['USDA FSIS Import Inspection', 'USDA Foreign Establishment Number required', 'Sanitary Certificate (country of origin)', 'Bill of Lading + Commercial Invoice', 'Customs Bond (for commercial shipments)', 'Country of Origin Labeling (COOL)', 'CBP Form 3461 (Entry)'],
    eu: ['EU Health Certificate', 'TRACES NT Pre-notification', 'EU-approved establishment number', 'Residue testing (hormones)', 'EUDR deforestation compliance (2025)', 'Sanitary & Phytosanitary (SPS) certificate'],
    uk: ['IPAFFS Pre-notification', 'UK health certificate', 'Import of Products of Animal Origin (POAO)', 'Vet check at border inspection post'],
  },
  chip: {
    usa: ['Export Control (EAR/ITAR) classification', 'HTS 8542.31 classification', 'OFAC sanctions screening', 'Certificate of Origin', 'CBP Bond'],
    eu: ['CE marking (if applicable)', 'REACH compliance', 'RoHS Directive (2011/65/EU)', 'WEEE compliance', 'Dual-use export authorization'],
    uk: ['UKCA marking', 'UK RoHS', 'Import declaration (CDS)', 'Strategic Export License (dual-use)'],
  },
  semiconductor: {
    usa: ['Export Control (EAR/ITAR) classification', 'HTS 8542.31 classification', 'OFAC sanctions screening', 'Certificate of Origin', 'CBP Bond'],
    eu: ['CE marking (if applicable)', 'REACH compliance', 'RoHS Directive (2011/65/EU)', 'WEEE compliance', 'Dual-use export authorization'],
    uk: [
      { id: 'uk_sec_1', rule: 'UK Strategic Export Control', detail: 'ECJU export license required for controlled semiconductor technology. Check UK Dual-Use List.', required: true },
      { id: 'uk_sec_2', rule: 'UK REACH Compliance', detail: 'Chemical substances in semiconductor manufacturing must comply with UK REACH.', required: true },
      { id: 'uk_sec_3', rule: 'UKCA Marking', detail: 'Electronic components placed on UK market require UKCA marking.', required: true },
    ],
  },
  lithium: {
    usa: ['UN 3480/3481 hazmat labeling', 'DOT 49 CFR compliance', 'IATA dangerous goods declaration (air)', 'IMO IMDG code (sea)', 'Battery test summary (UN 38.3)', 'CBP entry documentation'],
    eu: ['Battery Regulation (EU) 2023/1542', 'REACH SVHC disclosure', 'ADR/RID/ADN transport compliance', 'CE marking', 'Recycled content declaration'],
  },
  textile: {
    usa: ['Textile Fiber Products Act labeling', 'Wool Products Labeling Act', 'FTC care labeling rule', 'OEKO-TEX certification (if claimed)', 'Lacey Act (for natural fibers)', 'CBP ADD/CVD deposit (China origin)'],
    eu: ['EU Textile Labeling Regulation', 'REACH compliance', 'EUDR (if cotton from high-risk area)', 'CE marking N/A for textiles'],
  },
  default: {
    usa: ['Commercial Invoice (value, description, country of origin)', 'Packing List', 'Bill of Lading or Airway Bill', 'CBP Entry Form (CF 3461 / 7501)', 'Customs Bond (continuous or single-entry)', 'Certificate of Origin (for FTA claims)', 'OFAC sanctions screening'],
    eu: ['EUR.1 Movement Certificate (for FTA)', 'Commercial Invoice with origin statement', 'Packing List', 'Single Administrative Document (SAD)', 'REACH/RoHS compliance letter', 'EU Import Declaration (ICS2)'],
    uk: ['Commercial Invoice + Packing List', 'UK customs declaration (CDS)', 'UKCA marking (if applicable)', 'Supplier Declaration for Preference'],
  }
}

function getChecklist(product, destination) {
  const p = product.toLowerCase()
  const d = destination.toLowerCase()

  let productKey = 'default'
  if (p.includes('beef') || p.includes('meat') || p.includes('patty')) productKey = 'beef'
  else if (p.includes('chip') || p.includes('semiconductor')) productKey = 'chip'
  else if (p.includes('lithium') || p.includes('battery')) productKey = 'lithium'
  else if (p.includes('textile') || p.includes('fabric') || p.includes('apparel')) productKey = 'textile'

  let destKey = 'usa'
  if (d.includes('eu') || d.includes('europe') || d.includes('germany') || d.includes('france')) destKey = 'eu'
  else if (d.includes('uk') || d.includes('britain') || d.includes('england')) destKey = 'uk'

  const rules = COMPLIANCE_RULES[productKey] || COMPLIANCE_RULES.default
  return rules[destKey] || rules['usa'] || COMPLIANCE_RULES.default.usa
}

export default function ComplianceChecklist({ onClose }) {
  const [product, setProduct] = useState('')
  const [destination, setDestination] = useState('')
  const [checklist, setChecklist] = useState(null)
  const [checked, setChecked] = useState({})

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!product || !destination) return
    const items = getChecklist(product, destination)
    setChecklist(items)
    setChecked({})
  }

  const toggleCheck = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }))
  const completedCount = Object.values(checked).filter(Boolean).length

  const handleCopy = () => {
    const text = checklist.map((item, i) => `[${checked[i] ? 'X' : ' '}] ${item}`).join('\n')
    navigator.clipboard.writeText(`Import Compliance Checklist\nProduct: ${product} → ${destination}\n\n${text}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-2xl rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.08)] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
              <ClipboardList size={18} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-emerald-400 tracking-[0.2em] uppercase">Compliance Checklist Generator</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">Import/export requirements by product and destination</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <form onSubmit={handleGenerate} className="p-6 border-b border-white/5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Product / Commodity</label>
              <input autoFocus value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. Beef patties, Microchips, Lithium batteries"
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[13px] font-mono text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl placeholder:text-slate-700" />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Importing Into</label>
              <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. USA, EU, UK"
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[13px] font-mono text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl placeholder:text-slate-700" />
            </div>
          </div>
          <button type="submit" className="w-full h-12 bg-emerald-500 text-black font-bold text-[12px] uppercase tracking-widest hover:bg-emerald-400 transition-all rounded-xl">
            Generate Compliance Checklist
          </button>
        </form>

        {checklist && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] text-slate-400 font-mono">{product} → {destination}</div>
                <div className="text-[10px] text-slate-600 mt-0.5">{completedCount}/{checklist.length} items completed</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(completedCount / checklist.length) * 100}%` }} />
                </div>
                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-[10px] text-slate-400 hover:text-white hover:border-white/20 transition-all">
                  <Copy size={10} /> Copy
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-[45vh] overflow-y-auto custom-scrollbar pr-2">
              {checklist.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => toggleCheck(i)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${checked[i] ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-[#111] border-white/5 hover:border-white/10'}`}
                >
                  <div className={`mt-0.5 shrink-0 ${checked[i] ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {checked[i] ? <CheckSquare size={16} /> : <Square size={16} />}
                  </div>
                  <span className={`text-[12px] leading-snug ${checked[i] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
