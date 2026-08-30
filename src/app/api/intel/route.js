// ATLAS TERMINAL — /api/intel/route.js
// Live trade intelligence: NewsAPI.org + static World Bank stability scores
// Requires NEWS_API_KEY environment variable

// World Bank Political Stability Index 2023 — normalized 0–100
// Source: World Bank Worldwide Governance Indicators (PV.EST, 2023)
// Updates annually — static lookup is appropriate
const WB_STABILITY = {
  CN: 42, JP: 70, MX: 34, VN: 50, IN: 28, DE: 67, US: 45,
  TW: 64, KR: 57, MY: 58, TH: 42, BD: 32, ID: 45, BR: 48,
  TR: 20, PL: 62, CZ: 72, IT: 62, FR: 41, GB: 60, NL: 67,
  BE: 65, ES: 50, CA: 68, SG: 82, PH: 34, LK: 37, KH: 20,
  MM: 8,  MA: 37, ET: 12, EG: 25, IL: 18, AE: 72, SA: 30,
  AU: 85, CL: 60, CO: 22, PE: 28, AR: 35, SE: 88, AT: 85,
  CH: 90, HU: 55, RO: 42, UA: 10, RU: 15, PK: 12, NG: 10,
  ZA: 33, GH: 52,
}

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
  'nigeria': 'NG', 'south africa': 'ZA', 'ghana': 'GH',
}

const NEWS_API_KEY = process.env.NEWS_API_KEY || ''

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

async function fetchNewsAPI(countries, query) {
  if (!NEWS_API_KEY) return []
  // Extract meaningful commodity keywords from the scan query (skip short/generic words)
  const STOP = new Set(['and','the','for','with','from','into','that','this','are','have','trade','supply','chain','global'])
  const commodityWords = query
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP.has(w.toLowerCase()))
    .slice(0, 3)
  const commodityTerms = commodityWords.length
    ? `(${commodityWords.join(' OR ')})`
    : ''
  const countryTerms = countries.slice(0, 3).length
    ? `(${countries.slice(0, 3).join(' OR ')})`
    : ''
  // Build targeted query: commodity keywords + trade context
  const queryParts = [commodityTerms, countryTerms].filter(Boolean)
  const baseQ = queryParts.join(' AND ')
  const tradeContext = 'AND (trade OR tariff OR "supply chain" OR export OR import OR sanctions OR sourcing OR manufacturing)'
  const q = encodeURIComponent(`${baseQ} ${tradeContext}`)
  const url = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&pageSize=8&apiKey=${NEWS_API_KEY}`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return []
    const data = await res.json()
    if (data.status !== 'ok') return []
    return (data.articles || []).map(a => ({
      title: a.title,
      url: a.url,
      source: a.source?.name || 'NewsAPI',
      pubDate: a.publishedAt,
      tone: /sanction|tariff|ban|restrict|conflict|crisis|war|halt|shortage/.test((a.title || '').toLowerCase()) ? -5 : 0,
    }))
  } catch { return [] }
}

export async function POST(req) {
  try {
    const { opportunities, query } = await req.json()
    if (!opportunities?.length || !query) {
      return Response.json({ error: 'Missing data' }, { status: 400 })
    }

    const countries = extractCountries(opportunities)

    // Build country scores instantly from static lookup — no network call needed
    const countryScores = {}
    countries.forEach(country => {
      const iso2 = COUNTRY_ISO2[country]
      if (iso2 && WB_STABILITY[iso2] !== undefined) {
        countryScores[iso2] = { stability: WB_STABILITY[iso2], source: 'WB 2023' }
      }
    })

    // Fetch news from NewsAPI
    const allArticles = await fetchNewsAPI(countries, query)
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
