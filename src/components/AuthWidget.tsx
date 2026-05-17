'use client';

// AuthWidget — PatternKey 인증 전용 UI (?embed=true&mode=auth 진입).
// 파이프라인 노드 없이 4×4 그리드 + 상태 메시지만 표시.
//
// 상태 흐름:
//   [idle]      → "패턴을 그린 후 확인을 누르세요"
//   [learning]  → 첫 방문: "새 패턴을 등록합니다" (30회 자동 학습)
//   [verifying] → "패턴 확인 중..."
//   [success]   → "인증 완료" (초록)
//   [error]     → "패턴이 일치하지 않습니다" (빨강)
//
// postMessage API:
//   PK_READY     — 위젯 로드 완료
//   PK_VERIFIED  — 인증 성공 { patternId, label, confidence }
//   PK_FAILED    — 패턴 불일치

import { useCallback, useEffect, useRef, useState } from 'react';
import { getLiveSnn, onLiveTick } from '@/lib/snn/live-snn';
import { onBackendEvent } from '@/lib/backend/events';
import type { AutoLearnProgressDetail } from '@/lib/backend/events';
import { loadExemplars } from '@/lib/snn/out-exemplars';
import { resolveClusterLabel } from '@/components/snn/pipeline/shared';
import { postToParent } from '@/lib/embed-mode';
import './snn-canvas.css';

// ART vigilance — 정확 일치 전용 (binary equality).
const AUTH_VIGILANCE = 1.0;
// 신규 패턴 자동 학습 횟수.
const LEARN_TOTAL = 30;

type AuthStatus = 'idle' | 'learning' | 'verifying' | 'success' | 'error';

function emptyGrid(): number[] {
  return new Array<number>(16).fill(0);
}

function isGridEmpty(g: number[]): boolean {
  return g.every((v) => v <= 0.5);
}

// 학습된 패턴 슬롯이 하나라도 있으면 true.
function hasLearnedPatterns(): boolean {
  if (typeof window === 'undefined') return false;
  const exemplars = loadExemplars('orientation');
  return Object.keys(exemplars).length > 0;
}

