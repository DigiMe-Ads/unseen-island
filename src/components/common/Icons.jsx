const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><path d="M4 12h15M14 6l6 6-6 6" /></svg>
)
export const ChevronIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="1.6" {...p}><path d="m9 6 6 6-6 6" /></svg>
)
export const CaretUpIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="1.6" {...p}><path d="m5 16 7-8 7 8" /></svg>
)
export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>
)
export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><path d="M3 7h18M3 12h18M3 17h12" /></svg>
)
export const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4Z" fill="currentColor" /></svg>
)
export const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
)
export const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21Z" /></svg>
)
export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)
export const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>
)
export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" {...line} {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
)
export const StarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" /></svg>
)
export const QuoteIcon = (p) => (
  <svg viewBox="0 0 48 40" fill="currentColor" {...p}><path d="M0 40V24C0 10 7 2 20 0l2 5c-7 2-11 7-11 14h9v21Zm26 0V24C26 10 33 2 46 0l2 5c-7 2-11 7-11 14h9v21Z" /></svg>
)

// Decorative flourish used under the hero title.
export const Flourish = (p) => (
  <svg viewBox="0 0 160 16" {...line} strokeWidth="1" {...p}>
    <path d="M0 8h60M100 8h60" />
    <path d="M60 8c6-6 14-6 20 0s14 6 20 0M60 8c6 6 14 6 20 0s14-6 20 0" />
    <circle cx="0" cy="8" r="1.2" fill="currentColor" /><circle cx="160" cy="8" r="1.2" fill="currentColor" />
  </svg>
)
