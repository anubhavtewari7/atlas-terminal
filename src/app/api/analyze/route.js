import { NextResponse } from 'next/server';
import { ATLAS_DB, categorizeQuery } from '@/lib/database';

export async function POST(req) {
  try {
    const { material } = await req.json();

    // Deterministic intelligence mapping
    const category = categorizeQuery(material || '');
    const opportunities = ATLAS_DB[category] || ATLAS_DB.electronics; // fallback

    const selectedHub = opportunities[0];

    const data = {
      directive: {
        best_region: selectedHub.hub,
        best_partner: selectedHub.companies[0]?.name || "Strategic Partner",
        route: "Global Logistics Corridor",
        summary: `Deterministic scan complete. Identified ${opportunities.length} major strategic hubs for ${category} procurement. Primary recommendation is ${selectedHub.hub}.`,
        tariff_alert: `HTS: ${selectedHub.customs.hts_code} | Duty: ${selectedHub.customs.duty_rate} — ${selectedHub.customs.compliance_note}`
      },
      risks: [
        { risk: "Supply Concentration", severity: "High", mitigation: "Enable dual-sourcing across mapped regions." },
        { risk: "Freight Volatility", severity: "Medium", mitigation: "Lock long-term ocean contracts." }
      ],
      opportunities: opportunities,
      market_data: {
        currency: { pair: "USD/INDEX", rate: 104.2, impact: "Stable" },
        price_history: [ { month: 'Q1', price: 100 }, { month: 'Q2', price: 92 }, { month: 'Q3', price: 95 }, { month: 'Q4', price: 105 } ],
        rfq_template: `Dear Procurement Team,\n\nWe are looking to secure high-volume supply for: ${material}.\n\nPlease provide a quote including shipping terms and ESG compliance certification.`
      }
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Strategy Error:", error);
    return NextResponse.json({ error: "Strategy scan failed" }, { status: 500 });
  }
}
