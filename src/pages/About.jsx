import PageIntro from '../components/common/PageIntro.jsx'
import FadedStatement from '../components/common/FadedStatement.jsx'
import AboutStatement from '../components/about/AboutStatement.jsx'
import WhoWeAre from '../components/about/WhoWeAre.jsx'
import AroundIsland from '../components/about/AroundIsland.jsx'
import PeopleAndNature from '../components/about/PeopleAndNature.jsx'
import PaymentTerms from '../components/about/PaymentTerms.jsx'

export default function About() {
  return (
    <>
      <PageIntro section="about.intro" />
      <AboutStatement />
      <WhoWeAre />
      <AroundIsland />
      <FadedStatement section="about.statement2" />
      <PeopleAndNature />
      <PaymentTerms />
    </>
  )
}
