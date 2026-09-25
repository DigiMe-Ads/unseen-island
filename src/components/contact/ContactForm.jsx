import { useState } from 'react'
import { CONTACT, SERVICES } from '../../data/site.js'
import Reveal from '../common/Reveal.jsx'

const EMPTY = { name: '', email: '', interest: '', dates: '', message: '' }
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

// Enquiry form with floating labels. No backend yet: it opens the visitor's mail app with the enquiry filled in.
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = `${form.message}\n\nInterested in: ${form.interest || '-'}\nTravel dates: ${form.dates || '-'}\n\n${form.name} <${form.email}>`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Journey enquiry from ${form.name}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setForm(EMPTY)
  }

  return (
    <Reveal as="form" onSubmit={submit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field name="name" text="Your Name" required value={form.name} onChange={update} />
        <Field name="email" text="Your Email" type="email" required value={form.email} onChange={update} />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="relative block">
          <span className="text-[11px] uppercase tracking-[0.15em] text-muted">I’m Interested In</span>
          <select name="interest" value={form.interest} onChange={update} className="mt-1 w-full cursor-pointer border-b border-line bg-transparent py-2 text-[15px] outline-none transition-colors focus:border-forest">
            <option value="">Choose a service</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <Field name="dates" text="Preferred Travel Dates" value={form.dates} onChange={update} />
      </div>
      <Field as="textarea" name="message" text="Tell us about your dream journey" rows={4} required value={form.message} onChange={update} />

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button className="group relative overflow-hidden border border-forest bg-forest px-8 py-4 font-serif text-sm uppercase tracking-wide text-cream transition-colors duration-500 hover:text-forest">
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-cream transition-transform duration-500 group-hover:scale-y-100" />
          <span className="relative">Send Enquiry</span>
        </button>
        {sent && <p className="animate-rise font-serif text-lg text-forest italic">Thank you — your email app should now open.</p>}
      </div>
    </Reveal>
  )
}
