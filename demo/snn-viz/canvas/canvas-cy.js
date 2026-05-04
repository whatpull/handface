/**
 * Canvas v2 — Cytoscape.js 기반 단순/안정 graph 렌더러
 *
 * 기존 drawflow 의 1261 줄 → 약 400 줄. 사용성 향상 포인트:
 *   1. 자동 layout (dagre) — 사용자가 노드 위치 신경 쓸 필요 없음
 *   2. 시냅스 라인 native 지원 (drawflow 패치 불필요)
 *   3. zoom/pan/fit 모두 cytoscape 내장
 *   4. 노드 hover/select 효과 cytoscape style 로 깔끔하게
 *   5. step/curved edge 모두 native 지원
 *
 * 시그니처 호환: index.js 의 export 13개 그대로 유지 (drop-in replacement).
 */

import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import {
  REGION_NODES,
  CASCADE_EDGES,
  NEURON_NODES,
  SOURCE_EDGES,
  DECODE_EDGES,
  weightColor,
} from './data.js';
import { setNodePosition, loadPositions, getNodePosition } from '../state.js';

cytoscape.use(dagre);

let cy = null;
let mode = 'region'; // 'region' | 'neuron'
const nodeIdMap = {};         // neuron id → cytoscape node id (same string)
const drawflowIdToName = {};  // 호환용 (현재 cytoscape 는 별도 id 필요 없지만 외부 호출자 호환)

export function getCanvasMode() {
  return mode;
}

/* ──────────────────────────────────────────────
 * Common style
 * ────────────────────────────────────────────── */
const cyStyle = [
  // Default node — 고정 크기 + 명확 색상 (mapper 의존 X).
  {
    selector: 'node',
    style: {
      'background-color': '#262630',
      'background-opacity': 1,
      'border-color': '#a78bfa',
      'border-width': 2,
      'border-opacity': 0.7,
      'label': 'data(label)',
      'color': '#ffffff',
      'font-size': 10,
      'font-family': 'Menlo, Consolas, monospace',
      'text-valign': 'center',
      'text-halign': 'center',
      'text-wrap': 'wrap',
      'text-max-width': 92,
      'width': 96,
      'height': 44,
      'shape': 'round-rectangle',
    },
  },
  // Region color tinting (region mode 에서 큰 노드)
  {
    selector: 'node[w >= 100]',
    style: {
      'width': 'data(w)',
      'height': 'data(h)',
    },
  },
  // 색상이 있는 노드 — border 만 강하게
  {
    selector: 'node[color]',
    style: {
      'border-color': 'data(color)',
      'border-opacity': 1,
    },
  },
  // System (locked) node
  {
    selector: 'node[system="1"]',
    style: {
      'border-style': 'solid',
    },
  },
  // User-added node
  {
    selector: 'node[isUserInput="1"]',
    style: {
      'border-style': 'dashed',
    },
  },
  // Hover
  {
    selector: 'node:active, node:hover',
    style: {
      'border-width': 3,
      'border-color': '#a78bfa',
      'background-opacity': 0.40,
    },
  },
  // Firing (실시간 발화)
  {
    selector: 'node.firing',
    style: {
      'background-color': '#f5d020',
      'background-opacity': 1.0,
      'border-color': '#f5d020',
      'border-width': 3,
    },
  },
  // Selected
  {
    selector: 'node:selected',
    style: {
      'border-width': 3,
      'border-color': '#22d3ee',
      'border-opacity': 1.0,
    },
  },
  // Default edge (시냅스)
  {
    selector: 'edge',
    style: {
      'width': 1.4,
      'line-color': 'rgba(167, 139, 250, 0.35)',
      'curve-style': 'taxi',           // step path 처럼 보임 (직각)
      'taxi-direction': 'horizontal',
      'taxi-turn': 30,
      'target-arrow-shape': 'none',
      'opacity': 0.65,
      'transition-property': 'line-color, width, opacity',
      'transition-duration': 120,
    },
  },
  // Strong edge (학습된 weight 큰 시냅스)
  {
    selector: 'edge[?strong]',
    style: {
      'width': 2.5,
      'line-color': '#a78bfa',
      'opacity': 0.9,
    },
  },
  // Inhibitory (negative weight)
  {
    selector: 'edge[type="inh"]',
    style: {
      'line-color': 'rgba(231, 111, 111, 0.55)',
      'line-style': 'dashed',
    },
  },
  // Active (최근 발화)
  {
    selector: 'edge.active',
    style: {
      'line-color': '#f5d020',
      'width': 3,
      'opacity': 1.0,
      'transition-duration': 60,
    },
  },
];

