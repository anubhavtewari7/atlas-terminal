import { NextResponse } from 'next/server';
import { lookupTariff } from '@/lib/database';
import { buildTariffResponse } from '@/lib/tariff-response';

export async function POST(req) {
  try {
    const { product } = await req.json();

    if (typeof product !== 'string' || !product.trim() || product.length > 1000) {
      return NextResponse.json({ error: 'Product query required' }, { status: 400 });
    }

    const t = lookupTariff(product.trim());

    const data = buildTariffResponse(product.trim(), t);

    return NextResponse.json(data);

  } catch (err) {
    console.error('[NAUTILUS] Tariff lookup error:', err);
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }
}
