// Toolbar / MobileBottomBar 가 공유하는 액션 핸들러 팩토리.
// status/setBusy 콜백은 호출자가 주입.

import { getClient } from '@/lib/backend/client';
import { emitBackendEvent } from '@/lib/backend/events';

const SNAPSHOT_KEY = 'handface.training.snapshot.v2';
const CLUSTER_FRAMES_KEY = 'handface.cluster.frames.v1';
const TRAINING_PHASE_KEY = 'handface.training.phase.v1';
const OUT_EXEMPLARS_KEY = 'handface.out.exemplars.v1';
const NETWORK_KEY = 'handface.network.id';

interface ActionHooks {
  setBusy: (label: string | null) => void;
  busy: string | null;
  status: (msg: string) => void;
}

export function createActions(h: ActionHooks) {
  const run = async (label: string, fn: () => Promise<void> | void) => {
    if (h.busy) return;
    h.setBusy(label);
    h.status(`${label}…`);
    try { await fn(); }
    catch (e) { h.status(`✗ ${label}: ${(e as Error).message}`); }
    finally { h.setBusy(null); }
  };

  return {
    // Reset = 전체 회로 초기화 + LEARN 학습 데이터 폐기 (사용자 catch 2026-05-05).
    // 학습된 weight + cluster frame counter + training phase + snapshot 모두 폐기.
    reset: () => run('Reset', async () => {
      if (!confirm(
        '회로 초기화 + LEARN 학습 데이터 폐기.\n\n' +
        '· 학습된 weight 모두 손실\n' +
        '· cluster 학습 frame counter 0\n' +
        '· UNTRAINED phase 복귀\n\n계속할까요?',
      )) {
        h.status('cancelled');
        return;
      }
      // 1. backend 회로 baseline 재구성.
      const r = await getClient().rebuildToBaseline();
      // 2. frontend localStorage 영역 학습 state 폐기 (OUT 결과값 + cached networkId 영역).
      try {
        localStorage.removeItem(SNAPSHOT_KEY);
        localStorage.removeItem(CLUSTER_FRAMES_KEY);
        localStorage.removeItem(TRAINING_PHASE_KEY);
        localStorage.removeItem(OUT_EXEMPLARS_KEY);
        localStorage.removeItem(NETWORK_KEY);
      } catch { /* quota / private mode — silent. */ }
      // 사용자 catch 2026-05-06: out-exemplars-changed event emit — NodeOut 즉시 반영.
      window.dispatchEvent(new CustomEvent('handface:out-exemplars-changed'));
      // 3. training-cleared event emit — auto-snapshot listener 영역 정합.
      emitBackendEvent('training-cleared', undefined);
      h.status(r.ok ? '✓ Reset 완료 — 학습 데이터 폐기, 다시 학습 가능' : `✗ Reset: ${r.reason}`);
      // 4. circuit-changed 영역 PipelineCanvas remount + useHandControl phase reload.
      emitBackendEvent('circuit-changed', undefined);
    }),

    save: () => run('Save', async () => {
      const r = await getClient().getSnapshot();
      if (!r.ok) { h.status(`✗ Save: ${r.reason}`); return; }
      const synapses = r.data.synapses ?? [];
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ synapses }));
      h.status(`✓ Saved (${synapses.length} synapses)`);
    }),
  };
}
