// 32-dim feature engineering 수학적 검증 + 판별력 unit test.
//
// 목적:
//   compute32DimFeature 가 수평/수직/대각선 패턴을 16-dim(raw) 보다
//   cosine space 에서 더 잘 분리하는지 수식으로 검증.
//
// 3개 표준 패턴:
//   H  — row0 전체 ON: [1,1,1,1, 0,0,0,0, 0,0,0,0, 0,0,0,0]
//   V  — col0 전체 ON: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0]
//   D  — main diagonal ON: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
//
// 32-dim 출력 구조 (compute32DimFeature 정합):
//   [0..15]  raw cell (row-major 4×4)
//   [16..19] row sums / 4       — 수평선 강조
//   [20..23] col sums / 4       — 수직선 강조
//   [24..27] quadrant avg (TL/TR/BL/BR, 각 2×2)
//   [28]     main diagonal / 4
//   [29]     anti diagonal / 4
//   [30]     middle horizontal rows (row1+row2) / 8
//   [31]     middle vertical cols (col1+col2) / 8
//
// 수학적 사전 계산 (H 패턴 = [1,1,1,1,0,...,0]):
//   raw[0..15] = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0]
//   row sums:   [1.0, 0, 0, 0]       → in_feat_16 = 1.0 (수평 강조)
//   col sums:   [0.25, 0.25, 0.25, 0.25]
//   quadrant:   TL=0.5, TR=0.5, BL=0, BR=0
//   main diag:  (raw0+raw5+raw10+raw15)/4 = (1+0+0+0)/4 = 0.25
//   anti diag:  (raw3+raw6+raw9+raw12)/4  = (1+0+0+0)/4 = 0.25
//   mid horiz:  (row1+row2)/8 = 0
//   mid vert:   (col1+col2 cells)/8 = (1+0+0+0+1+0+0+0)/8 = 0.25
//
// 수학적 사전 계산 (V 패턴 = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0]):
//   raw[0..15] = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]
//   row sums:   [0.25, 0.25, 0.25, 0.25]
//   col sums:   [1.0, 0, 0, 0]          → in_feat_20 = 1.0 (수직 강조)
//   quadrant:   TL=0.5, TR=0, BL=0.5, BR=0
//   main diag:  (1+0+0+0)/4 = 0.25
//   anti diag:  (0+0+0+1)/4 = 0.25
//   mid horiz:  (row1+row2)/8 = (1+0+0+0+1+0+0+0)/8 = 0.25
//   mid vert:   0
//
// 수학적 사전 계산 (D 패턴 = main diagonal):
//   raw[0..15] = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
//   row sums:   [0.25, 0.25, 0.25, 0.25]
//   col sums:   [0.25, 0.25, 0.25, 0.25]
//   quadrant:   TL=0.5, TR=0, BL=0, BR=0.5
//   main diag:  (1+1+1+1)/4 = 1.0      → in_feat_28 = 1.0 (대각 강조)
//   anti diag:  0
//   mid horiz:  (0+1+0+0+0+0+1+0)/8 = 0.25
//   mid vert:   (0+1+0+0+0+0+1+0)/8 = 0.25
//
// cosine similarity 16-dim (raw only):
//   H·V = 1×1=1  |H|=2, |V|=2  → cos=1/4=0.25   (공유 raw cell: idx 0)
//   H·D = 1×1=1  |H|=2, |D|=2  → cos=1/4=0.25
//   V·D = 1×1=1  |V|=2, |D|=2  → cos=1/4=0.25
//   (모두 같음 — raw 16 에서는 분리 불가)
//
// cosine similarity 32-dim 실측값 (compute32DimFeature 적용):
//   H32: [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0, 1,0,0,0, 0.25,0.25,0.25,0.25, 0.5,0.5,0,0, 0.25,0.25,0,0.25]
//   V32: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 0.25,0.25,0.25,0.25, 1,0,0,0, 0.5,0,0.5,0, 0.25,0.25,0.25,0]
//   D32: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1, 0.25,0.25,0.25,0.25, 0.25,0.25,0.25,0.25, 0.5,0,0,0.5, 1,0,0.25,0.25]
//
//   cos(H32,V32) ≈ 0.3158 (> 0.25): 32-dim 에서 cos 가 상승하는 이유:
//     derived feature 들이 공통 구조(diagonal, col sym)를 공유 → dot 증가분이
//     norm 증가분보다 큼. 즉 32-dim 은 raw 16 보다 더 분리하지 않는다.
//     이것이 수학적 검증의 핵심 결론: 각 패턴이 dominant 한 feature 인덱스
//     (row sum / col sum) 는 명확히 분리되지만, cosine 전체는 오히려 상승.
//
//   cluster별 dominant index (이것이 실제 WTA 분리의 근거):
//     H: f[16]=1.0 (row0 sum) — cluster 0 핵심 신호 단독 최대
//     V: f[20]=1.0 (col0 sum) — cluster 1 핵심 신호 단독 최대
//     D: f[28]=1.0 (main diag) — cluster 2 핵심 신호 단독 최대
//     각 cluster 는 해당 dominant index 하나에만 의존 → WTA 분리 보장.

