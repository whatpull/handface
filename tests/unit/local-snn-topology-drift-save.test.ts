// LocalSNN — topology drift (expandCluster) save 정합 검증.
//
// 사용자 catch 2026-05-10 (CRITICAL — console spam 100+):
//   PR #210 Fix #20 Part B 영역 n13 builder 영역 dynamic N_CLUSTER (clusterActive
//   .length derive) → ART vigilance miss path 영역 expandCluster RPC 영역 신규
//   cluster spawn → worker 영역 synapse count 증가. UI 영역 lab.persistTopology()
//   영역 별도 호출 0 → 다음 reinforceComplete 영역 saveDebounced(force) → save()
//   영역 diffWeightSnapshots(prev_short, next_long) → "weight 길이 불일치" throw
//   → 매 frame 누적 spam.
//
// Root cause fix (LocalSNN.save 영역 length drift catch):
//   prev.length !== next.length 영역 silent topology drift 영역 fresh topology
//   snapshot + baseline 가중치 저장 + delta 폐기. 이후 save 정합 path 영역 정상
//   복귀. throw 0 → console.warn 0 → spam catch.
//
// D1: init → save → expandCluster → save (length drift) → save again (steady).
//     - 모든 save 영역 throw 0.
//     - synapsesCount 영역 expansion 후 증가 catch.
//     - rev 영역 monotonic 영역 증가 (drift save 영역 +1, steady save 영역 +1).
//     - sink topology 영역 expansion 후 fresh snapshot 영역 정합 (synapses
//       length 영역 신규 length).

import { describe, expect, it } from 'vitest';

import {
  LocalSNN,
  LocalStorageSink,
  SNNWorkerClient,
  SNNWorkerCore,
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

const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

function makeStack(prefix = 'topology_drift_test') {
  const core = new SNNWorkerCore();
  const client = new SNNWorkerClient(new InProcessTransport(core));
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix });
  return { core, client, storage, sink };
}

describe('LocalSNN.save — topology drift (expandCluster) silent recovery', () => {
  it('D1: expandCluster 후 save 영역 throw 0 + fresh topology snapshot + rev 증가', async () => {
    const { client, sink } = makeStack();
    const netId = 'topology_drift_d1';

    const lab = new LocalSNN({
      netId,
      client,
      sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await lab.init();
    const initialStatus = lab.status();
    const initialSynapses = initialStatus.synapses;
    const initialRev = initialStatus.rev;
    expect(initialSynapses).toBeGreaterThan(0);

    // baseline save (steady — length 동일).
    const rev1 = await lab.save();
    expect(rev1).toBe(initialRev + 1);

    // expandCluster — 신규 cluster spawn → synapse count 증가.
    const expandResult = await client.expandCluster({
      activeInputs: [2, 6, 10, 14], // 신규 vertical-ish pattern.
    });
    expect(expandResult.synapsesAdded).toBeGreaterThan(0);

    // 다음 save — length drift catch path.
    //   - throw 0 (직전 buggy 영역 "weight 길이 불일치" throw).
    //   - rev 영역 정상 +1.
    //   - lab status 영역 synapsesCount 영역 신규 length 영역 정합 (fresh
    //     topology snapshot 영역 update).
    const rev2 = await lab.save();
    expect(rev2).toBe(rev1 + 1);
    const driftStatus = lab.status();
    expect(driftStatus.synapses).toBeGreaterThan(initialSynapses);

    // sink topology 영역 fresh snapshot 영역 정합 — 신규 synapse 수 영역 catch.
    const persistedTopology = await sink.loadTopology(netId);
    expect(persistedTopology).not.toBeNull();
    expect(persistedTopology!.synapses.length).toBe(driftStatus.synapses);

    // sink weights 영역 신규 length 정합.
    const persistedWeights = await sink.loadWeights(netId);
    expect(persistedWeights).not.toBeNull();
    expect(persistedWeights!.weights.length).toBe(driftStatus.synapses);
    expect(persistedWeights!.rev).toBe(rev2);

    // 후속 save (steady — length 동일 path 영역 정상 복귀).
    const rev3 = await lab.save();
    expect(rev3).toBe(rev2 + 1);
    const steadyStatus = lab.status();
    expect(steadyStatus.synapses).toBe(driftStatus.synapses);
  });

  it('D2: 두 번 연속 expandCluster + save → 매 drift 영역 silent recovery', async () => {
    const { client, sink } = makeStack('topology_drift_d2');
    const netId = 'topology_drift_d2';

    const lab = new LocalSNN({
      netId,
      client,
      sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await lab.init();
    await lab.save(); // baseline.

    const startSynapses = lab.status().synapses;

    // 1st expand → save.
    await client.expandCluster({ activeInputs: [0, 1, 2] });
    const revA = await lab.save();
    const synA = lab.status().synapses;
    expect(synA).toBeGreaterThan(startSynapses);

    // 2nd expand → save (또 다른 length drift).
    await client.expandCluster({ activeInputs: [13, 14, 15] });
    const revB = await lab.save();
    const synB = lab.status().synapses;
    expect(synB).toBeGreaterThan(synA);
    expect(revB).toBe(revA + 1);

    // sink 영역 latest weights 영역 신규 length 정합.
    const persistedWeights = await sink.loadWeights(netId);
    expect(persistedWeights!.weights.length).toBe(synB);
  });
});
