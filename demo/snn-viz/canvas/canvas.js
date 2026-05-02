// Session 33 drawflow PoC: canvas 초기화 + node/edge 영역.
// Session 34 추가: neuron mode (52 노드 + ~120 synapse + weight gradient).

import Drawflow from 'drawflow';
import 'drawflow/dist/drawflow.min.css';
import {
  REGION_NODES,
  CASCADE_EDGES,
  NEURON_NODES,
  weightColor,
} from './data.js';
import { regionNodeHtml } from './nodes.js';

let editor = null;
let mode = 'region'; // 'region' | 'neuron'
const nodeIdMap = {}; // region id 또는 neuron id -> drawflow node id

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

  return editor;
}

export function initCanvasNeuron(containerId, synapses) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('[snn-canvas] container 0:', containerId);
    return null;
  }

  destroyCanvas();
  mode = 'neuron';

  editor = new Drawflow(container);
  editor.reroute = true;
  editor.reroute_fix_curvature = true;
  editor.curvature = 0.5;
  editor.zoom_min = 0.3;
  editor.zoom_max = 2.0;
  editor.start();

  // 52 neuron node.
  for (const neuron of NEURON_NODES) {
    const id = editor.addNode(
      neuron.id,
      1, 1,
      neuron.x, neuron.y,
      `snn-canvas-neuron snn-canvas-neuron--${neuron.population.toLowerCase()}`,
      { neuron: neuron.id, region: neuron.region, population: neuron.population },
      neuronNodeHtml(neuron),
      false,
    );
    nodeIdMap[neuron.id] = id;
  }

  // synapse edge (backend response 사용).
  const safeSyn = Array.isArray(synapses) ? synapses : [];
  for (const syn of safeSyn) {
    const fromId = nodeIdMap[syn.pre];
    const toId = nodeIdMap[syn.post];
    if (fromId && toId) {
      editor.addConnection(fromId, toId, 'output_1', 'input_1');
    }
  }

  applyEdgeColors(safeSyn);

  return editor;
}

function neuronNodeHtml(neuron) {
  return `
    <div class="snn-canvas-neuron-card">
      <div class="snn-canvas-neuron-label">${neuron.label}</div>
      <div class="snn-canvas-neuron-pop">${neuron.population}</div>
    </div>
  `;
}

// drawflow connection SVG class = node_in_node-{toId} + node_out_node-{fromId} (drawflow.min.js 내부 사실).
function applyEdgeColors(synapses) {
  for (const syn of synapses) {
    const fromId = nodeIdMap[syn.pre];
    const toId = nodeIdMap[syn.post];
    if (!fromId || !toId) continue;
    const selector = `.connection.node_in_node-${toId}.node_out_node-${fromId} .main-path`;
    const path = document.querySelector(selector);
    if (path) {
      path.style.stroke = weightColor(syn.weight);
      path.style.strokeWidth = '2';
    }
  }
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

export function updateCanvasFireNeuron(rates) {
  if (!editor || mode !== 'neuron') return;
  for (const neuron of NEURON_NODES) {
    const rate = rates[neuron.id] || 0;
    const fired = rate > 0;
    const dfId = nodeIdMap[neuron.id];
    if (!dfId) continue;
    const nodeEl = document.getElementById(`node-${dfId}`);
    if (nodeEl) {
      nodeEl.classList.toggle('snn-canvas-neuron--fired', fired);
    }
  }
}

export function destroyCanvas() {
  if (editor) {
    editor.clear();
    const container = editor.container;
    if (container) container.innerHTML = '';
    editor = null;
  }
  for (const key of Object.keys(nodeIdMap)) {
    delete nodeIdMap[key];
  }
}
