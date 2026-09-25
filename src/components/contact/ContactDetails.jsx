import { telHref, waHref, useSection } from '../../content/ContentProvider.jsx'
import Reveal from '../common/Reveal.jsx'
import SocialIcons from '../layout/SocialIcons.jsx'
import WhatsAppButton from '../common/WhatsAppButton.jsx'
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../common/Icons.jsx'

// Contact column: each channel with an icon that fills on hover.
export default function ContactDetails() {
  const contact = useSection('site.contact')
  const ITEMS = [
    { label: 'Email', Icon: MailIcon, lines: [contact.email], href: `mailto:${contact.email}` },
    { label: 'Phone', Icon: PhoneIcon, lines: [contact.phone], href: telHref(contact.phone) },
    { label: 'WhatsApp', Icon: WhatsAppIcon, lines: [contact.whatsapp], href: waHref(contact.whatsapp, contact.whatsappMessage), external: true },
    { label: 'Office', Icon: PinIcon, lines: contact.office },
  ].filter((item) => item.lines.length && item.lines[0])
  return (
    <div className="space-y-10">
      <Reveal>
        <WhatsAppButton className="w-full sm:w-auto" />
      </Reveal>
      {ITEMS.map(({ label, Icon, lines, href, external }, i) => (
        <Reveal key={label} delay={i * 120} className="group flex gap-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-forest transition-all duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">{label}</p>
            {lines.map((line) =>
              href ? (
                <a
                  key={line}
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="text-link mt-1 inline-block wrap-break-word font-serif text-2xl text-forest"
                >
                  {line}
                </a>
              ) : (
                <p key={line} className="font-serif text-2xl leading-snug text-forest wrap-break-word">{line}</p>
              ),
            )}
          </div>
        </Reveal>
      ))}
      <Reveal delay={500} className="border-t border-line pt-8">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">Follow Our Journeys</p>
        <SocialIcons />
      </Reveal>
    </div>
  )
}
