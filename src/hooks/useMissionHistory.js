"use client"

import { useState, useCallback } from 'react'
import { MAX_MISSION_HISTORY } from '@/lib/terminal-constants'

const STORAGE_KEY = 'atlas_missions'

/**
 * useMissionHistory -- persists past sourcing scans to localStorage and
 * exposes helpers for saving, replaying, and clearing them.
 *
 * Returns:
 *   missionHistory  -- array of past mission objects (loaded from localStorage)
 *   saveMission     -- (query, opps, directive) => void
 *   replayMission   -- (mission, setSearchQuery, handleSearch) => void
 *   clearHistory    -- () => void
 */
export function useMissionHistory() {
  const [missionHistory, setMissionHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const saveMission = useCallback((query, opps, directive) => {
    const entry = {
      query,
      timestamp:   Date.now(),
      primaryHub:  opps[0]?.hub  || null,
      hubCount:    opps.length,
      topPartner:  opps[0]?.companies?.[0]?.name || null,
      directive,
    }
    setMissionHistory(prev => {
      const updated = [...prev, entry].slice(-MAX_MISSION_HISTORY)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  // replayMission delegates setting state back to the caller (Dashboard) to
  // avoid coupling this hook to the scan machinery.
  const replayMission = useCallback((mission, setSearchQuery, handleSearch) => {
    setSearchQuery(mission.query)
    handleSearch(null, mission.query)
  }, [])

  const clearHistory = useCallback(() => {
    setMissionHistory([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return { missionHistory, saveMission, replayMission, clearHistory }
}
