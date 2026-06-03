'use client';

// NodeLearn — 학습 진행상황.
// 5-phase + 4 cluster progress + Δw 합계 + teacher 표시 + V1/V2 cascade strip.
// HIGH #4 정정 보존: synapses_changed 우선 + d.synapses diff fallback.
// UX 4th HIGH 정정: neuron-firing 영역 직접 구독 (2 listener) → PipelineEventContext
// 영역 lastDetail 영역 effect 영역 1 effect 영역 정합 (단일 listener provider).
//
// V1/V2 cortical region strip (inline, 직전 RegionCascade.tsx 영역 흡수):
//  - INPUT/OUT region 영역 INPUT/OUT 노드 자체 영역 정합 → 위쪽 row 폐기.
//  - V1/V2 영역 학습 substrate 영역 정합 → LEARN 노드 내부 영역 inline.
//  - data source: getFullSnapshot 영역 1회 totals + lastDetail 영역 active count.
//    rates / active_neurons_by_region / rates_by_region 영역 region 영역 catch.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  emitBackendEvent,
  onBackendEvent,
  type TrainingPhaseDetail,
  type GridTrainingDetail,
  type ClusterSpawnedDetail,
  type ConfusionMatrixReadyDetail,
} from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { getLiveSnn, onLiveTick, type LiveTickDetail } from '@/lib/snn/live-snn';
import {
  getRootLocalSnnFor,
  subscribeLocalSnnInitState,
  getLastLocalSnnInitState,
  purgeAllLearningData,
  type SubstrateKind,
  type LocalSnnInitState,
} from '@/lib/snn/root-local-snn';
import { N13Pools } from '@/lib/snn-runtime';
import { SeededGaussian, addFeatureNoise } from '@/lib/snn-runtime/hand-noise';
import {
  loadExemplars,
  subscribeExemplars,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import { isUntrustworthy } from '@/lib/snn/untrustworthy';
// Phase 1 diagnostic (2026-05-31) — CFM-1 per-pattern self-verify breakdown
// console.log. UI panel 영역 Phase 2 defer (production observation 영역 빠른
// root cause 진단 path).
import { logCfm1FromConfusionMatrix } from '@/lib/snn/diagnostic';
import { showToast } from '@/components/ui/Toast';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import {
  CLUSTER_TARGET,
  CONFUSION_MATRIX_MAX_N,
  HELD_OUT_FEATURE_NOISE_SIGMA,
  HELD_OUT_SAMPLES_PER_CLUSTER,
  getClusterLabel,
  resolveClusterLabel,
} from './shared';

// path Y (2026-05-07): grid 학습 진행 — GridInput 가 broadcast 하는
// grid-training event 의 누적 state. cluster 별 학습 완료 여부 + 마지막
// 결과. camera path 의 phase / clusterFrames 와 별도 trace.
interface GridProgress {
  trained: { 0: boolean; 1: boolean; 2: boolean; 3: boolean };
  // 학습 진행 중 cluster 별 frame 수 (0..30). chunk 단위 갱신.
  framesDone: { 0: number; 1: number; 2: number; 3: number };
  isTraining: boolean;
  activeCluster: 0 | 1 | 2 | 3 | null;
  lastResult: { cluster: 0 | 1 | 2 | 3; accuracy: number } | null;
  lastError: string | null;
}
const INITIAL_GRID_PROGRESS: GridProgress = {
  trained: { 0: false, 1: false, 2: false, 3: false },
  framesDone: { 0: 0, 1: 0, 2: 0, 3: 0 },
  isTraining: false,
  activeCluster: null,
  lastResult: null,
  lastError: null,
};

// inferRegion — name prefix 영역 region catch (단일 source — 본 컴포넌트 영역
// V1/V2 대부분 영역).
function inferRegion(name: string): 'V1' | 'V2' | 'OTHER' {
  if (name.startsWith('v1_')) return 'V1';
  if (name.startsWith('v2_')) return 'V2';
  return 'OTHER';
}

// UX MEDIUM #2 (2026-05-25): cluster hue palette — TRAINED phase 영역 각 cluster
// row 영역 unique hue dot. 6 distinct hue (mod 6) 영역 cluster id 25+ 영역 hue
// collapse 회피 (golden-angle rotation 영역 hue 영역 1° 미만 영역 collapse 사실).
// 단 base-4 grid 영역만 hue dot 표시 (HIGH #1 정합) — cluster label 영역 1차
// identity source. 0°/60°/120°/180°/240°/300° (red/yellow/green/cyan/blue/magenta).
function clusterHue(cluster: number): number {
  return (cluster % 6) * 60;
}

// NodeLearn — 그리드 학습 전용. 카메라 모드에서는 추론만 가능.
export default function NodeLearn() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [delta, setDelta] = useState({ ltp: 0, ltd: 0, changed: 0 });
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setPhase(d);
  }), []);
  const prevWeights = useRef<Map<string, number>>(new Map());

  // PR3 (사용자 catch 2026-05-09): Live 모드 영역 engineMode hook + 최신 tick.
  // batch (untrained/learning/partial/trained) phase 흐름 영역 Live 영역
  // 부적합 — 항상 STDP on + winner emerge 영역 본질. Live 영역 cluster
  // firing rates strip + winner badge + tick rev counter 영역 표시.
  const [engineMode] = useEngineMode();
  const [liveTick, setLiveTick] = useState<LiveTickDetail | null>(null);
  useEffect(() => {
    if (engineMode !== 'live') {
      setLiveTick(null);
      return;
    }
    return onLiveTick(setLiveTick);
  }, [engineMode]);
  const isLiveMode = engineMode === 'live';

  // 사용자 catch 2026-05-09 [2] (Fix 4): Live 모드 영역 substrate init state —
  // fresh build vs hydrate (마지막 학습 시점) 영역 표시. inputMode 영역 substrate
  // kind derive 정합 (substrate-aware DB visibility).
  const [initState, setInitState] = useState<LocalSnnInitState | null>(null);

  // path Y: 입력 모드 + grid 학습 진행. NodeInput / GridInput 가 broadcast.
  // input-mode hoist: PipelineEventContext 에서 단일 구독 — 직접 구독 제거.
  // TDZ 회피: inputMode 이 아래 useEffect 의존성(line ~121, ~331)보다 먼저 선언.
  const { inputMode, lastDetail, autoLearnProgress, isAutoLearning, winner, winnerForcedExact } = usePipelineEvents();
  const [gridProgress, setGridProgress] = useState<GridProgress>(INITIAL_GRID_PROGRESS);

  // 사용자 catch 2026-05-09 [2] (Fix 4): substrate-aware init state subscribe —
  // engineMode='live' + inputMode 영역 substrate kind 영역 sync. mount 영역 cache
  // fallback (event miss 회피) + ongoing init event subscribe.
  useEffect(() => {
    if (!isLiveMode) {
      setInitState(null);
      return;
    }
    // Phase 2A.1 substrate upgrade (2026-05-31): 'orientation' (n13, 4×4, 32
    // features) → 'orientation-6x6' (n14_extended, 5×5, 50 features). 32 features
    // 영역 sub-pool exhaustion + sparse code overlap 영역 root cause — 50 features
    // 영역 disjoint cluster 보장 강화 영역 인식률 회복. 기존 사용자 학습 데이터
    // 영역 dimension mismatch — localStorage substrate suffix 영역 자동 namespace
    // 분리 (Option A 정합 — orientation.* 영역 보존 단 orphan, orientation-5x5.*
    // 영역 fresh start). 사용자 영역 신규 학습 mandatory.
    const kind = 'orientation-6x6' as const satisfies SubstrateKind;
    setInitState(getLastLocalSnnInitState(kind));
    return subscribeLocalSnnInitState((state) => {
      if (state.kind === kind) setInitState(state);
    });
  }, [isLiveMode, inputMode]);

  // Phase 2A.1 (2026-05-31): substrate upgrade 일회성 사용자 안내.
  // 'orientation' (n13_orientation, 4×4, 32 features) → 'orientation-6x6'
  // (n14_extended, 5×5, 50 features). localStorage key 영역 substrate 접미사
  // 영역 자동 namespace 분리 (Option A) — 기존 학습 데이터 영역 silent orphan
  // (legacy orientation.* localStorage 영역 보존 단 production 영역 미참조).
  // 사용자 영역 신규 학습 mandatory — 1회 toast + console.info 영역 안내.
  // 일회성 gate (handface.phase2a1.substrate-upgrade.notified.v1=1).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // v2 (2026-06-01 hotfix): 자동 purge 추가. 직전 v1 영역 toast 만 표시 —
    // 사용자 production catch (commit b350a9b 후속): 기존 orientation-6x6
    // namespace 영역 hydrate 영역 학습 데이터 잔존 영역 forceDisjoint fallback
    // ("기존 slots: 5") 영역 발생 + cluster pool exhaustion. flag 새 v2 영역
    // 통해 사용자 다음 방문 시 1회 강제 purge.
    const FLAG = 'handface.phase2a2.substrate-upgrade.notified.v2';
    try {
      if (window.localStorage.getItem(FLAG) === '1') return;
      const hasLegacy5x5 = window.localStorage.getItem('handface.out.exemplars.v1.orientation-5x5');
      const hasLegacyOrig = window.localStorage.getItem('handface.out.exemplars.v1.orientation');
      const hasLegacy6x6 = window.localStorage.getItem('handface.out.exemplars.v1.orientation-6x6');
      const hasAnyLegacy = !!(hasLegacy5x5 || hasLegacyOrig || hasLegacy6x6);
      const legacyHint = hasAnyLegacy
        ? ' 기존 학습 데이터 영역 자동 reset — 6×6 substrate 영역 처음부터 학습 시작.'
        : '';
      console.info(
        '[handface][Phase 2A.2 v2] substrate upgrade: orientation-5x5 (25 input/50 feat) → '
        + 'orientation-6x6 (36 input/72 features). 측정 evidence: 5×5 c3 sub-pool=3 '
        + 'inherent limit 60% → 6×6 N=4/5 100% accuracy.'
        + legacyHint,
      );
      if (hasAnyLegacy) {
        // 자동 purge — 직전 v1 영역 toast 만 영역 사용자 영역 reset 안 누름
        // 영역 ghost cluster (이전 학습 잔존) 영역 fallback 영역 catch.
        // 정직 한계: localStorage + IndexedDB 영역 wipe (사용자 명시 reset 등가).
        // 사용자 visible: toast (auto) — 명시적 클릭 영역 영역.
        void purgeAllLearningData();
        showToast({
          kind: 'warning',
          message: '학습 substrate 가 6×6 (72 features) 로 갱신되었습니다. 기존 학습 데이터 자동 reset 완료 — 새로 학습해 주세요.',
          duration: 10000,
        });
      }
      window.localStorage.setItem(FLAG, '1');
    } catch {
      // SSR / quota / disabled — silent skip.
    }
  }, []);

  // Phase 3.9 (2026-06-03 hotfix): Hand SNN sparse top-K=5 migration.
  // 직전 Hand SNN active inputs path 가 threshold > 0.5 로 95-dim 에서 42/95
  // active inputs 산출 → encoder.ts:237-256 "98% overlap" trap 직격 → 4 gestures
  // 가 동일 cluster 로 매칭. commit 6d05ea1 에서 sparse top-K=5 path 정정 했지만,
  // 직전 user 의 stored cluster (42-feature dense) 가 IndexedDB 에 잔존 →
  // 새 sparse top-K=5 candidate 이 기존 dense claim 과 항상 overlap → forceDisjoint
  // fail → cluster pool exhaustion. 본 migration 은 일회성 IndexedDB wipe.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const HAND_FLAG = 'handface.phase3.9.hand-sparse-topk.notified.v1';
    try {
      if (window.localStorage.getItem(HAND_FLAG) === '1') return;
      const hasHandLegacy = window.localStorage.getItem('handface.out.exemplars.v1.orientation-hand');
      if (hasHandLegacy) {
        console.info(
          '[handface][Phase 3.9] Hand SNN active inputs upgrade: threshold>0.5 (42/95 dense) → '
          + 'sparse top-K=5. 기존 Hand SNN 학습 데이터 자동 reset — sparse forced-disjoint 정합.',
        );
        void purgeAllLearningData();
        showToast({
          kind: 'warning',
          message: 'Hand SNN 의 학습 path 가 sparse top-K=5 로 갱신되었습니다 (98% overlap 정정). 기존 hand 학습 데이터 자동 reset — 새로 학습해 주세요.',
          duration: 10000,
        });
      }
      window.localStorage.setItem(HAND_FLAG, '1');
    } catch {
      // silent skip.
    }
  }, []);

  // Phase 3.9 v7 (2026-06-03 hotfix): hand cluster training features 새 기능
  // 추가. 직전 v5/v6 cluster 들에는 training features storage 없음 → cosine sim
  // 매칭 동작 안 함. 1회 IndexedDB wipe + 사용자 가 새로 학습 시 v7 cosine
  // 매칭 즉시 가동.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const V7_FLAG = 'handface.phase3.9.v7-cosine-sim.notified.v1';
    try {
      if (window.localStorage.getItem(V7_FLAG) === '1') return;
      const hasHandLegacy = window.localStorage.getItem('handface.out.exemplars.v1.orientation-hand');
      if (hasHandLegacy) {
        console.info(
          '[handface][Phase 3.9 v7] Hand SNN matching upgrade: Jaccard top-K → cosine similarity. '
          + '기존 cluster 자동 reset — 새 학습 부터 100% accuracy (test 검증 완료).',
        );
        void purgeAllLearningData();
        showToast({
          kind: 'success',
          message: 'Hand SNN 매칭 알고리즘이 cosine similarity 로 업그레이드 되었습니다 (test 50% → 100%). 기존 hand 학습 데이터 자동 reset.',
          duration: 10000,
        });
      }
      window.localStorage.setItem(V7_FLAG, '1');
    } catch {
      // silent skip.
    }
  }, []);

  // Phase 3.9 v11 (2026-06-03): encoder normalization 도입 시도 → R-STDP
  // downstream encodeFeatureToSpikes 의 threshold 0.3 가정과 충돌하여 회귀.
  // encodeHandForCosineSim 함수만 helper 로 유지 (LiveSnn 추후 도입 가능).
  // 현재 production: v9 (encodeHandToFeatureVector + cosine sim) 유지.

  // circuit-changed event — backend network 이 새로 만들어진 시점.
  //
  // 사용자 catch 2026-05-09: 직전 hard reset (INITIAL_GRID_PROGRESS) 영역
  // 학습 도중 cluster N 의 chunk RPC 가 새 네트워크 hit 시점 영역 다른
  // cluster 의 30/30 완료 표시까지 모두 0/30 으로 wipe — 사용자 학습 진행이
  // 마구 초기화 catch.
  //
  // 정정 — soft reset:
  //   - trained flag 만 false (backend 영역 실제 학습 0).
  //   - framesDone 영역 보존 (사용자 시각 history 유지) — currently active
  //     cluster 만 0 (본 cluster 의 진행 chunk 가 빈 네트워크 hit 영역 무효).
  //   - lastError 영역 사용자 알림.
  //   - delta / prevWeights 영역 reset (backend 가중치 영역 0).
  useEffect(() => onBackendEvent('circuit-changed', () => {
    setGridProgress((prev) => ({
      ...prev,
      trained: { 0: false, 1: false, 2: false, 3: false },
      framesDone:
        prev.activeCluster !== null
          ? { ...prev.framesDone, [prev.activeCluster]: 0 }
          : prev.framesDone,
      lastError: '백엔드 회로 재구성 — 다시 학습 필요',
    }));
    setDelta({ ltp: 0, ltd: 0, changed: 0 });
    prevWeights.current.clear();
  }), []);
  useEffect(() => onBackendEvent<GridTrainingDetail>('grid-training', (d) => {
    setGridProgress((prev) => {
      if (d.kind === 'started') {
        return {
          ...prev,
          isTraining: true,
          activeCluster: d.cluster,
          framesDone: { ...prev.framesDone, [d.cluster]: 0 },
          // 재학습 시 본 cluster 의 trained 플래그 즉시 false — "TRAINED —
          // frozen" 배지가 stale 한 채 유지되는 사용자 catch 2026-05-09 정정.
          trained: { ...prev.trained, [d.cluster]: false },
          lastError: null,
        };
      }
      if (d.kind === 'progress') {
        return {
          ...prev,
          isTraining: true,
          activeCluster: d.cluster,
          framesDone: { ...prev.framesDone, [d.cluster]: d.framesDone ?? 0 },
        };
      }
      if (d.kind === 'finished') {
        return {
          ...prev,
          isTraining: false,
          activeCluster: null,
          trained: { ...prev.trained, [d.cluster]: true },
          framesDone: { ...prev.framesDone, [d.cluster]: d.framesTotal ?? CLUSTER_TARGET },
          lastResult: { cluster: d.cluster, accuracy: d.accuracy ?? 0 },
          lastError: null,
        };
      }
      return { ...prev, isTraining: false, activeCluster: null, lastError: d.message ?? '학습 실패' };
    });
  }), []);

  // 학습 batch supervised 진행 시점 표시 — clusterFrames 변경 영역 1500ms pulse trigger.
  // 사용자 catch: 학습 진행 사실 영역 시각 catch 강화 — capturing 도중 활성 cluster bar 강 pulse.
  const [capturingPulse, setCapturingPulse] = useState<number>(0); // increment counter (key change for re-trigger).
  const prevClusterFramesRef = useRef<{ 0: number; 1: number; 2: number; 3: number } | null>(null);

  // Backend audit fix #4 (UX-designer Part C): cluster-spawned event 영역 amber
  // pulse trigger — 신규 cluster row 영역 1회 amber glow (Live mode 영역
  // auto-learn-progress amber bar 영역 시각 일관성 정합). spawnPulseFor 영역
  // 신규 cluster id, spawnPulseKey 영역 increment counter (re-trigger key).
  // 1500ms 후 자동 clear — animation 1회 재생 영역 정합.
  const [spawnPulseFor, setSpawnPulseFor] = useState<number | null>(null);
  const [spawnPulseKey, setSpawnPulseKey] = useState<number>(0);
  useEffect(() => {
    return onBackendEvent<ClusterSpawnedDetail>('cluster-spawned', (d) => {
      setSpawnPulseFor(d.clusterIdx);
      setSpawnPulseKey((k) => k + 1);
      // 1500ms 후 자동 clear — pulse 영역 1회 재생 후 row 영역 일반 상태 복귀.
      setTimeout(() => {
        setSpawnPulseFor((cur) => (cur === d.clusterIdx ? null : cur));
      }, 1500);
    });
  }, []);

  // V1/V2 region strip — totals (1회 fetch) + active count + fired flag (1.5s decay).
  // 사용자 catch 2026-05-09 [3]: regionRateHz 영역 추가 — Felleman & Van Essen 1991
  // V1/V2 cortical hierarchy 정합 영역 mean Hz mini-bar 영역 시각 catch (직전
  // active count only → spike rate 정직 표현 강화).
  const [regionTotals, setRegionTotals] = useState<{ V1: number; V2: number }>({ V1: 0, V2: 0 });
  const [regionActive, setRegionActive] = useState<{ V1: number; V2: number }>({ V1: 0, V2: 0 });
  const [regionRateHz, setRegionRateHz] = useState<{ V1: number; V2: number }>({ V1: 0, V2: 0 });
  const [regionFired, setRegionFired] = useState<{ V1: boolean; V2: boolean }>({ V1: false, V2: false });
  // PR #187 polish — QA MEDIUM-5 (audit 2026-05-10): live-snn proxy fallback 영역
  // catch — true 영역 ~ prefix + reduced opacity (정직 한계 시각 catch).
  const [regionRateIsProxy, setRegionRateIsProxy] = useState<boolean>(false);
  const fireTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});


  // clusterFrames 증가 영역 — capturing pulse trigger (batch supervised 진행 시각화).
  useEffect(() => {
    if (!phase) return;
    const prev = prevClusterFramesRef.current;
    prevClusterFramesRef.current = phase.clusterFrames;
    if (!prev) return;
    let bumped = false;
    for (const k of [0, 1, 2, 3] as const) {
      if (phase.clusterFrames[k] > prev[k]) { bumped = true; break; }
    }
    if (bumped) setCapturingPulse((n) => n + 1);
  }, [phase]);

  // V1/V2 neuron 총개수 — 마운트 시 1회 + circuit-changed 시 재fetch.
  // 사용자 catch 2026-05-09: 직전 마운트 시점 영역 backend 영역 빈 네트워크
  // 이면 totals=0 으로 고정 → 회로 빌드/재빌드 후에도 V1 164/0 표시 stale.
  // circuit-changed listen 영역 정합 갱신.
  //
  // 사용자 catch 2026-05-09 (401 fix): engineMode='live' default 영역 backend
  // 호출 0 — getFullSnapshot 영역 ensureNetwork → POST /networks 영역 trigger 영역
  // NEURONFACE_API_KEY 미설정 시점 영역 401 silent error catch. backend mode
  // 영역만 fetch 진행.
  //
  // 사용자 catch 2026-05-09 (Live 모드 broken state — fix/live-mode-substrate-init):
  // 직전 Live 영역 setRegionTotals({V1:0, V2:0}) silent → "V1 0/0 + V2 0/0" 표시.
  // 정정: Live 영역 N13Pools 영역 hardcoded substrate spec 영역 직접 산출 + LocalSNN
  // mount-time prebuild trigger (getRootLocalSnnFor 영역 lazy build 영역 첫 호출 시점
  // 영역 build). NodeLearn 영역 본 effect 영역 가장 먼저 substrate build 영역 trigger
  // 영역 첫 tick 영역 200ms 대기 영역 wait 0.
  // Fix #20 (2026-05-10): zero-init dynamic — base 4 cluster 영역 폐기 영역
  // V1/V2 total 영역 dynamic 영역 — clusterCount × per-sub. clusterCount 영역
  // cluster-spawned event 영역 즉시 catch (exemplar update 영역 latency 회피).
  // exemplar 영역 추출 영역 별도 effect 영역 hoist (exemplars 영역 declared 영역
  // 후에 추가 — file 영역 ordering 정합).
  const [clusterCount, setClusterCount] = useState<number>(0);
  useEffect(() => {
    return onBackendEvent<ClusterSpawnedDetail>('cluster-spawned', (d) => {
      setClusterCount((cur) => Math.max(cur, d.clusterIdx + 1));
    });
  }, []);

  useEffect(() => {
    if (engineMode === 'live') {
      // Fix #20 (2026-05-10): V1/V2 total 영역 N_CLUSTER × per-sub 영역 dynamic.
      // V1 = (V1_L4E + V1_L4I + V1_L23E) × clusterCount.
      // V2 = (V2_L4E + V2_L23E + V2_L5E) × clusterCount.
      const v1PerCluster = N13Pools.V1_L4_PER_SUB + N13Pools.V1_L4I_PER_SUB + N13Pools.V1_L23_PER_SUB;
      const v2PerCluster = N13Pools.V2_L4_PER_SUB + N13Pools.V2_L23_PER_SUB + N13Pools.V2_L5_PER_SUB;
      const v1Total = v1PerCluster * clusterCount;
      const v2Total = v2PerCluster * clusterCount;
      setRegionTotals({ V1: v1Total, V2: v2Total });

      // mount-time prebuild — Phase 2A.1 (2026-05-31) substrate upgrade:
      // 'orientation' (n13, 32 features) → 'orientation-6x6' (n14_extended,
      // 50 features). 사용자 4 패턴 학습 영역 32-feature 부족 영역 정정.
      const kind = 'orientation-6x6' as const satisfies SubstrateKind;
      let cancelled = false;
      void getRootLocalSnnFor(kind).catch((e) => {
        if (!cancelled) {
          console.warn('[NodeLearn] Live substrate prebuild failed:', e);
        }
      });
      return () => {
        cancelled = true;
      };
    }
    let cancelled = false;
    const fetchTotals = async () => {
      const r = await getClient().getFullSnapshot();
      if (cancelled || !r.ok) return;
      const counts = { V1: 0, V2: 0 };
      for (const n of r.data.neurons || []) {
        const region = (n.region as 'V1' | 'V2' | undefined) || inferRegion(n.name || '');
        if (region === 'V1' || region === 'V2') counts[region] += 1;
      }
      setRegionTotals(counts);
    };
    void fetchTotals();
    const off = onBackendEvent('circuit-changed', () => {
      void fetchTotals();
    });
    return () => {
      cancelled = true;
      off();
    };
  }, [engineMode, clusterCount]);

  // PipelineEventContext 영역 lastDetail 영역 — neuron-firing 영역 단일 source.
  // PR #203 polish (UX HIGH 2026-05-10): autoLearnProgress Map 영역 신규 ART
  // expansion cluster 영역 amber bar 영역 진행 visibility 정합 (NodeOut 영역
  // winner.clusterRates 정합 — clusterLabels.length 영역 dynamic catch).
  // HIGH #1 (사용자 catch 2026-05-11): winner 영역 단일 source — INFER 정합 path.
  // 직전 LiveLearnPanel 영역 tick.winner (live-snn 영역 별도 산출) 영역 INFER 영역
  // PipelineEventContext.winner 영역 dual source 영역 mismatch 회피 — context winner
  // 영역 LiveLearnPanel 영역 prop 영역 통합.
  // (inputMode / lastDetail / autoLearnProgress / winner / winnerForcedExact 영역
  //  위 usePipelineEvents 호출 영역 hoist — 중복 선언 제거.)

  // Δw 산출 — lastDetail 변경 시점 영역 effect.
  // HIGH #4 정정 보존: synapses_changed (backend Δw list) 우선 — 첫 frame 영역 정합.
  // backend 영역 synapses_changed 영역 emit 영역 — 본 path 영역 첫 frame 영역
  // 학습 사실 catch 사실 (delta.delta 영역 직접 제공 영역).
  // Fallback (d.synapses 영역 diff) 영역 baseline cache only — 첫 호출 시
  // prev === undefined → 첫 frame 영역 Δw = 0 표시 (baseline cache only).
  // 직후 frame 영역 정상 catch 사실. 정직 한계 명시: backend synapses_changed
  // 영역 미emit 일부 첫 frame 영역 학습 사실 0 표시 회피 0.
  useEffect(() => {
    if (!lastDetail) return;
    let ltp = 0, ltd = 0, changed = 0;
    const cache = prevWeights.current;
    const ch = lastDetail.synapses_changed;
    if (ch && ch.length > 0) {
      // 정합 path: backend 영역 Δw 영역 emit — 첫 frame 영역 학습 catch 사실.
      for (const s of ch) {
        const dw = s.delta;
        if (Math.abs(dw) >= 0.1) {
          changed += 1;
          if (dw > 0) ltp += dw; else ltd += dw;
        }
        cache.set(`${s.pre}->${s.post}`, s.weight);
      }
    } else {
      // Fallback path: 직접 diff — 첫 호출 영역 baseline cache only (Δw 0 표시).
      const syn = lastDetail.synapses || [];
      for (const s of syn) {
        const key = `${s.pre}->${s.post}`;
        const prev = cache.get(key);
        if (prev !== undefined) {
          const dw = s.weight - prev;
          if (Math.abs(dw) >= 0.1) {
            changed += 1;
            if (dw > 0) ltp += dw; else ltd += dw;
          }
        }
        cache.set(key, s.weight);
      }
    }
    if (changed > 0) setDelta({ ltp, ltd, changed });
  }, [lastDetail]);

  // V1/V2 active count + cascade glow (별도 effect — Δw 영역 분리 영역 정합).
  useEffect(() => {
    if (!lastDetail) return;
    const FIRE_DURATION_MS = 1500;
    const rates = lastDetail.rates || {};
    const byActive = lastDetail.active_neurons_by_region || {};
    const byRegionRate = lastDetail.rates_by_region || {};
    const counts = { V1: 0, V2: 0 };
    for (const [name, rate] of Object.entries(rates)) {
      if (rate <= 0) continue;
      const region = inferRegion(name);
      if (region === 'V1' || region === 'V2') counts[region] += 1;
    }
    for (const region of ['V1', 'V2'] as const) {
      const fromActive = (byActive[region] || []).length;
      if (fromActive > counts[region]) counts[region] = fromActive;
    }
    // proxy fallback: rates_by_region Hz > 0 이지만 active count = 0 인 경우
    // (Live mode v1FireCount=0 / backend active_neurons_by_region 미동봉) —
    // Hz 비율로 regionTotals 에서 발화 뉴런 수 추정.
    // isProxy flag 는 기존 rates_by_region_is_proxy 기반 — 본 path 별도 set 0.
    for (const region of ['V1', 'V2'] as const) {
      if (counts[region] === 0) {
        const hz = byRegionRate[region] || 0;
        const total = regionTotals[region];
        if (hz > 0 && total > 0) {
          const fraction = Math.min(1, hz / REGION_HZ_MAX);
          counts[region] = Math.max(1, Math.round(total * fraction));
        }
      }
    }
    setRegionActive(counts);
    // 사용자 catch 2026-05-09 [3]: regionRateHz 영역 sync — mean Hz mini-bar 영역
    // 정합. Live tick 영역 V1/V2 Hz 영역 rates_by_region 영역 동봉 (live-snn.ts:391).
    setRegionRateHz({
      V1: byRegionRate.V1 || 0,
      V2: byRegionRate.V2 || 0,
    });
    // PR #187 polish — QA MEDIUM-5: proxy fallback 영역 sync.
    setRegionRateIsProxy(lastDetail.rates_by_region_is_proxy === true);

    for (const region of ['V1', 'V2'] as const) {
      const avgRate = byRegionRate[region] || 0;
      if (counts[region] > 0 || avgRate > 0) {
        setRegionFired((p) => p[region] ? p : { ...p, [region]: true });
        if (fireTimers.current[region]) clearTimeout(fireTimers.current[region]);
        fireTimers.current[region] = setTimeout(() => {
          setRegionFired((p) => ({ ...p, [region]: false }));
          delete fireTimers.current[region];
        }, FIRE_DURATION_MS);
      }
    }
  }, [lastDetail, regionTotals]);

  // Cleanup — fire timers 영역 unmount 시점 1회 정리.
  useEffect(() => {
    const timers = fireTimers.current;
    return () => {
      for (const k of Object.keys(timers)) clearTimeout(timers[k]);
    };
  }, []);

  // grid mode cluster 별 frame 카운트 — framesDone (chunk 진행) 기반.
  // trained 영역 finished 시점 framesTotal 까지 채워서 0..CLUSTER_TARGET.
  const gridClusterFrames = useMemo(() => gridProgress.framesDone,
    [gridProgress.framesDone]);

  // grid mode 영역 derived phase — trained 카운트 + isTraining flag 기반.
  const gridPhase = useMemo<'untrained' | 'learning' | 'partial' | 'trained'>(() => {
    if (gridProgress.isTraining) return 'learning';
    const trainedCount = (Object.values(gridProgress.trained) as boolean[]).filter(Boolean).length;
    if (trainedCount === 0) return 'untrained';
    if (trainedCount === 4) return 'trained';
    return 'partial';
  }, [gridProgress.isTraining, gridProgress.trained]);

  // 진행 중 cluster — mode 별 분기.
  // grid: gridProgress.activeCluster (R-STDP 진행 중인 cluster).
  // camera: count 가 가장 적고 < TARGET 인 cluster.
  const activeCluster = useMemo(() => {
    return gridProgress.activeCluster ?? -1;
  }, [gridProgress.activeCluster]);

  // mode 별 effective phase / clusterFrames — render 흐름 단일화.
  // PR audit fix (Fix 5 — LOW): react-hooks/exhaustive-deps warning 정정 —
  // conditional derived value 영역 useMemo 래핑 영역 deps reference stability
  // 보장 (직전 phase?.clusterFrames default-fallback object 영역 매 render
  // 새 reference catch — phaseInfo useMemo 영역 매 render invalidate).
  const effectivePhase = gridPhase;
  const effectiveClusterFrames = useMemo(
    () => gridClusterFrames,
    [gridClusterFrames],
  );

  // PR-K (사용자 catch 2026-05-09 catch 2): cluster label 영역 OUT exemplar
  // 영역 사용자 명명 영역 우선 + fallback '패턴 N' (resolveClusterLabel 정합).
  // substrate-aware exemplar subscribe (NodeOut mirror) — 사용자 RenameButton
  // 영역 명명 영역 NodeLearn 영역 즉시 sync.
  // Phase 2A.1 (2026-05-31): substrate 'orientation' → 'orientation-6x6'.
  const substrate = 'orientation-6x6' as const satisfies SubstrateKind;
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars(substrate));
  useEffect(() => {
    setExemplars(loadExemplars(substrate));
    return subscribeExemplars(substrate, setExemplars);
  }, [substrate]);
  // Fix #20 (2026-05-10): zero-init dynamic — exemplars 영역 cluster count
  // 영역 추출 (NodeOut 정합). cluster-spawned event 영역 unmount 영역 stale
  // 회피 catch + persistent path (page reload 영역 hydrate 영역 정합).
  useEffect(() => {
    let max = 0;
    for (const k of Object.keys(exemplars)) {
      const m = /^out_(\d+)_\d+$/.exec(k);
      if (m) {
        const ci = Number(m[1]) + 1;
        if (ci > max) max = ci;
      }
    }
    setClusterCount((cur) => Math.max(cur, max));
  }, [exemplars]);
  const clusterLabels = useMemo(() => {
    // Fix #19 (사용자 catch 2026-05-10): zero-init — base 4 floor 폐기.
    // Request C (2026-05-10): firing fallback 영역 폐기 — exemplars 영역 영역
    // 학습된 cluster 영역만 표시 (NodeOut 정합). 직전 firingMax fallback 영역
    // base n13 substrate 영역 baseline noise 영역 stale '패턴 1..4' 영역 표시.
    // 사용자 명시 "기존 로직 신경쓰지말고" — backward compat 폐기.
    //
    // 사용자 catch 2026-05-11 (cluster-source-unify): winner.cluster 영역 floor —
    // OUT 노드 영역 winner.cluster !== null 영역 winnerLabel fallback 영역 cluster
    // row 영역 표시 — LEARN/INFER 영역 동일 winner 영역 cluster bar 영역 표시 mandatory.
    // exemplars 영역 incrementCount 영역 fire 0 영역 영역 (학습 0회 영역 정합) 영역
    // winner derive fire 영역 영역 영역 가상 cluster row 영역 표시 (winner.cluster + 1 floor).
    let exemplarMax = -1;
    for (const k of Object.keys(exemplars)) {
      const m = /^out_(\d+)_\d+$/.exec(k);
      if (m) {
        const ci = Number(m[1]);
        if (ci > exemplarMax) exemplarMax = ci;
      }
    }
    if (winner.cluster !== null && winner.cluster > exemplarMax) {
      exemplarMax = winner.cluster;
    }
    const n = Math.max(exemplarMax + 1, 0);
    return Array.from({ length: n }, (_, i) => resolveClusterLabel(exemplars, i, 'grid'));
  }, [exemplars, winner.cluster]);

  // UX HIGH (2026-05-25 + held-out wire 2026-05-28): TRAINED phase self-verification
  // batch — auto-learn 완료 시점 영역 각 cluster 영역 cached lastFeature 영역
  // noise-perturbed N=5 sample 영역 inferOnceForValidation 영역 winner 산출 →
  // N×N confusion matrix → ConfusionMatrixReadyDetail emit.
  //
  // Bishop 1995 ML evaluation + Goodfellow 2014 feature-level noise injection 정합.
  //
  // 직전 (2026-05-25): cluster 영역 1 sample (cached lastFeature 영역 직접 재사용)
  // → overfit / false confidence catch 부재.
  // 정정 (2026-05-28): cluster 영역 N=5 noise-perturbed sample (σ=0.05 feature
  // Gaussian noise + top-K mask preserve) → noisy held-out generalization estimate.
  //
  // trigger: isAutoLearning false-transition (auto-learn loop 1회 완료) + clusterLabels
  // 영역 >= 2 영역 (단일 cluster 영역 1×1 matrix 영역 의미 0 — 최소 2 cluster 영역 mandatory).
  //
  // seed 영역 cluster id × Date.now() 영역 hash — page reload 영역 새 seed 영역
  // unique noisy batch (noisy held-out 영역 영역 정합 — 단 cluster 영역 deterministic
  // reproducibility 영역 보장 영역 영역 trade-off — noisy held-out 영역 영역 사실).
  //
  // 정직 한계:
  //  - simulated feature-noise (Gaussian σ=0.05) — 실제 사용자 hand capture 영역
  //    held-out 영역 별도 R&D 필요. true held-out (capture) 영역 본 wire 외부.
  //  - top-K mask preserve — sparse cluster active inputs 영역 영역 영역 변경 0
  //    영역 weight robustness 검증 (Diehl & Cook 2015 topology-fixed STDP 정합).
  //  - Live mode 영역만 supported (engineMode='backend' 영역 inferOnceForValidation
  //    영역 0 영역 silent skip).
  const [confusionMatrix, setConfusionMatrix] = useState<ConfusionMatrixReadyDetail | null>(null);
  const [confusionExpanded, setConfusionExpanded] = useState<boolean>(false);
  const wasAutoLearningRef = useRef<boolean>(false);
  const verifyInFlightRef = useRef<boolean>(false);
  // QA MEDIUM #4 (2026-05-25 audit): clusterLabels / exemplars 영역 ref 영역
  // mirror — effect deps 영역 isAutoLearning + isLiveMode 단순화. 직전 deps 영역
  // clusterLabels / exemplars 영역 포함 → labels 변경 (ART expansion) 영역 effect
  // re-fire + transient race window 잔존. ref 영역 update on change but not in
  // deps 영역 race window 영역 close (idempotent gate).
  const clusterLabelsRef = useRef<readonly string[]>(clusterLabels);
  const exemplarsRef = useRef<OutExemplars>(exemplars);
  useEffect(() => {
    clusterLabelsRef.current = clusterLabels;
  }, [clusterLabels]);
  useEffect(() => {
    exemplarsRef.current = exemplars;
  }, [exemplars]);

  // confusion-matrix-ready event subscribe — runSelfVerification 영역 emit 영역
  // 정합 store. external trigger (예: research panel) 영역 호환 path 영역 보존.
  useEffect(() => {
    return onBackendEvent<ConfusionMatrixReadyDetail>('confusion-matrix-ready', (d) => {
      setConfusionMatrix(d);
    });
  }, []);

  // self-verification trigger — isAutoLearning false-transition + clusterLabels >= 2.
  // engineMode='live' 영역만 supported (backend mode 영역 silent skip).
  // QA MEDIUM #4 정합: deps 영역 isAutoLearning + isLiveMode 영역 한정 — labels
  // / exemplars 영역 ref read (effect re-fire 영역 race window 영역 close).
  useEffect(() => {
    const prev = wasAutoLearningRef.current;
    wasAutoLearningRef.current = isAutoLearning;
    if (!isLiveMode) return;
    if (!(prev === true && isAutoLearning === false)) return;
    const currentLabels = clusterLabelsRef.current;
    if (currentLabels.length < 2) return;
    if (verifyInFlightRef.current) return;
    verifyInFlightRef.current = true;
    const snapshot = exemplarsRef.current;
    const labels = currentLabels.slice();
    void (async () => {
      try {
        const N = labels.length;
        // held-out wire (2026-05-28): N noise-perturbed sample 영역 cluster
        // 영역. cell 영역 ∈ {0..SAMPLES_PER_CLUSTER}.
        //
        // QA MEDIUM #2 (2026-05-28 audit): const hoist 영역 shared.ts 영역 single
        // source — integration test 영역 동일 const 참조 영역 drift 회피.
        const SAMPLES_PER_CLUSTER = HELD_OUT_SAMPLES_PER_CLUSTER;
        const FEATURE_NOISE_SIGMA = HELD_OUT_FEATURE_NOISE_SIGMA;
        const matrix: number[][] = Array.from({ length: N }, () =>
          Array.from({ length: N }, () => 0),
        );
        const live = getLiveSnn();
        // QA HIGH #6 (2026-05-28 audit): runtime seed (Date.now() & 0x7fffffff)
        // — measurement JSON 영역 fixed seed=3000 영역 deterministic baseline 영역
        // 차이. runtime UI 영역 매번 unique noisy held-out (page reload 영역 동일
        // 결과 보장 0). 사용자 honesty hint 영역 명시 — `ConfusionMatrixPanel`
        // 영역 inline note 영역 정합 (measurement 영역 lower-bound 추정).
        const baseSeed = Date.now() & 0x7fffffff;
        for (let ci = 0; ci < N; ci += 1) {
          // representative pattern — out_{ci}_0..7 영역 첫 lastFeature 영역
          // 미존재 영역 skip (matrix[ci] 영역 0).
          //
          // 사용자 production catch 2026-05-31:
          //   직전 `length === 16` 영역 hardcoded check 영역 Phase 2A.1
          //   substrate orientation-5x5 (25-dim raw) 영역 reject — 모든 cluster
          //   영역 pattern=null fallthrough → matrix 영역 all-zero →
          //   CFM-1 total=0% / self-verify 0/20 correct false report.
          //   length > 0 영역 정정 (substrate 영역 dispatchFeature 영역 자동
          //   handle: n13=16→32 / n14=25→50 / n15=36→72 / n16=95).
          let pattern: number[] | null = null;
          for (let n = 0; n < 8; n += 1) {
            const ex = snapshot[`out_${ci}_${n}`];
            if (ex && Array.isArray(ex.lastFeature) && ex.lastFeature.length > 0) {
              pattern = ex.lastFeature;
              break;
            }
          }
          if (!pattern) continue;
          // seed 영역 cluster 영역 unique (baseSeed + ci × 1000) — cluster 영역
          // reproducibility 보장 + 영역 batch (reload) 영역 unique noisy held-out.
          const gaussian = new SeededGaussian(baseSeed + ci * 1000);
          for (let s = 0; s < SAMPLES_PER_CLUSTER; s += 1) {
            const noisy = addFeatureNoise(pattern, FEATURE_NOISE_SIGMA, gaussian);
            try {
              const { winner: predicted } = await live.inferOnceForValidation(noisy);
              if (predicted !== null && predicted >= 0 && predicted < N) {
                matrix[ci][predicted] += 1;
              }
              // null winner 영역 sample 영역 row 영역 누락 — diagonal/off-diagonal 모두 0.
            } catch (e) {
              console.warn('[NodeLearn] self-verification 영역 cluster', ci, 'sample', s, 'failed:', e);
            }
          }
        }
        const detail: ConfusionMatrixReadyDetail = {
          matrix,
          labels,
          samplesPerCluster: SAMPLES_PER_CLUSTER,
          measuredAt: Date.now(),
        };
        emitBackendEvent<ConfusionMatrixReadyDetail>('confusion-matrix-ready', detail);
        // CFM-1 diagnostic (2026-05-31): self-verify 결과 영역 console group 영역
        // per-pattern breakdown 표시. 사용자 production observation "같은 패턴
        // 재학습 시 인식률 저하" 영역 root cause 영역 빠른 catch path —
        // aggregate accuracy 영역 hide 영역 per-pattern degradation 영역
        // 표면화. UI panel 영역 Phase 2 영역 defer.
        logCfm1FromConfusionMatrix(detail);
      } finally {
        verifyInFlightRef.current = false;
      }
    })();
  }, [isAutoLearning, isLiveMode]);

  const phaseInfo = useMemo(() => {
    const p = effectivePhase;
    const activeLabel = activeCluster >= 0 ? getClusterLabel(activeCluster, 'grid') : '';
    const activeCount = activeCluster >= 0 ? effectiveClusterFrames[activeCluster as 0|1|2|3] : 0;
    const config: Record<string, { label: string; tone: string; sub: string; hint: string }> = {
      untrained: {
        label: 'UNTRAINED',
        tone: 'idle',
        sub: 'awaiting input — grid preset 학습',
        hint: 'INPUT 노드에서 패턴을 학습시키세요',
      },
      learning: {
        label: 'LEARNING',
        tone: 'amber',
        sub: 'R-STDP — capturing frames',
        hint: activeLabel
          ? `${activeLabel} 패턴 유지 (${activeCount}/${CLUSTER_TARGET})`
          : 'capturing frames…',
      },
      partial: {
        label: 'PARTIAL',
        tone: 'orange',
        sub: 'some clusters trained — others rejected',
        hint: activeLabel
          ? `남은 cluster: ${activeLabel} (${activeCount}/${CLUSTER_TARGET})`
          : 'all clusters captured',
      },
      trained: {
        // UX LOW 3 (2026-05-25): "disjoint guaranteed" 정직 명시 — production
        // incremental forced-disjoint wire (worker forceDisjoint=true default)
        // 영역 사용자 가치 (자동 disjoint 보장) 영역 sub 영역 catch. 학술 정합
        // (Carpenter & Grossberg 1987 ART vigilance disjoint active inputs).
        label: '✓ TRAINED — frozen',
        tone: 'green',
        sub: '4 clusters locked — disjoint guaranteed · weight permanent',
        hint: '학습 완료 — Infer 노드에서 winner 확인',
      },
      inference: {
        label: 'INFERENCE',
        tone: 'blue',
        sub: 'STDP off · cluster mean readout',
        hint: '실시간 추론 — 입력을 주세요',
      },
    };
    return config[p];
  }, [effectivePhase, activeCluster, effectiveClusterFrames]);

  const stripActive = regionFired.V1 || regionFired.V2;
  const phaseTone = phaseInfo.tone;
  const isLearning = phaseTone === 'amber' || phaseTone === 'orange';
  // UX HIGH #1 (2026-05-25): TRAINED phase visualization — N/4 clusters badge +
  // animated check sequence. gridProgress.trained 영역 base-4 hardcoded
  // (`0|1|2|3`) — ART expansion 영역 5+ cluster 영역 badge 영역 base-4 grid 영역
  // 만 표시 (totalClusterSlots = 4 hard-cap). clusterLabels.length === 0
  // (zero-init) 영역 badge hide (LOW #5 정합 — clusterLabels.length > 0 gate).
  const isTrained = phaseTone === 'green';
  const trainedCount = useMemo(() =>
    (Object.values(gridProgress.trained) as boolean[]).filter(Boolean).length,
    [gridProgress.trained],
  );
  const totalClusterSlots = 4;

  // Phase 3.3 (2026-06-03): camera mode 일 때 hand SNN context placeholder.
  // 직전 LEARN node 가 orientation-6x6 stale state 표시 ("학습 #N · no winner ·
  // WTA 대기") — hand SNN 활성 시 misleading. NodeInput tab 이 GRID 면 본래
  // 의도된 orientation status, CAMERA 면 hand SNN 안내 message.
  if (inputMode === 'camera') {
    return (
      <NodeShell title="LEARN" subtitle="Hand SNN (orientation-hand)" tone="learn">
        <div className="snn-pipeline-learn-camera-msg">
          <strong>Hand SNN 활성</strong>
          <small>
            CAMERA tab 에서 손 자세를 보여주고 INPUT 영역의 &lsquo;이 자세 학습 / 인식&rsquo;
            버튼을 눌러 학습 / 인식을 진행하세요.
          </small>
          <small className="snn-pipeline-learn-camera-hint">
            현재 winner cluster + 학습된 제스처 목록은 INPUT 영역에 표시됩니다.
          </small>
        </div>
      </NodeShell>
    );
  }

  return (
    <NodeShell
      title="LEARN"
      subtitle={
        isLiveMode ? (
          <>
            {/* PR-A architecture pivot (사용자 catch 2026-05-09 A1+A2):
                pixel/preset click 영역 STDP off + 명시 추론/학습 button trigger
                영역 정합. 직전 'INPUT 1회 학습' 영역 stale (auto-on-click). */}
            <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
            LIVE — 명시 supervised R-STDP
          </>
        ) : '진행상황'
      }
      subtitleAria={isLiveMode ? 'LIVE — 명시 supervised R-STDP' : '진행상황'}
      tone="learn"
    >

      {/* V1/V2 cortical region strip — 학습 substrate cascade.
          INPUT/OUT region 영역 INPUT/OUT 노드 영역 정합 → 위쪽 row 폐기 → 본 위치 흡수.
          사용자 catch 2026-05-09 [3]: Hz mini-bar 영역 추가 (Felleman & Van Essen 1991
          V1/V2 cortical hierarchy 정합 영역 spike rate 영역 정직 표현). */}
      <div className="snn-pipeline-learn-region-strip" aria-label="V1/V2 cortical cascade">
        <RegionStripBox
          region="V1" total={regionTotals.V1} active={regionActive.V1}
          rateHz={regionRateHz.V1} fired={regionFired.V1}
          isProxy={regionRateIsProxy}
        />
        <div
          className={`snn-pipeline-learn-region-arrow ${stripActive ? 'is-active' : ''}`}
          aria-hidden
        >
          <svg viewBox="0 0 32 12" width="32" height="12">
            <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1.4" />
            <polyline points="22,2 28,6 22,10" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </div>
        <RegionStripBox
          region="V2" total={regionTotals.V2} active={regionActive.V2}
          rateHz={regionRateHz.V2} fired={regionFired.V2}
          isProxy={regionRateIsProxy}
        />
      </div>

      {isLiveMode ? (
        <LiveLearnPanel
          tick={liveTick}
          clusterLabels={clusterLabels}
          initState={initState}
          winner={winner}
          winnerForcedExact={winnerForcedExact}
          autoLearnProgress={autoLearnProgress}
          isAutoLearning={isAutoLearning}
        />
      ) : (
        <>
          {/* phase indicator — key 영역 phase 변경 시점 transition animation 재생 (fade+slide-in).
              사용자 catch 2026-05-07: phase transition 사실 시각 catch. */}
          <div
            key={`phase-${phaseTone}`}
            className={`snn-pipeline-phase snn-pipeline-phase--${phaseTone} snn-pipeline-phase-transition`}
          >
            <div className="snn-pipeline-phase-label">
              {phaseInfo.label}
              {isLearning && (
                <span className="snn-pipeline-tick-spinner" aria-label="학습 중" />
              )}
              {/* UX HIGH #1 (2026-05-25): TRAINED phase badge — N/4 clusters
                  + animated check sequence (1회 fade-in, phase transition key
                  영역 재생). clusterLabels.length === 0 영역 hide (LOW #5
                  zero-init + trainedCount=4 모순 path 회피). */}
              {isTrained && clusterLabels.length > 0 && (
                <span
                  className="snn-pipeline-trained-badge"
                  role="status"
                  aria-label={`${trainedCount} of ${totalClusterSlots} clusters trained`}
                  title="모든 cluster 학습 완료 — frozen"
                >
                  <span
                    className="snn-pipeline-trained-badge-check"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {trainedCount} / {totalClusterSlots} clusters
                </span>
              )}
            </div>
            <div className="snn-pipeline-phase-sub">
              {phaseInfo.sub}
              {/* UX MEDIUM 1 (2026-05-25): LEARNING phase mini dot indicator —
                  disjoint cluster slot allocation progress (trainedCount/4) 영역
                  TRAINED badge ("✓ N/4 clusters") 영역 visual continuity. frame
                  progress (CLUSTER_TARGET 30) 영역 hint 영역 catch + slot
                  progress 영역 본 dot 영역 catch. progressive disclosure
                  principle (Nielsen Norman) 정합 — LEARNING / PARTIAL phase
                  영역 만 visible, TRAINED 영역 badge 영역 흡수, UNTRAINED /
                  INFERENCE 영역 hide. clusterLabels.length === 0 (zero-init)
                  영역 hide (TRAINED badge gate 정합). */}
              {isLearning && clusterLabels.length > 0 && (
                <span
                  className="snn-pipeline-phase-progress-dots"
                  role="status"
                  aria-label={`${trainedCount} of ${totalClusterSlots} clusters allocated`}
                  title="disjoint cluster slot 할당 진행"
                >
                  {Array.from({ length: totalClusterSlots }, (_, i) => (
                    <span
                      key={i}
                      className={`snn-pipeline-phase-progress-dot ${
                        i < trainedCount
                          ? 'snn-pipeline-phase-progress-dot--filled'
                          : 'snn-pipeline-phase-progress-dot--empty'
                      }`}
                      aria-hidden
                    >
                      {i < trainedCount ? '●' : '○'}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
          <div className="snn-pipeline-hint">{phaseInfo.hint}</div>
          <div className="snn-pipeline-cluster-list">
            {/* Fix #19 (2026-05-10): zero-init — clusterLabels.length === 0 영역
                empty placeholder (사용자 mental model "cluster 0개 시작" 정합). */}
            {clusterLabels.length === 0 && (
              <div className="snn-pipeline-cluster-row snn-pipeline-cluster-row--empty">
                <span className="snn-pipeline-cluster-label">아직 학습된 패턴 0</span>
                <span className="snn-pipeline-cluster-count snn-pipeline-mono">—</span>
              </div>
            )}
            {Array.from({ length: clusterLabels.length }, (_, i) => i).map((i) => {
              // PR-K (Phase 4, 2026-05-09): dynamic cluster length —
              // effectiveClusterFrames 영역 base 4 cluster (n13 default) 영역
              // catch 영역 신규 ART expansion cluster 영역 frame=0 fallback.
              // PR #203 polish (UX HIGH 2026-05-10): 신규 ART cluster (i >= 4)
              // 영역 autoLearnProgress Map 영역 read — runAutoLearnLoop 영역
              // chunk 단위 progress 영역 amber bar 영역 진행 visibility 정합.
              const count = i < 4
                ? effectiveClusterFrames[i as 0|1|2|3]
                : (autoLearnProgress.get(i) ?? 0);
              const done = count >= CLUSTER_TARGET;
              // 신규 ART cluster (i >= 4) 영역 amber bar 영역 진행 시각 catch —
              // autoLearnProgress 영역 0 < count < TOTAL 영역 active.
              const active = i < 4
                ? (i === activeCluster && isLearning)
                : (count > 0 && count < CLUSTER_TARGET);
              const spawnActive = spawnPulseFor === i;
              return (
                <ClusterRow
                  key={i}
                  clusterIdx={i}
                  label={clusterLabels[i] ?? `패턴 ${i + 1}`}
                  count={count}
                  done={done}
                  active={active || spawnActive}
                  capturingPulse={active ? capturingPulse : 0}
                  spawnPulse={spawnActive ? spawnPulseKey : 0}
                  showHueDot={isTrained && done && i < 4}
                />
              );
            })}
          </div>
        </>
      )}
      {!isLiveMode && gridProgress.lastResult && (
        <div className="snn-pipeline-row snn-pipeline-row--wrap">
          <span className="snn-pipeline-row-label">last</span>
          <span className="snn-pipeline-row-value snn-pipeline-row-value--wrap">
            {clusterLabels[gridProgress.lastResult.cluster]} —
            정확도 {(gridProgress.lastResult.accuracy * 100).toFixed(0)}%
          </span>
        </div>
      )}
      {!isLiveMode && gridProgress.lastError && (
        <div className="snn-pipeline-row snn-pipeline-row--wrap">
          <span className="snn-pipeline-row-label">error</span>
          <span className="snn-pipeline-row-value snn-pipeline-row-value--wrap snn-pipeline-row-error">
            {gridProgress.lastError}
          </span>
        </div>
      )}
      {delta.changed > 0 && (
        <div className="snn-pipeline-row">
          <span className="snn-pipeline-row-label">Δw</span>
          <span className="snn-pipeline-row-value snn-pipeline-mono">
            +{delta.ltp.toFixed(2)} / {delta.ltd.toFixed(2)} · {delta.changed} syn
          </span>
        </div>
      )}
      {/* UX HIGH (2026-05-25): confusion matrix collapsible panel — TRAINED phase
          self-verification 결과 영역 N×N grid display. Bishop 1995 ML evaluation
          표준 metric 정합. collapse-default + chevron 영역 tap-to-expand —
          progressive disclosure (Nielsen Norman). diagonal=green / off-diagonal
          영역 orange opacity 영역 confusion rate 영역 비례. */}
      {confusionMatrix && confusionMatrix.matrix.length >= 2 && (
        <ConfusionMatrixPanel
          data={confusionMatrix}
          expanded={confusionExpanded}
          onToggle={() => setConfusionExpanded((v) => !v)}
        />
      )}
    </NodeShell>
  );
}

// UX HIGH (2026-05-25): ConfusionMatrixPanel — N×N grid + chevron toggle.
// row label = expected cluster (학습 시점 영역 cached lastFeature), col label =
// predicted cluster (inferOnceForValidation 영역 winner). diagonal cell 영역
// green (correct prediction), off-diagonal 영역 orange opacity 영역 confusion rate.
//
// 정직 한계:
//  - held-out wire (2026-05-28): samplesPerCluster=N (default 5) 영역 noise-
//    perturbed (feature Gaussian σ=0.05) — matrix cell 영역 ∈ {0..N}. opacity
//    영역 N-step quantize (0..5 step 영역 5/5 정합). true held-out (실제 capture)
//    영역 별도 R&D — 본 wire 외부.
//  - aria-label 영역 N of N correct (diagonal sum / total samples) 영역 1차
//    a11y signal. screen reader 영역 cell-by-cell read 영역 per-cell aria-label
//    영역 정합.
function ConfusionMatrixPanel({
  data,
  expanded,
  onToggle,
}: {
  data: ConfusionMatrixReadyDetail;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { matrix, labels, samplesPerCluster } = data;
  const fullN = matrix.length;
  // QA HIGH #3 (2026-05-25 audit): N hard-cap (CONFUSION_MATRIX_MAX_N = 4)
  // 영역 truncate — base-4 TRAINED badge 영역 정합. fullN > cap 영역 truncated
  // hint 영역 정직 표기. diagonalSum / totalSamples 영역 truncated view 정합
  // (truncated 영역 N×N 영역만 — summary 영역 visible portion catch).
  const N = Math.min(fullN, CONFUSION_MATRIX_MAX_N);
  const truncated = fullN > N;
  const remaining = Math.max(0, fullN - N);
  // diagonal sum (correct predictions) / total samples (N × samplesPerCluster).
  // labels.length 영역 row 영역 정합 — undefined 영역 fallback '패턴 N' (row label).
  const diagonalSum = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < N; i += 1) {
      sum += matrix[i]?.[i] ?? 0;
    }
    return sum;
  }, [matrix, N]);
  const totalSamples = N * samplesPerCluster;
  const correctPct = totalSamples > 0 ? Math.round((diagonalSum / totalSamples) * 100) : 0;
  // QA HIGH #2 (2026-05-25 audit) + held-out wire (2026-05-28): self-verify 정직
  // 한계 inline note. 직전 (2026-05-25): samplesPerCluster=1 + cached lastFeature
  // 직접 재사용 → trained sample only / 일반화 측정 X. 정정 (2026-05-28):
  // noisy held-out (feature-level Gaussian σ=0.05) 영역 realistic generalization
  // estimate. true held-out (실제 사용자 capture) 영역 별도 R&D — 본 wire 외부.
  // aria 영역 동봉 — screen reader 영역 catch.
  //
  // QA HIGH #6 + MEDIUM #5 (2026-05-28 audit): runtime seed (Date.now()) 영역
  // unique noise sample 영역 명시 — page reload 영역 동일 결과 보장 0. measurement
  // JSON 영역 fixed seed=3000 deterministic baseline 영역 차이 — runtime 영역
  // single-seed lower-bound 추정 (seed-dependent variance R&D 별도).
  const honestyHint = `noisy held-out (n=${samplesPerCluster}/cluster, σ=${HELD_OUT_FEATURE_NOISE_SIGMA} feature-noise) — 각 verify 영역 unique noise sample (page reload 영역 동일 결과 보장 0). σ=${HELD_OUT_FEATURE_NOISE_SIGMA} 영역 conservative (Goodfellow 2014 typical σ~0.1 보다 낮음 — sweep R&D 별도). true held-out (capture) R&D 별도.`;
  return (
    <div
      className="snn-pipeline-confusion-matrix"
      aria-label={`confusion matrix: ${diagonalSum} of ${totalSamples} correct (${honestyHint})`}
    >
      <button
        type="button"
        className="snn-pipeline-confusion-matrix-toggle"
        onClick={onToggle}
        aria-expanded={expanded ? 'true' : 'false'}
        aria-controls="snn-pipeline-confusion-matrix-grid"
      >
        <span className="snn-pipeline-confusion-matrix-chevron" aria-hidden>
          {expanded ? '▼' : '▶'}
        </span>
        <span className="snn-pipeline-confusion-matrix-summary">
          self-verify · {diagonalSum}/{totalSamples} correct ({correctPct}%)
        </span>
      </button>
      {/* QA HIGH #2 (2026-05-25 audit): inline honesty note — dim color, small
          font 영역 panel 상단 영역 표기 mandatory. samplesPerCluster=1 영역
          false confidence catch — 사용자 영역 일반화 0 영역 명시. */}
      <div
        className="snn-pipeline-confusion-matrix-honesty"
        role="note"
        aria-label={honestyHint}
      >
        {honestyHint}
      </div>
      {expanded && (
        <>
          <div
            id="snn-pipeline-confusion-matrix-grid"
            className="snn-pipeline-confusion-matrix-grid-wrap"
            role="grid"
            aria-label={
              truncated
                ? `${N} by ${N} confusion matrix, showing first ${N} of ${fullN} clusters`
                : `${N} by ${N} confusion matrix`
            }
          >
            {/* header row — predicted labels (col headers). */}
            <div className="snn-pipeline-confusion-matrix-row" role="row">
              <div className="snn-pipeline-confusion-matrix-corner" role="columnheader" aria-label="expected vs predicted">
                {/* small ↓→ glyph 영역 row=expected col=predicted 영역 visual cue. */}
                <span aria-hidden>↓\\→</span>
              </div>
              {labels.slice(0, N).map((label, j) => (
                <div
                  key={j}
                  className="snn-pipeline-confusion-matrix-col-label snn-pipeline-mono"
                  role="columnheader"
                  title={`predicted ${label}`}
                >
                  {j + 1}
                </div>
              ))}
            </div>
            {/* data rows — expected (row) × predicted (col). truncated view 영역
                fullN > N 영역 영역 N 영역만 표시 (HIGH #3 정합). */}
            {matrix.slice(0, N).map((row, i) => (
              <div key={i} className="snn-pipeline-confusion-matrix-row" role="row">
                <div
                  className="snn-pipeline-confusion-matrix-row-label snn-pipeline-mono"
                  role="rowheader"
                  title={`expected ${labels[i] ?? `패턴 ${i + 1}`}`}
                >
                  {labels[i] ?? `패턴 ${i + 1}`}
                </div>
                {row.slice(0, N).map((count, j) => {
                  const isDiagonal = i === j;
                  const rate = samplesPerCluster > 0 ? count / samplesPerCluster : 0;
                  // opacity quantize — CSS variant 영역 0..5 step (inline style 회피 — data attr).
                  const opacityStep = Math.min(5, Math.round(rate * 5));
                  // QA hook fix (2026-05-25): cell 영역 inline — jsx-a11y 영역
                  // role=row child role=cell 영역 static analyzer 영역 trace
                  // mandatory (component boundary 영역 trace 0). 직전 ConfusionCell
                  // function component 영역 inline 영역 hierarchy 영역 명시.
                  const expectedLabel = labels[i] ?? `패턴 ${i + 1}`;
                  const predictedLabel = labels[j] ?? `패턴 ${j + 1}`;
                  const cellAriaLabel = `${expectedLabel} predicted as ${predictedLabel}: ${count} of ${samplesPerCluster}`;
                  return (
                    <div
                      key={j}
                      className={`snn-pipeline-confusion-matrix-cell ${isDiagonal ? 'is-diagonal' : 'is-off-diagonal'}`}
                      data-opacity-step={opacityStep}
                      role="cell"
                      aria-label={cellAriaLabel}
                      title={cellAriaLabel}
                    >
                      <span className="snn-pipeline-mono">{count}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* QA HIGH #3 (2026-05-25 audit): truncation hint — N > cap 영역 표기
              mandatory. ART expansion path 영역 추가 cluster 영역 사용자 인지
              + matrix grid overflow 회피. grid 영역 외부 영역 hoist (role=grid
              영역 role=note child 영역 불허 — a11y lint 정합). */}
          {truncated && (
            <div
              className="snn-pipeline-confusion-matrix-truncate-hint"
              role="note"
              aria-label={`${remaining} more clusters not shown in confusion matrix`}
            >
              {`+${remaining} more clusters not shown`}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// QA hook fix (2026-05-25): ConfusionCell function 영역 inline 영역 흡수 —
// jsx-a11y static analyzer 영역 role=row > role=cell 영역 component boundary
// 영역 trace 0 영역 인접 hierarchy 영역 mandatory.

// LiveLearnPanel — Live 모드 전용 패널.
// event-driven 1-shot pivot (사용자 catch 2026-05-09 B):
//   - key 영역 patternActive on/off 영역 한정 fade — 매 trigger 영역 깜빡거림
//     catch 영역 root fix (직전 key={`live-${tick.rev}`} 영역 매 trial 영역 element
//     remount → fade 재생).
//   - STDP LED — tick.trial 변경 영역 1회 8px amber dot pulse 600ms (mount key
//     변경 영역 animation 재생).
//   - hint copy — '클릭 / 자세 1회 학습 + 추론. 강화 button 영역 명시 보강 학습'.
function LiveLearnPanel({
  tick,
  clusterLabels,
  initState,
  winner,
  winnerForcedExact,
  autoLearnProgress,
  isAutoLearning,
}: {
  tick: LiveTickDetail | null;
  clusterLabels: readonly string[];
  initState: LocalSnnInitState | null;
  // HIGH #1 (사용자 catch 2026-05-11): winner 영역 PipelineEventContext 영역 단일
  // source — INFER 정합 path. 직전 tick.winner (live-snn 영역 별도 cfr.winner) 영역
  // dual source mismatch 회피.
  winner: { cluster: number | null; confidence: number; margin: number; clusterRates: number[] };
  // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forced winner 사실 —
  // PipelineEventContext 영역 단일 source. true 영역 winner card 영역 "EXACT MATCH"
  // badge replace + LiveRateRow 영역 winner row Hz 영역 hide → "EXACT" pill.
  winnerForcedExact: boolean;
  // [A] 학습 진행률 — PipelineEventContext.autoLearnProgress + isAutoLearning.
  autoLearnProgress: Map<number, number>;
  isAutoLearning: boolean;
}) {
  // STDP pulse LED — trial 변경 시 mount key ↑ 영역 animation 1회 재생.
  // tick === null 영역 0 — 첫 trial 도달 시점부터 pulse.
  const [stdpPulseKey, setStdpPulseKey] = useState<number>(0);
  useEffect(() => {
    if (tick && tick.trial > 0) {
      setStdpPulseKey((k) => k + 1);
    }
  }, [tick?.trial, tick]);

  // 사용자 catch 2026-05-09 [2] (Fix 4): DB hydrate state 영역 사용자-readable
  // hint copy. fresh build 영역 '학습 0회' 영역 정직 catch / hydrated 영역 마지막
  // 학습 시점 영역 표시. tick=null (첫 trial 도달 직전) 영역 mental model 영역
  // 직접 정합 path — "기존에 학습된 데이터가 DB에 존재하는지" 사용자 catch 영역.
  //
  // 사용자 catch 2026-05-11 (infer-winner-display-fix): initState 영역 INIT 1회
  // emit 영역 학습 진행 후 'fresh' stale 잔존 — clusterLabels.length 영역 학습된
  // cluster 영역 source 영역 정합. fresh init + 진행 영역 학습 사실 ('학습 #N
  // 진행 — 영속 대기' hint 영역 정합). exemplar count 영역 incrementCount 영역
  // 학습 winner 변경 시점 영역 fire — clusterLabels.length>=1 영역 학습 사실 catch.
  const dbHint = useMemo(() => {
    if (!initState) return null;
    const learnedCount = clusterLabels.length;
    if (initState.phase === 'fresh') {
      if (learnedCount === 0) {
        return 'fresh circuit — 학습 가중치 0 (추론 결과 unreliable)';
      }
      return `학습 진행 — ${learnedCount} 패턴 학습 (영속 대기)`;
    }
    const ageMs = Date.now() - initState.savedAt;
    const ageStr = formatAge(ageMs);
    return `hydrated — 마지막 학습 ${ageStr} 전 (rev ${initState.rev})`;
  }, [initState, clusterLabels.length]);

  // 사용자 catch 2026-05-11 (cluster-source-unify): tick === null 영역 영역
  // winner 영역 fire 영역 영역 fresh banner 영역 stale 표시 catch 회피 — INFER /
  // OUT 영역 단일 source 정합. isUntrustworthy 영역 단일 helper 영역 두 path
  // (early return + main return) 영역 동일 gate.
  const earlyUntrustworthy = isUntrustworthy({
    initPhase: initState?.phase,
    phaseName: null,
    clusterLabelCount: clusterLabels.length,
    winnerCluster: winner.cluster,
  });
  if (!tick) {
    return (
      <>
        <div className="snn-pipeline-phase snn-pipeline-phase--idle snn-pipeline-phase-transition">
          <div
            className={`snn-pipeline-phase-label${
              earlyUntrustworthy ? ' snn-pipeline-phase-label--fresh' : ''
            }`}
          >
            {/* MEDIUM #8 (사용자 catch 2026-05-11): fresh wording 통일 — INFER 정합.
                cluster-source-unify (2026-05-11): winner !== null 영역 fresh banner
                영역 hide — INFER/OUT 영역 동일 winner 표시 path 영역 정합. */}
            {earlyUntrustworthy
              ? 'FRESH CIRCUIT — 학습 0회 / 입력 대기'
              : initState?.phase === 'hydrated'
                ? 'LIVE — hydrated (이전 학습 복원됨)'
                : winner.cluster !== null
                  ? `LIVE — winner 패턴 ${winner.cluster + 1} (학습 진행)`
                  : 'LIVE — awaiting'}
          </div>
          <div className="snn-pipeline-phase-sub">
            {winner.cluster !== null && !earlyUntrustworthy
              ? '추론 trigger → 자동 학습 후 cluster 영역 형성'
              : '패턴 입력 대기 — INPUT 노드에서 패턴을 그리세요'}
          </div>
        </div>
        <div className="snn-pipeline-hint">
          {/* PR-K (사용자 catch 2026-05-09 catch 1): hint copy 영역 ART
              auto-learn path 영역 정합 — 추론 button 영역 자동 학습. */}
          패턴을 그린 뒤 추론 버튼을 누르세요. 처음 보는 패턴은 30회 자동 학습.
        </div>
        {/* 사용자 catch 2026-05-09 [2] (Fix 4): DB visibility footer status row. */}
        {dbHint && (
          <div className="snn-pipeline-row snn-pipeline-row--wrap">
            <span className="snn-pipeline-row-label">회로 상태</span>
            <span className="snn-pipeline-row-value snn-pipeline-row-value--wrap">{dbHint}</span>
          </div>
        )}
      </>
    );
  }
  const max = Math.max(...tick.rates, 1);
  // HIGH #1 (사용자 catch 2026-05-11): winner 영역 PipelineEventContext.winner
  // 영역 단일 source — INFER 정합 path. tick.winner (live-snn cfr.winner) 영역
  // 폐기. winner.cluster === null 영역 'no winner' fallback.
  const winnerCluster = winner.cluster;
  const winnerLabel = winnerCluster !== null && winnerCluster < clusterLabels.length
    ? clusterLabels[winnerCluster]
    : null;
  const phaseTone = tick.patternActive ? 'amber' : 'idle';
  // HIGH #5 (사용자 catch 2026-05-11): isUntrustworthy 영역 단일 helper hoist —
  // NodeInfer 정합 path. 직전 LEARN: `phase==='fresh' && tick.trial===0` /
  // INFER: `phase==='fresh' && (phase===null || pname==='untrained') &&
  // clusterLabels.length===0` 영역 다른 gate 영역 모순 path 영역 단일 source.
  // 사용자 catch 2026-05-11 (cluster-source-unify): winnerCluster gate 추가 —
  // NodeOut winner fallback 영역 정합. winner 영역 fire 영역 영역 fresh banner
  // 영역 hide → cluster row 영역 표시.
  const untrustworthy = isUntrustworthy({
    initPhase: initState?.phase,
    phaseName: null, // Live 모드 영역 batch phase 미사용 — null 정합.
    clusterLabelCount: clusterLabels.length,
    winnerCluster: winner.cluster,
  });
  const hideWinner = untrustworthy;
  // MEDIUM #10 (사용자 catch 2026-05-11): metric 통일 — INFER 영역 winner.confidence
  // (max/total) 영역 동일 source. 직전 tick.margin (max-second/max) 영역 INFER 영역
  // confidence 영역 다른 metric 영역 사용자 mental model 영역 mismatch.
  const confPct = (winner.confidence * 100).toFixed(0);
  const marginPct = (winner.margin * 100).toFixed(0);
  return (
    <>
      <div
        key={`live-${tick.patternActive ? 'on' : 'off'}`}
        className={`snn-pipeline-phase snn-pipeline-phase--${phaseTone} snn-pipeline-phase-transition`}
      >
        <div className="snn-pipeline-phase-label">
          {/* MEDIUM #8 (사용자 catch 2026-05-11): fresh wording 통일 — INFER 정합. */}
          {hideWinner
            ? 'FRESH CIRCUIT — 학습 0회 / 입력 대기'
            : tick.patternActive ? 'LIVE — STDP active' : 'LIVE — silent'}
          {stdpPulseKey > 0 && !hideWinner && (
            <span
              key={`stdp-${stdpPulseKey}`}
              className="snn-pipeline-stdp-led"
              aria-label="학습 1회 적용"
            />
          )}
        </div>
        <div className="snn-pipeline-phase-sub">
          {/* HIGH #1 + MEDIUM #10: tick.trial 영역 학습 #N counter 영역만 사용 +
              winner 영역 PipelineEventContext.winner 영역 단일 source. metric 영역
              INFER 정합 영역 정확도 (confidence) + 안정도 (margin) 영역 명시 label.
              사용자 catch 2026-05-12 (exact-match-badge-hide-rates): winnerForcedExact
              영역 winner copy 영역 "EXACT MATCH (deterministic)" 영역 replace —
              정확도/안정도 100% 영역 ART resonance lock 영역 명시 (사용자 mental
              model 영역 modicum information 영역 fix). */}
          {hideWinner
            ? 'tap 추론 → 자동 30회 학습 후 winner 표시'
            : (
              <>
                학습 #{tick.trial} · {winnerLabel
                  ? (winnerForcedExact
                      ? (
                        <>
                          winner {winnerLabel}{' '}
                          <span
                            className="snn-pipeline-exact-badge"
                            role="status"
                            aria-label="exact match deterministic"
                            title="정확 일치 — deterministic"
                          >
                            EXACT
                          </span>
                        </>
                      )
                      : `winner ${winnerLabel} · 정확도 ${confPct}% · 안정도 ${marginPct}%`)
                  : 'no winner — WTA 대기'}
              </>
            )}
        </div>
        {/* PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner
            정정, 2026-05-10): n13 substrate 영역 idx overlap (mathematical
            impossible) 영역 mitigation only — STDP 누적 영역 winner 수렴 path
            영역 사용자 명시. follow-up PR (Option A — 32-dim disjoint feature
            engineering) 영역 본격 root fix. */}
        {tick.trial > 0 && tick.trial < 10 && (
          <div className="snn-pipeline-phase-sub snn-pipeline-phase-sub--dim">
            10-20회 반복하면 winner 안정 — 같은 자세 권장
          </div>
        )}
      </div>
      <div className="snn-pipeline-cluster-list">
        {/* Fix #19 (2026-05-10): zero-init — clusterLabels.length === 0 영역
            empty placeholder. tick.rates 영역 base 4 default 영역 firing
            영역 안 영역 cluster 영역 표시 회피 — clusterLabels 영역 source. */}
        {!hideWinner && clusterLabels.length === 0 && (
          <div className="snn-pipeline-cluster-row snn-pipeline-cluster-row--empty">
            <span className="snn-pipeline-cluster-label">아직 학습된 패턴 0</span>
            <span className="snn-pipeline-cluster-count snn-pipeline-mono">—</span>
          </div>
        )}
        {/* HIGH #1 (2026-05-11): isWinner 영역 PipelineEventContext.winner.cluster
            영역 단일 source — INFER 정합.
            사용자 catch 2026-05-12 (exact-match-badge-hide-rates): winnerForcedExact
            + isWinner 영역 LiveRateRow 영역 Hz 영역 hide ("EXACT" pill 영역 replace).
            non-winner cluster 영역 그대로 Hz 표시. */}
        {!hideWinner && clusterLabels.map((label, i) => (
          <LiveRateRow
            key={i}
            label={label}
            rate={tick.rates[i] ?? 0}
            max={max}
            isWinner={winnerCluster === i}
            hideRate={winnerForcedExact && winnerCluster === i}
          />
        ))}
      </div>
      {/* [A] 학습 진행률 표시 — isAutoLearning 영역 신규 패턴 30회 자동 학습 중
          auto-learn-progress 이벤트 기반. Map 영역 clusterId→progress 영역 순회.
          TOTAL=30 영역 LEARN/INFER 정합 (runAutoLearnLoop TOTAL=6×5).
          --w CSS var 영역 ref 기반 setProperty (inline style 회피 — fillRef 패턴
          ClusterRow / LiveRateRow 정합). */}
      {isAutoLearning && autoLearnProgress.size > 0 && (
        <div className="snn-pipeline-auto-learn-progress" role="status" aria-live="polite">
          {Array.from(autoLearnProgress.entries()).map(([clusterId, progress]) => {
            const TOTAL = 30;
            if (progress >= TOTAL) return null;
            const clusterLabel = clusterLabels[clusterId] ?? `패턴 ${clusterId + 1}`;
            return (
              <AutoLearnProgressRow
                key={clusterId}
                label={clusterLabel}
                progress={progress}
                total={TOTAL}
              />
            );
          })}
        </div>
      )}
      {/* 사용자 catch 2026-05-09 [2] (Fix 4): DB visibility footer status row —
          fresh / hydrated 영역 정직 표시 (사용자 mental model 영역 직접 정합). */}
      {dbHint && (
        <div className="snn-pipeline-row snn-pipeline-row--wrap">
          <span className="snn-pipeline-row-label">DB</span>
          <span className="snn-pipeline-row-value snn-pipeline-row-value--wrap">{dbHint}</span>
        </div>
      )}
    </>
  );
}

// 사용자 catch 2026-05-09 [2] (Fix 4): hydrate 영역 마지막 학습 시점 영역 사용자-
// readable 영역 format. < 1m → 'just now', < 1h → 'Nm', < 1d → 'Nh', else 'Nd'.
function formatAge(ms: number): string {
  if (ms < 60_000) return '방금';
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}분`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}시간`;
  return `${Math.floor(ms / 86_400_000)}일`;
}

function LiveRateRow({ label, rate, max, isWinner, hideRate = false }:
  { label: string; rate: number; max: number; isWinner: boolean; hideRate?: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): hideRate (forced winner)
      // 영역 fill 영역 100% (deterministic lock 시각 catch — fire rate=0Hz 영역 산출
      // 사실 단 winner deterministic 영역 사용자 mental model 영역 정합).
      const pct = hideRate ? 100 : (max > 0 ? Math.min(100, (rate / max) * 100) : 0);
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [rate, max, hideRate]);
  return (
    <div className={`snn-pipeline-cluster-row ${isWinner ? 'is-active' : ''}`}>
      <span className={`snn-pipeline-cluster-label ${isWinner ? 'is-active' : ''}`}>
        {isWinner ? '▸ ' : ''}{label}
      </span>
      <div className="snn-pipeline-cluster-bar">
        <div
          ref={fillRef}
          className={`snn-mode-progress-fill ${isWinner ? 'snn-pipeline-fill-green' : 'snn-pipeline-fill-cyan'}`}
        />
      </div>
      {/* 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): hideRate 영역 Hz 영역
          replace → "EXACT" pill (NodeInfer RateBar 정합 — 단위 통일). non-exact 영역
          그대로 Hz 표시. */}
      {hideRate ? (
        <span
          className="snn-pipeline-exact-badge"
          aria-label="exact match — winner deterministic"
        >
          EXACT
        </span>
      ) : (
        <span className="snn-pipeline-cluster-count snn-pipeline-mono">
          {rate.toFixed(0)}Hz
        </span>
      )}
    </div>
  );
}

// region Hz visualization scale — 0..40Hz 영역 0..100% 영역 mini-bar.
// V1 typical Hz (Hubel & Wiesel 1962 cat V1 simple cell) ~10-40Hz peak.
const REGION_HZ_MAX = 40;

function RegionStripBox({ region, total, active, rateHz, fired, isProxy = false }:
  { region: 'V1' | 'V2'; total: number; active: number; rateHz: number; fired: boolean; isProxy?: boolean }) {
  const tone = region.toLowerCase();
  const fillRef = useRef<HTMLDivElement | null>(null);
  const pct = Math.max(0, Math.min(100, (rateHz / REGION_HZ_MAX) * 100));
  useEffect(() => {
    if (fillRef.current) fillRef.current.style.setProperty('--w', `${pct}%`);
  }, [pct]);
  // PR #187 polish — QA MEDIUM-5 (audit 2026-05-10): proxy fallback 영역 시각
  // catch — '~' prefix + reduced opacity (0.6) + aria-label 영역 명시. 사용자
  // 영역 실 spike rate vs proxy (cluster_rates max fallback) 영역 catch.
  const ariaSuffix = isProxy ? ' (proxy estimate)' : '';
  const hzPrefix = isProxy ? '~' : '';
  return (
    <div
      className={`snn-pipeline-learn-region-box snn-pipeline-learn-region-box--${tone} ${fired ? 'is-fired' : ''} ${isProxy ? 'is-proxy' : ''}`}
      aria-label={`${region} region — ${active} of ${total} active, ${rateHz.toFixed(0)}Hz mean${ariaSuffix}`}
      title={isProxy ? 'V1/V2 spike rate proxy — cluster_rates max fallback (정직 한계: regionFiringRates RPC 미동봉).' : undefined}
    >
      <span className="snn-pipeline-learn-region-label">{region}</span>
      <span className="snn-pipeline-learn-region-counts">
        <span className="snn-pipeline-learn-region-active">{active}</span>
        <span className="snn-pipeline-learn-region-sep">/</span>
        <span className="snn-pipeline-learn-region-total">{total}</span>
      </span>
      <div className="snn-pipeline-learn-region-hz-bar" aria-hidden>
        <div
          ref={fillRef}
          className="snn-mode-progress-fill snn-pipeline-learn-region-hz-fill"
        />
      </div>
      <span className="snn-pipeline-learn-region-hz-value snn-pipeline-mono">
        {hzPrefix}{rateHz.toFixed(0)}Hz
      </span>
    </div>
  );
}

// [A] AutoLearnProgressRow — 자동 학습 진행 중 N/30 진행바.
// --w CSS var 영역 ref.setProperty (inline style 회피 — ClusterRow 패턴 정합).
function AutoLearnProgressRow({ label, progress, total }: {
  label: string;
  progress: number;
  total: number;
}) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      const pct = Math.min(100, total > 0 ? Math.round((progress / total) * 100) : 0);
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [progress, total]);
  return (
    <div className="snn-pipeline-auto-learn-row">
      <span className="snn-pipeline-auto-learn-label">학습 중 {label}</span>
      <span className="snn-pipeline-auto-learn-count snn-pipeline-mono">
        {progress}/{total}
      </span>
      <div className="snn-pipeline-auto-learn-bar">
        <div
          ref={fillRef}
          className="snn-mode-progress-fill snn-pipeline-fill-amber is-active"
        />
      </div>
    </div>
  );
}

function ClusterRow({ clusterIdx, label, count, done, active = false, capturingPulse = 0, spawnPulse = 0, showHueDot = false }:
  { clusterIdx: number; label: string; count: number; done: boolean; active?: boolean; capturingPulse?: number; spawnPulse?: number; showHueDot?: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const hueDotRef = useRef<HTMLSpanElement | null>(null);
  // UX MEDIUM #2 (2026-05-25): hue dot color — cluster id 영역 deterministic
  // hue (clusterHue 정합). CSS var --hue 영역 setProperty (inline style 회피 —
  // fillRef 패턴 정합).
  useEffect(() => {
    if (hueDotRef.current && showHueDot) {
      hueDotRef.current.style.setProperty('--hue', String(clusterHue(clusterIdx)));
    }
  }, [clusterIdx, showHueDot]);
  // capturingPulse 변경 시점 — bar 옆 pulse dot 재생 (frame 1개 capture 시각 신호).
  // 사용자 catch 2026-05-07: 학습 중 batch supervised pulse 시각 catch 강화.
  const [bumpKey, setBumpKey] = useState<number>(0);
  useEffect(() => {
    if (capturingPulse > 0) setBumpKey((k) => k + 1);
  }, [capturingPulse]);
  useEffect(() => {
    if (fillRef.current) {
      const pct = Math.min(100, (count / CLUSTER_TARGET) * 100);
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [count]);
  // Backend audit fix #4 (UX-designer Part C): spawn pulse — 신규 ART expansion
  // cluster row 영역 1회 amber glow (Live mode 영역 auto-learn-progress amber
  // bar 영역 시각 일관성). spawnPulse > 0 영역 row 영역 'is-spawn-pulse' class
  // 영역 1500ms catch (parent 영역 setTimeout 영역 자동 clear).
  const isSpawning = spawnPulse > 0;
  return (
    <div className={`snn-pipeline-cluster-row ${active ? 'is-active' : ''} ${done ? 'is-done-row' : ''} ${isSpawning ? 'is-spawn-pulse' : ''}`}>
      <span className={`snn-pipeline-cluster-label ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}>
        {done ? '✓ ' : (active ? '▸ ' : '')}{label}
        {isSpawning && (
          <span className="ml-1 text-amber-300" aria-label="신규 cluster 자동 형성됨">★</span>
        )}
      </span>
      <div className={`snn-pipeline-cluster-bar ${active ? 'is-capturing' : ''}`}>
        <div
          ref={fillRef}
          className={`snn-mode-progress-fill ${done ? 'snn-pipeline-fill-green' : 'snn-pipeline-fill-amber'} ${active ? 'is-active' : ''}`}
        />
        {active && (
          <span
            key={`pulse-${bumpKey}`}
            className="snn-pipeline-cluster-bar-pulse"
            aria-hidden
          />
        )}
      </div>
      <span className="snn-pipeline-cluster-count">
        {count}/{CLUSTER_TARGET}
        {active && !done && (
          <span className="snn-pipeline-tick-spinner snn-pipeline-tick-spinner--inline" aria-hidden />
        )}
      </span>
      {/* UX MEDIUM #2 (2026-05-25): TRAINED phase 영역 base-4 cluster 영역
          unique hue dot (6 distinct hue mod-6). ART expansion 영역 5+
          cluster 영역 hue dot 영역 표시 X (HIGH #1 정합 — base-4 grid 영역
          만 highlight). aria-hidden: dot 영역 redundant decoration — row
          label 영역 cluster 식별 1차 source. */}
      {showHueDot && (
        <span
          ref={hueDotRef}
          className="snn-pipeline-cluster-hue-dot"
          aria-hidden
          title={`cluster ${clusterIdx + 1} identity`}
        />
      )}
    </div>
  );
}
