import { useState } from 'react'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'

const TERMS = [
  {
    q: 'Accepted Payment Methods',
    a: 'We accept bank transfers, major credit and debit cards, and secure online payment links. Details for each method are provided with your booking confirmation.',
  },
  {
    q: 'Currency',
    a: 'All quotations are issued in US Dollars (USD) unless otherwise agreed. Payments in other currencies are converted at the prevailing exchange rate on the day of payment, and any bank charges are borne by the client.',
  },
  {
    q: 'Confirmation of Booking',
    a: 'Your booking is confirmed once we receive the agreed deposit and a signed acceptance of these terms. The remaining balance is payable before the start of your tour, as stated on your invoice.',
  },
]

// Minimal hairline accordion.
export default function PaymentTerms() {
  const [open, setOpen] = useState(null)

  return (
    <section id="payment-terms" className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:py-32">
      <Heading label="Good To Know" title="Payments," accent="Terms & Conditions" size="md" />
      <div className="border-t border-line">
        {TERMS.map((t, i) => {
          const isOpen = open === i
          return (
            <Reveal key={t.q} delay={i * 100} className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className={`font-serif text-2xl transition-all duration-300 group-hover:pl-2 ${isOpen ? 'text-forest italic' : 'text-ink'}`}>
                  {t.q}
                </span>
                <span className="relative h-4 w-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-forest" />
                  <span className={`absolute top-0 left-1/2 h-4 w-px bg-forest transition-transform duration-500 ${isOpen ? 'scale-y-0' : ''}`} />
                </span>
              </button>
              <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <p className="min-h-0 overflow-hidden text-[15px] leading-relaxed text-muted">
                  <span className="block max-w-xl pb-6">{t.a}</span>
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
