// Region view (Canvas.tsx) 영역 layout 헬퍼 — 4 박스 cascade 영역 정합.
//
// 정직 한계 박음 (사용자 명시):
//  - 직전 layoutSnapshot (region × population 격자, 472 sampling 12개) 영역
//    폐기됨 — 데이터 정합 0 (sampling = 거짓 표시 + read-only 영역 가치 0).
//  - 본 파일 영역 preventOverlap + LayoutNode interface 만 보존.
//  - 직전 isSystem / OUT_CARD_H / isOut 영역 dead path — Region view 4 박스
//    population='region' 단일 영역 영역 영역 폐기 (cleanup-2).

export interface LayoutNode {
  id: string;            // backend neuron name 또는 region_INPUT 등
  label: string;         // 짧은 표시명
  region: string;
  population: string;    // Region view 영역 항상 'region'
  x: number;
  y: number;
}

// 카드 실측 (drawflow-helpers fitToView 의 fallback bbox 기준).
// Region 카드 영역 단일 height 영역 — OUT_CARD_H 영역 폐기됨.
const CARD_W = 180;
const CARD_H = 96;
const MIN_GAP = 24;

/**
 * 노드 좌표 배열을 받아 서로 겹치지 않도록 push-down 한다 (in-place).
 * - 같은 컬럼 (x 가 가까운 노드들) 끼리 y 정렬 후 최소 간격 보장
 *
 * Canvas 가 백엔드 layout + 사용자 저장 좌표를 합친 뒤 호출. anchor X 좌표는
 * 보존, Y 만 조정.
 */
export function preventOverlap(positions: Array<{ id: string; x: number; y: number }>) {
  // 컬럼 그룹화 — x 차이 < CARD_W/2 면 같은 컬럼.
  const sorted = [...positions].sort((a, b) => a.x - b.x || a.y - b.y);
  const cols: Array<typeof sorted> = [];
  for (const p of sorted) {
    const col = cols.find((c) => Math.abs(c[0].x - p.x) < CARD_W / 2);
    if (col) col.push(p);
    else cols.push([p]);
  }
  const idToPos = new Map(positions.map((p) => [p.id, p]));
  for (const col of cols) {
    col.sort((a, b) => a.y - b.y);
    for (let i = 1; i < col.length; i++) {
      const prev = col[i - 1];
      const cur  = col[i];
      const minY = prev.y + CARD_H + MIN_GAP;
      if (cur.y < minY) {
        const target = idToPos.get(cur.id)!;
        target.y = minY;
        cur.y = minY;
      }
    }
  }
}
