// SNN Worker RPC 단위 테스트.
//
// 실제 Worker 없이 in-process mock transport 로 핸들러 ↔ 클라이언트 통신을
// 검증. SNNWorkerCore 의 동작이 protocol 준수 + 에러 전파 + state mutation
// 모두 정합한지 확인.
//
// Fix #20 (2026-05-10): zero-init dynamic — default build (clusterActiveInputs
// 미지정) 영역 INPUT 16 영역만. 본 테스트 영역 LEGACY 4-cluster 영역 explicit
// pass — 'build' helper 영역 catch.

import { describe, expect, it } from 'vitest';

import {
  SNNWorkerClient,
  SNNWorkerCore,
  type WorkerLike,
  type WorkerRequest,
} from '@/lib/snn-runtime';

const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

// in-process transport — postMessage 를 직접 core 에 전달하고 즉시 응답을
// dispatch. async 흐름은 Promise resolve 시점이 microtask 로 옮겨지지만
// 핵심 동작 검증에는 충분.
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

function makeClient(): { client: SNNWorkerClient; core: SNNWorkerCore } {
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  return { client, core };
}

describe('snn-worker — build + 기본 RPC', () => {
  it('build 시 N13 토폴로지 결과 반환 + core 에 net 보유', async () => {
    const { client, core } = makeClient();
    const r = await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    expect(r.preset).toBe('n13_orientation');
    expect(r.outClusters).toBe(4);
    expect(r.outTotal).toBe(32);
    expect(r.inputDim).toBe(32);
    expect(r.neuronsAdded).toBeGreaterThan(800);
    expect(core.getNetForTest()).not.toBeNull();
  });

  it('build 전에 다른 RPC 호출 시 에러 reject', async () => {
    const { client } = makeClient();
    await expect(client.run({ durationMs: 10 })).rejects.toThrow(/build/);
  });

  it('알 수 없는 preset 은 명시적 에러', async () => {
    const { client } = makeClient();
    await expect(
      // @ts-expect-error 의도적으로 잘못된 preset.
      client.build({ preset: 'unknown', seed: 1 }),
    ).rejects.toThrow(/preset/);
  });
});

describe('snn-worker — 가중치 / snapshot', () => {
  it('extract 후 applyWeights 는 round-trip', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    const w = await client.extractWeights();
    const modified = w.map((x) => x + 0.001);
    await client.applyWeights(modified);
    const w2 = await client.extractWeights();
    for (let i = 0; i < w.length; i += 1) {
      expect(w2[i]).toBeCloseTo(modified[i], 6);
    }
  });

  it('길이 mismatch 시 applyWeights 거부', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await expect(client.applyWeights([1, 2, 3])).rejects.toThrow(/weight 수/);
  });

  // PR fix/live-mode-time-and-restore — Fix 2: schema 1 → 2 bump.
  // 사용자 catch 2026-05-12 (snapshot-activeinputs-persist): schema 2 → 3 bump
  //   + clusterActiveInputs round-trip 보존. registry 영역 build 영역 등록 시점
  //   영역 schema 3 영역 upgrade (worker-core handleSnapshot 정합).
  it('snapshot 은 NetworkSnapshot schema=3 반환 (NMDA + homeostatic + clusterActiveInputs 보존)', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    const { snapshot } = await client.snapshot();
    expect(snapshot.schema).toBe(3);
    expect(snapshot.neurons.length).toBeGreaterThan(800);
    expect(snapshot.synapses.length).toBeGreaterThan(0);
    // v2 신규 필드 영역 직렬화 catch 영역 검증 (n13 영역 NMDA + homeostatic 영역
    // 모든 excitatory neuron 영역 enable).
    const nmdaCount = snapshot.neurons.filter(
      (n) => 'nmdaEnabled' in n && n.nmdaEnabled,
    ).length;
    expect(nmdaCount).toBeGreaterThan(400);
    const homeoCount = snapshot.neurons.filter(
      (n) => 'homeostaticEnabled' in n && n.homeostaticEnabled,
    ).length;
    expect(homeoCount).toBeGreaterThan(400);
    // v3 신규 필드 영역 clusterActiveInputs 영역 round-trip 보존 catch.
    expect(snapshot.clusterActiveInputs).toEqual(LEGACY_FOUR);
  });
});

