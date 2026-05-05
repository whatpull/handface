'use client';

// PipelineCanvas — 5-node 본격 redesign 영역 메인 컴포넌트.
//
// 사용자 영역 명시 본격 design:
//   INPUT (제스처) → Learn (진행상황) → Infer (추론) → OUT (결과값) → LLM (외부)
//
// 본 파일 영역 책임 (정직 한계 박음):
//  - 5 노드 horizontal layout 영역 표시 (drawflow 영역 미사용 — 5 고정 박스 영역 overkill).
//  - INPUT: HandTrackerHost 영역 mount 영역 selector (#snn-cam-video / #snn-cam-skel /
//    .snn-feat-bars) 영역 보존. MediaPipe gesture name + conf 표시.
//  - Learn: 5-phase + 4 cluster progress + Δw 합계 + teacher.
//  - Infer: winner cluster + margin + cluster mean + winner timeline + WTA tie 사실.
//  - OUT: winner label (✎ rename) + count + export JSON.
//  - LLM: endpoint URL + API key + payload preview + test send + auto stream toggle.
//
// useHandControl(autoLive=true, autoCapture=true) 영역 본 파일 영역 직접 호출 →
// CameraQuickControls 영역 의존 0 (Pipeline view 영역 standalone 영역 작동).
//
// 정직 한계 박음:
//  - View 토글 영역 시점 영역 컴포넌트 remount → useHandControl 영역 cluster buffer
//    영역 reset 영역 가능 (loop closure 영역 새로 시작). 학습 진행 영역 localStorage
//    영역 영구화 영역 보존 사실.
//  - LLM auto stream 영역 winner 변경 시점 영역 1회 POST. endpoint 영역 CORS / rate
//    limit 영역 사용자 환경 영역.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  onBackendEvent,
  type NeuronFiringDetail,
  type HandFeatureDetail,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { useHandControl, CLUSTER_TO_LABEL } from '@/lib/snn/use-hand-control';
import {
  loadExemplars,
  subscribeExemplars,
  setExemplarLabel,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import {
  buildStatePayload,
  type StatePayload,
  type WinnerHistoryEntry,
} from '@/lib/snn/state-payload';
import {
  loadLlmConfig,
  saveLlmConfig,
  sendStateToLlm,
  type LlmConfig,
  type LlmSendResult,
} from '@/lib/snn/llm-client';
import { FEATURE_LABELS } from '@/lib/mediapipe/feature-encoder';

interface Props {
  cameraConnected: boolean;
}

const CLUSTER_TARGET = 30;
const CLUSTER_LABELS = ['Pointing', 'Open palm', 'Fist', 'Victory'] as const;
const SATURATION_HZ = 400;
const WINNER_MARGIN = 0.10;
const HISTORY_MAX = 32;

export default function PipelineCanvas({ cameraConnected }: Props) {
  // useHandControl 영역 본 파일 영역 driver — Pipeline view 영역 standalone.
  const ctrl = useHandControl(cameraConnected, true, true);

  return (
    <div className="snn-pipeline">
      <div className="snn-pipeline-flow">
        <NodeInput cameraConnected={cameraConnected} />
        <Arrow />
        <NodeLearn />
        <Arrow />
        <NodeInfer />
        <Arrow />
        <NodeOut />
        <Arrow />
        <NodeLlm ctrl={ctrl} />
      </div>
      {ctrl.trainStatus && (
        <div className="snn-pipeline-toast">{ctrl.trainStatus}</div>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <div className="snn-pipeline-arrow" aria-hidden>
      <svg viewBox="0 0 32 16" width="32" height="16">
        <line x1="0" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="1.4" />
        <polyline points="22,3 28,8 22,13" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    </div>
  );
}

// ───────────────────────────────────────────────────────── INPUT ─────────────
function NodeInput({ cameraConnected }: { cameraConnected: boolean }) {
  const [feat, setFeat] = useState<HandFeatureDetail | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  // feature 막대 ref — HandTrackerHost 영역 .snn-feat-bars 영역 selector 로 직접 갱신.

  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => setFeat(d));
    return off;
  }, []);

  // tooltip 부여 — bars 영역 mount 후 1회.
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>('.snn-pipeline-input .snn-feat-bar');
    bars.forEach((bar, i) => { bar.title = FEATURE_LABELS[i] || `feat ${i}`; });
  }, []);

  const gestureLine = feat
    ? (feat.hasHand
        ? (feat.gestureName ? `${feat.gestureName} (${((feat.gestureScore || 0) * 100).toFixed(0)}%)` : 'no gesture')
        : 'no hand')
    : (cameraConnected ? 'starting…' : 'camera off');

  return (
    <NodeShell title="INPUT" subtitle="제스처 입력" tone="input"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      <div className="snn-pipeline-input">
        <div className="snn-pipeline-cam">
          <video id="snn-cam-video" className="snn-camera-mirror snn-cam-video" playsInline muted />
          <canvas id="snn-cam-skel" className="snn-camera-mirror snn-cam-skel" width={640} height={480} />
          <div id="snn-cam-empty" className="snn-pipeline-cam-empty">
            <div>Camera disabled</div>
            <div className="snn-pipeline-cam-hint">Enable from sidebar</div>
          </div>
        </div>
        <div className="snn-pipeline-row">
          <span className="snn-pipeline-row-label">gesture</span>
          <span className="snn-pipeline-row-value">{gestureLine}</span>
        </div>
        <div className="snn-pipeline-feat-wrap">
          <div className="snn-pipeline-feat-title">16-dim feature</div>
          <div className="snn-feat-bars snn-pipeline-feat-bars">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="snn-feat-bar" data-i={i}>
                <div className="snn-feat-bar-fill" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </NodeShell>
  );
}

