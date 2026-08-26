// ATLAS TERMINAL — /api/intel/route.js
// Live intelligence: GDELT news + World Bank stability scores
// No API keys required — both sources are free and public

const COUNTRY_ISO2 = {
  'china': 'CN', 'japan': 'JP', 'mexico': 'MX', 'vietnam': 'VN',
  'india': 'IN', 'germany': 'DE', 'usa': 'US', 'united states': 'US',
  'taiwan': 'TW', 'south korea': 'KR', 'korea': 'KR', 'malaysia': 'MY',
  'thailand': 'TH', 'bangladesh': 'BD', 'indonesia': 'ID', 'brazil': 'BR',
  'turkey': 'TR', 'poland': 'PL', 'czech republic': 'CZ', 'czechia': 'CZ',
  'italy': 'IT', 'france': 'FR', 'uk': 'GB', 'united kingdom': 'GB',
  'netherlands': 'NL', 'belgium': 'BE', 'spain': 'ES', 'canada': 'CA',
  'singapore': 'SG', 'philippines': 'PH', 'sri lanka': 'LK',
  'cambodia': 'KH', 'myanmar': 'MM', 'morocco': 'MA', 'ethiopia': 'ET',
  'egypt': 'EG', 'uae': 'AE', 'saudi arabia': 'SA', 'australia': 'AU',
  'chile': 'CL', 'colombia': 'CO', 'peru': 'PE', 'argentina': 'AR',
  'sweden': 'SE', 'austria': 'AT', 'switzerland': 'CH', 'pakistan': 'PK',
  'nigeria': 'NG', 'south africa': 'ZA',
}

function extractCountries(opportunities) {
  const found = new Set()
  for (const opp of opportunities) {
    const name = (opp.hub || '').toLowerCase()
    for (const country of Object.keys(COUNTRY_ISO2)) {
      if (name.includes(country)) { found.add(country); break }
    }
  }
  return Array.from(found).slice(0, 5)
}

async function fetchGDELT(country, query) {
  const terms = query.split(' ').slice(0, 3).join(' ')
  const q = encodeURIComponent(`${country} trade supply chain tariff ${terms}`)
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=artlist&maxrecords=5&format=json&timespan=7d&sort=DateDesc`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AtlasTerminal/1.0 (supply-chain-intelligence)' },
      signal: AbortSignal.timeout(8000)
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.articles || []).slice(0, 5).map(a => ({
      title: a.title,
      url: a.url,
      source: a.domain,
      tone: typeof a.tone === 'number' ? Math.round(a.tone) : 0,
    }))
  } catch { return [] }
}

async function fetchWorldBankStability(iso2) {
  const url = `https://api.worldbank.org/v2/country/${iso2}/indicator/PV.EST?format=json&mrv=1&per_page=1`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AtlasTerminal/1.0' },
      signal: AbortSignal.timeout(6000)
    })
    if (!res.ok) return null
    const data = await res.json()
    const value = data?.[1]?.[0]?.value
    if (value === null || value === undefined) return null
    // Normalize -2.5→2.5 to 0→100 stability
    const stability = Math.round(((value + 2.5) / 5) * 100)
    return { stability, raw: value }
  } catch { return null }
}

export async function POST(req) {
  try {
    const { opportunities, query } = await req.json()
    if (!opportunities?.length || !query) {
      return Response.json({ error: 'Missing data' }, { status: 400 })
    }

    const countries = extractCountries(opportunities)
    if (countries.length === 0) {
      return Response.json({ error: 'No countries found' }, { status: 400 })
    }

    // Parallel fetch — both sources, all countries at once
    const [gdeltResults, wbResults] = await Promise.all([
      Promise.all(countries.map(c => fetchGDELT(c, query))),
      Promise.all(countries.map(c => {
        const iso2 = COUNTRY_ISO2[c]
        return iso2 ? fetchWorldBankStability(iso2) : Promise.resolve(null)
      }))
    ])

    // Country stability scores keyed by ISO2
    const countryScores = {}
    countries.forEach((country, i) => {
      const iso2 = COUNTRY_ISO2[country]
      if (iso2 && wbResults[i]) countryScores[iso2] = wbResults[i]
    })

    // Deduplicate articles by title, pick most negative tone first (most impactful)
    const seen = new Set()
    const allArticles = gdeltResults.flat().filter(a => {
      if (!a.title || seen.has(a.title)) return false
      seen.add(a.title)
      return true
    }).sort((a, b) => a.tone - b.tone) // most negative (alarming) first

    const topArticles = allArticles.slice(0, 6)
    const sourceCount = new Set(allArticles.map(a => a.source).filter(Boolean)).size

    return Response.json({
      articles: topArticles,
      countryScores,
      articleCount: allArticles.length,
      sourceCount,
      countries,
      timestamp: new Date().toISOString()
    })

  } catch (err) {
    console.error('[/api/intel]', err)
    return Response.json({ error: 'Intel fetch failed' }, { status: 500 })
  }
}
