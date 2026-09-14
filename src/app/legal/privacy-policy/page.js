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
        <p className="mt-3">
          <strong>Usage data.</strong> Like most web services, our hosting provider (Vercel) automatically
          logs basic technical information such as IP addresses, browser type, pages visited, and
          timestamps. We do not link this data to your identity.
        </p>
        <p className="mt-3">
          <strong>No account data.</strong> Nautilus Terminal does not currently require account
          registration. We do not collect passwords, payment information, or any other personal data.
        </p>
      </Section>

      <Section title="3. How We Use Your Email">
        <p>Your email address is used solely to:</p>
        <ul className="mt-2 pl-5 space-y-1 list-disc">
          <li>Send you the terminal access link you requested.</li>
          <li>Notify you of significant updates to the Service relevant to your use.</li>
        </ul>
        <p className="mt-3">
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
        <p className="mt-3">
          We use the following third-party services to operate the platform. Each processes only
          the data necessary to perform its function:
        </p>
        <ul className="mt-2 pl-5 space-y-1 list-disc">
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
          at <a href="mailto:anubhav.tewari@slate.auto" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">anubhav.tewari@slate.auto</a>.
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
          <a href="mailto:anubhav.tewari@slate.auto" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">anubhav.tewari@slate.auto</a>
        </p>
      </Section>
    </article>
  )
}

function LegalHeader({ title, date }) {
  return (
    <header className="mb-12 pb-8 border-b border-white/10">
      <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-sky-400 mb-3">
        {'// Legal'}
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-3">{title}</h1>
      <p className="font-mono text-[11px] text-slate-500 tracking-wider">
        Effective {date}
      </p>
    </header>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-3">{title}</h2>
      <div className="text-[15px] font-light text-slate-300 leading-relaxed">{children}</div>
    </section>
  )
}
