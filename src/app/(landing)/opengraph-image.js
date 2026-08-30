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
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Glow top-left */}
        <div style={{
          position: 'absolute', top: '-180px', left: '-100px',
          width: '600px', height: '600px',
          background: 'rgba(0,229,160,0.15)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          display: 'flex',
        }} />
        {/* Glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: '-120px', right: '-80px',
          width: '500px', height: '500px',
          background: 'rgba(0,120,255,0.10)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          display: 'flex',
        }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Logo icon */}
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(56,189,248,0.12)',
            border: '1.5px solid rgba(56,189,248,0.3)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '28px', height: '28px',
              border: '2.5px solid #38bdf8',
              borderRadius: '50%',
              display: 'flex',
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.14em' }}>ATLAS</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.2em', fontWeight: 600 }}>SUPPLY CHAIN INTELLIGENCE</span>
          </div>
          {/* Live pill */}
          <div style={{
            marginLeft: '20px',
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '5px 13px', borderRadius: '100px',
            border: '1px solid rgba(0,229,160,0.3)',
            background: 'rgba(0,229,160,0.08)',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e5a0' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#00e5a0', letterSpacing: '0.14em' }}>LIVE</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '64px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Know your supply chain
          </div>
          <div style={{ fontSize: '64px', fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            before it fails you.
          </div>
          <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginTop: '8px' }}>
            Sourcing hubs · Tariff data · Geopolitical risk — in under 3 seconds
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: '100%' }}>
          {[
            { n: '180+', l: 'Sourcing Hubs' },
            { n: '20', l: 'Ports Monitored' },
            { n: '8', l: 'FX Pairs Live' },
            { n: '<3s', l: 'Scan Time' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginRight: '56px' }}>
              <span style={{ fontSize: '30px', fontWeight: 700, color: '#00e5a0', letterSpacing: '-0.02em' }}>{s.n}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em', fontWeight: 500 }}>{s.l.toUpperCase()}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <div style={{
              padding: '14px 30px', borderRadius: '100px',
              background: '#00e5a0',
              fontSize: '15px', fontWeight: 700, color: '#000000', letterSpacing: '0.04em',
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
