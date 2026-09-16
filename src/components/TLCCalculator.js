"use client"
import React, { useState } from 'react'
import { X, Calculator, DollarSign, PackageOpen, Truck, Shield, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { calculateLandedCost } from '@/lib/procurement-costs'

export default function TLCCalculator({ onClose, defaults }) {
  const [unitCost, setUnitCost] = useState(50.00)
  const [quantity, setQuantity] = useState(1000)
  const [freightCost, setFreightCost] = useState(defaults?.freight?.amount ?? '')
  const [dutyPercent, setDutyPercent] = useState(defaults?.duty?.percent ?? '')
  const [insurancePercent, setInsurancePercent] = useState(0.5)

  const costs = calculateLandedCost({ unitCost, quantity, freightCost, dutyPercent, insurancePercent })
  const money = value => value == null ? '—' : `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#090909] border border-white/10 w-full max-w-4xl rounded-2xl shadow-[0_0_100px_rgba(56,189,248,0.1)] overflow-y-auto max-h-[90vh] flex flex-col md:flex-row relative pb-24 md:pb-0"
      >
        {/* Mobile-only close button at top */}
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-2 text-slate-500 active:text-white transition-colors z-10">
          <X size={20} />
        </button>

        {/* Left Side - Inputs */}
        <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                <Calculator size={20} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-emerald-400 tracking-[0.2em] uppercase">Total Landed Cost</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">Unit economics & margin impact</p>
              </div>
            </div>
          </div>

          <div className="mb-4 text-[11px] text-amber-200 leading-relaxed" role="note">
            <p>{defaults?.hub ? `Prefilled from ${defaults.hub}. ` : ''}Indicative US import scenario on FOB value. Confirm duty and shipment freight before relying on this total.</p>
            <p className="mt-1">{defaults?.duty?.raw ? `Catalog duty: ${defaults.duty.raw}. ` : 'No catalog duty available. '}{defaults?.duty?.reason}</p>
            <p className="mt-1">{defaults?.freight?.amount != null ? `Freight assumes one ${defaults.freight.unit || 'quoted shipment'} (${defaults.freight.raw}). Enter the total freight for your order.` : 'No unambiguous freight estimate available. Enter your shipment quote.'}</p>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><DollarSign size={12}/> Unit Price (FOB)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-[13px]">$</span>
                  <input type="number" min="0" value={unitCost} onChange={e => setUnitCost(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-lg py-2.5 pl-7 pr-3 text-[14px] text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><PackageOpen size={12}/> Order Quantity</label>
                <input type="number" min="0" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-lg py-2.5 px-3 text-[14px] text-white focus:outline-none focus:border-emerald-500/50" />
                {quantity <= 0 && <p className="text-[10px] text-amber-400 mt-1">Enter a quantity greater than 0 to calculate per-unit cost.</p>}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Truck size={12}/> Freight Est. (Ocean/Air)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-[13px]">$</span>
                <input type="number" min="0" value={freightCost} onChange={e => setFreightCost(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-lg py-2.5 pl-7 pr-3 text-[14px] text-white focus:outline-none focus:border-emerald-500/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><AlertTriangle size={12}/> Import Duty (%)</label>
                <div className="relative">
                  <input type="number" min="0" value={dutyPercent} onChange={e => setDutyPercent(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-lg py-2.5 px-3 text-[14px] text-white focus:outline-none focus:border-emerald-500/50" />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-[13px]">%</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Shield size={12}/> Insurance (%)</label>
                <div className="relative">
                  <input type="number" min="0" value={insurancePercent} step="0.1" onChange={e => setInsurancePercent(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-lg py-2.5 px-3 text-[14px] text-white focus:outline-none focus:border-emerald-500/50" />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-[13px]">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Outputs */}
        <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#050505] relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white active:text-white transition-all rounded-lg hover:bg-white/5 active:bg-white/5">
            <X size={22} />
          </button>

          {!costs && <p role="status" className="text-[11px] text-amber-300 mb-4">Enter nonnegative costs and rates, and a quantity greater than zero, to calculate totals.</p>}
          <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-6">Cost Breakdown</h3>
          
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-[13px]">
              <span className="text-slate-400">Net Cargo Value</span>
              <span className="text-white">{money(costs?.cargoValue)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-slate-400">Est. Freight</span>
              <span className="text-white">{money(freightCost === '' ? null : Number(freightCost))}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-slate-400">Insurance ({insurancePercent}%)</span>
              <span className="text-white">{money(costs?.insuranceCost)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-rose-400 font-bold">Import Duty ({dutyPercent}%)</span>
              <span className="text-rose-400 font-bold">{money(costs?.dutyCost)}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Total Landed Cost</div>
                <div className="text-[12px] text-slate-500">End-to-end shipment value</div>
              </div>
              <div className="text-[24px] font-bold text-white">{money(costs?.totalLandedCost)}</div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-5 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] font-bold text-sky-400 uppercase tracking-widest">Landed Cost Per Unit</span>
                <span className="text-[20px] font-bold text-white">{money(costs?.landedCostPerUnit)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 uppercase tracking-widest">Margin Impact</span>
                <span className="text-rose-400 font-bold">{costs?.marginImpact != null ? `+${costs.marginImpact.toFixed(1)}% vs FOB` : '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}