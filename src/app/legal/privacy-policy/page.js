export const metadata = {
  title: 'Privacy Policy -- Nautilus Terminal',
  description: 'How Nautilus Terminal collects, uses, and protects your information.',
}

const EFFECTIVE_DATE = 'September 14, 2026'

export default function PrivacyPolicyPage() {
  return (
    <article className="prose-legal">
      <LegalHeader title="Privacy Policy" date={EFFECTIVE_DATE} />

      <Section title="1. Overview">
        <p>
          Nautilus Terminal (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Service&rdquo;) is
          committed to protecting your privacy. This policy explains what information we collect,
          how we use it, and your rights regarding that information. We keep this simple because
          our data practices are simple.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>
          <strong>Email address.</strong> When you submit the early access form on our landing page,
          we collect the email address you provide. This is the only personal information we collect.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Usage data.</strong> Like most web services, our hosting provider (Vercel) automatically
          logs basic technical information such as IP addresses, browser type, pages visited, and
          timestamps. We do not link this data to your identity.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>No account data.</strong> Nautilus Terminal does not currently require account
          registration. We do not collect passwords, payment information, or any other personal data.
        </p>
      </Section>

      <Section title="3. How We Use Your Email">
        <p>Your email address is used solely to:</p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.9' }}>
          <li>Send you the terminal access link you requested.</li>
          <li>Notify you of significant updates to the Service relevant to your use.</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          We do not send marketing emails, newsletters, or promotional material without your
          explicit opt-in. You will not be added to any mailing list.
        </p>
      </Section>

      <Section title="4. Data Sharing">
        <p>
          We do not sell, rent, trade, or otherwise share your personal information with third
          parties for their commercial purposes. Your email address is not disclosed to any
          advertiser, data broker, or external organisation.
        </p>
        <p style={{ marginTop: '12px' }}>
          We use the following third-party services to operate the platform. Each processes only
          the data necessary to perform its function:
        </p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.9' }}>
          <li><strong>Vercel</strong> -- hosting and serverless infrastructure.</li>
          <li><strong>Resend</strong> -- transactional email delivery for access links.</li>
        </ul>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We retain your email address for as long as the Service is active or until you request
          deletion. To have your email removed from our records, contact us at the address below
          and we will delete it within 7 business days.
        </p>
      </Section>

      <Section title="6. Security">
        <p>
          Access links are delivered over encrypted connections (HTTPS). We do not store passwords
          or payment credentials. While no system is completely immune to security risks, we
          follow current industry-standard practices to protect the data we hold.
        </p>
      </Section>

      <Section title="7. Children">
        <p>
          Nautilus Terminal is designed for professional and academic use by individuals 18 years
          of age or older. We do not knowingly collect information from minors. If you believe a
          minor has submitted their information, please contact us and we will remove it promptly.
        </p>
      </Section>

      <Section title="8. Your Rights">
        <p>
          Depending on your jurisdiction, you may have the right to access, correct, or delete
          personal information we hold about you. To exercise any of these rights, contact us
          at <a href="mailto:anubhav.tewari@slate.auto" style={{ color: 'inherit' }}>anubhav.tewari@slate.auto</a>.
          We will respond within 30 days.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          If we make material changes to this policy, we will update the effective date at the top
          of this page. Continued use of the Service after changes are posted constitutes acceptance
          of the revised policy.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions about this Privacy Policy or your data can be directed to:<br />
          <strong>Anubhav Tewari</strong> -- Founder, Nautilus Terminal<br />
          <a href="mailto:anubhav.tewari@slate.auto" style={{ color: 'inherit' }}>anubhav.tewari@slate.auto</a>
        </p>
      </Section>
    </article>
  )
}

function LegalHeader({ title, date }) {
  return (
    <header style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ fontFamily: 'var(--mono, monospace)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent, #38BDF8)', marginBottom: '12px' }}>
        // Legal
      </div>
      <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, margin: '0 0 14px' }}>{title}</h1>
      <p style={{ fontFamily: 'var(--mono, monospace)', fontSize: '11px', color: 'rgba(237,244,255,0.35)', letterSpacing: '0.12em' }}>
        Effective {date}
      </p>
    </header>
  )
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(237,244,255,0.55)', marginBottom: '12px' }}>{title}</h2>
      <div style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(237,244,255,0.75)', lineHeight: 1.8 }}>{children}</div>
    </section>
  )
}
