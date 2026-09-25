import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import MenuOverlay from './MenuOverlay.jsx'
import { MenuIcon } from '../common/Icons.jsx'

export default function Header() {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  // Only the home page opens on a full-bleed photo, so the header is transparent there until scrolled.
  const overHero = pathname === '/' && !scrolled
  const tone = overHero ? 'text-cream' : 'text-forest'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero ? 'bg-transparent py-5' : 'bg-cream/95 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur'
        }`}
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
          <button
            onClick={() => setOpen(true)}
            className={`group flex items-center gap-3 justify-self-start ${tone}`}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <MenuIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-x-125" />
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.25em] sm:inline">Menu</span>
          </button>

          <Logo light={overHero} />

          <Link
            to="/contact"
            className={`justify-self-end border px-3 py-2.5 font-serif text-xs uppercase tracking-wide transition-all duration-300 sm:px-6 sm:text-sm ${
              overHero
                ? 'border-cream/70 text-cream hover:bg-cream hover:text-forest'
                : 'border-forest bg-forest text-cream hover:bg-transparent hover:text-forest'
            }`}
          >
            <span className="hidden sm:inline">Plan Your Journey</span>
            <span className="sm:hidden">Enquire</span>
          </Link>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
