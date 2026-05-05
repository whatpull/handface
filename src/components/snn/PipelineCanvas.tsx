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
//  - 단일 listener (training-phase / neuron-firing) 영역 flow state hoist —
//    arrow 영역 active 영역 정합.
//  - 5 노드 영역 component 영역 ./pipeline/Node*.tsx 영역 분리 (758 line monolithic 영역 해소).
//
// 정직 한계 박음:
//  - View 토글 영역 시점 영역 컴포넌트 remount → useHandControl 영역 cluster buffer
//    영역 reset 영역 가능 (loop closure 영역 새로 시작). 학습 진행 영역 localStorage
//    영역 영구화 영역 보존 사실.
//  - LLM auto stream 영역 winner 변경 시점 영역 1회 POST. endpoint 영역 CORS / rate
//    limit 영역 사용자 환경 영역.
//  - 분리 사실 영역 동작 변경 0 — 같은 deriveWinner / 같은 listener / 같은 hooks.

import { useEffect, useState } from 'react';
import {
  onBackendEvent,
  type NeuronFiringDetail,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { useHandControl } from '@/lib/snn/use-hand-control';
import { type LlmSendResult } from '@/lib/snn/llm-client';
// HIGH #3 정정: cluster winner 산출 단일 source.
import { deriveWinner } from '@/lib/snn/winner-derivation';
import NodeInput from './pipeline/NodeInput';
import NodeLearn from './pipeline/NodeLearn';
import NodeInfer from './pipeline/NodeInfer';
import NodeOut from './pipeline/NodeOut';
import NodeLlm from './pipeline/NodeLlm';
import Arrow from './pipeline/Arrow';
import { WINNER_MARGIN } from './pipeline/shared';

interface Props {
  cameraConnected: boolean;
}

// 활성 흐름 (active flow) 영역 단일 source — winner 정합 시 cyan 흐름 발광.
// child node 영역 hoist — Pipeline 컨텍스트 영역 단일 phase/winner 흐름 영역 정합.
interface FlowState {
  phase: string;
  winnerCluster: number | null;
}

export default function PipelineCanvas({ cameraConnected }: Props) {
  // useHandControl 영역 본 파일 영역 driver — Pipeline view 영역 standalone.
  const ctrl = useHandControl(cameraConnected, true, true);

  const [flow, setFlow] = useState<FlowState>({ phase: 'untrained', winnerCluster: null });

  // 단일 listener — 모든 노드 영역 phase/winner 영역 공유 영역 (arrow 흐름 정합).
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setFlow((p) => ({ ...p, phase: d.phase }));
  }), []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      // HIGH #3 정정: deriveWinner 영역 단일 source 영역 위임.
      // Backend B+3 combo (a8e8165) 영역 cluster_rates / winner_cluster / winner_margin
      // 영역 동봉 영역 그것 영역 우선 활용 — frontend 자체 cluster mean 산출 회피.
      const w = deriveWinner(d.out_rates || {}, {
        marginThreshold: WINNER_MARGIN,
        clusterRates: d.cluster_rates,
        winnerCluster: d.winner_cluster,
        winnerMargin: d.winner_margin,
      });
      setFlow((p) => p.winnerCluster === w.cluster ? p : { ...p, winnerCluster: w.cluster });
    });
    return off;
  }, []);

  const flowActive = flow.winnerCluster !== null && (flow.phase === 'trained' || flow.phase === 'inference');
  const learnActive = flow.phase === 'learning' || flow.phase === 'partial';
  const phaseClass = `is-phase-${flow.phase}`;

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
      {/* Region cascade row 폐기 — INPUT/OUT region 영역 INPUT/OUT 노드 영역 중복.
          V1/V2 cortical region 영역 LEARN 노드 내부 영역 inline strip 영역 표시
          (NodeLearn.tsx — LearnRegionStrip). */}
      <div className="snn-pipeline-flow">
        <NodeInput cameraConnected={cameraConnected} />
        <Arrow active={learnActive || flowActive} />
        <NodeLearn />
        <Arrow active={flowActive} />
        <NodeInfer winnerCluster={flow.winnerCluster} />
        <Arrow active={flowActive} />
        <NodeOut winnerCluster={flow.winnerCluster} />
        <Arrow active={flowActive} />
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
