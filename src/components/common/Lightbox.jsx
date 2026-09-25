import { useEffect } from 'react'
import { ArrowIcon, CloseIcon } from './Icons.jsx'

// Full-screen image viewer with keyboard support (Esc, ←, →).
export default function Lightbox({ images, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onMove])

  const img = images[index]
  const btn = 'absolute grid h-12 w-12 place-items-center rounded-full border border-cream/40 text-cream transition hover:bg-cream hover:text-forest'
  const stop = (fn) => (e) => {
    e.stopPropagation()
    fn()
  }

  return (
    <div className="animate-fade-in fixed inset-0 z-[70] flex flex-col items-center justify-center bg-forest/95 p-4" onClick={onClose}>
      <img key={img.src} src={img.src} alt={img.alt} className="animate-rise max-h-[80vh] max-w-full object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
      <p className="mt-5 font-serif text-lg text-cream/85 italic">{img.alt}</p>
      <p className="mt-1 text-xs tracking-[0.2em] text-cream/50">{index + 1} / {images.length}</p>
      <button className={`${btn} top-5 right-5`} onClick={stop(onClose)} aria-label="Close"><CloseIcon className="h-5 w-5" /></button>
      <button className={`${btn} left-4`} onClick={stop(() => onMove(-1))} aria-label="Previous image"><ArrowIcon className="h-5 w-5 rotate-180" /></button>
      <button className={`${btn} right-4`} onClick={stop(() => onMove(1))} aria-label="Next image"><ArrowIcon className="h-5 w-5" /></button>
    </div>
  )
}
