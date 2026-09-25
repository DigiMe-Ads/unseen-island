import PageIntro from '../components/common/PageIntro.jsx'
import GalleryCollections from '../components/gallery/GalleryCollections.jsx'
import LuxeEscape from '../components/gallery/LuxeEscape.jsx'

export default function Gallery() {
  return (
    <>
      <PageIntro
        title="A Glimpse"
        accent="Of Our Island"
        lede="Every photograph here was taken on our journeys — beaches, wildlife, heritage and hideaways from every corner of Sri Lanka."
      />
      <GalleryCollections />
      <LuxeEscape />
    </>
  )
}
