'use client';

// CameraInput — MediaPipe hand 자세 → SNN 학습 / 추론.
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
// cluster 매핑 (feature-encoder.ts 영역 정합):
//   0 = Pointing (─ index 강조)
//   1 = Open Palm (모든 finger 펴짐)
//   2 = Closed Fist (모든 finger 굽힘)
//   3 = Victory (index+middle 펴짐)

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import {
  emitBackendEvent,
  onBackendEvent,
  type GridTrainingDetail,
  type GridInferDetail,
  type NeuronFiringDetail,
  type HandFeatureDetail,
  type InputModeDetail,
} from '@/lib/backend/events';
import { useEngineMode } from '@/lib/snn/engine-mode';
import {
  GESTURE_CLUSTER_ACTIVE_INPUTS,
  sharpenForGesture,
} from '@/lib/mediapipe/feature-encoder';
import { getLiveSnn, onLiveTick } from '@/lib/snn/live-snn';
import { getRootLocalSnnFor } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import {
  GESTURE_LABEL_TO_CLUSTER,
  GESTURE_CONFIDENCE_MIN,
  GESTURE_STABLE_FRAMES,
} from '@/lib/snn/use-hand-control';
// PR-K (사용자 catch 2026-05-09 catch 1): ART vigilance threshold — GridInput
// 영역 동일 정합 (Carpenter & Grossberg 1987).
const ART_VIGILANCE_THRESHOLD = 0.15;

const GESTURE_LABELS = [
  'Pointing',
  'Open Palm',
  'Closed Fist',
  'Victory',
] as const;
// 사용자 catch 2026-05-09 (3 신규 catch): status message glyph prefix 영역
// 본격 제거 — cluster index 보다 의미 catch (GESTURE_LABELS) 영역 swap.
// 직전 GESTURE_GLYPHS 영역 polyfill (─│╲╱) 영역 사용 0 영역 제거.

// PR #196 polish (UX LOW-1/2 + QA LOW-1): hint 영역 secondary line + 'warning'
// kind 영역 amber visual cue (낮은 confidence 영역 정합) + GridInput 영역 정합.
type Status =
  | { kind: 'idle' }
  | { kind: 'building' }
  | { kind: 'training'; cluster: number }
  | { kind: 'inferring' }
  | { kind: 'ok'; message: string; hint?: string }
  | { kind: 'warning'; message: string; hint?: string }
  | { kind: 'error'; message: string };

const TRAIN_FRAMES = 30;
const TRAIN_CHUNK = 5;

