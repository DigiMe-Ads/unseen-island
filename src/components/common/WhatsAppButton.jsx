import { waHref, useSection } from '../../content/ContentProvider.jsx'
import { WhatsAppIcon } from './Icons.jsx'

// WhatsApp-green button that opens a chat with the greeting already typed.
export default function WhatsAppButton({ children = 'Chat on WhatsApp', className = '' }) {
  const { whatsapp, whatsappMessage } = useSection('site.contact')
  if (!whatsapp) return null
  return (
    <a
      href={waHref(whatsapp, whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-[#25D366] px-7 py-4 font-serif text-sm uppercase tracking-wide text-forest transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] hover:shadow-[0_12px_24px_-12px_rgba(37,211,102,0.8)] ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  )
}
