import { NextResponse } from 'next/server';
import { lookupTariff } from '@/lib/database';

export async function POST(req) {
  try {
    const { product } = await req.json();

    if (!product) {
      return NextResponse.json({ error: "Product query required" }, { status: 400 });
    }

    const t = lookupTariff(product);

    const data = {
      hts_code: t.hts,
      hs6_code: t.hts.substring(0, 6) || "8542.31",
      description: `Automated deterministic classification for ${product}.`,
      mfn_rate: t.duty,
      section301_rate: t.duty.startsWith("25%") ? "25%" : "N/A",
      total_us_duty: t.duty,
      eu_duty: t.eu_duty || 'Check EU TARIC database',
      uk_duty: t.uk_duty || 'Check UK Global Tariff',
      free_trade_agreements: t.duty === '0%' ? ["Eligible"] : [],
      special_notes: t.notes,
      chapter: `Chapter ${t.hts.substring(0, 2)}`,
      unit: "Standard"
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("Tariff lookup error:", err);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
}
