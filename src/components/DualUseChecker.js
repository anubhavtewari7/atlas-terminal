"use client"
import React, { useState } from 'react'
import { X, ShieldOff, AlertTriangle, CheckCircle, Search, Info, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

// ── ECCN category rules (keyword → ECCN + description) ──────────────────────
// Source: BIS Export Administration Regulations (EAR) 15 CFR Part 774
const ECCN_RULES = [
  // ── Category 0: Nuclear & Miscellaneous ──
  {
    eccn: '0A001', level: 'CONTROLLED', regime: ['NSG','NTL'],
    keywords: ['nuclear reactor','fission','enrichment','uranium','plutonium','heavy water','centrifuge cascade','nuclear fuel','subcritical assembly','nuclear weapon'],
    title: 'Nuclear reactors & equipment',
    desc: 'Export license required for virtually all destinations. BIS/DOE coordination required. Extremely restricted.',
    action: 'Do NOT export without specific DOE/BIS authorization. Legal counsel required.',
    color: 'rose',
  },
  // ── Category 1: Materials, Chemicals, Microorganisms, Toxins ──
  {
    eccn: '1C350', level: 'CONTROLLED', regime: ['CWC','AG'],
    keywords: ['chemical weapon','nerve agent','mustard gas','sarin','vx agent','tabun','precursor chemical','thiodiglycol','phosphorus trichloride','phosphorus oxychloride','triethanolamine','dimethyl methylphosphonate'],
    title: 'Chemical weapon precursors',
    desc: 'Australia Group / CWC Schedule 1-2-3 precursors. License required for all destinations.',
    action: 'License required from BIS. Contact your export compliance team immediately.',
    color: 'rose',
  },
  {
    eccn: '1C010', level: 'CONTROLLED', regime: ['NSG','MT'],
    keywords: ['carbon fiber structural','carbon fibre structural','aramid fiber composite','kevlar composite','graphite fiber aerospace','high-modulus carbon','pitch-based carbon'],
    title: 'Advanced composite materials',
    desc: 'High-performance carbon/aramid fiber for aerospace and missile applications. MT/NSG controls apply.',
    action: 'Verify end-use and end-user. License likely required for controlled countries.',
    color: 'amber',
  },
  // ── Category 2: Materials Processing ──
  {
    eccn: '2B001', level: 'CONTROLLED', regime: ['WA','NSG'],
    keywords: ['cnc machine tool','5-axis machining','multi-axis cnc','precision lathe','electrical discharge machine','edm machine','ultra-precision turning','laser cutting 0.1 micron','ion beam machining'],
    title: 'Machine tools (precision CNC)',
    desc: 'High-precision machine tools controlled under Wassenaar Arrangement. License required for certain destinations.',
    action: 'Check accuracy specifications against EAR §742.4 thresholds before export.',
    color: 'amber',
  },
  // ── Category 3: Electronics ──
  {
    eccn: '3A001', level: 'CONTROLLED', regime: ['WA'],
    keywords: ['asic defense','radiation-hardened','rad-hard','space-grade processor','high-reliability semiconductor','itar chip','defense chip','military ic','milspec ic','mil-spec semiconductor'],
    title: 'Advanced/defense electronic components',
    desc: 'Defense or space-grade electronics. Wassenaar and potentially ITAR dual-use controls.',
    action: 'Classify by performance specs. License required for many non-allied destinations.',
    color: 'amber',
  },
  {
    eccn: '3A090', level: 'POSSIBLE', regime: ['WA','CCL'],
    keywords: ['advanced chip','a100 gpu','h100 gpu','high-bandwidth memory','hbm chip','advanced ai chip','high-performance ai accelerator','neural processing unit','300mm wafer advanced'],
    title: 'Advanced computing semiconductors',
    desc: 'Recently added EAR controls (Oct 2023+) on advanced AI chips and HBM. Strict China/Russia restrictions.',
    action: 'Check BIS Entity List and October 2023 IFR rules before shipping to China, Russia, or their affiliates.',
    color: 'amber',
  },
  // ── Category 4: Computers ──
  {
    eccn: '4A003', level: 'POSSIBLE', regime: ['WA'],
    keywords: ['high performance computer','supercomputer','hpc cluster','data center gpu cluster','petaflop','exaflop','aggregate performance','top500'],
    title: 'High-performance computers',
    desc: 'Computers exceeding BIS performance thresholds require license for certain destinations.',
    action: 'Evaluate against APP thresholds in EAR Part 774, ECCN 4A003.',
    color: 'amber',
  },
  // ── Category 5: Telecommunications & Information Security ──
  {
    eccn: '5A002', level: 'POSSIBLE', regime: ['WA'],
    keywords: ['encryption hardware','cryptographic module','aes-256 hardware','hsm module','quantum key distribution','qkd system','secure communication module','fips 140','end-to-end encryption hardware','vpn appliance'],
    title: 'Encryption / information security equipment',
    desc: 'Hardware with non-standard encryption may require EAR classification and self-classification filing.',
    action: 'File annual self-classification report with BIS. May need license for embargoed countries.',
    color: 'amber',
  },
  // ── Category 7: Navigation & Avionics ──
  {
    eccn: '7A001', level: 'CONTROLLED', regime: ['WA','MT'],
    keywords: ['inertial navigation system','ins ','gyroscope high performance','accelerometer precision','navigation sensor aerospace','ring laser gyro','fiber optic gyroscope','mems imu aerospace','ins/gps integrated','attitude heading reference'],
    title: 'Inertial navigation / avionics',
    desc: 'High-accuracy INS and IMUs are Wassenaar + MTCR controlled. Often ITAR if designed for missiles.',
    action: 'Determine if ITAR or EAR applies. Most precision INS are USML Category XV or ECCN 7A001.',
    color: 'rose',
  },
  {
    eccn: '7A002', level: 'CONTROLLED', regime: ['WA','MT'],
    keywords: ['accelerometer missile','gyroscope missile','guided missile','ballistic trajectory','missile guidance','unmanned aerial vehicle payload','uav autopilot','drone guidance','range 300km','cruise missile'],
    title: 'Missile guidance components',
    desc: 'MTCR Annex Category I/II — missile guidance, cruise missiles, capable UAVs. Extreme restriction.',
    action: 'Likely ITAR USML Category IV or XV. Full State Dept licensing required. Attorney required.',
    color: 'rose',
  },
  // ── Category 9: Aerospace & Propulsion ──
  {
    eccn: '9A004', level: 'CONTROLLED', regime: ['WA','NSG','MT'],
    keywords: ['rocket engine','rocket motor','solid propellant','liquid propellant','hypersonic','re-entry vehicle','launch vehicle','space launch','orbital vehicle','sounding rocket','jet engine military'],
    title: 'Rocket / space launch propulsion',
    desc: 'Rocket engines and propulsion components. NSG, MTCR, and Wassenaar all apply.',
    action: 'ITAR or EAR depending on design. State/Commerce license mandatory for virtually all foreign recipients.',
    color: 'rose',
  },
  // ── ITAR — US Munitions List ──
  {
    eccn: 'USML', level: 'ITAR', regime: ['ITAR','USML'],
    keywords: ['itar','usml','military firearm','military weapon','m16','m4 rifle','artillery','howitzer','mortar','tank component','armored vehicle','night vision military','thermal weapon sight','military explosive','detonator','military drone','combat drone','weapon system'],
    title: 'US Munitions List (ITAR)',
    desc: 'Subject to ITAR. Export requires State Department Directorate of Defense Trade Controls (DDTC) license.',
    action: 'Register with DDTC. No export, re-export, or transfer without prior DDTC authorization. Penalties: up to $1M/violation.',
    color: 'rose',
  },
  // ── Dual-use electronics / sensors ──
  {
    eccn: '6A002', level: 'POSSIBLE', regime: ['WA'],
    keywords: ['infrared sensor','thermal imaging camera','focal plane array','fpa sensor','lidar defense','laser rangefinder','hyperspectral sensor','night vision camera','short-wave infrared','swir camera','uncooled microbolometer'],
    title: 'Sensors / lasers / thermal imaging',
    desc: 'Thermal/IR sensors with performance above EAR thresholds. Wassenaar dual-use controls.',
    action: 'Compare specs against ECCN 6A002 parameters. License likely for Russia, China, and arms-embargoed countries.',
    color: 'amber',
  },
]

// ── EAR99 positive signals (no control likely) ────────────────────────────
const EAR99_SIGNALS = [
  'commodity part','commercial off the shelf','cots','standard fastener','commercial bolt',
  'standard bearing','standard seal','packing material','foam packaging','corrugated box',
  'standard plastic part','commercial spring','standard gasket','off-the-shelf electronics',
  'consumer product','household','office furniture','clothing','apparel','food',
  'standard pump','commercial vehicle','standard wire','commercial cable',
]

function analyze(text) {
  const t = text.toLowerCase()
  const hits = []

  for (const rule of ECCN_RULES) {
    const matched = rule.keywords.filter(kw => t.includes(kw))
    if (matched.length > 0) {
      hits.push({ ...rule, matchedKeywords: matched })
    }
  }

  const ear99Signals = EAR99_SIGNALS.filter(kw => t.includes(kw))

  if (hits.length === 0) {
    // Check for general categories that suggest EAR99
    return {
      verdict: 'LIKELY EAR99',
      level: 'clear',
      hits: [],
      ear99Signals,
      summary: 'No specific export control triggers detected. This product is likely EAR99 — no license required for most destinations.',
      recommendation: 'Still recommended: screen your end-user against the Consolidated Screening List (CSL) and verify no prohibited end-use before shipping.',
    }
  }

  const hasItar   = hits.some(h => h.level === 'ITAR')
  const hasCtrl   = hits.some(h => h.level === 'CONTROLLED')
  const hasPoss   = hits.some(h => h.level === 'POSSIBLE')

  const verdict = hasItar ? 'ITAR LIKELY' : hasCtrl ? 'EAR CONTROLLED' : 'REVIEW NEEDED'
  const level   = hasItar ? 'itar' : hasCtrl ? 'controlled' : 'possible'

  return { verdict, level, hits, ear99Signals, summary: '', recommendation: '' }
}

export default function DualUseChecker({ onClose }) {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState(null)

  function run() {
    if (!description.trim()) return
    setResult(analyze(description))
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
    { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', text: 'text-emerald-400' }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto"
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
                  {result.level === 'clear'
                    ? <CheckCircle size={16} className="text-emerald-400" />
                    : <AlertTriangle size={16} className={verdictStyle.text} />}
                  <span className={`text-sm font-black uppercase tracking-widest ${verdictStyle.text}`}>
                    {result.verdict}
                  </span>
                </div>
                {result.level === 'clear' ? (
                  <>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{result.summary}</p>
                    {result.recommendation && (
                      <p className="text-[11px] text-emerald-300/70 leading-relaxed mt-1.5">{result.recommendation}</p>
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
                          matched: "{kw}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* EAR99 positive signals if mixed */}
              {result.ear99Signals.length > 0 && result.level !== 'clear' && (
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                  <div className="text-[10px] font-bold text-emerald-400 mb-1">EAR99 signals also present:</div>
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
