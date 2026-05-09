'use client';
// Engine mode — root /handface/ 5-node 파이프라인의 학습/추론 실행 엔진 선택.
//
// 사용자 catch 2026-05-09 (Live 5차 — case B moderate): batch path 폐기.
//   'backend' → HF Spaces FastAPI (rev15 batch path — 학술 검증 path 정합 보존).
//   'live'    → 항상 동작 SNN, STDP on, 즉시 학습+추론 (SNN 본질 정합).
//              자동 local TS runtime 사용 (backend round-trip 영역 continuous
//              loop 부적합).
//
// 직전 'local' batch mode 영역 폐기 — /snn-lab 영역 폐기 영역 정합.
// 직전 localStorage 영역 'local' 영역 backward-compat 영역 'backend' fallback.
//
// localStorage persist — 새로고침 후에도 같은 모드 유지.

import { useEffect, useState } from 'react';

export type EngineMode = 'backend' | 'live';

const STORAGE_KEY = 'handface.engine-mode';

function readMode(): EngineMode {
  // SSR 시점 영역 default 'live' — Live 모드 영역 사용자 명시 default 정합.
  if (typeof window === 'undefined') return 'live';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'backend' || v === 'live') return v;
    // 직전 'local' mode 영역 storage 영역 backward-compat — 학술 검증 path
    // 정합 영역 'backend' 영역 fallback (사용자 catch 2026-05-09).
    if (v === 'local') return 'backend';
  } catch {
    // localStorage 차단 (SSR / private mode) — 무시.
  }
  return 'live';
}

function writeMode(m: EngineMode): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, m);
  } catch {
    // ignore.
  }
}

const CHANGE_EVENT = 'handface.engine-mode-changed';

// global emit/subscribe — Toolbar 의 토글 변경을 NodeLearn 등 listener 에
// 즉시 broadcast (props drilling 없음).
export function setEngineMode(mode: EngineMode): void {
  writeMode(mode);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: mode }));
  }
}

export function getEngineMode(): EngineMode {
  return readMode();
}

// React hook — 현재 모드 + setter. localStorage / cross-tab 동기화 정합.
export function useEngineMode(): [EngineMode, (m: EngineMode) => void] {
  const [mode, setMode] = useState<EngineMode>(() => readMode());

  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<EngineMode>).detail;
      if (detail === 'backend' || detail === 'live') setMode(detail);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setMode(readMode());
    };
    window.addEventListener(CHANGE_EVENT, onChange as EventListener);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const set = (m: EngineMode) => {
    setMode(m);
    setEngineMode(m);
  };

  return [mode, set];
}
