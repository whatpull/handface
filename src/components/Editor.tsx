'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar from '@/components/snn/Toolbar';
import PipelineCanvas from '@/components/snn/PipelineCanvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import ValidationPanel from '@/components/snn/pipeline/ValidationPanel';
import MobileBottomBar from '@/components/snn/MobileBottomBar';
import HandTrackerHost from '@/components/snn/HandTrackerHost';
import { onBackendEvent } from '@/lib/backend/events';
import { createActions } from '@/lib/snn/actions';
import { installAutoSnapshot, restoreSnapshotOnce } from '@/lib/snn/auto-snapshot';
import './snn-canvas.css';

export default function Editor() {
  const [editMode, setEditMode] = useState(false);
  const [cameraConnected, setCameraConnected] = useState(false);
  // 통합 view — Pipeline (5-node) + Region cascade (4-box) 영역 단일 화면.
  // 직전 ViewMode toggle (pipeline/region) 영역 폐기 — 사용자 명시 "region과 pipeline을
  //   합쳐주면 좋겠습니다" 정합.
  // ('neuron' = drawflow 472 sampling detail — 영역 영역 폐기, 데이터 정합 0.)
  // editMode 영역 Sidebar 영역 prop 영역 보존 — 직전 Region drawflow 영역 영역 영역
  //   영역 영역 dead 영역 (Pipeline 영역 사용 0). 본 turn 영역 폐기 회피 — 별도 turn.
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [validationOpen, setValidationOpen] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [busy, setBusy] = useState<string | null>(null);
  const [canvasNonce, setCanvasNonce] = useState(0);

  // 모바일 bottom-bar 가 사용할 액션 (Toolbar 와 동일).
  const mobileActions = createActions({
    busy,
    setBusy,
    status: setStatus,
  });

  useEffect(() => {
    const off = onBackendEvent('circuit-changed', () => {
      setCanvasNonce((n) => n + 1);
    });
    // 자동 학습 weight 저장 — 1회 install (training-changed → debounced save).
    installAutoSnapshot();
    // 페이지 로드 직후 1회 — localStorage 영역 stored snapshot 영역 backend 영역 복원.
    // 사용자 학습 weight 영역 reload 영역 보존 catch (silent UX regression 정정).
    void restoreSnapshotOnce();
    return off;
  }, []);

  return (
    <div className="flex h-dvh w-dvw flex-col bg-[#0a0a0c] text-white">
      <header className="flex items-center justify-between border-b border-white/5 bg-[#0d0d10]/95 px-4 py-2">
        <span className="text-sm font-semibold tracking-wider">HandFace</span>
        <span className="text-[11px] text-white/40">Neural Mesh Editor</span>
      </header>
      <div className="flex flex-1 min-h-0">
        <Sidebar
          cameraConnected={cameraConnected}
          onToggleCamera={() => setCameraConnected((v) => !v)}
          editMode={editMode}
          onToggleEdit={() => setEditMode((v) => !v)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenValidation={() => setValidationOpen(true)}
        />
        <main className="relative flex flex-1 flex-col min-w-0">
          <Toolbar onStatusChange={setStatus} />
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <PipelineCanvas
              key={`pipeline-${canvasNonce}`}
              cameraConnected={cameraConnected}
            />
            {/* HandTrackerHost — 본 컴포넌트 영역 selector (#snn-cam-video / #snn-cam-skel
                / .snn-feat-bars) 영역 polling — Pipeline view 영역 mount 정합. */}
            <HandTrackerHost
              key={`htrack-${canvasNonce}`}
              active={cameraConnected}
              onError={(m) => setStatus(`✗ camera: ${m}`)}
            />
          </div>
          {status && (
            <div
              role="status"
              aria-live="polite"
              className="pointer-events-none absolute bottom-14 left-1/2 z-10 -translate-x-1/2 rounded border border-white/10 bg-[#0f1117]/95 px-3 py-1 font-mono text-[11px] text-white/70 shadow-lg md:bottom-2"
            >
              {status}
            </div>
          )}
          <MobileBottomBar
            onSave={mobileActions.save}
            onReset={mobileActions.reset}
          />
        </main>
      </div>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ValidationPanel open={validationOpen} onClose={() => setValidationOpen(false)} />
    </div>
  );
}
