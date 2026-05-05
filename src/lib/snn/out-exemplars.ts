// OUT 노드별 사용자 라벨 영구 저장.
// NodeOut 영역 RenameButton (winner cluster 영역 표시 + 사용자 명명) 영역만 사용 사실 —
// recordExemplar / clearExemplars / displayLabel 폐기 (caller 0, dead code sweep).

const KEY = 'handface.out.exemplars.v1';

export interface OutExemplar {
  count: number;
  lastFeature: number[];   // 16-dim feature snapshot (legacy 저장 path 영역 보존)
  lastAt: number;
  label: string | null;    // 사용자 명명
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

export function subscribeExemplars(cb: (m: OutExemplars) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<OutExemplars>).detail);
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}
