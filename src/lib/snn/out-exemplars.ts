// OUT 노드별 사용자 라벨 영구 저장 — substrate prefix 별도 store.
// NodeOut 영역 RenameButton (winner cluster 영역 표시 + 사용자 명명) 영역만 사용 사실 —
// recordExemplar / clearExemplars / displayLabel 폐기 (caller 0, dead code sweep).
//
// 사용자 catch 2026-05-09 [1]: "그리드에서 추론한 결과가 카메라 INPUT을 바꿔도
// 유지되는 현상". root cause — 단일 KEY 영역 substrate 영역 GRID/CAMERA 영역
// cluster count 영역 carry-over.
//
// 정정: KEY_PREFIX + substrate suffix 별도 store 분리.
// migration: 기존 단일 KEY 영역 1회 idempotent split — orientation 영역 default
// hydrate (사용자 직전 GRID 학습 보존).
//
// API: substrate kind 영역 명시 mandatory (caller 영역 inputMode 영역 derive 정합).

import type { SubstrateKind } from './root-local-snn';

const KEY_PREFIX = 'handface.out.exemplars.v1';
const MIGRATION_KEY = 'handface.migration.out-exemplars-substrate-split.v1';

export interface OutExemplar {
  count: number;
  lastFeature: number[];   // 16-dim feature snapshot (legacy 저장 path 영역 보존)
  lastAt: number;
  label: string | null;    // 사용자 명명
}

export type OutExemplars = Record<string, OutExemplar>;

const EVT_PREFIX = 'handface:out-exemplars-changed';

function keyFor(substrate: SubstrateKind): string {
  return `${KEY_PREFIX}.${substrate}`;
}

function evtFor(substrate: SubstrateKind): string {
  return `${EVT_PREFIX}:${substrate}`;
}

// 1회 idempotent migration — 기존 단일 KEY 영역 orientation store 영역 split.
//   orientation 영역 default hydrate (사용자 직전 GRID 학습 영역 보존)
// 정직 한계: 직전 카메라 학습 영역 사용자 영역 별도 분류 0 영역 — 본 migration 영역
// orientation 영역 default 영역 catch 영역 사용자 catch 영역 정정 본격 (주된 사용자
// path 영역 GRID 영역 정합).
function runMigrationOnce(): void {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(MIGRATION_KEY) === 'done') return;
    const legacyRaw = localStorage.getItem(KEY_PREFIX);
    if (legacyRaw) {
      const orientationKey = keyFor('orientation');
      // 직전 substrate 별도 store 영역 미존재 시점에만 hydrate (re-run 회피).
      if (!localStorage.getItem(orientationKey)) {
        localStorage.setItem(orientationKey, legacyRaw);
      }
      // legacy KEY 영역 폐기 — round 2 migration 영역 회피.
      localStorage.removeItem(KEY_PREFIX);
    }
    localStorage.setItem(MIGRATION_KEY, 'done');
  } catch {
    // quota / disabled — silent.
  }
}

export function loadExemplars(substrate: SubstrateKind): OutExemplars {
  if (typeof window === 'undefined') return {};
  runMigrationOnce();
  try {
    const raw = localStorage.getItem(keyFor(substrate));
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return (obj && typeof obj === 'object') ? obj as OutExemplars : {};
  } catch { return {}; }
}

function save(substrate: SubstrateKind, map: OutExemplars) {
  try { localStorage.setItem(keyFor(substrate), JSON.stringify(map)); } catch { /* noop */ }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(evtFor(substrate), { detail: map }));
  }
}

export function setExemplarLabel(
  outKey: string,
  substrate: SubstrateKind,
  label: string | null,
): OutExemplars {
  const map = loadExemplars(substrate);
  if (!map[outKey]) {
    map[outKey] = { count: 0, lastFeature: [], lastAt: Date.now(), label };
  } else {
    map[outKey] = { ...map[outKey], label };
  }
  save(substrate, map);
  return map;
}

// 사용자 명시 2026-05-06: INFERENCE tick winner 변경 시점 1회 호출 — OUT count ↑.
// 정직 한계: count 영역 winner 변경 횟수 (frame 횟수 0). 동일 cluster 연속 winner 영역 1회.
// feature snapshot 동봉 — legacy export JSON 호환. label 영역 보존 (사용자 rename 영역 영구).
export function incrementCount(
  outKey: string,
  substrate: SubstrateKind,
  feature?: number[],
): OutExemplars {
  const map = loadExemplars(substrate);
  const prev = map[outKey];
  map[outKey] = {
    count: (prev?.count ?? 0) + 1,
    lastFeature: feature ?? prev?.lastFeature ?? [],
    lastAt: Date.now(),
    label: prev?.label ?? null,
  };
  save(substrate, map);
  return map;
}

export function subscribeExemplars(
  substrate: SubstrateKind,
  cb: (m: OutExemplars) => void,
): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<OutExemplars>).detail);
  window.addEventListener(evtFor(substrate), handler);
  return () => window.removeEventListener(evtFor(substrate), handler);
}

// 사용자 catch 2026-05-09 [2] (Fix 5 mirror): 학습 reset button 영역 backend reset
// 후 호출 — UI exemplar count 영역 substrate 영역 별도 zero. 다른 substrate 영역
// 보존 (substrate isolation 정합).
export function clearExemplars(substrate: SubstrateKind): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(keyFor(substrate));
  } catch { /* noop */ }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(evtFor(substrate), { detail: {} }));
  }
}

/**
 * 외부에서 직렬화된 exemplar map 을 통째로 교체 저장.
 * Import JSON 복원 경로 전용 — 기존 내용을 overwrite 함.
 */
export function restoreExemplars(substrate: SubstrateKind, map: OutExemplars): void {
  save(substrate, map);
}

// P(3) 2026-05-14: cluster 개별 삭제 — ci 에 해당하는 out_{ci}_* 키 전체 제거.
// 백엔드 별도 삭제 API 없음 → 로컬 exemplar 에서만 제거. 다른 cluster 보존.
export function removeClusterExemplar(ci: number, substrate: SubstrateKind): void {
  const map = loadExemplars(substrate);
  // out_{ci}_0 ~ out_{ci}_7 (OUT_PER_CLUSTER) + legacy out_{ci} 모두 삭제.
  for (let n = 0; n < 8; n += 1) {
    delete map[`out_${ci}_${n}`];
  }
  delete map[`out_${ci}`];
  save(substrate, map);
}
