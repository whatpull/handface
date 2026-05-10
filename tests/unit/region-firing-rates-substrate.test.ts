// region-firing-rates substrate prefix matching 단위 테스트.
//
// QA FINDING-1 (HIGH, 2026-05-10): worker-core handleRegionFiringRates 영역
// prefix 영역 대문자 'V1_L4_E_' / 'V2_L5_E_' 영역 hardcoded — 실 substrate
// neuron 명 영역 소문자 (`v1_L4_E_*`, `v2_L5_E_*` — n13-orientation.ts:83-93).
// case-sensitive `startsWith` mismatch → 매 호출 `count=0, hz=0` 반환 →
// fallback proxy 영역 silent failure (Fix 5 무력화).
//
// 본 test 영역 실 substrate (n13_orientation) build 후 regionFiringRates RPC
// 영역 호출 — `neuronCount > 0` 영역 검증 (prefix 매칭 사실 보장).
// 기존 live-snn-emit / snn-worker test 영역 mock-only 영역 본 substrate-level
// regression 영역 catch 0 (test gap).
//
// T1: V1 region — V1_L4E (128) + V1_L23E (128) = 256 neuron 매칭.
// T2: V2 region — V2_L4E (128) + V2_L23E (96) + V2_L5E (64) = 288 neuron 매칭.
// T3: V1_L23 region — V1_L23E (128) neuron 매칭 (cluster firing 정합).
// T4: V2_L5 region — V2_L5E (64) neuron 매칭 (cluster firing 정합).
// T5: OUT region — 4 cluster × 8 = 32 neuron 매칭 (변경 0 — sanity check).
// T6: SEC-8 defensive — 미정의 region 영역 silent { hz: 0, neuronCount: 0 }
//     반환 (worker crash 회피).

import { describe, expect, it } from 'vitest';

import {
  N13Pools,
  SNNWorkerClient,
  SNNWorkerCore,
  type WorkerLike,
  type WorkerRequest,
} from '@/lib/snn-runtime';

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

// Fix #20 (2026-05-10): zero-init dynamic — LEGACY 4-cluster 영역 explicit pass.
const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

async function makeBuiltClient(): Promise<SNNWorkerClient> {
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  await client.build({ preset: 'n13_orientation', seed: 57, clusterActiveInputs: LEGACY_FOUR });
  return client;
}

describe('regionFiringRates — substrate prefix 매칭 (FINDING-1 regression)', () => {
  it('T1: V1 region 영역 V1_L4E + V1_L23E neuron 매칭 (count > 0)', async () => {
    const client = await makeBuiltClient();
    const r = await client.regionFiringRates({ region: 'V1', windowMs: 100 });
    expect(r.region).toBe('V1');
    // n13-orientation.ts:83 (`v1_L4_E_${i}`) + line 87 (`v1_L23_E_${i}`)
    // 정합 — 대문자 prefix → 소문자 prefix mismatch fix 검증.
    expect(r.neuronCount).toBe((N13Pools.V1_L4_PER_SUB + N13Pools.V1_L23_PER_SUB) * 4);
    expect(r.neuronCount).toBeGreaterThan(0);
    expect(Number.isFinite(r.hz)).toBe(true);
  });

  it('T2: V2 region 영역 V2_L4E + V2_L23E + V2_L5E neuron 매칭', async () => {
    const client = await makeBuiltClient();
    const r = await client.regionFiringRates({ region: 'V2', windowMs: 100 });
    expect(r.region).toBe('V2');
    expect(r.neuronCount).toBe(
      (N13Pools.V2_L4_PER_SUB + N13Pools.V2_L23_PER_SUB + N13Pools.V2_L5_PER_SUB) * 4,
    );
    expect(r.neuronCount).toBeGreaterThan(0);
  });

  it('T3: V1_L23 region 영역 V1_L23E neuron 매칭 (cluster firing 정합)', async () => {
    const client = await makeBuiltClient();
    const r = await client.regionFiringRates({ region: 'V1_L23', windowMs: 100 });
    expect(r.neuronCount).toBe(N13Pools.V1_L23_PER_SUB * 4);
    expect(r.neuronCount).toBeGreaterThan(0);
  });

  it('T4: V2_L5 region 영역 V2_L5E neuron 매칭 (cluster firing 정합)', async () => {
    const client = await makeBuiltClient();
    const r = await client.regionFiringRates({ region: 'V2_L5', windowMs: 100 });
    expect(r.neuronCount).toBe(N13Pools.V2_L5_PER_SUB * 4);
    expect(r.neuronCount).toBeGreaterThan(0);
  });

  it('T5: OUT region 영역 32 neuron 매칭 (sanity — out_ prefix 변경 0)', async () => {
    const client = await makeBuiltClient();
    const r = await client.regionFiringRates({ region: 'OUT', windowMs: 100 });
    expect(r.neuronCount).toBe(N13Pools.OUT_PER_CLUSTER * 4);
    expect(r.neuronCount).toBe(32);
  });

  it('T6: SEC-8 defensive — 미정의 region 영역 silent { hz: 0 } 반환', async () => {
    const client = await makeBuiltClient();
    // TypeScript 영역 region literal union 영역 — 실 runtime hostile region
    // (e.g. malformed payload from compromised renderer) 영역 catch 영역 cast.
    const r = await client.regionFiringRates({
      region: 'HOSTILE_UNKNOWN' as 'V1',
      windowMs: 100,
    });
    expect(r.neuronCount).toBe(0);
    expect(r.hz).toBe(0);
    // worker crash 0 — Promise resolve 사실 (throw 영역 reject 검증 0).
  });
});
