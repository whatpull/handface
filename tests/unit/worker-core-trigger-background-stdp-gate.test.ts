// QA FINDING-1 fix (2026-05-10): handleTriggerBackground 영역 stdpEnabled gate 검증.
//
// 사용자 catch 2026-05-09 ("비 학습시 보강 후 패턴 추론 못하는 원인"):
// 직전 worker-core handleTriggerBackground 영역 stdpEnabled=true hard-code →
// inferAsync (stdpGain=0) path 영역 applyPairStdp(t, 0) 호출 → trace state
// mutation (preTrace/postTrace/lastSpikeTimeForTrace) → 다음 reinforce 영역
// stale trace pollution → reward LTP 영역 stale base 영역 catch 영역 잘못 학습.
//
// 정정: stdpEnabled = payload.stdpGain > 0 — gain=0 영역 trace state mutation 0.
//
// 학술 정합: Bi & Poo 1998 STDP 영역 trace mutation 영역 gain 무관 사실 —
// gain=0 영역 weight unchanged 단 trace 영역 변경 → next reward pass 영역 LTP
// 영역 stale trace 영역 base 영역 catch 사실. 본 PR 영역 trace mutation 영역
// gate (stdpEnabled=false) 영역 catch — trace 영역 freeze.
//
// G1: stdpGain=0 (infer) 영역 trace state mutation 0 (preTrace/postTrace 영역
//     모든 neuron 영역 0 유지 — initial state 보존).
// G2: stdpGain>0 (training) 영역 trace state mutation OK — preTrace/postTrace
//     영역 fire 시점 영역 1.0+ 영역 update.

import { describe, expect, it } from 'vitest';

import { SNNWorkerCore } from '@/lib/snn-runtime';

const HORIZONTAL_PATTERN = [0, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0];

function makeCore(): SNNWorkerCore {
  const core = new SNNWorkerCore();
  const buildRes = core.handle({ id: 1, type: 'build', payload: { preset: 'n13_orientation', seed: 57 } });
  expect(buildRes.ok).toBe(true);
  return core;
}

function inspectTraces(core: SNNWorkerCore): { allZero: boolean; anyMutated: boolean } {
  const net = core.getNetForTest();
  if (!net) return { allZero: true, anyMutated: false };
  let allZero = true;
  let anyMutated = false;
  for (const n of net.neurons) {
    if (n.preTrace !== 0 || n.postTrace !== 0 || n.lastSpikeTimeForTrace !== null) {
      allZero = false;
      anyMutated = true;
    }
  }
  return { allZero, anyMutated };
}

describe('SNNWorkerCore — handleTriggerBackground stdpEnabled gate (QA FINDING-1)', () => {
  it('G1: stdpGain=0 (infer) 영역 trace state mutation 0 — preTrace/postTrace freeze', () => {
    const core = makeCore();
    // initial state — 모든 neuron 영역 trace 영역 0.
    const before = inspectTraces(core);
    expect(before.allZero).toBe(true);

    // inferAsync path — stdpGain=0.
    const res = core.handle({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: HORIZONTAL_PATTERN,
        intensity: 25,
        observeMs: 50,
        stimulusDurationMs: 20,
        stdpGain: 0, // infer — STDP off mandatory.
        repeats: 1,
        resetThreshold: true,
        trialToken: 1,
      },
    });
    expect(res.ok).toBe(true);

    // trace state 영역 0 유지 — stdpEnabled=false 영역 updateTraces 호출 0.
    const after = inspectTraces(core);
    expect(after.allZero).toBe(true);
    expect(after.anyMutated).toBe(false);
  });

  it('G2: stdpGain>0 (training) 영역 trace state mutation OK — fire 시점 영역 update', () => {
    const core = makeCore();

    // training path — stdpGain=1.0.
    const res = core.handle({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: HORIZONTAL_PATTERN,
        intensity: 25,
        observeMs: 50,
        stimulusDurationMs: 20,
        stdpGain: 1.0,
        repeats: 1,
        resetThreshold: true,
        trialToken: 1,
      },
    });
    expect(res.ok).toBe(true);

    // 적어도 1 neuron 영역 trace 영역 mutated — fire 시점 영역 updateTraces 호출.
    const after = inspectTraces(core);
    expect(after.anyMutated).toBe(true);
  });

  it('G3: 직렬 inferAsync × N — trace state 영역 0 유지 (cumulative pollution 0)', () => {
    const core = makeCore();
    for (let i = 0; i < 3; i += 1) {
      const res = core.handle({
        id: 100 + i,
        type: 'triggerBackground',
        payload: {
          pattern: HORIZONTAL_PATTERN,
          intensity: 25,
          observeMs: 50,
          stimulusDurationMs: 20,
          stdpGain: 0,
          repeats: 1,
          resetThreshold: true,
          trialToken: 100 + i,
        },
      });
      expect(res.ok).toBe(true);
    }
    const after = inspectTraces(core);
    expect(after.allZero).toBe(true);
  });
});
