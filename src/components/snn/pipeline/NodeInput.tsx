'use client';

// NodeInput — INPUT 노드. 4×4 orientation grid 단독 (path Y 확정).
// 카메라 / MediaPipe / feature-encoder 모드는 사용자 catch 2026-05-07 로 폐기.
// 기존 HandTrackerHost 코드는 backward compat 으로 lib 에 보존되지만 본 노드는
// 사용 안 함.

import { useEffect } from 'react';
import { emitBackendEvent, type InputModeDetail } from '@/lib/backend/events';
import GridInput from './GridInput';
import NodeShell from './NodeShell';

export default function NodeInput() {
  // 다른 노드 (LEARN 등) 에 input-mode 영역 'grid' 한 번 broadcast — backward compat.
  useEffect(() => {
    emitBackendEvent<InputModeDetail>('input-mode', { mode: 'grid' });
  }, []);

  return (
    <NodeShell title="INPUT" subtitle="4×4 orientation" tone="input">
      <div className="snn-pipeline-input">
        <GridInput />
      </div>
    </NodeShell>
  );
}
