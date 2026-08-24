import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch('https://gcaptain.com/feed/', {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'ATLAS-Terminal/1.0 (supply chain intelligence)' }
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()

    const itemMatches = xml.match(/<item[\s>][\s\S]*?<\/item>/g) || []

    const items = itemMatches.slice(0, 10).map(item => {
      const getTag = (tag) => {
        const cdataMatch = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>`, 'i'))
        if (cdataMatch) return cdataMatch[1].trim()
        const plainMatch = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i'))
        return plainMatch ? plainMatch[1].replace(/<[^>]+>/g, '').trim() : ''
      }

      let link = ''
      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/i) || item.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)
      if (linkMatch) link = linkMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim()

      const rawDate = getTag('pubDate')
      let pubDate = rawDate
      try { pubDate = new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) } catch {}

      const rawDesc = getTag('description')
      const cleanDesc = rawDesc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160)

      return { title: getTag('title'), link, description: cleanDesc, pubDate }
    }).filter(item => item.title && item.link)

    if (items.length === 0) throw new Error('No items parsed')
    return NextResponse.json(items)

  } catch (err) {
    console.error('[ATLAS] News fetch failed:', err.message)
    return NextResponse.json([])
  }
}
