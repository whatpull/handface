// Phase 3.9 v34 (2026-06-03) — production log throttle test.
//
// production 14:22 catch 정정: cosine + snn-diag 매 trigger 출력 → 32 trigger ×
// 2 line = 64 line 가독성 catch. v34 throttle: 변화 시점 + 매 10회 heartbeat.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: { on: vi.fn(() => () => undefined), expandCluster: vi.fn() },
    lab: { save: vi.fn(async () => 1) },
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-hand' as const,
  })),
  purgeAllLearningData: vi.fn(async () => {}),
}));
vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: vi.fn(),
  loadExemplars: vi.fn().mockReturnValue({}),
  setExemplarLabel: vi.fn(),
}));
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: vi.fn(),
  onBackendEvent: vi.fn(() => () => undefined),
}));

import { LiveSnn } from '@/lib/snn/live-snn';

function setupLiveWithClusters(count: number): LiveSnn {
  const FEATURES_KEY = 'handface.live-snn.hand-cluster-feats.v1';
  const features: Array<[number, number[]]> = [];
  for (let i = 0; i < count; i += 1) {
    const feat = new Array(95).fill(0.05);
    feat[i * 5] = 0.95;
    feat[i * 5 + 1] = 0.94;
    feat[i * 5 + 2] = 0.93;
    feat[i * 5 + 3] = 0.92;
    feat[i * 5 + 4] = 0.91;
    features.push([i, feat]);
  }
  window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
  const live = new LiveSnn();
  (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
  return live;
}

beforeEach(() => {
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('v34 production log throttle', () => {
  it('★ 동일 winner 연속 30회 → cosine 로그 4건 (첫 1 + 10/20/30 heartbeat)', () => {
    const live = setupLiveWithClusters(3);
    const liveAny = live as unknown as {
      _maybeRecordHandCosineWinner: (token: number, pattern: number[]) => void;
      _handCosineWinner: Map<number, unknown>;
    };
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // 동일 자세 (cluster 0 winner) 30회 반복.
    const feat = new Array(95).fill(0.05);
    feat[0] = 0.95; feat[1] = 0.94; feat[2] = 0.93; feat[3] = 0.92; feat[4] = 0.91;
    for (let t = 1; t <= 30; t += 1) {
      liveAny._maybeRecordHandCosineWinner(t, feat);
      liveAny._handCosineWinner.delete(t);
    }

    const cosineLogs = logSpy.mock.calls.filter((args) =>
      typeof args[0] === 'string' && (args[0] as string).startsWith('[hand-cosine]'),
    );
    // 1, 10, 20, 30 → 4 logs.
    expect(cosineLogs.length).toBe(4);
    // 10번째 이상 heartbeat suffix 표시.
    expect((cosineLogs[1][0] as string)).toContain('×10 연속');
    expect((cosineLogs[3][0] as string)).toContain('×30 연속');

    logSpy.mockRestore();
    live.dispose();
  });

  it('★ winner 변경 시 즉시 emit (streak reset)', () => {
    const live = setupLiveWithClusters(3);
    const liveAny = live as unknown as {
      _maybeRecordHandCosineWinner: (token: number, pattern: number[]) => void;
      _handCosineWinner: Map<number, unknown>;
    };
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // c0 winner 5회 → c1 winner 5회 → c0 winner 5회.
    const feat0 = new Array(95).fill(0.05);
    feat0[0] = 0.95; feat0[1] = 0.94; feat0[2] = 0.93; feat0[3] = 0.92; feat0[4] = 0.91;
    const feat1 = new Array(95).fill(0.05);
    feat1[5] = 0.95; feat1[6] = 0.94; feat1[7] = 0.93; feat1[8] = 0.92; feat1[9] = 0.91;

    let token = 0;
    for (let i = 0; i < 5; i += 1) { token += 1; liveAny._maybeRecordHandCosineWinner(token, feat0); liveAny._handCosineWinner.delete(token); }
    for (let i = 0; i < 5; i += 1) { token += 1; liveAny._maybeRecordHandCosineWinner(token, feat1); liveAny._handCosineWinner.delete(token); }
    for (let i = 0; i < 5; i += 1) { token += 1; liveAny._maybeRecordHandCosineWinner(token, feat0); liveAny._handCosineWinner.delete(token); }

    const cosineLogs = logSpy.mock.calls.filter((args) =>
      typeof args[0] === 'string' && (args[0] as string).startsWith('[hand-cosine]'),
    );
    // 첫 c0 (token 1) + 변경 c1 (token 6) + 변경 c0 (token 11) = 3 logs.
    expect(cosineLogs.length).toBe(3);
    expect((cosineLogs[0][0] as string)).toContain('token=1');
    expect((cosineLogs[1][0] as string)).toContain('token=6');
    expect((cosineLogs[2][0] as string)).toContain('token=11');

    logSpy.mockRestore();
    live.dispose();
  });

  it('★ 14:22 시나리오 시뮬: 23회 동일 winner → log 3건 (1, 10, 20)', () => {
    const live = setupLiveWithClusters(3);
    const liveAny = live as unknown as {
      _maybeRecordHandCosineWinner: (token: number, pattern: number[]) => void;
      _handCosineWinner: Map<number, unknown>;
    };
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const feat = new Array(95).fill(0.05);
    feat[0] = 0.95; feat[1] = 0.94; feat[2] = 0.93; feat[3] = 0.92; feat[4] = 0.91;
    for (let t = 1; t <= 23; t += 1) {
      liveAny._maybeRecordHandCosineWinner(t, feat);
      liveAny._handCosineWinner.delete(t);
    }

    const cosineLogs = logSpy.mock.calls.filter((args) =>
      typeof args[0] === 'string' && (args[0] as string).startsWith('[hand-cosine]'),
    );
    // production 영역 매 trigger 출력 → 23 logs.
    // v34 영역 1 (changed) + 10 + 20 = 3 logs.
    expect(cosineLogs.length).toBe(3);

    const ratio = 23 / cosineLogs.length;
    console.log(`  ✓ throttle ratio: ${ratio.toFixed(1)}× (직전 23 log → v34 ${cosineLogs.length} log)`);

    logSpy.mockRestore();
    live.dispose();
  });

  it('log state reset (resetTrigger) → 다음 trigger 첫 emit', () => {
    const live = setupLiveWithClusters(3);
    const liveAny = live as unknown as {
      _maybeRecordHandCosineWinner: (token: number, pattern: number[]) => void;
      _handCosineWinner: Map<number, unknown>;
      _handLogState: unknown;
    };
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const feat = new Array(95).fill(0.05);
    feat[0] = 0.95; feat[1] = 0.94; feat[2] = 0.93; feat[3] = 0.92; feat[4] = 0.91;

    liveAny._maybeRecordHandCosineWinner(1, feat);
    liveAny._handCosineWinner.delete(1);
    liveAny._maybeRecordHandCosineWinner(2, feat);
    liveAny._handCosineWinner.delete(2);

    // resetTrigger → log state null.
    live.resetTrigger();
    expect(liveAny._handLogState).toBeNull();

    // 다음 trigger — log state null 이라 changed=true → emit.
    // Reset 후 cluster features 도 wipe 라 _maybeRecordHandCosineWinner early return.
    // (cluster 없으니 emit 안 함 — 본 test 영역 state reset 검증만 정합.)
    logSpy.mockRestore();
    live.dispose();
  });
});
