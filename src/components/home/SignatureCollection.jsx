import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import CaptionCard from '../common/CaptionCard.jsx'

// Staggered three-card layout: intro text + card on the first row, two offset cards below.
export default function SignatureCollection() {
  const c = useSection('home.signature')
  const [first, second, third] = c.items
  return (
    <section id="experiences" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-8 lg:pb-32">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-16 lg:pl-10">
          <Heading label={c.label} title={c.title} accent={c.accent} />
          <Reveal delay={150} as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            {c.text}
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
