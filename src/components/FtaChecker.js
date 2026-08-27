"use client"
import React, { useState } from 'react'
import { X, Leaf, CheckCircle, Info, AlertTriangle, ExternalLink, Search, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

// ── FTA database ─────────────────────────────────────────────────────────────
// Key: "origin:destination" (lowercase, sorted alphabetically where needed)
// Values: array of applicable FTAs with details

const COUNTRIES = [
  'United States', 'Canada', 'Mexico', 'China', 'Japan', 'South Korea',
  'Australia', 'United Kingdom', 'Germany', 'France', 'Netherlands',
  'Singapore', 'Vietnam', 'India', 'Brazil', 'Chile', 'Peru',
  'Colombia', 'Indonesia', 'Thailand', 'Malaysia', 'Taiwan',
  'New Zealand', 'Israel', 'Morocco', 'South Africa', 'UAE', 'Bahrain',
]

const FTA_DB = {
  'united states:canada': [
    { name: 'USMCA', full: 'United States-Mexico-Canada Agreement', since: 'Jul 2020', duty: '0%', coverage: 'Most goods', savings: 'HIGH', note: 'Zero-duty on qualifying goods. Rules of origin (RVC / tariff shift) apply. Textiles require NAFTA yarn-forward rule.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement' },
  ],
  'united states:mexico': [
    { name: 'USMCA', full: 'United States-Mexico-Canada Agreement', since: 'Jul 2020', duty: '0%', coverage: 'Most goods', savings: 'HIGH', note: 'Zero-duty on qualifying goods. Automotive sector: 75% RVC required. Strong nearshoring incentive.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement' },
  ],
  'canada:mexico': [
    { name: 'USMCA', full: 'United States-Mexico-Canada Agreement', since: 'Jul 2020', duty: '0%', coverage: 'Most goods', savings: 'HIGH', note: 'Trilateral agreement covering CA, MX, and US. Verify US-origin content rules for goods transiting through the US.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement' },
  ],
  'united states:south korea': [
    { name: 'KORUS', full: 'US–Korea Free Trade Agreement', since: 'Mar 2012', duty: '0%', coverage: '95% of US exports', savings: 'HIGH', note: 'Eliminates tariffs on 95% of US consumer and industrial products. Autos have specific rules of origin.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/korus-fta' },
  ],
  'united states:australia': [
    { name: 'AUSFTA', full: 'Australia–United States FTA', since: 'Jan 2005', duty: '0%', coverage: '99% of goods', savings: 'HIGH', note: 'Near-complete duty elimination. Agricultural goods subject to TRQs in some categories.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/australia-fta' },
  ],
  'united states:chile': [
    { name: 'US-Chile FTA', full: 'United States–Chile Free Trade Agreement', since: 'Jan 2004', duty: '0%', coverage: 'Most industrial goods', savings: 'HIGH', note: 'Full duty elimination on most goods. Copper and agricultural items have specific rules.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/chile-fta' },
  ],
  'united states:colombia': [
    { name: 'US-Colombia FTA', full: 'United States–Colombia TPA', since: 'May 2012', duty: '0%', coverage: '80%+ of goods', savings: 'MEDIUM', note: 'Eliminates tariffs on most US exports. Sensitive agricultural items phased over time.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/colombia-fta' },
  ],
  'united states:peru': [
    { name: 'US-Peru FTA', full: 'United States–Peru TPA', since: 'Feb 2009', duty: '0%', coverage: '80%+ goods', savings: 'MEDIUM', note: 'Strong tariff elimination. Labor and environmental standards included.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/peru-tpa' },
  ],
  'united states:israel': [
    { name: 'US-Israel FTA', full: 'United States–Israel Free Trade Agreement', since: '1985', duty: '0%', coverage: 'Most industrial goods', savings: 'MEDIUM', note: "America's first FTA. Near-complete industrial duty elimination. Agricultural items partially covered.", url: 'https://ustr.gov/trade-agreements/free-trade-agreements/israel-fta' },
  ],
  'united states:morocco': [
    { name: 'US-Morocco FTA', full: 'United States–Morocco FTA', since: 'Jan 2006', duty: '0%', coverage: 'Industrial goods', savings: 'MEDIUM', note: 'Full duty elimination on most industrial goods phased in. Textile and apparel with yarn-forward rule.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/morocco-fta' },
  ],
  'united states:bahrain': [
    { name: 'US-Bahrain FTA', full: 'United States–Bahrain FTA', since: 'Jan 2006', duty: '0%', coverage: 'Most goods', savings: 'MEDIUM', note: 'Eliminates tariffs on virtually all goods. Gateway to Gulf market.', url: 'https://ustr.gov/trade-agreements/free-trade-agreements/bahrain-fta' },
  ],
  'canada:united kingdom': [
    { name: 'CETA', full: 'Canada–EU Comprehensive Economic and Trade Agreement', since: 'Sep 2017', duty: '0% on 98% of goods', coverage: '98% of goods', savings: 'HIGH', note: 'Provisional application covers goods and most services. Eliminates 98% of tariff lines.', url: 'https://www.international.gc.ca/trade-commerce/trade-policy/ceta-aecg/index.aspx' },
  ],
  'canada:germany': [
    { name: 'CETA', full: 'Canada–EU CETA', since: 'Sep 2017', duty: '0% on 98% of goods', coverage: '98% of goods', savings: 'HIGH', note: 'Broad elimination of EU-Canada tariffs. Products of origin must meet EU cumulation rules.', url: 'https://www.international.gc.ca/trade-commerce/trade-policy/ceta-aecg/index.aspx' },
  ],
  'united kingdom:germany': [
    { name: 'UK-EU TCA', full: 'UK–EU Trade and Cooperation Agreement', since: 'Jan 2021', duty: '0%', coverage: 'Qualifying goods', savings: 'MEDIUM', note: 'Zero tariffs on goods meeting rules of origin. Non-tariff barriers (SPS checks, VAT) remain post-Brexit.', url: 'https://www.gov.uk/guidance/the-uk-s-trade-with-the-eu' },
  ],
  'australia:japan': [
    { name: 'JAEPA', full: 'Japan–Australia Economic Partnership Agreement', since: 'Jan 2015', duty: 'Reduced/0%', coverage: 'Agricultural & industrial goods', savings: 'HIGH', note: 'Significant agricultural tariff reductions for Australian beef, dairy. Full industrial duty elimination.', url: 'https://www.dfat.gov.au/trade/agreements/in-force/jaepa' },
  ],
  'australia:china': [
    { name: 'ChAFTA', full: 'China–Australia Free Trade Agreement', since: 'Dec 2015', duty: '0% on 95%+ of goods', coverage: '95%+ of goods', savings: 'HIGH', note: 'Major win for Australian agriculture. Beef, dairy, wine phase to zero duty. Note current political trade tensions — verify active preferences.', url: 'https://www.dfat.gov.au/trade/agreements/in-force/chafta' },
  ],
  'japan:south korea': [
    { name: 'None (bilateral)', full: 'No active Japan–Korea FTA', since: 'N/A', duty: 'MFN rates', coverage: 'None', savings: 'NONE', note: 'No bilateral FTA between Japan and South Korea. Both are RCEP members — partial preference via RCEP. Negotiate via RCEP cumulation.', url: 'https://rcepsec.org/' },
    { name: 'RCEP', full: 'Regional Comprehensive Economic Partnership', since: 'Jan 2022', duty: 'Gradual reduction', coverage: 'Wide range', savings: 'MEDIUM', note: 'RCEP provides some preferences between ASEAN+5. Tariff schedules phase down over 20 years. Use RCEP certificate of origin.', url: 'https://rcepsec.org/' },
  ],
  'china:vietnam': [
    { name: 'RCEP', full: 'Regional Comprehensive Economic Partnership', since: 'Jan 2022', duty: 'Progressive reduction', coverage: 'Broad', savings: 'MEDIUM', note: 'Both are RCEP members. Tariff elimination schedule spans 10–20 years depending on product. Useful for supply chain diversification from China to Vietnam.', url: 'https://rcepsec.org/' },
    { name: 'ASEAN-China FTA', full: 'ASEAN–China Free Trade Area', since: 'Jan 2010', duty: '0% on most goods', coverage: 'Most goods', savings: 'HIGH', note: 'Strong FTA covering most industrial and agricultural goods between China and Vietnam/ASEAN.', url: 'https://asean.org/asean-economic-community/aec-2025-monitoring/asean-plus-ftas/' },
  ],
  'singapore:vietnam': [
    { name: 'ASEAN FTA', full: 'ASEAN Free Trade Area (AFTA)', since: '1993 (updated 2010)', duty: '0–5%', coverage: 'Most goods', savings: 'HIGH', note: 'Intra-ASEAN preferential rates via CEPT/ATIGA. Near-zero rates on qualifying industrial goods.', url: 'https://asean.org' },
    { name: 'RCEP', full: 'Regional Comprehensive Economic Partnership', since: 'Jan 2022', duty: 'Progressive reduction', coverage: 'Broad', savings: 'MEDIUM', note: 'Additional framework covering both ASEAN and dialogue partners.', url: 'https://rcepsec.org/' },
  ],
  'india:uae': [
    { name: 'CEPA', full: 'India–UAE Comprehensive Economic Partnership Agreement', since: 'May 2022', duty: '0% on 80%+ goods', coverage: '80%+ of goods', savings: 'HIGH', note: "India's fastest ever negotiated FTA. Covers 97% of UAE exports to India duty-free. Strong for gold, jewelry, textiles, machinery.", url: 'https://www.commerce.gov.in/trade-agreements/cepa-india-uae/' },
  ],
  'india:japan': [
    { name: 'IJCEPA', full: 'India–Japan Comprehensive Economic Partnership Agreement', since: 'Aug 2011', duty: 'Reduced/0%', coverage: '94% of tariff lines', savings: 'HIGH', note: 'Eliminates duties on 94% of goods. Strong for Japanese auto parts, Indian pharma, textiles.', url: 'https://commerce.gov.in/trade-agreements/india-japan-cepa/' },
  ],
  'india:south korea': [
    { name: 'IKCEPA', full: 'India–Korea Comprehensive Economic Partnership Agreement', since: 'Jan 2010', duty: 'Reduced/0%', coverage: '85% of goods', savings: 'HIGH', note: 'Major tariff reductions on Korean electronics, automobiles; Indian textiles and pharma benefit.', url: 'https://commerce.gov.in/trade-agreements/india-korea-cepa/' },
  ],
}

function makePairKey(a, b) {
  const av = a.trim().toLowerCase()
  const bv = b.trim().toLowerCase()
  // Try both orderings
  return [`${av}:${bv}`, `${bv}:${av}`]
}

const SAVINGS_CONFIG = {
  HIGH: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-700/60 text-emerald-200' },
  MEDIUM: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-700/60 text-amber-200' },
  LOW: { bg: 'bg-slate-500/10', border: 'border-white/10', text: 'text-slate-400', badge: 'bg-slate-700 text-slate-300' },
  NONE: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-slate-500', badge: 'bg-slate-800 text-slate-400' },
}

export default function FtaChecker({ onClose }) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [ftas, setFtas] = useState(null)
  const [searched, setSearched] = useState(false)

  const runCheck = () => {
    if (!origin.trim() || !destination.trim()) return
    const [key1, key2] = makePairKey(origin, destination)
    const found = FTA_DB[key1] || FTA_DB[key2] || null
    setFtas(found)
    setSearched(true)
  }

  const hasFta = ftas && ftas.length > 0
  const noFta = searched && !hasFta

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-3xl rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.08)] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
              <Leaf size={18} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-emerald-400 tracking-[0.2em] uppercase">FTA Eligibility Checker</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">Free Trade Agreements · Preferential Duty Rates · Rules of Origin</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Inputs */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-[9px] text-slate-600 uppercase tracking-widest font-bold mb-1.5 block">Origin Country</label>
              <select
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[12px] text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl appearance-none"
              >
                <option value="">Select origin…</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="mt-5">
              <ArrowRight size={16} className="text-slate-600" />
            </div>
            <div className="flex-1">
              <label className="text-[9px] text-slate-600 uppercase tracking-widest font-bold mb-1.5 block">Destination Country</label>
              <select
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[12px] text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl appearance-none"
              >
                <option value="">Select destination…</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={runCheck}
            disabled={!origin || !destination || origin === destination}
            className="w-full h-11 bg-emerald-500 text-black font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-30 rounded-xl flex items-center justify-center gap-2"
          >
            <Search size={14} /> Check FTA Eligibility
          </button>

          {/* Results */}
          {searched && hasFta && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-bold">{ftas.length} FTA{ftas.length > 1 ? 's' : ''} found — {origin} → {destination}</span>
              </div>
              {ftas.map((fta, i) => {
                const sc = SAVINGS_CONFIG[fta.savings] || SAVINGS_CONFIG.MEDIUM
                return (
                  <div key={i} className={`rounded-xl border p-4 ${sc.bg} ${sc.border} space-y-3`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`text-[15px] font-bold ${sc.text}`}>{fta.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{fta.full}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest ${sc.badge}`}>{fta.savings} SAVINGS</span>
                        <span className="text-[9px] text-slate-600">Since {fta.since}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 bg-black/20 rounded-lg">
                        <div className="text-[8px] text-slate-600 uppercase mb-0.5">Preferential Duty</div>
                        <div className={`text-[13px] font-bold font-mono ${sc.text}`}>{fta.duty}</div>
                      </div>
                      <div className="p-2.5 bg-black/20 rounded-lg">
                        <div className="text-[8px] text-slate-600 uppercase mb-0.5">Coverage</div>
                        <div className="text-[12px] font-bold text-white">{fta.coverage}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{fta.note}</p>
                    <a href={fta.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] text-emerald-500 hover:underline">
                      Official Agreement Text <ExternalLink size={10} />
                    </a>
                  </div>
                )
              })}
            </div>
          )}

          {noFta && (
            <div className="p-5 bg-amber-500/8 border border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-amber-400" />
                <span className="text-[11px] text-amber-400 font-bold">No FTA Found — {origin} → {destination}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                No direct or indirect free trade agreement is recorded in the Atlas database for this pair.
                Standard MFN (Most Favored Nation) tariff rates apply. Consider sourcing via a third country that does have an FTA with the destination.
              </p>
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-[9px] text-slate-500 font-bold uppercase mb-2">Alternative Strategies</div>
                <ul className="text-[10px] text-slate-400 space-y-1">
                  <li>• <strong className="text-white">RCEP</strong> — check if both countries are members (covers 15 Asia-Pacific nations)</li>
                  <li>• <strong className="text-white">GSP</strong> — Generalized System of Preferences for developing-country exporters</li>
                  <li>• <strong className="text-white">Tariff engineering</strong> — slightly modify product to shift HS code to a lower-duty bracket</li>
                  <li>• <strong className="text-white">FTZ routing</strong> — process goods via a free trade zone to optimize duty exposure</li>
                </ul>
              </div>
            </div>
          )}

          {/* Info about RoO */}
          {searched && hasFta && (
            <div className="p-3.5 bg-[#0f0f0f] border border-white/8 rounded-xl">
              <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Info size={10} /> Rules of Origin Requirements</div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                To claim FTA preferential rates, goods must satisfy the agreement&apos;s rules of origin. Common tests: <strong className="text-slate-300">Regional Value Content (RVC)</strong> (e.g., 35-60% of value from origin country), <strong className="text-slate-300">Tariff Classification Change (TCC)</strong> (input and output HS codes must differ at specified digit level), or <strong className="text-slate-300">Substantial Transformation</strong>. Request a <strong className="text-slate-300">Certificate of Origin</strong> from your supplier and verify with a trade attorney for high-value shipments.
              </p>
            </div>
          )}

          {!searched && (
            <div className="text-center py-6 text-slate-700 text-[11px] font-mono">
              Select origin and destination to check applicable free trade agreements and duty savings
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
