// LocalSNN — FIX_REV_BASELINE reject path 검증 (PR-I).
//
// 사용자 catch 2026-05-09 (수평/수직 영역 다른 cluster winner 정정, 2026-05-10):
//   schema:2 + rev < FIX_REV_BASELINE 영역 weight 영역 stale lock-in 영역 reset
//   강제 — n13 mitigation (WTA inhibition -8.0 + STDP cap 25 + sqrt normalize)
//   적용 직전 영역 학습 weight 영역 폐기 path. caller 영역 toast
//   'fix-baseline-mismatch' 영역 발화 영역 사용자 영역 reset 사유 명시.
//
// B1: schema:2 + rev=75 (< FIX_REV_BASELINE=100) → reject + onStaleCacheReset
//     ('fix-baseline-mismatch') + onFreshBuild 1회.
// B2: schema:2 + rev=FIX_REV_BASELINE → restore (hydrate) path — anchor 정확
//     equality 영역 통과.
// B3: schema:2 + rev > FIX_REV_BASELINE → restore — 정상 hydrate path 보존.
// B4: fresh build 영역 rev: FIX_REV_BASELINE 영역 시작 — 다음 init 영역 통과 정합
//     (rev=0 영역 시작 영역 reject loop 회피).

import { describe, expect, it, vi } from 'vitest';

import {
  FIX_REV_BASELINE,
  LocalSNN,
  LocalStorageSink,
  SNNWorkerClient,
  SNNWorkerCore,
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

function makeStack(prefix = 'baseline_rev_test') {
  const core = new SNNWorkerCore();
  const client = new SNNWorkerClient(new InProcessTransport(core));
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix });
  return { core, client, storage, sink };
}

describe('LocalSNN — FIX_REV_BASELINE reject path (PR-I 2026-05-10)', () => {
  it('B1: schema:2 + rev < FIX_REV_BASELINE → onStaleCacheReset("fix-baseline-mismatch") + onFreshBuild', async () => {
    const { client: client1, sink } = makeStack('b1_stale');
    const netId = 'baseline_stale_rev';

    // 1차: fresh build → schema:2 topology + 정합 가중치 보존 (rev = FIX_REV_BASELINE).
    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57 });
    await lab1.init();

    // schema:2 topology 보존 정합 단 rev 영역 수동 downgrade (75 — pre-fix
    // 학습 영역 시뮬레이트). 가중치 길이 영역 정합 보존 (length-mismatch path
    // 영역 회피 — 본 test 영역 fix-baseline path 영역 isolated 검증).
    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();
    if (!persistedW) return;
    const downgraded: WeightSnapshot = {
      ...persistedW,
      rev: 75, // < FIX_REV_BASELINE (100).
    };
    await sink.saveWeights(downgraded);

    // 2차: 새 client + 같은 sink → reject path.
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
      onStaleCacheReset,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab2.init();

    expect(onStaleCacheReset).toHaveBeenCalledTimes(1);
    expect(onStaleCacheReset).toHaveBeenCalledWith('fix-baseline-mismatch');
    expect(onFreshBuild).toHaveBeenCalledTimes(1);
    expect(onHydrateLoaded).not.toHaveBeenCalled();
  });

  it('B2: schema:2 + rev=FIX_REV_BASELINE → restore (hydrate) — anchor equality 통과', async () => {
    const { client: client1, sink } = makeStack('b2_anchor');
    const netId = 'baseline_anchor_rev';

    // fresh build 영역 rev: FIX_REV_BASELINE 영역 시작 정합.
    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57 });
    await lab1.init();

    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();
    expect(persistedW!.rev).toBe(FIX_REV_BASELINE);

    // 2차 init → hydrate path (anchor equality 영역 통과).
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
      onStaleCacheReset,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab2.init();

    expect(onStaleCacheReset).not.toHaveBeenCalled();
    expect(onFreshBuild).not.toHaveBeenCalled();
    expect(onHydrateLoaded).toHaveBeenCalledTimes(1);
  });

  it('B3: schema:2 + rev > FIX_REV_BASELINE → restore — 정상 hydrate 보존', async () => {
    const { client: client1, sink } = makeStack('b3_above');
    const netId = 'baseline_above_rev';

    // 1차: fresh build + save 수회 → rev > FIX_REV_BASELINE.
    const lab1 = new LocalSNN({ netId, client: client1, sink, seed: 57 });
    await lab1.init();
    await lab1.save();
    await lab1.save();

    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();
    expect(persistedW!.rev).toBeGreaterThan(FIX_REV_BASELINE);

    // 2차 init → hydrate path 정합.
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
      onStaleCacheReset,
      onFreshBuild,
      onHydrateLoaded,
    });
    await lab2.init();

    expect(onStaleCacheReset).not.toHaveBeenCalled();
    expect(onFreshBuild).not.toHaveBeenCalled();
    expect(onHydrateLoaded).toHaveBeenCalledTimes(1);
  });

  it('B4: fresh build 영역 rev: FIX_REV_BASELINE 영역 시작 — reject loop 회피', async () => {
    const { client, sink } = makeStack('b4_fresh');
    const netId = 'fresh_baseline_anchor';

    const lab = new LocalSNN({ netId, client, sink, seed: 57 });
    await lab.init();

    const status = lab.status();
    expect(status.rev).toBe(FIX_REV_BASELINE);

    const persistedW = await sink.loadWeights(netId);
    expect(persistedW).not.toBeNull();
    expect(persistedW!.rev).toBe(FIX_REV_BASELINE);
  });
});
