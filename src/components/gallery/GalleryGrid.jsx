import Reveal from '../common/Reveal.jsx'

function Tile({ image, index, onOpen, className = '' }) {
  return (
    <button onClick={() => onOpen(index)} className={`group relative block overflow-hidden bg-sand ${className}`} aria-label={`Open photo: ${image.alt}`}>
      <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="translate-y-3 text-left font-serif text-lg text-cream italic transition-transform duration-500 group-hover:translate-y-0">
          {image.alt}
        </span>
      </span>
    </button>
  )
}

// Feature image with two stacked companions, followed by a masonry-style grid of the rest.
export default function GalleryGrid({ images, onOpen }) {
  const [feature, a, b, ...rest] = images
  return (
    <>
      <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
        <Reveal from="zoom">
          <Tile image={feature} index={0} onOpen={onOpen} className="aspect-[4/3] w-full md:aspect-auto md:h-full" />
        </Reveal>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
          <Reveal delay={100}><Tile image={a} index={1} onOpen={onOpen} className="aspect-[4/3] w-full" /></Reveal>
          <Reveal delay={200}><Tile image={b} index={2} onOpen={onOpen} className="aspect-[4/3] w-full" /></Reveal>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="mt-5 columns-2 gap-5 md:columns-3">
          {rest.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 100} className="mb-5 break-inside-avoid">
              <Tile image={img} index={i + 3} onOpen={onOpen} className="w-full" />
            </Reveal>
          ))}
        </div>
      )}
    </>
  )
}
