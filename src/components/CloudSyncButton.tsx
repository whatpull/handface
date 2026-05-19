'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getOrCreateDeviceId, saveBackup, loadBackup } from '@/lib/cloud-backup';
import { loadExemplars, setExemplarLabel } from '@/lib/snn/out-exemplars';
import { showToast } from '@/components/ui/Toast';

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
  }, []);

  // Popover open: initial focus → restore input. Escape key 영역 close +
  // focus restore → toggle button (WCAG 2.4.3).
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
      setShowRestore(false);
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
      setLastSaved(new Date().toLocaleTimeString('ko-KR'));
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
    setShowRestore(false);
  }, [deviceId, restoreCode]);

  return (
    <div className="relative flex items-center gap-2">
      {/* 저장 버튼 */}
      <button
        type="button"
        onClick={handleSave}
        disabled={status === 'saving'}
        title={`기기 ID: ${deviceId}`}
        className="flex items-center gap-1.5 rounded border border-[#2a2a38] bg-[#18181f] px-3 py-1.5 text-xs text-[#8888aa] hover:text-white hover:border-violet-700 transition-colors disabled:opacity-50"
      >
        {status === 'saving' ? '저장 중…' : status === 'saved' ? `저장됨 ${lastSaved ?? ''}` : '백업'}
      </button>

      {/* 복원 버튼 */}
      <button
        ref={restoreToggleRef}
        type="button"
        onClick={() => setShowRestore(v => !v)}
        aria-expanded={showRestore ? 'true' : 'false'}
        aria-haspopup="dialog"
        className="rounded border border-[#2a2a38] px-2 py-1.5 text-xs text-[#8888aa] hover:text-white transition-colors"
        title="다른 기기에서 패턴 불러오기"
      >
        복원
      </button>

      {/* 복원 입력창 — popover (modal 0). WCAG 2.1.2 — Escape + outside-click. */}
      {showRestore && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label="복원 옵션"
          className="absolute top-8 right-0 z-50 rounded-lg border border-[#2a2a38] bg-[#18181f] p-3 shadow-xl w-64"
        >
          <p className="text-xs text-[#8888aa] mb-2">기기 ID를 입력하거나 비워두면 현재 기기 백업을 불러옵니다</p>
          <input
            ref={restoreInputRef}
            value={restoreCode}
            onChange={e => setRestoreCode(e.target.value)}
            placeholder={deviceId.slice(0, 16) + '…'}
            aria-label="복원할 기기 ID"
            className="w-full rounded border border-[#2a2a38] bg-[#0f0f13] px-2 py-1.5 text-xs text-white placeholder-[#4a4a5a] outline-none focus:border-violet-600 mb-2"
          />
          <div className="flex gap-2">
            <button type="button" onClick={handleRestore} disabled={status === 'loading'}
              className="flex-1 rounded bg-violet-700 py-1.5 text-xs text-white hover:bg-violet-600 disabled:opacity-50">
              {status === 'loading' ? '불러오는 중…' : '불러오기'}
            </button>
            <button type="button" onClick={() => setShowRestore(false)}
              className="px-3 rounded border border-[#2a2a38] text-xs text-[#8888aa]">
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
