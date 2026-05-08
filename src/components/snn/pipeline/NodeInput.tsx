'use client';

// NodeInput — INPUT 노드. mode toggle (grid / camera).
// path Y' rev15 (research-v1.0) 영역 4×4 grid orientation 영역 default.
// 사용자 catch 2026-05-08 (gesture validation): camera mode 부활 — MediaPipe
// + sharpenForGesture + GESTURE_CLUSTER_ACTIVE_INPUTS substrate.
//
// HandTrackerHost 영역 mount selector (#snn-cam-video / #snn-cam-skel) 영역
// camera mode 영역만 DOM 영역 정합.

import { useEffect, useState } from 'react';
import { emitBackendEvent, type InputModeDetail } from '@/lib/backend/events';
import GridInput from './GridInput';
import CameraInput from './CameraInput';
import NodeShell from './NodeShell';

type InputMode = 'grid' | 'camera';
const DEFAULT_MODE: InputMode = 'grid';

export default function NodeInput({ cameraConnected }: { cameraConnected: boolean }) {
  const [mode, setMode] = useState<InputMode>(DEFAULT_MODE);

  useEffect(() => {
    emitBackendEvent<InputModeDetail>('input-mode', { mode });
  }, [mode]);

  return (
    <NodeShell
      title="INPUT"
      subtitle={mode === 'grid' ? '4×4 orientation' : 'camera gesture'}
      tone="input"
    >
      <div className="snn-pipeline-input">
        <div className="snn-input-mode-toggle" role="tablist" aria-label="input mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'grid' ? 'true' : 'false'}
            className={`snn-input-mode-btn ${mode === 'grid' ? 'is-active' : ''}`}
            onClick={() => setMode('grid')}
          >
            grid
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'camera' ? 'true' : 'false'}
            className={`snn-input-mode-btn ${mode === 'camera' ? 'is-active' : ''}`}
            onClick={() => setMode('camera')}
          >
            camera
          </button>
        </div>
        {mode === 'grid' ? <GridInput /> : <CameraInput cameraConnected={cameraConnected} />}
      </div>
    </NodeShell>
  );
}
