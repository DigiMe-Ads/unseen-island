import { useEffect, useState } from 'react'
import { IMAGES } from '../../data/images.js'
import { Flourish } from '../common/Icons.jsx'

const SLIDES = [IMAGES.villaCoast, IMAGES.sunsetPalms, IMAGES.surfers, IMAGES.rainforestPool]

// Full-screen crossfading hero with a centred two-line serif title.
export default function HomeHero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), 6500)
    return () => clearTimeout(id)
  }, [index])

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-forest">
      {SLIDES.map((img, i) => (
        <div key={img.src} className={`absolute inset-0 transition-opacity duration-[1800ms] ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={img.src}
            alt={img.alt}
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`h-full w-full object-cover ${i === index ? 'animate-kenburns' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/45" />

      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-cream">
        <h1 className="font-serif text-5xl leading-[1.05] sm:text-7xl lg:text-[88px]">
          <span className="animate-rise block" style={{ animationDelay: '200ms' }}>One Unseen Island</span>
          <em className="animate-rise block" style={{ animationDelay: '450ms' }}>Countless Extraordinary Journeys</em>
        </h1>
        <Flourish className="animate-draw mt-8 w-40 text-cream/90" style={{ animationDelay: '900ms' }} />
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {SLIDES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className="group h-6 py-2.5"
          >
            <span className={`block h-px transition-all duration-700 ${i === index ? 'w-12 bg-cream' : 'w-6 bg-cream/45 group-hover:bg-cream/80'}`} />
          </button>
        ))}
      </div>

      <a
        href="#journeys"
        className="absolute right-8 bottom-8 hidden text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80 transition-colors hover:text-cream sm:block [writing-mode:vertical-rl]"
      >
        Scroll To Discover
      </a>
    </section>
  )
}
