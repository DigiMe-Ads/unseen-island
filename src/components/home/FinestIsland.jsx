import { useEffect, useState } from 'react'
import { IMAGES } from '../../data/images.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'

const SLIDES = [IMAGES.church, IMAGES.ruins, IMAGES.railway, IMAGES.jungleRoad]

// Marco Polo quote beside an auto-advancing heritage slideshow.
export default function FinestIsland() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), 5000)
    return () => clearTimeout(id)
  }, [index])

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-36">
      <div className="lg:pl-10">
        <Heading title="“The Finest Island" accent="Of Its Size In All The World”" />
        <Reveal delay={100} as="p" className="mt-4 text-xs tracking-[0.2em] text-muted uppercase">— Marco Polo</Reveal>
        <Reveal delay={200} as="p" className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">
          Sri Lanka is an island of contrasts, where every step reveals a hidden gem. Its unparalleled diversity promises an adventure,
          from pristine beaches and lush jungles to sacred temples and timeless ruins — nature, history and culture woven into an
          unforgettable tapestry.
        </Reveal>
        <Reveal delay={300} className="mt-10">
          <TextLink to="/about#around-the-island">Discover Sri Lanka</TextLink>
        </Reveal>
      </div>

      <Reveal from="right">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand sm:mx-auto sm:max-w-md lg:max-w-none">
          {SLIDES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ${
                i === index ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {SLIDES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-500 ${i === index ? 'scale-125 bg-forest' : 'bg-faded hover:bg-muted'}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
