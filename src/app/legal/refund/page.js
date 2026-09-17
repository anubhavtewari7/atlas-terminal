export const metadata = {
  title: 'Refund Policy -- Nautilus Terminal',
  description: 'Refund and cancellation policy for NAUTILUS Terminal paid plans.',
}

const EFFECTIVE_DATE = 'September 2026'

export default function RefundPolicyPage() {
  return (
    <article>
      <LegalHeader title="Refund Policy" date={EFFECTIVE_DATE} />

      <Section title="1. Current Status -- Free Tier">
        <p>
          NAUTILUS Terminal is currently available at no charge during its early-access period.
          No payment is required and no charges are made. This Refund Policy applies to future
          paid plans and is published in advance so you know exactly what to expect when billing
          is introduced.
        </p>
      </Section>

      <Section title="2. Annual Plans -- 7-Day Money-Back Guarantee">
        <p>
          When paid annual plans are introduced, NAUTILUS Intelligence will offer a{' '}
          <strong className="text-slate-300">7-day, no-questions-asked money-back guarantee</strong>{' '}
          from the date of purchase.
        </p>
        <p>
          To request a full refund within 7 days, email{' '}
          <a href="mailto:legal@nautilus-terminal.com?subject=Refund%20Request" className="text-sky-400 hover:text-sky-300">
            legal@nautilus-terminal.com
          </a>{' '}
          with the subject line <strong className="text-slate-300">&ldquo;Refund Request&rdquo;</strong>{' '}
          and include the email address associated with your account. No explanation is required.
        </p>
        <p>
          Refunds will be processed within <strong className="text-slate-300">5&ndash;7 business days</strong>{' '}
          and returned to the original payment method.
        </p>
      </Section>

      <Section title="3. Monthly Plans -- Cancel Any Time">
        <p>
          Monthly plans may be cancelled at any time from your account settings or by emailing
          legal@nautilus-terminal.com.
        </p>
        <p>
          Monthly plans are <strong className="text-slate-300">not eligible for partial-period refunds</strong>.
          Your access will continue until the end of the current billing period, after which no
          further charges will be made.
        </p>
      </Section>

      <Section title="4. No Hidden Fees">
        <p>
          Pricing will be all-inclusive and stated clearly on the pricing page before checkout.
          There are no setup fees, no overage charges, and no automatic upgrades. Any price
          changes will be communicated with at least 30 days&apos; notice to existing subscribers.
        </p>
      </Section>

      <Section title="5. Exceptions">
        <p>
          Refunds may be declined if there is evidence of abuse of the guarantee (e.g., repeated
          sign-up and refund cycles). We reserve the right to terminate accounts that violate our
          Terms of Service without refund.
        </p>
      </Section>

      <Section title="6. How to Request a Refund">
        <ul>
          <li>Email <a href="mailto:legal@nautilus-terminal.com?subject=Refund%20Request" className="text-sky-400 hover:text-sky-300">legal@nautilus-terminal.com</a></li>
          <li>Subject: <strong className="text-slate-300">Refund Request</strong></li>
          <li>Include the email address on your account</li>
          <li>For annual plans within 7 days: no reason required</li>
          <li>Processing time: 5&ndash;7 business days</li>
        </ul>
      </Section>

      <Section title="7. Contact">
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
