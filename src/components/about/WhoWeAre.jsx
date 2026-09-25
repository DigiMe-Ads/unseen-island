import { IMAGES } from '../../data/images.js'
import Heading from '../common/Heading.jsx'
import Reveal from '../common/Reveal.jsx'
import TextLink from '../common/TextLink.jsx'

const PARAGRAPHS = [
  'The Unseen Island is an experiential travel company offering exclusive private and group tours designed for discerning travellers. Our tailored itineraries invite you to discover stunning island destinations that are diverse, unspoiled, and far from the well-trodden paths, offering an immersive journey through culture, cuisine, and breathtaking landscapes.',
  'Our luxury travel services cater to family holidays, individual explorers, group travel and conferences. The Unseen Island also specialises in curating exclusive holidays for recognised personalities and high-profile individuals who value privacy and anonymity in their travels.',
  'We specialise in seamless travel planning with personalised itineraries that perfectly balance adventure, relaxation, and exceptional hospitality. From corporate retreats to bespoke luxury vacations, we meticulously handle every detail to exceed your expectations.',
]

export default function WhoWeAre() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-36">
      <div className="grid grid-cols-2 gap-5">
        <Reveal from="up" className="group overflow-hidden">
          <img src={IMAGES.jungleVilla.src} alt={IMAGES.jungleVilla.alt} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110" />
        </Reveal>
        <Reveal from="up" delay={200} className="group mt-16 overflow-hidden">
          <img src={IMAGES.cocktails.src} alt={IMAGES.cocktails.alt} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110" />
        </Reveal>
      </div>

      <div className="lg:pl-6">
        <Heading label="Who We Are" title="The Best Of" accent="Sri Lanka" />
        <div className="mt-8 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted">
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} as="p" delay={120 + i * 100}>{p}</Reveal>
          ))}
        </div>
        <Reveal delay={450} className="mt-10">
          <TextLink to="/contact">Speak With Our Team</TextLink>
        </Reveal>
      </div>
    </section>
  )
}
