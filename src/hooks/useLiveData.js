"use client"

import { useState, useEffect } from 'react'
import { DATA_REFRESH_MS } from '@/lib/terminal-constants'

/**
 * useLiveData -- polls /api/news, /api/fx, and /api/commodities on mount and
 * every DATA_REFRESH_MS (5 min), so the terminal stays current during long
 * sessions without a manual reload.
 *
 * Returns:
 *   news         -- array of news articles ([] until first load)
 *   newsLoading  -- true while the first news fetch is in flight
 *   fxData       -- FX rates object or null
 *   commodities  -- commodities object or null
 *   metalsTs     -- formatted HH:MM string, updated every minute
 *   apiErrCount  -- cumulative count of failed fetches (drives System_Integrity)
 */
export function useLiveData() {
  const [news,        setNews]        = useState([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [fxData,      setFxData]      = useState(null)
  const [commodities, setCommodities] = useState(null)
  const [apiErrCount, setApiErrCount] = useState(0)
  const [metalsTs,    setMetalsTs]    = useState(() =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  )

  useEffect(() => {
    function loadAll() {
      fetch('/api/news')
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
        .then(d => { if (Array.isArray(d) && d.length > 0) setNews(d) })
        .catch(err => { console.error('[news]', err); setApiErrCount(c => c + 1) })
        .finally(() => setNewsLoading(false))

      fetch('/api/fx')
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
        .then(d => setFxData(d))
        .catch(err => { console.error('[fx]', err); setApiErrCount(c => c + 1) })

      fetch('/api/commodities')
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
        .then(d => setCommodities(d))
        .catch(err => { console.error('[commodities]', err); setApiErrCount(c => c + 1) })
    }

    loadAll()
    const dataInterval   = setInterval(loadAll, DATA_REFRESH_MS)
    const metalsInterval = setInterval(() =>
      setMetalsTs(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })),
      60_000
    )

    return () => {
      clearInterval(dataInterval)
      clearInterval(metalsInterval)
    }
  }, [])

  const refreshFx = () => {
    fetch('/api/fx')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(d => setFxData(d))
      .catch(err => { console.error('[fx refresh]', err); setApiErrCount(c => c + 1) })
  }

  return { news, newsLoading, fxData, commodities, metalsTs, apiErrCount, refreshFx }
}
