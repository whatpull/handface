// Web Worker RPC 프로토콜 — main thread ↔ SNN worker.
//
// 본 파일은 메시지 형태 만 정의. transport (Worker / MessageChannel / mock)
// 와 핸들러 (worker-core) 는 별도 파일로 분리해 단위 테스트 가능하게 한다.

import type { InjectEvent, NetworkSnapshot } from './network';

// ── 요청 ──
// build : NeuralNetwork 를 빌드 (n13 orientation default 또는 custom).
// inject : pending 자극 큐잉.
// run    : durationMs 만큼 시뮬레이션.
// snapshot : NetworkSnapshot 직렬화.
// extractWeights : synapse 위치 인덱스 기반 가중치 배열.
// applyWeights   : 위 가중치를 net 에 다시 적용.
// firingRates    : 지정 뉴런 이름 들의 windowMs 내 firing rate (Hz).
// reset          : net + monitor 초기화.

export type WorkerRequest =
  | { id: number; type: 'build'; payload: BuildPayload }
  | { id: number; type: 'restoreSnapshot'; payload: RestoreSnapshotPayload }
  | { id: number; type: 'inject'; payload: { events: InjectEvent[] } }
  | { id: number; type: 'run'; payload: RunPayload }
  | { id: number; type: 'snapshot' }
  | { id: number; type: 'extractWeights' }
  | { id: number; type: 'applyWeights'; payload: { weights: number[] } }
  | { id: number; type: 'firingRates'; payload: FiringRatesPayload }
  | { id: number; type: 'regionFiringRates'; payload: RegionFiringRatesPayload }
  | { id: number; type: 'expandCluster'; payload: ExpandClusterPayload }
  | { id: number; type: 'clusterFiringRates'; payload: ClusterFiringRatesPayload }
  | { id: number; type: 'clusterTrainRStdp'; payload: ClusterTrainRStdpPayload }
  | { id: number; type: 'getNetworkTime' }
  | { id: number; type: 'resetHomeostatic' }
  | { id: number; type: 'reset' };

export interface BuildPayload {
  preset: 'n13_orientation';
  vThreshold?: number;
  clusterActiveInputs?: number[][];
  seed?: number;
}

export interface RestoreSnapshotPayload {
  snapshot: NetworkSnapshot;
  // 선택 — 알고있는 cluster 별 활성 input. UI 메타데이터, registry slot 에
  // 채움. 미지정 시 빈 배열로 남고 cluster id 만 복원.
  clusterActiveInputs?: number[][];
}

export interface RunPayload {
  durationMs: number;
  dtMs?: number;
  stdpEnabled?: boolean;
  stdpGain?: number;
}

export interface FiringRatesPayload {
  // 뉴런 이름 또는 prefix(true 이면 이름이 prefix 로 시작하는 모든 뉴런).
  names?: string[];
  prefixes?: string[];
  windowMs: number;
}

export interface ExpandClusterPayload {
  activeInputs: number[]; // 길이 4 권장 (n13 cluster slot 정합).
  seed?: number;
}

export interface ClusterFiringRatesPayload {
  // OUT 또는 V1_L23 / V2_L5 layer 영역 cluster 별 평균 firing rate.
  windowMs: number;
  layer?: 'OUT' | 'V1_L23' | 'V2_L5';
}

// R-STDP 감독 학습 — 각 frame 별 measure→reward 2-pass.
// frame 단위:
//   1. inject(pattern) → run(observeMs, stdp=false) → cluster firing rate 측정
//      → winner === targetCluster 면 correct (rewardGain), 아니면 punishGain.
//   2. inject(pattern) → run(observeMs, stdp=true, gain=결정값) — STDP 적용.
// 본 RPC 영역 worker 내부 loop — RPC 횟수 = 1 (network round-trip 절감).
export interface ClusterTrainRStdpPayload {
  // 학습 패턴 — N×16 (각 row 영역 in_feat_0..15 활성도 0..1).
  patterns: number[][];
  // 정답 cluster index (0..N_CLUSTER-1).
  targetCluster: number;
  // 입력 자극 weight 강도. default 25.
  intensity?: number;
  // 자극 sustained duration (ms). default 30.
  stimulusDurationMs?: number;
  // 한 frame 영역 measure / reward run duration (ms). default 50.
  observeMs?: number;
  dtMs?: number;
  // 정답 cluster winner 일 시 STDP gain. default 2.0 (보상).
  rewardGain?: number;
  // 오답 cluster winner 일 시 STDP gain. default 0.5 (벌).
  punishGain?: number;
}

