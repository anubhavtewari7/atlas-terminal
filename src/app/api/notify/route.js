// /api/notify -- called by the Atlas Intelligence Agent after each hourly push.
// Fetches the latest market-intelligence.json from GitHub (always fresh after push),
// builds a digest email, and sends it via Resend.
// Protected by NOTIFY_SECRET env var -- agent passes ?key=SECRET in the URL.

import { NextResponse } from 'next/server';

const GITHUB_RAW = 'https://raw.githubusercontent.com/anubhavtewari7/atlas-terminal/main/public/market-intelligence.json';
const TO = 'anubhav.tewari@slate.auto';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key || key !== process.env.NOTIFY_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch the latest intelligence data straight from GitHub raw
  let data;
  try {
    const res = await fetch(GITHUB_RAW, { cache: 'no-store' });
    if (!res.ok) throw new Error(`GitHub raw fetch failed: ${res.status}`);
    data = await res.json();
  } catch (err) {
    return NextResponse.json({ error: `Failed to fetch intelligence: ${err.message}` }, { status: 502 });
  }

  const alerts = data.alerts || [];
  const high   = alerts.filter(a => a.severity === 'HIGH');
  const medium = alerts.filter(a => a.severity === 'MEDIUM');
  const ts     = new Date(data.lastUpdated).toUTCString().replace(' GMT', ' UTC');

  // Build HIGH alert list HTML
  const highHtml = high.slice(0, 5).map(a => {
    const srcLink = a.source ? ` <a href="${a.source}" style="color:#38bdf8;font-size:11px">[source]</a>` : '';
    return `<li style="margin-bottom:10px">
      <span style="background:#7f1d1d;color:#fca5a5;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:4px;text-transform:uppercase">${a.type}</span>
      <strong style="display:block;margin-top:4px;color:#f8fafc">${a.title}</strong>
      <span style="color:#94a3b8;font-size:12px">${a.summary}</span>${srcLink}
    </li>`;
  }).join('') || '<li style="color:#64748b">No HIGH severity alerts this hour.</li>';

  // Build commodity notes HTML
  const commHtml = (data.commodityNotes || []).slice(0, 5).map(c => {
    const arrow = c.direction === 'UP' ? '▲' : c.direction === 'DOWN' ? '▼' : '--';
    const color = c.direction === 'UP' ? '#4ade80' : c.direction === 'DOWN' ? '#f87171' : '#94a3b8';
    return `<tr>
      <td style="padding:6px 8px;color:#cbd5e1;font-size:12px">${c.commodity}</td>
      <td style="padding:6px 8px;font-weight:bold;font-size:13px" style="color:${color}"><span style="color:${color}">${arrow}</span></td>
      <td style="padding:6px 8px;color:#94a3b8;font-size:11px">${c.driver || ''}</td>
    </tr>`;
  }).join('');

  const subject = `Atlas Terminal -- ${high.length} HIGH, ${medium.length} MEDIUM alerts | ${ts}`;

  const html = `
<div style="font-family:monospace;max-width:620px;background:#0a0a0a;color:#e2e8f0;padding:28px;border-radius:12px">
  <h2 style="color:#38bdf8;margin:0 0 4px;font-size:18px">Atlas Intelligence Agent</h2>
  <p style="color:#475569;font-size:11px;margin:0 0 24px">${ts}</p>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <tr>
      <td style="padding:14px;background:#1e293b;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#f87171">${high.length}</div>
        <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;margin-top:2px">HIGH</div>
      </td>
      <td style="width:10px"></td>
      <td style="padding:14px;background:#1e293b;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#fb923c">${medium.length}</div>
        <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;margin-top:2px">MEDIUM</div>
      </td>
      <td style="width:10px"></td>
      <td style="padding:14px;background:#1e293b;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#94a3b8">${alerts.length}</div>
        <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;margin-top:2px">TOTAL</div>
      </td>
    </tr>
  </table>

  <h3 style="color:#f87171;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">High Severity Alerts</h3>
  <ul style="margin:0 0 24px;padding-left:18px;line-height:1.8">${highHtml}</ul>

  ${commHtml ? `
  <h3 style="color:#38bdf8;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">Commodity Movements</h3>
  <table style="width:100%;border-collapse:collapse;background:#1e293b;border-radius:8px;margin-bottom:24px;overflow:hidden">
    ${commHtml}
  </table>` : ''}

  <a href="https://atlas-terminal-tau.vercel.app/terminal"
     style="display:inline-block;background:#38bdf8;color:#000;padding:11px 22px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px">
    Open Atlas Terminal
  </a>

  <p style="margin:20px 0 0;font-size:10px;color:#334155">
    Sent automatically by the Atlas Intelligence Agent -- runs every hour while the Atlas app is open.
  </p>
</div>`;

  // Send via Resend
  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Atlas Agent <onboarding@resend.dev>',
      to: [TO],
      subject,
      html,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.text();
    return NextResponse.json({ error: `Resend failed: ${err}` }, { status: 502 });
  }

  const resendData = await resendRes.json();
  return NextResponse.json({
    ok: true,
    emailId: resendData.id,
    alertCount: alerts.length,
    highCount: high.length,
  });
}
