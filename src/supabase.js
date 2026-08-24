import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,   // 로그인 세션을 브라우저(localStorage)에 계속 유지 (기본값: true)
    autoRefreshToken: true, // 토큰 만료 전 자동으로 갱신 (기본값: true)
  },
})