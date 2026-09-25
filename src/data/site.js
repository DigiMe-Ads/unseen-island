import { IMAGES } from './images.js'

// Primary pages; `image` is shown in the full-screen menu when the link is hovered.
export const NAV_LINKS = [
  { label: 'Home', to: '/', image: IMAGES.villaCoast },
  { label: 'About Us', to: '/about', image: IMAGES.rockView },
  { label: 'Experiences', to: '/#experiences', image: IMAGES.leopard },
  { label: 'Gallery', to: '/gallery', image: IMAGES.surfers },
  { label: 'Contact Us', to: '/contact', image: IMAGES.rainforestPool },
]

export const MENU_SECONDARY = [
  { label: 'Our Journeys', to: '/#journeys' },
  { label: 'Around The Island', to: '/about#around-the-island' },
  { label: 'Guest Reviews', to: '/#reviews' },
  { label: 'Our Journal', to: '/#journal' },
  { label: 'Payment Terms', to: '/about#payment-terms' },
]

export const SERVICES = ['Bespoke Itineraries', 'Reservations', 'Island Travel', 'Guided Experiences', 'Retreats']

export const CONTACT = {
  email: 'graeme@theunseenisland.com',
  phone: '+94 777 697 788',
  phoneHref: 'tel:+94777697788',
  office: ['199/41 Obeysekera Crescent', 'Rajagiriya', 'Sri Lanka'],
}

export const SOCIAL = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
}
