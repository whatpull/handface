'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar from '@/components/snn/Toolbar';
import PipelineCanvas from '@/components/snn/PipelineCanvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import MobileBottomBar from '@/components/snn/MobileBottomBar';
import HandTrackerHost from '@/components/snn/HandTrackerHost';
import { onBackendEvent } from '@/lib/backend/events';
import { createActions } from '@/lib/snn/actions';
import { installAutoSnapshot, restoreSnapshotOnce } from '@/lib/snn/auto-snapshot';
import { ToastProvider, showToast } from '@/components/ui/Toast';
import './snn-canvas.css';

export default function Editor() {
  const [cameraConnected, setCameraConnected] = useState(false);
  // 통합 view — Pipeline (5-node) + Region cascade (4-box) 영역 단일 화면.
  // 직전 ViewMode toggle (pipeline/region) 영역 폐기 — 사용자 명시 "region과 pipeline을
  //   합쳐주면 좋겠습니다" 정합.
  // ('neuron' = drawflow 472 sampling detail — 영역 영역 폐기, 데이터 정합 0.)
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [busy, setBusy] = useState<string | null>(null);
  const [canvasNonce, setCanvasNonce] = useState(0);

  // 모바일 bottom-bar 가 사용할 액션 (Toolbar 와 동일).
  // useMemo — busy / status setter 영역 stable 영역 dep 변경 영역만 재산출.
  const mobileActions = useMemo(
    () => createActions({ busy, setBusy, status: setStatus }),
    [busy],
  );

  // HandTrackerHost 영역 onError 영역 stable callback — useEffect dep 영역 매 render
  // restart 회피 (HandTrackerHost 영역 active/onFrame/onError dep 영역 stale catch).
  const onCameraError = useCallback((m: string) => setStatus(`✗ camera: ${m}`), []);

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

  // Network online/offline detection — silent fail 회피 catch path.
  // online: success toast + refresh 신호 (circuit-changed → canvasNonce++).
  // offline: warning toast — MediaPipe-only fallback path (NodeInfer 영역 표시).
  // 정직 한계 박음: offline 영역 SNN inference 불가 — MediaPipe label 영역 직접 readout.
  // 학습 진행 0 (backend 영역 doss).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onOnline = () => {
      showToast({ kind: 'success', message: 'Online — backend 복귀 사실' });
      // backend 복귀 신호 — Canvas 영역 refresh, ensureNetwork 재시도 catch.
      setCanvasNonce((n) => n + 1);
    };
    const onOffline = () => {
      showToast({
        kind: 'warning',
        message: 'Offline — MediaPipe-only 사실 (SNN 영역 영역 영역 학습 진행 0)',
        duration: 6000,
      });
    };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return (
    <ToastProvider>
    <div className="flex h-dvh w-dvw flex-col bg-[#0a0a0c] text-white">
      <header className="flex items-center justify-between border-b border-white/5 bg-[#0d0d10]/95 px-4 py-2">
        <span className="text-sm font-semibold tracking-wider">HandFace</span>
        <span className="text-[11px] text-white/40">Neural Network Editor</span>
      </header>
      <div className="flex flex-1 min-h-0">
        <Sidebar
          cameraConnected={cameraConnected}
          onToggleCamera={() => setCameraConnected((v) => !v)}
          onOpenSettings={() => setSettingsOpen(true)}
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
              onError={onCameraError}
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
    </div>
    </ToastProvider>
  );
}