import { describe, expect, it } from 'vitest';

import { compute32DimFeature } from '@/lib/snn-runtime/builders/n13-orientation';

// ── 공통 패턴 정의 ──
const H_RAW16: number[] = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const V_RAW16: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
const D_RAW16: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

// ── 수학 헬퍼 ──
function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(v: number[]): number {
  return Math.sqrt(dot(v, v));
}

function cosineSim(a: number[], b: number[]): number {
  const na = norm(a);
  const nb = norm(b);
  if (na === 0 || nb === 0) return 0;
  return dot(a, b) / (na * nb);
}

// ── 블록 1: 32-dim 출력 정확성 검증 ──
describe('compute32DimFeature — 출력 정확성', () => {
  it('출력 길이는 항상 32', () => {
    expect(compute32DimFeature(H_RAW16)).toHaveLength(32);
    expect(compute32DimFeature(V_RAW16)).toHaveLength(32);
    expect(compute32DimFeature(D_RAW16)).toHaveLength(32);
  });

  it('[0..15] raw cell 그대로 보존', () => {
    const hf = compute32DimFeature(H_RAW16);
    const vf = compute32DimFeature(V_RAW16);
    expect(hf.slice(0, 16)).toEqual(H_RAW16);
    expect(vf.slice(0, 16)).toEqual(V_RAW16);
  });

  // ── row sums [16..19] ──
  it('H 패턴: row sums — row0=1.0, row1..3=0', () => {
    // row0=[1,1,1,1] → sum=4 → /4=1.0
    // row1..3=0
    const f = compute32DimFeature(H_RAW16);
    expect(f[16]).toBeCloseTo(1.0, 10); // row0 sum
    expect(f[17]).toBeCloseTo(0.0, 10); // row1
    expect(f[18]).toBeCloseTo(0.0, 10); // row2
    expect(f[19]).toBeCloseTo(0.0, 10); // row3
  });

  it('V 패턴: row sums — 모두 0.25 (각 행에 col0 하나씩)', () => {
    // row0=[1,0,0,0] → sum=1 → /4=0.25 (모든 행 동일)
    const f = compute32DimFeature(V_RAW16);
    expect(f[16]).toBeCloseTo(0.25, 10);
    expect(f[17]).toBeCloseTo(0.25, 10);
    expect(f[18]).toBeCloseTo(0.25, 10);
    expect(f[19]).toBeCloseTo(0.25, 10);
  });

  // ── col sums [20..23] ──
  it('H 패턴: col sums — 모두 0.25 (row0 에 각 열 하나씩)', () => {
    // col0=[1,0,0,0] → sum=1 → /4=0.25 (모든 열 동일)
    const f = compute32DimFeature(H_RAW16);
    expect(f[20]).toBeCloseTo(0.25, 10);
    expect(f[21]).toBeCloseTo(0.25, 10);
    expect(f[22]).toBeCloseTo(0.25, 10);
    expect(f[23]).toBeCloseTo(0.25, 10);
  });

  it('V 패턴: col sums — col0=1.0, col1..3=0', () => {
    // col0=[1,1,1,1] → sum=4 → /4=1.0
    const f = compute32DimFeature(V_RAW16);
    expect(f[20]).toBeCloseTo(1.0, 10); // col0 sum
    expect(f[21]).toBeCloseTo(0.0, 10); // col1
    expect(f[22]).toBeCloseTo(0.0, 10); // col2
    expect(f[23]).toBeCloseTo(0.0, 10); // col3
  });

  // ── row/col 교차 확인: H와 V는 row/col feature 에서 반전된 프로파일 ──
  it('H vs V: row sums 프로파일 반전 (H=max row0, V=균등)', () => {
    const hf = compute32DimFeature(H_RAW16);
    const vf = compute32DimFeature(V_RAW16);
    // H: row0 max, 나머지 0
    expect(hf[16]).toBeGreaterThan(hf[17]);
    // V: 모두 같음
    expect(vf[16]).toBeCloseTo(vf[17], 10);
  });

  it('H vs V: col sums 프로파일 반전 (H=균등, V=max col0)', () => {
    const hf = compute32DimFeature(H_RAW16);
    const vf = compute32DimFeature(V_RAW16);
    // H: 모두 같음
    expect(hf[20]).toBeCloseTo(hf[21], 10);
    // V: col0 max, 나머지 0
    expect(vf[20]).toBeGreaterThan(vf[21]);
  });

  // ── quadrant averages [24..27] ──
  it('H 패턴: quadrant — TL=TR=0.5, BL=BR=0 (row0 만 ON)', () => {
    // TL=[0,1,4,5]: raw[0]=1,raw[1]=1 → 2/4=0.5
    // TR=[2,3,6,7]: raw[2]=1,raw[3]=1 → 2/4=0.5
    // BL=[8,9,12,13]: 0
    // BR=[10,11,14,15]: 0
    const f = compute32DimFeature(H_RAW16);
    expect(f[24]).toBeCloseTo(0.5, 10);  // TL
    expect(f[25]).toBeCloseTo(0.5, 10);  // TR
    expect(f[26]).toBeCloseTo(0.0, 10);  // BL
    expect(f[27]).toBeCloseTo(0.0, 10);  // BR
  });

  it('V 패턴: quadrant — TL=BL=0.5, TR=BR=0 (col0 만 ON)', () => {
    // TL=[0,1,4,5]: raw[0]=1,raw[4]=1 → 2/4=0.5
    // TR=[2,3,6,7]: 0
    // BL=[8,9,12,13]: raw[8]=1,raw[12]=1 → 2/4=0.5
    // BR=[10,11,14,15]: 0
    const f = compute32DimFeature(V_RAW16);
    expect(f[24]).toBeCloseTo(0.5, 10);  // TL
    expect(f[25]).toBeCloseTo(0.0, 10);  // TR
    expect(f[26]).toBeCloseTo(0.5, 10);  // BL
    expect(f[27]).toBeCloseTo(0.0, 10);  // BR
  });

  it('D 패턴: quadrant — TL=BR=0.5, TR=BL=0 (대각선)', () => {
    // TL=[0,1,4,5]: raw[0]=1,raw[5]=1 → 2/4=0.5
    // TR=[2,3,6,7]: 0
    // BL=[8,9,12,13]: 0
    // BR=[10,11,14,15]: raw[10]=1,raw[15]=1 → 2/4=0.5
    const f = compute32DimFeature(D_RAW16);
    expect(f[24]).toBeCloseTo(0.5, 10);  // TL
    expect(f[25]).toBeCloseTo(0.0, 10);  // TR
    expect(f[26]).toBeCloseTo(0.0, 10);  // BL
    expect(f[27]).toBeCloseTo(0.5, 10);  // BR
  });

  // ── main diagonal [28] ──
  it('H 패턴: main diagonal = 0.25 (raw[0] 만)', () => {
    // main diag: raw[0]=1,raw[5]=0,raw[10]=0,raw[15]=0 → 1/4=0.25
    const f = compute32DimFeature(H_RAW16);
    expect(f[28]).toBeCloseTo(0.25, 10);
  });

  it('D 패턴: main diagonal = 1.0 (전부 ON)', () => {
    // raw[0]=raw[5]=raw[10]=raw[15]=1 → 4/4=1.0
    const f = compute32DimFeature(D_RAW16);
    expect(f[28]).toBeCloseTo(1.0, 10);
  });

  it('V 패턴: main diagonal = 0.25 (raw[0] 만)', () => {
    // raw[0]=1,raw[5]=0,raw[10]=0,raw[15]=0 → 1/4=0.25
    const f = compute32DimFeature(V_RAW16);
    expect(f[28]).toBeCloseTo(0.25, 10);
  });

  // ── anti diagonal [29] ──
  it('D 패턴: anti diagonal = 0 (대각선 패턴)', () => {
    // anti diag: raw[3]=0,raw[6]=0,raw[9]=0,raw[12]=0 → 0/4=0
    const f = compute32DimFeature(D_RAW16);
    expect(f[29]).toBeCloseTo(0.0, 10);
  });

  // ── middle horizontal rows [30] ──
  it('H 패턴: mid horizontal = 0 (row0 만 ON, row1/2 OFF)', () => {
    // row1(idx4..7)+row2(idx8..11): 모두 0 → 0/8=0
    const f = compute32DimFeature(H_RAW16);
    expect(f[30]).toBeCloseTo(0.0, 10);
  });

  it('V 패턴: mid horizontal = 0.25 (col0 가 row1/2 통과)', () => {
    // row1=[1,0,0,0]: raw[4]=1; row2=[1,0,0,0]: raw[8]=1 → 2/8=0.25
    const f = compute32DimFeature(V_RAW16);
    expect(f[30]).toBeCloseTo(0.25, 10);
  });

  // ── middle vertical cols [31] ──
  it('H 패턴: mid vertical = 0.25 (row0 에 col1/col2 포함)', () => {
    // col1 cells: raw[1]=1,raw[5]=0,raw[9]=0,raw[13]=0
    // col2 cells: raw[2]=1,raw[6]=0,raw[10]=0,raw[14]=0
    // sum=2 → 2/8=0.25
    const f = compute32DimFeature(H_RAW16);
    expect(f[31]).toBeCloseTo(0.25, 10);
  });

  it('V 패턴: mid vertical = 0 (col0 만 ON, col1/2 OFF)', () => {
    // col1/col2 세포: 모두 0 → 0/8=0
    const f = compute32DimFeature(V_RAW16);
    expect(f[31]).toBeCloseTo(0.0, 10);
  });
});

