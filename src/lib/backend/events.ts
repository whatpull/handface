// 클라이언트 → UI 발화/학습 이벤트 버스. EventTarget 기반.
// Canvas 가 'neuron-firing' 구독 → fired class + synapse pulse 토글.

// 'training-cleared' — 명시 reset / explicit wipe path만 emit (Toolbar Reset, rebuildToBaseline).
//   stored snapshot 폐기 신호. 'circuit-changed' 와 분리 — 자동 wipe 폐기 (P1 fix).
// (직전 'evolve-trigger' 폐기 — Sidebar Evolve 버튼 + EVOLVING phase 모두 회수, 사용자 명시.)
// path Y (2026-05-07): 입력 모드 + grid 학습/추론 진행 broadcast.
//   - input-mode: NodeInput 가 mount/toggle 시 emit.
//   - grid-training: GridInput 가 R-STDP 학습 시작/끝/에러 시 emit.
//   - grid-infer: GridInput 가 추론 호출 시작/끝/에러 시 emit.
//     PipelineCanvas 가 단계별 노드/connector 활성화에 사용.
export type BackendEventType = 'neuron-firing' | 'circuit-changed' | 'training-changed' | 'training-cleared' | 'hand-feature' | 'training-phase' | 'training-complete' | 'input-mode' | 'grid-training' | 'grid-infer';

export interface InputModeDetail { mode: 'camera' | 'grid'; }
export interface GridTrainingDetail {
  kind: 'started' | 'progress' | 'finished' | 'error';
  cluster: 0 | 1 | 2 | 3;
  // progress: 진행 중 frame 개수.
  framesDone?: number;
  framesTotal?: number;
  accuracy?: number;
  correct?: number;
  trained?: number;
  message?: string;
}
export interface GridInferDetail {
  kind: 'started' | 'finished' | 'error';
  winnerCluster?: 0 | 1 | 2 | 3 | null;
  message?: string;
}

// Training state machine phase event — use-hand-control 가 emit.
// phase: untrained / learning / partial / trained / inference (사용자 명시 redesign).
// (직전 'evolving' 폐기 — lifelong learning 진입점 자체 회수.)
// clusterFrames: cluster 별 supervised inject 누적 (target=30 frame each).
// 'training-complete' 는 4 cluster 모두 30 frame 도달 시 1회 emit.
export interface TrainingPhaseDetail {
  phase: 'untrained' | 'learning' | 'partial' | 'trained' | 'inference';
  clusterFrames: { 0: number; 1: number; 2: number; 3: number };
  target: number;
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
  // length 4 — index = cluster id (0..3). frontend 자체 cluster mean 산출 일부 우선 활용.
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
