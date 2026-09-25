import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import { useContentStore } from './content/ContentProvider.jsx'

const Admin = lazy(() => import('./admin/Admin.jsx'))

export default function App() {
  const { pathname } = useLocation()
  const { ready } = useContentStore()

  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    )
  }

  if (!ready) return <div className="min-h-screen bg-cream" />

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
