'use client';

// PipelineCanvas — 편집 가능 SVG 노드 캔버스 (2026-05-05 사용자 mandatory).
//
// 사용자 명시:
//   "node 연결은 어디로 갔나요?"
//   "이거 캔버스에 편집 가능한 노드로 구성 못하면 해고당하실 수 있어요"
//
// 설계 (drawflow 정합 — 단 vanilla JS lib 사용 0, 순수 SVG + React 직접 구현):
//   - 5 노드 absolute position (px) — INPUT/LEARN/INFER/OUT/LLM.
//   - 각 노드 draggable: header onPointerDown → Move/Up + transform translate.
//   - SVG overlay (absolute inset-0) — 4 bezier path (INPUT→LEARN→INFER→OUT→LLM).
//   - 노드 위치 변경 시 SVG path 자동 redraw (state 기반).
//   - localStorage 'handface.pipeline.positions.v1' — 노드 위치 영구 보존.
//   - active 발화 시 path stroke 강 + drop-shadow glow + animateMotion dot.
//   - 우측 하단 "Reset Layout" 버튼 — localStorage clear + initial 복귀.
//
// 정직 한계:
//   - mobile (≤900) 영역 절대좌표 drag 부적합 → 종전 vertical stack flex layout
//     보존 (snn-pipeline-flow 단순 column). 본 editable canvas 영역 desktop only.
//   - 노드 간 edge add/remove UI 0 — 5 고정 path (사용자 mandatory pipeline shape).
//   - canvas pan/zoom 0 — 단일 1280px wide stage (overflow auto).

import { useEffect, useRef, useState, useCallback } from 'react';
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
import SummaryCard from './SummaryCard';
import {
  PipelineEventProvider,
  usePipelineEvents,
} from './pipeline/PipelineEventContext';

interface Props {
  cameraConnected: boolean;
}

// 5 노드 키 — drawflow node id 정합.
type NodeId = 'input' | 'learn' | 'infer' | 'out' | 'llm';

interface Pos { x: number; y: number; }
type PositionMap = Record<NodeId, Pos>;

const STORAGE_KEY = 'handface.pipeline.positions.v2';
const NODE_WIDTH = 220;
const NODE_HEIGHT_ESTIMATE = 320; // bezier endpoint 영역 estimate (실제 height 영역 자식 fit).

// initial position — 사용자 catch (스크린샷): viewport fit + top-aligned.
// 5 × 220 = 1100 + 4 × gap 18 = 72 + left margin 16 = 1188 (viewport 1280 fit).
const INITIAL_POS: PositionMap = {
  input: { x: 16, y: 16 },
  learn: { x: 254, y: 16 },
  infer: { x: 492, y: 16 },
  out: { x: 730, y: 16 },
  llm: { x: 968, y: 16 },
};

// segment edge — 4 connector (5 노드 chain).
const EDGES: Array<[NodeId, NodeId]> = [
  ['input', 'learn'],
  ['learn', 'infer'],
  ['infer', 'out'],
  ['out', 'llm'],
];

function loadPositions(): PositionMap {
  if (typeof window === 'undefined') return { ...INITIAL_POS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_POS };
    const parsed = JSON.parse(raw) as Partial<PositionMap>;
    // shape 검증 — 5 키 모두 존재 + numeric.
    const out: PositionMap = { ...INITIAL_POS };
    (Object.keys(INITIAL_POS) as NodeId[]).forEach((k) => {
      const p = parsed[k];
      if (p && typeof p.x === 'number' && typeof p.y === 'number') {
        out[k] = { x: p.x, y: p.y };
      }
    });
    return out;
  } catch {
    return { ...INITIAL_POS };
  }
}

function savePositions(pos: PositionMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  } catch {
    /* quota / private mode — silent. */
  }
}

export default function PipelineCanvas({ cameraConnected }: Props) {
  return (
    <PipelineEventProvider>
      <PipelineCanvasInner cameraConnected={cameraConnected} />
    </PipelineEventProvider>
  );
}

