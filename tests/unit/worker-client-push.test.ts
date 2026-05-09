// PR-B (Web Worker background offload, 2026-05-10): worker-client push event.
//
// 사용자 catch 2026-05-09 [2]: "백그라운드에서 동작" 정정 path — push event
// listener register / dispatch / unsubscribe 영역 단위 검증.
//
// P1: on('triggerComplete', handler) → push event 영역 emit 시 handler 호출.
// P2: unsubscribe return 영역 호출 후 영역 push event 영역 handler 미호출.
// P3: handler throw 영역 silent — 다른 listener 영역 fairness 보존.
// P4: dispose 영역 pushListeners.clear — 후속 push event 영역 silent.
// P5: 동일 handler 영역 multi-register 영역 Set 영역 dedupe (1회만 호출).

import { describe, expect, it, vi } from 'vitest';

import {
  SNNWorkerClient,
  type WorkerLike,
  type WorkerPushEvent,
  type TriggerCompletePayload,
  type ReinforceCompletePayload,
} from '@/lib/snn-runtime';

class StubWorker implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];

  postMessage(_message: unknown): void {
    void _message;
  }

  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    this.listeners.push(l);
  }

  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l);
    if (i >= 0) this.listeners.splice(i, 1);
  }

  terminate(): void {
    this.listeners = [];
  }

  // 테스트용 — push event 영역 외부 영역 inject (worker 영역 push emit 영역 정합).
  emit(event: WorkerPushEvent): void {
    const ev = { data: event } as MessageEvent;
    for (const l of this.listeners) l(ev);
  }
}

const SAMPLE_TRIGGER_PAYLOAD: TriggerCompletePayload = {
  trialToken: 1,
  cfr: {
    rates: [0, 12, 0, 0],
    winner: 1,
    share: 1.0,
    margin: 1.0,
    layer: 'OUT',
  },
  v1Hz: 8,
  v2Hz: 6,
  netTime: 150,
};

const SAMPLE_REINFORCE_PAYLOAD: ReinforceCompletePayload = {
  trialToken: 2,
  targetCluster: 1,
  cfr: {
    rates: [0, 12, 0, 0],
    winner: 1,
    share: 1.0,
    margin: 1.0,
    layer: 'OUT',
  },
  v1Hz: 8,
  v2Hz: 6,
  trained: 1,
  correct: 1,
  accuracy: 1.0,
};

describe('SNNWorkerClient — push event listener (PR-B 2026-05-10)', () => {
  it('P1: on(triggerComplete, handler) → push event emit 시 handler 호출 + payload wire', () => {
    const worker = new StubWorker();
    const client = new SNNWorkerClient(worker);
    const handler = vi.fn();
    const off = client.on('triggerComplete', handler);
    worker.emit({
      type: 'push',
      event: 'triggerComplete',
      payload: SAMPLE_TRIGGER_PAYLOAD,
    });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(SAMPLE_TRIGGER_PAYLOAD);
    off();
    client.dispose();
  });

  it('P2: unsubscribe return 호출 후 push event 영역 handler 미호출', () => {
    const worker = new StubWorker();
    const client = new SNNWorkerClient(worker);
    const handler = vi.fn();
    const off = client.on('reinforceComplete', handler);
    off();
    worker.emit({
      type: 'push',
      event: 'reinforceComplete',
      payload: SAMPLE_REINFORCE_PAYLOAD,
    });
    expect(handler).not.toHaveBeenCalled();
    client.dispose();
  });

  it('P3: handler throw 영역 silent — 다른 listener fairness 보존', () => {
    const worker = new StubWorker();
    const client = new SNNWorkerClient(worker);
    const throwHandler = vi.fn(() => {
      throw new Error('handler throw');
    });
    const okHandler = vi.fn();
    client.on('triggerComplete', throwHandler);
    client.on('triggerComplete', okHandler);
    // 정직 한계: console.warn 영역 발화 단 다른 handler 영역 호출 보존.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    worker.emit({
      type: 'push',
      event: 'triggerComplete',
      payload: SAMPLE_TRIGGER_PAYLOAD,
    });
    expect(throwHandler).toHaveBeenCalledTimes(1);
    expect(okHandler).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
    client.dispose();
  });

  it('P4: dispose 영역 pushListeners clear — 후속 push event 영역 silent', () => {
    const worker = new StubWorker();
    const client = new SNNWorkerClient(worker);
    const handler = vi.fn();
    client.on('triggerComplete', handler);
    client.dispose();
    // dispose 영역 worker.terminate 영역 listener 영역 정리 — emit 영역 호출 0.
    // (StubWorker terminate 영역 listeners=[]). 단 본 path 영역 dispose 후 emit
    // 영역 보호 영역 catch — emit 직전 영역 listener 영역 stub 영역 reattach 영역
    // 시뮬 path 영역 catch.
    const directListener = client['listener'];
    worker.addEventListener('message', directListener);
    worker.emit({
      type: 'push',
      event: 'triggerComplete',
      payload: SAMPLE_TRIGGER_PAYLOAD,
    });
    expect(handler).not.toHaveBeenCalled();
  });

  it('P5: 동일 handler multi-register → Set dedupe (1회만 호출)', () => {
    const worker = new StubWorker();
    const client = new SNNWorkerClient(worker);
    const handler = vi.fn();
    client.on('triggerComplete', handler);
    client.on('triggerComplete', handler);
    client.on('triggerComplete', handler);
    worker.emit({
      type: 'push',
      event: 'triggerComplete',
      payload: SAMPLE_TRIGGER_PAYLOAD,
    });
    expect(handler).toHaveBeenCalledTimes(1);
    client.dispose();
  });

  it('P6: triggerComplete + reinforceComplete 영역 별도 channel — cross-talk 0', () => {
    const worker = new StubWorker();
    const client = new SNNWorkerClient(worker);
    const tHandler = vi.fn();
    const rHandler = vi.fn();
    client.on('triggerComplete', tHandler);
    client.on('reinforceComplete', rHandler);
    worker.emit({
      type: 'push',
      event: 'triggerComplete',
      payload: SAMPLE_TRIGGER_PAYLOAD,
    });
    expect(tHandler).toHaveBeenCalledTimes(1);
    expect(rHandler).not.toHaveBeenCalled();
    worker.emit({
      type: 'push',
      event: 'reinforceComplete',
      payload: SAMPLE_REINFORCE_PAYLOAD,
    });
    expect(tHandler).toHaveBeenCalledTimes(1);
    expect(rHandler).toHaveBeenCalledTimes(1);
    client.dispose();
  });
});
