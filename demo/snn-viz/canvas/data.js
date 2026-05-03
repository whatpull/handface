// Session 33 drawflow PoC: 4 region node + 3 cascade edge (region 단위, 보존).
// Session 34 추가: 52 neuron 단위 + weight gradient 색.
// 2A neuron 단위 + 4-2 population grouping layout + 3A weight gradient edge.

// Region 단위 (4 노드, 보존).
export const REGION_NODES = [
  { id: 'INPUT', label: 'INPUT', color: '#f5b842', total: 8,  x: 80,  y: 200 },
  { id: 'V1',    label: 'V1',    color: '#4dd0e1', total: 20, x: 320, y: 200 },
  { id: 'V2',    label: 'V2',    color: '#b794f4', total: 20, x: 560, y: 200 },
  { id: 'OUT',   label: 'OUT',   color: '#5eead4', total: 4,  x: 800, y: 200 },
];

export const CASCADE_EDGES = [
  { from: 'INPUT', to: 'V1',  label: 'INPUT->V1 L4_E (w=64)',     stage: 0 },
  { from: 'V1',    to: 'V2',  label: 'V1 L23_E->V2 L4_E (w=160)', stage: 2 },
  { from: 'V2',    to: 'OUT', label: 'V2 L5_E->OUT (w=64)',       stage: 4 },
];

// Neuron 단위 layout (4 region column + SOURCE column, 좌→우. region 내부 population sub-column).
// Session 36: SOURCE column 신규 (Camera + Gesture 영역 input 전 영역).
// Session 38: USER_INPUT — Camera/Gesture 의 사이 column (160) + 위아래 alternating stacking.
export const REGION_X = {
  USER_INPUT:    160,    // Camera(80) ↔ Gesture(240) 중앙 — source 영역 alternating stack.
  SOURCE_CAMERA:  80,
  SOURCE_GESTURE: 240,
  INPUT:          440,
  V1_L4_E:        740,
  V1_L4_I:        940,
  V1_L23_E:      1140,
  V2_L4_E:       1440,
  V2_L23_E:      1640,
  V2_L5_E:       1840,
  OUT:           2140,
  USER_OUTPUT:   2360,    // OUT(2140) 오른쪽 별도 column — action selector.
};

const ROW_HEIGHT = 110;     // 80 → 110 (vertical 영역 영역 영역)
const TOP_PAD = 80;

function gridPos(x, idx, count) {
  // Center column 영역 vertical alignment.
  // CANVAS_CENTER_Y = TOP_PAD + 5 * ROW_HEIGHT (max 10 row 영역 center 정합).
  const CANVAS_CENTER_Y = TOP_PAD + 5 * ROW_HEIGHT;
  const startY = CANVAS_CENTER_Y - ((count - 1) / 2) * ROW_HEIGHT;
  return { x, y: startY + idx * ROW_HEIGHT };
}

export const NEURON_NODES = [
  // SOURCE (Session 36: Camera + Gesture, INPUT 전 영역).
  {
    id: 'src_camera',
    label: 'Camera',
    region: 'SOURCE',
    population: 'camera',
    color: '#a78bfa',
    ...gridPos(REGION_X.SOURCE_CAMERA, 0, 1),
  },
  {
    id: 'src_gesture',
    label: 'Gesture',
    region: 'SOURCE',
    population: 'gesture',
    color: '#fbbf24',
    ...gridPos(REGION_X.SOURCE_GESTURE, 0, 1),
  },

  // INPUT (8 노드)
  ...['in_pinch', 'in_fist', 'in_palm', 'in_point', 'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory']
    .map((name, i) => ({
      id: name,
      label: name.replace('in_', ''),
      region: 'INPUT',
      population: 'input',
      color: '#f5b842',
      ...gridPos(REGION_X.INPUT, i, 8),
    })),

  // V1 L4_E (10 노드)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `v1_L4_E_${i}`,
    label: `L4E_${i}`,
    region: 'V1',
    population: 'L4_E',
    color: '#4dd0e1',
    ...gridPos(REGION_X.V1_L4_E, i, 10),
  })),

  // V1 L4_I (4 노드, inhibitory)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `v1_L4_I_${i}`,
    label: `L4I_${i}`,
    region: 'V1',
    population: 'L4_I',
    color: '#e76f6f',
    ...gridPos(REGION_X.V1_L4_I, i, 4),
  })),

  // V1 L23_E (6 노드)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `v1_L23_E_${i}`,
    label: `L23E_${i}`,
    region: 'V1',
    population: 'L23_E',
    color: '#4dd0e1',
    ...gridPos(REGION_X.V1_L23_E, i, 6),
  })),

  // V2 L4_E (10 노드)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `v2_L4_E_${i}`,
    label: `L4E_${i}`,
    region: 'V2',
    population: 'L4_E',
    color: '#b794f4',
    ...gridPos(REGION_X.V2_L4_E, i, 10),
  })),

  // V2 L23_E (6 노드)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `v2_L23_E_${i}`,
    label: `L23E_${i}`,
    region: 'V2',
    population: 'L23_E',
    color: '#b794f4',
    ...gridPos(REGION_X.V2_L23_E, i, 6),
  })),

  // V2 L5_E (4 노드)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `v2_L5_E_${i}`,
    label: `L5E_${i}`,
    region: 'V2',
    population: 'L5_E',
    color: '#b794f4',
    ...gridPos(REGION_X.V2_L5_E, i, 4),
  })),

  // OUT (4 노드, decoded gesture label — Phase 4 OUT decode mapping).
  // OUT index → gesture mapping (HANDFACE_GESTURE_TO_INPUT 정합):
  //   out_0 = pointing  / out_1 = openpalm / out_2 = thumbsup / out_3 = victory.
  ...['Pointing', 'Open palm', 'Thumbs up', 'Victory'].map((label, i) => ({
    id: `out_${i}`,
    label,
    region: 'OUT',
    population: 'output',
    color: '#5eead4',
    ...gridPos(REGION_X.OUT, i, 4),
  })),
];

