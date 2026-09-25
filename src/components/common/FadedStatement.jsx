import { useEffect, useRef, useState } from 'react'
import { useSection } from '../../content/ContentProvider.jsx'

// Oversized pale serif statement that darkens slightly as it scrolls through the viewport.
export default function FadedStatement({ section, className = '' }) {
  const lines = useSection(section).lines.map((l) => [l.roman, l.italic])
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = 1 - Math.abs(r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      setProgress(Math.max(0, Math.min(1, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className={`px-4 py-20 text-center sm:py-28 ${className}`}>
      <p
        className="font-serif text-[40px] leading-[1.05] sm:text-7xl lg:text-8xl"
        style={{ color: `color-mix(in srgb, var(--color-forest) ${Math.round(progress * 28)}%, var(--color-faded))` }}
      >
        {lines.map(([roman, italic], i) => (
          <span key={i} className="block" style={{ transform: `translateX(${(i % 2 ? 1 : -1) * (1 - progress) * 24}px)` }}>
            {roman} {italic && <em>{italic}</em>}
          </span>
        ))}
      </p>
    </div>
  )
}
