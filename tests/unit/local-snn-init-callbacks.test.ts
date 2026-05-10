// LocalSNN — onFreshBuild / onHydrateLoaded callback 발화 검증 (Fix 4).
//
// 사용자 catch 2026-05-09 [2]: "기존에 학습된 데이터가 DB에 존재하는지, 그래서
// 클러스터0~3이 학습이 제로인 상태에서 추론을 하게 되는건지 궁금". root cause —
// fresh build vs hydrate state 영역 시각 catch 0. 본 정정: LocalSNN.init 영역
// onFreshBuild / onHydrateLoaded callback 영역 emit (caller 영역 NodeLearn footer
// status row 영역 표시).
//
// IC1: 첫 init (보존 0) → onFreshBuild 1회, onHydrateLoaded 0회.
// IC2: 2차 init (보존 정합) → onHydrateLoaded 1회 ({ savedAt, rev }), onFreshBuild 0회.
// IC3: schema:1 reject → onStaleCacheReset + onFreshBuild (둘 다 1회).
// IC4: 가중치 길이 mismatch → onStaleCacheReset + onFreshBuild (둘 다 1회).

import { describe, expect, it, vi } from 'vitest';

import {
  LocalSNN,
  LocalStorageSink,
  SNNWorkerClient,
  SNNWorkerCore,
  type NetworkSnapshot,
  type WeightSnapshot,
  type WorkerLike,
  type WorkerRequest,
} from '@/lib/snn-runtime';

class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string): string | null {
    return this.store.get(k) ?? null;
  }
  setItem(k: string, v: string): void {
    this.store.set(k, v);
  }
  removeItem(k: string): void {
    this.store.delete(k);
  }
}

class InProcessTransport implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];
  constructor(private core: SNNWorkerCore) {}
  postMessage(req: unknown): void {
    const res = this.core.handle(req as WorkerRequest);
    queueMicrotask(() => {
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
    this.listeners = [];
  }
}

function makeStack() {
  const core = new SNNWorkerCore();
  const client = new SNNWorkerClient(new InProcessTransport(core));
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: 'init_callbacks_test' });
  return { core, client, storage, sink };
}

// Fix #20 (2026-05-10): zero-init dynamic — LEGACY 4-cluster 영역 explicit pass.
const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

describe('LocalSNN — onFreshBuild / onHydrateLoaded callback (Fix 4)', () => {
  it('IC1: 첫 init (보존 0) → onFreshBuild 1회, onHydrateLoaded 0회', async () => {
    const { client, sink } = makeStack();
    const onFreshBuild = vi.fn();
    const onHydrateLoaded = vi.fn();
    const lab = new LocalSNN({
      netId: 'first-init',
      client,
      sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab.init();

    expect(onFreshBuild).toHaveBeenCalledTimes(1);
    expect(onHydrateLoaded).not.toHaveBeenCalled();
  });

  it('IC2: 2차 init (보존 정합) → onHydrateLoaded 1회 ({ savedAt, rev }), onFreshBuild 0회', async () => {
    const { client: client1, sink } = makeStack();
    const netId = 'hydrate-path';

    // 1차: fresh build + 1회 save → topology + 가중치 보존.
    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await lab1.init();
    await lab1.save();

    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();

    // 2차: 새 client + 같은 sink → restore (hydrate) path.
    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const onFreshBuild = vi.fn();
    const onHydrateLoaded = vi.fn();
    const lab2 = new LocalSNN({
      netId,
      client: client2,
      sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab2.init();

    expect(onHydrateLoaded).toHaveBeenCalledTimes(1);
    expect(onHydrateLoaded).toHaveBeenCalledWith({
      savedAt: persistedW!.savedAt,
      rev: persistedW!.rev,
    });
    expect(onFreshBuild).not.toHaveBeenCalled();
  });

  it('IC3: schema:1 reject → onStaleCacheReset + onFreshBuild (둘 다 1회)', async () => {
    const { client, sink } = makeStack();
    const netId = 'schema-mismatch-fresh';

    const v1Topo: NetworkSnapshot = {
      schema: 1,
      dtMs: 0.1,
      t: 0,
      neurons: [
        {
          name: 'in_feat_0',
          region: 'INPUT',
          population: null,
          vRest: -65,
          vThreshold: -55,
          vReset: -70,
          tauM: 20,
          refractory: 2,
        },
      ],
      synapses: [],
    };
    const v1Weights: WeightSnapshot = {
      schema: 1,
      netId,
      rev: 7,
      t: 0,
      savedAt: Date.now(),
      weights: [],
    };
    await sink.saveTopology(netId, v1Topo);
    await sink.saveWeights(v1Weights);

    const onStaleCacheReset = vi.fn();
    const onFreshBuild = vi.fn();
    const onHydrateLoaded = vi.fn();
    const lab = new LocalSNN({
      netId,
      client,
      sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
      onStaleCacheReset,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab.init();

    expect(onStaleCacheReset).toHaveBeenCalledTimes(1);
    expect(onStaleCacheReset).toHaveBeenCalledWith('schema-mismatch');
    expect(onFreshBuild).toHaveBeenCalledTimes(1);
    expect(onHydrateLoaded).not.toHaveBeenCalled();
  });

  it('IC4: 가중치 길이 mismatch → onStaleCacheReset + onFreshBuild (둘 다 1회)', async () => {
    const { client: client1, sink } = makeStack();
    const netId = 'mismatch-fresh';

    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await lab1.init();

    // 가중치 영역 강제 truncate.
    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();
    if (!persistedW) return;
    const truncated: WeightSnapshot = {
      ...persistedW,
      weights: persistedW.weights.slice(0, Math.max(1, persistedW.weights.length - 5)),
    };
    await sink.saveWeights(truncated);

    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const onStaleCacheReset = vi.fn();
    const onFreshBuild = vi.fn();
    const onHydrateLoaded = vi.fn();
    const lab2 = new LocalSNN({
      netId,
      client: client2,
      sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
      onStaleCacheReset,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab2.init();

    expect(onStaleCacheReset).toHaveBeenCalledTimes(1);
    expect(onStaleCacheReset).toHaveBeenCalledWith('weight-length-mismatch');
    expect(onFreshBuild).toHaveBeenCalledTimes(1);
    expect(onHydrateLoaded).not.toHaveBeenCalled();
  });
});
