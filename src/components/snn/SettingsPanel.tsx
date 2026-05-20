'use client';

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { emitBackendEvent } from '@/lib/backend/events';
import {
  loadBackendSettings, normalizeEndpoint, saveBackendSettings,
} from '@/lib/backend/settings';
import { showToast } from '@/components/ui/Toast';

// UX P2-3 (2026-05-20): onboarding revisit — localStorage key 영역 Editor.tsx
// 영역 정합. 신규 사용자 학습 toast 영역 1회 노출 후 영구 미노출 영역 정정.
const ONBOARDING_SEEN_KEY = 'handface.onboarding-seen';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  // UX Polish PR1 Fix 2 (HIGH [H1], 2026-05-09): 한국어 status 일관 정합.
  const [status, setStatus] = useState('미시험');

  // UX P0 fix (2026-05-20): WCAG 2.1.2 — Escape key + Tab focus trap + initial
  // focus 영역 dialog mandatory. Dialog.tsx 영역 generic system 영역 form
  // lifecycle + status state 영역 보존 mandatory path 영역 직접 구현 path.
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const s = loadBackendSettings();
    setEndpoint(s.endpoint);
    setApiKey(s.apiKey);
  }, []);

  // Mount: previously-focused element catch + initial focus → endpoint input.
  // Unmount: focus restore (WCAG 2.4.3 Focus Order).
  useEffect(() => {
    if (!open) return;
    if (typeof document !== 'undefined') {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    const raf = window.requestAnimationFrame(() => {
      firstFieldRef.current?.focus();
      firstFieldRef.current?.select();
    });
    return () => {
      window.cancelAnimationFrame(raf);
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function' && document.contains(prev)) {
        try { prev.focus(); } catch { /* ignore */ }
      }
    };
  }, [open]);

  // Keyboard: Escape close + Tab focus trap. IME composition (한국어 입력 중)
  // 영역 Escape skip — Dialog.tsx 영역 정합.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (e.isComposing) return;
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        // UX P0-followup (2026-05-20): selector 영역 textarea/select 추가
        // (Fix 2) — 향후 form field 확장 영역 trap escape 회피.
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
          // UX P0-followup (2026-05-20): forward Tab 영역 symmetric guard
          // (Fix 1) — focus 영역 dialog 외부 시점 영역 trap 정합.
          if (active === last || !root.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const save = async () => {
    const url = normalizeEndpoint(endpoint);
    if (url !== endpoint) setEndpoint(url);
    saveBackendSettings({ endpoint: url, apiKey });
    getClient().setSettings(url, apiKey);
    // 연결 성공 검증 → 성공 시 캔버스에 회로 갱신 신호.
    setStatus(`저장됨 (${url}) — 시험 중…`);
    const r = await getClient().health();
    if (r.ok) {
      // UX P3-5 (2026-05-20): status copy 한국어 톤 정합 — ✓ / ✗ symbol 제거,
      // "성공:" / "오류:" Korean prefix 정합 (Toast kind 톤 정합).
      setStatus(`성공: 저장 + 연결 완료 (${url})`);
      // Canvas remount → 새 endpoint 의 회로 로드.
      emitBackendEvent('circuit-changed', {});
    } else {
      setStatus(`저장됨. 연결 실패: ${r.reason}`);
    }
  };

  const test = async () => {
    setStatus('시험 중…');
    const url = normalizeEndpoint(endpoint);
    if (url !== endpoint) setEndpoint(url);
    const client = getClient();
    client.setSettings(url, apiKey);
    const r = await client.health();
    if (r.ok) {
      // UX P3-5: ✓ symbol 제거 → "연결 성공:" Korean prefix.
      setStatus(`연결 성공: ${url}`);
      emitBackendEvent('circuit-changed', {});
    } else {
      // UX P3-5: ✗ symbol 제거 → "연결 실패:" Korean prefix.
      setStatus(`연결 실패: ${r.reason}`);
    }
  };

  // UX P2-3: 도움말 다시 보기 — localStorage 영역 onboarding-seen flag 제거 +
  // toast 즉시 재노출. page reload 없음 — UX 영역 smoother.
  const replayOnboarding = () => {
    try {
      window.localStorage.removeItem(ONBOARDING_SEEN_KEY);
    } catch {
      // localStorage unavailable (e.g. private mode) — toast 영역 여전히 노출.
    }
    showToast({
      kind: 'info',
      message: 'Live 모드 — GRID 패턴을 그리면 즉시 학습이 시작됩니다.',
      duration: 7000,
    });
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[var(--z-popover)] flex items-start justify-end bg-black/40" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="설정"
        className="m-4 w-[360px] max-w-full rounded border border-white/10 bg-[#0f1117] p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-violet-300">설정</span>
          <button
            type="button"
            aria-label="설정 닫기"
            onClick={onClose}
            className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/50">엔드포인트</span>
            <input
              ref={firstFieldRef}
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm text-white outline-none focus:border-violet-400/50 focus-visible:ring-2 focus-visible:ring-violet-300/60"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/50">
              API 키 (NEURONFACE_API_KEY)
            </span>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="new-password"
              spellCheck={false}
              placeholder="NEURONFACE_API_KEY"
              className="w-full rounded border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm text-white outline-none focus:border-violet-400/50 focus-visible:ring-2 focus-visible:ring-violet-300/60"
            />
            {/* 사용자 catch 2026-05-09 (401 fix): 백엔드 영역 NEURONFACE_API_KEY 영역
                set 영역 401 silent — placeholder hint 영역 사용자 명시. Backend 모드
                영역 사용 시 mandatory. Live 모드 영역 backend 호출 0 영역 unused. */}
            <span className="mt-1 block text-[10px] text-white/40">
              Backend 모드 사용 시 입력 필수 — Live 모드는 빈 값 가능
            </span>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              className="flex-1 rounded bg-violet-500/20 px-3 py-2 min-h-[40px] text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
            >
              저장
            </button>
            <button
              type="button"
              onClick={test}
              className="flex-1 rounded bg-white/5 px-3 py-2 min-h-[40px] text-xs text-white/80 ring-1 ring-white/10 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
            >
              연결 시험
            </button>
          </div>
          <div className="break-all text-[11px] font-mono text-white/50">{status}</div>
          {/* UX P2-3: 도움말 다시 보기 — onboarding toast 영역 재노출 path. */}
          <div className="pt-2 border-t border-white/5">
            <span className="mb-2 block text-[11px] uppercase tracking-wider text-white/50">도움말</span>
            <button
              type="button"
              onClick={replayOnboarding}
              className="w-full rounded bg-white/5 px-3 py-2 min-h-[40px] text-xs text-white/80 ring-1 ring-white/10 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
            >
              온보딩 안내 다시 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
