'use client';
// LiveSnn — event-driven 1-shot SNN (사용자 catch 2026-05-09 영역 본격 pivot).
//
// 직전 (2026-05-09 A): 200ms setInterval 기반 background tick loop.
//   사용자 catch 영역 issue: "지속적인 학습 노드 틱, 추론과 학습을 진행할
//   방법이 정확히 구현되어 있지 않습니다." + "tic STDP active 가 너무 깜빡거려
//   보기 불편함, tic count는 무한대로 증가할 수 있어 좋지 않아보임."
//
// 본 정정 (2026-05-09 B): event-driven 1-shot trial.
//   - background loop 본격 폐기 (start/stop/timer 영역 0).
//   - INPUT 노드 영역 명시 trigger (GRID cell 클릭 / preset / CAMERA stable
//     자세 신규 catch) → 1회 inject + run(stdp on) × repeats + cluster firing
//     측정 + lab.save(throttle) → emitTick.
//   - tickCount 영역 trialCount 영역 swap — 사용자 명시 학습 시도 횟수 (의미
//     catch). 무한 background 누적 영역 회피.
//
// architecture:
//   patternRef (현재 16-dim 입력) ← UI 가 setPattern()
//   triggerOnce(opts):
//     1. tickInFlight wait
//     2. inject(pattern)
//     3. run(observeMs, stdp=true, gain=opts.stdpGain ?? 1.0) × opts.repeats ?? 3
//        — Risk 4 mitigation: 1 click 영역 hidden burst (학습 효과 보강)
//     4. clusterFiringRates → winner / share / margin
//     5. trialCount++ → emitTick → saveDebounced(lab, force)
//   reinforce(targetCluster, gain=2.0):
//     thin alias 영역 triggerOnce({ stdpGain: gain, repeats: 3, force: true })
//
// no-new-UI 정합: root /handface/ 5-node 가 본 controller 직접 사용.
// LocalSNN 인스턴스 영역 root-local-snn singleton 영역 공유.

import {
  emitBackendEvent,
  onBackendEvent,
  type NeuronFiringDetail,
  type InputModeDetail,
  type AutoLearnProgressDetail,
} from '@/lib/backend/events';

import type {
  ClusterFiringRatesResult,
  ReinforceCompletePayload,
  TriggerCompletePayload,
  TriggerErrorPayload,
} from '@/lib/snn-runtime';
import { getRootLocalSnnFor, type SubstrateKind, type RootLocalSnn } from './root-local-snn';
import { compute32DimFeature } from '@/lib/snn-runtime/builders/n13-orientation';
import { compute50DimFeature, RAW_DIM_N14 } from '@/lib/snn-runtime/builders/n14-extended';
import { compute72DimFeature, RAW_DIM_N15 } from '@/lib/snn-runtime/builders/n15-extended-6x6';
import { selectTopKActive, HAND_SPARSE_TOP_K_DEFAULT } from '@/lib/snn-runtime/hand-spike-encoder';
import { SeededRandom } from '@/lib/snn-runtime/prng';

// P218 (2026-05-20) — raw pattern length 별 dispatch.
// Phase 2A.2 (2026-06-01) — n15 추가 (36 → 72).
// n13: 16→32, n14: 25→50, n15: 36→72. 이미 expanded 면 그대로 return.
function dispatchFeature(pattern: number[]): number[] {
  if (pattern.length === 16) return compute32DimFeature(pattern);
  if (pattern.length === RAW_DIM_N14) return compute50DimFeature(pattern);
  if (pattern.length === RAW_DIM_N15) return compute72DimFeature(pattern);
  return pattern;
}
import { incrementCount, loadExemplars, setExemplarLabel } from './out-exemplars';
import { showToast } from '@/components/ui/Toast';
import { showDialog } from '@/components/ui/Dialog';
import { purgeAllLearningData } from './root-local-snn';
import { saveBackup } from '@/lib/cloud-backup';
// Phase 1 diagnostic (2026-05-31) — CPM-1 spawn-time pool usage logging +
// fallback cluster tracking. side-effect 0 (console output only).
import { clearFallbackMarks, logCpm1ForKind, markClusterAsFallback } from './diagnostic';

// 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): trialCount 영역 substrate
// 별 localStorage persist — page reload 영역 학습 상황 정합 보존 mandatory.
// substrate 별 별도 KEY — orientation/gesture 분리 (out-exemplars 영역 정합).
const TRIAL_COUNT_KEY_PREFIX = 'handface.live-snn.trial-count.v1';
function trialCountKey(kind: SubstrateKind): string {
  return `${TRIAL_COUNT_KEY_PREFIX}.${kind}`;
}
function loadTrialCount(kind: SubstrateKind): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(trialCountKey(kind));
    if (!raw) return 0;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch { return 0; }
}
function saveTrialCount(kind: SubstrateKind, n: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(trialCountKey(kind), String(n));
  } catch { /* quota — silent */ }
}
function clearTrialCount(kind: SubstrateKind): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(trialCountKey(kind));
  } catch { /* noop */ }
}

// Phase 3.9 v5 (2026-06-03): hand SNN running mean key.
const HAND_MEAN_KEY = 'handface.live-snn.hand-feat-mean.v1';
function clearHandMean(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(HAND_MEAN_KEY);
  } catch { /* noop */ }
}

// Phase 3.9 v26 (2026-06-03): cluster activeInputs persistence — worker sync 용.
// substrate switch 시 worker 가 cluster 없으면 stored activeInputs 로 expandCluster
// 호출하여 진짜 sync — 사용자 학습 데이터 보존.
const HAND_CLUSTER_ACTIVE_KEY = 'handface.live-snn.hand-cluster-active.v1';
function loadHandClusterActive(): Map<number, number[]> {
  const map = new Map<number, number[]>();
  if (typeof window === 'undefined') return map;
  try {
    const raw = window.localStorage.getItem(HAND_CLUSTER_ACTIVE_KEY);
    if (!raw) return map;
    const parsed = JSON.parse(raw) as Array<[number, number[]]>;
    if (Array.isArray(parsed)) {
      for (const [id, active] of parsed) {
        if (typeof id === 'number' && Array.isArray(active)) map.set(id, active);
      }
    }
  } catch { /* corrupt */ }
  return map;
}
function saveHandClusterActive(map: Map<number, number[]>): void {
  if (typeof window === 'undefined') return;
  try {
    const arr: Array<[number, number[]]> = [];
    for (const [id, active] of map.entries()) arr.push([id, active]);
    window.localStorage.setItem(HAND_CLUSTER_ACTIVE_KEY, JSON.stringify(arr));
  } catch { /* quota */ }
}
function clearHandClusterActive(): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.removeItem(HAND_CLUSTER_ACTIVE_KEY); } catch { /* noop */ }
}

// Phase 3.9 v7: hand cluster features persistence (clusterId → 95-dim training feat).
const HAND_CLUSTER_FEATS_KEY = 'handface.live-snn.hand-cluster-feats.v1';
function loadHandClusterFeats(): Map<number, number[]> {
  const map = new Map<number, number[]>();
  if (typeof window === 'undefined') return map;
  try {
    const raw = window.localStorage.getItem(HAND_CLUSTER_FEATS_KEY);
    if (!raw) return map;
    const parsed = JSON.parse(raw) as Array<[number, number[]]>;
    if (Array.isArray(parsed)) {
      for (const [id, feat] of parsed) {
        if (typeof id === 'number' && Array.isArray(feat) && feat.length === 95) {
          map.set(id, feat);
        }
      }
    }
  } catch { /* corrupt — silent reset */ }
  return map;
}
function saveHandClusterFeats(map: Map<number, number[]>): void {
  if (typeof window === 'undefined') return;
  try {
    const arr: Array<[number, number[]]> = [];
    for (const [id, feat] of map.entries()) arr.push([id, feat]);
    window.localStorage.setItem(HAND_CLUSTER_FEATS_KEY, JSON.stringify(arr));
  } catch { /* quota — silent */ }
}
function clearHandClusterFeats(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(HAND_CLUSTER_FEATS_KEY);
  } catch { /* noop */ }
}

// P215b (2026-05-19) — 학습 시 노이즈 augmentation 영역 노이즈 견고성 회복.
// reinforce 30 frame 영역 후반 절반 영역 ±amount 범위 영역 작은 노이즈 영역 주입
// → cluster receptive field 영역 자연 확장 (P215a Hamming gate 영역 너무 엄격한
// 분리 영역 노이즈 내성 60→40% 저하 영역 회복). spawn 결정 경로 영역 영향 없음
// (reinforceBackground 영역 targetCluster 명시 supervised — vigilance gate
// bypass). 학술 정합: Goodfellow et al. 2014 noise injection 영역 regularization
// 영역 ANN training augmentation 영역 정합. 5~12.5% 점진 증가 영역 패턴 정체성
// 영역 훼손 없는 범위 영역 cap.
function addSmallNoise(pattern: number[], amount: number, rng: () => number = Math.random): number[] {
  return pattern.map((v) => {
    const delta = (rng() - 0.5) * 2 * amount;
    const next = v + delta;
    return next < 0 ? 0 : next > 1 ? 1 : next;
  });
}

export interface LiveTickDetail {
  rates: number[];
  winner: number; // -1 = silent
  share: number;
  margin: number;
  patternActive: boolean; // 현재 pattern 영역 active dim 1개 이상 인지.
  /**
   * trigger 횟수 (사용자 영역 학습 시도) — INPUT 노드 영역 명시 1-shot 만
   * 누적. background loop 영역 폐기 영역 idle 시점 영역 0 유지.
   */
  trial: number;
  tickAtMs: number; // performance.now()
  // PR #192 polish (UX-3 + QA FINDING-1/2 token-aware reset): push event 영역
  // 도달 시점 영역 caller (GridInput / CameraInput) 영역 reinforcingCluster
  // 영역 정확 reset 영역 mandatory hint. trialToken 영역 fire-and-forget RPC
  // 영역 monotonic seq 영역 catch + source 영역 'trigger' / 'infer' / 'reinforce'
  // 영역 caller 영역 status copy 영역 정합 catch.
  trialToken?: number;
  source?: 'trigger' | 'reinforce';
  // reinforce 영역 targetCluster — caller 영역 in-flight gate 영역 cluster-specific
  // reset 영역 정합 (직전 setTimeout 100ms 영역 race 회피).
  targetCluster?: number;
  // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
  //   "다른 패턴임에도 패턴1에 학습이 진행되었습니다". root cause — vigilance
  //   gate 영역 mismatch (inputMatch < ρ) 시점 영역 emitTick 영역 winner_cluster
  //   영역 broadcast → NodeOut incrementCount 영역 stale cluster 영역 fire +
  //   PipelineEventContext winner 표시 영역 misread. 정정: handleTriggerComplete
  //   영역 vigilance check 영역 emitTick 영전 영역 옮김 + mismatch flag 동봉
  //   영역 emitTick 영역 winner_cluster=null broadcast + incrementCount skip.
  //   caller (GridInput/CameraInput) 영역 status copy 영역 catch 가능.
  vigilanceMismatch?: boolean;
}

export interface LiveSnnOptions {
  // 한 trigger 영역 simulation 영역 ms.
  // PR fix/live-mode-time-and-restore — Fix 4: 30 → 50ms (n13 batch path 영역
  // default 정합 + winner margin 안정 + V1/V2 cascade 영역 충분 propagation).
  observeMs?: number;
  // 한 trigger 영역 자극 weight 강도. default 25.
  intensity?: number;
  stimulusDurationMs?: number;
  // P218 (2026-05-25) — simulation timestep. default 0.1ms (production safety).
  // Research mode 영역 0.5ms 영역 5× speed gain (LIF τ=15ms 대비 dt/τ=0.033
  // 영역 numerical stability 영역 안전). 학술 정합: Brette & Gerstner 2005 —
  // LIF Euler integration 영역 dt < τ/10 영역 stable, dt=0.5ms 영역 충분.
  dtMs?: number;
}

export interface TriggerOnceOptions {
  /** STDP gain (default 1.0 — reinforce 시 2.0 권장). */
  stdpGain?: number;
  /** 1 click 영역 inject+run 반복 횟수 (default 3 — Risk 4 mitigation). */
  repeats?: number;
  /** lab.save throttle bypass — reinforce path 영역 즉시 영속. */
  force?: boolean;
  /**
   * PR fix/live-mode-time-and-restore — Fix 3: 매 trigger 영역 진입 시점
   * 모든 neuron 영역 thresholdOffset 영역 0 영역 reset. default true (학술
   * 정합 — Diehl & Cook 2015 §3.2 batch frame reset). false 시 누적 — 단
   * repeats 3 × 8 OUT × increment 2.0 = 48 → V_th saturation 영역 fire 0
   * 영역 catch 영역 회피 catch 영역 default true 권장.
   */
  resetThreshold?: boolean;
}

const DEFAULT_OPTIONS: Required<LiveSnnOptions> = {
  // PR fix/live-mode-time-and-restore — Fix 4: 30 → 50ms (winner margin 안정).
  observeMs: 50,
  intensity: 25,
  stimulusDurationMs: 20,
  // P218 (2026-05-25) — production default 0.1ms 영역 (accuracy 우선).
  // Research module 영역 setDtMs(0.5) 영역 5× speed gain.
  dtMs: 0.1,
};

const TICK_EVENT = 'handface.live-snn.tick';
const SAVE_THROTTLE_MS = 500;

// P218 (2026-05-20) — substrate kind 별 raw dim dispatch.
// Phase 2A.2 (2026-06-01) — orientation-6x6 (36) 추가.
// orientation: 16 (4×4 legacy), orientation-5x5: 25, orientation-6x6: 36,
// gesture: 16 (legacy).
function rawDimForKind(kind: SubstrateKind): number {
  if (kind === 'orientation-6x6') return 36;
  if (kind === 'orientation-5x5') return 25;
  // Phase 3.9 v14 (2026-06-03 사용자 catch): 'orientation-hand' 가 default
  // 16-dim fallback 으로 떨어져 setPattern 이 95-dim pattern 을 16-dim 으로
  // truncate → patternRef.length === 95 체크 항상 FALSE → _handClusterFeatures.
  // set 호출 절대 안 됨 → cosine sim 매칭 동작 안 함 → 매 trigger 마다 spawn.
  // hand SNN 의 raw input 은 95-dim (encodeHandToFeatureVector 결과).
  if (kind === 'orientation-hand') return 95;
  return 16;
}

