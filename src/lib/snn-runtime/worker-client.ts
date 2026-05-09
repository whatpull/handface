// SNN worker client — main thread 측 RPC 래퍼.
//
// 전송 매체 (WorkerLike) 를 인자로 받아 단위 테스트 시 in-process mock 으로
// 대체 가능. 실 환경에서는 standard Worker / SharedWorker 를 주입.

import type {
  BuildPayload,
  BuildResult,
  ClusterFiringRatesPayload,
  ClusterFiringRatesResult,
  ClusterTrainRStdpPayload,
  ClusterTrainRStdpResult,
  ExpandClusterPayload,
  ExpandClusterResult,
  FiringRatesPayload,
  FiringRatesResult,
  GetNetworkTimeResult,
  RegionFiringRatesPayload,
  RegionFiringRatesResult,
  RestoreSnapshotPayload,
  RestoreSnapshotResult,
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

  restoreSnapshot(payload: RestoreSnapshotPayload): Promise<RestoreSnapshotResult> {
    return this.send<RestoreSnapshotResult>({ type: 'restoreSnapshot', payload });
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

  /**
   * PR fix/live-mode-time-and-restore — Fix 5: region 단위 평균 firing rate.
   * V1 / V2 / OUT 영역 모든 excitatory neuron 영역 평균 (Hz). NodeLearn 영역
   * V1/V2 cascade strip 영역 실 spike rate 영역 표시.
   */
  regionFiringRates(payload: RegionFiringRatesPayload): Promise<RegionFiringRatesResult> {
    return this.send<RegionFiringRatesResult>({ type: 'regionFiringRates', payload });
  }

  expandCluster(payload: ExpandClusterPayload): Promise<ExpandClusterResult> {
    return this.send<ExpandClusterResult>({ type: 'expandCluster', payload });
  }

  clusterFiringRates(payload: ClusterFiringRatesPayload): Promise<ClusterFiringRatesResult> {
    return this.send<ClusterFiringRatesResult>({ type: 'clusterFiringRates', payload });
  }

  clusterTrainRStdp(payload: ClusterTrainRStdpPayload): Promise<ClusterTrainRStdpResult> {
    return this.send<ClusterTrainRStdpResult>({ type: 'clusterTrainRStdp', payload });
  }

  /**
   * PR fix/live-mode-time-and-restore — Fix 1: net.t (현재 시뮬레이션 시각, ms).
   * 사용자 catch 2026-05-09 (broken state — 두 번째 trigger 0Hz):
   * inject(time=0) + run() 영역 net.t 누적 영역 1-step burst collapse 회피
   * catch — main thread 영역 currentT 영역 inject events 영역 time 정합.
   */
  async getNetworkTime(): Promise<number> {
    const r = await this.send<GetNetworkTimeResult>({ type: 'getNetworkTime' });
    return r.t;
  }

  /**
   * PR fix/live-mode-time-and-restore — Fix 3: 모든 neuron 영역 thresholdOffset
   * 영역 0 영역 reset. triggerOnce repeats 누적 thresholdOffset 영역 V_th
   * saturation 영역 fire 0 영역 회피 (Diehl & Cook 2015 §3.2 batch reset 정합).
   */
  resetHomeostatic(): Promise<null> {
    return this.send<null>({ type: 'resetHomeostatic' });
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
