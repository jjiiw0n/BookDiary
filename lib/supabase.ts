import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

// 클라이언트 사이드나 실제 런타임에서만 경고를 표시하고, 빌드 타임의 정적 분석 시에는 치명적 오류를 막음
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('Supabase URL or Publishable Key is missing. Check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
