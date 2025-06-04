import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client-side Supabase client (singleton pattern)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client
export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}
