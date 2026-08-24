import Link from 'next/link';
import AtlasLogo from '@/components/AtlasLogo';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #000;
    --glass-bg: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.10);
    --glass-blur: blur(24px);
    --text-primary: #fff;
    --text-secondary: rgba(255,255,255,0.5);
    --text-tertiary: rgba(255,255,255,0.28);
    --accent: #00e5a0;
    --red: #ff3b30;
    --amber: #ff9f0a;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg) !important;
    color: var(--text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    overflow-y: auto !important;
    line-height: 1;
  }

  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    pointer-events: none; opacity: 0.6;
  }

  .orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
  .orb-1 { width: 600px; height: 600px; background: rgba(0,229,160,0.07); top: -200px; left: -150px; }
  .orb-2 { width: 500px; height: 500px; background: rgba(0,120,255,0.05); bottom: -150px; right: -100px; }
  .orb-3 { width: 300px; height: 300px; background: rgba(255,60,0,0.04); top: 40%; left: 60%; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 56px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: #fff;
  }
  .nav-cta {
    display: inline-flex; align-items: center;
    padding: 8px 20px; border-radius: 100px;
    background: var(--accent); color: #000;
    font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; transition: opacity 0.2s;
  }
  .nav-cta:hover { opacity: 0.85; }

  section { position: relative; z-index: 1; }

  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 120px 24px 80px;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 100px;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur);
    font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 40px;
  }
  .hero-eyebrow .dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
  .hero h1 {
    font-size: clamp(48px, 8vw, 96px); font-weight: 700;
    letter-spacing: -0.04em; line-height: 1.0; max-width: 900px;
    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.55) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 28px;
  }
  .hero-sub {
    font-size: clamp(16px, 2vw, 20px); font-weight: 400;
    color: var(--text-secondary); max-width: 520px;
    line-height: 1.6; margin-bottom: 52px;
  }
  .hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 32px; border-radius: 100px;
    background: var(--accent); color: #000;
    font-size: 14px; font-weight: 600; letter-spacing: 0.04em;
    text-decoration: none; transition: transform 0.2s, opacity 0.2s;
  }
  .btn-primary:hover { transform: translateY(-1px); opacity: 0.9; }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 32px; border-radius: 100px;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur);
    color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 500;
    text-decoration: none; transition: background 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.18); }

  .ticker-wrap {
    width: 100%; overflow: hidden;
    border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);
    padding: 14px 0; margin-top: 80px;
    background: rgba(255,255,255,0.015); backdrop-filter: blur(8px);
    position: relative; z-index: 1;
  }
  .ticker-track { display: flex; gap: 56px; animation: ticker 28s linear infinite; white-space: nowrap; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-tertiary); flex-shrink: 0;
  }
  .ticker-item .val { color: var(--text-secondary); }
  .ticker-item .up { color: var(--accent); }
  .ticker-item .dn { color: var(--red); }

  .stats-section {
    padding: 80px 24px; max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);
    position: relative; z-index: 1;
  }
  .stat-item { padding: 48px 32px; text-align: center; }
  .stat-number {
    font-size: clamp(36px, 5vw, 56px); font-weight: 700; letter-spacing: -0.04em;
    background: linear-gradient(135deg, var(--accent) 0%, #00b8ff 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    display: block; margin-bottom: 8px;
  }
  .stat-label { font-size: 13px; color: var(--text-secondary); font-weight: 400; }

  .features { padding: 120px 24px; max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
  }
  .section-heading {
    font-size: clamp(32px, 5vw, 52px); font-weight: 700;
    letter-spacing: -0.03em; line-height: 1.1;
    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    max-width: 600px; margin-bottom: 64px;
  }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }

  .glass-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 20px; padding: 32px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }
  .glass-card:hover { border-color: rgba(255,255,255,0.18); transform: translateY(-2px); }
  .glass-card::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .card-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 20px; }
  .card-title { font-size: 17px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 10px; color: #fff; }
  .card-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.65; }

  .how { padding: 120px 24px; max-width: 1100px; margin: 0 auto; }
  .steps { display: flex; flex-direction: column; gap: 2px; margin-top: 64px; }
  .step {
    display: grid; grid-template-columns: 64px 1fr; gap: 32px; align-items: start;
    padding: 32px 0; border-bottom: 1px solid var(--glass-border);
  }
  .step:last-child { border-bottom: none; }
  .step-num { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-tertiary); padding-top: 4px; }
  .step-title { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 10px; color: #fff; }
  .step-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.65; }

  .audience { padding: 80px 24px 120px; max-width: 1100px; margin: 0 auto; }
  .audience-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 64px; }
  .audience-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); border-radius: 16px; padding: 28px 24px;
    transition: border-color 0.2s;
  }
  .audience-card:hover { border-color: rgba(255,255,255,0.16); }
  .audience-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; display: block; }
  .audience-role { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 10px; line-height: 1.3; }
  .audience-use { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

  .cta-section { padding: 80px 24px 120px; display: flex; justify-content: center; position: relative; z-index: 1; }
  .cta-card {
    max-width: 700px; width: 100%;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); border-radius: 28px;
    padding: 72px 48px; text-align: center; position: relative; overflow: hidden;
  }
  .cta-card::before {
    content: ''; position: absolute; top: -1px; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,229,160,0.6), transparent);
  }
  .cta-card::after {
    content: ''; position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%);
    top: -200px; left: 50%; transform: translateX(-50%); pointer-events: none;
  }
  .cta-card h2 {
    font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em;
    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 16px; position: relative; z-index: 1;
  }
  .cta-card p { font-size: 16px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 40px; position: relative; z-index: 1; }
  .cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

  footer {
    border-top: 1px solid var(--glass-border); padding: 32px 48px;
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
  }
  .footer-copy { font-size: 12px; color: var(--text-tertiary); letter-spacing: 0.04em; }
  .footer-link { font-size: 12px; color: var(--text-tertiary); text-decoration: none; letter-spacing: 0.04em; transition: color 0.2s; }
  .footer-link:hover { color: var(--text-secondary); }

  @media (max-width: 640px) {
    nav { padding: 0 20px; }
    footer { flex-direction: column; gap: 12px; text-align: center; }
    .cta-card { padding: 48px 24px; }
  }
