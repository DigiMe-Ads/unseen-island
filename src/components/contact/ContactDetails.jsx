import { CONTACT } from '../../data/site.js'
import Reveal from '../common/Reveal.jsx'
import SocialIcons from '../layout/SocialIcons.jsx'
import { MailIcon, PhoneIcon, PinIcon } from '../common/Icons.jsx'

const ITEMS = [
  { label: 'Email', Icon: MailIcon, lines: [CONTACT.email], href: `mailto:${CONTACT.email}` },
  { label: 'Phone & WhatsApp', Icon: PhoneIcon, lines: [CONTACT.phone], href: CONTACT.phoneHref },
  { label: 'Office', Icon: PinIcon, lines: CONTACT.office },
]

// Contact column: each channel with an icon that fills on hover.
export default function ContactDetails() {
  return (
    <div className="space-y-10">
      {ITEMS.map(({ label, Icon, lines, href }, i) => (
        <Reveal key={label} delay={i * 120} className="group flex gap-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-forest transition-all duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">{label}</p>
            {lines.map((line) =>
              href ? (
                <a key={line} href={href} className="text-link mt-1 inline-block font-serif text-2xl text-forest">{line}</a>
              ) : (
                <p key={line} className="font-serif text-2xl leading-snug text-forest">{line}</p>
              ),
            )}
          </div>
        </Reveal>
      ))}
      <Reveal delay={400} className="border-t border-line pt-8">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">Follow Our Journeys</p>
        <SocialIcons />
      </Reveal>
    </div>
  )
}
