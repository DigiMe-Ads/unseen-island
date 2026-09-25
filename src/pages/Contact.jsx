import PageIntro from '../components/common/PageIntro.jsx'
import ContactSection from '../components/contact/ContactSection.jsx'
import ContactMap from '../components/contact/ContactMap.jsx'
import { IMAGES } from '../data/images.js'

export default function Contact() {
  return (
    <>
      <PageIntro
        title="Plan Your"
        accent="Journey With Us"
        lede="Share a few details and we’ll craft a personal itinerary around the way you love to travel."
        image={IMAGES.lagoonBoat}
      />
      <ContactSection />
      <ContactMap />
    </>
  )
}
