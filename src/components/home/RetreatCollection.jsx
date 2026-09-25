import { RETREATS } from '../../data/content.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import CaptionCard from '../common/CaptionCard.jsx'

// Two offset cards with the heading tucked above the right-hand one.
export default function RetreatCollection() {
  const [left, right] = RETREATS
  return (
    <section className="mx-auto grid max-w-7xl items-start gap-10 px-4 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-36">
      <Reveal from="left" className="lg:mt-40">
        <CaptionCard {...left} label={left.region} aspect="aspect-[4/5]" />
      </Reveal>
      <div>
        <Heading label="Stays & Sanctuaries" title="Hidden" accent="Retreats" />
        <Reveal delay={150} as="p" className="mt-6 mb-10 max-w-md text-[15px] leading-relaxed text-muted">
          Find sanctuary in boutique villas and intimate hideaways, hand-picked for their privacy, character and the kind of hospitality
          that makes you feel at home.
        </Reveal>
        <Reveal from="right" delay={200}>
          <CaptionCard {...right} label={right.region} />
        </Reveal>
      </div>
    </section>
  )
}
