/**
 * Circuit — INPUT/V1/V2/OUT 4 region, 각 region 안에 neuron dot grid.
 * Source: connection-status event 의 neurons + synapses (1회 fetch).
 * Position: state.positions 에 저장 (편집 가능, localStorage 보존).
 *           없으면 grid layout 으로 자동 배치.
 */
import { state, getNodePosition, setNodePosition, isEditMode } from './state.js';

const REGION_TO_LAYER = {
  INPUT: 'input',
  V1:    'v1',
  V2:    'v2',
  OUT:   'out',
};

let dragging = null;

export function renderCircuit(neurons /*, synapses*/) {
  const byRegion = { INPUT: [], V1: [], V2: [], OUT: [] };
  for (const n of neurons) {
    if (byRegion[n.region]) byRegion[n.region].push(n);
  }

  for (const region of ['INPUT', 'V1', 'V2', 'OUT']) {
    const layerId = REGION_TO_LAYER[region];
    const overlay = state.dotOverlays[layerId];
    if (!overlay) continue;
    // Align overlay to body's content area (overlay is panel sibling, must match body coords)
    alignDotsOverlay(layerId);
    overlay.innerHTML = '';
    layoutRegion(overlay, byRegion[region], layerId);
  }
}

function alignDotsOverlay(layerId) {
  const overlay = state.dotOverlays[layerId];
  const layer   = state.containers[layerId];
  if (!overlay || !layer) return;
  const body = layer.querySelector('.snn-layer-body');
  if (!body) return;
  const frame = overlay.parentElement;
  if (!frame) return;
  const frameRect = frame.getBoundingClientRect();
  const bodyRect  = body.getBoundingClientRect();
  if (bodyRect.width === 0 || bodyRect.height === 0) return;
  overlay.style.top    = `${bodyRect.top  - frameRect.top}px`;
  overlay.style.left   = `${bodyRect.left - frameRect.left}px`;
  overlay.style.width  = `${bodyRect.width}px`;
  overlay.style.height = `${bodyRect.height}px`;
}

function layoutRegion(body, neurons, layerId) {
  const rect = body.getBoundingClientRect();
  const w = rect.width || 200;
  const h = rect.height || 200;

  // Aspect-ratio aware grid: wider region → more columns
  const N = neurons.length || 1;
  const aspect = Math.max(0.2, w / Math.max(1, h));
  let cols = Math.max(1, Math.round(Math.sqrt(N * aspect)));
  cols = Math.min(cols, N);
  const rows = Math.ceil(N / cols);
  const padX = 16;
  const padY = 16;
  const innerW = Math.max(0, w - padX * 2);
  const innerH = Math.max(0, h - padY * 2);

  for (let i = 0; i < neurons.length; i++) {
    const n = neurons[i];
    const dot = document.createElement('div');
    dot.className = `snn-node ${layerId}`;
    dot.dataset.neuron = n.name;
    dot.title = `${n.name}\n${n.region} / ${n.population}`;

    let pos = getNodePosition(n.name);
    if (!pos) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = padX + (cols === 1 ? innerW / 2 : (innerW * c) / Math.max(1, cols - 1));
      const y = padY + (rows === 1 ? innerH / 2 : (innerH * r) / Math.max(1, rows - 1));
      pos = { x: x / w, y: y / h };
    }

    dot.style.left = `calc(${(pos.x * 100).toFixed(2)}% - 5px)`;
    dot.style.top  = `calc(${(pos.y * 100).toFixed(2)}% - 5px)`;

    attachDragHandlers(dot, body);
    body.appendChild(dot);
  }
}

function attachDragHandlers(dot, body) {
  dot.addEventListener('mousedown', (e) => {
    if (!isEditMode()) return;
    e.preventDefault();
    e.stopPropagation();
    dragging = {
      name: dot.dataset.neuron,
      dot,
      body,
      bodyRect: body.getBoundingClientRect(),
    };
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  });
}

function onDragMove(e) {
  if (!dragging) return;
  const { dot, bodyRect } = dragging;
  let x = (e.clientX - bodyRect.left) / bodyRect.width;
  let y = (e.clientY - bodyRect.top)  / bodyRect.height;
  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));
  dot.style.left = `calc(${(x * 100).toFixed(2)}% - 5px)`;
  dot.style.top  = `calc(${(y * 100).toFixed(2)}% - 5px)`;
  dragging.lastPos = { x, y };
  // 즉각 시냅스 line 재계산 (별도 module 의존 없이 dispatchEvent)
  window.dispatchEvent(new CustomEvent('snn-viz:positions-changed'));
}

function onDragEnd() {
  if (!dragging) return;
  if (dragging.lastPos) {
    setNodePosition(dragging.name, dragging.lastPos.x, dragging.lastPos.y);
  }
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
  dragging = null;
}

export function flashRegion(region) {
  const layerId = REGION_TO_LAYER[region];
  if (!layerId) return;
  const container = state.containers[layerId];
  if (!container) return;
  container.classList.add('region-active');
  setTimeout(() => container.classList.remove('region-active'), 800);
  const dots = container.querySelectorAll('.snn-node');
  dots.forEach(dot => {
    dot.classList.add('fired');
    setTimeout(() => dot.classList.remove('fired'), 600);
  });
}
