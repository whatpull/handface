'use client';

// NodeInput — INPUT 노드. GRID + CAMERA tab (Phase 3.2, 2026-06-03).
//
// 직전: GRID 전용 (4×4 → 6×6 Phase 2A.2 영역 영역 영역). 본 cycle 영역 CAMERA tab
// 영역 추가 — Hand SNN MediaPipe 통합 roadmap §3.2.
//
// 정직 한계:
//   - CAMERA tab 영역 webcam preview + landmark visualization 영역 (Phase 3.2).
//   - 학습 trigger (orientation-hand substrate 영역 영역 영역) 영역 Phase 3.4
//     영역 영역 — input-mode event wire 영역 Phase 3.3 영역.
//   - 사용자 webcam permission deny 시 CameraInput 영역 안내 message 영역.

import { useState } from 'react';
import CameraInput from './CameraInput';
import GridInput from './GridInput';
import NodeShell from './NodeShell';

type InputTab = 'grid' | 'camera';

export default function NodeInput() {
  const [activeTab, setActiveTab] = useState<InputTab>('grid');

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
            aria-selected={activeTab === 'grid' ? 'true' : 'false'}
            className={`snn-input-tab ${activeTab === 'grid' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('grid')}
          >
            GRID (6×6)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'camera' ? 'true' : 'false'}
            className={`snn-input-tab ${activeTab === 'camera' ? 'is-active' : ''}`}
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
