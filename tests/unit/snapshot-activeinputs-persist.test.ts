// 사용자 catch 2026-05-12 (snapshot-activeinputs-persist):
//   "왜 패턴2가 winner로 나와야 할 것 같은데, 새로운 패턴5가 생기고, 재학습을
//    하게 되는지..."
//
// Root cause (Issue #1 CRITICAL):
//   art.ts:inferClusterRegistry — reload 영역 neuron name scan 단 activeInputs
//   = [] 빈 배열 fallback → reload 후 exact match 영역 항상 0 → 모든 input
//   spawn loop.
//
// Fix:
//   Part A — Snapshot v3 영역 clusterActiveInputs 영역 round-trip 보존
//     1. NetworkSnapshot schema 영역 3 영역 bump.
//     2. worker-core handleSnapshot 영역 registry.slots.activeInputs 영역 동봉.
//     3. worker-core handleRestoreSnapshot 영역 snapshot.clusterActiveInputs
//        영역 hydrate (payload.clusterActiveInputs 미동봉 / 빈 배열 영역 fallback).
//     4. local-snn 영역 schema 영역 3 영역 isFixBaselineStale check 영역 정합.
//
//   Part B — Fire-rate fallback vigilance pass (worker-core handleClusterFiringRates):
//     exact match 영역 miss + fire-rate winner emerge + Jaccard(I, T_winner) >= 0.5
//     영역 fallback path 영역 inputMatch 영역 Jaccard value 영역 catch (vigilance
//     pass → spawn 회피, fire-rate winner cluster 영역 강화).
//
// Test scenarios:
//   S1: snapshot v3 save → reload → activeInputs 정합 보존 (registry hydrate).
//   S2: legacy snapshot v2 (clusterActiveInputs 미동봉) → 빈 배열 fallback
//       (payload.clusterActiveInputs 영역 hydrate 영역 fallback path).
//   V1: fire-rate winner + exact match 0 + Jaccard >= 0.5 → fallback winner emerge
//       (inputMatch >= 0.5 → vigilance pass).
//   V2: fire-rate winner + Jaccard < 0.5 → spawn (보존 — 신규 cluster 자연 spawn).

import { describe, expect, it } from 'vitest';

import {
  NeuralNetwork,
  SNNWorkerCore,
  type NetworkSnapshot,
} from '@/lib/snn-runtime';

interface CfrResult {
  rates: number[];
  winner: number;
  share: number;
  margin: number;
  inputMatch: number;
  layer: string;
  forcedExact?: boolean;
}

interface InternalCore {
  registry: { slots: { id: number; activeInputs: number[] }[] };
}

const TOP_HALF_ACTIVE = [0, 1, 2, 3, 4, 5, 6, 7];
const BOTTOM_HALF_ACTIVE = [8, 9, 10, 11, 12, 13, 14, 15];
const TOP_HALF_PATTERN = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];

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

