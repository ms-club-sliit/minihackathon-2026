import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Bypassing the error for local development if variables are missing
// if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//   console.warn('Missing Supabase environment variables. Using dummy values for UI development.');
// }

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }
