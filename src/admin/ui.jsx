// Small shared building blocks for the admin screens.

export const inputCls =
  'w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15'

const BUTTONS = {
  primary: 'bg-forest text-cream hover:bg-forest-soft',
  secondary: 'border border-line bg-white text-forest hover:border-forest',
  ghost: 'text-muted hover:bg-sand hover:text-forest',
  danger: 'text-red-700 hover:bg-red-50',
}

export function Button({ variant = 'secondary', className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${BUTTONS[variant]} ${className}`}
      {...props}
    />
  )
}

export function Spinner({ className = '' }) {
  return <span className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-forest/20 border-t-forest ${className}`} aria-label="Loading" />
}

export function Badge({ tone = 'muted', children }) {
  const tones = {
    muted: 'bg-sand text-muted',
    gold: 'bg-gold/15 text-[#8a6a35]',
    green: 'bg-forest text-cream',
    whatsapp: 'bg-[#25D366]/20 text-[#0f6b3a]',
  }
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>{children}</span>
}

export function Notice({ tone = 'info', children }) {
  const tones = {
    info: 'border-line bg-white text-muted',
    success: 'border-forest/20 bg-forest/5 text-forest',
    error: 'border-red-200 bg-red-50 text-red-800',
  }
  return <div className={`rounded-md border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>
}
