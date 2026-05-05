// 클라이언트 → UI 발화/학습 이벤트 버스. EventTarget 기반.
// Canvas 가 'neuron-firing' 구독 → fired class + synapse pulse 토글.

export type BackendEventType = 'neuron-firing' | 'circuit-changed' | 'training-changed' | 'hand-feature' | 'rstdp-pulse';

export interface RStdpPulseDetail {
  ok: boolean;
  reason?: string;
  rewardStrength: number;
  positiveOnly: boolean;
  synapsesAmplified?: number;
  totalAmplifiedDelta?: number;
}

export interface HandFeatureDetail {
  feature: number[];          // 16-dim (smoothed)
  raw: number[];              // 16-dim (unsmoothed)
  hasHand: boolean;
  // MediaPipe GestureRecognizer 라벨 — supervised STDP 의 teacher signal.
  // categoryName 예: 'Pointing_Up' / 'Open_Palm' / 'Closed_Fist' / 'Victory' /
  //                  'Thumb_Up' / 'Thumb_Down' / 'ILoveYou' / 'None' / null.
  gestureName?: string | null;
  gestureScore?: number;      // 0..1 confidence
}

export interface NeuronFiringDetail {
  gesture?: string;
  intensity?: number;
  rates?: Record<string, number>;
  rates_by_region?: Record<string, number>;
  active_neurons_by_region?: Record<string, string[]>;
  out_rates?: Record<string, number>;
  // 전체 시냅스 weight (backward compat — `?synapses_full=true` 또는 누락 시 빈 배열).
  // 기본 응답에서는 비어있거나 누락. Δw 계산은 `synapses_changed` 우선 사용.
  synapses?: Array<{ pre: string; post: string; weight: number }>;
  // Backend delta-only 페이로드 (commit 443e48f 이후 default). |Δw|≥threshold 변경분만.
  // delta = current - previous (backend cache 기준). frontend 자체 cache 비교 불필요.
  synapses_changed?: Array<{ pre: string; post: string; weight: number; delta: number }>;
}

export interface BackendEvent<T = unknown> extends CustomEvent<T> {
  type: BackendEventType;
}

const bus = typeof window !== 'undefined' ? new EventTarget() : null;

export function emitBackendEvent<T>(type: BackendEventType, detail: T) {
  if (!bus) return;
  bus.dispatchEvent(new CustomEvent(type, { detail }) as BackendEvent<T>);
}

export function onBackendEvent<T>(
  type: BackendEventType,
  handler: (detail: T) => void,
): () => void {
  if (!bus) return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<T>).detail);
  bus.addEventListener(type, listener);
  return () => bus.removeEventListener(type, listener);
}