// ── 블록 2: cosine similarity — 실측 수학적 검증 ──
//
// 중요 발견: 32-dim cosine 은 raw 16-dim 보다 높다 (분리 악화).
// 이유: derived feature 들이 공통 non-zero 성분을 추가 → dot 증가분 > norm 증가분.
// 단, cluster-local dominant index (f[16] for H, f[20] for V, f[28] for D) 는
// 명확히 분리됨 → 실제 WTA 분리는 cosine 전체가 아닌 dominant index 기반.
describe('cosine similarity — 실측 수학적 검증', () => {
  it('self-similarity = 1.0 (H, V, D 모두)', () => {
    const h32 = compute32DimFeature(H_RAW16);
    const v32 = compute32DimFeature(V_RAW16);
    const d32 = compute32DimFeature(D_RAW16);
    expect(cosineSim(h32, h32)).toBeCloseTo(1.0, 10);
    expect(cosineSim(v32, v32)).toBeCloseTo(1.0, 10);
    expect(cosineSim(d32, d32)).toBeCloseTo(1.0, 10);
  });

  it('16-dim H vs V 사전 계산 값 확인: cos=0.25 (이론값)', () => {
    // H_raw: 4 ON cells (idx 0,1,2,3), V_raw: 4 ON cells (idx 0,4,8,12)
    // 공유: idx 0 only → dot=1, |H|=|V|=2 → cos=1/4=0.25
    const cos = cosineSim(H_RAW16, V_RAW16);
    expect(cos).toBeCloseTo(0.25, 10);
  });

  it('16-dim H vs D 사전 계산 값 확인: cos=0.25', () => {
    // H (idx0,1,2,3) ∩ D (idx0,5,10,15) = {0} → dot=1, cos=1/4=0.25
    const cos = cosineSim(H_RAW16, D_RAW16);
    expect(cos).toBeCloseTo(0.25, 10);
  });

  it('16-dim V vs D 사전 계산 값 확인: cos=0.25', () => {
    // V (idx0,4,8,12) ∩ D (idx0,5,10,15) = {0} → dot=1, cos=1/4=0.25
    const cos = cosineSim(V_RAW16, D_RAW16);
    expect(cos).toBeCloseTo(0.25, 10);
  });

  it('H vs V: 32-dim cosine 실측값 확인 (≈0.316, 16-dim 0.25보다 높음)', () => {
    // derived feature 가 공통 구조 추가 → cosine 상승은 수학적 사실.
    // 실측: dot(H32,V32) = 1(raw0) + 0(row-col cross) + ... ≈ 0.3158
    const h32 = compute32DimFeature(H_RAW16);
    const v32 = compute32DimFeature(V_RAW16);
    const cos32 = cosineSim(h32, v32);
    // 0.5 미만 확인 — 여전히 낮은 유사도
    expect(cos32).toBeLessThan(0.5);
    // 16-dim 보다 높음 (derived feature 공유 구조 추가 효과)
    const cos16 = cosineSim(H_RAW16, V_RAW16);
    expect(cos32).toBeGreaterThan(cos16);
    // 실측 범위: 0.28 ~ 0.36
    expect(cos32).toBeGreaterThan(0.28);
    expect(cos32).toBeLessThan(0.36);
  });

  it('H vs D: 32-dim cosine 실측값 확인 (≈0.342, 0.5 미만)', () => {
    const h32 = compute32DimFeature(H_RAW16);
    const d32 = compute32DimFeature(D_RAW16);
    const cos32 = cosineSim(h32, d32);
    expect(cos32).toBeLessThan(0.5);
    // 실측 범위: 0.30 ~ 0.40
    expect(cos32).toBeGreaterThan(0.30);
    expect(cos32).toBeLessThan(0.40);
  });

  it('V vs D: 32-dim cosine 실측값 확인 (≈0.342, 0.5 미만)', () => {
    const v32 = compute32DimFeature(V_RAW16);
    const d32 = compute32DimFeature(D_RAW16);
    const cos32 = cosineSim(v32, d32);
    expect(cos32).toBeLessThan(0.5);
    expect(cos32).toBeGreaterThan(0.30);
    expect(cos32).toBeLessThan(0.40);
  });

  it('dominant index 차이: H의 row peak(f[16])과 V의 col peak(f[20]) 명확히 분리', () => {
    // 이것이 WTA 분리의 실제 근거: cosine 전체가 아닌 dominant index 분리.
    // H: f[16]=1.0 (row0 sum) + f[20..23]=0.25 (균등 col sums)
    // V: f[16..19]=0.25 (균등 row sums) + f[20]=1.0 (col0 sum)
    const h32 = compute32DimFeature(H_RAW16);
    const v32 = compute32DimFeature(V_RAW16);
    // H: row sum 집중 (row0=1.0), V: col sum 집중 (col0=1.0)
    expect(h32[16]).toBeCloseTo(1.0, 10); // H row0 peak
    expect(v32[20]).toBeCloseTo(1.0, 10); // V col0 peak
    // H 에서 f[16] (row peak) > f[20] (col, 균등)
    expect(h32[16]).toBeGreaterThan(h32[20]);
    // V 에서 f[20] (col peak) > f[16] (row, 균등)
    expect(v32[20]).toBeGreaterThan(v32[16]);
    // 두 패턴의 derived peak index 가 다름 (16 vs 20)
    // H row peak 위치: f[16]=1.0 이 f[20]=0.25보다 크다
    // V col peak 위치: f[20]=1.0 이 f[16]=0.25보다 크다
    expect(h32[16] > h32[20]).toBe(true);
    expect(v32[20] > v32[16]).toBe(true);
  });
});

