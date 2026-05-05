// 학습 weight 자동 영구화 (localStorage).
// - training-changed / circuit-changed 이벤트 → debounced save
// - 페이지 로드 시 자동 restore (네트워크 ensure 후 1회)

import { getClient } from '@/lib/backend/client';
import { onBackendEvent } from '@/lib/backend/events';

const KEY = 'handface.training.snapshot.v1';
const DEBOUNCE_MS = 1500;
const VERSION = 1;

interface StoredSnapshot {
  version: number;
  savedAt: number;
  synapses: Array<{ pre: string; post: string; weight: number }>;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

async function saveNow(): Promise<void> {
  const r = await getClient().getSnapshot();
  if (!r.ok) return;
  const synapses = r.data.synapses ?? [];
  if (synapses.length === 0) return;
  try {
    const stored: StoredSnapshot = {
      version: VERSION,
      savedAt: Date.now(),
      synapses,
    };
    localStorage.setItem(KEY, JSON.stringify(stored));
  } catch (e) {
    console.warn('[auto-snapshot] save failed:', e);
  }
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { saveNow(); }, DEBOUNCE_MS);
}

let restoredOnce = false;

// 페이지 로드 직후 1회 호출 — 네트워크 ensure 후 stored snapshot 적용.
export async function restoreSnapshotOnce(): Promise<{ restored: boolean; count: number }> {
  if (restoredOnce) return { restored: false, count: 0 };
  restoredOnce = true;
  if (typeof window === 'undefined') return { restored: false, count: 0 };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { restored: false, count: 0 };
  try {
    const stored = JSON.parse(raw) as StoredSnapshot;
    if (!stored || stored.version !== VERSION) return { restored: false, count: 0 };
    if (!Array.isArray(stored.synapses) || stored.synapses.length === 0) {
      return { restored: false, count: 0 };
    }
    const r = await getClient().loadSnapshot(stored.synapses);
    if (!r.ok) return { restored: false, count: 0 };
    return { restored: true, count: stored.synapses.length };
  } catch (e) {
    console.warn('[auto-snapshot] restore failed:', e);
    return { restored: false, count: 0 };
  }
}

// rebuildToBaseline (Reset) 호출 시 stored snapshot 도 폐기 (다음 페이지 로드 시 stale 적용 방지).
export function clearStoredSnapshot() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}

// 이벤트 구독 1회 install — Editor mount 시.
let installed = false;
export function installAutoSnapshot() {
  if (installed) return;
  installed = true;
  // 학습 완료 이벤트 → debounced save.
  onBackendEvent('training-changed', () => scheduleSave());
  // 회로 자체가 바뀐 케이스 (Reset / BrainBuilder / Import 등) → 학습이 무효화된 것이므로
  // 다음 학습 후에 다시 save 되도록 stored 폐기.
  onBackendEvent('circuit-changed', () => clearStoredSnapshot());
}
