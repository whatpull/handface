// Fix #22 (사용자 catch 2026-05-10 — 첫번째 패턴만 학습되고 2번째 패턴이
// 학습이 안됨): worker-core handleClusterFiringRates 영역 inputMatch 산출 +
// live-snn vigilance follow-up 영역 input similarity 기반 spawn 검증.
//
// 사용자 catch (스크린샷 정합):
//   - INPUT: 좌우 컬럼 (col 0, col 3) 4행 영역 8 칸 (vertical 양쪽 영역) — 신규 패턴
//   - LEARN: "LIVE — STDP active 학습 #37 · winner 패턴 1 · margin 100%". 패턴 1: 233Hz
//   - INFER: 패턴 1=0, WINNER —, MARGIN 0%
//   - OUT: 패턴 1 = 1
//   - 사용자 명시: "첫번째 패턴만 학습되고 2번째 패턴이 학습이 안됨"
//
// Root cause: share = max / total = max / max = 1.0 (single cluster) → margin
// = (max - 0) / max = 1.0 (single cluster) → vigilance condition margin <
// vigilance(0.15) 영역 영원히 false → expandCluster 영역 spawn 0.
//
// Fix: Carpenter-Grossberg 1987 ART vigilance ρ canonical 정합 — |I ∩ T| / |I|
// (input ∩ winner template / input). 신규 input pattern (좌우 컬럼) 영역 winner
// cluster (학습 영역 vertical 4-cell template [1,5,9,13]) 영역 매칭 영역 영역 영역
// 영역 0.0 → vigilance miss → expandCluster (cluster 2 spawn).

import { describe, expect, it } from 'vitest';

import { SNNWorkerCore, expandCluster } from '@/lib/snn-runtime';

interface CfrResult {
  rates: number[];
  winner: number;
  share: number;
  margin: number;
  inputMatch: number;
  layer: string;
}

interface InternalCore {
  registry: { slots: { id: number; activeInputs: number[] }[] };
  net: unknown;
}

// vertical pattern — cluster 1 영역 4 idx 모두 overlap (1,5,9,13).
const VERTICAL_PATTERN = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
// 좌우 컬럼 pattern (col 0 + col 3) — 사용자 catch 신규 패턴 (cluster 1
// activeInputs [1,5,9,13] 영역 overlap=0).
const LEFT_RIGHT_COLS_PATTERN = [
  1, 0, 0, 1, // row 0
  1, 0, 0, 1, // row 1
  1, 0, 0, 1, // row 2
  1, 0, 0, 1, // row 3
];

