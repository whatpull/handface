// SNN core 를 main thread 에서 직접 호출하는 동기 transport.
//
// 용도:
//  - 단위 테스트 / 데모 / 작은 회로 — Web Worker 번들링 부담 없이 동작.
//  - Next.js dev / static export 로 시작 시 우선 main thread 경로 사용,
//    실 사용자 측 부하가 보일 때 SharedWorker / Worker 로 swap.
//
// 비동기 흐름 보존: postMessage → microtask 후 listener dispatch.
// (SNNWorkerClient 가 Promise 기반이므로 동기 호출이라도 microtask 스케줄링
//  이 필요. 그래야 UI 업데이트 사이에 I/O burst 가 흩어져 frame drop 절감.)

import type { WorkerLike } from './worker-client';
import { SNNWorkerCore } from './worker-core';
import type { WorkerRequest, WorkerResponse } from './worker-protocol';

export class MainThreadTransport implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];
  private disposed = false;

  constructor(private core: SNNWorkerCore = new SNNWorkerCore()) {
    // PR-B (Web Worker background offload, 2026-05-10): SSR fallback push wire.
    // worker entry (snn-worker.ts) 영역 self.postMessage 영역 wire 정합 — 본
    // transport 영역 listeners.dispatch 영역 swap. queueMicrotask 영역 async
    // dispatch 영역 정합 (worker postMessage 영역 동기 0 — fairness 보존).
    this.core.setPushEmitter((event) => {
      queueMicrotask(() => {
        if (this.disposed) return;
        const ev = { data: event } as MessageEvent;
        for (const l of this.listeners) l(ev);
      });
    });
  }

  postMessage(message: unknown): void {
    if (this.disposed) return;
    const res: WorkerResponse = this.core.handle(message as WorkerRequest);
    queueMicrotask(() => {
      if (this.disposed) return;
      const ev = { data: res } as MessageEvent;
      for (const l of this.listeners) l(ev);
    });
  }

  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    this.listeners.push(l);
  }

  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l);
    if (i >= 0) this.listeners.splice(i, 1);
  }

  terminate(): void {
    this.disposed = true;
    this.listeners = [];
  }

  // 본 transport 가 보유한 core 인스턴스 — 진단/테스트 직접 접근용.
  getCore(): SNNWorkerCore {
    return this.core;
  }
}
