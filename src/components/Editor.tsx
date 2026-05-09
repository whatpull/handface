'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar from '@/components/snn/Toolbar';
import PipelineCanvas from '@/components/snn/PipelineCanvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import MobileBottomBar from '@/components/snn/MobileBottomBar';
import HandTrackerHost from '@/components/snn/HandTrackerHost';
import { onBackendEvent, type TrainingPhaseDetail } from '@/lib/backend/events';
import { createActions } from '@/lib/snn/actions';
import { installAutoSnapshot, restoreSnapshotOnce } from '@/lib/snn/auto-snapshot';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { ToastProvider, showToast } from '@/components/ui/Toast';
import './snn-canvas.css';

// UX Polish PR2 Fix 2 (MEDIUM [M2], 2026-05-09): header mini status — engine + phase.
//   직전 header 단순 라벨만 노출 — 글로벌 상태 (engine: live/backend, phase 요약) catch 0.
//   useEngineMode + 'training-phase' event 구독 — 학습 진행 한눈에 catch.
const PHASE_KO: Record<TrainingPhaseDetail['phase'], string> = {
  untrained: '미학습',
  learning: '학습 중',
  partial: '일부 학습',
  trained: '학습 완료',
  inference: '추론 중',
};

export default function Editor() {
  const [cameraConnected, setCameraConnected] = useState(false);
  // 통합 view — Pipeline (5-node) + Region cascade (4-box) 영역 단일 화면.
  // 직전 ViewMode toggle (pipeline/region) 영역 폐기 — 사용자 명시 "region과 pipeline을
  //   합쳐주면 좋겠습니다" 정합.
  // ('neuron' = drawflow 472 sampling detail — 일부 폐기, 데이터 정합 0.)
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [busy, setBusy] = useState<string | null>(null);
  const [canvasNonce, setCanvasNonce] = useState(0);
  // UX Polish PR2 Fix 2: header mini status — engine mode + 학습 phase.
  const [engineMode] = useEngineMode();
  const [phase, setPhase] = useState<TrainingPhaseDetail['phase']>('untrained');

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
    // 사용자 catch 2026-05-06: 학습 완료 직후 자동 reset 발생 — circuit-changed → canvasNonce++ →
    // PipelineCanvas remount → useHandControl unmount → 학습 진행 wipe ROOT CAUSE.
    // canvasNonce 자동 증가 폐기 — 'training-cleared' 영역 명시 reset 영역만 trigger.
    const off = onBackendEvent('training-cleared', () => {
      setCanvasNonce((n) => n + 1);
      setPhase('untrained');
    });
    // 자동 학습 weight 저장 — 1회 install (training-changed → debounced save).
    // listener 자체 영역 install 영역 무해 (event emit 0 일부 backend 호출 0).
    installAutoSnapshot();
    // 페이지 로드 직후 1회 — localStorage 영역 stored snapshot 영역 backend 영역 복원.
    // 사용자 catch 2026-05-09 (401 fix): Live default 영역 restoreSnapshotOnce
    // 영역 loadSnapshot → ensureNetwork → POST /networks 영역 trigger 영역
    // NEURONFACE_API_KEY 미설정 시점 영역 401 silent. backend 모드 진입 시
    // ensureNetwork chain 영역 자동 호출 (auto-snapshot.ts:11-19) 영역
    // restoreFromStorage 사실 — Editor mount-time auto-call 영역 폐기.
    if (engineMode === 'backend') {
      void restoreSnapshotOnce();
    }
    return off;
  }, [engineMode]);

  // UX Polish PR2 Fix 2: training-phase 구독 — header phase badge 갱신.
  useEffect(() => {
    return onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
      setPhase(d.phase);
    });
  }, []);

  // UX Polish PR1 Fix 3 (HIGH [H2], 2026-05-09): 첫 방문자 Live 모드 onboarding.
  //   default engineMode='live' → 카메라 자세 = 즉시 학습 의미 catch 0 (silent UX).
  //   localStorage flag idempotent — 한 번 본 사용자에게 재표시 0.
  // QA LOW Fix (2026-05-09): ToastProvider 영역 register 시점 영역 본 useEffect 영역
  //   mount 보다 늦을 가능성 → silent drop catch. requestAnimationFrame 영역 defer
  //   영역 다음 frame 보장.
  useEffect(() => {
    const SEEN_KEY = 'handface.onboarding-seen';
    if (typeof window === 'undefined') return;
    try {
      if (window.localStorage.getItem(SEEN_KEY) === '1') return;
    } catch {
      return;
    }

    // ToastProvider 영역 register 보장 영역 다음 frame defer.
    const raf = window.requestAnimationFrame(() => {
      showToast({
        kind: 'info',
        message: '🔴 Live 모드 — 자세를 잡으면 즉시 학습이 시작됩니다. 카메라를 먼저 활성화하세요.',
        duration: 7000,
      });
      try {
        window.localStorage.setItem(SEEN_KEY, '1');
      } catch {}
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Network online/offline detection — silent fail 회피 catch path.
  // online: success toast + refresh 신호 (circuit-changed → canvasNonce++).
  // offline: warning toast — MediaPipe-only fallback path (NodeInfer 영역 표시).
  // 정직 한계 명시: offline 영역 SNN inference 불가 — MediaPipe label 영역 직접 readout.
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
        message: 'Offline — MediaPipe-only 사실 (SNN 대부분 학습 진행 0)',
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
      <header className="flex items-center gap-3 border-b border-white/5 bg-[#0d0d10]/95 px-4 py-2">
        <span className="text-sm font-semibold tracking-wider">HandFace</span>
        <span className="hidden sm:inline text-[11px] text-white/40">Neural Network Editor</span>
        <div className="ml-auto flex items-center gap-2 text-[11px]">
          <span
            className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-black/30 px-2 py-0.5"
            aria-label={`엔진: ${engineMode === 'live' ? 'Live' : 'Backend'}`}
          >
            {engineMode === 'live' ? (
              <>
                <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-red-500" />
                <span className="text-white/85">Live</span>
              </>
            ) : (
              <>
                <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-white/85">Backend</span>
              </>
            )}
          </span>
          <span
            className="hidden sm:inline-flex items-center gap-1.5 rounded border border-white/10 bg-black/30 px-2 py-0.5 text-white/70"
            aria-label={`학습 단계: ${PHASE_KO[phase]}`}
          >
            <span
              aria-hidden
              className={
                phase === 'trained' ? 'inline-block h-2 w-2 rounded-full bg-emerald-400'
                : phase === 'inference' ? 'inline-block h-2 w-2 rounded-full bg-sky-400'
                : phase === 'learning' || phase === 'partial' ? 'inline-block h-2 w-2 rounded-full bg-amber-400'
                : 'inline-block h-2 w-2 rounded-full bg-white/30'
              }
            />
            {PHASE_KO[phase]}
          </span>
        </div>
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
            cameraConnected={cameraConnected}
            onToggleCamera={() => setCameraConnected((v) => !v)}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </main>
      </div>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
    </ToastProvider>
  );
}
