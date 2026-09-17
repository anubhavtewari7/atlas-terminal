export const metadata = {
  title: 'Cookie Policy -- Nautilus Terminal',
  description: 'Cookie Policy for NAUTILUS Terminal -- what cookies we use and how to control them.',
}

const EFFECTIVE_DATE = 'September 2026'

export default function CookiePolicyPage() {
  return (
    <article>
      <LegalHeader title="Cookie Policy" date={EFFECTIVE_DATE} />

      <Section title="1. Our Approach to Cookies">
        <p>
          NAUTILUS Terminal is designed to respect your privacy. We do <strong className="text-slate-300">not</strong> use:
        </p>
        <ul>
          <li>Advertising or targeting cookies</li>
          <li>Third-party tracking cookies or pixels</li>
          <li>Social media tracking</li>
          <li>Cross-site behavioural profiling</li>
        </ul>
        <p>
          There are no cookie walls on this site. You can use NAUTILUS Terminal regardless of your
          cookie preferences.
        </p>
      </Section>

      <Section title="2. Cookies We Use">
        <p>
          We use only the following minimal functional storage:
        </p>
        <ul>
          <li>
            <strong className="text-slate-300">Cookie consent preference</strong> &mdash; stored in your
            browser&apos;s <code>localStorage</code> to remember whether you have accepted or declined
            our cookie notice. This is a functional preference store, not a tracking mechanism.
          </li>
        </ul>
        <p>
          The terminal application also uses <code>localStorage</code> to store your mission history
          and UI preferences locally on your device. This data never leaves your device and is not
          accessible to NAUTILUS Intelligence.
        </p>
      </Section>

      <Section title="3. Third-Party Cookies (Vercel)">
        <p>
          Our hosting provider, Vercel, Inc., may set performance-related cookies or collect request
          data as part of delivering our web application. Vercel Analytics is configured in
          privacy-friendly mode: no personal data is collected and no advertising profiles are
          built. See{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300"
          >
            Vercel Privacy Policy
          </a>{' '}
          for full details.
        </p>
      </Section>

      <Section title="4. How to Control Cookies">
        <p>
          You can control or delete cookies through your browser settings:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Chrome cookie settings</a>
          </li>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Firefox tracking protection</a>
          </li>
          <li>
            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Safari cookie management</a>
          </li>
          <li>
            <a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Edge cookie settings</a>
          </li>
        </ul>
        <p>
          Clearing <code>localStorage</code> in your browser will also remove locally stored
          preferences and mission history for NAUTILUS Terminal.
        </p>
      </Section>

      <Section title="5. Changes to This Policy">
        <p>
          We may update this Cookie Policy if we add new features that use cookies. Any material
          changes will be communicated via the cookie consent banner. The effective date above
          reflects the most recent revision.
        </p>
      </Section>

      <Section title="6. Contact">
        <p>
          Questions about our use of cookies:{' '}
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
