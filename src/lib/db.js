import { PostgrestClient } from '@supabase/postgrest-js'

// Lightweight read/insert client for the public site; the full Supabase client is only loaded in the admin area.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when the build has no Supabase settings: the site then shows its built-in content instead of crashing.
export const db =
  url && key
    ? new PostgrestClient(`${url}/rest/v1`, { headers: { apikey: key, Authorization: `Bearer ${key}` } })
    : null

if (!db) console.warn('Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing at build time).')
