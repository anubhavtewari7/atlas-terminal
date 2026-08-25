"use client"
import React from 'react'
import { X, History, ChevronRight, Trash2, Target, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MissionHistory({ missions, onClose, onReplay, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-2xl rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.08)] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
              <History size={18} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-emerald-400 tracking-[0.2em] uppercase">Mission Archive</h2>
              <p className="text-[10px] text-slate-600 mt-0.5">{missions.length} saved intelligence reports</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {missions.length > 0 && (
              <button
                onClick={onClear}
                className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-slate-500 hover:text-rose-400 active:text-rose-400 font-mono uppercase tracking-widest transition-all"
              >
                <Trash2 size={12} /> Clear All
              </button>
            )}
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-white active:text-white transition-all"><X size={20} /></button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {missions.length === 0 ? (
            <div className="text-center py-12">
              <History size={32} className="mx-auto text-slate-800 mb-4" />
              <p className="text-slate-600 text-[13px] font-mono">No missions logged yet.</p>
              <p className="text-slate-700 text-[11px] mt-2">Run your first universal scan to begin tracking.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...missions].reverse().map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group p-4 bg-[#111] border border-white/5 rounded-xl hover:border-emerald-500/30 active:border-emerald-500/30 transition-all cursor-pointer"
                  onClick={() => { onReplay(m); onClose(); }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Target size={10} className="text-emerald-400" />
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{new Date(m.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-[13px] font-bold text-white leading-snug truncate">{m.query}</p>
                      {m.primaryHub && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <MapPin size={10} className="text-sky-400" />
                          <span className="text-[11px] text-sky-400 font-mono">{m.primaryHub}</span>
                          {m.hubCount > 1 && (
                            <span className="text-[10px] text-slate-600">+{m.hubCount - 1} more</span>
                          )}
                        </div>
                      )}
                      {m.topPartner && (
                        <div className="text-[11px] text-slate-500 mt-1 font-mono">Partner: {m.topPartner}</div>
                      )}
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[9px] px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded font-bold uppercase">Replay</span>
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-emerald-400 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
