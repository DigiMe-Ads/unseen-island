import { IMAGES } from '../../data/images.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import CaptionCard from '../common/CaptionCard.jsx'

const CARDS = [
  { title: 'Destinations', image: IMAGES.goldenSunset, to: '/about#around-the-island', aspect: 'aspect-[3/4]' },
  { title: 'Experiences', image: IMAGES.villaCoast, to: '/#experiences', aspect: 'aspect-[4/3] md:aspect-auto md:h-full' },
  { title: 'Journeys', image: IMAGES.rainforestPool, to: '/contact', aspect: 'aspect-[3/4]' },
]

// Three tall caption cards linking into the rest of the site.
export default function LuxeEscape() {
  return (
    <section className="bg-sand px-4 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <Heading title="Discover Your" accent="Island Escape" />
          <Reveal delay={150} as="p" className="max-w-md text-[15px] leading-relaxed text-muted lg:justify-self-end">
            Traverse the wilderness, find stillness beside the ocean and reconnect with nature through journeys that share the best of Sri
            Lanka with curious, discerning travellers.
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-[1fr_2fr_1fr]">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 150} className="md:h-full">
              <CaptionCard image={c.image} title={c.title} to={c.to} aspect={c.aspect} className="md:h-full md:[&>img]:h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
