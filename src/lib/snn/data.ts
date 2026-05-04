// 7-region node layout data (drawflow neuron view).
// SOURCE_CAMERA + SOURCE_GESTURE → INPUT (8) → V1 (10) → V2 (10) → OUT (4).

export type Region = 'SOURCE' | 'INPUT' | 'V1' | 'V2' | 'OUT';
export type Population =
  | 'camera' | 'gesture' | 'input' | 'l4_e' | 'l4_i' | 'l23_e' | 'l5_e' | 'output';

export interface NeuronNode {
  id: string;
  label: string;
  region: Region;
  population: Population;
  x: number;
  y: number;
  isSystem: boolean;
}

export interface SynapseEdge {
  pre: string;
  post: string;
  weight: number;
}

export const REGION_X = {
  SOURCE_CAMERA: 80,
  SOURCE_GESTURE: 240,
  INPUT: 440,
  V1_L4_E: 740,
  V1_L4_I: 940,
  V1_L23_E: 1140,
  V2_L4_E: 1440,
  V2_L23_E: 1740,
  V2_L5_E: 2040,
  OUT: 2340,
};

const ROW_HEIGHT = 110;
const TOP_PAD = 80;
const gridY = (row: number) => TOP_PAD + row * ROW_HEIGHT;

const INPUT_LABELS = ['pinch', 'fist', 'palm', 'point', 'gaze', 'blink', 'thumbsup', 'victory'];

export const REGION_NODES = [
  { id: 'INPUT', label: 'INPUT', x: 200, y: 200 },
  { id: 'V1',    label: 'V1',    x: 600, y: 200 },
  { id: 'V2',    label: 'V2',    x: 1000, y: 200 },
  { id: 'OUT',   label: 'OUT',   x: 1400, y: 200 },
];

export const CASCADE_EDGES = [
  { from: 'INPUT', to: 'V1' },
  { from: 'V1', to: 'V2' },
  { from: 'V2', to: 'OUT' },
];

export const NEURON_NODES: NeuronNode[] = [
  // SOURCE (camera + gesture)
  { id: 'src_camera', label: 'Camera', region: 'SOURCE', population: 'camera',
    x: REGION_X.SOURCE_CAMERA, y: gridY(5), isSystem: true },
  { id: 'src_gesture', label: 'Gesture', region: 'SOURCE', population: 'gesture',
    x: REGION_X.SOURCE_GESTURE, y: gridY(5), isSystem: true },
  // INPUT (8)
  ...INPUT_LABELS.map<NeuronNode>((label, i) => ({
    id: `in_${label}`,
    label,
    region: 'INPUT',
    population: 'input',
    x: REGION_X.INPUT,
    y: gridY(i + 1),
    isSystem: true,
  })),
  // V1 L4_E (10)
  ...Array.from({ length: 10 }, (_, i): NeuronNode => ({
    id: `v1_L4_${i}`, label: `L4_${i}`, region: 'V1', population: 'l4_e',
    x: REGION_X.V1_L4_E, y: gridY(i), isSystem: true,
  })),
  // V1 L23_E (10)
  ...Array.from({ length: 10 }, (_, i): NeuronNode => ({
    id: `v1_L23_${i}`, label: `L23_${i}`, region: 'V1', population: 'l23_e',
    x: REGION_X.V1_L23_E, y: gridY(i), isSystem: true,
  })),
  // V2 L4_E (10)
  ...Array.from({ length: 10 }, (_, i): NeuronNode => ({
    id: `v2_L4_${i}`, label: `L4_${i}`, region: 'V2', population: 'l4_e',
    x: REGION_X.V2_L4_E, y: gridY(i), isSystem: true,
  })),
  // V2 L23_E (10)
  ...Array.from({ length: 10 }, (_, i): NeuronNode => ({
    id: `v2_L23_${i}`, label: `L23_${i}`, region: 'V2', population: 'l23_e',
    x: REGION_X.V2_L23_E, y: gridY(i), isSystem: true,
  })),
  // V2 L5_E (10)
  ...Array.from({ length: 10 }, (_, i): NeuronNode => ({
    id: `v2_L5_${i}`, label: `L5_${i}`, region: 'V2', population: 'l5_e',
    x: REGION_X.V2_L5_E, y: gridY(i), isSystem: true,
  })),
  // OUT (4)
  ...['Pointing', 'Open palm', 'Thumbs up', 'Victory'].map<NeuronNode>((label, i) => ({
    id: `out_${i}`, label, region: 'OUT', population: 'output',
    x: REGION_X.OUT, y: gridY(i + 2.5), isSystem: true,
  })),
];

export const SOURCE_EDGES: SynapseEdge[] = [
  { pre: 'src_camera',  post: 'src_gesture', weight: 50 },
  ...INPUT_LABELS.map((l) => ({ pre: 'src_gesture', post: `in_${l}`, weight: 50 })),
];

export const PRESET_SYNAPSES: SynapseEdge[] = (() => {
  const edges: SynapseEdge[] = [];
  // INPUT → V1 L4_E (sparse)
  for (const label of INPUT_LABELS) {
    for (let i = 0; i < 10; i += 1) {
      if (i % 2 === 0) edges.push({ pre: `in_${label}`, post: `v1_L4_${i}`, weight: 64 });
    }
  }
  // V1 L4_E → V1 L23_E
  for (let i = 0; i < 10; i += 1) edges.push({ pre: `v1_L4_${i}`, post: `v1_L23_${i}`, weight: 40 });
  // V1 L23_E → V2 L4_E
  for (let i = 0; i < 10; i += 1) edges.push({ pre: `v1_L23_${i}`, post: `v2_L4_${i}`, weight: 160 });
  // V2 L4_E → V2 L23_E
  for (let i = 0; i < 10; i += 1) edges.push({ pre: `v2_L4_${i}`, post: `v2_L23_${i}`, weight: 80 });
  // V2 L23_E → V2 L5_E
  for (let i = 0; i < 10; i += 1) edges.push({ pre: `v2_L23_${i}`, post: `v2_L5_${i}`, weight: 80 });
  // V2 L5_E → OUT (10 → 4 fanout)
  for (let i = 0; i < 10; i += 1) {
    for (let o = 0; o < 4; o += 1) {
      if ((i + o) % 3 === 0) edges.push({ pre: `v2_L5_${i}`, post: `out_${o}`, weight: 64 });
    }
  }
  return edges;
})();

export function weightColor(w: number): string {
  if (w < 0)   return '#e76f6f';
  if (w < 50)  return '#4dd0e1';
  if (w < 100) return '#f5b842';
  return '#b794f4';
}
