// Toolbar / MobileBottomBar 가 공유하는 액션 핸들러 팩토리.
// status/setBusy 콜백은 호출자가 주입.

import { getClient } from '@/lib/backend/client';

const GESTURES = ['pointing', 'openpalm', 'thumbsup', 'victory'];
const SNAPSHOT_KEY = 'handface.training.snapshot.v1';

interface ActionHooks {
  setBusy: (label: string | null) => void;
  busy: string | null;
  status: (msg: string) => void;
  onStatsResult?: (data: unknown) => void;
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
    train: () => run('Train', async () => {
      const t0 = performance.now();
      // supervised 학습 — 3 trials × 4 gestures = 12 호출.
      const r = await getClient().trainCascade(GESTURES, 3, (done, total) => {
        const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
        h.status(`Train ${done}/${total}… (${elapsed}s)`);
      });
      const dt = ((performance.now() - t0) / 1000).toFixed(1);
      h.status(r.ok ? `✓ Train (${r.data.trained}/${r.data.total} trials, ${dt}s)` : `✗ Train: ${r.reason}`);
    }),

    eval: () => run('Eval', async () => {
      const t0 = performance.now();
      const r = await getClient().evalDecode(GESTURES, 2, (done, total) => {
        const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
        h.status(`Eval ${done}/${total}… (${elapsed}s)`);
      });
      if (!r.ok) { h.status(`✗ Eval: ${r.reason}`); return; }
      const { correct, total, accuracy } = r.data;
      h.status(`✓ Eval ${correct}/${total} (${(accuracy * 100).toFixed(0)}%)`);
    }),

    // Reset = 전체 회로 초기화 (누적 뉴런/시냅스 폐기 → base cortical preset 만).
    // 학습된 weight + 추가된 region (Brain/Grow) 전부 손실.
    reset: () => run('Reset', async () => {
      if (!confirm(
        '회로를 초기 상태(base cortical preset)로 재구성합니다.\n\n' +
        '· 학습된 weight 모두 손실\n' +
        '· Brain Builder 로 추가한 region 모두 폐기\n' +
        '· Grow 로 추가한 뉴런 모두 폐기\n\n계속할까요?',
      )) {
        h.status('cancelled');
        return;
      }
      const r = await getClient().rebuildToBaseline();
      h.status(r.ok ? '✓ Reset (base cortical preset)' : `✗ Reset: ${r.reason}`);
    }),

    save: () => run('Save', async () => {
      const r = await getClient().getSnapshot();
      if (!r.ok) { h.status(`✗ Save: ${r.reason}`); return; }
      const synapses = r.data.synapses ?? [];
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ synapses }));
      h.status(`✓ Saved (${synapses.length} synapses)`);
    }),

    load: () => run('Load', async () => {
      const raw = localStorage.getItem(SNAPSHOT_KEY);
      if (!raw) { h.status('✗ Load: 저장된 데이터 없음'); return; }
      const data = JSON.parse(raw);
      const synapses = data.synapses ?? [];
      const r = await getClient().loadSnapshot(synapses);
      h.status(r.ok ? `✓ Loaded (${synapses.length} synapses)` : `✗ Load: ${r.reason}`);
    }),

    exportCircuit: () => run('Export', async () => {
      const r = await getClient().getSnapshot();
      if (!r.ok) { h.status(`✗ Export: ${r.reason}`); return; }
      const blob = new Blob([JSON.stringify(r.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `handface-circuit-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      h.status(`✓ Exported (${r.data.synapses?.length ?? 0} synapses)`);
    }),

    importCircuit: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        run('Import', async () => {
          const text = await file.text();
          let data;
          try { data = JSON.parse(text); }
          catch { h.status('✗ Import: invalid JSON'); return; }
          const r = await getClient().importTopology(data);
          h.status(r.ok ? `✓ Imported (${data.synapses?.length ?? 0} synapses)` : `✗ Import: ${r.reason}`);
        });
      };
      input.click();
    },

    stats: () => run('Stats', async () => {
      const r = await getClient().getStats();
      if (!r.ok) { h.status(`✗ Stats: ${r.reason}`); return; }
      h.onStatsResult?.(r.data);
      h.status('✓ Stats opened');
    }),
  };
}
