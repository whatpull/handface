'use client';
// Engine mode — root /handface/ 5-node 파이프라인의 학습/추론 실행 엔진 선택.
//
// 'backend'  → 기존 HF Spaces FastAPI (rev15 검증된 path). default.
// 'local'    → 브라우저 내 TS SNN runtime (Phase C1~C5c). 백엔드 의존 0.
//
// 사용자 명시 (2026-05-09): 새 UI 페이지/라우트 금지 — root /handface/ 의
// 업그레이드만. 본 모듈은 토글 1 개로 두 엔진 swap 가능하게 함.
//
// localStorage persist — 새로고침 후에도 같은 모드 유지.

import { useEffect, useState } from 'react';

// 사용자 catch 2026-05-09 (A: Live 모드 본격 pivot): 'live' 추가.
//   'backend' → HF Spaces FastAPI (rev15 batch path).
//   'local'   → 브라우저 TS runtime (batch, /snn-lab 정합).
//   'live'    → 항상 동작 SNN, STDP on, 즉시 학습+추론 (SNN 본질 정합).
//              자동 local 엔진 사용 (backend round-trip 영역 continuous loop 부적합).
export type EngineMode = 'backend' | 'local' | 'live';

const STORAGE_KEY = 'handface.engine-mode';

function readMode(): EngineMode {
  if (typeof window === 'undefined') return 'backend';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'backend' || v === 'local' || v === 'live') return v;
  } catch {
    // localStorage 차단 (SSR / private mode) — 무시.
  }
  return 'backend';
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
      if (detail === 'backend' || detail === 'local' || detail === 'live') setMode(detail);
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
