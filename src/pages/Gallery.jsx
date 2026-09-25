import PageIntro from '../components/common/PageIntro.jsx'
import GalleryCollections from '../components/gallery/GalleryCollections.jsx'
import LuxeEscape from '../components/gallery/LuxeEscape.jsx'

export default function Gallery() {
  return (
    <>
      <PageIntro section="gallery.intro" />
      <GalleryCollections />
      <LuxeEscape />
    </>
  )
}