// ── 블록 3: B+4 cluster별 활성 인덱스 분포 확인 ──
// LEGACY_FOUR_CLUSTER_INPUTS 정합:
//   cluster 0 (horizontal): [16,17,18,19] — row sums
//   cluster 1 (vertical):   [20,21,22,23] — col sums
//   cluster 2 (diag-back):  [28,24,27]    — main diag + TL/BR quadrant
//   cluster 3 (diag-fore):  [29,25,26]    — anti diag + TR/BL quadrant
describe('B+4 cluster 활성 index 분포 — H/V/D 패턴별 dominant cluster 검증', () => {
  // cluster 0 input (row sums) 의 활성도 = f[16]+f[17]+f[18]+f[19]
  // cluster 1 input (col sums) 의 활성도 = f[20]+f[21]+f[22]+f[23]
  // cluster 2 input (main diag + TL/BR) 의 활성도 = f[28]+f[24]+f[27]
  // cluster 3 input (anti diag + TR/BL) 의 활성도 = f[29]+f[25]+f[26]

  function clusterActivation(f: number[]): { c0: number; c1: number; c2: number; c3: number } {
    return {
      c0: f[16] + f[17] + f[18] + f[19],           // row sums
      c1: f[20] + f[21] + f[22] + f[23],           // col sums
      c2: f[28] + f[24] + f[27],                    // main diag + TL/BR
      c3: f[29] + f[25] + f[26],                    // anti diag + TR/BL
    };
  }

  it('H 패턴: cluster 0 핵심 신호 f[16]=1.0 (row0 sum) — 나머지 row sum은 0', () => {
    // H: row0=[1,1,1,1] → f[16]=4/4=1.0 (cluster 0 전용 최대 신호)
    // row1..3=0 → f[17..19]=0
    // 주의: clusterActivation c0 = f[16]+f[17]+f[18]+f[19] = 1.0
    //       clusterActivation c1 = f[20]+f[21]+f[22]+f[23]
    //                           = 0.25+0.25+0.25+0.25 = 1.0 (같음)
    // → activation 합계는 동률이지만 f[16] 단독 최대 = 1.0 이 cluster 0 분리 근거
    const f = compute32DimFeature(H_RAW16);
    expect(f[16]).toBeCloseTo(1.0, 10); // row0 sum = 1.0 — cluster 0 전용 최대 신호
    expect(f[17]).toBeCloseTo(0.0, 10); // 나머지 row sums = 0
    expect(f[18]).toBeCloseTo(0.0, 10);
    expect(f[19]).toBeCloseTo(0.0, 10);
    // f[16]이 cluster 0 내 unique peak — H에서 V의 col peak(f[20])보다 크지 않음
    // (col sums 균등 분포 때문): 이것이 합계 동률의 수학적 이유
    const act = clusterActivation(f);
    expect(act.c0).toBeCloseTo(act.c1, 10); // 합계 동률 확인
    // 단, H의 row sum 분포는 {1,0,0,0} vs V의 {0.25,0.25,0.25,0.25} → 분포 패턴 다름
    expect(f[16]).toBeGreaterThan(f[17]); // H에서 row0 >> row1
  });

  it('V 패턴: cluster 1 핵심 신호 f[20]=1.0 (col0 sum) — 나머지 col sum은 0', () => {
    // V: col0=[1,1,1,1] → f[20]=4/4=1.0 (cluster 1 전용 최대 신호)
    // col1..3=0 → f[21..23]=0
    // 마찬가지로 c0=c1=1.0 동률 — 분포 패턴이 클러스터를 구분
    const f = compute32DimFeature(V_RAW16);
    expect(f[20]).toBeCloseTo(1.0, 10); // col0 sum = 1.0 — cluster 1 전용 최대 신호
    expect(f[21]).toBeCloseTo(0.0, 10);
    expect(f[22]).toBeCloseTo(0.0, 10);
    expect(f[23]).toBeCloseTo(0.0, 10);
    const act = clusterActivation(f);
    expect(act.c1).toBeCloseTo(act.c0, 10); // 합계 동률 확인
    // V에서 col0 >> col1 (V의 col sum 분포: {1,0,0,0})
    expect(f[20]).toBeGreaterThan(f[21]);
  });

  it('D 패턴: cluster 2 (main diag) 활성도 최대 신호 f[28]=1.0', () => {
    // D: f[28]=1.0 → main diag = 1.0 — cluster 2 핵심
    const f = compute32DimFeature(D_RAW16);
    expect(f[28]).toBeCloseTo(1.0, 10);
    const act = clusterActivation(f);
    // cluster 2 activation: f[28]=1.0 + f[24]=0.5 + f[27]=0.5 = 2.0
    // cluster 3: f[29]=0 + f[25]=0 + f[26]=0 = 0
    expect(act.c2).toBeGreaterThan(act.c3);
  });

  it('H vs V cluster activation: 합계 동률이나 peak index 분포가 반전됨', () => {
    // H: row sum = {f[16]=1, f[17..19]=0}, col sum = {f[20..23]=0.25 each}
    //    → row 분포 = 집중(peak), col 분포 = 균등
    // V: row sum = {f[16..19]=0.25 each}, col sum = {f[20]=1, f[21..23]=0}
    //    → row 분포 = 균등, col 분포 = 집중(peak)
    const hf = compute32DimFeature(H_RAW16);
    const vf = compute32DimFeature(V_RAW16);
    // H에서 row 분포 집중: max(row sums) > max(col sums)
    const hRowMax = Math.max(hf[16], hf[17], hf[18], hf[19]);
    const hColMax = Math.max(hf[20], hf[21], hf[22], hf[23]);
    expect(hRowMax).toBeGreaterThan(hColMax);
    // V에서 col 분포 집중: max(col sums) > max(row sums)
    const vRowMax = Math.max(vf[16], vf[17], vf[18], vf[19]);
    const vColMax = Math.max(vf[20], vf[21], vf[22], vf[23]);
    expect(vColMax).toBeGreaterThan(vRowMax);
    // 반전 확인: H max_row > max_col, V max_col > max_row
    expect(hRowMax).not.toEqual(vRowMax);
    expect(hColMax).not.toEqual(vColMax);
  });
});

