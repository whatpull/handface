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

// React import removed — hook simplified to static 'live' return.

export type EngineMode = 'backend' | 'live';

const STORAGE_KEY = 'handface.engine-mode';
const MIGRATION_KEY = 'handface.migration.live5';
// PR #187 polish — SEC-1/SEC-2 (audit 2026-05-10): LLM 폐기 (commit 5e9082a) 후
// 사용자 직전 입력 secret API key 영역 storage 영영 잔존 — 영구 wipe + positions
// v1/v2 영역 quota leak 방지. idempotent (별도 MIGRATION_KEY mark — live5 와 분리,
// 신규 사용자 영역 retro-active 정합).
const LLM_REMOVAL_MIGRATION_KEY = 'handface.migration.llm-removal-187';

// Live 5차 (2026-05-09): 직전 useLocalSnn 영역 'snn-lab-default' netId snapshot
// 영역 storage 영역 잔존 — quota 부담 (특히 weight blob). 1회 cleanup —
// idempotent 정합 (MIGRATION_KEY mark).
function migrateLegacyStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(MIGRATION_KEY) === '1') return;
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith('snn.snapshot.snn-lab-default')) keys.push(k);
    }
    for (const k of keys) {
      window.localStorage.removeItem(k);
    }
    window.localStorage.setItem(MIGRATION_KEY, '1');
  } catch {
    // localStorage 차단 — 무시 (다음 mount 영역 retry).
  }
}

// PR #187 polish — SEC-1/SEC-2: LLM secret + legacy positions wipe.
// SEC-1: 사용자 직전 입력 OpenAI/Anthropic API key 영역 영구 삭제 (security
//        hygiene — LLM path 폐기 후 storage 잔존 영역 누설 risk).
// SEC-2: 직전 v1/v2 positions snapshot 영역 wipe — v3 영역 정합 (quota 정리).
// 정합: idempotent — MIGRATION_KEY mark 후 다음 mount no-op.
function migrateLlmRemovalStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(LLM_REMOVAL_MIGRATION_KEY) === '1') return;
    // SEC-1 — LLM key/endpoint/auto-flag wipe.
    window.localStorage.removeItem('handface.llm.endpoint');
    window.localStorage.removeItem('handface.llm.apikey');
    window.localStorage.removeItem('handface.llm.auto');
    // SEC-2 — legacy positions v1/v2 wipe (현 active key: positions.v3).
    window.localStorage.removeItem('handface.pipeline.positions.v1');
    window.localStorage.removeItem('handface.pipeline.positions.v2');
    window.localStorage.setItem(LLM_REMOVAL_MIGRATION_KEY, '1');
  } catch {
    // localStorage 차단 — 무시 (다음 mount 영역 retry).
  }
}

function readMode(): EngineMode {
  // SSR 시점 영역 default 'live' — Live 모드 영역 사용자 명시 default 정합.
  if (typeof window === 'undefined') return 'live';
  // 첫 readMode 호출 영역 legacy snapshot cleanup — idempotent.
  migrateLegacyStorage();
  // PR #187 polish — SEC-1/SEC-2: LLM secret + legacy positions wipe (idempotent).
  migrateLlmRemovalStorage();
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

// React hook — 항상 'live' 고정 반환. Backend 토글 UI 제거에 따라 단순화.
// hook 시그니처 유지 (호출자 타입 변경 없음).
export function useEngineMode(): [EngineMode, (m: EngineMode) => void] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const noop = (_m: EngineMode) => { /* live 고정 — setter no-op */ };
  return ['live', noop];
}
