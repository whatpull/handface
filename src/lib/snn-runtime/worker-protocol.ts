// Web Worker RPC 프로토콜 — main thread ↔ SNN worker.
//
// 본 파일은 메시지 형태 만 정의. transport (Worker / MessageChannel / mock)
// 와 핸들러 (worker-core) 는 별도 파일로 분리해 단위 테스트 가능하게 한다.

import type { InjectEvent, NetworkSnapshot } from './network';
import type { StdpMode } from './neuron';
// StdpMode 를 인터페이스에서 사용하기 위해 import. 공개 re-export는 index.ts (neuron.ts 직접 경로) 에서.
export type { StdpMode };

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
  | { id: number; type: 'resetClusterWeights' }
  | { id: number; type: 'reset' }
  // PR-B (Web Worker background offload, 2026-05-10): fire-and-forget RPC.
  // 사용자 catch 2026-05-09 [2]: 학습/추론 영역 background 영역 latency hide.
  // 본 RPC 영역 sync ack `null` + 결과 영역 push event (postMessage type='push')
  // 영역 별도 channel 영역 emit. main thread 영역 await 0 (즉시 return).
  // 학술 정합 (CPU pipeline parallelism): 사용자 input event loop 영역 unblock.
  | { id: number; type: 'triggerBackground'; payload: TriggerBackgroundPayload }
  | { id: number; type: 'reinforceBackground'; payload: ReinforceBackgroundPayload };

