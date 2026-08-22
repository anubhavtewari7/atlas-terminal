// ============================================================
// ATLAS TERMINAL — /api/risk/route.js
// Place at: src/app/api/risk/route.js
// Used by: src/components/TradeRiskScore.js
// ============================================================

import { NextResponse } from 'next/server';
import { calculateRisk } from '@/lib/database';

export async function POST(req) {
  try {
    const { origin, destination, product = '' } = await req.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    const risk = calculateRisk(origin, destination, product);

    // Build the detailed component breakdown for the UI
    const components = {
      geopolitical: {
        label: 'Geopolitical',
        score: risk.breakdown.geopolitical,
        detail: getGeopoliticalDetail(origin, risk.breakdown.geopolitical)
      },
      weather: {
        label: 'Weather / Force Majeure',
        score: risk.breakdown.weather,
        detail: getWeatherDetail(origin, risk.breakdown.weather)
      },
      labor: {
        label: 'Labor / Strike Risk',
        score: risk.breakdown.labor,
        detail: getLaborDetail(origin, destination, risk.breakdown.labor)
      },
      infrastructure: {
        label: 'Infrastructure / Port',
        score: risk.breakdown.infrastructure,
        detail: getInfraDetail(origin, destination, risk.breakdown.infrastructure)
      }
    };

    // Generate a specific key alert based on highest risk factor
    const maxFactor = Object.entries(risk.breakdown).reduce((a, b) => a[1] > b[1] ? a : b)
    const keyAlert = generateKeyAlert(origin, destination, product, maxFactor[0], maxFactor[1])
    const alternativeRoute = generateAlternativeRoute(origin, destination, product)

    const response = {
      overall_score:            risk.overall,
      rating:                   risk.rating,
      transit_days:             risk.transit_days,
      recommended_buffer:       risk.recommended_buffer,
      components,
      key_alert:                keyAlert,
      alternative_route:        alternativeRoute,
      insurance_premium_estimate: `${risk.insurance_premium} of cargo value`,
      narrative:                risk.narrative
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[ATLAS] Risk API error:', error);
    return NextResponse.json(
      { error: 'Risk assessment failed. Please retry.' },
      { status: 500 }
    );
  }
}

// ── Detail generators ──

function getGeopoliticalDetail(origin, score) {
  const o = origin.toLowerCase()
  if (score >= 50) {
    if (o.includes('china') || o.includes('shanghai')) return 'Section 301 tariffs (25%) active. Trade war escalation risk. Taiwan Strait tensions affect shipping lanes.'
    if (o.includes('taiwan')) return 'Taiwan Strait military tension. PRC blockade scenario poses existential supply chain risk.'
    if (o.includes('russia')) return 'OFAC sanctions active. SWIFT exclusion. Most shipping lanes and air routes closed.'
    return 'Elevated geopolitical tension. Monitor trade policy developments closely.'
  }
  if (score >= 25) {
    if (o.includes('europe') || o.includes('germany')) return 'Russia-Ukraine conflict proximity. Energy supply uncertainty. EU regulatory complexity.'
    if (o.includes('korea')) return 'North Korea missile test risk. DPRK escalation cycles create periodic uncertainty.'
    return 'Moderate geopolitical exposure. Standard trade risk management sufficient.'
  }
  return 'Low geopolitical risk. Stable FTA relationships with major trade partners.'
}

function getWeatherDetail(origin, score) {
  const o = origin.toLowerCase()
  if (score >= 30) {
    if (o.includes('japan') || o.includes('taiwan')) return 'Typhoon season (Jun–Nov) creates 1–3 week disruptions annually. Earthquake/tsunami risk.'
    if (o.includes('australia')) return 'Cyclone season (Nov–Apr) affects Pilbara and Queensland. Flooding disrupts rail to ports.'
    if (o.includes('brazil')) return 'Amazon rainy season disrupts road logistics Nov–Mar. Drought impacts hydropower and supply.'
    return 'Significant weather event risk. Build seasonal disruption into planning.'
  }
  if (score >= 15) return 'Moderate seasonal weather risk. Monitor cyclone/hurricane seasons if applicable.'
  return 'Stable weather profile. Low force majeure risk from natural events.'
}

function getLaborDetail(origin, destination, score) {
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()
  if (score >= 35) {
    if (d.includes('usa') || d.includes('los angeles')) return 'ILWU Pacific Coast dockworkers contract disputes recurring. LA/LB port strike risk historically every 3–5 years.'
    if (o.includes('germany') || o.includes('europe')) return 'IG Metall (automotive) and ver.di (logistics) strikes annual probability >60%. German dockworkers militant.'
    if (o.includes('brazil')) return 'Santos port strikes a recurring feature. Brazilian truckers\' strikes (2018, 2022) precedent for supply disruption.'
    return 'Elevated labor dispute probability. Maintain contingency routing options.'
  }
  if (score >= 20) return 'Moderate labor risk. Monitor collective bargaining agreements. Contingency plans recommended.'
  return 'Low labor disruption risk. Stable industrial relations in this corridor.'
}

function getInfraDetail(origin, destination, score) {
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()
  if (score >= 35) {
    if (d.includes('usa') || d.includes('los angeles')) return 'LA/LB port congestion endemic. Inland Empire warehouse capacity constraints. 2–5 day port dwell times normal.'
    if (o.includes('brazil')) return 'Santos port chronically congested (world\'s busiest single-port container terminal). Road to port: poor.'
    if (o.includes('mexico')) return 'Border crossing wait times 6–24 hrs at Laredo/Juarez. Cartel-related cargo theft on highway corridors.'
    return 'Infrastructure bottlenecks create unpredictable lead time variability.'
  }
  if (score >= 15) return 'Moderate infrastructure constraints. Some port congestion or customs processing delays expected.'
  return 'Strong infrastructure. Port reliability and customs processing are efficient.'
}

function generateKeyAlert(origin, destination, product, topFactor, topScore) {
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()
  const p = product.toLowerCase()

  if (o.includes('china') && topFactor === 'geopolitical') return `Section 301 tariffs (25%) apply on ${product || 'this product'} from China. De-risking to Mexico (USMCA 0%) or Vietnam could reduce landed cost by 18–25%.`
  if (o.includes('taiwan') && topFactor === 'geopolitical') return `Taiwan Strait risk is existential for advanced chip supply. TSMC\'s Arizona and Japan fabs now online — begin qualification immediately.`
  if ((d.includes('los angeles') || d.includes('usa')) && topFactor === 'labor') return `ILWU contract at LA/LB ports expires in 2025. Historical precedent: 3–4 week disruptions. Pre-position 6 weeks safety stock before negotiation windows.`
  if (topFactor === 'weather' && topScore >= 30) return `Major weather event risk on this corridor. Build seasonal disruption weeks into your S&OP planning. Consider cargo insurance at 1%+ of CIF value.`
  if (p.includes('magnet') || p.includes('rare earth')) return `China controls 90% of rare earth magnet supply. Any export restriction could halt production within 4–6 weeks. Immediately qualify Japan/US domestic alternate sources.`
  if (topScore >= 60) return `HIGH RISK corridor: ${topFactor.replace('_',' ')} exposure is critical. Recommend immediate escalation to CPO level and contingency sourcing activation.`
  if (topScore >= 35) return `MEDIUM RISK: ${topFactor.replace('_',' ')} exposure warrants proactive mitigation. Review quarterly.`
  return `LOW RISK corridor. Standard risk management protocols sufficient. Monitor for geopolitical developments quarterly.`
}

function generateAlternativeRoute(origin, destination, product) {
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()

  if (o.includes('china')) return 'Route via Vietnam (Ho Chi Minh) or Mexico (Monterrey) to reduce Section 301 tariff exposure and geopolitical risk. +15–25 days lead time but significant duty savings.'
  if (o.includes('taiwan')) return 'Qualify Samsung Foundry (Korea) or Intel Foundry (Arizona) for non-critical nodes. TSMC Arizona Fab 21 now ramping for advanced logic.'
  if (d.includes('los angeles') || d.includes('long beach')) return 'Divert to East Coast ports (Savannah, Houston, NY/NJ) during ILWU negotiations. Add 5–8 days but avoids West Coast strike risk entirely.'
  if (o.includes('brazil')) return 'Route via Argentina (Buenos Aires — Port of Zarate) or Uruguay (Montevideo) for origin diversity. Engage Santos port in off-peak windows (Feb–May).'
  if (o.includes('germany') || o.includes('europe')) return 'During dockworker strikes, divert to Rotterdam → rail to inland destinations, or air freight critical components from Frankfurt to bridge disruption.'
  if (o.includes('mexico')) return 'During border wait time spikes at Laredo, use Nogales (AZ) or El Paso border crossings as alternates. Rail via Kansas City Southern also viable.'
  return 'Consider air freight for high-value, time-critical components to bypass ocean freight variability. Evaluate a secondary supplier in a different geographic region.'
}
