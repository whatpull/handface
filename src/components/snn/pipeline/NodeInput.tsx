'use client';

// NodeInput — INPUT 노드 (orientation grid / camera 입력).
// path Y (2026-05-07): 4×4 픽셀 grid orientation 분류가 default. camera 는
// backward compat 으로 보존.
// camera mode: 기존 HandTrackerHost 의 video / skel / 16-feat bars 보존.
// grid mode: GridInput 컴포넌트 — 16 pixel toggle + 4 preset + R-STDP 학습 + 추론.
//
// HandTrackerHost 영역 mount 영역 selector (#snn-cam-video / #snn-cam-skel /
// .snn-feat-bars) 영역 보존 — camera mode 영역만 DOM 정합.

import { useEffect, useState } from 'react';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { FEATURE_LABELS } from '@/lib/mediapipe/feature-encoder';
import GridInput from './GridInput';
import NodeShell from './NodeShell';

type InputMode = 'camera' | 'grid';
const DEFAULT_MODE: InputMode = 'grid';

export default function NodeInput({ cameraConnected }: { cameraConnected: boolean }) {
  const [mode, setMode] = useState<InputMode>(DEFAULT_MODE);
  const [feat, setFeat] = useState<HandFeatureDetail | null>(null);

  useEffect(() => {
    if (mode !== 'camera') return;
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => setFeat(d));
    return off;
  }, [mode]);

  // tooltip 부여 — bars 영역 mount 후 1회 (camera mode 진입 시).
  useEffect(() => {
    if (mode !== 'camera') return;
    const bars = document.querySelectorAll<HTMLElement>('.snn-pipeline-input .snn-feat-bar');
    bars.forEach((bar, i) => { bar.title = FEATURE_LABELS[i] || `feat ${i}`; });
  }, [mode]);

  const gestureLine = feat
    ? (feat.hasHand
        ? (feat.gestureName ? `${feat.gestureName} (${((feat.gestureScore || 0) * 100).toFixed(0)}%)` : 'no gesture')
        : 'no hand')
    : (cameraConnected ? 'starting…' : 'camera off');

  return (
    <NodeShell title="INPUT" subtitle={mode === 'grid' ? '4×4 orientation' : 'camera input'} tone="input">
      <div className="snn-pipeline-input">
        <div className="snn-input-mode-toggle" role="tablist" aria-label="input mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'camera' ? 'true' : 'false'}
            className={`snn-input-mode-btn ${mode === 'camera' ? 'is-active' : ''}`}
            onClick={() => setMode('camera')}
          >
            camera
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'grid' ? 'true' : 'false'}
            className={`snn-input-mode-btn ${mode === 'grid' ? 'is-active' : ''}`}
            onClick={() => setMode('grid')}
          >
            grid
          </button>
        </div>

        {mode === 'camera' ? (
          <>
            {/* content-fit v4 — 카메라 미연결 영역 aspect 4/3 박스 폐기 → 1-line placeholder.
                연결 일부 4/3 video frame 영역 expand (사용자 catch "빈 영역 0"). */}
            <div className={`snn-pipeline-cam ${cameraConnected ? 'is-active' : 'is-empty'}`}>
              <video id="snn-cam-video" className="snn-camera-mirror snn-cam-video" playsInline muted />
              <canvas id="snn-cam-skel" className="snn-camera-mirror snn-cam-skel" width={640} height={480} />
              <div id="snn-cam-empty" className="snn-pipeline-cam-empty">
                <span>Camera off — enable from sidebar</span>
              </div>
            </div>
            <div className="snn-pipeline-row">
              <span className="snn-pipeline-row-label">gesture</span>
              <span className="snn-pipeline-row-value">{gestureLine}</span>
            </div>
            <div className="snn-pipeline-feat-wrap">
              <div className="snn-pipeline-feat-title">16-dim feature</div>
              <div className="snn-feat-bars snn-pipeline-feat-bars">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={i} className="snn-feat-bar" data-i={i}>
                    <div className="snn-feat-bar-fill" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <GridInput />
        )}
      </div>
    </NodeShell>
  );
}