/* ──────────────────────────────────────────────
 * Region mode (4 노드: INPUT/V1/V2/OUT)
 * ────────────────────────────────────────────── */
export function initCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('[canvas-cy] container not found:', containerId);
    return null;
  }
  destroyCanvas();
  mode = 'region';

  const elements = [];
  for (const r of REGION_NODES) {
    elements.push({
      group: 'nodes',
      data: {
        id: r.id,
        label: `${r.label}\n${r.total} neurons`,
        color: r.color,
        w: 110, h: 56,
      },
      position: { x: r.x, y: r.y },
    });
    nodeIdMap[r.id] = r.id;
  }
  for (const e of CASCADE_EDGES) {
    elements.push({
      group: 'edges',
      data: { id: `${e.from}->${e.to}`, source: e.from, target: e.to },
    });
  }

  cy = cytoscape({
    container,
    elements,
    style: cyStyle,
    layout: { name: 'preset' },   // REGION_X 좌표 그대로
    minZoom: 0.2,
    maxZoom: 4,
    wheelSensitivity: 0.2,
    boxSelectionEnabled: false,
    autoungrabify: true,
  });
  cy.fit(undefined, 60);
  return cy;
}

/* ──────────────────────────────────────────────
 * Neuron mode (52 preset + grown neurons + synapses)
 * ────────────────────────────────────────────── */
export function initCanvasNeuron(containerId, synapses, dynamicNeurons = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('[canvas-cy] container not found:', containerId);
    return null;
  }
  destroyCanvas();
  mode = 'neuron';

  const elements = [];
  const allNeurons = [
    ...NEURON_NODES.map(n => ({ ...n, isSystem: true })),
    ...(Array.isArray(dynamicNeurons) ? dynamicNeurons : []).map(n => ({
      ...n, isSystem: n.isSystem !== false,
    })),
  ];
  // Saved positions (사용자 드래그 후 저장된 위치) — Map 갱신만, 직접 접근은 getNodePosition.
  loadPositions();

  for (const n of allNeurons) {
    const pos = getNodePosition(n.id) || { x: n.x, y: n.y };
    elements.push({
      group: 'nodes',
      data: {
        id: n.id,
        label: n.label || n.id,
        color: n.color || '#94a3b8',
        region: n.region || '',
        population: n.population || '',
        system: n.isSystem ? '1' : '0',
        isUserInput: n.isUserInput ? '1' : '0',
        w: 92, h: 44,
      },
      position: { x: pos.x, y: pos.y },
      grabbable: !n.isSystem,
      locked: false,
    });
    nodeIdMap[n.id] = n.id;
    drawflowIdToName[n.id] = n.id;
  }

  // Synapses
  const backendSyn = Array.isArray(synapses) ? synapses : [];
  const allSyn = [...SOURCE_EDGES, ...backendSyn, ...DECODE_EDGES];
  for (const s of allSyn) {
    const id = `${s.pre}->${s.post}`;
    if (!nodeIdMap[s.pre] || !nodeIdMap[s.post]) continue;
    const w = typeof s.weight === 'number' ? s.weight : 1;
    const isInh = w < 0;
    const isStrong = Math.abs(w) > 25;
    elements.push({
      group: 'edges',
      data: {
        id,
        source: s.pre,
        target: s.post,
        weight: w,
        type: isInh ? 'inh' : 'exc',
        strong: isStrong ? 1 : 0,
      },
    });
  }

  console.log('[canvas-cy] initCanvasNeuron — elements:', elements.length,
              'neurons:', allNeurons.length, 'synapses:', allSyn.length);

  cy = cytoscape({
    container,
    elements,
    style: cyStyle,
    layout: { name: 'preset' },
    minZoom: 0.05,
    maxZoom: 5,
    wheelSensitivity: 0.2,
    boxSelectionEnabled: false,
    autounselectify: false,
  });

  // 노드 드래그 후 위치 저장
  cy.on('dragfree', 'node', (ev) => {
    const node = ev.target;
    if (node.data('system') === '1') return;
    const pos = node.position();
    setNodePosition(node.id(), pos.x, pos.y);
  });

  // 첫 mount fit — DOM ready 후 한 frame 뒤 호출
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      try {
        cy.resize();
        cy.fit(undefined, 60);
        console.log('[canvas-cy] mounted — nodes:', cy.nodes().length,
                    'edges:', cy.edges().length, 'zoom:', cy.zoom());
      } catch (e) { console.warn('[canvas-cy] fit error:', e); }
    });
  });

  window.dispatchEvent(new CustomEvent('snn-canvas:source-mounted'));
  return cy;
}

