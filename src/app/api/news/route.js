import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Using a more reliable supply chain / maritime news RSS feed
    const res = await fetch('https://gcaptain.com/feed/', { next: { revalidate: 3600 } });
    const text = await res.text();

    // Basic XML to JSON parser for RSS
    const items = text.split('<item>').slice(1).map(item => {
      const title = item.match(/<title>(<!\[CDATA\[)?(.*?)(]]>)?<\/title>/)?.[2] || 'Global Trade Update';
      const description = item.match(/<description>(<!\[CDATA\[)?(.*?)(]]>)?<\/description>/)?.[2] || '';
      const link = item.match(/<link>(<!\[CDATA\[)?(.*?)(]]>)?<\/link>/)?.[2] || '#';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      
      return { 
        title: title.replace(/&amp;/g, '&'), 
        description: description.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
        link,
        pubDate: new Date(pubDate).toLocaleDateString()
      };
    }).slice(0, 10);

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json([
      { title: 'Suez Canal Congestion Monitoring', description: 'Real-time tracking of vessel backlog in major corridors.', link: '#', pubDate: 'LIVE' },
      { title: 'Shanghai Port Throughput Data', description: 'Analysis of export volume trends in East Asian hubs.', link: '#', pubDate: 'LIVE' }
    ]);
  }
}
