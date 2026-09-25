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
