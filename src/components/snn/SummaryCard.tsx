'use client';

// SummaryCard — dashboard panel (사용자 명시 [UI/UX 40%]: 이미지 1 reference 정합).
//
// 3 카드:
//   1. CLUSTERS  — trained / 4 (cluster_frames target=30 도달 카운트)
//   2. ACCURACY  — winner margin × 100% (winner cluster 영역 confidence proxy)
//   3. FIRINGS   — neuron-firing 누적 frame 카운트 (세션 영역)
//
// 정직 한계 박음:
//  - "ACCURACY" 영역 strict 정확도 영역 — labelled validation set 영역 영역 영역 0. 본 값 영역
//    winner margin (max - 2nd) / max 영역 — confidence proxy 영역 영역 정합 catch.
//    영역 영역 catch: ValidationPanel 영역 a-e key supervised 정합 시 별도 acc 영역 가능.
//  - FIRINGS 영역 PipelineEventProvider mount 영역 누적 — view toggle 영역 0 reset 영역 가능.
//  - delta (+71.8% 영역 sample 영역 영역) 영역 영역 — 본 프로젝트 영역 영역 직전 frame 영역
//    delta 영역 영역 영역 영역 catch (학습 진행 영역 ↑ / cluster lock 영역 +).

import { useEffect, useState } from 'react';
import { onBackendEvent, type TrainingPhaseDetail } from '@/lib/backend/events';
import { usePipelineEvents } from './pipeline/PipelineEventContext';
import { CLUSTER_TARGET } from './pipeline/shared';

export default function SummaryCard() {
  // training phase 영역 cluster trained 카운트 영역 derive.
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);

  const { winner, lastFiringTimestamp } = usePipelineEvents();

  // firings 누적 — provider mount 영역 카운트.
  const [firings, setFirings] = useState(0);
  useEffect(() => {
    if (lastFiringTimestamp !== null) setFirings((n) => n + 1);
  }, [lastFiringTimestamp]);

  const trainedCount = phase
    ? Object.values(phase.clusterFrames).filter((f) => f >= (phase.target || CLUSTER_TARGET)).length
    : 0;

  const accuracy = winner.cluster !== null ? Math.round(winner.margin * 1000) / 10 : 0;
  const accuracyDeltaCls = accuracy >= 50 ? 'is-up' : accuracy >= 20 ? 'is-warn' : 'is-down';

  const phaseTag = phase?.phase || 'untrained';

  return (
    <div className="snn-summary-cards" aria-label="HandFace pipeline summary">
      <article className="snn-summary-card snn-summary-card--cyan">
        <div className="snn-summary-card-label">Clusters</div>
        <div className="snn-summary-card-value">{trainedCount}/4</div>
        <div className={`snn-summary-card-delta ${trainedCount === 4 ? 'is-up' : 'is-warn'}`}>
          {trainedCount === 4 ? 'TRAINED' : `${4 - trainedCount} pending`}
        </div>
      </article>
      <article className="snn-summary-card snn-summary-card--amber">
        <div className="snn-summary-card-label">Margin</div>
        <div className="snn-summary-card-value">{accuracy.toFixed(1)}%</div>
        <div className={`snn-summary-card-delta ${accuracyDeltaCls}`}>
          {winner.cluster !== null ? `→ C${winner.cluster}` : 'no winner'}
        </div>
      </article>
      <article className="snn-summary-card snn-summary-card--violet">
        <div className="snn-summary-card-label">Frames</div>
        <div className="snn-summary-card-value">{firings.toLocaleString()}</div>
        <div className="snn-summary-card-delta is-up">{phaseTag}</div>
      </article>
    </div>
  );
}
