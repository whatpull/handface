// restoreFromStorage 영역 검증 — localStorage key 정합 + JSON parse / quota / corruption.
//
// 정직 한계 박음:
//  - getClient() 영역 mock 영역 — 실제 backend fetch 영역 영역. loadSnapshot 영역
//    success path 영역만 cover — backend 4xx/5xx 영역 별도 통합 영역 영역.

import { describe, it, expect, vi, beforeEach } from 'vitest';

type MockResult = { ok: true; data: unknown } | { ok: false; reason: string };

const mockLoadSnapshot = vi.fn<(...args: unknown[]) => Promise<MockResult>>(
  async () => ({ ok: true, data: { restored: true } }),
);
const mockGetSnapshot = vi.fn<(...args: unknown[]) => Promise<MockResult>>(
  async () => ({ ok: true, data: { synapses: [] } }),
);
const mockContributeWeights = vi.fn<(...args: unknown[]) => Promise<MockResult>>(
  async () => ({ ok: true, data: null }),
);

vi.mock('@/lib/backend/client', () => ({
  getClient: () => ({
    loadSnapshot: mockLoadSnapshot,
    getSnapshot: mockGetSnapshot,
    contributeWeights: mockContributeWeights,
  }),
}));

vi.mock('@/lib/backend/events', () => ({
  onBackendEvent: vi.fn(),
}));

const KEY = 'handface.training.snapshot.v2';
const KEY_LEGACY_V1 = 'handface.training.snapshot.v1';

beforeEach(() => {
  localStorage.clear();
  mockLoadSnapshot.mockClear();
  mockGetSnapshot.mockClear();
  mockContributeWeights.mockClear();
});

describe('restoreFromStorage — localStorage key + parse 정합', () => {
  it('returns { restored: false, count: 0 } when key absent', async () => {
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    const r = await restoreFromStorage();
    expect(r).toEqual({ restored: false, count: 0 });
    expect(mockLoadSnapshot).not.toHaveBeenCalled();
  });

  it('returns { restored: false } when synapses array is empty', async () => {
    localStorage.setItem(KEY, JSON.stringify({
      version: 2,
      savedAt: Date.now(),
      synapses: [],
    }));
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    const r = await restoreFromStorage();
    expect(r.restored).toBe(false);
    expect(mockLoadSnapshot).not.toHaveBeenCalled();
  });

  it('returns { restored: false } when version mismatch', async () => {
    localStorage.setItem(KEY, JSON.stringify({
      version: 1,
      savedAt: Date.now(),
      synapses: [{ pre: 'a', post: 'b', weight: 0.5 }],
    }));
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    const r = await restoreFromStorage();
    expect(r.restored).toBe(false);
    expect(mockLoadSnapshot).not.toHaveBeenCalled();
  });

  it('handles corrupted JSON gracefully (no throw)', async () => {
    localStorage.setItem(KEY, '{ not valid json');
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    const r = await restoreFromStorage();
    expect(r).toEqual({ restored: false, count: 0 });
  });

  it('passes synapses to loadSnapshot when valid + emits silent flag', async () => {
    const synapses = [
      { pre: 'in_feat_0', post: 'cluster_0_0', weight: 0.7 },
      { pre: 'in_feat_1', post: 'cluster_1_0', weight: 0.5 },
    ];
    localStorage.setItem(KEY, JSON.stringify({
      version: 2,
      savedAt: Date.now(),
      synapses,
    }));
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    const r = await restoreFromStorage();
    expect(r).toEqual({ restored: true, count: 2 });
    expect(mockLoadSnapshot).toHaveBeenCalledWith(synapses, { silent: true });
  });

  it('auto-cleans legacy v1 key on every restore', async () => {
    localStorage.setItem(KEY_LEGACY_V1, JSON.stringify({ stale: 'data' }));
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    await restoreFromStorage();
    expect(localStorage.getItem(KEY_LEGACY_V1)).toBeNull();
  });

  it('returns false when loadSnapshot fails', async () => {
    mockLoadSnapshot.mockResolvedValueOnce({ ok: false, reason: 'backend down' });
    localStorage.setItem(KEY, JSON.stringify({
      version: 2,
      savedAt: Date.now(),
      synapses: [{ pre: 'a', post: 'b', weight: 0.1 }],
    }));
    const { restoreFromStorage } = await import('@/lib/snn/auto-snapshot');
    const r = await restoreFromStorage();
    expect(r.restored).toBe(false);
  });
});

describe('clearStoredSnapshot', () => {
  it('removes the v2 key from localStorage', async () => {
    localStorage.setItem(KEY, JSON.stringify({ version: 2, savedAt: 0, synapses: [] }));
    const { clearStoredSnapshot } = await import('@/lib/snn/auto-snapshot');
    clearStoredSnapshot();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('is idempotent (no throw when key absent)', async () => {
    const { clearStoredSnapshot } = await import('@/lib/snn/auto-snapshot');
    expect(() => clearStoredSnapshot()).not.toThrow();
  });
});
