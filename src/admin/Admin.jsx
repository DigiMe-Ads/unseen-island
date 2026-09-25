import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import Login from './Login.jsx'
import AdminLayout from './AdminLayout.jsx'
import Inquiries from './Inquiries.jsx'
import SectionEditor from './SectionEditor.jsx'
import { Spinner } from './ui.jsx'

// Keeps the admin area out of search results even if someone links to it.
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow, noarchive'
    document.head.appendChild(meta)
    const title = document.title
    document.title = 'Admin · The Unseen Island'
    return () => {
      meta.remove()
      document.title = title
    }
  }, [])
}

export default function Admin() {
  useNoIndex()
  if (!supabase) {
    return (
      <div className="grid min-h-screen place-items-center bg-sand px-4">
        <div className="w-full max-w-md bg-white p-8 text-center shadow-sm">
          <p className="font-serif text-2xl text-forest">Admin isn’t connected</p>
          <p className="mt-2 text-sm text-muted">
            This build has no Supabase settings. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the hosting environment variables and redeploy.
          </p>
        </div>
      </div>
    )
  }
  return <AdminApp />
}

function AdminApp() {
  const [session, setSession] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const userId = session?.user.id
  useEffect(() => {
    if (!userId) return
    let active = true
    setIsAdmin(null)
    supabase.rpc('is_admin').then(({ data, error }) => active && setIsAdmin(!error && data === true))
    return () => {
      active = false
    }
  }, [userId])

  if (session === undefined || (session && isAdmin === null)) {
    return (
      <div className="grid min-h-screen place-items-center bg-sand">
        <Spinner />
      </div>
    )
  }

  if (!session) return <Login />

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-sand px-4">
        <div className="w-full max-w-sm bg-white p-8 text-center shadow-sm">
          <p className="font-serif text-2xl text-forest">No admin access</p>
          <p className="mt-2 text-sm text-muted">{session.user.email} is signed in but isn’t an administrator.</p>
          <button onClick={() => supabase.auth.signOut()} className="mt-6 text-sm text-forest underline">
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout user={session.user}>
      <Routes>
        <Route path="/admin/inquiries" element={<Inquiries />} />
        <Route path="/admin/content/:id" element={<SectionEditor user={session.user} />} />
        <Route path="*" element={<Navigate to="/admin/inquiries" replace />} />
      </Routes>
    </AdminLayout>
  )
}