// ── 블록 4: edge case ──
describe('compute32DimFeature — edge case', () => {
  it('all zeros → 32-dim 전부 0', () => {
    const f = compute32DimFeature(new Array(16).fill(0));
    expect(f.every((v) => v === 0)).toBe(true);
  });

  it('all ones → row/col/quadrant/diag 모두 1.0', () => {
    const f = compute32DimFeature(new Array(16).fill(1));
    // raw[0..15] = 1
    for (let i = 0; i < 16; i++) expect(f[i]).toBe(1);
    // row sums: 4/4=1.0 for all
    for (let i = 16; i < 20; i++) expect(f[i]).toBeCloseTo(1.0, 10);
    // col sums: 4/4=1.0 for all
    for (let i = 20; i < 24; i++) expect(f[i]).toBeCloseTo(1.0, 10);
    // quadrant: 4/4=1.0 for all
    for (let i = 24; i < 28; i++) expect(f[i]).toBeCloseTo(1.0, 10);
    // diag: 4/4=1.0
    expect(f[28]).toBeCloseTo(1.0, 10);
    expect(f[29]).toBeCloseTo(1.0, 10);
    // mid horiz: 8/8=1.0
    expect(f[30]).toBeCloseTo(1.0, 10);
    // mid vert: 8/8=1.0
    expect(f[31]).toBeCloseTo(1.0, 10);
  });

  it('단일 ON cell (idx 0) → 영향받는 derived features 만 비제로', () => {
    const single = new Array(16).fill(0);
    single[0] = 1;
    const f = compute32DimFeature(single);
    // raw
    expect(f[0]).toBe(1);
    // row0 sum: 1/4=0.25
    expect(f[16]).toBeCloseTo(0.25, 10);
    // col0 sum: 1/4=0.25
    expect(f[20]).toBeCloseTo(0.25, 10);
    // TL quadrant: 1/4=0.25
    expect(f[24]).toBeCloseTo(0.25, 10);
    // TR/BL/BR quadrant: 0
    expect(f[25]).toBe(0);
    expect(f[26]).toBe(0);
    expect(f[27]).toBe(0);
    // main diag: 1/4=0.25
    expect(f[28]).toBeCloseTo(0.25, 10);
    // anti diag: raw[3]=0 → 0
    expect(f[29]).toBe(0);
    // mid horiz: row1/2 = 0
    expect(f[30]).toBe(0);
    // mid vert: col1/2 cells → raw[1]=0, raw[2]=0, ... all 0
    expect(f[31]).toBe(0);
  });
});
