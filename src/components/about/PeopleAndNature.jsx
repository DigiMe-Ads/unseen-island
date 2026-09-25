import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import Slides from '../common/Slides.jsx'

// Two portrait photos with a values statement on the right.
export default function PeopleAndNature() {
  const c = useSection('about.people')
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:py-32">
      <div className="grid grid-cols-2 gap-5">
        {[c.image, c.image2].map((img, i) => (
          <Reveal key={i} delay={i * 150} className="group">
            <Slides images={img} dots="below" interval={i ? 6200 : 5000} className="aspect-[3/4] w-full" zoom="transition-transform duration-[1800ms] group-hover:scale-110" />
          </Reveal>
        ))}
      </div>
      <div>
        <Heading title={c.title} accent={c.accent} />
        <Reveal delay={150} as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          {c.text}
        </Reveal>
        <Reveal delay={250} className="mt-8">
          <TextLink to="/gallery">{c.link}</TextLink>
        </Reveal>
      </div>
    </section>
  )
}
