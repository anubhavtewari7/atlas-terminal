// ── terminal-constants.js ────────────────────────────────────────────────────
// Timing and sizing constants used across the terminal.
// Change here -- all consumers pick it up automatically.

/** How often live market data refreshes (ms). */
export const DATA_REFRESH_MS = 5 * 60 * 1000   // 5 minutes

/** AbortController timeout for /api/analyze supplier scan (ms). */
export const SCAN_TIMEOUT_MS = 45_000           // 45 seconds

/** Maximum number of past scans kept in localStorage mission history. */
export const MAX_MISSION_HISTORY = 20
