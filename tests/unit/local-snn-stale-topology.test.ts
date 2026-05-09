// LocalSNN — stale topology (schema:1) reject 검증.
//
// 사용자 catch 2026-05-09 (urgent — 학습 후 추론 안됨):
//   PR #186 직전 build 영역 IndexedDB 영역 schema:1 (v1) topology cache 영역
//   PR #186 후 hydrate 시점 영역 NMDA off / homeostatic off default → INPUT
//   EPSP 영역 V_th 미달 → fire 0 → cluster_rates 모두 0. Fix B: schema:1
//   영역 reject → fresh n13 build 강제.
//
// public init() API 영역 통한 검증 (private topologyMatchesPreset 영역 직접
// 호출 0):
//   T1: schema:1 topology + 가중치 영역 sink 영역 pre-populate → init →
//       fresh build (rev=0, 새 n13 substrate). 보존 가중치 폐기 catch.
//   T2: schema:2 topology + 정합 가중치 → init → restore (rev 보존).
//   T3: schema:1 topology + empty neurons → init → fresh build (sanity).

import { describe, expect, it } from 'vitest';

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
  const sink = new LocalStorageSink({ storage, prefix: 'stale_test' });
  return { core, client, storage, sink };
}

describe('LocalSNN — Fix B (schema:1 topology reject → fresh build)', () => {
  it('T1: schema:1 topology + 가중치 영역 sink 영역 pre-populate → fresh build (보존 폐기)', async () => {
    const { client, sink } = makeStack();
    const netId = 'stale_v1';

    // schema:1 (legacy v1) 영역 stale topology + dummy 가중치 영역 미리 저장.
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
      rev: 42,
      t: 0,
      savedAt: Date.now(),
      weights: [],
    };
    await sink.saveTopology(netId, v1Topo);
    await sink.saveWeights(v1Weights);

    // init — Fix B 영역 schema:1 reject → fresh n13 build.
    const lab = new LocalSNN({ netId, client, sink, seed: 57 });
    const status = await lab.init();

    // fresh build catch — rev=0 (rev=42 보존 폐기), neurons=n13 substrate.
    expect(status.rev).toBe(0);
    expect(status.neurons).toBeGreaterThan(800);
    expect(status.synapses).toBeGreaterThan(0);

    // 새 topology 영역 schema:2 영역 catch — sink 영역 swap 정합.
    const reloaded = await sink.loadTopology(netId);
    expect(reloaded?.schema).toBe(2);
  });

  it('T2: schema:2 topology + 정합 가중치 → restore (보존 catch)', async () => {
    const { client, sink } = makeStack();
    const netId = 'fresh_v2';

    // 첫 init — fresh n13 build → schema:2 topology 보존.
    const lab1 = new LocalSNN({ netId, client, sink, seed: 57 });
    await lab1.init();
    const rev1 = await lab1.save();
    expect(rev1).toBe(1);

    // 새 stack 영역 같은 sink → schema:2 영역 restore catch.
    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const lab2 = new LocalSNN({ netId, client: client2, sink, seed: 57 });
    const status = await lab2.init();
    // 보존 가중치 영역 rev=1 정합.
    expect(status.rev).toBe(1);
  });

  it('T3: schema:1 + empty neurons → fresh build (sanity)', async () => {
    const { client, sink } = makeStack();
    const netId = 'empty_v1';

    const empty: NetworkSnapshot = {
      schema: 1,
      dtMs: 0.1,
      t: 0,
      neurons: [],
      synapses: [],
    };
    const emptyWeights: WeightSnapshot = {
      schema: 1,
      netId,
      rev: 0,
      t: 0,
      savedAt: Date.now(),
      weights: [],
    };
    await sink.saveTopology(netId, empty);
    await sink.saveWeights(emptyWeights);

    const lab = new LocalSNN({ netId, client, sink, seed: 57 });
    const status = await lab.init();
    // empty + schema:1 → 둘 다 fresh build trigger.
    expect(status.rev).toBe(0);
    expect(status.neurons).toBeGreaterThan(800);
  });
});
