import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // We'll use a public logistics/world news feed
    const RSS_URL = "https://rss.nytimes.com/services/xml/rss/nyt/World.xml";
    
    const response = await fetch(RSS_URL);
    const xml = await response.text();
    
    // Very basic XML-to-JSON parsing using regex for the first version
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
      const content = match[1];
      const title = content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "Untitled Event";
      const desc = content.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";
      const pubDate = content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
      
      items.push({ 
        title: title.replace(/<!\[CDATA\[|\]\]>/g, ''), 
        description: desc.replace(/<!\[CDATA\[|\]\]>/g, ''),
        pubDate 
      });
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("News Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
