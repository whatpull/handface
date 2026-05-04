// Session 33 drawflow PoC: canvas 초기화 + node/edge 영역.
// Session 34 추가: neuron mode (52 노드 + ~120 synapse + weight gradient).

import Drawflow from 'drawflow';
import 'drawflow/dist/drawflow.min.css';
import {
  REGION_NODES,
  CASCADE_EDGES,
  NEURON_NODES,
  SOURCE_EDGES,
  DECODE_EDGES,
  weightColor,
} from './data.js';
import { regionNodeHtml } from './nodes.js';
// Session 39: 사용자 노드 위치 저장 (edit mode 드래그 후 영구 보존).
import { setNodePosition, loadPositions } from '../state.js';

let editor = null;
let mode = 'region'; // 'region' | 'neuron'
const nodeIdMap = {};   // neuron id -> drawflow node id (number)
const nodeRefMap = {};  // neuron id -> direct DOM element ref (drawflow auto-id catch 회피)
const connRefMap = {};  // 'pre->post' -> connection SVG element ref
const drawflowIdToName = {};  // drawflow node id (number) → neuron name (reverse lookup).

export function getCanvasMode() {
  return mode;
}

export function initCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('[snn-canvas] container 0:', containerId);
    return null;
  }

  destroyCanvas();
  mode = 'region';

  editor = new Drawflow(container);
  editor.reroute = true;
  editor.reroute_fix_curvature = true;
  editor.zoom_min = 0.2;
  editor.zoom_max = 9.99;
  editor.zoom_value = 0.05;
  editor.start();

  for (const region of REGION_NODES) {
    const id = editor.addNode(
      region.id,
      1, 1,
      region.x, region.y,
      `snn-canvas-node-${region.id.toLowerCase()}`,
      { region: region.id },
      regionNodeHtml(region),
      false,
    );
    nodeIdMap[region.id] = id;
  }

  for (const edge of CASCADE_EDGES) {
    const fromId = nodeIdMap[edge.from];
    const toId = nodeIdMap[edge.to];
    if (fromId && toId) {
      editor.addConnection(fromId, toId, 'output_1', 'input_1');
    }
  }

  editor.editor_mode = 'view';
  attachManualPan(container);
  attachMenuHandler(container);
  applyStepPaths();
  patchUpdateConnectionNodes();
  setTimeout(() => fitCanvasToNodes(0.9), 200);

  return editor;
}

export function initCanvasNeuron(containerId, synapses, dynamicNeurons = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('[snn-canvas] container 0:', containerId);
    return null;
  }

  destroyCanvas();
  mode = 'neuron';

  editor = new Drawflow(container);
  editor.reroute = false;                  // reroute 영역 0 (깔끔 영역).
  editor.reroute_fix_curvature = false;
  editor.curvature = 0;                    // 직선 (사용자 catch 정합 — bezier 영역 cross 영역 영역 영역).
  editor.zoom_min = 0.2;
  editor.zoom_max = 9.99;
  editor.zoom_value = 0.05;
  editor.draggable_inputs = false;
  editor.force_first_input = false;
  editor.line_path = 2;
  editor.start();
  editor.editor_mode = 'view';

  // Session 39: 노드 드래그 후 위치 영구 저장 (edit mode 에서 사용자 직접 이동).
  // drawflow 'nodeMoved' 이벤트 (drag end 시 발화) → drawflow id 를 neuron name 으로
  // 역매핑 → setNodePosition 호출 (state.positions Map 갱신 + localStorage save).
  // P206 ext: 편집 모드 드래그 후 같은 그룹 자동 snap (300ms debounce).
  let dragSnapTimer = null;
  editor.on('nodeMoved', (id) => {
    const name = drawflowIdToName[id];
    if (!name) return;
    try {
      const node = editor.getNodeFromId(id);
      if (node && typeof node.pos_x === 'number' && typeof node.pos_y === 'number') {
        setNodePosition(name, node.pos_x, node.pos_y);
      }
    } catch (_) { /* ignore */ }
    // 자동 snap — 같은 (region, population) 그룹의 다른 노드들 등간격 재배치.
    clearTimeout(dragSnapTimer);
    dragSnapTimer = setTimeout(() => {
      try {
        const el = document.getElementById(`node-${id}`);
        if (!el) return;
        const region = el.dataset.region;
        const population = el.dataset.population;
        if (!region || region === '?') return;
        // 이 그룹만 정렬 (전체 X 다른 그룹 영향 X).
        autoLayoutByRegion({
          minGap: 16,
          onlyGroup: `${region}:${population}`,
        });
      } catch (_) { /* ignore */ }
    }, 300);
  });

  // Session 36: 본격 manual pan handler 영역 (drawflow 'view' mode pan 영역 catch 회피).
  // mousedown + mousemove + mouseup 영역 직접 영역 → editor.canvas_x/y + transform 갱신.
  attachManualPan(container);
  attachMenuHandler(container);

  // fit-to-view — 모든 노드 bbox 영역 영역 자동 zoom + center pan.
  // setTimeout 영역 → drawflow node DOM offsetWidth/Height 영역 영역 영역 영역 영역.
  setTimeout(() => fitCanvasToNodes(0.9), 200);

  // 52 preset neuron + dynamic grown neurons.
  // Session 38: NEURON_NODES (preset) 모두 isSystem=true 로 마크 → 잠금 표시.
  // dynamicNeurons 중 isSystem 명시 안 된 grown 뉴런도 isSystem=true (시스템이 추가).
  const allNeurons = [
    ...NEURON_NODES.map(n => ({ ...n, isSystem: true })),
    ...dynamicNeurons.map(n => ({ ...n, isSystem: n.isSystem !== false })),
  ];
  for (const neuron of allNeurons) {
    const lockClass = neuron.isSystem ? ' snn-canvas-neuron--locked' : '';
    const userInputClass = neuron.isUserInput ? ' snn-canvas-neuron--user-input' : '';
    const id = editor.addNode(
      neuron.id,
      1, 1,
      neuron.x, neuron.y,
      `snn-canvas-neuron snn-canvas-neuron--${neuron.population.toLowerCase()} snn-canvas-node-${neuron.id}${lockClass}${userInputClass}`,
      { neuron: neuron.id, region: neuron.region, population: neuron.population, system: neuron.isSystem ? '1' : '0' },
      neuronNodeHtml(neuron),
      false,
    );
    nodeIdMap[neuron.id] = id;
    drawflowIdToName[id] = neuron.id;  // Session 39: drag end 역매핑.
    // direct DOM ref (drawflow render synchronous 통과 영역 영역 영역).
    const el = document.getElementById(`node-${id}`);
    if (el) {
      nodeRefMap[neuron.id] = el;
      // Phase 201: data-region 속성 부여 + region prefix 별 그룹화 highlight.
      el.dataset.region = neuron.region || '?';
      el.dataset.population = neuron.population || '?';
    }
  }

  // Phase 201: region hover highlight — same region 노드 강조.
  attachRegionHoverHighlight(container);

  // synapse edge (backend response 사용 + SOURCE + DECODE pathway 영역 frontend fixed).
  // Session 37 Phase 4: DECODE_EDGES = 직접 INPUT → OUT 영역 (D120 backend 영역 영역).
  const backendSyn = Array.isArray(synapses) ? synapses : [];
  const allSyn = [...SOURCE_EDGES, ...backendSyn, ...DECODE_EDGES];
  for (const syn of allSyn) {
    const fromId = nodeIdMap[syn.pre];
    const toId = nodeIdMap[syn.post];
    if (fromId && toId) {
      editor.addConnection(fromId, toId, 'output_1', 'input_1');
      const selector = `.connection.node_in_node-${toId}.node_out_node-${fromId}`;
      const conn = container.querySelector(selector);
      if (conn) connRefMap[`${syn.pre}->${syn.post}`] = conn;
    }
  }

  applyEdgeColors(allSyn);
  patchUpdateConnectionNodes();

  // Session 36: source 노드 (Camera + Gesture) mount 통과 영역 → scene.js 영역 ASCII camera + hand skeleton mount.
  window.dispatchEvent(new CustomEvent('snn-canvas:source-mounted'));

  return editor;
}

