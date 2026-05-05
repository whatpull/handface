// OUT 노드별 자동 캡처된 exemplar feature + 사용자 라벨.
// 안정 발화 (winner stability) 시 use-hand-control 이 record. OutNodeOverlay 가 표시/명명.

const KEY = 'handface.out.exemplars.v1';

export interface OutExemplar {
  count: number;
  lastFeature: number[];   // 16-dim feature snapshot
  lastAt: number;
  label: string | null;    // 사용자 명명 (없으면 "Pattern #N" 으로 표시)
}

export type OutExemplars = Record<string, OutExemplar>;

const EVT = 'handface:out-exemplars-changed';

export function loadExemplars(): OutExemplars {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return (obj && typeof obj === 'object') ? obj as OutExemplars : {};
  } catch { return {}; }
}

function save(map: OutExemplars) {
  try { localStorage.setItem(KEY, JSON.stringify(map)); } catch { /* noop */ }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVT, { detail: map }));
  }
}

export function recordExemplar(outKey: string, feature: number[]): OutExemplars {
  const map = loadExemplars();
  const prev = map[outKey];
  map[outKey] = {
    count: (prev?.count || 0) + 1,
    lastFeature: feature.slice(0, 16),
    lastAt: Date.now(),
    label: prev?.label ?? null,
  };
  save(map);
  return map;
}

export function setExemplarLabel(outKey: string, label: string | null): OutExemplars {
  const map = loadExemplars();
  if (!map[outKey]) {
    map[outKey] = { count: 0, lastFeature: [], lastAt: Date.now(), label };
  } else {
    map[outKey] = { ...map[outKey], label };
  }
  save(map);
  return map;
}

export function clearExemplars() {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
  window.dispatchEvent(new CustomEvent(EVT, { detail: {} }));
}

export function subscribeExemplars(cb: (m: OutExemplars) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<OutExemplars>).detail);
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}

// OUT 키 정렬 + "Pattern #N" 자동 라벨 (count 발생 순서 기준 — discoveredOrder 별도 저장 안 하고 키 순서로 단순화).
export function displayLabel(outKey: string, ex: OutExemplar | undefined, fallbackIdx?: number): string {
  if (ex?.label) return ex.label;
  const idx = fallbackIdx ?? parseInt(outKey.replace(/\D/g, ''), 10);
  return `Pattern #${Number.isFinite(idx) ? idx + 1 : '?'}`;
}
