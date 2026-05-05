'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useHandControl, HAND_GESTURES, type LivePredictResult } from '@/lib/snn/use-hand-control';

interface Props {
  cameraConnected: boolean;
}

const OUT_LABELS: Record<string, string> = {
  out_0: 'Pointing', out_1: 'Open palm', out_2: 'Thumbs up', out_3: 'Victory',
};

// 카메라 노드 내부 #snn-cam-controls 에 portal 로 mount.
// ⏺ Train (4 gesture 단축 버튼) + ⏹ Live 토글 + winner inline 표시.
export default function CameraQuickControls({ cameraConnected }: Props) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const ctrl = useHandControl(cameraConnected);

  // host element polling — drawflow node mount 후 등장.
  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById('snn-cam-controls');
      if (el) setHost(el);
      else requestAnimationFrame(tick);
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
  const liveOn = ctrl.livePredict;
  const winner = ctrl.liveResult?.winner;
  const conf = ctrl.liveResult?.confidence ?? 0;

  return (
    <>
      {/* 상단 row — winner inline (Live ON 시) */}
      {liveOn && winner && (
        <div className="snn-cam-winner">
          <span className="snn-cam-winner-label">{OUT_LABELS[winner] || winner}</span>
          <span className="snn-cam-winner-conf">{(conf * 100).toFixed(0)}%</span>
        </div>
      )}

      {/* 하단 row — Train shortcuts + Live 토글 */}
      <div className="snn-cam-toolbar">
        <div className="snn-cam-train-group" title="Train as gesture">
          {HAND_GESTURES.map((g) => (
            <button
              key={g.id}
              type="button"
              disabled={disabled || !ctrl.hasHand || !!ctrl.busy}
              onClick={() => ctrl.train(g.id, g.out, g.label)}
              title={`Train as ${g.label}`}
              className={`snn-cam-btn ${ctrl.busy === g.id ? 'snn-cam-btn--busy' : ''}`}
            >
              {g.short}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => ctrl.setLivePredict(!liveOn)}
          title={liveOn ? 'Stop live predict' : 'Start live predict'}
          className={`snn-cam-btn snn-cam-btn--live ${liveOn ? 'snn-cam-btn--live-on' : ''}`}
        >
          {liveOn ? '⏹' : '⏺'}
        </button>
      </div>

      {ctrl.trainStatus && (
        <div className="snn-cam-status">{ctrl.trainStatus}</div>
      )}
    </>
  );
}

// LivePredictResult 의 unused warn 회피.
export type { LivePredictResult };
