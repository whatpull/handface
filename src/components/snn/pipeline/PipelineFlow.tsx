'use client';

// PipelineFlow — @xyflow/react 기반 편집 가능한 5-node 캔버스 (2026-05-05 사용자 mandatory).
//
// 직전 grid layout (snn-pipeline-flow grid-template-columns: 1fr auto 1fr ...) 폐기 →
// ReactFlow 캔버스 + 5 custom node + 4 fixed edge + drag 가능 + position localStorage 영구화.
//
// 사용자 명시 본격 design:
//   INPUT (제스처) → LEARN (진행상황) → INFER (추론) → OUT (결과값) → LLM (외부)
//   - 노드 5개 fixed (add / delete 불가)
//   - 엣지 4개 fixed (connect / disconnect 불가)
//   - 노드 드래그 ON — 사용자가 위치 자유 수정
//   - 위치는 localStorage 영구 보존
//   - 발화 시 해당 엣지 active glow (drawflow fired class 정합)
//
// 정직 한계:
//  - 1280px viewport 기준 default 위치 — mobile (< 900) 영역 ReactFlow fitView 영역 자동 fit.
//  - 노드 내부 콘텐츠 영역 기존 NodeInput/NodeLearn/NodeInfer/NodeOut/NodeLlm 영역 재사용
//    → ReactFlow 영역 wrapper 영역 정합. NodeShell 영역 collapse toggle 보존.
//  - active glow 영역 PipelineEventContext 영역 lastFiringTimestamp / winnerCluster 영역 trigger
//    1500ms hold 후 idle 영역 (직전 Arrow.tsx 정합).

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  type Node,
  type Edge,
  type NodeChange,
  type NodeTypes,
  applyNodeChanges,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodeInput from './NodeInput';
import NodeLearn from './NodeLearn';
import NodeInfer from './NodeInfer';
import NodeOut from './NodeOut';
import NodeLlm from './NodeLlm';
import { usePipelineEvents } from './PipelineEventContext';
import { type LlmSendResult } from '@/lib/snn/llm-client';

// localStorage key — 사용자 layout 영역 영구 보존.
const POSITIONS_STORAGE_KEY = 'handface.pipeline.flow-positions.v1';

// 5-node default position (1280px viewport 기준 horizontal — 5 × ~250 + gap).
// y 영역 0 영역 가지런 정렬 — drag 영역 사용자 영역 자유 변경 가능.
const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  input: { x: 0, y: 0 },
  learn: { x: 280, y: 0 },
  infer: { x: 560, y: 0 },
  out: { x: 840, y: 0 },
  llm: { x: 1120, y: 0 },
};

interface PersistedPositions {
  [id: string]: { x: number; y: number };
}

function loadPositions(): PersistedPositions {
  if (typeof window === 'undefined') return DEFAULT_POSITIONS;
  try {
    const raw = window.localStorage.getItem(POSITIONS_STORAGE_KEY);
    if (!raw) return DEFAULT_POSITIONS;
    const parsed = JSON.parse(raw) as PersistedPositions;
    // 5개 키 모두 있는지 검증 — 누락 시 default fallback.
    const merged: PersistedPositions = { ...DEFAULT_POSITIONS };
    for (const k of Object.keys(DEFAULT_POSITIONS)) {
      if (parsed[k] && typeof parsed[k].x === 'number' && typeof parsed[k].y === 'number') {
        merged[k] = parsed[k];
      }
    }
    return merged;
  } catch {
    return DEFAULT_POSITIONS;
  }
}

function savePositions(positions: PersistedPositions): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions));
  } catch {
    /* quota / private mode — silent. */
  }
}

// custom node wrappers — NodeInput/Learn/Infer/Out/Llm 영역 ReactFlow node 영역 mount.
// data prop 영역 cameraConnected (input only) / onLlmResult (llm only) 전달.
interface NodeData extends Record<string, unknown> {
  cameraConnected?: boolean;
  onLlmResult?: (r: LlmSendResult) => void;
}

function InputNodeWrapper({ data }: { data: NodeData }) {
  return <NodeInput cameraConnected={data.cameraConnected ?? false} />;
}
function LearnNodeWrapper() {
  return <NodeLearn />;
}
function InferNodeWrapper() {
  return <NodeInfer />;
}
function OutNodeWrapper() {
  return <NodeOut />;
}
function LlmNodeWrapper({ data }: { data: NodeData }) {
  return <NodeLlm onLlmResult={data.onLlmResult ?? (() => {})} />;
}

const NODE_TYPES: NodeTypes = {
  input: InputNodeWrapper,
  learn: LearnNodeWrapper,
  infer: InferNodeWrapper,
  out: OutNodeWrapper,
  llm: LlmNodeWrapper,
};

interface PipelineFlowProps {
  cameraConnected: boolean;
  onLlmResult: (r: LlmSendResult) => void;
}

export default function PipelineFlow(props: PipelineFlowProps) {
  return (
    <ReactFlowProvider>
      <PipelineFlowInner {...props} />
    </ReactFlowProvider>
  );
}

