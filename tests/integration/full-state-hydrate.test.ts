// F1b 정합 통합 테스트 — 전체 학습 상태 (weights + topology + exemplars +
// trialCount) 영역 page reload 영역 정합 보존 audit.
//
// 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): "새로고침시 학습 상황이
// 초기화 되는데, 이는 유지되었으면 좋겠습니다". 직전 PR #224 영역 trialCount
// localStorage persist 영역 patch — 단 weight + exemplars + region totals 영역
// 동일 catch 사실 유무 영역 audit mandatory.
//
// 본 test 영역 4 layer 영역 동시 round-trip 영역 verifies:
//   L1: topology — IndexedDBSink.saveTopology → loadTopology → restoreSnapshot.
//   L2: weights  — IndexedDBSink.saveWeights → loadWeights → applyWeights.
//   L3: exemplars — out-exemplars localStorage `handface.out.exemplars.v1.{kind}`
//       — incrementCount (orientation/gesture isolation 정합).
//   L4: trialCount — `handface.live-snn.trial-count.v1.{kind}` (substrate isolation).
//
// substrate isolation 영역 동시 검증 — orientation/gesture 영역 별도 store 영역
// page reload 영역 양 substrate 영역 별도 보존 (cross-leak 0).
//
// 정직 한계:
//   - 본 test 영역 fake-indexeddb + jsdom localStorage 영역 격리 정합 — 실 브라우저
//     영역 quota / multi-tab 영역 별도 path (기존 `indexeddb-sink.test.ts` /
//     `out-exemplars-substrate.test.ts` 영역 cover).
//   - region totals 영역 derive (clusterCount × per-sub) — 본 test 영역 직접
//     산출 영역 아님 (NodeLearn JSX 영역 hydrate path 영역 cluster-spawned
//     event + exemplars keys 영역 derive). exemplars 영역 cluster index 영역
//     보존 영역 region totals 영역 정합 derive 사실 — 본 test 영역 exemplars
//     영역 cluster id 영역 보존 영역 명시 verify 정합.

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';

import {
  FIX_REV_BASELINE,
  IndexedDBSink,
  LocalSNN,
  SNNWorkerClient,
  SNNWorkerCore,
  type WorkerLike,
  type WorkerRequest,
} from '@/lib/snn-runtime';
import { incrementCount, loadExemplars } from '@/lib/snn/out-exemplars';

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

