import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Serves the agent-written market-intelligence.json as a Next.js API route.
// The file lives in /public so the agent can update it with a plain file write
// and git push -- no database required.
// Cache for 55 seconds so Vercel CDN doesn't stale the hourly updates.
export const revalidate = 55;

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'market-intelligence.json');
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=55, stale-while-revalidate=300' }
    });
  } catch (err) {
    console.error('[/api/market-data]', err.message);
    return NextResponse.json(
      { error: 'Market intelligence unavailable', alerts: [], commodityNotes: [], disruptionZones: [] },
      { status: 503 }
    );
  }
}
