import { useRef } from 'react'
import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import ArrowButtons from '../common/ArrowButtons.jsx'
import CaptionCard from '../common/CaptionCard.jsx'

// Centred heading over a snap-scrolling strip of experience cards.
export default function ExperienceCarousel() {
  const c = useSection('home.experiences')
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Heading center title={c.title} accent={c.accent} />
        <Reveal delay={150} as="p" className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
          {c.text}
        </Reveal>
        <Reveal delay={250} className="mt-8 flex flex-col items-center gap-8">
          <TextLink to="/gallery">{c.link}</TextLink>
          <ArrowButtons onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
        </Reveal>
      </div>

      <Reveal delay={200}>
        <ul ref={track} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))]">
          {c.items.map((e, i) => (
            <li key={i}className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[30%]">
              <CaptionCard image={e.image} label={e.label} title={e.title} aspect="aspect-[3/4]" to="/gallery" />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
