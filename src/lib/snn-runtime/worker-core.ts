// SNN worker core — Worker / Node 환경 어디서나 동작하는 RPC 핸들러.
//
// 목적: Worker transport 와 분리해 단위 테스트 가능. 실제 Worker entry
// (snn-worker.ts) 는 본 클래스를 인스턴스화하고 self.onmessage / postMessage
// 만 연결한다.

import {
  buildClusterRegistryFromN13,
  expandCluster,
  inferClusterRegistry,
  type ClusterRegistry,
} from './art';
import { buildN13OrientationPreset, compute32DimFeature, N_INPUT } from './builders/n13-orientation';
import { buildN14ExtendedPreset, compute50DimFeature, N_INPUT_N14, RAW_DIM_N14 } from './builders/n14-extended';
import { buildN15Extended6x6Preset, compute72DimFeature, N_INPUT_N15, RAW_DIM_N15 } from './builders/n15-extended-6x6';
import { buildN16HandPreset, RAW_DIM_N16 } from './builders/n16-hand';
import { applySparseTopK, encodeHandToFeatureVector, HAND_FEAT_DIM, HAND_SPARSE_TOP_K_DEFAULT, selectTopKActive, type HandLandmark } from './hand-spike-encoder';

// Hand SNN sparse top-K — input bottleneck 해결 (2026-05-26).
// 95-dim continuous feature 의 threshold-0.2 active inputs 는 4 gesture 간
// ~98% overlap → R-STDP 0/4. top-K=5 sparsify 시 P215 4×4 binary pattern 의
// sparse active inputs (4-6/16) 영역 진입 — R-STDP/WTA 가 작동할 환경.
//
// 측정 history (hand-sparse-topk-distinctiveness-sweep.json):
//   K=5: 86.8% pairwise distinctiveness (anatomical mock 영역 다르게 측정될 수 있음).
//   K=8: 83.0%, K=10: 72.4%, K=15: 54.5%, K=20: 45.8%.
// production single-frame dispatch 경로 = plain selectTopKActive — 정확도 4/4
// 검증 (forced-disjoint diagnostic) 와 다른 path 임을 주의. plain top-K production
// 자체의 4/4 자동 달성은 보장하지 않음 (mock anatomical 영역 1/4).

// P218 (2026-05-20) + P220 (2026-05-25) + Hand SNN (2026-05-26) — pattern length 영역 영역 영역 compute feature dispatch.
// n13: 16 raw → 32 dim, n14: 25 raw → 50 dim, n15: 36 raw → 72 dim, n16: 63 raw landmarks → 95 dim hand feature (top-K=5 sparsified).
function dispatchComputeFeature(pattern: number[]): number[] {
  if (pattern.length === 16) return compute32DimFeature(pattern);
  if (pattern.length === RAW_DIM_N14) return compute50DimFeature(pattern);
  if (pattern.length === RAW_DIM_N15) return compute72DimFeature(pattern);
  if (pattern.length === RAW_DIM_N16) {
    // n16-hand: 63 raw → 95-dim feature → top-K=5 sparsify (rest zero).
    // P215 와 같은 sparse active inputs regime 로 cluster separability 회복.
    const landmarks: HandLandmark[] = [];
    for (let i = 0; i < 21; i += 1) {
      landmarks.push({ x: pattern[i * 3], y: pattern[i * 3 + 1], z: pattern[i * 3 + 2] });
    }
    const full = encodeHandToFeatureVector(landmarks);
    const topK = selectTopKActive(full, HAND_SPARSE_TOP_K_DEFAULT);
    return applySparseTopK(full, topK);
  }
  // Phase 3.9 v3 fix (2026-06-03, 사용자 catch handface.whatpull.com):
  // CameraInput 이 encodeHandToFeatureVector 로 pre-encode 한 95-dim 을 직접
  // 전달 → 이 branch 가 'return pattern' 로 fall-through → activeIdx 가 threshold
  // 0.2 로 ~60 features 산출 → cluster template (sparse 5) 와 Jaccard 5/60=0.08
  // → vigilance MISS 마다 새 cluster spawn ("같은 패턴이 클러스터 지속 증가").
  // 정정: 95-dim hand pattern 도 top-K=5 sparsify.
  if (pattern.length === HAND_FEAT_DIM) {
    const topK = selectTopKActive(pattern, HAND_SPARSE_TOP_K_DEFAULT);
    return applySparseTopK(pattern, topK);
  }
  return pattern; // already expanded (32, 50, 72)
}

// P218 (2026-05-25) — substrate-aware feature activation threshold.
// 4×4 (32-dim, binary-like derived): 0.5 OK.
// 5×5 (50-dim, continuous derived row/col sums etc.): 0.2 — graded injection
//   영역 noise 영역 graceful degradation. cluster receives proportional signal
//   영역 abrupt cliff 영역 회피.
// ROOT CAUSE: row sum (5/5=1 → 4/5=0.8 → 3/5=0.6 → 2/5=0.4 → cliff at 0.5)
//   영역 noise 3 bits flip 시 derived feature 전체 손실 → cluster activation
//   collapse. graded threshold 영역 partial signal 영역 유지.
function activationThreshold(featLen: number): number {
  // 4×4 (32-dim): 0.5 (binary derived). 5×5 (50-dim) / 6×6 (72-dim): 0.2 (graded continuous derived).
  return featLen >= 50 ? 0.2 : 0.5;
}
import { SpikeMonitor } from './monitor';
import { NeuralNetwork } from './network';
import type {
  BuildPayload,
  BuildResult,
  ClusterFiringRatesPayload,
  ClusterFiringRatesResult,
  ClusterPoolUsageResult,
  ClusterTrainRStdpPayload,
  ClusterTrainRStdpResult,
  ExpandClusterPayload,
  ExpandClusterResult,
  FiringRatesPayload,
  FiringRatesResult,
  GetNetworkTimeResult,
  RegionFiringRatesPayload,
  RegionFiringRatesResult,
  ReinforceBackgroundPayload,
  ResetClusterWeightsResult,
  RestoreSnapshotPayload,
  RestoreSnapshotResult,
  RunPayload,
  RunResult,
  SnapshotResult,
  TriggerBackgroundPayload,
  WorkerPushEvent,
  WorkerRequest,
  WorkerResponse,
} from './worker-protocol';

// 가중치 추출/적용 — persistence 모듈과 같은 시맨틱이지만 자급자족 인라인.
function extractWeightsLocal(net: NeuralNetwork): number[] {
  return net.synapses.map((s) => s.weight);
}

function applyWeightsLocal(net: NeuralNetwork, weights: number[]): void {
  if (weights.length !== net.synapses.length) {
    throw new Error(
      `weight 수 불일치: net=${net.synapses.length}, payload=${weights.length}`,
    );
  }
  for (let i = 0; i < weights.length; i += 1) net.synapses[i].weight = weights[i];
}

// Fix #20 (2026-05-10): zero-init dynamic — cluster 0 영역 시작.
// 사용자 mental model "1 입력 = vigilance miss → cluster spawn 1, 2, 3, ..."
// 정합 (직전 4-cluster default 영역 폐기 — base substrate 영역 baseline noise
// 영역 stale '패턴 1..4' 영역 표시 root cause 영역 정정).
const DEFAULT_CLUSTER_ACTIVE_INPUTS: number[][] = [];

// 사용자 catch 2026-05-12 (exact-equality-vigilance):
//   "조금이라도 다르면 다른 패턴으로 인식 (단, 완벽히 동일한 패턴의 경우 동일하게 인식)"
// 사용자 catch 2026-06-01 (subset 인식 추가):
//   forceDisjoint vigilance fix 이후에도 사용자가 cluster cells 를 모두 포함하면서
//   추가 cells 를 그릴 때 (template ⊆ pattern, 즉 template_only=[]) inputMatch=0
//   → 신규 spawn 시도 → forceDisjoint fallback → dialog 반복.
//   VIG-DIAG 데이터 분석 결과 cluster 4 의 template[7] 이 pattern[13] 에 모두 포함됨
//   (intersection=7=templateSize). 사용자 mental model "비슷한 패턴" 정합 위해
//   subset relationship 도 vigilance pass 로 처리. 단 superset (template 일부 누락)
//   은 여전히 strict miss → spawn (사용자 명시 "조금이라도 다르면" 정합).
//
// 동작 정합 표:
//   - I == T (exact match): intersection=I=T → 1.0 ✓ (직전 동작)
//   - T ⊆ I (subset, template_only=[]): intersection=T → 1.0 ✓ (신규 추가)
//   - T ⊄ I (template 일부 누락): intersection<T → 0 (strict 유지)
//   - I ∩ T = ∅ (disjoint): intersection=0 → 0 (strict 유지)
//
// 학술 정합: Carpenter-Grossberg 1987 ART resonance — template ⊆ input 은
//   resonance 명확 case. ART vigilance ρ=1.0 strict 영역 subset case 영역
//   완전 인식 영역 정합.
// handleClusterFiringRates + handleClusterTrainRStdp 두 path 영역 동일 적용.
function computeExactInputMatch(
  intersection: number,
  inputSize: number,
  templateSize: number,
): number {
  // subset relationship: template ⊆ input (template 의 모든 features 가 input 에 포함).
  // 사용자가 cluster cells 를 모두 포함 + 추가 cells 그림 → ART resonance.
  if (templateSize > 0 && intersection === templateSize) return 1.0;
  // exact set equality: |I| == |T| && |I ∩ T| == |I| (== |T|).
  if (inputSize !== templateSize) return 0;
  if (intersection !== inputSize) return 0;
  return 1.0;
}

// 사용자 catch 2026-05-12 (exact-match-winner-force):
//   "패턴이 RECENT를 보면 들쑥날쑥입니다." (스크린샷: 동일 input 4-cell top row 영역
//    cluster 2↔3 사이 winner oscillation 1·2·3·2·3·2·3)
// PR #236 exact equality vigilance 영역 inputMatch 영역 binary 0/1 단 winner emerge
// path 영역 fire rate argmax 영역 catch — LIF stochasticity (±15-20% jitter) +
// Dense WTA cross-talk (학습된 2 cluster 동시 fire) 영역 catch 영역 동일 input
// 영역 매 trigger 영역 winner cluster 영역 oscillation → RECENT 들쑥날쑥.
// fix: registry.slots 영역 activeInputs 영역 activeIdx 영역 set-equal cluster
// 영역 존재 시 → 영역 cluster 영역 winner 강제 (deterministic). exact match 0
// 영역 기존 fire rate argmax path 영역 fallback.
// 학술 정합: Carpenter-Grossberg 1987 ART resonance 영역 exact template match
// 영역 winner 결정 deterministic — fire rate stochasticity 영역 catch 영역
// vigilance + winner 영역 분리 (vigilance pass = exact match → winner 영역 동일
// cluster 영역 lock).
function findExactMatchCluster(
  activeIdx: Set<number>,
  slots: { activeInputs: number[] }[],
): number {
  const inputSize = activeIdx.size;
  if (inputSize === 0) return -1;
  for (let ci = 0; ci < slots.length; ci += 1) {
    const tmpl = slots[ci].activeInputs;
    if (tmpl.length !== inputSize) continue;
    let intersection = 0;
    for (const ai of tmpl) {
      if (activeIdx.has(ai)) intersection += 1;
    }
    if (intersection === inputSize) return ci;
  }
  return -1;
}

