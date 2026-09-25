import Reveal from '../common/Reveal.jsx'

// Centred italic statement that bridges the intro and the story.
export default function AboutStatement() {
  return (
    <section className="bg-sand px-4 pb-24 sm:px-8">
      <Reveal as="p" className="mx-auto max-w-4xl text-center font-serif text-3xl leading-snug text-forest italic sm:text-4xl">
        Experience Sri Lanka’s history, culture &amp; nature through private journeys crafted around you.
      </Reveal>
    </section>
  )
}
