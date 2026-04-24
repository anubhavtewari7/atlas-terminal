import { NextResponse } from 'next/server';
import { calculateRisk } from '@/lib/database';

export async function POST(req) {
  try {
    const { origin, destination, product } = await req.json();

    const riskData = calculateRisk(origin || "Unknown", destination || "Unknown");

    const data = {
      overall_score: riskData.overall,
      rating: riskData.overall > 65 ? "HIGH" : riskData.overall > 35 ? "MEDIUM" : "LOW",
      components: {
        port_congestion: { score: Math.min(99, riskData.breakdown.infrastructure + 20), label: "Port Congestion", detail: "Calculated based on global infrastructure baselines." },
        geopolitical: { score: riskData.breakdown.geopolitical, label: "Geopolitical Tension", detail: "Tariff and trade war exposure profile." },
        weather: { score: riskData.breakdown.weather, label: "Seasonal Disruption", detail: "Historical regional climate anomalies." },
        labor: { score: riskData.breakdown.labor_strikes, label: "Labor/Strike Risk", detail: "Active or impending labor disputes." },
        piracy: { score: 15, label: "Maritime Security", detail: "Standard corridor risk." }
      },
      transit_days: 21,
      recommended_buffer: riskData.overall > 50 ? "14 days safety stock" : "7 days safety stock",
      alternative_route: "Air freight proxy recommended for critical components.",
      key_alert: riskData.narrative,
      insurance_premium_estimate: riskData.overall > 60 ? "0.8-1.2% of cargo value" : "0.2-0.5% of cargo value"
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("Risk score error:", err);
    return NextResponse.json({ error: "Risk assessment failed" }, { status: 500 });
  }
}