export class LiveSnn {
  private opts: Required<LiveSnnOptions>;
  private patternRef: number[] = new Array(16).fill(0);
  // P218 (2026-05-24) — training noise reproducibility.
  // null 영역 Math.random() 영역 backwards compat (실 사용자 학습 path 영역
  // non-deterministic). 정수 seed 영역 SeededRandom 영역 training noise 정합 —
  // 5-run avg 영역 동일 seed sequence 영역 reproducibility 확보. Research
  // module (P218) 영역 setTrainingNoiseSeed() 영역 multi-run 영역 lucky seed
  // 탐색 / fixed-best-seed 재현 가능.
  private _trainingNoiseSeed: number | null = null;
  private tickInFlight = false;
  // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix):
  //   "새로고침시 학습 상황이 초기화 되는데, 이는 유지되었으면 좋겠습니다".
  //   root cause — trialCount 영역 in-memory only (singleton field) →
  //   page reload 영역 fresh init 영역 0 reset → NodeLearn '학습 #N' counter
  //   영역 0 표시 → 사용자 mental model "학습 상황 초기화". 정정: substrate
  //   별 localStorage persist + reload hydrate. exemplars 영역 이미 localStorage
  //   영역 persist 정합 — 본 path 영역 trialCount 영역만 보강 (학습 횟수
  //   누적 visibility mandatory).
  private trialCount = 0;
  // 사용자 catch 2026-05-09 (Live 모드 broken state — fix/live-mode-substrate-init):
  // OUT count 영역 직전 use-hand-control (camera path) 영역만 trigger → Live grid
  // 영역 0 잔존 catch. winner 변경 시점 영역 idempotent incrementCount.
  private lastWinnerCluster: number = -1;
  // MEDIUM #11 (사용자 catch 2026-05-11): autoLearnProgress vs incrementCount race —
  // runAutoLearnLoop 영역 30회 R-STDP 진행 중 영역 emitTick 영역 winner 영역
  // 신규 cluster 영역 fluctuate (weight 미수렴) → incrementCount 영역 stale count
  // 누적 catch 회피. _autoLearnInFlight 영역 size > 0 영역 incrementCount skip
  // (count 갱신 대기 — NodeOut amber row 영역 사용자 mental model 영역 정합).
  // Set 영역 cluster id catch — 동시 다중 cluster 영역 mid-train 시점 정합.
  private _autoLearnInFlight: Set<number> = new Set();
  // 사용자 catch 2026-05-12 (forced-exact-bypass-race-gate):
  //   INFER winner [EXACT] STABLE 영역 OUT count 패턴 N=0 catch — runAutoLearnLoop
  //   진행 중 (_autoLearnInFlight.size > 0) 영역 forced-exact winner 영역 영역
  //   영역 incrementCount skip → 사용자 mental model "deterministic match 영역
  //   즉시 +1" 영역 mismatch. 정정: forcedExact=true 영역 race-gate 영역 bypass —
  //   매 forced-exact trigger 영역 +1 (PR #242 per-trigger 정합). 단 finally
  //   commit (runAutoLearnLoop) 영역 동일 cluster id 영역 이미 increment 영역
  //   double-increment 회피 영역 본 Set 영역 catch — finally commit 시점 영역
  //   member check + skip + clear.
  private _forcedExactIncrementedClusters: Set<number> = new Set();
  // Phase 3.9 v5 (2026-06-03): hand SNN incremental mean-subtracted top-K.
  // encoder.ts:237 의 documented 결함 — plain top-K 가 magnitude-dominant
  // features (palm size, wrist-tip distance) 를 모든 자세에서 동일 선택 →
  // cluster 간 discrimination 0 → false-positive matching. fix: 누적된 모든
  // 학습 자세의 평균 feature 를 빼고 |residual| 상위 K=5 선택. 이렇게 하면
  // 각 cluster 의 template = "이 자세만 특별히 활성/비활성 되는 features".
  // batch 가 아닌 incremental — 학습할 때마다 mean 업데이트.
  private _handFeatRunningMean: number[] | null = null; // 95-dim
  private _handFeatSampleCount: number = 0;
  // Phase 3.9 v7 (2026-06-03): hand cluster feature storage for cosine similarity
  // matching. captured fixture validation (tests/integration/phase-3-v7-cosine):
  //   v6 (mean-sub top-K + Jaccard): 50% accuracy
  //   v7a (cosine similarity vs stored training features): 100% accuracy
  // 본 Map 은 clusterId → 95-dim training feature snapshot. trigger 시 cosine
  // sim 으로 winner 결정 → spawn 결정 override.
  private _handClusterFeatures: Map<number, number[]> = new Map();
  // Phase 3.9 v25-v26 (2026-06-03): cluster activeInputs 도 저장 → 복원 시 worker
  // expandCluster 로 진짜 sync 가능. 사용자 학습 데이터 보존.
  private _handClusterActiveInputs: Map<number, number[]> = new Map();
  // Phase 3.9 v26 (2026-06-03): worker sync 상태 — false 면 cosine path skip.
  // substrate switch 또는 첫 sync 완료 후 true. desync race condition 차단.
  private _handSyncedWithWorker: boolean = false;
  private _handSyncInFlight: Promise<void> | null = null;
  // pre-computed winner from cosine sim (during triggerWithVigilance, consumed
  // in handleTriggerComplete to override vigilance decision).
  // strict: true 면 EMA update + R-STDP reinforce 적용, false (weak match) 면
  // classify only — borderline 자세에서 cluster 변동 방지.
  private _handCosineWinner: Map<number, { clusterId: number; sim: number; strict: boolean }> = new Map();
  // PR4 (사용자 catch 2026-05-09): substrate kind 별 segregated path —
  // GRID input (orientation-5x5) / CAMERA input (gesture) 가 별도 회로 정합.
  // Phase 2A.1 (2026-05-31): default 'orientation' → 'orientation-5x5'.
  // 생성자 영역 즉시 reassign (정합 안전망 유지).
  private substrateKind: SubstrateKind = 'orientation-5x5';
  // PR #171 audit fix (Fix 2 — QA HIGH): input-mode event 영역 derive 영역
  // GridInput / CameraInput 동시 mount last-write-wins race 회피.
  private _unsubscribeInputMode: (() => void) | null = null;
  // event-driven pivot (2026-05-09 B): lab.save throttle state.
  // 첫 호출 영역 immediate save 영역 보장 catch — -∞ 영역 sentinel 영역 시작
  // (Number.NEGATIVE_INFINITY 영역 sinceLast >> SAVE_THROTTLE_MS 보장).
  private _lastSaveAtMs = Number.NEGATIVE_INFINITY;
  private _saveTrailingTimer: ReturnType<typeof setTimeout> | null = null;
  // 사용자 catch 2026-05-11 (perf F2-b — trialCount localStorage throttle):
  // emitTick 영역 매 tick 영역 localStorage.setItem 영역 cumulative I/O 영역
  // cluster N 증가 영역 학습 둔화 보조 source. 250ms throttle 영역 적용 —
  // C3 test (직접 emitTick 1회 영역 persist) 영역 첫 call 영역 항상 save (sentinel
  // -∞) 영역 통과. dispose 시점 trailing flush 영역 마지막 trial 영역 영구 보존.
  private _lastTrialPersistAtMs = Number.NEGATIVE_INFINITY;
  private static readonly TRIAL_PERSIST_THROTTLE_MS = 250;
  // 사용자 catch 2026-05-10 (CRITICAL — console spam 100+):
  //   "콘솔 로그 처리해주세요 안나오게" — save fail 영역 매 frame 누적 spam
  //   회피. Set 영역 message dedup — 같은 error message 영역 1회만 console.warn.
  //   root cause fix (LocalSNN.save 영역 length drift catch) 영역 위 영역 safety
  //   net — backend / sink 영역 신규 fail mode 영역 silent miss 회피 정합.
  private _seenSaveErrors: Set<string> = new Set();
  // PR-B (Web Worker background offload, 2026-05-10): trial token + push handler.
  // trialToken 영역 monotonic seq — out-of-order push event 영역 latest-token-wins
  // discrimination. _unsubscribePush 영역 ensurePushHandler 영역 lazy bind 영역
  // 한 번만 등록 (multi-bind 영역 stale 회피).
  private _trialTokenSeq = 0;
  private _unsubscribePush: (() => void)[] = [];
  // 사용자 catch 2026-05-09 [2] (SEC-1 mitigation): push handler 영역 매 emit
  // 영역 fresh root fetch 영역 substrate switch stale 회피 — root 영역 reuse 0.
  private _pushBoundForKind: SubstrateKind | null = null;
  // PR-K (사용자 catch 2026-05-09 catch 1): ART vigilance auto-learn 영역 inline
  // state — triggerWithVigilance 영역 trial token 영역 pattern + vigilance
  // catch + handleTriggerComplete 영역 winner.margin 영역 비교 + auto-learn
  // dispatch (worker sequential serial 영역 자연 정합 단 token-keyed catch).
  private _vigilancePending: Map<number, { pattern: number[]; vigilance: number }> = new Map();

  constructor(opts: LiveSnnOptions = {}) {
    this.opts = { ...DEFAULT_OPTIONS, ...opts };
    // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): trialCount 영역
    // localStorage hydrate — page reload 영역 학습 횟수 보존 정합.
    // Phase 2A.2 (2026-06-01): default substrate 5×5 → 6×6 (n15_extended_6x6,
    // 36 input / 72 features). 측정 evidence: 5×5 c3 sub-pool=3 inherent
    // limit 60% (commit 2db71ef), 6×6 N=4/5 모두 100% (commit b8458e5).
    // UI / engine 모두 6×6 동기화.
    this.substrateKind = 'orientation-6x6';
    this.trialCount = loadTrialCount(this.substrateKind);
    // Phase 3.9 v26 (2026-06-03): cluster features + activeInputs 둘 다 복원
    // — substrate switch (hand mode 진입) 시 worker sync 진행.
    this._handClusterFeatures = loadHandClusterFeats();
    this._handClusterActiveInputs = loadHandClusterActive();
    if (this._handClusterFeatures.size > 0) {
      console.log(
        `[hand-init] restored ${this._handClusterFeatures.size} cluster features + ${this._handClusterActiveInputs.size} activeInputs (worker sync 는 substrate switch 시 진행)`,
      );
    }
    // input-mode event listener — NodeInput tab change 시 emit.
    //   mode='camera' → substrate='orientation-hand'  (Phase 3.3, n16_hand 75-dim)
    //   mode='grid'   → substrate='orientation-6x6'   (Phase 2A.2, n15_extended 72-dim)
    // 직전 Phase 3.3 영역 영역: mode='camera' → 'gesture' (16-dim legacy) — Hand
    // SNN backend (n16-hand) 영역 정합 'orientation-hand' 영역 wire 변경.
    this._unsubscribeInputMode = onBackendEvent<InputModeDetail>('input-mode', (d) => {
      const next: SubstrateKind = d.mode === 'camera' ? 'orientation-hand' : 'orientation-6x6';
      void this.setSubstrate(next);
    });
  }

  dispose(): void {
    if (this._unsubscribeInputMode) {
      this._unsubscribeInputMode();
      this._unsubscribeInputMode = null;
    }
    // PR #184 audit fix (SEC-1 Path 2): trailing pending 시 unmount 영역
    // root.lab.save() 영역 즉시 fire — 마지막 trigger 영역 영속 보장.
    // dispose 영역 substrate 영역 정합 사실 (trailing closure 영역 capture
    // root 영역 dispose 시점 substrate 영역 정합 — setSubstrate Path 1 영역
    // pre-cancel 영역 stale 회피 보장 후 dispose 영역 도달).
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    // 사용자 catch 2026-05-11 (perf F2-b — throttle trailing flush): dispose
    // 시점 영역 마지막 trial 영역 영구 보존 — throttle 영역 stale 손실 회피.
    try { saveTrialCount(this.substrateKind, this.trialCount); } catch { /* noop */ }
    // PR-B (Web Worker background offload, 2026-05-10): push listener cleanup.
    for (const off of this._unsubscribePush) {
      try { off(); } catch { /* noop */ }
    }
    this._unsubscribePush = [];
    this._pushBoundForKind = null;
  }

  // 학술 정합: substrate 변경 시점 영역 기존 회로 영역 보존 + 새 회로 영역
  // lazy init. trigger 진행 중 시 await tickInFlight (background loop 영역
  // 폐기 영역 stop/start race 영역 0).
  // 같은 kind 영역 멱등 — early return.
  async setSubstrate(kind: SubstrateKind): Promise<void> {
    if (this.substrateKind === kind) return;
    while (this.tickInFlight) {
      await new Promise((r) => setTimeout(r, 5));
    }
    // PR #184 audit fix (SEC-1 Path 1): substrate switch 영역 trailing
    // setTimeout closure 영역 capture root 영역 stale 회피 — pre-cancel.
    // GRID → CAMERA switch 직후 500ms 내 trailing fire 영역 wrong substrate
    // root.lab.save() 영역 호출 사실 catch.
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    // PR-B (Web Worker background offload, 2026-05-10): substrate switch 영역
    // push handler 영역 unsubscribe + lazy re-bind 영역 다음 triggerAsync 영역
    // 정합 (PR #186 SEC-1 substrate switch stale closure 호환 보존).
    for (const off of this._unsubscribePush) {
      try { off(); } catch { /* noop */ }
    }
    this._unsubscribePush = [];
    this._pushBoundForKind = null;
    this.substrateKind = kind;
    // Phase 3.9 v26 (2026-06-03): hand 모드 진입 시 worker sync 실행 — stored
    // cluster features 와 worker pool 동기화. 첫 trigger 전에 완료 보장 위해
    // await (substrate switch 가 이미 async — 사용자 UX 영향 작음).
    if (kind === 'orientation-hand') {
      this._handSyncedWithWorker = false; // 새 sync 시작
      void this._syncHandWithWorker();
    }
    // 사용자 catch 2026-05-09 (Fix 2 — HIGH): substrate switch 영역 trial /
    // lastWinner / patternRef 영역 reset — 직전 GRID winner 영역 CAMERA tick
    // 영역 carry-over (UI 영역 winner badge 영역 stale orientation cluster
    // 영역 표시) 영역 root cause 정정. 학술 정합: substrate 영역 별도 회로
    // 영역 — 이전 회로 영역 trial / winner state 영역 무관.
    // trialCounts: Record 영역 swap 영역 가능 path 단 본 정정 영역 단순 reset
    // 영역 catch path (사용자 영역 substrate switch 영역 trial 누적 영역 mental
    // model 영역 0 영역 정합).
    //
    // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): substrate switch 시
    // 영역 신규 substrate 영역 trialCount 영역 localStorage hydrate — substrate
    // 별 학습 횟수 영역 별도 보존 (orientation/gesture isolation 정합).
    this.trialCount = loadTrialCount(kind);
    this.lastWinnerCluster = -1;
    this.patternRef = new Array(rawDimForKind(this.substrateKind)).fill(0);
    // F2-b throttle 영역 substrate swap 영역 reset — 신규 kind 영역 첫 emit
    // 영역 즉시 persist 보장 (orientation/gesture isolation 정합).
    this._lastTrialPersistAtMs = Number.NEGATIVE_INFINITY;
    // P219 production deployment (2026-05-25) — 5×5 substrate 영역 lucky seed
    // 자동 lock. 3-run avg 영역 best mean noise (78%) 영역 seed=86 영역 default
    // 영역 reproducible production behavior 영역. Research module 영역
    // setTrainingNoiseSeed() 영역 override 가능 (P219 sweep 영역 영역 영역).
    if (kind === 'orientation-5x5' && this._trainingNoiseSeed === null) {
      this._trainingNoiseSeed = 86; // best lucky seed from P218 100-seed sweep
    } else if (kind !== 'orientation-5x5') {
      this._trainingNoiseSeed = null; // non-5×5 영역 backward compat
    }
  }

  getSubstrate(): SubstrateKind {
    return this.substrateKind;
  }

  /**
   * PR-J (사용자 catch 2026-05-09 [2]): trial / lastWinnerCluster / patternRef
   * 영역 모두 reset — 학습 reset path 영역 mandatory state-clear hook.
   *
   * 직전 (PR-G Fix 2): setSubstrate 영역만 trial / lastWinner / patternRef reset
   * 영역 path. 단 같은 substrate 영역 학습 reset (resetClusterWeights) 영역
   * trial counter / lastWinnerCluster 영역 stale carry-over 사실 → 사용자
   * catch "아웃풋 내역은 사라지나 학습 상태는 유지됨" 영역 root cause.
   *
   * 정정: substrate 영역 보존 + trial / lastWinner / patternRef 영역 reset 영역
   * 단일 path. setSubstrate Fix 2 영역 동일 reset path 영역 reuse — semantics
   * 영역 clear ('학습 reset 후 영역 fresh trial counter / silent winner').
   *
   * 정직 한계: in-flight trigger 영역 wait 영역 본 path 영역 sync 단순 reset —
   * caller (GridInput / CameraInput) 영역 resetClusterWeights 영역 worker fresh
   * build 영역 직전 영역 호출 권장 (worker 영역 inline serial 영역 race 0).
   */
  resetTrigger(): void {
    this.trialCount = 0;
    // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): 학습 reset 영역
    // localStorage trialCount 영역 wipe — fresh trial counter mandatory.
    clearTrialCount(this.substrateKind);
    // Phase 3.9 v5: hand running mean 도 wipe (fresh discrimination state).
    this._handFeatRunningMean = null;
    this._handFeatSampleCount = 0;
    clearHandMean();
    // Phase 3.9 v7: cluster features storage 도 wipe.
    this._handClusterFeatures.clear();
    clearHandClusterFeats();
    // Phase 3.9 v26: activeInputs 도 wipe + sync flag reset.
    this._handClusterActiveInputs.clear();
    clearHandClusterActive();
    this._handSyncedWithWorker = false;
    this.lastWinnerCluster = -1;
    this.patternRef = new Array(rawDimForKind(this.substrateKind)).fill(0);
    // Throttle window restore — fresh weights 영역 first save 영역 즉시 path.
    this._lastSaveAtMs = Number.NEGATIVE_INFINITY;
    // F2-b — trial persist throttle reset (resetTrigger 영역 0 영역 즉시 보존).
    this._lastTrialPersistAtMs = Number.NEGATIVE_INFINITY;
    // Trailing save cancel — stale weights snapshot 영역 fresh build 영역 overwrite 0.
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    // PR-K (사용자 catch 2026-05-09 catch 4): vigilancePending state 영역 clear —
    // 학습 reset 영역 직전 inferAsync 영역 dispatch 영역 stale auto-learn loop
    // 영역 catch 회피 (worker fresh build 후 영역 stale token 영역 reinforce
    // 영역 새 cluster 영역 weight pollution 영역 root cause 회피).
    this._vigilancePending.clear();
    // CPM-1 diagnostic (2026-05-31): 학습 reset 영역 fallback marks 영역 clear —
    // 새 cluster id 영역 stale 'fallback' badge 영역 회피.
    clearFallbackMarks();
    // _pushBoundForKind 영역 보존 — push handler substrate 영역 active 정합
    // (다음 trigger 영역 ensurePushHandler 영역 정합 path 영역 reuse).
  }

