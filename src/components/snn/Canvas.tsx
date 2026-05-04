'use client';

import { useEffect, useRef } from 'react';
import 'drawflow/dist/drawflow.min.css';
import { NEURON_NODES, PRESET_SYNAPSES, SOURCE_EDGES, weightColor } from '@/lib/snn/data';
import { getPosition, setPosition } from '@/lib/snn/positions';

interface CanvasProps {
  editMode: boolean;
  cameraConnected: boolean;
}

export default function Canvas({ editMode, cameraConnected }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Editor 인스턴스는 Drawflow 라이브러리 type 으로 보관.
  const editorRef = useRef<unknown>(null);
  const connRefMap = useRef<Record<string, Element>>({});
  const drawflowIdToName = useRef<Record<number, string>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let editor: import('drawflow').default | null = null;
    const nameToDfId: Record<string, number> = {};

    (async () => {
      const Drawflow = (await import('drawflow')).default;
      if (cancelled) return;

      const ed = new Drawflow(container);
      ed.reroute = false;
      ed.reroute_fix_curvature = false;
      ed.curvature = 0;
      ed.zoom_min = 0.2;
      ed.zoom_max = 4;
      ed.zoom_value = 0.05;
      ed.draggable_inputs = false;
      ed.force_first_input = false;
      ed.line_path = 2;
      ed.start();
      ed.editor_mode = editMode ? 'edit' : 'view';
      editor = ed;
      editorRef.current = ed;

      // 노드 추가.
      for (const n of NEURON_NODES) {
        const saved = getPosition(n.id);
        const x = saved?.x ?? n.x;
        const y = saved?.y ?? n.y;
        const id = ed.addNode(
          n.id, 1, 1, x, y,
          `snn-canvas-neuron snn-canvas-neuron--${n.population} snn-canvas-node-${n.id}` +
            (n.isSystem ? ' snn-canvas-neuron--locked' : ''),
          { neuron: n.id, region: n.region, population: n.population },
          renderNodeHtml(n),
          false,
        );
        nameToDfId[n.id] = id;
        drawflowIdToName.current[id] = n.id;
      }

      // 시냅스 추가.
      const allSyn = [...SOURCE_EDGES, ...PRESET_SYNAPSES];
      for (const syn of allSyn) {
        const fromId = nameToDfId[syn.pre];
        const toId = nameToDfId[syn.post];
        if (!fromId || !toId) continue;
        ed.addConnection(fromId, toId, 'output_1', 'input_1');
        const sel = `.connection.node_in_node-${toId}.node_out_node-${fromId}`;
        const conn = container.querySelector(sel);
        if (conn) {
          (conn as HTMLElement).dataset.weightColor = weightColor(syn.weight);
          connRefMap.current[`${syn.pre}->${syn.post}`] = conn;
        }
      }

      // 드래그 끝나면 좌표 저장.
      ed.on('nodeMoved', (dfId: number) => {
        const name = drawflowIdToName.current[dfId];
        if (!name || !editor) return;
        const node = editor.getNodeFromId(dfId);
        if (node && typeof node.pos_x === 'number') setPosition(name, node.pos_x, node.pos_y);
      });

      // step path 적용.
      applyStepPaths(container);
      patchUpdateConnection(ed, container);

      // pan + wheel zoom (manual handler — drawflow view mode 의 기본 pan 우회).
      attachManualPan(container, ed);

      // fit-to-view (double RAF for layout settle).
      requestAnimationFrame(() => requestAnimationFrame(() => fitToView(ed, container)));

      // 카메라 미연결 dim 적용.
      applyCameraConnected(connRefMap.current, cameraConnected);
    })();

    return () => {
      cancelled = true;
      if (editor) {
        editor.clear();
        container.innerHTML = '';
      }
      connRefMap.current = {};
      drawflowIdToName.current = {};
    };
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // editMode 변경 시 view ↔ edit 토글.
  useEffect(() => {
    const ed = editorRef.current as import('drawflow').default | null;
    if (!ed) return;
    ed.editor_mode = editMode ? 'edit' : 'view';
    containerRef.current?.classList.toggle('snn-canvas-edit', editMode);
  }, [editMode]);

  // 카메라 연결 상태 변경 시 dim 토글.
  useEffect(() => {
    applyCameraConnected(connRefMap.current, cameraConnected);
  }, [cameraConnected]);

  return (
    <div
      ref={containerRef}
      id="nf-snn-canvas"
      className="absolute inset-0 cursor-grab"
    />
  );
}

function renderNodeHtml(n: { id: string; label: string; region: string; population: string; isSystem: boolean }): string {
  if (n.population === 'camera' || n.population === 'gesture') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-source-mount">
          <div class="snn-canvas-source-empty">
            <div>${n.population === 'camera' ? 'Camera disabled' : 'Hand detection disabled'}</div>
            <div class="snn-canvas-source-empty-hint">Enable camera from sidebar</div>
          </div>
        </div>
      </div>
    `;
  }
  if (n.population === 'output') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-out-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">status</span>
            <span class="snn-canvas-neuron-row-value">idle</span>
          </div>
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">rate</span>
            <span class="snn-canvas-neuron-row-value">0</span>
          </div>
        </div>
      </div>
    `;
  }
  const lock = n.isSystem ? '<span class="snn-canvas-neuron-lock" title="시스템">🔒</span>' : '';
  return `
    <div class="snn-canvas-neuron-card">
      <div class="snn-canvas-neuron-header">
        <span class="snn-canvas-neuron-dot"></span>
        <span class="snn-canvas-neuron-label">${n.label}</span>
        ${lock}
      </div>
      <div class="snn-canvas-neuron-body">
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">region</span>
          <span class="snn-canvas-neuron-row-value">${n.region}</span>
        </div>
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">pop</span>
          <span class="snn-canvas-neuron-row-value">${n.population}</span>
        </div>
      </div>
    </div>
  `;
}

