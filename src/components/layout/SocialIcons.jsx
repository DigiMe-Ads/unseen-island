import { useSection } from '../../content/ContentProvider.jsx'
import { InstagramIcon, FacebookIcon } from '../common/Icons.jsx'

export default function SocialIcons({ light = false }) {
  const social = useSection('site.social')
  const links = [
    { href: social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: social.facebook, label: 'Facebook', Icon: FacebookIcon },
  ].filter((l) => l.href)
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
