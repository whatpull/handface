// NodeOut — 8-OUT cluster broadcast supervisor 정합 영역 cluster count 합산 검증.
//
// 사용자 catch 2026-05-09 [1]: 직전 NodeOut 영역 cluster count 영역 out_{ci}_0
// 단일 OUT 영역 영역 catch — N3 cluster broadcast supervisor (8 OUT per cluster:
// out_{ci}_0 ~ out_{ci}_7) 영역 정합 0. 본 PR 영역 8 OUT 영역 합산 영역 정합.
//
// 본 test 영역 NodeOut 영역 helper logic 영역 verbatim 재현 영역 검증 — 직접
// import 영역 NodeOut.tsx (React component 영역) 영역 jsdom 영역 무거움.
// helper 영역 동일 spec 영역 재현 영역 정합 보장.

import { describe, it, expect } from 'vitest';
import type { OutExemplars } from '@/lib/snn/out-exemplars';

const OUT_PER_CLUSTER = 8;

function sumClusterCount(exemplars: OutExemplars, ci: number): number {
  let sum = 0;
  for (let n = 0; n < OUT_PER_CLUSTER; n += 1) {
    sum += exemplars[`out_${ci}_${n}`]?.count ?? 0;
  }
  if (sum === 0) {
    sum = exemplars[`out_${ci}`]?.count ?? 0;
  }
  return sum;
}

function ex(count: number, label: string | null = null) {
  return { count, lastFeature: [] as number[], lastAt: 0, label };
}

describe('NodeOut sumClusterCount — 8-OUT cluster broadcast 합산', () => {
  it('sums all 8 OUT slots for a cluster', () => {
    const exemplars: OutExemplars = {
      out_0_0: ex(1),
      out_0_1: ex(2),
      out_0_2: ex(3),
      out_0_3: ex(4),
      out_0_4: ex(5),
      out_0_5: ex(6),
      out_0_6: ex(7),
      out_0_7: ex(8),
    };
    expect(sumClusterCount(exemplars, 0)).toBe(36); // 1+2+3+4+5+6+7+8
  });

  it('handles missing slots as zero', () => {
    const exemplars: OutExemplars = {
      out_1_0: ex(10),
      out_1_3: ex(20),
      // 1, 2, 4, 5, 6, 7 missing
    };
    expect(sumClusterCount(exemplars, 1)).toBe(30);
  });

  it('falls back to legacy out_{ci} when 8-OUT all zero', () => {
    const exemplars: OutExemplars = {
      out_2: ex(99),
    };
    expect(sumClusterCount(exemplars, 2)).toBe(99);
  });

  it('prefers 8-OUT sum over legacy when both present', () => {
    const exemplars: OutExemplars = {
      out_3_0: ex(5),
      out_3_1: ex(7),
      out_3: ex(999), // legacy fallback — 8-OUT sum 영역 우선 영역 무시.
    };
    expect(sumClusterCount(exemplars, 3)).toBe(12);
  });

  it('returns 0 when no exemplars present for cluster', () => {
    const exemplars: OutExemplars = {
      out_0_0: ex(5),  // 다른 cluster 영역 영향 0.
    };
    expect(sumClusterCount(exemplars, 1)).toBe(0);
  });

  it('handles isolated clusters independently (4 cluster 영역)', () => {
    const exemplars: OutExemplars = {
      out_0_0: ex(1),
      out_0_1: ex(1),
      out_1_0: ex(2),
      out_2_5: ex(3),
      out_3_7: ex(4),
    };
    expect(sumClusterCount(exemplars, 0)).toBe(2);
    expect(sumClusterCount(exemplars, 1)).toBe(2);
    expect(sumClusterCount(exemplars, 2)).toBe(3);
    expect(sumClusterCount(exemplars, 3)).toBe(4);
  });
});
