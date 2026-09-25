import Heading from './Heading.jsx'
import Reveal from './Reveal.jsx'
import { PlayIcon } from './Icons.jsx'

// Cream page opener: large serif title, short lede and a wide feature image with a slow zoom.
export default function PageIntro({ title, accent, lede, image, caption }) {
  return (
    <section className="bg-sand px-4 pt-36 pb-16 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-7xl">
        <Heading as="h1" size="xl" title={title} accent={accent} className="sm:px-8" />
        {lede && (
          <Reveal delay={150} as="p" className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:px-8">
            {lede}
          </Reveal>
        )}
        {image && (
          <Reveal from="zoom" delay={250} className="group relative mt-12 overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              fetchPriority="high"
              className="aspect-[16/9] w-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105 sm:aspect-[21/9]"
            />
            {caption && (
              <p className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 font-serif text-sm uppercase tracking-wide text-cream">
                <PlayIcon className="h-5 w-5" /> {caption}
              </p>
            )}
          </Reveal>
        )}
      </div>
    </section>
  )
}
