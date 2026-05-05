'use client';

// PipelineCanvas — 5-node redesign 메인 컴포넌트 (grid layout 부활 2026-05-05).
//
// 사용자 명시 design:
//   INPUT (제스처) → Learn (진행상황) → Infer (추론) → OUT (결과값) → LLM (외부)
//
// 본 파일 책임:
//  - 5 노드 horizontal grid layout 표시 (drawflow / ReactFlow 미사용 — 5 고정 박스 overkill).
//  - useHandControl(autoLive=true, autoCapture=true) 본 파일 직접 호출 →
//    별도 카메라 토글 컴포넌트 의존 0 (Pipeline view standalone 작동).
//  - PipelineEventProvider single neuron-firing listener — 5 child node
//    context 공유 (winner / clusterRates / activeByRegion / margin).
//  - training-phase listener 단일 — phase / arrow flow 산출.
//  - 5 노드 component ./pipeline/Node*.tsx 분리 (758 line monolithic 해소).
//
// 정직 한계 (rollback 정합):
//  - View 토글 시점 컴포넌트 remount → useHandControl cluster buffer
//    reset 가능 (loop closure 새로 시작). 학습 진행 localStorage 영구화 보존.
//  - LLM auto stream winner 변경 시점 1회 POST. endpoint CORS / rate
//    limit 사용자 환경.
//  - 노드 drag / position 편집 0 — grid layout 정합 (편집 가능 노드 별도 turn).

import { useEffect, useState } from 'react';
import {
  onBackendEvent,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { useHandControl } from '@/lib/snn/use-hand-control';
import { type LlmSendResult } from '@/lib/snn/llm-client';
import NodeInput from './pipeline/NodeInput';
import NodeLearn from './pipeline/NodeLearn';
import NodeInfer from './pipeline/NodeInfer';
import NodeOut from './pipeline/NodeOut';
import NodeLlm from './pipeline/NodeLlm';
import Arrow from './pipeline/Arrow';
import SummaryCard from './SummaryCard';
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
  // useHandControl 본 파일 driver — Pipeline view standalone.
  const ctrl = useHandControl(cameraConnected, true);

  // training-phase 본 파일 단일 listener (neuron-firing PipelineEventProvider 위임).
  const [phase, setPhase] = useState<string>('untrained');
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setPhase(d.phase);
  }), []);

  // winnerCluster + lastFiringTimestamp context 추출 — flow active + segment trigger 산출.
  const { winnerCluster, lastFiringTimestamp } = usePipelineEvents();

  const flowActive = winnerCluster !== null && (phase === 'trained' || phase === 'inference');
  const learnActive = phase === 'learning' || phase === 'partial';
  const phaseClass = `is-phase-${phase}`;

  // segment별 active state — 4 connector 발화 시점 trigger 1500ms 유지 (drawflow fired class 정합).
  // seg 0 (INPUT→LEARN): neuron-firing — pattern inject 시점 (lastFiringTimestamp 변화).
  // seg 1 (LEARN→INFER): cluster training 진행 시 (learnActive true 동안 firing 갱신 시).
  // seg 2 (INFER→OUT): winnerCluster 변화 — 추론 결정 시점.
  // seg 3 (OUT→LLM): winnerCluster 변화 — label render 후 LLM payload 송신 (300ms delay).
  const [segActive, setSegActive] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const ACTIVE_MS = 1500;

  // seg 0 — INPUT→LEARN: firing active.
  useEffect(() => {
    if (lastFiringTimestamp === null) return;
    setSegActive((p) => [true, p[1], p[2], p[3]]);
    const t = setTimeout(() => setSegActive((p) => [false, p[1], p[2], p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp]);

  // seg 1 — LEARN→INFER: learning/partial phase + firing 갱신 시.
  useEffect(() => {
    if (lastFiringTimestamp === null || !learnActive) return;
    setSegActive((p) => [p[0], true, p[2], p[3]]);
    const t = setTimeout(() => setSegActive((p) => [p[0], false, p[2], p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp, learnActive]);

  // seg 2 — INFER→OUT: winnerCluster 변화 + flowActive.
  useEffect(() => {
    if (winnerCluster === null || !flowActive) return;
    setSegActive((p) => [p[0], p[1], true, p[3]]);
    const t = setTimeout(() => setSegActive((p) => [p[0], p[1], false, p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [winnerCluster, flowActive]);

  // seg 3 — OUT→LLM: winnerCluster 변화 300ms delay 후 trigger (label render 후 송신).
  useEffect(() => {
    if (winnerCluster === null || !flowActive) return;
    let innerT: ReturnType<typeof setTimeout> | null = null;
    const delay = setTimeout(() => {
      setSegActive((p) => [p[0], p[1], p[2], true]);
      innerT = setTimeout(() => setSegActive((p) => [p[0], p[1], p[2], false]), ACTIVE_MS);
    }, 300);
    return () => {
      clearTimeout(delay);
      if (innerT) clearTimeout(innerT);
    };
  }, [winnerCluster, flowActive]);

  // LLM transient toast — Test send 성공/실패 일시 표시 (auto fade).
  const [llmToast, setLlmToast] = useState<{ kind: 'ok' | 'fail'; msg: string } | null>(null);
  useEffect(() => {
    if (!llmToast) return;
    const t = setTimeout(() => setLlmToast(null), 3500);
    return () => clearTimeout(t);
  }, [llmToast]);

  const onLlmResult = (r: LlmSendResult) => setLlmToast({
    kind: r.ok ? 'ok' : 'fail',
    msg: r.ok ? `LLM POST ok · ${r.status} · ${r.latencyMs}ms` : `LLM fail · ${r.error || `HTTP ${r.status}`}`,
  });

  return (
    <div
      className={`snn-pipeline ${phaseClass} ${flowActive ? 'is-flowing' : ''} ${learnActive ? 'is-learning' : ''}`}
      aria-label="HandFace SNN pipeline"
    >
      {/* Summary dashboard row — pipeline-flow 위쪽 stack. mobile (≤900) hide. */}
      <div className="snn-pipeline-dashboard">
        <SummaryCard />
      </div>
      {/* 5 node × 4 arrow grid (desktop) / vertical flex (mobile) — grid 부활 2026-05-05. */}
      <div className="snn-pipeline-flow">
        <NodeInput cameraConnected={cameraConnected} />
        <Arrow active={segActive[0]} segment={0} />
        <NodeLearn />
        <Arrow active={segActive[1]} segment={1} />
        <NodeInfer />
        <Arrow active={segActive[2]} segment={2} />
        <NodeOut />
        <Arrow active={segActive[3]} segment={3} />
        <NodeLlm onLlmResult={onLlmResult} />
      </div>
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
