import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

// Bypassing the error for local development if variables are missing
// if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//   console.warn('Missing Supabase environment variables. Using dummy values for UI development.');
// }

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }
