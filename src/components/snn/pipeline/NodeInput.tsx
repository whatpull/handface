'use client';

// NodeInput — INPUT 노드. GRID 전용 (카메라 입력 제거).
// path Y' rev15 (research-v1.0) 4×4 grid orientation 영역 전용.

import GridInput from './GridInput';
import NodeShell from './NodeShell';

export default function NodeInput() {
  return (
    <NodeShell
      title="INPUT"
      subtitle="4×4 orientation"
      tone="input"
    >
      <div className="snn-pipeline-input">
        <GridInput />
      </div>
    </NodeShell>
  );
}
