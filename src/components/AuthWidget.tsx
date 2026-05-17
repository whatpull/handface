'use client';

// AuthWidget — 1패턴 전용 인증 위젯 (?embed=true&mode=auth 진입).
// SNN 불필요 — localStorage + Jaccard 유사도 비교만 사용.
//
// 상태 흐름 (등록):
//   register_idle → 그리드 그리기 → [등록하기] → register_done → 2초 후 verify_idle
// 상태 흐름 (인증):
//   verify_idle → 그리드 그리기 → [확인] → success | failed
//
// postMessage API:
//   PK_REGISTERED — 등록 완료
//   PK_VERIFIED   — 인증 성공 { confidence, similarity }
//   PK_FAILED     — 인증 실패 { similarity }

import { useCallback, useEffect, useRef, useState } from 'react';
import { postToParent } from '@/lib/embed-mode';
import './snn-canvas.css';

const AUTH_KEY = 'patternkey.auth.cells'; // number[] (16개, 0 or 1)
const JACCARD_THRESHOLD = 0.75;
const MIN_ACTIVE_CELLS = 4;

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

function loadAuthPattern(): number[] | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEY) : null;
    return raw ? (JSON.parse(raw) as number[]) : null;
  } catch {
    return null;
  }
}

function saveAuthPattern(cells: number[]): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(cells));
}

function clearAuthPattern(): void {
  localStorage.removeItem(AUTH_KEY);
}

// ---------------------------------------------------------------------------
// Similarity
// ---------------------------------------------------------------------------