`;

const TICKER = [
  { label: 'NdFeB Magnet', val: '$78/kg', change: '+4.2%', up: true },
  { label: 'Aluminum', val: '$2,350/mt', change: '+0.5%', up: true },
  { label: 'HRC Steel', val: '$840/st', change: '-0.8%', up: false },
  { label: 'Lithium Carb', val: '$14.2k/mt', change: '-3.1%', up: false },
  { label: 'Copper', val: '$4.12/lb', change: '+2.4%', up: true },
  { label: 'Rare Earth', val: '$142/kg', change: '+6.8%', up: true },
  { label: 'Cotton', val: '$85.40/lb', change: '+0.2%', up: true },
  { label: 'Soybeans', val: '$11.80/bu', change: '-1.5%', up: false },
  { label: 'Nickel', val: '$18.4k/mt', change: '-0.9%', up: false },
  { label: 'Brent Crude', val: '$89.20', change: '+1.1%', up: true },
];

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Nav */}
      <nav>
        <Link href="/" className="nav-logo">
          <div style={{width:32,height:32,background:'rgba(56,189,248,0.1)',border:'1px solid rgba(56,189,248,0.2)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#38bdf8'}}>
            <AtlasLogo size={18} />
          </div>
          <div>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.15em',lineHeight:1}}>ATLAS</div>
            <div style={{fontSize:8,color:'rgba(255,255,255,0.35)',letterSpacing:'0.18em',marginTop:3,fontWeight:600}}>SUPPLY CHAIN INTELLIGENCE</div>
          </div>
        </Link>
        <Link href="/terminal" className="nav-cta">Launch Terminal →</Link>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot" />
          Supply Chain Intelligence
        </div>
        <h1>Know your supply chain<br/>before it fails you</h1>
        <p className="hero-sub">Real-time sourcing intelligence, tariff data, and geopolitical risk — built for procurement professionals who can&apos;t afford surprises.</p>
        <div className="hero-actions">
          <Link href="/terminal" className="btn-primary">Run a free scan →</Link>
          <a href="#features" className="btn-ghost">See how it works</a>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <div key={i} className="ticker-item">
              {t.label} <span className="val">{t.val}</span>
              <span className={t.up ? 'up' : 'dn'}>{t.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        {[
          { n: '180+', l: 'Sourcing hubs mapped globally' },
          { n: '8', l: 'Live currency pairs tracked' },
          { n: '20', l: 'Major ports monitored' },
          { n: '<3s', l: 'Intelligence scan time' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-number">{s.n}</span>
            <span className="stat-label">{s.l}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-label">What it does</div>
        <div className="section-heading">Every tool your sourcing team needs. In one terminal.</div>
        <div className="features-grid">
          {[
            { icon: '🌐', bg: 'rgba(0,229,160,0.1)', title: 'Mission Scan', desc: 'Describe what you need to source in plain English. Atlas maps global hubs, flags geopolitical risks, and surfaces the best suppliers in under 3 seconds.' },
            { icon: '⚖️', bg: 'rgba(255,159,10,0.1)', title: 'Tariff & HTS Lookup', desc: 'Instant HTS classification with MFN duty rates, Section 301 surcharges, and FTA preferential rates across US, EU, and UK customs regimes.' },
            { icon: '🛡', bg: 'rgba(255,59,48,0.1)', title: 'Trade Lane Risk Score', desc: 'Composite risk index for any origin–destination corridor. Scores geopolitical exposure, port labor risk, weather/force majeure, and infrastructure gaps.' },
            { icon: '📡', bg: 'rgba(0,120,255,0.1)', title: 'Live Market Intelligence', desc: 'Curated news from maritime and trade sources — automatically filtered to match your active sourcing mission. No noise, only what matters.' },
            { icon: '💱', bg: 'rgba(175,82,222,0.1)', title: 'FX Rate Monitor', desc: 'Live exchange rates across 8 currency pairs critical to global procurement — CNY, EUR, JPY, KRW, MXN, BRL and more.' },
            { icon: '📋', bg: 'rgba(0,229,160,0.08)', title: 'Compliance Checklist', desc: 'Auto-generated compliance requirements by product category and trade corridor — from CFIUS review triggers to import documentation standards.' },
          ].map((f, i) => (
            <div key={i} className="glass-card">
              <div className="card-icon" style={{ background: f.bg }}>{f.icon}</div>
              <div className="card-title">{f.title}</div>
              <div className="card-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="section-label">How it works</div>
        <div className="section-heading">Three steps from query to sourcing decision</div>
        <div className="steps">
          {[
            { n: '01', t: 'Describe your sourcing need', d: 'Type what you need to procure — be specific. "IATF-certified steel stamping for EV chassis frames" works better than "steel." Atlas understands material specs, applications, and supply chain context.' },
            { n: '02', t: 'Atlas maps your global options', d: 'In seconds, the 3D globe lights up with sourcing hubs ranked by relevance. Each hub shows verified suppliers, ESG rating, HTS code, duty rate, lead time, and freight cost — all in one panel.' },
            { n: '03', t: 'Act on intelligence', d: 'Run a risk score on your preferred trade lane, verify tariffs, check compliance requirements, monitor relevant market news — then generate a supplier RFQ and export your findings as a PDF briefing.' },
          ].map((s, i) => (
            <div key={i} className="step">
              <div className="step-num">{s.n}</div>
              <div>
                <div className="step-title">{s.t}</div>
                <div className="step-desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who uses Atlas */}
      <section className="audience">
        <div className="section-label">Who uses Atlas</div>
        <div className="section-heading">Built for the people managing real supply chain decisions</div>
        <div className="audience-grid">
          {[
            { tag: 'Manufacturing', role: 'Procurement Engineers', use: 'Sourcing components across Asia, Europe, and North America — fast tariff checks, supplier leads, and risk visibility before every RFQ.' },
            { tag: 'Trade', role: 'Import / Export Managers', use: 'HTS classification, FTA eligibility, port congestion alerts, and compliance checklists — everything for a clean customs filing.' },
            { tag: 'Finance', role: 'Supply Chain Analysts', use: 'Monitor commodity prices, FX exposure, and geopolitical risks affecting supplier costs — with news filtered to what\'s relevant.' },
            { tag: 'Consulting', role: 'Trade Advisors', use: 'Brief clients in minutes with a full supply chain intelligence scan — exportable as a PDF. From Baotou to Detroit in 3 seconds.' },
          ].map((a, i) => (
            <div key={i} className="audience-card">
              <span className="audience-tag">{a.tag}</span>
              <div className="audience-role">{a.role}</div>
              <div className="audience-use">{a.use}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to run your first scan?</h2>
          <p>Free to use. No account required. Type what you need to source and see your global options in seconds.</p>
          <div className="cta-actions">
            <Link href="/terminal" className="btn-primary">Launch Atlas Terminal →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-copy">© 2026 Atlas Terminal</span>
        <Link href="/terminal" className="footer-link">Launch Terminal →</Link>
      </footer>
    </>
  );
}
