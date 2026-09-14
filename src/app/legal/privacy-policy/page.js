export const metadata = {
  title: 'Privacy Policy -- Nautilus Terminal',
  description: 'Privacy Policy for Nautilus Terminal -- how we collect, use, and protect your information.',
}

const EFFECTIVE_DATE = 'September 1, 2026'

export default function PrivacyPolicyPage() {
  return (
    <article>
      <LegalHeader title="Privacy Policy" date={EFFECTIVE_DATE} />

      <Section title="Overview">
        <p>
          Nautilus Terminal (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;) is operated by Anubhav Tewari.
          This Privacy Policy describes what information we collect, how we use it, and your rights
          regarding that information when you use our platform at nautilus-terminal.vercel.app.
        </p>
      </Section>

      <Section title="Information We Collect">
        <p>
          We collect the following information:
        </p>
        <ul>
          <li>
            <strong>Email address</strong> -- when you submit a request for early access through our
            landing page. We use this solely to send you access credentials and product updates.
          </li>
          <li>
            <strong>Usage data</strong> -- anonymised logs of terminal queries (search terms, scan
            categories) may be retained to improve the Service. We do not link these logs to your
            identity.
          </li>
          <li>
            <strong>Vercel analytics</strong> -- our hosting provider (Vercel, Inc.) may collect
            standard server-side request logs including IP addresses and user agent strings for
            security and availability purposes. See Vercel&apos;s Privacy Policy for details.
          </li>
        </ul>
      </Section>

      <Section title="How We Use Your Information">
        <p>
          Your email address is used exclusively to:
        </p>
        <ul>
          <li>Send you access to the Nautilus Terminal</li>
          <li>Notify you of material product changes or outages</li>
          <li>Respond to support or feedback you initiate</li>
        </ul>
        <p>
          We do not sell, rent, or share your email address with any third party for marketing
          purposes. We do not run advertising of any kind.
        </p>
      </Section>

      <Section title="Email Communications">
        <p>
          Access emails are sent via Resend (resend.com), a transactional email provider. Your
          email address is transmitted to Resend solely for delivery of the access email. Resend
          is subject to its own privacy policy and data processing terms.
        </p>
        <p>
          You may request removal of your email from our records at any time by emailing
          anubhavtewari7@gmail.com. We will action the request within 14 days.
        </p>
      </Section>

      <Section title="Cookies and Local Storage">
        <p>
          Nautilus Terminal does not use tracking cookies or third-party analytics scripts. The
          terminal application uses browser localStorage solely to cache mission history and
          user preferences locally in your browser. This data never leaves your device and is not
          accessible to us.
        </p>
      </Section>

      <Section title="Third-Party Data Sources">
        <p>
          The terminal displays data aggregated from public and commercial APIs. Your use of this
          data is governed by our Terms of Service and Disclaimer. We do not share any personal
          information with these data providers.
        </p>
      </Section>

      <Section title="Data Retention">
        <p>
          Email addresses collected through the early access form are retained for as long as the
          Service is operational or until you request deletion. We do not retain any other
          personally identifying information beyond standard server logs, which are purged on a
          rolling 30-day basis by our infrastructure provider.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          Depending on your jurisdiction, you may have the right to access, correct, or delete
          personal data we hold about you, or to restrict or object to its processing. To exercise
          any of these rights, contact us at anubhavtewari7@gmail.com. We will respond within 30
          days.
        </p>
        <p>
          If you are located in the European Economic Area (EEA) or the United Kingdom, you have
          the right to lodge a complaint with your local supervisory authority if you believe your
          data has been processed unlawfully.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated
          to registered users via email. Continued use of the Service after an update constitutes
          acceptance of the revised policy. The effective date at the top of this page reflects
          the most recent revision.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For any privacy-related questions or requests, contact: anubhavtewari7@gmail.com
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
      <p className="text-xs text-slate-600">Effective {date}</p>
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
