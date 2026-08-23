import { NextResponse } from 'next/server';
import { lookupTariff } from '@/lib/database';

export async function POST(req) {
  try {
    const { product } = await req.json();

    if (!product) {
      return NextResponse.json({ error: "Product query required" }, { status: 400 });
    }

    const t = lookupTariff(product);

    // HTS codes are stored like "8505.11.00" (10 digits with period
    // separators). Taking a plain substring(0,6) cuts mid-digit ("8505.1")
    // instead of the real 6-digit HS code ("8505.11") — this both displays
    // wrong and breaks the USITC verification link built from it.
    const digitsOnly = t.hts.replace(/\./g, '');
    const hs6Digits = digitsOnly.slice(0, 6).padEnd(6, '0');
    const hs6Formatted = `${hs6Digits.slice(0, 4)}.${hs6Digits.slice(4, 6)}`;

    const data = {
      hts_code: t.hts,
      hs6_code: hs6Formatted,
      matched: t.matched,
      description: t.matched
        ? `Automated deterministic classification for ${product}.`
        : `No specific database entry for "${product}". Showing a generic placeholder for its category — verify with a licensed customs broker before filing.`,
      mfn_rate: t.duty,
      section301_rate: t.duty.includes("25") ? "25%" : "N/A",
      total_us_duty: t.duty,
      eu_duty: "See notes",
      uk_duty: "See notes",
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