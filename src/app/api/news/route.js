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
    const desc = description.replace(/<[^>]*>?/gm, '');
    return {
      title: title.replace(/&amp;/g, '&'),
      description: desc.length > 150 ? desc.slice(0, 150) + '...' : desc,
      link,
      pubDate: parsedDate && !isNaN(parsedDate) ? parsedDate.toLocaleDateString() : '',
      // kept for correct chronological sorting once feeds are merged
      _sortTs: parsedDate && !isNaN(parsedDate) ? parsedDate.getTime() : 0
    };
  });
}

// Multiple sources for redundancy -- if one is blocked on Vercel, others still fire.
// Ordered by relevance to supply chain / trade professionals.
const SOURCES = [
  'https://feeds.bbci.co.uk/news/business/rss.xml',         // broad global business & trade
  'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml', // NYT business
  'https://feeds.a.dj.com/rss/RSSWorldNews.xml',             // WSJ world news
  'https://www.ft.com/?format=rss',                          // Financial Times
];

export async function GET() {
  try {
    const results = await Promise.allSettled(
      SOURCES.map(url => fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(6000) }).then(r => r.text()))
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
