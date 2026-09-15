import { NextResponse } from 'next/server';

// CME / NYMEX / CBOT / ICE futures -- tries Yahoo Finance v8 chart, then Stooq CSV, then static baseline
// Each ticker is fetched independently so a single failure does not kill the whole panel.

const SYMBOLS = [
  { yf: 'BZ=F',  stooq: 'brent.f', name: 'Brent Crude', unit: '/bbl',   mult: 1,    dp: 2 },
  { yf: 'HG=F',  stooq: 'hg.f',    name: 'Copper',      unit: '/lb',    mult: 0.01, dp: 2 }, // COMEX quotes in cents/lb
  { yf: 'HR=F',  stooq: null,       name: 'HRC Steel',   unit: '/st',    mult: 1,    dp: 0 },
  { yf: 'CT=F',  stooq: 'ct.f',    name: 'Cotton',      unit: '/lb',    mult: 0.01, dp: 2 }, // ICE quotes in cents/lb
  { yf: 'ZS=F',  stooq: 'zs.f',    name: 'Soybeans',    unit: '/bu',    mult: 0.01, dp: 2 }, // CBOT quotes in cents/bu
  { yf: 'GC=F',  stooq: 'gc.f',    name: 'Gold',        unit: '/oz',    mult: 1,    dp: 0 },
  { yf: 'NG=F',  stooq: 'ng.f',    name: 'Nat Gas',     unit: '/MMBtu', mult: 1,    dp: 3 },
];

// No liquid free futures feed for these -- static reference baseline
const STATIC_REF = [
  { name: 'Aluminum',     unit: '/mt',  price: 2350,  change: +0.5 },
  { name: 'Nickel',       unit: '/mt',  price: 18400, change: -0.9 },
  { name: 'Lithium Carb', unit: '/mt',  price: 14200, change: -3.1 },
  { name: 'Rare Earth',   unit: '/kg',  price: 142,   change: +6.8 },
  { name: 'NdFeB Magnet', unit: '/kg',  price: 78,    change: +4.2 },
];

function fmt(price, dp) {
  if (price >= 10000) return '$' + (price / 1000).toFixed(1) + 'k';
  if (dp === 0) return '$' + Math.round(price).toLocaleString();
  return '$' + price.toFixed(dp);
}

// Strategy 0: Fetch Yahoo Finance crumb (required since 2023)
let _yfCrumb = null;
let _yfCookies = '';
let _yfCrumbTime = 0;
const YF_CRUMB_TTL = 60 * 60 * 1000; // 1 hour

async function getYahooCrumb() {
  if (_yfCrumb && Date.now() - _yfCrumbTime < YF_CRUMB_TTL) {
    return { crumb: _yfCrumb, cookies: _yfCookies };
  }
  try {
    const cookieRes = await fetch('https://fc.yahoo.com', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(4000),
      redirect: 'follow',
    });
    const rawCookies = cookieRes.headers.get('set-cookie') || '';
    // Extract just the A3 cookie for crumb auth
    const cookieStr = rawCookies.split(',')
      .map(c => c.split(';')[0].trim())
      .filter(c => c.startsWith('A3=') || c.startsWith('A1=') || c.startsWith('A1S='))
      .join('; ');

    const crumbRes = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cookie': cookieStr,
        'Accept': 'text/plain, */*',
      },
      signal: AbortSignal.timeout(4000),
    });
    if (!crumbRes.ok) throw new Error(`crumb HTTP ${crumbRes.status}`);
    const crumb = await crumbRes.text();
    if (!crumb || crumb.includes('<')) throw new Error('Invalid crumb');
    _yfCrumb = crumb.trim();
    _yfCookies = cookieStr;
    _yfCrumbTime = Date.now();
    return { crumb: _yfCrumb, cookies: _yfCookies };
  } catch {
    return { crumb: null, cookies: '' };
  }
}

// Strategy 1: Yahoo Finance v8/finance/chart with crumb
async function fetchYahooChart(symbol) {
  const encoded = encodeURIComponent(symbol);
  const { crumb, cookies } = await getYahooCrumb();

  // Try query1 and query2, with and without crumb
  const bases = ['https://query1.finance.yahoo.com', 'https://query2.finance.yahoo.com'];
  for (const base of bases) {
    try {
      const crumbParam = crumb ? `&crumb=${encodeURIComponent(crumb)}` : '';
      const url = `${base}/v8/finance/chart/${encoded}?interval=1d&range=1d${crumbParam}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': `https://finance.yahoo.com/quote/${encoded}/`,
          'Origin': 'https://finance.yahoo.com',
          ...(cookies ? { 'Cookie': cookies } : {}),
        },
        signal: AbortSignal.timeout(6000),
        next: { revalidate: 300 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      const meta = data?.chart?.result?.[0]?.meta;
      if (!meta?.regularMarketPrice) continue;
      return {
        price: meta.regularMarketPrice,
        pct: meta.regularMarketChangePercent ?? 0,
      };
    } catch { continue; }
  }
  throw new Error(`YF chart failed for ${symbol}`);
}

