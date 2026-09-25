import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { db } from '../lib/db.js'
import { SECTION_BY_ID } from './sections.js'

const CACHE_KEY = 'tui-content-v1'
// How long a first-time visitor waits for edited content before the built-in defaults are shown.
const FIRST_LOAD_TIMEOUT = 2000

const ContentContext = createContext(null)

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY))
  } catch {
    return null
  }
}

function writeCache(value) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode); the site still works without the cache.
  }
}

export function ContentProvider({ children }) {
  const [cached] = useState(readCache)
  const [overrides, setOverrides] = useState(cached ?? {})
  const [ready, setReady] = useState(cached !== null)

  useEffect(() => {
    if (!db) {
      setReady(true)
      return
    }
    let active = true
    const timer = setTimeout(() => setReady(true), FIRST_LOAD_TIMEOUT)
    db.from('site_content')
      .select('id, data')
      .then(({ data, error }) => {
        if (!active) return
        clearTimeout(timer)
        if (!error) {
          const map = Object.fromEntries(data.map((row) => [row.id, row.data]))
          setOverrides(map)
          writeCache(map)
        }
        setReady(true)
      })
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  const setSection = useCallback((id, data) => {
    setOverrides((prev) => {
      const next = { ...prev }
      if (data && Object.keys(data).length) next[id] = data
      else delete next[id]
      writeCache(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ overrides, ready, setSection }), [overrides, ready, setSection])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContentStore() {
  return useContext(ContentContext)
}

export function mergeSection(id, override) {
  return { ...SECTION_BY_ID[id].defaults, ...override }
}

// Built-in content for a section with any admin edits applied on top.
export function useSection(id) {
  const override = useContext(ContentContext).overrides[id]
  return useMemo(() => mergeSection(id, override), [id, override])
}

export const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`

// wa.me opens the WhatsApp app on phones and WhatsApp Web on desktop, with `text` typed in ready to send.
export const waHref = (number, text) => `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`
