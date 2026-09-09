import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TERMINAL_URL = 'https://atlas-terminal-tau.vercel.app/terminal'

const welcomeEmailHtml = (email) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to ATLAS Terminal</title>
<style>
  body { margin: 0; padding: 0; background: #05080F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 560px; margin: 0 auto; padding: 48px 24px; }
  .logo { font-size: 28px; font-weight: 900; letter-spacing: -0.05em; color: #38BDF8; margin-bottom: 40px; }
  .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px; }
  .eyebrow { font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: #38BDF8; margin-bottom: 20px; }
  h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; color: #EDF4FF; margin: 0 0 16px; line-height: 1.2; }
  p { font-size: 15px; color: rgba(237,244,255,0.60); line-height: 1.75; margin: 0 0 24px; font-weight: 300; }
  .cta-btn { display: inline-block; padding: 16px 36px; border-radius: 100px; background: linear-gradient(135deg, #0EA5E9, #1D4ED8); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: -0.01em; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 32px 0; }
  .mono { font-family: 'Courier New', monospace; font-size: 11px; color: rgba(237,244,255,0.30); letter-spacing: 0.06em; }
  .url-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 14px 18px; margin-top: 20px; }
  .url-label { font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(237,244,255,0.25); margin-bottom: 6px; }
  .url-text { font-family: 'Courier New', monospace; font-size: 12px; color: #38BDF8; word-break: break-all; }
  .feature { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #38BDF8; margin-top: 7px; flex-shrink: 0; }
  .feat-text { font-size: 13px; color: rgba(237,244,255,0.55); font-weight: 300; line-height: 1.6; }
  .footer { margin-top: 40px; text-align: center; }
  .footer p { font-size: 11px; color: rgba(237,244,255,0.20); margin: 0; }
</style>
</head>
<body>
<div class="wrap">
  <div class="logo">ATLAS</div>
  <div class="card">
    <div class="eyebrow">// Early Access Granted</div>
    <h1>You're in.</h1>
    <p>Welcome to ATLAS Terminal -- a live intelligence platform built for procurement and supply chain professionals. Your access is active now.</p>

    <a href="${TERMINAL_URL}" class="cta-btn">Open ATLAS Terminal &rarr;</a>

    <hr class="divider" />

    <p style="margin-bottom: 16px;">Here's what you can do from day one:</p>
    <div class="feature"><div class="dot"></div><div class="feat-text">Scan any product or material in plain language -- ATLAS maps the best global sourcing hubs, names real suppliers, and pulls live UN Comtrade export data.</div></div>
    <div class="feature"><div class="dot"></div><div class="feat-text">Monitor 92,000+ live fire hotspots, M4.5+ earthquakes, and 15 geopolitical conflict zones -- all overlaid on your sourcing geography automatically.</div></div>
    <div class="feature"><div class="dot"></div><div class="feat-text">Get instant compliance verdicts: OFAC sanctions, ECCN classification, Section 301 tariffs, and FTA eligibility -- checked at the point of sourcing.</div></div>
    <div class="feature"><div class="dot"></div><div class="feat-text">Export a PDF mission brief, supplier RFQ, and total landed cost model in one click.</div></div>

    <div class="url-box">
      <div class="url-label">Your terminal URL -- bookmark this</div>
      <div class="url-text">${TERMINAL_URL}</div>
    </div>
  </div>

  <div class="footer">
    <p class="mono">ATLAS Terminal &nbsp;&middot;&nbsp; ${email} &nbsp;&middot;&nbsp; &copy; 2026</p>
    <p style="font-size: 10px; color: rgba(237,244,255,0.12); margin-top: 8px;">You received this because you requested early access to ATLAS Terminal.</p>
  </div>
</div>
</body>
</html>
`

export async function POST(request) {
  try {
    const body = await request.json()
    const email = body?.email?.trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'ATLAS Terminal <onboarding@resend.dev>',
      to: email,
      subject: 'Your ATLAS Terminal access is ready',
      html: welcomeEmailHtml(email),
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Also notify yourself so you know who signed up
    await resend.emails.send({
      from: 'ATLAS Terminal <onboarding@resend.dev>',
      to: 'anubhav.tewari@slate.auto',
      subject: `New ATLAS signup: ${email}`,
      html: `<p style="font-family:monospace;font-size:14px;color:#333">New early access request:<br><br><strong>${email}</strong><br><br>${new Date().toUTCString()}</p>`,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
