// 각 gesture 의 학습 누적 횟수 (localStorage) — UI 배지 표시용.

const KEY = 'handface.train.counts.v1';

export type TrainCounts = Record<string, number>;

export function loadTrainCounts(): TrainCounts {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return (obj && typeof obj === 'object') ? obj as TrainCounts : {};
  } catch { return {}; }
}

export function incrementTrainCount(gestureId: string): TrainCounts {
  const counts = loadTrainCounts();
  counts[gestureId] = (counts[gestureId] || 0) + 1;
  try {
    localStorage.setItem(KEY, JSON.stringify(counts));
  } catch { /* noop */ }
  // 다른 컴포넌트에 알림 (custom event).
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('handface:train-counts-changed', { detail: counts }));
  }
  return counts;
}

export function clearTrainCounts() {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
  window.dispatchEvent(new CustomEvent('handface:train-counts-changed', { detail: {} }));
}

// React 외부 mutable state — useEffect 로 구독 + state 동기.
export function subscribeTrainCounts(cb: (counts: TrainCounts) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<TrainCounts>).detail);
  window.addEventListener('handface:train-counts-changed', handler);
  return () => window.removeEventListener('handface:train-counts-changed', handler);
}

// 컴포넌트 hook — 마운트 시 load + 구독.
export function useTrainCounts(): TrainCounts {
  // dynamic import 회피 위해 이 파일에 두되, React import 는 caller 가 책임.
  // 사용처: const counts = useTrainCounts();  →  counts[gestureId]
  return loadTrainCounts();  // 기본 호출. 실제 reactive sync 는 컴포넌트의 useEffect 에서.
}