/* ──────────────────────────────────────────────
 * Fire visualization
 * ────────────────────────────────────────────── */
export function updateCanvasFire(activeByRegion) {
  if (!cy || mode !== 'region') return;
  for (const [regionId, active] of Object.entries(activeByRegion || {})) {
    const node = cy.getElementById(regionId);
    if (!node || node.empty()) continue;
    if (active) node.addClass('firing');
    else node.removeClass('firing');
  }
}

export function updateCanvasFireNeuron(rates) {
  if (!cy || mode !== 'neuron') return;
  cy.batch(() => {
    for (const [name, rate] of Object.entries(rates || {})) {
      const node = cy.getElementById(name);
      if (!node || node.empty()) continue;
      if (rate > 0.5) node.addClass('firing');
      else node.removeClass('firing');
    }
  });
}

/* ──────────────────────────────────────────────
 * Weight delta flash (학습 시각화)
 * ────────────────────────────────────────────── */
export function flashWeightDelta(deltas, opts = {}) {
  if (!cy) return;
  const duration = opts.durationMs ?? 1500;
  cy.batch(() => {
    for (const d of (deltas || [])) {
      const id = `${d.pre}->${d.post}`;
      const edge = cy.getElementById(id);
      if (!edge || edge.empty()) continue;
      edge.addClass('active');
      // weight 갱신 → strong flag 재계산
      const w = typeof d.weight === 'number' ? d.weight : edge.data('weight');
      edge.data('weight', w);
      edge.data('strong', Math.abs(w) > 25 ? 1 : 0);
    }
  });
  setTimeout(() => {
    if (!cy) return;
    cy.batch(() => {
      cy.edges('.active').removeClass('active');
    });
  }, duration);
}

/* ──────────────────────────────────────────────
 * Zoom / pan controls (toolbar 호환)
 * ────────────────────────────────────────────── */
export function fitCanvasToNodes(padding = 0.9) {
  if (!cy) return;
  const pixelPad = Math.round(60 * (1 - padding) + 60);
  cy.fit(undefined, pixelPad);
  // emit event (scene.js 가 loading 끝났음을 안다)
  requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent('snn-canvas:fit-complete', {
      detail: { zoom: cy.zoom(), canvasX: cy.pan().x, canvasY: cy.pan().y },
    }));
    window.dispatchEvent(new CustomEvent('snn-canvas:zoom-changed', {
      detail: { zoom: cy.zoom() },
    }));
  });
}

export function setCanvasZoom(zoomFraction) {
  if (!cy) return;
  const z = Math.max(0.15, Math.min(5, zoomFraction));
  cy.zoom(z);
  window.dispatchEvent(new CustomEvent('snn-canvas:zoom-changed', { detail: { zoom: z } }));
}

export function getCanvasZoom() {
  return cy ? cy.zoom() : 1;
}

export function setEditorMode(modeName) {
  if (!cy) return;
  const isEdit = modeName === 'edit';
  cy.autoungrabify(!isEdit);
  // CSS class on container (scene.js 호환)
  const container = document.getElementById('nf-snn-canvas');
  if (container) container.classList.toggle('snn-canvas-edit', isEdit);
}

/* ──────────────────────────────────────────────
 * Auto layout — dagre (DAG, 좌→우)
 * 사용자 의도: "자동정렬 한 번이면 깔끔"
 * ────────────────────────────────────────────── */
export function autoLayoutByRegion(opts = {}) {
  if (!cy) return { ok: false, reason: 'canvas not mounted' };
  const layout = cy.layout({
    name: 'dagre',
    rankDir: 'LR',
    nodeSep: 32,
    rankSep: 80,
    edgeSep: 12,
    animate: true,
    animationDuration: 450,
    animationEasing: 'ease-out',
    fit: true,
    padding: 60,
  });
  layout.run();
  // 위치 저장 (드래그 가능 노드만)
  layout.promiseOn('layoutstop').then(() => {
    cy.nodes().forEach(node => {
      if (node.data('system') === '1') return;
      const p = node.position();
      setNodePosition(node.id(), p.x, p.y);
    });
  });
  return {
    ok: true,
    nodes_moved: cy.nodes().length,
    note: 'dagre layout applied',
  };
}

/* ──────────────────────────────────────────────
 * Destroy
 * ────────────────────────────────────────────── */
export function destroyCanvas() {
  if (cy) {
    try { cy.destroy(); } catch (_) {}
    cy = null;
  }
  for (const k of Object.keys(nodeIdMap)) delete nodeIdMap[k];
  for (const k of Object.keys(drawflowIdToName)) delete drawflowIdToName[k];
}
