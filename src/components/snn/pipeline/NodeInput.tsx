'use client';

// NodeInput — INPUT 노드. GRID + CAMERA tab (Phase 3.2, 2026-06-03).
// Phase 3.3 (2026-06-03) — input-mode event emit 추가:
//   tab change 시 emitBackendEvent('input-mode', {mode}) →
//   live-snn substrate switch ('orientation-6x6' ↔ 'orientation-hand').
//
// 정직 한계:
//   - CAMERA tab 영역 webcam preview + landmark visualization 영역 (Phase 3.2).
//   - 학습 trigger (hand landmarks → 75-dim feature 영역 triggerWithVigilance)
//     영역 Phase 3.4 영역 영역.
//   - 사용자 webcam permission deny 시 CameraInput 영역 안내 message 영역.

import { useEffect, useState } from 'react';
import { emitBackendEvent, type InputModeDetail } from '@/lib/backend/events';
import CameraInput from './CameraInput';
import GridInput from './GridInput';
import NodeShell from './NodeShell';

type InputTab = 'grid' | 'camera';

export default function NodeInput() {
  const [activeTab, setActiveTab] = useState<InputTab>('grid');

  // Phase 3.3 (2026-06-03) — tab change 시 input-mode event 영역 emit.
  // live-snn 영역 listener 영역 substrate 영역 자동 switch.
  useEffect(() => {
    emitBackendEvent<InputModeDetail>('input-mode', {
      mode: activeTab === 'camera' ? 'camera' : 'grid',
    });
  }, [activeTab]);

  // aria-selected 영역 변수 추출 + boolean type — ESLint jsx-a11y/aria-proptypes
  // 영역 inline ternary expression catch 회피.
  const gridSelected: boolean = activeTab === 'grid';
  const cameraSelected: boolean = activeTab === 'camera';

  return (
    <NodeShell
      title="INPUT"
      subtitle={activeTab === 'grid' ? '6×6 orientation' : 'Camera (Hand SNN)'}
      tone="input"
    >
      <div className="snn-pipeline-input">
        <div className="snn-input-tabs" role="tablist" aria-label="입력 모드 선택">
          <button
            type="button"
            role="tab"
            aria-selected={gridSelected}
            className={`snn-input-tab ${gridSelected ? 'is-active' : ''}`}
            onClick={() => setActiveTab('grid')}
          >
            GRID (6×6)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={cameraSelected}
            className={`snn-input-tab ${cameraSelected ? 'is-active' : ''}`}
            onClick={() => setActiveTab('camera')}
          >
            CAMERA (Hand)
          </button>
        </div>

        <div className="snn-input-content">
          {activeTab === 'grid' && <GridInput />}
          {activeTab === 'camera' && <CameraInput />}
        </div>
      </div>
    </NodeShell>
  );
}