export default function AuthWidget() {
  const [grid, setGrid] = useState<number[]>(() => emptyGrid());
  const [authStatus, setAuthStatus] = useState<AuthStatus>('idle');
  const [progress, setProgress] = useState(0);
  const pendingTokenRef = useRef<number | null>(null);

  // PK_READY 송출 — 위젯 마운트 완료.
  useEffect(() => {
    postToParent({ type: 'PK_READY' });
  }, []);

  // Live SNN tick listener — triggerWithVigilance 결과 수신.
  useEffect(() => {
    return onLiveTick((d) => {
      if (d.source === 'trigger' && d.trialToken !== undefined) {
        if (pendingTokenRef.current !== d.trialToken) return;

        if (d.vigilanceMismatch) {
          // 신규 패턴 — 자동 학습 시작. progress는 auto-learn-progress 이벤트로 갱신.
          setAuthStatus('learning');
          setProgress(0);
        } else if (d.winner < 0) {
          // winner 없음 → 불일치.
          pendingTokenRef.current = null;
          setAuthStatus('error');
          postToParent({ type: 'PK_UNVERIFIED', reason: 'no-winner' });
        } else {
          // 패턴 일치 → 인증 성공.
          pendingTokenRef.current = null;
          const exemplars = loadExemplars('orientation');
          const label = resolveClusterLabel(exemplars, d.winner, 'grid');
          setAuthStatus('success');
          postToParent({
            type: 'PK_VERIFIED',
            patternId: d.winner,
            label,
            confidence: 'EXACT',
            workersApiUrl: '',
          });
        }
      }
    });
  }, []);

  // auto-learn-progress 구독 — 학습 진행 및 완료 수신.
  useEffect(() => {
    return onBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', (d) => {
      if (pendingTokenRef.current !== d.trialToken) return;

      setProgress(Math.min(d.progress, LEARN_TOTAL));

      if (d.progress >= d.total) {
        pendingTokenRef.current = null;
        const exemplars = loadExemplars('orientation');
        const label = resolveClusterLabel(exemplars, d.clusterId, 'grid');
        setAuthStatus('success');
        postToParent({
          type: 'PK_VERIFIED',
          patternId: d.clusterId,
          label,
          confidence: 'EXACT',
          workersApiUrl: '',
        });
      }
    });
  }, []);

  const toggleCell = useCallback((i: number) => {
    setGrid((g) => {
      const next = g.slice();
      next[i] = next[i] > 0.5 ? 0 : 1;
      try {
        getLiveSnn().setPattern(next);
      } catch {
        // SSR / 미초기화 — 무시.
      }
      return next;
    });
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(emptyGrid());
    setAuthStatus('idle');
    setProgress(0);
  }, []);

  const handleConfirm = useCallback(() => {
    if (authStatus === 'learning' || authStatus === 'verifying') return;
    if (isGridEmpty(grid)) return;

    setAuthStatus('verifying');
    setProgress(0);

    try {
      const live = getLiveSnn();
      live.setPattern(grid);
      const { trialToken } = live.triggerWithVigilance(grid, AUTH_VIGILANCE);
      pendingTokenRef.current = trialToken;

      // safety-net 10s — worker hang 방지.
      setTimeout(() => {
        if (pendingTokenRef.current === trialToken) {
          pendingTokenRef.current = null;
          setAuthStatus((s) =>
            s === 'verifying' || s === 'learning' ? 'error' : s,
          );
        }
      }, 10000);
    } catch {
      setAuthStatus('error');
    }
  }, [grid, authStatus]);

  const isBusy = authStatus === 'learning' || authStatus === 'verifying';

  const statusMessage = (() => {
    switch (authStatus) {
      case 'idle':
        return hasLearnedPatterns()
          ? '패턴을 그린 후 확인을 누르세요'
          : '새 패턴을 그려 등록하세요';
      case 'learning':
        return '새 패턴을 등록합니다';
      case 'verifying':
        return '패턴 확인 중...';
      case 'success':
        return '인증 완료';
      case 'error':
        return '패턴이 일치하지 않습니다';
    }
  })();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] p-6">
      {/* 로고 */}
      <div className="mb-8 flex items-center gap-2">
        <div
          className="w-8 h-8 bg-violet-700 rounded-lg flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.4" />
            <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.4" />
            <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
        <span className="text-white font-semibold">PatternKey</span>
      </div>

      {/* 안내 텍스트 */}
      <p
        className={`text-sm mb-6 text-center ${
          authStatus === 'success'
            ? 'text-green-400'
            : authStatus === 'error'
              ? 'text-red-400'
              : 'text-[#8888aa]'
        }`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </p>

      {/* 4×4 그리드 */}
      <div
        className="grid grid-cols-4 gap-2 mb-6"
        aria-label="4x4 패턴 그리드"
        role="group"
      >
        {grid.map((active, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleCell(i)}
            disabled={isBusy}
            aria-label={`셀 ${i + 1} — ${active > 0.5 ? '켜짐' : '꺼짐'}`}
            aria-pressed={active > 0.5}
            className={`w-14 h-14 rounded-xl border-2 transition-all ${
              active > 0.5
                ? 'bg-violet-600 border-violet-400 shadow-lg shadow-violet-900/50'
                : 'bg-[#18181f] border-[#2a2a38] hover:border-violet-700/50'
            } disabled:cursor-not-allowed`}
          />
        ))}
      </div>

      {/* 학습 진행 표시 (learning 상태) — data-pct 10단계 quantize로 inline style 회피 */}
      {authStatus === 'learning' && (
        <div className="w-full max-w-xs mb-4">
          <div
            className="auth-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={LEARN_TOTAL}
            aria-label={`패턴 학습 중 ${progress}/${LEARN_TOTAL}`}
          >
            <div
              className="auth-progress-fill"
              data-pct={String(Math.round((progress / LEARN_TOTAL) * 10) * 10)}
            />
          </div>
          <p className="text-xs text-[#8888aa] mt-1 text-center">
            패턴 학습 중 {progress}/{LEARN_TOTAL}
          </p>
        </div>
      )}

      {/* 결과 표시 */}
      {authStatus === 'success' && (
        <div className="text-green-400 text-lg font-semibold mb-4">
          인증 완료
        </div>
      )}
      {authStatus === 'error' && (
        <div className="text-red-400 text-sm mb-4">
          패턴이 일치하지 않습니다
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={clearGrid}
          disabled={isBusy}
          className="px-4 py-2 text-sm text-[#8888aa] border border-[#2a2a38] rounded-lg hover:border-[#3a3a48] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          지우기
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isBusy || isGridEmpty(grid)}
          className="px-6 py-2 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isBusy ? '처리 중...' : '확인'}
        </button>
      </div>

      {/* 하단 브랜딩 */}
      <p className="mt-8 text-xs text-[#4a4a5a]">
        패턴은 이 기기에만 저장됩니다 · PatternKey
      </p>
    </div>
  );
}
