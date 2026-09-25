import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import Slides from '../common/Slides.jsx'

// Dark-green band: photo on the left, headline and three-step process on the right.
export default function CraftedJourneys() {
  const c = useSection('home.crafted')
  return (
    <section className="bg-forest py-20 text-cream lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <Reveal from="left" className="group">
          <Slides images={c.image} dots="below" light className="aspect-[4/3] w-full lg:aspect-[5/4]" zoom="transition-transform duration-[2000ms] group-hover:scale-105" />
        </Reveal>

        <div>
          <Heading light title={c.title} accent={c.accent} />
          <Reveal delay={150} as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/75">
            {c.text}
          </Reveal>

          <ol className="mt-10 space-y-6">
            {c.steps.map((step, i) => (
              <Reveal as="li" key={i} delay={200 + i * 120} className="group flex gap-5 border-t border-cream/15 pt-6">
                <span className="font-serif text-2xl text-gold italic transition-transform duration-300 group-hover:-translate-y-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-serif text-2xl">{step.title}</p>
                  <p className="mt-1 text-sm text-cream/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={600} className="mt-10">
            <TextLink to="/contact" light>{c.link}</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
