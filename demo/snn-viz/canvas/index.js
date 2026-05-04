// Canvas v2: Cytoscape.js 기반 (canvas-cy.js).
// 기존 drawflow 구현 (canvas.js, 1261줄) 은 보존 — rollback 시 import 만 되돌리면 됨.
export {
  initCanvas,
  initCanvasNeuron,
  updateCanvasFire,
  updateCanvasFireNeuron,
  destroyCanvas,
  getCanvasMode,
  setEditorMode,
  setCanvasZoom,
  getCanvasZoom,
  fitCanvasToNodes,
  flashWeightDelta,
  autoLayoutByRegion,
} from './canvas-cy.js';
export { buildGrownNeuronNode, buildUserInputNode, buildUserOutputNode } from './data.js';