// Strategy 2: Stooq CSV API (free, public, server-side friendly)
async function fetchStooq(stooqSymbol) {
  const url = `https://stooq.com/q/l/?s=${stooqSymbol}&f=sd2t2ohlcv&h&e=csv`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Referer': 'https://stooq.com/',
    },
    signal: AbortSignal.timeout(7000),
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Stooq HTTP ${res.status}`);
  const csv = await res.text();
  // CSV format: Symbol,Date,Time,Open,High,Low,Close,Volume
  const lines = csv.split('\n').filter(l => l.trim() && !l.startsWith('Symbol'));
  if (!lines.length) throw new Error('No data in Stooq response');
  const cols = lines[0].split(',');
  // Close is index 6, Open is index 3
  const closePrice = parseFloat(cols[6]);
  const openPrice = parseFloat(cols[3]);
  // Stooq returns N/D when market is closed or symbol not found
  if (!closePrice || isNaN(closePrice) || cols[6] === 'N/D') {
    throw new Error(`Invalid Stooq price for ${stooqSymbol}: ${cols[6]}`);
  }
  const pct = openPrice && !isNaN(openPrice) ? ((closePrice - openPrice) / openPrice) * 100 : 0;
  return { price: closePrice, pct };
}

async function fetchTicker(cfg) {
  // Try Yahoo Finance first
  try {
    const result = await fetchYahooChart(cfg.yf);
    return {
      name: cfg.name,
      unit: cfg.unit,
      price: fmt(result.price * cfg.mult, cfg.dp),
      change: (result.pct >= 0 ? '+' : '') + result.pct.toFixed(1) + '%',
      up: result.pct >= 0,
      live: true,
      src: 'YF',
    };
  } catch (_) {
    // Try Stooq if we have a symbol for it
    if (cfg.stooq) {
      try {
        const result = await fetchStooq(cfg.stooq);
        return {
          name: cfg.name,
          unit: cfg.unit,
          price: fmt(result.price * cfg.mult, cfg.dp),
          change: (result.pct >= 0 ? '+' : '') + result.pct.toFixed(1) + '%',
          up: result.pct >= 0,
          live: false,
          src: 'Stooq',
        };
      } catch (__) {
        // fall through to null
      }
    }
    return null;
  }
}

export async function GET() {
  // Fetch all tickers concurrently; failures return null and we filter them out
  const results = await Promise.all(SYMBOLS.map(cfg => fetchTicker(cfg)));
  const live = results.filter(Boolean);

  const ref = STATIC_REF.map(r => ({
    name: r.name,
    unit: r.unit,
    price: fmt(r.price, 0),
    change: (r.change >= 0 ? '+' : '') + r.change.toFixed(1) + '%',
    up: r.change >= 0,
    live: false,
    src: 'static',
  }));

  // Determine data quality: 'live' = real-time YF, 'delayed' = daily Stooq, 'reference' = static only
  const yfItems = live.filter(r => r.src === 'YF');
  const stooqItems = live.filter(r => r.src === 'Stooq');
  const quality = yfItems.length > 0 ? 'live' : stooqItems.length > 0 ? 'delayed' : 'reference';

  if (live.length === 0) {
    // Both fetchers failed -- return static fallback with explicit reference labeling
    return NextResponse.json({
      prices: [
        { name: 'Brent Crude', unit: '/bbl',   price: '$108.40', change: '+1.8%', up: true,  live: false, src: 'static' },
        { name: 'Copper',      unit: '/lb',    price: '$4.12',   change: '+2.4%', up: true,  live: false, src: 'static' },
        { name: 'HRC Steel',   unit: '/st',    price: '$808',    change: '-0.4%', up: false, live: false, src: 'static' },
        { name: 'Cotton',      unit: '/lb',    price: '$65.08',  change: '+0.2%', up: true,  live: false, src: 'static' },
        { name: 'Soybeans',    unit: '/bu',    price: '$11.08',  change: '-1.5%', up: false, live: false, src: 'static' },
        { name: 'Gold',        unit: '/oz',    price: '$2,350',  change: '+0.3%', up: true,  live: false, src: 'static' },
        { name: 'Nat Gas',     unit: '/MMBtu', price: '$2.68',   change: '-2.1%', up: false, live: false, src: 'static' },
        ...ref,
      ],
      timestamp: new Date().toISOString(),
      source: 'Reference (Jan 2024)',
      quality: 'reference',
      anyLive: false,
      stale: true,
    });
  }

  return NextResponse.json({
    prices: [...live, ...ref],
    timestamp: new Date().toISOString(),
    source: quality === 'live' ? 'Yahoo Finance' : 'Stooq (EOD)',
    quality,
    anyLive: quality === 'live',
  });
}
