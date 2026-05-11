// 사용자 catch 2026-05-12 (exact-match-winner-force):
//   "패턴이 RECENT를 보면 들쑥날쑥입니다."
//   스크린샷: 동일 input (top row 4 cells) 영역 영역 영역 추론 → RECENT
//   1·2·3·2·3·2·3 oscillation. winner 매번 변동.
//
// Root cause: PR #236 exact equality vigilance 영역 inputMatch 영역 binary 0/1 단
// winner emerge 영역 fire rate argmax 영역 catch — LIF stochasticity (±15-20%
// jitter) + Dense WTA cross-talk (학습된 2 cluster 동시 fire) 영역 catch 영역
// 동일 input 영역 매 trigger 영역 cluster 2 ↔ cluster 3 winner oscillation.
//
// Fix: registry.slots 영역 activeInputs 영역 input activeIdx 영역 set-equal cluster
// 영역 존재 시 → 영역 cluster 영역 winner 강제 (fire rate 영역 영역).
// - 동일 input I → exact match cluster T == I → cluster T winner deterministic
// - exact match 0 → 기존 fire rate argmax path 영역 fallback (silent / mismatch)
//
// 학술 정합: Carpenter-Grossberg 1987 ART resonance — exact template match 영역
// winner deterministic. vigilance + winner 분리 → exact match → winner lock.

import { describe, expect, it } from 'vitest';

import { SNNWorkerCore, expandCluster } from '@/lib/snn-runtime';

interface CfrResult {
  rates: number[];
  winner: number;
  share: number;
  margin: number;
  inputMatch: number;
  layer: string;
  // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forced winner 사실 —
  // emit downstream 영역 NodeInfer / NodeLearn 영역 "EXACT MATCH (deterministic)"
  // badge 표시 정합.
  forcedExact?: boolean;
}

interface InternalCore {
  registry: { slots: { id: number; activeInputs: number[] }[] };
  net: unknown;
}

// 4×4 grid — 두 cluster (서로 다른 activeInputs) 영역 등록 영역 R16 시나리오:
// cluster 0: top half (idx 0..7) — top two rows
// cluster 1: bottom half (idx 8..15) — bottom two rows
const TOP_HALF_ACTIVE = [0, 1, 2, 3, 4, 5, 6, 7];
const BOTTOM_HALF_ACTIVE = [8, 9, 10, 11, 12, 13, 14, 15];

const TOP_HALF_PATTERN = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
const BOTTOM_HALF_PATTERN = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];

// R17 disjoint scenario — 모든 cluster 영역 activeInputs 영역 본 input 영역 1+
// element mismatch. 4-cell pattern (idx 0,5,10,15 diagonal) 영역 cluster 0
// (top half 8-cell) / cluster 1 (bottom half 8-cell) 둘 다 cardinality 영역
// mismatch → exact match 0 → 기존 fire rate path fallback.
const DIAGONAL_PATTERN = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function injectAndRun(core: SNNWorkerCore, pattern: number[], idBase: number): void {
  const events = pattern
    .map((v, i) => (v > 0.5 ? {
      neuron: `in_feat_${i}`,
      weight: 25 * v,
      time: 0,
      durationMs: 30,
      stepMs: 0.1,
    } : null))
    .filter((e): e is NonNullable<typeof e> => e !== null);
  core.handle({ id: idBase + 1, type: 'resetHomeostatic' });
  core.handle({ id: idBase + 2, type: 'inject', payload: { events } });
  core.handle({
    id: idBase + 3,
    type: 'run',
    payload: { durationMs: 50, dtMs: 0.1, stdpEnabled: false },
  });
}

function makeCoreWithTwoClusters(): SNNWorkerCore {
  // cluster 0 영역 top half 영역 build, cluster 1 영역 bottom half 영역 expandCluster.
  const core = new SNNWorkerCore();
  const buildRes = core.handle({
    id: 1,
    type: 'build',
    payload: {
      preset: 'n13_orientation',
      seed: 42,
      clusterActiveInputs: [TOP_HALF_ACTIVE],
    },
  });
  expect(buildRes.ok).toBe(true);
  const internal = core as unknown as InternalCore;
  const expandResult = expandCluster(
    internal.net as Parameters<typeof expandCluster>[0],
    internal.registry as Parameters<typeof expandCluster>[1],
    { activeInputs: BOTTOM_HALF_ACTIVE, seed: 7 },
  );
  expect(expandResult.newSlot.id).toBe(1);
  expect(internal.registry.slots).toHaveLength(2);
  return core;
}

