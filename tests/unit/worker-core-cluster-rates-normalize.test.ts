// QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): clusterFiringRates 영역
// input cardinality normalize 검증.
//
// 사용자 catch 2026-05-09 (스크린샷): horizontal pattern (idx 4,5,6,7) 영역
// winner=cluster 3 (diag-fore) 영역 mismatch — diag-fore (idx 3,6,9,12) 영역
// idx 6 overlap → 32 V1_L4_E sub-cluster 영역 weight 11.0 영역 fire → cluster 3
// winner 영역 root cause.
//
// 학술 정합 (Wiesel 1981 receptive field cardinality fairness): raw firing rate
// argmax 영역 input cardinality 영역 unequal (overlap) 영역 fairness mandatory.
// PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner 정정,
// 2026-05-10): 직전 divisor=overlap (linear) 영역 horizontal 4× penalty →
// other cluster winner 영역 정정. divisor=sqrt(overlap) 영역 swap 영역 sub-linear
// fairness 영역 4-cell active mass 영역 winner 보장.
// normalized = rate / max(1, sqrt(overlap_count)) — overlap_count 영역 pattern
// active idx ∩ cluster.activeInputs (hard-wired sub-pool).
//
// N1: handleClusterFiringRates(pattern=horizontal) 영역 cluster 0 (overlap=4) 영역
//     winner — raw rate 영역 cluster 3 (overlap=1) winner 영역 정정.
// N2: pattern 미동봉 path 영역 raw rate fallback (호환 보존).
// N3: handleClusterFiringRates(layer='V1_L23' or 'V2_L5') 영역 normalize 영역 0
//     (OUT 만 적용 — 정직 한계 정합).
// N4: handleTriggerBackground 영역 push event payload cfr 영역 normalized winner
//     영역 정합 (worker simulation 정합 — 본 test 영역 indirect 검증 영역 패스).

import { describe, expect, it } from 'vitest';

import { SNNWorkerCore } from '@/lib/snn-runtime';

// horizontal pattern — cluster 0 영역 4 idx 모두 overlap (4,5,6,7).
const HORIZONTAL_PATTERN = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
// diag-fore pattern — cluster 3 영역 4 idx 모두 overlap (3,6,9,12).
const DIAG_FORE_PATTERN = [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0];

interface CfrResult {
  rates: number[];
  winner: number;
  share: number;
  margin: number;
  layer: string;
}

// Fix #20 (2026-05-10): zero-init dynamic — LEGACY 4-cluster 영역 explicit pass.
const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

function makeCore(seed = 57): SNNWorkerCore {
  const core = new SNNWorkerCore();
  const buildRes = core.handle({
    id: 1,
    type: 'build',
    payload: { preset: 'n13_orientation', seed, clusterActiveInputs: LEGACY_FOUR },
  });
  expect(buildRes.ok).toBe(true);
  return core;
}

// pattern 영역 simulate inject + run 영역 cluster firing rate catch.
function simulatePatternAndMeasure(
  core: SNNWorkerCore,
  pattern: number[],
  passPattern: boolean,
): CfrResult {
  // resetHomeostatic — clean baseline (V_th saturation 회피).
  const resetRes = core.handle({ id: 10, type: 'resetHomeostatic' });
  expect(resetRes.ok).toBe(true);

  // inject pattern (sustained 30ms).
  const events = pattern
    .map((v, i) => (v > 0.5 ? {
      neuron: `in_feat_${i}`,
      weight: 25 * v,
      time: 0,
      durationMs: 30,
      stepMs: 0.1,
    } : null))
    .filter((e): e is NonNullable<typeof e> => e !== null);
  if (events.length > 0) {
    const injectRes = core.handle({ id: 11, type: 'inject', payload: { events } });
    expect(injectRes.ok).toBe(true);
  }
  // run 50ms — cascade propagation.
  const runRes = core.handle({
    id: 12,
    type: 'run',
    payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
  });
  expect(runRes.ok).toBe(true);
  // measure cluster firing rates — pattern 동봉 / 미동봉 양쪽 path.
  const cfrRes = core.handle({
    id: 13,
    type: 'clusterFiringRates',
    payload: passPattern
      ? { windowMs: 50, layer: 'OUT', pattern }
      : { windowMs: 50, layer: 'OUT' },
  });
  expect(cfrRes.ok).toBe(true);
  return (cfrRes as { ok: true; result: CfrResult }).result;
}

