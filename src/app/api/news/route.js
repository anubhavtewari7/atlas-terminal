import { NextResponse } from 'next/server';

const FALLBACK_NEWS = [
  { title: 'Suez Canal Congestion Monitoring', description: 'Real-time tracking of vessel backlog in major corridors.', link: '#', pubDate: 'LIVE' },
  { title: 'Shanghai Port Throughput Data', description: 'Analysis of export volume trends in East Asian hubs.', link: '#', pubDate: 'LIVE' }
];

function parseRss(text) {
  return text.split('<item>').slice(1).map(item => {
    const title = item.match(/<title>(<!\[CDATA\[)?(.*?)(]]>)?<\/title>/)?.[2] || 'Global Trade Update';
    const description = item.match(/<description>(<!\[CDATA\[)?(.*?)(]]>)?<\/description>/)?.[2] || '';
    const link = item.match(/<link>(<!\[CDATA\[)?(.*?)(]]>)?<\/link>/)?.[2] || '#';
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    const parsedDate = pubDate ? new Date(pubDate) : null;
    return {
      title: title.replace(/&amp;/g, '&'),
      description: description.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
      link,
      pubDate: parsedDate && !isNaN(parsedDate) ? parsedDate.toLocaleDateString() : '',
      // kept for correct chronological sorting once feeds are merged
      _sortTs: parsedDate && !isNaN(parsedDate) ? parsedDate.getTime() : 0
    };
  });
}

// Two independent sources so a single feed being unreachable, or a single
// niche topic (shipping-only), doesn't leave the Market Intelligence panel
// with too little content for the regional filters to find matches in.
const SOURCES = [
  'https://gcaptain.com/feed/',              // maritime / shipping / logistics
  'https://feeds.bbci.co.uk/news/business/rss.xml' // broad global business & trade
];

export async function GET() {
  try {
    const results = await Promise.allSettled(
      SOURCES.map(url => fetch(url, { next: { revalidate: 1800 } }).then(r => r.text()))
    );

    let items = [];
    for (const r of results) {
      if (r.status === 'fulfilled') items = items.concat(parseRss(r.value));
    }

    // De-dupe (same headline occasionally appears in multiple feeds) and
    // sort newest-first so "latest market news" is actually chronological.
    const seen = new Set();
    items = items.filter(i => {
      if (seen.has(i.title)) return false;
      seen.add(i.title);
      return true;
    }).sort((a, b) => b._sortTs - a._sortTs).map(({ _sortTs, ...rest }) => rest);

    // A fetch can succeed at the network layer but still return a body that
    // isn't parseable RSS (blocked, rate-limited, format change). Treat
    // "nothing parsed from either source" the same as a failed fetch.
    if (items.length === 0) return NextResponse.json(FALLBACK_NEWS);

    return NextResponse.json(items.slice(0, 20));
  } catch (error) {
    return NextResponse.json(FALLBACK_NEWS);
  }
}
