import { NextResponse } from 'next/server'

// --------------------------------------------------------------------------
// ACLED -- Armed Conflict Location & Event Data Project
// Free API (requires registration at acleddata.com)
// Set ACLED_API_KEY and ACLED_EMAIL in Vercel environment variables.
// Without them, the route returns a curated hardcoded fallback.
// --------------------------------------------------------------------------

const CACHE_MS  = 60 * 60 * 1000   // 1-hour cache (ACLED updates daily)
let _cache     = null
let _cacheTime = 0

// Supply-chain-relevant countries and their approximate coordinates
const SC_COUNTRIES = [
  'China', 'Taiwan', 'Vietnam', 'India', 'Bangladesh', 'Myanmar', 'Thailand',
  'Indonesia', 'Malaysia', 'Philippines', 'South Korea',
  'Ukraine', 'Russia', 'Israel', 'Yemen', 'Sudan', 'Ethiopia',
  'Democratic Republic of Congo', 'Nigeria', 'Libya',
  'Mexico', 'Colombia', 'Venezuela', 'Ecuador', 'Peru',
  'Pakistan', 'Afghanistan', 'Iran', 'Iraq',
]

// ACLED event types most relevant to supply-chain disruption
const RELEVANT_TYPES = new Set([
  'Battles', 'Explosions/Remote violence', 'Violence against civilians',
  'Riots', 'Protests',
])

// Severity mapping from ACLED event type + fatalities
function deriveSeverity(eventType, fatalities) {
  if (eventType === 'Battles' || eventType === 'Explosions/Remote violence') {
    return fatalities >= 10 ? 'HIGH' : 'MEDIUM'
  }
  if (eventType === 'Riots') return fatalities >= 5 ? 'HIGH' : 'MEDIUM'
  return 'MEDIUM'
}

