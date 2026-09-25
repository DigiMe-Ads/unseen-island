import { useState } from 'react'

// Newsletter row at the top of the footer. There is no mailing-list backend yet, so it only confirms locally.
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
    setEmail('')
  }

  return (
    <div className="flex flex-col gap-8 border-b border-cream/15 pb-14 lg:flex-row lg:items-end lg:justify-between">
      <p className="max-w-lg font-serif text-2xl text-cream sm:text-3xl">
        Subscribe for island stories, <em>seasonal journeys</em> and special offers.
      </p>
      {done ? (
        <p className="animate-rise font-serif text-xl text-cream/85 italic">Thank you — we’ll be in touch soon.</p>
      ) : (
        <form onSubmit={submit} className="flex w-full max-w-md items-end gap-4">
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border-b border-cream/40 bg-transparent py-3 text-sm text-cream placeholder:text-cream/50 outline-none transition-colors focus:border-cream"
            />
          </label>
          <button className="border border-cream/70 px-6 py-3 font-serif text-sm uppercase tracking-wide text-cream transition-all duration-300 hover:bg-cream hover:text-forest">
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
