import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: {
      getItem: (key) => {
        // Try to get from localStorage first
        if (typeof window !== 'undefined') {
          const value = localStorage.getItem(key)
          if (value) {
            // Also set as cookie for middleware
            document.cookie = `${key}=${value}; path=/; secure; samesite=lax`
            return value
          }
        }
        // Fallback to cookies
        const cookies = document.cookie.split(';')
        const cookie = cookies.find(c => c.trim().startsWith(`${key}=`))
        return cookie ? cookie.split('=')[1] : null
      },
      setItem: (key, value) => {
        // Store in both localStorage and cookies
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, value)
          document.cookie = `${key}=${value}; path=/; secure; samesite=lax`
        }
      },
      removeItem: (key) => {
        // Remove from both localStorage and cookies
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key)
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        }
      }
    }
  }
})