function jaccardSimilarity(a: number[], b: number[]): number {
  let intersection = 0;
  let union = 0;
  for (let i = 0; i < 16; i++) {
    if (a[i] || b[i]) union++;
    if (a[i] && b[i]) intersection++;
  }
  return union === 0 ? 0 : intersection / union;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AuthStatus =
  | 'register_idle'
  | 'registering'
  | 'register_done'
  | 'verify_idle'
  | 'verifying'
  | 'success'
  | 'failed';

function emptyGrid(): number[] {
  return new Array<number>(16).fill(0);
}

function activeCellCount(g: number[]): number {
  return g.reduce((s, v) => s + (v > 0.5 ? 1 : 0), 0);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AuthWidget() {
  const [grid, setGrid] = useState<number[]>(() => emptyGrid());
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() =>
    loadAuthPattern() ? 'verify_idle' : 'register_idle',
  );
  const [lastSimilarity, setLastSimilarity] = useState<number | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // PK_READY 송출 — 위젯 마운트 완료.
  useEffect(() => {
    postToParent({ type: 'PK_READY' });
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const toggleCell = useCallback((i: number) => {
    setGrid((g) => {
      const next = g.slice();
      next[i] = next[i] > 0.5 ? 0 : 1;
      return next;
    });
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(emptyGrid());
    setLastSimilarity(null);
    setAuthStatus((s) => {
      if (s === 'register_idle' || s === 'registering' || s === 'register_done')
        return 'register_idle';
      return 'verify_idle';
    });
  }, []);

  // 등록
  const handleRegister = useCallback(() => {
    if (activeCellCount(grid) < MIN_ACTIVE_CELLS) return;
    setAuthStatus('registering');
    saveAuthPattern(grid.map((v) => (v > 0.5 ? 1 : 0)));
    postToParent({ type: 'PK_REGISTERED' });
    setAuthStatus('register_done');
    resetTimerRef.current = setTimeout(() => {
      setGrid(emptyGrid());
      setAuthStatus('verify_idle');
    }, 2000);
  }, [grid]);

  // 인증
  const handleVerify = useCallback(() => {
    if (authStatus === 'verifying') return;
    if (activeCellCount(grid) < MIN_ACTIVE_CELLS) return;

    setAuthStatus('verifying');
    const stored = loadAuthPattern();
    if (!stored) {
      // 패턴이 사라진 경우 — 등록 모드로 복귀.
      setAuthStatus('register_idle');
      return;
    }

    const input = grid.map((v) => (v > 0.5 ? 1 : 0));
    const sim = jaccardSimilarity(stored, input);
    setLastSimilarity(sim);

    if (sim >= JACCARD_THRESHOLD) {
      setAuthStatus('success');
      postToParent({ type: 'PK_VERIFIED', confidence: 'EXACT', similarity: sim });
    } else {
      setAuthStatus('failed');
      postToParent({ type: 'PK_FAILED', similarity: sim });
    }
  }, [grid, authStatus]);

  // 패턴 재설정 (confirm 필요)
  const handleReset = useCallback(() => {
    const ok =
      typeof window !== 'undefined' &&
      window.confirm('등록된 패턴을 삭제하고 다시 등록하시겠습니까?');
    if (!ok) return;
    clearAuthPattern();
    setGrid(emptyGrid());
    setLastSimilarity(null);
    setAuthStatus('register_idle');
  }, []);

  // ---------------------------------------------------------------------------
  // Derived display values
  // ---------------------------------------------------------------------------

  const isRegisterMode =
    authStatus === 'register_idle' ||
    authStatus === 'registering' ||
    authStatus === 'register_done';

  const isBusy = authStatus === 'registering' || authStatus === 'verifying';

  const activeCount = activeCellCount(grid);
  const canSubmit = activeCount >= MIN_ACTIVE_CELLS && !isBusy;

  const statusMessage = (() => {
    switch (authStatus) {
      case 'register_idle':
        return '나만의 패턴을 등록하세요';
      case 'registering':
        return '등록 중...';
      case 'register_done':
        return '패턴이 등록됐습니다';
      case 'verify_idle':
        return '등록한 패턴을 그려서 인증하세요';
      case 'verifying':
        return '확인 중...';
      case 'success':
        return '인증 완료';
      case 'failed':
        return '패턴이 일치하지 않습니다';
    }
  })();

  const statusColor = (() => {
    if (authStatus === 'success' || authStatus === 'register_done') return 'text-green-400';
    if (authStatus === 'failed') return 'text-red-400';
    return 'text-[#8888aa]';
  })();

  const subMessage = (() => {
    if (authStatus === 'register_idle')
      return '이 패턴을 기억해두세요 — 다음 방문 시 인증에 사용됩니다';
    if (authStatus === 'failed' && lastSimilarity !== null)
      return `유사도 ${Math.round(lastSimilarity * 100)}% — 다시 시도하세요`;
    return null;
  })();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] p-6">
      {/* 로고 */}
      <div className="mb-8 flex items-center gap-2">
        <div
          className="w-8 h-8 bg-violet-700 rounded flex items-center justify-center"
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
        className={`text-sm mb-1 text-center font-medium ${statusColor}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </p>
      {subMessage && (
        <p className="text-xs text-[#6666888] mb-5 text-center">{subMessage}</p>
      )}
      {!subMessage && <div className="mb-5" />}

      {/* 4x4 그리드 */}
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
            disabled={isBusy || authStatus === 'register_done' || authStatus === 'success'}
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

      {/* 활성 셀 수 힌트 (최소 조건 미달 시) */}
      {activeCount > 0 && activeCount < MIN_ACTIVE_CELLS && (
        <p className="text-xs text-[#8888aa] mb-3">
          최소 {MIN_ACTIVE_CELLS}개 선택 필요 (현재 {activeCount}개)
        </p>
      )}

      {/* 버튼 */}
      {!isBusy && authStatus !== 'register_done' && authStatus !== 'success' && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearGrid}
            className="px-4 py-2 text-sm text-[#8888aa] border border-[#2a2a38] rounded-lg hover:border-[#3a3a48] transition-colors"
          >
            지우기
          </button>
          {isRegisterMode ? (
            <button
              type="button"
              onClick={handleRegister}
              disabled={!canSubmit}
              className="px-6 py-2 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              등록하기
            </button>
          ) : (
            <button
              type="button"
              onClick={handleVerify}
              disabled={!canSubmit}
              className="px-6 py-2 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              확인
            </button>
          )}
        </div>
      )}

      {/* 처리 중 표시 */}
      {isBusy && (
        <p className="text-xs text-[#8888aa] mt-1">처리 중...</p>
      )}

      {/* 인증 실패 시 재시도 안내 */}
      {authStatus === 'failed' && (
        <button
          type="button"
          onClick={clearGrid}
          className="mt-4 px-4 py-2 text-sm text-[#8888aa] border border-[#2a2a38] rounded-lg hover:border-[#3a3a48] transition-colors"
        >
          다시 시도
        </button>
      )}

      {/* 인증 성공 표시 */}
      {authStatus === 'success' && (
        <div className="mt-2 text-green-400 text-2xl font-bold select-none">
          &#10003;
        </div>
      )}

      {/* 패턴 재설정 (인증 모드 하단 — 작게) */}
      {!isRegisterMode && authStatus !== 'success' && (
        <button
          type="button"
          onClick={handleReset}
          className="mt-8 text-xs text-[#4a4a5a] hover:text-[#8888aa] transition-colors underline underline-offset-2"
        >
          패턴 재설정
        </button>
      )}

      {/* 하단 브랜딩 */}
      <p className="mt-6 text-xs text-[#4a4a5a]">
        패턴은 이 기기에만 저장됩니다 · PatternKey
      </p>
    </div>
  );
}