describe('worker-core — exact-match winner force (사용자 catch 2026-05-12)', () => {
  it('R16 [deterministic oscillation block]: 동일 input 영역 영역 영역 추론 → 영역 영역 winner=cluster 1 (deterministic, no oscillation)', () => {
    const core = makeCoreWithTwoClusters();

    // 동일 input (BOTTOM_HALF_PATTERN — cluster 1 영역 activeInputs 정확 일치)
    // 영역 영역 영역 추론 → 영역 영역 cluster 1 영역 winner 영역 catch.
    const winners: number[] = [];
    const inputMatches: number[] = [];
    for (let trial = 0; trial < 5; trial += 1) {
      injectAndRun(core, BOTTOM_HALF_PATTERN, 100 + trial * 10);
      const cfrRes = core.handle({
        id: 200 + trial,
        type: 'clusterFiringRates',
        payload: { windowMs: 50, layer: 'OUT', pattern: BOTTOM_HALF_PATTERN },
      });
      expect(cfrRes.ok).toBe(true);
      const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
      winners.push(cfr.winner);
      inputMatches.push(cfr.inputMatch);
    }
    // exact match cluster 1 영역 → 영역 영역 winner=1 deterministic (oscillation 0).
    for (const w of winners) {
      expect(w).toBe(1);
    }
    // 모든 trial 영역 inputMatch=1.0 (exact equality).
    for (const im of inputMatches) {
      expect(im).toBeCloseTo(1.0, 3);
    }
    // 사용자 mental model 정합 — winner 영역 deterministic catch (RECENT 영역
    // 들쑥날쑥 0).
    const uniqueWinners = new Set(winners);
    expect(uniqueWinners.size).toBe(1);
  });

  it('R16b [other cluster exact match]: cluster 0 (top half) input → winner=cluster 0 deterministic', () => {
    const core = makeCoreWithTwoClusters();
    const winners: number[] = [];
    for (let trial = 0; trial < 5; trial += 1) {
      injectAndRun(core, TOP_HALF_PATTERN, 300 + trial * 10);
      const cfrRes = core.handle({
        id: 400 + trial,
        type: 'clusterFiringRates',
        payload: { windowMs: 50, layer: 'OUT', pattern: TOP_HALF_PATTERN },
      });
      expect(cfrRes.ok).toBe(true);
      const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
      winners.push(cfr.winner);
      expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
    }
    for (const w of winners) {
      expect(w).toBe(0);
    }
  });

  it('R17 [no exact match → fire rate path fallback]: input 영역 모든 cluster activeInputs 영역 disjoint/mismatch → exact match 0, 기존 winner emerge', () => {
    const core = makeCoreWithTwoClusters();

    // DIAGONAL_PATTERN (4 cells) 영역 cluster 0 (8 cells top half) / cluster 1
    // (8 cells bottom half) 둘 다 cardinality mismatch (4 vs 8) + 부분 overlap만
    // → exact match cluster 0 → findExactMatchCluster returns -1 → 기존 fire rate
    // path 영역 fallback (winner 영역 fire rate argmax 영역 결정).
    injectAndRun(core, DIAGONAL_PATTERN, 500);
    const cfrRes = core.handle({
      id: 600,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: DIAGONAL_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // exact match 0 → inputMatch 영역 0 (winner cluster 영역 cardinality mismatch).
    // winner 영역 fire rate argmax 영역 emerge — silent (-1) 또는 fire rate winner
    // (0/1) 영역 둘 다 정합 (LIF noise 영역 catch — 본 test 영역 fallback path
    // 영역 invariant only assert).
    expect(cfr.inputMatch).toBe(0);
    // winner 영역 -1 (silent) 또는 0/1 (fire rate path) — 본 test 영역 fallback
    // 영역 exact-match force 영역 영역 영역 0 invariant 만 assert.
    expect([-1, 0, 1]).toContain(cfr.winner);
  });

  it('R18 [exact-match stability = 100%]: exact match cluster → share=1.0, margin=1.0 (negative margin 차단)', () => {
    // 사용자 catch 2026-05-12 (exact-match-stability-fix):
    //   "패턴 인식은 올바름, 단 안정도 -178%가 의미하는게 맞는지 모르겠습니다."
    //   스크린샷: winner=cluster 1, 패턴 1 fire=82Hz, 패턴 2 fire=229Hz →
    //   직전 margin = (82-229)/82 = -179% (negative, 사용자 mental model 위배).
    // root cause: PR #237 exact-match force 영역 winner cluster 영역 fire rate
    // 영역 다른 cluster fire rate 영역 영역 영역 → negative margin 자연 산출.
    // fix: forcedExact → share=1.0, margin=1.0 (Carpenter-Grossberg ART resonance
    // 영역 deterministic perfect stability 정합).
    const core = makeCoreWithTwoClusters();

    // 모든 trial 영역 exact-match cluster (top half) input → margin=1.0, share=1.0.
    for (let trial = 0; trial < 5; trial += 1) {
      injectAndRun(core, TOP_HALF_PATTERN, 900 + trial * 10);
      const cfrRes = core.handle({
        id: 1000 + trial,
        type: 'clusterFiringRates',
        payload: { windowMs: 50, layer: 'OUT', pattern: TOP_HALF_PATTERN },
      });
      expect(cfrRes.ok).toBe(true);
      const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
      // exact match → winner deterministic + share/margin 영역 1.0 hard-set.
      expect(cfr.winner).toBe(0);
      expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
      expect(cfr.share).toBeCloseTo(1.0, 6);
      expect(cfr.margin).toBeCloseTo(1.0, 6);
      // negative margin 영역 절대 산출 0 — 사용자 catch 정합.
      expect(cfr.margin).toBeGreaterThanOrEqual(0);
    }
  });

  it('R18b [non-exact fallback preserves fire-rate margin]: exact match 0 → 기존 fire-rate margin path (PR #232/#231 보존)', () => {
    // R17 fallback path 영역 share/margin 영역 fire-rate 영역 영역 (exact-match
    // override 영역 영역 영역 0) — 직전 fire-rate margin 보존 정합.
    const core = makeCoreWithTwoClusters();
    injectAndRun(core, DIAGONAL_PATTERN, 1100);
    const cfrRes = core.handle({
      id: 1200,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: DIAGONAL_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // exact match 0 → inputMatch=0 (R17 정합).
    expect(cfr.inputMatch).toBe(0);
    // share/margin 영역 fire-rate path 영역 산출 — 1.0 hard-set 영역 영역 영역 0.
    // (LIF noise 영역 catch 영역 정확 값 영역 assert 0 단 invariant range 영역 catch.)
    expect(cfr.share).toBeGreaterThanOrEqual(0);
    expect(cfr.share).toBeLessThanOrEqual(1);
    // margin 영역 [-∞, 1] 영역 fire-rate path 영역 정합 — 본 test 영역 fallback
    // 영역 1.0 hard-set 영역 영역 영역 0 invariant 만 catch (non-exact path).
    expect(cfr.margin).toBeLessThanOrEqual(1);
  });

  it('R19 [forcedExact field emit]: exact match cluster → cfr.forcedExact=true, non-exact path → false (사용자 catch 2026-05-12 — EXACT MATCH badge propagate)', () => {
    // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates):
    //   "패턴 4가 추론되는데 실제 수치가 맞는건가요? 0Hz 표시는 정확한 것인지?"
    // forced winner 영역 NodeInfer / NodeLearn 영역 "EXACT MATCH (deterministic)"
    // badge 표시 mandatory — cfr.forcedExact 영역 emit 영역 downstream propagate
    // path 영역 catch.
    const core = makeCoreWithTwoClusters();

    // exact match case — TOP_HALF input == cluster 0 activeInputs → forcedExact=true.
    injectAndRun(core, TOP_HALF_PATTERN, 1300);
    const exactRes = core.handle({
      id: 1400,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_HALF_PATTERN },
    });
    expect(exactRes.ok).toBe(true);
    const exactCfr = (exactRes as { ok: true; result: CfrResult }).result;
    expect(exactCfr.forcedExact).toBe(true);
    expect(exactCfr.winner).toBe(0);

    // non-exact case — DIAGONAL_PATTERN 영역 cluster 영역 disjoint/mismatch →
    // forcedExact=false (기존 fire rate path fallback).
    injectAndRun(core, DIAGONAL_PATTERN, 1500);
    const nonExactRes = core.handle({
      id: 1600,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: DIAGONAL_PATTERN },
    });
    expect(nonExactRes.ok).toBe(true);
    const nonExactCfr = (nonExactRes as { ok: true; result: CfrResult }).result;
    expect(nonExactCfr.forcedExact).toBe(false);
  });

  it('R17b [no clusters registered]: empty registry → exact match 0, winner emerge 0 (silent)', () => {
    // build 영역 default empty cluster (clusterActiveInputs=[]) — registry.slots
    // 영역 0 catch 영역 exact match 영역 항상 -1.
    const core = new SNNWorkerCore();
    const buildRes = core.handle({
      id: 1,
      type: 'build',
      payload: { preset: 'n13_orientation', seed: 42 },
    });
    expect(buildRes.ok).toBe(true);

    injectAndRun(core, TOP_HALF_PATTERN, 700);
    const cfrRes = core.handle({
      id: 800,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_HALF_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // registry.slots 영역 0 → winner 영역 -1 (slots 영역 0 catch 영역 fire rate
    // 영역 0 정합).
    expect(cfr.winner).toBe(-1);
    expect(cfr.inputMatch).toBe(0);
  });
});
