import { IMAGES } from '../../data/images.js'
import { SERVICES } from '../../data/site.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'

// "Discover Sri Lanka" intro: layered photo pair on the left, story and services on the right.
export default function JourneyIntro() {
  return (
    <section id="journeys" className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-16 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-36">
      <Reveal from="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="group overflow-hidden">
          <img src={IMAGES.rockView.src} alt={IMAGES.rockView.alt} loading="lazy" className="aspect-[4/5] w-[78%] object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
        </div>
        <div className="group absolute right-0 -bottom-10 w-[48%] overflow-hidden border-8 border-cream shadow-xl">
          <img src={IMAGES.kayak.src} alt={IMAGES.kayak.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
        </div>
      </Reveal>

      <div className="lg:pl-8">
        <Heading label="Discover Sri Lanka" title="Curating Meaningful Journeys" accent="With The Unseen Island" />
        <Reveal delay={150} className="mt-8 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            Sri Lanka offers a wealth of lesser-known attractions for the curious traveller. Discover unspoiled beaches, dry zone forests
            teeming with wildlife, misty mountain forests hiding waterfalls, and charming tea planters’ bungalows nestled amidst lush greenery.
          </p>
          <p>
            Beyond its landscapes lies a cuisine shaped by many cultures and a history of ancient civilisations whose relics are rarely found
            on the tourist trail — an experience far beyond the ordinary.
          </p>
        </Reveal>
        <Reveal delay={250} as="ul" className="mt-8 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <li key={s} className="cursor-default border border-line px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream">
              {s}
            </li>
          ))}
        </Reveal>
        <Reveal delay={350} className="mt-10">
          <TextLink to="/about">Learn More About Us</TextLink>
        </Reveal>
      </div>
    </section>
  )
}
