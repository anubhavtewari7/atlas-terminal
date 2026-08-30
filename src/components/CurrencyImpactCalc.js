"use client"
import React, { useState } from 'react'
import { X, TrendingUp, TrendingDown, DollarSign, RefreshCw, Info, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

// ── Reference FX rates vs USD (approximate mid-market) ──────────────────────
// These are baseline defaults — app fetches live rates from frankfurter.app
const DEFAULT_FX = {
  CNY: { name: 'Chinese Yuan',     flag: '🇨🇳', rate: 7.25, symbol: '¥' },
  EUR: { name: 'Euro',             flag: '🇪🇺', rate: 0.93, symbol: '€' },
  JPY: { name: 'Japanese Yen',     flag: '🇯🇵', rate: 155.0, symbol: '¥' },
  MXN: { name: 'Mexican Peso',     flag: '🇲🇽', rate: 17.2, symbol: '$' },
  BRL: { name: 'Brazilian Real',   flag: '🇧🇷', rate: 5.10, symbol: 'R$' },
  KRW: { name: 'Korean Won',       flag: '🇰🇷', rate: 1340, symbol: '₩' },
  INR: { name: 'Indian Rupee',     flag: '🇮🇳', rate: 83.5, symbol: '₹' },
  GBP: { name: 'British Pound',    flag: '🇬🇧', rate: 0.79, symbol: '£' },
  TWD: { name: 'Taiwan Dollar',    flag: '🇹🇼', rate: 32.5, symbol: 'NT$' },
  VND: { name: 'Vietnamese Dong',  flag: '🇻🇳', rate: 24500, symbol: '₫' },
  THB: { name: 'Thai Baht',        flag: '🇹🇭', rate: 35.5, symbol: '฿' },
  MYR: { name: 'Malaysian Ringgit',flag: '🇲🇾', rate: 4.65, symbol: 'RM' },
  IDR: { name: 'Indonesian Rupiah',flag: '🇮🇩', rate: 15800, symbol: 'Rp' },
  TRY: { name: 'Turkish Lira',     flag: '🇹🇷', rate: 32.0, symbol: '₺' },
  PLN: { name: 'Polish Zloty',     flag: '🇵🇱', rate: 3.95, symbol: 'zł' },
  HUF: { name: 'Hungarian Forint', flag: '🇭🇺', rate: 360,  symbol: 'Ft' },
}

const SCENARIOS = [-10, -5, -3, 3, 5, 10]

export default function CurrencyImpactCalc({ onClose, liveRates }) {
  const [currency, setCurrency]     = useState('CNY')
  const [fobPrice, setFobPrice]     = useState('')
  const [quantity, setQuantity]     = useState('')
  const [userRate, setUserRate]     = useState('')
  const [result, setResult]         = useState(null)

  // Merge live rates (from parent) with defaults
  function getRate(ccy) {
    if (userRate && parseFloat(userRate) > 0) return parseFloat(userRate)
    if (liveRates?.[ccy]) return liveRates[ccy]
    return DEFAULT_FX[ccy]?.rate || 1
  }

  function calculate() {
    const priceLocal = parseFloat(fobPrice) || 0
    const qty        = parseFloat(quantity) || 1
    const rate       = getRate(currency)
    const ccy        = DEFAULT_FX[currency] || {}

    const priceUSD   = priceLocal / rate
    const totalUSD   = priceUSD * qty

    const scenarios = SCENARIOS.map(pct => {
      const newRate    = rate * (1 + pct / 100)
      const newPrice   = priceLocal / newRate
      const newTotal   = newPrice * qty
      const deltaUnit  = newPrice - priceUSD
      const deltaTotal = newTotal - totalUSD
      const marginImpact = (deltaUnit / priceUSD) * 100
      return { pct, newRate, newPrice, newTotal, deltaUnit, deltaTotal, marginImpact }
    })

    setResult({ priceLocal, qty, rate, priceUSD, totalUSD, scenarios, ccy, currency })
  }

  const selectedCcy = DEFAULT_FX[currency] || {}

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
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <DollarSign size={14} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Currency Impact Calculator</div>
              <div className="text-[10px] text-slate-500">FOB price sensitivity to FX moves</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Currency selector */}
          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Supplier Currency</label>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.entries(DEFAULT_FX).slice(0, 8).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => { setCurrency(code); setUserRate('') }}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border
                    ${currency === code
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : 'bg-white/3 border-white/8 text-slate-500 hover:text-white hover:border-white/20'}`}
                >
                  <span className="text-xs">{info.flag}</span>
                  {code}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1.5 mt-1.5">
              {Object.entries(DEFAULT_FX).slice(8).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => { setCurrency(code); setUserRate('') }}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border
                    ${currency === code
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : 'bg-white/3 border-white/8 text-slate-500 hover:text-white hover:border-white/20'}`}
                >
                  <span className="text-xs">{info.flag}</span>
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                FOB Unit Price ({selectedCcy.symbol || currency})
              </label>
              <input
                value={fobPrice} onChange={e => setFobPrice(e.target.value)}
                placeholder={`e.g. ${currency === 'JPY' || currency === 'KRW' || currency === 'VND' || currency === 'IDR' ? '5000' : '350'}`}
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Order Quantity</label>
              <input
                value={quantity} onChange={e => setQuantity(e.target.value)}
                placeholder="e.g. 1000"
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Override FX Rate <span className="text-slate-600 normal-case">(optional)</span>
              </label>
              <input
                value={userRate} onChange={e => setUserRate(e.target.value)}
                placeholder={`Default: ${selectedCcy.rate || '—'}`}
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={!fobPrice}
            className="w-full h-10 bg-emerald-500 text-black font-bold uppercase text-[10px] hover:bg-emerald-400 rounded-xl tracking-widest flex items-center justify-center gap-1.5 transition-all disabled:opacity-30"
          >
            <TrendingUp size={11} /> Run Sensitivity Analysis
          </button>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">

              {/* Base case */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Current Rate</div>
                  <div className="text-xl font-black text-white">
                    {result.rate.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[9px] text-slate-500">{result.currency}/USD</div>
                </div>
                <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Unit Price (USD)</div>
                  <div className="text-xl font-black text-white">
                    ${result.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[9px] text-slate-500">
                    {result.selectedCcy?.symbol || ''}{result.priceLocal.toLocaleString()} ÷ {result.rate.toFixed(2)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Total Order (USD)</div>
                  <div className="text-xl font-black text-emerald-400">
                    ${result.totalUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[9px] text-slate-500">× {result.qty.toLocaleString()} units</div>
                </div>
              </div>

              {/* Sensitivity table */}
              <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">FX Sensitivity — Impact on USD Cost</span>
                </div>
                <div className="divide-y divide-white/5">
                  {result.scenarios.map((s, i) => {
                    const isNeg = s.deltaUnit < 0
                    const isPosMove = s.pct > 0
                    // Positive % move = foreign currency strengthens = USD cost goes DOWN (good for buyer)
                    const isFavorable = isNeg
                    return (
                      <div key={i} className="grid grid-cols-4 px-4 py-2.5 items-center">
                        <div className="flex items-center gap-1.5">
                          {isPosMove
                            ? <TrendingUp size={10} className="text-emerald-400" />
                            : <TrendingDown size={10} className="text-rose-400" />}
                          <span className={`text-[10px] font-bold ${isPosMove ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {s.pct > 0 ? '+' : ''}{s.pct}% {result.currency}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Rate: {s.newRate.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </div>
                        <div className={`text-[10px] font-bold ${isFavorable ? 'text-emerald-400' : 'text-rose-400'}`}>
                          ${s.deltaUnit >= 0 ? '+' : ''}{s.deltaUnit.toFixed(2)}/unit
                        </div>
                        <div className={`text-[10px] font-bold text-right ${isFavorable ? 'text-emerald-400' : 'text-rose-400'}`}>
                          ${s.deltaTotal >= 0 ? '+' : ''}{s.deltaTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })} total
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Hedging note */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
                <Info size={11} className="text-amber-500/70 shrink-0 mt-0.5" />
                <p className="text-[9px] text-slate-600 leading-relaxed">
                  <span className="text-amber-400/80 font-bold">Hedging tip:</span> For orders &gt;$100k, consider a forward contract to lock in the current rate. FX volatility risk can be priced into your contract via a currency adjustment clause (CAC).
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