// --------------------------------------------------------------------------
// Hardcoded baseline -- realistic representative incidents
// Updated manually; used when ACLED key is absent or API is unavailable.
// IDs use acled_ prefix for deduplication in the merger.
// --------------------------------------------------------------------------
const FALLBACK_INCIDENTS = [
  {
    id: 'acled_ukraine_front',
    title: 'Active Combat -- Eastern Ukraine Front',
    type: 'Risk', category: 'Armed Conflict', severity: 'HIGH',
    lat: 48.5, lng: 37.5,
    desc: 'Ongoing large-scale hostilities across the Donetsk and Zaporizhzhia oblasts. Black Sea grain corridor remains under pressure; Ukrainian steel and agricultural exports severely curtailed.',
    mitigation: 'Reroute Ukrainian wheat and sunflower oil sourcing to Argentina, Brazil, or EU. Monitor Black Sea insurance premiums as war-risk proxy.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_red_sea',
    title: 'Houthi Maritime Attacks -- Red Sea / Gulf of Aden',
    type: 'Risk', category: 'Armed Conflict', severity: 'HIGH',
    lat: 14.0, lng: 43.5,
    desc: 'Houthi forces continue targeting commercial shipping in the Red Sea and Gulf of Aden. Major carriers have diverted around the Cape of Good Hope, adding 12-14 days and ~$1M per vessel.',
    mitigation: 'Price in Cape diversion on all Asia-Europe lanes. Review force majeure clauses with carriers. Verify war-risk insurance coverage for Red Sea transits.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_taiwan_strait',
    title: 'PLA Military Exercises -- Taiwan Strait',
    type: 'Risk', category: 'Geopolitical Tension', severity: 'HIGH',
    lat: 24.5, lng: 120.5,
    desc: 'PLA conducts periodic large-scale military exercises around Taiwan. Exercises have temporarily restricted commercial air and sea traffic. Semiconductor supply concentration risk (TSMC, ASE) is extreme.',
    mitigation: 'Accelerate dual-sourcing of critical semiconductors to Korea (Samsung, SK Hynix) and US (Intel, Micron). Build 90-day safety stock on A/B chip families.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_myanmar',
    title: 'Civil War -- Myanmar / Rakhine State',
    type: 'Risk', category: 'Armed Conflict', severity: 'HIGH',
    lat: 20.0, lng: 96.0,
    desc: 'Multi-front civil conflict disrupts garment, jade, and rare earth supply chains. Rakhine State operations suspended by multiple apparel brands. Cross-border China-Myanmar trade corridors intermittently closed.',
    mitigation: 'Shift garment sourcing to Vietnam, Bangladesh, or Cambodia. Audit jade and rare earth suppliers for Myanmar origin. Implement enhanced due diligence.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_drc_cobalt',
    title: 'Armed Group Activity -- DRC Kivu Provinces',
    type: 'Risk', category: 'Armed Conflict', severity: 'HIGH',
    lat: -2.5, lng: 28.0,
    desc: 'M23 and affiliated armed groups active in North and South Kivu, threatening artisanal cobalt and coltan mining operations. OECD due diligence requirements apply to all DRC-sourced minerals.',
    mitigation: 'Require RMI-RMAP or equivalent audit for all DRC cobalt. Develop Indonesia NPI cobalt sulfate as a non-African alternative. Assess battery recycling yield for partial offset.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_mexico_cargo',
    title: 'Cartel Cargo Extortion -- Mexican Highway Corridors',
    type: 'Risk', category: 'Organized Crime', severity: 'HIGH',
    lat: 24.0, lng:-104.0,
    desc: 'CJNG and Sinaloa Cartel factions operating toll extortion on Guadalajara-Lázaro Cárdenas and Monterrey-Nuevo Laredo corridors. Cargo theft incidents up YoY across Jalisco, Michoacán, Guanajuato.',
    mitigation: 'Use GPS-tracked convoys with armed escorts on Michoacán routes. Shift import gateway to Manzanillo only for consignments with enhanced security. Require shipper cargo insurance with theft riders.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_israel_region',
    title: 'Regional Escalation Risk -- Israel / Middle East',
    type: 'Risk', category: 'Armed Conflict', severity: 'HIGH',
    lat: 31.5, lng: 35.0,
    desc: 'Ongoing conflict in Gaza with regional spillover risk. Haifa port activity reduced; Eilat port near-closed due to Houthi threat. Israeli tech and semiconductor exports (Tower Semiconductor) at risk if escalation widens.',
    mitigation: 'Diversify Israeli-origin specialty chemicals and semiconductors. Monitor Suez/Red Sea insurance premium as a leading indicator of wider regional risk.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_nigeria_oil',
    title: 'Pipeline Sabotage & Theft -- Niger Delta',
    type: 'Risk', category: 'Armed Conflict', severity: 'MEDIUM',
    lat:  5.5, lng:  6.5,
    desc: 'Ongoing pipeline sabotage and crude theft in the Niger Delta reduces oil output and disrupts cocoa/palm oil logistics via Port Harcourt. Forcados and Bonny export terminals face periodic shutdowns.',
    mitigation: 'Flag Nigeria-origin agricultural commodities for supply continuity review. Verify Bonny LNG terminal operating status before scheduling LNG charters.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_colombia_coca',
    title: 'FARC Dissidents -- Colombia Trade Corridors',
    type: 'Risk', category: 'Armed Conflict', severity: 'MEDIUM',
    lat:  4.5, lng:-74.0,
    desc: 'FARC dissident factions and ELN active in Cauca, Norte de Santander, and Chocó. Coffee and flower export routes from Bogotá hinterland face intermittent disruption. Buenaventura port access sporadically affected.',
    mitigation: 'Diversify Colombian coffee sourcing with Ethiopian or Vietnamese origins as buffer. Assess Buenaventura congestion risk on southbound Panama Canal routing.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_bangladesh_labor',
    title: 'Labor Unrest -- Dhaka Garment Sector',
    type: 'Risk', category: 'Protests', severity: 'MEDIUM',
    lat: 23.8, lng: 90.4,
    desc: 'Recurring wage protests at Dhaka and Chittagong Export Processing Zones. Factory shutdowns during unrest periods average 3-7 days. Political instability following 2024 transition elevates structural risk.',
    mitigation: 'Build 45-day finished goods buffer for Bangladesh-origin SKUs. Pre-position orders in Vietnam or Cambodia as surge capacity. Review supplier wage compliance and social audit cadence.',
    source: 'ACLED (Baseline)',
  },
  {
    id: 'acled_ethiopia_corridor',
    title: 'Conflict Spillover -- Ethiopia Logistics Corridor',
    type: 'Risk', category: 'Armed Conflict', severity: 'MEDIUM',
    lat:  9.0, lng: 40.0,
    desc: 'Residual Tigray conflict and Amhara unrest disrupt the Addis Ababa-Djibouti rail corridor, Ethiopia\'s primary trade artery. Coffee, sesame, and cut flower exports face transit delays.',
    mitigation: 'Source Ethiopian coffee through pre-committed forward contracts with Djibouti buffer warehousing. Monitor IGAD peace process status as a leading indicator.',
    source: 'ACLED (Baseline)',
  },
]

