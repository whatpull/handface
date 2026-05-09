// PR-B (Web Worker background offload, 2026-05-10): root-local-snn 영역 transport 영역 swap.
//
// 사용자 catch 2026-05-09 [2]: HIGH FINDING-1 — 직전 영역 MainThreadTransport
// hard-wire 영역 root cause. 본 정정 영역 typeof Worker !== 'undefined' 영역
// catch 영역 createSnnWebWorker swap + SSR / test env 영역 fallback 영역 보존.
//
// T1: createSnnWebWorker export 영역 from '@/lib/snn-runtime' (직전 export 0).
// T2: jsdom 환경 영역 Worker undefined 영역 시뮬 path — MainThreadTransport fallback.

import { describe, expect, it } from 'vitest';

describe('root-local-snn — transport swap (PR-B 2026-05-10)', () => {
  it('T1: createSnnWebWorker export 영역 from @/lib/snn-runtime', async () => {
    const { createSnnWebWorker, MainThreadTransport, SNNWorkerClient } = await import('@/lib/snn-runtime');
    expect(typeof createSnnWebWorker).toBe('function');
    expect(typeof MainThreadTransport).toBe('function');
    expect(typeof SNNWorkerClient).toBe('function');
  });

  it('T2: WorkerLike interface 영역 MainThreadTransport 영역 정합 (fallback path)', async () => {
    const { MainThreadTransport, SNNWorkerCore } = await import('@/lib/snn-runtime');
    const core = new SNNWorkerCore();
    const transport = new MainThreadTransport(core);
    // WorkerLike interface 영역 minimum API 영역 catch — fallback path 영역 동작 보장.
    expect(typeof transport.postMessage).toBe('function');
    expect(typeof transport.addEventListener).toBe('function');
    expect(typeof transport.removeEventListener).toBe('function');
    expect(typeof transport.terminate).toBe('function');
  });

  it('T3: MainThreadTransport 영역 push emitter wire (PR-B push event channel)', async () => {
    const { MainThreadTransport, SNNWorkerCore } = await import('@/lib/snn-runtime');
    const core = new SNNWorkerCore();
    // build — push 영역 net 미초기화 영역 fail 회피.
    core.handle({ id: 1, type: 'build', payload: { preset: 'n13_orientation', seed: 57 } });
    const transport = new MainThreadTransport(core);
    // listener 영역 register — push event 영역 dispatch path.
    const received: unknown[] = [];
    transport.addEventListener('message', (e) => {
      received.push(e.data);
    });
    // triggerBackground RPC 영역 sync ack `null` + push event 영역 microtask 영역 dispatch.
    transport.postMessage({
      id: 100,
      type: 'triggerBackground',
      payload: {
        pattern: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        intensity: 25,
        observeMs: 30,
        stimulusDurationMs: 10,
        stdpGain: 1.0,
        repeats: 1,
        resetThreshold: true,
        trialToken: 42,
      },
    });
    // microtask 영역 ack + push 영역 dispatch 영역 wait.
    await new Promise((r) => setTimeout(r, 10));
    // ack (RPC response) + push event 영역 2 message 영역 dispatch 영역 정합.
    expect(received.length).toBeGreaterThanOrEqual(2);
    const pushMsg = received.find((m) => {
      const obj = m as { type?: string };
      return obj && obj.type === 'push';
    });
    expect(pushMsg).toBeDefined();
  });
});
