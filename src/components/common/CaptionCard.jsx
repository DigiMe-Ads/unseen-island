import { Link } from 'react-router-dom'
import { CaretUpIcon } from './Icons.jsx'

// Photo with a dark-green caption band; on hover the band rises to reveal a short description.
export default function CaptionCard({ image, label, title, text, to = '/contact', aspect = 'aspect-[4/3]', className = '' }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden bg-forest ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={`${aspect} w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110`}
      />
      <div className="absolute inset-x-0 bottom-0 bg-forest/90 px-6 pt-5 pb-6 text-center text-cream backdrop-blur-[2px] transition-all duration-700">
        <CaretUpIcon className="absolute top-3 right-4 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
        {label && <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-cream/75">{label}</p>}
        <h3 className="mt-1.5 font-serif text-2xl sm:text-[28px]">{title}</h3>
        {text && (
          <div className="grid grid-rows-[0fr] transition-all duration-700 group-hover:grid-rows-[1fr]">
            <p className="min-h-0 overflow-hidden text-sm leading-relaxed text-cream/80">
              <span className="block pt-3">{text}</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}