// Session 36: node menu (...) click → submenu (Delete) 영역 정정.
// drawflow default delete button (X) hide + ... menu 영역 정합 영역.
let activeSubmenu = null;

function closeSubmenu() {
  if (activeSubmenu) {
    activeSubmenu.remove();
    activeSubmenu = null;
  }
}

function openSubmenu(menuEl, nodeId, dfId) {
  closeSubmenu();
  const submenu = document.createElement('div');
  submenu.className = 'snn-canvas-node-submenu';

  const deleteItem = document.createElement('div');
  deleteItem.className = 'snn-canvas-node-submenu-item snn-canvas-node-submenu-item--delete';
  deleteItem.innerHTML = '<span class="snn-canvas-node-submenu-icon">×</span><span>Delete node</span>';
  deleteItem.addEventListener('click', (e) => {
    e.stopPropagation();
    if (editor && dfId) {
      editor.removeNodeId(`node-${dfId}`);
      delete nodeIdMap[nodeId];
      delete nodeRefMap[nodeId];
      for (const key of Object.keys(connRefMap)) {
        if (key.startsWith(`${nodeId}->`) || key.endsWith(`->${nodeId}`)) {
          delete connRefMap[key];
        }
      }
    }
    closeSubmenu();
  });
  submenu.appendChild(deleteItem);

  // ... menu button 영역 자식 영역 영역 → button 영역 영역 dropdown + drawflow zoom transform 영역 영역.
  menuEl.appendChild(submenu);
  activeSubmenu = submenu;
}

// Phase 201: region hover highlight — mouseenter on node → 같은 region 모든 노드 강조.
// CSS class .snn-canvas-region-highlight 를 사용해 시각 강조.
function attachRegionHoverHighlight(container) {
  if (!container) return;
  container.addEventListener('mouseenter', (e) => {
    const node = e.target?.closest?.('.drawflow-node');
    if (!node) return;
    const region = node.dataset?.region;
    if (!region || region === '?') return;
    container.classList.add('snn-region-hover-active');
    container.querySelectorAll(`.drawflow-node[data-region="${region}"]`)
      .forEach((n) => n.classList.add('snn-canvas-region-highlight'));
  }, true);
  container.addEventListener('mouseleave', (e) => {
    const node = e.target?.closest?.('.drawflow-node');
    if (!node) return;
    container.classList.remove('snn-region-hover-active');
    container.querySelectorAll('.snn-canvas-region-highlight')
      .forEach((n) => n.classList.remove('snn-canvas-region-highlight'));
  }, true);
}

function attachMenuHandler(container) {
  if (!container) return;
  // event delegation — node menu (.snn-canvas-region-menu / .snn-canvas-neuron-menu) click.
  container.addEventListener('click', (e) => {
    const menuEl = e.target.closest('.snn-canvas-region-menu, .snn-canvas-neuron-menu');
    if (!menuEl) return;
    e.stopPropagation();
    const drawflowNode = menuEl.closest('.drawflow-node');
    if (!drawflowNode) return;
    const dfId = drawflowNode.id.replace('node-', '');
    // neuron id 영역 영역 (class 영역 영역 추출).
    let nodeId = null;
    for (const id in nodeIdMap) {
      if (String(nodeIdMap[id]) === dfId) { nodeId = id; break; }
    }
    if (!nodeId) return;
    openSubmenu(menuEl, nodeId, dfId);
  });
}

