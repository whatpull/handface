// 백엔드 snapshot (neurons + synapses) → drawflow 좌표 + 카드 layout 변환.
// region × population 격자 배치. 각 (region,population) 그룹은 column 1개 차지.

import type { BackendNeuron, BackendSynapse } from '@/lib/backend/client';

export interface LayoutNode {
  id: string;            // backend neuron name 그대로
  label: string;         // 짧은 표시명
  region: string;
  population: string;
  x: number;
  y: number;
  isSystem: boolean;     // INPUT/OUT 시스템 노드는 lock 표시
}

export interface LayoutResult {
  nodes: LayoutNode[];
  // 보이는 노드 사이 시냅스만 필터링.
  synapses: BackendSynapse[];
  visibleNames: Set<string>;
}

const COLUMN_WIDTH = 200;
const ROW_HEIGHT = 84;
const TOP_PAD = 80;
const LEFT_PAD = 80;

// region 표시 순서 (좌 → 우). 미정의 region 은 알파벳 순 끝쪽 배치.
const REGION_ORDER = [
  'SOURCE', 'INPUT', 'V1', 'V2', 'V4', 'IT',
  'PFC', 'AMG', 'BG', 'CRB', 'HIPPO', 'TH', 'OUT',
];

// region 안 population 표시 순서.
const POPULATION_ORDER = [
  'camera', 'gesture', 'input',
  'L4_E', 'L4_I', 'L23_E', 'L23_I', 'L5_E', 'L5_I', 'L6_E', 'L6_I',
  'output',
];

// population 별 최대 표시 개수 (전체 200개 등 큰 그룹 sampling).
const MAX_PER_POPULATION = 12;

function regionOrderIndex(r: string): number {
  const i = REGION_ORDER.indexOf(r);
  return i < 0 ? REGION_ORDER.length : i;
}
function populationOrderIndex(p: string): number {
  const i = POPULATION_ORDER.indexOf(p);
  return i < 0 ? POPULATION_ORDER.length : i;
}

// 시스템 노드 판정 — 입출력 prefix.
function isSystemName(name: string): boolean {
  return name.startsWith('in_') || name.startsWith('out_') || name.startsWith('src_');
}

// 짧은 라벨 — neuron name 마지막 segment.
function shortLabel(name: string): string {
  // src_camera → Camera, in_palm → palm, v1_L4_E_42 → L4_E_42
  if (name.startsWith('src_')) return cap(name.slice(4));
  if (name.startsWith('in_')) return name.slice(3);
  if (name.startsWith('out_')) return name;
  // region prefix 제거 — 첫 _ 다음.
  const idx = name.indexOf('_');
  return idx < 0 ? name : name.slice(idx + 1);
}
function cap(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

export function layoutSnapshot(
  neurons: BackendNeuron[],
  synapses: BackendSynapse[],
): LayoutResult {
  // 1. region × population 그룹화.
  const groups = new Map<string, BackendNeuron[]>();
  for (const n of neurons) {
    const region = n.region || 'OTHER';
    const population = n.population || 'unknown';
    const key = `${region}|${population}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(n);
  }

  // 2. 각 그룹 내부 이름 정렬 + 최대 N개 sampling.
  for (const [key, list] of groups) {
    list.sort((a, b) => a.name.localeCompare(b.name));
    if (list.length > MAX_PER_POPULATION) {
      groups.set(key, list.slice(0, MAX_PER_POPULATION));
    }
  }

  // 3. 그룹 키 정렬 (region order 우선, 같은 region 내 population order).
  const sortedKeys = [...groups.keys()].sort((a, b) => {
    const [ra, pa] = a.split('|');
    const [rb, pb] = b.split('|');
    const ri = regionOrderIndex(ra) - regionOrderIndex(rb);
    if (ri !== 0) return ri;
    const pi = populationOrderIndex(pa) - populationOrderIndex(pb);
    if (pi !== 0) return pi;
    return a.localeCompare(b);
  });

  // 4. 각 그룹을 컬럼 1개로 배치, 행은 아래로.
  const nodes: LayoutNode[] = [];
  const visibleNames = new Set<string>();
  sortedKeys.forEach((key, colIdx) => {
    const list = groups.get(key)!;
    const [region, population] = key.split('|');
    const x = LEFT_PAD + colIdx * COLUMN_WIDTH;
    list.forEach((n, rowIdx) => {
      const y = TOP_PAD + rowIdx * ROW_HEIGHT;
      visibleNames.add(n.name);
      nodes.push({
        id: n.name,
        label: shortLabel(n.name),
        region,
        population,
        x, y,
        isSystem: isSystemName(n.name),
      });
    });
  });

  // 5. 시냅스: 양 끝이 visible 인 것만.
  const visibleSyn = synapses.filter(
    (s) => visibleNames.has(s.pre) && visibleNames.has(s.post),
  );

  return { nodes, synapses: visibleSyn, visibleNames };
}
