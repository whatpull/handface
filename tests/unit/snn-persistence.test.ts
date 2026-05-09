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

// 사용자 catch 2026-05-09: localStorage quota exceeded 정합 — QuotaExceededError
// throw mock storage. setItem 영역 size 영역 limit 초과 시 DOMException 영역 throw.
class QuotaLimitedStorage {
  private store = new Map<string, string>();
  private currentBytes = 0;
  constructor(private maxBytes: number) {}
  getItem(k: string): string | null {
    return this.store.get(k) ?? null;
  }
  setItem(k: string, v: string): void {
    const prev = this.store.get(k);
    const delta = (v.length * 2) - (prev ? prev.length * 2 : 0); // UTF-16 ≈ 2 bytes
    if (this.currentBytes + delta > this.maxBytes) {
      const err = new Error(
        `Failed to execute 'setItem' on 'Storage': Setting the value of '${k}' exceeded the quota.`,
      ) as Error & { name: string; code: number };
      err.name = 'QuotaExceededError';
      err.code = 22;
      throw err;
    }
    this.store.set(k, v);
    this.currentBytes += delta;
  }
  removeItem(k: string): void {
    const prev = this.store.get(k);
    if (prev) this.currentBytes -= prev.length * 2;
    this.store.delete(k);
  }
  size(): number {
    return this.currentBytes;
  }
  keys(): string[] {
    return Array.from(this.store.keys());
  }
}

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

  // 사용자 catch 2026-05-09: localStorage quota exceeded 정합.
  it('quota exceeded 시 자체 netId delta wipe + retry — write 성공', async () => {
    // 600 bytes 영역 작은 quota (UTF-16 영역 300 chars).
    const limited = new QuotaLimitedStorage(600);
    const s = new LocalStorageSink({ storage: limited, prefix: 't' });
    // 100건 영역 delta 누적 — quota 영역 가득 채움.
    for (let r = 1; r <= 30; r += 1) {
      try {
        await s.appendDelta({
          schema: 1, netId: 'u1', baseRev: r - 1, rev: r, savedAt: 0,
          indices: [0, 1, 2], values: [1.1, 2.2, 3.3],
        });
      } catch { /* quota 영역 break — 영역 의도. */ break; }
    }
    // 작은 weights snapshot 영역 retry path 영역 동작 시 write 성공 정합.
    await s.saveWeights({
      schema: 1, netId: 'u1', rev: 1, t: 0, savedAt: 0, weights: [1, 2, 3],
    });
    expect(await s.loadWeights('u1')).not.toBeNull();
    // delta 영역 quota recovery 영역 wipe — 빈 array 정합.
    expect(await s.loadDeltas('u1')).toEqual([]);
  });

  it('quota exceeded 시 cross-netId delta wipe — fallback path', async () => {
    const limited = new QuotaLimitedStorage(800);
    const s = new LocalStorageSink({ storage: limited, prefix: 't' });
    // u1 영역 delta 영역 가득 채움.
    for (let r = 1; r <= 20; r += 1) {
      try {
        await s.appendDelta({
          schema: 1, netId: 'u1', baseRev: r - 1, rev: r, savedAt: 0,
          indices: [0, 1, 2, 3, 4], values: [1, 2, 3, 4, 5],
        });
      } catch { break; }
    }
    // u2 영역 weights write — u1 영역 delta wipe path 영역 catch 시점 영역 retry.
    await s.saveWeights({
      schema: 1, netId: 'u2', rev: 1, t: 0, savedAt: 0, weights: [9, 8, 7],
    });
    expect(await s.loadWeights('u2')).not.toBeNull();
  });

  it('saveTopology 는 동일 byte 영역 stored 시 redundant write 영역 skip', async () => {
    const net = buildToyNet();
    const topo = net.snapshot();
    let writeCount = 0;
    const tracking: MemoryStorage & { setItem: (k: string, v: string) => void } = (() => {
      const m = new MemoryStorage();
      const orig = m.setItem.bind(m);
      return Object.assign(m, {
        setItem(k: string, v: string) {
          if (k.endsWith(':topology')) writeCount += 1;
          orig(k, v);
        },
      });
    })();
    const s = new LocalStorageSink({ storage: tracking, prefix: 'idem' });
    await s.saveTopology('u1', topo);
    expect(writeCount).toBe(1);
    // 같은 topology 영역 다시 save → write skip (idempotent).
    await s.saveTopology('u1', topo);
    expect(writeCount).toBe(1);
    // 다른 topology 영역 새 write 발생.
    const net2 = buildToyNet();
    net2.connect('A', 'C', 99); // 추가 synapse → 다른 topology.
    await s.saveTopology('u1', net2.snapshot());
    expect(writeCount).toBe(2);
  });

  it('compact(0) 영역 deltas key 영역 명시 wipe', async () => {
    const net = buildToyNet();
    const w0 = buildWeightSnapshot('u1', net, 0);
    applyWeights(net, [5.0, 7.0, 99]);
    const w1 = buildWeightSnapshot('u1', net, 1);
    await sink.appendDelta(diffWeightSnapshots(w0, w1));
    expect(await sink.loadDeltas('u1')).toHaveLength(1);
    await sink.compact('u1', 0);
    expect(await sink.loadDeltas('u1')).toEqual([]);
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
