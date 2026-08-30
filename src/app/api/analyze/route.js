// ============================================================
// ATLAS TERMINAL — /api/analyze/route.js
// Place at: src/app/api/analyze/route.js
// ============================================================

import { NextResponse } from 'next/server';
import { ATLAS_DB, categorizeQuery, CATEGORY_RISKS, pickBestHub } from '@/lib/database';
import { enrichWithRealTradeData } from '@/lib/comtrade';

export async function POST(req) {
  try {
    const { material } = await req.json();

    if (!material || typeof material !== 'string') {
      return NextResponse.json({ error: 'Material query is required' }, { status: 400 });
    }

    const query = material.trim();
    const category = categorizeQuery(query);
    const baseOpportunities = ATLAS_DB[category] || ATLAS_DB.food || ATLAS_DB.electronics;
    const selectedHubUnenriched = pickBestHub(baseOpportunities, query);
    // Surface the most relevant hub first in the browsable list too, so it
    // matches the "Primary recommendation" in the directive instead of
    // contradicting it.
    const orderedOpportunities = [selectedHubUnenriched, ...baseOpportunities.filter(h => h.id !== selectedHubUnenriched.id)];

    // Attach real UN Comtrade export figures where available. This is a
    // best-effort enrichment — network issues or missing Comtrade coverage
    // for a given country/HS/year simply leave a hub without the badge,
    // never blocks or fails the mission scan itself.
    const opportunities = await enrichWithRealTradeData(orderedOpportunities);
    const selectedHub = opportunities[0];

    // Build a sharp, category-aware summary
    const categoryLabels = {
      industrial:     'industrial component',
      automotive:     'automotive part',
      electronics:    'electronic component',
      agriculture:    'agricultural commodity',
      food:           'food & beverage product',
      metals:         'metal / mineral',
      textiles:       'textile / apparel',
      plastics:       'plastic / polymer',
      chemicals:      'specialty chemical',
      packaging:      'packaging material',
      medical:        'medical / pharmaceutical',
      machinery:      'industrial machinery',
      wood_paper:     'wood / paper / pulp product',
      construction:   'glass & construction material',
      consumer_goods: 'consumer goods / personal care product'
    };
    const categoryLabel = categoryLabels[category] || 'commodity';

    const data = {
      category,
      directive: {
        best_region:  selectedHub.hub,
        best_partner: selectedHub.companies[0]?.name || 'Strategic Partner',
        route:        selectedHub.logistics?.port_wait_days === 0
                        ? 'Domestic Ground / Rail Transport'
                        : `Ocean / Air — ${selectedHub.logistics?.port_wait_days} day avg lead time`,
        summary:
          `Strategic scan complete for "${query}" (${categoryLabel}). ` +
          `Identified ${opportunities.length} global sourcing hub${opportunities.length > 1 ? 's' : ''}. ` +
          `Primary recommendation: ${selectedHub.hub} — ${selectedHub.desc.split('.')[0]}.`,
        tariff_alert:
          `HTS: ${selectedHub.customs.hts_code} | Duty: ${selectedHub.customs.duty_rate} — ${selectedHub.customs.compliance_note}`
      },

      // Properly structured risks — each has id, title, desc, severity, mitigation, type
      risks: CATEGORY_RISKS[category] || CATEGORY_RISKS.food || CATEGORY_RISKS.electronics,

      opportunities,

      market_data: {
        currency: { pair: 'USD/INDEX', rate: 104.2, impact: 'Stable' },
        price_history: [
          { month: 'Q1', price: 95 },
          { month: 'Q2', price: 88 },
          { month: 'Q3', price: 97 },
          { month: 'Q4', price: 105 }
        ],
        rfq_template:
          `Dear Procurement Team,\n\nWe are ${selectedHub.companies[0]?.name ? `requesting a quote from ${selectedHub.companies[0].name} and your team` : 'initiating a sourcing inquiry'} for the following requirement:\n\nMaterial / Component: ${query}\nApplication: [Describe your end-use application]\nEstimated Annual Volume: [Units / MT / pieces]\nRequired Delivery: [Target date]\nIncoterm Preference: [DDP / FOB / CIF]\n\nPlease provide:\n1. Unit pricing (at 3 volume tiers)\n2. Lead time (standard and expedited)\n3. Freight and insurance terms\n4. ESG / sustainability certification status\n5. Country of origin and HTS classification\n\nWe look forward to your response within 5 business days.\n\nBest regards,\n[Your Name]\n[Company] Procurement Team`
      }
    };

    return NextResponse.json(data);

  } catch (error) {
    console.error('[ATLAS] Analyze API error:', error);
    return NextResponse.json(
      { error: 'Strategy scan failed. Please retry.' },
      { status: 500 }
    );
  }
}