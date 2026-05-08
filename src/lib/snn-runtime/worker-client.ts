// SNN worker client — main thread 측 RPC 래퍼.
//
// 전송 매체 (WorkerLike) 를 인자로 받아 단위 테스트 시 in-process mock 으로
// 대체 가능. 실 환경에서는 standard Worker / SharedWorker 를 주입.

import type {
  BuildPayload,
  BuildResult,
  ClusterFiringRatesPayload,
  ClusterFiringRatesResult,
  ExpandClusterPayload,
  ExpandClusterResult,
  FiringRatesPayload,
  FiringRatesResult,
  RunPayload,
  RunResult,
  SnapshotResult,
  WorkerRequest,
  WorkerResponse,
} from './worker-protocol';
import type { InjectEvent } from './network';

// 표준 Worker / 등가물의 최소 인터페이스.
export interface WorkerLike {
  postMessage(message: unknown): void;
  addEventListener(type: 'message', listener: (e: MessageEvent) => void): void;
  removeEventListener?(type: 'message', listener: (e: MessageEvent) => void): void;
  terminate?(): void;
}

interface PendingEntry {
  resolve: (v: unknown) => void;
  reject: (e: Error) => void;
}

// Discriminated-union 보존을 위한 distributive Omit.
type AnyRequestWithoutId = WorkerRequest extends infer R
  ? R extends { id: number }
    ? Omit<R, 'id'>
    : never
  : never;

export class SNNWorkerClient {
  private nextId = 1;
  private pending = new Map<number, PendingEntry>();
  private listener: (e: MessageEvent) => void;

  constructor(private worker: WorkerLike) {
    this.listener = (e: MessageEvent) => this.handleResponse(e.data as WorkerResponse);
    worker.addEventListener('message', this.listener);
  }

  private handleResponse(res: WorkerResponse): void {
    const p = this.pending.get(res.id);
    if (!p) return;
    this.pending.delete(res.id);
    if (res.ok) p.resolve(res.result);
    else p.reject(new Error(res.error));
  }

  private send<T>(req: AnyRequestWithoutId): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const id = this.nextId;
      this.nextId += 1;
      const full = { id, ...req } as WorkerRequest;
      this.pending.set(id, {
        resolve: resolve as (v: unknown) => void,
        reject,
      });
      this.worker.postMessage(full);
    });
  }

  build(payload: BuildPayload): Promise<BuildResult> {
    return this.send<BuildResult>({ type: 'build', payload });
  }

  inject(events: InjectEvent[]): Promise<null> {
    return this.send<null>({ type: 'inject', payload: { events } });
  }

  run(payload: RunPayload): Promise<RunResult> {
    return this.send<RunResult>({ type: 'run', payload });
  }

  snapshot(): Promise<SnapshotResult> {
    return this.send<SnapshotResult>({ type: 'snapshot' });
  }

  extractWeights(): Promise<number[]> {
    return this.send<number[]>({ type: 'extractWeights' });
  }

  applyWeights(weights: number[]): Promise<null> {
    return this.send<null>({ type: 'applyWeights', payload: { weights } });
  }

  firingRates(payload: FiringRatesPayload): Promise<FiringRatesResult> {
    return this.send<FiringRatesResult>({ type: 'firingRates', payload });
  }

  expandCluster(payload: ExpandClusterPayload): Promise<ExpandClusterResult> {
    return this.send<ExpandClusterResult>({ type: 'expandCluster', payload });
  }

  clusterFiringRates(payload: ClusterFiringRatesPayload): Promise<ClusterFiringRatesResult> {
    return this.send<ClusterFiringRatesResult>({ type: 'clusterFiringRates', payload });
  }

  reset(): Promise<null> {
    return this.send<null>({ type: 'reset' });
  }

  dispose(): void {
    if (this.worker.removeEventListener) {
      this.worker.removeEventListener('message', this.listener);
    }
    if (this.worker.terminate) this.worker.terminate();
    this.pending.forEach((p) => p.reject(new Error('worker disposed')));
    this.pending.clear();
  }
}
