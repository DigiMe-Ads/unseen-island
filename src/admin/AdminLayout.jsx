import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { SECTIONS } from '../content/sections.js'
import { useContentStore } from '../content/ContentProvider.jsx'
import { MenuIcon, CloseIcon } from '../components/common/Icons.jsx'
import { Badge } from './ui.jsx'

const GROUPS = [...new Set(SECTIONS.map((s) => s.group))]

const AdminContext = createContext(null)
export const useAdmin = () => useContext(AdminContext)

const UNSAVED = 'You have unsaved changes. Leave without saving?'

export default function AdminLayout({ user, children }) {
  const { pathname } = useLocation()
  const { overrides } = useContentStore()
  const [open, setOpen] = useState(false)
  const [newCount, setNewCount] = useState(0)
  const dirty = useRef(false)

  const refreshNewCount = useCallback(async () => {
    const { count } = await supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new')
    setNewCount(count ?? 0)
  }, [])

  useEffect(() => {
    refreshNewCount()
  }, [refreshNewCount])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const warn = (e) => {
      if (!dirty.current) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [])

  const setDirty = useCallback((value) => {
    dirty.current = value
  }, [])

  const guard = (e) => {
    if (dirty.current && !window.confirm(UNSAVED)) e.preventDefault()
    else dirty.current = false
  }

  const link = ({ isActive }) =>
    `flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-sm transition ${
      isActive ? 'bg-forest text-cream' : 'text-ink hover:bg-sand'
    }`

  const nav = (
    <nav className="space-y-6 p-4">
      <NavLink to="/admin/inquiries" onClick={guard} className={link}>
        <span>Enquiries</span>
        {newCount > 0 && <Badge tone="gold">{newCount} new</Badge>}
      </NavLink>

      {GROUPS.map((group) => (
        <div key={group}>
          <p className="mb-1.5 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">{group}</p>
          <ul className="space-y-0.5">
            {SECTIONS.filter((s) => s.group === group).map((s) => (
              <li key={s.id}>
                <NavLink to={`/admin/content/${s.id}`} onClick={guard} className={link}>
                  <span className="truncate">{s.name}</span>
                  {overrides[s.id] && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" title="Edited" />}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <AdminContext.Provider value={{ setDirty, refreshNewCount }}>
      <div className="min-h-screen bg-sand/60 font-sans font-normal text-ink">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-line bg-white px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setOpen((o) => !o)} className="text-forest lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <span className="truncate font-logo text-2xl text-teal">THE UNSEEN ISLAND</span>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-muted sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="hidden text-forest hover:underline sm:inline">
              View site
            </a>
            <span className="hidden max-w-[200px] truncate text-muted md:inline">{user.email}</span>
            <button onClick={() => supabase.auth.signOut()} className="text-forest hover:underline">
              Sign out
            </button>
          </div>
        </header>

        <div className="lg:flex">
          <aside
            className={`${open ? 'block' : 'hidden'} fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto border-r border-line bg-white lg:sticky lg:block lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0`}
          >
            {nav}
          </aside>
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
