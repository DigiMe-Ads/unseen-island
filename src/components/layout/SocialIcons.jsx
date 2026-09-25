import { SOCIAL } from '../../data/site.js'
import { InstagramIcon, FacebookIcon } from '../common/Icons.jsx'

export default function SocialIcons({ light = false }) {
  const links = [
    { href: SOCIAL.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: SOCIAL.facebook, label: 'Facebook', Icon: FacebookIcon },
  ]
  return (
    <div className="flex items-center gap-4">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={`transition-all duration-300 hover:-translate-y-0.5 ${light ? 'text-cream/70 hover:text-cream' : 'text-forest/70 hover:text-forest'}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  )
}
