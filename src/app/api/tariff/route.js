import { NextResponse } from 'next/server';
import { lookupTariff } from '@/lib/database';

export async function POST(req) {
  try {
    const { product } = await req.json();

    if (!product) {
      return NextResponse.json({ error: 'Product query required' }, { status: 400 });
    }

    const t = lookupTariff(product);

    const data = {
      hts_code:              t.hts,
      hs6_code:              t.hts.replace(/\./g, '').slice(0, 6) || '850511',
      description:           `HTS classification for: ${product}. Verify on USITC for binding ruling.`,
      mfn_rate:              t.duty,
      section301_rate:       t.duty.startsWith('25%') ? '25%' : 'N/A',
      special_rate:          t.fta_rate || 'See USTR FTA schedule',
      column2_rate:          t.col2_rate || 'Contact CBP',
      total_us_duty:         t.duty,
      eu_duty:               t.eu_duty   || 'Check EU TARIC database',
      uk_duty:               t.uk_duty   || 'Check UK Global Tariff',
      free_trade_agreements: t.ftas      || [],
      special_notes:         t.notes     || '',
      chapter:               `Chapter ${t.hts.slice(0, 2)}`,
      unit:                  t.unit      || 'Standard',
      source:                'atlas_db'
    };

    return NextResponse.json(data);

  } catch (err) {
    console.error('[ATLAS] Tariff lookup error:', err);
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }
}