describe('snn-worker — 시뮬레이션 + 발화율', () => {
  it('inject + run 후 firingRates prefix 로 cluster 별 fire 조회', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });

    // cluster 0 active inputs (default = [4,5,6,7]) 에 강 자극.
    await client.inject(
      [4, 5, 6, 7].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 25,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      })),
    );
    const r = await client.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: false });
    expect(r.t).toBeCloseTo(50, 1);

    const { rates } = await client.firingRates({
      prefixes: ['in_feat_'],
      windowMs: 50,
    });
    expect(rates.length).toBeGreaterThan(0);
    // 4 active input 은 sustained 자극 받았으니 발화율 > 0 기대.
    const hzMap = new Map(rates.map((x) => [x.name, x.hz]));
    expect(hzMap.get('in_feat_4')).toBeGreaterThan(0);
  });

  it('reset 후 build 재호출 가능', async () => {
    const { client, core } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    await client.reset();
    expect(core.getNetForTest()).toBeNull();
    await client.build({ preset: 'n13_orientation', seed: 2, clusterActiveInputs: LEGACY_FOUR });
    expect(core.getNetForTest()).not.toBeNull();
  });
});

describe('snn-worker — ART 동적 cluster expansion', () => {
  it('expandCluster 는 새 cluster slot 추가 + total 증가', async () => {
    const { client, core } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    const before = core.getRegistryForTest()!.slots.length;
    const r = await client.expandCluster({ activeInputs: [2, 6, 11, 14], seed: 100 });
    expect(r.totalClusters).toBe(before + 1);
    expect(r.newClusterId).toBe(before);
    expect(r.activeInputs).toEqual([2, 6, 11, 14]);
    expect(r.neuronsAdded).toBeGreaterThan(0);
    expect(r.synapsesAdded).toBeGreaterThan(0);
    expect(core.getRegistryForTest()!.slots.length).toBe(before + 1);
  });

  it('expandCluster 후 clusterFiringRates 가 새 cluster 도 포함', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await client.expandCluster({ activeInputs: [2, 6, 11, 14], seed: 1 });
    const cfr = await client.clusterFiringRates({ windowMs: 50, layer: 'OUT' });
    expect(cfr.rates).toHaveLength(5);
    expect(cfr.layer).toBe('OUT');
  });

  it('build 전 expandCluster 호출 시 명시적 에러', async () => {
    const { client } = makeClient();
    await expect(client.expandCluster({ activeInputs: [0, 1, 2, 3] })).rejects.toThrow(/build/);
  });

  it('activeInputs 비어있으면 거부', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    await expect(client.expandCluster({ activeInputs: [] })).rejects.toThrow(/activeInputs/);
  });
});

describe('snn-worker — clusterFiringRates', () => {
  it('layer 별 평균 발화율 + winner / share / margin 산출', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    const r = await client.clusterFiringRates({ windowMs: 50 });
    expect(r.rates).toHaveLength(4);
    expect(r.layer).toBe('OUT');
    expect(r.share).toBeGreaterThanOrEqual(0);
    expect(r.share).toBeLessThanOrEqual(1);
    expect(r.margin).toBeGreaterThanOrEqual(0);
    expect(r.margin).toBeLessThanOrEqual(1);
  });

  it('V1_L23 layer 도 동일 형식 반환', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    const r = await client.clusterFiringRates({ windowMs: 50, layer: 'V1_L23' });
    expect(r.rates).toHaveLength(4);
    expect(r.layer).toBe('V1_L23');
  });
});

