import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons.jsx'

// Small uppercase serif link with a sweeping underline and nudging arrow.
export default function TextLink({ to, href, children, light = false, className = '' }) {
  const cls = `text-link group inline-flex items-center gap-2 font-serif text-sm uppercase tracking-wide transition-colors ${
    light ? 'text-cream hover:text-white' : 'text-forest hover:text-ink'
  } ${className}`
  const inner = (
    <>
      {children}
      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  )
  return href ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <Link to={to} className={cls}>{inner}</Link>
  )
}
