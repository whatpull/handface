// LocalSNN — stale cache reject 영역 onStaleCacheReset callback 발화 검증.
//
// 사용자 catch 2026-05-10 (PR #189 polish UX-1, HIGH):
//   schema:1 (legacy v1) topology reject path + weight length mismatch path
//   영역 silent fail catch path 0 — caller (root-local-snn.ts) 영역 toast
//   발화 정합. layering 보존 — snn-runtime 영역 backend events / UI import 0
//   (callback injection).
//
// T1: schema:1 topology + 가중치 보존 → init → callback('schema-mismatch') 1회.
// T2: schema:2 topology + 가중치 길이 mismatch → init →
//     callback('weight-length-mismatch') 1회.
// T3: 보존 0 (첫 init) → callback 미호출 (silent — 사용자 가중치 폐기 0).
// T4: schema:2 topology + 정합 가중치 → init (restore) → callback 미호출.

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
  const sink = new LocalStorageSink({ storage, prefix: 'stale_toast_test' });
  return { core, client, storage, sink };
}

// Fix #20 (2026-05-10): zero-init dynamic — LEGACY 4-cluster 영역 explicit pass.
const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

describe('LocalSNN — onStaleCacheReset callback (PR #189 UX-1)', () => {
  it('T1: schema:1 topology + 가중치 보존 → callback("schema-mismatch") 1회', async () => {
    const { client, sink } = makeStack();
    const netId = 'stale_v1_toast';

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
    const lab = new LocalSNN({ netId, client, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR, onStaleCacheReset });
    await lab.init();

    expect(onStaleCacheReset).toHaveBeenCalledTimes(1);
    expect(onStaleCacheReset).toHaveBeenCalledWith('schema-mismatch');
  });

  it('T2: schema:2 topology + 가중치 길이 mismatch → callback("weight-length-mismatch") 1회', async () => {
    // 1차: fresh build → schema:2 topology + 정합 가중치 보존.
    const { client: client1, sink } = makeStack();
    const netId = 'mismatch_v2';
    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await lab1.init();

    // 2차: 가중치 영역 강제 truncate → 길이 mismatch 시뮬레이트.
    // (caller path 영역 schema 변경 / 가중치 export drift 영역 정합 catch.)
    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();
    if (!persistedW) return;
    const truncated: WeightSnapshot = {
      ...persistedW,
      weights: persistedW.weights.slice(0, Math.max(1, persistedW.weights.length - 5)),
    };
    await sink.saveWeights(truncated);

    // 3차: 새 client + 같은 sink → topology 영역 schema:2 영역 정합 단
    // 가중치 길이 mismatch → fresh build + callback 발화.
    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const onStaleCacheReset = vi.fn();
    const lab2 = new LocalSNN({
      netId, client: client2, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR, onStaleCacheReset,
    });
    await lab2.init();

    expect(onStaleCacheReset).toHaveBeenCalledTimes(1);
    expect(onStaleCacheReset).toHaveBeenCalledWith('weight-length-mismatch');
  });

  it('T3: 보존 0 (첫 init) → callback 미호출 (silent — 폐기 가중치 0)', async () => {
    const { client, sink } = makeStack();
    const netId = 'fresh_first_init';

    const onStaleCacheReset = vi.fn();
    const lab = new LocalSNN({ netId, client, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR, onStaleCacheReset });
    await lab.init();

    // 첫 진입 path 영역 폐기 가중치 0 → callback 미호출 정합.
    expect(onStaleCacheReset).not.toHaveBeenCalled();
  });

  it('T4: schema:2 + 정합 가중치 → restore → callback 미호출', async () => {
    const { client: client1, sink } = makeStack();
    const netId = 'restore_path';
    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await lab1.init();
    await lab1.save();

    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const onStaleCacheReset = vi.fn();
    const lab2 = new LocalSNN({
      netId, client: client2, sink, seed: 57, clusterActiveInputs: LEGACY_FOUR, onStaleCacheReset,
    });
    await lab2.init();

    // restore path 영역 폐기 가중치 0 → callback 미호출 정합.
    expect(onStaleCacheReset).not.toHaveBeenCalled();
  });
});