function PipelineFlowInner({ cameraConnected, onLlmResult }: PipelineFlowProps) {
  // 위치 상태 — localStorage hydrate (mount 후 1회).
  // SSR 영역 default 영역 영역 — client mount 후 localStorage 영역 sync.
  const [positions, setPositions] = useState<PersistedPositions>(DEFAULT_POSITIONS);
  useEffect(() => {
    setPositions(loadPositions());
  }, []);

  // active edge state — neuron-firing trigger 영역 4 segment 영역 1500ms hold.
  const { winnerCluster, lastFiringTimestamp } = usePipelineEvents();
  const [activeEdges, setActiveEdges] = useState<Record<string, boolean>>({});
  const ACTIVE_MS = 1500;

  // INPUT → LEARN: 영역 firing 영역 active.
  useEffect(() => {
    if (lastFiringTimestamp === null) return;
    setActiveEdges((p) => ({ ...p, 'e-input-learn': true }));
    const t = setTimeout(() => {
      setActiveEdges((p) => ({ ...p, 'e-input-learn': false }));
    }, ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp]);

  // LEARN → INFER: firing 영역 동시 active.
  useEffect(() => {
    if (lastFiringTimestamp === null) return;
    setActiveEdges((p) => ({ ...p, 'e-learn-infer': true }));
    const t = setTimeout(() => {
      setActiveEdges((p) => ({ ...p, 'e-learn-infer': false }));
    }, ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp]);

  // INFER → OUT: winnerCluster 변화 시 active.
  useEffect(() => {
    if (winnerCluster === null) return;
    setActiveEdges((p) => ({ ...p, 'e-infer-out': true }));
    const t = setTimeout(() => {
      setActiveEdges((p) => ({ ...p, 'e-infer-out': false }));
    }, ACTIVE_MS);
    return () => clearTimeout(t);
  }, [winnerCluster]);

  // OUT → LLM: winnerCluster 변화 영역 300ms delay 후 active (label render 후 송신 정합).
  useEffect(() => {
    if (winnerCluster === null) return;
    let innerT: ReturnType<typeof setTimeout> | null = null;
    const delay = setTimeout(() => {
      setActiveEdges((p) => ({ ...p, 'e-out-llm': true }));
      innerT = setTimeout(() => {
        setActiveEdges((p) => ({ ...p, 'e-out-llm': false }));
      }, ACTIVE_MS);
    }, 300);
    return () => {
      clearTimeout(delay);
      if (innerT) clearTimeout(innerT);
    };
  }, [winnerCluster]);

  // 노드 정의 — 5 fixed.
  const nodes = useMemo<Node<NodeData>[]>(() => [
    {
      id: 'input',
      type: 'input',
      position: positions.input,
      data: { cameraConnected },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: true,
      // ReactFlow default node frame 폐기 — 본 wrapper 영역 자체 styling.
      style: { padding: 0, border: 'none', background: 'transparent', width: 260 },
    },
    {
      id: 'learn',
      type: 'learn',
      position: positions.learn,
      data: {},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: true,
      style: { padding: 0, border: 'none', background: 'transparent', width: 260 },
    },
    {
      id: 'infer',
      type: 'infer',
      position: positions.infer,
      data: {},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: true,
      style: { padding: 0, border: 'none', background: 'transparent', width: 260 },
    },
    {
      id: 'out',
      type: 'out',
      position: positions.out,
      data: {},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: true,
      style: { padding: 0, border: 'none', background: 'transparent', width: 260 },
    },
    {
      id: 'llm',
      type: 'llm',
      position: positions.llm,
      data: { onLlmResult },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: true,
      style: { padding: 0, border: 'none', background: 'transparent', width: 260 },
    },
  ], [positions, cameraConnected, onLlmResult]);

  // 엣지 정의 — 4 fixed smoothstep + active class.
  const edges = useMemo<Edge[]>(() => [
    {
      id: 'e-input-learn',
      source: 'input',
      target: 'learn',
      type: 'smoothstep',
      animated: activeEdges['e-input-learn'] ?? false,
      className: activeEdges['e-input-learn'] ? 'snn-flow-edge is-active' : 'snn-flow-edge is-idle',
    },
    {
      id: 'e-learn-infer',
      source: 'learn',
      target: 'infer',
      type: 'smoothstep',
      animated: activeEdges['e-learn-infer'] ?? false,
      className: activeEdges['e-learn-infer'] ? 'snn-flow-edge is-active' : 'snn-flow-edge is-idle',
    },
    {
      id: 'e-infer-out',
      source: 'infer',
      target: 'out',
      type: 'smoothstep',
      animated: activeEdges['e-infer-out'] ?? false,
      className: activeEdges['e-infer-out'] ? 'snn-flow-edge is-active' : 'snn-flow-edge is-idle',
    },
    {
      id: 'e-out-llm',
      source: 'out',
      target: 'llm',
      type: 'smoothstep',
      animated: activeEdges['e-out-llm'] ?? false,
      className: activeEdges['e-out-llm'] ? 'snn-flow-edge is-active' : 'snn-flow-edge is-idle',
    },
  ], [activeEdges]);

  // 노드 변경 — drag 영역 position 갱신 + localStorage save.
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setPositions((prev) => {
      const next = applyNodeChanges(changes, nodes);
      const updated: PersistedPositions = { ...prev };
      for (const n of next) {
        if (n.id in updated) {
          updated[n.id] = { x: n.position.x, y: n.position.y };
        }
      }
      // drag end 시점 영역 영역 만 save — position 변경 type 영역 'position' + dragging false.
      const isDragEnd = changes.some(
        (c) => c.type === 'position' && c.dragging === false,
      );
      if (isDragEnd) savePositions(updated);
      return updated;
    });
  }, [nodes]);

  return (
    <div className="snn-pipeline-flow-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        onNodesChange={onNodesChange}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        deleteKeyCode={null}
        multiSelectionKeyCode={null}
        selectionKeyCode={null}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        minZoom={0.4}
        maxZoom={1.5}
        defaultViewport={{ x: 40, y: 40, zoom: 0.85 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1f1f1f" gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}
