'use client';

// NodeInfer — winner cluster + margin + cluster mean + winner timeline + WTA tie 사실.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source 영역 위임.

import { useEffect, useRef, useState } from 'react';
import {
  onBackendEvent,
  type NeuronFiringDetail,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { CLUSTER_TO_LABEL } from '@/lib/snn/use-hand-control';
import { deriveWinner } from '@/lib/snn/winner-derivation';
import NodeShell from './NodeShell';
import { CLUSTER_LABELS, SATURATION_HZ, WINNER_MARGIN, initialCollapsedForMobile } from './shared';

export default function NodeInfer({ winnerCluster }: { winnerCluster: number | null }) {
  void winnerCluster; // 영역 정합 — 내부 winner 영역 직접 catch.
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [winner, setWinner] = useState<{
    cluster: number | null;
    rates: number[];
    confidence: number;
    margin: number;
    saturated: boolean;
  }>({ cluster: null, rates: [0, 0, 0, 0], confidence: 0, margin: 0, saturated: false });
  const [history, setHistory] = useState<number[]>([]);
  const [collapsed, setCollapsed] = useState(initialCollapsedForMobile);

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      // HIGH #3 정정: deriveWinner 영역 단일 source 영역 위임.
      // Backend cluster_rates / winner 영역 우선 활용 (B+3 combo 정합).
      const w = deriveWinner(d.out_rates || {}, {
        marginThreshold: WINNER_MARGIN,
        clusterRates: d.cluster_rates,
        winnerCluster: d.winner_cluster,
        winnerMargin: d.winner_margin,
      });
      const saturated = w.clusterRates.every((v) => v >= SATURATION_HZ);
      setWinner({
        cluster: w.cluster,
        rates: w.clusterRates,
        confidence: w.confidence,
        margin: w.margin,
        saturated,
      });
      if (w.cluster !== null) {
        setHistory((h) => [...h.slice(-9), w.cluster!]);
      }
    });
    return off;
  }, []);

  const pname = phase?.phase ?? 'untrained';
  const trained = pname === 'trained' || pname === 'inference';
  const max = Math.max(...winner.rates, 1);
  const winnerLabel = winner.cluster !== null ? CLUSTER_TO_LABEL[winner.cluster] : null;
  const confPct = (winner.confidence * 100).toFixed(0);

  return (
    <NodeShell title="INFER" subtitle="추론 상세" tone="infer"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      {!trained && (
        <div className="snn-pipeline-note">
          추론 영역 — TRAINED 후만 작동 사실 (현재: {pname})
        </div>
      )}
      {trained && (
        <div className={`snn-pipeline-current ${winnerLabel ? 'is-active' : ''}`}>
          <div className="snn-pipeline-current-label">현재 자세</div>
          <div className="snn-pipeline-current-value">
            {winnerLabel ? `${winnerLabel} (${confPct}%)` : '—'}
          </div>
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
