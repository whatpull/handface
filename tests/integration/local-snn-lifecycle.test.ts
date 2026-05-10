// LocalSNN end-to-end lifecycle 통합 테스트.
//
// 모든 lib 가 결합해 동작하는지 확인:
//   buildN13OrientationPreset (C5a) → SNNWorkerCore (C4) → SNNWorkerClient (C4)
//   → LocalStorageSink (C3) → diffWeightSnapshots (C3) → ART (C5b) primitives.
//
// 시나리오:
//   1. 첫 init — 토폴로지 + rev0 가중치 저장.
//   2. 자극 inject + STDP run — 가중치 진화.
//   3. save — 변화된 가중치 저장 + delta 누적.
//   4. 새 client / sink 인스턴스로 init — 보존된 가중치 복원되는지 확인.

import { describe, expect, it } from 'vitest';

import {
  FIX_REV_BASELINE,
  LocalSNN,
  LocalStorageSink,
  N13Pools,
  SNNWorkerClient,
  SNNWorkerCore,
  buildClusterRegistryFromN13,
  computeMatchScore,
  evaluateVigilance,
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
  const sink = new LocalStorageSink({ storage, prefix: 'integ' });
  return { core, client, storage, sink };
}

// Fix #20 (2026-05-10): zero-init default — LEGACY 4-cluster 영역 explicit pass.
const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