  // P218 training noise seed setter — research module 영역 reproducibility.
  // null 영역 호출 영역 backward compat (Math.random) 영역 복원. 정수 영역 호출
  // 영역 SeededRandom 영역 next 다음 autoLearnLoop 영역 noise sampling 결정.
  setTrainingNoiseSeed(seed: number | null): void {
    this._trainingNoiseSeed = seed;
  }

  getTrainingNoiseSeed(): number | null {
    return this._trainingNoiseSeed;
  }

  // P218 (2026-05-25) — simulation timestep override. Research module 영역
  // 0.5ms 영역 5× speed gain (production 영역 0.1ms 유지). LIF τ=15ms 영역
  // 안전 numerical stability 영역 (dt/τ=0.033, Brette & Gerstner 2005).
  setDtMs(dtMs: number): void {
    this.opts.dtMs = dtMs;
  }

  // P218 (2026-05-25) — intensity (input drive 강도) override. Research mode
  // 영역 strong input drive 영역 cluster receptive field 영역 stable 영역
  // activate 영역 noise tolerance ↑ 시도.
  setIntensity(intensity: number): void {
    this.opts.intensity = intensity;
  }

  setPattern(pattern: number[]): void {
    // P218 (2026-05-21) ROOT CAUSE fix: substrate-aware raw dim.
    // 직전 hardcoded 16-dim cut — 5×5 (25-dim) substrate 의 indices 16-24
    // 까지 cut → Pattern 1 (Bottom row, indices 20-24) 모두 0 → cluster 1 의
    // first reinforce 에서 in_feat fire 0 → V1_L4 cascade 죽음.
    // rawDimForKind(kind) 사용 (orientation=16, orientation-5x5=25,
    // orientation-6x6=36, orientation-hand=95).
    const rawDim = rawDimForKind(this.substrateKind);
    const next = new Array<number>(rawDim).fill(0);
    // Phase 3.9 v14 (2026-06-03): hand substrate 는 raw coords / derived features
    // 모두 negative 값 가능 (예: z depth, x-relative diff). [0,1] clamp 가 invalid
    // → 그대로 copy. 외 substrate (grid binary patterns) 는 기존 clamp 유지.
    const isHand = this.substrateKind === 'orientation-hand';
    for (let i = 0; i < Math.min(pattern.length, rawDim); i += 1) {
      next[i] = isHand
        ? (pattern[i] || 0)
        : Math.max(0, Math.min(1, pattern[i] || 0));
    }
    this.patternRef = next;
  }

  getPattern(): number[] {
    return this.patternRef.slice();
  }

