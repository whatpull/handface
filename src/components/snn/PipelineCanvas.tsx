'use client';

// PipelineCanvas — @xyflow/react 기반 편집 가능한 5-node 캔버스 (2026-05-05 사용자 mandatory).
//
// 직전 grid layout (Arrow 4개 + Node 5개 grid-template-columns) 폐기 →
// PipelineFlow.tsx 영역 ReactFlow 캔버스 위임. 5 custom node + 4 fixed edge + drag 가능 +
// position localStorage 영구화 + 발화 active glow.
//
// 본 파일 책임:
//  - useHandControl 영역 직접 호출 (Pipeline view standalone 작동).
//  - PipelineEventProvider 영역 wrap — 5 child 노드 영역 단일 listener 공유.
//  - training-phase listener 영역 단일 — phase class 영역 wrapper hoist.
//  - PipelineFlow 영역 ReactFlow 위임 — 5 node + 4 edge + drag + active edge glow.
//  - LLM toast (Test send 결과) + train status toast.
//
// 정직 한계:
//  - ReactFlow 캔버스 영역 mobile (≤900) 영역 default zoom 0.85 영역 fitView 영역 자동 fit.
//  - 사용자 가 노드 위치 변경 시 localStorage 영역 영구 보존 — drag end 시점 1회 save.
//  - active glow 영역 PipelineFlow 영역 내부 처리 (winnerCluster + lastFiringTimestamp).

import { useCallback, useEffect, useState } from 'react';
import {
  onBackendEvent,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { useHandControl } from '@/lib/snn/use-hand-control';
import { type LlmSendResult } from '@/lib/snn/llm-client';
import SummaryCard from './SummaryCard';
import PipelineFlow from './pipeline/PipelineFlow';
import {
  PipelineEventProvider,
  usePipelineEvents,
} from './pipeline/PipelineEventContext';

interface Props {
  cameraConnected: boolean;
}

export default function PipelineCanvas({ cameraConnected }: Props) {
  return (
    <PipelineEventProvider>
      <PipelineCanvasInner cameraConnected={cameraConnected} />
    </PipelineEventProvider>
  );
}

function PipelineCanvasInner({ cameraConnected }: Props) {
  // useHandControl — driver. autoCapture=true (LEARN/INFER 노드 모두 active).
  const ctrl = useHandControl(cameraConnected, true);

  // training-phase 영역 본 파일 단일 listener (neuron-firing 영역 PipelineEventProvider 영역).
  const [phase, setPhase] = useState<string>('untrained');
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setPhase(d.phase);
  }), []);

  // winnerCluster 영역 wrapper 영역 phase class 산출 — 발화 active 영역 PipelineFlow 영역 위임.
  const { winnerCluster } = usePipelineEvents();
  const flowActive = winnerCluster !== null && (phase === 'trained' || phase === 'inference');
  const learnActive = phase === 'learning' || phase === 'partial';
  const phaseClass = `is-phase-${phase}`;

  // LLM transient toast — Test send 성공/실패 일시 표시 (auto fade 3.5s).
  const [llmToast, setLlmToast] = useState<{ kind: 'ok' | 'fail'; msg: string } | null>(null);
  useEffect(() => {
    if (!llmToast) return;
    const t = setTimeout(() => setLlmToast(null), 3500);
    return () => clearTimeout(t);
  }, [llmToast]);

  // useCallback — PipelineFlow 영역 onLlmResult prop 영역 stable reference 영역 노드 array 재계산 0.
  const onLlmResult = useCallback((r: LlmSendResult) => setLlmToast({
    kind: r.ok ? 'ok' : 'fail',
    msg: r.ok ? `LLM POST ok · ${r.status} · ${r.latencyMs}ms` : `LLM fail · ${r.error || `HTTP ${r.status}`}`,
  }), []);

  return (
    <div
      className={`snn-pipeline ${phaseClass} ${flowActive ? 'is-flowing' : ''} ${learnActive ? 'is-learning' : ''}`}
      aria-label="HandFace SNN pipeline"
    >
      {/* Summary dashboard row — pipeline-flow 위쪽 stack. mobile (≤900) hide. */}
      <div className="snn-pipeline-dashboard">
        <SummaryCard />
      </div>
      {/* ReactFlow 캔버스 — 5 node + 4 edge + drag + active glow + localStorage 영구화. */}
      <PipelineFlow cameraConnected={cameraConnected} onLlmResult={onLlmResult} />
      {ctrl.trainStatus && (
        <div className="snn-pipeline-toast" role="status" aria-live="polite">
          {ctrl.trainStatus}
        </div>
      )}
      {llmToast && (
        <div
          className={`snn-pipeline-toast snn-pipeline-toast--${llmToast.kind}`}
          role="status"
          aria-live="polite"
        >
          {llmToast.msg}
        </div>
      )}
    </div>
  );
}
