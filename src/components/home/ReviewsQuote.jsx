import { useEffect, useRef } from 'react'
import { useSection } from '../../content/ContentProvider.jsx'
import Reveal from '../common/Reveal.jsx'

// Live Google reviews, rendered by the client's Trustindex widget.
export default function ReviewsQuote() {
  const c = useSection('home.reviews')
  const box = useRef(null)

  useEffect(() => {
    const el = box.current
    if (!el || !c.widget) return
    const src = `https://cdn.trustindex.io/loader.js?${c.widget}`
    if (el.dataset.widget === src) return
    // Trustindex's loader renders the widget next to its own <script> tag, so the tag goes inside our box.
    el.innerHTML = ''
    el.dataset.widget = src
    const script = document.createElement('script')
    script.src = src
    script.async = true
    el.appendChild(script)
  }, [c.widget])

  if (!c.widget) return null
  return (
    <section id="reviews" className="scroll-mt-20 bg-forest px-4 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-cream/70">{c.label}</p>
      </Reveal>
      <div ref={box} className="mx-auto mt-10 min-h-[260px] max-w-6xl" />
    </section>
  )
}
