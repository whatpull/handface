// snn-runtime/persistence 단위 테스트.
//
// 검증 포인트:
//  - 가중치 추출 / 적용 round-trip 무손실.
//  - delta 인코딩: 변화 인덱스만 보존 + apply 시 정합.
//  - LocalStorageSink: in-memory mock 으로 격리.
//  - PersistController: init → save → hydrate 플로우.

import { beforeEach, describe, expect, it } from 'vitest';

import {
  LocalStorageSink,
  NeuralNetwork,
  Neuron,
  applyWeightDelta,
  applyWeights,
  buildWeightSnapshot,
  createPersistController,
  diffWeightSnapshots,
  extractWeights,
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

function buildToyNet(): NeuralNetwork {
  const net = new NeuralNetwork({ defaultDtMs: 0.1 });
  net.addNeuron(new Neuron({ name: 'A' }));
  net.addNeuron(new Neuron({ name: 'B' }));
  net.addNeuron(new Neuron({ name: 'C' }));
  net.connect('A', 'B', 5.0);
  net.connect('B', 'C', 7.0);
  net.connect('A', 'C', 3.0);
  return net;
}

describe('snn-persistence — 가중치 추출/적용', () => {
  it('extractWeights 는 synapse 순서대로 가중치를 반환', () => {
    const net = buildToyNet();
    expect(extractWeights(net)).toEqual([5.0, 7.0, 3.0]);
  });

  it('applyWeights round-trip 은 무손실', () => {
    const net = buildToyNet();
    applyWeights(net, [1.5, 2.5, 3.5]);
    expect(extractWeights(net)).toEqual([1.5, 2.5, 3.5]);
  });

  it('길이 불일치 시 명시적 오류', () => {
    const net = buildToyNet();
    expect(() => applyWeights(net, [1, 2])).toThrow(/weight 수 불일치/);
  });
});

describe('snn-persistence — delta 인코딩', () => {
  it('변화 인덱스만 sparse 로 보존하고 apply 시 정합', () => {
    const net = buildToyNet();
    const prev = buildWeightSnapshot('toy', net, 0);
    applyWeights(net, [5.0, 7.0, 3.5]); // 마지막 synapse 만 변경
    const curr = buildWeightSnapshot('toy', net, 1);
    const delta = diffWeightSnapshots(prev, curr);

    expect(delta.indices).toEqual([2]);
    expect(delta.values).toEqual([3.5]);
    expect(delta.baseRev).toBe(0);
    expect(delta.rev).toBe(1);

    const reconstructed = applyWeightDelta(prev, delta);
    expect(reconstructed.weights).toEqual(curr.weights);
  });

  it('eps 미만 변화는 무시', () => {
    const net = buildToyNet();
    const prev = buildWeightSnapshot('toy', net, 0);
    applyWeights(net, [5.0 + 1e-12, 7.0, 3.0]); // 잡음 수준
    const curr = buildWeightSnapshot('toy', net, 1);
    const delta = diffWeightSnapshots(prev, curr, 1e-9);
    expect(delta.indices).toHaveLength(0);
  });

  it('rev mismatch 시 apply 거부', () => {
    const net = buildToyNet();
    const prev = buildWeightSnapshot('toy', net, 5);
    applyWeights(net, [5.0, 7.0, 99]);
    const curr = buildWeightSnapshot('toy', net, 6);
    const delta = diffWeightSnapshots(prev, curr);
    const wrongBase = { ...prev, rev: 999 };
    expect(() => applyWeightDelta(wrongBase, delta)).toThrow(/rev 불일치/);
  });
});

describe('snn-persistence — LocalStorageSink', () => {
  let storage: MemoryStorage;
  let sink: LocalStorageSink;

  beforeEach(() => {
    storage = new MemoryStorage();
    sink = new LocalStorageSink({ storage, prefix: 'test' });
  });

  it('topology / weights round-trip', async () => {
    const net = buildToyNet();
    const topo = net.snapshot();
    const w = buildWeightSnapshot('u1', net, 0);

    await sink.saveTopology('u1', topo);
    await sink.saveWeights(w);

    expect(await sink.loadTopology('u1')).toEqual(topo);
    expect(await sink.loadWeights('u1')).toEqual(w);
    expect(await sink.list()).toEqual(['u1']);
  });

  it('delta append + compact', async () => {
    const net = buildToyNet();
    const w0 = buildWeightSnapshot('u1', net, 0);

    for (let r = 1; r <= 10; r += 1) {
      applyWeights(net, [5.0, 7.0, 3.0 + r * 0.1]);
      const w = buildWeightSnapshot('u1', net, r);
      await sink.appendDelta(diffWeightSnapshots(w0, w));
    }
    const before = await sink.loadDeltas('u1');
    expect(before).toHaveLength(10);

    await sink.compact('u1', 3);
    const after = await sink.loadDeltas('u1');
    expect(after).toHaveLength(3);
    expect(after[2].rev).toBe(10);
  });

  it('remove 는 모든 키 + list 에서 제거', async () => {
    const net = buildToyNet();
    await sink.saveTopology('u1', net.snapshot());
    await sink.saveWeights(buildWeightSnapshot('u1', net, 0));
    await sink.appendDelta({
      schema: 1,
      netId: 'u1',
      baseRev: 0,
      rev: 1,
      savedAt: 0,
      indices: [0],
      values: [9],
    });

    await sink.remove('u1');
    expect(await sink.loadTopology('u1')).toBeNull();
    expect(await sink.loadWeights('u1')).toBeNull();
    expect(await sink.loadDeltas('u1')).toEqual([]);
    expect(await sink.list()).toEqual([]);
  });
});

describe('snn-persistence — PersistController', () => {
  it('init → save → hydrate 플로우는 가중치를 복원한다', async () => {
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'pc' });

    const net1 = buildToyNet();
    const ctrl1 = createPersistController({ netId: 'u', net: net1, sink });
    await ctrl1.init();
    expect(ctrl1.rev()).toBe(0);

    applyWeights(net1, [10, 20, 30]);
    const newRev = await ctrl1.save();
    expect(newRev).toBe(1);

    // 새 net 인스턴스로 hydrate.
    const net2 = buildToyNet();
    const ctrl2 = createPersistController({ netId: 'u', net: net2, sink });
    const ok = await ctrl2.hydrate();
    expect(ok).toBe(true);
    expect(extractWeights(net2)).toEqual([10, 20, 30]);
    expect(ctrl2.rev()).toBe(1);
  });

  it('변화 없으면 delta 누적 생략', async () => {
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'pc' });
    const net = buildToyNet();
    const ctrl = createPersistController({ netId: 'u', net, sink });
    await ctrl.init();
    await ctrl.save(); // 변화 없음
    expect(await sink.loadDeltas('u')).toEqual([]);
  });
});
