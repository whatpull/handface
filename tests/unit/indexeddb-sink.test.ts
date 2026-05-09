// IndexedDBSink 단위 테스트.
//
// 사용자 catch 2026-05-09 (CRITICAL — quota 잔존 정정):
//   LocalStorageSink → IndexedDBSink swap 정합 검증.
//   fake-indexeddb 영역 isolated factory 영역 inject — 영역 테스트 영역
//   격리 (DB_NAME 영역 동일 영역 cross-test 영역 leak 영역 catch path).

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';

import {
  IndexedDBSink,
  NeuralNetwork,
  Neuron,
  buildWeightSnapshot,
} from '@/lib/snn-runtime';

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

describe('IndexedDBSink — round-trip', () => {
  let factory: IDBFactory;
  let sink: IndexedDBSink;

  beforeEach(() => {
    // 매 테스트 영역 fresh factory — 영역 cross-test leak 영역 catch.
    factory = new IDBFactory();
    sink = new IndexedDBSink({ factory, prefix: 'test' });
  });

  afterEach(async () => {
    await sink.close();
  });

  it('topology 영역 round-trip — saveTopology + loadTopology 정합', async () => {
    const net = buildToyNet();
    const topo = net.snapshot();
    await sink.saveTopology('u1', topo);
    const loaded = await sink.loadTopology('u1');
    expect(loaded).toEqual(topo);
  });

  it('weights 영역 round-trip — saveWeights + loadWeights 정합', async () => {
    const net = buildToyNet();
    const w = buildWeightSnapshot('u1', net, 0);
    await sink.saveWeights(w);
    const loaded = await sink.loadWeights('u1');
    expect(loaded).toEqual(w);
  });

  it('appendDelta + loadDeltas — 누적 list 영역 보존', async () => {
    await sink.appendDelta({
      schema: 1, netId: 'u1', baseRev: 0, rev: 1, savedAt: 0,
      indices: [0], values: [1.5],
    });
    await sink.appendDelta({
      schema: 1, netId: 'u1', baseRev: 1, rev: 2, savedAt: 0,
      indices: [1, 2], values: [2.5, 3.5],
    });
    const list = await sink.loadDeltas('u1');
    expect(list).toHaveLength(2);
    expect(list[0].rev).toBe(1);
    expect(list[1].rev).toBe(2);
    expect(list[1].indices).toEqual([1, 2]);
  });

  it('list — saveTopology / saveWeights 후 netId 영역 추적', async () => {
    const net = buildToyNet();
    await sink.saveTopology('u1', net.snapshot());
    await sink.saveWeights(buildWeightSnapshot('u2', net, 0));
    const ids = await sink.list();
    expect(ids).toContain('u1');
    expect(ids).toContain('u2');
    expect(ids).toHaveLength(2);
  });

  it('compact — keepLastN 영역 trim', async () => {
    for (let r = 1; r <= 10; r += 1) {
      await sink.appendDelta({
        schema: 1, netId: 'u1', baseRev: r - 1, rev: r, savedAt: 0,
        indices: [0], values: [r],
      });
    }
    expect(await sink.loadDeltas('u1')).toHaveLength(10);
    await sink.compact('u1', 3);
    const after = await sink.loadDeltas('u1');
    expect(after).toHaveLength(3);
    expect(after[2].rev).toBe(10);
  });

  it('compact(0) — deltas 영역 명시 wipe', async () => {
    await sink.appendDelta({
      schema: 1, netId: 'u1', baseRev: 0, rev: 1, savedAt: 0,
      indices: [0], values: [1],
    });
    expect(await sink.loadDeltas('u1')).toHaveLength(1);
    await sink.compact('u1', 0);
    expect(await sink.loadDeltas('u1')).toEqual([]);
  });

  it('remove — 모든 store + list 영역 cleanup', async () => {
    const net = buildToyNet();
    await sink.saveTopology('u1', net.snapshot());
    await sink.saveWeights(buildWeightSnapshot('u1', net, 0));
    await sink.appendDelta({
      schema: 1, netId: 'u1', baseRev: 0, rev: 1, savedAt: 0,
      indices: [0], values: [9],
    });

    await sink.remove('u1');
    expect(await sink.loadTopology('u1')).toBeNull();
    expect(await sink.loadWeights('u1')).toBeNull();
    expect(await sink.loadDeltas('u1')).toEqual([]);
    expect(await sink.list()).toEqual([]);
  });

  it('대용량 weights — localStorage quota 초과 영역 size 영역 round-trip', async () => {
    // 직전 catch — n13 substrate ~28k synapse + topology JSON ~3MB 영역
    // localStorage 영역 quota 영역 trigger. IndexedDB 영역 동일 size 영역
    // round-trip 영역 정합 사실.
    const big = new Array(30_000).fill(0).map((_, i) => i / 100);
    const snap = {
      schema: 1 as const,
      netId: 'big',
      rev: 1,
      t: 0,
      savedAt: 0,
      weights: big,
    };
    await sink.saveWeights(snap);
    const loaded = await sink.loadWeights('big');
    expect(loaded).not.toBeNull();
    expect(loaded!.weights).toHaveLength(30_000);
    expect(loaded!.weights[15_000]).toBeCloseTo(150, 6);
  });
});
