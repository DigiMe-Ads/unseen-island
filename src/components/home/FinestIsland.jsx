import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import Slides from '../common/Slides.jsx'

// Marco Polo quote beside an auto-advancing heritage slideshow.
export default function FinestIsland() {
  const c = useSection('home.finest')
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-36">
      <div className="lg:pl-10">
        <Heading title={c.title} accent={c.accent} />
        <Reveal delay={100} as="p" className="mt-4 text-xs tracking-[0.2em] text-muted uppercase">{c.attribution}</Reveal>
        <Reveal delay={200} as="p" className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">
          {c.text}
        </Reveal>
        <Reveal delay={300} className="mt-10">
          <TextLink to="/about#around-the-island">{c.link}</TextLink>
        </Reveal>
      </div>

      <Reveal from="right">
        <Slides images={c.slides} dots="below" className="aspect-[4/5] bg-sand sm:mx-auto sm:max-w-md lg:max-w-none" />
      </Reveal>
    </section>
  )
}
