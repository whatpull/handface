'use client';

// CameraInput — MediaPipe hand 자세 → SNN Live runtime 학습 / 추론.
// 사용자 catch 2026-05-08 (제스처 검증 path Y' 정합):
//   - hand-feature event → sharpenForGesture (binary cluster-exclusive)
//   - 회로 빌드 시점 영역 GESTURE_CLUSTER_ACTIVE_INPUTS 영역 substrate
//   - 학습/추론 path 영역 GridInput 영역 동일 (cluster_train_rstdp /
//     inject_feature16) 단 input source 영역 카메라.
//
// PR4 (사용자 catch 2026-05-09 — Live 4차):
//   - engineMode='live' 시 LiveSnn (substrate='gesture') start.
//   - hand-feature event → live.setPattern (sharpened 16-dim).
//   - 학습 button 영역 'reinforce' 영역 swap (R-STDP positive reward).
//   - 추론 button 영역 hide — winner 영역 NodeInfer 영역 자동 표시.
//   - cameraConnected toggle false → live.setPattern 영역 zero reset.
//
// PR-M (사용자 catch 2026-05-10 — GridInput 정합 패턴 폐기):
//   - 영역 backend mode preset/cluster row 학습 button × 4 영역 본격 폐기 —
//     agent 자율 판단 영역 backend mode 영역 trainGesture / runInfer path 영역
//     모두 제거 (사용자 vision: Live primary 영역 backend 폐기 권장).
//   - 영역 Live mode 영역 static pattern row 영역도 제거 (GridInput PR-L 정합).
//
// PR (manual-trigger-paradigm, 사용자 catch 2026-05-10):
//   - 영역 stable-pose 자동 triggerWithVigilance 영역 본격 폐기 — 직전 path
//     영역 hand-feature event stream 영역 GESTURE_STABLE_FRAMES 충족 자동 학습
//     trigger 영역 사용자 mental model 영역 path. 사용자 명시: "추론을 누르면
//     학습하게 해주세요". 정정 path 영역 setPattern (worker buffer mirror) 영역
//     보존 + 추론 button click 영역만 triggerWithVigilance 호출 영역 단일 trigger.
//   - 영역 lastStableClusterRef / stableCountRef / lastGestureNameRef 영역 본격
//     제거 — 자동 gating 영역 caller 0.
//   - 영역 isAutoLearningRef 영역 button click handler 영역 read 영역 보존
//     (학습 진행 중 영역 추론 button disable + click 영역 idempotent skip).
//
// cluster 매핑 (feature-encoder.ts 영역 정합 — 코드 reference comment):
//   0 = Pointing (─ index 강조)
//   1 = Open Palm (모든 finger 펴짐)
//   2 = Closed Fist (모든 finger 굽힘)
//   3 = Victory (index+middle 펴짐)

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  emitBackendEvent,
  onBackendEvent,
  type HandFeatureDetail,
  type InputModeDetail,
  type GridInferDetail,
} from '@/lib/backend/events';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { sharpenForGesture } from '@/lib/mediapipe/feature-encoder';
import { getLiveSnn, onLiveTick } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { showDialog } from '@/components/ui/Dialog';
import { usePipelineEvents } from './PipelineEventContext';
// PR-K (사용자 catch 2026-05-09 catch 1): ART vigilance threshold — GridInput
// 영역 동일 정합 (Carpenter & Grossberg 1987).
const ART_VIGILANCE_THRESHOLD = 0.15;

// PR #196 polish (UX LOW-1/2 + QA LOW-1): hint 영역 secondary line + 'warning'
// kind 영역 amber visual cue (낮은 confidence 영역 정합) + GridInput 영역 정합.
type Status =
  | { kind: 'idle' }
  | { kind: 'building' }
  | { kind: 'inferring' }
  | { kind: 'ok'; message: string; hint?: string }
  | { kind: 'warning'; message: string; hint?: string }
  | { kind: 'error'; message: string };

