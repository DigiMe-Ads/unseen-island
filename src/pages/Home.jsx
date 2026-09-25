import HomeHero from '../components/home/HomeHero.jsx'
import JourneyIntro from '../components/home/JourneyIntro.jsx'
import SignatureCollection from '../components/home/SignatureCollection.jsx'
import RetreatCollection from '../components/home/RetreatCollection.jsx'
import CraftedJourneys from '../components/home/CraftedJourneys.jsx'
import FinestIsland from '../components/home/FinestIsland.jsx'
import ExperienceCarousel from '../components/home/ExperienceCarousel.jsx'
import ReviewsQuote from '../components/home/ReviewsQuote.jsx'
import Journal from '../components/home/Journal.jsx'
import FadedStatement from '../components/common/FadedStatement.jsx'

export default function Home() {
  return (
    <>
      <HomeHero />
      <JourneyIntro />
      <SignatureCollection />
      <FadedStatement lines={[['An Island'], ['Of', 'Unseen Treasures']]} />
      <RetreatCollection />
      <CraftedJourneys />
      <FinestIsland />
      <ExperienceCarousel />
      <ReviewsQuote />
      <Journal />
    </>
  )
}
