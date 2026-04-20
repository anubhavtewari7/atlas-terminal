"use client"

import React, { useState, useEffect } from 'react'
import Globe from '@/components/Globe'
import { 
  ShieldAlert, 
  TrendingUp, 
  Map as MapIcon, 
  Activity, 
  Settings, 
  Zap, 
  Globe as GlobeIcon,
  Search,
  ChevronRight,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const [profile, setProfile] = useState({
    industry: 'Automotive / EV',
    material: 'Lithium-Ion Battery Cells',
    priority: 'Resilience'
  })

  const [risks, setRisks] = useState([
    { id: 1, lat: 34.0522, lng: -118.2437, severity: 'high', title: 'Port of LA Congestion', type: 'Logistics', desc: 'Sustained backlog affecting West Coast deliveries.' },
    { id: 2, lat: 43.7696, lng: 11.2558, severity: 'med', title: 'Tuscany Heatwave', type: 'Climate', desc: 'Predictive risk for agricultural output and energy demand.' },
    { id: 3, lat: 31.2304, lng: 121.4737, severity: 'high', title: 'Shanghai Export Policy', type: 'Geopolitical', desc: 'New regulations on rare earth mineral exports.' }
  ])

  const [selectedRisk, setSelectedRisk] = useState(null)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-100 p-4 gap-4">
      
      {/* LEFT SIDEBAR: PROFILE & CONFIG */}
      <aside className="w-80 flex flex-col gap-4">
        <div className="glass-panel p-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 hologram-glow">
              <GlobeIcon size={24} />
            </div>
            <div>
              <h1 className="font-bold tracking-tight">ATLAS</h1>
              <p className="industrial-label">Strategic Intelligence</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="industrial-label mb-1 block">Active Profile</label>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-white/5 flex items-center justify-between group cursor-pointer hover:border-sky-500/30 transition-all">
                <div>
                  <div className="text-sm font-semibold">{profile.industry}</div>
                  <div className="text-[10px] text-slate-400">{profile.material}</div>
                </div>
                <Settings size={14} className="text-slate-500 group-hover:text-sky-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-slate-900/50 rounded-lg border border-white/5 text-center">
                <div className="industrial-label text-[9px]">Uptime</div>
                <div className="text-sm font-mono text-emerald-400">99.9%</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-white/5 text-center">
                <div className="industrial-label text-[9px]">Sync</div>
                <div className="text-sm font-mono text-sky-400">LIVE</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel flex-1 p-5 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="industrial-label">Causality Pulse</h2>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {risks.map(risk => (
              <motion.div 
                key={risk.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedRisk(risk)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedRisk?.id === risk.id 
                  ? 'bg-sky-500/10 border-sky-500/50' 
                  : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${risk.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <span className="text-[10px] uppercase font-bold text-slate-500">{risk.type}</span>
                </div>
                <div className="text-xs font-semibold leading-tight">{risk.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </aside>

      {/* CENTER: THE GLOBE */}
      <main className="flex-1 glass-panel relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent-muted)_0%,_transparent_70%)]" />
        </div>
        
        <div className="z-10 w-full h-full">
          <Globe risks={risks} />
        </div>

        {/* HUD OVERLAYS */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Activity size={14} className="text-sky-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase">System Stabilized</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 w-96 pointer-events-auto">
             <div className="industrial-label mb-2 flex items-center gap-2">
               <Zap size={12} className="text-sky-400" /> Strategic Advisory
             </div>
             <p className="text-[11px] leading-relaxed text-slate-300">
               {selectedRisk 
                 ? `PREDICTIVE IMPACT: ${selectedRisk.desc} Recommend evaluating Tier-2 suppliers in alternative corridors.`
                 : "Select a pulse node on the causality radar to analyze impact chains and sourcing strategies."
               }
             </p>
          </div>

          <div className="flex gap-4 pointer-events-auto">
             <button className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-lg">
               <Search size={20} />
             </button>
             <button className="px-6 h-12 rounded-full bg-sky-500 text-slate-950 font-bold flex items-center gap-2 shadow-lg hover:bg-sky-400 transition-all">
               <span>NEW SIMULATION</span>
               <ChevronRight size={18} />
             </button>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: INTELLIGENCE DETAILS */}
      <aside className="w-80 flex flex-col gap-4">
        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="industrial-label">Market Intel</h2>
            <TrendingUp size={14} className="text-sky-400" />
          </div>
          <div className="space-y-3">
             {[
               { label: 'Lithium (LME)', val: '+2.4%', trend: 'up' },
               { label: 'Freight (WCI)', val: '-1.1%', trend: 'down' },
               { label: 'Fuel Index', val: '+0.8%', trend: 'up' }
             ].map((m, i) => (
               <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-900/30 rounded-lg">
                 <span className="text-slate-400">{m.label}</span>
                 <span className={m.trend === 'up' ? 'text-emerald-400' : 'text-rose-400 font-mono'}>{m.val}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="glass-panel flex-1 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="industrial-label">Regulatory Watch</h2>
            <ShieldAlert size={14} className="text-amber-500" />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
               <div className="text-[10px] font-bold text-amber-500 uppercase mb-1">New Tariff Alert</div>
               <div className="text-[11px] font-semibold mb-1">Section 301 Update</div>
               <p className="text-[10px] text-slate-400 leading-normal italic">
                 "Reviewing duties on industrial components from Asian corridors starting Q3."
               </p>
            </div>
            <div className="p-3 bg-slate-900/50 border border-white/5 rounded-lg">
               <div className="text-[10px] font-bold text-sky-500 uppercase mb-1">EU Customs</div>
               <div className="text-[11px] font-semibold mb-1">CBAM Compliance</div>
               <p className="text-[10px] text-slate-400 leading-normal">
                 New carbon reporting requirements for steel and aluminum imports.
               </p>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
             <span>API VERSION 1.1.0</span>
             <Info size={12} />
          </div>
        </div>
      </aside>

    </div>
  )
}