// SOURCE edges (Session 36): Camera → Gesture → 8 INPUT (handface input chain 정합).
// 본 영역 = backend synapse 영역 0 (frontend 영역 영역 영역 영역) — runtime fixed display.
export const SOURCE_EDGES = [
  { pre: 'src_camera',  post: 'src_gesture', weight: 50 }, // camera → gesture
  { pre: 'src_gesture', post: 'in_pinch',    weight: 50 },
  { pre: 'src_gesture', post: 'in_fist',     weight: 50 },
  { pre: 'src_gesture', post: 'in_palm',     weight: 50 },
  { pre: 'src_gesture', post: 'in_point',    weight: 50 },
  { pre: 'src_gesture', post: 'in_gaze',     weight: 50 },
  { pre: 'src_gesture', post: 'in_blink',    weight: 50 },
  { pre: 'src_gesture', post: 'in_thumbsup', weight: 50 },
  { pre: 'src_gesture', post: 'in_victory',  weight: 50 },
];

// Session 37 Phase 4: 직접 INPUT → OUT pathway (subcortical fast pathway 영역).
// neuronface backend D120 anchor 영역 4 직접 synapse 영역 (in_point→out_0 등, weight 30).
// 본 영역 frontend canvas 영역만 — backend 영역 영역 영역 영역.
export const DECODE_EDGES = [
  { pre: 'in_point',    post: 'out_0', weight: 30 }, // pointing → out_0
  { pre: 'in_palm',     post: 'out_1', weight: 30 }, // openpalm → out_1
  { pre: 'in_thumbsup', post: 'out_2', weight: 30 }, // thumbsup → out_2
  { pre: 'in_victory',  post: 'out_3', weight: 30 }, // victory → out_3
];

// Session 37 Phase 7 grown 뉴런 시각화 helper.
// preset population key → REGION_X 키 매핑.
const POP_TO_REGION_X_KEY = {
  'v1_L4_E':  'V1_L4_E',
  'v1_L4_I':  'V1_L4_I',
  'v1_L23_E': 'V1_L23_E',
  'v2_L4_E':  'V2_L4_E',
  'v2_L23_E': 'V2_L23_E',
  'v2_L5_E':  'V2_L5_E',
};

/**
 * grown neuron 객체 (backend snapshot)을 NEURON_NODES와 동일 형식 노드로 변환.
 * 이름 형식 "v1_L4_E_10" 식으로 region/population/index 추출.
 * @param {object} n - { name, region, population } 등 backend neuron.
 * @param {number} stackOffset - 같은 column에서 grown 뉴런 stack 오프셋 (cell index).
 * @returns {object|null} { id, label, region, population, color, x, y }
 */
