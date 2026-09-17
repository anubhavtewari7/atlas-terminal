export const metadata = {
  title: 'Data Deletion -- Nautilus Terminal',
  description: 'How to request deletion of your personal data from NAUTILUS Terminal.',
}

const EFFECTIVE_DATE = 'September 2026'

export default function DataDeletionPage() {
  return (
    <article>
      <LegalHeader title="Data Deletion Request" date={EFFECTIVE_DATE} />

      <Section title="Your Right to Deletion">
        <p>
          NAUTILUS Intelligence respects your right to have your personal data deleted. Under{' '}
          <strong className="text-slate-300">GDPR Article 17</strong> (&quot;Right to Erasure&quot;) and
          the <strong className="text-slate-300">California Consumer Privacy Act (CCPA)</strong>, you
          have the right to request that we delete the personal data we hold about you.
        </p>
      </Section>

      <Section title="What Data We Hold">
        <p>
          Depending on how you have interacted with NAUTILUS Terminal, we may hold:
        </p>
        <ul>
          <li>
            <strong className="text-slate-300">Email address</strong> &mdash; collected if you signed up
            for the waitlist or early access. This is stored with our email provider, Resend.
          </li>
        </ul>
        <p>
          We do <strong className="text-slate-300">not</strong> hold: payment data, account passwords,
          government IDs, or any data collected from minors.
        </p>
        <p>
          IP addresses used for rate limiting are automatically deleted within 60 seconds and are
          not retrievable or stored in any identifiable form.
        </p>
      </Section>

      <Section title="How to Request Deletion">
        <p>
          To request deletion of your personal data:
        </p>
        <ul>
          <li>
            Email{' '}
            <a
              href="mailto:legal@nautilus-terminal.com?subject=Data%20Deletion%20Request&body=Please%20delete%20all%20personal%20data%20associated%20with%20this%20email%20address."
              className="text-sky-400 hover:text-sky-300"
            >
              legal@nautilus-terminal.com
            </a>
          </li>
          <li>Use the subject line: <strong className="text-slate-300">Data Deletion Request</strong></li>
          <li>Include the email address you used to sign up</li>
        </ul>
        <p>
          We will acknowledge your request within 72 hours and complete the deletion within{' '}
          <strong className="text-slate-300">30 days</strong>. We will confirm by email once the
          deletion is complete.
        </p>
      </Section>

      <Section title="Scope of Deletion">
        <p>
          Upon a verified deletion request, we will:
        </p>
        <ul>
          <li>Remove your email address from our Resend subscriber list</li>
          <li>Request deletion from Resend per their data processing obligations</li>
          <li>Remove any associated records from our internal systems</li>
        </ul>
        <p>
          Note: We may retain anonymised, non-identifiable usage data (which cannot be linked back
          to you) as permitted by applicable law.
        </p>
      </Section>

      <Section title="Unsubscribe from Emails">
        <p>
          If you only want to stop receiving emails (without full data deletion), email{' '}
          <a
            href="mailto:legal@nautilus-terminal.com?subject=Unsubscribe&body=Please%20remove%20me%20from%20the%20NAUTILUS%20waitlist."
            className="text-sky-400 hover:text-sky-300"
          >
            legal@nautilus-terminal.com
          </a>{' '}
          with subject <strong className="text-slate-300">&ldquo;Unsubscribe&rdquo;</strong>.
        </p>
      </Section>

      <Section title="Contact">
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
