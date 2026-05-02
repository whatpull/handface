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
const REGION_X = {
  SOURCE_CAMERA:  80,
  SOURCE_GESTURE: 240,
  INPUT:    440,    // gap 200 (Gesture → INPUT)
  V1_L4_E:  740,    // gap 300 (region boundary)
  V1_L4_I:  940,    // gap 200 (V1 sub-column)
  V1_L23_E: 1140,   // gap 200
  V2_L4_E:  1440,   // gap 300 (region boundary)
  V2_L23_E: 1640,   // gap 200
  V2_L5_E:  1840,   // gap 200
  OUT:      2140,   // gap 300 (region boundary)
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