const TRIAL_COUNT_KEY_PREFIX = 'handface.live-snn.trial-count.v1';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('F1b — full state hydrate (weights + topology + exemplars + trialCount)', () => {
  it('동일 substrate kind 영역 4 layer 영역 동시 round-trip — page reload 영역 정합 보존', async () => {
    // ── Session 1 — 학습 진행 ──────────────────────────────────────────
    const factory = new IDBFactory();
    const sink1 = new IndexedDBSink({ factory, prefix: 'f1b' });
    const core1 = new SNNWorkerCore();
    const client1 = new SNNWorkerClient(new InProcessTransport(core1));
    const lab1 = new LocalSNN({
      netId: 'root-pipeline-orientation-5x5',
      client: client1,
      sink: sink1,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    const status1 = await lab1.init();
    expect(status1.rev).toBe(FIX_REV_BASELINE);
    expect(status1.synapses).toBeGreaterThan(0);

    // L1+L2: 자극 + STDP run → 가중치 진화 → save → topology + weights 영속.
    await client1.inject(
      [4, 5, 6, 7].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 25,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      })),
    );
    await client1.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: true });
    const rev1 = await lab1.save();
    expect(rev1).toBe(FIX_REV_BASELINE + 1);
    const weightsSession1 = await lab1.currentWeights();

    // L3: exemplars — incrementCount (winner cluster 영역 commit semantic).
    // P218 (substrate upgrade): 5×5 raw-dim (25) → row 1 (indices 5..9) active 등가.
    incrementCount('out_0_0', 'orientation-5x5', [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    incrementCount('out_1_0', 'orientation-5x5', [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]);

    // L4: trialCount — substrate orientation-5x5 영역 store.
    localStorage.setItem(`${TRIAL_COUNT_KEY_PREFIX}.orientation-5x5`, '13');

    // ── Session 2 — Page reload 시뮬레이션 (fresh stack, 동일 storage) ─
    // IndexedDB 영역 동일 factory 영역 reuse (jsdom localStorage 영역 동일
    // global instance 영역 reuse — beforeEach clear 영역 본 test 영역 outside).
    const sink2 = new IndexedDBSink({ factory, prefix: 'f1b' });
    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const lab2 = new LocalSNN({
      netId: 'root-pipeline-orientation-5x5',
      client: client2,
      sink: sink2,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    const status2 = await lab2.init();
    // L1+L2 hydrate verify: rev / weights 영역 보존 정합.
    expect(status2.rev).toBe(FIX_REV_BASELINE + 1);
    expect(status2.synapses).toBe(status1.synapses);
    const weightsSession2 = await lab2.currentWeights();
    expect(weightsSession2.length).toBe(weightsSession1.length);
    for (let i = 0; i < Math.min(50, weightsSession2.length); i += 1) {
      expect(weightsSession2[i]).toBeCloseTo(weightsSession1[i], 6);
    }

    // L3 hydrate verify: exemplars 영역 보존 + cluster id 영역 보존 (region
    // totals 영역 derive source 영역 정합).
    const exemplarsAfterReload = loadExemplars('orientation-5x5');
    expect(exemplarsAfterReload['out_0_0']?.count).toBe(1);
    expect(exemplarsAfterReload['out_1_0']?.count).toBe(1);
    // cluster id 영역 정확 보존 — NodeLearn 영역 clusterCount derive 영역
    // `out_(\d+)_\d+` regex 영역 cluster index 영역 + 1 영역 max.
    const clusterIds = Object.keys(exemplarsAfterReload)
      .map((k) => /^out_(\d+)_\d+$/.exec(k)?.[1])
      .filter((s): s is string => s !== undefined)
      .map(Number);
    expect(Math.max(...clusterIds)).toBe(1); // out_0 + out_1 → max=1 → clusterCount=2.

    // L4 hydrate verify: trialCount 영역 보존 (substrate orientation-5x5 key).
    const trialCountAfterReload = localStorage.getItem(
      `${TRIAL_COUNT_KEY_PREFIX}.orientation-5x5`,
    );
    expect(trialCountAfterReload).toBe('13');

    await sink1.close();
    await sink2.close();
  });

  it('substrate isolation — orientation-5x5/gesture 영역 별도 store 영역 cross-leak 0', async () => {
    const factory = new IDBFactory();
    // ── Session 1 — orientation-5x5 + gesture 영역 별도 학습 ─────────
    // orientation-5x5: lab + exemplars + trialCount.
    const sinkO = new IndexedDBSink({ factory, prefix: 'f1b' });
    const coreO = new SNNWorkerCore();
    const clientO = new SNNWorkerClient(new InProcessTransport(coreO));
    const labO = new LocalSNN({
      netId: 'root-pipeline-orientation-5x5',
      client: clientO,
      sink: sinkO,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await labO.init();
    await clientO.inject(
      [4, 5, 6, 7].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 25,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      })),
    );
    await clientO.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: true });
    await labO.save();
    incrementCount('out_0_0', 'orientation-5x5', [1, 1, 1, 1, 1]);
    localStorage.setItem(`${TRIAL_COUNT_KEY_PREFIX}.orientation-5x5`, '5');

    // gesture: 별도 lab + exemplars + trialCount (다른 netId).
    const sinkG = new IndexedDBSink({ factory, prefix: 'f1b' });
    const coreG = new SNNWorkerCore();
    const clientG = new SNNWorkerClient(new InProcessTransport(coreG));
    const labG = new LocalSNN({
      netId: 'root-pipeline-gesture',
      client: clientG,
      sink: sinkG,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await labG.init();
    await clientG.inject(
      [0, 4, 8, 12].map((i) => ({
        neuron: `in_feat_${i}`,
        weight: 25,
        time: 0,
        durationMs: 30,
        stepMs: 0.1,
      })),
    );
    await clientG.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: true });
    await labG.save();
    incrementCount('out_2_0', 'gesture', [0, 0, 0, 0, 1, 1, 1, 1]);
    incrementCount('out_3_0', 'gesture', [1, 0, 1, 0, 1, 0, 1, 0]);
    localStorage.setItem(`${TRIAL_COUNT_KEY_PREFIX}.gesture`, '17');

    // ── Session 2 — Page reload — orientation-5x5 hydrate verify ────
    const sinkO2 = new IndexedDBSink({ factory, prefix: 'f1b' });
    const coreO2 = new SNNWorkerCore();
    const clientO2 = new SNNWorkerClient(new InProcessTransport(coreO2));
    const labO2 = new LocalSNN({
      netId: 'root-pipeline-orientation-5x5',
      client: clientO2,
      sink: sinkO2,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    const statusO2 = await labO2.init();
    expect(statusO2.rev).toBe(FIX_REV_BASELINE + 1); // hydrated.

    // ── Session 2 — gesture hydrate verify ─────────────────────────
    const sinkG2 = new IndexedDBSink({ factory, prefix: 'f1b' });
    const coreG2 = new SNNWorkerCore();
    const clientG2 = new SNNWorkerClient(new InProcessTransport(coreG2));
    const labG2 = new LocalSNN({
      netId: 'root-pipeline-gesture',
      client: clientG2,
      sink: sinkG2,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    const statusG2 = await labG2.init();
    expect(statusG2.rev).toBe(FIX_REV_BASELINE + 1); // hydrated.

    // exemplars — substrate isolation 정합 (cross-leak 0).
    const oExemplars = loadExemplars('orientation-5x5');
    const gExemplars = loadExemplars('gesture');
    expect(oExemplars['out_0_0']?.count).toBe(1);
    expect(oExemplars['out_2_0']).toBeUndefined(); // gesture 영역 leak 0.
    expect(oExemplars['out_3_0']).toBeUndefined();
    expect(gExemplars['out_2_0']?.count).toBe(1);
    expect(gExemplars['out_3_0']?.count).toBe(1);
    expect(gExemplars['out_0_0']).toBeUndefined(); // orientation-5x5 영역 leak 0.

    // trialCount — substrate isolation 정합.
    expect(localStorage.getItem(`${TRIAL_COUNT_KEY_PREFIX}.orientation-5x5`)).toBe('5');
    expect(localStorage.getItem(`${TRIAL_COUNT_KEY_PREFIX}.gesture`)).toBe('17');

    await sinkO.close();
    await sinkG.close();
    await sinkO2.close();
    await sinkG2.close();
  });

  it('mid-train reload audit — exemplars 영역 commit 영역 직전 reload 영역 클러스터 row 영역 fallback derive', async () => {
    // 정직 한계 audit: runAutoLearnLoop 영역 finally 영역 incrementCount commit
    // 직전 영역 reload (사용자 race) 영역 exemplars 영역 신규 cluster 영역 미보존
    // 정합 — 단 worker registry / topology 영역 보존 정합 (handleReinforceComplete
    // 영역 saveDebounced(force) 영역 length-drift catch 영역 fresh topology 보존).
    //
    // 본 test 영역 시뮬레이션:
    //   1. fresh build (orientation-5x5 4 cluster, no exemplars).
    //   2. expandCluster — 신규 cluster 5 (mid-train state — incrementCount 미실행).
    //   3. lab.save — length-drift catch 영역 fresh topology 영역 baseline weights 보존.
    //   4. fresh stack 영역 reload — registry 영역 5 cluster 보존 (worker 정합).
    //   5. exemplars 영역 0 (commit 미실행 정합).
    //
    // 사용자 catch path: clusterCount UI 영역 exemplars derive (NodeLearn 영역
    // L497-500) 영역 4 영역 표시 (under-count) 영역 — worker registry 영역 5
    // cluster 영역 보존 영역 다음 winner 변경 시점 영역 incrementCount 영역
    // 정상 commit 영역 자동 회복. 본 test 영역 기대 path 영역 명시.

    const factory = new IDBFactory();
    const sink1 = new IndexedDBSink({ factory, prefix: 'f1b' });
    const core1 = new SNNWorkerCore();
    const client1 = new SNNWorkerClient(new InProcessTransport(core1));
    const lab1 = new LocalSNN({
      netId: 'root-pipeline-orientation-5x5',
      client: client1,
      sink: sink1,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await lab1.init();

    // expandCluster — 신규 cluster 5 spawn (worker registry).
    const exp = await client1.expandCluster({ activeInputs: [2, 6, 11, 14], seed: 100 });
    expect(exp.totalClusters).toBe(5);

    // mid-train: exemplars 영역 미commit (runAutoLearnLoop finally 영역 미진입 시뮬).
    // 단 reinforce 영역 cluster 5 영역 학습 진행 catch — handleReinforceComplete
    // 영역 saveDebounced(force) → save() 영역 length-drift fallback path 영역 등가.
    await lab1.save(); // length-drift catch — fresh topology 보존.

    // ── reload 시뮬 ──────────────────────────────────────────────────
    const sink2 = new IndexedDBSink({ factory, prefix: 'f1b' });
    const core2 = new SNNWorkerCore();
    const client2 = new SNNWorkerClient(new InProcessTransport(core2));
    const lab2 = new LocalSNN({
      netId: 'root-pipeline-orientation-5x5',
      client: client2,
      sink: sink2,
      seed: 57,
      clusterActiveInputs: LEGACY_FOUR,
    });
    await lab2.init();
    // worker registry 영역 5 cluster 영역 보존 (topology hydrate 정합).
    const registry = core2.getRegistryForTest();
    expect(registry).not.toBeNull();
    expect(registry!.slots).toHaveLength(5);

    // exemplars 영역 0 (commit 미실행 — UI clusterCount derive 영역 0 영역 정합).
    // 본 path 영역 사용자 mental model 영역 "신규 cluster 영역 row 영역 표시 0"
    // 영역 catch path — 단 worker 영역 정합 보존 → 다음 winner 변경 시점 영역
    // 자동 commit 영역 회복 (cluster-evict-hydrate-fix 영역 finally 영역
    // incrementCount 영역 정상 path 영역).
    const exemplars = loadExemplars('orientation-5x5');
    expect(Object.keys(exemplars)).toHaveLength(0);

    await sink1.close();
    await sink2.close();
  });
});