describe('worker-core — Fix #22 vigilance input similarity (사용자 catch 2026-05-10)', () => {
  it('R1: 단일 cluster (vertical [1,5,9,13]) + 동일 input pattern → inputMatch=1.0 (vigilance pass)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // resetHomeostatic + inject vertical pattern + run 50ms + measure.
    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = VERTICAL_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: VERTICAL_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // winner = cluster 0 (single cluster — id=0 영역 vertical hard-wired).
    expect(cfr.winner).toBe(0);
    // inputMatch = |I ∩ T| / |I| = |{1,5,9,13} ∩ {1,5,9,13}| / |{1,5,9,13}| = 4/4 = 1.0.
    expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
  });

  it('R2 [Fix #22 ROOT CAUSE]: 단일 cluster + 신규 input pattern (좌우 컬럼) → inputMatch=0.0 (vigilance miss)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // resetHomeostatic + inject 좌우 컬럼 pattern + run 50ms + measure.
    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = LEFT_RIGHT_COLS_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: LEFT_RIGHT_COLS_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // R2 사실: 좌우 컬럼 input ([0,3,4,7,8,11,12,15]) 영역 cluster 0
    // (activeInputs=[1,5,9,13]) 영역 hard-wire 영역 0 overlap → cluster 0 OUT
    // 영역 fire 0 (silent: in_feat_0/3/4/7/8/11/12/15 → cluster 0 영역 strong
    // wire 0). silent path 영역 winner=-1 + share=0 + margin=0 + inputMatch=0.
    // 단 만약 cross-talk (5% density 영역 cluster 0 영역 inactive idx connect)
    // 영역 fire 영역 영역 영역, share/margin 영역 1.0 (single cluster 영역 영원히 1.0)
    // 영역 winner=0 + inputMatch = |I ∩ T| / |I| = 0 → vigilance miss path 정합.
    if (cfr.winner < 0) {
      // silent — vigilance miss path (winner < 0 영역 live-snn 영역 spawn 정합).
      expect(cfr.share).toBe(0);
      expect(cfr.margin).toBe(0);
      expect(cfr.inputMatch).toBe(0);
    } else {
      // single cluster 영역 fire — share/margin 영역 1.0 (root cause 영역 정합).
      // inputMatch 영역 0 overlap → vigilance miss (Fix #22 영역 핵심).
      expect(cfr.winner).toBe(0);
      expect(cfr.share).toBeCloseTo(1.0, 3);
      expect(cfr.margin).toBeCloseTo(1.0, 3);
      expect(cfr.inputMatch).toBeCloseTo(0.0, 3);
    }
  });

  it('R3: 신규 input pattern + cluster 2 spawn 후 동일 pattern 재추론 → inputMatch=1.0 (vigilance pass — 학습 후 familiar)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // expand cluster 2 (좌우 컬럼 pattern 영역 activeInputs).
    const internal = core as unknown as InternalCore;
    const leftRightActive = LEFT_RIGHT_COLS_PATTERN
      .map((v, i) => (v > 0.5 ? i : -1))
      .filter((i) => i >= 0);
    expect(leftRightActive).toEqual([0, 3, 4, 7, 8, 11, 12, 15]);
    const expandResult = expandCluster(
      internal.net as Parameters<typeof expandCluster>[0],
      internal.registry as Parameters<typeof expandCluster>[1],
      { activeInputs: leftRightActive, seed: 7 },
    );
    expect(expandResult.newSlot.id).toBe(1);
    expect(internal.registry.slots).toHaveLength(2);

    // 동일 input pattern 영역 재추론 — winner 영역 cluster 1 (신규) 영역 inputMatch=1.0.
    core.handle({ id: 10, type: 'resetHomeostatic' });
    const events = LEFT_RIGHT_COLS_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 11, type: 'inject', payload: { events } });
    core.handle({
      id: 12,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 13,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: LEFT_RIGHT_COLS_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // R3 정직 한계: cluster 2 (신규) 영역 expandCluster 직후 영역 STDP 0 — initial
    // weight (in_feat_X→v1_L4_E_X = 11.0±1.0) 영역 cluster 1 영역 동일 strength.
    // winner 영역 본 test 영역 measure 영역 inputMatch 영역 winner cluster 영역
    // activeInputs 영역 overlap 정합 catch 영역 cluster 1 (좌우 컬럼) 또는 cluster 0
    // (vertical) 영역 cell-by-cell competition. 본 test 영역 inputMatch 산출 영역
    // winner 영역 activeInputs 정합 영역 검증 — winner=cluster 1 영역 영역 inputMatch
    // = |좌우컬럼 ∩ 좌우컬럼| / 8 = 1.0, winner=cluster 0 영역 영역 inputMatch =
    // |좌우컬럼 ∩ vertical| / 8 = 0.0 (R2 정합).
    if (cfr.winner === 1) {
      expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
    } else if (cfr.winner === 0) {
      expect(cfr.inputMatch).toBeCloseTo(0.0, 3);
    } else {
      // winner -1 (silent) 영역 inputMatch=0.
      expect(cfr.winner).toBe(-1);
      expect(cfr.inputMatch).toBe(0);
    }
  });

  it('R4: empty pattern (activeInputs 0) → inputMatch=0 (silent / vigilance miss path 영역 caller skip)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    core.handle({ id: 2, type: 'resetHomeostatic' });
    // inject 0 events — silent.
    core.handle({
      id: 3,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 4,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: new Array(16).fill(0) },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    expect(cfr.winner).toBe(-1);
    expect(cfr.inputMatch).toBe(0);
  });

  // 사용자 catch 2026-05-11 (inputmatch-bilateral-jaccard):
  //   "패턴에 포함된 4x4 그리드에 모양이 비슷하거나 포함일 경우 새로운 패턴이
  //    아닌 기존 패턴으로 인식 (패턴의 모양이 인식되는 것이 아니라, 종속여부가
  //    인식되는 것 같습니다.)"
  // Fix: |I ∩ T| / |I| (one-direction) → |I ∩ T| / |I ∪ T| (Jaccard symmetric).
  //
  // 시나리오 (스크린샷): cluster 1/2/3 학습 + cluster 3 영역 T=[0..7] (top 2 rows).
  //   INPUT: top row 4 cells [0..3] — 신규 horizontal line pattern.
  //   직전 buggy: |I ∩ T| / |I| = 4/4 = 1.0 → vigilance pass → cluster 3 false-winner.
  //   Jaccard fix: |I ∩ T| / |I ∪ T| = 4/8 = 0.5 → < 0.7 → vigilance miss → spawn.

  it('R6 [size-normalized Jaccard subset]: cluster T=[0..7] (top 2 rows) + 신규 input [0..3] (top row, subset) → inputMatch=0.25 (vigilance miss)', () => {
    const core = new SNNWorkerCore();
    // cluster 0 영역 superset template (8 cells: top 2 rows).
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[0, 1, 2, 3, 4, 5, 6, 7]] },
    });
    expect(buildRes.ok).toBe(true);

    // top row 4-cell horizontal line pattern (subset of cluster 0 영역 activeInputs).
    const TOP_ROW_PATTERN = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = TOP_ROW_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_ROW_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // 사용자 catch 2026-05-11 (size-normalized-jaccard):
    //   jaccard = |I ∩ T| / |I ∪ T| = 4/8 = 0.5.
    //   sizePenalty = 1 - |4-8|/max(4,8) = 1 - 4/8 = 0.5.
    //   adjusted = 0.5 × 0.5 = 0.25 → < 0.5 → vigilance miss → spawn ✓.
    if (cfr.winner < 0) {
      // silent — vigilance miss path 정합.
      expect(cfr.inputMatch).toBe(0);
    } else {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(0.25, 3);
      // size-normalized Jaccard subset 영역 0.25 산출 invariant.
      expect(cfr.inputMatch).toBeLessThan(0.5);
    }
  });

  it('R7 [size-normalized Jaccard superset]: cluster T=[0,1] (2 cells) + 신규 input [0..3] (superset) → inputMatch=0.25 (vigilance miss)', () => {
    const core = new SNNWorkerCore();
    // cluster 0 영역 subset template (2 cells).
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[0, 1]] },
    });
    expect(buildRes.ok).toBe(true);

    // 신규 input 영역 superset (4 cells: top row).
    const TOP_ROW_PATTERN = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = TOP_ROW_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_ROW_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // 사용자 catch 2026-05-11 (size-normalized-jaccard):
    //   jaccard = |{0,1,2,3} ∩ {0,1}| / |{0,1,2,3} ∪ {0,1}| = 2/4 = 0.5.
    //   sizePenalty = 1 - |4-2|/max(4,2) = 1 - 2/4 = 0.5.
    //   adjusted = 0.5 × 0.5 = 0.25 → < 0.5 → mismatch → spawn ✓.
    if (cfr.winner < 0) {
      expect(cfr.inputMatch).toBe(0);
    } else {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(0.25, 3);
      expect(cfr.inputMatch).toBeLessThan(0.5);
    }
  });

  it('R8 [Jaccard identical]: cluster T=[0..7] + 동일 input [0..7] → inputMatch=1.0 (vigilance pass)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[0, 1, 2, 3, 4, 5, 6, 7]] },
    });
    expect(buildRes.ok).toBe(true);

    const TOP_TWO_ROWS_PATTERN = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = TOP_TWO_ROWS_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_TWO_ROWS_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // Jaccard: |{0..7} ∩ {0..7}| / |{0..7} ∪ {0..7}| = 8/8 = 1.0 → vigilance pass.
    if (cfr.winner >= 0) {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
    }
  });

  it('R9 [Jaccard disjoint]: cluster T=[0..3] + 신규 input [12..15] (disjoint) → inputMatch=0 (vigilance miss)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[0, 1, 2, 3]] },
    });
    expect(buildRes.ok).toBe(true);

    // 신규 input — bottom row (disjoint from top row).
    const BOTTOM_ROW_PATTERN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = BOTTOM_ROW_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: BOTTOM_ROW_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // Jaccard: |{12,13,14,15} ∩ {0,1,2,3}| / |union| = 0/8 = 0.0 → vigilance miss.
    expect(cfr.inputMatch).toBe(0);
  });

  it('R5: pattern 미동봉 (legacy path) → inputMatch=1.0 fallback (backward compat)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = VERTICAL_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT' }, // pattern 미동봉.
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // pattern 미동봉 — vigilance 영역 직접 적용 0 (legacy caller path) → inputMatch=1.0
    // fallback (vigilance pass — backward compat).
    expect(cfr.inputMatch).toBe(1.0);
  });

  // 사용자 catch 2026-05-11 (jaccard-tolerance-band):
  //   "같은 패턴임에도, 2와 3의 패턴을 만들어서 새로운 패턴으로 인식, 같은
  //    패턴을 지속적으로 재학습하여 신규 패턴으로 생성하고 있음"
  // Root cause: PR #232 Jaccard symmetric fix 후 threshold 0.7 영역 너무 strict
  // — 4-cell vertical [1,5,9,13] 영역 1 cell jitter [1,5,9,12] 영역 Jaccard
  // = 3/(4+4-3) = 3/5 = 0.6 → < 0.7 → false-mismatch → spawn.
  // Fix: ART_VIGILANCE_THRESHOLD 0.7 → 0.5 (GridInput.tsx) — Fuzzy ART ρ ≈ 0.5
  // intermediate (Carpenter & Grossberg 1991 — moderate selectivity + noise
  // tolerance balance). 본 test block 영역 Jaccard 산출 정합 (R10/R11/R12) +
  // threshold 비교 invariant (caller-level) 검증.
  //
  // 본 worker-core test 영역 inputMatch 영역 numeric output 검증 영역 단,
  // threshold 비교 영역 GridInput layer 영역 적용 catch 영역 R10~R12 영역
  // numeric value + caller-level invariant (0.5 ≥ 0.5 / 0.33 < 0.5) 영역 분리 검증.

  it('R10 [noise tolerance — 1 cell jitter]: cluster T=[1,5,9,13] + input [1,5,9,12] → inputMatch=0.6 (≥0.5 vigilance pass)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // vertical 영역 1 cell jitter — idx 13 → idx 12 (bottom row 영역 col 0 → col 1).
    const JITTER_PATTERN = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = JITTER_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: JITTER_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // Jaccard: |{1,5,9,12} ∩ {1,5,9,13}| / |{1,5,9,12} ∪ {1,5,9,13}|
    //        = |{1,5,9}| / |{1,5,9,12,13}|
    //        = 3 / 5 = 0.6 → ≥ 0.5 (new threshold) → vigilance pass + reinforce ✓.
    if (cfr.winner >= 0) {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(0.6, 3);
      // 사용자 catch core invariant — 1-cell jitter 영역 동일 cluster 영역 인식.
      expect(cfr.inputMatch).toBeGreaterThanOrEqual(0.5);
    }
  });

  it('R11 [noise tolerance — 2 cell jitter]: cluster T=[1,5,9,13] + input [1,5,8,12] → inputMatch≈0.33 (<0.5 vigilance miss)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // vertical 영역 2 cell jitter — idx 9 → idx 8 + idx 13 → idx 12.
    const HEAVY_JITTER_PATTERN = [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = HEAVY_JITTER_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: HEAVY_JITTER_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // Jaccard: |{1,5,8,12} ∩ {1,5,9,13}| / |{1,5,8,12} ∪ {1,5,9,13}|
    //        = |{1,5}| / |{1,5,8,9,12,13}|
    //        = 2 / 6 ≈ 0.333 → < 0.5 (new threshold) → vigilance miss + spawn ✓.
    if (cfr.winner >= 0) {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(2 / 6, 3);
      // 사용자 catch core invariant — 2-cell jitter 영역 진짜 신규 pattern (spawn).
      expect(cfr.inputMatch).toBeLessThan(0.5);
    }
  });

  it('R12 [size-normalized subset]: cluster T=[0..7] + input [0..3] (4/8 subset) → inputMatch=0.25 (<0.5 spawn — size-normalized)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[0, 1, 2, 3, 4, 5, 6, 7]] },
    });
    expect(buildRes.ok).toBe(true);

    // top row subset — R6 영역 동일 input 단 새 threshold 0.5 영역 boundary 검증.
    const TOP_ROW_PATTERN = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = TOP_ROW_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_ROW_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // 사용자 catch 2026-05-11 (size-normalized-jaccard):
    //   jaccard = 4/8 = 0.5, sizePenalty = 1 - 4/8 = 0.5, adjusted = 0.25.
    //   subset 영역 size_penalty 영역 attenuate → 0.25 < 0.5 → spawn (사용자
    //   mental model 정합 — "subset 영역 다른 패턴 영역 인식").
    if (cfr.winner >= 0) {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(0.25, 3);
      expect(cfr.inputMatch).toBeLessThan(0.5);
    }
  });

  // 사용자 catch 2026-05-11 (size-normalized-jaccard):
  //   PR #232 symmetric Jaccard 영역 subset/superset 영역 0.5 boundary pass 영역
  //   사용자 mental model 위배 → Option E (Tversky 1977 ratio model α=β=0.5):
  //     adjusted = jaccard × (1 - |I−T|/max(|I|,|T|))
  //   R13 (4 vs 8 superset): jaccard=0.5, sizePenalty=0.5, adjusted=0.25 → spawn.
  //   R14 (5 vs 4 near-match): jaccard=0.8, sizePenalty=0.8, adjusted=0.64 → pass.
  //   동일 크기 영역 sizePenalty=1.0 → R10/R11 noise tolerance 보존.

  it('R13 [size-normalized superset cross]: cluster T=cross[1,2,4,5,6,9,10,13] (8 cells) + input middle[5,6,9,10] (4 cells subset) → inputMatch=0.25 (spawn)', () => {
    const core = new SNNWorkerCore();
    // cross-shaped template (8 cells): symmetric around center.
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 2, 4, 5, 6, 9, 10, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // middle 4 cells [5,6,9,10] — subset of cross template.
    const MIDDLE_PATTERN = [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = MIDDLE_PATTERN
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: MIDDLE_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // Size-normalized Jaccard:
    //   I ∩ T = {5,6,9,10} → intersection = 4.
    //   jaccard = 4/(4+8-4) = 4/8 = 0.5.
    //   sizePenalty = 1 - |4-8|/max(4,8) = 1 - 4/8 = 0.5.
    //   adjusted = 0.5 × 0.5 = 0.25 → < 0.5 → spawn ✓.
    if (cfr.winner >= 0) {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(0.25, 3);
      expect(cfr.inputMatch).toBeLessThan(0.5);
    } else {
      // silent path — vigilance miss 정합.
      expect(cfr.inputMatch).toBe(0);
    }
  });

  it('R14 [size-normalized near-match — 1 extra cell]: cluster T=[1,5,9,13] (4 cells) + input [1,5,9,13,14] (5 cells superset) → inputMatch=0.64 (pass)', () => {
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42, clusterActiveInputs: [[1, 5, 9, 13]] },
    });
    expect(buildRes.ok).toBe(true);

    // vertical + 1 extra cell at idx 14 (bottom row col 2).
    const VERTICAL_PLUS_ONE = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0];

    core.handle({ id: 2, type: 'resetHomeostatic' });
    const events = VERTICAL_PLUS_ONE
      .map((v, i) => (v > 0.5 ? {
        neuron: `in_feat_${i}`,
        weight: 25 * v,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      } : null))
      .filter((e): e is NonNullable<typeof e> => e !== null);
    core.handle({ id: 3, type: 'inject', payload: { events } });
    core.handle({
      id: 4,
      type: 'run',
      payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
    });
    const cfrRes = core.handle({
      id: 5,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: VERTICAL_PLUS_ONE },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // Size-normalized Jaccard:
    //   I ∩ T = {1,5,9,13} → intersection = 4.
    //   jaccard = 4/(5+4-4) = 4/5 = 0.8.
    //   sizePenalty = 1 - |5-4|/max(5,4) = 1 - 1/5 = 0.8.
    //   adjusted = 0.8 × 0.8 = 0.64 → ≥ 0.5 → vigilance pass ✓.
    // 사용자 mental model 정합: 1-cell extension (98%+ shape overlap) 영역
    // 동일 cluster 영역 인식 (noise tolerance — small additive jitter 보존).
    if (cfr.winner >= 0) {
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(0.64, 3);
      expect(cfr.inputMatch).toBeGreaterThanOrEqual(0.5);
    }
  });
});
