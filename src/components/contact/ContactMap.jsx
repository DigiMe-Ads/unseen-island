import Reveal from '../common/Reveal.jsx'

// Embedded map of the Rajagiriya office, desaturated until hovered.
export default function ContactMap() {
  return (
    <section className="px-4 pb-24 sm:px-8">
      <Reveal from="zoom" className="mx-auto max-w-7xl overflow-hidden border border-line">
        <iframe
          title="The Unseen Island office in Rajagiriya, Sri Lanka"
          src="https://www.google.com/maps?q=Obeysekera+Crescent,+Rajagiriya,+Sri+Lanka&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[380px] w-full grayscale-[70%] transition-all duration-700 hover:grayscale-0"
        />
      </Reveal>
    </section>
  )
}
