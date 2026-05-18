import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = SUPABASE_URL
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

export type SupabaseUser = { id: string; email?: string; };

export async function getUser(): Promise<SupabaseUser | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ? { id: data.user.id, email: data.user.email } : null;
}

export async function signInWithGoogle() {
  if (!supabase) return;
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

// 패턴 저장
export async function savePatternCloud(
  userId: string,
  exemplars: Record<string, unknown>,
  weightData: unknown,
  patternCount: number,
) {
  if (!supabase) return false;
  const { error } = await supabase
    .from('pattern_snapshots')
    .upsert({
      user_id: userId,
      device_name: '기본 기기',
      exemplars,
      weight_data: weightData,
      pattern_count: patternCount,
    }, { onConflict: 'user_id,device_name' });
  return !error;
}

// 패턴 불러오기
export async function loadPatternCloud(userId: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from('pattern_snapshots')
    .select('*')
    .eq('user_id', userId)
    .eq('device_name', '기본 기기')
    .single();
  return data;
}