// global click → submenu close (submenu 외부 click 영역 영역).
window.addEventListener('click', (e) => {
  if (activeSubmenu && !e.target.closest('.snn-canvas-node-submenu') && !e.target.closest('.snn-canvas-region-menu, .snn-canvas-neuron-menu')) {
    closeSubmenu();
  }
});

// Session 36: manual pan handler — drawflow 'view' mode pan catch 회피.
// pointer event 영역 mouse + touch 통합 (모바일 영역 영역).
// + pinch zoom (2 finger 영역) 영역 영역.
function attachManualPan(container) {
  if (!container || !editor) return;

  let panning = false;
  let startX = 0;
  let startY = 0;
  let startCanvasX = 0;
  let startCanvasY = 0;
  // pinch zoom state (touch 영역 영역).
  let pinching = false;
  let pinchStartDist = 0;
  let pinchStartZoom = 1;

  function isInteractive(target) {
    // input port + button + form control + Camera/Gesture source mount (enableCamera click 영역).
    // Session 39: user-card (사용자 INPUT/OUTPUT 노드) 도 interactive — 클릭 시 dialog 열림 위해 panning 차단.
    return !!target.closest('.input, .output, button, input, textarea, select, .snn-canvas-source-mount, .snn-canvas-source-card, .snn-canvas-user-card, .snn-canvas-user-out-card');
  }

  function isMenuTarget(target) {
    return !!target.closest('.snn-canvas-region-menu, .snn-canvas-neuron-menu, .snn-canvas-node-submenu');
  }

  function onPointerDown(e) {
    if (isMenuTarget(e.target)) return;
    closeSubmenu();
    if (editor.editor_mode === 'edit') return;
    if (isInteractive(e.target)) return;
    panning = true;
    startX = e.clientX;
    startY = e.clientY;
    startCanvasX = editor.canvas_x || 0;
    startCanvasY = editor.canvas_y || 0;
    container.style.cursor = 'grabbing';
    if (e.pointerId !== undefined) {
      try { container.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
    }
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!panning) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    editor.canvas_x = startCanvasX + dx;
    editor.canvas_y = startCanvasY + dy;
    if (editor.precanvas) {
      editor.precanvas.style.transform =
        `translate(${editor.canvas_x}px, ${editor.canvas_y}px) scale(${editor.zoom})`;
    }
  }

  function onPointerUp() {
    if (!panning) return;
    panning = false;
    container.style.cursor = 'grab';
  }

  // touchstart — 2 finger pinch zoom + 1 finger pan (pointer event 영역 영역 다중 finger 영역 영역).
  function getTouchDist(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function onTouchStart(e) {
    if (e.touches.length === 2) {
      pinching = true;
      panning = false;
      pinchStartDist = getTouchDist(e.touches[0], e.touches[1]);
      pinchStartZoom = editor.zoom || 1;
      e.preventDefault();
    }
  }

  function onTouchMove(e) {
    if (!pinching || e.touches.length !== 2) return;
    const dist = getTouchDist(e.touches[0], e.touches[1]);
    const ratio = dist / (pinchStartDist || 1);
    const newZoom = Math.max(
      editor.zoom_min || 0.2,
      Math.min(editor.zoom_max || 2.5, pinchStartZoom * ratio),
    );
    editor.zoom = newZoom;
    if (editor.precanvas) {
      editor.precanvas.style.transform =
        `translate(${editor.canvas_x || 0}px, ${editor.canvas_y || 0}px) scale(${newZoom})`;
    }
    applyStepPaths();
    window.dispatchEvent(new CustomEvent('snn-canvas:zoom-changed', { detail: { zoom: newZoom } }));
    e.preventDefault();
  }

  function onTouchEnd(e) {
    if (e.touches.length < 2) {
      pinching = false;
    }
  }

  // Session 39: 마우스 위치 기준 zoom — Figma/draw.io 표준. drawflow native wheel
  // 비활성화 + 직접 transform 적용 → 마우스 아래 데이터 점이 화면 같은 위치 유지.
  function onWheel(e) {
    if (!editor) return;
    closeSubmenu();
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const oldZoom = editor.zoom || 1;
    const oldCx = editor.canvas_x || 0;
    const oldCy = editor.canvas_y || 0;
    // transform-origin '0 0' 기준 데이터 좌표 (마우스 아래 데이터 점).
    const dataX = (mouseX - oldCx) / oldZoom;
    const dataY = (mouseY - oldCy) / oldZoom;
    // zoom 변화량 — 부드러운 step.
    const step = editor.zoom_value || 0.05;
    const direction = e.deltaY > 0 ? -1 : 1;
    const newZoom = Math.max(
      editor.zoom_min || 0.2,
      Math.min(editor.zoom_max || 2.5, oldZoom + step * direction),
    );
    if (Math.abs(newZoom - oldZoom) < 1e-6) return;
    // 마우스 위치 고정: canvas_x = mouseX - dataX * newZoom.
    const newCx = mouseX - dataX * newZoom;
    const newCy = mouseY - dataY * newZoom;
    editor.zoom = newZoom;
    editor.canvas_x = newCx;
    editor.canvas_y = newCy;
    if (editor.precanvas) {
      editor.precanvas.style.transformOrigin = '0 0';
      editor.precanvas.style.transform =
        `translate(${newCx}px, ${newCy}px) scale(${newZoom})`;
    }
    applyStepPaths();
    window.dispatchEvent(new CustomEvent('snn-canvas:zoom-changed', { detail: { zoom: newZoom } }));
  }

  // pointer events (mouse + touch 통합).
  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp);
  container.addEventListener('pointercancel', onPointerUp);
  container.addEventListener('pointerleave', onPointerUp);

  // touch events (pinch zoom 영역).
  container.addEventListener('touchstart', onTouchStart, { passive: false });
  container.addEventListener('touchmove', onTouchMove, { passive: false });
  container.addEventListener('touchend', onTouchEnd);
  container.addEventListener('touchcancel', onTouchEnd);

  // wheel zoom (desktop) — capture phase + non-passive 로 drawflow native handler 우선 차단.
  container.addEventListener('wheel', onWheel, { capture: true, passive: false });

  // touch-action 영역 = 영역 영역 영역 0 (browser native scroll/zoom 영역 영역).
  container.style.touchAction = 'none';
}

