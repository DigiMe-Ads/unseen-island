import { IMAGES } from '../../data/images.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'

// Two portrait photos with a values statement on the right.
export default function PeopleAndNature() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:py-32">
      <div className="grid grid-cols-2 gap-5">
        {[IMAGES.buffaloMud, IMAGES.jungleRoad].map((img, i) => (
          <Reveal key={img.src} delay={i * 150} className="group overflow-hidden">
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110" />
          </Reveal>
        ))}
      </div>
      <div>
        <Heading title="Kindness To Both" accent="People And Nature" />
        <Reveal delay={150} as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          We travel lightly and locally — working with family-run stays, local guides and community experiences so that every journey
          gives something back to the island and the people who make it so special.
        </Reveal>
        <Reveal delay={250} className="mt-8">
          <TextLink to="/gallery">See The Island Through Our Lens</TextLink>
        </Reveal>
      </div>
    </section>
  )
}
