export const metadata = {
  title: 'Data Sources -- Nautilus Terminal',
  description: 'Attribution and details for the data sources powering Nautilus Terminal.',
}

const UPDATED_DATE = 'September 1, 2026'

const SOURCES = [
  {
    category: 'News & Geopolitical Intelligence',
    items: [
      {
        name: 'NewsAPI',
        url: 'https://newsapi.org',
        description:
          'Aggregated headlines from global news publishers. Used for supply chain disruption monitoring, port news, and geopolitical event detection. Updated every 5 minutes.',
        terms: 'https://newsapi.org/terms',
        notes: 'Free tier limits apply. Coverage depends on publisher agreements held by NewsAPI.',
      },
    ],
  },
  {
    category: 'Foreign Exchange Rates',
    items: [
      {
        name: 'Frankfurter (European Central Bank)',
        url: 'https://www.frankfurter.app',
        description:
          'Daily ECB reference exchange rates for 30+ currencies relative to EUR and USD. Used for currency risk context in hub and supplier analysis.',
        terms: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html',
        notes: 'Rates are published on ECB business days. Not a real-time trading feed.',
      },
    ],
  },
  {
    category: 'Commodity Prices',
    items: [
      {
        name: 'Metals-API / Open Exchange Rates (fallback)',
        url: 'https://metals-api.com',
        description:
          'Spot prices for gold, silver, copper, aluminum, and crude oil. Used as a macroeconomic signal layer in supply chain risk analysis.',
        terms: 'https://metals-api.com/terms',
        notes: 'Prices are indicative. Not suitable for financial trading decisions.',
      },
    ],
  },
  {
    category: 'AI Inference',
    items: [
      {
        name: 'Google Gemini (via Vercel AI SDK)',
        url: 'https://ai.google.dev',
        description:
          'Large language model used to analyze hub networks, generate strategic directives, summarize intelligence, and answer sourcing queries. Queries are sent to Google\'s API and processed under Google\'s privacy policy.',
        terms: 'https://ai.google.dev/terms',
        notes:
          'AI outputs are probabilistic and may be incorrect. Always validate critical decisions against primary sources.',
      },
    ],
  },
  {
    category: 'Globe Visualization',
    items: [
      {
        name: 'react-globe.gl',
        url: 'https://github.com/vasturiano/react-globe.gl',
        description:
          'WebGL-based 3D globe used for hub and trade route visualization. Powered by Three.js. No external data calls are made by this library.',
        terms: 'https://github.com/vasturiano/react-globe.gl/blob/master/LICENSE',
        notes: 'MIT licensed. Hub coordinates and trade route data are statically defined within Nautilus Terminal.',
      },
    ],
  },
  {
    category: 'Analytics',
    items: [
      {
        name: 'Vercel Analytics',
        url: 'https://vercel.com/analytics',
        description:
          'Privacy-friendly page view and Web Vital analytics. No cookies are used. No personal data is collected or shared with advertising networks.',
        terms: 'https://vercel.com/legal/privacy-policy',
        notes: 'Aggregate traffic data only. Compliant with GDPR and CCPA.',
      },
    ],
  },
  {
    category: 'Email',
    items: [
      {
        name: 'Resend',
        url: 'https://resend.com',
        description:
          'Transactional email provider used for waitlist confirmations and notification delivery. Email addresses submitted via the waitlist form are stored with Resend.',
        terms: 'https://resend.com/legal/privacy-policy',
        notes: 'Emails are not sold or shared with third parties. You can request deletion by contacting us.',
      },
    ],
  },
  {
    category: 'Static Reference Data',
    items: [
      {
        name: 'World Port Index / Port Authority Publications',
        url: null,
        description:
          'Chokepoint geography, port identifiers, and hub classifications are based on publicly available shipping industry reference data including the US NGA World Port Index and UNCTAD trade route publications.',
        terms: null,
        notes: 'Compiled and maintained internally. Data reflects general industry knowledge and may not reflect the most current port operational status.',
      },
    ],
  },
]

export default function DataSourcesPage() {
  return (
    <article>
      <div className="mb-12 pb-8 border-b border-white/5">
        <div className="text-[10px] font-bold tracking-[0.3em] text-sky-400 uppercase mb-3">
          Legal
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Data Sources</h1>
        <p className="text-xs text-slate-600">Last updated {UPDATED_DATE}</p>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          Nautilus Terminal is a data aggregation and AI analysis platform. Below is a complete
          attribution of every external data source and third-party service used to power the
          terminal. For questions about data usage, contact us through the main site.
        </p>
      </div>

      <div className="space-y-10">
        {SOURCES.map((group) => (
          <section key={group.category}>
            <h2 className="text-[10px] font-bold tracking-[0.25em] text-sky-400/70 uppercase mb-4">
              {group.category}
            </h2>
            <div className="space-y-5">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-sm font-semibold text-slate-200">{item.name}</h3>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-sky-500 hover:text-sky-300 transition-colors shrink-0"
                      >
                        Website &rarr;
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  {item.terms && (
                    <p className="text-[11px] text-slate-600 mb-1">
                      Terms:{' '}
                      <a
                        href={item.terms}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-slate-400 underline transition-colors"
                      >
                        {item.terms}
                      </a>
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-[11px] text-slate-600 leading-relaxed border-l-2 border-white/5 pl-3 mt-2">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-xs text-slate-600 leading-relaxed">
        <p>
          Third-party service terms and privacy policies are controlled by their respective
          providers and are subject to change. Nautilus Terminal is not responsible for changes
          to third-party terms. If you believe a data source is attributed incorrectly or you have
          a data removal request, please contact us through the main site.
        </p>
      </div>
    </article>
  )
}
