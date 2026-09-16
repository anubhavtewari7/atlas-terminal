// OpenSky Network — free public API, no key required
// Returns live aircraft positions globally (rate-limited to ~10s per IP)
export const runtime = 'edge'

export async function GET() {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)

    const res = await fetch('https://opensky-network.org/api/states/all', {
      signal: ctrl.signal,
      headers: { 'Accept': 'application/json' },
    })
    clearTimeout(timer)

    if (!res.ok) {
      return Response.json({ flights: [], count: 0, error: `OpenSky ${res.status}`, ts: Date.now() }, { status: 200 })
    }

    const data = await res.json()

    // OpenSky state vector fields:
    // [0] icao24, [1] callsign, [2] origin_country, [3] time_position,
    // [4] last_contact, [5] longitude, [6] latitude, [7] baro_altitude,
    // [8] on_ground, [9] velocity, [10] true_track (heading), [11] vertical_rate
    const flights = (data.states || [])
      .filter(s => s[5] != null && s[6] != null && s[8] === false) // has lat/lng, airborne
      .map(s => ({
        icao:     s[0],
        callsign: (s[1] || '').trim() || s[0],
        country:  s[2] || 'Unknown',
        lng:      s[5],
        lat:      s[6],
        alt:      s[7] ? Math.round(s[7]) : null,   // metres
        velocity: s[9] ? Math.round(s[9] * 1.94384) : null, // knots
        heading:  s[10] ? Math.round(s[10]) : null,
      }))

    return Response.json({
      flights,
      count: flights.length,
      ts: Date.now(),
    })
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'OpenSky timeout' : err.message
    return Response.json({ flights: [], count: 0, error: msg, ts: Date.now() }, { status: 200 })
  }
}
