import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

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
  'egypt': 'EG', 'israel': 'IL', 'uae': 'AE', 'saudi arabia': 'SA',
  'australia': 'AU', 'chile': 'CL', 'colombia': 'CO', 'peru': 'PE',
  'argentina': 'AR', 'portugal': 'PT', 'sweden': 'SE', 'austria': 'AT',
  'switzerland': 'CH', 'hungary': 'HU', 'romania': 'RO', 'ukraine': 'UA',
  'russia': 'RU', 'pakistan': 'PK', 'nigeria': 'NG', 'kenya': 'KE',
  'south africa': 'ZA', 'ghana': 'GH',
}

function extractCountries(opportunities) {
  const found = new Set()
  for (const opp of opportunities) {
    const name = (opp.hub || '').toLowerCase()
    for (const country of Object.keys(COUNTRY_ISO2)) {
      if (name.includes(country)) { found.add(country); break }
    }
  }
  return Array.from(found).slice(0, 5) // cap at 5 countries
}

async function fetchGDELT(country, query) {
  const terms = query.split(' ').slice(0, 3).join(' ')
  const q = encodeURIComponent(`${country} trade supply chain ${terms}`)
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=artlist&maxrecords=6&format=json&timespan=7d&sort=DateDesc`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AtlasTerminal/1.0 (supply-chain-intelligence; contact: anubhav.tewari@slate.auto)' },
      signal: AbortSignal.timeout(8000)
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.articles || []).map(a => ({
      title: a.title,
      url: a.url,
      source: a.domain,
      tone: a.tone
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
    // Normalize -2.5→2.5 to 0→100
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

    // Fetch GDELT news + World Bank scores in parallel
    const [gdeltResults, wbResults] = await Promise.all([
      Promise.all(countries.map(c => fetchGDELT(c, query))),
      Promise.all(countries.map(c => {
        const iso2 = COUNTRY_ISO2[c]
        return iso2 ? fetchWorldBankStability(iso2) : Promise.resolve(null)
      }))
    ])

    // Build country scores keyed by ISO2
    const countryScores = {}
    countries.forEach((country, i) => {
      const iso2 = COUNTRY_ISO2[country]
      if (iso2 && wbResults[i]) countryScores[iso2] = wbResults[i]
    })

    const allArticles = gdeltResults.flat()
    const topArticles = allArticles.slice(0, 10)
    const sourceCount = new Set(allArticles.map(a => a.source).filter(Boolean)).size

    // Synthesize brief with Claude Haiku (fast + cheap)
    const articleLines = topArticles.length > 0
      ? topArticles.map(a => `• ${a.title} (${a.source || 'unknown'})`).join('\n')
      : 'No recent trade news found for these countries.'

    const countryContext = countries.map((c, i) => {
      const wb = wbResults[i]
      const iso2 = COUNTRY_ISO2[c]
      return `${c.charAt(0).toUpperCase() + c.slice(1)} (${iso2 || '??'}): stability ${wb ? wb.stability + '/100' : 'N/A'}`
    }).join(', ')

    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 280,
      messages: [{
        role: 'user',
        content: `You are a supply chain intelligence analyst. Write a concise 3-sentence trade intelligence brief for a procurement professional sourcing "${query}".

Country political stability scores (0=very unstable, 100=very stable, World Bank data):
${countryContext}

Recent trade news headlines (GDELT, last 7 days):
${articleLines}

Rules: 3 sentences maximum. No headers, no bullets, no markdown. Be specific — name countries, cite the stability scores where relevant, and flag the most actionable risk or opportunity. Plain prose only.`
      }]
    })

    const brief = msg.content[0]?.text?.trim() || ''

    return Response.json({
      brief,
      countryScores,
      sourceCount,
      articleCount: allArticles.length,
      countries,
      timestamp: new Date().toISOString()
    })

  } catch (err) {
    console.error('[/api/intel]', err)
    return Response.json({ error: 'Intel fetch failed' }, { status: 500 })
  }
}
