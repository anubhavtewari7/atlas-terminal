"use client"
import React, { useState } from 'react'
import { X, Scale } from 'lucide-react'
import { motion } from 'framer-motion'

const INCOTERMS = {
  EXW: { name: 'Ex Works', seller: 'Packs goods at factory', buyer: 'ALL costs & risks from factory gate', riskTransfer: 'At factory', bestFor: 'Buyer has own freight forwarder', costBurden: 'buyer' },
  FCA: { name: 'Free Carrier', seller: 'Delivers to named carrier', buyer: 'Main freight, insurance, destination', riskTransfer: 'On handover to carrier', bestFor: 'Air or rail shipments', costBurden: 'buyer' },
  CPT: { name: 'Carriage Paid To', seller: 'Pays main freight to destination', buyer: 'Insurance + unloading + import duties', riskTransfer: 'On handover to first carrier', bestFor: 'Containerised / multimodal', costBurden: 'mixed' },
  CIP: { name: 'Carriage & Insurance Paid', seller: 'Pays freight + buys insurance', buyer: 'Unloading + import duties', riskTransfer: 'On handover to first carrier', bestFor: 'High-value goods', costBurden: 'mixed' },
  DAP: { name: 'Delivered At Place', seller: 'Delivers to destination, NOT unloaded', buyer: 'Import duties + unloading', riskTransfer: 'At destination (ready to unload)', bestFor: 'When seller has logistics strength', costBurden: 'mixed' },
  DPU: { name: 'Delivered At Place Unloaded', seller: 'Delivers AND unloads at destination', buyer: 'Import customs only', riskTransfer: 'After unloading', bestFor: 'When seller handles logistics end-to-end', costBurden: 'seller' },
  DDP: { name: 'Delivered Duty Paid', seller: 'Everything — freight, insurance, customs', buyer: 'Unloading only', riskTransfer: 'At buyer premises', bestFor: 'E-commerce, buyer wants zero hassle', costBurden: 'seller' },
  FAS: { name: 'Free Alongside Ship', seller: 'Delivers alongside vessel', buyer: 'Loading + main freight + insurance', riskTransfer: 'Alongside vessel at port', bestFor: 'Bulk cargo only', costBurden: 'buyer' },
  FOB: { name: 'Free On Board', seller: 'Delivers goods ON board vessel', buyer: 'Main freight + insurance from origin port', riskTransfer: 'Once on board at origin port', bestFor: 'Most common for ocean freight', costBurden: 'buyer' },
  CFR: { name: 'Cost & Freight', seller: 'Pays freight to destination port', buyer: 'Insurance + unloading + import', riskTransfer: 'Once on board at origin port', bestFor: 'Bulk commodities', costBurden: 'mixed' },
  CIF: { name: 'Cost Insurance Freight', seller: 'Pays freight + insurance to destination', buyer: 'Unloading + import duties', riskTransfer: 'Once on board at origin port', bestFor: 'Most commonly used term globally', costBurden: 'mixed' },
}

const COST_ESTIMATE = {
  EXW: { landedCostMultiplier: 1.45, notes: 'Budget +35-45% on top of ex-works price for full landed cost' },
  FCA: { landedCostMultiplier: 1.28, notes: 'Budget +23-28% for main freight, insurance, and import duties' },
  CPT: { landedCostMultiplier: 1.15, notes: 'Budget +10-15% for insurance, unloading, and import duties' },
  CIP: { landedCostMultiplier: 1.12, notes: 'Budget +8-12% for unloading and import duties' },
  DAP: { landedCostMultiplier: 1.08, notes: 'Budget +5-8% for import duties and unloading' },
  DPU: { landedCostMultiplier: 1.06, notes: 'Budget +3-6% for import customs clearance only' },
  DDP: { landedCostMultiplier: 1.02, notes: 'Near-zero additional cost. Invoice price = landed cost' },
  FAS: { landedCostMultiplier: 1.27, notes: 'Budget +22-27% for loading, main freight, and insurance' },
  FOB: { landedCostMultiplier: 1.25, notes: 'Budget +15-25% for freight, insurance, and import duties' },
  CFR: { landedCostMultiplier: 1.13, notes: 'Budget +8-13% for insurance, unloading, and import duties' },
  CIF: { landedCostMultiplier: 1.10, notes: 'Budget +5-10% for import duties and local handling' },
}

export default function IncotermsCalc({ onClose }) {
  const [selectedTerm, setSelectedTerm] = useState('FOB')
  const [cargoValue, setCargoValue] = useState('')
  const term = INCOTERMS[selectedTerm]
  const costInfo = COST_ESTIMATE[selectedTerm]

  const cargoNum = parseFloat(cargoValue.replace(/,/g, '')) || 0
  const estimatedLanded = cargoNum > 0 && costInfo ? (cargoNum * costInfo.landedCostMultiplier).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : null

  const burdenColors = { seller: 'text-rose-400', buyer: 'text-sky-400', mixed: 'text-amber-400' }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-2xl shadow-[0_0_80px_rgba(168,85,247,0.08)] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
              <Scale size={18} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-purple-400 tracking-[0.2em] uppercase">Incoterms 2020 Calculator</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">International Commercial Terms — Risk & Cost Allocation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white active:text-white transition-all"><X size={20} /></button>
        </div>

        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left — selector */}
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Select Incoterm</label>
              <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
                {Object.keys(INCOTERMS).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedTerm(key)}
                    className={`py-2.5 text-[12px] font-bold rounded-lg border transition-all ${selectedTerm === key
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-[#111] border-white/5 text-slate-400 hover:border-white/10 active:border-purple-500/30 active:text-purple-400'}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">Cargo Value (USD) — optional</label>
              <input
                value={cargoValue}
                onChange={e => setCargoValue(e.target.value)}
                placeholder="e.g. 250000"
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[14px] font-mono text-white focus:outline-none focus:border-purple-500 transition-all rounded-xl"
              />
            </div>

            {estimatedLanded && (
              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <div className="text-[10px] text-purple-400 uppercase font-bold mb-1 tracking-widest">Estimated Landed Cost</div>
                <div className="text-[24px] font-bold text-white font-mono">{estimatedLanded}</div>
                <p className="text-[11px] text-slate-500 mt-1">{costInfo?.notes}</p>
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="space-y-4">
            <div className="p-5 bg-purple-500/5 border border-purple-500/30 rounded-xl">
              <div className="text-[11px] text-purple-400 uppercase font-bold mb-1 tracking-widest">{selectedTerm}</div>
              <div className="text-[18px] font-bold text-white mb-3">{term.name}</div>
              <div className="text-[12px] text-slate-500 mb-2">Best for: <span className="text-slate-300">{term.bestFor}</span></div>
              <div className="text-[12px] text-slate-500">Cost burden: <span className={`font-bold ${burdenColors[term.costBurden]}`}>{term.costBurden.toUpperCase()}</span></div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                <div className="text-[10px] text-rose-400 uppercase font-bold mb-1 tracking-widest">🏭 Seller Obligation</div>
                <p className="text-[12px] text-slate-300">{term.seller}</p>
              </div>
              <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                <div className="text-[10px] text-sky-400 uppercase font-bold mb-1 tracking-widest">🏢 Buyer Obligation</div>
                <p className="text-[12px] text-slate-300">{term.buyer}</p>
              </div>
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <div className="text-[10px] text-amber-400 uppercase font-bold mb-1 tracking-widest">⚖️ Risk Transfers At</div>
                <p className="text-[12px] text-slate-300">{term.riskTransfer}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}