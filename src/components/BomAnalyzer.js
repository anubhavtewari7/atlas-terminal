"use client"
import React, { useState } from 'react'
import { X, List, AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

// ── Category risk profiles ──────────────────────────────────────────────────
const CATEGORY_PROFILES = {
  electronics: {
    label: 'Electronics / Semiconductors',
    riskLevel: 'HIGH',
    tariffRisk: 'Section 301 tariffs (25%) on Chinese-origin semiconductors and PCBs',
    primaryHub: 'Taiwan / South Korea',
    altHub: 'Vietnam / Malaysia',
    hts: '8542.31',
    mfnRate: '0%',
    tariffNote: '25% for CN-origin. Taiwan (0%), Korea (0% via KORUS)',
    esg: 'Monitor conflict mineral (3TG) disclosure — Dodd-Frank Section 1502',
    concentration: 'HIGH — TSMC/Samsung duopoly on advanced nodes',
    color: 'rose',
  },
  metals: {
    label: 'Metals / Minerals',
    riskLevel: 'HIGH',
    tariffRisk: 'Section 232 (steel 25%, aluminum 10%) + Section 301 on Chinese rare earths',
    primaryHub: 'Atacama, Chile (Li) / Pilbara, Australia (Fe)',
    altHub: 'Hebei, China (steel) — tariff risk',
    hts: '7601.10',
    mfnRate: '2.5%',
    tariffNote: 'CN-origin steel: 25% Sec 232. Li/Co from Chile/Australia: 0% AUSFTA',
    esg: 'Mining ESG critical. Cobalt from DRC — conflict mineral risk',
    concentration: 'HIGH — rare earths >85% China-sourced',
    color: 'rose',
  },
  automotive: {
    label: 'Automotive Components',
    riskLevel: 'MEDIUM',
    tariffRisk: 'USMCA content rules — 75% RVC required for zero duty',
    primaryHub: 'Monterrey, Mexico / Detroit, USA',
    altHub: 'Setubal, Portugal / Brno, Czech Republic',
    hts: '8708.99',
    mfnRate: '2.5%',
    tariffNote: '0% under USMCA with 75% RVC. MFN 2.5% otherwise.',
    esg: 'IATF 16949 certification required. Monitor supply chain human rights (EU CSDDD)',
    concentration: 'MEDIUM — multiple regional hubs available',
    color: 'amber',
  },
  industrial: {
    label: 'Industrial / Magnetics',
    riskLevel: 'HIGH',
    tariffRisk: 'NdFeB magnets from China: 25% Section 301. Rare earth export quotas.',
    primaryHub: 'Baotou, China (dominant) / Hanau, Germany',
    altHub: 'Tokyo, Japan (premium grade)',
    hts: '8505.11',
    mfnRate: '1.3%',
    tariffNote: 'CN-origin: 25-30%. Japan (CPTPP): 0%. Germany: 3.7% MFN.',
    esg: 'Rare earth mining: Very High CO2. Limited recycling at scale.',
    concentration: 'VERY HIGH — China controls ~90% NdFeB production',
    color: 'rose',
  },
  plastics: {
    label: 'Plastics / Polymers',
    riskLevel: 'MEDIUM',
    tariffRisk: 'Generally low MFN duties. EU REACH / SVHC compliance mandatory.',
    primaryHub: 'Houston, USA (Gulf Coast) / Shanghai',
    altHub: 'Rotterdam, Netherlands / Jubail, Saudi Arabia',
    hts: '3901.10',
    mfnRate: '6.5%',
    tariffNote: 'US Gulf Coast: domestic, no tariff. CN-origin polymers: 6.5% + possible 301.',
    esg: 'REACH SVHC list — 240+ restricted substances. PFAS phase-out underway.',
    concentration: 'LOW — commodity market, multiple suppliers globally',
    color: 'amber',
  },
  chemicals: {
    label: 'Chemicals / Adhesives',
    riskLevel: 'MEDIUM',
    tariffRisk: 'REACH registration required for EU imports. Dangerous goods classification.',
    primaryHub: 'Houston, USA / Rhine-Ruhr, Germany',
    altHub: 'Yangtze Delta, China / Singapore',
    hts: '3506.91',
    mfnRate: '3.7%',
    tariffNote: 'Specialty chemicals: 3.7% MFN. Dangerous goods require ADR/IMDG compliance.',
    esg: 'SDS mandatory. Monitor PFAS, phthalates, VOC emissions compliance.',
    concentration: 'LOW-MEDIUM — diversified global chemical industry',
    color: 'amber',
  },
  agriculture: {
    label: 'Agricultural / Food',
    riskLevel: 'MEDIUM',
    tariffRisk: 'SPS measures, phytosanitary certificates, country-of-origin labeling required.',
    primaryHub: 'US Midwest / Brazil Cerrado / EU AgriRegions',
    altHub: 'Southeast Asia / Argentina Pampas',
    hts: '1201.90',
    mfnRate: '0-19%',
    tariffNote: 'Ag tariffs vary widely by product. SPS compliance is the primary barrier.',
    esg: 'Deforestation risk (Amazon soy). Rainforest Alliance / RSPO certification key.',
    concentration: 'MEDIUM — weather and geopolitical concentrated risk',
    color: 'amber',
  },
  medical: {
    label: 'Medical / Pharma',
    riskLevel: 'HIGH',
    tariffRisk: 'FDA Import Alert risk (CN/IN API suppliers). DSCSA serialization required.',
    primaryHub: 'Ireland / Switzerland (pharma) / Indiana, USA',
    altHub: 'Hyderabad, India (API) / Singapore (devices)',
    hts: '3004.90',
    mfnRate: '0%',
    tariffNote: 'Most pharma duty-free under WTO pharma zero-for-zero. Regulatory compliance is the barrier.',
    esg: 'cGMP certification required. Cold chain validation mandatory for biologics.',
    concentration: 'HIGH — API single-source dependency common',
    color: 'rose',
  },
  textiles: {
    label: 'Textiles / Apparel',
    riskLevel: 'MEDIUM',
    tariffRisk: 'High MFN tariffs (12-32% apparel). Forced labor (UFLPA) ban on XJ cotton.',
    primaryHub: 'Bangladesh / Vietnam / Indonesia',
    altHub: 'Ethiopia / Honduras (CAFTA) / Turkey',
    hts: '6203.42',
    mfnRate: '17.5%',
    tariffNote: 'CAFTA: 0%. AGOA (African): 0%. Xinjiang cotton: import ban (UFLPA).',
    esg: 'UFLPA — strict Xinjiang cotton ban. Forced labor audit required.',
    concentration: 'LOW — many competitive sourcing countries',
    color: 'amber',
  },
  packaging: {
    label: 'Packaging',
    riskLevel: 'MEDIUM',
    tariffRisk: 'CN corrugated boxes: 25% Sec 301 + anti-dumping duties.',
    primaryHub: 'US Southeast / Poland / Vietnam',
    altHub: 'Mexico (USMCA) / Turkey',
    hts: '4819.10',
    mfnRate: '0%',
    tariffNote: 'CN-origin corrugated: 25-40% combined. EU EPR registration required.',
    esg: 'EU PPWD mandates recycled content. EPR registration in each EU member state.',
    concentration: 'LOW — packaging is highly regionalized',
    color: 'amber',
  },
  machinery: {
    label: 'Machinery / Equipment',
    riskLevel: 'LOW',
    tariffRisk: 'Generally low MFN duties. CN CNC machines: potential 301 exposure.',
    primaryHub: 'Germany / Japan / USA',
    altHub: 'South Korea / Taiwan',
    hts: '8457.10',
    mfnRate: '4.4%',
    tariffNote: 'EU/Japan machinery: 4.4% MFN. CN machine tools: watch for Sec 301.',
    esg: 'CE marking required for EU. Verify energy efficiency class.',
    concentration: 'LOW — Germany, Japan, US, Korea all competitive',
    color: 'emerald',
  },
}

function categorize(item) {
  const q = item.toLowerCase()
  const match = (kws) => kws.some(kw => q.includes(kw))
  if (match(['chip','semiconductor','pcb','wafer','display','oled','processor','memory','microchip','circuit','nand','dram','fpga','mcu','ic ','integrated circuit','mosfet','transistor','capacitor','resistor','inductor','connector','sensor ic'])) return 'electronics'
  if (match(['magnet','neodymium','ndfeb','ferrite magnet','actuator','solenoid','bearing','fastener','o-ring','gasket','gear','sintered'])) return 'industrial'
  if (match(['lithium','cobalt','titanium','tungsten','rare earth','steel coil','aluminum ingot','copper cathode','nickel','manganese','molybdenum','steel billet','aluminum sheet','copper wire'])) return 'metals'
  if (match(['automotive','brake','visor','headliner','dashboard','bumper','chassis','powertrain','tier-1','car seat','auto seat','door trim','interior trim','airbag','windshield','tire','tyre','exhaust','transmission','wheel','engine part'])) return 'automotive'
  if (match(['polymer','polypropylene','polyethylene','hdpe','ldpe','pvc','nylon','peek','pom','polycarbonate','polyurethane','abs plastic','plastic part','injection mold','rubber','silicone','fiberglass','composite','epoxy','plastic film'])) return 'plastics'
  if (match(['adhesive','glue','sealant','coating','paint','primer','varnish','lubricant','grease','solvent','chemical compound','surfactant','specialty chemical'])) return 'chemicals'
  if (match(['beef','meat','wheat','soybean','food','corn','chicken','grain','dairy','coffee','cocoa','sugar','rice','agricultural','agri','crop'])) return 'agriculture'
  if (match(['api ','pharmaceutical','drug','medical device','surgical','syringe','catheter','stent','implant','diagnostic','reagent','glove','mask','sterile','gmp','pharma'])) return 'medical'
  if (match(['shirt','shoe','cotton','leather','apparel','textile','clothing','garment','denim','wool','fabric','yarn','knit','woven'])) return 'textiles'
  if (match(['box','packaging','carton','label','pouch','blister','clamshell','corrugated','bottle','jar','container packaging'])) return 'packaging'
  if (match(['pump','valve','compressor','cnc','machine tool','robot','conveyor','heat exchanger','gearbox','servo','vfd','machinery','equipment','press','lathe'])) return 'machinery'
  if (match(['steel','aluminum','copper','iron','zinc','mineral','mining','metal','alloy'])) return 'metals'
  return null
}

const RISK_COLORS = {
  HIGH: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-500' },
  MEDIUM: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500' },
  LOW: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500' },
}

export default function BomAnalyzer({ onClose }) {
  const [input, setInput]   = useState('')
  const [results, setResults] = useState(null)
  const [expanded, setExpanded] = useState({})

  const analyzeBOM = () => {
    const lines = input.split(/[\n,;]/).map(l => l.trim()).filter(l => l.length > 1)
    if (!lines.length) return
    const analyzed = lines.map((item, idx) => {
      const cat = categorize(item)
      const profile = cat ? CATEGORY_PROFILES[cat] : null
      return {
        id: idx,
        item,
        category: profile?.label ?? 'Unclassified',
        riskLevel: profile?.riskLevel ?? 'UNKNOWN',
        tariffRisk: profile?.tariffRisk ?? 'Run HS Code lookup for tariff assessment.',
        primaryHub: profile?.primaryHub ?? '—',
        altHub: profile?.altHub ?? '—',
        hts: profile?.hts ?? '—',
        mfnRate: profile?.mfnRate ?? '—',
        tariffNote: profile?.tariffNote ?? '—',
        esg: profile?.esg ?? '—',
        concentration: profile?.concentration ?? '—',
        color: profile?.color ?? 'sky',
      }
    })
    setResults(analyzed)
    setExpanded({})
  }

  const summary = results ? {
    high: results.filter(r => r.riskLevel === 'HIGH').length,
    medium: results.filter(r => r.riskLevel === 'MEDIUM').length,
    low: results.filter(r => r.riskLevel === 'LOW').length,
    unknown: results.filter(r => r.riskLevel === 'UNKNOWN').length,
  } : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-2xl shadow-[0_0_80px_rgba(56,189,248,0.08)] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-500/10 border border-violet-500/20 rounded-lg flex items-center justify-center">
              <List size={18} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-violet-400 tracking-[0.2em] uppercase">BOM Risk Analyzer</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">Bill of Materials — sourcing risk, tariff exposure, concentration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* Input */}
          {!results && (
            <div className="p-6 space-y-4">
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Paste your Bill of Materials below — one item per line, or comma / semicolon separated. Atlas will score each component for tariff exposure, sourcing concentration risk, and ESG flags.
              </p>
              <textarea
                autoFocus
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`e.g.\nNdFeB permanent magnets (N52)\nLithium-ion battery cells\nInjection-molded ABS housing\nPCB assembly (8-layer)\nAluminum die casting\nBrake pad assembly\nNylon 66 connector`}
                rows={9}
                className="w-full bg-[#111] border border-white/10 px-5 py-4 text-[12px] font-mono text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500 transition-all rounded-xl resize-none leading-relaxed"
              />
              <button
                onClick={analyzeBOM}
                disabled={!input.trim()}
                className="w-full h-11 bg-violet-500 text-black font-bold text-[11px] uppercase tracking-widest hover:bg-violet-400 transition-all disabled:opacity-30 rounded-xl flex items-center justify-center gap-2"
              >
                <List size={14} /> Analyze BOM
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="p-6 space-y-4">
              {/* Summary banner */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'High Risk', count: summary.high, color: 'rose' },
                  { label: 'Medium Risk', count: summary.medium, color: 'amber' },
                  { label: 'Low Risk', count: summary.low, color: 'emerald' },
                  { label: 'Unclassified', count: summary.unknown, color: 'slate' },
                ].map((s, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${s.color === 'rose' ? 'bg-rose-500/10 border-rose-500/30' : s.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' : s.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'} text-center`}>
                    <div className={`text-[22px] font-bold font-mono ${s.color === 'rose' ? 'text-rose-400' : s.color === 'amber' ? 'text-amber-400' : s.color === 'emerald' ? 'text-emerald-400' : 'text-slate-500'}`}>{s.count}</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Item rows */}
              <div className="space-y-2">
                {results.map((r) => {
                  const rc = RISK_COLORS[r.riskLevel] || RISK_COLORS.LOW
                  const open = expanded[r.id]
                  return (
                    <div key={r.id} className={`rounded-xl border ${rc.border} overflow-hidden`}>
                      <button
                        onClick={() => setExpanded(e => ({ ...e, [r.id]: !e[r.id] }))}
                        className={`w-full flex items-center justify-between px-4 py-3 ${rc.bg} hover:brightness-110 transition-all text-left`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${rc.dot}`} />
                          <span className="text-[12px] font-mono text-white truncate">{r.item}</span>
                          <span className="text-[9px] text-slate-500 shrink-0 hidden sm:block">{r.category}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${rc.text}`}>{r.riskLevel}</span>
                          <span className="text-[10px] text-slate-600 font-mono hidden sm:block">HTS {r.hts}</span>
                          {open ? <ChevronUp size={13} className="text-slate-500" /> : <ChevronDown size={13} className="text-slate-500" />}
                        </div>
                      </button>
                      {open && (
                        <div className="px-4 py-4 bg-[#0d0d0d] border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { label: 'Tariff Risk', value: r.tariffRisk, icon: <AlertTriangle size={11} /> },
                            { label: 'Tariff Rate Note', value: r.tariffNote, icon: <Info size={11} /> },
                            { label: 'Primary Sourcing Hub', value: r.primaryHub, icon: <CheckCircle size={11} /> },
                            { label: 'Alternative Hub', value: r.altHub, icon: <Info size={11} /> },
                            { label: 'Concentration Risk', value: r.concentration, icon: <AlertTriangle size={11} /> },
                            { label: 'ESG / Compliance Flag', value: r.esg, icon: <Info size={11} /> },
                          ].map((field, fi) => (
                            <div key={fi} className="space-y-0.5">
                              <div className="text-[9px] text-slate-600 uppercase tracking-widest font-bold flex items-center gap-1">{field.icon}{field.label}</div>
                              <div className="text-[11px] text-slate-300 leading-snug">{field.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => { setResults(null); setInput('') }}
                className="w-full h-9 border border-white/10 text-slate-500 hover:text-white hover:border-white/20 text-[9px] uppercase tracking-widest rounded-xl transition-all"
              >
                Analyze new BOM
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
