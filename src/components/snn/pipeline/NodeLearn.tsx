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
} from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';
import {
  GESTURE_LABEL_TO_CLUSTER,
  GESTURE_CONFIDENCE_MIN,
  GESTURE_STABLE_FRAMES,
} from '@/lib/snn/use-hand-control';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { CLUSTER_LABELS, CLUSTER_TARGET } from './shared';

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
  const [regionTotals, setRegionTotals] = useState<{ V1: number; V2: number }>({ V1: 0, V2: 0 });
  const [regionActive, setRegionActive] = useState<{ V1: number; V2: number }>({ V1: 0, V2: 0 });
  const [regionFired, setRegionFired] = useState<{ V1: boolean; V2: boolean }>({ V1: false, V2: false });
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

  // 1회 snapshot — V1/V2 neuron 총개수.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await getClient().getFullSnapshot();
      if (cancelled || !r.ok) return;
      const counts = { V1: 0, V2: 0 };
      for (const n of r.data.neurons || []) {
        const region = (n.region as 'V1' | 'V2' | undefined) || inferRegion(n.name || '');
        if (region === 'V1' || region === 'V2') counts[region] += 1;
      }
      setRegionTotals(counts);
    })();
    return () => { cancelled = true; };
  }, []);

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

  // 진행 중 cluster — count 가 가장 적고 < TARGET 인 cluster (사용자 안내 영역).
  const activeCluster = useMemo(() => {
    if (!phase) return -1;
    const incomplete: Array<{ ci: number; n: number }> = [];
    for (let ci = 0; ci < 4; ci++) {
      const n = phase.clusterFrames[ci as 0|1|2|3];
      if (n < CLUSTER_TARGET) incomplete.push({ ci, n });
    }
    if (incomplete.length === 0) return -1;
    incomplete.sort((a, b) => b.n - a.n); // 가장 진행도 높은 미완 cluster 영역 우선 안내.
    return incomplete[0].ci;
  }, [phase]);

  const phaseInfo = useMemo(() => {
    const p = phase?.phase ?? 'untrained';
    const activeLabel = activeCluster >= 0 ? CLUSTER_LABELS[activeCluster] : '';
    const activeCount = activeCluster >= 0 && phase ? phase.clusterFrames[activeCluster as 0|1|2|3] : 0;
    const config: Record<string, { label: string; tone: string; sub: string; hint: string }> = {
      untrained: {
        label: 'UNTRAINED',
        tone: 'idle',
        sub: 'awaiting teacher (N=5 stable + conf ≥ 0.6)',
        hint: '카메라에 4개 자세를 보여주세요 — Pointing / Open palm / Fist / Victory',
      },
      learning: {
        label: 'LEARNING',
        tone: 'amber',
        sub: 'batch supervised — capturing frames',
        hint: activeLabel
          ? `${activeLabel} 자세를 유지하세요 (${activeCount}/${CLUSTER_TARGET})`
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
        hint: '실시간 추론 — 자세를 보여주세요',
      },
    };
    return config[p];
  }, [phase, activeCluster]);

  // teacher 라인 — 사용자 catch 2026-05-07: stable count visible.
  // mappable + conf 통과 시 [N/5 stable] suffix → 학습 trigger 임박 사실 catch.
  const teacherInfo = useMemo(() => {
    if (!teacher) return { line: 'no signal', mappable: false, ready: false };
    if (!teacher.hasHand) return { line: 'no hand', mappable: false, ready: false };
    const name = teacher.gestureName || 'none';
    const conf = teacher.gestureScore ?? 0;
    const mappable = !!teacher.gestureName && GESTURE_LABEL_TO_CLUSTER[teacher.gestureName] !== undefined;
    const ready = mappable && conf >= GESTURE_CONFIDENCE_MIN && stableCount >= GESTURE_STABLE_FRAMES;
    const stableSuffix = mappable && conf >= GESTURE_CONFIDENCE_MIN
      ? ` [${stableCount}/${GESTURE_STABLE_FRAMES} stable]`
      : '';
    return { line: `${name} (${(conf * 100).toFixed(0)}%)${stableSuffix}`, mappable, ready };
  }, [teacher, stableCount]);

  const stripActive = regionFired.V1 || regionFired.V2;
  const phaseTone = phaseInfo.tone;
  const isLearning = phaseTone === 'amber' || phaseTone === 'orange';

  return (
    <NodeShell title="LEARN" subtitle="진행상황" tone="learn">

      {/* V1/V2 cortical region strip — 학습 substrate cascade.
          INPUT/OUT region 영역 INPUT/OUT 노드 영역 정합 → 위쪽 row 폐기 → 본 위치 흡수. */}
      <div className="snn-pipeline-learn-region-strip" aria-label="V1/V2 cortical cascade">
        <RegionStripBox region="V1" total={regionTotals.V1} active={regionActive.V1} fired={regionFired.V1} />
        <div
          className={`snn-pipeline-learn-region-arrow ${stripActive ? 'is-active' : ''}`}
          aria-hidden
        >
          <svg viewBox="0 0 32 12" width="32" height="12">
            <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1.4" />
            <polyline points="22,2 28,6 22,10" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </div>
        <RegionStripBox region="V2" total={regionTotals.V2} active={regionActive.V2} fired={regionFired.V2} />
      </div>
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
        {[0, 1, 2, 3].map((i) => {
          const count = phase ? phase.clusterFrames[i as 0|1|2|3] : 0;
          const done = count >= CLUSTER_TARGET;
          const active = i === activeCluster && isLearning;
          return (
            <ClusterRow
              key={i}
              label={CLUSTER_LABELS[i]}
              count={count}
              done={done}
              active={active}
              capturingPulse={active ? capturingPulse : 0}
            />
          );
        })}
      </div>
      <div className="snn-pipeline-row">
        <span className="snn-pipeline-row-label">teacher</span>
        <span className={`snn-pipeline-row-value ${teacherInfo.ready ? 'is-stable-ready' : ''}`}>
          {teacherInfo.line}
        </span>
      </div>
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

function RegionStripBox({ region, total, active, fired }:
  { region: 'V1' | 'V2'; total: number; active: number; fired: boolean }) {
  const tone = region.toLowerCase();
  return (
    <div
      className={`snn-pipeline-learn-region-box snn-pipeline-learn-region-box--${tone} ${fired ? 'is-fired' : ''}`}
      aria-label={`${region} region — ${active} of ${total} active`}
    >
      <span className="snn-pipeline-learn-region-label">{region}</span>
      <span className="snn-pipeline-learn-region-counts">
        <span className="snn-pipeline-learn-region-active">{active}</span>
        <span className="snn-pipeline-learn-region-sep">/</span>
        <span className="snn-pipeline-learn-region-total">{total}</span>
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