// --------------------------------------------------------------------------
// Fetch live ACLED data (last 30 days, supply-chain countries, relevant types)
//
// Supports two auth modes -- whichever env vars are set:
//   1. Bearer token  (ACLED_TOKEN)  -- new developer.acleddata.com portal
//   2. Key + email   (ACLED_API_KEY + ACLED_EMAIL)  -- legacy access portal
// --------------------------------------------------------------------------
async function fetchAcledLive({ token, apiKey, email }) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 3600 * 1000)
  const dateStr = thirtyDaysAgo.toISOString().split('T')[0]
  const today   = new Date().toISOString().split('T')[0]

  const params = new URLSearchParams({
    event_date:       dateStr,
    event_date_where: 'BETWEEN',
    event_date2:      today,
    country:          SC_COUNTRIES.join('|'),
    fields:           'event_id_cnty|event_date|country|location|latitude|longitude|event_type|sub_event_type|notes|fatalities',
    limit:            '500',
  })

  // Legacy key+email auth adds creds as query params
  if (!token && apiKey && email) {
    params.set('key',   apiKey)
    params.set('email', email)
  }

  const headers = { 'User-Agent': 'ATLAS-Terminal/1.0' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`https://api.acleddata.com/acled/read?${params}`, { headers })
  if (!res.ok) throw new Error(`ACLED ${res.status}`)
  const json = await res.json()
  if (!json.data?.length) throw new Error('No ACLED data')
  return json.data
}

// --------------------------------------------------------------------------
// Convert ACLED events to risk objects, clustered by country
// --------------------------------------------------------------------------
function acledToRisks(events) {
  // Group by country
  const byCountry = {}
  for (const e of events) {
    if (!RELEVANT_TYPES.has(e.event_type)) continue
    const key = e.country
    if (!byCountry[key]) byCountry[key] = { events:[], country:e.country, lat:null, lng:null }
    byCountry[key].events.push(e)
    // Use centroid from first event
    if (!byCountry[key].lat) {
      byCountry[key].lat = parseFloat(e.latitude)
      byCountry[key].lng = parseFloat(e.longitude)
    }
  }

  return Object.values(byCountry).map(group => {
    const count      = group.events.length
    const fatalities = group.events.reduce((sum, e) => sum + (parseInt(e.fatalities) || 0), 0)
    const topType    = group.events[0]?.event_type || 'Conflict'
    const severity   = deriveSeverity(topType, fatalities)
    const recentNotes = group.events.slice(0, 2).map(e => e.notes).filter(Boolean).join(' ')

    return {
      id:       `acled_${group.country.toLowerCase().replace(/\s+/g,'_')}`,
      title:    `${topType} Activity -- ${group.country}`,
      type:     'Risk',
      category: 'Armed Conflict',
      severity,
      lat:      group.lat,
      lng:      group.lng,
      desc:     `${count} events in last 30 days (${fatalities} fatalities). ${recentNotes.slice(0, 200)}`,
      mitigation: `Monitor ${group.country} sourcing continuity. Check supplier operational status. Review force majeure and war-risk clauses.`,
      source:   'ACLED Live',
    }
  }).sort((a, b) => (b.severity === 'HIGH' ? 1 : 0) - (a.severity === 'HIGH' ? 1 : 0))
}

// --------------------------------------------------------------------------
// Route handler
// --------------------------------------------------------------------------
export async function GET() {
  try {
    if (_cache && Date.now() - _cacheTime < CACHE_MS) {
      return NextResponse.json(_cache)
    }

    // Prefer new Bearer token (developer.acleddata.com portal),
    // fall back to legacy key + email pair (old access portal)
    const token  = process.env.ACLED_TOKEN
    const apiKey = process.env.ACLED_API_KEY
    const email  = process.env.ACLED_EMAIL
    const hasAuth = token || (apiKey && email)

    let incidents, source

    if (hasAuth) {
      try {
        const events = await fetchAcledLive({ token, apiKey, email })
        incidents = acledToRisks(events)
        source    = 'ACLED Live'
      } catch (acledErr) {
        console.info('[/api/incidents] ACLED live unavailable, using baseline:', acledErr.message)
        incidents = FALLBACK_INCIDENTS
        source    = 'ACLED Baseline (API error)'
      }
    } else {
      console.info('[/api/incidents] No ACLED credentials -- using hardcoded baseline')
      incidents = FALLBACK_INCIDENTS
      source    = 'ACLED Baseline (no credentials)'
    }

    const payload = {
      incidents,
      total: incidents.length,
      updated: new Date().toISOString(),
      source,
      keyConfigured: !!hasAuth,
    }

    _cache     = payload
    _cacheTime = Date.now()

    return NextResponse.json(payload)

  } catch (err) {
    console.error('[/api/incidents]', err.message)
    return NextResponse.json({
      incidents: FALLBACK_INCIDENTS,
      total: FALLBACK_INCIDENTS.length,
      updated: new Date().toISOString(),
      source: 'ACLED Baseline (error fallback)',
      keyConfigured: false,
      error: err.message,
    })
  }
}
