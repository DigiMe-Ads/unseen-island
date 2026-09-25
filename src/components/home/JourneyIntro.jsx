import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import Slides from '../common/Slides.jsx'

// "Discover Sri Lanka" intro: layered photo pair on the left, story and services on the right.
export default function JourneyIntro() {
  const c = useSection('home.intro')
  const { services } = useSection('site.services')
  return (
    <section id="journeys" className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-16 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-36">
      <Reveal from="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="group">
          <Slides images={c.image} className="aspect-[4/5] w-[78%]" zoom="transition-transform duration-[2000ms] group-hover:scale-105" />
        </div>
        <div className="group absolute right-0 -bottom-10 w-[48%] overflow-hidden border-8 border-cream shadow-xl">
          <Slides images={c.inset} interval={6200} className="aspect-square w-full" zoom="transition-transform duration-[2000ms] group-hover:scale-110" />
        </div>
      </Reveal>

      <div className="lg:pl-8">
        <Heading label={c.label} title={c.title} accent={c.accent} />
        <Reveal delay={150} className="mt-8 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted">
          {c.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={250} as="ul" className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s} className="cursor-default border border-line px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream">
              {s}
            </li>
          ))}
        </Reveal>
        <Reveal delay={350} className="mt-10">
          <TextLink to="/about">{c.link}</TextLink>
        </Reveal>
      </div>
    </section>
  )
}
