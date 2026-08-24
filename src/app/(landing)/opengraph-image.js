import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Atlas Terminal — Supply Chain Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-200px', left: '-150px',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-150px', right: '-100px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0,120,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          display: 'flex',
        }} />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo */}
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(56,189,248,0.1)',
            border: '1px solid rgba(56,189,248,0.25)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(32,32)">
                <ellipse cx="0" cy="0" rx="19" ry="7.4" stroke="#38bdf8" strokeWidth="2.2" opacity="0.5" transform="rotate(20)" fill="none"/>
                <ellipse cx="0" cy="0" rx="19" ry="7.4" stroke="#38bdf8" strokeWidth="2.2" opacity="0.9" transform="rotate(-20)" fill="none"/>
                <circle cx="0" cy="0" r="7.6" stroke="#38bdf8" strokeWidth="3.4" fill="#0a0a0a"/>
                <circle cx="17.9" cy="-6.5" r="2.4" fill="#38bdf8"/>
              </g>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.15em', color: '#fff', lineHeight: 1 }}>ATLAS</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', fontWeight: 600 }}>SUPPLY CHAIN INTELLIGENCE</div>
          </div>

          {/* Live badge */}
          <div style={{
            marginLeft: '24px',
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e5a0' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#00e5a0' }}>LIVE</span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            fontSize: '68px', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0,
            color: '#fff', maxWidth: '820px',
          }}>
            Know your supply chain<br/>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>before it fails you.</span>
          </div>
          <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.55)', fontWeight: 400, lineHeight: 1.5, maxWidth: '620px' }}>
            Sourcing hubs, tariff data, and geopolitical risk — in under 3 seconds.
          </div>
        </div>

        {/* Bottom stats row */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          {[
            { n: '180+', l: 'Sourcing Hubs' },
            { n: '20', l: 'Ports Monitored' },
            { n: '8', l: 'FX Pairs Live' },
            { n: '<3s', l: 'Scan Time' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{
                fontSize: '32px', fontWeight: 700, letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #00e5a0 0%, #00b8ff 100%)',
                color: '#00e5a0',
              }}>{s.n}</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', fontWeight: 500 }}>{s.l}</span>
            </div>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '14px 28px', borderRadius: '100px',
              background: '#00e5a0', color: '#000',
              fontSize: '15px', fontWeight: 700, letterSpacing: '0.04em',
            }}>
              Run a free scan →
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
