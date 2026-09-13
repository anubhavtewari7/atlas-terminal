import { NextResponse } from 'next/server';

// CME / NYMEX / CBOT / ICE futures via Yahoo Finance public quote API.
// Server-side fetch -- no CORS issue. 5-minute server cache via revalidate.
const LIVE_SYMBOLS = [
  { symbol: 'BZ=F',  name: 'Brent Crude', unit: '/bbl',   mult: 1,    dp: 2 },
  { symbol: 'HG=F',  name: 'Copper',      unit: '/lb',    mult: 0.01, dp: 2 }, // COMEX quotes in cents/lb
  { symbol: 'HR=F',  name: 'HRC Steel',   unit: '/st',    mult: 1,    dp: 0 },
  { symbol: 'CT=F',  name: 'Cotton',      unit: '/lb',    mult: 0.01, dp: 2 }, // ICE quotes in cents/lb
  { symbol: 'ZS=F',  name: 'Soybeans',   unit: '/bu',    mult: 0.01, dp: 2 }, // CBOT quotes in cents/bu
  { symbol: 'GC=F',  name: 'Gold',        unit: '/oz',    mult: 1,    dp: 0 },
  { symbol: 'NG=F',  name: 'Nat Gas',     unit: '/MMBtu', mult: 1,    dp: 3 },
];

// No liquid free futures feed -- static reference prices updated periodically
const STATIC_REF = [
  { name: 'Aluminum',     unit: '/mt',  price: 2350,  change: +0.5 },
  { name: 'Nickel',       unit: '/mt',  price: 18400, change: -0.9 },
  { name: 'Lithium Carb', unit: '/mt',  price: 14200, change: -3.1 },
  { name: 'Rare Earth',   unit: '/kg',  price: 142,   change: +6.8 },
  { name: 'NdFeB Magnet', unit: '/kg',  price: 78,    change: +4.2 },
];

function fmt(price, dp) {
  if (price >= 10000) return `$${(price / 1000).toFixed(1)}k`;
  if (dp === 0) return `$${Math.round(price).toLocaleString()}`;
  return `$${price.toFixed(dp)}`;
}

export async function GET() {
  try {
    const symbolList = LIVE_SYMBOLS.map(s => s.symbol).join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbolList)}&fields=regularMarketPrice,regularMarketChangePercent`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NautilusTerminal/1.0)',
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`Yahoo Finance HTTP ${res.status}`);
    const data = await res.json();
    const results = data?.quoteResponse?.result || [];

    const live = LIVE_SYMBOLS.map(cfg => {
      const q = results.find(r => r.symbol === cfg.symbol);
      if (!q || !q.regularMarketPrice) return null;
      const price = q.regularMarketPrice * cfg.mult;
      const pct = q.regularMarketChangePercent ?? 0;
      return {
        name: cfg.name,
        unit: cfg.unit,
        price: fmt(price, cfg.dp),
        change: (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%',
        up: pct >= 0,
        live: true,
      };
    }).filter(Boolean);

    const ref = STATIC_REF.map(r => ({
      name: r.name,
      unit: r.unit,
      price: fmt(r.price, 0),
      change: (r.change >= 0 ? '+' : '') + r.change.toFixed(1) + '%',
      up: r.change >= 0,
      live: false,
    }));

    return NextResponse.json({
      prices: [...live, ...ref],
      timestamp: new Date().toISOString(),
      source: 'CME / Yahoo Finance',
      anyLive: live.length > 0,
    });

  } catch (err) {
    console.error('[/api/commodities]', err.message);
    return NextResponse.json({
      prices: [
        { name: 'Brent Crude', unit: '/bbl',   price: '$89.24', change: '+1.2%', up: true,  live: false },
        { name: 'Copper',      unit: '/lb',    price: '$4.12',  change: '+2.4%', up: true,  live: false },
        { name: 'HRC Steel',   unit: '/st',    price: '$840',   change: '-0.8%', up: false, live: false },
        { name: 'Cotton',      unit: '/lb',    price: '$85.40', change: '+0.2%', up: true,  live: false },
        { name: 'Soybeans',   unit: '/bu',    price: '$11.80', change: '-1.5%', up: false, live: false },
        { name: 'Gold',        unit: '/oz',    price: '$2,045', change: '+0.3%', up: true,  live: false },
        { name: 'Nat Gas',     unit: '/MMBtu', price: '$2.45',  change: '-2.1%', up: false, live: false },
        { name: 'Aluminum',    unit: '/mt',    price: '$2,350', change: '+0.5%', up: true,  live: false },
        { name: 'Nickel',      unit: '/mt',    price: '$18.4k', change: '-0.9%', up: false, live: false },
        { name: 'Lithium Carb',unit: '/mt',    price: '$14.2k', change: '-3.1%', up: false, live: false },
        { name: 'Rare Earth',  unit: '/kg',    price: '$142',   change: '+6.8%', up: true,  live: false },
        { name: 'NdFeB Magnet',unit: '/kg',    price: '$78',    change: '+4.2%', up: true,  live: false },
      ],
      timestamp: new Date().toISOString(),
      source: 'fallback',
      anyLive: false,
      stale: true,
    });
  }
}