describe('snn-worker — clusterTrainRStdp (R-STDP 감독 학습)', () => {
  it('정답 cluster pattern 학습 시 trained / accuracy 반환', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    const pattern = new Array(16).fill(0);
    [4, 5, 6, 7].forEach((i) => (pattern[i] = 1));
    const r = await client.clusterTrainRStdp({
      patterns: [pattern, pattern, pattern],
      targetCluster: 0,
      observeMs: 30,
      stimulusDurationMs: 20,
    });
    expect(r.trained).toBe(3);
    expect(r.targetCluster).toBe(0);
    expect(r.clusterRatesHistory).toHaveLength(3);
    expect(r.winnerHistory).toHaveLength(3);
    expect(r.accuracy).toBeGreaterThanOrEqual(0);
    expect(r.accuracy).toBeLessThanOrEqual(1);
  });

  it('build 전 호출 시 명시적 에러', async () => {
    const { client } = makeClient();
    await expect(
      client.clusterTrainRStdp({
        patterns: [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        targetCluster: 0,
      }),
    ).rejects.toThrow(/build/);
  });

  it('targetCluster 범위 밖이면 거부', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    await expect(
      client.clusterTrainRStdp({
        patterns: [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        targetCluster: 99,
      }),
    ).rejects.toThrow(/targetCluster/);
  });

  it('pattern 비어있어도 trained=0 / accuracy=0 반환', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    const r = await client.clusterTrainRStdp({ patterns: [], targetCluster: 0 });
    expect(r.trained).toBe(0);
    expect(r.correct).toBe(0);
    expect(r.accuracy).toBe(0);
  });
});

describe('snn-worker — restoreSnapshot 토폴로지 복원', () => {
  it('snapshot → restoreSnapshot 은 위상 + 가중치 + cluster 슬롯 보존', async () => {
    const a = makeClient();
    await a.client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
    await a.client.expandCluster({ activeInputs: [2, 6, 11, 14], seed: 1 });
    const beforeRegistry = a.core.getRegistryForTest()!;
    expect(beforeRegistry.slots).toHaveLength(5);
    const beforeWeights = await a.client.extractWeights();
    const { snapshot } = await a.client.snapshot();

    // 새 client 로 restoreSnapshot.
    const b = makeClient();
    const r = await b.client.restoreSnapshot({ snapshot });
    expect(r.totalClusters).toBe(5);
    expect(r.neurons).toBe(snapshot.neurons.length);
    expect(r.synapses).toBe(snapshot.synapses.length);

    const afterRegistry = b.core.getRegistryForTest()!;
    expect(afterRegistry.slots).toHaveLength(5);

    // 가중치도 동일해야 함 (snapshot 안에 weights 포함).
    const afterWeights = await b.client.extractWeights();
    expect(afterWeights).toHaveLength(beforeWeights.length);
    for (let i = 0; i < Math.min(50, afterWeights.length); i += 1) {
      expect(afterWeights[i]).toBeCloseTo(beforeWeights[i], 6);
    }
  });

  it('restoreSnapshot 후 clusterFiringRates 가 추론된 슬롯 수를 반영', async () => {
    const a = makeClient();
    await a.client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    await a.client.expandCluster({ activeInputs: [0, 1, 2, 3], seed: 2 });
    await a.client.expandCluster({ activeInputs: [12, 13, 14, 15], seed: 3 });
    const { snapshot } = await a.client.snapshot();

    const b = makeClient();
    await b.client.restoreSnapshot({ snapshot });
    const r = await b.client.clusterFiringRates({ windowMs: 50, layer: 'OUT' });
    expect(r.rates).toHaveLength(6); // 4 base + 2 expanded.
  });
});

describe('snn-worker — 전송 라이프사이클', () => {
  it('dispose 는 pending 을 reject 하고 listener 정리', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    // pending 만들기 위해 send 를 시작한 직후 dispose.
    const pending = client.run({ durationMs: 10 });
    client.dispose();
    // 동기 dispose 는 listener 만 정리. pending 은 reject.
    await expect(pending).rejects.toThrow(/disposed/);
  });

  it('id 는 단조증가, 응답 매칭 무결', async () => {
    const { client } = makeClient();
    await client.build({ preset: 'n13_orientation', seed: 1, clusterActiveInputs: LEGACY_FOUR });
    const a = client.extractWeights();
    const b = client.extractWeights();
    const c = client.snapshot();
    const [ra, rb, rc] = await Promise.all([a, b, c]);
    expect(ra.length).toBe(rb.length);
    expect(rc.snapshot.synapses.length).toBe(ra.length);
  });
});