export default function CameraInput({ cameraConnected }: { cameraConnected: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const lastFeatureRef = useRef<number[] | null>(null);
  const substrateBuiltRef = useRef<boolean>(false);
  const [engineMode] = useEngineMode();
  const isLiveMode = engineMode === 'live';
  // PR-K (사용자 catch 2026-05-09 catch 1): reinforcingCluster state 영역 본격
  // 폐기 — cluster 별 학습 button 영역 폐기 영역 in-flight gate 영역 caller 0.
  // engineMode 영역 useEffect listener closure 영역 stale catch — ref 영역
  // 동기화 후 listener 영역 ref.current 영역 read 사실.
  const engineModeRef = useRef(engineMode);
  useEffect(() => {
    engineModeRef.current = engineMode;
  }, [engineMode]);

  // event-driven 1-shot pivot (사용자 catch 2026-05-09 B): stable 자세 threshold
  // 영역 trigger gating. 직전 (A) 영역 background loop 200ms tick 영역 setPattern
  // 만 push, 본 정정 영역 stable cluster 변경 영역 1회 triggerOnce.
  //   - lastStableClusterRef: 직전 trigger cluster — 같은 cluster 영역 멱등 (재
  //     trigger 0). 새 cluster stable 영역 새 trigger.
  //   - hasHand=false 시점 영역 reset — 다음 동일 cluster stable 영역 새 trigger.
  //   - GESTURE_LABEL_TO_CLUSTER 매핑 + conf >= GESTURE_CONFIDENCE_MIN +
  //     stableCount >= GESTURE_STABLE_FRAMES 영역 동시 충족 영역만 trigger.
  const lastStableClusterRef = useRef<number | null>(null);
  const stableCountRef = useRef<number>(0);
  const lastGestureNameRef = useRef<string | null>(null);

  // hand-feature event listen → sharpened feature 보존.
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
    if (d.hasHand && d.feature && d.feature.length >= 16) {
      const sharpened = sharpenForGesture(d.feature);
      lastFeatureRef.current = sharpened;
      if (engineModeRef.current === 'live') {
        try {
          getLiveSnn().setPattern(sharpened);
        } catch {
          // SSR / live-snn 미초기화 — 무시.
        }
        // event-driven 1-shot trigger gating.
        const gName = d.gestureName ?? null;
        const gScore = d.gestureScore ?? 0;
        const mappable = gName !== null && GESTURE_LABEL_TO_CLUSTER[gName] !== undefined;
        const mappedCluster = mappable ? GESTURE_LABEL_TO_CLUSTER[gName!] : null;
        // stable count 추적 — 본 컴포넌트 내부 cluster gating 정합 (NodeLearn
        // teacher stable 영역 별도 path 영역 무관).
        if (mappable && gScore >= GESTURE_CONFIDENCE_MIN) {
          if (gName === lastGestureNameRef.current) {
            stableCountRef.current = Math.min(stableCountRef.current + 1, GESTURE_STABLE_FRAMES);
          } else {
            lastGestureNameRef.current = gName;
            stableCountRef.current = 1;
          }
        } else {
          lastGestureNameRef.current = null;
          stableCountRef.current = 0;
        }
        if (
          mappable &&
          gScore >= GESTURE_CONFIDENCE_MIN &&
          stableCountRef.current >= GESTURE_STABLE_FRAMES &&
          mappedCluster !== null &&
          lastStableClusterRef.current !== mappedCluster
        ) {
          lastStableClusterRef.current = mappedCluster;
          try {
            // PR-K (사용자 catch 2026-05-09 catch 1): stable-pose 자동 trigger
            // 영역 ART path 영역 wrap — 직전 triggerAsync (STDP off) → vigilance
            // 영역 자동 비교 + novel pattern 영역 30 trial auto-learn.
            // gestureName 영역 supervised label 영역 0 (사용자 catch 1: cluster
            // identity 영역 자율 형성) — 단 mediapipe 영역 stable-pose 영역
            // novel 영역 trigger 영역 충분 (vigilance 영역 worker 측정).
            getLiveSnn().triggerWithVigilance(sharpened, ART_VIGILANCE_THRESHOLD);
          } catch {
            // SSR / 미초기화 — 무시.
          }
        }
      }
    } else {
      lastFeatureRef.current = null;
      lastStableClusterRef.current = null;
      stableCountRef.current = 0;
      lastGestureNameRef.current = null;
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
  // 새 빈 네트워크를 만든 시점. substrate 재빌드 gate 를 다시 열어 다음 학습
  // 호출이 자동으로 gesture mapping 정합 substrate 를 빌드하도록 함.
  useEffect(() => onBackendEvent('circuit-changed', () => {
    substrateBuiltRef.current = false;
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

  // 사용자 catch 2026-05-09 [1]: buildSubstrate callback 영역 본격 제거 —
  // trainGesture / runInfer 영역 자동 빌드 (substrateBuiltRef gate) 영역 정합.

  const trainGesture = useCallback(async (clusterIdx: 0 | 1 | 2 | 3) => {
    if (lastFeatureRef.current === null) {
      setStatus({ kind: 'error', message: '카메라에 손을 보여주세요' });
      return;
    }
    setStatus({ kind: 'training', cluster: clusterIdx });
    emitBackendEvent<GridTrainingDetail>('grid-training', {
      kind: 'started', cluster: clusterIdx,
      framesDone: 0, framesTotal: TRAIN_FRAMES,
    });
    const client = getClient();
    if (!substrateBuiltRef.current) {
      const built = await client.presetOrientation({
        overwrite: true,
        clusterActiveInputs: GESTURE_CLUSTER_ACTIVE_INPUTS,
      });
      if (!built.ok) {
        setStatus({ kind: 'error', message: `회로 빌드 실패: ${built.reason}` });
        // 'started' 이미 emit 영역 NodeLearn 영역 isTraining=true stuck 회피.
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'error', cluster: clusterIdx, message: built.reason,
        });
        return;
      }
      substrateBuiltRef.current = true;
    }
    let totalCorrect = 0;
    let totalTrained = 0;
    for (let chunk = 0; chunk < TRAIN_FRAMES; chunk += TRAIN_CHUNK) {
      const size = Math.min(TRAIN_CHUNK, TRAIN_FRAMES - chunk);
      // 각 frame 별 lastFeature 영역 sample (사용자 자세 유지 가정).
      const patterns: number[][] = [];
      for (let k = 0; k < size; k += 1) {
        patterns.push([...(lastFeatureRef.current ?? new Array<number>(16).fill(0))]);
      }
      const r = await client.clusterTrainRStdp(patterns, clusterIdx, {
        observeMs: 50, stimulusDurationMs: 10,
      });
      if (!r.ok) {
        setStatus({ kind: 'error', message: `학습 실패: ${r.reason}` });
        // 'started' 이미 emit 영역 NodeLearn 영역 isTraining=true stuck 회피.
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'error', cluster: clusterIdx, message: r.reason,
        });
        return;
      }
      totalCorrect += r.data.correct;
      totalTrained += r.data.trained;
      emitBackendEvent<GridTrainingDetail>('grid-training', {
        kind: 'progress', cluster: clusterIdx,
        framesDone: chunk + size, framesTotal: TRAIN_FRAMES,
      });
      if (r.data.rates_by_region || r.data.active_neurons_by_region) {
        emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
          rates_by_region: r.data.rates_by_region,
          active_neurons_by_region: r.data.active_neurons_by_region,
        });
      }
    }
    const acc = totalTrained > 0 ? Math.round(totalCorrect / totalTrained * 100) : 0;
    setStatus({
      kind: 'ok',
      message: `${GESTURE_LABELS[clusterIdx]} ${acc}% (${totalCorrect}/${totalTrained})`,
    });
    emitBackendEvent<GridTrainingDetail>('grid-training', {
      kind: 'finished', cluster: clusterIdx,
      accuracy: totalTrained > 0 ? totalCorrect / totalTrained : 0,
      correct: totalCorrect, trained: totalTrained,
      framesDone: TRAIN_FRAMES, framesTotal: TRAIN_FRAMES,
    });
  }, []);

  // PR-K (사용자 catch 2026-05-09 catch 1): reinforceLive callback 영역 본격
  // 폐기 — cluster 별 supervised reinforce button 영역 모두 제거 + stable-pose
  // 자동 trigger (triggerWithVigilance) 영역 단일 path. backend mode 영역
  // trainGesture 영역 보존 (학술 검증 — 명시 supervised label 영역 신호).

  // PR #192 polish (UX-3 + QA FINDING-1/2): LiveTickDetail listener 영역 push
  // event 영역 trialToken match 영역 정확 reset (status copy + reinforcingCluster).
  useEffect(() => {
    if (engineMode !== 'live') return;
    return onLiveTick((d) => {
      if (d.source === 'reinforce' && d.trialToken !== undefined) {
        // PR-K (사용자 catch 2026-05-09 catch 1): auto-learn loop 영역 final
        // chunk 영역 status 영역 'auto-learn 완료' 영역 swap. 직전 cluster 별
        // 학습 button 영역 폐기 영역 별도 reinforcingCluster 영역 unused.
        const tc = d.targetCluster;
        const label = tc !== undefined && tc >= 0
          ? `패턴 ${tc + 1}`
          : '패턴';
        setStatus({
          kind: 'ok',
          message: `${label} 자동 학습 완료`,
          hint: 'ART vigilance 영역 신규 cluster 영역 자동 형성',
        });
      } else if (d.source === 'trigger') {
        // PR #196 polish (QA LOW-1, 2026-05-10): GridInput 영역 정합 — stable-
        // pose 자동 trigger 영역 push event 영역 winner < 0 || margin < 0.10
        // 영역 'warning' kind 영역 amber visual cue (낮은 confidence). 직전
        // silent 영역 사용자 catch 0 — Diehl & Cook 2015 winner margin 10%
        // threshold 정합 (NodeInfer MarginMeter 영역 정합). 정직 한계: stable-
        // pose 영역 background trigger 영역 status 영역 ok 영역 copy 0 — low-
        // conf 영역만 escalate (사용자 catch 영역 정합 path).
        const lowConf = d.winner < 0 || d.margin < 0.10;
        if (lowConf) {
          setStatus({
            kind: 'warning',
            message: '추론 (낮은 confidence)',
            hint: '자세 안정화 권장',
          });
        }
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
  const resetLearningLive = useCallback(async () => {
    if (engineMode !== 'live') return;
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        '학습 가중치 + 학습 횟수 + 추론 결과 영역 모두 reset 하시겠습니까?\n\n양 substrate (GRID/CAMERA) 영역 별도 학습 weight 영역 완벽 분리 — reset 영역 현재 CAMERA(gesture) substrate 영역만 적용. GRID(orientation) 학습 영역 보존.',
      );
      if (!confirmed) return;
    }
    setStatus({ kind: 'building' });
    try {
      const root = await getRootLocalSnnFor('gesture');
      // Step 1: worker fresh build — net.t / synapses / thresholds / monitor 모두 0.
      await root.client.resetClusterWeights();
      // Step 2: LiveSnn state-clear — trial/lastWinner/patternRef 0.
      try {
        getLiveSnn().resetTrigger();
      } catch {
        // SSR / 미초기화 — 무시.
      }
      // Step 3: UI count 영역 substrate-aware clear.
      clearExemplars('gesture');
      // Step 4: fresh weights 영역 영속.
      await root.lab.save();
      setStatus({ kind: 'ok', message: '학습 가중치 · trial · 추론 결과 모두 reset 완료' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `학습 reset 실패: ${msg}` });
    }
  }, [engineMode]);

  const runInfer = useCallback(async () => {
    if (lastFeatureRef.current === null) {
      setStatus({ kind: 'error', message: '카메라에 손을 보여주세요' });
      return;
    }
    setStatus({ kind: 'inferring' });
    emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'started' });
    const r = await getClient().injectPattern([...lastFeatureRef.current], { stdp: false });
    if (r.ok) {
      const cluster = r.data.winner_cluster ?? null;
      const winnerCluster = cluster !== null && cluster >= 0 && cluster <= 3
        ? (cluster as 0 | 1 | 2 | 3)
        : null;
      setStatus({ kind: 'ok', message: '추론 완료' });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'finished', winnerCluster });
    } else {
      setStatus({ kind: 'error', message: `추론 실패: ${r.reason}` });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: r.reason });
    }
  }, []);

  const isBusy = status.kind === 'building' || status.kind === 'training' || status.kind === 'inferring';

  // UX Polish PR1 Fix 4 (HIGH [H4], 2026-05-09): 🔴 emoji 영역 screen reader
  //   노이즈 catch — semantic Tailwind red-dot + aria-hidden 영역 swap.
  //   statusLine 영역 string → ReactNode (Live idle 케이스 dot 동봉).
  const statusLine = useMemo(() => {
    switch (status.kind) {
      case 'idle':
        if (isLiveMode) {
          return (
            <>
              <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
              {cameraConnected ? 'LIVE — 자세를 취하세요' : 'LIVE — 카메라 미연결'}
            </>
          );
        }
        return cameraConnected ? '카메라 준비됨 — 자세를 취하세요' : '카메라 미연결 (좌측 카메라 아이콘)';
      case 'building': return '회로 빌드 중…';
      case 'training': return `${GESTURE_LABELS[status.cluster]} 학습 중 (${TRAIN_FRAMES} frame)…`;
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
  }, [status, cameraConnected, isLiveMode]);

  return (
    <div className="snn-grid-input">
      {/* 사용자 catch 2026-05-09 [1]: '회로 빌드 (gesture)' button 제거 —
          trainGesture / runInfer 영역 자동 빌드 (substrateBuiltRef gate). */}
      {isLiveMode && (
        <div className="snn-grid-build-btn pointer-events-none text-center opacity-70">
          {/* UX Polish PR1 Fix 4 (HIGH [H4]): a11y dot — emoji 영역 swap. */}
          <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
          LIVE — 자세를 보여주면 즉시 학습 + 추론
        </div>
      )}

      <div className={`snn-pipeline-cam ${cameraConnected ? 'is-active' : 'is-empty'}`}>
        <video id="snn-cam-video" className="snn-camera-mirror snn-cam-video" playsInline muted />
        <canvas id="snn-cam-skel" className="snn-camera-mirror snn-cam-skel" width={640} height={480} />
        <div id="snn-cam-empty" className="snn-pipeline-cam-empty">
          <span>카메라 꺼짐 — 카메라 버튼으로 활성화</span>
        </div>
      </div>

      {/* PR-K (사용자 catch 2026-05-09 catch 1): cluster 별 학습 button × 4
          본격 폐기 — Live 모드 영역 stable-pose 자동 trigger (ART vigilance)
          영역 단일 path. backend mode 영역 trainGesture button 영역 보존
          (legacy supervised path — 학술 검증 영역 별도). cluster preset 영역
          static span 영역 cluster mapping 영역 시각 catch 영역 보존. */}
      {!isLiveMode && (
        <div className="snn-grid-presets">
          {GESTURE_LABELS.map((label, i) => (
            <div key={i} className="snn-grid-preset-row">
              <span className="snn-grid-preset-btn snn-grid-preset-btn--static" title={label}>
                <span className="snn-grid-preset-label">cluster {i}</span>
              </span>
              <button
                type="button"
                className="snn-grid-train-btn"
                onClick={() => trainGesture(i as 0 | 1 | 2 | 3)}
                disabled={(isBusy && !isLiveMode) || !cameraConnected}
                aria-label={`${label} 학습 — R-STDP (backend mode)`}
                title={
                  !cameraConnected
                    ? '카메라 미연결 — 카메라 버튼으로 활성화하세요'
                    : lastFeatureRef.current === null
                      ? '손이 인식되지 않음 — 카메라에 손을 보여주세요'
                      : `${label} 학습 (R-STDP, backend)`
                }
              >
                {`학습 ${i} (${label})`}
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Live 모드 영역 cluster mapping 영역 시각 catch 영역 static — stable-pose
          영역 자동 trigger 영역 ART vigilance path 영역 사용자 액션 0. */}
      {isLiveMode && (
        <div className="snn-grid-presets">
          {GESTURE_LABELS.map((label, i) => (
            <div key={i} className="snn-grid-preset-row">
              <span className="snn-grid-preset-btn snn-grid-preset-btn--static" title={label}>
                <span className="snn-grid-preset-label">{`패턴 ${i + 1} (${label})`}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {!isLiveMode && (
        <div className="snn-grid-actions">
          <button
            type="button"
            className="snn-grid-infer-btn"
            onClick={runInfer}
            disabled={isBusy || !cameraConnected}
            title={
              !cameraConnected
                ? '카메라 미연결 — 카메라 버튼으로 활성화하세요'
                : lastFeatureRef.current === null
                  ? '손이 인식되지 않음 — 카메라에 손을 보여주세요'
                  : '현재 자세로 추론 (STDP off)'
            }
          >
            추론
          </button>
        </div>
      )}
      {/* 사용자 catch 2026-05-09 [2] (Fix 5): Live 모드 영역 학습 reset button —
          GridInput 영역 mirror. substrate='gesture' 영역 catch (CAMERA path).
          GRID(orientation) 영역 별도 보존 — substrate isolation. */}
      {isLiveMode && (
        <div className="snn-grid-actions">
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