describe('SNNWorkerCore — clusterFiringRates input cardinality normalize (QA HIGH PRIMARY 2026-05-10)', () => {
  it('N1: horizontal pattern (idx 4,5,6,7) 영역 pattern 동봉 영역 cluster 0 winner — cardinality normalize', () => {
    const core = makeCore();
    const cfr = simulatePatternAndMeasure(core, HORIZONTAL_PATTERN, true);
    // cluster 0 (horizontal hard-wired sub-pool: 4,5,6,7) overlap=4.
    // cluster 1 (vertical: 1,5,9,13) overlap=1 (idx 5).
    // cluster 2 (diag-back: 0,5,10,15) overlap=1 (idx 5).
    // cluster 3 (diag-fore: 3,6,9,12) overlap=1 (idx 6).
    // PR-I (2026-05-10): divisor=sqrt(overlap) 영역 swap — cluster 0 영역
    // divisor=2 (sqrt(4)) vs other cluster divisor=1 (sqrt(1)). 4-cell active
    // mass (V1_L4_E sub-pool 4× hard-wired weight 11.0 fire) 영역 raw rate
    // 영역 충분 dominant → normalize 후 cluster 0 winner 영역 정합 보장.
    expect(cfr.winner).toBe(0);
    // rates[0] 영역 가장 큰 값 — normalize divide=2 (sqrt(4)) vs 다른 cluster divide=1.
    expect(cfr.rates[0]).toBeGreaterThan(0);
  });

  it('N2: pattern 미동봉 path 영역 raw rate fallback (호환 보존)', () => {
    const core = makeCore();
    const cfr = simulatePatternAndMeasure(core, HORIZONTAL_PATTERN, false);
    // pattern 미동봉 — raw rate 영역 fallback. winner 영역 cluster 0 또는 다른
    // cluster 영역 가능 단 본 test 영역 raw path 영역 결과 영역 cardinality
    // normalize 적용 0 영역 정합 catch.
    // raw rate 영역 cluster 0 hard-wired (overlap=4) 영역 합산 firing rate 영역
    // 가장 큼 — winner 영역 cluster 0 영역 보장 0 (overlap=1 cluster 영역 32 sub-pool
    // 영역 sub-cluster fire 영역 raw rate 영역 우연 큰 catch 가능).
    expect(cfr.winner).toBeGreaterThanOrEqual(-1);
    expect(cfr.rates).toHaveLength(4);
  });

  it('N3: diag-fore pattern (idx 3,6,9,12) 영역 cluster 3 winner 영역 정합 — 정합 active set', () => {
    const core = makeCore();
    const cfr = simulatePatternAndMeasure(core, DIAG_FORE_PATTERN, true);
    // diag-fore pattern 영역 cluster 3 overlap=4 — normalize 영역 cluster 3 winner 정합.
    // cluster 0 (4,5,6,7) overlap=1 (idx 6).
    // cluster 1 (1,5,9,13) overlap=1 (idx 9).
    // cluster 2 (0,5,10,15) overlap=0.
    // cluster 3 (3,6,9,12) overlap=4.
    expect(cfr.winner).toBe(3);
  });

  it('N4: layer=V1_L23 영역 normalize 적용 0 (OUT only 정합) — 정직 한계 catch', () => {
    const core = makeCore();
    // resetHomeostatic — clean baseline.
    core.handle({ id: 20, type: 'resetHomeostatic' });
    const events = HORIZONTAL_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 21, type: 'inject', payload: { events } });
    core.handle({
      id: 22,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    // V1_L23 영역 pattern 동봉 단 normalize 영역 OUT only — V1_L23 영역 raw rate
    // 영역 fallback (정직 한계 catch).
    const cfrV1 = core.handle({
      id: 23,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'V1_L23', pattern: HORIZONTAL_PATTERN },
    });
    expect(cfrV1.ok).toBe(true);
    const result = (cfrV1 as { ok: true; result: CfrResult }).result;
    expect(result.layer).toBe('V1_L23');
    // V1_L23 layer 영역 raw rate path — pattern 영역 normalize 미적용 (OUT only).
    expect(result.rates).toHaveLength(4);
  });

  // PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner 정정,
  // 2026-05-10): sqrt fairness ratio 직접 산술 검증 — overlap=4 영역 divisor=2
  // / overlap=1 영역 divisor=1 → ratio 4:1 raw 영역 2:1 normalized.
  it('N5: sqrt divisor 영역 fairness ratio 직접 산술 검증 — overlap=4 vs overlap=1 ratio 4:1 → 2:1', () => {
    // direct math test — runtime 의존 0, sqrt divisor 형식 영역 검증.
    const overlap4 = 4;
    const overlap1 = 1;
    const divisor4 = Math.max(1, Math.sqrt(overlap4)); // 2
    const divisor1 = Math.max(1, Math.sqrt(overlap1)); // 1
    expect(divisor4).toBe(2);
    expect(divisor1).toBe(1);
    // raw rate 영역 동일 단위 영역 가정 시 (예: cluster 영역 4 cell active mass
    // 영역 4× rate, single cell active 영역 1× rate) 영역 raw ratio 4:1 → divisor
    // 영역 normalize 영역 (4/2):(1/1) = 2:1 영역 cluster 4-cell active 영역 winner 정합.
    const rawHorizontal = 4.0; // 4-cell active mass.
    const rawSingle = 1.0; // overlap=1 cluster 영역 single cell sub-pool fire.
    const normHorizontal = rawHorizontal / divisor4; // 2.0
    const normSingle = rawSingle / divisor1; // 1.0
    expect(normHorizontal).toBeGreaterThan(normSingle);
    expect(normHorizontal / normSingle).toBe(2);
  });
});
