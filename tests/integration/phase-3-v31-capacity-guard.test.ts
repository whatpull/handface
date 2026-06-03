// Phase 3.9 v31 (2026-06-03) — orientation-hand MAX_CLUSTERS = 19 + capacity event.
//
// 직전 hand substrate cap = 8 (else branch fallback) — v30 measurement 검증
// 결과 19 까지 안전 (95-dim × 5 active disjoint).
// v31: hand substrate 19 cap 확장 + spawn 차단 시 hand-sync-status 'failed'
//      + error='capacity' emit → UI 가 amber pill "최대 N 자세 도달" 표시.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  const emittedEvents: Array<{ type: string; detail: unknown }> = [];
  const exemplarsMock: Record<string, { label?: string; feature?: number[] }> = {};
  return {
    reset: () => {
      workerClusters = [];
      emittedEvents.length = 0;
      for (const k of Object.keys(exemplarsMock)) delete exemplarsMock[k];
    },
    setExemplarsCount: (count: number) => {
      for (const k of Object.keys(exemplarsMock)) delete exemplarsMock[k];
      for (let c = 0; c < count; c += 1) {
        exemplarsMock[`out_${c}_0`] = { label: `pose_${c}`, feature: new Array(95).fill(0.5) };
      }
    },
    getEmittedEvents: () => emittedEvents,
    getCapacityFailedEvents: () =>
      emittedEvents.filter((e) => {
        if (e.type !== 'hand-sync-status') return false;
        const d = e.detail as { phase?: string; error?: string };
        return d.phase === 'failed' && (d.error?.includes('capacity') ?? false);
      }),
    mockClient: {
      expandCluster: vi.fn(async (p: { activeInputs: number[]; forceDisjoint?: boolean }) => {
        const id = workerClusters.length;
        workerClusters.push({ activeInputs: p.activeInputs });
        return { newClusterId: id, totalClusters: workerClusters.length, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs };
      }),
      triggerBackground: vi.fn(async () => null),
      reinforceBackground: vi.fn(async () => null),
      clusterPoolUsage: vi.fn(async () => ({
        inputDim: 95,
        totalClaimedFeatures: workerClusters.reduce((s, c) => s + c.activeInputs.length, 0),
        perCluster: workerClusters.map((c, i) => ({ clusterId: i, subPoolSize: c.activeInputs.length, activeInputs: c.activeInputs })),
        overlapMatrix: [],
      })),
      clusterTrainRStdp: vi.fn(async () => ({})),
      regionFiringRates: vi.fn(async () => ({})),
      on: vi.fn(() => () => undefined),
    },
    mockSave: vi.fn(async () => 1),
    mockIncrementCount: vi.fn(),
    onBackendEvent: vi.fn(() => () => undefined),
    emitBackendEvent: vi.fn((type: string, detail: unknown) => {
      emittedEvents.push({ type, detail });
    }),
    exemplarsMock,
  };
});

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: mocks.mockClient as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lab: { save: mocks.mockSave } as any,
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-hand' as const,
  })),
  purgeAllLearningData: vi.fn(async () => {}),
}));
vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: mocks.mockIncrementCount,
  loadExemplars: vi.fn(() => mocks.exemplarsMock),
  setExemplarLabel: vi.fn(),
}));
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: mocks.emitBackendEvent,
  onBackendEvent: mocks.onBackendEvent,
}));
vi.mock('@/components/ui/Toast', () => ({
  showToast: vi.fn(),
}));

import { LiveSnn } from '@/lib/snn/live-snn';

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v31 — orientation-hand MAX_CLUSTERS = 19', () => {
  it('★ hand substrate 18 자세 → 19번째 spawn 허용 (한계 미도달)', async () => {
    mocks.setExemplarsCount(18);
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as { runAutoLearnLoop: (token: number, ai: number[]) => Promise<void> };

    // 19번째 spawn 시도.
    await liveAny.runAutoLearnLoop(1, [50, 51, 52, 53, 54]);

    // capacity 이벤트 없음 (18 < 19).
    expect(mocks.getCapacityFailedEvents()).toHaveLength(0);

    live.dispose();
  });

  it('★ hand substrate 19 자세 도달 → 20번째 spawn 차단 + capacity event emit', async () => {
    mocks.setExemplarsCount(19);
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as { runAutoLearnLoop: (token: number, ai: number[]) => Promise<void> };

    // 20번째 spawn 시도 — 차단.
    await liveAny.runAutoLearnLoop(1, [50, 51, 52, 53, 54]);

    // capacity event 정확 1회 emit.
    const capEvents = mocks.getCapacityFailedEvents();
    expect(capEvents).toHaveLength(1);
    const detail = capEvents[0].detail as { phase: string; restoredFeatures: number; error: string };
    expect(detail.phase).toBe('failed');
    expect(detail.restoredFeatures).toBe(19);
    expect(detail.error).toContain('19 자세');

    console.log(`  ✓ 19 자세 도달 시 spawn 차단 + capacity event emit`);

    live.dispose();
  });

  it('grid substrate 영향 없음 (8 cap 유지)', async () => {
    // grid 모드 (orientation-6x6) — 8 cap (직전 default).
    mocks.setExemplarsCount(8);
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-6x6';
    const liveAny = live as unknown as { runAutoLearnLoop: (token: number, ai: number[]) => Promise<void> };

    await liveAny.runAutoLearnLoop(1, [10, 11, 12, 13, 14]);

    // hand-sync-status capacity event 없음 (grid substrate).
    expect(mocks.getCapacityFailedEvents()).toHaveLength(0);

    live.dispose();
  });
});
