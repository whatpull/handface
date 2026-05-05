// 클라이언트 → UI 발화/학습 이벤트 버스. EventTarget 기반.
// Canvas 가 'neuron-firing' 구독 → fired class + synapse pulse 토글.

// 'training-cleared' — 명시 reset / explicit wipe path 영역만 emit (Toolbar Reset, rebuildToBaseline).
//   stored snapshot 영역 폐기 신호. 'circuit-changed' 영역 분리 — 자동 wipe 영역 폐기 (P1 fix).
// 'evolve-trigger' — Sidebar Evolve button → use-hand-control 영역 EVOLVING phase 진입 신호.
//   INFERENCE phase 영역 사용자 trigger 영역만 emit (acc636cd P2 lifelong learning path).
export type BackendEventType = 'neuron-firing' | 'circuit-changed' | 'training-changed' | 'training-cleared' | 'hand-feature' | 'training-phase' | 'training-complete' | 'evolve-trigger';

// Training state machine phase event — use-hand-control 영역 emit.
// phase: untrained / learning / partial / trained / inference / evolving (사용자 명시 redesign).
// 'evolving' 영역 = INFERENCE 도달 영역 cluster_lock(false) 영역 unfreeze 후
//   N=10 frame 영역 낮은 weight (15) 영역 supervised retrain → cluster_lock(true) 영역 영구화.
//   학술 정합: Parisi et al. 2019 (lifelong learning), McCloskey & Cohen 1989 (catastrophic forgetting).
// clusterFrames: cluster 별 supervised inject 누적 (target=30 frame each).
// 'training-complete' 영역 = 4 cluster 영역 모두 30 frame 도달 1회 emit.
export interface TrainingPhaseDetail {
  phase: 'untrained' | 'learning' | 'partial' | 'trained' | 'inference' | 'evolving';
  clusterFrames: { 0: number; 1: number; 2: number; 3: number };
  target: number;
  // EVOLVING phase 진행률 (0..target_frames). 그 외 phase 영역 0.
  evolveFrames?: number;
  evolveTarget?: number;
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
  // Backend B+3 combo (a8e8165) 영역 inject_feature16 응답 영역 cluster mean 사실 동봉.
  // length 4 — index = cluster id (0..3). frontend 자체 cluster mean 산출 영역 영역 우선 활용.
  // backward compat: 미동봉 (legacy backend) 영역 frontend 영역 out_rates 기반 fallback 산출.
  cluster_rates?: number[];
  // Backend 영역 winner cluster (margin >= threshold 영역 정합 시점만, 영역 null).
  winner_cluster?: number | null;
  // Backend 영역 (max - second) / max margin (0..1). max 0 영역 0.
  winner_margin?: number;
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
