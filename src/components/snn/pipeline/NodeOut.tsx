'use client';

// NodeOut — winner gesture + RenameButton + Export JSON.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source.

import { useEffect, useRef, useState } from 'react';
import { onBackendEvent, type NeuronFiringDetail } from '@/lib/backend/events';
import { CLUSTER_TO_LABEL } from '@/lib/snn/use-hand-control';
import {
  loadExemplars,
  subscribeExemplars,
  setExemplarLabel,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import { deriveWinner } from '@/lib/snn/winner-derivation';
import NodeShell from './NodeShell';
import { WINNER_MARGIN, initialCollapsedForMobile } from './shared';

export default function NodeOut({ winnerCluster }: { winnerCluster: number | null }) {
  void winnerCluster; // 영역 정합 — 내부 winner 영역 직접 catch.
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars());
  const [winner, setWinner] = useState<{ cluster: number | null; confidence: number; margin: number }>(
    { cluster: null, confidence: 0, margin: 0 },
  );
  const [collapsed, setCollapsed] = useState(initialCollapsedForMobile);

  useEffect(() => subscribeExemplars(setExemplars), []);

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
      setWinner({ cluster: w.cluster, confidence: w.confidence, margin: w.margin });
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
        aria-label="winner cluster label"
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
      aria-label={`rename ${label}`}
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
