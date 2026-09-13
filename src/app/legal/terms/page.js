export const metadata = {
  title: 'Terms of Service -- Nautilus Terminal',
  description: 'Terms governing your use of the Nautilus supply chain intelligence terminal.',
}

const EFFECTIVE_DATE = 'September 1, 2026'

export default function TermsPage() {
  return (
    <article className="prose-legal">
      <LegalHeader title="Terms of Service" date={EFFECTIVE_DATE} />

      <Section title="1. Acceptance of Terms">
        <p>
          By accessing or using the Nautilus Terminal (the &ldquo;Service&rdquo;), you agree to be
          bound by these Terms of Service. If you do not agree to all of these terms, do not access
          or use the Service.
        </p>
      </Section>

      <Section title="2. Description of Service">
        <p>
          Nautilus Terminal is a supply chain intelligence platform that aggregates publicly available
          data, third-party news feeds, foreign exchange rates, and commodity prices to support
          procurement research and decision-making. The Service is provided for informational purposes
          only.
        </p>
      </Section>

      <Section title="3. No Professional Advice">
        <p>
          Nothing on this Service constitutes financial, legal, trade, or investment advice. All
          analysis, risk scores, and recommendations are generated algorithmically from third-party
          data and are intended as a starting point for your own research -- not as a substitute for
          professional judgment. You are solely responsible for any decisions you make based on
          information obtained through the Service.
        </p>
      </Section>

      <Section title="4. Permitted Use">
        <p>
          You may use the Service for lawful commercial research and procurement purposes. You may not:
        </p>
        <ul>
          <li>Scrape, systematically download, or redistribute data from the Service at scale</li>
          <li>Use the Service to engage in market manipulation, sanctions evasion, or any unlawful activity</li>
          <li>Reverse-engineer, decompile, or otherwise attempt to extract proprietary models or algorithms</li>
          <li>Resell or sub-license access to the Service without prior written consent</li>
        </ul>
      </Section>

      <Section title="5. Intellectual Property">
        <p>
          The Nautilus Terminal interface, branding, and original analysis are protected by copyright
          and other intellectual property laws. Third-party data accessed through the Service remains
          the property of the respective providers and is subject to their individual terms of use.
        </p>
      </Section>

      <Section title="6. Availability and Accuracy">
        <p>
          We strive to provide accurate, up-to-date information but make no representations or
          warranties -- express or implied -- about the completeness, accuracy, reliability, or
          fitness for a particular purpose of any content. The Service may be interrupted for
          maintenance or due to third-party API outages without notice.
        </p>
      </Section>

      <Section title="7. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, Nautilus Terminal and its operators
          shall not be liable for any indirect, incidental, special, consequential, or punitive
          damages arising from your use of or inability to use the Service, including but not limited
          to procurement decisions, contract losses, or data inaccuracies.
        </p>
      </Section>

      <Section title="8. Third-Party Services">
        <p>
          The Service integrates with third-party APIs (including news providers, currency data
          sources, and AI inference providers). We are not responsible for the content, accuracy,
          or availability of those third-party services, and their terms of use apply independently.
        </p>
      </Section>

      <Section title="9. Privacy">
        <p>
          Search queries entered in the terminal may be processed by third-party AI providers to
          generate analysis. We do not sell your query data. By using the Service you consent to
          this processing. We collect minimal usage analytics (via Vercel Analytics) to improve
          the Service.
        </p>
      </Section>

      <Section title="10. Modifications">
        <p>
          We reserve the right to modify these Terms at any time. Continued use of the Service
          after changes are posted constitutes acceptance of the revised Terms. Material changes
          will be communicated via the Service interface.
        </p>
      </Section>

      <Section title="11. Governing Law">
        <p>
          These Terms are governed by the laws of the State of Delaware, United States, without
          regard to conflict-of-law principles. Any dispute arising from these Terms shall be
          resolved in the state or federal courts located in Delaware.
        </p>
      </Section>

      <Section title="12. Contact">
        <p>
          Questions about these Terms can be directed to the team via the contact information
          available on the main Nautilus Terminal site.
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