function PipelineCanvasInner({ cameraConnected }: Props) {
  const ctrl = useHandControl(cameraConnected, true);

  const [phase, setPhase] = useState<string>('untrained');
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setPhase(d.phase);
  }), []);

  const { winnerCluster, lastFiringTimestamp } = usePipelineEvents();

  const flowActive = winnerCluster !== null && (phase === 'trained' || phase === 'inference');
  const learnActive = phase === 'learning' || phase === 'partial';
  const phaseClass = `is-phase-${phase}`;

  // segment active state — 4 edge active flag (1500ms 유지).
  const [segActive, setSegActive] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const ACTIVE_MS = 1500;

  useEffect(() => {
    if (lastFiringTimestamp === null) return;
    setSegActive((p) => [true, p[1], p[2], p[3]]);
    const t = setTimeout(() => setSegActive((p) => [false, p[1], p[2], p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp]);

  useEffect(() => {
    if (lastFiringTimestamp === null || !learnActive) return;
    setSegActive((p) => [p[0], true, p[2], p[3]]);
    const t = setTimeout(() => setSegActive((p) => [p[0], false, p[2], p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp, learnActive]);

  useEffect(() => {
    if (winnerCluster === null || !flowActive) return;
    setSegActive((p) => [p[0], p[1], true, p[3]]);
    const t = setTimeout(() => setSegActive((p) => [p[0], p[1], false, p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [winnerCluster, flowActive]);

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

  // LLM toast.
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

  // ───────── editable canvas — node position state + drag handler ─────────
  const [positions, setPositions] = useState<PositionMap>(() => loadPositions());

  // node 실제 height 측정 — bezier path endpoint 정합 (자식 fit height).
  const nodeRefs = useRef<Record<NodeId, HTMLDivElement | null>>({
    input: null, learn: null, infer: null, out: null, llm: null,
  });
  const [heights, setHeights] = useState<Record<NodeId, number>>({
    input: NODE_HEIGHT_ESTIMATE,
    learn: NODE_HEIGHT_ESTIMATE,
    infer: NODE_HEIGHT_ESTIMATE,
    out: NODE_HEIGHT_ESTIMATE,
    llm: NODE_HEIGHT_ESTIMATE,
  });

  // ResizeObserver — 각 노드 실제 height 추적.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') return;
    const observers: ResizeObserver[] = [];
    (Object.keys(nodeRefs.current) as NodeId[]).forEach((id) => {
      const el = nodeRefs.current[id];
      if (!el) return;
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const h = Math.round(entry.contentRect.height);
          setHeights((prev) => prev[id] === h ? prev : { ...prev, [id]: h });
        }
      });
      ro.observe(el);
      observers.push(ro);
    });
    return () => { observers.forEach((o) => o.disconnect()); };
  }, []);

  // drag state — 활성 노드 + offset (pointer position 영역 노드 origin offset).
  const dragRef = useRef<{ id: NodeId; offsetX: number; offsetY: number } | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const onPointerDownNode = useCallback((id: NodeId) => (e: React.PointerEvent<HTMLDivElement>) => {
    // input element / button 영역 시작된 drag 영역 무시 (node body interaction 보존).
    const target = e.target as HTMLElement;
    if (!target.closest('.snn-pipeline-node-drag-handle')) return;
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const pos = positions[id];
    dragRef.current = {
      id,
      offsetX: e.clientX - stageRect.left - pos.x,
      offsetY: e.clientY - stageRect.top - pos.y,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [positions]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const x = Math.max(0, e.clientX - stageRect.left - drag.offsetX);
    const y = Math.max(0, e.clientY - stageRect.top - drag.offsetY);
    setPositions((prev) => ({ ...prev, [drag.id]: { x, y } }));
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setPositions((prev) => {
      savePositions(prev);
      return prev;
    });
  }, []);

  const resetLayout = useCallback(() => {
    setPositions({ ...INITIAL_POS });
    if (typeof window !== 'undefined') {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* silent. */ }
    }
  }, []);

  // bezier path — source right-edge midpoint → target left-edge midpoint.
  // C control point: source.x + 60, target.x - 60 (horizontal smooth).
  const buildPath = (a: NodeId, b: NodeId): string => {
    const pa = positions[a]; const pb = positions[b];
    const ha = heights[a]; const hb = heights[b];
    const sx = pa.x + NODE_WIDTH;
    const sy = pa.y + ha / 2;
    const tx = pb.x;
    const ty = pb.y + hb / 2;
    const dx = Math.max(40, Math.abs(tx - sx) * 0.4);
    return `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
  };

  // SVG canvas size — node 영역 최대 right/bottom + margin (사용자 catch: viewport fit + top-aligned).
  const stageWidth = Math.max(
    1188,
    Math.max(...(Object.keys(positions) as NodeId[]).map((k) => positions[k].x + NODE_WIDTH + 16)),
  );
  const stageHeight = Math.max(
    360,
    Math.max(...(Object.keys(positions) as NodeId[]).map((k) => positions[k].y + heights[k] + 16)),
  );

  // node renderer — 5 노드 분기.
  const renderNode = (id: NodeId): React.ReactNode => {
    switch (id) {
      case 'input': return <NodeInput cameraConnected={cameraConnected} />;
      case 'learn': return <NodeLearn />;
      case 'infer': return <NodeInfer />;
      case 'out': return <NodeOut />;
      case 'llm': return <NodeLlm onLlmResult={onLlmResult} />;
    }
  };

  return (
    <div
      className={`snn-pipeline ${phaseClass} ${flowActive ? 'is-flowing' : ''} ${learnActive ? 'is-learning' : ''}`}
      aria-label="HandFace SNN pipeline"
    >
      <div className="snn-pipeline-dashboard">
        <SummaryCard />
      </div>
      {/* editable canvas — desktop. mobile (≤900) 영역 종전 vertical flex 정합 fallback. */}
      <div
        className="snn-pipeline-stage"
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ '--stage-w': `${stageWidth}px`, '--stage-h': `${stageHeight}px` } as React.CSSProperties}
      >
        {/* SVG overlay — bezier 4 path. node z-index 위쪽 영역 path 영역 노드 뒤. */}
        <svg
          className="snn-pipeline-svg"
          width={stageWidth}
          height={stageHeight}
          viewBox={`0 0 ${stageWidth} ${stageHeight}`}
          aria-hidden
        >
          <defs>
            {EDGES.map(([a, b], i) => (
              <path key={`def-${i}`} id={`snn-edge-path-${i}`} d={buildPath(a, b)} fill="none" />
            ))}
          </defs>
          {EDGES.map(([a, b], i) => {
            const d = buildPath(a, b);
            const active = segActive[i];
            return (
              <g key={`edge-${i}`} className={`snn-pipeline-edge ${active ? 'is-active' : 'is-idle'}`}>
                <path className="snn-pipeline-edge-path" d={d} stroke="currentColor" strokeWidth={active ? 2.4 : 1.6} fill="none" strokeLinecap="round" />
                {active && (
                  <circle r="4" className="snn-pipeline-edge-dot" fill="currentColor">
                    <animateMotion dur="1.5s" repeatCount="1" calcMode="spline" keySplines="0.4 0 0.2 1">
                      <mpath href={`#snn-edge-path-${i}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
        {/* 5 absolute draggable node. */}
        {(Object.keys(positions) as NodeId[]).map((id) => (
          <div
            key={id}
            ref={(el) => { nodeRefs.current[id] = el; }}
            className={`snn-pipeline-node-wrap snn-pipeline-node-wrap--${id}`}
            style={{ '--node-x': `${positions[id].x}px`, '--node-y': `${positions[id].y}px` } as React.CSSProperties}
            onPointerDown={onPointerDownNode(id)}
          >
            {/* drag handle bar — header 위쪽 짧은 grip. drag 시작 영역. */}
            <div
              className="snn-pipeline-node-drag-handle"
              role="presentation"
              title="Drag to reposition"
            >
              <span className="snn-pipeline-node-drag-grip" aria-hidden>⋮⋮</span>
              <span className="snn-pipeline-node-drag-id">{id.toUpperCase()}</span>
            </div>
            {renderNode(id)}
          </div>
        ))}
        <button
          type="button"
          className="snn-pipeline-reset"
          onClick={resetLayout}
          title="Reset node layout to default"
        >
          Reset layout
        </button>
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