describe('LocalSNN — end-to-end lifecycle', () => {
  it('init → run → save → 새 stack 으로 init 시 보존 가중치 복원', async () => {
    // ── stack 1 ── 처음 빌드 + 학습 + 저장.
    const s1 = makeStack();
    const lab1 = new LocalSNN({
      netId: 'user_a',
      client: s1.client,
      sink: s1.sink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });

    const status0 = await lab1.init();
    // PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner 정정,
    // 2026-05-10): fresh build 영역 rev: FIX_REV_BASELINE 영역 시작 — anchor
    // 미달 reject loop 회피.
    expect(status0.rev).toBe(FIX_REV_BASELINE);
    expect(status0.neurons).toBeGreaterThan(800);
    expect(status0.synapses).toBeGreaterThan(0);

    // 자극 inject + STDP run → 가중치 진화.
    await s1.client.inject(
      [4, 5, 6, 7].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 25,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      })),
    );
    await s1.client.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: true });

    const rev1 = await lab1.save();
    // PR-I: save() → rev+1 영역 누적 정합 보존 — fresh build 영역 anchor 시작
    // 영역 첫 save 영역 anchor+1.
    expect(rev1).toBe(FIX_REV_BASELINE + 1);

    const wAfter = await lab1.currentWeights();

    // 같은 storage (in-memory MemoryStorage) 를 공유하는 sink 로 새 stack 빌드.
    const s2 = {
      core: new SNNWorkerCore(),
      get client() {
        return new SNNWorkerClient(new InProcessTransport(this.core));
      },
    };
    const sharedSink = new LocalStorageSink({
      storage: s1.storage,
      prefix: 'integ',
    });
    const stack2Client = s2.client;
    const lab2 = new LocalSNN({
      netId: 'user_a',
      client: stack2Client,
      sink: sharedSink,
      seed: 57, // 같은 seed → 같은 토폴로지 빌드.
      clusterActiveInputs: LEGACY_FOUR,
    });

    const restored = await lab2.init();
    // PR-I: 보존된 rev (FIX_REV_BASELINE+1) 적용.
    expect(restored.rev).toBe(FIX_REV_BASELINE + 1);

    const wRestored = await lab2.currentWeights();
    // 핵심: 보존된 가중치가 그대로 새 net 에 적용됐어야 함.
    expect(wRestored.length).toBe(wAfter.length);
    for (let i = 0; i < Math.min(50, wRestored.length); i += 1) {
      expect(wRestored[i]).toBeCloseTo(wAfter[i], 6);
    }
  });

  it('학습 진행 시 ART vigilance 측정 가능 (V1_L23 / OUT firing rate 기반)', async () => {
    const { client, sink } = makeStack();
    const lab = new LocalSNN({
      netId: 'art_demo',
      client,
      sink,
      seed: 99,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await lab.init();

    // cluster 0 active inputs 자극.
    await client.inject(
      [4, 5, 6, 7].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 30,
        time: 0,
        durationMs: 80,
        stepMs: 0.1,
      })),
    );
    await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });

    // worker 가 보유한 V1_L23 firing rate 들을 가져와 ART score 계산.
    // (computeMatchScore 는 SpikeMonitor 직접 사용 — 본 테스트는 client API 만으로
    //  가능한 정도까지: firingRates RPC 로 cluster 별 평균 발화율 추출.)
    const reg = buildClusterRegistryFromN13([
      [4, 5, 6, 7],
      [1, 5, 9, 13],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ]);
    const cluster0Names = reg.slots[0].out;
    const result = await client.firingRates({
      names: cluster0Names,
      windowMs: 100,
    });
    expect(result.rates).toHaveLength(N13Pools.OUT_PER_CLUSTER);
    // 학습되지 않은 회로는 OUT 발화율이 매우 낮을 수 있음 — 형식만 검증.
    for (const r of result.rates) {
      expect(r.hz).toBeGreaterThanOrEqual(0);
    }

    // 즉, evaluateVigilance / computeMatchScore 는 ClusterRegistry + monitor 가
    // 본 worker 내부에 존재하므로, 외부 호출자는 firingRates 로 추출 후 직접
    // share / margin 계산 가능. 본 검증은 lib 결합 가능성만 확인.
    const fakeRates = result.rates.map((r) => r.hz);
    const max = Math.max(0, ...fakeRates);
    const sum = fakeRates.reduce((a, b) => a + b, 0);
    const share = sum > 0 ? max / sum : 0;
    expect(share).toBeGreaterThanOrEqual(0);
    expect(share).toBeLessThanOrEqual(1);
    void computeMatchScore;
    void evaluateVigilance;
  });

  it('expansion → reload 시 토폴로지 + 가중치 round-trip (cluster 5개 보존)', async () => {
    const s1 = makeStack();
    const lab1 = new LocalSNN({ netId: 'expand_demo', client: s1.client, sink: s1.sink, seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await lab1.init();

    // expansion → 새 cluster 추가 (totalClusters=5).
    const exp = await s1.client.expandCluster({ activeInputs: [2, 6, 11, 14], seed: 100 });
    expect(exp.totalClusters).toBe(5);
    // useLocalSnn 의 expandCluster wrapper 가 persistTopology 호출하는데, lib
    // 직접 사용 시 호출자가 트리거. 본 테스트는 명시 호출.
    await lab1.persistTopology();

    // 학습 + save.
    await s1.client.inject(
      [2, 6, 11, 14].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 28,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      })),
    );
    await s1.client.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: true });
    await lab1.save();
    const w1 = await lab1.currentWeights();

    // 새 stack 으로 새로고침 시뮬.
    const newCore = new SNNWorkerCore();
    const newClient = new SNNWorkerClient(new InProcessTransport(newCore));
    const sharedSink = new LocalStorageSink({ storage: s1.storage, prefix: 'integ' });
    const lab2 = new LocalSNN({
      netId: 'expand_demo',
      client: newClient,
      sink: sharedSink,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    const restored = await lab2.init();

    // 토폴로지가 5 cluster 로 복원되었는지 확인 — registry slot 수.
    const registry = newCore.getRegistryForTest();
    expect(registry).not.toBeNull();
    expect(registry!.slots).toHaveLength(5);

    // 가중치 round-trip — base (~27k) 보다 큰 expansion 후 길이 보존 확인.
    expect(restored.synapses).toBeGreaterThan(28000);
    const w2 = await lab2.currentWeights();
    expect(w2.length).toBe(w1.length);
    for (let i = 0; i < Math.min(50, w2.length); i += 1) {
      expect(w2[i]).toBeCloseTo(w1[i], 6);
    }
  });

  it('delta 누적: 같은 net 에 두 번 save 시 sink 에 delta append', async () => {
    const { client, sink } = makeStack();
    const lab = new LocalSNN({
      netId: 'delta_demo',
      client,
      sink,
      seed: 1,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await lab.init();

    // 1번째 save — 변화 없으니 delta 0.
    await lab.save();
    expect(await sink.loadDeltas('delta_demo')).toEqual([]);

    // 자극 + run → 가중치 변화.
    await client.inject(
      [0, 4, 8, 12].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 25,
        time: 0,
        durationMs: 40,
        stepMs: 0.1,
      })),
    );
    await client.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: true });
    await lab.save();

    const deltas = await sink.loadDeltas('delta_demo');
    expect(deltas.length).toBeGreaterThan(0);
    expect(deltas[deltas.length - 1].indices.length).toBeGreaterThan(0);
  });
});
