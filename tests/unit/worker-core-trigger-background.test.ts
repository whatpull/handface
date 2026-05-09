// PR-B (Web Worker background offload, 2026-05-10): worker-core 영역 background RPC.
//
// 사용자 catch 2026-05-09 [2]: "백그라운드 동작" 정정 path — handleTriggerBackground
// 영역 sync ack `null` + push event 영역 emit 영역 단위 검증.
//
// B1: triggerBackground RPC 영역 sync ack `null` (즉시 return).
// B2: pushEmitter wire 영역 simulation 영역 끝난 시점 영역 push event emit.
// B3: trialToken 영역 push event 영역 보존 (round-trip).
// B4: pushEmitter null 영역 silent skip — push event 영역 emit 0.
// B5: reinforceBackground RPC 영역 R-STDP supervised 1-pattern batch + push event.
// B6: build 전 호출 영역 silent — push 0 (정직 한계 — net 미초기화 path).

import { describe, expect, it, vi } from 'vitest';

import {
  SNNWorkerCore,
  type WorkerPushEvent,
  type TriggerCompletePayload,
  type ReinforceCompletePayload,
} from '@/lib/snn-runtime';

function makeCore(buildSeed = 57): SNNWorkerCore {
  const core = new SNNWorkerCore();
  // build — n13 orientation default cluster_active_inputs.
  const buildRes = core.handle({ id: 1, type: 'build', payload: { preset: 'n13_orientation', seed: buildSeed } });
  expect(buildRes.ok).toBe(true);
  return core;
}

const HORIZONTAL_PATTERN = [0, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0];
const VERTICAL_PATTERN   = [0, 1, 0, 0,  0, 1, 0, 0,  0, 1, 0, 0,  0, 1, 0, 0];

describe('SNNWorkerCore — handleTriggerBackground (PR-B 2026-05-10)', () => {
  it('B1: triggerBackground RPC 영역 sync ack `null` (즉시 return)', () => {
    const core = makeCore();
    const res = core.handle({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: HORIZONTAL_PATTERN,
        intensity: 25,
        observeMs: 30,
        stimulusDurationMs: 10,
        stdpGain: 1.0,
        repeats: 1,
        resetThreshold: true,
        trialToken: 42,
      },
    });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.result).toBeNull();
  });

  it('B2: pushEmitter wire 영역 push event emit (triggerComplete)', () => {
    const core = makeCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });
    core.handle({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: HORIZONTAL_PATTERN,
        intensity: 25,
        observeMs: 30,
        stimulusDurationMs: 10,
        stdpGain: 1.0,
        repeats: 1,
        resetThreshold: true,
        trialToken: 42,
      },
    });
    expect(events).toHaveLength(1);
    const ev = events[0];
    expect(ev.type).toBe('push');
    expect(ev.event).toBe('triggerComplete');
    const payload = ev.payload as TriggerCompletePayload;
    expect(payload.trialToken).toBe(42);
    expect(payload.cfr.layer).toBe('OUT');
    expect(payload.cfr.rates).toHaveLength(4);
    expect(payload.netTime).toBeGreaterThan(0); // 30ms run.
  });

  it('B3: trialToken 영역 push event 영역 round-trip 보존', () => {
    const core = makeCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });
    for (const token of [1, 7, 99, 1234]) {
      core.handle({
        id: token,
        type: 'triggerBackground',
        payload: {
          pattern: HORIZONTAL_PATTERN,
          intensity: 25,
          observeMs: 30,
          stimulusDurationMs: 10,
          stdpGain: 0,
          repeats: 1,
          resetThreshold: true,
          trialToken: token,
        },
      });
    }
    expect(events).toHaveLength(4);
    const tokens = events.map((e) => (e.payload as TriggerCompletePayload).trialToken);
    expect(tokens).toEqual([1, 7, 99, 1234]);
  });

  it('B4: pushEmitter null (미설정) 영역 silent skip', () => {
    const core = makeCore();
    // pushEmitter 미설정 — push event emit 0 단 RPC 영역 success.
    const res = core.handle({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: HORIZONTAL_PATTERN,
        intensity: 25,
        observeMs: 30,
        stimulusDurationMs: 10,
        stdpGain: 1.0,
        repeats: 1,
        resetThreshold: true,
        trialToken: 42,
      },
    });
    expect(res.ok).toBe(true);
    // simulation 영역 진행 사실 — net.t 영역 advance.
    const tRes = core.handle({ id: 101, type: 'getNetworkTime' });
    expect(tRes.ok).toBe(true);
    if (tRes.ok) {
      expect((tRes.result as { t: number }).t).toBeGreaterThan(0);
    }
  });

  it('B5: reinforceBackground 영역 R-STDP supervised 1-pattern batch + push event', () => {
    const core = makeCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });
    const res = core.handle({
      id: 200,
      type: 'reinforceBackground',
      payload: {
        pattern: VERTICAL_PATTERN,
        targetCluster: 1,
        rewardGain: 2.0,
        punishGain: 0.5,
        intensity: 25,
        observeMs: 30,
        stimulusDurationMs: 10,
        trialToken: 77,
      },
    });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.result).toBeNull();
    expect(events).toHaveLength(1);
    const ev = events[0];
    expect(ev.event).toBe('reinforceComplete');
    const payload = ev.payload as ReinforceCompletePayload;
    expect(payload.trialToken).toBe(77);
    expect(payload.targetCluster).toBe(1);
    expect(payload.trained).toBe(1); // 1-pattern batch.
    expect(payload.cfr.layer).toBe('OUT');
    expect(payload.cfr.rates).toHaveLength(4);
  });

  it('B6: build 전 triggerBackground 영역 silent (push 0) — net 미초기화 정직 한계', () => {
    const core = new SNNWorkerCore();
    const events: WorkerPushEvent[] = [];
    core.setPushEmitter((event) => {
      events.push(event);
    });
    // build 0 — handleTriggerBackground 영역 try/catch 영역 catch 영역 silent log.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const res = core.handle({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: HORIZONTAL_PATTERN,
        intensity: 25,
        observeMs: 30,
        stimulusDurationMs: 10,
        stdpGain: 1.0,
        repeats: 1,
        resetThreshold: true,
        trialToken: 42,
      },
    });
    expect(res.ok).toBe(true); // sync ack 영역 catch path 영역 정합 — error 영역 try 내부.
    expect(events).toHaveLength(0); // push 0 — net 미빌드 영역 simulation fail.
    warnSpy.mockRestore();
  });
});