export function buildGrownNeuronNode(n, stackOffset = 0) {
  const name = n.name || '';
  // 이름 prefix 매칭.
  let popKey = null;
  for (const k of Object.keys(POP_TO_REGION_X_KEY)) {
    if (name.startsWith(k + '_')) { popKey = k; break; }
  }
  if (!popKey) return null;
  const xKey = POP_TO_REGION_X_KEY[popKey];
  const baseX = REGION_X[xKey];
  if (baseX === undefined) return null;
  // 2D grid layout: per_col=8 (column당 최대 8 행), 그 다음 옆 column으로 wrap.
  // x: base_x + col * 90 (column 간격), y: base_y + row * 90 (row 간격).
  const PER_COL = 8;
  const COL_GAP = 90;
  const ROW_GAP = 90;
  const baseY = 1080;
  const col = Math.floor(stackOffset / PER_COL);
  const row = stackOffset % PER_COL;
  const x = baseX + col * COL_GAP;
  const y = baseY + row * ROW_GAP;
  // color: region 기준.
  const colorMap = { V1: '#4dd0e1', V2: '#b794f4' };
  return {
    id: name,
    label: name.replace(/^v\d+_/, '').replace(/_/g, ''),  // 짧은 라벨.
    region: n.region || 'V1',
    population: popKey.split('_').slice(1).join('_'),
    color: colorMap[n.region] || '#94a3b8',
    x,
    y,
  };
}

/**
 * Session 38: 사용자 추가 INPUT 노드 (user_in_<idx>) → NEURON_NODES 동일 형식 변환.
 * Camera/Gesture column 사이 (x=160) 에 vertical alternating stack 배치 —
 * idx 0 above, idx 1 below, idx 2 further above, idx 3 further below ...
 * @param {object} ui - { name, label, kind, fanout } from /user_inputs API
 * @param {number} stackIdx - 0-based 표시 순서.
 * @returns {object} { id, label, region, population, color, x, y, kind, isUserInput, isSystem }
 */
export function buildUserInputNode(ui, stackIdx = 0) {
  const CANVAS_CENTER_Y = 630;          // Camera/Gesture y 정합.
  const SAFE_OFFSET = 240;              // Camera 와 충돌 방지 거리.
  const ROW_GAP = 150;
  const half = Math.floor(stackIdx / 2);
  const isAbove = stackIdx % 2 === 0;
  const y = isAbove
    ? CANVAS_CENTER_Y - SAFE_OFFSET - half * ROW_GAP
    : CANVAS_CENTER_Y + SAFE_OFFSET + half * ROW_GAP;
  return {
    id: ui.name,
    label: ui.label || ui.name.replace('user_in_', 'U'),
    region: 'USER_INPUT',
    population: 'user_input',
    color: '#a78bfa',
    x: REGION_X.USER_INPUT,
    y,
    kind: ui.kind || 'custom',
    isUserInput: true,
    isSystem: false,
  };
}

/**
 * Session 39: 사용자 추가 OUT 노드 (user_out_<idx>) → NEURON_NODES 동일 형식.
 * OUT column 오른쪽에 vertical alternating stack — system OUT (4개) 와 분리.
 * @param {object} uo - { name, label, kind, fanin, action_config }
 * @param {number} stackIdx - 0-based 표시 순서.
 */
export function buildUserOutputNode(uo, stackIdx = 0) {
  const CANVAS_CENTER_Y = 630;
  const SAFE_OFFSET = 240;
  const ROW_GAP = 150;
  const half = Math.floor(stackIdx / 2);
  const isAbove = stackIdx % 2 === 0;
  const y = isAbove
    ? CANVAS_CENTER_Y - SAFE_OFFSET - half * ROW_GAP
    : CANVAS_CENTER_Y + SAFE_OFFSET + half * ROW_GAP;
  return {
    id: uo.name,
    label: uo.label || uo.name.replace('user_out_', 'O'),
    region: 'USER_OUTPUT',
    population: 'user_output',
    color: '#5eead4',
    x: REGION_X.USER_OUTPUT,
    y,
    kind: uo.kind || 'notification',
    actionConfig: uo.action_config || {},
    isUserOutput: true,
    isSystem: false,
  };
}

// Synapse weight gradient color mapping (3A spec).
//   inhibitory (w<0): red       — V1 L4_I → V1 L4_E (w=-48)
//   weak (0~50):      cyan      — V1 L4_E → V1 L23_E (w=40)
//   mid (50~100):     yellow    — INPUT→V1 (w=64), V2 L4_E→L23_E (w=80), V2 L23_E→L5_E (w=80), V2 L5_E→OUT (w=64)
//   strong (>=100):   purple    — V1 L23_E → V2 L4_E (w=160)
export function weightColor(weight) {
  if (weight < 0)   return '#e76f6f';
  if (weight < 50)  return '#4dd0e1';
  if (weight < 100) return '#f5b842';
  return '#b794f4';
}
