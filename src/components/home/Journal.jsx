import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { JOURNAL } from '../../data/content.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import ArrowButtons from '../common/ArrowButtons.jsx'

// "Our Journal": heading column on the left, scrollable story cards on the right.
export default function Journal() {
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })

  return (
    <section id="journal" className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[320px_1fr] lg:py-32">
      <div>
        <Heading title="Our" accent="Journal" />
        <Reveal delay={150} as="p" className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">
          Stories from the road — the people, places and quiet moments that inspire every journey we craft.
        </Reveal>
        <Reveal delay={250} className="mt-8 flex flex-col items-start gap-8">
          <TextLink to="/contact">Plan Your Own Story</TextLink>
          <ArrowButtons onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
        </Reveal>
      </div>

      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
        {JOURNAL.map((post, i) => (
          <Reveal as="li" key={post.title} delay={i * 120} className="w-[85%] shrink-0 snap-start sm:w-[360px]">
            <Link to="/contact" className="group block h-full bg-white p-4 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_40px_-20px_rgba(0,0,0,0.35)]">
              <div className="overflow-hidden">
                <img src={post.image.src} alt={post.image.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
              </div>
              <div className="px-2 pt-5 pb-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{post.date}</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-forest italic transition-colors group-hover:text-gold">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
