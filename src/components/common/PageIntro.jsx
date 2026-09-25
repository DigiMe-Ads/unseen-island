import { useSection } from '../../content/ContentProvider.jsx'
import Heading from './Heading.jsx'
import Reveal from './Reveal.jsx'
import Slides, { toList } from './Slides.jsx'

// Cream page opener: large serif title, short lede and a wide feature image (or slideshow) with a slow zoom.
export default function PageIntro({ section }) {
  const { title, accent, lede, image } = useSection(section)
  return (
    <section className="bg-sand px-4 pt-36 pb-16 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-7xl">
        <Heading as="h1" size="xl" title={title} accent={accent} className="sm:px-8" />
        {lede && (
          <Reveal delay={150} as="p" className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:px-8">
            {lede}
          </Reveal>
        )}
        {toList(image).length > 0 && (
          <Reveal from="zoom" delay={250} className="group mt-12">
            <Slides
              images={image}
              eager
              className="aspect-[16/9] w-full sm:aspect-[21/9]"
              zoom="transition-transform duration-[2500ms] ease-out group-hover:scale-105"
            />
          </Reveal>
        )}
      </div>
    </section>
  )
}
