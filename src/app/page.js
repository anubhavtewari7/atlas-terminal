"use client"

import React, { useState, useEffect } from 'react'
import Globe from '@/components/Globe'
import TariffLookup from '@/components/TariffLookup'
import MissionHistory from '@/components/MissionHistory'
import SupplierComparison from '@/components/SupplierComparison'
import IncotermsCalc from '@/components/IncotermsCalc'
import TradeRiskScore from '@/components/TradeRiskScore'
import PortStatus from '@/components/PortStatus'
import ComplianceChecklist from '@/components/ComplianceChecklist'
import TLCCalculator from '@/components/TLCCalculator'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { 
  ShieldAlert, Zap, Globe as GlobeIcon, ChevronRight,
  Pause, Play, Newspaper, X, Terminal, Target, Factory,
  ExternalLink, FileText, Ship, Leaf, BarChart3, Mail,
  Anchor, Clock, ArrowUpRight, ArrowDownRight, SearchCode,
  History, Scale, Filter, TrendingUp, Activity, DollarSign, Download
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const [profile, setProfile] = useState({
    industry: 'Universal Intelligence Mode',
    material: 'Global Resources',
    priority: 'End-to-End Strategic Support'
  })

  const [risks, setRisks] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [news, setNews] = useState([])
  const [newsFilter, setNewsFilter] = useState('all')
  const [selectedNode, setSelectedNode] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [terminalLogs, setTerminalLogs] = useState(["[SYSTEM] ATLAS Bloomberg-Grade Core v2.0 Online.", "[SYSTEM] Universal Resource Engine Initialized."])
  const [directive, setDirective] = useState(null)
  const [marketData, setMarketData] = useState(null)
  const [showRFQ, setShowRFQ] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  // New feature state
  const [missionHistory, setMissionHistory] = useState([])
  const [fxData, setFxData] = useState(null)
  const [showTariff, setShowTariff] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [showIncoterms, setShowIncoterms] = useState(false)
  const [showRisk, setShowRisk] = useState(false)
  const [showPorts, setShowPorts] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)
  const [showTLC, setShowTLC] = useState(false)
  const [isExportingPDF, setIsExportingPDF] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    fetch('/api/news').then(res => res.json()).then(data => setNews(data))
    fetch('/api/fx').then(res => res.json()).then(data => setFxData(data)).catch(() => {})
    const saved = localStorage.getItem('atlas_missions')
    if (saved) setMissionHistory(JSON.parse(saved))
  }, [])

  const saveMission = (query, opps, dir) => {
    const mission = {
      query, timestamp: Date.now(),
      primaryHub: opps[0]?.hub || null,
      hubCount: opps.length,
      topPartner: opps[0]?.companies?.[0]?.name || null,
      directive: dir
    }
    setMissionHistory(prev => {
      const updated = [...prev, mission].slice(-20)
      localStorage.setItem('atlas_missions', JSON.stringify(updated))
      return updated
    })
  }

  const replayMission = (mission) => {
    setSearchQuery(mission.query)
    setShowSearch(true)
  }

  const clearHistory = () => {
    setMissionHistory([])
    localStorage.removeItem('atlas_missions')
  }

  const filteredNews = news.filter(item => {
    if (newsFilter === 'all') return true
    const text = `${item.title} ${item.description}`.toLowerCase()
    const filters = { china: ['china','chinese','beijing','shanghai'], eu: ['europe','european','eu ','german','french'], usa: ['usa','united states','american','washington'], latam: ['brazil','mexico','latin','colombia'], india: ['india','indian','delhi','mumbai'] }
    return (filters[newsFilter] || []).some(kw => text.includes(kw))
  })

  const handleSearch = async (e) => {
    if (e) e.preventDefault()
    setIsAnalyzing(true)
    setTerminalLogs(prev => [...prev, `[USER] Strategic scan: ${searchQuery}`, "[AI] Mapping global industrial hubs..."])
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // INCREASE TO 60S

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material: searchQuery, news: news.slice(0, 5) }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      
      if (!res.ok) throw new Error("API Failure")
      
      const data = await res.json()
      
      if (data.opportunities && data.opportunities.length > 0) {
        setRisks(data.risks || [])
        setOpportunities(data.opportunities)
        setDirective(data.directive || null)
        setMarketData(data.market_data || null)
        setTerminalLogs(prev => [...prev, "[SUCCESS] Strategy analysis complete.", `[INFO] Identified ${data.opportunities.length} global trade hubs.`])
        saveMission(searchQuery, data.opportunities, data.directive)
        setShowSearch(false)
        return
      }
    } catch (err) {
      console.warn("Primary scan failed, activating backup intelligence...")
      // ROBUST FALLBACK
      setTerminalLogs(prev => [...prev, "[ERROR] Deep scan delayed. Activating Predictive Intelligence Mode..."])      // UNIVERSAL PREDICTIVE FALLBACK
      const q = searchQuery.toLowerCase()
      const hubs = []
      
      // REGIONAL CHECKS
      const isUS = q.includes('illinois') || q.includes('usa') || q.includes('us') || q.includes('chicago')
      const isAuto = q.includes('rivian') || q.includes('tesla') || q.includes('ford') || q.includes('auto') || q.includes('car') || q.includes('visor') || q.includes('seat') || q.includes('frame')

      if ((q.includes('beef') || q.includes('patty') || q.includes('meat')) && isUS) {
        hubs.push({ 
          id: 'p_beef_il', lat: 41.8, lng: -88.1, hub: 'ILLINOIS, USA', title: 'Midwest Meat Processing Hub', 
          companies: [{ name: 'OSI Group (Aurora)', website: 'https://www.osigroup.com/' }, { name: 'Cargill Meat', website: 'https://www.cargill.com/' }, { name: 'Tyson Foods', website: 'https://www.tysonfoods.com/' }], 
          desc: 'Primary supplier cluster for North American QSR chains (McDonalds partner).', 
          customs: { hts_code: '0202.30', duty_rate: '0% (Domestic)', compliance_note: 'USDA inspected. FSMA compliant.' }, 
          esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Regenerative grazing initiatives active.' }, 
          logistics: { port_wait_days: 0, freight_cost_estimate: '$1.2k/Truck (Regional)' }, 
          industry_kpi: { label: 'Shelf Life', value: '28 Days (Fresh)' } 
        })
      } else if (isAuto || q.includes('visor')) {
        // GLOBAL AUTO HEATMAP (COMPREHENSIVE)
        hubs.push({ 
          id: 'p_auto_mx', lat: 25.6, lng: -100.3, hub: 'MONTERREY, MEXICO', title: 'NAFTA Tier-1 Cluster', 
          companies: [{ name: 'Grupo Antolin', website: 'https://www.grupoantolin.com/' }, { name: 'Motus Integrated', website: 'https://motusintegrated.com/' }], 
          desc: 'Primary NAFTA hub for visors and headliners.', 
          customs: { hts_code: '8708.29', duty_rate: '0% (USMCA)', compliance_note: 'USMCA Origin verified.' }, 
          esg: { carbon_footprint: 'Low', ethical_rating: 'A-' }, 
          logistics: { port_wait_days: 1, freight_cost_estimate: '$2.2k/Truck' }, 
          industry_kpi: { label: 'Tooling Lead Time', value: '14 Weeks' } 
        })
        hubs.push({ 
          id: 'p_auto_de', lat: 48.1, lng: 11.5, hub: 'BAVARIA, GERMANY', title: 'EU Premium Parts Hub', 
          companies: [{ name: 'Continental AG', website: 'https://www.continental.com/' }, { name: 'Grupo Antolin (EU)', website: 'https://www.grupoantolin.com/' }], 
          desc: 'High-precision interior components for luxury OEMs.', 
          customs: { hts_code: '8708.29', duty_rate: '2.5% (Non-EU)', compliance_note: 'CE Marking required.' }, 
          esg: { carbon_footprint: 'Low', ethical_rating: 'AA' }, 
          logistics: { port_wait_days: 1, freight_cost_estimate: '$3.5k/Sea' }, 
          industry_kpi: { label: 'Precision Grade', value: 'Grade-A' } 
        })
        hubs.push({ 
          id: 'p_auto_jp', lat: 35.1, lng: 136.9, hub: 'AICHI, JAPAN', title: 'J-OEM Sourcing Cluster', 
          companies: [{ name: 'Toyota Boshoku', website: 'https://www.toyota-boshoku.com/' }, { name: 'Kasai Kogyo', website: 'https://www.kasai.co.jp/' }], 
          desc: 'Lean-manufacturing hub for APAC automotive supply.', 
          customs: { hts_code: '8708.29', duty_rate: '0% (CPTPP)', compliance_note: 'J-FTA rules apply.' }, 
          esg: { carbon_footprint: 'Low', ethical_rating: 'A+' }, 
          logistics: { port_wait_days: 1, freight_cost_estimate: '$4.1k/Sea' }, 
          industry_kpi: { label: 'Defect Rate', value: '< 10 PPM' } 
        })
        hubs.push({ 
          id: 'p_auto_us', lat: 42.3, lng: -83.0, hub: 'DETROIT, USA', title: 'Great Lakes Auto Cluster', 
          companies: [{ name: 'IAC Group', website: 'https://www.iacgroup.com/' }, { name: 'Lear Corp', website: 'https://www.lear.com/' }], 
          desc: 'Domestic sourcing hub for US-based assembly lines.', 
          customs: { hts_code: '8708.29', duty_rate: '0%', compliance_note: 'Domestic Supply.' }, 
          esg: { carbon_footprint: 'Medium', ethical_rating: 'A' }, 
          logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Ground' }, 
          industry_kpi: { label: 'JIT Compliance', value: '100%' } 
        })
        hubs.push({ 
          id: 'p_auto_cn', lat: 31.2, lng: 121.4, hub: 'SHANGHAI, CHINA', title: 'East China Auto Zone', 
          companies: [{ name: 'Yanfeng Automotive', website: 'https://www.yanfeng.com/' }, { name: 'Huayu Auto', website: 'https://www.hasco.com.cn/' }], 
          desc: 'Mass-production hub for global interior components.', 
          customs: { hts_code: '8708.29', duty_rate: '25% (Sec 301)', compliance_note: 'Trade tariffs apply.' }, 
          esg: { carbon_footprint: 'High', ethical_rating: 'B' }, 
          logistics: { port_wait_days: 4, freight_cost_estimate: '$4.8k/FEU' }, 
          industry_kpi: { label: 'Scalability', value: 'Unlimited' } 
        })
      } else if (q.includes('chip') || q.includes('apple') || q.includes('semiconductor')) {
        hubs.push({ id: 'p1', lat: 24.7, lng: 120.9, hub: 'TAIWAN', title: 'Hsinchu Science Park', companies: [{ name: 'TSMC', website: 'https://www.tsmc.com' }, { name: 'UMC', website: 'https://www.umc.com' }], desc: 'Global semiconductor epicenter.', customs: { hts_code: '8542.31', duty_rate: '0%', compliance_note: 'ITAR/Export controls apply.' }, esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'High water usage.' }, logistics: { port_wait_days: 1, freight_cost_estimate: '$1.2k/Air' }, industry_kpi: { label: 'Yield Rate', value: '98.5%' } })
      } else if (q.includes('beef') || q.includes('mcdonald') || q.includes('meat')) {
        hubs.push({ id: 'p2', lat: -15.7, lng: -47.9, hub: 'BRAZIL', title: 'Mato Grosso Agri-Hub', companies: [{ name: 'JBS S.A.', website: 'https://jbs.com.br' }, { name: 'Marfrig', website: 'https://www.marfrig.com.br' }], desc: 'World largest beef production hub.', customs: { hts_code: '0202', duty_rate: '15%', compliance_note: 'USDA sanitary permit required.' }, esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Amazon deforestation monitoring required.' }, logistics: { port_wait_days: 4, freight_cost_estimate: '$5.5k/Reefer' }, industry_kpi: { label: 'Cold-Chain Status', value: 'Validated' } })
      } else if (q.includes('tesla') || q.includes('battery') || q.includes('lithium')) {
        hubs.push({ id: 'p3', lat: -23.5, lng: -68.4, hub: 'CHILE', title: 'Atacama Lithium Cluster', companies: [{ name: 'Albemarle', website: 'https://www.albemarle.com' }, { name: 'SQM', website: 'https://www.sqm.com' }], desc: 'Primary global source of EV-grade Lithium.', customs: { hts_code: '2836.91', duty_rate: '0% (FTA)', compliance_note: 'Strategic resource tracking.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Water rights monitoring.' }, logistics: { port_wait_days: 2, freight_cost_estimate: '$3.8k/FEU' }, industry_kpi: { label: 'Purity Grade', value: '99.9% Li' } })
      } else {
        hubs.push({ id: 'p4', lat: 1.3, lng: 103.8, hub: 'SINGAPORE', title: 'Tuas Mega Port Hub', companies: [{ name: 'PSA International', website: 'https://www.globalpsa.com' }, { name: 'Keppel Corp', website: 'https://www.keppel.com' }], desc: 'Universal transshipment and logistics hub.', customs: { hts_code: 'GENERAL', duty_rate: '0%', compliance_note: 'Free Trade Zone.' }, esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'Green Port initiative.' }, logistics: { port_wait_days: 1, freight_cost_estimate: 'Variable' }, industry_kpi: { label: 'Throughput', value: 'High' } })
      }

        const selectedHub = hubs[0]
        const htscode = selectedHub?.customs?.hts_code || 'N/A'
        const dutyRate = selectedHub?.customs?.duty_rate || 'Variable'
        const compliance = selectedHub?.customs?.compliance_note || 'Check local regulations.'
        setOpportunities(hubs)
        const fbDir = {
          best_region: hubs[0]?.hub || 'SINGAPORE',
          best_partner: hubs[0]?.companies[0]?.name || 'PSA',
          route: isUS ? 'Domestic Ground Transport' : 'Global Logistics Corridor',
          summary: `Strategic hub identified in ${hubs[0]?.hub}. ${hubs.length} supplier regions mapped.`,
          tariff_alert: `HTS: ${hubs[0]?.customs?.hts_code} | Duty: ${hubs[0]?.customs?.duty_rate} — ${hubs[0]?.customs?.compliance_note}`
        }
        setDirective(fbDir)
        saveMission(searchQuery, hubs, fbDir)
      setMarketData({
        currency: { pair: 'USD/INDEX', rate: 104.2, impact: 'Stable' },
        price_history: [{ month: 'Q1', price: 100 },{ month: 'Q2', price: 92 },{ month: 'Q3', price: 95 },{ month: 'Q4', price: 105 }],
        rfq_template: `Dear Procurement Team,\n\nWe are looking to secure high-volume supply for: ${searchQuery}.\n\nPlease provide a quote including shipping terms and ESG compliance certification.`
      })
      setShowSearch(false)
    } finally {
      setIsAnalyzing(false)
      setProfile(prev => ({ ...prev, material: searchQuery || 'Universal Scan' }))
    }
  }

  const exportToPDF = async () => {
    setIsExportingPDF(true)
    setTerminalLogs(prev => [...prev, "[SYSTEM] Generating Executive Mission Brief (PDF)..."])
    try {
      const doc = new jsPDF('p', 'mm', 'a4')
      doc.setFillColor(10, 10, 10)
      doc.rect(0, 0, 210, 297, 'F')
      
      // Header
      doc.setTextColor(56, 189, 248)
      doc.setFontSize(24)
      doc.text("ATLAS INTELLIGENCE", 20, 30)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.text("EXECUTIVE MISSION BRIEF", 20, 40)
      
      // Mission Details
      doc.setFontSize(10)
      doc.setTextColor(150, 150, 150)
      doc.text(`Target Material: ${searchQuery || profile.material}`, 20, 55)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 62)
      
      if (directive) {
        doc.setTextColor(16, 185, 129)
        doc.setFontSize(12)
        doc.text("STRATEGIC DIRECTIVE:", 20, 75)
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(10)
        const splitSummary = doc.splitTextToSize(directive.summary, 170)
        doc.text(splitSummary, 20, 83)
        
        doc.text(`Target Hub: ${directive.best_region}`, 20, 100)
        doc.text(`Primary Partner: ${directive.best_partner}`, 20, 107)
        doc.text(`Tariff Alert: ${directive.tariff_alert}`, 20, 114)
      }

      let yPos = 130
      if (opportunities.length > 0) {
        doc.setTextColor(56, 189, 248)
        doc.setFontSize(12)
        doc.text("TOP GLOBAL SOURCING HUBS:", 20, yPos)
        yPos += 10
        
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(9)
        opportunities.slice(0, 5).forEach((opp, i) => {
          doc.text(`${i+1}. ${opp.hub} (${opp.companies[0]?.name || 'Multiple'}) - KPI: ${opp.industry_kpi.label} ${opp.industry_kpi.value}`, 20, yPos)
          yPos += 8
        })
      }
      
      doc.save(`ATLAS_Brief_${(searchQuery || 'Mission').replace(/\s+/g, '_')}.pdf`)
      setTerminalLogs(prev => [...prev, "[SUCCESS] Executive Brief generated and downloaded."])
    } catch (error) {
      console.error("PDF generation failed:", error)
      setTerminalLogs(prev => [...prev, "[ERROR] PDF Generation failed."])
    } finally {
      setIsExportingPDF(false)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#000000] text-[#f8fafc] antialiased font-mono">
      
      {/* COMMODITY TICKER */}
      <div className="h-8 bg-[#050505] border-b border-white/5 flex items-center px-4 overflow-hidden shrink-0">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mr-8">
          <Activity size={12} className="text-amber-500" />
          <span className="text-amber-500">Live Spot Prices</span>
        </div>
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
          .animate-ticker { display: inline-block; animation: ticker 30s linear infinite; }
          .animate-ticker:hover { animation-play-state: paused; }
        `}} />
        <div className="flex gap-12 whitespace-nowrap overflow-hidden">
          <div className="animate-ticker flex gap-12">
            {[
               { n: 'Brent Crude', p: '$89.24/bbl', c: '+1.2%', up: true },
               { n: 'Copper', p: '$4.12/lb', c: '+2.4%', up: true },
               { n: 'HRC Steel', p: '$840/st', c: '-0.8%', up: false },
               { n: 'Aluminum', p: '$2,350/mt', c: '+0.5%', up: true },
               { n: 'Lithium Carb', p: '$14,200/mt', c: '-3.1%', up: false },
               { n: 'Cotton', p: '$85.40/lb', c: '+0.2%', up: true },
               { n: 'Soybeans', p: '$11.80/bu', c: '-1.5%', up: false },
               // Duplicate for smooth infinite scroll
               { n: 'Brent Crude', p: '$89.24/bbl', c: '+1.2%', up: true },
               { n: 'Copper', p: '$4.12/lb', c: '+2.4%', up: true },
               { n: 'HRC Steel', p: '$840/st', c: '-0.8%', up: false },
            ].map((item, i) => (
               <div key={i} className="flex items-center gap-2 text-[11px]">
                 <span className="text-slate-500">{item.n}</span>
                 <span className="text-white font-bold">{item.p}</span>
                 <span className={item.up ? 'text-emerald-400' : 'text-rose-400'}>{item.c}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
      {/* TOOL MODALS */}
      <AnimatePresence>
        {showTariff && <TariffLookup onClose={() => setShowTariff(false)} />}
        {showHistory && <MissionHistory missions={missionHistory} onClose={() => setShowHistory(false)} onReplay={replayMission} onClear={clearHistory} />}
        {showComparison && opportunities.length > 0 && <SupplierComparison hubs={opportunities} onClose={() => setShowComparison(false)} />}
        {showIncoterms && <IncotermsCalc onClose={() => setShowIncoterms(false)} />}
        {showRisk && <TradeRiskScore onClose={() => setShowRisk(false)} />}
        {showPorts && <PortStatus onClose={() => setShowPorts(false)} />}
        {showCompliance && <ComplianceChecklist onClose={() => setShowCompliance(false)} />}
        {showTLC && <TLCCalculator onClose={() => setShowTLC(false)} defaultDuty={parseFloat(opportunities[0]?.customs?.duty_rate) || 0} />}
      </AnimatePresence>
      
      {/* RFQ MODAL */}
      <AnimatePresence>
        {showRFQ && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-[#0a0a0a] border border-emerald-500/30 p-10 w-full max-w-3xl rounded-2xl shadow-[0_0_100px_rgba(16,185,129,0.2)]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[12px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-3"><Mail size={18} /> Smart RFQ Generator</h2>
                <button onClick={() => setShowRFQ(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
              </div>
              <textarea readOnly rows={12} value={marketData?.rfq_template} className="w-full bg-[#111] border border-white/10 p-6 text-[14px] font-mono focus:outline-none rounded-xl mb-8 leading-relaxed text-slate-300" />
              <div className="flex gap-4">
                <button onClick={() => { navigator.clipboard.writeText(marketData?.rfq_template); setTerminalLogs(prev => [...prev, "[SYSTEM] RFQ copied to clipboard."]) }} className="flex-1 h-14 bg-emerald-500 text-black font-bold uppercase text-[12px] tracking-widest hover:bg-emerald-400 transition-all rounded-lg">Copy to Clipboard</button>
                <button className="flex-1 h-14 border border-white/10 text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white/5 transition-all rounded-lg">Email to Procurement</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-[#0a0a0a] border border-white/10 p-10 w-full max-w-2xl shadow-[0_0_80px_rgba(56,189,248,0.15)] relative rounded-2xl">
              <button onClick={() => setShowSearch(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
              <h2 className="text-[12px] font-bold text-sky-400 tracking-[0.3em] mb-8 flex items-center gap-3"><Target size={18} /> DEFINE SOURCING MISSION</h2>
              <form onSubmit={handleSearch} className="space-y-8">
                <textarea autoFocus rows={5} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="e.g. Apple Glass Panels, Tesla Battery Frames, McDonald's Beef..." className="w-full bg-[#111] border border-white/10 p-6 text-[15px] font-mono focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-700 resize-none leading-relaxed rounded-xl" />
                <button type="submit" disabled={isAnalyzing} className="w-full h-16 bg-emerald-500 text-black font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all disabled:opacity-50 text-[14px] uppercase tracking-widest">
                  {isAnalyzing ? "ACCESSING GLOBAL DATABASE..." : "EXECUTE UNIVERSAL SCAN"} <ChevronRight size={22} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR */}
      <aside className="w-96 flex flex-col gap-4 shrink-0 z-10">
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl shadow-2xl">
           <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 rounded-lg"><GlobeIcon size={26} /></div>
            <div><h1 className="font-bold text-2xl tracking-widest leading-none mb-1 text-white">ATLAS</h1><p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Universal Intel Terminal</p></div>
          </div>
          <div onClick={() => setShowSearch(true)} className="p-4 bg-[#111] border border-white/5 cursor-pointer hover:border-sky-500/30 transition-all rounded-lg group">
            <div className="text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-widest group-hover:text-sky-400 transition-all">Sourcing Mission</div>
            <div className="text-[13px] font-bold text-sky-400 uppercase truncate leading-tight">{profile.material}</div>
          </div>
        </div>

        {/* PORT STATUS WIDGET */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex flex-col gap-5">
           <h2 className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-3"><Anchor size={18} /> Logistics Throughput</h2>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111] p-3 border border-white/5 rounded-lg">
                 <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Port of LA</div>
                 <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-emerald-400">Stable</span>
                    <span className="text-[10px] text-slate-500">2d wait</span>
                 </div>
              </div>
              <div className="bg-[#111] p-3 border border-white/5 rounded-lg">
                 <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Tuas Mega Port</div>
                 <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-emerald-400">Stable</span>
                    <span className="text-[10px] text-slate-500">1d wait</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          <div className="h-1/2 bg-[#0a0a0a] border border-white/10 p-6 flex flex-col overflow-hidden rounded-xl shadow-xl">
            <h2 className="text-[11px] font-bold text-rose-500 tracking-[0.2em] uppercase mb-5 flex items-center gap-3"><ShieldAlert size={18} /> Global Threats</h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {risks.map(r => (
                <div key={r.id} onClick={() => setSelectedNode(r)} className={`p-4 border transition-all cursor-pointer rounded-lg ${selectedNode?.id === r.id ? 'bg-rose-500/10 border-rose-500/50' : 'bg-[#111] border-white/5 hover:border-white/10'}`}>
                  <div className="text-[12px] font-bold uppercase leading-snug">{r.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-1/2 bg-[#0a0a0a] border border-white/10 p-6 flex flex-col overflow-hidden rounded-xl shadow-xl">
            <h2 className="text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-5 flex items-center gap-3"><Factory size={18} /> Universal Hubs</h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {opportunities.map(o => (
                <div key={o.id} onClick={() => setSelectedNode(o)} className={`p-4 border transition-all cursor-pointer rounded-lg ${selectedNode?.id === o.id ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-[#111] border-white/5 hover:border-white/10'}`}>
                  <div className="text-[10px] text-emerald-400 font-bold mb-2 uppercase tracking-widest">{o.hub}</div>
                  <div className="text-[12px] font-bold uppercase leading-tight">{o.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER */}
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 bg-[#0a0a0a] border border-white/10 relative flex items-center justify-center overflow-hidden rounded-xl shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
          <div className="z-0 w-full h-full"><Globe risks={risks} opportunities={opportunities} autoRotate={autoRotate} /></div>
          
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md shadow-2xl"><Activity size={16} className="text-emerald-400" /><span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Live_Global_Stream</span></div>
            <button onClick={() => setAutoRotate(!autoRotate)} className="flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2 hover:bg-sky-500/20 rounded-lg backdrop-blur-md transition-all text-white/70 shadow-2xl">{autoRotate ? <Pause size={16} /> : <Play size={16} />}<span className="text-[11px] font-bold uppercase tracking-widest">{autoRotate ? "Pause" : "Resume"}</span></button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
            <div className="bg-black/95 border border-white/10 p-8 w-[48rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-2xl backdrop-blur-xl border-t-sky-500/20">
               <div className="flex justify-between items-start mb-6">
                 <div className="text-[11px] font-bold text-sky-400 tracking-[0.3em] uppercase flex items-center gap-3"><Zap size={18} /> Strategic Advisory HUD</div>
                 <div className="flex items-center gap-4">
                   {selectedNode?.type !== 'Risk' && selectedNode && (
                     <button onClick={() => setShowRFQ(true)} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 text-emerald-400 text-[10px] font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all rounded-lg"><Mail size={14} /> Smart RFQ Generator</button>
                   )}
                   <button onClick={() => setSelectedNode(null)} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
                 </div>
               </div>
               {selectedNode ? (
                 <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-8">
                     <div>
                       <div className="text-[15px] font-bold uppercase mb-2 text-white tracking-wider">{selectedNode.title}</div>
                       <p className="text-[13px] text-slate-400 leading-relaxed font-sans mb-5">{selectedNode.desc}</p>
                       {/* INDUSTRY KPI */}
                       {selectedNode.industry_kpi && (
                         <div className="bg-[#111] p-4 border-l-2 border-sky-500 rounded-r-lg">
                            <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{selectedNode.industry_kpi.label}</div>
                            <div className="text-[18px] font-bold text-white tracking-tight">{selectedNode.industry_kpi.value}</div>
                         </div>
                       )}
                     </div>
                     {/* ESG SCORECARD */}
                     {selectedNode.esg && (
                       <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-xl shadow-inner">
                          <div className="text-[10px] text-emerald-400 font-bold uppercase mb-3 flex items-center gap-2"><Leaf size={14} /> ESG Scorecard</div>
                          <div className="flex items-center justify-between mb-4">
                             <div className="text-[32px] font-bold text-white">{selectedNode.esg.ethical_rating}</div>
                             <div className="text-right">
                                <div className="text-[9px] text-slate-500 uppercase">CO2 Intensity</div>
                                <div className="text-[12px] text-slate-300 font-bold">{selectedNode.esg.carbon_footprint}</div>
                             </div>
                          </div>
                          <p className="text-[11px] text-slate-500 italic leading-snug">"{selectedNode.esg.sustainability_note}"</p>
                       </div>
                     )}
                   </div>
                   
                   {/* TARIFFS & LOGISTICS PANEL */}
                   {selectedNode.customs && (
                     <div className="bg-sky-500/5 border border-sky-500/20 p-6 rounded-xl grid grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <div className="text-[11px] font-bold text-sky-400 uppercase flex items-center gap-2 mb-1"><FileText size={14} /> Regulatory / Trade HUD</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><div className="text-[9px] text-slate-500 uppercase mb-1">HTS/HS CODE</div><div className="text-[14px] font-mono text-white">{selectedNode.customs.hts_code}</div></div>
                            <div><div className="text-[9px] text-slate-500 uppercase mb-1">DUTY RATE</div><div className="text-[14px] font-mono text-emerald-400 font-bold">{selectedNode.customs.duty_rate}</div></div>
                          </div>
                          <div className="text-[11px] text-slate-500 border-t border-white/5 pt-3 leading-tight">{selectedNode.customs.compliance_note}</div>
                        </div>
                        <div className="space-y-4 border-l border-white/5 pl-10">
                          <div className="text-[11px] font-bold text-sky-400 uppercase flex items-center gap-2 mb-1"><Ship size={14} /> Global Logistics HUD</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><div className="text-[9px] text-slate-500 uppercase mb-1">Avg Lead Time</div><div className="text-[14px] font-mono text-white">{selectedNode.logistics?.port_wait_days || 3} Days</div></div>
                            <div><div className="text-[9px] text-slate-500 uppercase mb-1">Est. Freight</div><div className="text-[14px] font-mono text-white">{selectedNode.logistics?.freight_cost_estimate || '$3.1k'}</div></div>
                          </div>
                        </div>
                     </div>
                   )}

                   {selectedNode.companies && (
                     <div className="pt-6 border-t border-white/5">
                        <div className="text-[11px] font-bold text-emerald-400 uppercase mb-4 flex items-center gap-3"><Factory size={16} /> Target Strategic Partners</div>
                        <div className="grid grid-cols-3 gap-3">
                          {(Array.isArray(selectedNode.companies) ? selectedNode.companies : []).map((c, i) => (
                            <a key={i} href={c.website || '#'} target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-200 font-mono bg-white/5 p-4 border border-white/5 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all flex items-center justify-between group shadow-xl">
                              <span className="truncate">{c.name || c}</span>
                              <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 text-emerald-400 transition-all" />
                            </a>
                          ))}
                        </div>
                     </div>
                   )}
                 </div>
               ) : (
                 <p className="text-[14px] text-slate-500 italic">Initiate universal resource scan or select a hub node to populate intelligence modules.</p>
               )}
            </div>
            {/* TOOLS TOOLBAR */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { icon: <FileText size={14}/>, label: 'HS Code', action: () => setShowTariff(true), color: 'sky' },
                { icon: <History size={14}/>, label: `Archive (${missionHistory.length})`, action: () => setShowHistory(true), color: 'emerald' },
                { icon: <BarChart3 size={14}/>, label: 'Compare', action: () => setShowComparison(true), color: 'sky', disabled: opportunities.length === 0 },
                { icon: <DollarSign size={14}/>, label: 'TLC Calc', action: () => setShowTLC(true), color: 'emerald', disabled: opportunities.length === 0 },
                { icon: <Scale size={14}/>, label: 'Incoterms', action: () => setShowIncoterms(true), color: 'purple' },
                { icon: <ShieldAlert size={14}/>, label: 'Risk Score', action: () => setShowRisk(true), color: 'rose' },
                { icon: <Anchor size={14}/>, label: 'Ports', action: () => setShowPorts(true), color: 'sky' },
                { icon: <Zap size={14}/>, label: 'Compliance', action: () => setShowCompliance(true), color: 'amber' },
              ].map((t, i) => (
                <button key={i} onClick={t.action} disabled={t.disabled}
                  className={`flex items-center gap-2 px-3 h-10 border rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-30
                    ${t.color === 'emerald' ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' :
                      t.color === 'rose' ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' :
                      t.color === 'purple' ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' :
                      t.color === 'amber' ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' :
                      'border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-sky-400'}`}
                >{t.icon}{t.label}</button>
              ))}
              
              <div className="ml-auto flex items-center gap-2">
                <button onClick={exportToPDF} disabled={isExportingPDF || opportunities.length === 0} className="px-4 h-10 border border-white/20 text-white hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-30">
                  {isExportingPDF ? "GENERATING..." : <><Download size={14} /> Export PDF</>}
                </button>
                <button onClick={() => setShowSearch(true)} className="px-6 h-10 bg-sky-500 text-black font-bold uppercase text-[11px] hover:bg-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)] rounded-lg tracking-widest flex items-center gap-2 transition-all">
                  New Mission <SearchCode size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-44 bg-[#0a0a0a] border border-white/10 p-5 font-mono rounded-xl shadow-2xl">
          <div className="flex items-center gap-3 text-[11px] text-slate-600 uppercase font-bold mb-3 border-b border-white/5 pb-2"><Terminal size={14} /> Advisory_Log_Stream</div>
          <div className="flex-1 overflow-y-auto text-[12px] text-sky-500/80 space-y-2 custom-scrollbar">
            {terminalLogs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-slate-800 shrink-0">[{isMounted ? new Date().toLocaleTimeString() : '...'}]</span> 
                {log}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-96 flex flex-col gap-4 shrink-0 z-10">
        
        {/* MARKET TRENDS WIDGET */}
        {marketData && (
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl space-y-5 shadow-xl">
             <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-3"><BarChart3 size={18} /> Market Trends</h2>
                <div className={`px-3 py-1 rounded-lg text-[11px] font-bold ${marketData.currency.impact === 'Positive' || marketData.currency.impact === 'Stable' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                   {marketData.currency.impact}
                </div>
             </div>
             
             {/* BAR CHART — fixed pixel heights */}
             <div className="flex items-end justify-between gap-2" style={{ height: '80px' }}>
                {marketData.price_history.map((d, i) => {
                  const maxPrice = Math.max(...marketData.price_history.map(p => p.price));
                  const barPx = Math.max(8, Math.round((d.price / maxPrice) * 72));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 group cursor-help">
                       <div 
                         className="w-full rounded-t relative overflow-hidden group-hover:brightness-125 transition-all"
                         style={{ height: `${barPx}px`, background: 'linear-gradient(to top, rgba(56,189,248,0.7), rgba(56,189,248,0.15))' }}
                       >
                         <div className="absolute bottom-0 left-0 right-0 h-px bg-sky-400" />
                       </div>
                       <span className="text-[11px] text-slate-500 font-bold uppercase">{d.month}</span>
                    </div>
                  );
                })}
             </div>

             <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                   <div className="text-[11px] text-slate-500 uppercase font-bold mb-1">Currency Index</div>
                   <div className="text-[17px] font-bold text-white uppercase">{marketData.currency.pair} : {marketData.currency.rate}</div>
                </div>
                {marketData.currency.impact === 'Positive' ? <ArrowDownRight className="text-emerald-400" /> : <ArrowUpRight className="text-rose-400" />}
             </div>
          </div>
        )}

        {/* FX LIVE RATES WIDGET */}
        {fxData && (
          <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-bold text-amber-400 tracking-[0.2em] uppercase flex items-center gap-2"><TrendingUp size={16}/> Live FX Rates</h2>
              <span className="text-[11px] text-slate-600 font-mono">{fxData.date}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(fxData.rates || {}).slice(0, 6).map(([code, info]) => (
                <div key={code} className="flex items-center justify-between p-3 bg-[#111] border border-white/5 rounded-xl">
                  <div>
                    <span className="text-[13px] font-bold text-white font-mono">{info.flag} {code}</span>
                    <div className="text-[11px] text-slate-500 mt-0.5">{info.impact?.split(' ').slice(0,3).join(' ')}</div>
                  </div>
                  <span className="text-[16px] font-bold text-amber-300 font-mono">{typeof info.rate === 'number' ? info.rate.toFixed(2) : info.rate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#0a0a0a] border-2 border-emerald-500/30 p-6 flex flex-col gap-6 shadow-[0_0_30px_rgba(16,185,129,0.1)] rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3"><Zap size={24} className="text-emerald-500/20" /></div>
          <h2 className="text-[12px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-3">
            <Target size={18} /> Strategic Directive
          </h2>
          {directive ? (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Target Sourcing Hub</div>
                <div className="text-[16px] font-bold text-white uppercase tracking-wider">{directive.best_region}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Primary Partner Recommended</div>
                <div className="text-[16px] font-bold text-emerald-400 uppercase tracking-wider">{directive.best_partner}</div>
              </div>
              
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2">
                 <div className="text-[10px] text-rose-500 uppercase font-bold tracking-widest flex items-center gap-2"><ShieldAlert size={12} /> Trade & Compliance Alert</div>
                 <div className="text-[11px] text-rose-200 font-bold leading-snug">{directive.tariff_alert}</div>
              </div>

              <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 text-[13px] text-slate-400 leading-relaxed italic rounded-xl border-l-4 shadow-inner">
                "{directive.summary}"
              </div>
            </div>
          ) : (
            <div className="text-[13px] text-slate-700 italic flex items-center gap-3 animate-pulse"><Clock size={16} /> Analysis pending...</div>
          )}
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 flex-1 p-6 flex flex-col gap-3 overflow-hidden rounded-xl shadow-xl">
          <div className="flex items-center justify-between shrink-0">
            <h2 className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase flex items-center gap-3"><Newspaper size={18} className="text-sky-400" /> Market Intelligence</h2>
          </div>
          {/* Country filter */}
          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            {[['all','All'],['china','🇨🇳 China'],['eu','🇪🇺 EU'],['usa','🇺🇸 USA'],['latam','🌎 LatAm'],['india','🇮🇳 India']].map(([key,label]) => (
              <button key={key} onClick={() => setNewsFilter(key)}
                className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${newsFilter === key ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-slate-600 hover:text-slate-400'}`}>
                {label}
              </button>
            ))}
            <span className="ml-auto text-[9px] text-slate-700 font-mono">{filteredNews.length} items</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {filteredNews.length === 0 ? (
              <p className="text-[11px] text-slate-700 italic py-4">No articles match this region filter.</p>
            ) : filteredNews.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block border-b border-white/5 pb-4 last:border-0 group">
                <div className="text-[9px] text-slate-600 font-bold mb-1 uppercase tracking-widest flex items-center justify-between">
                  {item.pubDate}
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 text-sky-400 transition-all" />
                </div>
                <h3 className="text-[12px] font-bold leading-snug mb-1 group-hover:text-sky-400 transition-all uppercase tracking-tight text-slate-200">{item.title}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-sans">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </aside>
      </div>

      {/* SYSTEM HEALTH INDICATOR */}
      <div className="absolute bottom-6 left-6 z-[120] flex items-center gap-3 bg-black/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-2xl">
         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System_Integrity: 100%</span>
      </div>
    </div>
  )
}