function applyStepPaths(container: HTMLElement) {
  const conns = container.querySelectorAll('.connection');
  conns.forEach((conn) => {
    const path = conn.querySelector('.main-path');
    if (!path) return;
    const d = path.getAttribute('d') || '';
    let m = d.match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s+C[\s\S]*?(-?[\d.]+)[,\s]+(-?[\d.]+)\s*$/);
    if (!m) m = d.match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s+L\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*$/);
    if (!m) {
      const nums = d.match(/-?[\d.]+/g);
      if (nums && nums.length >= 4) m = [d, nums[0], nums[1], nums[nums.length - 2], nums[nums.length - 1]];
    }
    if (!m) return;
    const x1 = parseFloat(m[1]), y1 = parseFloat(m[2]);
    const x2 = parseFloat(m[3]), y2 = parseFloat(m[4]);
    if (![x1, y1, x2, y2].every(Number.isFinite)) return;
    const midX = (x1 + x2) / 2;
    path.setAttribute('d', `M ${x1},${y1} L ${midX},${y1} L ${midX},${y2} L ${x2},${y2}`);
  });
}

function patchUpdateConnection(ed: import('drawflow').default, container: HTMLElement) {
  const original = ed.updateConnectionNodes.bind(ed);
  ed.updateConnectionNodes = (id: string) => {
    original(id);
    applyStepPaths(container);
  };
}

function applyCameraConnected(map: Record<string, Element>, connected: boolean) {
  for (const key in map) {
    const [pre] = key.split('->');
    const isCameraRoot = pre === 'src_camera' || pre === 'src_gesture';
    if (!isCameraRoot) continue;
    map[key].classList.toggle('snn-canvas-conn--inactive', !connected);
  }
}

function attachManualPan(container: HTMLElement, ed: import('drawflow').default) {
  let panning = false;
  let startX = 0, startY = 0, startCx = 0, startCy = 0;

  const onDown = (e: PointerEvent) => {
    if (ed.editor_mode === 'edit') return;
    if ((e.target as HTMLElement)?.closest('.input, .output, button')) return;
    panning = true;
    startX = e.clientX; startY = e.clientY;
    startCx = ed.canvas_x || 0; startCy = ed.canvas_y || 0;
    container.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const onMove = (e: PointerEvent) => {
    if (!panning) return;
    ed.canvas_x = startCx + (e.clientX - startX);
    ed.canvas_y = startCy + (e.clientY - startY);
    if (ed.precanvas) {
      ed.precanvas.style.transform =
        `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${ed.zoom})`;
    }
  };
  const onUp = () => {
    panning = false;
    container.style.cursor = 'grab';
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault(); e.stopPropagation();
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const oldZoom = ed.zoom || 1;
    const oldCx = ed.canvas_x || 0;
    const oldCy = ed.canvas_y || 0;
    const dataX = (mx - oldCx) / oldZoom;
    const dataY = (my - oldCy) / oldZoom;
    const step = ed.zoom_value || 0.05;
    const dir = e.deltaY > 0 ? -1 : 1;
    const newZoom = Math.max(ed.zoom_min || 0.2, Math.min(ed.zoom_max || 4, oldZoom + step * dir));
    if (Math.abs(newZoom - oldZoom) < 1e-6) return;
    ed.zoom = newZoom;
    ed.canvas_x = mx - dataX * newZoom;
    ed.canvas_y = my - dataY * newZoom;
    if (ed.precanvas) {
      ed.precanvas.style.transformOrigin = '0 0';
      ed.precanvas.style.transform =
        `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${newZoom})`;
    }
    applyStepPaths(container);
  };

  container.addEventListener('pointerdown', onDown);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerup', onUp);
  container.addEventListener('pointercancel', onUp);
  container.addEventListener('wheel', onWheel, { capture: true, passive: false });
}

function fitToView(ed: import('drawflow').default, container: HTMLElement) {
  if (!ed?.precanvas || !container) return;
  const nodes = ed.precanvas.querySelectorAll('.drawflow-node');
  if (nodes.length === 0) return;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach((node) => {
    const el = node as HTMLElement;
    const left = parseFloat(el.style.left) || 0;
    const top  = parseFloat(el.style.top) || 0;
    const w = el.offsetWidth || 160;
    const h = el.offsetHeight || 80;
    if (left < minX) minX = left;
    if (top < minY) minY = top;
    if (left + w > maxX) maxX = left + w;
    if (top + h > maxY) maxY = top + h;
  });
  const bboxW = maxX - minX, bboxH = maxY - minY;
  const rect = container.getBoundingClientRect();
  if (bboxW <= 0 || bboxH <= 0 || rect.width <= 0 || rect.height <= 0) return;
  const padding = 0.9;
  const zoomX = rect.width / bboxW, zoomY = rect.height / bboxH;
  const targetZoom = Math.max(ed.zoom_min || 0.2,
    Math.min(ed.zoom_max || 4, Math.min(zoomX, zoomY) * padding));
  const bboxCx = (minX + maxX) / 2;
  const bboxCy = (minY + maxY) / 2;
  ed.zoom = targetZoom;
  ed.canvas_x = rect.width / 2 - bboxCx * targetZoom;
  ed.canvas_y = rect.height / 2 - bboxCy * targetZoom;
  ed.precanvas.style.transformOrigin = '0 0';
  ed.precanvas.style.transform =
    `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${targetZoom})`;
  applyStepPaths(container);
}
