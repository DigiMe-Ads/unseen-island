import { useState } from 'react'
import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import ArrowButtons from '../common/ArrowButtons.jsx'

// Region explorer: crossfading photo, large faded region name, and a vertical index to jump between regions.
export default function AroundIsland() {
  const c = useSection('about.regions')
  const REGIONS = c.items
  const [index, setIndex] = useState(0)
  const move = (dir) => setIndex((i) => (i + dir + REGIONS.length) % REGIONS.length)
  const region = REGIONS[index]
  if (!region) return null

  return (
    <section id="around-the-island" className="scroll-mt-20 border-y border-line bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Heading center label={c.label} title={c.title} accent={c.accent} />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal from="left" className="relative aspect-[4/3] overflow-hidden bg-sand">
            {REGIONS.map((r, i) => (
              <img
                key={i}
                src={r.image.src}
                alt={r.image.alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ${
                  i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            ))}
          </Reveal>

          <div className="flex gap-8 lg:gap-12">
            <ul className="flex flex-col gap-4 border-l border-line pl-4">
              {REGIONS.map((r, i) => (
                <li key={i}>
                  <button
                    onClick={() => setIndex(i)}
                    className={`relative text-left font-serif text-sm transition-all duration-300 [writing-mode:vertical-rl] rotate-180 ${
                      i === index ? 'text-forest' : 'text-faded hover:text-muted'
                    }`}
                  >
                    {r.name}
                    <span className={`absolute top-0 -right-[17px] w-px bg-forest transition-all duration-500 ${i === index ? 'h-full' : 'h-0'}`} />
                  </button>
                </li>
              ))}
            </ul>

            <div key={index} className="flex-1">
              <p className="animate-rise font-serif text-6xl text-faded sm:text-7xl">{region.name}</p>
              <h3 className="animate-rise mt-2 font-serif text-2xl text-forest italic" style={{ animationDelay: '120ms' }}>{region.title}</h3>
              <p className="animate-rise mt-5 max-w-md text-[15px] leading-relaxed text-muted" style={{ animationDelay: '220ms' }}>{region.text}</p>
              <ArrowButtons className="mt-8" onPrev={() => move(-1)} onNext={() => move(1)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
