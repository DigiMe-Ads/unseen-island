import PageIntro from '../components/common/PageIntro.jsx'
import ContactSection from '../components/contact/ContactSection.jsx'
import ContactMap from '../components/contact/ContactMap.jsx'

export default function Contact() {
  return (
    <>
      <PageIntro section="contact.intro" />
      <ContactSection />
      <ContactMap />
    </>
  )
}
