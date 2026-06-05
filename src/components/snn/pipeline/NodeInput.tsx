'use client';

// NodeInput — INPUT 노드. Grid (6×6) only (Phase 3.9 final, 2026-06-05).
//
// Phase 3.9 final 결정 (2026-06-05): Hand SNN (Camera mode) 폐기.
//   docs/HAND_SNN_PHASE_3_9_FINAL.md 참조.
//   - MediaPipe HandLandmarker (CNN 학습된 모델) 의 출력 (21 landmarks) 을
//     SNN 으로 재학습 = 정보 손실 + 비효율.
//   - MediaPipe GestureRecognizer (pre-trained) 가 7 gestures 이미 분류 가능.
//   - SNN spike rate-coding 은 static pose 분류에 본질 weak.
//   - Encoder cross-pose sim margin 0.066 — cosine threshold 분리 불가능.
// Grid SNN (orientation-6x6) demo 유지 — SNN 학습 visualization 가치.

import { useEffect } from 'react';
import { emitBackendEvent, type InputModeDetail } from '@/lib/backend/events';
import GridInput from './GridInput';
import NodeShell from './NodeShell';

export default function NodeInput() {
  // input-mode event = 'grid' 만 emit (live-snn substrate='orientation-6x6').
  useEffect(() => {
    emitBackendEvent<InputModeDetail>('input-mode', { mode: 'grid' });
  }, []);

  return (
    <NodeShell title="INPUT" subtitle="6×6 orientation" tone="input">
      <div className="snn-pipeline-input">
        <div className="snn-input-content">
          <GridInput />
        </div>
      </div>
    </NodeShell>
  );
}
