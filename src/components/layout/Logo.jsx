import { Link } from 'react-router-dom'

// Brand wordmark; `light` renders it in cream for dark backgrounds.
export default function Logo({ light = false, size = 'md', onClick }) {
  const word = size === 'lg' ? 'text-5xl' : 'text-[22px] xs:text-[26px] sm:text-[34px]'
  const tag = size === 'lg' ? 'text-xs' : 'text-[7px] sm:text-[8px]'
  return (
    <Link to="/" onClick={onClick} className="group inline-flex min-w-0 flex-col items-center leading-none" aria-label="The Unseen Island home">
      <span className={`font-logo tracking-normal transition-colors duration-500 sm:tracking-wide ${word} ${light ? 'text-cream' : 'text-teal group-hover:text-forest'}`}>
        THE UNSEEN ISLAND
      </span>
      <span className={`mt-0.5 font-sans font-medium tracking-[0.3em] transition-colors duration-500 ${tag} ${light ? 'text-cream/80' : 'text-gold'}`}>
        ESCAPE · EXPLORE · EXPERIENCE
      </span>
    </Link>
  )
}