// Session 36: fitToView — 모든 노드 bbox 영역 영역 자동 zoom + center pan.
// bbox = drawflow node DOM 영역 (left/top + offsetWidth/offsetHeight) 영역 직접 영역.
// container.clientWidth/Height 영역 ready 영역 영역 영역 = double RAF 영역 영역.
// Phase 206 (revised): Auto-layout — region + population 단위 그룹 별 수직 동일 간격 정렬.
// 모든 노드 (canonical 포함) 정렬. 사용자 의도: "항상 반듯하고 좋은 간격".
// 1. (region, population) 그룹에 속한 노드 수집.
// 2. 그룹 내 X 는 median 으로 정렬 (defensive — 같은 그룹은 같은 X 여야 정상).
// 3. Y 는 canvas 중심 기준 동적 spacing (각 노드 height + MIN_GAP 누적).
// 4. drawflow data + DOM 직접 갱신 + updateConnectionNodes (patched: applyStepPaths 자동).
// excludeRegions 옵션으로 특정 region 제외 가능 (default: 비어있음).
const AUTOLAYOUT_EXCLUDE_REGIONS_DEFAULT = new Set(['?']);   // unknown 만 제외.

export function autoLayoutByRegion(opts = {}) {
  if (!editor) return { ok: false, reason: 'editor not initialized' };
  const container = document.getElementById('nf-snn-canvas');
  if (!container) return { ok: false, reason: 'canvas not mounted' };
  const MIN_GAP = opts.minGap ?? 16;                 // 노드 간 최소 여백 (px).
  const FALLBACK_HEIGHT = opts.fallbackHeight ?? 60; // offsetHeight 0 일 때 fallback.
  const CANVAS_CENTER_Y = opts.centerY ?? 630;       // gridPos 와 동일 (TOP_PAD 80 + 5 * ROW_HEIGHT 110).
  const excludeRegions = new Set(opts.excludeRegions || AUTOLAYOUT_EXCLUDE_REGIONS_DEFAULT);
  const onlyGroup = opts.onlyGroup || null;          // 'region:population' 한 그룹만 (드래그 후 snap).
  const useGroupCenter = opts.useGroupCenter !== false && !!onlyGroup;
  const groups = new Map();   // 'region:population' → [{ id, name, el, x, y, h }]
  container.querySelectorAll('.drawflow-node[data-region]').forEach((el) => {
    const region = el.dataset.region || '?';
    const population = el.dataset.population || '?';
    if (excludeRegions.has(region)) return;
    const id = parseInt(el.id?.replace('node-', ''), 10);
    const name = drawflowIdToName[id];
    if (!name || isNaN(id)) return;
    const key = `${region}:${population}`;
    const x = parseFloat(el.style.left) || 0;
    const y = parseFloat(el.style.top) || 0;
    // P206 fix: 노드의 실제 height 측정 (OUT/Notify/Console 등 큰 카드 대응).
    const h = el.offsetHeight || el.getBoundingClientRect().height || FALLBACK_HEIGHT;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ id, name, el, x, y, h });
  });
  let touched = 0;
  const movedIds = [];
  for (const [key, nodes] of groups) {
    if (onlyGroup && key !== onlyGroup) continue;
    if (nodes.length < 2) continue;   // 단일 노드는 건드릴 필요 없음.
    // X median 으로 정렬 (같은 그룹은 같은 X 여야 함).
    const xs = nodes.map(n => n.x).sort((a, b) => a - b);
    const targetX = xs[Math.floor(xs.length / 2)];
    // Sort by current Y → 기존 상대 순서 유지.
    nodes.sort((a, b) => a.y - b.y);
    // Dynamic spacing: 각 인접 쌍 간격 = (prev.h + curr.h)/2 + MIN_GAP.
    // 모든 spacing 누적해서 totalHeight 계산.
    const yPositions = [];
    let cursor = 0;
    nodes.forEach((node, i) => {
      if (i === 0) {
        yPositions.push(0);
        cursor = node.h;
      } else {
        // i-1 노드 bottom 부터 MIN_GAP 띄우고 i 노드 top 위치.
        const yTop = cursor + MIN_GAP;
        yPositions.push(yTop);
        cursor = yTop + node.h;
      }
    });
    const totalHeight = cursor;   // 마지막 노드 bottom = 그룹 전체 height.
    // 단일 그룹 (드래그 snap) 시 그룹 현재 중심 보존, 전체 정렬은 canvas center 기준.
    const groupCenterY = useGroupCenter
      ? nodes.reduce((s, n) => s + (n.y + n.h / 2), 0) / nodes.length
      : CANVAS_CENTER_Y;
    const groupTopY = groupCenterY - totalHeight / 2;
    nodes.forEach((node, i) => {
      const newX = targetX;
      const newY = groupTopY + yPositions[i];
      if (Math.abs(node.x - newX) < 1 && Math.abs(node.y - newY) < 1) return;
      try {
        // drawflow data 직접 갱신 (updateNodePosition API 부재 대비).
        const nodeData = editor.getNodeFromId?.(node.id);
        if (nodeData) {
          nodeData.pos_x = newX;
          nodeData.pos_y = newY;
        }
        // DOM 갱신.
        node.el.style.left = `${newX}px`;
        node.el.style.top = `${newY}px`;
        setNodePosition(node.name, newX, newY);
        movedIds.push(node.id);
        touched++;
      } catch (_) { /* ignore */ }
    });
  }
  // Connection 위치 업데이트 — patched updateConnectionNodes 가 applyStepPaths 자동 실행.
  try {
    if (typeof editor.updateConnectionNodes === 'function') {
      movedIds.forEach((id) => editor.updateConnectionNodes(`node-${id}`));
    }
  } catch (_) { /* ignore */ }
  // 명시적 step path 재적용 (안전장치).
  try { applyStepPaths(); } catch (_) { /* ignore */ }
  return {
    ok: true,
    groups: groups.size,
    nodes_moved: touched,
    min_gap: MIN_GAP,
  };
}

