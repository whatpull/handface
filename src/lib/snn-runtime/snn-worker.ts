// 실제 Web Worker entry. Next.js / Vite 가 본 파일을 별도 번들로 묶어
// `new Worker(new URL('./snn-worker.ts', import.meta.url))` 로 로드한다.
//
// 본 파일은 self.onmessage / postMessage 만 연결하고, 모든 로직은
// worker-core.ts 의 SNNWorkerCore 가 담당.
//
// jsdom 단위 테스트는 worker-core 를 직접 테스트 — 본 entry 는 실 브라우저
// 또는 Web Worker polyfill 환경에서만 의미가 있다.

import { SNNWorkerCore } from './worker-core';
import type { WorkerRequest } from './worker-protocol';

// DedicatedWorkerGlobalScope 의 최소 형태. WebWorker lib 가 tsconfig 에
// 안 들어가도 컴파일 가능하게 자체 declare.
interface WorkerSelf {
  addEventListener(type: 'message', listener: (e: MessageEvent<WorkerRequest>) => void): void;
  postMessage(message: unknown): void;
}

declare const self: WorkerSelf;

const core = new SNNWorkerCore();

// PR-B (Web Worker background offload, 2026-05-10): worker push event channel.
// triggerBackground / reinforceBackground RPC 영역 sync ack 영역 별도 path 영역
// simulation 영역 끝난 시점 영역 push event 영역 main thread 영역 emit. main
// thread (worker-client.ts) 영역 message handler 영역 type='push' 영역 분기.
core.setPushEmitter((event) => {
  self.postMessage(event);
});

self.addEventListener('message', (e) => {
  const res = core.handle(e.data);
  self.postMessage(res);
});