// P215a (2026-05-19) — 유사 패턴 absorption 정정 (input-space Hamming distance
// aux vigilance):
//   사용자 catch (P214a 결과 patternToCluster=[0,0,0,1,2], 5개 유사 패턴 영역
//   3개 흡수): exact-match miss + Jaccard fallback (>= 0.5) 영역 1-2 bit
//   영역 다른 input 영역 cluster template 영역 jaccardFallbackPassed=true →
//   inputMatch 영역 jaccard value 영역 catch → caller vigilance (0.15) 영역
//   pass → spawn skip → 신규 cluster 영역 안 만들어짐 → 사용자 mental model
//   "조금이라도 다르면 다른 패턴" (2026-05-12 exact-equality policy) 위배.
//
//   root cause: Jaccard 영역 set ratio (0..1) 영역 absolute bit difference 영역
//   미반영 — 4-bit input + 5-bit template (1-bit diff) 영역 jaccard=4/5=0.8,
//   8-bit input + 9-bit template (1-bit diff) 영역 jaccard=8/9=0.89. 영역 0.5
//   threshold 영역 pass — 영역 작은 input 영역 1-bit diff 영역 fallback pass.
//
//   fix: Hamming distance (|A ⊕ B|) 영역 absolute bit count 영역 정합 — 1-bit
//   이상 다른 input 영역 fallback skip 영역 spawn 강제. exact equality vigilance
//   (2026-05-12) 영역 강화 — Jaccard fallback path 영역 exact match 직전 영역
//   "거의 동일" (0-bit diff = exact) 영역 catch path 영역 사실 영역 dead code
//   사실. 영역 본 fix 영역 fallback 영역 영원 비활성 — exact match 영역 강제.
//
//   학술 정합: Hamming 1950 absolute bit difference — ART vigilance 영역 set
//   similarity (Jaccard) 영역 보완 영역 absolute novelty signal (사용자 명시
//   "조금이라도 다르면 다른 패턴" mental model 영역 정합).
//
// 정직 한계: 본 threshold 영역 1 — 1-bit diff 영역 spawn 강제. 더 큰 threshold
// (예: 2) 영역 "1-bit 같은 cluster, 2-bit 영역 별 cluster" 영역 mental model
// 영역 정합 영역 ㄴ 사용자 P214a 영역 기대 [0,1,2,3,4] (모든 패턴 별 cluster)
// 영역 1-bit threshold 영역 합치.
const MIN_NOVEL_HAMMING_BITS = 1;

// PR #192 polish (SEC-2): handle() type whitelist — defense-in-depth.
// 직전 silent default catch (exhaustive switch 영역 _exhaustive: never) 영역
// 정합 catch 영역 진입 영역 explicit set 영역 reject — hostile / typo'd type
// 영역 catch 영역 silent 처리 0.
// VIG-DIAG dev-mode flag (2026-06-03):
//   production default: silent. dev tools console 영역
//     `globalThis.__HANDFACE_VIG_DIAG = true` 영역 활성화.
//   vigilance miss 시점만 진단 정보 출력 (정상 reinforce 영역 silent).
function isVigDiagEnabled(): boolean {
  try {
    return (globalThis as unknown as { __HANDFACE_VIG_DIAG?: boolean }).__HANDFACE_VIG_DIAG === true;
  } catch {
    return false;
  }
}

const ALLOWED_REQUEST_TYPES: ReadonlySet<string> = new Set([
  'build',
  'restoreSnapshot',
  'inject',
  'run',
  'snapshot',
  'extractWeights',
  'applyWeights',
  'firingRates',
  'regionFiringRates',
  'expandCluster',
  'clusterFiringRates',
  'clusterTrainRStdp',
  'getNetworkTime',
  'resetHomeostatic',
  'resetClusterWeights',
  'reset',
  // CPM-1 (Phase 1 diagnostic, 2026-05-31 7dd386a) — cluster pool usage.
  // 직전 commit 영역 protocol / worker-client / worker-core case 영역 추가 영역
  // 본 whitelist 영역 누락 영역 'disallowed request type: clusterPoolUsage' 영역
  // production fail (사용자 console log catch 2026-05-31). Phase 2A.1 H2/H3/H4
  // mitigation 측정 영역 sub-pool capacity / Jaccard / fallback 데이터 수집 정합.
  'clusterPoolUsage',
  'triggerBackground',
  'reinforceBackground',
]);

// PR #192 polish (SEC-1): triggerBackground / reinforceBackground 영역 진입
// payload validation guard. main thread 영역 LiveSnn 영역 보장 catch 단
// 외부 worker 영역 hostile message 영역 catch 영역 defense-in-depth.
// 정직 한계: pattern 영역 16-dim ∈ [0,1] 영역 binary catch (sharpenForGesture
// 영역 정합) — 본 path 영역 length only 영역 catch (값 영역 worker-core 영역
// inject events 영역 v <= 0.5 filter 영역 정합).
function validateTriggerBackgroundPayload(p: TriggerBackgroundPayload): void {
  // 16-dim raw (UI 입력) 또는 32-dim pre-expanded (worker 내부 변환 후) 모두 허용.
  // P218 (2026-05-20): n14_extended (5×5) 영역 영역 25-dim raw / 50-dim full
  // 영역 영역 추가 영역. n13: 16/32, n14: 25/50.
  if (!Array.isArray(p.pattern) || (
    p.pattern.length !== 16 && p.pattern.length !== N_INPUT &&
    p.pattern.length !== RAW_DIM_N14 && p.pattern.length !== N_INPUT_N14 &&
    p.pattern.length !== RAW_DIM_N15 && p.pattern.length !== N_INPUT_N15
  )) {
    throw new Error(`invalid pattern (expected length 16, ${N_INPUT}, ${RAW_DIM_N14}, ${N_INPUT_N14}, ${RAW_DIM_N15}, or ${N_INPUT_N15} array)`);
  }
  if (typeof p.repeats !== 'number' || p.repeats < 1 || p.repeats > 10) {
    throw new Error('invalid repeats (expected 1..10)');
  }
  if (typeof p.observeMs !== 'number' || p.observeMs < 1 || p.observeMs > 1000) {
    throw new Error('invalid observeMs (expected 1..1000)');
  }
  if (typeof p.intensity !== 'number' || p.intensity < 0 || p.intensity > 1000) {
    throw new Error('invalid intensity (expected 0..1000)');
  }
  if (typeof p.stimulusDurationMs !== 'number' || p.stimulusDurationMs < 0 || p.stimulusDurationMs > 1000) {
    throw new Error('invalid stimulusDurationMs (expected 0..1000)');
  }
}

function validateReinforceBackgroundPayload(p: ReinforceBackgroundPayload): void {
  // 16-dim raw (UI 입력) 또는 32-dim pre-expanded 모두 허용.
  // P218 (2026-05-20): n14_extended (5×5) 영역 영역 25-dim raw / 50-dim full
  // 영역 영역 추가 영역. n13: 16/32, n14: 25/50.
  if (!Array.isArray(p.pattern) || (
    p.pattern.length !== 16 && p.pattern.length !== N_INPUT &&
    p.pattern.length !== RAW_DIM_N14 && p.pattern.length !== N_INPUT_N14 &&
    p.pattern.length !== RAW_DIM_N15 && p.pattern.length !== N_INPUT_N15
  )) {
    throw new Error(`invalid pattern (expected length 16, ${N_INPUT}, ${RAW_DIM_N14}, ${N_INPUT_N14}, ${RAW_DIM_N15}, or ${N_INPUT_N15} array)`);
  }
  // Fix #20 (2026-05-10): dynamic cluster cap — 직전 0..31 fixed (4 cluster ×
  // 8 OUT) 영역 폐기. expandCluster 영역 dynamic 영역 cap 영역 0..63 영역 확장.
  // P215e (2026-05-19): MAX_CLUSTERS 8 → 16 확장 (live-snn.ts) — 16 cluster
  // 영역 cluster_idx 0..15 영역 cap 0..63 안전 영역 유지 (worker layer 영역
  // sanity guard 영역 retain).
  // P215g revert (2026-05-20): live-snn.ts MAX_CLUSTERS 16 → 8 복원. worker
  // sanity cap 0..63 영역 그대로 유지 (defense-in-depth — caller bug 영역 catch).
  if (typeof p.targetCluster !== 'number' || p.targetCluster < 0 || p.targetCluster > 63) {
    throw new Error('invalid targetCluster (expected 0..63)');
  }
  if (typeof p.observeMs !== 'number' || p.observeMs < 1 || p.observeMs > 1000) {
    throw new Error('invalid observeMs (expected 1..1000)');
  }
  if (typeof p.intensity !== 'number' || p.intensity < 0 || p.intensity > 1000) {
    throw new Error('invalid intensity (expected 0..1000)');
  }
  if (typeof p.stimulusDurationMs !== 'number' || p.stimulusDurationMs < 0 || p.stimulusDurationMs > 1000) {
    throw new Error('invalid stimulusDurationMs (expected 0..1000)');
  }
}

export class SNNWorkerCore {
  private net: NeuralNetwork | null = null;
  private monitor: SpikeMonitor | null = null;
  private registry: ClusterRegistry | null = null;
  private buildClusterActiveInputs: number[][] = DEFAULT_CLUSTER_ACTIVE_INPUTS;
  // P218 (2026-05-20) — preset 영역 track 영역 영역 reset / inject 영역 영역 dispatch 정합.
  private buildPreset: 'n13_orientation' | 'n14_extended' | 'n15_extended_6x6' | 'n16_hand' = 'n13_orientation';
  // P218 diagnostic — reinforce log 영역 영역 영역 영역 영역 영역 영역 영역.
  // spawn 영역 영역 reset (handleExpandCluster).
  private _p218LoggedFirstReinforce: boolean = false;
  // PR-B (Web Worker background offload, 2026-05-10): push event emitter.
  // worker entry (snn-worker.ts) 영역 self.postMessage 영역 wire,
  // main-thread-transport 영역 listeners.dispatch 영역 wire.
  // null 시점 영역 push event emit 영역 silent skip — RPC 영역 trigger/reinforce
  // background 영역 sync ack 영역 정합 (push 영역 0 발화 단 동작 무관).
  private pushEmitter: ((event: WorkerPushEvent) => void) | null = null;

  /**
   * PR-B (Web Worker background offload, 2026-05-10): worker 영역 push event
   * emitter 영역 wire. 외부 영역 push channel 영역 inject — sync ack RPC 영역
   * 별도 path 영역 결과 영역 main thread 영역 emit.
   *
   * worker entry: `core.setPushEmitter((event) => self.postMessage(event))`.
   * main-thread-transport: `core.setPushEmitter((event) => listeners.dispatch(event))`.
   */
  setPushEmitter(emitter: (event: WorkerPushEvent) => void): void {
    this.pushEmitter = emitter;
  }

