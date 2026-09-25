// Every editable section of the site. `defaults` is the built-in content; the admin panel stores only the
// fields that differ from it, so anything never edited keeps following the code.
import { IMAGES as I } from '../data/images.js'
import { NAV_LINKS, SERVICES, CONTACT, SOCIAL } from '../data/site.js'
import { SIGNATURE, RETREATS, EXPERIENCES, JOURNAL, REVIEWS, REGIONS } from '../data/content.js'
import { GALLERY } from '../data/gallery.js'

const text = (key, label, help) => ({ key, label, type: 'text', help })
const area = (key, label, help) => ({ key, label, type: 'textarea', help })
const image = (key, label) => ({ key, label, type: 'image' })
const images = (key, label, help) => ({ key, label, type: 'images', help })
// A photo spot that becomes a crossfading slideshow when more than one photo is added.
const photos = (key, label, opts = {}) => ({ key, label, type: 'images', help: 'Add more than one photo to show them as a slideshow.', ...opts })
const slidesOf = (items) => items.map(({ image, ...rest }) => ({ ...rest, image: [image] }))
const lines = (key, label, help) => ({ key, label, type: 'lines', help })
const paragraphs = (key, label) => ({ key, label, type: 'paragraphs', help: 'Leave a blank line between paragraphs.' })
const list = (key, label, itemFields, opts = {}) => ({ key, label, type: 'list', itemFields, ...opts })

const heading = (withLabel = true) => [
  ...(withLabel ? [text('label', 'Small label above the heading')] : []),
  text('title', 'Heading'),
  text('accent', 'Heading — italic part'),
]
const pageIntro = [text('title', 'Heading'), text('accent', 'Heading — italic part'), area('lede', 'Intro text'), photos('image', 'Wide feature photos', { optional: true })]
const statementLines = list('lines', 'Lines', [text('roman', 'Regular text'), text('italic', 'Italic text')], { itemTitle: (it) => `${it.roman} ${it.italic}`.trim() })