export function fitCanvasToNodes(padding = 0.9) {
  if (!editor || !editor.precanvas) return;
  const container = editor.container;
  if (!container) return;

  // double RAF 영역 layout 영역 ready 보장.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => doFit(padding));
  });
}

// Phase 208: viewport 변경 (URL bar 변동, 회전, 키보드 등) 시 자동 re-fit.
// debounce 200ms 로 과도한 재계산 방지.
let viewportRefitTimer = null;
window.addEventListener('snn-canvas:viewport-changed', () => {
  if (!editor) return;
  clearTimeout(viewportRefitTimer);
  viewportRefitTimer = setTimeout(() => fitCanvasToNodes(0.9), 200);
});

function doFit(padding) {
  if (!editor || !editor.precanvas) return;
  const container = editor.container;
  if (!container) return;

  const nodes = editor.precanvas.querySelectorAll('.drawflow-node');
  if (nodes.length === 0) return;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach((node) => {
    const left = parseFloat(node.style.left) || 0;
    const top = parseFloat(node.style.top) || 0;
    const w = node.offsetWidth || 160;
    const h = node.offsetHeight || 80;
    if (left < minX) minX = left;
    if (top < minY) minY = top;
    if (left + w > maxX) maxX = left + w;
    if (top + h > maxY) maxY = top + h;
  });

  const bboxW = maxX - minX;
  const bboxH = maxY - minY;
  // container 영역 = #nf-snn-canvas (.nf-app-main grid 1fr 영역 영역).
  const rect = container.getBoundingClientRect();
  const viewportW = rect.width;
  // Phase 208 (final): 화면 *절대 visible 영역* 기준 (visualViewport - URL bar - footer).
  // 컨테이너 박스가 URL bar 위까지 늘어나도, 사용자가 실제로 보는 영역의 중앙에 정렬.
  // visualViewport 가 URL bar 변동 자동 반영 → 그 영역에서 footer 만 추가 차감.
  const vvH = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  const vvTop = (window.visualViewport && window.visualViewport.offsetTop) || 0;
  // 모바일 footer (.nf-bottom-bar) 측정.
  const footerEl = document.querySelector('.nf-bottom-bar:not([style*="display: none"])')
    || document.querySelector('.nf-mobile-footer, .nf-app-footer, [data-canvas-footer]')
    || document.querySelector('footer');
  let bottomBarH = 0;
  if (footerEl && footerEl.offsetParent !== null) {
    const fr = footerEl.getBoundingClientRect();
    // footer 가 visible 영역 안에 overlay 되는 경우만.
    const visualBottom = vvTop + vvH;
    if (fr.height > 0 && fr.top < visualBottom && fr.bottom > vvTop) {
      bottomBarH = Math.min(fr.height, visualBottom - fr.top);
    }
  }
  // 화면 절대 좌표계의 visible 영역.
  const visibleTopAbs = vvTop;
  const visibleBottomAbs = vvTop + vvH - bottomBarH;
  // container 좌표계 (rect.top 기준 상대값) 변환.
  const visibleTop = visibleTopAbs - rect.top;
  const visibleBottom = visibleBottomAbs - rect.top;
  const viewportH = Math.max(0, visibleBottom - visibleTop);
  if (bboxW <= 0 || bboxH <= 0 || viewportW <= 0 || viewportH <= 0) return;

  // zoom = min(viewport / bbox) × padding factor.
  const zoomX = viewportW / bboxW;
  const zoomY = viewportH / bboxH;
  const targetZoom = Math.max(
    editor.zoom_min || 0.2,
    Math.min(editor.zoom_max || 2.5, Math.min(zoomX, zoomY) * padding),
  );

  // center pan: bbox center 영역 visible 영역 정 가운데 (top + bottom) / 2 에 정합.
  const visibleCenterY = (visibleTop + visibleBottom) / 2;
  const bboxCenterX = (minX + maxX) / 2;
  const bboxCenterY = (minY + maxY) / 2;
  const targetCanvasX = viewportW / 2 - bboxCenterX * targetZoom;
  const targetCanvasY = visibleCenterY - bboxCenterY * targetZoom;

  editor.zoom = targetZoom;
  editor.canvas_x = targetCanvasX;
  editor.canvas_y = targetCanvasY;
  editor.precanvas.style.transformOrigin = '0 0';
  editor.precanvas.style.transform =
    `translate(${targetCanvasX}px, ${targetCanvasY}px) scale(${targetZoom})`;
  applyStepPaths();
  window.dispatchEvent(new CustomEvent('snn-canvas:zoom-changed', { detail: { zoom: targetZoom } }));
  // Session 39: fit (auto zoom + center) 완료 — 다음 frame 에 transform 적용 후 이벤트 발행.
  // scene.js 의 setCanvasLoading(false) 가 이 이벤트로 hide.
  requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent('snn-canvas:fit-complete', {
      detail: { zoom: targetZoom, canvasX: targetCanvasX, canvasY: targetCanvasY },
    }));
  });
}

// Session 36: header zoom control 영역 영역 — drawflow zoom 영역 직접 영역.
export function setCanvasZoom(zoomFraction) {
  if (!editor) return;
  const z = Math.max(editor.zoom_min || 0.2, Math.min(editor.zoom_max || 2.5, zoomFraction));
  editor.zoom = z;
  if (editor.precanvas) {
    editor.precanvas.style.transform =
      `translate(${editor.canvas_x || 0}px, ${editor.canvas_y || 0}px) scale(${z})`;
  }
  // step path 영역 zoom 영역 영역 → 재 patch.
  applyStepPaths();
  window.dispatchEvent(new CustomEvent('snn-canvas:zoom-changed', { detail: { zoom: z } }));
}

