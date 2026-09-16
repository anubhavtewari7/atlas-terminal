// adsb.lol — free public ADS-B feed, no key, no rate limit
// Same source used by God's Eye View for live aircraft data
// Fallback: opendata.adsb.fi (also free, no key)

export async function GET() {
  const sources = [
    'https://api.adsb.lol/v2/all',
    'https://opendata.adsb.fi/api/v2/all',
  ]

  for (const url of sources) {
    try {
      const ctrl  = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)

      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: { 'Accept': 'application/json', 'User-Agent': 'NAUTILUS-Terminal/1.0' },
      })
      clearTimeout(timer)

      if (!res.ok) continue

      const data = await res.json()

      // adsb.lol / adsb.fi share the same schema: { ac: [...] }
      const aircraft = data.ac || data.aircraft || []

      const flights = aircraft
        .filter(a => a.lat != null && a.lon != null && a.alt_baro !== 'ground' && a.alt_baro > 0)
        .map(a => ({
          icao:     a.hex  || '',
          callsign: (a.flight || a.r || a.hex || '').trim(),
          country:  a.r    || '',           // registration prefix is closest to country w/o a DB lookup
          type:     a.t    || '',
          lat:      a.lat,
          lng:      a.lon,
          alt:      typeof a.alt_baro === 'number' ? Math.round(a.alt_baro * 0.3048) : null, // ft → m
          velocity: a.gs   ? Math.round(a.gs) : null,   // knots
          heading:  a.track ? Math.round(a.track) : null,
        }))

      return Response.json({
        flights,
        count:  flights.length,
        source: url.includes('adsb.lol') ? 'adsb.lol' : 'adsb.fi',
        ts:     Date.now(),
      })

    } catch {
      // try next source
    }
  }

  return Response.json({
    flights: [],
    count:   0,
    error:   'All flight data sources unavailable',
    ts:      Date.now(),
  })
}
