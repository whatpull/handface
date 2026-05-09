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
  ReinforceBackgroundPayload,
  ReinforceCompletePayload,
  ResetClusterWeightsResult,
  RestoreSnapshotPayload,
  RestoreSnapshotResult,
  RunPayload,
  RunResult,
  SnapshotResult,
  TriggerBackgroundPayload,
  TriggerCompletePayload,
  WorkerPushEvent,
  WorkerRequest,
  WorkerResponse,
} from './worker-protocol';
import type { InjectEvent } from './network';

// PR-B (Web Worker background offload, 2026-05-10): push event listener types.
// triggerComplete / reinforceComplete event 영역 별도 handler 영역 등록 사실.
export type PushEventName = 'triggerComplete' | 'reinforceComplete';

export interface PushHandlers {
  triggerComplete: (payload: TriggerCompletePayload) => void;
  reinforceComplete: (payload: ReinforceCompletePayload) => void;
}

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
  // PR-B (Web Worker background offload, 2026-05-10): push event listeners.
  // Map<event, Set<handler>> 영역 multi-listener 영역 정합. unsubscribe 영역
  // closure 영역 set.delete 영역 정합 (return 영역 functional).
  private pushListeners: Map<PushEventName, Set<(payload: unknown) => void>> = new Map();

  constructor(private worker: WorkerLike) {
    this.listener = (e: MessageEvent) => {
      const data = e.data as WorkerResponse | WorkerPushEvent;
      // PR-B: type='push' 영역 push event 영역 dispatch (RPC 정합 0).
      if (data && typeof data === 'object' && 'type' in data && data.type === 'push') {
        this.dispatchPush(data);
        return;
      }
      this.handleResponse(data as WorkerResponse);
    };
    worker.addEventListener('message', this.listener);
  }

  private dispatchPush(event: WorkerPushEvent): void {
    const set = this.pushListeners.get(event.event);
    if (!set || set.size === 0) return;
    // payload 영역 event 영역 discriminated 영역 catch — handler 영역 동일 type.
    for (const handler of set) {
      try {
        handler(event.payload);
      } catch (e) {
        // 정직 한계: handler 영역 throw 영역 silent — 다른 listener 영역 fairness 보존.
        console.warn('[SNNWorkerClient] push handler threw:', e);
      }
    }
  }

  /**
   * PR-B (Web Worker background offload, 2026-05-10): push event listener 등록.
   * triggerBackground / reinforceBackground RPC 영역 sync ack `null` 영역 별도
   * path 영역 worker 영역 simulation 영역 끝난 시점 영역 push event 영역 emit.
   *
   * 반환 영역 unsubscribe — caller 영역 dispose / substrate switch 시점 영역 호출.
   *
   * 정직 한계: 동일 handler 영역 multi-register 영역 Set 영역 dedupe — 동일
   * reference 영역 한 번만 listen.
   */
  on<E extends PushEventName>(event: E, handler: (payload: PushHandlers[E] extends (p: infer P) => void ? P : never) => void): () => void {
    let set = this.pushListeners.get(event);
    if (!set) {
      set = new Set();
      this.pushListeners.set(event, set);
    }
    const wrapped = handler as (payload: unknown) => void;
    set.add(wrapped);
    return () => {
      const s = this.pushListeners.get(event);
      if (s) s.delete(wrapped);
    };
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

  /**
   * PR-A architecture pivot (사용자 catch 2026-05-09 — Step 4):
   * 학습 가중치 영역 fresh build default 영역 restore. saturation escape
   * mandatory path — horizontal lock-in 영역 IndexedDB 영속 영역 새로고침
   * 영역 escape 0 영역 catch 회피.
   */
  resetClusterWeights(): Promise<ResetClusterWeightsResult> {
    return this.send<ResetClusterWeightsResult>({ type: 'resetClusterWeights' });
  }

  reset(): Promise<null> {
    return this.send<null>({ type: 'reset' });
  }

  /**
   * PR-B (Web Worker background offload, 2026-05-10): fire-and-forget trigger.
   * sync ack `null` 영역 즉시 return — 사용자 input event loop 영역 unblock.
   * 결과 영역 push event ('triggerComplete') 영역 emit. caller (live-snn.ts
   * triggerAsync) 영역 on('triggerComplete', ...) 영역 listener 영역 wire.
   */
  triggerBackground(payload: TriggerBackgroundPayload): Promise<null> {
    return this.send<null>({ type: 'triggerBackground', payload });
  }

  /**
   * PR-B (Web Worker background offload, 2026-05-10): fire-and-forget reinforce.
   * sync ack `null` + 결과 영역 push event ('reinforceComplete') 영역 emit.
   * R-STDP supervised 1-pattern batch 영역 worker 내부 영역 inline 처리.
   */
  reinforceBackground(payload: ReinforceBackgroundPayload): Promise<null> {
    return this.send<null>({ type: 'reinforceBackground', payload });
  }

  dispose(): void {
    if (this.worker.removeEventListener) {
      this.worker.removeEventListener('message', this.listener);
    }
    if (this.worker.terminate) this.worker.terminate();
    this.pending.forEach((p) => p.reject(new Error('worker disposed')));
    this.pending.clear();
    // PR-B: push listener 영역 clear — caller 영역 unsubscribe 영역 catch
    // 회피 catch 영역 disposed worker 영역 emit 0 단 defensive cleanup.
    this.pushListeners.clear();
  }
}