// PR fix/live-mode-time-and-restore — region-level firing rate (V1/V2 etc).
// 본 RPC 영역 cluster 단위 averaging 영역 회피 — 지정 region (V1 / V2 / OUT)
// 영역 모든 excitatory neuron 영역 평균 firing rate (Hz). NodeLearn 영역
// V1/V2 cascade strip 영역 실 spike rate 영역 표시.
export interface RegionFiringRatesPayload {
  // 'V1' → V1_L4_E + V1_L23_E 합산. 'V2' → V2_L4_E + V2_L23_E + V2_L5_E.
  // 'OUT' → out_*_*. 'V1_L23' → V1_L23_E only (cluster firing 영역 정합).
  region: 'V1' | 'V2' | 'OUT' | 'V1_L23' | 'V2_L5';
  windowMs: number;
}

// ── 응답 ──
export type WorkerResponse =
  | { id: number; ok: true; result: unknown }
  | { id: number; ok: false; error: string };

// 각 요청 별 result 타입 (호출 측에서 cast 사용).
export interface BuildResult {
  neuronsAdded: number;
  synapsesAdded: number;
  outClusters: number;
  outTotal: number;
  inputDim: number;
  preset: string;
}

export interface RestoreSnapshotResult {
  neurons: number;
  synapses: number;
  totalClusters: number;
  t: number;
}

export interface RunResult {
  t: number;
  durationMs: number;
}

export interface SnapshotResult {
  snapshot: NetworkSnapshot;
}

export interface FiringRatesResult {
  // 뉴런 이름 → 발화율(Hz). 입력 순서를 보존.
  rates: Array<{ name: string; hz: number }>;
}

export interface ExpandClusterResult {
  newClusterId: number;
  totalClusters: number;
  neuronsAdded: number;
  synapsesAdded: number;
  activeInputs: number[];
}

export interface ClusterFiringRatesResult {
  // [clusterId] → 평균 firing rate (Hz).
  rates: number[];
  winner: number; // argmax. -1 이면 모두 0.
  share: number; // rates[winner] / sum(rates). silent → 0.
  margin: number; // (max - second) / max. silent → 0.
  layer: 'OUT' | 'V1_L23' | 'V2_L5';
}

export interface ClusterTrainRStdpResult {
  trained: number; // 처리된 frame 수 (= patterns.length).
  correct: number; // winner === targetCluster 인 frame 수.
  accuracy: number; // correct / trained.
  targetCluster: number;
  // 각 frame 의 measure 단계 cluster firing rates (디버깅 / 시각화).
  clusterRatesHistory: number[][];
  // measure 단계의 winner (-1 = silent).
  winnerHistory: number[];
}

// PR fix/live-mode-time-and-restore — 본 RPC 영역 net.t 누적 시각 영역
// main thread 영역 catch 영역 inject events 영역 time 영역 절대 정합.
// 사용자 catch 2026-05-09 (broken state — 두 번째 trigger 0Hz):
// inject(time=0) + run() 영역 net.t 영역 누적 → arrival<=t 영역 모든 stale
// impulse 영역 1-step burst collapse → V1 attenuated → OUT silent. 본 RPC
// 영역 main thread 영역 currentT 영역 catch 영역 inject(time=currentT) 영역 정합.
export interface GetNetworkTimeResult {
  t: number; // 현재 net.t (ms).
}

// PR fix/live-mode-time-and-restore — homeostatic thresholdOffset 영역 reset.
// 본 RPC 영역 모든 neuron 영역 thresholdOffset = 0 영역 set. triggerOnce
// (repeats 3 × 8 OUT × increment 2.0 = thresholdOffset += 48) 영역 누적
// 영역 두 번째 trigger 영역 V_th saturation 영역 fire 0 영역 회피.
// 학술 정합: supervised batch 영역 frame reset 정합 (Diehl & Cook 2015 §3.2).
export interface RegionFiringRatesResult {
  region: 'V1' | 'V2' | 'OUT' | 'V1_L23' | 'V2_L5';
  // 지정 region 영역 모든 excitatory neuron 영역 평균 firing rate (Hz).
  // neuron count 영역 0 영역 0 반환.
  hz: number;
  neuronCount: number;
}
