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
  return `snn-canvas-neuron snn-canvas-neuron--${popClass} snn-canvas-node-${n.id}`;
}

// 카드 HTML 렌더 — population 별 분기.
export function renderNodeHtml(n: LayoutNode): string {
  if (n.population === 'region') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-region-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
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
  if (n.population === 'camera') {
    // 카메라 mount 영역 — HandTrackerHost 가 #snn-cam-video 와 #snn-cam-skel 을 찾아 부착.
    // CameraQuickControls 가 #snn-cam-controls 에 React portal 로 mount.
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-source-mount" id="snn-cam-mount">
          <video id="snn-cam-video" class="snn-camera-mirror snn-cam-video" playsinline muted></video>
          <canvas id="snn-cam-skel" class="snn-camera-mirror snn-cam-skel" width="640" height="480"></canvas>
          <div id="snn-cam-empty" class="snn-canvas-source-empty">
            <div>Camera disabled</div>
            <div class="snn-canvas-source-empty-hint">Enable from sidebar</div>
          </div>
          <div id="snn-cam-controls" class="snn-cam-controls"></div>
        </div>
      </div>
    `;
  }
  if (n.population === 'gesture') {
    // 제스처 mount 영역 — 16-dim feature 막대 그래프 (HandTrackerHost 가 라이브 갱신).
    const bars = Array.from({ length: 16 }, (_, i) => `<div class="snn-feat-bar" data-i="${i}"><div class="snn-feat-bar-fill"></div></div>`).join('');
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-source-mount snn-feat-mount">
          <div class="snn-feat-bars">${bars}</div>
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
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-out-label-mount" data-out-key="${n.id}"></div>
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">rate</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-out-rate">0</span>
          </div>
        </div>
      </div>
    `;
  }
  return `
    <div class="snn-canvas-neuron-card">
      <div class="snn-canvas-neuron-header">
        <span class="snn-canvas-neuron-dot"></span>
        <span class="snn-canvas-neuron-label">${n.label}</span>
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

// drawflow view-mode pan + wheel/pinch zoom (drawflow 기본 pan 우회).
// 모바일: 1 finger = pan, 2 fingers = pinch zoom (pan 차단).
export function attachManualPan(container: HTMLElement, ed: Drawflow) {
  let panning = false;
  let pinching = false;
  let startX = 0, startY = 0, startCx = 0, startCy = 0;
  // pinch state — 두 손가락 사이 거리 + 중심 기준 zoom.
  let pinchStartDist = 0;
  let pinchStartZoom = 1;
  let pinchStartCx = 0, pinchStartCy = 0;
  let pinchAnchorDataX = 0, pinchAnchorDataY = 0;

  const applyTransform = () => {
    if (!ed.precanvas) return;
    ed.precanvas.style.transformOrigin = '0 0';
    ed.precanvas.style.transform =
      `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${ed.zoom})`;
  };

  const setZoomAtPoint = (mx: number, my: number, newZoom: number) => {
    const oldZoom = ed.zoom || 1;
    const dataX = (mx - (ed.canvas_x || 0)) / oldZoom;
    const dataY = (my - (ed.canvas_y || 0)) / oldZoom;
    ed.zoom = newZoom;
    ed.canvas_x = mx - dataX * newZoom;
    ed.canvas_y = my - dataY * newZoom;
    applyTransform();
  };

  // ── Pointer (mouse + 단일 터치 fallback) ──
  const onDown = (e: PointerEvent) => {
    if (ed.editor_mode === 'edit') return;
    if (pinching) return;
    if ((e.target as HTMLElement)?.closest('.input, .output, button')) return;
    panning = true;
    startX = e.clientX; startY = e.clientY;
    startCx = ed.canvas_x || 0; startCy = ed.canvas_y || 0;
    container.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const onMove = (e: PointerEvent) => {
    if (!panning || pinching) return;
    ed.canvas_x = startCx + (e.clientX - startX);
    ed.canvas_y = startCy + (e.clientY - startY);
    applyTransform();
  };
  const onUp = () => {
    panning = false;
    container.style.cursor = 'grab';
  };

  // ── Touch (모바일 pinch zoom) ──
  const dist = (t1: Touch, t2: Touch) =>
    Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  const center = (t1: Touch, t2: Touch, rect: DOMRect) => ({
    x: (t1.clientX + t2.clientX) / 2 - rect.left,
    y: (t1.clientY + t2.clientY) / 2 - rect.top,
  });

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      // 핀치 시작 → 진행 중이던 pan 무효화.
      panning = false;
      pinching = true;
      const rect = container.getBoundingClientRect();
      const c = center(e.touches[0], e.touches[1], rect);
      pinchStartDist = dist(e.touches[0], e.touches[1]);
      pinchStartZoom = ed.zoom || 1;
      pinchStartCx = ed.canvas_x || 0;
      pinchStartCy = ed.canvas_y || 0;
      pinchAnchorDataX = (c.x - pinchStartCx) / pinchStartZoom;
      pinchAnchorDataY = (c.y - pinchStartCy) / pinchStartZoom;
      e.preventDefault();
    }
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!pinching || e.touches.length !== 2) return;
    const rect = container.getBoundingClientRect();
    const c = center(e.touches[0], e.touches[1], rect);
    const d = dist(e.touches[0], e.touches[1]);
    const ratio = d / (pinchStartDist || 1);
    const newZoom = Math.max(
      ed.zoom_min || 0.2,
      Math.min(ed.zoom_max || 4, pinchStartZoom * ratio),
    );
    // 핀치 중심을 anchor 로 zoom + 핀치 중심 이동도 함께 추적 (pan-zoom 동시).
    ed.zoom = newZoom;
    ed.canvas_x = c.x - pinchAnchorDataX * newZoom;
    ed.canvas_y = c.y - pinchAnchorDataY * newZoom;
    applyTransform();
    e.preventDefault();
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (e.touches.length < 2) {
      pinching = false;
      // 1 finger 만 남으면 다음 pointer 이벤트가 자연스럽게 pan 재개.
      // 0 finger 이면 종료.
    }
  };

  // ── Wheel (desktop zoom) ──
  const onWheel = (e: WheelEvent) => {
    e.preventDefault(); e.stopPropagation();
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const oldZoom = ed.zoom || 1;
    const step = ed.zoom_value || 0.05;
    const dir = e.deltaY > 0 ? -1 : 1;
    const newZoom = Math.max(ed.zoom_min || 0.2, Math.min(ed.zoom_max || 4, oldZoom + step * dir));
    if (Math.abs(newZoom - oldZoom) < 1e-6) return;
    setZoomAtPoint(mx, my, newZoom);
  };

  // pointer (mouse + touch fallback)
  container.addEventListener('pointerdown', onDown);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerup', onUp);
  container.addEventListener('pointercancel', onUp);
  // touch (pinch zoom 전용 — pan 충돌 방지)
  container.addEventListener('touchstart', onTouchStart, { passive: false });
  container.addEventListener('touchmove', onTouchMove, { passive: false });
  container.addEventListener('touchend', onTouchEnd);
  container.addEventListener('touchcancel', onTouchEnd);
  // wheel (desktop)
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
