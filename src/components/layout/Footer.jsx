import { Link } from 'react-router-dom'
import { NAV_LINKS, MENU_SECONDARY } from '../../data/site.js'
import { telHref, waHref, useSection } from '../../content/ContentProvider.jsx'
import Logo from './Logo.jsx'
import SocialIcons from './SocialIcons.jsx'
import { ArrowIcon, WhatsAppIcon } from '../common/Icons.jsx'

const small = 'text-sm text-cream/75 transition-colors hover:text-cream'

export default function Footer() {
  const c = useSection('site.footer')
  const contact = useSection('site.contact')
  const { services } = useSection('site.services')
  return (
    <footer className="bg-forest px-4 pt-20 pb-10 text-cream sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo light size="lg" />
            <p className="max-w-xs text-sm leading-relaxed text-cream/70">{c.blurb}</p>
            <div className="space-y-1 text-sm text-cream/75">
              <a href={`mailto:${contact.email}`} className="block wrap-break-word hover:text-cream">{contact.email}</a>
              <a href={telHref(contact.phone)} className="block hover:text-cream">{contact.phone}</a>
              <p className="pt-2 text-cream/60">{contact.office.join(', ')}</p>
            </div>
            <a
              href={waHref(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-cream/60 px-6 py-3 font-serif text-sm uppercase tracking-wide transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-forest"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {c.cta}
            </a>
            <SocialIcons light />
          </div>

          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="font-serif text-2xl transition-all duration-300 hover:pl-2 hover:italic">{l.label}</Link>
              </li>
            ))}
          </ul>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-cream/60">What We Do</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}><Link to="/contact" className={small}>{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-cream/60">Discover</p>
            <ul className="space-y-3">
              {MENU_SECONDARY.map((l) => (
                <li key={l.label}><Link to={l.to} className={small}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-6 border-t border-cream/15 pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-cream/55">© {new Date().getFullYear()} The Unseen Island. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/70 hover:text-cream"
          >
            Back To Top
            <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-cream group-hover:text-forest">
              <ArrowIcon className="h-4 w-4 -rotate-90" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
