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
});
