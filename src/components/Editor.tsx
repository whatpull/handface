'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar from '@/components/snn/Toolbar';
import Canvas from '@/components/snn/Canvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import MobileBottomBar from '@/components/snn/MobileBottomBar';
import HandTrackerHost from '@/components/snn/HandTrackerHost';
import CameraQuickControls from '@/components/snn/CameraQuickControls';
import OutNodeOverlay from '@/components/snn/OutNodeOverlay';
import { onBackendEvent } from '@/lib/backend/events';
import { createActions } from '@/lib/snn/actions';
import { installAutoSnapshot } from '@/lib/snn/auto-snapshot';
import './snn-canvas.css';

export default function Editor() {
  const [editMode, setEditMode] = useState(false);
  const [cameraConnected, setCameraConnected] = useState(false);
  const [view, setView] = useState<'region' | 'neuron'>('neuron');
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
            <Canvas
              key={`${view}-${canvasNonce}`}
              editMode={editMode}
              cameraConnected={cameraConnected}
              view={view}
            />
            <HandTrackerHost
              active={cameraConnected}
              onError={(m) => setStatus(`✗ camera: ${m}`)}
            />
            {view === 'neuron' && (
              <>
                <CameraQuickControls
                  key={`cam-controls-${canvasNonce}`}
                  cameraConnected={cameraConnected}
                />
                <OutNodeOverlay key={`out-overlay-${canvasNonce}`} />
              </>
            )}
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
