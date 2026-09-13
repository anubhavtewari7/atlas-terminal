// ── scoring.js ───────────────────────────────────────────────────────────────
// Pure color-mapping helpers for stability / risk scores and severity levels.
// No React, no side effects -- safe to import anywhere.

/**
 * Returns Tailwind color tokens for a 0-100 stability/risk score.
 * Thresholds:  >= 60  stable   (emerald)
 *              >= 35  moderate (amber)
 *               < 35  high risk (rose)
 */
export function scoreClasses(score) {
  if (score >= 60) return {
    text:  'text-emerald-400',
    bg:    'bg-emerald-500',
    badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  }
  if (score >= 35) return {
    text:  'text-amber-400',
    bg:    'bg-amber-500',
    badge: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  }
  return {
    text:  'text-rose-400',
    bg:    'bg-rose-500',
    badge: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
  }
}

/**
 * Returns Tailwind color tokens for a risk-event severity string.
 * Accepts: 'HIGH' | 'MEDIUM' | anything-else (treated as LOW/normal).
 */
export function severityStyle(s) {
  if (!s)              return 'text-slate-400 border-slate-500/20 bg-slate-500/5'
  if (s === 'HIGH')    return 'text-rose-400 border-rose-500/20 bg-rose-500/5'
  if (s === 'MEDIUM')  return 'text-amber-400 border-amber-500/20 bg-amber-500/5'
  return                      'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
}
