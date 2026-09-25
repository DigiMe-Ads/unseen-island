import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS, MENU_SECONDARY } from '../../data/site.js'
import { telHref, useSection } from '../../content/ContentProvider.jsx'
import Logo from './Logo.jsx'
import SocialIcons from './SocialIcons.jsx'
import { ChevronIcon, CloseIcon } from '../common/Icons.jsx'

// Full-screen menu: large serif links on the left, a pair of photos on the right that follow the hovered link.
export default function MenuOverlay({ open, onClose }) {
  const [active, setActive] = useState(0)
  const { photos } = useSection('site.menu')
  const contact = useSection('site.contact')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const pair = [photos[active]?.image, photos[active]?.companion].filter(Boolean)

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-cream transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        open ? 'visible opacity-100' : 'invisible -translate-y-4 opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between gap-6 px-4 py-5 sm:px-8">
        <Logo onClick={onClose} />
        <div className="flex items-center gap-4">
          <Link to="/contact" onClick={onClose} className="hidden whitespace-nowrap border border-forest bg-forest px-6 py-2.5 font-serif text-sm uppercase tracking-wide text-cream transition-colors hover:bg-transparent hover:text-forest sm:inline-block">
            Plan Your Journey
          </Link>
          <button onClick={onClose} className="text-forest transition-transform duration-300 hover:rotate-90" aria-label="Close menu">
            <CloseIcon className="h-7 w-7" />
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-10 overflow-y-auto px-6 pt-6 pb-10 sm:px-16 lg:grid-cols-[1fr_1.4fr] lg:pt-10">
        <nav>
          <ul className="space-y-3 sm:space-y-4">
            {NAV_LINKS.map((l, i) => (
              <li
                key={l.label}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}
                className={`transition-all duration-700 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              >
                <Link
                  to={l.to}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex max-w-sm items-center justify-between font-serif text-4xl text-forest transition-all duration-300 hover:pl-3 hover:italic sm:text-5xl"
                >
                  {l.label}
                  <ChevronIcon className={`h-5 w-5 transition-all duration-300 ${active === i ? 'opacity-100' : 'opacity-0'} group-hover:translate-x-1`} />
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-10 space-y-3 border-t border-line pt-8">
            {MENU_SECONDARY.map((l, i) => (
              <li key={l.label} style={{ transitionDelay: open ? `${500 + i * 50}ms` : '0ms' }} className={`transition-all duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
                <Link to={l.to} onClick={onClose} className="font-serif text-lg text-forest/80 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-1 text-sm text-muted">
            <a href={`mailto:${contact.email}`} className="block wrap-break-word transition-colors hover:text-forest">{contact.email}</a>
            <a href={telHref(contact.phone)} className="block transition-colors hover:text-forest">{contact.phone}</a>
            <div className="pt-4"><SocialIcons /></div>
          </div>
        </nav>

        <div className="hidden grid-cols-2 gap-5 self-start lg:grid">
          {pair.map((img, i) => (
            <div key={i} className={`overflow-hidden transition-all duration-1000 ${open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: open ? `${300 + i * 150}ms` : '0ms' }}>
              <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="animate-fade-in aspect-[4/5] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
