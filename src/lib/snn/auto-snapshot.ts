// 학습 weight 자동 영구화 (localStorage).
// - training-changed 이벤트 → debounced save
// - 페이지 로드 시 자동 restore (네트워크 ensure 후 1회)
// - networkId rotation (HF Spaces ephemeral container 영역 stale → 새 network) 시점 →
//   ensureNetwork 영역 자동 loadSnapshot chain (client.ts 정합).
// - 명시 wipe 영역 'training-cleared' 영역만 — 'circuit-changed' 영역 자동 wipe 폐기.

import { getClient } from '@/lib/backend/client';
import { onBackendEvent } from '@/lib/backend/events';

// v2: feature16 preset (in_feat_0..15) 도입 — v1 (in_pinch 등 8-INPUT) snapshot 은
// 시냅스 pre/post 이름이 다르므로 자동 폐기.
const KEY = 'handface.training.snapshot.v2';
const KEY_LEGACY_V1 = 'handface.training.snapshot.v1';
const DEBOUNCE_MS = 1500;
const VERSION = 2;

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
  // 커뮤니티 자동 기여 — 사용자 학습이 누적될수록 baseline 향상.
  // 실패해도 로컬 save 는 유효. 비차단.
  try {
    const cid = getOrCreateContributorId();
    void getClient().contributeWeights(cid).catch(() => null);
  } catch { /* noop */ }
}

const CID_KEY = 'handface.community.contributor.id';
function getOrCreateContributorId(): string {
  if (typeof window === 'undefined') return 'anon';
  try {
    let v = localStorage.getItem(CID_KEY);
    if (!v) {
      v = `c_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
      localStorage.setItem(CID_KEY, v);
    }
    return v;
  } catch {
    return 'anon';
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
  return restoreFromStorage();
}

// localStorage stored snapshot → backend loadSnapshot (silent).
// ensureNetwork 영역 새 networkId 생성 path 영역 직접 호출 — restoredOnce gate 영역 우회.
// HF Spaces ephemeral 영역 networkId rotation 영역 weight 자동 복원 catch path.
export async function restoreFromStorage(): Promise<{ restored: boolean; count: number }> {
  if (typeof window === 'undefined') return { restored: false, count: 0 };
  // v1 stale 자동 청소 (8-INPUT 회로용 — 16-INPUT 회로와 호환 안 됨).
  try { localStorage.removeItem(KEY_LEGACY_V1); } catch { /* noop */ }
  const raw = localStorage.getItem(KEY);
  if (!raw) return { restored: false, count: 0 };
  try {
    const stored = JSON.parse(raw) as StoredSnapshot;
    if (!stored || stored.version !== VERSION) return { restored: false, count: 0 };
    if (!Array.isArray(stored.synapses) || stored.synapses.length === 0) {
      return { restored: false, count: 0 };
    }
    const r = await getClient().loadSnapshot(stored.synapses, { silent: true });
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
  // 명시 wipe 영역만 stored 폐기 — Toolbar Reset / rebuildToBaseline 영역 emit.
  // (직전 'circuit-changed' 자동 wipe 영역 폐기 — networkId rotation / Import / loadSnapshot
  //  영역 자동 wipe 발생 영역 영역 학습 weight 영역 영역 영역 catch path.)
  onBackendEvent('training-cleared', () => {
    clearStoredSnapshot();
  });
}
