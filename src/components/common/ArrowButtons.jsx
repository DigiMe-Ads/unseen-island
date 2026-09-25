import { ArrowIcon } from './Icons.jsx'

// Pair of round previous/next buttons used by the carousels.
export default function ArrowButtons({ onPrev, onNext, light = false, className = '' }) {
  const base = `grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
    light
      ? 'border-cream/50 text-cream hover:bg-cream hover:text-forest'
      : 'border-forest/40 text-forest hover:bg-forest hover:text-cream'
  }`
  return (
    <div className={`flex gap-3 ${className}`}>
      <button onClick={onPrev} aria-label="Previous" className={base}>
        <ArrowIcon className="h-4 w-4 rotate-180" />
      </button>
      <button onClick={onNext} aria-label="Next" className={base}>
        <ArrowIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
