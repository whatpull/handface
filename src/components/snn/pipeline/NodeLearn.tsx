'use client';

// NodeLearn — 학습 진행상황.
// 5-phase + 4 cluster progress + Δw 합계 + teacher 표시.
// HIGH #4 정정 보존: synapses_changed 우선 + d.synapses diff fallback.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  onBackendEvent,
  type NeuronFiringDetail,
  type HandFeatureDetail,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import NodeShell from './NodeShell';
import { CLUSTER_LABELS, CLUSTER_TARGET } from './shared';

export default function NodeLearn() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [teacher, setTeacher] = useState<HandFeatureDetail | null>(null);
  const [delta, setDelta] = useState({ ltp: 0, ltd: 0, changed: 0 });
  const [collapsed, setCollapsed] = useState(true);
  const prevWeights = useRef<Map<string, number>>(new Map());

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', setTeacher), []);

  useEffect(() => {
    // HIGH #4 정정: synapses_changed (backend Δw list) 우선 — 첫 frame 영역 정합.
    // backend 영역 synapses_changed 영역 emit 영역 — 본 path 영역 첫 frame 영역
    // 학습 사실 catch 사실 (delta.delta 영역 직접 제공 영역).
    // Fallback (d.synapses 영역 diff) 영역 baseline cache only — 첫 호출 시
    // prev === undefined → 첫 frame 영역 Δw = 0 표시 (baseline cache only).
    // 직후 frame 영역 정상 catch 사실. 정직 한계 박음: backend synapses_changed
    // 영역 미emit 영역 영역 첫 frame 영역 학습 사실 0 표시 회피 0.
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      let ltp = 0, ltd = 0, changed = 0;
      const cache = prevWeights.current;
      const ch = d.synapses_changed;
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
        const syn = d.synapses || [];
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
    });
    return off;
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
        sub: 'awaiting teacher (N=5 stable + conf ≥ 0.85)',
        hint: '카메라 영역 4개 자세 영역 보이세요 — Pointing / Open palm / Fist / Victory',
      },
      learning: {
        label: 'LEARNING',
        tone: 'amber',
        sub: 'batch supervised — capturing frames',
        hint: activeLabel
          ? `${activeLabel} 자세 영역 유지하세요 (${activeCount}/${CLUSTER_TARGET})`
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
        hint: '학습 완료 — Infer 영역 winner 영역 catch 사실',
      },
      inference: {
        label: 'INFERENCE',
        tone: 'blue',
        sub: 'STDP off · cluster mean readout',
        hint: '실시간 추론 영역 — 자세 영역 보이세요',
      },
    };
    return config[p];
  }, [phase, activeCluster]);

  const teacherLine = useMemo(() => {
    if (!teacher) return 'no signal';
    if (!teacher.hasHand) return 'no hand';
    const name = teacher.gestureName || 'none';
    const conf = teacher.gestureScore ?? 0;
    return `${name} (${(conf * 100).toFixed(0)}%)`;
  }, [teacher]);

  return (
    <NodeShell title="LEARN" subtitle="진행상황" tone="learn"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      <div className={`snn-pipeline-phase snn-pipeline-phase--${phaseInfo.tone}`}>
        <div className="snn-pipeline-phase-label">{phaseInfo.label}</div>
        <div className="snn-pipeline-phase-sub">{phaseInfo.sub}</div>
      </div>
      <div className="snn-pipeline-hint">{phaseInfo.hint}</div>
      <div className="snn-pipeline-cluster-list">
        {[0, 1, 2, 3].map((i) => {
          const count = phase ? phase.clusterFrames[i as 0|1|2|3] : 0;
          const done = count >= CLUSTER_TARGET;
          const active = i === activeCluster && (phaseInfo.tone === 'amber' || phaseInfo.tone === 'orange');
          return <ClusterRow key={i} label={CLUSTER_LABELS[i]} count={count} done={done} active={active} />;
        })}
      </div>
      <div className="snn-pipeline-row">
        <span className="snn-pipeline-row-label">teacher</span>
        <span className="snn-pipeline-row-value">{teacherLine}</span>
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

function ClusterRow({ label, count, done, active = false }:
  { label: string; count: number; done: boolean; active?: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
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
      <div className="snn-pipeline-cluster-bar">
        <div
          ref={fillRef}
          className={`snn-mode-progress-fill ${done ? 'snn-pipeline-fill-green' : 'snn-pipeline-fill-amber'} ${active ? 'is-active' : ''}`}
        />
      </div>
      <span className="snn-pipeline-cluster-count">{count}/{CLUSTER_TARGET}</span>
    </div>
  );
}
