import Reveal from './Reveal.jsx'

// Serif heading: `title` in roman, `accent` in italic, optional small caps label above.
export default function Heading({ label, title, accent, as: Tag = 'h2', size = 'lg', light = false, center = false, className = '' }) {
  const sizes = {
    xl: 'text-5xl sm:text-6xl lg:text-7xl',
    lg: 'text-4xl sm:text-5xl lg:text-[56px]',
    md: 'text-3xl sm:text-4xl',
  }
  return (
    <Reveal className={`${center ? 'text-center' : ''} ${className}`}>
      {label && (
        <p className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] ${light ? 'text-cream/70' : 'text-muted'}`}>
          {label}
        </p>
      )}
      <Tag className={`font-serif leading-[1.05] ${sizes[size]} ${light ? 'text-cream' : 'text-forest'}`}>
        {title}
        {accent && (
          <>
            {' '}
            <em className="italic">{accent}</em>
          </>
        )}
      </Tag>
    </Reveal>
  )
}
