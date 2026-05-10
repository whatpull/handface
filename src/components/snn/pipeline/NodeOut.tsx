'use client';

// NodeOut — winner cluster (orientation/gesture) + RenameButton + cluster count.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source — PipelineEventContext 영역 위임.
// UX 4th HIGH 정정: neuron-firing 직접 구독 영역 — context consumer 일부.
//
// 사용자 catch 2026-05-09 [1]:
//   - conf/margin row 영역 제거 (NodeInfer 중복 — winner row + margin meter 영역 정합).
//   - Export JSON button 영역 제거 (학술 record schema 영역 약 — follow-up 영역 강화).
//   - cluster count 영역 8-OUT 합산 (out_{ci}_0 ~ out_{ci}_7) — cluster broadcast
//     supervisor 정합 (QA MEDIUM-3, N3 cluster_train_supervised path).

import { useEffect, useMemo, useRef, useState } from 'react';
import { onBackendEvent, type InputModeDetail } from '@/lib/backend/events';
import {
  loadExemplars,
  subscribeExemplars,
  setExemplarLabel,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import type { SubstrateKind } from '@/lib/snn/root-local-snn';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { getClusterLabel } from './shared';

// 사용자 catch 2026-05-09 (Fix 1): inputMode 영역 substrate kind mapping —
// GRID = orientation, CAMERA = gesture. out-exemplars store 영역 segregation
// 정합 (substrate isolation root cause 정정).
function substrateForInputMode(mode: 'grid' | 'camera'): SubstrateKind {
  return mode === 'camera' ? 'gesture' : 'orientation';
}

// 8 OUT per cluster — N3 cluster broadcast supervisor 정합 (out_{ci}_0 ~ out_{ci}_7).
const OUT_PER_CLUSTER = 8;

/**
 * cluster ci 영역 count 합산:
 *   - 우선: out_{ci}_0 ~ out_{ci}_7 sum (N3 cluster broadcast supervisor 정합).
 *   - fallback: out_{ci} (legacy single-OUT exemplar) — 8-OUT slot 영역 0 영역 시점.
 */
function sumClusterCount(exemplars: OutExemplars, ci: number): number {
  let sum = 0;
  for (let n = 0; n < OUT_PER_CLUSTER; n += 1) {
    sum += exemplars[`out_${ci}_${n}`]?.count ?? 0;
  }
  if (sum === 0) {
    // legacy fallback — single out_{ci} key (old snapshot 영역).
    sum = exemplars[`out_${ci}`]?.count ?? 0;
  }
  return sum;
}

/**
 * cluster ci 영역 label 영역 — 8-OUT 영역 첫 비-null label 우선,
 * fallback out_{ci}, fallback default cluster label.
 */
function resolveClusterLabel(
  exemplars: OutExemplars,
  ci: number,
  inputMode: 'grid' | 'camera',
): string {
  for (let n = 0; n < OUT_PER_CLUSTER; n += 1) {
    const lbl = exemplars[`out_${ci}_${n}`]?.label;
    if (lbl) return lbl;
  }
  const legacy = exemplars[`out_${ci}`]?.label;
  if (legacy) return legacy;
  return getClusterLabel(ci, inputMode);
}

export default function NodeOut() {
  // 사용자 catch 2026-05-09: GRID / CAMERA mode 별 cluster label 표시.
  const [inputMode, setInputMode] = useState<'grid' | 'camera'>('grid');
  // 사용자 catch 2026-05-09 (Fix 1): substrate-aware exemplar load —
  // GRID(orientation) / CAMERA(gesture) 영역 별도 store. inputMode swap 영역
  // store 영역 reload 영역 carry-over 회피.
  const substrate = useMemo<SubstrateKind>(() => substrateForInputMode(inputMode), [inputMode]);
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars(substrate));

  useEffect(() => {
    setExemplars(loadExemplars(substrate));
    return subscribeExemplars(substrate, setExemplars);
  }, [substrate]);
  useEffect(() => onBackendEvent<InputModeDetail>('input-mode', (d) => setInputMode(d.mode)), []);

  // PipelineEventContext 영역 derived winner — 4 노드 영역 공유 영역 정합.
  const { winner } = usePipelineEvents();

  const winnerKey = winner.cluster !== null ? `out_${winner.cluster}_0` : null;
  const winnerEx = winnerKey ? exemplars[winnerKey] : undefined;
  const winnerLabel = winner.cluster !== null
    ? (winnerEx?.label || getClusterLabel(winner.cluster, inputMode))
    : null;

  return (
    <NodeShell title="OUT" subtitle="결과값" tone="out">

      <div className="snn-pipeline-out-winner">
        {winnerLabel ? (
          <RenameButton
            outKey={winnerKey!}
            substrate={substrate}
            label={winnerLabel}
            hasLabel={!!winnerEx?.label}
          />
        ) : (
          <span className="snn-pipeline-out-winner-empty">—</span>
        )}
      </div>
      <div className="snn-pipeline-out-counts">
        {[0, 1, 2, 3].map((ci) => {
          const count = sumClusterCount(exemplars, ci);
          const label = resolveClusterLabel(exemplars, ci, inputMode);
          return (
            <div key={ci} className="snn-pipeline-out-count-row">
              <span className="snn-pipeline-out-count-label">{label}</span>
              <span className="snn-pipeline-out-count-value">{count}</span>
            </div>
          );
        })}
      </div>
    </NodeShell>
  );
}

function RenameButton({ outKey, substrate, label, hasLabel }:
  { outKey: string; substrate: SubstrateKind; label: string; hasLabel: boolean }) {
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
    setExemplarLabel(outKey, substrate, t.length === 0 ? null : t);
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
