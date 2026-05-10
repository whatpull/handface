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
  onBackendEvent,
  type HandFeatureDetail,
  type TrainingPhaseDetail,
  type InputModeDetail,
  type GridTrainingDetail,
} from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';
import {
  GESTURE_LABEL_TO_CLUSTER,
  GESTURE_CONFIDENCE_MIN,
  GESTURE_STABLE_FRAMES,
} from '@/lib/snn/use-hand-control';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { onLiveTick, type LiveTickDetail } from '@/lib/snn/live-snn';
import {
  getRootLocalSnnFor,
  subscribeLocalSnnInitState,
  getLastLocalSnnInitState,
  type SubstrateKind,
  type LocalSnnInitState,
} from '@/lib/snn/root-local-snn';
import { N13Pools } from '@/lib/snn-runtime';
import {
  loadExemplars,
  subscribeExemplars,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { CLUSTER_TARGET, getClusterLabel, resolveClusterLabel } from './shared';

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

export default function NodeLearn() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [teacher, setTeacher] = useState<HandFeatureDetail | null>(null);
  const [delta, setDelta] = useState({ ltp: 0, ltd: 0, changed: 0 });
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
  const [inputMode, setInputMode] = useState<'camera' | 'grid'>('grid');
  const [gridProgress, setGridProgress] = useState<GridProgress>(INITIAL_GRID_PROGRESS);

  useEffect(() => onBackendEvent<InputModeDetail>('input-mode', (d) => setInputMode(d.mode)), []);

  // 사용자 catch 2026-05-09 [2] (Fix 4): substrate-aware init state subscribe —
  // engineMode='live' + inputMode 영역 substrate kind 영역 sync. mount 영역 cache
  // fallback (event miss 회피) + ongoing init event subscribe.
  useEffect(() => {
    if (!isLiveMode) {
      setInitState(null);
      return;
    }
    const kind: SubstrateKind = inputMode === 'camera' ? 'gesture' : 'orientation';
    setInitState(getLastLocalSnnInitState(kind));
    return subscribeLocalSnnInitState((state) => {
      if (state.kind === kind) setInitState(state);
    });
  }, [isLiveMode, inputMode]);
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

  // 사용자 catch 2026-05-07: teacher stable 카운트 — use-hand-control 내부 ref 비공개,
  // 본 컴포넌트 자체로 동일 logic 재현 (gesture name 연속 + conf >= GESTURE_CONFIDENCE_MIN).
  // "Open_Palm 72% [3/5 stable]" 형식 시각 피드백 — 학습 진행 사실 catch 강화.
  const [stableCount, setStableCount] = useState<number>(0);
  const lastNameRef = useRef<string | null>(null);

  // 학습 batch supervised 진행 시점 표시 — clusterFrames 변경 영역 1500ms pulse trigger.
  // 사용자 catch: 학습 진행 사실 영역 시각 catch 강화 — capturing 도중 활성 cluster bar 강 pulse.
  const [capturingPulse, setCapturingPulse] = useState<number>(0); // increment counter (key change for re-trigger).
  const prevClusterFramesRef = useRef<{ 0: number; 1: number; 2: number; 3: number } | null>(null);

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

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
    setTeacher(d);
    // teacher stability tracking — use-hand-control 정합.
    const gName = d.gestureName ?? null;
    const gScore = d.gestureScore ?? 0;
    const mappable = gName !== null && GESTURE_LABEL_TO_CLUSTER[gName] !== undefined;
    if (mappable && gScore >= GESTURE_CONFIDENCE_MIN) {
      if (gName === lastNameRef.current) {
        setStableCount((c) => Math.min(c + 1, GESTURE_STABLE_FRAMES));
      } else {
        lastNameRef.current = gName;
        setStableCount(1);
      }
    } else {
      lastNameRef.current = null;
      setStableCount(0);
    }
  }), []);

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
  useEffect(() => {
    if (engineMode === 'live') {
      // V1 = V1_L4E + V1_L4I + V1_L23E (excitatory + inhibitory pool 모두 표시).
      // V2 = V2_L4E + V2_L23E + V2_L5E.
      const v1Total = N13Pools.V1_L4E + N13Pools.V1_L4I + N13Pools.V1_L23E;
      const v2Total = N13Pools.V2_L4E + N13Pools.V2_L23E + N13Pools.V2_L5E;
      setRegionTotals({ V1: v1Total, V2: v2Total });

      // mount-time prebuild — input-mode default 'grid' = orientation substrate.
      // input-mode 변경 시 별도 effect 영역 substrate kind 갱신 + 재 prebuild.
      const kind: SubstrateKind = inputMode === 'camera' ? 'gesture' : 'orientation';
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
  }, [engineMode, inputMode]);

  // PipelineEventContext 영역 lastDetail 영역 — neuron-firing 영역 단일 source.
  const { lastDetail } = usePipelineEvents();

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
  }, [lastDetail]);

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
    if (inputMode === 'grid') return gridProgress.activeCluster ?? -1;
    if (!phase) return -1;
    const incomplete: Array<{ ci: number; n: number }> = [];
    for (let ci = 0; ci < 4; ci++) {
      const n = phase.clusterFrames[ci as 0|1|2|3];
      if (n < CLUSTER_TARGET) incomplete.push({ ci, n });
    }
    if (incomplete.length === 0) return -1;
    incomplete.sort((a, b) => b.n - a.n); // 가장 진행도 높은 미완 cluster 우선 안내.
    return incomplete[0].ci;
  }, [inputMode, gridProgress.activeCluster, phase]);

  // mode 별 effective phase / clusterFrames — render 흐름 단일화.
  // PR audit fix (Fix 5 — LOW): react-hooks/exhaustive-deps warning 정정 —
  // conditional derived value 영역 useMemo 래핑 영역 deps reference stability
  // 보장 (직전 phase?.clusterFrames default-fallback object 영역 매 render
  // 새 reference catch — phaseInfo useMemo 영역 매 render invalidate).
  const effectivePhase = inputMode === 'grid' ? gridPhase : (phase?.phase ?? 'untrained');
  const effectiveClusterFrames = useMemo(
    () => (inputMode === 'grid' ? gridClusterFrames : (phase?.clusterFrames ?? { 0: 0, 1: 0, 2: 0, 3: 0 })),
    [inputMode, gridClusterFrames, phase?.clusterFrames],
  );

  // PR-K (사용자 catch 2026-05-09 catch 2): cluster label 영역 OUT exemplar
  // 영역 사용자 명명 영역 우선 + fallback '패턴 N' (resolveClusterLabel 정합).
  // substrate-aware exemplar subscribe (NodeOut mirror) — 사용자 RenameButton
  // 영역 명명 영역 NodeLearn 영역 즉시 sync.
  const substrate: SubstrateKind = inputMode === 'camera' ? 'gesture' : 'orientation';
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars(substrate));
  useEffect(() => {
    setExemplars(loadExemplars(substrate));
    return subscribeExemplars(substrate, setExemplars);
  }, [substrate]);
  const clusterLabels = useMemo(() => {
    // dynamic length — exemplars 영역 max cluster id ↑ + base 4 (n13 default).
    let n = 4;
    for (const k of Object.keys(exemplars)) {
      const m = /^out_(\d+)_\d+$/.exec(k);
      if (m) {
        const ci = Number(m[1]) + 1;
        if (ci > n) n = ci;
      }
    }
    return Array.from({ length: n }, (_, i) => resolveClusterLabel(exemplars, i, inputMode));
  }, [exemplars, inputMode]);

  const phaseInfo = useMemo(() => {
    const p = effectivePhase;
    const activeLabel = activeCluster >= 0 ? getClusterLabel(activeCluster, inputMode) : '';
    const activeCount = activeCluster >= 0 ? effectiveClusterFrames[activeCluster as 0|1|2|3] : 0;
    const config: Record<string, { label: string; tone: string; sub: string; hint: string }> = {
      untrained: {
        label: 'UNTRAINED',
        tone: 'idle',
        sub: 'awaiting input — grid preset 학습 또는 camera teacher',
        // 사용자 catch 2026-05-09 (3 신규 catch): hint glyph (─│╲╱) 영역 본격
        // 제거 — visual minimalism 정합. cluster N pattern label 영역 INPUT 노드
        // 영역 표시 catch — hint 영역 short instruction only.
        hint: 'INPUT 노드에서 4 패턴을 학습시키세요',
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
        label: '✓ TRAINED — frozen',
        tone: 'green',
        sub: '4 clusters locked · weight permanent',
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
  }, [effectivePhase, activeCluster, effectiveClusterFrames, inputMode]);

  // teacher 라인 — 사용자 catch 2026-05-07: stable count visible.
  // mappable + conf 통과 시 [N/5 stable] suffix → 학습 trigger 임박 사실 catch.
  // 사용자 catch 2026-05-07: 매핑 안 된 자세 (예: Thumb_Up) 시 명시 hint 추가.
  const teacherInfo = useMemo(() => {
    if (!teacher) return { line: 'no signal', mappable: false, ready: false };
    if (!teacher.hasHand) return { line: 'no hand', mappable: false, ready: false };
    const name = teacher.gestureName || 'none';
    const conf = teacher.gestureScore ?? 0;
    const mappable = !!teacher.gestureName && GESTURE_LABEL_TO_CLUSTER[teacher.gestureName] !== undefined;
    const ready = mappable && conf >= GESTURE_CONFIDENCE_MIN && stableCount >= GESTURE_STABLE_FRAMES;
    if (!mappable && teacher.gestureName) {
      // camera teacher 매핑 안 된 자세 — Pointing_Up / Open_Palm / Closed_Fist
      // / Victory 만 cluster id 로 mapping 가능. grid 입력은 매핑 무관.
      return { line: `${name} ⚠ 미매핑 — 4 자세만 학습`, mappable: false, ready: false };
    }
    const stableSuffix = mappable && conf >= GESTURE_CONFIDENCE_MIN
      ? ` [${stableCount}/${GESTURE_STABLE_FRAMES} stable]`
      : '';
    return { line: `${name} (${(conf * 100).toFixed(0)}%)${stableSuffix}`, mappable, ready };
  }, [teacher, stableCount]);

  const stripActive = regionFired.V1 || regionFired.V2;
  const phaseTone = phaseInfo.tone;
  const isLearning = phaseTone === 'amber' || phaseTone === 'orange';

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
        <LiveLearnPanel tick={liveTick} clusterLabels={clusterLabels} initState={initState} />
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
            </div>
            <div className="snn-pipeline-phase-sub">{phaseInfo.sub}</div>
          </div>
          <div className="snn-pipeline-hint">{phaseInfo.hint}</div>
          <div className="snn-pipeline-cluster-list">
            {Array.from({ length: clusterLabels.length }, (_, i) => i).map((i) => {
              // PR-K (Phase 4, 2026-05-09): dynamic cluster length —
              // effectiveClusterFrames 영역 base 4 cluster (n13 default) 영역
              // catch 영역 신규 ART expansion cluster 영역 frame=0 fallback.
              const count = i < 4 ? effectiveClusterFrames[i as 0|1|2|3] : 0;
              const done = count >= CLUSTER_TARGET;
              const active = i === activeCluster && isLearning;
              return (
                <ClusterRow
                  key={i}
                  label={clusterLabels[i] ?? `패턴 ${i + 1}`}
                  count={count}
                  done={done}
                  active={active}
                  capturingPulse={active ? capturingPulse : 0}
                />
              );
            })}
          </div>
        </>
      )}
      {!isLiveMode && inputMode === 'camera' && (
        <div className="snn-pipeline-row">
          <span className="snn-pipeline-row-label">teacher</span>
          <span className={`snn-pipeline-row-value ${teacherInfo.ready ? 'is-stable-ready' : ''}`}>
            {teacherInfo.line}
          </span>
        </div>
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
      {!isLiveMode && inputMode === 'grid' && gridProgress.lastError && (
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
    </NodeShell>
  );
}

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
}: {
  tick: LiveTickDetail | null;
  clusterLabels: readonly string[];
  initState: LocalSnnInitState | null;
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
  const dbHint = useMemo(() => {
    if (!initState) return null;
    if (initState.phase === 'fresh') {
      return 'fresh circuit — 학습 가중치 0 (추론 결과 unreliable)';
    }
    const ageMs = Date.now() - initState.savedAt;
    const ageStr = formatAge(ageMs);
    return `hydrated — 마지막 학습 ${ageStr} 전 (rev ${initState.rev})`;
  }, [initState]);

  if (!tick) {
    return (
      <>
        <div className="snn-pipeline-phase snn-pipeline-phase--idle snn-pipeline-phase-transition">
          <div
            className={`snn-pipeline-phase-label${
              initState?.phase === 'fresh' ? ' snn-pipeline-phase-label--fresh' : ''
            }`}
          >
            {initState?.phase === 'fresh'
              ? 'LIVE — awaiting first input (학습 0회)'
              : initState?.phase === 'hydrated'
                ? 'LIVE — hydrated (이전 학습 복원됨)'
                : 'LIVE — awaiting'}
          </div>
          <div className="snn-pipeline-phase-sub">패턴 입력 대기 — INPUT 노드에서 패턴을 그리세요</div>
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
  const winnerLabel = tick.winner >= 0 && tick.winner < clusterLabels.length
    ? clusterLabels[tick.winner]
    : null;
  const phaseTone = tick.patternActive ? 'amber' : 'idle';
  // PR-K (사용자 catch 2026-05-09 catch 3): fresh state winner emerge misleading
  // 정정 — fresh build (trial=0 영역 trained_clusters 0) 시점 영역 winner card
  // 영역 hide. n13 INPUT→V1_L4_E weight 11.0 base activation 영역 학술 정합 단
  // UI 영역 winner emerge misleading (사용자 mental model 영역 학습 0 영역
  // winner 영역 표시 영역 noise). Phase block 영역 'awaiting first input' 영역
  // 명시 + winner cluster 영역 hide.
  const isUntrustworthy = initState?.phase === 'fresh' && tick.trial === 0;
  const hideWinner = isUntrustworthy;
  return (
    <>
      <div
        key={`live-${tick.patternActive ? 'on' : 'off'}`}
        className={`snn-pipeline-phase snn-pipeline-phase--${phaseTone} snn-pipeline-phase-transition`}
      >
        <div className="snn-pipeline-phase-label">
          {hideWinner
            ? 'LIVE — awaiting first input (fresh, 학습 0회)'
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
          {hideWinner
            ? 'tap 추론 → 자동 30회 학습 후 winner 표시'
            : (
              <>
                학습 #{tick.trial} · {winnerLabel
                  ? `winner ${winnerLabel} · margin ${(tick.margin * 100).toFixed(0)}%`
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
        {/* PR-K (Phase 4 + Phase 5): dynamic cluster bar — tick.rates length
            영역 ART expansion 시점 영역 신규 cluster 표시. fresh state 영역
            cluster bar 영역 hide (winner emerge misleading 회피). */}
        {!hideWinner && tick.rates.map((rate, i) => (
          <LiveRateRow
            key={i}
            label={clusterLabels[i] ?? `패턴 ${i + 1}`}
            rate={rate}
            max={max}
            isWinner={tick.winner === i}
          />
        ))}
      </div>
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

function LiveRateRow({ label, rate, max, isWinner }:
  { label: string; rate: number; max: number; isWinner: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      const pct = max > 0 ? Math.min(100, (rate / max) * 100) : 0;
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [rate, max]);
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
      <span className="snn-pipeline-cluster-count snn-pipeline-mono">
        {rate.toFixed(0)}Hz
      </span>
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

function ClusterRow({ label, count, done, active = false, capturingPulse = 0 }:
  { label: string; count: number; done: boolean; active?: boolean; capturingPulse?: number }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
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
  return (
    <div className={`snn-pipeline-cluster-row ${active ? 'is-active' : ''} ${done ? 'is-done-row' : ''}`}>
      <span className={`snn-pipeline-cluster-label ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}>
        {done ? '✓ ' : (active ? '▸ ' : '')}{label}
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
    </div>
  );
}