  handle(req: WorkerRequest): WorkerResponse {
    try {
      // PR #192 polish (SEC-2): type whitelist 영역 explicit reject — defense-
      // in-depth (직전 silent default 영역 _exhaustive: never 영역 정합 catch
      // 영역 hostile / typo'd type 영역 catch 영역 catch 0).
      if (!ALLOWED_REQUEST_TYPES.has((req as { type: string }).type)) {
        return { id: req.id, ok: false, error: `disallowed request type: ${(req as { type: string }).type}` };
      }
      switch (req.type) {
        case 'build':
          return { id: req.id, ok: true, result: this.handleBuild(req.payload) };
        case 'restoreSnapshot':
          return { id: req.id, ok: true, result: this.handleRestoreSnapshot(req.payload) };
        case 'inject':
          this.requireNet().inject(req.payload.events);
          return { id: req.id, ok: true, result: null };
        case 'run':
          return { id: req.id, ok: true, result: this.handleRun(req.payload) };
        case 'snapshot': {
          const snap = this.requireNet().snapshot();
          // 사용자 catch 2026-05-12 (snapshot-activeinputs-persist):
          //   registry.slots[ci].activeInputs 영역 round-trip 보존 — schema 영역 3
          //   영역 bump + clusterActiveInputs 영역 동봉. 직전 schema 2 snapshot 영역
          //   reload 영역 inferClusterRegistry 영역 빈 배열 fallback → exact match
          //   영역 항상 miss → vigilance miss → 신규 cluster spawn loop 영역 catch.
          //   본 field 영역 handleRestoreSnapshot 영역 hydrate. registry 영역 미build
          //   (이론상 — restoreSnapshot before snapshot 영역 정합 단 build 영역 항상
          //   선행) 영역 미동봉 fallback (legacy schema 2 영역 동일 catch).
          if (this.registry) {
            snap.schema = 3;
            snap.clusterActiveInputs = this.registry.slots.map((s) => s.activeInputs.slice());
          }
          return { id: req.id, ok: true, result: { snapshot: snap } satisfies SnapshotResult };
        }
        case 'extractWeights':
          return { id: req.id, ok: true, result: extractWeightsLocal(this.requireNet()) };
        case 'applyWeights':
          applyWeightsLocal(this.requireNet(), req.payload.weights);
          return { id: req.id, ok: true, result: null };
        case 'firingRates':
          return {
            id: req.id,
            ok: true,
            result: this.handleFiringRates(req.payload),
          };
        case 'regionFiringRates':
          return {
            id: req.id,
            ok: true,
            result: this.handleRegionFiringRates(req.payload),
          };
        case 'expandCluster':
          return { id: req.id, ok: true, result: this.handleExpandCluster(req.payload) };
        case 'clusterFiringRates':
          return { id: req.id, ok: true, result: this.handleClusterFiringRates(req.payload) };
        case 'clusterPoolUsage':
          // CPM-1 diagnostic (2026-05-31) — side-effect 0 registry inspection.
          return { id: req.id, ok: true, result: this.handleClusterPoolUsage() };
        case 'clusterTrainRStdp':
          return { id: req.id, ok: true, result: this.handleClusterTrainRStdp(req.payload) };
        case 'getNetworkTime': {
          const net = this.requireNet();
          const result: GetNetworkTimeResult = { t: net.t };
          return { id: req.id, ok: true, result };
        }
        case 'resetHomeostatic': {
          // P218 (2026-05-21): full state reset — V_m + thresholdOffset +
          // pending PSP events + STDP traces. 잔여 pending events 영역 reset
          // 후 영역 V_m 영역 다시 영역 elevate 영역 root cause 영역 catch.
          const net = this.requireNet();
          for (const n of net.neurons) {
            n.resetState();
          }
          return { id: req.id, ok: true, result: null };
        }
        case 'resetClusterWeights': {
          // PR-A architecture pivot (사용자 catch 2026-05-09 — Step 4):
          // 학습 가중치 영역 fresh build default 영역 restore. 직전 buildClusterActiveInputs
          // 영역 catch (build / restoreSnapshot 영역 set) 영역 n13 builder 영역
          // 새로 build → net + monitor + registry 영역 swap. 학술 정합:
          // Diehl & Cook 2015 §3.2 batch reset 영역 confluent path — saturation
          // escape mandatory.
          const result = this.buildPreset === 'n15_extended_6x6'
            ? buildN15Extended6x6Preset({
                clusterActiveInputs: this.buildClusterActiveInputs,
              })
            : this.buildPreset === 'n14_extended'
            ? buildN14ExtendedPreset({
                clusterActiveInputs: this.buildClusterActiveInputs,
              })
            : buildN13OrientationPreset({
                clusterActiveInputs: this.buildClusterActiveInputs,
                // seed 영역 build payload 영역 catch 미보존 — buildN13OrientationPreset
                // 영역 default seed 영역 정합 (root-local-snn SEED=57 영역 별도 sync).
              });
          this.net = result.net;
          this.monitor = new SpikeMonitor();
          this.monitor.attachAll(this.net.neurons);
          // P218 (2026-05-21): preset 영역 영역 영역 registry — N14Pools dispatch.
          this.registry = buildClusterRegistryFromN13(this.buildClusterActiveInputs, this.buildPreset);
          const out: ResetClusterWeightsResult = {
            neurons: result.neuronsAdded,
            synapses: result.synapsesAdded,
            preset: result.preset,
          };
          return { id: req.id, ok: true, result: out };
        }
        case 'reset':
          this.net = null;
          this.monitor = null;
          this.registry = null;
          return { id: req.id, ok: true, result: null };
        case 'triggerBackground':
          // PR-B (Web Worker background offload, 2026-05-10): fire-and-forget.
          // sync ack `null` 영역 main thread 영역 즉시 return → 사용자 input
          // event loop 영역 unblock. 결과 영역 push event 영역 emit.
          // 주의: 본 case 영역 sync handle path 영역 호출 영역 inline 영역 simulation
          // 영역 실행 사실 — main-thread-transport (SSR fallback) 영역 microtask
          // 영역 ack postMessage 영역 정합 영역 simulation 영역 ack 후 영역 시작
          // 영역 catch (queueMicrotask 영역 ack 먼저 dispatch). 단 worker
          // 영역 message handler 영역 sync 영역 — 본 simulation 영역 worker
          // thread 영역 block 영역 main thread 영역 unblock. 정직 한계: snn-worker
          // entry 영역 message handler 영역 try 영역 inline 영역 simulation
          // 영역 처리 영역 후 영역 push event 영역 emit (next message 영역
          // 처리 영역 wait 영역 — coalesce policy 영역 worker 영역 sequential
          // serial 영역 정합).
          this.handleTriggerBackground(req.payload);
          return { id: req.id, ok: true, result: null };
        case 'reinforceBackground':
          this.handleReinforceBackground(req.payload);
          return { id: req.id, ok: true, result: null };
      }
      const _exhaustive: never = req;
      return { id: 0, ok: false, error: `unknown request: ${JSON.stringify(_exhaustive)}` };
    } catch (e) {
      return { id: req.id, ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  // --- 내부 ---
  private requireNet(): NeuralNetwork {
    if (!this.net) throw new Error('net 미빌드 — build 요청을 먼저 보내야 합니다');
    return this.net;
  }

  private requireRegistry(): ClusterRegistry {
    if (!this.registry) throw new Error('registry 부재 — build 후에 호출하세요');
    return this.registry;
  }

  private handleBuild(payload: BuildPayload): BuildResult {
    if (payload.preset !== 'n13_orientation' && payload.preset !== 'n14_extended' && payload.preset !== 'n15_extended_6x6' && payload.preset !== 'n16_hand') {
      throw new Error(`알 수 없는 preset: ${payload.preset}`);
    }
    const activeInputs = payload.clusterActiveInputs ?? DEFAULT_CLUSTER_ACTIVE_INPUTS;
    const result = payload.preset === 'n16_hand'
      ? buildN16HandPreset({
          vThreshold: payload.vThreshold,
          clusterActiveInputs: activeInputs,
          seed: payload.seed,
        })
      : payload.preset === 'n15_extended_6x6'
      ? buildN15Extended6x6Preset({
          vThreshold: payload.vThreshold,
          clusterActiveInputs: activeInputs,
          seed: payload.seed,
        })
      : payload.preset === 'n14_extended'
      ? buildN14ExtendedPreset({
          vThreshold: payload.vThreshold,
          clusterActiveInputs: activeInputs,
          seed: payload.seed,
        })
      : buildN13OrientationPreset({
          vThreshold: payload.vThreshold,
          clusterActiveInputs: activeInputs,
          seed: payload.seed,
        });
    this.net = result.net;
    this.monitor = new SpikeMonitor();
    this.monitor.attachAll(this.net.neurons);
    // P218 (2026-05-21): substrate-aware registry — N14Pools / inputDim=50 dispatch.
    this.registry = buildClusterRegistryFromN13(activeInputs, payload.preset);
    this.buildClusterActiveInputs = activeInputs;
    this.buildPreset = payload.preset;
    return {
      neuronsAdded: result.neuronsAdded,
      synapsesAdded: result.synapsesAdded,
      outClusters: result.outClusters,
      outTotal: result.outTotal,
      inputDim: result.inputDim,
      preset: result.preset,
    };
  }

  private handleRestoreSnapshot(payload: RestoreSnapshotPayload): RestoreSnapshotResult {
    const restored = NeuralNetwork.restore(payload.snapshot);
    this.net = restored;
    this.monitor = new SpikeMonitor();
    this.monitor.attachAll(restored.neurons);
    // Fix CPM-1 inputDim=32 stale (2026-05-31): preset hint 영역 caller 정합
    // forward — 미동봉 시 default 'n13_orientation' (32-dim) 영역 catch
    // (legacy snapshot backward compat). this.buildPreset 영역 후속 expandCluster
    // / clusterPoolUsage path 영역 정합 catch.
    if (payload.preset) {
      this.buildPreset = payload.preset;
    }
    // 토폴로지 기반으로 cluster 슬롯 추론 — preset hint 영역 V1/V2 pool 크기
    // 분기 (N13/N14/N15/N16 Pools).
    const registry = inferClusterRegistry(
      restored.neurons.map((n) => n.name),
      payload.preset,
    );
    // 사용자 catch 2026-05-12 (snapshot-activeinputs-persist):
    //   activeInputs hydrate 우선순위 (높음 → 낮음):
    //   1. payload.clusterActiveInputs (caller 영역 명시 — gesture preset 영역
    //      hard-coded GESTURE_CLUSTER_ACTIVE_INPUTS 영역 정합 path).
    //   2. payload.snapshot.clusterActiveInputs (schema=3, 사용자 catch fix —
    //      registry round-trip 보존 영역 직전 학습 cluster activeInputs hydrate).
    //   3. fallback — inferClusterRegistry 영역 빈 배열 (legacy schema 1/2 영역
    //      backward compat — 단 exact match 영역 miss 영역 catch).
    //
    // 사용자 mental model 영역 직접 fix path:
    //   "왜 패턴2가 winner로 나와야 할 것 같은데, 새로운 패턴5가 생기고, 재학습을
    //    하게 되는지" — 직전 reload path 영역 activeInputs=[] 영역 catch 영역
    //   findExactMatchCluster 영역 미작동 → exact match miss → inputMatch=0 →
    //   vigilance miss → expandClusterAsync (신규 패턴 5 spawn) → 재학습 loop.
    //   본 hydrate path 영역 직전 학습 cluster activeInputs 보존 → exact match
    //   영역 정상 작동 → 패턴 2 영역 winner 영역 정합.
    const snapshotClusterActiveInputs =
      (payload.snapshot as { clusterActiveInputs?: number[][] }).clusterActiveInputs;
    const hydrateSource: number[][] | undefined =
      payload.clusterActiveInputs && payload.clusterActiveInputs.length > 0
        ? payload.clusterActiveInputs
        : snapshotClusterActiveInputs && snapshotClusterActiveInputs.length > 0
          ? snapshotClusterActiveInputs
          : payload.clusterActiveInputs;
    if (hydrateSource) {
      for (let i = 0; i < registry.slots.length; i += 1) {
        const ai = hydrateSource[i];
        if (ai) registry.slots[i].activeInputs = ai.slice();
      }
      // Fix #20 (2026-05-10): dynamic length 영역 보존 — 직전 .slice(0, 4)
      // 영역 4 cluster cap 영역 폐기. zero-init 영역 [] 영역 자연 보존.
      this.buildClusterActiveInputs = hydrateSource.map((ai) => ai.slice());
    }
    this.registry = registry;
    return {
      neurons: restored.size(),
      synapses: restored.synapses.length,
      totalClusters: registry.slots.length,
      t: restored.t,
    };
  }

  private handleRun(payload: RunPayload): RunResult {
    const net = this.requireNet();
    net.run(payload.durationMs, {
      dtMs: payload.dtMs,
      stdpEnabled: payload.stdpEnabled,
      stdpGain: payload.stdpGain,
      stdpMode: payload.stdpMode,
    });
    return { t: net.t, durationMs: payload.durationMs };
  }

  private handleRegionFiringRates(payload: RegionFiringRatesPayload): RegionFiringRatesResult {
    // PR fix/live-mode-time-and-restore — Fix 5: region 단위 평균 firing rate.
    // 사용자 catch 2026-05-09 (broken state — V1 0/512, V2 0/288): Live tick
    // 영역 cluster_rates max proxy 영역 — 실 spike rate 영역 catch 영역 본 RPC
    // 영역 region 영역 모든 excitatory neuron 영역 평균 (Hz).
    const net = this.requireNet();
    const monitor = this.monitor;
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    // region prefix 매핑 — n13 substrate 정합.
    //   'V1'      → V1_L4_E_* + V1_L23_E_*  (excitatory only — I 영역 제외)
    //   'V2'      → V2_L4_E_* + V2_L23_E_* + V2_L5_E_*
    //   'OUT'     → out_*
    //   'V1_L23'  → V1_L23_E_* (cluster firing 정합)
    //   'V2_L5'   → V2_L5_E_* (cluster firing 정합 — sub-cluster aware)
    // FINDING-1 fix 2026-05-10: substrate neuron 명 영역 lowercase prefix
    // (`v1_L4_E_*`, `v2_L5_E_*` etc — n13-orientation.ts 정합) — 기존 대문자
    // prefix 영역 case-sensitive `startsWith` mismatch → 매 호출 count=0/hz=0
    // → fallback proxy 영역 silent failure (Fix 5 무력화).
    const prefixes: Record<typeof payload.region, string[]> = {
      V1: ['v1_L4_E_', 'v1_L23_E_'],
      V2: ['v2_L4_E_', 'v2_L23_E_', 'v2_L5_E_'],
      OUT: ['out_'],
      V1_L23: ['v1_L23_E_'],
      V2_L5: ['v2_L5_E_'],
    };
    const prefList = prefixes[payload.region];
    // SEC-8 defensive guard — hostile/unknown region 영역 silent { hz: 0 }
    // 응답 (throw 영역 worker crash 회피).
    if (!prefList) {
      return { region: payload.region, hz: 0, neuronCount: 0, firingCount: 0 };
    }
    let sum = 0;
    let count = 0;
    // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount —
    // hz > 0 인 neuron 수 (NodeLearn V1/V2 strip 'firing/total' source).
    let firingCount = 0;
    for (const n of net.neurons) {
      let match = false;
      for (const p of prefList) {
        if (n.name.startsWith(p)) {
          match = true;
          break;
        }
      }
      if (!match) continue;
      const hz = monitor.firingRate(n.name, net.t, payload.windowMs);
      sum += hz;
      count += 1;
      if (hz > 0) firingCount += 1;
    }
    return {
      region: payload.region,
      hz: count > 0 ? sum / count : 0,
      neuronCount: count,
      firingCount,
    };
  }

  private handleFiringRates(payload: FiringRatesPayload): FiringRatesResult {
    const net = this.requireNet();
    const monitor = this.monitor;
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    const out: Array<{ name: string; hz: number }> = [];
    if (payload.names) {
      for (const name of payload.names) {
        out.push({ name, hz: monitor.firingRate(name, net.t, payload.windowMs) });
      }
    }
    if (payload.prefixes) {
      const prefixes = payload.prefixes;
      for (const n of net.neurons) {
        for (const p of prefixes) {
          if (n.name.startsWith(p)) {
            out.push({ name: n.name, hz: monitor.firingRate(n.name, net.t, payload.windowMs) });
            break;
          }
        }
      }
    }
    return { rates: out };
  }

  private handleExpandCluster(payload: ExpandClusterPayload): ExpandClusterResult {
    const net = this.requireNet();
    const registry = this.requireRegistry();
    const monitor = this.monitor;
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    // PR #203 polish (LOW SEC 2026-05-10): activeInputs invariant —
    //   - length > 0 (empty 영역 throw, 본 path 영역).
    //   - length <= inputDim (32 for n13 32-dim) — caller (live-snn.runAutoLearnLoop)
    //     영역 16-vec pattern 영역 v > 0.5 binary catch 영역 자연 정합 (Set
    //     영역 unique + bounded). out-of-range 영역 expandCluster 영역 신뢰
    //     (caller 영역 trusted in-process — worker RPC 영역 외부 unsanitized
    //     input 영역 0). 본 invariant 영역 caller 영역 책임 명시 catch.
    if (payload.activeInputs.length === 0) {
      throw new Error('activeInputs 비어있음');
    }
    // P218 diagnostic — reset 영역 spawn 영역 영역 첫 reinforce 영역 영역 log.
    this._p218LoggedFirstReinforce = false;
    // 사용자 catch 2026-05-25 (production incremental forced-disjoint):
    //   payload.forceDisjoint=true 영역 기존 registry 영역 모든 slot 영역
    //   activeInputs 영역 union 영역 claimed 산출 + payload.activeInputs 영역
    //   영역 claimed 영역 제거 영역 disjoint sub-pool 영역 자동 확보.
    //
    //   결과 영역 길이 0 영역 edge case (rare — 모든 features 영역 이미 claimed
    //   영역) 영역 fallback: claimed 무시 + payload.activeInputs 그대로 (학술
    //   정합 단 disjoint 깨짐) + console.warn 영역 정직 catch.
    //
    //   학술 정합: Carpenter & Grossberg 1987 ART vigilance + sparse coding
    //   (Olshausen & Field 1996) 영역 cluster active inputs disjoint canonical.
    // worker single-threaded — concurrent spawn race 0 (postMessage queue 영역
    // 순차 dispatch 영역 정합, claimed Set 산출 ↔ expandCluster 영역 race 0).
    let activeInputs = payload.activeInputs;
    // 사용자 catch 2026-06-01: rawActiveInputs (forceDisjoint 영역 영역 candidate,
    // 사용자 의도 영역 영역 영역) 영역 별도 보존 — slot.rawActiveInputs 영역
    // store → vigilance check 영역 raw 사용 → 동일 패턴 영역 inputMatch=1.0.
    const rawActiveInputs = payload.activeInputs.slice();
    let fallbackUsed: boolean | undefined;
    let claimedSize: number | undefined;
    if (payload.forceDisjoint) {
      const claimed = new Set<number>();
      for (const slot of registry.slots) {
        for (const ai of slot.activeInputs) claimed.add(ai);
      }
      claimedSize = claimed.size;
      const filtered = payload.activeInputs.filter((i) => !claimed.has(i));
      if (filtered.length === 0) {
        fallbackUsed = true;
        console.warn(
          '[handleExpandCluster] forceDisjoint fallback — 모든 candidate activeInputs 영역 ' +
            `이미 claimed (existing slots: ${registry.slots.length}, candidate: ` +
            `[${payload.activeInputs.join(',')}], claimedSize: ${claimedSize}). ` +
            'disjoint 영역 깨짐 영역 인정 + plain activeInputs 영역 spawn. ' +
            'registry capacity 영역 점검 권장.',
        );
      } else {
        fallbackUsed = false;
        activeInputs = filtered;
      }
    }
    const before = net.neurons.length;
    const result = expandCluster(net, registry, {
      activeInputs,
      rawActiveInputs,
      seed: payload.seed,
    });
    // 새 뉴런들에도 monitor listener 부착 (없으면 firing rate 0 으로 보임).
    for (let i = before; i < net.neurons.length; i += 1) {
      monitor.attach(net.neurons[i]);
    }
    return {
      newClusterId: result.newSlot.id,
      totalClusters: registry.slots.length,
      neuronsAdded: result.neuronsAdded,
      synapsesAdded: result.synapsesAdded,
      activeInputs: result.newSlot.activeInputs,
      fallbackUsed,
      claimedSize,
    };
  }

  private handleClusterFiringRates(payload: ClusterFiringRatesPayload): ClusterFiringRatesResult {
    const net = this.requireNet();
    const monitor = this.monitor;
    const registry = this.requireRegistry();
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    const layer: 'OUT' | 'V1_L23' | 'V2_L5' = payload.layer ?? 'OUT';
    // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 동봉 시점 영역
    // input cardinality normalize 영역 catch (Wiesel 1981 receptive field cardinality
    // fairness 영역 정합). 미동봉 영역 raw rate 영역 fallback (legacy path 호환).
    // OUT layer 영역 only normalize 적용 — V1_L23 / V2_L5 영역 cluster sub-pool
    // 영역 정합 catch 영역 동일 적용 가능 단 본 path 영역 OUT winner mismatch
    // 영역 root cause 영역 catch 영역 OUT only.
    // P218 (2026-05-20): 16/25-dim raw → 32/50-dim 확장 (dispatchComputeFeature).
    const patternFeat = payload.pattern ? dispatchComputeFeature(payload.pattern) : null;
    const activeIdx: Set<number> | null = patternFeat
      ? new Set(patternFeat.map((v, i) => (v > activationThreshold(patternFeat.length) ? i : -1)).filter((i) => i >= 0))
      : null;
    const rawRates = registry.slots.map((slot) => {
      const names =
        layer === 'OUT' ? slot.out : layer === 'V1_L23' ? slot.v1L23E : slot.v2L5E;
      let sum = 0;
      for (const name of names) sum += monitor.firingRate(name, net.t, payload.windowMs);
      return names.length > 0 ? sum / names.length : 0;
    });
    const rates = rawRates.map((raw, ci) => {
      if (!activeIdx || layer !== 'OUT') return raw;
      const slot = registry.slots[ci];
      let overlap = 0;
      for (const ai of slot.activeInputs) {
        if (activeIdx.has(ai)) overlap += 1;
      }
      // PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner
      // 정정, 2026-05-10): 직전 divisor=overlap (linear) 영역 horizontal
      // pattern (cluster 0 overlap=4) 영역 raw firing 4× penalty → other
      // cluster (overlap=1) 영역 winner 영역 정정. divisor=sqrt(overlap)
      // 영역 swap 영역 horizontal pattern 영역 divisor=2 (vs 1) 영역 4-cell
      // active mass 영역 winner 보장. 학술 정합 — Wiesel 1981 receptive field
      // cardinality fairness 영역 sub-linear normalization (sqrt) 영역
      // 정합. overlap=0 영역 raw fallback (silent cluster — divisor floor 회피).
      return overlap > 0 ? raw / Math.max(1, Math.sqrt(overlap)) : raw;
    });
    let max = 0;
    let second = 0;
    let winner = -1;
    let total = 0;
    for (let i = 0; i < rates.length; i += 1) {
      total += rates[i];
      if (rates[i] > max) {
        second = max;
        max = rates[i];
        winner = i;
      } else if (rates[i] > second) {
        second = rates[i];
      }
    }
    // 사용자 catch 2026-05-12 (exact-match-winner-force): RECENT oscillation
    // 정정 — 동일 input 영역 cluster 영역 activeInputs 영역 정확 일치 영역 cluster
    // 영역 존재 시 → 영역 cluster 영역 winner 강제 (fire rate 영역 영역).
    // fire rate argmax 영역 LIF stochasticity (±15-20% jitter) + Dense WTA
    // cross-talk (학습된 2 cluster 동시 fire) 영역 catch 영역 oscillation 영역
    // root cause → exact match 영역 deterministic 영역 lock.
    // 학술 정합: Carpenter-Grossberg 1987 ART resonance — exact template match
    // 영역 winner deterministic. exact match 0 영역 기존 fire rate path fallback.
    // 사용자 mental model: 동일 input → deterministic 동일 cluster winner
    // (fire rate / silent / cardinality 영역 영역) — RECENT 영역 들쑥날쑥 0.
    let forcedExact = false;
    // 사용자 catch 2026-05-12 (snapshot-activeinputs-persist Part B —
    //   fire-rate fallback vigilance pass):
    //   exact match 영역 miss + fire-rate winner 영역 emerge + Jaccard(I, T_winner)
    //   >= 0.5 영역 vigilance pass 영역 신호 (jaccardPassed=true). spawn loop
    //   회피 — 사용자 mental model "fire rate winner cluster 영역 영역 영역 영역
    //   강화 mandatory". exact match (forcedExact=true) 영역 우선 — 본 fallback
    //   영역 exact miss path 만 catch.
    // Jaccard threshold 0.5 영역 학술 정합 — Jaccard 1901 + Fuzzy ART (Carpenter
    //   1991 ρ=0.5 권장). 신규 input 영역 학습 cluster activeInputs 영역 영역
    //   영역 영역 spawn (Jaccard < 0.5 → vigilance miss → 정상 ART expansion).
    let jaccardFallbackPassed = false;
    let jaccardFallbackValue = 0;
    if (activeIdx && activeIdx.size > 0) {
      const exactCi = findExactMatchCluster(activeIdx, registry.slots);
      if (exactCi >= 0) {
        forcedExact = true;
        winner = exactCi;
        max = rates[exactCi];
        // second 영역 forced winner 영역 제외 영역 max — share/margin 정합.
        second = 0;
        for (let i = 0; i < rates.length; i += 1) {
          if (i === exactCi) continue;
          if (rates[i] > second) second = rates[i];
        }
        // forced 영역 total 영역 0 catch (silent fire) → share/margin 영역
        // 분모 영역 floor 처리 영역 winner 영역 catch (1.0 share / 0 margin
        // — second 영역 0 정합).
        if (total <= 0) total = max > 0 ? max : 1;
      } else if (winner >= 0 && total > 0) {
        // exact match 0 + fire-rate winner 존재 → Jaccard 영역 catch.
        // Jaccard(I, T_winner) = |I ∩ T| / |I ∪ T|. union 영역 inputSize +
        //   templateSize - intersection.
        // 사용자 catch 2026-06-01 (forceDisjoint vigilance fix): raw 사용.
        const winnerSlot = registry.slots[winner];
        const templateInputs = winnerSlot.rawActiveInputs ?? winnerSlot.activeInputs;
        const templateSize = templateInputs.length;
        const inputSize = activeIdx.size;
        if (templateSize > 0) {
          let intersection = 0;
          for (const ai of templateInputs) {
            if (activeIdx.has(ai)) intersection += 1;
          }
          const union = inputSize + templateSize - intersection;
          const jaccard = union > 0 ? intersection / union : 0;
          // P215a (2026-05-19) — Hamming aux vigilance gate:
          //   Jaccard ratio (0..1) 영역 fallback pass 영역 absolute bit
          //   difference 영역 미반영 → 1-bit diff 영역 작은 input 영역 jaccard
          //   영역 0.5+ 영역 false-positive familiarity. Hamming distance
          //   (|A ⊕ B| = |I| + |T| - 2|I ∩ T|) 영역 absolute bit count 영역
          //   catch — MIN_NOVEL_HAMMING_BITS 영역 이상 영역 input 영역 fallback
          //   skip 영역 spawn 강제. 사용자 mental model "조금이라도 다르면 다른
          //   패턴" (2026-05-12 exact equality policy) 영역 정합.
          const hamming = inputSize + templateSize - 2 * intersection;
          if (jaccard >= 0.5 && hamming < MIN_NOVEL_HAMMING_BITS) {
            // fire-rate winner cluster 영역 활성 유지 — 신규 cluster spawn 회피.
            // inputMatch 영역 Jaccard value 영역 catch — caller vigilance gate
            //   (default 0.15) 영역 pass 정합 + 강화 path 영역 동일 trigger.
            jaccardFallbackPassed = true;
            jaccardFallbackValue = jaccard;
          }
        }
      }
    }
    // Fix #22 (사용자 catch 2026-05-10 — 첫번째 패턴만 학습되고 2번째 패턴이 학습이 안됨):
    // Carpenter-Grossberg 1987 ART vigilance ρ canonical 정합. 직전 |I ∩ T| / |I|
    // (one-direction) → 사용자 catch 2026-05-11 (inputmatch-bilateral-jaccard):
    //   "패턴에 포함된 4x4 그리드에 모양이 비슷하거나 포함일 경우 새로운 패턴이
    //    아닌 기존 패턴으로 인식 (패턴의 모양이 인식되는 것이 아니라, 종속여부가
    //    인식되는 것 같습니다.)"
    // root cause: subset input (I=[0..3] 4 cells) 영역 superset template (T=[0..7] 8
    // cells) 영역 |I ∩ T| / |I| = 4/4 = 1.0 → vigilance pass 영역 기존 cluster 영역
    // false-positive winner. 종속(subset) 영역 패턴 모양 동일 영역 1.0 산출 → 사용자
    // mental model 위배. fix: Jaccard similarity (symmetric set similarity 학술 표준)
    //   inputMatch = |I ∩ T| / |I ∪ T|
    // - 동일 (I=T): 4/4 = 1.0 → vigilance pass (학습 후 familiar) ✓
    // - subset (I⊂T, |I|=4, |T|=8): 4/8 = 0.5 → < 0.7 → vigilance miss → spawn ✓
    // - disjoint: 0/N = 0.0 → vigilance miss → spawn ✓
    // 학술 정합: Jaccard 1901 set similarity index — symmetric, 0=disjoint, 1=identical.
    // ART canonical |I ∩ T| / |I| 영역 input subset 영역 1.0 산출 영역 결함 — Jaccard
    // 영역 |I ∪ T| 분모 영역 template 크기 영역 반영 → subset/superset 영역 단방향
    // false-positive 차단. pattern 미동봉 (legacy path) 영역 1.0 fallback (backward compat).
    let inputMatch = 1.0;
    if (activeIdx && winner >= 0 && total > 0) {
      const winnerSlot = registry.slots[winner];
      // 사용자 catch 2026-06-01 (forceDisjoint vigilance fix):
      //   rawActiveInputs (forceDisjoint 전 candidate) 우선 사용 — 같은
      //   패턴이면 inputMatch=1.0 도달. legacy snapshot 또는 미동봉 시
      //   activeInputs (filtered sub-pool) fallback (backward compat).
      const usingRaw = winnerSlot.rawActiveInputs !== undefined;
      const templateInputs = winnerSlot.rawActiveInputs ?? winnerSlot.activeInputs;
      const inputSize = activeIdx.size;
      const templateSize = templateInputs.length;
      if (inputSize > 0) {
        let intersection = 0;
        for (const ai of templateInputs) {
          if (activeIdx.has(ai)) intersection += 1;
        }
        // 사용자 catch 2026-05-12 (exact-equality-vigilance):
        // binary equality — I == T (set 영역 정확 일치) → 1.0, 아니면 0.0.
        // 사용자 명시 "조금이라도 다르면 다른 패턴" + "완벽 일치" 정합.
        inputMatch = computeExactInputMatch(intersection, inputSize, templateSize);
        // VIG-DIAG (2026-06-01 → 06-03 dev-mode flag):
        //   vigilance miss 시점만 출력 + dev-mode flag 적용.
        //   production default: silent (`globalThis.__HANDFACE_VIG_DIAG` 영역
        //   미설정 시 출력 안 함).
        //   사용자가 dev tools console 영역 `globalThis.__HANDFACE_VIG_DIAG = true`
        //   영역 활성화 시 vigilance miss 시점 영역 진단 정보 출력.
        if (inputMatch === 0 && isVigDiagEnabled()) {
          const patternOnly: number[] = [];
          const templateOnly: number[] = [];
          const templateSet = new Set(templateInputs);
          for (const ai of activeIdx) {
            if (!templateSet.has(ai)) patternOnly.push(ai);
          }
          for (const ai of templateInputs) {
            if (!activeIdx.has(ai)) templateOnly.push(ai);
          }
          console.log(
            `[VIG-DIAG] winner=cluster${winner} template=${usingRaw ? 'raw' : 'filtered'} ` +
            `template[${templateSize}]=[${templateInputs.join(',')}] ` +
            `pattern[${inputSize}]=[${[...activeIdx].sort((a, b) => a - b).join(',')}] ` +
            `intersection=${intersection} inputMatch=0.000 → MISS → spawn 시도 ` +
            `(pattern_only=[${patternOnly.join(',')}], template_only=[${templateOnly.join(',')}])`,
          );
        }
        // 사용자 catch 2026-05-12 (snapshot-activeinputs-persist Part B):
        //   exact match miss + Jaccard fallback pass (>= 0.5) → inputMatch 영역
        //   Jaccard value 영역 catch (vigilance gate pass + 강화 path 영역 trigger).
        //   사용자 mental model "fire rate winner cluster 강화 mandatory" 영역 정합.
        if (!forcedExact && jaccardFallbackPassed && inputMatch < jaccardFallbackValue) {
          inputMatch = jaccardFallbackValue;
        }
      } else {
        inputMatch = 0;
      }
    } else if (winner < 0 || total <= 0) {
      inputMatch = 0;
    }
    // 사용자 catch 2026-05-12 (exact-match-stability-fix):
    //   "패턴 인식은 올바름, 단 안정도 -178%가 의미하는게 맞는지 모르겠습니다."
    //   스크린샷: LEARN/INFER winner=cluster 1, 정확도=74%, 안정도=-178%.
    //   원인: 패턴 1 fire=82Hz, 패턴 2 fire=229Hz → 직전 margin = (82-229)/82 =
    //   -1.79 = -179% (sign negative, 사용자 mental model 위배).
    // root cause: PR #237 exact-match winner force 영역 winner cluster (exactCi)
    // 영역 fire rate (rates[exactCi]) 영역 다른 cluster fire rate 영역 영역 영역
    // 영역 negative margin 영역 자연 산출 → 영역 "stability" metric (사용자 UI
    // 영역 안정도) 영역 fire-rate dominance 영역 mismatch.
    // fix: forcedExact path 영역 share/margin 영역 1.0 hard-set — exact template
    // match 영역 deterministic perfect stability (Carpenter-Grossberg 1987 ART
    // resonance 영역 vigilance pass 영역 winner deterministic 정합). fire rate
    // dominance 영역 LIF stochasticity / cross-talk 영역 영역 영역 vigilance
    // metric 영역 영역. exact match 0 영역 기존 fire-rate margin path 보존
    // (PR #232/#231 정합).
    return {
      rates,
      // exact-match force 영역 winner 영역 항상 return — silent fire 영역 영역
      // deterministic catch. fallback path 영역 기존 total>0 gate 보존.
      winner: forcedExact ? winner : (total > 0 ? winner : -1),
      share: forcedExact ? 1 : (total > 0 ? max / total : 0),
      margin: forcedExact ? 1 : (max > 0 ? (max - second) / max : 0),
      inputMatch,
      layer,
      // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forcedExact boolean
      // 영역 emit — main thread 영역 NeuronFiringDetail 영역 propagate 영역 NodeInfer
      // / NodeLearn 영역 winner card "EXACT MATCH (deterministic)" badge 표시 정합.
      forcedExact,
    };
  }

  // CPM-1 diagnostic (2026-05-31) — Cluster Pool Metric Phase 1.
  // 사용자 production observation (handface.whatpull.com 2026-05-30):
  //   "cluster 1 spawn — disjoint sub-pool 고갈 fallback (claimed 18 features)"
  // H2 (sub-pool exhaustion) 영역 confirmation 영역 minimal viable metric —
  //   - inputDim (e.g., 32 for n13, 50 for n14, 75 for n16)
  //   - per-cluster claimed sub-pool size (length of activeInputs)
  //   - K×K Jaccard overlap matrix (disjointness 측정)
  // side-effect 0 — registry read-only. monitor / net.t 영역 touch 0.
  private handleClusterPoolUsage(): ClusterPoolUsageResult {
    const registry = this.requireRegistry();
    const slots = registry.slots;
    const K = slots.length;
    const inputDim = registry.inputDim;
    const claimedUnion = new Set<number>();
    const perCluster: ClusterPoolUsageResult['perCluster'] = [];
    for (const slot of slots) {
      for (const ai of slot.activeInputs) claimedUnion.add(ai);
      perCluster.push({
        clusterId: slot.id,
        subPoolSize: slot.activeInputs.length,
        activeInputs: slot.activeInputs.slice(),
      });
    }
    // K×K Jaccard overlap matrix.
    const overlapMatrix: number[][] = Array.from({ length: K }, () =>
      Array.from({ length: K }, () => 0),
    );
    for (let i = 0; i < K; i += 1) {
      const setI = new Set(slots[i].activeInputs);
      for (let j = 0; j < K; j += 1) {
        if (i === j) {
          overlapMatrix[i][j] = 1.0;
          continue;
        }
        const setJ = new Set(slots[j].activeInputs);
        let inter = 0;
        for (const v of setI) if (setJ.has(v)) inter += 1;
        const union = setI.size + setJ.size - inter;
        overlapMatrix[i][j] = union > 0 ? inter / union : 0;
      }
    }
    return {
      inputDim,
      totalClaimedFeatures: claimedUnion.size,
      perCluster,
      overlapMatrix,
    };
  }

  private handleClusterTrainRStdp(payload: ClusterTrainRStdpPayload): ClusterTrainRStdpResult {
    const net = this.requireNet();
    const monitor = this.monitor;
    const registry = this.requireRegistry();
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    if (
      payload.targetCluster < 0 ||
      payload.targetCluster >= registry.slots.length
    ) {
      throw new Error(
        `targetCluster ${payload.targetCluster} 범위 밖 (slots ${registry.slots.length})`,
      );
    }
    const intensity = payload.intensity ?? 25;
    const stimulusDurationMs = payload.stimulusDurationMs ?? 30;
    const observeMs = payload.observeMs ?? 50;
    const dtMs = payload.dtMs ?? 0.1;
    const rewardGain = payload.rewardGain ?? 2.0;
    const punishGain = payload.punishGain ?? 0.5;

    const ratesHistory: number[][] = [];
    const winnerHistory: number[] = [];
    let correct = 0;

    for (const pattern of payload.patterns) {
      // PR fix/live-mode-time-and-restore — Fix 1 (batch path): inject 영역
      // time 영역 net.t 정합 (직전 buggy time:0 영역 net.t 누적 영역 모든 stale
      // impulse 영역 1-step burst collapse → V1 attenuated → OUT silent).
      const tNow = net.t;
      // 1. inject(pattern) — raw → 확장 (n13: 16→32, n14: 25→50). 이미 expanded 영역 그대로.
      const feat = dispatchComputeFeature(pattern);
      const thrInject = activationThreshold(feat.length);
      const events = feat
        .map((v, i) => {
          if (v <= thrInject) return null;
          return {
            neuron: `in_feat_${i}`,
            weight: intensity * v,
            time: tNow,
            durationMs: stimulusDurationMs,
            stepMs: dtMs,
          };
        })
        .filter((e): e is NonNullable<typeof e> => e !== null);
      if (events.length > 0) net.inject(events);

      // 2. measure pass — STDP off.
      net.run(observeMs, { dtMs, stdpEnabled: false });
      // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 measureClusterRates
      // 영역 전달 — input cardinality normalize 영역 catch (Wiesel 1981 receptive
      // field cardinality fairness 영역 정합).
      const measure = this.measureClusterRates(observeMs, pattern);
      ratesHistory.push(measure.rates);
      winnerHistory.push(measure.winner);
      const isCorrect = measure.winner === payload.targetCluster;
      if (isCorrect) correct += 1;
      // P218 diagnostic — first reinforce 영역만 log + V1_L4 cascade verify.
      // setPattern dim bug fix 후 (2026-05-21) 영역 모든 cluster 정상 작동 확인 영역
      // 영역 minimal trace 영역만 유지.
      if (this.buildPreset === 'n14_extended' && !this._p218LoggedFirstReinforce) {
        const ratesStr = measure.rates.map((r, i) => `c${i}:${r.toFixed(0)}`).join(' ');
        console.log(`[P218 reinforce first] target=${payload.targetCluster} winner=${measure.winner} rates=${ratesStr} isCorrect=${isCorrect}`);
        const targetSlot = registry.slots[payload.targetCluster];
        if (targetSlot) {
          const monitor = this.monitor!;
          const layerRate = (names: string[]): string => {
            if (names.length === 0) return '0.0';
            let sum = 0;
            for (const n of names) sum += monitor.firingRate(n, net.t, observeMs);
            return (sum / names.length).toFixed(1);
          };
          // 입력→V1_L4 firing summary (cascade health proxy).
          const inFeatNames = targetSlot.activeInputs.map((i) => `in_feat_${i}`);
          let inFireCount = 0;
          for (const n of inFeatNames) if (monitor.firingRate(n, net.t, observeMs) > 0) inFireCount += 1;
          console.log(
            `[P218 cascade c${payload.targetCluster}] IN_fire=${inFireCount}/${inFeatNames.length} V1L4=${layerRate(targetSlot.v1L4E)} V2L5=${layerRate(targetSlot.v2L5E)} OUT=${layerRate(targetSlot.out)}`
          );
        }
        this._p218LoggedFirstReinforce = true;
      }

      // 3. reward pass — 같은 자극 재 inject + STDP on with modulated gain.
      // (자극 재인입 없으면 직전 spike 이후 net 영역 quiescent — STDP 효과 0.)
      // 영역 measure run() 후 영역 net.t 영역 갱신 catch 영역 tNow2 영역 재catch.
      const tNow2 = net.t;
      if (events.length > 0) {
        const reEvents = events.map((e) => ({ ...e, time: tNow2 }));
        net.inject(reEvents);
      }
      const gain = isCorrect ? rewardGain : punishGain;

      // Fix #20 Part E (2026-05-10): supervisor pulse — 신규 spawn cluster
      // 영역 V2_L5→OUT cascade 영역 sparse / weak (initial weights — measure
      // pass 영역 fire 0 catch). R-STDP 영역 spike-pair 0 영역 weight 변화 0
      // → cluster 영역 강화 영역 30 trial 영역 0 효과 (사용자 catch root cause).
      // 정정: target OUT cluster 영역 직접 supervisor pulse 영역 inject — 강제
      // post-synaptic fire 영역 pre (V2_L5_E) post (OUT) spike pair 영역 형성
      // → Hebbian LTP 영역 정상 적용.
      // 학술 정합: Diehl & Cook 2015 supervised label injection — teacher
      // signal 영역 target OUT 영역 강제 fire (one-hot pulse), Florian 2007
      // R-STDP 영역 spike pair 영역 mandatory 정합. correct 시점만 적용 — wrong
      // winner 영역 LTD 영역 reward mask 영역 0 정합.
      const targetCi = payload.targetCluster;
      // P218 (2026-05-21) — supervisor pulse 영역 ALWAYS fire on target.
      //
      // 직전 condition `isCorrect || winner === -1` 영역 wrong winner 영역
      // skip — N=3 5×5 substrate 영역 영역 chicken-and-egg bug 영역 root cause.
      // cluster 0 영역 영역 spurious 영역 winner 영역 영역 (Pattern 1 영역 fire
      // 영역 영역 — 영역 영역 영역 영역 영역 영역) supervisor pulse skip →
      // cluster 1 영역 train 영역 영역 → cluster 1 silent → 영원히 cluster 0
      // 영역 winner. 영역 condition 영역 영역 영역 forced LTP path 영역
      // mandatory 영역 — Diehl & Cook 2015 supervised label injection 영역
      // teacher signal 영역 winner-independent forced post-synaptic fire 영역
      // 학술 정합.
      //
      // cross-pollution 회피 영역 영역 영역 punishGain (0.1-0.2) 영역 영역
      // 영역 reward gain (0.8) 영역 영역 영역 영역 영역 cluster 영역 weight
      // 영역 영역 영역 (8:1 ratio, P215h 영역 정합).
      if (true) {
        const targetSlot = registry.slots[targetCi];
        if (targetSlot) {
          const supervisorEvents = targetSlot.out.map((name) => ({
            neuron: name,
            // 영역 V_th -55 영역 강제 fire 영역 충분 강도 — 30 영역 단일 spike,
            // sustained durationMs 영역 multi-spike (Hebbian spike-pair 보장).
            weight: 30.0,
            time: tNow2,
            durationMs: stimulusDurationMs,
            stepMs: dtMs,
          }));
          if (supervisorEvents.length > 0) net.inject(supervisorEvents);
        }
      }

      // QA CAUSE A fix (2026-05-10): synapse cluster mask 영역 swap-restore.
      // 직전 reward pass 영역 GLOBAL stdpGain 영역 모든 발화 neuron 영역 LTP 적용
      // → cluster 별 selective 0 → cross-cluster strengthen → margin 약화 영역
      // root cause. 학술 정합: Florian 2007 R-STDP / Izhikevich 2007 DA-STDP
      // region-specific gating — reward 영역 target cluster 영역 incoming synapse
      // 영역만 적용. swap-restore 영역 worker thread sequential FIFO 영역 정합
      // — race 0.
      const savedMultipliers = this.applyClusterRewardMask(targetCi);
      try {
        net.run(observeMs, { dtMs, stdpEnabled: true, stdpGain: gain, stdpMode: payload.stdpMode });
      } finally {
        this.restoreClusterRewardMask(savedMultipliers);
      }
    }

    const trained = payload.patterns.length;
    return {
      trained,
      correct,
      accuracy: trained > 0 ? correct / trained : 0,
      targetCluster: payload.targetCluster,
      clusterRatesHistory: ratesHistory,
      winnerHistory,
    };
  }

  /**
   * QA CAUSE A fix (2026-05-10): R-STDP region-specific gating.
   *
   * target cluster 영역 incoming synapse 영역만 stdpGainMultiplier 영역 보존 +
   * 그 외 영역 0 영역 set. reward run 후 영역 restoreClusterRewardMask 영역
   * 1.0 (원본) 영역 restore (in-place swap-restore, worker thread sequential
   * FIFO 영역 정합 — race 0).
   *
   * cluster mask 영역 결정 — post neuron 영역 region/population 영역 catch:
   *   - OUT (region='OUT', population=`cluster_${ci}`): ci === target 영역 1.0
   *   - V1_L4_E (region='V1', population='L4_E', name=`v1_L4_E_${idx}`): ci =
   *     floor(idx / V1_L4_PER_SUB) === target 영역 1.0
   *   - V1_L23_E / V2_L4_E / V2_L23_E / V2_L5_E 동일 (each per-sub 정합).
   *   - 그 외 (V1_L4_I / INPUT) 영역 0 (excitatory only — STDP gate 영역 본 path
   *     영역 weight<=0 영역 skip 사실 단 명시 0 영역 정합).
   *
   * 학술 정합: Florian 2007 / Izhikevich 2007 R-STDP — reward 영역 target subspace
   * 영역만 LTP. 본 path 영역 cluster sub-pool 영역 catch 영역 cross-cluster LTP
   * 영역 0 → margin 강화.
   *
   * 정직 한계: expanded cluster (c{N}_v1_L4_E_*, N >= 4) 영역 미지원 — base 4
   * cluster 영역만 catch (registry.slots[targetCi] 영역 정합 catch 영역 follow-up
   * PR 영역 deferred). 본 PR 영역 base 4 cluster 영역 정합 catch.
   */
  private applyClusterRewardMask(targetCi: number): Float64Array {
    const net = this.requireNet();
    const saved = new Float64Array(net.synapses.length);
    for (let i = 0; i < net.synapses.length; i += 1) {
      const syn = net.synapses[i];
      saved[i] = syn.stdpGainMultiplier;
      const ci = this.inferPostCluster(syn.post.name, syn.post.region, syn.post.population);
      // ci === targetCi 영역 1.0 (LTP 적용) / null or 다른 cluster 영역 0 (no LTP).
      // saved value 영역 restore 영역 catch 영역 본 path 영역 1.0 hard-set 영역
      // catch (n13 builder default 영역 1.0 정합 — multiplier 영역 expandCluster
      // 영역 1.0 default 정합).
      syn.stdpGainMultiplier = ci === targetCi ? 1.0 : 0.0;
    }
    return saved;
  }

  private restoreClusterRewardMask(saved: Float64Array): void {
    const net = this.requireNet();
    for (let i = 0; i < net.synapses.length && i < saved.length; i += 1) {
      net.synapses[i].stdpGainMultiplier = saved[i];
    }
  }

  /**
   * post neuron name + region + population 영역 catch 영역 cluster id 추론.
   * - n13 builder base 4 cluster (`v1_L4_E_${idx}` etc) 영역 ci = floor(idx/per-sub).
   * - OUT (`out_${ci}_${ni}`) 영역 ci 직접 추출.
   * - expanded cluster (`c${N}_v1_L4_E_*`) 영역 N === ci.
   * - 그 외 (V1_L4_I, INPUT, in_feat_*) 영역 null (mask 영역 0 적용).
   */
  private inferPostCluster(name: string, region: string | null, population: string | null): number | null {
    if (region === 'INPUT') return null;
    if (region === 'OUT') {
      // OUT — out_${ci}_${ni} 또는 expanded out_${ci}_${ni} (cluster_${ci} 정합).
      const m = /^out_(\d+)_(\d+)$/.exec(name);
      if (m) return Number(m[1]);
      return null;
    }
    // V1/V2 — inhibitory 영역 population 영역 'L4_I' / 'L23_I' / 'L5_I' 영역 정합 — exclude.
    if (population && population.endsWith('_I')) return null;
    // expanded cluster — c{N}_*.
    const me = /^c(\d+)_/.exec(name);
    if (me) return Number(me[1]);
    // base cluster — v1_L4_E_${idx} etc — per-sub 영역 ci 추론.
    // n13 V1_L4_E=128, V1_L23_E=128, V2_L4_E=128, V2_L23_E=96, V2_L5_E=64 / 4 cluster.
    const baseMatch = /^(v1_L4_E|v1_L23_E|v2_L4_E|v2_L23_E|v2_L5_E)_(\d+)$/.exec(name);
    if (!baseMatch) return null;
    const layer = baseMatch[1];
    const idx = Number(baseMatch[2]);
    const registry = this.registry;
    if (!registry) return null;
    let perSub: number;
    switch (layer) {
      case 'v1_L4_E': perSub = registry.v1L4PerSub; break;
      case 'v1_L23_E': perSub = registry.v1L23PerSub; break;
      case 'v2_L4_E': perSub = registry.v2L4PerSub; break;
      case 'v2_L23_E': perSub = registry.v2L23PerSub; break;
      case 'v2_L5_E': perSub = registry.v2L5PerSub; break;
      default: return null;
    }
    return Math.floor(idx / perSub);
  }

  /**
   * QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): input cardinality normalize.
   *
   * 사용자 catch 2026-05-09 (스크린샷): horizontal pattern (idx 4,5,6,7) 영역
   * winner=cluster 3 (diag-fore) 영역 mismatch — cluster 3 hard-wired sub-pool
   * (idx 3,6,9,12) 영역 idx 6 overlap → 32 V1_L4_E sub-cluster 영역 weight 11.0
   * 영역 fire → diag-fore winner 영역 root cause.
   *
   * 학술 정합 (Wiesel 1981 receptive field cardinality fairness): raw firing rate
   * argmax 영역 input cardinality 영역 unequal (overlap) 영역 fairness 영역 mandatory.
   * normalized = rate / overlap_count — overlap_count 영역 pattern active idx ∩
   * cluster.activeInputs (hard-wired sub-pool). cluster 0 (horizontal) overlap=4
   * vs cluster 3 (diag-fore) overlap=1 → 정규화 후 cluster 0 dominance 정합.
   *
   * 정직 한계:
   * - pattern 미지정 (legacy path) 영역 raw rate 영역 fallback (호환 보존).
   * - overlap=0 cluster 영역 raw rate 그대로 (minimum 1 floor 회피 — silent
   *   cluster 영역 정합).
   * - margin / share 영역 본 정정 path 영역 별도 (handleClusterFiringRates
   *   영역 정합 정정 path 영역 함께).
   */
  private measureClusterRates(
    windowMs: number,
    pattern?: number[],
  ): { rates: number[]; winner: number; rawRates: number[] } {
    const net = this.requireNet();
    const monitor = this.monitor!;
    const registry = this.registry!;
    // P218 (2026-05-20): 16/25-dim raw → 32/50-dim 확장 (dispatchComputeFeature).
    const featForMeasure = pattern ? dispatchComputeFeature(pattern) : null;
    const activeIdx: Set<number> | null = featForMeasure
      ? new Set(featForMeasure.map((v, i) => (v > activationThreshold(featForMeasure.length) ? i : -1)).filter((i) => i >= 0))
      : null;
    const rawRates = registry.slots.map((slot) => {
      let sum = 0;
      for (const name of slot.out) sum += monitor.firingRate(name, net.t, windowMs);
      return slot.out.length > 0 ? sum / slot.out.length : 0;
    });
    const rates = rawRates.map((raw, ci) => {
      if (!activeIdx) return raw;
      const slot = registry.slots[ci];
      let overlap = 0;
      for (const ai of slot.activeInputs) {
        if (activeIdx.has(ai)) overlap += 1;
      }
      // PR-I (사용자 catch 2026-05-09, 2026-05-10): divisor=sqrt(overlap)
      // 영역 swap — handleClusterFiringRates 정합 (Wiesel 1981 receptive
      // field cardinality fairness sub-linear normalization).
      // overlap=0 영역 raw 영역 fallback (silent cluster — divisor floor 회피).
      return overlap > 0 ? raw / Math.max(1, Math.sqrt(overlap)) : raw;
    });
    let max = 0;
    let winner = -1;
    for (let i = 0; i < rates.length; i += 1) {
      if (rates[i] > max) {
        max = rates[i];
        winner = i;
      }
    }
    // 사용자 catch 2026-05-12 (exact-match-winner-force): reinforce/train path
    // 영역 동일 적용 — handleClusterTrainRStdp 영역 measure pass winner 영역
    // deterministic 정합 (R-STDP correct/wrong decision 영역 oscillation 차단).
    if (activeIdx && max > 0) {
      const exactCi = findExactMatchCluster(activeIdx, registry.slots);
      if (exactCi >= 0 && exactCi !== winner) {
        winner = exactCi;
      }
    }
    return { rates, winner: max > 0 ? winner : -1, rawRates };
  }

  // ── PR-B (Web Worker background offload, 2026-05-10): background RPC ──
  //
  // 사용자 catch 2026-05-09 [2]: "학습이나 추론시에 백그라운드에서 동작하면
  // 좋을 것 같습니다. 너무 버벅이고 유저 액션(이벤트)에 지연발생(불편함)"
  //
  // 본 method 영역 inline simulation (inject + run + clusterFiringRates +
  // regionFiringRates × 2) 영역 실행 영역 push event 영역 emit. live-snn.ts
  // triggerOnce + emitTick 영역 동일 semantics — 단 RPC round-trip 영역 5 →
  // 1 절감 + 결과 영역 비동기 push (main thread 영역 await 0).

  private handleTriggerBackground(payload: TriggerBackgroundPayload): void {
    try {
      // PR #192 polish (SEC-1): payload validation guard — defense-in-depth.
      validateTriggerBackgroundPayload(payload);
      const net = this.requireNet();
      // resetThreshold — Diehl & Cook 2015 §3.2 batch frame reset 정합.
      if (payload.resetThreshold) {
        for (const n of net.neurons) {
          n.thresholdOffset = 0;
        }
      }
      let cfr: ClusterFiringRatesResult | null = null;
      // repeats 회 inject + run — Risk 4 mitigation (PR #184 정합).
      // QA FINDING-1 fix (2026-05-10): stdpEnabled 영역 gain>0 catch — stdpGain=0
      // (inferAsync path) 영역 stdpEnabled=true hard-code 영역 applyPairStdp(t, 0)
      // 영역 호출 → trace state mutation (preTrace/postTrace/lastSpikeTimeForTrace)
      // 영역 다음 reinforce 영역 stale trace pollution. gain=0 영역 stdp gate 영역
      // off 영역 trace mutation 0. 학술 정합: Bi & Poo 1998 STDP 영역 trace mutation
      // 영역 gain 무관 사실 — gain=0 영역 weight 영역 unchanged 단 trace 영역 변경
      // → next reward pass 영역 LTP 영역 stale trace 영역 base 영역 catch 사실.
      const stdpEnabled = payload.stdpGain > 0;
      for (let i = 0; i < payload.repeats; i += 1) {
        const tNow = net.t;
        const events = this.buildInjectEventsLocal(payload, tNow);
        if (events.length > 0) net.inject(events);
        net.run(payload.observeMs, {
          dtMs: 0.1,
          stdpEnabled,
          stdpGain: payload.stdpGain,
          stdpMode: payload.stdpMode,
        });
        // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 전달 영역
        // input cardinality normalize 영역 catch (Wiesel 1981 정합).
        cfr = this.handleClusterFiringRates({
          windowMs: payload.observeMs,
          layer: 'OUT',
          pattern: payload.pattern,
        });
      }
      // V1/V2 region rates — 마지막 repeat 후 영역 catch (PR fix Fix 5).
      const v1 = this.handleRegionFiringRates({ region: 'V1', windowMs: payload.observeMs });
      const v2 = this.handleRegionFiringRates({ region: 'V2', windowMs: payload.observeMs });
      if (this.pushEmitter && cfr) {
        this.pushEmitter({
          type: 'push',
          event: 'triggerComplete',
          payload: {
            trialToken: payload.trialToken,
            cfr,
            v1Hz: v1.hz,
            v2Hz: v2.hz,
            // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount 동봉.
            v1FireCount: v1.firingCount,
            v2FireCount: v2.firingCount,
            netTime: net.t,
          },
        });
      }
    } catch (e) {
      // QA FINDING-4 fix (2026-05-10): silent console.warn 영역 catch path 영역
      // push event 'triggerError' 영역 emit — main thread 영역 timeout fall-through
      // 회피 + 사용자 visual catch (snn-error toast). 정직 한계 정정 — 직전
      // silent path 영역 사용자 catch 0 영역 root cause 영역 정합.
      // PR #196 polish (Security LOW-1, 2026-05-10): production 영역 internal
      // Error.message 영역 push payload 영역 paste 영역 generic copy ('내부 오류
      //   — 새로고침 권장') 영역 replace — 사용자 facing toast 영역 stack/path
      //   영역 leak 회피. 원본 Error 영역 console.warn 영역 retain (dev mode 영역
      //   debug catch). validateTriggerBackgroundPayload 등 internal 영역 sensitive
      //   data 영역 0 단 defense-in-depth 영역 generic swap.
      console.warn('[SNNWorkerCore] triggerBackground failed:', e);
      if (this.pushEmitter) {
        this.pushEmitter({
          type: 'push',
          event: 'triggerError',
          payload: {
            trialToken: payload.trialToken,
            source: 'trigger',
            error: '내부 오류 — 새로고침 권장',
          },
        });
      }
    }
  }

  private handleReinforceBackground(payload: ReinforceBackgroundPayload): void {
    try {
      // PR #192 polish (SEC-1): payload validation guard — defense-in-depth.
      validateReinforceBackgroundPayload(payload);
      const net = this.requireNet();
      // P218 (2026-05-21): full state reset — V_m + thresholdOffset +
      // pending PSP events + STDP traces. 잔여 pending events 영역 next sim 영역
      // V_m 영역 다시 영역 elevate 영역 cluster 0 영역 self-sustain root cause.
      for (const n of net.neurons) {
        n.resetState();
      }
      // clusterTrainRStdp 영역 1-pattern batch reuse — 직전 reinforce path 영역 정합.
      // P218 (2026-05-25): dtMs 영역 전달 영역 research mode 영역 5× speed gain.
      const trainResult = this.handleClusterTrainRStdp({
        patterns: [payload.pattern.slice()],
        targetCluster: payload.targetCluster,
        rewardGain: payload.rewardGain,
        punishGain: payload.punishGain,
        observeMs: payload.observeMs,
        stimulusDurationMs: payload.stimulusDurationMs,
        intensity: payload.intensity,
        stdpMode: payload.stdpMode,
        dtMs: payload.dtMs,
      });
      // QA CAUSE B fix (2026-05-10): push payload cfr 영역 measure pass 영역 catch.
      // 직전 reward pass 영역 STDP mutation 직후 영역 별도 clusterFiringRates 호출
      // 영역 measure pass 50ms drop + post-mutation 영역 winner mismatch → push event
      // 영역 trial winner 영역 측정 winner 영역 catch 0. 정정 영역 trainResult
      // 영역 measure pass (clusterRatesHistory[0] + winnerHistory[0]) 영역 source —
      // measure pass winner 영역 정확 reflection.
      // 학술 정합: R-STDP measure pass 영역 trial-level decision (post-reward
      // mutation 영역 next trial 영역 catch 사실 — 본 push 영역 trial 결과 영역
      // catch 영역 measure pass 영역 source 영역 정합).
      const measureRates = trainResult.clusterRatesHistory[0] ?? [0, 0, 0, 0];
      const measureWinner = trainResult.winnerHistory[0] ?? -1;
      let measureMax = 0;
      let measureSecond = 0;
      let measureTotal = 0;
      for (let i = 0; i < measureRates.length; i += 1) {
        measureTotal += measureRates[i];
        if (measureRates[i] > measureMax) {
          measureSecond = measureMax;
          measureMax = measureRates[i];
        } else if (measureRates[i] > measureSecond) {
          measureSecond = measureRates[i];
        }
      }
      // Fix #22 (사용자 catch 2026-05-10) + 사용자 catch 2026-05-11 (inputmatch-
      // bilateral-jaccard): reinforce path 영역 Jaccard similarity 동일 적용 —
      // |I ∩ T| / |I ∪ T|. reinforce 영역 supervised target 영역 catch 영역
      // vigilance 영역 직접 적용 0 단 protocol 정합 catch 영역 동일 field 영역 emit.
      const reinforceRegistry = this.requireRegistry();
      // P218 (2026-05-20): 16/25-dim raw → 32/50-dim 확장 (dispatchComputeFeature).
      const reinforceFeat = dispatchComputeFeature(payload.pattern);
      const reinforceActiveIdx = new Set(
        reinforceFeat.map((v, i) => (v > activationThreshold(reinforceFeat.length) ? i : -1)).filter((i) => i >= 0),
      );
      let reinforceInputMatch = 1.0;
      // 사용자 catch 2026-05-12 (exact-match-stability-fix): exact match 영역
      // 정확 감지 영역 explicit boolean — default reinforceInputMatch=1.0 영역
      // 영역 false-positive 차단 (winnerSlot 영역 undefined 영역 영역 영역 0).
      let reinforceExactMatched = false;
      if (measureWinner >= 0 && reinforceActiveIdx.size > 0) {
        const winnerSlot = reinforceRegistry.slots[measureWinner];
        if (winnerSlot) {
          // 사용자 catch 2026-06-01 (forceDisjoint vigilance fix): raw 사용.
          const reinforceTemplate = winnerSlot.rawActiveInputs ?? winnerSlot.activeInputs;
          let intersection = 0;
          for (const ai of reinforceTemplate) {
            if (reinforceActiveIdx.has(ai)) intersection += 1;
          }
          const inputSize = reinforceActiveIdx.size;
          const templateSize = reinforceTemplate.length;
          // 사용자 catch 2026-05-12 (exact-equality-vigilance): handleClusterFiringRates
          // 영역 동일 helper 영역 catch — reinforce path 영역 protocol 정합 catch
          // 영역 동일 산출 (vigilance 영역 직접 적용 0 단 emit 영역 일관성 보장).
          reinforceInputMatch = computeExactInputMatch(intersection, inputSize, templateSize);
          reinforceExactMatched = reinforceInputMatch === 1.0;
        }
      } else if (measureWinner < 0 || reinforceActiveIdx.size === 0) {
        reinforceInputMatch = 0;
      }
      // 사용자 catch 2026-05-12 (exact-match-stability-fix): reinforce path 영역
      // 동일 적용 — exact match 영역 cluster 영역 share/margin 영역 1.0 hard-set.
      // handleClusterFiringRates path 영역 정합 (LIF stochasticity 영역 영역 영역
      // fire-rate negative margin 차단). reinforceExactMatched 영역 winnerSlot
      // 영역 정확 존재 + computeExactInputMatch === 1.0 영역 영역 영역 catch —
      // default reinforceInputMatch=1.0 영역 false-positive 차단.
      const reinforceExact = reinforceExactMatched;
      const cfr: ClusterFiringRatesResult = {
        rates: measureRates,
        winner: measureWinner,
        share: reinforceExact ? 1 : (measureTotal > 0 ? measureMax / measureTotal : 0),
        margin: reinforceExact ? 1 : (measureMax > 0 ? (measureMax - measureSecond) / measureMax : 0),
        inputMatch: reinforceInputMatch,
        layer: 'OUT',
        // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): reinforce path 영역
        // 동일 적용 — measure pass winner 영역 exact-match cluster 영역 catch path
        // 영역 동일 boolean. caller 영역 NodeLearn LiveLearnPanel 영역 winner card
        // badge 표시 정합.
        forcedExact: reinforceExact,
      };
      const v1 = this.handleRegionFiringRates({ region: 'V1', windowMs: payload.observeMs });
      const v2 = this.handleRegionFiringRates({ region: 'V2', windowMs: payload.observeMs });
      if (this.pushEmitter) {
        this.pushEmitter({
          type: 'push',
          event: 'reinforceComplete',
          payload: {
            trialToken: payload.trialToken,
            targetCluster: payload.targetCluster,
            cfr,
            v1Hz: v1.hz,
            v2Hz: v2.hz,
            // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount 동봉.
            v1FireCount: v1.firingCount,
            v2FireCount: v2.firingCount,
            trained: trainResult.trained,
            correct: trainResult.correct,
            accuracy: trainResult.accuracy,
          },
        });
      }
    } catch (e) {
      // QA FINDING-4 fix (2026-05-10): silent console.warn 영역 push event
      // 'triggerError' 영역 emit (source='reinforce') — main thread 영역 timeout
      // fall-through 회피 + 사용자 visual catch.
      // PR #196 polish (Security LOW-1, 2026-05-10): production 영역 internal
      //   Error.message 영역 push payload 영역 paste 영역 generic copy 영역 replace
      //   — sensitive data leak 회피 (defense-in-depth). 원본 Error 영역 console.warn
      //   영역 retain (dev mode 영역 debug catch). triggerBackground catch 영역 정합
      //   pattern.
      console.warn('[SNNWorkerCore] reinforceBackground failed:', e);
      if (this.pushEmitter) {
        this.pushEmitter({
          type: 'push',
          event: 'triggerError',
          payload: {
            trialToken: payload.trialToken,
            source: 'reinforce',
            error: '내부 오류 — 새로고침 권장',
            targetCluster: payload.targetCluster,
          },
        });
      }
    }
  }

  // triggerBackground inject events helper — raw (16 or 25) → expanded (32 or 50)
  // 자동 확장 후 in_feat_* sustained injection. P218 (2026-05-20): n14 영역 영역
  // 영역 dispatchComputeFeature 영역 dispatch — feat.length 영역 영역 영역 inject 영역 영역.
  private buildInjectEventsLocal(
    payload: TriggerBackgroundPayload,
    currentT: number,
  ): Array<{ neuron: string; weight: number; time: number; durationMs: number; stepMs: number }> {
    const feat = dispatchComputeFeature(payload.pattern);
    const thr = activationThreshold(feat.length);
    const out: Array<{ neuron: string; weight: number; time: number; durationMs: number; stepMs: number }> = [];
    // P218: feat.length 영역 영역 영역 loop bound (n13: 32, n14: 50).
    for (let i = 0; i < feat.length; i += 1) {
      const v = feat[i] ?? 0;
      if (v <= thr) continue;
      out.push({
        neuron: `in_feat_${i}`,
        weight: payload.intensity * v,
        time: currentT,
        durationMs: payload.stimulusDurationMs,
        stepMs: 0.1,
      });
    }
    return out;
  }

  // 테스트용 — 직접 net 접근.
  getNetForTest(): NeuralNetwork | null {
    return this.net;
  }

  getRegistryForTest(): ClusterRegistry | null {
    return this.registry;
  }

  // build 시 명시한 activeInputs (기록용 — Lab UI 가 cluster mapping 표시).
  getBuildClusterActiveInputs(): number[][] {
    return this.buildClusterActiveInputs;
  }
}