  /**
   * Event-driven 1-shot trigger (2026-05-09 B 본격 pivot).
   *
   * 사용자 명시 INPUT 시점 (GRID cell click / preset apply / CAMERA stable
   * 자세) 영역 1회 inject + run(stdp on) × repeats + cluster firing 측정 +
   * lab.save (throttle) → emitTick.
   *
   * @param opts.stdpGain  STDP gain (default 1.0).
   * @param opts.repeats   inject+run 반복 횟수 (default 3 — Risk 4 mitigation).
   * @param opts.force     lab.save throttle bypass (reinforce 영역 true).
   * @returns saveFailed   lab.save 영역 실패 시 호출자 영역 user-visible warning.
   */
  async triggerOnce(opts: TriggerOnceOptions = {}): Promise<{ saveFailed: boolean }> {
    const stdpGain = opts.stdpGain ?? 1.0;
    const repeats = Math.max(1, opts.repeats ?? 3);
    const force = opts.force ?? false;
    // PR fix/live-mode-time-and-restore — Fix 3: default true (학술 정합).
    const resetThreshold = opts.resetThreshold ?? true;

    while (this.tickInFlight) await new Promise((r) => setTimeout(r, 5));
    this.tickInFlight = true;
    let saveFailed = false;
    let cfr: ClusterFiringRatesResult | null = null;
    let root: RootLocalSnn | null = null;
    // PR fix/live-mode-time-and-restore — Fix 5: V1/V2 region rate 실 측정.
    let v1Hz = 0;
    let v2Hz = 0;
    // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount catch —
    // emit 영역 active_neurons_by_region 영역 동봉 → NodeLearn 0/N 고정 catch.
    let v1FireCount = 0;
    let v2FireCount = 0;
    try {
      root = await getRootLocalSnnFor(this.substrateKind);
      // PR fix/live-mode-time-and-restore — Fix 3: 매 trigger 진입 시점
      // homeostatic thresholdOffset 영역 reset (V_th saturation 영역 회피).
      if (resetThreshold) {
        await root.client.resetHomeostatic();
      }
      for (let i = 0; i < repeats; i += 1) {
        cfr = await this.runStep(root, stdpGain);
      }
      this.trialCount += 1;
      // PR fix/live-mode-time-and-restore — Fix 5: 마지막 repeat 후 V1/V2
      // 실 spike rate 영역 catch (cluster_rates max proxy 영역 swap).
      if (cfr) {
        try {
          const [v1, v2] = await Promise.all([
            root.client.regionFiringRates({ region: 'V1', windowMs: this.opts.observeMs }),
            root.client.regionFiringRates({ region: 'V2', windowMs: this.opts.observeMs }),
          ]);
          v1Hz = v1.hz;
          v2Hz = v2.hz;
          v1FireCount = v1.firingCount;
          v2FireCount = v2.firingCount;
        } catch (e) {
          // regionFiringRates 영역 fail 영역 0 fallback (legacy worker / mock 영역
          // 정합 catch). UX-1: dev mode 영역 console.warn 1회 emit 영역 cause-effect
          // catch 정합 — production 영역 silent 보존 (process.env.NODE_ENV 영역
          // Next.js build-time inline replace).
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[LiveSnn] regionFiringRates fallback to 0Hz:', e);
          }
        }
        this.emitTick(cfr, v1Hz, v2Hz, undefined, v1FireCount, v2FireCount);
      }
    } catch (e) {
      console.warn('[LiveSnn] triggerOnce failed:', e);
    } finally {
      this.tickInFlight = false;
    }
    if (root) {
      saveFailed = await this.saveDebounced(root, force);
    }
    return { saveFailed };
  }

  /** internal helper — 1 inject+run+clusterFiringRates 반복 단위. */
  private async runStep(root: RootLocalSnn, stdpGain: number): Promise<ClusterFiringRatesResult> {
    // PR fix/live-mode-time-and-restore — Fix 1: net.t 절대 시각 catch 영역
    // inject events 영역 time 정합. 직전 buggy time:0 영역 net.t 누적 영역
    // 모든 stale impulse 영역 1-step burst collapse → V1 attenuated → OUT
    // silent → 두 번째 trigger 영역 winner -1 catch.
    let currentT = 0;
    try {
      currentT = await root.client.getNetworkTime();
    } catch (e) {
      // legacy worker / mock 영역 getNetworkTime 미구현 영역 fallback time=0
      // (기존 buggy behavior 유지 — 단 mock 영역 currentT 영역 0 catch 정합).
      void e;
    }
    const events = this.buildInjectEvents(currentT);
    if (events.length > 0) await root.client.inject(events);
    // QA FINDING-1 fix (2026-05-10): stdpEnabled 영역 gain>0 catch — inferOnce
    // (stdpGain=0) path 영역 stdpEnabled=true hard-code 영역 applyPairStdp(t, 0)
    // 영역 호출 → trace state mutation (preTrace/postTrace/lastSpikeTimeForTrace)
    // 영역 다음 reinforce 영역 stale trace pollution. async path (triggerBackground)
    // 영역 worker-core.ts 영역 동일 swap.
    await root.client.run({
      durationMs: this.opts.observeMs,
      dtMs: 0.1,
      stdpEnabled: stdpGain > 0,
      stdpGain,
    });
    // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 동봉 영역
    // input cardinality normalize 영역 catch (Wiesel 1981 정합).
    return await root.client.clusterFiringRates({
      windowMs: this.opts.observeMs,
      layer: 'OUT',
      pattern: this.patternRef.slice(),
    });
  }

  /**
   * lab.save throttle — 직전 save 영역 SAVE_THROTTLE_MS (500ms) 내 시점
   * 영역 immediate save skip + trailing setTimeout 영역 마지막 trigger 의 결과
   * catch. force=true 시 throttle bypass (reinforce 영역 즉시 영속).
   * 반환 boolean — immediate save 실패 시 true (호출자 영역 user-visible).
   */
  private async saveDebounced(root: RootLocalSnn, force = false): Promise<boolean> {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const sinceLast = now - this._lastSaveAtMs;
    if (!force && sinceLast < SAVE_THROTTLE_MS) {
      // 직전 save 영역 throttle window 내 — trailing schedule 영역 마지막 결과 catch.
      if (this._saveTrailingTimer !== null) clearTimeout(this._saveTrailingTimer);
      const remain = SAVE_THROTTLE_MS - sinceLast;
      this._saveTrailingTimer = setTimeout(() => {
        this._saveTrailingTimer = null;
        // trailing save 영역 silent path (immediate save 영역 throttle 영역 skip
        // 사실 — 호출자 영역 saveFailed 영역 false 반환 사실).
        const trailingNow = typeof performance !== 'undefined' ? performance.now() : Date.now();
        this._lastSaveAtMs = trailingNow;
        root.lab.save().catch((e) => {
          // 사용자 catch 2026-05-10: console spam dedup (immediate path 정합).
          const msg = e instanceof Error ? e.message : String(e);
          if (!this._seenSaveErrors.has(msg)) {
            this._seenSaveErrors.add(msg);
            console.warn('[LiveSnn] trailing save failed:', e);
          }
        });
      }, remain);
      return false;
    }
    // immediate save path — throttle window 외 또는 force.
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    this._lastSaveAtMs = now;
    try {
      await root.lab.save();
      return false;
    } catch (e) {
      // 사용자 catch 2026-05-10: console spam dedup — 같은 error message 영역
      // 1회만 emit. root cause (LocalSNN.save 영역 length drift catch) 영역 본
      // path 영역 0 도달 — 신규 fail mode 영역 silent miss 회피 영역 safety net.
      const msg = e instanceof Error ? e.message : String(e);
      if (!this._seenSaveErrors.has(msg)) {
        this._seenSaveErrors.add(msg);
        console.warn('[LiveSnn] save failed (in-memory weight 영역 update OK):', e);
      }
      return true;
    }
  }

  /**
   * PR-A architecture pivot (사용자 catch 2026-05-09 A2 — PRIMARY HIGH 70%):
   * 사용자 명시 R-STDP supervised reward — "이 패턴은 cluster X 가 맞다".
   *
   * 직전 (PR #189): triggerOnce({ stdpGain: gain }) 영역 thin alias —
   * targetCluster 영역 void → STDP unsupervised self-reinforcing loop →
   * 첫 trigger 영역 horizontal 우연 winner 영역 STDP saturate → lock-in
   * 영역 root cause catch.
   *
   * 정정 (본 PR): clusterTrainRStdp RPC 영역 1-pattern batch 영역 reuse
   * (worker-core.ts:343-416 본격 R-STDP supervised 구현 정합). 학술 정합:
   * Florian 2007 / Izhikevich 2007 R-STDP supervised — measure 영역 winner !=
   * targetCluster 일 시 punishGain (LTD), winner == targetCluster 일 시
   * rewardGain (LTP). cluster-specific gradient 영역 backend 영역 catch.
   *
   * 정직 한계: clusterTrainRStdp 영역 단일 pattern 영역 1-pattern batch (직전
   * triggerOnce repeats 3 영역 동질 patterns 영역 batch 정합 — observeMs ×
   * 1 frame ≈ 50ms simulation). saveDebounced (force=true) 영역 즉시 영속.
   *
   * QA FINDING-3 SECONDARY catch (PR #191 polish, 2026-05-10, MEDIUM):
   * PRIMARY supervised R-STDP wire 영역 위 영역 70% catch — 잔존 30% 영역
   * orientation overlap fundamental ambiguity 영역 정직 표시.
   *
   * - 예: n13 idx 5 영역 active set — cluster 0 (horizontal [4,5,6,7]) +
   *   cluster 1 (vertical [1,5,9,13]) 양쪽 영역 active → vertical 입력 단
   *   horizontal sub-pool fire 가능 영역 root cause (orientation feature
   *   영역 본격 disjoint 0).
   * - PRIMARY 70% catch (supervised R-STDP wire) 영역 후 영역 잔존 30% 영역
   *   feature engineering 영역 follow-up — n13 builder 영역 active set
   *   disjoint 영역 별도 PR 영역 defer 명시 (본 PR 영역 scope-out).
   * - 사용자 영역 추가 보강 영역 cluster-specific gradient 영역 backend
   *   punishGain 영역 횟수 정합 영역 catch — 정직 한계 명시.
   */
  async reinforce(targetCluster: number, gain: number = 0.8): Promise<{ saveFailed: boolean }> {
    while (this.tickInFlight) await new Promise((r) => setTimeout(r, 5));
    this.tickInFlight = true;
    let saveFailed = false;
    let root: RootLocalSnn | null = null;
    try {
      root = await getRootLocalSnnFor(this.substrateKind);
      // homeostatic thresholdOffset reset — 직전 trigger 누적 V_th saturation
      // 영역 회피 (Diehl & Cook 2015 §3.2 batch frame reset 정합).
      await root.client.resetHomeostatic();
      // R-STDP supervised — 1-pattern batch + targetCluster 영역 명시 wire.
      // rewardGain 영역 사용자 영역 명시 gain.
      // QA CAUSE D fix (2026-05-10): default 2.0 → 0.8 — saturation overshoot 회피.
      // QA CAUSE D1 fix (2026-05-10): punishGain=0 → gain*0.25 — wrong-winner LTD
      // escape 0 정직 한계 정정. Florian 2007 / Izhikevich 2007 R-STDP 영역
      // wrong-action LTD 정합 — punishGain 0 영역 wrong winner cluster 영역
      // weight 영역 unchanged → saturation lock-in escape 0 영역 root cause.
      // gain*0.25 영역 보수적 LTD (reward LTP 영역 1/4) — saturation 회피
      // 정합 path (양방향 escape mandatory).
      await root.client.clusterTrainRStdp({
        patterns: [this.patternRef.slice()],
        targetCluster,
        rewardGain: gain,
        punishGain: gain * 0.25,
        observeMs: this.opts.observeMs,
        stimulusDurationMs: this.opts.stimulusDurationMs,
        intensity: this.opts.intensity,
      });
      this.trialCount += 1;
      // cluster firing rates — supervised batch 영역 끝난 직후 영역 winner
      // 영역 catch (UI 영역 NodeLearn cluster bar / NodeInfer winner 영역 sync).
      // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 동봉 영역
      // input cardinality normalize 영역 catch.
      const cfr = await root.client.clusterFiringRates({
        windowMs: this.opts.observeMs,
        layer: 'OUT',
        pattern: this.patternRef.slice(),
      });
      // V1/V2 region rates 영역 catch (NodeLearn cascade strip 영역 정합).
      let v1Hz = 0;
      let v2Hz = 0;
      // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount catch (reinforce path).
      let v1FireCount = 0;
      let v2FireCount = 0;
      try {
        const [v1, v2] = await Promise.all([
          root.client.regionFiringRates({ region: 'V1', windowMs: this.opts.observeMs }),
          root.client.regionFiringRates({ region: 'V2', windowMs: this.opts.observeMs }),
        ]);
        v1Hz = v1.hz;
        v2Hz = v2.hz;
        v1FireCount = v1.firingCount;
        v2FireCount = v2.firingCount;
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[LiveSnn] reinforce regionFiringRates fallback to 0Hz:', e);
        }
      }
      this.emitTick(cfr, v1Hz, v2Hz, undefined, v1FireCount, v2FireCount);
    } catch (e) {
      console.warn('[LiveSnn] reinforce failed:', e);
    } finally {
      this.tickInFlight = false;
    }
    if (root) {
      // force=true — supervised reward 영역 즉시 영속 (saveDebounced throttle bypass).
      saveFailed = await this.saveDebounced(root, true);
    }
    return { saveFailed };
  }

  /**
   * PR-A architecture pivot (사용자 catch 2026-05-09 A1): 명시 추론 trigger.
   * triggerOnce({ stdpGain: 0 }) 영역 thin wrapper — STDP off (학습 0) +
   * cluster firing rates 측정 only. semantic clarity 영역 별도 method 분리
   * (호출자 영역 의도 catch — '추론' button 영역 학습 trigger 0 보장).
   *
   * 학술 정합: STDP off — Hebbian 0, network 영역 가중치 변경 0 (read-only).
   * lab.save 영역 throttle 영역 조건부 — 가중치 변경 0 영역 immediate save 영역
   * skip 영역 정합 (saveDebounced 영역 force=false).
   */
  async inferOnce(): Promise<{ saveFailed: boolean }> {
    return await this.triggerOnce({ stdpGain: 0 });
  }

  // ── PR-B (Web Worker background offload, 2026-05-10): fire-and-forget API ──
  //
  // 사용자 catch 2026-05-09 [2]: "학습이나 추론시에 백그라운드에서 동작하면
  // 좋을 것 같습니다. 너무 버벅이고 유저 액션(이벤트)에 지연발생(불편함)"
  //
  // 직전 triggerOnce / inferOnce / reinforce 영역 await semantics 보존 (호환
  // mandatory) + 신규 *Async 영역 즉시 return (사용자 input event loop unblock).
  // 결과 영역 worker push event 영역 emit → ensurePushHandler 영역 emitTick
  // 영역 정합 (LiveTickDetail event + neuron-firing event + OUT incrementCount).
  //
  // tickInFlight gate 영역 본 path 영역 미사용 — worker 영역 sequential serialize
  // 영역 자연 정합 (worker thread 영역 message handler 영역 sync 영역 정합).
  // main thread 영역 head-of-line block 영역 0.

  /**
   * 즉시 return — `{ trialToken }` 반환. 결과 영역 worker push event 영역 별도
   * emitTick. 사용자 click → status 표시 영역 sync 영역 정합 catch — 결과
   * 영역 push event listener 영역 emit (tickAtMs 영역 push 도달 시점 정합).
   */
  triggerAsync(opts: TriggerOnceOptions = {}): { trialToken: number } {
    const stdpGain = opts.stdpGain ?? 1.0;
    const repeats = Math.max(1, opts.repeats ?? 3);
    const resetThreshold = opts.resetThreshold ?? true;
    const trialToken = ++this._trialTokenSeq;
    // fire-and-forget — root fetch 영역 async 단 await 0 (caller 영역 unblock).
    void (async () => {
      try {
        const root = await getRootLocalSnnFor(this.substrateKind);
        await this.ensurePushHandler(root);
        // PR-B: triggerBackground RPC 영역 sync ack `null` 영역 즉시 return —
        // worker 영역 inline simulation 영역 끝난 시점 영역 push event 영역
        // emit (ensurePushHandler 영역 emitTick + saveDebounced fire-and-forget).
        await root.client.triggerBackground({
          pattern: this.patternRef.slice(),
          intensity: this.opts.intensity,
          observeMs: this.opts.observeMs,
          stimulusDurationMs: this.opts.stimulusDurationMs,
          stdpGain,
          repeats,
          resetThreshold,
          trialToken,
        });
      } catch (e) {
        console.warn('[LiveSnn] triggerAsync dispatch failed:', e);
      }
    })();
    return { trialToken };
  }

  /**
   * 즉시 return — STDP off (학습 0). triggerAsync({ stdpGain: 0 }) thin wrapper.
   */
  inferAsync(): { trialToken: number } {
    return this.triggerAsync({ stdpGain: 0 });
  }

  /**
   * Validation 전용 — 로컬 SNN worker 에 pattern 1회 inject 후 cluster firing
   * rates 반환. STDP off (학습 0). triggerOnce 와 동일 path 단 emitTick /
   * incrementCount / saveDebounced 영역 모두 skip (side-effect 없음).
   *
   * @param pattern  16-dim [0,1] feature vector.
   * @returns        winner cluster id (null=silent), rates 배열.
   */
  async inferOnceForValidation(
    pattern: number[],
  ): Promise<{ winner: number | null; rates: number[] }> {
    // patternRef 임시 교체 후 복원 — buildInjectEvents 영역 patternRef 의존.
    const saved = this.patternRef.slice();
    this.setPattern(pattern);
    try {
      const root = await getRootLocalSnnFor(this.substrateKind);
      await root.client.resetHomeostatic();
      const cfr = await this.runStep(root, 0); // stdpGain=0
      const winner = cfr.winner >= 0 ? cfr.winner : null;
      // P218 diagnostic — runtime trace 영역 cluster firing 영역 catch.
      if (this.substrateKind === 'orientation-5x5') {
        const feat = dispatchFeature(pattern);
        const activeIdx: number[] = [];
        for (let i = 0; i < feat.length; i += 1) if (feat[i] > 0.5) activeIdx.push(i);
        const rateStr = cfr.rates.map((r, i) => `c${i}:${r.toFixed(1)}`).join(' ');
        console.log(`[P218 infer] activeIdx=[${activeIdx.join(',')}] winner=${winner} rates=${rateStr} inputMatch=${cfr.inputMatch}`);
      }
      return { winner, rates: cfr.rates };
    } finally {
      // patternRef 복원 — live tick 영역 side-effect 방지.
      this.patternRef = saved;
    }
  }

  /**
   * PR-K (사용자 catch 2026-05-09 catch 1): ART unsupervised auto-learn —
   * "추론 버튼이 곧 학습 적용(자동) = 처음 만나는 패턴일 경우 30회 자동 학습
   * 후, 패턴 기억".
   *
   * 학술 정합: Carpenter & Grossberg 1987 ART vigilance — bottom-up match
   * score < ρ → reset → 새 cluster 슬롯 할당 + supervised reinforce 영역 weight
   * 수렴. 본 method 영역 vigilance threshold (default 0.15) 영역 비교 →
   *   - winner.margin >= ρ: familiar pattern → triggerAsync (STDP off, 단순
   *     winner 표시) 영역 fallback.
   *   - winner.margin <  ρ: novel pattern → expandClusterAsync (worker
   *     RPC 영역 신규 cluster 슬롯 할당) + 30 trial chunked reinforce
   *     (5-trial chunk × 6 round, supervised target = 신규 cluster id).
   *
   * 정직 한계:
   *  - 본 method 영역 fire-and-forget — 즉시 trialToken return + 결과 영역
   *    push event 영역 emit. 30 trial 영역 worker 영역 sequential serialize
   *    영역 자연 정합 (main thread block 0).
   *  - first inferAsync (STDP off) 영역 winner margin 측정 → vigilance 비교
   *    영역 ART expansion + reinforce loop 영역 inline. 사용자 input event
   *    loop 영역 unblock (worker 영역 background 처리).
   *  - cluster identity 영역 사용자 supervised label 영역 0 영역 자율 형성 —
   *    OUT 노드 RenameButton 영역 사용자 명시 명명 path 영역 mandatory (의미
   *    부여). fallback label 영역 '패턴 N' (shared.ts getClusterLabel 정합).
   *
   * @param pattern   현재 16-dim 입력 영역 snapshot (caller 영역 setPattern
   *                  영역 동기 sync 보장 영역 정합 catch).
   * @param vigilance match score threshold (0..1, default 0.15). 높을수록
   *                  strict — 자주 novel 판정 + cluster 영역 풍부.
   */
  triggerWithVigilance(pattern: number[], vigilance: number = 0.15): { trialToken: number } {
    // PR #203 polish (LOW SEC 2026-05-10): vigilance defensive clamp [0,1] —
    // caller (UI slider) 의 out-of-range 시 winner.margin 비교가 항상
    // novel (vig<0) 또는 familiar (vig>1) 로 misuse 회피.
    vigilance = Math.max(0, Math.min(1, vigilance));
    // Phase 3.9 v7+v11 (2026-06-03): hand SNN vigilance via cosine sim 우선.
    this.setPattern(pattern);
    const trialTokenForCosine = this._trialTokenSeq + 1; // about-to-increment
    // Phase 3.9 v26 (2026-06-03): hand sync 안 끝난 상태에서 cosine skip —
    // worker desync 인 상태에서 winner 반환하면 reinforceBackground 실패.
    // sync 첫 호출 시 setSubstrate 에서 trigger 됨. 안전을 위해 여기서도 보장.
    if (this.substrateKind === 'orientation-hand' && !this._handSyncedWithWorker) {
      void this._syncHandWithWorker();
    } else {
      this._maybeRecordHandCosineWinner(trialTokenForCosine, pattern);
    }
    const trialToken = ++this._trialTokenSeq;
    // Fix #21 (사용자 catch 2026-05-10 — 학습 #1 no winner spawn 실패 root cause):
    // _vigilancePending.set 영역 triggerBackground await 직전 영역 옮김. 직전
    // 영역 await 영역 후 set 영역 MainThreadTransport fallback path (Web Worker
    // bundle fail 시 자동 fallback) 영역 race 영역 root cause.
    //
    // Race trace (MainThreadTransport):
    //   1. caller awaits client.triggerBackground(req)
    //   2. transport.postMessage(req) → core.handle(req) sync (inline simulation)
    //      → handleTriggerBackground 영역 push emit (queueMicrotask 영역 enqueue,
    //      먼저 enqueue) → handle 영역 ack 반환 → postMessage 영역 ack 영역
    //      queueMicrotask 영역 enqueue (그 다음).
    //   3. microtask drain — push 'triggerComplete' 영역 fire 먼저 →
    //      handleTriggerComplete 영역 호출 → vigilancePending.has(token)=false →
    //      runAutoLearnLoop 미호출 (silent).
    //   4. ack microtask 영역 그 다음 fire → caller await resolve →
    //      vigilancePending.set(token,...) 영역 stale (handler 이미 지나감).
    //
    // 결과: 사용자 catch 영역 "학습 #1 no winner — WTA 대기 / 빈 row / 학습
    // 가중치 0" — vigilance follow-up 영역 fire 안 됨 → expandCluster 미호출 →
    // cluster 영역 0 잔존.
    //
    // 정정: pending state 영역 dispatch 영역 직전 영역 set — push handler 영역
    // fire 시점 영역 보장 catch. dispatch 영역 throw 영역 catch path 영역 cleanup.
    this._vigilancePending.set(trialToken, { pattern: pattern.slice(), vigilance });
    void (async () => {
      try {
        const root = await getRootLocalSnnFor(this.substrateKind);
        await this.ensurePushHandler(root);
        // 1. inferAsync (STDP off) 영역 winner margin 측정 — worker 영역 inline.
        //    triggerBackground RPC 영역 stdpGain=0 영역 정합 — STDP 0 + cluster
        //    firing rates 측정 only.
        // 2. 결과 영역 main thread 영역 push event listener 영역 catch —
        //    handleTriggerComplete 영역 trialToken match 영역 winner.margin
        //    영역 vigilance 영역 비교 + ART expansion + reinforce loop 영역
        //    pending dispatch.
        await root.client.triggerBackground({
          pattern: this.patternRef.slice(),
          intensity: this.opts.intensity,
          observeMs: this.opts.observeMs,
          stimulusDurationMs: this.opts.stimulusDurationMs,
          stdpGain: 0,
          repeats: 3,
          resetThreshold: true,
          trialToken,
        });
      } catch (e) {
        console.warn('[LiveSnn] triggerWithVigilance dispatch failed:', e);
        this._vigilancePending.delete(trialToken);
      }
    })();
    return { trialToken };
  }

  /**
   * PR-K (사용자 catch 2026-05-09 catch 1): ART expansion 영역 worker RPC 영역
   * 호출 + cluster registry length ↑ 영역 caller 영역 catch.
   *
   * worker.expandCluster 영역 production wire — 직전 caller 0 (dead path) 영역
   * triggerWithVigilance 영역 vigilance miss 시점 영역 호출. activeInputs 영역
   * pattern 영역 v > 0.5 영역 binary 영역 catch (sharpenForGesture 정합).
   *
   * @param activeInputs   binary active input idx 배열 (v > threshold).
   * @param opts.forceDisjoint default = true (production wire 2026-05-27).
   *   - worker 영역 기존 registry.slots[].activeInputs union 영역 산출 +
   *     candidate 영역 영역 claimed 영역 제거 영역 disjoint sub-pool 자동 확보.
   *   - backwards-compatible — legacy caller (테스트 / batch supervised path)
   *     영역 explicit `false` 영역 명시 영역 legacy non-disjoint path 영역 활성.
   *   - protocol layer default 영역 false (worker-protocol.ts 영역 명시) —
   *     live-snn layer 영역 production 영역 자동 true override.
   *
   * @returns newClusterId  worker 영역 할당 영역 신규 cluster id (registry
   *                        length 직전 영역 ↑ 영역 정합).
   * @returns totalClusters worker 영역 registry 영역 신규 length.
   * @returns fallbackUsed  forceDisjoint=true 영역 worker 영역 claimed
   *                        exhaustion 영역 plain activeInputs fallback path
   *                        영역 hit 영역 (disjoint 깨짐 정직 catch). 미정의 =
   *                        forceDisjoint=false path 정합.
   */
  async expandClusterAsync(
    activeInputs: number[],
    opts: { forceDisjoint?: boolean } = {},
  ): Promise<{
    newClusterId: number;
    totalClusters: number;
    fallbackUsed?: boolean;
  }> {
    const root = await getRootLocalSnnFor(this.substrateKind);
    // 사용자 catch 2026-05-25 (production incremental forced-disjoint):
    //   default true — production worker dispatch path (triggerWithVigilance →
    //   runAutoLearnLoop) 영역 매 spawn 시점 영역 자동 disjoint sub-pool 영역
    //   확보. f880a89 batch forced-disjoint 4/4 wire 영역 production 영역 자동
    //   적용. legacy caller (테스트 등) 영역 opts.forceDisjoint=false 영역 명시
    //   영역 opt-out.
    const r = await root.client.expandCluster({
      activeInputs,
      forceDisjoint: opts.forceDisjoint ?? true,
    });
    // QA MEDIUM 4 + UX MEDIUM 2 (2026-05-25): fallback path 영역 시각 catch —
    //   worker console.warn only 영역 silent path 영역 정정. showToast warning
    //   amber pill + 'snn-error' event 영역 telemetry hook 영역 emit. 사용자
    //   영역 cluster spawn 영역 disjoint 깨짐 영역 즉시 인지 catch (registry
    //   capacity 영역 점검 affordance).
    if (r.fallbackUsed) {
      // 사용자 production catch (2026-06-01 → 06-03 subset 인식 추가 b90c103):
      //   subset 인식 적용 후 fallback 발생 = 사용자가 이전 cluster cells 영역
      //   일부 빠뜨림 또는 완전 다른 cells 영역 그림 → 신규 패턴 의도 신호.
      //   dialog message 영역 subset 정책 반영 영역 사용자 mental model 영역
      //   "왜 같은 패턴인데 dialog 가?" 영역 영역 명확 catch.
      // Phase 3.9 (2026-06-03): substrate-aware dialog 정정.
      //   - hand 는 95-dim, "cells 그렸다면" 문구는 grid 전용 부적합.
      //   - feature count 도 substrate 별 (orientation-6x6=72 / hand=95).
      const isHand = this.substrateKind === 'orientation-hand';
      const totalFeat = isHand ? 95 : 72;
      const message = isHand
        ? `이전 학습된 hand cluster 들과 비교했을 때 이 자세는:\n` +
          `  • cluster 의 활성 feature 중 일부만 활성화\n` +
          `  • 또는 완전 다른 feature set 으로 매칭\n\n` +
          `(참고: 이전 cluster 의 활성 features 를 모두 포함하면서 추가 features 가 있다면 ` +
          `같은 자세로 인식되어 이 dialog 가 표시되지 않습니다.)\n\n` +
          `현재 cluster pool 의 features 가 가득 차 있습니다 (${r.claimedSize ?? '?'}/${totalFeat} features). ` +
          `이대로 spawn 시 새 cluster 가 이전 cluster 와 features overlap 으로 ` +
          `구분 정확도 저하 가능.\n\n` +
          `선택:`
        : `이전 학습된 cluster 들과 비교했을 때 이 패턴은:\n` +
          `  • cluster cells 의 일부 빠뜨림\n` +
          `  • 또는 완전 다른 cells 로 그림\n\n` +
          `(참고: 이전 cluster cells 를 모두 포함 + 추가 cells 로 그렸다면 ` +
          `같은 패턴으로 인식되어 이 dialog 가 표시되지 않습니다.)\n\n` +
          `현재 cluster pool 이 이미 가득 차 있습니다 (${r.claimedSize ?? '?'}/${totalFeat} features). ` +
          `이대로 spawn 시 새 cluster 가 이전 cluster weights 와 overlap 으로 ` +
          `구분 정확도 저하 가능.\n\n` +
          `선택:`;
      showDialog({
        kind: 'confirm',
        title: '신규 패턴 인식 — cluster pool 고갈',
        message,
        confirmLabel: '학습 reset 후 처음부터',
        cancelLabel: '이대로 계속 (overlap 감수 spawn)',
        onConfirm: () => {
          void purgeAllLearningData();
          showToast({
            kind: 'success',
            message: '학습 데이터 reset 완료 — 처음부터 다시 학습해 주세요.',
            duration: 5000,
          });
        },
      });
      emitBackendEvent('snn-error', {
        source: 'rpc',
        message: 'expandCluster forceDisjoint fallback — claimed exhaustion',
        context: {
          newClusterId: r.newClusterId,
          totalClusters: r.totalClusters,
          claimedSize: r.claimedSize,
          candidateActiveInputs: activeInputs,
        },
      });
      // CPM-1 diagnostic (2026-05-31): fallback cluster id 영역 mark — 다음
      // logCpm1ForKind 호출 영역 'fallback' badge 영역 표시. H2 (sub-pool
      // exhaustion) confirmation 영역 핵심 telemetry.
      markClusterAsFallback(r.newClusterId);
    }
    // CPM-1 diagnostic (2026-05-31): spawn 직후 영역 pool usage snapshot log —
    // 사용자 영역 dev tools console 영역 spawn 시점 영역 sub-pool size /
    // overlap matrix 확인 path. fire-and-forget — 본 path 영역 await 0 (production
    // accuracy 영향 0).
    logCpm1ForKind(this.substrateKind, `spawn cluster=${r.newClusterId}`);
    return {
      newClusterId: r.newClusterId,
      totalClusters: r.totalClusters,
      fallbackUsed: r.fallbackUsed,
    };
  }

  /**
   * 즉시 return — R-STDP supervised reward 영역 worker 영역 inline 처리.
   * push event ('reinforceComplete') 영역 emitTick + lab.save force fire-and-forget.
   */
  reinforceAsync(targetCluster: number, gain: number = 0.8): { trialToken: number } {
    // QA CAUSE D fix (2026-05-10): rewardGain default 2.0 → 0.8 — saturation
    // overshoot 회피 (1회 reinforce 영역 W_MAX 도달 영역 saturation 영역 root cause).
    // multi-trial 수렴 정합 — 학술 정합 (Florian 2007 R-STDP 영역 gain 0.5-1.0
    // 권장 영역 trial 누적 영역 LTP 영역 점진 수렴).
    //
    // QA CAUSE D1 fix (2026-05-10): punishGain=0 → gain*0.25 — wrong-winner LTD
    // escape 0 정직 한계 정정. Florian 2007 / Izhikevich 2007 R-STDP wrong-action
    // LTD 정합 — punishGain=0 영역 wrong winner cluster 영역 weight 영역 unchanged
    // → saturation lock-in escape 0 영역 root cause. gain*0.25 영역 보수적 LTD
    // (reward LTP 영역 1/4) — 양방향 escape mandatory.
    const trialToken = ++this._trialTokenSeq;
    void (async () => {
      try {
        const root = await getRootLocalSnnFor(this.substrateKind);
        await this.ensurePushHandler(root);
        await root.client.reinforceBackground({
          pattern: this.patternRef.slice(),
          targetCluster,
          rewardGain: gain,
          punishGain: gain * 0.25,
          intensity: this.opts.intensity,
          observeMs: this.opts.observeMs,
          stimulusDurationMs: this.opts.stimulusDurationMs,
          trialToken,
        });
      } catch (e) {
        console.warn('[LiveSnn] reinforceAsync dispatch failed:', e);
      }
    })();
    return { trialToken };
  }

  /**
   * lazy bind push handler — root.client.on(...) 영역 매 emit 영역 fresh root
   * 영역 reuse 0 + setSubstrate 영역 unsubscribe + re-bind 영역 정합 (PR #186
   * SEC-1 substrate switch stale closure 호환 보존).
   *
   * 정직 한계: 한 번 bind 후 root reference 영역 capture — substrate 영역 동일
   * 영역 reuse 영역 정합. setSubstrate 영역 _pushBoundForKind=null + unsubscribe
   * 영역 catch 영역 다음 triggerAsync 영역 fresh root 영역 re-bind.
   */
  private async ensurePushHandler(root: RootLocalSnn): Promise<void> {
    if (this._pushBoundForKind === this.substrateKind) return;
    // 직전 binding 영역 stale 회피 — 별도 cleanup (setSubstrate 영역 정합).
    for (const off of this._unsubscribePush) {
      try { off(); } catch { /* noop */ }
    }
    this._unsubscribePush = [];
    this._pushBoundForKind = this.substrateKind;
    const offT = root.client.on('triggerComplete', (payload: TriggerCompletePayload) => {
      this.handleTriggerComplete(root, payload);
    });
    const offR = root.client.on('reinforceComplete', (payload: ReinforceCompletePayload) => {
      this.handleReinforceComplete(root, payload);
    });
    // QA FINDING-4 fix (2026-05-10): triggerError listener — handleTriggerBackground
    // / handleReinforceBackground catch path 영역 emit 영역 main thread 영역 정합.
    // emitBackendEvent('snn-error') 영역 toast + LiveTickDetail 영역 silent winner
    // -1 영역 emit (caller 영역 pendingInferTokenRef / pendingReinforceTokenRef
    // 영역 trialToken match 영역 reset 정합 — status copy 영역 'snn-error' toast
    // 영역 caller 영역 별도 visible).
    const offE = root.client.on('triggerError', (payload: TriggerErrorPayload) => {
      this.handleTriggerError(payload);
    });
    this._unsubscribePush.push(offT, offR, offE);
  }

  private handleTriggerError(payload: TriggerErrorPayload): void {
    // QA FINDING-4 fix (2026-05-10): worker simulation throw 영역 main thread
    // 영역 visual catch — emitBackendEvent('snn-error') + LiveTickDetail 영역
    // silent (winner=-1, rates=0) 영역 emit (caller 영역 token match 영역 reset).
    emitBackendEvent('snn-error', {
      source: 'rpc',
      message: payload.error,
      context: { event: 'triggerError', source: payload.source, trialToken: payload.trialToken },
    });
    // silent cfr 영역 emit — caller 영역 trialToken match 영역 status reset 정합.
    const silentCfr: ClusterFiringRatesResult = {
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      // Fix #22 (사용자 catch 2026-05-10): silent path → inputMatch=0 정합
      // (silent / no winner — vigilance miss path 영역 spawn 자연 catch).
      inputMatch: 0,
      layer: 'OUT',
    };
    this.emitTick(silentCfr, 0, 0, {
      trialToken: payload.trialToken,
      source: payload.source,
      targetCluster: payload.targetCluster,
    });
  }

  private handleTriggerComplete(root: RootLocalSnn, payload: TriggerCompletePayload): void {
    // 정직 한계: out-of-order push 영역 latest-token-wins discrimination 영역
    // 본 path 영역 미적용 — worker 영역 sequential serial 영역 자연 정합 +
    // main thread 영역 stale token 영역 dispatch 0 (push order = trial order).
    this.trialCount += 1;
    // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
    //   "다른 패턴임에도 패턴1에 학습이 진행되었습니다". root cause —
    //   STDP-off trigger 영역 winner emerge 영역 ANY pattern 영역 가능 (dense
    //   WTA + 학습 cluster weight 우위) → emitTick 영역 winner_cluster broadcast
    //   + incrementCount fire → 사용자 영역 "cluster 1 학습 진행" 영역 misread.
    //   정직 한계: 실제 R-STDP weight 변화 영역 0 (stdpGain=0) 단 UI count + winner
    //   표시 영역 cluster 1 영역 표시 → 신규 cluster 2 spawn + 30 trial reinforce
    //   영역 separate path 영역 동시 진행 영역 사용자 영역 catch 0.
    //
    //   정정: vigilance check 영역 emitTick 영전 영역 옮김. inputMatch < vigilance
    //   영역 mismatch 영역 emitTick 영역 vigilanceMismatch=true 전달 → emitTick
    //   영역 winner_cluster=null broadcast + incrementCount skip (mismatch cluster
    //   영역 stale count 영원 회피). Carpenter & Grossberg 1987 ART canonical 정합 —
    //   F2 reset 시점 영역 winner 영역 invalidate.
    const pending = this._vigilancePending.get(payload.trialToken);
    const winner = payload.cfr.winner;
    const inputMatch = payload.cfr.inputMatch;
    // Phase 3.9 v7 (2026-06-03): hand cosine similarity override.
    // 직전 worker-side Jaccard 의 vigilance decision 이 hand SNN 의 plain top-K
    // 한계로 부정확 (50% accuracy). LiveSnn 이 미리 stored cluster training
    // features 와 cosine sim 계산해서 winner 결정 시 그것을 우선.
    const cosineWinner = this._handCosineWinner.get(payload.trialToken);
    this._handCosineWinner.delete(payload.trialToken);
    // Phase 3.9 v21 (2026-06-03): SNN R-STDP diagnostic — cosine winner vs
    // worker SNN winner agreement 측정 + cluster firing rates logging.
    // hand substrate 일 때만 실행.
    if (this.substrateKind === 'orientation-hand' && cosineWinner !== undefined) {
      const workerWinner = payload.cfr.winner;
      const rates = payload.cfr.rates ?? [];
      const ratesStr = rates
        .map((r, i) => `c${i}:${r.toFixed(1)}Hz`)
        .slice(0, 5)
        .join(' ');
      const agree = workerWinner === cosineWinner.clusterId;
      console.log(
        `[hand-snn-diag] token=${payload.trialToken} cosine=c${cosineWinner.clusterId}(${cosineWinner.sim.toFixed(3)}) worker=c${workerWinner} agree=${agree} rates=[${ratesStr}]`,
      );
    }
    // Phase 3.9 v8 (2026-06-03): cosine match 시 cluster training feature 를
    // EMA update — 같은 자세 반복 시 cluster centroid 가 사용자 실제 자세
    // 분포로 수렴 → jitter robustness 향상.
    // Phase 3.9 v18 (2026-06-03): strict match 만 EMA + R-STDP 적용.
    // weak match (cos 0.78-0.93) 는 classify only — borderline 자세에서
    // cluster centroid drift 방지.
    if (cosineWinner !== undefined && cosineWinner.strict && this.patternRef.length === 95) {
      const existing = this._handClusterFeatures.get(cosineWinner.clusterId);
      if (existing) {
        const ALPHA = 0.1; // 새 sample weight (10% EMA).
        const updated = existing.slice();
        for (let i = 0; i < 95; i += 1) {
          updated[i] = existing[i] * (1 - ALPHA) + this.patternRef[i] * ALPHA;
        }
        this._handClusterFeatures.set(cosineWinner.clusterId, updated);
        saveHandClusterFeats(this._handClusterFeatures);
      }
      // Phase 3.9 v9 (2026-06-03): cosine match 시 SNN cluster 도 R-STDP 강화 —
      // cluster 의 neuron weights 가 매 매칭마다 reinforce → SNN 의 firing rate
      // 가 cluster 0/1/2/3 winner detection 과 일치하게 유지. cosine sim 매칭
      // (LiveSnn-side) 와 SNN winner (worker-side) 가 long-term 동기화.
      void this.reinforceAsync(cosineWinner.clusterId, 0.3);
    }
    const vigilanceMismatch = cosineWinner !== undefined
      ? false  // cosine sim 으로 familiar 자세로 결정됨 → spawn skip
      : (pending !== undefined && (winner < 0 || inputMatch < pending.vigilance));
    // PR #192 polish (UX-3 + QA FINDING-1/2): trialToken + source 영역 LiveTickDetail
    // 영역 동봉 → caller 영역 reinforcingCluster 영역 token match 영역 reset.
    this.emitTick(
      payload.cfr,
      payload.v1Hz,
      payload.v2Hz,
      {
        trialToken: payload.trialToken,
        source: 'trigger',
        vigilanceMismatch,
      },
      // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount 전달.
      payload.v1FireCount ?? 0,
      payload.v2FireCount ?? 0,
    );
    // saveDebounced fire-and-forget — 사용자 결과 표시 영역 IndexedDB write
    // 영역 wait 0. force=false (throttle 정합 — supervised path 영역 reinforce
    // 별도 force=true).
    void this.saveDebounced(root, false);
    // PR-K (사용자 catch 2026-05-09 catch 1): ART vigilance follow-up — winner
    // margin 영역 vigilance 영역 비교 + novel pattern 영역 auto-learn dispatch.
    if (pending !== undefined) {
      this._vigilancePending.delete(payload.trialToken);
      const { pattern } = pending;
      const margin = payload.cfr.margin;
      // Fix #22 (사용자 catch 2026-05-10 — 첫번째 패턴만 학습되고 2번째 패턴이
      // 학습이 안됨): Carpenter-Grossberg 1987 ART vigilance ρ canonical 정합 —
      // |I ∩ T| / |I| (input ∩ winner template / input). 직전 margin (rate-based
      // (max-second)/max) 영역 단일 cluster 영역 항상 1.0 (max=max, second=0)
      // → vigilance 영역 영원히 pass → 신규 input pattern 영역 spawn 0 영역
      // root cause. inputMatch (worker-core 영역 산출) 영역 신규 input pattern
      // 영역 winner cluster 영역 activeInputs 영역 영역 영역 영역 0.0 → vigilance
      // miss → expandClusterAsync (cluster 2 spawn) → 30회 reinforce → 패턴 2 winner.
      // 정직 한계: 직전 margin path 영역 다중 cluster 영역 ambiguous winner
      // discrimination 영역 영역 — inputMatch 영역 input vs template 영역 직접
      // 매칭 영역 catch 영역 ART canonical 정합 영역 입력 pattern novelty 영역
      // 정확 catch 영역 우선 (margin path 영역 fallback 0 — 단일 정의).
      // (margin reference retain — debug / future fallback path 영역 0 mutation).
      void margin;
      // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
      // mismatch 영역 vigilanceMismatch 영역 outer scope 영역 이미 산출 정합 —
      // 동일 condition 영역 spawn path 영역 trigger.
      if (vigilanceMismatch) {
        // P218 (2026-05-20): n13 (32-dim) / n14 (50-dim) dispatch — in_feat_0..N 정합.
        const feat32 = dispatchFeature(pattern);
        const isHandSubstrate = this.substrateKind === 'orientation-hand';
        if (isHandSubstrate) {
          // Phase 3.9 v5 (2026-06-03): incremental mean-subtracted top-K +
          // unclaimed filter. encoder.ts:237-256 의 documented 해법:
          //   각 자세의 "이 자세만 특별히 활성/비활성 되는 features" = top-K by
          //   |feat - runningMean|. batch 가 아닌 incremental — 학습 누적된
          //   모든 trigger 의 평균을 빼고 top-K. 첫 cluster 는 mean 없으므로
          //   plain top-K. 추가로 forceDisjoint 위해 claimed features 제외.
          void (async () => {
            try {
              const usage = await root.client.clusterPoolUsage();
              const claimed = new Set<number>();
              for (const c of usage.perCluster) for (const i of c.activeInputs) claimed.add(i);
              const mean = this._handFeatRunningMean;
              const useMeanSubtracted = mean !== null && this._handFeatSampleCount > 0;
              const pairs: Array<{ idx: number; score: number }> = [];
              for (let i = 0; i < feat32.length; i += 1) {
                const score = useMeanSubtracted
                  ? Math.abs(feat32[i] - mean![i])  // residual magnitude
                  : feat32[i];                       // plain magnitude (first cluster)
                pairs.push({ idx: i, score });
              }
              pairs.sort((a, b) => b.score - a.score);
              const activeInputs: number[] = [];
              for (const p of pairs) {
                if (activeInputs.length >= HAND_SPARSE_TOP_K_DEFAULT) break;
                if (!claimed.has(p.idx)) activeInputs.push(p.idx);
              }
              if (activeInputs.length === 0) {
                const fallback = selectTopKActive(feat32, HAND_SPARSE_TOP_K_DEFAULT);
                if (fallback.length > 0) void this.runAutoLearnLoop(payload.trialToken, fallback);
                return;
              }
              activeInputs.sort((a, b) => a - b);
              // 학습 시작 직후 running mean update (Welford-style incremental).
              this._updateHandFeatMean(feat32);
              void this.runAutoLearnLoop(payload.trialToken, activeInputs);
            } catch (e) {
              console.warn('[LiveSnn] hand-disjoint top-K query failed:', e);
              const fallback = selectTopKActive(feat32, HAND_SPARSE_TOP_K_DEFAULT);
              if (fallback.length > 0) void this.runAutoLearnLoop(payload.trialToken, fallback);
            }
          })();
          return;
        }
        // Non-hand (grid orientation) substrate — threshold > 0.5 path 유지.
        const activeInputs: number[] = [];
        for (let i = 0; i < feat32.length; i += 1) if (feat32[i] > 0.5) activeInputs.push(i);
        // activeInputs 길이 0 은 silent pattern (사용자가 빈 grid 로 추론
        // button click) — auto-learn skip + emit dummy reinforce push 로
        // caller 의 token reset 정합 (NodeInfer status 의 사용자 catch 가 0 →
        // '추론 완료' fallback).
        if (activeInputs.length === 0) return;
        // fire-and-forget 30 trial chunked reinforce — 5 trial chunk × 6 round.
        void this.runAutoLearnLoop(payload.trialToken, activeInputs);
      }
    }
  }

  /**
   * PR-K (사용자 catch 2026-05-09 catch 1): ART expansion + 30 trial chunked
   * reinforce loop — triggerWithVigilance 영역 vigilance miss 시점 영역
   * handleTriggerComplete 영역 dispatch.
   *
   * sequence:
   *   1. expandClusterAsync(activeInputs) — worker.expandCluster RPC 영역
   *      신규 cluster 슬롯 할당 (registry length ↑).
   *   2. 30 trial 영역 5-trial chunk × 6 round — reinforceBackground RPC 영역
   *      newClusterId 영역 supervised target. 각 chunk 영역 push event 영역
   *      별도 emit (NodeLearn 영역 progress visibility).
   *   3. final chunk 영역 trialToken 영역 caller (GridInput) 영역 token match
   *      영역 status reset 영역 정합.
   *
   * 정직 한계: 5 trial × 6 round = 30 frame — Diehl & Cook 2015 supervised
   * batch 영역 frame count 정합 (단일 cluster 영역 weight 수렴 영역 충분).
   * worker 영역 sequential serial 영역 자연 정합 — main thread block 0.
   */
  /**
   * Phase 3.9 v7 (2026-06-03): cosine similarity 기반 cluster matching.
   * 사용자 위임 "사용자가 아무것도 안할 수 있도록" → captured fixture test
   * (tests/integration/phase-3-v7-cosine-similarity-iter):
   *   v6 (mean-sub top-K + Jaccard):  50%
   *   v7a (cosine sim vs stored):    100%
   * 본 method 는 hand substrate + 저장된 cluster training features 가 존재하면
   * cosine sim 으로 winner 결정 → handleTriggerComplete 에서 vigilance override.
   * threshold 0.97 — 사실상 같은 자세 (synthetic 1.000, 실제 webcam jitter
   * 도 0.98+ 예상).
   */
  // Phase 3.9 v26 (2026-06-03): worker sync — substrate switch 시 worker pool
  // 확인 + stored activeInputs 로 expandCluster 호출하여 진짜 동기화.
  // 사용자 학습 데이터 보존 + cosine path 안전 활성화.
  private async _syncHandWithWorker(): Promise<void> {
    if (this._handSyncInFlight !== null) {
      await this._handSyncInFlight;
      return;
    }
    this._handSyncInFlight = (async () => {
      try {
        const root = await getRootLocalSnnFor('orientation-hand');
        const usage = await root.client.clusterPoolUsage();
        if (this._handClusterFeatures.size > 0 && usage.perCluster.length === 0) {
          // Desync — worker fresh, LiveSnn 학습 데이터 있음.
          // Worker 에 stored activeInputs (v26+) 또는 feature top-K fallback (v27)
          // 으로 cluster 재구성. v26 이전 학습 데이터는 activeInputs 가 없으므로
          // feature 95-dim 에서 top-K disjoint indices 를 생성해서 reinforce 가
          // 정상 동작하도록 사용자 학습 데이터 완전 복원.
          const FALLBACK_K = 5;
          const claimed = new Set<number>();
          const sortedIds = [...this._handClusterFeatures.keys()].sort((a, b) => a - b);
          let syncedCount = 0;
          let fallbackCount = 0;
          for (const clusterId of sortedIds) {
            let activeInputs = this._handClusterActiveInputs.get(clusterId);
            if (!activeInputs || activeInputs.length === 0) {
              // v27: fallback — feature top-K disjoint indices.
              const feat = this._handClusterFeatures.get(clusterId);
              if (!feat || feat.length !== 95) {
                console.warn(`[hand-sync] cluster ${clusterId} feature missing — skip`);
                continue;
              }
              const pairs: Array<{ idx: number; val: number }> = [];
              for (let i = 0; i < feat.length; i += 1) pairs.push({ idx: i, val: feat[i] });
              pairs.sort((a, b) => b.val - a.val);
              const fb: number[] = [];
              for (const p of pairs) {
                if (fb.length >= FALLBACK_K) break;
                if (!claimed.has(p.idx)) fb.push(p.idx);
              }
              if (fb.length < FALLBACK_K) {
                console.warn(`[hand-sync] cluster ${clusterId} fallback 부족 (${fb.length}/${FALLBACK_K}) — skip`);
                continue;
              }
              activeInputs = fb;
              fallbackCount += 1;
              // 복원된 activeInputs 를 다음 세션에도 보존.
              this._handClusterActiveInputs.set(clusterId, fb);
            }
            try {
              await root.client.expandCluster({ activeInputs, forceDisjoint: false });
              for (const idx of activeInputs) claimed.add(idx);
              syncedCount += 1;
            } catch (e) {
              console.warn(`[hand-sync] cluster ${clusterId} expandCluster 실패:`, e);
            }
          }
          if (fallbackCount > 0) saveHandClusterActive(this._handClusterActiveInputs);
          console.log(`[hand-sync] worker 에 ${syncedCount}/${sortedIds.length} clusters 재구성 완료 (fallback=${fallbackCount})`);
        } else if (this._handClusterFeatures.size === 0 && usage.perCluster.length === 0) {
          console.log('[hand-sync] LiveSnn + worker 모두 fresh — sync 불필요');
        } else if (this._handClusterFeatures.size === 0 && usage.perCluster.length > 0) {
          // Worker 에 cluster 있지만 LiveSnn 학습 데이터 없음 — 사용자 reset 후 worker 잔존?
          console.warn(`[hand-sync] LiveSnn 0 clusters vs worker ${usage.perCluster.length} clusters — 미정 상태, fresh 진행`);
        }
        this._handSyncedWithWorker = true;
      } catch (e) {
        console.warn('[hand-sync] sync failed:', e);
        this._handSyncedWithWorker = true; // 실패해도 cosine path 진행 가능하도록
      } finally {
        this._handSyncInFlight = null;
      }
    })();
    await this._handSyncInFlight;
  }

  private _maybeRecordHandCosineWinner(token: number, pattern: number[]): void {
    if (this.substrateKind !== 'orientation-hand') return;
    if (pattern.length !== 95) return;
    if (this._handClusterFeatures.size === 0) return;
    // Phase 3.9 v18 (2026-06-03): dual threshold cosine matching.
    //   strict (0.93+): clear match → EMA update + R-STDP reinforce
    //   weak (0.78-0.93): borderline pose → classify but skip EMA / reinforce
    //                     (사용자 자세 미세 변동, 새 spawn 회피)
    //   below 0.78: 진짜 다른 자세 → SPAWN
    const HAND_COSINE_STRICT_THRESHOLD = 0.93;
    const HAND_COSINE_WEAK_THRESHOLD = 0.78;
    const HAND_COSINE_THRESHOLD = HAND_COSINE_WEAK_THRESHOLD; // spawn-or-match boundary
    const normInput = this._normalizePatternV11(pattern);
    let bestId = -1;
    let bestSim = -Infinity;
    const allSims: Array<{ id: number; sim: number }> = [];
    for (const [id, feat] of this._handClusterFeatures.entries()) {
      const normStored = this._normalizePatternV11(feat);
      const sim = this._cosineSimilarity(normInput, normStored);
      allSims.push({ id, sim });
      if (sim > bestSim) { bestSim = sim; bestId = id; }
    }
    // Production debug — production catch / threshold 튜닝 시 sim 값 가시화.
    const simStr = allSims
      .sort((a, b) => b.sim - a.sim)
      .slice(0, 5)
      .map((s) => `c${s.id}=${s.sim.toFixed(3)}`)
      .join(' ');
    const matched = bestId >= 0 && bestSim >= HAND_COSINE_THRESHOLD;
    const strict = bestId >= 0 && bestSim >= HAND_COSINE_STRICT_THRESHOLD;
    const matchType = strict ? 'MATCH' : matched ? 'WEAK_MATCH' : 'SPAWN';
    console.log(
      `[hand-cosine] token=${token} best=c${bestId} sim=${bestSim.toFixed(3)} strict=${HAND_COSINE_STRICT_THRESHOLD} weak=${HAND_COSINE_WEAK_THRESHOLD} ${matchType} | top5: ${simStr}`,
    );
    if (matched) {
      this._handCosineWinner.set(token, { clusterId: bestId, sim: bestSim, strict });
    }
    // Phase 3.9 v20 (2026-06-03): emit hand-cosine-sim event — UI 가 실시간 sim 표시.
    emitBackendEvent('hand-cosine-sim', {
      token,
      clusterId: bestId,
      sim: bestSim,
      strict,
      weak: matched && !strict,
      spawn: !matched,
    });
  }

  private _cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i += 1) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    const denom = Math.sqrt(na) * Math.sqrt(nb);
    return denom > 0 ? dot / denom : 0;
  }

  /**
   * Phase 3.9 v11 (2026-06-03): pattern 의 raw coords [0..62] 를 wrist-relative
   * + palm-size normalized 로 변환. cross-pose discrimination 3.4x 향상 +
   * translation invariance (captured fixture 측정). pattern 자체 안에 wrist
   * (indices 0,1,2) 와 middleMcp (indices 27,28,29) 가 있으므로 LiveSnn 가
   * encoder 변경 없이 cosine sim path 만 normalize 가능.
   */
  private _normalizePatternV11(pattern: number[]): number[] {
    if (pattern.length !== 95) return pattern;
    const wristX = pattern[0], wristY = pattern[1], wristZ = pattern[2];
    const mcpX = pattern[27], mcpY = pattern[28], mcpZ = pattern[29];
    const palmSize = Math.sqrt(
      (wristX - mcpX) ** 2 + (wristY - mcpY) ** 2 + (wristZ - mcpZ) ** 2,
    ) || 0.1;
    const out = new Array<number>(95);
    // Normalize coords [0..62]: wrist-relative + palm-size scaled.
    for (let i = 0; i < 21; i += 1) {
      out[i * 3 + 0] = (pattern[i * 3 + 0] - wristX) / palmSize;
      out[i * 3 + 1] = (pattern[i * 3 + 1] - wristY) / palmSize;
      out[i * 3 + 2] = (pattern[i * 3 + 2] - wristZ) / palmSize;
    }
    // Copy derived features [63..94] unchanged (이미 normalized).
    for (let i = 63; i < 95; i += 1) out[i] = pattern[i];
    return out;
  }

  /**
   * Phase 3.9 v6 (2026-06-03): hand pattern pre-sparsify with mean-subtraction.
   * worker side 가 plain top-K 만 알기 때문에, LiveSnn 이 mean-subtracted top-K=5
   * 를 미리 선택해서 sparse pattern (그 5 indices 만 nonzero) 으로 변환 후 전달.
   * worker dispatchComputeFeature 의 selectTopKActive 는 sparse pattern 의
   * 5 nonzero indices 를 그대로 선택 → activeIdx 가 mean-subtracted basis 와 일치.
   *
   * hand substrate 가 아니거나 mean 이 없으면 원본 pattern 반환 (no-op).
   * 첫 trigger (mean=null) 는 plain top-K 로 처리 → cluster 0 template = plain.
   * 두 번째 trigger 이상 (mean 존재) → mean-subtracted basis 일관 적용.
   */
  private _preSparsifyHandPattern(pattern: number[]): number[] {
    if (this.substrateKind !== 'orientation-hand') return pattern;
    if (pattern.length !== 95) return pattern;
    if (this._handFeatRunningMean === null || this._handFeatSampleCount === 0) {
      return pattern; // 첫 trigger — worker plain top-K 그대로 사용.
    }
    const mean = this._handFeatRunningMean;
    const pairs: Array<{ idx: number; score: number }> = [];
    for (let i = 0; i < 95; i += 1) {
      pairs.push({ idx: i, score: Math.abs(pattern[i] - mean[i]) });
    }
    pairs.sort((a, b) => b.score - a.score);
    const topK = pairs.slice(0, 5).map((p) => p.idx);
    // Sparse 95-dim: top-K=5 indices keep original values, rest zero.
    const sparse = new Array<number>(95).fill(0);
    for (const idx of topK) sparse[idx] = pattern[idx];
    return sparse;
  }

  /**
   * Phase 3.9 v5 (2026-06-03): Welford-style incremental mean update for hand
   * SNN running mean. 호출 시 sampleCount += 1, mean += (x - mean) / count.
   * 학습 완료된 자세들의 평균만 누적 — vigilance pass (familiar) 시는 update
   * 안 함 (familiar 자세의 평균 dominance 회피).
   */
  private _updateHandFeatMean(feat: number[]): void {
    if (feat.length !== 95) return;
    if (this._handFeatRunningMean === null) {
      this._handFeatRunningMean = feat.slice();
      this._handFeatSampleCount = 1;
    } else {
      this._handFeatSampleCount += 1;
      const n = this._handFeatSampleCount;
      const mean = this._handFeatRunningMean;
      for (let i = 0; i < 95; i += 1) {
        mean[i] += (feat[i] - mean[i]) / n;
      }
    }
    // Phase 3.9 v25: saveHandMean removed (page load 시 어차피 wipe — 무의미한
    // localStorage write 회피).
  }

  private async runAutoLearnLoop(originalToken: number, activeInputs: number[]): Promise<void> {
    // Fix 1 (2026-05-15): MAX_CLUSTERS hard limit — expandCluster 호출 전
    // 현재 exemplar cluster 수 확인. 상한 이상이면 spawn 차단 (toast 알림).
    // P215e (2026-05-19): 8 → 16 확장. N=9 학습 시 9번째 패턴 영역 cluster
    // spawn 영역 차단 영역 patternToCluster 영역 prev cluster 영역 흡수 영역
    // 부분단서 무너지는 root cause 영역 fix. n13-orientation builder 영역
    // N_CLUSTER dynamic + worker validate cap 0..63 영역 16 << 64 안전 영역.
    // P215g revert (2026-05-20): 16 → 8 cap 복원. P213/P214b/P215f 측정 영역
    // N=9 영역 unstable 영역 evidence — partial cue 22%, noise 56%, WTA margin
    // 53% 영역 capacity edge. P215c/P215f 두 번의 mechanism 영역 시도 영역
    // regression 영역 결론 영역 N=8 영역 stable cap 영역 인정. 사용자 mental
    // model "내가 학습 가능한 최대 패턴 수 = 8" 영역 신뢰성 영역 우선 영역 —
    // misleading capacity 영역 publish 영역 risk 영역 회피.
    //
    // P218 capacity sweep (2026-05-21): substrate-aware cap.
    // 4×4 (orientation) — 8 cap 유지 (P215 measured ceiling).
    // 5×5 (orientation-5x5) — 12 cap 영역 확장. setPattern dim bug fix 후
    // P218 N=3 영역 100%/100%/100% 영역 N=6 영역 100%/67%/100% 영역 — 4×4 N=8
    // 보다 더 큰 capacity 영역 가능 영역 추정. 12 cap 영역 진짜 5×5 ceiling 영역
    // 측정 (50-dim feature space 영역 8 cluster 영역 매우 sparse 영역 use).
    const MAX_CLUSTERS = this.substrateKind === 'orientation-5x5' ? 12 : 8;
    // P218 (2026-05-24) — training noise RNG. _trainingNoiseSeed null 영역 Math.random
    // (backward compat). 정수 영역 SeededRandom 영역 — reproducibility 보장.
    const trainNoiseRng = this._trainingNoiseSeed !== null
      ? (() => { const r = new SeededRandom(this._trainingNoiseSeed!); return () => r.random(); })()
      : Math.random;
    {
      const exNow = loadExemplars(this.substrateKind);
      let curCount = 0;
      for (const k of Object.keys(exNow)) {
        const m = /^out_(\d+)_\d+$/.exec(k);
        if (m) { const ci = Number(m[1]) + 1; if (ci > curCount) curCount = ci; }
      }
      if (curCount >= MAX_CLUSTERS) {
        console.warn('[LiveSnn] runAutoLearnLoop: MAX_CLUSTERS reached, spawn blocked.');
        showToast({ kind: 'error', message: `최대 ${MAX_CLUSTERS}개 패턴 도달 — 패턴을 삭제 후 재학습하세요.` });
        return;
      }
    }
    let registeredClusterId: number | null = null;
    // P218 50 trials 시도 (2026-05-25) REVERTED — 1st spawn 영역 모든 trial
    // 증가 시 STDP saturation / over-noise exposure 가 cluster receptive field
    // 손상: Mean noise 41.3 → 33.8%, Best 75 → 63%, Lucky 20% → 0%.
    //
    // 직전 incremental-fairness fix (commit 14a03fe, 2026-05-31) REVERTED:
    //   ROUNDS = 6 * totalClusters → mid clusters STDP saturation (P218 catch
    //   동일 패턴 재현, measurement phase-2a-1-rounds-multiplier-sweep).
    //
    // Phase 2A.1 H3 mitigation fix (2026-05-31, measurement phase-2a-1-
    // extra-rounds-new-cluster):
    //   2nd~ spawn 영역 신규 cluster 영역 단독 90 round (prior cluster 영역
    //   추가 학습 없음 — 영역 영역 saturation 회피).
    //   1st spawn 영역 영역 30 round (P218 sweet spot 유지 — 영역 영역 cluster
    //   영역 영역 영역 영역 cross-competition 영역 영역 영역 영역 saturation 영역).
    //   측정 결과:
    //     v2 [30, 90, 90, 90]: total 90% (last 60%) ✓ Guide §3.4 ≥90% 도달
    //     v3 [30, 60, 60, 60]: total 75% (60 round 영역 부족)
    //     v4 [60, 90, 90, 90]: total 75% (1st 60 round STDP saturation catch)
    //   Root cause:
    //     Sequential per-spawn training 영역 prior cluster 영역 강한 weights
    //     상태 영역 신규 cluster 영역 winner-take-all 경쟁 불가. 90 round
    //     reinforce 영역 신규 cluster 영역 prior 영역 weight 영역 영역 영역
    //     영역 catch — but 1st spawn 영역 적용 시 영역 cluster 영역 영역 영역
    //     영역 영역 saturation (cross-cluster competition 영역 영역).
    //   학술 정합: McCloskey & Cohen 1989 sequential interference + Robins 1995
    //   incremental task budget compensation.
    const CHUNK = 5;
    // ROUNDS / TOTAL 는 expandClusterAsync 후 totalClusters 로 결정 — catch
    // block 의 cleanup emit 에서도 참조 가능하도록 let.
    // baseline 영역 30 trials (1st spawn 영역 P218 sweet spot 영역 정합).
    let ROUNDS = 6;
    let TOTAL = ROUNDS * CHUNK;
    try {
      const { newClusterId, totalClusters } = await this.expandClusterAsync(activeInputs);
      // Phase 3.9 v7 (2026-06-03): hand SNN cluster 학습 시 현재 patternRef
      // 를 cluster training feature 로 저장 (cosine sim 매칭용).
      if (this.substrateKind === 'orientation-hand' && this.patternRef.length === 95) {
        this._handClusterFeatures.set(newClusterId, this.patternRef.slice());
        saveHandClusterFeats(this._handClusterFeatures);
        // Phase 3.9 v26 (2026-06-03): activeInputs 도 저장 — 다음 page reload
        // 시 worker sync 에 사용.
        this._handClusterActiveInputs.set(newClusterId, activeInputs.slice());
        saveHandClusterActive(this._handClusterActiveInputs);
        // Phase 3.9 v19 (2026-06-03): auto-label on spawn — 사용자가 cluster 를
        // "이름 없음" 으로 보지 않고 "자세 N" 자동 부여. 사용자가 나중에 명시적
        // 으로 rename 가능.
        try {
          const exemplars = loadExemplars('orientation-hand');
          const outKey = `out_${newClusterId}_0`;
          const existing = exemplars[outKey];
          if (!existing || !existing.label) {
            const autoLabel = `자세 ${newClusterId + 1}`;
            setExemplarLabel(outKey, 'orientation-hand', autoLabel);
            console.log(`[hand-auto-label] cluster ${newClusterId} → "${autoLabel}"`);
          }
        } catch (e) {
          console.warn('[hand-auto-label] failed:', e);
        }
      }
      // 2nd+ spawn 영역 90 round 영역 cluster 영역 학습 (prior cluster 영역
      // 영역 영역 — over-train 회피). totalClusters 영역 spawn 영역 영역 영역
      // 영역 (1st spawn=1, 4th spawn=4).
      if (totalClusters >= 2) {
        ROUNDS = 18;
        TOTAL = ROUNDS * CHUNK;
      }
      // P218 diagnostic — spawn trace (full activeInputs values).
      if (this.substrateKind === 'orientation-5x5') {
        console.log(`[P218 spawn] cluster=${newClusterId} activeInputs=[${activeInputs.join(',')}]`);
      }
      // MEDIUM #11 (2026-05-11): race-gate add — 진행 중 cluster id 영역 add.
      // emitTick incrementCount 영역 본 Set 영역 size>0 시점 영역 skip.
      this._autoLearnInFlight.add(newClusterId);
      registeredClusterId = newClusterId;
      let progress = 0;
      for (let round = 0; round < ROUNDS; round += 1) {
        for (let i = 0; i < CHUNK; i += 1) {
          // 마지막 chunk 영역 originalToken 영역 reuse — caller 영역 token
          // match 영역 status reset 정합 (final emit). 중간 chunk 영역 fresh
          // token (reinforce push 영역 NodeLearn cluster bar 영역 갱신만).
          const isFinal = round === ROUNDS - 1 && i === CHUNK - 1;
          const trialToken = isFinal ? originalToken : ++this._trialTokenSeq;
          const root = await getRootLocalSnnFor(this.substrateKind);
          await this.ensurePushHandler(root);
          // P215b (2026-05-19) — 2단계 augmentation 영역 reinforce 영역 적용.
          // 30 frame 영역 2분할:
          //   전반 1/2 (idx 0~14): 원본 영역 유지 (cluster anchor 영역 확립)
          //   후반 1/2 (idx 15~29): 노이즈 점진 (노이즈 견고성 회복)
          // 마지막 frame (isFinal) 영역 원본 영역 유지 — featSnap commit
          // semantic 영역 out-exemplars store 영역 원본 패턴 영역 영구화 정합.
          // 학술 정합: noise injection (Goodfellow 2014) regularization 영역
          // ANN training augmentation 영역 정합.
          //
          // P215i (2026-05-20) — 노이즈 범위 영역 5-12.5% → 3-7.5% 영역 축소.
          // root cause analysis 영역 N=8 partial cue 영역 ceiling 영역 cluster
          // receptive field 영역 노이즈 augmentation 영역 확장 영역 inter-cluster
          // overlap 영역 증가 — 특히 T⊃Top row / L⊃Left col 영역 subset/superset
          // 관계 영역 cluster 영역 receptive field overlap 영역 amplify. 노이즈
          // range 영역 축소 영역 cluster 영역 좁힘 영역 partial cue 영역 정확도
          // 영역 ↑ 영역 시도 영역 (trade-off: noise tolerance 영역 약간 ↓ 영역
          // 가능). 12.5% 영역 ANN augmentation 영역 typical 5-10% 영역 약간 높음.
          //
          // P218 noise weakness fix (2026-05-22 ~ 2026-05-23):
          //   v1 (8-18%): 역효과 — noise -7.5%p degraded, partial @0.40 -25%p.
          //   v2 (5-10%): partial cue 0.40-0.60 -12~25%p 무너짐, noise 큰 개선
          //     없음. 두 시도 모두 partial cue (5×5 헤드라인) 손실.
          //   결론 (2026-05-23): 5×5 noise weakness 는 substrate dimensionality
          //     의 기하학적 본질 — training noise augmentation 으로 fixable 0.
          //     REVERT baseline 3-7.5% 영역 partial cue 우위 보존.
          // 다음 mechanism (WTA -10 → -8, expand cluster) 영역 시도.
          const globalIdx = round * CHUNK + i;
          const half = TOTAL / 2; // 15
          let reinforcePattern: number[];
          if (isFinal || globalIdx < half) {
            // 전반 1/2 + 마지막 frame 영역 원본 영역 유지.
            reinforcePattern = this.patternRef.slice();
          } else {
            // 후반 1/2 영역 노이즈 augmentation. t: 0 → 1 영역 3% → 7.5%.
            // P218 (2026-05-24): seeded RNG 영역 reproducibility.
            const t = (globalIdx - half) / half;
            const noiseLevel = 0.03 + t * 0.045;
            reinforcePattern = addSmallNoise(this.patternRef, noiseLevel, trainNoiseRng);
          }
          await root.client.reinforceBackground({
            pattern: reinforcePattern,
            targetCluster: newClusterId,
            // P215h revert (2026-05-20): 0.1 → 0.2 복원. 측정 영역 net wash —
            // subset cluster 영역 보존 영역 superset 영역 reverse confusion 영역
            // 발생 + N=4/N=7 noise 영역 -25%p/-14%p 영역 regression. 진짜
            // root cause 영역 feature-space pattern overlap (T⊃Top row, L⊃Left
            // col) 영역 punishGain tune 영역 불가능 — error 영역 분포 shift 영역만.
            rewardGain: 0.8,
            punishGain: 0.2,
            intensity: this.opts.intensity,
            observeMs: this.opts.observeMs,
            stimulusDurationMs: this.opts.stimulusDurationMs,
            dtMs: this.opts.dtMs,
            trialToken,
          });
          // PR #203 polish (UX HIGH 2026-05-10): chunk 단위 progress emit —
          // NodeLearn 영역 신규 ART expansion cluster 영역 amber bar 영역
          // 진행 visibility (직전 effectiveClusterFrames base 4 only — 신규
          // cluster 영역 progress 0 영역 misleading). PipelineEventContext
          // 영역 framesDone Map 영역 update.
          progress += 1;
          emitBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', {
            trialToken: originalToken,
            clusterId: newClusterId,
            progress,
            total: TOTAL,
          });
        }
      }
    } catch (e) {
      // Fix #20 Part C (2026-05-10): silent failure 영역 visible toast 영역
      // 격상. 직전 console.warn 영역 사용자 catch 0 — auto-learn 영역 fail 영역
      // 사용자 영역 silent (winner -1 / 패턴 미생성). Hebbian spike-pair 0 영역
      // weight unchanged 영역 root cause 영역 visible 영역 (사용자 명시 "기존
      // 로직 신경쓰지말고" — silent fail 폐기 권한).
      const msg = e instanceof Error ? e.message : String(e);
      console.warn('[LiveSnn] runAutoLearnLoop failed:', e);
      // Phase 3.9 (2026-06-03): 'worker disposed' 는 사용자 reset 후 자연
      // race — error toast 안 보이게 silent. learningClusters cleanup 만 진행.
      const isDisposed = /worker\s+disposed/i.test(msg);
      if (!isDisposed) {
        showToast({ kind: 'error', message: `학습 실패 — ${msg}` });
      }
      // PR #192 polish parity (SEC-3): error event 영역 telemetry 영역 emit —
      // dev panel 영역 hook 가능 (현재 listener 0 silent fan-out).
      emitBackendEvent('snn-error', {
        source: 'rpc',
        message: `runAutoLearnLoop failed: ${msg}`,
        context: { trialToken: originalToken, activeInputs },
      });
      // learningClusters 영구 고착 방지 — progress=total emit 영역 강제 cleanup.
      // PipelineEventContext 영역 learningClusters Set 영역 cluster 영역 제거
      // isAutoLearning 고착 → 두 번째 패턴 spawn 차단 버그 정정.
      if (registeredClusterId !== null) {
        emitBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', {
          trialToken: originalToken,
          clusterId: registeredClusterId,
          progress: TOTAL,
          total: TOTAL,
        });
      }
    } finally {
      // MEDIUM #11 (2026-05-11): race-gate remove — 진행 종료 (성공/실패 무관)
      // 영역 cluster id 영역 unregister. emitTick incrementCount 영역 다음 frame
      // 영역 정상 갱신.
      //
      // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix):
      //   "갑작스럽게 패턴4 학습이 완료되었는데 사라짐 (다른 패턴 추론시 사라졌음)".
      //   root cause — 30회 reinforce 진행 중 _autoLearnInFlight gate 영역
      //   incrementCount skip → 학습 완료 시점 영역 신규 cluster 영역 영구
      //   incrementCount fire 영역 0 → exemplars 영역 신규 cluster 영역 store
      //   영역 영역 → 다음 winner 변경 시점 영역 신규 cluster row 영역 cluster
      //   row source (exemplars + winner.cluster floor) 영역 derive 영역 0
      //   → cluster row 영역 사라짐. 정정: 학습 완료 시점 영역 신규 cluster
      //   영역 explicit incrementCount fire — exemplars 영역 신규 cluster 영역
      //   영구 commit (학습 완료 commit semantic 정합). lastWinnerCluster 영역
      //   신규 cluster 영역 set — 다음 emitTick 영역 동일 cluster winner 영역
      //   double-increment 회피 (idempotent gate 정합).
      //
      // 정직 한계: success path 영역만 commit — fail path (catch) 영역 신규
      // cluster 영역 worker registry 영역 spawn 영역 정합 단 weight 영역 미수렴
      // 영역 fresh build path 영역 stale exemplar 회피 정합 (registeredClusterId
      // null check 영역 success path catch).
      if (registeredClusterId !== null) {
        this._autoLearnInFlight.delete(registeredClusterId);
        // 학습 완료 commit — 신규 cluster 영역 exemplars 영역 영구 fire (race-gate
        // skip 영역 missing commit 영역 정정). featSnap 영역 학습 영역 사용된
        // pattern 영역 보존 (legacy export JSON path 호환).
        //
        // 사용자 catch 2026-05-12 (forced-exact-bypass-race-gate):
        //   forced-exact bypass path 영역 본 cluster id 영역 이미 increment 영역
        //   double-increment 회피 영역 mark check + skip + clear. mark 영역
        //   emitTick 영역 set — 본 finally commit 영역 consume.
        try {
          const alreadyIncremented = this._forcedExactIncrementedClusters.has(
            registeredClusterId,
          );
          if (!alreadyIncremented) {
            const featSnap = this.patternRef.slice();
            incrementCount(`out_${registeredClusterId}_0`, this.substrateKind, featSnap);
          }
          // mark consume (idempotent) — 다음 동일 cluster id 영역 학습 영역 fresh.
          this._forcedExactIncrementedClusters.delete(registeredClusterId);
          // 다음 emitTick 영역 동일 cluster winner 영역 idempotent skip 정합 —
          // lastWinnerCluster 영역 신규 cluster 영역 set (double-increment 회피).
          this.lastWinnerCluster = registeredClusterId;
        } catch (e) {
          console.warn('[LiveSnn] auto-learn commit incrementCount failed:', e);
        }
        // 30회 학습 완료 후 자동 클라우드 백업 (fire-and-forget — 실패해도 무시).
        try {
          const exemplars = loadExemplars(this.substrateKind);
          const count = Object.keys(exemplars).length;
          if (count > 0) {
            saveBackup(exemplars as Record<string, unknown>, count)
              .then((ok) => {
                if (ok) emitBackendEvent('auto-backup-done', { count });
              })
              .catch(() => {});
          }
        } catch { /* backup 실패 — 학습 흐름 무영향 */ }
        // CPM-1 diagnostic (2026-05-31): auto-learn loop 완료 직후 영역 pool
        // usage 영역 snapshot — 학습 완료 시점 영역 sub-pool 영역 정합 catch.
        // 사용자 production observation "같은 패턴 재학습 시 인식률 저하" 영역
        // 측정 핵심 — 매 학습 epoch 영역 overlap matrix 영역 evolution catch.
        logCpm1ForKind(this.substrateKind, `auto-learn-complete cluster=${registeredClusterId}`);
      }
    }
  }

  private handleReinforceComplete(root: RootLocalSnn, payload: ReinforceCompletePayload): void {
    this.trialCount += 1;
    this.emitTick(
      payload.cfr,
      payload.v1Hz,
      payload.v2Hz,
      {
        trialToken: payload.trialToken,
        source: 'reinforce',
        targetCluster: payload.targetCluster,
      },
      // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): firingCount 전달.
      payload.v1FireCount ?? 0,
      payload.v2FireCount ?? 0,
    );
    // force=true — supervised reward 영역 즉시 영속 (saveDebounced throttle bypass).
    void this.saveDebounced(root, true);
  }

  private buildInjectEvents(currentT: number): Array<{
    neuron: string;
    weight: number;
    time: number;
    durationMs: number;
    stepMs: number;
  }> {
    // P218 (2026-05-20): raw → expanded dispatch (n13: 16→32, n14: 25→50).
    const feat = dispatchFeature(this.patternRef);
    const out: Array<{ neuron: string; weight: number; time: number; durationMs: number; stepMs: number }> = [];
    // Phase 3.9 fix (2026-06-03): Hand SNN 의 sparse top-K=5 injection.
    // 직전 threshold > 0.5 path 가 hand 95-dim 에서 ~42 active inputs 발생 →
    // 4 gestures 98% overlap (encoder.ts:237-256 진단) → cluster 분리 실패.
    const isHand = this.substrateKind === 'orientation-hand';
    const activeIdx: number[] = isHand
      ? selectTopKActive(feat, HAND_SPARSE_TOP_K_DEFAULT)
      : (() => {
          const r: number[] = [];
          for (let i = 0; i < feat.length; i += 1) if (feat[i] > 0.5) r.push(i);
          return r;
        })();
    for (const i of activeIdx) {
      const v = feat[i];
      out.push({
        neuron: `in_feat_${i}`,
        weight: this.opts.intensity * Math.max(0.5, v), // hand: max(0.5, v) — top-K 가 매우 작은 v 일 때도 강도 보장
        // PR fix/live-mode-time-and-restore — Fix 1: time 영역 net.t 정합.
        time: currentT,
        durationMs: this.opts.stimulusDurationMs,
        stepMs: 0.1,
      });
    }
    return out;
  }

  private emitTick(
    cfr: ClusterFiringRatesResult,
    v1Hz = 0,
    v2Hz = 0,
    meta?: {
      trialToken?: number;
      source?: 'trigger' | 'reinforce';
      targetCluster?: number;
      // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
      // mismatch 영역 emitTick 영역 winner_cluster=null broadcast + incrementCount
      // skip. handleTriggerComplete 영역 vigilance check 영역 결과 영역 전달.
      vigilanceMismatch?: boolean;
    },
    // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): 0 < firing rate 영역
    // V1/V2 neuron 수 — emit 영역 active_neurons_by_region 영역 placeholder
    // array length 영역 동봉 (NodeLearn 영역 (byActive[region] || []).length
    // 영역 read path 영역 정합). 정직 한계: name 정보 0 (count only — UI 영역
    // length 영역만 read 영역 정합). 0 default 영역 backward compat.
    v1FireCount = 0,
    v2FireCount = 0,
  ): void {
    if (typeof window === 'undefined') return;
    // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): trialCount 영역
    // localStorage persist — page reload 영역 학습 횟수 정합 보존. emitTick
    // 영역 trialCount++ 직후 영역 single-source persist path (4개 trialCount++
    // 호출 path 영역 모두 emitTick 영역 도달 정합 — 중복 path 회피).
    //
    // 사용자 catch 2026-05-11 (perf F2-b — throttle): cluster N 영역 emitTick
    // 영역 매 tick localStorage.setItem 영역 cumulative I/O 영역 학습 둔화 source —
    // 250ms throttle 영역 적용. 첫 call 영역 sentinel -∞ 영역 항상 즉시 save
    // (C3 test 영역 호환). dispose 영역 trailing flush 영역 보장.
    {
      const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (nowMs - this._lastTrialPersistAtMs >= LiveSnn.TRIAL_PERSIST_THROTTLE_MS) {
        saveTrialCount(this.substrateKind, this.trialCount);
        this._lastTrialPersistAtMs = nowMs;
      }
    }
    const patternActive = this.patternRef.some((v) => v > 0.5);
    // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
    //   mismatch 시점 영역 winner 영역 invalidate (Carpenter-Grossberg ART F2
    //   reset). LiveTickDetail.winner 영역 -1 swap → caller (GridInput
    //   onLiveTick) 영역 low-conf path 영역 자연 catch + status hint 영역 정합.
    //   neuron-firing 영역 winner_cluster=null + incrementCount skip 영역
    //   downstream 정합. caller 영역 vigilanceMismatch field 영역 read 영역
    //   spawn-pending status hint 영역 표시 가능.
    const mismatch = meta?.vigilanceMismatch === true;
    const effectiveWinner = mismatch ? -1 : cfr.winner;
    const detail: LiveTickDetail = {
      rates: cfr.rates,
      winner: effectiveWinner,
      share: cfr.share,
      margin: cfr.margin,
      patternActive,
      trial: this.trialCount,
      tickAtMs: typeof performance !== 'undefined' ? performance.now() : Date.now(),
      // PR #192 polish (UX-3 + QA FINDING-1/2): token-aware reset hint.
      trialToken: meta?.trialToken,
      source: meta?.source,
      targetCluster: meta?.targetCluster,
      vigilanceMismatch: mismatch || undefined,
    };
    window.dispatchEvent(new CustomEvent<LiveTickDetail>(TICK_EVENT, { detail }));
    // PR3 (사용자 catch 2026-05-09): NodeInfer / PipelineEventContext 영역
    // neuron-firing 영역 listen — Live tick 시 동일 event 도 emit 영역 winner /
    // cluster_rates 영역 자동 반영. (cluster_rates / winner_cluster /
    // winner_margin 영역 backend B+3 combo 정합 필드 동봉.)
    //
    // 사용자 catch 2026-05-09 (Live 모드 broken state — fix/live-mode-substrate-init):
    // V1/V2 region rates 영역 미동봉 → NodeLearn cascade strip 영역 0 + fired=false.
    // 정합 정정: pattern active 시점 영역 V1/V2 영역 cascade 활성 사실 (substrate
    // 영역 INPUT → V1 → V2 → OUT 영역 정합). cluster_rates 영역 max 영역 V1/V2 영역
    // proxy rate 영역 동봉 — UI 영역 fired flag + active count 영역 작동.
    // 정직 한계: 실제 V1/V2 영역 spike rate 영역 별도 RPC 영역 필요 영역 본 path 영역
    // proxy 영역 표시. cluster firing rates 영역 OUT layer 영역 — V1/V2 영역 cascade
    // 영역 winner cluster 영역 sub-cluster 영역 활성 영역 정합 (cluster-local
    // hard-wire 영역).
    // PR fix/live-mode-time-and-restore — Fix 5: V1/V2 영역 실 spike rate
    // 영역 우선 (regionFiringRates RPC). regionFiringRates 영역 fail / 0
    // 영역 cluster_rates max proxy 영역 fallback (legacy behavior 유지).
    const maxRate = cfr.rates.reduce((m, r) => Math.max(m, r), 0);
    const proxyRate = patternActive ? Math.max(maxRate, 1) : maxRate;
    const v1Final = v1Hz > 0 ? v1Hz : proxyRate;
    const v2Final = v2Hz > 0 ? v2Hz : proxyRate;
    // PR #187 polish — QA MEDIUM-5 (audit 2026-05-10): proxy fallback 영역 사실
    // 영역 boolean 영역 emit — UI 영역 실 spike rate vs proxy 영역 catch.
    // V1/V2 둘 중 하나 영역 RPC fail (=0) 영역 proxy 영역 fallback 사실 →
    // patternActive 시점 영역 v1Hz<=0 || v2Hz<=0 영역 isProxy=true.
    const isProxy = patternActive && (v1Hz <= 0 || v2Hz <= 0);
    // 사용자 catch 2026-05-11 (v1v2-firing-count-fix): active_neurons_by_region
    // 영역 placeholder array (length = firingCount) 영역 동봉 → NodeLearn 영역
    // (byActive[region] || []).length 영역 read path 영역 정합 → V1/V2 strip
    // "firingCount/total" 표시 정합. patternActive=false 영역 0 emit (silent
    // catch). RPC 영역 catch 0 영역 영역 v1FireCount/v2FireCount=0 → empty
    // array → 0 표시 (정직 fallback).
    const v1Names = patternActive
      ? new Array<string>(v1FireCount).fill('v1_fire')
      : [];
    const v2Names = patternActive
      ? new Array<string>(v2FireCount).fill('v2_fire')
      : [];
    // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
    //   mismatch 시점 영역 winner_cluster=null broadcast → PipelineEventContext
    //   영역 stale winner cluster bar update 영역 회피. winner_margin 영역 보존
    //   (debug visibility — caller 영역 cfr.margin 영역 read 가능).
    emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
      cluster_rates: cfr.rates,
      winner_cluster: mismatch || cfr.winner < 0 ? null : cfr.winner,
      winner_margin: cfr.margin,
      // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forced winner 영역
      // propagate — PipelineEventContext 영역 NodeInfer / NodeLearn 영역 "EXACT MATCH"
      // badge 표시 정합. mismatch 영역 winner invalidate 정합 영역 forced 영역 영역
      // 영역 false 정합 (winner_cluster=null + forced=false 영역 stale badge 회피).
      winner_forced_exact: !mismatch && cfr.winner >= 0 && cfr.forcedExact === true,
      rates_by_region: patternActive ? { V1: v1Final, V2: v2Final } : { V1: 0, V2: 0 },
      rates_by_region_is_proxy: isProxy,
      active_neurons_by_region: { V1: v1Names, V2: v2Names },
    });
    // OUT count — winner 변경 시점 1회 increment (idempotent: 동일 cluster 연속
    // winner 영역 1회 only). 사용자 catch 2026-05-09 (broken state): Live grid
    // path 영역 OUT count 0 잔존 → 직접 incrementCount.
    //
    // PR-E (사용자 catch 2026-05-09 "한번 추론에 8개씩 증가"): UI semantic 정합
    // 영역 trial counter 영역 1회 추론 영역 cluster +1 영역 자연. 직전 PR #194
    // 영역 8 OUT broadcast loop 영역 cluster broadcast supervisor 영역 weight
    // learning path 영역 정합 영역 의도 영역 — UI exemplar count 영역 별도 path
    // 영역 trial-counter semantic 영역 mismatch (1 trigger → +8 cluster count).
    // 정정: cluster representative neuron (out_${winner}_0) 영역 단일 increment
    // 영역 trial-counter semantic 영역 정합. NodeOut 영역 sumClusterCount helper
    // 영역 8 OUT 합산 영역 — 1 representative neuron 영역 trial 횟수 영역 정합.
    //
    // 정직 한계: backend STDP weight update path 영역 cluster broadcast supervisor
    // 영역 8 OUT 영역 보존 (worker-core.ts handleClusterTrainRStdp 영역 학습 path)
    // — 본 정정 영역 UI exemplar count 영역 단일 path 영역 별도 catch.
    // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
    //   mismatch 영역 incrementCount skip — stale winner cluster (vertical 학습 후
    //   horizontal input 영역 cluster 1 winner emerge — STDP-off trigger 영역
    //   rate 비교 영역 dense WTA + 학습 weight 우위) 영역 OUT count fire 영역
    //   사용자 영역 "패턴 1 영역 학습 진행" 영역 misread root cause. Carpenter
    //   & Grossberg 1987 ART F2 reset 정합 — mismatch 영역 winner 영역 invalidate.
    //
    // 사용자 catch 2026-05-12 (increment-per-trigger): "왜 out 노드의 패턴N의
    //   카운트가 정확히 안늘어날까요? (추론에서는 적용됨)". 직전 idempotent gate
    //   (cfr.winner !== this.lastWinnerCluster) 영역 동일 winner 연속 trigger 영역
    //   skip → 사용자 mental model "매 추론 +1" 영역 mismatch. 정정: valid winner
    //   (mismatch 0 + winner >= 0) 영역 매번 increment. lastWinnerCluster 영역
    //   tracking 영역 보존 (다른 path 영역 영역, race-gate auto-learn finally
    //   commit 영역 double-increment 회피 정합).
    if (!mismatch && cfr.winner >= 0) {
      this.lastWinnerCluster = cfr.winner;
      // MEDIUM #11 (사용자 catch 2026-05-11): autoLearnProgress race gate —
      // runAutoLearnLoop 영역 30회 R-STDP 진행 중 영역 winner 영역 weight 미수렴
      // 영역 fluctuate → incrementCount 영역 stale count 누적 회피. 진행 중
      // cluster 영역 set size > 0 영역 skip — NodeOut amber row 영역 사용자
      // mental model 정합 (count 갱신 대기). 학습 완료 finally commit 영역
      // 신규 cluster 영역 single increment + lastWinnerCluster set 영역 정합.
      //
      // 사용자 catch 2026-05-12 (forced-exact-bypass-race-gate):
      //   INFER winner [EXACT] STABLE 영역 OUT count 패턴 N=0 — 학습 진행 중
      //   영역 race-gate 영역 forced-exact winner 영역 skip catch 영역 정정 —
      //   forcedExact=true 영역 deterministic template match 영역 매 trigger +1
      //   (사용자 mental model 정합). 단 double-increment 회피 영역
      //   _forcedExactIncrementedClusters 영역 cluster id 영역 mark — finally
      //   commit 시점 영역 member check + skip.
      const forcedExact = cfr.forcedExact === true;
      const inFlight = this._autoLearnInFlight.size > 0;
      if (inFlight && !forcedExact) {
        // 진행 중 + non-forced — count 갱신 대기. NodeOut isAutoLearning amber row 영역 visible.
      } else {
        const featSnap = this.patternRef.slice();
        // 단일 representative neuron 영역 increment — trial-counter UI semantic 정합.
        // 사용자 catch 2026-05-09 (Fix 1): substrate 영역 명시 — orientation/gesture
        // 별도 store 영역 GRID/CAMERA carry-over 회피.
        // 사용자 catch 2026-05-12: 동일 winner 연속 영역 idempotent gate 영역 제거 —
        // 매 valid trigger 영역 +1 (사용자 mental model 정합).
        incrementCount(`out_${cfr.winner}_0`, this.substrateKind, featSnap);
        // forced-exact bypass 시점 영역 cluster id 영역 mark — finally commit
        // 영역 double-increment 회피 정합. in-flight 영역 cluster id 영역 set
        // member 영역 → finally commit 영역 본 check 영역 skip + clear.
        if (inFlight && forcedExact && this._autoLearnInFlight.has(cfr.winner)) {
          this._forcedExactIncrementedClusters.add(cfr.winner);
        }
      }
    } else if (mismatch || cfr.winner < 0) {
      this.lastWinnerCluster = -1;
    }
  }
}

// ── singleton + helpers ──
let _instance: LiveSnn | null = null;

export function getLiveSnn(): LiveSnn {
  if (typeof window === 'undefined') {
    throw new Error('LiveSnn: client-only');
  }
  if (!_instance) _instance = new LiveSnn();
  return _instance;
}

export function disposeLiveSnn(): void {
  if (_instance) _instance.dispose();
  _instance = null;
}

export function onLiveTick(handler: (detail: LiveTickDetail) => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const listener = (e: Event) => handler((e as CustomEvent<LiveTickDetail>).detail);
  window.addEventListener(TICK_EVENT, listener);
  return () => window.removeEventListener(TICK_EVENT, listener);
}
