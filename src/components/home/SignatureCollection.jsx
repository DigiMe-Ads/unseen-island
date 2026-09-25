import { SIGNATURE } from '../../data/content.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import CaptionCard from '../common/CaptionCard.jsx'

// Staggered three-card layout: intro text + card on the first row, two offset cards below.
export default function SignatureCollection() {
  const [first, second, third] = SIGNATURE
  return (
    <section id="experiences" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-8 lg:pb-32">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-16 lg:pl-10">
          <Heading label="Signature Journeys" title="The Unseen" accent="Collection" />
          <Reveal delay={150} as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            From the heritage-rich north to the surf breaks of the east and the wild heart of Yala, each journey is crafted around the
            places that make Sri Lanka unforgettable — and the people who call them home.
          </Reveal>
        </div>
        <Reveal from="right">
          <CaptionCard {...first} label={first.region} />
        </Reveal>
      </div>

      <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
        <Reveal from="left" className="lg:-mt-40">
          <CaptionCard {...second} label={second.region} />
        </Reveal>
        <Reveal from="right" delay={150} className="lg:mt-24">
          <CaptionCard {...third} label={third.region} />
        </Reveal>
      </div>
    </section>
  )
}
