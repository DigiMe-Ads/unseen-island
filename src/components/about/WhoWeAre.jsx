import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import Slides from '../common/Slides.jsx'

export default function WhoWeAre() {
  const c = useSection('about.who')
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-36">
      <div className="grid grid-cols-2 gap-5">
        <Reveal from="up" className="group">
          <Slides images={c.image} dots="below" className="aspect-[3/4] w-full" zoom="transition-transform duration-[1800ms] group-hover:scale-110" />
        </Reveal>
        <Reveal from="up" delay={200} className="group mt-16">
          <Slides images={c.image2} dots="below" interval={6200} className="aspect-[3/4] w-full" zoom="transition-transform duration-[1800ms] group-hover:scale-110" />
        </Reveal>
      </div>

      <div className="lg:pl-6">
        <Heading label={c.label} title={c.title} accent={c.accent} />
        <div className="mt-8 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted">
          {c.body.map((p, i) => (
            <Reveal key={i} as="p" delay={120 + i * 100}>{p}</Reveal>
          ))}
        </div>
        <Reveal delay={450} className="mt-10">
          <TextLink to="/contact">{c.link}</TextLink>
        </Reveal>
      </div>
    </section>
  )
}
