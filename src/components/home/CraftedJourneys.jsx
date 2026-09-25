import { IMAGES } from '../../data/images.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'

const STEPS = [
  ['01', 'Tell us your dream', 'Share how you like to travel, who is coming and what moves you.'],
  ['02', 'We craft your route', 'A personal itinerary balancing adventure, relaxation and culture.'],
  ['03', 'Travel with care', 'Private transport, trusted guides and support every step of the way.'],
]

// Dark-green band: photo on the left, headline and three-step process on the right.
export default function CraftedJourneys() {
  return (
    <section className="bg-forest py-20 text-cream lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <Reveal from="left" className="group overflow-hidden">
          <img
            src={IMAGES.pavilion.src}
            alt={IMAGES.pavilion.alt}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 lg:aspect-[5/4]"
          />
        </Reveal>

        <div>
          <Heading light title="Uniquely Crafted Journeys" accent="Through Sri Lanka" />
          <Reveal delay={150} as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/75">
            Our luxury travel services cater to family holidays, individual explorers, group travel and conferences — each journey unique,
            memorable and a reflection of your own preferences.
          </Reveal>

          <ol className="mt-10 space-y-6">
            {STEPS.map(([n, title, text], i) => (
              <Reveal as="li" key={n} delay={200 + i * 120} className="group flex gap-5 border-t border-cream/15 pt-6">
                <span className="font-serif text-2xl text-gold italic transition-transform duration-300 group-hover:-translate-y-1">{n}</span>
                <div>
                  <p className="font-serif text-2xl">{title}</p>
                  <p className="mt-1 text-sm text-cream/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={600} className="mt-10">
            <TextLink to="/contact" light>Start Planning</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
