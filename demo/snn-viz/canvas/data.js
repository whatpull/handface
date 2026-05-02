// Session 33 drawflow PoC: 4 region node + 5 cascade edge.
// 1B region 단위 (INPUT / V1 / V2 / OUT). 본격 1A neuron 단위 = PoC 통과 후 결정.

export const REGION_NODES = [
  { id: 'INPUT', label: 'INPUT', color: '#f5b842', total: 8,  x: 80,  y: 200 },
  { id: 'V1',    label: 'V1',    color: '#4dd0e1', total: 16, x: 320, y: 200 },
  { id: 'V2',    label: 'V2',    color: '#b794f4', total: 20, x: 560, y: 200 },
  { id: 'OUT',   label: 'OUT',   color: '#5eead4', total: 4,  x: 800, y: 200 },
];

export const CASCADE_EDGES = [
  { from: 'INPUT', to: 'V1',  label: 'INPUT->V1 L4_E (w=64)',     stage: 0 },
  { from: 'V1',    to: 'V2',  label: 'V1 L23_E->V2 L4_E (w=160)', stage: 2 },
  { from: 'V2',    to: 'OUT', label: 'V2 L5_E->OUT (w=64)',       stage: 4 },
];

// self-loop edge (V1 L4->L23, V2 L4->L23->L5) = drawflow 한계 영역 PoC 0.
// 본격 결정 (1A neuron 단위 또는 다른 library) 영역 추후 결정.
