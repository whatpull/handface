'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getOrCreateDeviceId, saveBackup, loadBackup } from '@/lib/cloud-backup';
import { loadExemplars, setExemplarLabel } from '@/lib/snn/out-exemplars';
import { showToast } from '@/components/ui/Toast';

// UX P3-4 (2026-05-20): lastSaved persist — page reload 후 사라짐 회피.
// ISO 시각 string localStorage 저장 → mount 시 hydrate + 표시 시점 ko-KR 시각
// 변환. SSR safe — useEffect mount 내부 only.
const LAST_SAVED_KEY = 'handface.cloud-sync.last-saved';

export default function CloudSyncButton() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'loading' | 'saved'>('idle');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const [showRestore, setShowRestore] = useState(false);
  const [restoreCode, setRestoreCode] = useState('');

  // UX P0 fix (2026-05-20): WCAG 2.1.2 — popover 영역 Escape + outside-click +
  // role 영역 mandatory. modal 0 영역 aria-modal="false" + role="dialog" path.
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const restoreInputRef = useRef<HTMLInputElement | null>(null);
  const restoreToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setDeviceId(getOrCreateDeviceId());
    // UX P3-4: lastSaved hydrate — localStorage ISO string → ko-KR 시각 표시.
    // 저장 시점 동일 'saved' status path 사용 (handleSave 영역 setStatus('saved')
    // 이후 영역 렌더링 정합) — mount 시점 영역 'idle' 영역 표시 0 path,
    // 저장 status 영역 사용자 명시 진입 영역 정합 위해 status 영역 미변경.
    try {
      const iso = window.localStorage.getItem(LAST_SAVED_KEY);
      if (iso) {
        const d = new Date(iso);
        if (!Number.isNaN(d.getTime())) {
          setLastSaved(d.toLocaleTimeString('ko-KR'));
          setStatus('saved');
        }
      }
    } catch {
      // localStorage unavailable (private mode) — silent fallback.
    }
  }, []);

  // Popover open: initial focus → restore input. Escape key 영역 close +
  // focus restore → toggle button (WCAG 2.4.3). UX P0-followup (2026-05-20):
  // Tab focus trap (Fix 3) 추가 — popover 영역 modal 0 영역 단 keyboard
  // user 영역 popover 외부 escape 시점 영역 회로 복귀 회피 영역 정합.
  useEffect(() => {
    if (!showRestore) return;
    const raf = window.requestAnimationFrame(() => {
      restoreInputRef.current?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (e.isComposing) return;
        e.preventDefault();
        setShowRestore(false);
        restoreToggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab') {
        const root = popoverRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !root.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [showRestore]);

  // Outside-click handler — mousedown 영역 popover ref 외부 영역 시점 영역
  // close. mousedown event path — click event 영역 outside-handler 영역 race
  // condition 회피 (showToast 영역 ToastProvider 정합).
  useEffect(() => {
    if (!showRestore) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      // popover 자체 + toggle 버튼 외부 path → close.
      if (popoverRef.current?.contains(target)) return;
      if (restoreToggleRef.current?.contains(target)) return;
      // UX P0-followup (2026-05-20): outside-click 영역 focus restore
      // (Fix 4 path 1/3) — WCAG 2.4.3 focus 영역 body drop 회피.
      setShowRestore(false);
      restoreToggleRef.current?.focus();
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [showRestore]);

  const handleSave = useCallback(async () => {
    setStatus('saving');
    const exemplars = loadExemplars('orientation');
    const count = Object.keys(exemplars).length;
    if (count === 0) {
      showToast({ kind: 'warning', message: '저장할 패턴이 없습니다' });
      setStatus('idle');
      return;
    }
    const ok = await saveBackup(exemplars as Record<string, unknown>, count);
    setStatus(ok ? 'saved' : 'idle');
    if (ok) {
      const now = new Date();
      setLastSaved(now.toLocaleTimeString('ko-KR'));
      // UX P3-4: persist ISO string → 다음 mount 영역 hydrate path.
      try {
        window.localStorage.setItem(LAST_SAVED_KEY, now.toISOString());
      } catch {
        // localStorage unavailable — display still updates (in-memory).
      }
      showToast({ kind: 'success', message: `${count}개 패턴을 클라우드에 저장했습니다` });
    } else {
      showToast({ kind: 'error', message: '저장 실패 — 네트워크를 확인하세요' });
    }
  }, []);

  const handleRestore = useCallback(async () => {
    const id = restoreCode.trim() || deviceId;
    setStatus('loading');
    const result = await loadBackup(id);
    setStatus('idle');
    if (!result?.found) {
      showToast({ kind: 'warning', message: '백업 데이터를 찾을 수 없습니다' });
      return;
    }
    // exemplars 복원 — outKey 를 그대로 전달 (setExemplarLabel(outKey, substrate, label))
    if (result.exemplars) {
      Object.entries(result.exemplars).forEach(([outKey, val]) => {
        const label = (val as { label?: string }).label ?? null;
        setExemplarLabel(outKey, 'orientation', label);
      });
    }
    showToast({ kind: 'success', message: `${result.patternCount}개 패턴을 불러왔습니다` });
    // UX P0-followup (2026-05-20): restore 성공 영역 focus restore
    // (Fix 4 path 2/3) — toggle button 영역 focus 복귀.
    setShowRestore(false);
    restoreToggleRef.current?.focus();
  }, [deviceId, restoreCode]);

  return (
    <div className="relative flex items-center gap-2">
      {/* 저장 버튼. UX P0-followup (2026-05-20): focus-visible ring (Fix 5). */}
      <button
        type="button"
        onClick={handleSave}
        disabled={status === 'saving'}
        title={`기기 ID: ${deviceId}`}
        className="flex items-center gap-1.5 rounded border border-[#2a2a38] bg-[#18181f] px-3 py-1.5 text-xs text-[#8888aa] hover:text-white hover:border-violet-700 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
      >
        {status === 'saving' ? '저장 중…' : status === 'saved' ? `저장됨 ${lastSaved ?? ''}` : '백업'}
      </button>

      {/* 복원 버튼. UX P0-followup (2026-05-20): focus-visible ring (Fix 5). */}
      <button
        ref={restoreToggleRef}
        type="button"
        onClick={() => setShowRestore(v => !v)}
        aria-expanded={showRestore ? 'true' : 'false'}
        aria-haspopup="dialog"
        className="rounded border border-[#2a2a38] px-2 py-1.5 text-xs text-[#8888aa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
        title="다른 기기에서 패턴 불러오기"
      >
        복원
      </button>

      {/* 복원 입력창 — popover (modal 0). WCAG 2.1.2 — Escape + outside-click +
          Tab trap. UX P0-followup (2026-05-20): role 영역 region 영역 강등
          (Fix 6) — aria-modal="false" + role="dialog" 영역 ARIA spec 모순
          영역 정정. modal 0 영역 region 영역 semantic 정합. */}
      {showRestore && (
        <div
          ref={popoverRef}
          role="region"
          aria-label="복원 옵션"
          className="absolute top-8 right-0 z-[var(--z-popover)] rounded-lg border border-[#2a2a38] bg-[#18181f] p-3 shadow-xl w-64"
        >
          <p className="text-xs text-[#8888aa] mb-2">기기 ID를 입력하거나 비워두면 현재 기기 백업을 불러옵니다</p>
          <input
            ref={restoreInputRef}
            value={restoreCode}
            onChange={e => setRestoreCode(e.target.value)}
            placeholder={deviceId.slice(0, 16) + '…'}
            aria-label="복원할 기기 ID"
            className="w-full rounded border border-[#2a2a38] bg-[#0f0f13] px-2 py-1.5 text-xs text-white placeholder-[#4a4a5a] outline-none focus:border-violet-600 focus-visible:ring-2 focus-visible:ring-violet-300/60 mb-2"
          />
          <div className="flex gap-2">
            {/* UX P0-followup (2026-05-20): focus-visible ring (Fix 5). */}
            <button type="button" onClick={handleRestore} disabled={status === 'loading'}
              className="flex-1 rounded bg-violet-700 py-1.5 text-xs text-white hover:bg-violet-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60">
              {status === 'loading' ? '불러오는 중…' : '불러오기'}
            </button>
            {/* UX P0-followup (2026-05-20): 취소 영역 focus restore
                (Fix 4 path 3/3) + focus-visible ring (Fix 5). */}
            <button type="button" onClick={() => { setShowRestore(false); restoreToggleRef.current?.focus(); }}
              className="px-3 rounded border border-[#2a2a38] text-xs text-[#8888aa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60">
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
