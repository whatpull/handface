// drawflow 통합 시 사용하는 순수 함수 헬퍼.
// Canvas.tsx 본체에서 분리해 가독성 향상.

import type Drawflow from 'drawflow';
import type { LayoutNode } from './layout';

// 백엔드 neuron name 에서 region 추론.
export function inferRegion(name: string): 'INPUT' | 'OUT' | 'V1' | 'V2' | 'OTHER' {
  if (name.startsWith('in_')) return 'INPUT';
  if (name.startsWith('out_')) return 'OUT';
  if (name.startsWith('v1_')) return 'V1';
  if (name.startsWith('v2_')) return 'V2';
  return 'OTHER';
}

// drawflow 노드 className 빌드.
export function buildNodeClass(n: LayoutNode): string {
  const popClass = n.population.toLowerCase().replace(/\W+/g, '_');
  const lock = n.isSystem ? ' snn-canvas-neuron--locked' : '';
  return `snn-canvas-neuron snn-canvas-neuron--${popClass} snn-canvas-node-${n.id}${lock}`;
}

// 카드 HTML 렌더 — population 별 분기.
export function renderNodeHtml(n: LayoutNode): string {
  if (n.population === 'region') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-region-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
          <span class="snn-canvas-neuron-menu">···</span>
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">active</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-region-count">0</span>
          </div>
        </div>
      </div>
    `;
  }
  if (n.population === 'camera' || n.population === 'gesture') {
    const placeholder = n.population === 'camera' ? 'Camera disabled' : 'Hand detection disabled';
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
          <span class="snn-canvas-neuron-menu">···</span>
        </div>
        <div class="snn-canvas-source-mount">
          <div class="snn-canvas-source-empty">
            <div>${placeholder}</div>
            <div class="snn-canvas-source-empty-hint">Enable from sidebar</div>
          </div>
        </div>
      </div>
    `;
  }
  if (n.population === 'output' || n.id.startsWith('out_')) {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-out-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
          <span class="snn-canvas-neuron-menu">···</span>
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">status</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-out-status">idle</span>
          </div>
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">rate</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-out-rate">0</span>
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
        <span class="snn-canvas-neuron-menu">···</span>
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

// 카메라 연결 여부에 따라 src_camera/src_gesture 발 시냅스 dim 토글.
export function applyCameraConnected(map: Record<string, Element>, connected: boolean) {
  for (const key in map) {
    const sep = key.indexOf('->');
    if (sep < 0) continue;
    const pre = key.slice(0, sep);
    if (pre !== 'src_camera' && pre !== 'src_gesture') continue;
    map[key].classList.toggle('snn-canvas-conn--inactive', !connected);
  }
}

// drawflow view-mode pan + wheel zoom (drawflow 기본 pan 우회).
export function attachManualPan(container: HTMLElement, ed: Drawflow) {
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
  };

  container.addEventListener('pointerdown', onDown);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerup', onUp);
  container.addEventListener('pointercancel', onUp);
  container.addEventListener('wheel', onWheel, { capture: true, passive: false });
}

// 모든 노드 bbox 가 viewport 안에 들어오도록 zoom + pan 자동 조정.
export function fitToView(ed: Drawflow, container: HTMLElement) {
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
  const padding = 0.92;
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
}

// Region 뷰 layout — 4개 영역 카드 (INPUT/V1/V2/OUT) + cascade 시냅스.
export function buildRegionLayout(neurons: Array<{ region?: string | null }>) {
  const REGIONS = [
    { id: 'INPUT', label: 'INPUT', x: 200, y: 240 },
    { id: 'V1',    label: 'V1',    x: 600, y: 240 },
    { id: 'V2',    label: 'V2',    x: 1000, y: 240 },
    { id: 'OUT',   label: 'OUT',   x: 1400, y: 240 },
  ];
  const counts: Record<string, number> = {};
  for (const n of neurons) {
    const r = n.region || 'OTHER';
    counts[r] = (counts[r] || 0) + 1;
  }
  const nodes: LayoutNode[] = REGIONS.map((r) => ({
    id: `region_${r.id}`,
    label: r.label,
    region: r.id,
    population: 'region',
    x: r.x,
    y: r.y,
    isSystem: true,
  }));
  const regionCounts: Record<string, number> = {};
  for (const r of REGIONS) regionCounts[r.id] = counts[r.id] || 0;
  return {
    nodes,
    synapses: [
      { pre: 'region_INPUT', post: 'region_V1', weight: 50 },
      { pre: 'region_V1', post: 'region_V2', weight: 50 },
      { pre: 'region_V2', post: 'region_OUT', weight: 50 },
    ],
    visibleNames: new Set(REGIONS.map((r) => `region_${r.id}`)),
    regionCounts,
  };
}
