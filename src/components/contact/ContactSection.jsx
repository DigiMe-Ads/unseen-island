import Heading from '../common/Heading.jsx'
import ContactForm from './ContactForm.jsx'
import ContactDetails from './ContactDetails.jsx'

export default function ContactSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-24 lg:py-32">
      <div>
        <Heading label="Enquiries" title="Tell Us About" accent="Your Journey" size="md" className="mb-10" />
        <ContactForm />
      </div>
      <ContactDetails />
    </section>
  )
}
