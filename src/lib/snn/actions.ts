// Toolbar / MobileBottomBar 가 공유하는 액션 핸들러 팩토리.
// status/setBusy 콜백은 호출자가 주입.

import { getClient } from '@/lib/backend/client';

const SNAPSHOT_KEY = 'handface.training.snapshot.v2';

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
    // Reset = 전체 회로 초기화 (누적 뉴런/시냅스 폐기 → base feature16 preset 만).
    // 학습된 weight + 추가된 region (Brain/Grow) 전부 손실.
    reset: () => run('Reset', async () => {
      if (!confirm(
        '회로를 초기 상태(feature16 preset)로 재구성합니다.\n\n' +
        '· 학습된 weight 모두 손실\n' +
        '· Brain Builder 로 추가한 region 모두 폐기\n\n계속할까요?',
      )) {
        h.status('cancelled');
        return;
      }
      const r = await getClient().rebuildToBaseline();
      h.status(r.ok ? '✓ Reset (feature16 preset)' : `✗ Reset: ${r.reason}`);
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
