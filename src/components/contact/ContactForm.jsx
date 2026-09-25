import { useState } from 'react'
import { db } from '../../lib/db.js'
import { useSection, waHref } from '../../content/ContentProvider.jsx'
import Reveal from '../common/Reveal.jsx'
import { WhatsAppIcon } from '../common/Icons.jsx'

const EMPTY = { name: '', email: '', interest: '', dates: '', message: '', website: '' }
const field =
  'peer w-full border-b border-line bg-transparent pt-6 pb-2 text-[15px] text-ink outline-none transition-colors placeholder:text-transparent focus:border-forest'
const label =
  'pointer-events-none absolute top-6 left-0 text-sm text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase'

function Field({ name, text, as: Tag = 'input', ...props }) {
  return (
    <label className="relative block">
      <Tag name={name} placeholder={text} className={field} {...props} />
      <span className={label}>{text}</span>
    </label>
  )
}

// The enquiry laid out as a WhatsApp message (*text* shows as bold in WhatsApp).
const whatsappText = (greeting, e) =>
  [
    greeting,
    '',
    `*Name:* ${e.name}`,
    `*Email:* ${e.email}`,
    e.interest && `*Interested in:* ${e.interest}`,
    e.dates && `*Travel dates:* ${e.dates}`,
    '',
    e.message,
  ]
    .filter((line) => typeof line === 'string')
    .join('\n')

// Enquiry form with floating labels. Every enquiry is saved for the admin panel; the WhatsApp button also opens a pre-filled chat.
export default function ContactForm() {
  const c = useSection('contact.form')
  const contact = useSection('site.contact')
  const { services } = useSection('site.services')
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [waUrl, setWaUrl] = useState('')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const viaWhatsApp = e.nativeEvent.submitter?.name === 'whatsapp' && Boolean(contact.whatsapp)
    // Hidden "website" field: only bots fill it in, so pretend it worked and drop it.
    if (form.website) {
      setStatus('sent')
      setForm(EMPTY)
      return
    }
    const enquiry = {
      name: form.name.trim(),
      email: form.email.trim(),
      interest: form.interest || null,
      dates: form.dates.trim() || null,
      message: form.message.trim(),
    }

    let whatsappUrl = ''
    if (viaWhatsApp) {
      whatsappUrl = waHref(contact.whatsapp, whatsappText(contact.whatsappMessage, enquiry))
      // Opened before the save finishes: browsers only allow new tabs straight after a click.
      window.open(whatsappUrl, '_blank', 'noopener')
    }

    setStatus('sending')
    const { error } = await db.from('inquiries').insert({ ...enquiry, channel: viaWhatsApp ? 'whatsapp' : 'form' })
    if (viaWhatsApp) {
      // Even if saving failed, the visitor already has the full message ready in WhatsApp.
      setWaUrl(whatsappUrl)
      setStatus('whatsapp')
      setForm(EMPTY)
      return
    }
    if (error) {
      // Don't lose the enquiry: hand it to the visitor's mail app instead.
      const body = `${enquiry.message}\n\nInterested in: ${enquiry.interest || '-'}\nTravel dates: ${enquiry.dates || '-'}\n\n${enquiry.name} <${enquiry.email}>`
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Journey enquiry from ${enquiry.name}`)}&body=${encodeURIComponent(body)}`
      setStatus('fallback')
      return
    }
    setStatus('sent')
    setForm(EMPTY)
  }

  return (
    <Reveal as="form" onSubmit={submit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field name="name" text="Your Name" required maxLength={200} value={form.name} onChange={update} />
        <Field name="email" text="Your Email" type="email" required maxLength={320} value={form.email} onChange={update} />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="relative block">
          <span className="text-[11px] uppercase tracking-[0.15em] text-muted">I’m Interested In</span>
          <select name="interest" value={form.interest} onChange={update} className="mt-1 w-full cursor-pointer border-b border-line bg-transparent py-2 text-[15px] outline-none transition-colors focus:border-forest">
            <option value="">Choose a service</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <Field name="dates" text="Preferred Travel Dates" maxLength={200} value={form.dates} onChange={update} />
      </div>
      <Field as="textarea" name="message" text="Tell us about your dream journey" rows={4} required maxLength={5000} value={form.message} onChange={update} />
      <input type="text" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        {contact.whatsapp && (
          <button
            name="whatsapp"
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] px-7 py-4 font-serif text-sm uppercase tracking-wide text-forest transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] hover:shadow-[0_12px_24px_-12px_rgba(37,211,102,0.8)] disabled:opacity-60 max-sm:w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {c.whatsappButton}
          </button>
        )}
        <button
          name="form"
          disabled={status === 'sending'}
          className="group relative overflow-hidden border border-forest bg-forest px-8 py-4 font-serif text-sm uppercase tracking-wide text-cream transition-colors duration-500 hover:text-forest disabled:opacity-60 max-sm:w-full"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-cream transition-transform duration-500 group-hover:scale-y-100" />
          <span className="relative">{status === 'sending' ? 'Sending…' : c.button}</span>
        </button>
      </div>
      <div aria-live="polite">
        {status === 'sent' && <p className="animate-rise font-serif text-lg text-forest italic">{c.thanks}</p>}
        {status === 'whatsapp' && (
          <p className="animate-rise font-serif text-lg text-forest italic">
            {c.whatsappThanks}{' '}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="not-italic underline decoration-[#25D366] decoration-2 underline-offset-4">
              WhatsApp didn’t open? Tap here.
            </a>
          </p>
        )}
        {status === 'fallback' && (
          <p className="animate-rise font-serif text-lg text-forest italic">We couldn’t send that just now — your email app should open with your enquiry.</p>
        )}
      </div>
    </Reveal>
  )
}
