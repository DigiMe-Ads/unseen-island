import { useCallback, useState } from 'react'
import { useSection } from '../../content/ContentProvider.jsx'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import Lightbox from '../common/Lightbox.jsx'
import { ArrowIcon } from '../common/Icons.jsx'
import GalleryGrid from './GalleryGrid.jsx'

// "Find Your Next Adventure": tabbed collections, each opening into a full lightbox.
export default function GalleryCollections() {
  const c = useSection('gallery.collections')
  const GALLERY = c.items.filter((g) => g.images?.length)
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(null)
  const collection = GALLERY[tab] ?? GALLERY[0]
  const count = collection?.images.length ?? 0
  const move = useCallback((dir) => setOpen((i) => (i + dir + count) % count), [count])
  const close = useCallback(() => setOpen(null), [])

  if (!collection) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-32">
      <Heading center title={c.title} accent={c.accent} />

      <Reveal delay={150} className="no-scrollbar mt-10 flex justify-start gap-8 overflow-x-auto border-b border-line sm:justify-center">
        {GALLERY.map((g, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`relative shrink-0 pb-4 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
              i === tab ? 'text-forest' : 'text-muted hover:text-forest'
            }`}
          >
            {g.title}
            <span className={`absolute inset-x-0 -bottom-px h-px bg-forest transition-transform duration-500 ${i === tab ? 'scale-x-100' : 'scale-x-0'}`} />
          </button>
        ))}
      </Reveal>

      <div key={tab} className="animate-fade-in mt-14">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h3 className="font-serif text-3xl text-forest">{collection.title}</h3>
            <p className="mt-1 text-sm text-muted">{collection.text}</p>
          </div>
          <button onClick={() => setOpen(0)} className="text-link group inline-flex items-center gap-2 self-start font-serif text-sm uppercase tracking-wide text-forest">
            View All {count} Photos
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <GalleryGrid images={collection.images} onOpen={setOpen} />
      </div>

      {open !== null && <Lightbox images={collection.images} index={open} onClose={close} onMove={move} />}
    </section>
  )
}