export interface BuildPayload {
  // P218 (2026-05-20) — n14_extended (5×5 input) preset 영역 추가. n13 영역
  // 영역 4×4 (16 raw + 16 derived = 32 dim) 영역 N=8 ceiling 영역 break 영역
  // 영역 5×5 (25 raw + 25 derived = 50 dim) substrate 영역 시도.
  // P220 (2026-05-25 Task 4): 'n15_extended_6x6' (36 raw + 36 derived = 72 dim) 추가.
  preset: 'n13_orientation' | 'n14_extended' | 'n15_extended_6x6';
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
  // 'pair' (default, Bi & Poo 1998) | 'triplet' (Pfister & Gerstner 2006).
  stdpMode?: StdpMode;
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
  // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): input cardinality normalize.
  // 영역 동봉 시점 영역 pattern active idx ∩ cluster.activeInputs (overlap)
  // 영역 catch 영역 rate 영역 normalize. 미동봉 영역 raw rate 영역 fallback
  // (legacy path 호환). 학술 정합 (Wiesel 1981 receptive field cardinality
  // fairness — overlap 영역 unequal cluster 영역 fairness mandatory).
  pattern?: number[]; // 16-dim 0..1 (binary 영역 v > 0.5 catch).
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
  // STDP 규칙 선택. default 'pair'.
  stdpMode?: StdpMode;
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

// PR-B (Web Worker background offload, 2026-05-10): worker 영역 비동기 push event.
// id 영역 0 (RPC 정합 0 — handleResponse 영역 type='push' 영역 dispatch).
// trialToken 영역 main thread 영역 fire-and-forget RPC 영역 catch token —
// out-of-order arrival 영역 latest-token-wins discrimination.
//
// 학술 정합 (event-driven reactive SNN): worker thread 영역 simulation 영역
// 끝난 시점 영역 self.postMessage(push) 영역 emit. main thread 영역 listener
// 영역 LiveTickDetail emit + lab.save fire-and-forget.
export type WorkerPushEvent =
  | { type: 'push'; event: 'triggerComplete'; payload: TriggerCompletePayload }
  | { type: 'push'; event: 'reinforceComplete'; payload: ReinforceCompletePayload }
  // QA FINDING-4 fix (2026-05-10): handleTriggerBackground / handleReinforceBackground
  // catch path 영역 silent console.warn 영역 사용자 catch 0 → push event 영역
  // emit. main thread 영역 listener 영역 status reset + emitBackendEvent('snn-error')
  // 영역 toast 정합 (timeout 영역 root cause 영역 사용자 visual catch).
  | { type: 'push'; event: 'triggerError'; payload: TriggerErrorPayload };

// triggerBackground RPC payload — triggerOnce 영역 동일 semantics + trialToken.
// pattern 영역 main thread 영역 16-dim binary catch (LiveSnn.patternRef snapshot).
// trialToken 영역 main thread 영역 monotonic seq — push event 영역 same token
// 영역 catch 사실.
export interface TriggerBackgroundPayload {
  pattern: number[]; // 16-dim 0..1.
  intensity: number;
  observeMs: number;
  stimulusDurationMs: number;
  stdpGain: number; // 0 (infer) or 1.0+ (training).
  repeats: number; // default 3 — Risk 4 mitigation.
  resetThreshold: boolean;
  trialToken: number;
  // STDP 규칙 선택. default 'pair'. stdpGain=0 시 무관 (stdp 비활성).
  stdpMode?: StdpMode;
}

// triggerComplete push payload — main thread 영역 emitTick 영역 직접 reuse.
// cluster firing rates + V1/V2 region rates + 마지막 simulation 영역 net.t.
export interface TriggerCompletePayload {
  trialToken: number;
  cfr: ClusterFiringRatesResult;
  v1Hz: number;
  v2Hz: number;
  // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount catch —
  // main thread 영역 emitTick 영역 active_neurons_by_region 영역 동봉 정합.
  // backward compat: 미동봉 (legacy push payload) 영역 0 fallback.
  v1FireCount?: number;
  v2FireCount?: number;
  netTime: number;
}

// reinforceBackground RPC payload — clusterTrainRStdp 1-pattern batch wrap.
// targetCluster 영역 명시 supervised 신호. rewardGain / punishGain 영역 main
// thread 영역 reinforce(targetCluster, gain) 영역 catch (gain × 0.25 punish).
export interface ReinforceBackgroundPayload {
  pattern: number[]; // 16-dim 0..1.
  targetCluster: number;
  rewardGain: number;
  punishGain: number;
  intensity: number;
  observeMs: number;
  stimulusDurationMs: number;
  trialToken: number;
  // STDP 규칙 선택. default 'pair'.
  stdpMode?: StdpMode;
  // P218 (2026-05-25) — simulation timestep override. Default 0.1ms.
  // Research module 영역 0.5ms 영역 5× speed gain.
  dtMs?: number;
}

// QA FINDING-4 fix (2026-05-10): triggerError push payload — handleTriggerBackground
// / handleReinforceBackground catch path 영역 emit. main thread 영역 listener
// 영역 pendingInferTokenRef / pendingReinforceTokenRef 영역 reset + emitBackendEvent
// ('snn-error') 영역 toast 정합. source 영역 'trigger' / 'reinforce' 영역 caller
// 영역 정합 catch.
export interface TriggerErrorPayload {
  trialToken: number;
  source: 'trigger' | 'reinforce';
  error: string;
  // reinforce path 영역 targetCluster 영역 catch (caller 영역 cluster-specific reset).
  targetCluster?: number;
}

// reinforceComplete push payload — main thread 영역 emitTick + lab.save force.
export interface ReinforceCompletePayload {
  trialToken: number;
  targetCluster: number;
  cfr: ClusterFiringRatesResult;
  v1Hz: number;
  v2Hz: number;
  // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount catch (reinforce path).
  v1FireCount?: number;
  v2FireCount?: number;
  // R-STDP supervised batch 영역 결과 (worker-core handleClusterTrainRStdp 정합).
  trained: number;
  correct: number;
  accuracy: number;
}

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
  // Fix #22 (사용자 catch 2026-05-10 — 첫번째 패턴만 학습되고 2번째 패턴이 학습이 안됨):
  // Carpenter-Grossberg 1987 ART vigilance ρ canonical 정합 — |I ∩ T| / |I|
  // (input ∩ winner template / input). 직전 share/margin 영역 단일 cluster 영역
  // 항상 1.0 영역 vigilance 영역 영원히 pass → 신규 input pattern 영역 spawn 0
  // 영역 root cause. inputMatch 영역 input pattern (active cells) 영역 winner
  // cluster 영역 activeInputs (학습 영역 hard-wired sub-pool) 영역 overlap ratio —
  // 신규 input 영역 cluster template 영역 영역 영역 영역 0.0 → vigilance miss → spawn.
  // winner=-1 (silent) 또는 |I|=0 (empty pattern) → 0.
  inputMatch: number;
  layer: 'OUT' | 'V1_L23' | 'V2_L5';
  // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates):
  //   "패턴 4가 추론되는데 실제 수치가 맞는건가요? 0Hz 표시는 정확한 것인지?"
  //   스크린샷: forced winner 영역 cluster fire rate=0Hz / 영역 cluster fire rate=82Hz
  //   → 사용자 mental model "winner=cluster 4 단 fire 0Hz" 영역 모순.
  // root cause: PR #237 exact-match winner force 영역 deterministic cluster lock —
  //   fire rate dominance 영역 LIF stochasticity / WTA cross-talk 영역 영역 영역
  //   vigilance metric 영역 별도 (Carpenter-Grossberg 1987 ART resonance). winner
  //   cluster fire rate 영역 0Hz 영역 산출 사실 (stale subthreshold neuron / 영역
  //   cluster weight dominance 영역 catch) — 단 사용자 영역 cluster fire rate 영역
  //   winner 영역 source 영역 mental model.
  // fix propagate path:
  //   - 본 field 영역 emit boolean — main thread (live-snn.ts) 영역 NeuronFiringDetail
  //     영역 forcedExact propagate → PipelineEventContext / NodeInfer / NodeLearn
  //     영역 winner card 영역 "EXACT MATCH (deterministic)" badge 표시 + fire rate
  //     row 영역 cluster bar 영역 그대로 표시 (사실 catch — 단 winner card 영역
  //     ART resonance 영역 명시).
  // 학술 정합: Carpenter-Grossberg 1987 ART F2 resonance 영역 exact template match
  //   = deterministic winner — fire rate stochasticity 영역 영역 영역. 정직 한계
  //   catch: fire rate 영역 0Hz 영역 산출 사실 단 winner 영역 deterministic.
  // backward compat: 미동봉 (legacy path) 영역 undefined → false 정합 (caller 영역
  //   ?? false floor).
  forcedExact?: boolean;
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

// PR-A architecture pivot (사용자 catch 2026-05-09 — Step 4 saturation escape):
// 학습 가중치 영역 fresh build default 영역 restore. n13 builder 영역 default
// weight (cluster_active_inputs 영역 hard-wired sub-cluster) 영역 swap. 직전
// horizontal lock-in 영역 IndexedDB 영속 영역 새로고침 영역 escape 0 영역 catch
// — 본 RPC 영역 mandatory escape path.
// 정직 한계: snapshot.t / homeostatic state / spike history 영역 동시 0 reset
// (fresh build 정합 영역 batch 정합).
export interface ResetClusterWeightsResult {
  neurons: number;
  synapses: number;
  preset: string;
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
  // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): hz>0 인 neuron 수 —
  // NodeLearn V1/V2 region strip "firing/total" 표시 영역 source. 직전 본
  // field 미존재 영역 emit 영역 active_neurons_by_region 0 → 0/N 고정 catch.
  // count: 0 < firingRate(name, t, windowMs) 영역 neuron 수.
  firingCount: number;
}
