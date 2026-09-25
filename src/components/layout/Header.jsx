import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/site.js'
import Logo from './Logo.jsx'
import MenuOverlay from './MenuOverlay.jsx'
import { MenuIcon } from '../common/Icons.jsx'

// Transparent over the top of each page; frosted glass once the page scrolls.
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

  // Only the home page opens on a full-bleed photo, so text is light there until the glass bar appears.
  const light = pathname === '/' && !scrolled
  const tone = light ? 'text-cream' : 'text-forest'
  const isActive = (to) => !to.includes('#') && to === pathname

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-white/40 bg-cream/60 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-8">
          <Logo light={light} />

          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    aria-current={isActive(l.to) ? 'page' : undefined}
                    className={`relative text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-current after:transition-transform after:duration-500 ${tone} ${
                      isActive(l.to) ? 'after:scale-x-100' : 'after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className={`hidden whitespace-nowrap border px-6 py-2.5 font-serif text-sm uppercase tracking-wide transition-all duration-300 sm:inline-block ${
                light
                  ? 'border-cream/70 text-cream hover:bg-cream hover:text-forest'
                  : 'border-forest bg-forest text-cream hover:bg-transparent hover:text-forest'
              }`}
            >
              Plan Your Journey
            </Link>
            <button
              onClick={() => setOpen(true)}
              className={`group lg:hidden ${tone}`}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <MenuIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-x-125" />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
