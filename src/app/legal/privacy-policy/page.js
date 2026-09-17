export const metadata = {
  title: 'Privacy Policy -- Nautilus Terminal',
  description: 'Privacy Policy for Nautilus Terminal -- how NAUTILUS Intelligence collects, uses, and protects your information.',
}

const EFFECTIVE_DATE = 'September 2026'

export default function PrivacyPolicyPage() {
  return (
    <article>
      <LegalHeader title="Privacy Policy" date={EFFECTIVE_DATE} />

      <Section title="1. Who We Are">
        <p>
          NAUTILUS Terminal is operated by NAUTILUS Intelligence (&quot;we&quot;, &quot;our&quot;, or
          &quot;the Company&quot;). Our product is available at nautilus-terminal.vercel.app.
          For privacy inquiries, contact us at:{' '}
          <a href="mailto:legal@nautilus-terminal.com" className="text-sky-400 hover:text-sky-300">
            legal@nautilus-terminal.com
          </a>
        </p>
      </Section>

      <Section title="2. Scope">
        <p>
          This Privacy Policy explains how we collect, use, and protect information when you access
          the NAUTILUS Terminal website and platform. It applies to all visitors, waitlist subscribers,
          and users of the Service.
        </p>
        <p>
          <strong className="text-slate-300">Age restriction:</strong> This Service is intended exclusively
          for users who are 18 years of age or older. We do not knowingly collect personal information
          from anyone under 18. If you believe a minor has submitted information to us, please contact
          legal@nautilus-terminal.com immediately and we will delete it.
        </p>
      </Section>

      <Section title="3. Information We Collect">
        <p>We collect only the minimum data necessary to operate the Service:</p>
        <ul>
          <li>
            <strong className="text-slate-300">Email address</strong> &mdash; collected when you submit
            a request for early access. Used to send your access link and product-related communications.
            We do not collect your name, billing information, or any account credentials at this stage.
          </li>
          <li>
            <strong className="text-slate-300">IP address (temporary)</strong> &mdash; stored temporarily
            in our rate-limiting system (Upstash Redis) when you submit the waitlist form or make API
            requests. IP addresses are automatically deleted after 60 seconds and are never linked to
            your email address or used for any other purpose.
          </li>
          <li>
            <strong className="text-slate-300">Aggregate usage analytics</strong> &mdash; our hosting
            provider Vercel may collect anonymised, aggregated page-view and Web Vitals data for
            performance monitoring. No cookies are used and no personal information is collected via
            Vercel Analytics.
          </li>
        </ul>
        <p>
          <strong className="text-slate-300">What we do NOT collect:</strong> We collect no payment data,
          no government identifiers, no biometric data, no health data, no sensitive personal categories,
          and no information from children under 18.
        </p>
      </Section>

      <Section title="4. How We Use Your Information">
        <p>Your email address is used exclusively to:</p>
        <ul>
          <li>Send you access to the NAUTILUS Terminal</li>
          <li>Notify you of material product changes or service outages</li>
          <li>Respond to support or feedback requests you initiate</li>
        </ul>
        <p>
          We do not sell, rent, trade, or share your email address with any third party for
          marketing or advertising purposes. We run no advertising of any kind.
        </p>
        <p>
          <strong className="text-slate-300">Legal bases (GDPR):</strong> Processing your email for
          waitlist fulfilment is based on your consent (Article 6(1)(a)). Rate-limiting IP storage is
          based on our legitimate interest in service security (Article 6(1)(f)) and is minimised to
          the extent technically possible (60-second auto-expiry).
        </p>
      </Section>

      <Section title="5. Third-Party Service Providers">
        <p>
          We share data only with the following service providers, and only to the extent necessary
          to operate the Service:
        </p>
        <ul>
          <li>
            <strong className="text-slate-300">Resend (resend.com)</strong> &mdash; transactional email
            delivery. Your email address is transmitted to Resend solely to deliver your access
            confirmation. Resend acts as a data processor under its own{' '}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Privacy Policy</a>.
          </li>
          <li>
            <strong className="text-slate-300">Vercel Inc. (vercel.com)</strong> &mdash; hosting and
            infrastructure. Vercel processes request logs (including IP addresses) in the ordinary
            course of serving our web application. See{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Vercel Privacy Policy</a>.
          </li>
          <li>
            <strong className="text-slate-300">Upstash (upstash.com)</strong> &mdash; Redis-compatible
            database used exclusively for API rate limiting. IP addresses are stored for a maximum of
            60 seconds and then automatically purged. See{' '}
            <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Upstash Privacy Policy</a>.
          </li>
          <li>
            <strong className="text-slate-300">Google (ai.google.dev)</strong> &mdash; AI inference via
            Gemini API. Terminal queries you enter may be sent to Google for AI-generated analysis.
            These queries are processed under{' '}
            <a href="https://ai.google.dev/terms" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Google AI Terms</a>.
          </li>
        </ul>
        <p>
          <strong className="text-slate-300">Public data sources</strong> (GDELT, NASA FIRMS, USGS,
          Frankfurter/ECB, Yahoo Finance, UN Comtrade, USITC): these are publicly available datasets.
          No personal information is shared with or received from these sources.
        </p>
        <p>We do not use advertising networks, social media tracking pixels, or third-party analytics beyond Vercel.</p>
      </Section>

      <Section title="6. Cookies and Local Storage">
        <p>
          NAUTILUS Terminal does <strong className="text-slate-300">not</strong> use advertising
          cookies, tracking cookies, or third-party analytics cookies.
        </p>
        <p>
          The terminal application uses your browser&apos;s <code>localStorage</code> to store mission
          history and user preferences locally on your device. This data never leaves your device and
          is not accessible to us.
        </p>
        <p>
          We use a functional session cookie solely to remember your cookie consent choice (accept or
          decline). Vercel may set performance-related cookies as part of hosting. For full details,
          see our{' '}
          <a href="/legal/cookies" className="text-sky-400 hover:text-sky-300">Cookie Policy</a>.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <ul>
          <li>
            <strong className="text-slate-300">Email addresses</strong> &mdash; retained until you
            request deletion or unsubscribe.
          </li>
          <li>
            <strong className="text-slate-300">IP addresses (rate limiting)</strong> &mdash; deleted
            automatically after 60 seconds.
          </li>
          <li>
            <strong className="text-slate-300">Vercel server logs</strong> &mdash; subject to Vercel&apos;s
            retention policies (typically 30 days rolling).
          </li>
          <li>
            <strong className="text-slate-300">Terminal query logs</strong> &mdash; anonymised and not
            linked to any personal identifier.
          </li>
        </ul>
      </Section>

      <Section title="8. Your Rights">
        <p>
          Depending on your jurisdiction, you may have the following rights regarding your personal data:
        </p>
        <ul>
          <li><strong className="text-slate-300">Access</strong> &mdash; request a copy of the data we hold about you</li>
          <li><strong className="text-slate-300">Correction</strong> &mdash; request that inaccurate data be corrected</li>
          <li><strong className="text-slate-300">Deletion</strong> &mdash; request erasure of your personal data (see our <a href="/legal/data-deletion" className="text-sky-400 hover:text-sky-300">Data Deletion page</a>)</li>
          <li><strong className="text-slate-300">Restriction</strong> &mdash; request we restrict processing of your data</li>
          <li><strong className="text-slate-300">Portability</strong> &mdash; receive your data in a machine-readable format</li>
          <li><strong className="text-slate-300">Objection</strong> &mdash; object to processing based on legitimate interests</li>
          <li><strong className="text-slate-300">Withdraw consent</strong> &mdash; unsubscribe at any time</li>
        </ul>
        <p>
          To exercise any of these rights, email{' '}
          <a href="mailto:legal@nautilus-terminal.com" className="text-sky-400 hover:text-sky-300">
            legal@nautilus-terminal.com
          </a>{' '}
          with subject &ldquo;Privacy Request&rdquo;. We will respond within 30 days.
        </p>
        <p>
          <strong className="text-slate-300">CCPA (California residents):</strong> We do not sell personal
          information. You have the right to know what data we collect, request deletion, and opt out
          of sale (which we do not engage in). Contact us at the address above.
        </p>
        <p>
          <strong className="text-slate-300">EEA/UK residents:</strong> You have the right to lodge a
          complaint with your local supervisory authority if you believe your data has been processed
          unlawfully.
        </p>
      </Section>

      <Section title="9. Data Security">
        <p>
          We implement reasonable technical and organisational measures to protect your personal data.
          Email addresses are stored with Resend (a SOC 2-compliant provider) and access is restricted.
          No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="10. International Transfers">
        <p>
          NAUTILUS Intelligence is based in the United States. If you access the Service from the
          European Economic Area, United Kingdom, or elsewhere, your information may be transferred to
          and processed in the United States. By using the Service, you consent to this transfer.
          Where required by law, we rely on Standard Contractual Clauses or equivalent safeguards.
        </p>
      </Section>

      <Section title="11. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated
          to waitlist subscribers via email and flagged in the Service interface. Continued use after
          an update constitutes acceptance of the revised policy. The effective date above reflects
          the most recent revision.
        </p>
      </Section>

      <Section title="12. Contact">
        <p>
          For any privacy-related questions, requests, or complaints:
        </p>
        <p>
          NAUTILUS Intelligence<br />
          Email:{' '}
          <a href="mailto:legal@nautilus-terminal.com" className="text-sky-400 hover:text-sky-300">
            legal@nautilus-terminal.com
          </a>
        </p>
      </Section>
    </article>
  )
}

function LegalHeader({ title, date }) {
  return (
    <div className="mb-12 pb-8 border-b border-white/5">
      <div className="text-[10px] font-bold tracking-[0.3em] text-sky-400 uppercase mb-3">
        Legal
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <p className="text-xs text-slate-600">Last updated {date}</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
        {title}
      </h2>
      <div className="text-sm text-slate-400 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-slate-400">
        {children}
      </div>
    </section>
  )
}
