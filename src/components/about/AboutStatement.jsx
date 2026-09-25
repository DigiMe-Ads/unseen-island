import { useSection } from '../../content/ContentProvider.jsx'
import Reveal from '../common/Reveal.jsx'

// Centred italic statement that bridges the intro and the story.
export default function AboutStatement() {
  const { text } = useSection('about.statement')
  return (
    <section className="bg-sand px-4 pb-24 sm:px-8">
      <Reveal as="p" className="mx-auto max-w-4xl text-center font-serif text-3xl leading-snug text-forest italic sm:text-4xl">
        {text}
      </Reveal>
    </section>
  )
}
