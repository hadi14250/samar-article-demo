import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const configured = supabaseUrl && supabaseAnonKey

// Safe client — if credentials are missing we create a dummy client that
// never makes real network calls. All lib/articles.js functions catch errors
// and fall back to static data, so the site always renders.
export const supabase = configured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder')

export const isSupabaseConfigured = configured
