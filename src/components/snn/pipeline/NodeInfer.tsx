'use client';

// NodeInfer — winner cluster + margin + cluster mean + winner timeline + WTA tie 사실.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source — PipelineEventContext 영역 위임.
// UX 4th HIGH 정정: neuron-firing 직접 구독 영역 — context consumer 영역 영역.

import { useEffect, useRef, useState } from 'react';
import {
  onBackendEvent,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { CLUSTER_TO_LABEL } from '@/lib/snn/use-hand-control';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { CLUSTER_LABELS, SATURATION_HZ } from './shared';

export default function NodeInfer() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  // Online/offline detection — MediaPipe-only badge 표시 catch path.
  // SSR 영역 typeof navigator undefined → default true (online assume).
  const [online, setOnline] = useState<boolean>(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const setOn = () => setOnline(true);
    const setOff = () => setOnline(false);
    window.addEventListener('online', setOn);
    window.addEventListener('offline', setOff);
    return () => {
      window.removeEventListener('online', setOn);
      window.removeEventListener('offline', setOff);
    };
  }, []);

  // PipelineEventContext 영역 derived winner — 4 노드 영역 공유 영역 정합.
  const { winner } = usePipelineEvents();
  const saturated = winner.clusterRates.every((v) => v >= SATURATION_HZ);

  // history 영역 winner cluster 변경 시점 영역 누적 (last 10).
  const lastClusterRef = useRef<number | null>(null);
  useEffect(() => {
    if (winner.cluster === null) return;
    if (winner.cluster === lastClusterRef.current) return;
    lastClusterRef.current = winner.cluster;
    setHistory((h) => [...h.slice(-9), winner.cluster!]);
  }, [winner.cluster]);

  const pname = phase?.phase ?? 'untrained';
  const trained = pname === 'trained' || pname === 'inference';
  const max = Math.max(...winner.clusterRates, 1);
  const winnerLabel = winner.cluster !== null ? CLUSTER_TO_LABEL[winner.cluster] : null;
  const confPct = (winner.confidence * 100).toFixed(0);

  return (
    <NodeShell title="INFER" subtitle="추론 상세" tone="infer">

      {!online && (
        <div className="snn-pipeline-warn">
          ⚠ MediaPipe only — offline (SNN 영역 0, 학습 진행 0)
        </div>
      )}
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
            : (winner.clusterRates.some((v) => v > 0) ? 'WTA tie' : '—')}
        </span>
      </div>
      <div className="snn-pipeline-rate-grid">
        {winner.clusterRates.map((r, i) => (
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
      {saturated && (
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
