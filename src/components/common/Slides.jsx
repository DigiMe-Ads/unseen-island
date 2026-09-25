import { useEffect, useState } from 'react'

export const toList = (images) => (Array.isArray(images) ? images : images ? [images] : [])

// One photo, or several that crossfade and settle from a slight zoom — the Marco Polo section's transition.
// `className` sizes the frame (e.g. an aspect ratio); `zoom` adds classes to the layer that scales on hover.
export default function Slides({ images, className = '', zoom = '', dots = 'overlay', light = false, interval = 5000, eager = false }) {
  const list = toList(images)
  const [index, setIndex] = useState(0)
  const count = list.length
  const current = index < count ? index : 0

  useEffect(() => {
    if (count < 2) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearTimeout(id)
  }, [current, count, interval])

  if (!count) return null

  return (
    <>
      <div className={`relative overflow-hidden ${className}`}>
        <div className={`absolute inset-0 ${zoom}`}>
          {list.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              loading={eager && i === 0 ? 'eager' : 'lazy'}
              fetchPriority={eager && i === 0 ? 'high' : undefined}
              aria-hidden={i !== current}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ${
                i === current ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            />
          ))}
        </div>
        {count > 1 && dots === 'overlay' && (
          <div className="pointer-events-none absolute top-4 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
            {list.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.35)] transition-all duration-500 ${i === current ? 'scale-125 bg-cream' : 'bg-cream/50'}`}
              />
            ))}
          </div>
        )}
      </div>
      {count > 1 && dots === 'below' && (
        <div className="mt-5 flex justify-center gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                light
                  ? i === current ? 'scale-125 bg-cream' : 'bg-cream/30 hover:bg-cream/60'
                  : i === current ? 'scale-125 bg-forest' : 'bg-faded hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </>
  )
}
