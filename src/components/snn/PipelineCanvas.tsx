'use client';

// PipelineCanvas — 5-node 본격 redesign 영역 메인 컴포넌트 (분리 사실 후 thin shell).
//
// 사용자 영역 명시 본격 design:
//   INPUT (제스처) → Learn (진행상황) → Infer (추론) → OUT (결과값) → LLM (외부)
//
// 본 파일 영역 책임 (정직 한계 박음):
//  - 5 노드 horizontal layout 영역 표시 (drawflow 영역 미사용 — 5 고정 박스 영역 overkill).
//  - useHandControl(autoLive=true, autoCapture=true) 영역 본 파일 영역 직접 호출 →
//    별도 카메라 토글 컴포넌트 의존 0 (Pipeline view 영역 standalone 영역 작동).
//    (CameraQuickControls 컴포넌트는 영구 폐기됨 — Pipeline view 통합)
//  - PipelineEventProvider 영역 영역 single neuron-firing listener — 5 child node
//    영역 context 영역 winner / clusterRates / activeByRegion / margin 공유 (UX 4th
//    HIGH 정정 — 4 중복 catch 제거).
//  - training-phase listener 영역 본 파일 영역 단일 — phase / arrow flow 영역 hoist.
//  - 5 노드 영역 component 영역 ./pipeline/Node*.tsx 영역 분리 (758 line monolithic 영역 해소).
//
// 정직 한계 박음:
//  - View 토글 영역 시점 영역 컴포넌트 remount → useHandControl 영역 cluster buffer
//    영역 reset 영역 가능 (loop closure 영역 새로 시작). 학습 진행 영역 localStorage
//    영역 영구화 영역 보존 사실.
//  - LLM auto stream 영역 winner 변경 시점 영역 1회 POST. endpoint 영역 CORS / rate
//    limit 영역 사용자 환경 영역.
//  - PipelineEventProvider 영역 영역 listener 1회 등록 — 5 child 영역 context 구독 영역
//    추가 listener 0. 직전 6 listener (PipelineCanvas 1 + child 5) 영역 1 영역 (-83%).

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
  // useHandControl 영역 본 파일 영역 driver — Pipeline view 영역 standalone.
  const ctrl = useHandControl(cameraConnected, true, true);

  // training-phase 영역 본 파일 영역 단일 listener (neuron-firing 영역 PipelineEventProvider 영역).
  const [phase, setPhase] = useState<string>('untrained');
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setPhase(d.phase);
  }), []);

  // winnerCluster 영역 context 영역 추출 — flow active 산출 영역 영역 사용.
  const { winnerCluster } = usePipelineEvents();

  const flowActive = winnerCluster !== null && (phase === 'trained' || phase === 'inference');
  const learnActive = phase === 'learning' || phase === 'partial';
  const phaseClass = `is-phase-${phase}`;

  // LLM transient toast — Test send 영역 success/error 영역 일시 표시 (auto fade).
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
      {/* Summary dashboard row — PipelineCanvas 영역 위쪽 row 영역 separate dashboard
          (사용자 명시 [UI/UX 40%]: 이미지 1 정합 + OUT 박스 inside mount 박음 폐기).
          static block 영역 — pipeline-flow 영역 위쪽 stack 영역. mobile (≤900) 영역 hide. */}
      <div className="snn-pipeline-dashboard">
        <SummaryCard />
      </div>
      {/* Region cascade row 폐기 — INPUT/OUT region 영역 INPUT/OUT 노드 영역 중복.
          V1/V2 cortical region 영역 LEARN 노드 내부 영역 inline strip 영역 표시
          (NodeLearn.tsx — LearnRegionStrip). */}
      <div className="snn-pipeline-flow">
        <NodeInput cameraConnected={cameraConnected} />
        <Arrow active={learnActive || flowActive} segment={0} />
        <NodeLearn />
        <Arrow active={flowActive} segment={1} />
        <NodeInfer />
        <Arrow active={flowActive} segment={2} />
        <NodeOut />
        <Arrow active={flowActive} segment={3} />
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
