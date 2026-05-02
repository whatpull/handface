// Session 33 drawflow PoC: canvas 초기화 + node/edge 영역.

import Drawflow from 'drawflow';
import 'drawflow/dist/drawflow.min.css';
import { REGION_NODES, CASCADE_EDGES } from './data.js';
import { regionNodeHtml } from './nodes.js';

let editor = null;
const nodeIdMap = {}; // region id -> drawflow node id

export function initCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('[snn-canvas] container 0:', containerId);
    return null;
  }

  if (editor) {
    destroyCanvas();
  }

  editor = new Drawflow(container);
  editor.reroute = true;
  editor.reroute_fix_curvature = true;
  editor.start();

  for (const region of REGION_NODES) {
    const id = editor.addNode(
      region.id,
      1,
      1,
      region.x, region.y,
      `snn-canvas-node-${region.id.toLowerCase()}`,
      { region: region.id },
      regionNodeHtml(region),
      false
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

export function updateCanvasFire(activeByRegion) {
  if (!editor) return;
  for (const region of REGION_NODES) {
    const active = (activeByRegion[region.id] || []).length;
    const el = document.getElementById(`snn-canvas-active-${region.id}`);
    if (el) {
      el.textContent = active;
      el.classList.toggle('snn-canvas-region-active--fired', active > 0);
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
