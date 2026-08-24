import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Free API, no key required
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=CNY,EUR,BRL,MXN,JPY,KRW,INR,SGD', {
      next: { revalidate: 3600 } // cache for 1 hour
    });
    const data = await res.json();

    // Enrich with trade context
    const enriched = {
      base: 'USD',
      date: data.date,
      rates: {
        CNY: { rate: data.rates.CNY, country: 'China', flag: '🇨🇳', impact: data.rates.CNY > 7.2 ? 'Favorable for US imports' : 'Unfavorable for US imports' },
        EUR: { rate: data.rates.EUR, country: 'Eurozone', flag: '🇪🇺', impact: data.rates.EUR < 1.0 ? 'EUR weak — EU exports cheaper' : 'EUR strong — US exports competitive' },
        MXN: { rate: data.rates.MXN, country: 'Mexico', flag: '🇲🇽', impact: data.rates.MXN > 18 ? 'Favorable for nearshoring' : 'MXN strengthening' },
        BRL: { rate: data.rates.BRL, country: 'Brazil', flag: '🇧🇷', impact: 'Monitor for commodity pricing' },
        JPY: { rate: data.rates.JPY, country: 'Japan', flag: '🇯🇵', impact: data.rates.JPY > 145 ? 'JPY weak — Japanese imports cheaper' : 'JPY stable' },
        KRW: { rate: data.rates.KRW, country: 'South Korea', flag: '🇰🇷', impact: 'Key for semiconductor supply chain' },
        INR: { rate: data.rates.INR, country: 'India', flag: '🇮🇳', impact: 'India+1 strategy cost indicator' },
        SGD: { rate: data.rates.SGD, country: 'Singapore', flag: '🇸🇬', impact: 'APAC logistics hub benchmark' },
      }
    };
    return NextResponse.json(enriched);
  } catch (err) {
    console.error("FX error:", err);
    // Fallback static data if API is down
    return NextResponse.json({
      base: 'USD', date: 'Rates may be outdated', stale: true,
      rates: {
        CNY: { rate: 7.24, country: 'China', flag: '🇨🇳', impact: 'Favorable for US imports' },
        EUR: { rate: 0.92, country: 'Eurozone', flag: '🇪🇺', impact: 'EUR weak — EU exports cheaper' },
        MXN: { rate: 17.15, country: 'Mexico', flag: '🇲🇽', impact: 'Favorable for nearshoring' },
        BRL: { rate: 5.10, country: 'Brazil', flag: '🇧🇷', impact: 'Monitor for commodity pricing' },
        JPY: { rate: 154.2, country: 'Japan', flag: '🇯🇵', impact: 'JPY weak — Japanese imports cheaper' },
        KRW: { rate: 1340, country: 'South Korea', flag: '🇰🇷', impact: 'Key for semiconductor supply chain' },
        INR: { rate: 83.5, country: 'India', flag: '🇮🇳', impact: 'India+1 strategy cost indicator' },
        SGD: { rate: 1.34, country: 'Singapore', flag: '🇸🇬', impact: 'APAC logistics hub benchmark' },
      }
    });
  }
}
