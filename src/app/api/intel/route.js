// ATLAS TERMINAL — /api/intel/route.js
// Live trade intelligence: RSS news via rss2json + static World Bank stability scores
// No API keys required

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

// RSS feeds covering trade, supply chain, and geopolitics
const RSS_FEEDS = [
  'https://feeds.reuters.com/reuters/businessNews',
  'https://feeds.reuters.com/reuters/technologyNews',
  'https://www.scmr.com/rss/topic/all',
]

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

function isRelevant(text, countries) {
  if (!text) return false
  const t = text.toLowerCase()
  // Check if article mentions any of our countries or key trade terms
  const tradeTerms = ['trade', 'tariff', 'supply chain', 'import', 'export', 'manufacturing', 'sourcing', 'freight', 'logistics', 'sanctions', 'duty']
  const countryMatch = countries.some(c => t.includes(c))
  const tradeMatch = tradeTerms.some(term => t.includes(term))
  return countryMatch || tradeMatch
}

async function fetchRSSFeed(feedUrl, countries) {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=20`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return []
    const data = await res.json()
    if (data.status !== 'ok') return []
    return (data.items || [])
      .filter(item => isRelevant((item.title || '') + ' ' + (item.description || ''), countries))
      .slice(0, 6)
      .map(item => ({
        title: item.title?.replace(/<[^>]+>/g, '').trim(),
        url: item.link,
        source: data.feed?.title || new URL(feedUrl).hostname,
        pubDate: item.pubDate,
        // Simple negativity heuristic: presence of risk words
        tone: /sanction|tariff|ban|restrict|conflict|surge|crisis|war|halt|shortage/.test((item.title || '').toLowerCase()) ? -5 : 0,
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

    // Fetch news from RSS feeds in parallel
    const feedResults = await Promise.all(
      RSS_FEEDS.map(feed => fetchRSSFeed(feed, countries.length > 0 ? countries : ['trade', 'supply']))
    )

    // Merge, deduplicate, sort by tone (most negative/impactful first)
    const seen = new Set()
    const allArticles = feedResults.flat().filter(a => {
      if (!a.title || seen.has(a.title)) return false
      seen.add(a.title)
      return true
    }).sort((a, b) => a.tone - b.tone)

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