export function getCanvasZoom() {
  return editor ? (editor.zoom || 1) : 1;
}

export function setEditorMode(modeName) {
  if (!editor) return;
  const isEdit = modeName === 'edit';
  // drawflow editor_mode:
  //   'edit' = node drag + connection + zoom + pan (사용자 명시 영역만, Edit click)
  //   'view' = node drag 차단 + 모든 영역 click → pan + zoom (default, view-only Normal)
  editor.editor_mode = isEdit ? 'edit' : 'view';
  // CSS class toggle — pointer-events 영역 영역 (view 영역 = node click 영역 → pan 가능, edit 영역 = node drag 영역).
  const container = document.getElementById('nf-snn-canvas');
  if (container) {
    container.classList.toggle('snn-canvas-edit', isEdit);
  }
}

function neuronNodeHtml(neuron) {
  // OUT 영역 — 영역 영역 영역 영역 추가 (rate / active state).
  if (neuron.population === 'output') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-out-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${neuron.label}</span>
          <span class="snn-canvas-neuron-menu">···</span>
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">status</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-out-status" id="snn-canvas-out-status-${neuron.id}">idle</span>
          </div>
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">rate</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-out-rate" id="snn-canvas-out-rate-${neuron.id}">0</span>
          </div>
        </div>
      </div>
    `;
  }
  // SOURCE 영역 (camera / gesture) 영역 = mount container 영역 (ASCII camera + hand skeleton 영역).
  if (neuron.population === 'camera') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card snn-canvas-source-card--camera">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${neuron.label}</span>
          <span class="snn-canvas-neuron-menu">···</span>
        </div>
        <div class="snn-canvas-source-mount" id="snn-canvas-camera-mount" data-source="camera">
          <div class="snn-canvas-source-empty">
            <div>Camera disabled</div>
            <div class="snn-canvas-source-empty-hint">Enable from left sidebar</div>
          </div>
        </div>
      </div>
    `;
  }
  if (neuron.population === 'gesture') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card snn-canvas-source-card--gesture">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${neuron.label}</span>
          <span class="snn-canvas-neuron-menu">···</span>
        </div>
        <div class="snn-canvas-source-mount" id="snn-canvas-gesture-mount" data-source="gesture">
          <div class="snn-canvas-source-empty">
            <div>Hand detection disabled</div>
            <div class="snn-canvas-source-empty-hint">Enable camera first</div>
          </div>
        </div>
      </div>
    `;
  }
  // Session 38: 시스템 노드 잠금 아이콘 + USER INPUT 노드 별도 표시.
  const lockIcon = neuron.isSystem ? '<span class="snn-canvas-neuron-lock" title="시스템 노드 (편집 불가)">🔒</span>' : '';
  const userBadge = neuron.isUserInput ? '<span class="snn-canvas-neuron-user-badge" title="사용자 추가">USR</span>' : '';

  // Session 38 PR-J: 사용자 INPUT 노드 — modality kind별 inline widget.
  if (neuron.isUserInput) {
    return userInputNodeHtml(neuron, userBadge);
  }
  // Session 39 PR-N: 사용자 OUTPUT 노드 — action kind 표시 + status row.
  if (neuron.isUserOutput) {
    return userOutputNodeHtml(neuron);
  }

  return `
    <div class="snn-canvas-neuron-card">
      <div class="snn-canvas-neuron-header">
        <span class="snn-canvas-neuron-dot"></span>
        <span class="snn-canvas-neuron-label">${neuron.label}</span>
        ${userBadge}
        ${lockIcon}
        <span class="snn-canvas-neuron-menu">···</span>
      </div>
      <div class="snn-canvas-neuron-body">
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">region</span>
          <span class="snn-canvas-neuron-row-value">${neuron.region}</span>
        </div>
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">pop</span>
          <span class="snn-canvas-neuron-row-value">${neuron.population}</span>
        </div>
      </div>
    </div>
  `;
}

// drawflow connection SVG class = node_in_node-{toId} + node_out_node-{fromId} (drawflow.min.js 내부 사실).
// Session 38 PR-J: 사용자 INPUT 노드 — modality kind별 inline widget 템플릿.
// 각 노드는 자기 modality 인코더 UI 보유 (Audio: mic capture, Text: input + Encode 등).
// 클릭 이벤트는 PR-K (scene.js) 에서 wireUserInputNodeHandlers 로 attach.
// drawflow 가 노드 자체를 drag 대상으로 잡으므로, widget 요소 (input/button) 의
// pointerdown/mousedown 을 stopPropagation 해서 drag 시작 차단 (focus/click 가능).
function userInputNodeHtml(neuron, userBadge) {
  const kind = neuron.kind || 'custom';
  const id = neuron.id;
  // 노드 widget 인터랙션을 drawflow drag 로부터 격리.
  const stop = 'onpointerdown="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()"';
  const headerCommon = `
    <div class="snn-canvas-neuron-header">
      <span class="snn-canvas-neuron-dot"></span>
      <span class="snn-canvas-neuron-label">${neuron.label}</span>
      ${userBadge}
    </div>
  `;
  // Session 39: 모든 USER INPUT modality 통일 — ✏️ 편집 버튼 → dialog 흐름.
  // dialog 에서 modality widget (mic capture / text input / custom slider) + Route to OUTPUT 선택.
  const labels = {
    audio: '🎤 마이크 capture + inject',
    text: '✏️ 텍스트 편집 + inject',
    image: '🖼️ 이미지 편집 + inject',
    motion: '📱 motion + inject',
    keyboard: '⌨️ keyboard + inject',
    mouse: '🖱️ mouse + inject',
    geo: '📍 위치 + inject',
    eeg: '🧠 EEG capture + inject',
    custom: '✏️ 편집 + inject',
  };
  const btnLabel = labels[kind] || labels.custom;
  return `
    <div class="snn-canvas-neuron-card snn-canvas-user-card snn-canvas-user-card--${kind}">
      ${headerCommon}
      <div class="snn-canvas-user-body">
        <div class="snn-canvas-user-actions">
          <button class="snn-canvas-user-btn" data-action="edit-node" data-node="${id}" data-kind="${kind}" type="button" ${stop}>${btnLabel}</button>
        </div>
      </div>
    </div>
  `;
}

// Session 39 PR-N: 사용자 OUT 노드 — action kind 표시 + 발화 시 status 갱신.
// 발화 detection 은 scene.js applyFireToCanvas 가 firingRate > 0 시 trigger.
function userOutputNodeHtml(neuron) {
  const kind = neuron.kind || 'notification';
  const id = neuron.id;
  const kindIcon = {
    notification: '🔔', speak: '🔊', webhook: '🌐', console: '📟', custom: '⚙️',
  };
  const cfg = neuron.actionConfig || {};
  let cfgPreview = '';
  if (kind === 'notification') cfgPreview = cfg.title || cfg.body || '(no msg)';
  else if (kind === 'speak') cfgPreview = cfg.text || '(no text)';
  else if (kind === 'webhook') cfgPreview = cfg.url || '(no url)';
  else if (kind === 'console') cfgPreview = cfg.tag || 'log';
  const editLabels = {
    notification: '✏️ 알림 편집',
    speak: '✏️ TTS 편집',
    webhook: '✏️ Webhook 편집',
    console: '✏️ Console 편집',
    custom: '✏️ 편집',
  };
  const editLabel = editLabels[kind] || editLabels.custom;
  const stop = 'onpointerdown="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()"';
  return `
    <div class="snn-canvas-neuron-card snn-canvas-out-card snn-canvas-user-out-card">
      <div class="snn-canvas-neuron-header">
        <span class="snn-canvas-neuron-dot"></span>
        <span class="snn-canvas-neuron-label">${neuron.label}</span>
        <span class="snn-canvas-neuron-user-badge" title="사용자 추가 액션">ACT</span>
      </div>
      <div class="snn-canvas-neuron-body">
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">${kindIcon[kind] || '⚙️'} ${kind}</span>
          <span class="snn-canvas-neuron-row-value snn-canvas-out-rate" id="snn-canvas-out-rate-${id}">0</span>
        </div>
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label snn-canvas-out-cfg-preview" title="${cfgPreview}">${cfgPreview}</span>
          <span class="snn-canvas-neuron-row-value snn-canvas-out-status" id="snn-canvas-out-status-${id}">idle</span>
        </div>
      </div>
      <div class="snn-canvas-user-body">
        <div class="snn-canvas-user-actions">
          <button class="snn-canvas-user-btn" data-action="edit-out" data-node="${id}" data-kind="${kind}" type="button" ${stop}>${editLabel}</button>
        </div>
      </div>
    </div>
  `;
}

// default 영역 영역 영역 영역 visible (CSS 영역 stroke rgba 0.06 영역 통합) — fired 시점 영역만 영역 영역.
// weight color 영역 = data attribute 영역 영역 영역 (fired 영역 영역 영역 정합 영역 영역).
function applyEdgeColors(synapses) {
  for (const syn of synapses) {
    const conn = connRefMap[`${syn.pre}->${syn.post}`];
    if (!conn) continue;
    conn.dataset.weight = String(syn.weight);
    conn.dataset.weightColor = weightColor(syn.weight);
  }
  // PPT-style step/orthogonal connector — drawflow bezier path → right-angle step path 영역 정정.
  applyStepPaths();
}

// 직각 step path 영역 — output → midX → input (right-angle 2-segment path).
function applyStepPaths() {
  if (!editor || !editor.precanvas) return;
  const connections = editor.precanvas.querySelectorAll('.connection');
  connections.forEach((conn) => {
    const path = conn.querySelector('.main-path');
    if (!path) return;
    // drawflow path 변형 — "M x1,y1 C cx1,cy1 cx2,cy2 x2,y2" (bezier) OR
    // "M x1,y1 L x2,y2" (straight, curvature=0 또는 long-distance fallback).
    // 두 형식 모두에서 endpoint (x1,y1, x2,y2) 추출.
    const d = path.getAttribute('d') || '';
    // 1차 시도: bezier 형식.
    let m = d.match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s+C[\s\S]*?(-?[\d.]+)[,\s]+(-?[\d.]+)\s*$/);
    // 2차 시도: straight line 형식 (Session 39 fix — Audio/Console 노드 등).
    if (!m) {
      m = d.match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s+L\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*$/);
    }
    // 3차 시도: 일반 fallback — 첫 두 숫자 쌍과 마지막 두 숫자 쌍 (모든 명령어 무시).
    if (!m) {
      const nums = d.match(/-?[\d.]+/g);
      if (nums && nums.length >= 4) {
        m = [d, nums[0], nums[1], nums[nums.length - 2], nums[nums.length - 1]];
      }
    }
    if (!m) return;
    const x1 = parseFloat(m[1]);
    const y1 = parseFloat(m[2]);
    const x2 = parseFloat(m[3]);
    const y2 = parseFloat(m[4]);
    if (!isFinite(x1) || !isFinite(y1) || !isFinite(x2) || !isFinite(y2)) return;
    const midX = (x1 + x2) / 2;
    // step path: output (right edge) → mid x (vertical) → input (left edge).
    const stepD = `M ${x1},${y1} L ${midX},${y1} L ${midX},${y2} L ${x2},${y2}`;
    path.setAttribute('d', stepD);
  });
}

// drawflow updateConnectionNodes 영역 patch — pan/zoom 영역 영역 path 영역 영역 영역 → step path 영역 재 patch.
let updateConnectionNodesPatched = false;
function patchUpdateConnectionNodes() {
  if (!editor || updateConnectionNodesPatched) return;
  const original = editor.updateConnectionNodes.bind(editor);
  editor.updateConnectionNodes = function (id) {
    original(id);
    applyStepPaths();
  };
  updateConnectionNodesPatched = true;
}

export function updateCanvasFire(activeByRegion) {
  if (!editor || mode !== 'region') return;
  for (const region of REGION_NODES) {
    const active = (activeByRegion[region.id] || []).length;
    const el = document.getElementById(`snn-canvas-active-${region.id}`);
    if (el) {
      el.textContent = active;
      el.classList.toggle('snn-canvas-region-active--fired', active > 0);
    }
  }
}

// fired class auto-clear timer (neuron id → timeoutId).
const fireTimers = {};
const FIRE_DURATION_MS = 800;

export function updateCanvasFireNeuron(rates) {
  if (!editor || mode !== 'neuron') return;
  const safeRates = rates || {};

  // Session 39 fix: NEURON_NODES (preset 52) 만이 아니라 nodeRefMap 의 모든 노드
  // (dynamic V1 grown + user_in_X + user_out_X) 까지 순회. 이전 버그: user_in 발화
  // 해도 NEURON_NODES 에 없어서 highlight 무시 → 사용자가 'inject 반응 없음' 으로 인식.
  const firedSet = new Set();
  for (const neuronId of Object.keys(nodeRefMap)) {
    const rate = safeRates[neuronId] || 0;
    const fired = rate > 0;
    // OUT 노드 (system out_0..3 + user_out_X) status / rate row 갱신.
    if (neuronId.startsWith('out_') || neuronId.startsWith('user_out_')) {
      const statusEl = document.getElementById(`snn-canvas-out-status-${neuronId}`);
      const rateEl = document.getElementById(`snn-canvas-out-rate-${neuronId}`);
      if (statusEl) {
        statusEl.textContent = fired ? 'ACTIVE' : 'idle';
        statusEl.classList.toggle('snn-canvas-out-status--active', fired);
      }
      if (rateEl) rateEl.textContent = fired ? rate.toFixed(1) : '0';
    }
    if (!fired) continue;
    firedSet.add(neuronId);
    const nodeEl = nodeRefMap[neuronId];
    if (!nodeEl) continue;
    nodeEl.classList.add('snn-canvas-neuron--fired');
    if (fireTimers[neuronId]) clearTimeout(fireTimers[neuronId]);
    fireTimers[neuronId] = setTimeout(() => {
      nodeEl.classList.remove('snn-canvas-neuron--fired');
      delete fireTimers[neuronId];
    }, FIRE_DURATION_MS);
  }

  // 2. synapse line fired pulse — pre fired 영역 영역 영역, 0.8s 후 자동 영역.
  for (const key in connRefMap) {
    const conn = connRefMap[key];
    const [pre] = key.split('->');
    if (!firedSet.has(pre)) continue;
    conn.classList.add('fired');
    if (fireTimers[`__conn_${key}`]) clearTimeout(fireTimers[`__conn_${key}`]);
    fireTimers[`__conn_${key}`] = setTimeout(() => {
      conn.classList.remove('fired');
      delete fireTimers[`__conn_${key}`];
    }, FIRE_DURATION_MS);
  }
}

// Session 41+ Tier1-C: weight-delta heatmap overlay.
// 학습 round 간 synapse weight 변화량을 캔버스 라인에 잠시 강조. Hebbian
// "fire together wire together" 가시화 — 어느 시냅스가 강화되는지 직관적으로 보여줌.
//
// `deltas` = { 'pre->post': delta_w, ... }
// 절대값이 클수록 더 밝게 강조. duration 후 자동 fade-out (CSS animation).
const _learningTimers = {};
const LEARNING_DURATION_MS = 1500;
export function flashWeightDelta(deltas, opts = {}) {
  if (!deltas || typeof deltas !== 'object') return;
  const dur = opts.durationMs || LEARNING_DURATION_MS;
  // 동적으로 max delta 찾아 normalize (시각적 대비 보장).
  let maxAbs = 0;
  for (const k in deltas) {
    const d = Math.abs(deltas[k] || 0);
    if (d > maxAbs) maxAbs = d;
  }
  if (maxAbs < 0.01) return;  // 의미있는 변화 없음.
  for (const key in deltas) {
    const d = deltas[key] || 0;
    if (Math.abs(d) < 0.01) continue;
    const conn = connRefMap[key];
    if (!conn) continue;
    const intensity = Math.min(1.0, Math.abs(d) / maxAbs);
    // LTP (강화) = green, LTD (약화) = orange. opacity = intensity.
    const color = d > 0 ? `rgba(16, 185, 129, ${0.4 + 0.6 * intensity})`
                        : `rgba(245, 158, 11, ${0.4 + 0.6 * intensity})`;
    conn.classList.add('learning');
    conn.style.setProperty('--learning-color', color);
    conn.style.setProperty('--learning-width', `${1.5 + 2 * intensity}px`);
    if (_learningTimers[key]) clearTimeout(_learningTimers[key]);
    _learningTimers[key] = setTimeout(() => {
      conn.classList.remove('learning');
      conn.style.removeProperty('--learning-color');
      conn.style.removeProperty('--learning-width');
      delete _learningTimers[key];
    }, dur);
  }
}

export function destroyCanvas() {
  if (editor) {
    editor.clear();
    const container = editor.container;
    if (container) container.innerHTML = '';
    editor = null;
  }
  for (const key of Object.keys(nodeIdMap)) delete nodeIdMap[key];
  for (const key of Object.keys(nodeRefMap)) delete nodeRefMap[key];
  for (const key of Object.keys(connRefMap)) delete connRefMap[key];
}