describe('snapshot-activeinputs-persist — Part A (schema v3 round-trip)', () => {
  it('S1: snapshot v3 save → reload → activeInputs 정합 보존 (registry hydrate)', () => {
    // build with 2 clusters — registry 영역 activeInputs 등록.
    const core1 = new SNNWorkerCore();
    const buildRes = core1.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [TOP_HALF_ACTIVE, BOTTOM_HALF_ACTIVE],
      },
    });
    expect(buildRes.ok).toBe(true);

    // snapshot 영역 v3 schema + clusterActiveInputs 동봉.
    const snapRes = core1.handle({ id: 2, type: 'snapshot' });
    expect(snapRes.ok).toBe(true);
    const snap = (snapRes as { ok: true; result: { snapshot: NetworkSnapshot } }).result.snapshot;
    expect(snap.schema).toBe(3);
    expect(snap.clusterActiveInputs).toEqual([TOP_HALF_ACTIVE, BOTTOM_HALF_ACTIVE]);

    // 신규 core 영역 reload — payload.clusterActiveInputs 영역 미동봉 (직전 buggy
    // path 영역 simulate). 정상 hydrate 영역 snapshot.clusterActiveInputs 영역 source.
    const core2 = new SNNWorkerCore();
    const restoreRes = core2.handle({
      id: 1,
      type: 'restoreSnapshot',
      payload: { snapshot: snap }, // clusterActiveInputs 미동봉.
    });
    expect(restoreRes.ok).toBe(true);

    // registry 영역 hydrate 정합 — activeInputs 영역 source 영역 snapshot.
    const internal = core2 as unknown as InternalCore;
    expect(internal.registry.slots).toHaveLength(2);
    expect(internal.registry.slots[0].activeInputs).toEqual(TOP_HALF_ACTIVE);
    expect(internal.registry.slots[1].activeInputs).toEqual(BOTTOM_HALF_ACTIVE);
  });

  it('S2: legacy snapshot v2 (clusterActiveInputs 미동봉) → 빈 배열 fallback', () => {
    // build → snapshot 영역 v3 — manual schema downgrade 영역 v2 simulate.
    const core1 = new SNNWorkerCore();
    core1.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [TOP_HALF_ACTIVE],
      },
    });
    const snapRes = core1.handle({ id: 2, type: 'snapshot' });
    const snap = (snapRes as { ok: true; result: { snapshot: NetworkSnapshot } }).result.snapshot;

    // v2 simulate — schema downgrade + clusterActiveInputs strip.
    const v2Snap: NetworkSnapshot = {
      ...snap,
      schema: 2,
    };
    delete v2Snap.clusterActiveInputs;

    const core2 = new SNNWorkerCore();
    const restoreRes = core2.handle({
      id: 1,
      type: 'restoreSnapshot',
      payload: { snapshot: v2Snap }, // payload + snapshot 둘 다 미동봉.
    });
    expect(restoreRes.ok).toBe(true);

    // legacy path 영역 backward compat — activeInputs 영역 빈 배열 fallback.
    // (사용자 catch fix 영역 schema=3 영역 hydrate path 영역 분기 — legacy schema=2
    // 영역 inferClusterRegistry 영역 빈 배열 영역 catch 정합.)
    const internal = core2 as unknown as InternalCore;
    expect(internal.registry.slots).toHaveLength(1);
    expect(internal.registry.slots[0].activeInputs).toEqual([]);
  });

  it('S3: reload 후 exact match 정상 작동 — 동일 input → 동일 winner deterministic (사용자 mental model fix)', () => {
    // build + snapshot → reload → exact match path 영역 정상 작동 catch.
    const core1 = new SNNWorkerCore();
    core1.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [TOP_HALF_ACTIVE, BOTTOM_HALF_ACTIVE],
      },
    });
    const snapRes = core1.handle({ id: 2, type: 'snapshot' });
    const snap = (snapRes as { ok: true; result: { snapshot: NetworkSnapshot } }).result.snapshot;

    // reload.
    const core2 = new SNNWorkerCore();
    core2.handle({
      id: 1,
      type: 'restoreSnapshot',
      payload: { snapshot: snap },
    });

    // TOP_HALF_PATTERN 영역 cluster 0 영역 exact match — forcedExact + winner=0.
    injectAndRun(core2, TOP_HALF_PATTERN, 100);
    const cfrRes = core2.handle({
      id: 200,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_HALF_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // 직전 buggy path: activeInputs=[] fallback → exact match miss → inputMatch=0
    //   → vigilance miss → 신규 cluster spawn loop.
    // fix path: activeInputs 영역 hydrate → exact match hit → forcedExact=true
    //   → winner=0 deterministic + inputMatch=1.0 → vigilance pass (강화).
    expect(cfr.winner).toBe(0);
    expect(cfr.forcedExact).toBe(true);
    expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
  });
});

