'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useHandControl, clearTrainingProgress, type LivePredictResult } from '@/lib/snn/use-hand-control';
import {
  loadExemplars, subscribeExemplars, clearExemplars, displayLabel,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import { getClient } from '@/lib/backend/client';
import { clearStoredSnapshot } from '@/lib/snn/auto-snapshot';

interface Props {
  cameraConnected: boolean;
}

// 자율 학습 인터페이스 — 사용자 클릭 0회.
// 손이 보이면 매 350ms STDP-on inject → winner 안정 발화 시 자동 강화 + exemplar 기록.
// chip 은 표시 전용. ↻ 는 패턴 전부 폐기 (재학습 시작).
export default function CameraQuickControls({ cameraConnected }: Props) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  // autoLive=true (표시), autoCapture=true (자율 학습).
  const ctrl = useHandControl(cameraConnected, true, true);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const tick = () => {
      if (cancelled) return;
      const el = document.querySelector<HTMLElement>('.snn-cam-controls');
      if (el) {
        setHost(el);
      } else if (attempts < 300) {
        attempts += 1;
        requestAnimationFrame(tick);
      }
    };
    tick();
    return () => { cancelled = true; };
  }, []);

  if (!host) return null;
  return createPortal(
    <CameraControlsBody ctrl={ctrl} disabled={!cameraConnected} />,
    host,
  );
}

interface BodyProps {
  ctrl: ReturnType<typeof useHandControl>;
  disabled: boolean;
}

function CameraControlsBody({ ctrl, disabled }: BodyProps) {
  const winnerKey = ctrl.liveResult?.winner ?? null;
  const conf = ctrl.liveResult?.confidence ?? 0;

  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars());
  useEffect(() => subscribeExemplars(setExemplars), []);

  // chip 표시: winner 가 있으면 그 OUT 의 라벨 + count, 없으면 상태.
  let chipMode: 'winner' | 'empty' | 'busy';
  let chipMain: string;
  let chipMeta: string | null = null;

  if (ctrl.busy) {
    chipMode = 'busy';
    chipMain = ctrl.trainStatus || 'Training…';
  } else if (winnerKey) {
    chipMode = 'winner';
    const ex = exemplars[winnerKey];
    chipMain = displayLabel(winnerKey, ex);
    chipMeta = `${(conf * 100).toFixed(0)}%`;
  } else {
    chipMode = 'empty';
    chipMain = ctrl.hasHand ? 'Discovering…' : 'No hand';
  }

  const onReset = async () => {
    if (disabled) return;
    if (!window.confirm('학습된 패턴을 모두 폐기하고 처음부터 다시 시작할까요?')) return;
    clearExemplars();
    clearStoredSnapshot();
    // state machine cluster frames + phase 영역도 폐기 — 'untrained' 영역 재진입.
    clearTrainingProgress();
    // 백엔드 회로도 baseline 으로 — weight 폭주 방지.
    await getClient().rebuildToBaseline().catch(() => null);
    // 페이지 reload — useHandControl ref/state 영역 초기화 (live re-mount 영역 단순화).
    if (typeof window !== 'undefined') window.location.reload();
  };

  return (
    <div className="snn-cam-toolbar">
      <div className={`snn-cam-chip snn-cam-chip--${chipMode}`}>
        <span className="snn-cam-chip-dot" aria-hidden />
        <span className="snn-cam-chip-label">{chipMain}</span>
        {chipMeta && <span className="snn-cam-chip-meta">{chipMeta}</span>}
      </div>
      <button
        type="button"
        className="snn-cam-btn snn-cam-btn--reset"
        disabled={disabled}
        onClick={onReset}
        title="Reset patterns — 학습된 OUT exemplar 전부 폐기 후 처음부터"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M2 6a4 4 0 1 0 1.2-2.83"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M2 2v3h3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export type { LivePredictResult };
