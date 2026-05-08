// 실제 Web Worker factory.
//
// Next.js / Vite 모두 `new Worker(new URL(...), { type: 'module' })` 패턴을
// 정적으로 분석해 Worker 번들을 분리한다. 따라서 본 호출은 반드시 별도
// 모듈로 격리해야 함 (조건분기 안에 두면 번들 분리 실패).
//
// 본 factory 는 클라이언트 측 코드에서만 호출 가능 — Node / SSR 에서
// 호출 시 Worker 가 정의되지 않아 실패. 'use client' 모듈에서 lazy import
// 하거나, useEffect 내부에서 호출하는 등 보호 필요.

export function createSnnWebWorker(): Worker {
  return new Worker(new URL('./snn-worker.ts', import.meta.url), { type: 'module' });
}
