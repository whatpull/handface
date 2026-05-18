'use client';
import { useEffect, useState } from 'react';
import {
  supabase,
  getUser,
  signInWithGoogle,
  signOut,
  savePatternCloud,
  loadPatternCloud,
} from '@/lib/supabase';
import { loadExemplars } from '@/lib/snn/out-exemplars';
import { showToast } from '@/components/ui/Toast';
import type { SupabaseUser } from '@/lib/supabase';

export default function CloudSyncButton() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    getUser().then(setUser);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // Supabase 미설정 시 렌더 안 함
  if (!supabase) return null;

  const handleSave = async () => {
    if (!user) return;
    setSyncing(true);
    const exemplars = loadExemplars('orientation');
    const count = Object.keys(exemplars).length;
    const ok = await savePatternCloud(user.id, exemplars as Record<string, unknown>, null, count);
    setSyncing(false);
    showToast({ kind: ok ? 'success' : 'error',
      message: ok ? '클라우드에 저장됐습니다' : '저장 실패' });
  };

  const handleLoad = async () => {
    if (!user) return;
    setSyncing(true);
    const data = await loadPatternCloud(user.id);
    setSyncing(false);
    if (data) {
      showToast({ kind: 'success', message: `${data.pattern_count}개 패턴을 불러왔습니다` });
    }
  };

  if (!user) {
    return (
      <button
        type="button"
        onClick={signInWithGoogle}
        className="flex items-center gap-1.5 rounded border border-[#2a2a38] bg-[#18181f] px-3 py-1.5 text-xs text-[#8888aa] hover:text-white hover:border-violet-700 transition-colors"
        title="Google로 로그인하면 패턴이 클라우드에 저장됩니다"
      >
        &#9729; 클라우드 동기화
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#8888aa]">{user.email?.split('@')[0]}</span>
      <button
        type="button"
        onClick={handleSave}
        disabled={syncing}
        className="rounded border border-violet-800 bg-violet-950/30 px-2 py-1 text-xs text-violet-300 hover:bg-violet-900/40 disabled:opacity-50"
      >
        {syncing ? '…' : '↑ 저장'}
      </button>
      <button
        type="button"
        onClick={handleLoad}
        disabled={syncing}
        className="rounded border border-[#2a2a38] px-2 py-1 text-xs text-[#8888aa] hover:text-white disabled:opacity-50"
      >
        ↓ 불러오기
      </button>
      <button
        type="button"
        onClick={signOut}
        className="text-xs text-[#4a4a5a] hover:text-red-400"
      >
        로그아웃
      </button>
    </div>
  );
}
