'use client';

import { useEffect, useRef, useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar from '@/components/snn/Toolbar';
import PipelineCanvas from '@/components/snn/PipelineCanvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import MobileBottomBar from '@/components/snn/MobileBottomBar';
import { HandFaceLogo } from '@/components/handface-logo';
import { onBackendEvent, emitBackendEvent } from '@/lib/backend/events';
import { installAutoSnapshot } from '@/lib/snn/auto-snapshot';
import { ToastProvider, showToast } from '@/components/ui/Toast';
import { DialogProvider } from '@/components/ui/Dialog';
import {
  isEmbedMode,
  isAuthMode,
  postToParent,
  WORKERS_API_URL,
  type InboundMessage,
  type OutboundMessage,
} from '@/lib/embed-mode';
import AuthWidget from '@/components/AuthWidget';
import {
  loadExemplars,
} from '@/lib/snn/out-exemplars';
import {
  resolveClusterLabel,
} from '@/components/snn/pipeline/shared';
import type { ClusterSpawnedDetail, GridInferDetail } from '@/lib/backend/events';
import './snn-canvas.css';

export default function Editor() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [canvasNonce, setCanvasNonce] = useState(0);

  // embed 모드: isEmbedMode() 는 client-only (SSR safe — typeof window guard 내부).
  // useState 초기값 false → useEffect 에서 실제 값으로 교체 (hydration mismatch 회피).
  const [embedMode, setEmbedMode] = useState(false);
  useEffect(() => { setEmbedMode(isEmbedMode()); }, []);

  // auth 모드: ?embed=true&mode=auth 진입 시 AuthWidget 전용 렌더링.
  const [authMode, setAuthMode] = useState(false);
  useEffect(() => { setAuthMode(isAuthMode()); }, []);

  // embed 모드: 마지막 grid-infer 결과 캐시 — PK_REQUEST_VERIFY 응답용.
  const lastVerifyRef = useRef<OutboundMessage | null>(null);

  useEffect(() => {
    const off = onBackendEvent('training-cleared', () => {
      setCanvasNonce((n) => n + 1);
    });
    // 자동 학습 weight 저장 — 1회 install (training-changed → debounced save).
    installAutoSnapshot();
    return off;
  }, []);

  // embed 모드: cluster-spawned → PK_PATTERN_LEARNED.
  useEffect(() => {
    if (!embedMode) return;
    return onBackendEvent<ClusterSpawnedDetail>('cluster-spawned', (d) => {
      const exemplars = loadExemplars('orientation');
      const label = resolveClusterLabel(exemplars, d.clusterIdx, 'grid');
      postToParent({ type: 'PK_PATTERN_LEARNED', patternId: d.clusterIdx, label });
    });
  }, [embedMode]);

  // embed 모드: grid-infer finished/error → PK_VERIFIED / PK_UNVERIFIED.
  useEffect(() => {
    if (!embedMode) return;
    return onBackendEvent<GridInferDetail>('grid-infer', (d) => {
      if (d.kind === 'started') return;
      if (d.kind === 'error') {
        const msg: OutboundMessage = { type: 'PK_UNVERIFIED', reason: d.message ?? 'infer-error' };
        lastVerifyRef.current = msg;
        postToParent(msg);
        return;
      }
      // finished
      const winnerCluster = d.winnerCluster ?? null;
      if (winnerCluster === null) {
        const msg: OutboundMessage = { type: 'PK_UNVERIFIED', reason: 'no-winner' };
        lastVerifyRef.current = msg;
        postToParent(msg);
        return;
      }
      const exemplars = loadExemplars('orientation');
      const label = resolveClusterLabel(exemplars, winnerCluster, 'grid');
      // consecutiveWinnerCount 는 PipelineEventContext 내부 — 여기서는
      // grid-infer 단일 결과이므로 EXACT (deterministic single-shot 추론).
      const msg: OutboundMessage = {
        type: 'PK_VERIFIED',
        patternId: winnerCluster,
        label,
        confidence: 'EXACT',
        workersApiUrl: WORKERS_API_URL,
      };
      lastVerifyRef.current = msg;
      postToParent(msg);
    });
  }, [embedMode]);

  // embed 모드: inbound postMessage 처리.
  useEffect(() => {
    if (!embedMode) return;
    // PK_READY 송출 — 앱 마운트 완료 알림.
    postToParent({ type: 'PK_READY' });

    const handler = (e: MessageEvent) => {
      // origin 화이트리스트 Phase 2에서 추가 — 현재 '*' (모든 origin).
      const data = e.data as InboundMessage;
      if (!data || typeof data.type !== 'string') return;
      switch (data.type) {
        case 'PK_INIT':
          // config 수신 — 현재 PK_READY 재송출로 응답 (Phase 1).
          postToParent({ type: 'PK_READY' });
          break;
        case 'PK_RESET':
          emitBackendEvent('training-cleared', undefined);
          break;
        case 'PK_REQUEST_VERIFY':
          if (lastVerifyRef.current) {
            postToParent(lastVerifyRef.current);
          } else {
            postToParent({ type: 'PK_UNVERIFIED', reason: 'not-yet-verified' });
          }
          break;
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [embedMode]);

  // UX Polish PR1 Fix 3: 첫 방문자 Live 모드 onboarding.
  useEffect(() => {
    const SEEN_KEY = 'handface.onboarding-seen';
    if (typeof window === 'undefined') return;
    try {
      if (window.localStorage.getItem(SEEN_KEY) === '1') return;
    } catch {
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      showToast({
        kind: 'info',
        message: 'Live 모드 — GRID 패턴을 그리면 즉시 학습이 시작됩니다.',
        duration: 7000,
      });
      try {
        window.localStorage.setItem(SEEN_KEY, '1');
      } catch {}
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Network online/offline detection.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onOnline = () => {
      showToast({ kind: 'success', message: 'Online — backend 복귀 사실' });
      setCanvasNonce((n) => n + 1);
    };
    const onOffline = () => {
      showToast({
        kind: 'warning',
        message: 'Offline — backend 연결 필요 (SNN 학습/추론 불가)',
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

  // auth 모드: 파이프라인 전체 대신 AuthWidget 단독 렌더링.
  if (authMode) {
    return (
      <ToastProvider>
        <DialogProvider>
          <AuthWidget />
        </DialogProvider>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
    <DialogProvider>
    <div className={`flex h-dvh w-dvw flex-col ${embedMode ? 'bg-[#0a0a0f]' : 'bg-[#0a0a0c]'} text-white`}>
      {embedMode && !authMode && (
        <div className="flex items-center gap-2.5 px-5 py-3 border-b border-[#2a2a38]">
          {/* PatternKey 4-grid 로고 */}
          <div className="flex h-8 w-8 items-center justify-center rounded bg-violet-700 flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.4"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.4"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">PatternKey</span>
          <span className="text-xs text-[#8888aa] ml-1">개발자 파이프라인</span>
        </div>
      )}
      {!embedMode && (
        <header className="flex items-center gap-3 border-b border-white/5 bg-[#0d0d10]/95 px-4 py-2">
          <HandFaceLogo size={24} />
          <span className="text-sm font-semibold tracking-wider">HandFace</span>
          <span className="hidden sm:inline text-[11px] text-white/40">Neural Network Editor</span>
          <div className="ml-auto" />
        </header>
      )}
      <div className="flex flex-1 min-h-0">
        {!embedMode && (
          <Sidebar
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}
        <main className="relative flex flex-1 flex-col min-w-0">
          {!embedMode && <Toolbar onStatusChange={setStatus} />}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <PipelineCanvas
              key={`pipeline-${canvasNonce}`}
            />
          </div>
          {status && (
            <div
              role="status"
              aria-live="polite"
              className="pointer-events-none absolute bottom-14 left-1/2 z-[var(--z-status)] -translate-x-1/2 rounded border border-white/10 bg-[#0f1117]/95 px-3 py-1 font-mono text-[11px] text-white/70 shadow-lg md:bottom-2"
            >
              {status}
            </div>
          )}
          {!embedMode && (
            <MobileBottomBar
              onOpenSettings={() => setSettingsOpen(true)}
            />
          )}
        </main>
      </div>
      {!embedMode && (
        <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
    </DialogProvider>
    </ToastProvider>
  );
}