// ───────────────────────────────────────────────────────── LEARN ─────────────
function NodeLearn() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [teacher, setTeacher] = useState<HandFeatureDetail | null>(null);
  const [delta, setDelta] = useState({ ltp: 0, ltd: 0, changed: 0 });
  const [collapsed, setCollapsed] = useState(false);
  const prevWeights = useRef<Map<string, number>>(new Map());

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', setTeacher), []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      let ltp = 0, ltd = 0, changed = 0;
      const cache = prevWeights.current;
      const ch = d.synapses_changed;
      if (ch && ch.length > 0) {
        for (const s of ch) {
          const dw = s.delta;
          if (Math.abs(dw) >= 0.1) {
            changed += 1;
            if (dw > 0) ltp += dw; else ltd += dw;
          }
          cache.set(`${s.pre}->${s.post}`, s.weight);
        }
      } else {
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

  const phaseInfo = useMemo(() => {
    const p = phase?.phase ?? 'untrained';
    const config: Record<string, { label: string; tone: string; sub: string }> = {
      untrained: { label: 'UNTRAINED', tone: 'idle', sub: 'awaiting teacher (N=5 stable + conf ≥ 0.85)' },
      learning:  { label: 'LEARNING',  tone: 'amber', sub: 'batch supervised — capturing frames' },
      partial:   { label: 'PARTIAL',   tone: 'orange', sub: 'some clusters trained — others rejected' },
      trained:   { label: '✓ TRAINED', tone: 'green', sub: '4 clusters locked · weight permanent' },
      inference: { label: 'INFERENCE', tone: 'blue', sub: 'STDP off · cluster mean readout' },
    };
    return config[p];
  }, [phase]);

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
      <div className="snn-pipeline-cluster-list">
        {[0, 1, 2, 3].map((i) => {
          const count = phase ? phase.clusterFrames[i as 0|1|2|3] : 0;
          const done = count >= CLUSTER_TARGET;
          return <ClusterRow key={i} label={CLUSTER_LABELS[i]} count={count} done={done} />;
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

function ClusterRow({ label, count, done }: { label: string; count: number; done: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      const pct = Math.min(100, (count / CLUSTER_TARGET) * 100);
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [count]);
  return (
    <div className="snn-pipeline-cluster-row">
      <span className={`snn-pipeline-cluster-label ${done ? 'is-done' : ''}`}>
        {done ? '✓ ' : ''}{label}
      </span>
      <div className="snn-pipeline-cluster-bar">
        <div
          ref={fillRef}
          className={`snn-mode-progress-fill ${done ? 'snn-pipeline-fill-green' : 'snn-pipeline-fill-amber'}`}
        />
      </div>
      <span className="snn-pipeline-cluster-count">{count}/{CLUSTER_TARGET}</span>
    </div>
  );
}

// ───────────────────────────────────────────────────────── INFER ─────────────
function NodeInfer() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [winner, setWinner] = useState<{
    cluster: number | null;
    rates: number[];
    confidence: number;
    margin: number;
    saturated: boolean;
  }>({ cluster: null, rates: [0, 0, 0, 0], confidence: 0, margin: 0, saturated: false });
  const [history, setHistory] = useState<number[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const out = d.out_rates || {};
      const sum = [0, 0, 0, 0];
      const cnt = [0, 0, 0, 0];
      for (const [k, v] of Object.entries(out)) {
        const m = /^out_(\d+)(?:_\d+)?$/.exec(k);
        if (!m) continue;
        const ci = Number(m[1]);
        if (ci >= 0 && ci < 4) { sum[ci] += v; cnt[ci] += 1; }
      }
      const mean = sum.map((s, i) => cnt[i] > 0 ? s / cnt[i] : 0);
      const sorted = mean.map((rate, ci) => ({ rate, ci })).sort((a, b) => b.rate - a.rate);
      const max = sorted[0].rate;
      const second = sorted[1]?.rate ?? 0;
      const margin = max > 0 ? (max - second) / max : 0;
      const cluster = max > 0 && margin >= WINNER_MARGIN ? sorted[0].ci : null;
      const saturated = mean.every((v) => v >= SATURATION_HZ);
      const total = mean.reduce((a, b) => a + b, 0);
      const confidence = total > 0 ? max / total : 0;
      setWinner({ cluster, rates: mean, confidence, margin, saturated });
      if (cluster !== null) {
        setHistory((h) => [...h.slice(-9), cluster]);
      }
    });
    return off;
  }, []);

  const pname = phase?.phase ?? 'untrained';
  const trained = pname === 'trained' || pname === 'inference';
  const max = Math.max(...winner.rates, 1);

  return (
    <NodeShell title="INFER" subtitle="추론 상세" tone="infer"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      {!trained && (
        <div className="snn-pipeline-note">
          추론 영역 — TRAINED 후만 작동 사실 (현재: {pname})
        </div>
      )}
      <div className="snn-pipeline-row">
        <span className="snn-pipeline-row-label">winner</span>
        <span className="snn-pipeline-row-value">
          {winner.cluster !== null
            ? `${CLUSTER_TO_LABEL[winner.cluster]} (margin ${(winner.margin * 100).toFixed(0)}%)`
            : (winner.rates.some((v) => v > 0) ? 'WTA tie' : '—')}
        </span>
      </div>
      <div className="snn-pipeline-rate-grid">
        {winner.rates.map((r, i) => (
          <RateBar key={i} label={CLUSTER_LABELS[i]} rate={r} max={max}
            isWinner={winner.cluster === i} />
        ))}
      </div>
      <div className="snn-pipeline-row">
        <span className="snn-pipeline-row-label">recent</span>
        <span className="snn-pipeline-row-value snn-pipeline-mono">
          {history.length === 0 ? '—' : history.map(spark).join('')}
        </span>
      </div>
      {winner.saturated && (
        <div className="snn-pipeline-warn">⚠ saturation — 모든 OUT ≥ {SATURATION_HZ}Hz</div>
      )}
    </NodeShell>
  );
}

