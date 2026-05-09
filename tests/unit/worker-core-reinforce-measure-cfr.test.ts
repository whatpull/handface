// QA CAUSE B fix (2026-05-10): handleReinforceBackground 영역 push payload cfr
// 영역 measure pass 영역 source 검증.
//
// 사용자 catch 2026-05-09 ("패턴보강 엉망"):
// 직전 push payload cfr 영역 reward pass 직후 영역 별도 clusterFiringRates RPC
// 영역 호출 → measure pass 50ms drop + post-mutation 영역 winner mismatch →
// push event 영역 trial 결과 영역 측정 winner 영역 catch 0 → UI 영역 NodeLearn /
// NodeInfer 영역 wrong winner 표시.
//
// 정정: trainResult.clusterRatesHistory[0] + winnerHistory[0] 영역 source —
// measure pass winner (post-STDP-mutation 0) 영역 정확 reflection.
//
// 학술 정합: R-STDP measure pass 영역 trial-level decision (post-reward mutation
// 영역 next trial 영역 catch 사실 — 본 push 영역 trial 결과 영역 catch 영역
// measure pass 영역 source 영역 정합).
//
// R1: handleClusterTrainRStdp 영역 stub 영역 catch — measure pass winner=2,
//     ratesHistory=[3, 5, 12, 1] 영역 set → push payload cfr 영역 동일 winner/rates 검증.
// R2: 빈 history fallback — winner=-1, rates=[0,0,0,0].
// R3: share / margin 영역 measure rates 기반 정확 계산.

import { describe, expect, it } from 'vitest';

import { SNNWorkerCore, type WorkerPushEvent, type ReinforceCompletePayload } from '@/lib/snn-runtime';

const VERTICAL_PATTERN = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];

function makeCore(seed = 57): SNNWorkerCore {
  const core = new SNNWorkerCore();
  const buildRes = core.handle({ id: 1, type: 'build', payload: { preset: 'n13_orientation', seed } });
  expect(buildRes.ok).toBe(true);
  return core;
}

describe('SNNWorkerCore — handleReinforceBackground push cfr (QA CAUSE B 2026-05-10)', () => {
  it('R1: push payload cfr 영역 measure pass clusterRatesHistory + winnerHistory 영역 source', () => {
    const core = makeCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });

    // handleClusterTrainRStdp 영역 patch — fixed measure result 영역 stub.
    // (private method 영역 type-cast 영역 monkey-patch — test-only access.)
    const fixedMeasureRates = [3, 5, 12, 1];
    const fixedMeasureWinner = 2;
    // private method 영역 type-cast 영역 monkey-patch — test-only path.
    // intersection 영역 private collision 영역 unknown 영역 우회.
    const corePriv = core as unknown as {
      handleClusterTrainRStdp: (p: unknown) => unknown;
    };
    const originalImpl = corePriv.handleClusterTrainRStdp.bind(core);
    corePriv.handleClusterTrainRStdp = () => ({
      trained: 1,
      correct: 0,
      accuracy: 0,
      targetCluster: 1,
      clusterRatesHistory: [fixedMeasureRates],
      winnerHistory: [fixedMeasureWinner],
    });

    try {
      const res = core.handle({
        id: 200,
        type: 'reinforceBackground',
        payload: {
          pattern: VERTICAL_PATTERN,
          targetCluster: 1,
          rewardGain: 0.8,
          punishGain: 0,
          intensity: 25,
          observeMs: 50,
          stimulusDurationMs: 20,
          trialToken: 77,
        },
      });
      expect(res.ok).toBe(true);
      expect(events).toHaveLength(1);
      const ev = events[0];
      expect(ev.event).toBe('reinforceComplete');
      const payload = ev.payload as ReinforceCompletePayload;
      // measure pass 영역 source 영역 catch — winner=2, rates=[3,5,12,1].
      expect(payload.cfr.winner).toBe(fixedMeasureWinner);
      expect(payload.cfr.rates).toEqual(fixedMeasureRates);
      // share = max/total = 12/21.
      expect(payload.cfr.share).toBeCloseTo(12 / (3 + 5 + 12 + 1), 5);
      // margin = (max - second)/max = (12-5)/12.
      expect(payload.cfr.margin).toBeCloseTo((12 - 5) / 12, 5);
    } finally {
      corePriv.handleClusterTrainRStdp = originalImpl;
    }
  });

  it('R2: 빈 history fallback — winner=-1, rates=[0,0,0,0]', () => {
    const core = makeCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });

    // private method 영역 type-cast 영역 monkey-patch — test-only path.
    // intersection 영역 private collision 영역 unknown 영역 우회.
    const corePriv = core as unknown as {
      handleClusterTrainRStdp: (p: unknown) => unknown;
    };
    const originalImpl = corePriv.handleClusterTrainRStdp.bind(core);
    corePriv.handleClusterTrainRStdp = () => ({
      trained: 0,
      correct: 0,
      accuracy: 0,
      targetCluster: 1,
      clusterRatesHistory: [], // empty.
      winnerHistory: [],
    });

    try {
      const res = core.handle({
        id: 200,
        type: 'reinforceBackground',
        payload: {
          pattern: VERTICAL_PATTERN,
          targetCluster: 1,
          rewardGain: 0.8,
          punishGain: 0,
          intensity: 25,
          observeMs: 50,
          stimulusDurationMs: 20,
          trialToken: 77,
        },
      });
      expect(res.ok).toBe(true);
      expect(events).toHaveLength(1);
      const payload = events[0].payload as ReinforceCompletePayload;
      expect(payload.cfr.winner).toBe(-1);
      expect(payload.cfr.rates).toEqual([0, 0, 0, 0]);
      expect(payload.cfr.share).toBe(0);
      expect(payload.cfr.margin).toBe(0);
    } finally {
      corePriv.handleClusterTrainRStdp = originalImpl;
    }
  });

  it('R3: trainResult correct/accuracy 영역 push payload 영역 round-trip 보존', () => {
    const core = makeCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });

    // private method 영역 type-cast 영역 monkey-patch — test-only path.
    // intersection 영역 private collision 영역 unknown 영역 우회.
    const corePriv = core as unknown as {
      handleClusterTrainRStdp: (p: unknown) => unknown;
    };
    const originalImpl = corePriv.handleClusterTrainRStdp.bind(core);
    corePriv.handleClusterTrainRStdp = () => ({
      trained: 1,
      correct: 1,
      accuracy: 1.0,
      targetCluster: 3,
      clusterRatesHistory: [[0, 0, 0, 8]],
      winnerHistory: [3],
    });

    try {
      const res = core.handle({
        id: 200,
        type: 'reinforceBackground',
        payload: {
          pattern: VERTICAL_PATTERN,
          targetCluster: 3,
          rewardGain: 0.8,
          punishGain: 0,
          intensity: 25,
          observeMs: 50,
          stimulusDurationMs: 20,
          trialToken: 99,
        },
      });
      expect(res.ok).toBe(true);
      const payload = events[0].payload as ReinforceCompletePayload;
      expect(payload.trialToken).toBe(99);
      expect(payload.targetCluster).toBe(3);
      expect(payload.trained).toBe(1);
      expect(payload.correct).toBe(1);
      expect(payload.accuracy).toBe(1.0);
      expect(payload.cfr.winner).toBe(3);
    } finally {
      corePriv.handleClusterTrainRStdp = originalImpl;
    }
  });
});
