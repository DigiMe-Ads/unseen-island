import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import CaptionCard from '../common/CaptionCard.jsx'

// The wide middle card stretches to the height of its tall neighbours on larger screens.
const ASPECTS = ['aspect-[3/4] md:h-full', 'aspect-[4/3] md:aspect-auto md:h-full', 'aspect-[3/4] md:h-full']

// Three tall caption cards linking into the rest of the site.
export default function LuxeEscape() {
  const c = useSection('gallery.escape')
  return (
    <section className="bg-sand px-4 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <Heading title={c.title} accent={c.accent} />
          <Reveal delay={150} as="p" className="max-w-md text-[15px] leading-relaxed text-muted lg:justify-self-end">
            {c.text}
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-[1fr_2fr_1fr]">
          {c.cards.map((card, i) => (
            <Reveal key={i} delay={i * 150} className="md:h-full">
              <CaptionCard image={card.image} title={card.title} to={card.to} aspect={ASPECTS[i]} className="md:h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