export const SECTIONS = [
  // Site-wide ----------------------------------------------------------------
  {
    id: 'site.contact',
    group: 'Site-wide',
    name: 'Contact details',
    description: 'Shown in the footer, menu and contact page.',
    fields: [
      text('email', 'Email'),
      text('phone', 'Phone'),
      text('whatsapp', 'WhatsApp number', 'Include the country code, e.g. +94 777 697 788.'),
      area('whatsappMessage', 'WhatsApp greeting', 'Pre-typed message when someone taps a WhatsApp button.'),
      lines('office', 'Office address', 'One line per row.'),
    ],
    defaults: {
      email: CONTACT.email,
      phone: CONTACT.phone,
      whatsapp: CONTACT.phone,
      whatsappMessage: 'Hello The Unseen Island! I’d like to plan a journey in Sri Lanka.',
      office: CONTACT.office,
    },
  },
  {
    id: 'site.social',
    group: 'Site-wide',
    name: 'Social links',
    fields: [text('instagram', 'Instagram URL'), text('facebook', 'Facebook URL')],
    defaults: { ...SOCIAL },
  },
  {
    id: 'site.services',
    group: 'Site-wide',
    name: 'Services',
    description: 'Used in the footer, the home intro and the enquiry form.',
    fields: [lines('services', 'Services', 'One service per line.')],
    defaults: { services: SERVICES },
  },
  {
    id: 'site.footer',
    group: 'Site-wide',
    name: 'Footer',
    fields: [area('blurb', 'About text'), text('cta', 'Button text')],
    defaults: {
      blurb: 'Bespoke private and group tours and luxury travel management, creating unforgettable memories across Sri Lanka.',
      cta: 'Enquire Now',
    },
  },
  {
    id: 'site.menu',
    group: 'Site-wide',
    name: 'Menu photos',
    description: 'The pair of photos shown in the full-screen menu when each link is hovered.',
    fields: [
      list('photos', 'Photos per menu link', [image('image', 'Main photo'), image('companion', 'Second photo')], {
        fixed: true,
        itemTitle: (_, i) => NAV_LINKS[i]?.label,
      }),
    ],
    defaults: {
      photos: NAV_LINKS.map((l, i) => ({ image: l.image, companion: [I.cocktails, I.pavilion, I.buffaloMud, I.goldenBeach, I.jungleVilla][i] })),
    },
  },

  // Home ---------------------------------------------------------------------
  {
    id: 'home.hero',
    group: 'Home',
    name: 'Hero',
    fields: [text('title', 'First line'), text('accent', 'Second line (italic)'), images('slides', 'Slideshow photos')],
    defaults: {
      title: 'One Unseen Island',
      accent: 'Countless Extraordinary Journeys',
      slides: [I.villaCoast, I.sunsetPalms, I.surfers, I.rainforestPool],
    },
  },
  {
    id: 'home.intro',
    group: 'Home',
    name: 'Discover Sri Lanka',
    fields: [...heading(), paragraphs('body', 'Text'), photos('image', 'Large photos'), photos('inset', 'Small overlapping photos'), text('link', 'Link text')],
    defaults: {
      label: 'Discover Sri Lanka',
      title: 'Curating Meaningful Journeys',
      accent: 'With The Unseen Island',
      body: [
        'Sri Lanka offers a wealth of lesser-known attractions for the curious traveller. Discover unspoiled beaches, dry zone forests teeming with wildlife, misty mountain forests hiding waterfalls, and charming tea planters’ bungalows nestled amidst lush greenery.',
        'Beyond its landscapes lies a cuisine shaped by many cultures and a history of ancient civilisations whose relics are rarely found on the tourist trail — an experience far beyond the ordinary.',
      ],
      image: [I.rockView, I.waterfall, I.coastLagoon],
      inset: [I.kayak, I.beeEater, I.sandbar],
      link: 'Learn More About Us',
    },
  },
  {
    id: 'home.signature',
    group: 'Home',
    name: 'Signature journeys',
    fields: [
      ...heading(),
      area('text', 'Intro text'),
      list('items', 'Journeys', [text('region', 'Region'), text('title', 'Title'), area('text', 'Hover text'), photos('image', 'Photos')], {
        fixed: true,
        itemTitle: (it) => it.title,
      }),
    ],
    defaults: {
      label: 'Signature Journeys',
      title: 'The Unseen',
      accent: 'Collection',
      text: 'From the heritage-rich north to the surf breaks of the east and the wild heart of Yala, each journey is crafted around the places that make Sri Lanka unforgettable — and the people who call them home.',
      items: slidesOf(SIGNATURE),
    },
  },
  {
    id: 'home.statement',
    group: 'Home',
    name: 'Large statement',
    fields: [statementLines],
    defaults: { lines: [{ roman: 'An Island', italic: '' }, { roman: 'Of', italic: 'Unseen Treasures' }] },
  },
  {
    id: 'home.retreats',
    group: 'Home',
    name: 'Hidden retreats',
    fields: [
      ...heading(),
      area('text', 'Intro text'),
      list('items', 'Retreats', [text('region', 'Region'), text('title', 'Title'), area('text', 'Hover text'), photos('image', 'Photos')], {
        fixed: true,
        itemTitle: (it) => it.title,
      }),
    ],
    defaults: {
      label: 'Stays & Sanctuaries',
      title: 'Hidden',
      accent: 'Retreats',
      text: 'Find sanctuary in boutique villas and intimate hideaways, hand-picked for their privacy, character and the kind of hospitality that makes you feel at home.',
      items: slidesOf(RETREATS),
    },
  },
  {
    id: 'home.crafted',
    group: 'Home',
    name: 'Crafted journeys',
    fields: [
      ...heading(false),
      area('text', 'Intro text'),
      photos('image', 'Photos'),
      list('steps', 'Steps', [text('title', 'Title'), area('text', 'Text')], { itemTitle: (it) => it.title }),
      text('link', 'Link text'),
    ],
    defaults: {
      title: 'Uniquely Crafted Journeys',
      accent: 'Through Sri Lanka',
      text: 'Our luxury travel services cater to family holidays, individual explorers, group travel and conferences — each journey unique, memorable and a reflection of your own preferences.',
      image: [I.pavilion, I.cocktails, I.jungleVilla, I.poolNight],
      steps: [
        { title: 'Tell us your dream', text: 'Share how you like to travel, who is coming and what moves you.' },
        { title: 'We craft your route', text: 'A personal itinerary balancing adventure, relaxation and culture.' },
        { title: 'Travel with care', text: 'Private transport, trusted guides and support every step of the way.' },
      ],
      link: 'Start Planning',
    },
  },
  {
    id: 'home.finest',
    group: 'Home',
    name: 'Marco Polo quote',
    fields: [...heading(false), text('attribution', 'Attribution'), area('text', 'Text'), text('link', 'Link text'), images('slides', 'Slideshow photos')],
    defaults: {
      title: '“The Finest Island',
      accent: 'Of Its Size In All The World”',
      attribution: '— Marco Polo',
      text: 'Sri Lanka is an island of contrasts, where every step reveals a hidden gem. Its unparalleled diversity promises an adventure, from pristine beaches and lush jungles to sacred temples and timeless ruins — nature, history and culture woven into an unforgettable tapestry.',
      link: 'Discover Sri Lanka',
      slides: [I.church, I.ruins, I.railway, I.jungleRoad],
    },
  },
  {
    id: 'home.experiences',
    group: 'Home',
    name: 'Experiences carousel',
    fields: [
      ...heading(false),
      area('text', 'Intro text'),
      text('link', 'Link text'),
      list('items', 'Experiences', [text('label', 'Small label'), text('title', 'Title'), photos('image', 'Photos')], { itemTitle: (it) => it.title }),
    ],
    defaults: {
      title: 'Intimate Exploration',
      accent: 'And Authentic Experiences',
      text: 'Traverse the wilderness, find stillness beside the ocean and reconnect with nature through experiences designed to share the best of Sri Lanka with curious, discerning travellers.',
      link: 'Discover All Experiences',
      items: slidesOf(EXPERIENCES),
    },
  },
  {
    id: 'home.reviews',
    group: 'Home',
    name: 'Guest reviews',
    fields: [
      text('label', 'Small label'),
      text('rating', 'Rating text'),
      list('items', 'Reviews', [text('name', 'Guest name'), area('text', 'Review')], { itemTitle: (it) => it.name }),
      text('link', 'Link text'),
      text('linkUrl', 'Link URL'),
    ],
    defaults: {
      label: 'What Our Guests Say',
      rating: '35 Google reviews',
      items: REVIEWS,
      link: 'Read All Reviews',
      linkUrl: 'https://www.google.com/maps/search/The+Unseen+Island',
    },
  },
  {
    id: 'home.journal',
    group: 'Home',
    name: 'Journal',
    fields: [
      ...heading(false),
      area('text', 'Intro text'),
      text('link', 'Link text'),
      list('items', 'Stories', [text('date', 'Tag'), text('title', 'Title'), area('excerpt', 'Excerpt'), photos('image', 'Photos')], {
        itemTitle: (it) => it.title,
      }),
    ],
    defaults: {
      title: 'Our',
      accent: 'Journal',
      text: 'Stories from the road — the people, places and quiet moments that inspire every journey we craft.',
      link: 'Plan Your Own Story',
      items: slidesOf(JOURNAL),
    },
  },

  // About --------------------------------------------------------------------
  {
    id: 'about.intro',
    group: 'About',
    name: 'Page intro',
    fields: pageIntro,
    defaults: {
      title: 'The Stories',
      accent: 'Of The Unseen Island',
      lede: 'Escape, explore and experience a side of Sri Lanka few travellers ever see.',
      image: [I.goldenBeach],
    },
  },
  {
    id: 'about.statement',
    group: 'About',
    name: 'Italic statement',
    fields: [area('text', 'Statement')],
    defaults: { text: 'Experience Sri Lanka’s history, culture & nature through private journeys crafted around you.' },
  },
  {
    id: 'about.who',
    group: 'About',
    name: 'Who we are',
    fields: [...heading(), paragraphs('body', 'Text'), photos('image', 'Left photos'), photos('image2', 'Right photos'), text('link', 'Link text')],
    defaults: {
      label: 'Who We Are',
      title: 'The Best Of',
      accent: 'Sri Lanka',
      body: [
        'The Unseen Island is an experiential travel company offering exclusive private and group tours designed for discerning travellers. Our tailored itineraries invite you to discover stunning island destinations that are diverse, unspoiled, and far from the well-trodden paths, offering an immersive journey through culture, cuisine, and breathtaking landscapes.',
        'Our luxury travel services cater to family holidays, individual explorers, group travel and conferences. The Unseen Island also specialises in curating exclusive holidays for recognised personalities and high-profile individuals who value privacy and anonymity in their travels.',
        'We specialise in seamless travel planning with personalised itineraries that perfectly balance adventure, relaxation, and exceptional hospitality. From corporate retreats to bespoke luxury vacations, we meticulously handle every detail to exceed your expectations.',
      ],
      image: [I.jungleVilla, I.villaCoast, I.deepBlue],
      image2: [I.cocktails, I.pavilion, I.poolNight],
      link: 'Speak With Our Team',
    },
  },
  {
    id: 'about.regions',
    group: 'About',
    name: 'Around the island',
    fields: [
      ...heading(),
      list('items', 'Regions', [text('name', 'Region name'), text('title', 'Subtitle'), area('text', 'Text'), image('image', 'Photo')], {
        itemTitle: (it) => it.name,
      }),
    ],
    defaults: { label: 'Around The Island', title: 'Where Every Corner', accent: 'Tells A Story', items: REGIONS },
  },
  {
    id: 'about.statement2',
    group: 'About',
    name: 'Large statement',
    fields: [statementLines],
    defaults: {
      lines: [
        { roman: 'Escape,', italic: '' },
        { roman: 'Explore,', italic: 'And' },
        { roman: '', italic: 'Experience' },
      ],
    },
  },
  {
    id: 'about.people',
    group: 'About',
    name: 'People and nature',
    fields: [...heading(false), area('text', 'Text'), photos('image', 'Left photos'), photos('image2', 'Right photos'), text('link', 'Link text')],
    defaults: {
      title: 'Kindness To Both',
      accent: 'People And Nature',
      text: 'We travel lightly and locally — working with family-run stays, local guides and community experiences so that every journey gives something back to the island and the people who make it so special.',
      image: [I.buffaloMud, I.buffaloLake, I.leopards],
      image2: [I.jungleRoad, I.crabCurry, I.lagoonBoat],
      link: 'See The Island Through Our Lens',
    },
  },
  {
    id: 'about.terms',
    group: 'About',
    name: 'Payment terms',
    fields: [...heading(), list('items', 'Questions', [text('q', 'Question'), area('a', 'Answer')], { itemTitle: (it) => it.q })],
    defaults: {
      label: 'Good To Know',
      title: 'Payments,',
      accent: 'Terms & Conditions',
      items: [
        {
          q: 'Accepted Payment Methods',
          a: 'We accept bank transfers, major credit and debit cards, and secure online payment links. Details for each method are provided with your booking confirmation.',
        },
        {
          q: 'Currency',
          a: 'All quotations are issued in US Dollars (USD) unless otherwise agreed. Payments in other currencies are converted at the prevailing exchange rate on the day of payment, and any bank charges are borne by the client.',
        },
        {
          q: 'Confirmation of Booking',
          a: 'Your booking is confirmed once we receive the agreed deposit and a signed acceptance of these terms. The remaining balance is payable before the start of your tour, as stated on your invoice.',
        },
      ],
    },
  },

  // Gallery ------------------------------------------------------------------
  {
    id: 'gallery.intro',
    group: 'Gallery',
    name: 'Page intro',
    fields: pageIntro,
    defaults: {
      title: 'A Glimpse',
      accent: 'Of Our Island',
      lede: 'Every photograph here was taken on our journeys — beaches, wildlife, heritage and hideaways from every corner of Sri Lanka.',
      image: [],
    },
  },
  {
    id: 'gallery.collections',
    group: 'Gallery',
    name: 'Photo collections',
    description: 'The first three photos of each collection form the large feature block.',
    fields: [
      ...heading(false),
      list('items', 'Collections', [text('title', 'Title'), area('text', 'Description'), images('images', 'Photos')], {
        itemTitle: (it) => it.title,
      }),
    ],
    defaults: { title: 'Find Your', accent: 'Next Adventure', items: GALLERY.map(({ title, text, images }) => ({ title, text, images })) },
  },
  {
    id: 'gallery.escape',
    group: 'Gallery',
    name: 'Island escape cards',
    fields: [
      ...heading(false),
      area('text', 'Text'),
      list('cards', 'Cards', [text('title', 'Title'), photos('image', 'Photos')], { fixed: true, itemTitle: (it) => it.title }),
    ],
    defaults: {
      title: 'Discover Your',
      accent: 'Island Escape',
      text: 'Traverse the wilderness, find stillness beside the ocean and reconnect with nature through journeys that share the best of Sri Lanka with curious, discerning travellers.',
      cards: [
        { title: 'Destinations', image: [I.goldenSunset], to: '/about#around-the-island' },
        { title: 'Experiences', image: [I.villaCoast], to: '/#experiences' },
        { title: 'Journeys', image: [I.rainforestPool], to: '/contact' },
      ],
    },
  },

  // Contact ------------------------------------------------------------------
  {
    id: 'contact.intro',
    group: 'Contact',
    name: 'Page intro',
    fields: pageIntro,
    defaults: {
      title: 'Plan Your',
      accent: 'Journey With Us',
      lede: 'Share a few details and we’ll craft a personal itinerary around the way you love to travel.',
      image: [I.lagoonBoat],
    },
  },
  {
    id: 'contact.form',
    group: 'Contact',
    name: 'Enquiry form',
    fields: [
      ...heading(),
      text('whatsappButton', 'WhatsApp button text'),
      text('button', 'Send button text'),
      text('thanks', 'Thank-you message'),
      text('whatsappThanks', 'Thank-you message after WhatsApp opens'),
    ],
    defaults: {
      label: 'Enquiries',
      title: 'Tell Us About',
      accent: 'Your Journey',
      whatsappButton: 'Send via WhatsApp',
      button: 'Send Enquiry',
      thanks: 'Thank you — we’ve received your enquiry and will be in touch shortly.',
      whatsappThanks: 'Thank you — we’ve received your enquiry. Just tap send in WhatsApp to message us directly.',
    },
  },
  {
    id: 'contact.map',
    group: 'Contact',
    name: 'Map',
    fields: [text('query', 'Map location', 'An address or place name, as you would type it into Google Maps.')],
    defaults: { query: 'Obeysekera Crescent, Rajagiriya, Sri Lanka' },
  },
]

export const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]))
