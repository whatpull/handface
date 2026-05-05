'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar, { type ViewMode } from '@/components/snn/Toolbar';
import Canvas from '@/components/snn/Canvas';
import PipelineCanvas from '@/components/snn/PipelineCanvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import MobileBottomBar from '@/components/snn/MobileBottomBar';
import HandTrackerHost from '@/components/snn/HandTrackerHost';
import { onBackendEvent } from '@/lib/backend/events';
import { createActions } from '@/lib/snn/actions';
import { installAutoSnapshot } from '@/lib/snn/auto-snapshot';
import './snn-canvas.css';

export default function Editor() {
  const [editMode, setEditMode] = useState(false);
  const [cameraConnected, setCameraConnected] = useState(false);
  // 'pipeline' = 5-node 본격 redesign (default).
  // 'region' = 4박스 (INPUT/V1/V2/OUT) 단순 cluster 표시 — 디버깅 보조.
  // ('neuron' = drawflow 472 sampling detail — 폐기됨, 데이터 정합 0.)
  const [view, setView] = useState<ViewMode>('pipeline');
  const [settingsOpen, setSettingsOpen] = useState(false);
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
        />
        <main className="relative flex flex-1 flex-col min-w-0">
          <Toolbar
            view={view}
            onViewChange={setView}
            onStatusChange={setStatus}
          />
          <div className="relative flex-1 min-h-0 overflow-hidden">
            {view === 'pipeline' ? (
              <PipelineCanvas
                key={`pipeline-${canvasNonce}`}
                cameraConnected={cameraConnected}
              />
            ) : (
              <Canvas
                key={`region-${canvasNonce}`}
                editMode={editMode}
              />
            )}
            {/* HandTrackerHost — 본 컴포넌트 영역 selector (#snn-cam-video / #snn-cam-skel
                / .snn-feat-bars) 영역 polling — Pipeline view 영역 mount 정합.
                key={view} 영역 view 전환 영역 stale closure (video/skel/barFills 영역
                unmounted DOM ref) 영역 catch — 카메라 까만 화면 회피 catch. */}
            <HandTrackerHost
              key={`htrack-${view}-${canvasNonce}`}
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
            view={view}
            onViewChange={setView}
            onSave={mobileActions.save}
            onReset={mobileActions.reset}
          />
        </main>
      </div>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
