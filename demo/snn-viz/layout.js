/**
 * SNN viz layout — 7-layer Mixed.
 * Desktop: 좌측 입력부 (Camera/Hand/Gesture) + 우측 SNN (INPUT→V1→V2→OUT)
 * Mobile (<768px): 입력부 위 + SNN 아래 (세로 stack, SNN 2x2)
 */
import { state } from './state.js';

export function buildLayout(rootEl) {
  rootEl.innerHTML = '';
  rootEl.classList.add('snn-viz-root');

  // Container: 좌측 입력부 + 우측 SNN
  const main = document.createElement('div');
  main.className = 'snn-main';

  // 좌측: Camera + Hand + Gesture
  const inputCol = document.createElement('div');
  inputCol.className = 'snn-input-col';

  // camera/hand/gesture: 4 corner brackets 적용 위해 region-frame wrap (dots 없음)
  const cameraR  = makeFrameLayer('camera',  'CAMERA');
  const handR    = makeFrameLayer('hand',    'HAND');
  const gestureR = makeFrameLayer('gesture', 'GESTURE');

  state.containers.camera  = cameraR.layer;
  state.containers.hand    = handR.layer;
  state.containers.gesture = gestureR.layer;

  inputCol.appendChild(cameraR.frame);
  inputCol.appendChild(handR.frame);
  inputCol.appendChild(gestureR.frame);

  // 우측: SNN 4 region (가로 흐름 INPUT → V1 → V2 → OUT)
  const snnCol = document.createElement('div');
  snnCol.className = 'snn-circuit-col';

  const snnFlow = document.createElement('div');
  snnFlow.className = 'snn-flow';

  // Region layers — wrap each in .snn-region-frame with sibling dots overlay
  // (overlay escapes panel's backdrop-filter stacking context → dots above SVG)
  const inputR = makeRegionLayer('input', 'INPUT');
  const v1R    = makeRegionLayer('v1',    'V1');
  const v2R    = makeRegionLayer('v2',    'V2');
  const outR   = makeRegionLayer('out',   'OUT');

  state.containers.input  = inputR.layer;
  state.containers.v1     = v1R.layer;
  state.containers.v2     = v2R.layer;
  state.containers.out    = outR.layer;
  state.dotOverlays.input = inputR.dots;
  state.dotOverlays.v1    = v1R.dots;
  state.dotOverlays.v2    = v2R.dots;
  state.dotOverlays.out   = outR.dots;

  snnFlow.appendChild(inputR.frame);
  snnFlow.appendChild(makeArrow('arrow-input-v1'));
  snnFlow.appendChild(v1R.frame);
  snnFlow.appendChild(makeArrow('arrow-v1-v2'));
  snnFlow.appendChild(v2R.frame);
  snnFlow.appendChild(makeArrow('arrow-v2-out'));
  snnFlow.appendChild(outR.frame);

  snnCol.appendChild(snnFlow);

  main.appendChild(inputCol);
  main.appendChild(snnCol);
  rootEl.appendChild(main);

  return { snnFlow };
}

/**
 * Frame-only wrapper — panel inside .snn-region-frame for 4 corner brackets,
 * but no dots overlay (camera/hand/gesture: no neuron dots).
 */
function makeFrameLayer(id, label) {
  const frame = document.createElement('div');
  frame.className = `snn-region-frame snn-region-frame-${id}`;

  const layer = makeLayer(id, label);
  frame.appendChild(layer);

  return { frame, layer };
}

/**
 * Region layer wrapper — frame contains panel + dots overlay sibling.
 * Overlay escapes panel's backdrop-filter stacking context so dots can z:6 over SVG (z:5).
 */
function makeRegionLayer(id, label) {
  const frame = document.createElement('div');
  frame.className = `snn-region-frame snn-region-frame-${id}`;

  const layer = makeLayer(id, label);
  frame.appendChild(layer);

  const dots = document.createElement('div');
  dots.className = `snn-layer-dots snn-layer-dots-${id}`;
  dots.dataset.layerId = id;
  frame.appendChild(dots);

  return { frame, layer, dots };
}

function makeLayer(id, label) {
  const layer = document.createElement('div');
  layer.className = `snn-layer snn-layer-${id}`;

  const labelEl = document.createElement('div');
  labelEl.className = 'snn-layer-label';
  labelEl.textContent = label;

  const body = document.createElement('div');
  body.className = 'snn-layer-body';
  body.dataset.layerId = id;

  layer.appendChild(labelEl);
  layer.appendChild(body);
  return layer;
}

function makeArrow(id) {
  const arrow = document.createElement('div');
  arrow.className = 'snn-arrow';
  arrow.id = id;
  arrow.innerHTML = '→';
  return arrow;
}
