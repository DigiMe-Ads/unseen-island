import { useEffect, useState } from 'react'
import { useSection } from '../../content/ContentProvider.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'
import { QuoteIcon, StarIcon } from '../common/Icons.jsx'

// Press-style quote rotator for guest reviews.
export default function ReviewsQuote() {
  const c = useSection('home.reviews')
  const REVIEWS = c.items
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (REVIEWS.length < 2) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % REVIEWS.length), 7000)
    return () => clearTimeout(id)
  }, [index, REVIEWS.length])

  const review = REVIEWS[index]
  if (!review) return null
  return (
    <section id="reviews" className="scroll-mt-20 bg-sand px-4 py-24 text-center sm:px-8 lg:py-32">
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted">{c.label}</p>
        <div className="mt-3 flex items-center justify-center gap-1 text-gold">
          {Array.from({ length: 5 }, (_, i) => <StarIcon key={i} className="h-4 w-4" />)}
          <span className="ml-2 text-xs tracking-wide text-muted">{c.rating}</span>
        </div>
      </Reveal>

      <Reveal delay={150} className="relative mx-auto mt-10 flex max-w-5xl items-start gap-6 sm:gap-10">
        <QuoteIcon className="mt-2 hidden h-8 w-10 shrink-0 text-faded sm:block" />
        <div className="min-h-[220px] flex-1 sm:min-h-[180px]">
          <blockquote key={index} className="animate-rise font-serif text-3xl leading-snug text-forest italic sm:text-4xl">
            {review.text}
          </blockquote>
          <p key={`n${index}`} className="animate-rise mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-muted" style={{ animationDelay: '200ms' }}>
            {review.name}
          </p>
        </div>
        <QuoteIcon className="mt-2 hidden h-8 w-10 shrink-0 rotate-180 text-faded sm:block" />
      </Reveal>

      <div className="mt-8 flex justify-center gap-3">
        {REVIEWS.map((r, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Show review by ${r.name}`} className="group h-6 py-2.5">
            <span className={`block h-px transition-all duration-700 ${i === index ? 'w-12 bg-forest' : 'w-6 bg-faded group-hover:bg-muted'}`} />
          </button>
        ))}
      </div>

      {c.link && c.linkUrl && (
        <Reveal delay={250} className="mt-8">
          <TextLink href={c.linkUrl}>{c.link}</TextLink>
        </Reveal>
      )}
    </section>
  )
}