function RateBar({ label, rate, max, isWinner }:
  { label: string; rate: number; max: number; isWinner: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      const pct = max > 0 ? (rate / max) * 100 : 0;
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [rate, max]);
  return (
    <div className={`snn-pipeline-rate-row ${isWinner ? 'is-winner' : ''}`}>
      <span className="snn-pipeline-rate-label">{label}</span>
      <div className="snn-pipeline-rate-bar">
        <div ref={fillRef} className="snn-mode-progress-fill snn-pipeline-fill-cyan" />
      </div>
      <span className="snn-pipeline-rate-value">{rate.toFixed(0)}</span>
    </div>
  );
}

function spark(ci: number): string {
  const chars = ['▁', '▃', '▅', '▇'];
  return chars[ci] || '?';
}

// ─────────────────────────────────────────────────────────── OUT ─────────────
function NodeOut() {
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars());
  const [winner, setWinner] = useState<{ cluster: number | null; confidence: number; margin: number }>(
    { cluster: null, confidence: 0, margin: 0 },
  );
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => subscribeExemplars(setExemplars), []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const out = d.out_rates || {};
      const sum = [0, 0, 0, 0];
      const cnt = [0, 0, 0, 0];
      for (const [k, v] of Object.entries(out)) {
        const m = /^out_(\d+)(?:_\d+)?$/.exec(k);
        if (!m) continue;
        const ci = Number(m[1]);
        if (ci >= 0 && ci < 4) { sum[ci] += v; cnt[ci] += 1; }
      }
      const mean = sum.map((s, i) => cnt[i] > 0 ? s / cnt[i] : 0);
      const sorted = mean.map((rate, ci) => ({ rate, ci })).sort((a, b) => b.rate - a.rate);
      const max = sorted[0].rate;
      const second = sorted[1]?.rate ?? 0;
      const margin = max > 0 ? (max - second) / max : 0;
      const total = mean.reduce((a, b) => a + b, 0);
      const cluster = max > 0 && margin >= WINNER_MARGIN ? sorted[0].ci : null;
      const confidence = total > 0 ? max / total : 0;
      setWinner({ cluster, confidence, margin });
    });
    return off;
  }, []);

  const winnerKey = winner.cluster !== null ? `out_${winner.cluster}_0` : null;
  const winnerEx = winnerKey ? exemplars[winnerKey] : undefined;
  const winnerLabel = winner.cluster !== null
    ? (winnerEx?.label || CLUSTER_TO_LABEL[winner.cluster] || `cluster ${winner.cluster}`)
    : null;

  const onExport = () => {
    const payload = {
      winner: winner.cluster !== null ? `cluster_${winner.cluster}` : null,
      winnerLabel,
      confidence: winner.confidence,
      margin: winner.margin,
      exemplars,
      timestamp: Date.now(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `handface-state-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <NodeShell title="OUT" subtitle="결과값" tone="out"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      <div className="snn-pipeline-out-winner">
        {winnerLabel ? (
          <RenameButton outKey={winnerKey!} label={winnerLabel} hasLabel={!!winnerEx?.label} />
        ) : (
          <span className="snn-pipeline-out-winner-empty">—</span>
        )}
      </div>
      <div className="snn-pipeline-row">
        <span className="snn-pipeline-row-label">conf</span>
        <span className="snn-pipeline-row-value snn-pipeline-mono">
          {(winner.confidence * 100).toFixed(0)}%
        </span>
      </div>
      <div className="snn-pipeline-row">
        <span className="snn-pipeline-row-label">margin</span>
        <span className="snn-pipeline-row-value snn-pipeline-mono">
          {(winner.margin * 100).toFixed(0)}%
        </span>
      </div>
      <div className="snn-pipeline-out-counts">
        {[0, 1, 2, 3].map((ci) => {
          const k0 = `out_${ci}_0`;
          const k1 = `out_${ci}`;
          const ex = exemplars[k0] || exemplars[k1];
          return (
            <div key={ci} className="snn-pipeline-out-count-row">
              <span className="snn-pipeline-out-count-label">
                {ex?.label || CLUSTER_TO_LABEL[ci] || `c${ci}`}
              </span>
              <span className="snn-pipeline-out-count-value">{ex?.count ?? 0}</span>
            </div>
          );
        })}
      </div>
      <button type="button" className="snn-pipeline-btn" onClick={onExport}>
        Export JSON
      </button>
    </NodeShell>
  );
}

function RenameButton({ outKey, label, hasLabel }:
  { outKey: string; label: string; hasLabel: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      setDraft(hasLabel ? label : '');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing, label, hasLabel]);

  const commit = () => {
    const t = draft.trim();
    setExemplarLabel(outKey, t.length === 0 ? null : t);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="snn-pipeline-out-input"
        value={draft}
        maxLength={32}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); commit(); }
          else if (e.key === 'Escape') { e.preventDefault(); setEditing(false); }
        }}
        placeholder="이름..."
      />
    );
  }
  return (
    <button
      type="button"
      className={`snn-pipeline-out-winner-btn ${hasLabel ? 'is-named' : ''}`}
      onClick={() => setEditing(true)}
      title="클릭 — 이름 변경"
    >
      <span>{label}</span>
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
        <path d="M2 10v-2l6-6 2 2-6 6H2z" stroke="currentColor" strokeWidth="1.2"
          fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────── LLM ─────────────
function NodeLlm({ ctrl }: { ctrl: ReturnType<typeof useHandControl> }) {
  const [cfg, setCfg] = useState<LlmConfig>(() => loadLlmConfig());
  const [collapsed, setCollapsed] = useState(false);
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [feat, setFeat] = useState<HandFeatureDetail | null>(null);
  const [winner, setWinner] = useState<{
    cluster: number | null;
    rates: number[];
    counts: number[];
    confidence: number;
    margin: number;
  }>({ cluster: null, rates: [0, 0, 0, 0], counts: [0, 0, 0, 0], confidence: 0, margin: 0 });
  const [history, setHistory] = useState<WinnerHistoryEntry[]>([]);
  const [last, setLast] = useState<LlmSendResult | null>(null);
  const [busy, setBusy] = useState(false);

  // 직전 winner 영역 추적 — 변경 시점만 auto stream POST.
  const prevWinnerRef = useRef<number | null>(null);

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', setFeat), []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const out = d.out_rates || {};
      const sum = [0, 0, 0, 0];
      const cnt = [0, 0, 0, 0];
      for (const [k, v] of Object.entries(out)) {
        const m = /^out_(\d+)(?:_\d+)?$/.exec(k);
        if (!m) continue;
        const ci = Number(m[1]);
        if (ci >= 0 && ci < 4) { sum[ci] += v; cnt[ci] += 1; }
      }
      const mean = sum.map((s, i) => cnt[i] > 0 ? s / cnt[i] : 0);
      const sorted = mean.map((rate, ci) => ({ rate, ci })).sort((a, b) => b.rate - a.rate);
      const max = sorted[0].rate;
      const second = sorted[1]?.rate ?? 0;
      const margin = max > 0 ? (max - second) / max : 0;
      const cluster = max > 0 && margin >= WINNER_MARGIN ? sorted[0].ci : null;
      const total = mean.reduce((a, b) => a + b, 0);
      const confidence = total > 0 ? max / total : 0;
      setWinner({ cluster, rates: mean, counts: cnt, confidence, margin });
    });
    return off;
  }, []);

  // history 영역 winner 변경 시점 영역 누적.
  useEffect(() => {
    if (winner.cluster === null) {
      prevWinnerRef.current = null;
      return;
    }
    if (winner.cluster === prevWinnerRef.current) return;
    prevWinnerRef.current = winner.cluster;
    const ex = loadExemplars();
    const k0 = `out_${winner.cluster}_0`;
    const k1 = `out_${winner.cluster}`;
    const label = ex[k0]?.label ?? ex[k1]?.label ?? CLUSTER_TO_LABEL[winner.cluster];
    const entry: WinnerHistoryEntry = {
      winner: `cluster_${winner.cluster}`,
      label,
      confidence: winner.confidence,
      ts: Date.now(),
    };
    setHistory((h) => [...h.slice(-(HISTORY_MAX - 1)), entry]);
  }, [winner.cluster, winner.confidence]);

  const phaseName = phase?.phase ?? 'untrained';
  const clusterCounts = useMemo(() => {
    if (!phase) return [0, 0, 0, 0];
    return [phase.clusterFrames[0], phase.clusterFrames[1], phase.clusterFrames[2], phase.clusterFrames[3]];
  }, [phase]);

  const buildPayload = (): StatePayload => buildStatePayload({
    phase: phaseName,
    winnerCluster: winner.cluster,
    confidence: winner.confidence,
    margin: winner.margin,
    clusterRates: winner.rates,
    clusterCounts,
    history,
    gestureName: feat?.gestureName ?? null,
    gestureScore: feat?.gestureScore ?? 0,
  });

  const onTest = async () => {
    if (busy) return;
    setBusy(true);
    const r = await sendStateToLlm(cfg, buildPayload());
    setLast(r);
    setBusy(false);
  };

  // Auto stream — winner 변경 시점만 POST (cfg.auto && endpoint 영역 정합).
  useEffect(() => {
    if (!cfg.auto) return;
    if (!cfg.endpoint) return;
    if (winner.cluster === null) return;
    let cancelled = false;
    (async () => {
      const r = await sendStateToLlm(cfg, buildPayload());
      if (!cancelled) setLast(r);
    })();
    return () => { cancelled = true; };
    // history 영역 useEffect 영역 winner.cluster 영역 변경 시점 영역 1회 영역.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.auto, cfg.endpoint, winner.cluster]);

  const updateCfg = (patch: Partial<LlmConfig>) => {
    setCfg((p) => {
      const next = { ...p, ...patch };
      saveLlmConfig(patch);
      return next;
    });
  };

  // payload preview — 직접 build (live). dep 영역 string 영역 stringify 영역 단순화.
  const clusterCountsKey = clusterCounts.join(',');
  const previewJson = useMemo(() => {
    try {
      return JSON.stringify(buildPayload(), null, 2);
    } catch { return '{}'; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseName, winner.cluster, winner.rates, winner.confidence, winner.margin,
      clusterCountsKey, history.length, feat?.gestureName, feat?.gestureScore]);

  return (
    <NodeShell title="LLM" subtitle="외부 연동" tone="llm"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      <label className="snn-pipeline-field">
        <span className="snn-pipeline-field-label">endpoint</span>
        <input
          type="url"
          className="snn-pipeline-input-field"
          value={cfg.endpoint}
          placeholder="https://..."
          onChange={(e) => updateCfg({ endpoint: e.target.value })}
        />
      </label>
      <label className="snn-pipeline-field">
        <span className="snn-pipeline-field-label">api key</span>
        <input
          type="password"
          className="snn-pipeline-input-field"
          value={cfg.apiKey}
          placeholder="(optional)"
          onChange={(e) => updateCfg({ apiKey: e.target.value })}
        />
      </label>
      <label className="snn-pipeline-toggle">
        <input
          type="checkbox"
          checked={cfg.auto}
          onChange={(e) => updateCfg({ auto: e.target.checked })}
        />
        <span>auto stream (winner 변경 시 POST)</span>
      </label>
      <details className="snn-pipeline-details">
        <summary>payload preview</summary>
        <pre className="snn-pipeline-pre">{previewJson}</pre>
      </details>
      <button
        type="button"
        className="snn-pipeline-btn"
        onClick={onTest}
        disabled={busy || !cfg.endpoint}
      >
        {busy ? 'sending…' : 'Test send'}
      </button>
      {last && (
        <div className={`snn-pipeline-llm-result ${last.ok ? 'is-ok' : 'is-fail'}`}>
          <div className="snn-pipeline-row">
            <span className="snn-pipeline-row-label">status</span>
            <span className="snn-pipeline-row-value snn-pipeline-mono">
              {last.ok ? `${last.status}` : (last.error || `HTTP ${last.status}`)}
              {' · '}
              {last.latencyMs}ms
            </span>
          </div>
          {last.body && (
            <details className="snn-pipeline-details">
              <summary>response</summary>
              <pre className="snn-pipeline-pre">{last.body}</pre>
            </details>
          )}
        </div>
      )}
      {/* ctrl 영역 reference 영역 영역 정합 — phase 영역 driver 영역 useHandControl 영역. */}
      <div className="snn-pipeline-llm-ctrl-hint">
        {ctrl.busy ? `(driver: ${ctrl.busy})` : null}
      </div>
    </NodeShell>
  );
}

// ─────────────────────────────────────────────────── Shared shell ─────────────
interface NodeShellProps {
  title: string;
  subtitle: string;
  tone: string;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}
function NodeShell({ title, subtitle, tone, collapsed, onToggle, children }: NodeShellProps) {
  return (
    <section className={`snn-pipeline-node snn-pipeline-node--${tone}`}>
      <header className="snn-pipeline-node-header">
        <button
          type="button"
          className="snn-pipeline-node-toggle"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'expand' : 'collapse'}
        >
          <span className="snn-pipeline-node-title">{title}</span>
          <span className="snn-pipeline-node-sub">{subtitle}</span>
          <span className="snn-pipeline-node-caret">{collapsed ? '▸' : '▾'}</span>
        </button>
      </header>
      {!collapsed && <div className="snn-pipeline-node-body">{children}</div>}
    </section>
  );
}
