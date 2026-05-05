// 커뮤니티 weight baseline 자동 적용 — 페이지 로드 직후 1회.
// 모든 사용자의 학습이 D1 에 누적 → 평균 weight → 신규 사용자가 "이미 학습된" 회로로 시작.
// 적용 순서: ensureNetwork → applyCommunityBaselineOnce → restoreSnapshotOnce(local) → render.
// local snapshot 이 community 보다 우선 (사용자 본인 학습이 더 가치 있음).

import { getClient } from '@/lib/backend/client';

const APPLIED_KEY = 'handface.community.applied.v1';
const MIN_CONTRIBUTORS = 1;

let applyingOnce = false;
let appliedThisSession = false;

export interface CommunityApplyResult {
  applied: boolean;
  count: number;
  reason?: string;
}

// 한 번 적용했으면 sessionStorage 마킹 — 새로고침마다 적용. localStorage 의 user snapshot 이
// 그 위에 다시 덮어씌우므로 user 학습이 사라지지 않음.
export async function applyCommunityBaselineOnce(): Promise<CommunityApplyResult> {
  if (appliedThisSession || applyingOnce) {
    return { applied: false, count: 0, reason: 'already-applied-in-session' };
  }
  applyingOnce = true;
  try {
    const r = await getClient().fetchCommunityWeights(MIN_CONTRIBUTORS);
    if (!r.ok) return { applied: false, count: 0, reason: r.reason };
    const synapses = r.data.synapses ?? [];
    if (synapses.length === 0) {
      appliedThisSession = true;
      return { applied: false, count: 0, reason: 'empty-aggregate' };
    }
    const load = await getClient().loadSnapshot(
      synapses.map((s) => ({ pre: s.pre, post: s.post, weight: s.weight })),
      { silent: true },
    );
    if (!load.ok) return { applied: false, count: 0, reason: load.reason };
    appliedThisSession = true;
    try {
      sessionStorage.setItem(APPLIED_KEY, JSON.stringify({
        at: Date.now(),
        count: synapses.length,
      }));
    } catch { /* noop */ }
    return { applied: true, count: synapses.length };
  } finally {
    applyingOnce = false;
  }
}

// 기여 — 학습된 weight 를 커뮤니티에 업로드. 호출자가 책임 (예: Save 시 옵션).
export async function contributeWeightsToCommunity(
  contributorId?: string | null,
): Promise<{ ok: boolean; inserted?: number; reason?: string }> {
  const r = await getClient().contributeWeights(contributorId ?? null);
  if (!r.ok) return { ok: false, reason: r.reason };
  return { ok: true, inserted: r.data.inserted };
}