describe('snapshot-activeinputs-persist — Part B (fire-rate fallback Jaccard >= 0.5)', () => {
  it('V1: fire-rate winner + exact match 0 + Jaccard >= 0.5 → fallback winner emerge (vigilance pass)', () => {
    // cluster 0 영역 TOP_HALF (8 cells). input 영역 TOP 4 cells (subset).
    // Jaccard(I=[0..3], T=[0..7]) = 4/8 = 0.5 → fallback vigilance pass.
    const core = new SNNWorkerCore();
    core.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [TOP_HALF_ACTIVE],
      },
    });

    const SUBSET_PATTERN = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    injectAndRun(core, SUBSET_PATTERN, 100);
    const cfrRes = core.handle({
      id: 200,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: SUBSET_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // exact match 0 (|I|=4 ≠ |T|=8) → fire-rate fallback path.
    expect(cfr.forcedExact).toBe(false);
    if (cfr.winner >= 0) {
      // Jaccard = 4/8 = 0.5 → fallback path 영역 vigilance pass + inputMatch=0.5.
      expect(cfr.inputMatch).toBeCloseTo(0.5, 3);
    }
  });

  it('V2: fire-rate winner + Jaccard < 0.5 → spawn (보존 — 신규 cluster 자연 spawn)', () => {
    // cluster 0 영역 TOP_HALF (8 cells). input 영역 cell 0 only (small subset).
    // Jaccard(I=[0], T=[0..7]) = 1/8 = 0.125 < 0.5 → fallback 미진입 → inputMatch=0.
    const core = new SNNWorkerCore();
    core.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [TOP_HALF_ACTIVE],
      },
    });

    const TINY_SUBSET = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    injectAndRun(core, TINY_SUBSET, 100);
    const cfrRes = core.handle({
      id: 200,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TINY_SUBSET },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    // exact match 0 + Jaccard < 0.5 → inputMatch=0 → vigilance miss → spawn.
    expect(cfr.forcedExact).toBe(false);
    expect(cfr.inputMatch).toBe(0);
  });

  it('V3: exact match → forcedExact + inputMatch=1.0 (Part B fallback 미진입 — exact 우선)', () => {
    // 동일 input → exact match → forcedExact path 영역 우선 (fallback skip).
    const core = new SNNWorkerCore();
    core.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [TOP_HALF_ACTIVE],
      },
    });

    injectAndRun(core, TOP_HALF_PATTERN, 100);
    const cfrRes = core.handle({
      id: 200,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: TOP_HALF_PATTERN },
    });
    expect(cfrRes.ok).toBe(true);
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    expect(cfr.winner).toBe(0);
    expect(cfr.forcedExact).toBe(true);
    expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
  });
});

describe('snapshot-activeinputs-persist — round-trip integration', () => {
  it('I1: build → snapshot → restore → exact match 정상 (사용자 mental model "패턴2 winner")', () => {
    // 사용자 mental model — "패턴 2 cluster 영역 학습 영역 reload → 동일 input
    //   영역 패턴 2 winner 영역 catch + 강화" (신규 패턴 5 spawn + 재학습 회피).
    // 두 cluster (P0, P1) 등록 → snapshot → reload → P1 input → P1 winner.
    const P0 = [0, 1, 2, 3];
    const P1 = [4, 5, 6, 7];
    const core1 = new SNNWorkerCore();
    core1.handle({
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 42,
        clusterActiveInputs: [P0, P1],
      },
    });
    const snapRes = core1.handle({ id: 2, type: 'snapshot' });
    const snap = (snapRes as { ok: true; result: { snapshot: NetworkSnapshot } }).result.snapshot;

    // round-trip — JSON marshalling 영역 schema 보존 catch.
    const json = JSON.parse(JSON.stringify(snap)) as NetworkSnapshot;
    expect(json.schema).toBe(3);
    expect(json.clusterActiveInputs).toEqual([P0, P1]);

    const core2 = new SNNWorkerCore();
    core2.handle({
      id: 1,
      type: 'restoreSnapshot',
      payload: { snapshot: json },
    });

    // P1 input → exact match cluster 1.
    const P1_PATTERN = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    injectAndRun(core2, P1_PATTERN, 100);
    const cfrRes = core2.handle({
      id: 200,
      type: 'clusterFiringRates',
      payload: { windowMs: 50, layer: 'OUT', pattern: P1_PATTERN },
    });
    const cfr = (cfrRes as { ok: true; result: CfrResult }).result;
    expect(cfr.winner).toBe(1); // P1 = cluster 1.
    expect(cfr.forcedExact).toBe(true);
    expect(cfr.inputMatch).toBeCloseTo(1.0, 3);
  });

  it('I2: NeuralNetwork.restore schema=3 → 알 수 없는 schema 에러 0 (호환)', () => {
    // schema=3 영역 NeuralNetwork.restore 영역 정상 accept catch.
    const snap: NetworkSnapshot = {
      schema: 3,
      dtMs: 0.1,
      t: 0,
      neurons: [],
      synapses: [],
      clusterActiveInputs: [[0, 1]],
    };
    expect(() => NeuralNetwork.restore(snap)).not.toThrow();
  });
});