export default function CameraInput({ cameraConnected }: { cameraConnected: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const lastFeatureRef = useRef<number[] | null>(null);
  const [engineMode] = useEngineMode();
  const isLiveMode = engineMode === 'live';
  // engineMode 영역 useEffect listener closure 영역 stale catch — ref 영역
  // 동기화 후 listener 영역 ref.current 영역 read 사실.
  const engineModeRef = useRef(engineMode);
  useEffect(() => {
    engineModeRef.current = engineMode;
  }, [engineMode]);

  // 사용자 catch 2026-05-10 (block-infer-during-learn): auto-learn 진행 중
  // 영역 hand-feature event 자동 trigger 차단 — runAutoLearnLoop 영역 30회
  // R-STDP 진행 중 영역 추론 (triggerWithVigilance) 호출 시 race + winner
  // unreliable. ref pattern 영역 hand-feature listener (useEffect [] deps)
  // closure 영역 stale 회피.
  const { isAutoLearning } = usePipelineEvents();
  const isAutoLearningRef = useRef(isAutoLearning);
  useEffect(() => {
    isAutoLearningRef.current = isAutoLearning;
  }, [isAutoLearning]);

  // PR (manual-trigger-paradigm, 2026-05-10): 자동 stable-pose trigger 영역 본격
  // 폐기. 직전 path 영역 lastStableClusterRef / stableCountRef / lastGestureNameRef
  // 영역 hand-feature stream 영역 GESTURE_STABLE_FRAMES 충족 영역 자동 학습 +
  // 신규 cluster spawn 영역 trigger — 사용자 mental model 영역 path. 정정 path
  // 영역 setPattern (worker buffer mirror) 영역만 보존 + 추론 button click 영역
  // triggerWithVigilance 호출 영역 단일 trigger.

  // hand-feature event listen → sharpened feature 보존 + worker buffer mirror.
  // 학습 / 추론 trigger 0 — runInferAuto callback (button click) 영역만 호출.
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
    if (d.hasHand && d.feature && d.feature.length >= 16) {
      const sharpened = sharpenForGesture(d.feature);
      lastFeatureRef.current = sharpened;
      if (engineModeRef.current === 'live') {
        try {
          // worker pattern buffer mirror 영역만 — STDP / 추론 trigger 0.
          getLiveSnn().setPattern(sharpened);
        } catch {
          // SSR / live-snn 미초기화 — 무시.
        }
      }
    } else {
      lastFeatureRef.current = null;
      if (engineModeRef.current === 'live') {
        try {
          getLiveSnn().setPattern(new Array<number>(16).fill(0));
        } catch {
          // ignore
        }
      }
    }
  }), []);

  // circuit-changed event — HF Spaces 컨테이너 재시작 등으로 backend 가
  // 새 빈 네트워크를 만든 시점. PR-M (2026-05-10): backend mode trainGesture
  // path 영역 폐기 후 substrate gate 영역 caller 0 — status idle reset 영역만
  // 보존 (Live runtime 영역 LiveSnn 자체 lifecycle 영역 별도).
  useEffect(() => onBackendEvent('circuit-changed', () => {
    setStatus({ kind: 'idle' });
  }), []);

  // event-driven 1-shot pivot (사용자 catch 2026-05-09 B): background loop 폐기.
  // 본 effect 영역 substrate sync (input-mode re-emit) 영역만 담당.
  // PR #171 audit fix (Fix 2 — QA HIGH): substrate='gesture' 명시 setSubstrate
  // 호출 영역 제거 — LiveSnn 자체 input-mode event listener 영역 derive.
  useEffect(() => {
    if (engineMode !== 'live') return;
    // NodeInput input-mode emit 영역 LiveSnn 미초기화 시점 영역 missed catch —
    // CameraInput Live mount 시 idempotent re-emit 영역 substrate sync 보장.
    emitBackendEvent<InputModeDetail>('input-mode', { mode: 'camera' });
  }, [engineMode]);

  // PR4 — cameraConnected toggle false 시 Live setPattern 영역 zero reset
  // (hand-feature event 영역 stop 사실 — 잔여 pattern 영역 stale tick 회피).
  useEffect(() => {
    if (!cameraConnected && engineMode === 'live') {
      try {
        getLiveSnn().setPattern(new Array<number>(16).fill(0));
      } catch {
        // ignore
      }
      lastFeatureRef.current = null;
    }
  }, [cameraConnected, engineMode]);

  // PR (manual-trigger-paradigm, 사용자 catch 2026-05-10): 추론 button click
  // 영역만 학습 + 추론 trigger — GridInput runInferAuto 정합. lastFeatureRef
  // 영역 마지막 sharpened hand-feature 영역 catch (hand-feature event listener
  // 영역 보존). 손 영역 화면 0 영역 추론 0 (warning). isAutoLearning 영역
  // disable 영역 button level 영역 catch + click handler 영역 idempotent skip.
  const pendingInferTokenRef = useRef<number | null>(null);

  const runInferAuto = useCallback(() => {
    if (!isLiveMode) return;
    if (isAutoLearningRef.current) {
      setStatus({
        kind: 'warning',
        message: '학습 중 — 추론 대기',
        hint: '신규 패턴 30회 학습 진행 중 — 완료 후 추론 사실',
      });
      return;
    }
    const feature = lastFeatureRef.current;
    if (!feature || feature.length < 16) {
      setStatus({
        kind: 'warning',
        message: '손 자세 미감지',
        hint: '카메라 정면 영역 손 영역 보이게 자세 후 재시도',
      });
      return;
    }
    setStatus({ kind: 'inferring' });
    // GridInput 영역 정합 — 직전 winner stale carry-over 회피 (PipelineEventContext
    // 영역 grid-infer started kind 영역 detail/ts reset).
    emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'started' });
    try {
      const live = getLiveSnn();
      live.setPattern(feature);
      const { trialToken } = live.triggerWithVigilance(feature, ART_VIGILANCE_THRESHOLD);
      pendingInferTokenRef.current = trialToken;
      // safety-net 8s — GridInput 영역 정합 (worker simulation throttled CPU
      // 영역 ≥2s 가능 + auto-learn 영역 30 trial × ~150ms ≈ 4.5s timeout 회피).
      setTimeout(() => {
        if (pendingInferTokenRef.current === trialToken) {
          pendingInferTokenRef.current = null;
          setStatus((s) => s.kind === 'inferring'
            ? { kind: 'ok', message: '추론 완료 *', hint: '(처리 지연 — 잠시 후 재시도)' }
            : s);
        }
      }, 8000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `추론 실패: ${msg}` });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: msg });
    }
  }, [isLiveMode]);

  // PR #192 polish (UX-3 + QA FINDING-1/2): LiveTickDetail listener 영역 push
  // event 영역 trialToken match 영역 정확 reset (status copy + reinforcingCluster).
  useEffect(() => {
    if (engineMode !== 'live') return;
    return onLiveTick((d) => {
      if (d.source === 'trigger' && d.trialToken !== undefined) {
        // PR (manual-trigger-paradigm, 2026-05-10): manual trigger 영역 token
        // match 영역만 status swap — 직전 자동 trigger 영역 background event
        // 영역 다른 cluster 영역 stale match 회피.
        if (pendingInferTokenRef.current === d.trialToken) {
          pendingInferTokenRef.current = null;
          // GridInput 영역 정합 — Diehl & Cook 2015 winner margin 10% threshold.
          const lowConf = d.winner < 0 || d.margin < 0.10;
          if (lowConf) {
            setStatus({
              kind: 'warning',
              message: '추론 완료',
              hint: '신뢰도 낮음 — 자세 안정화 권장',
            });
          } else {
            setStatus({ kind: 'ok', message: '추론 완료' });
          }
        }
      } else if (d.source === 'reinforce' && d.trialToken !== undefined) {
        // PR-K (사용자 catch 2026-05-09 catch 1): auto-learn loop 영역 final
        // chunk 영역 status 영역 'auto-learn 완료' 영역 swap. manual trigger
        // 영역 동일 token 영역 vigilance miss → ART expansion + reinforce loop
        // 영역 final chunk 영역 token 영역 reset.
        if (pendingInferTokenRef.current === d.trialToken) {
          pendingInferTokenRef.current = null;
        }
        const tc = d.targetCluster;
        const label = tc !== undefined && tc >= 0
          ? `패턴 ${tc + 1}`
          : '패턴';
        setStatus({
          kind: 'ok',
          message: `${label} 자동 학습 완료 (30 trial)`,
          hint: 'ART vigilance 영역 신규 cluster 영역 자동 형성',
        });
      }
    });
  }, [engineMode]);

  // 사용자 catch 2026-05-09 [2] (Fix 5): mirror — CAMERA path 영역 substrate-aware
  // reset ('gesture'). GridInput 영역 'orientation' 정합. clearExemplars 영역 UI
  // count 영역 동시 0 (substrate isolation 정합 — 다른 substrate 영역 보존).
  // PR-J (사용자 catch 2026-05-09 [2]): 양 substrate 영역 완벽 isolated reset
  // mirror — GridInput 영역 정합. substrate='gesture' 영역만 reset — orientation
  // 영역 별도 LocalSNN + 별도 IndexedDB store 영역 보존 (PR-G isolation 정합).
  // sequence: resetClusterWeights → live.resetTrigger → clearExemplars → lab.save.
  // 사용자 catch 2026-05-10 (Request C): GridInput 영역 정합 — purgeAllLearningData
  // 영역 단일 path (양 substrate IndexedDB + cache + localStorage wipe + reload).
  const resetLearningLive = useCallback(() => {
    if (engineMode !== 'live') return;
    // 사용자 catch 2026-05-12: native window.confirm → showDialog (accessible
    // modal). callback-driven flow — onConfirm 영역만 실제 wipe path 진행.
    const performWipe = async () => {
      setStatus({ kind: 'building' });
      try {
        // Step 1: LiveSnn state-clear.
        try {
          getLiveSnn().resetTrigger();
        } catch {
          // SSR / 미초기화 — 무시.
        }
        // Step 2: 영속 + cache + localStorage 영역 wipe.
        await purgeAllLearningData();
        // Step 3: UI count 양 substrate clear.
        clearExemplars('orientation');
        clearExemplars('gesture');
        setStatus({
          kind: 'ok',
          message: '학습 데이터 전체 삭제 완료 — 페이지 새로고침 권장',
        });
        // Step 4: page reload 영역 fresh build (1500ms delay 영역 status 영역 visible).
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            try {
              window.location.reload();
            } catch {
              // ignore
            }
          }, 1500);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setStatus({ kind: 'error', message: `학습 데이터 삭제 실패: ${msg}` });
      }
    };
    showDialog({
      kind: 'confirm',
      title: '학습 데이터 전체 삭제',
      message: '양 substrate (GRID + CAMERA) 영역 모든 학습 가중치 + 학습 횟수 + 추론 결과 + 영속 DB (IndexedDB) 영역 완전 wipe 됩니다.\n\n계속하시겠습니까?',
      confirmLabel: '삭제',
      cancelLabel: '취소',
      onConfirm: () => { void performWipe(); },
    });
  }, [engineMode]);

  // 사용자 catch 2026-05-10 (block-infer-during-learn): isAutoLearning 영역
  // isBusy 영역 합산 — 학습 reset button 영역 동시 disable (race 회피).
  const isBusy = status.kind === 'building' || status.kind === 'inferring' || isAutoLearning;

  // UX Polish PR1 Fix 4 (HIGH [H4], 2026-05-09): 🔴 emoji 영역 screen reader
  //   노이즈 catch — semantic Tailwind red-dot + aria-hidden 영역 swap.
  //   statusLine 영역 string → ReactNode (Live idle 케이스 dot 동봉).
  const statusLine = useMemo(() => {
    // 사용자 catch 2026-05-10 (block-infer-during-learn): 학습 진행 중 영역
    // statusLine 영역 우선 override — idle / ok 영역 'LIVE 자세를 취하세요'
    // 영역 misleading (실 상태 영역 학습 중). status.kind === 'building' /
    // 'inferring' / 'error' 영역 보존 (학습 reset / explicit error 우선).
    if (isAutoLearning && status.kind !== 'building' && status.kind !== 'error') {
      return (
        <>
          <span className="snn-grid-status-msg">학습 중 — 추론 대기</span>
          <small className="snn-grid-status-hint">신규 패턴 30회 학습 진행 중 — 완료 후 추론 사실</small>
        </>
      );
    }
    switch (status.kind) {
      case 'idle':
        if (isLiveMode) {
          return (
            <>
              <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
              {cameraConnected ? 'LIVE — 자세 후 추론 버튼을 누르세요' : 'LIVE — 카메라 미연결'}
            </>
          );
        }
        return cameraConnected ? '카메라 준비됨 — 자세 후 추론 버튼을 누르세요' : '카메라 미연결 (좌측 카메라 아이콘)';
      case 'building': return '회로 빌드 중…';
      case 'inferring': return '추론 중…';
      // PR #196 polish (UX LOW-1/2): hint 영역 secondary <small> + warning kind
      // 영역 amber pill 영역 visual cue (snn-grid-status--warning CSS 정합).
      case 'ok':
      case 'warning':
        return status.hint
          ? (
            <>
              <span className="snn-grid-status-msg">{status.message}</span>
              <small className="snn-grid-status-hint">{status.hint}</small>
            </>
          )
          : status.message;
      case 'error': return status.message;
    }
  }, [status, cameraConnected, isLiveMode, isAutoLearning]);

  return (
    <div className="snn-grid-input">
      {/* 사용자 catch 2026-05-10 (CAMERA tab LIVE info parity + font-size
          escalate): className 영역 GridInput LIVE 박스 영역 정합 swap —
          .snn-grid-train-all-btn + --static modifier (직전 .snn-grid-build-btn
          영역 GRID 영역 다른 styling catch). 빨간 dot + dashed border + 정합
          padding 영역 GRID 영역 동일. font-size 영역 11px → 14px escalate
          (CSS .snn-grid-train-all-btn--static override) 영역 가독 정합. */}
      {isLiveMode && (
        <div className="snn-grid-train-all-btn snn-grid-train-all-btn--static pointer-events-none text-center">
          {/* UX Polish PR1 Fix 4 (HIGH [H4]): a11y dot — emoji 영역 swap. */}
          <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
          {/* PR (manual-trigger-paradigm, 사용자 catch 2026-05-10): copy 정정 —
              직전 "처음 보는 자세는 자동 30회 학습" 영역 자동 학습 paradigm 영역
              잔여. 사용자 명시 paradigm 영역 "추론 button click 영역 학습 +
              추론 trigger" 영역 정합. */}
          LIVE — 카메라 자세 후 추론 버튼을 누르세요. 처음 보는 자세는 30회 학습 + 새 cluster 추가.
        </div>
      )}

      <div className={`snn-pipeline-cam ${cameraConnected ? 'is-active' : 'is-empty'}`}>
        <video id="snn-cam-video" className="snn-camera-mirror snn-cam-video" playsInline muted />
        <canvas id="snn-cam-skel" className="snn-camera-mirror snn-cam-skel" width={640} height={480} />
        <div id="snn-cam-empty" className="snn-pipeline-cam-empty">
          <span>카메라 꺼짐 — 카메라 버튼으로 활성화</span>
        </div>
      </div>

      {/* PR-M (사용자 catch 2026-05-10): cluster preset row 영역 본격 폐기 —
          backend mode 영역 trainGesture path 영역 모두 제거 + Live mode 영역
          static pattern row 영역도 제거 (GridInput PR-L 정합). 사용자 vision —
          Live primary 영역 backend 폐기 권장. cluster identity 영역 ART
          vigilance 영역 자율 형성 — 사용자 명명 (RenameButton) 영역 별도 path. */}

      {/* PR (manual-trigger-paradigm, 사용자 catch 2026-05-10): Live 모드 영역
          추론 button 추가 — 사용자 명시 click 영역만 학습 + 추론 trigger.
          GridInput runInferAuto 영역 정합 mirror. lastFeatureRef 영역 마지막
          sharpened hand-feature 영역 catch (hand-feature event listener 영역
          보존). 학습 reset button 영역 옆 cohabit (snn-grid-actions row). */}
      {isLiveMode && (
        <div className="snn-grid-actions">
          <button
            type="button"
            className="snn-grid-infer-btn snn-grid-infer-btn--primary"
            onClick={runInferAuto}
            disabled={isBusy || !cameraConnected}
            aria-label={
              isAutoLearning
                ? '추론 — 학습 진행 중 영역 대기'
                : '추론 — 마지막 손 자세 영역 학습 + 추론 (STDP off → 신규 vigilance miss → 자동 학습)'
            }
            title={
              isAutoLearning
                ? '학습 중 — 추론 대기 (신규 패턴 30회 학습 후 enable)'
                : !cameraConnected
                  ? '카메라 미연결 — 좌측 카메라 버튼으로 활성화'
                  : '마지막 손 자세 영역 추론 (신규 자세 영역 자동 30회 학습)'
            }
          >
            {isAutoLearning ? '학습 중…' : '추론'}
          </button>
          <button
            type="button"
            className="snn-grid-reset-btn snn-grid-reset-btn--danger"
            onClick={resetLearningLive}
            disabled={isBusy}
            aria-label="학습 가중치 reset — fresh build restore (gesture)"
            title="학습 가중치 + 학습 횟수 영역 fresh build default 영역 restore — saturation escape mandatory"
          >
            학습 reset
          </button>
        </div>
      )}

      {/* PR #192 polish (UX-1): aria-live polite + role=status — 백그라운드
          push event 영역 status swap 영역 screen reader 영역 정합. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`snn-grid-status snn-grid-status--${status.kind}`}
      >
        <span>{statusLine}</span>
      </div>
    </div>
  );
}
