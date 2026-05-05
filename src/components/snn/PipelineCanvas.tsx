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
//
// pan + zoom (2026-05-05 사용자 mandatory P0 99점):
//   - desktop stage 내부 transform wrapper — translate(pan) scale(zoom).
//   - wheel → zoom delta (clamp 0.5-2.0).
//   - background drag (drag-handle 외부 + node body 외부) → pan delta.
//   - touch pinch (2-finger) → zoom.
//   - Reset Layout → positions + pan/zoom 동시 reset.

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
  const ctrl = useHandControl(cameraConnected, true, true);

  const [phase, setPhase] = useState<string>('untrained');
  // 사용자 catch 2026-05-06: 학습 진행 중 connector active glow — clusterFrames 변경 영역 trigger.
  const [framesNonce, setFramesNonce] = useState<number>(0);
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
    setPhase(d.phase);
    // clusterFrames 영역 합 변경 영역 nonce ↑ → INPUT/LEARN connector active.
    const sum = d.clusterFrames[0] + d.clusterFrames[1] + d.clusterFrames[2] + d.clusterFrames[3];
    setFramesNonce(sum);
  }), []);

  const { winnerCluster, lastFiringTimestamp } = usePipelineEvents();

  const flowActive = winnerCluster !== null && (phase === 'trained' || phase === 'inference');
  const learnActive = phase === 'learning' || phase === 'partial';
  const phaseClass = `is-phase-${phase}`;

  // segment active state — 4 edge active flag (1500ms 유지).
  const [segActive, setSegActive] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const ACTIVE_MS = 1500;

  // INPUT → LEARN connector — fire 영역 또는 frame capture 영역 trigger.
  useEffect(() => {
    if (lastFiringTimestamp === null && framesNonce === 0) return;
    setSegActive((p) => [true, p[1], p[2], p[3]]);
    const t = setTimeout(() => setSegActive((p) => [false, p[1], p[2], p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp, framesNonce]);

  // LEARN → INFER connector — 학습 중 또는 fire trigger.
  useEffect(() => {
    if (framesNonce === 0 && (lastFiringTimestamp === null || !learnActive)) return;
    setSegActive((p) => [p[0], true, p[2], p[3]]);
    const t = setTimeout(() => setSegActive((p) => [p[0], false, p[2], p[3]]), ACTIVE_MS);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp, learnActive, framesNonce]);

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

  // ───────── pan + zoom state (사용자 mandatory P0) ─────────
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // drag state — 활성 노드 drag (id) 또는 background pan (id null).
  // pinch state — 2-touch zoom (initialDistance, initialZoom).
  const dragRef = useRef<{ id: NodeId; offsetX: number; offsetY: number } | null>(null);
  const panDragRef = useRef<{ startX: number; startY: number; basePanX: number; basePanY: number; pointerId: number } | null>(null);
  const pinchRef = useRef<{ initialDist: number; initialZoom: number } | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const onPointerDownNode = useCallback((id: NodeId) => (e: React.PointerEvent<HTMLDivElement>) => {
    // input / button / video / canvas / textarea / select 영역 외 영역 drag trigger.
    const target = e.target as HTMLElement;
    if (target.closest('input, button, textarea, select, video, canvas, label, summary, details, [contenteditable]')) return;
    e.preventDefault();
    e.stopPropagation();
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const pos = positions[id];
    // pointer 좌표 영역 stage 내부 → transform 역변환 (pan/zoom 보정).
    const pointerStageX = (e.clientX - stageRect.left - pan.x) / zoom;
    const pointerStageY = (e.clientY - stageRect.top - pan.y) / zoom;
    dragRef.current = {
      id,
      offsetX: pointerStageX - pos.x,
      offsetY: pointerStageY - pos.y,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [positions, pan.x, pan.y, zoom]);

  // background pan — stage 영역 직접 pointerdown (node-wrap 외부 + drag-handle 외부).
  const onStagePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // node-wrap 내부 영역 무시 (node drag 또는 body interaction).
    if (target.closest('.snn-pipeline-node-wrap')) return;
    // SVG path 영역 무시 (pointer-events none 영역 — 본 영역 fallthrough).
    panDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      basePanX: pan.x,
      basePanY: pan.y,
      pointerId: e.pointerId,
    };
    (e.currentTarget).setPointerCapture?.(e.pointerId);
  }, [pan.x, pan.y]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag) {
      const stage = stageRef.current;
      if (!stage) return;
      const stageRect = stage.getBoundingClientRect();
      const pointerStageX = (e.clientX - stageRect.left - pan.x) / zoom;
      const pointerStageY = (e.clientY - stageRect.top - pan.y) / zoom;
      const x = Math.max(0, pointerStageX - drag.offsetX);
      const y = Math.max(0, pointerStageY - drag.offsetY);
      setPositions((prev) => ({ ...prev, [drag.id]: { x, y } }));
      return;
    }
    const panDrag = panDragRef.current;
    if (panDrag) {
      const dx = e.clientX - panDrag.startX;
      const dy = e.clientY - panDrag.startY;
      setPan({ x: panDrag.basePanX + dx, y: panDrag.basePanY + dy });
    }
  }, [pan.x, pan.y, zoom]);

  const onPointerUp = useCallback(() => {
    if (dragRef.current) {
      dragRef.current = null;
      setPositions((prev) => {
        savePositions(prev);
        return prev;
      });
    }
    if (panDragRef.current) {
      panDragRef.current = null;
    }
  }, []);

  // wheel zoom — 사용자 mandatory: 마우스 휠 영역 zoom (Ctrl 또는 default 둘 다).
  // zoom anchor: stage 영역 mouse position 영역 — pan 보정 영역 stage 영역 fixed.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      // delta — wheel down 영역 zoom out, up 영역 in.
      const delta = -e.deltaY * 0.0015;
      setZoom((prevZoom) => {
        const nextZoom = Math.max(0.5, Math.min(2.0, prevZoom * (1 + delta)));
        if (nextZoom === prevZoom) return prevZoom;
        // anchor — mouse 영역 stage 내부 영역 fixed (pan 영역 보정).
        setPan((prevPan) => {
          const stageX = (mouseX - prevPan.x) / prevZoom;
          const stageY = (mouseY - prevPan.y) / prevZoom;
          return {
            x: mouseX - stageX * nextZoom,
            y: mouseY - stageY * nextZoom,
          };
        });
        return nextZoom;
      });
    };
    stage.addEventListener('wheel', handler, { passive: false });
    return () => stage.removeEventListener('wheel', handler);
  }, []);

  // pinch zoom — 2-touch event (touchstart/touchmove/touchend).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const distance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.hypot(dx, dy);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchRef.current = { initialDist: distance(e.touches), initialZoom: zoom };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const dist = distance(e.touches);
        const ratio = dist / pinchRef.current.initialDist;
        const nextZoom = Math.max(0.5, Math.min(2.0, pinchRef.current.initialZoom * ratio));
        setZoom(nextZoom);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchRef.current = null;
    };
    stage.addEventListener('touchstart', onTouchStart, { passive: false });
    stage.addEventListener('touchmove', onTouchMove, { passive: false });
    stage.addEventListener('touchend', onTouchEnd);
    stage.addEventListener('touchcancel', onTouchEnd);
    return () => {
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
      stage.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [zoom]);

  const resetLayout = useCallback(() => {
    setPositions({ ...INITIAL_POS });
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (typeof window !== 'undefined') {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* silent. */ }
    }
  }, []);

  // Toolbar 'Reset layout' button → custom event listener (사용자 명시 catch — top 메뉴 영역).
  useEffect(() => {
    const handler = () => resetLayout();
    if (typeof window !== 'undefined') {
      window.addEventListener('handface.pipeline.reset-layout', handler);
      return () => window.removeEventListener('handface.pipeline.reset-layout', handler);
    }
  }, [resetLayout]);

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

  // SVG canvas size — node 영역 최대 right/bottom + margin (사용자 catch v2: stage 100% 영역 fit).
  // 사용자 명시: 빈공간 채우기 + 스크롤바 제거 → stage 영역 container 100%.
  const stageWidth = Math.max(
    1100,
    Math.max(...(Object.keys(positions) as NodeId[]).map((k) => positions[k].x + NODE_WIDTH + 16)),
  );
  const stageHeight = Math.max(
    400,
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
        onPointerDown={onStagePointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ '--stage-w': `${stageWidth}px`, '--stage-h': `${stageHeight}px` } as React.CSSProperties}
      >
        {/* transform wrapper — pan + zoom 적용. SVG + node 모두 동일 transform 정합.
            CSS var 영역 inline style 폐기 (eslint no-inline-styles 정합 — class 영역 var 영역 transform). */}
        <div
          className="snn-pipeline-transform"
          style={{ '--pan-x': `${pan.x}px`, '--pan-y': `${pan.y}px`, '--zoom': zoom } as React.CSSProperties}
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
              {/* drag handle bar 폐기 (사용자 catch: 불필요) — node-wrap 자체 영역 drag trigger. */}
              {renderNode(id)}
            </div>
          ))}
        </div>
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
