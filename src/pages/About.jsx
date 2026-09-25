import PageIntro from '../components/common/PageIntro.jsx'
import FadedStatement from '../components/common/FadedStatement.jsx'
import AboutStatement from '../components/about/AboutStatement.jsx'
import WhoWeAre from '../components/about/WhoWeAre.jsx'
import AroundIsland from '../components/about/AroundIsland.jsx'
import PeopleAndNature from '../components/about/PeopleAndNature.jsx'
import PaymentTerms from '../components/about/PaymentTerms.jsx'
import { IMAGES } from '../data/images.js'

export default function About() {
  return (
    <>
      <PageIntro
        title="The Stories"
        accent="Of The Unseen Island"
        lede="Escape, explore and experience a side of Sri Lanka few travellers ever see."
        image={IMAGES.goldenBeach}
      />
      <AboutStatement />
      <WhoWeAre />
      <AroundIsland />
      <FadedStatement lines={[['Escape,'], ['Explore,', 'And'], ['', 'Experience']]} />
      <PeopleAndNature />
      <PaymentTerms />
    </>
  )
}
