import { PostgrestClient } from '@supabase/postgrest-js'

// Lightweight read/insert client for the public site; the full Supabase client is only loaded in the admin area.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const db = new PostgrestClient(`${url}/rest/v1`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
})
