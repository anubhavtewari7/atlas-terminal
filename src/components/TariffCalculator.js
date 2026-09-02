"use client"
import React, { useState } from 'react'
import { X, Calculator, AlertTriangle, CheckCircle, Info, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

// ── MFN duty rates by HS chapter (2-digit) ─────────────────────────────────
// Source: USITC HTS 2024 — representative rates for most-traded goods
const HS_CHAPTERS = {
  '01': { desc: 'Live animals',              mfn: 0.0  },
  '02': { desc: 'Meat & edible offal',        mfn: 2.6  },
  '03': { desc: 'Fish & seafood',             mfn: 0.5  },
  '04': { desc: 'Dairy, eggs, honey',         mfn: 8.0  },
  '07': { desc: 'Edible vegetables',          mfn: 3.2  },
  '08': { desc: 'Edible fruit & nuts',        mfn: 5.0  },
  '09': { desc: 'Coffee, tea, spices',        mfn: 0.0  },
  '10': { desc: 'Cereals (wheat, corn, rice)',mfn: 0.7  },
  '15': { desc: 'Fats & oils',               mfn: 3.4  },
  '16': { desc: 'Meat/fish preparations',    mfn: 5.0  },
  '17': { desc: 'Sugar & confectionery',     mfn: 6.4  },
  '18': { desc: 'Cocoa & preparations',      mfn: 2.6  },
  '21': { desc: 'Misc food preparations',    mfn: 6.4  },
  '22': { desc: 'Beverages, spirits',        mfn: 5.0  },
  '27': { desc: 'Mineral fuels & oils',      mfn: 0.0  },
  '28': { desc: 'Inorganic chemicals',       mfn: 3.7  },
  '29': { desc: 'Organic chemicals',         mfn: 3.7  },
  '30': { desc: 'Pharmaceutical products',   mfn: 0.0  },
  '31': { desc: 'Fertilizers',              mfn: 0.0  },
  '32': { desc: 'Paints, varnishes, inks',   mfn: 3.7  },
  '33': { desc: 'Essential oils, cosmetics', mfn: 4.9  },
  '34': { desc: 'Soap, lubricants, waxes',   mfn: 3.1  },
  '38': { desc: 'Misc chemical products',    mfn: 3.7  },
  '39': { desc: 'Plastics & articles',       mfn: 5.3  },
  '40': { desc: 'Rubber & articles',         mfn: 2.5  },
  '41': { desc: 'Raw hides & leather',       mfn: 2.4  },
  '42': { desc: 'Leather articles, bags',    mfn: 5.3  },
  '44': { desc: 'Wood & wood articles',      mfn: 3.2  },
  '47': { desc: 'Pulp, paper waste',         mfn: 0.0  },
  '48': { desc: 'Paper & paperboard',        mfn: 0.9  },
  '49': { desc: 'Printed books, newspapers', mfn: 0.0  },
  '52': { desc: 'Cotton',                    mfn: 8.0  },
  '54': { desc: 'Man-made filaments',        mfn: 10.2 },
  '55': { desc: 'Man-made staple fibres',    mfn: 10.2 },
  '56': { desc: 'Wadding, felt, nonwovens',  mfn: 4.0  },
  '57': { desc: 'Carpets & floor coverings', mfn: 4.5  },
  '58': { desc: 'Special woven fabrics',     mfn: 8.0  },
  '60': { desc: 'Knitted/crocheted fabrics', mfn: 10.2 },
  '61': { desc: 'Knitted apparel',           mfn: 16.5 },
  '62': { desc: 'Woven apparel',             mfn: 16.5 },
  '63': { desc: 'Other made-up textiles',    mfn: 9.0  },
  '64': { desc: 'Footwear',                  mfn: 10.0 },
  '69': { desc: 'Ceramic products',          mfn: 5.8  },
  '70': { desc: 'Glass & glassware',         mfn: 5.0  },
  '71': { desc: 'Jewelry, precious metals',  mfn: 4.5  },
  '72': { desc: 'Iron & steel',              mfn: 1.5  },
  '73': { desc: 'Iron/steel articles',       mfn: 3.5  },
  '74': { desc: 'Copper & articles',         mfn: 1.0  },
  '75': { desc: 'Nickel & articles',         mfn: 2.5  },
  '76': { desc: 'Aluminum & articles',       mfn: 3.0  },
  '78': { desc: 'Lead & articles',           mfn: 3.0  },
  '79': { desc: 'Zinc & articles',           mfn: 3.0  },
  '82': { desc: 'Tools, cutlery, hardware',  mfn: 3.7  },
  '83': { desc: 'Misc base metal articles',  mfn: 3.7  },
  '84': { desc: 'Machinery & mechanical',    mfn: 1.4  },
  '85': { desc: 'Electrical machinery',      mfn: 1.7  },
  '86': { desc: 'Rail locomotives',          mfn: 1.0  },
  '87': { desc: 'Motor vehicles & parts',    mfn: 2.5  },
  '88': { desc: 'Aircraft & spacecraft',     mfn: 0.0  },
  '89': { desc: 'Ships & boats',             mfn: 1.5  },
  '90': { desc: 'Optical, medical instruments',mfn: 1.7},
  '91': { desc: 'Clocks & watches',          mfn: 4.5  },
  '92': { desc: 'Musical instruments',       mfn: 4.7  },
  '94': { desc: 'Furniture, bedding, lamps', mfn: 3.5  },
  '95': { desc: 'Toys, games, sports goods', mfn: 0.0  },
  '96': { desc: 'Misc manufactured articles',mfn: 3.4  },
}

// ── Section 301 tariff rates by HS chapter (China origin) ──────────────────
// Lists 1-4B as of 2024. Sources: USTR Federal Register notices.
const SEC301_RATES = {
  // List 1 (34B, 25%) — industrial machinery, electrical, aerospace
  '84': 25, '85': 25, '88': 25, '89': 25, '90': 7.5,
  // List 2 (16B, 25%) — chemicals, plastics, metals, transport
  '28': 25, '29': 25, '32': 25, '38': 25, '39': 25, '40': 25,
  '72': 25, '73': 25, '74': 25, '75': 25, '76': 25, '78': 25, '79': 25,
  '82': 25, '83': 25, '86': 25, '87': 25,
  // List 3 (200B, 25%) — broad consumer & industrial goods
  '02': 25, '03': 25, '04': 25, '07': 25, '08': 25, '09': 25,
  '15': 25, '16': 25, '17': 25, '18': 25, '21': 25, '22': 25,
  '31': 25, '33': 25, '34': 25,
  '41': 25, '42': 25, '44': 25, '47': 25, '48': 25, '49': 25,
  '52': 25, '54': 25, '55': 25, '56': 25, '57': 25, '58': 25, '60': 25,
  '69': 25, '70': 25, '71': 25,
  '91': 25, '92': 25, '94': 25, '95': 25, '96': 25,
  // List 4A (7.5%) — consumer goods (post Phase 1 deal reduction)
  '61': 7.5, '62': 7.5, '63': 7.5, '64': 7.5,
}

// ── Section 232 steel & aluminum surcharges ────────────────────────────────
const SEC232 = {
  steel: { chapters: ['72','73'], rate: 25, countries: ['china','russia','ukraine'] },
  aluminum: { chapters: ['76'], rate: 10, countries: ['china','russia'] },
}

// ── FTA programs — zero/reduced duty by country ────────────────────────────
const FTA_PROGRAMS = {
  'canada':       { name: 'USMCA',  rate: 0,   note: 'Rules of Origin apply. Regional Value Content required.' },
  'mexico':       { name: 'USMCA',  rate: 0,   note: 'Rules of Origin apply. Regional Value Content required.' },
  'south korea':  { name: 'KORUS',  rate: 0,   note: 'Korea-US FTA. Nearly all goods qualify.' },
  'korea':        { name: 'KORUS',  rate: 0,   note: 'Korea-US FTA. Nearly all goods qualify.' },
  'australia':    { name: 'AUSFTA', rate: 0,   note: 'Australia-US FTA. Broad zero-tariff coverage.' },
  'singapore':    { name: 'USSFTA', rate: 0,   note: 'Singapore-US FTA. Wide zero-duty coverage.' },
  'chile':        { name: 'US-Chile FTA', rate: 0, note: 'Chile-US FTA. Most goods zero-rated.' },
  'colombia':     { name: 'US-Colombia FTA', rate: 0, note: 'Colombia-US FTA.' },
  'peru':         { name: 'US-Peru FTA', rate: 0, note: 'Peru-US FTA.' },
  'israel':       { name: 'US-Israel FTA', rate: 0, note: 'Comprehensive FTA. Most goods zero duty.' },
  'jordan':       { name: 'US-Jordan FTA', rate: 0, note: 'Jordan-US FTA.' },
  'bahrain':      { name: 'US-Bahrain FTA', rate: 0, note: 'Bahrain-US FTA.' },
  'morocco':      { name: 'US-Morocco FTA', rate: 0, note: 'Morocco-US FTA — attractive nearshore option.' },
  'oman':         { name: 'US-Oman FTA', rate: 0, note: 'Oman-US FTA.' },
  'japan':        { name: 'US-Japan Trade Agreement', rate: 0, note: 'Partial agreement — ag and industrial goods.' },
}

// ── Special country notes ───────────────────────────────────────────────────
const COUNTRY_FLAGS = {
  'china': { sec301: true, note: 'Section 301 tariffs apply in addition to MFN rate.' },
  'russia': { banned: true, note: 'CAPTA sanctions + Sec 232 steel/al. Most imports prohibited.' },
  'belarus': { elevated: true, note: 'Elevated sanctions risk. Verify each shipment.' },
}

const ORIGIN_OPTIONS = [
  'China','Mexico','Canada','Germany','Japan','South Korea','Taiwan','Vietnam',
  'India','Italy','United Kingdom','France','Thailand','Malaysia','Indonesia',
  'Brazil','Turkey','Australia','Singapore','Israel','Morocco','Other'
]

export default function TariffCalculator({ onClose }) {
  const [hsCode, setHsCode]         = useState('')
  const [origin, setOrigin]         = useState('')
  const [cargoValue, setCargoValue] = useState('')
  const [result, setResult]         = useState(null)

  function calculate() {
    const chapter = hsCode.trim().replace(/[^0-9]/g,'').substring(0, 2)
    const chapterData = HS_CHAPTERS[chapter]
    if (!chapterData) return

    const value = parseFloat(cargoValue) || 0
    const originLower = origin.toLowerCase()

    // MFN base rate
    let mfnRate = chapterData.mfn
    let totalRate = mfnRate
    let surcharges = []

    // FTA override
    const fta = Object.entries(FTA_PROGRAMS).find(([k]) => originLower.includes(k))
    let ftaProgram = null
    if (fta) {
      ftaProgram = fta[1]
      totalRate = 0
    }

    // Section 301 (China only, on top of MFN)
    const isChinese = originLower.includes('china')
    let sec301Rate = 0
    if (isChinese && SEC301_RATES[chapter] !== undefined) {
      sec301Rate = SEC301_RATES[chapter]
      surcharges.push({ label: `Section 301 (List tariff)`, rate: sec301Rate, note: 'USTR China tariff surcharge' })
      if (!ftaProgram) totalRate = mfnRate + sec301Rate
    }

    // Section 232 (steel/aluminum)
    let sec232Rate = 0
    for (const [material, info] of Object.entries(SEC232)) {
      if (info.chapters.includes(chapter) && info.countries.some(c => originLower.includes(c))) {
        sec232Rate = info.rate
        surcharges.push({ label: `Section 232 (${material})`, rate: sec232Rate, note: `${material.charAt(0).toUpperCase()+material.slice(1)} safeguard tariff` })
        if (!ftaProgram) totalRate += sec232Rate
      }
    }

    const dutyAmount = value * (totalRate / 100)

    setResult({
      chapter, chapterDesc: chapterData.desc,
      mfnRate, sec301Rate, sec232Rate,
      totalRate: ftaProgram ? 0 : totalRate,
      dutyAmount: ftaProgram ? 0 : dutyAmount,
      ftaProgram, surcharges,
      isChinese,
      originFlag: COUNTRY_FLAGS[originLower] || null,
      value,
    })
  }

  const riskColor = !result ? 'slate' :
    result.totalRate === 0 ? 'emerald' :
    result.totalRate > 25  ? 'rose' :
    result.totalRate > 10  ? 'amber' : 'sky'

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Calculator size={14} className="text-sky-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-widest">Tariff Calculator</div>
              <div className="text-[11px] text-slate-500">US import duty — MFN + Section 301/232</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Inputs */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">HS Code</label>
              <input
                value={hsCode}
                onChange={e => setHsCode(e.target.value)}
                placeholder="e.g. 8544.30"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50"
              />
              <p className="text-[10px] text-slate-500 mt-1">6-digit code from the Harmonized System (chapter.heading).</p>
              {hsCode.length >= 2 && HS_CHAPTERS[hsCode.replace(/[^0-9]/g,'').substring(0,2)] && (
                <div className="text-[10px] text-sky-400 mt-1 leading-tight">
                  Chapter {hsCode.replace(/[^0-9]/g,'').substring(0,2)}: {HS_CHAPTERS[hsCode.replace(/[^0-9]/g,'').substring(0,2)].desc}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Origin Country</label>
              <div className="relative">
                <select
                  value={origin} onChange={e => setOrigin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500/50 appearance-none"
                >
                  <option value="" className="bg-[#0a0a0a]">Select origin…</option>
                  {ORIGIN_OPTIONS.map(o => (
                    <option key={o} value={o} className="bg-[#0a0a0a]">{o}</option>
                  ))}
                </select>
                <ChevronDown size={10} className="absolute right-2.5 top-3 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Cargo Value (USD)</label>
              <input
                value={cargoValue}
                onChange={e => setCargoValue(e.target.value)}
                placeholder="e.g. 50000"
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={!hsCode || !origin || !cargoValue}
            className="w-full h-10 bg-sky-500 text-black font-bold uppercase text-[11px] hover:bg-sky-400 rounded-xl tracking-widest flex items-center justify-center gap-1.5 transition-all disabled:opacity-30"
          >
            <Calculator size={11} /> Calculate Duty
          </button>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {/* Risk flag */}
              {result.isChinese && !result.ftaProgram && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
                  <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-amber-300/80 leading-relaxed">
                    <span className="font-bold text-amber-400">China Origin:</span> Section 301 tariffs apply on top of MFN rate.
                    {result.sec301Rate > 0 && ` Additional ${result.sec301Rate}% surcharge on this HS chapter.`}
                  </div>
                </div>
              )}
              {result.ftaProgram && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/8 border border-emerald-500/20">
                  <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-emerald-300/80 leading-relaxed">
                    <span className="font-bold text-emerald-400">{result.ftaProgram.name} — Zero Duty:</span> {result.ftaProgram.note}
                  </div>
                </div>
              )}

              {/* Rate breakdown */}
              <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Duty Breakdown</span>
                </div>
                <div className="divide-y divide-white/5">
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-[11px] text-slate-400">HS Chapter {result.chapter} — {result.chapterDesc}</span>
                    <span className="text-[11px] font-bold text-white">MFN {result.mfnRate.toFixed(1)}%</span>
                  </div>
                  {result.surcharges.map((s, i) => (
                    <div key={i} className="flex justify-between items-center px-4 py-2.5">
                      <div>
                        <span className="text-[11px] text-rose-400 font-bold">{s.label}</span>
                        <span className="text-[10px] text-slate-500 ml-2">{s.note}</span>
                      </div>
                      <span className="text-[11px] font-bold text-rose-400">+{s.rate}%</span>
                    </div>
                  ))}
                  {result.ftaProgram && (
                    <div className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-[11px] text-emerald-400 font-bold">{result.ftaProgram.name} Preference</span>
                      <span className="text-[11px] font-bold text-emerald-400">−{result.mfnRate.toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border ${
                  riskColor === 'emerald' ? 'bg-emerald-500/8 border-emerald-500/20' :
                  riskColor === 'rose'    ? 'bg-rose-500/8 border-rose-500/20' :
                  riskColor === 'amber'   ? 'bg-amber-500/8 border-amber-500/20' :
                  'bg-sky-500/8 border-sky-500/20'
                }`}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Duty Rate</div>
                  <div className={`text-3xl font-black ${
                    riskColor === 'emerald' ? 'text-emerald-400' :
                    riskColor === 'rose'    ? 'text-rose-400' :
                    riskColor === 'amber'   ? 'text-amber-400' : 'text-sky-400'
                  }`}>{result.totalRate.toFixed(1)}%</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {result.totalRate === 0 ? 'Duty-free under FTA' :
                     result.totalRate > 30  ? 'HIGH — significant cost impact' :
                     result.totalRate > 10  ? 'MODERATE — monitor exposure' : 'STANDARD MFN rate'}
                  </div>
                </div>
                {result.value > 0 && (
                  <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Duty Amount</div>
                    <div className="text-3xl font-black text-white">
                      ${result.dutyAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">on ${result.value.toLocaleString()} cargo value</div>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-white/3 border border-white/8">
                <Info size={11} className="text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Rates are representative — verify final duty with a licensed customs broker. First-sale valuation, binding rulings, and add-valorem fees (MPF, HMF) not included.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
