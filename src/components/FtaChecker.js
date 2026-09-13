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
  'Brunei', 'Myanmar', 'Philippines', 'Cambodia',
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

  // ── CPTPP (Comprehensive and Progressive Agreement for Trans-Pacific Partnership) ──
  // Members: Australia, Brunei, Canada, Chile, Japan, Malaysia, Mexico, NZ, Peru, Singapore, Vietnam
  // UK acceded Jan 2024. US is NOT a member.
  'australia:canada': [
    { name: 'CPTPP', full: 'Comprehensive and Progressive Agreement for Trans-Pacific Partnership', since: 'Dec 2018', duty: '0% (phased)', coverage: 'Most goods', savings: 'HIGH', note: 'Both are CPTPP members. Tariff elimination on most industrial and agricultural goods. Verify HS code against each party\'s tariff schedule.', url: 'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-in-force/cptpp/' },
  ],
  'australia:vietnam': [
    { name: 'CPTPP', full: 'Comprehensive and Progressive Agreement for Trans-Pacific Partnership', since: 'Jan 2019 (VN)', duty: '0% (phased)', coverage: 'Most goods', savings: 'HIGH', note: 'Vietnam is a founding CPTPP member. Strong for Australian agriculture (beef, dairy, wine) and Vietnamese textiles/apparel.', url: 'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-in-force/cptpp/' },
    { name: 'ASEAN-Australia-NZ FTA', full: 'ASEAN–Australia–New Zealand FTA (AANZFTA)', since: 'Jan 2010', duty: 'Reduced/0%', coverage: 'Most goods', savings: 'MEDIUM', note: 'Broad elimination of tariffs between ASEAN and Australia/NZ. Verify cumulation rules for goods with regional content.', url: 'https://www.dfat.gov.au/trade/agreements/in-force/aanzfta' },
  ],
  'canada:vietnam': [
    { name: 'CPTPP', full: 'Comprehensive and Progressive Agreement for Trans-Pacific Partnership', since: 'Dec 2018 (CA) / Jan 2019 (VN)', duty: '0% (phased)', coverage: 'Most goods', savings: 'HIGH', note: 'Both are CPTPP members. Vietnam eliminated tariffs on most Canadian goods; Canada phased duties on Vietnamese apparel and footwear.', url: 'https://www.canada.ca/en/global-affairs/news/2018/12/canada-and-the-comprehensive-and-progressive-agreement-for-trans-pacific-partnership.html' },
  ],
  'japan:vietnam': [
    { name: 'CPTPP', full: 'Comprehensive and Progressive Agreement for Trans-Pacific Partnership', since: 'Dec 2018', duty: '0% (phased)', coverage: 'Most goods', savings: 'HIGH', note: 'Both founding CPTPP members. Strong for Japanese machinery/auto parts into Vietnam and Vietnamese seafood/textiles into Japan.', url: 'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-in-force/cptpp/' },
    { name: 'AJCEP', full: 'ASEAN–Japan Comprehensive Economic Partnership', since: 'Dec 2008', duty: 'Reduced/0%', coverage: 'Industrial & agricultural goods', savings: 'MEDIUM', note: 'Framework covering Japan and all ASEAN members. Goods must meet cumulative ASEAN-Japan origin rules.', url: 'https://www.mofa.go.jp/policy/economy/fta/asean.html' },
  ],
  'japan:malaysia': [
    { name: 'CPTPP', full: 'Comprehensive and Progressive Agreement for Trans-Pacific Partnership', since: 'Sep 2022 (MY)', duty: '0% (phased)', coverage: 'Most goods', savings: 'HIGH', note: 'Malaysia ratified CPTPP in Sep 2022. Tariff elimination phased over 11 years for sensitive goods.', url: 'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-in-force/cptpp/' },
    { name: 'JMJEPA', full: 'Japan–Malaysia Economic Partnership Agreement', since: 'Jul 2006', duty: 'Reduced/0%', coverage: 'Most industrial goods', savings: 'HIGH', note: 'Bilateral EPA covering electronics, automobiles, machinery. Agricultural goods partially covered.', url: 'https://www.mofa.go.jp/policy/economy/fta/malaysia.html' },
  ],
  'united kingdom:australia': [
    { name: 'UK-Australia FTA', full: 'UK–Australia Free Trade Agreement', since: 'May 2023', duty: '0%', coverage: '99% of goods', savings: 'HIGH', note: 'UK\'s first major post-Brexit bilateral FTA. Full tariff elimination on 99% of goods. Strong for Australian beef, lamb, dairy, wine; UK cars and Scotch whisky.', url: 'https://www.gov.uk/guidance/uk-australia-free-trade-agreement-the-uk-s-approach' },
  ],
  'united kingdom:new zealand': [
    { name: 'UK-NZ FTA', full: 'UK–New Zealand Free Trade Agreement', since: 'Feb 2024', duty: '0%', coverage: '99.5% of goods', savings: 'HIGH', note: 'In force Feb 2024. Near-complete tariff elimination. Strong for NZ dairy, meat, wine; UK machinery and services.', url: 'https://www.gov.uk/guidance/uk-new-zealand-free-trade-agreement' },
  ],

  // ── EU bilateral FTAs (accessed via any EU member state e.g. Germany, France, Netherlands) ──
  'germany:vietnam': [
    { name: 'EVFTA', full: 'EU–Vietnam Free Trade Agreement', since: 'Aug 2020', duty: '0% (99% of goods over 10 yrs)', coverage: '99% of goods', savings: 'HIGH', note: 'EU eliminates 99% of tariffs on Vietnamese goods over 10 years. Vietnam eliminates 65% of EU tariffs immediately, rest phased. Strong for Vietnamese electronics, textiles, footwear.', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/vietnam_en' },
  ],
  'france:vietnam': [
    { name: 'EVFTA', full: 'EU–Vietnam Free Trade Agreement', since: 'Aug 2020', duty: '0% (phased)', coverage: '99% of goods', savings: 'HIGH', note: 'All EU member states benefit from EVFTA. Vietnam is a key beneficiary for apparel, electronics, and seafood exports to Europe.', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/vietnam_en' },
  ],
  'netherlands:vietnam': [
    { name: 'EVFTA', full: 'EU–Vietnam Free Trade Agreement', since: 'Aug 2020', duty: '0% (phased)', coverage: '99% of goods', savings: 'HIGH', note: 'Rotterdam is the primary EU entry port for Vietnamese goods. EVFTA eliminates most tariffs over 7-10 years.', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/vietnam_en' },
  ],
  'germany:south korea': [
    { name: 'EU-Korea FTA', full: 'EU–South Korea Free Trade Agreement', since: 'Jul 2011', duty: '0%', coverage: '98.7% of goods', savings: 'HIGH', note: 'First EU FTA in Asia. Near-complete tariff elimination. Strong for Korean electronics, cars; EU machinery, pharma, chemicals. Cumulation with other EU members applies.', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/south-korea_en' },
  ],
  'germany:japan': [
    { name: 'JEFTA', full: 'Japan–EU Economic Partnership Agreement', since: 'Feb 2019', duty: '0% on 97% of goods', coverage: '97% of goods', savings: 'HIGH', note: 'World\'s largest bilateral FTA by GDP. Eliminates 97% of EU tariffs on Japanese goods. Strong for Japanese cars, electronics; EU beef, dairy, wine, cheese.', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/japan_en' },
  ],
  'germany:singapore': [
    { name: 'EUSFTA', full: 'EU–Singapore Free Trade Agreement', since: 'Nov 2019', duty: '0%', coverage: '84% of goods (rising to 100%)', savings: 'HIGH', note: 'First EU FTA with an ASEAN country. 84% of tariffs eliminated immediately, remainder phased over 5 years. Singapore as a regional hub means indirect access to ASEAN.', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/singapore_en' },
  ],
  'germany:canada': [
    { name: 'CETA', full: 'Canada–EU Comprehensive Economic and Trade Agreement', since: 'Sep 2017', duty: '0% on 98% of goods', coverage: '98% of goods', savings: 'HIGH', note: 'Provisional application in force since 2017. Eliminates 98% of tariff lines. Full ratification still pending in some EU member states but goods trade fully covered.', url: 'https://www.international.gc.ca/trade-commerce/trade-policy/ceta-aecg/index.aspx' },
  ],
  'france:canada': [
    { name: 'CETA', full: 'Canada–EU Comprehensive Economic and Trade Agreement', since: 'Sep 2017', duty: '0% on 98% of goods', coverage: '98% of goods', savings: 'HIGH', note: 'CETA applies to all EU member states. Broad tariff elimination for industrial goods, significant agricultural preferences.', url: 'https://www.international.gc.ca/trade-commerce/trade-policy/ceta-aecg/index.aspx' },
  ],

  // ── US–Vietnam: no bilateral FTA, but note relevant frameworks ──
  'united states:vietnam': [
    { name: 'No bilateral FTA', full: 'No US–Vietnam Free Trade Agreement', since: 'N/A', duty: 'MFN rates (column 1)', coverage: 'None', savings: 'NONE', note: 'The US is NOT a CPTPP member and has no bilateral FTA with Vietnam. Standard MFN rates apply. GSP expired in 2020 and has not been renewed for Vietnam. Consider CPTPP routing via Canada or Mexico for potential duty relief on qualifying origin goods.', url: 'https://ustr.gov/countries-regions/southeast-asia-pacific/vietnam' },
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
        className="bg-[#080808] border border-white/10 w-full max-w-3xl rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.08)] max-h-[90vh] overflow-y-auto pb-24 md:pb-6"
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
              <label className="text-[10px] text-slate-600 uppercase tracking-widest font-bold mb-1.5 block">Origin Country</label>
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
              <label className="text-[10px] text-slate-600 uppercase tracking-widest font-bold mb-1.5 block">Destination Country</label>
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
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest ${sc.badge}`}>{fta.savings} SAVINGS</span>
                        <span className="text-[10px] text-slate-600">Since {fta.since}</span>
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
                No direct or indirect free trade agreement is recorded in the Nautilus database for this pair.
                Standard MFN (Most Favored Nation) tariff rates apply. Consider sourcing via a third country that does have an FTA with the destination.
              </p>
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Alternative Strategies</div>
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
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Info size={10} /> Rules of Origin Requirements</div>
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
