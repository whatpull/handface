// Toolbar / MobileBottomBar 가 공유하는 액션 핸들러 팩토리.
// status/setBusy 콜백은 호출자가 주입.

import { getClient } from '@/lib/backend/client';
import { emitBackendEvent } from '@/lib/backend/events';
import { showDialog } from '@/components/ui/Dialog';

const SNAPSHOT_KEY = 'handface.training.snapshot.v2';
const CLUSTER_FRAMES_KEY = 'handface.cluster.frames.v1';
const TRAINING_PHASE_KEY = 'handface.training.phase.v1';
// Fix 3 (LOW): v2 key — use-hand-control.ts P209 schema 변경 정합.
const TRAINING_PHASE_KEY_V2 = 'handface.training.phase.v2';
const PATTERN_COUNT_KEY = 'handface.pattern.count.v1';
const LAST_ACTION_KEY = 'handface.last.action.v1';
const OUT_EXEMPLARS_KEY = 'handface.out.exemplars.v1';
// orientation-only exemplar key (카메라/gesture 제거 2026-05-14).
const OUT_EXEMPLARS_ORIENTATION_KEY = 'handface.out.exemplars.v1.orientation';
const NETWORK_KEY = 'handface.network.id';
// settings keys — 절대 삭제 금지 (endpoint / apiKey 보존).
// const ENDPOINT_KEY = 'handface.settings.endpoint';
// const APIKEY_KEY   = 'handface.settings.apikey';

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
    // 전체 리셋 (P(4) 2026-05-14):
    //   네트워크 rebuild + 학습 state 초기화 + OUT exemplar 초기화 + gesture label map 초기화.
    //   settings (endpoint/apiKey) localStorage key 는 절대 건드리지 않음.
    reset: () => {
      showDialog({
        kind: 'confirm',
        title: '전체 리셋',
        message:
          '· 학습된 weight 모두 손실\n' +
          '· OUT 패턴 exemplar 초기화\n' +
          '· UNTRAINED phase 복귀\n' +
          '· 설정(endpoint/API키)은 유지됩니다\n\n계속할까요?',
        confirmLabel: '전체 리셋',
        cancelLabel: '취소',
        onConfirm: () => {
          void run('전체 리셋', async () => {
            // localStorage 학습 state 폐기 (settings 제외).
            try {
              localStorage.removeItem(SNAPSHOT_KEY);
              localStorage.removeItem(CLUSTER_FRAMES_KEY);
              localStorage.removeItem(TRAINING_PHASE_KEY);
              // Fix 3 (LOW): v2 key + patternCount/lastAction key — use-hand-control.ts P209.
              localStorage.removeItem(TRAINING_PHASE_KEY_V2);
              localStorage.removeItem(PATTERN_COUNT_KEY);
              localStorage.removeItem(LAST_ACTION_KEY);
              // legacy single-key exemplar (migration 이전 path).
              localStorage.removeItem(OUT_EXEMPLARS_KEY);
              // orientation exemplar key.
              localStorage.removeItem(OUT_EXEMPLARS_ORIENTATION_KEY);
              localStorage.removeItem(NETWORK_KEY);
            } catch { /* quota / private mode — silent. */ }
            // out-exemplars-changed event — NodeOut 즉시 반영.
            window.dispatchEvent(new CustomEvent('handface:out-exemplars-changed:orientation', { detail: {} }));
            // training-cleared event emit — auto-snapshot listener 영역 정합.
            emitBackendEvent('training-cleared', undefined);
            h.status('✓ 전체 리셋 완료 — 학습 데이터 폐기, 다시 학습 가능');
            // circuit-changed 영역 PipelineCanvas remount + useHandControl phase reload.
            emitBackendEvent('circuit-changed', undefined);
          });
        },
        onCancel: () => {
          h.status('cancelled');
        },
      });
    },

    save: () => run('Save', async () => {
      const r = await getClient().getSnapshot();
      if (!r.ok) { h.status(`✗ Save: ${r.reason}`); return; }
      const synapses = r.data.synapses ?? [];
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ synapses }));
      h.status(`✓ Saved (${synapses.length} synapses)`);
    }),
  };
}
