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
  // PR audit fix (Fix 4 — LOW): Live reinforce in-flight 영역 visual gate —
  // 동일 cluster 영역 즉시 multi-click 영역 race 회피 + spinner-like feedback.
  // LiveSnn.reinforce 영역 internal serialize 영역 race 0 단 visual feedback
  // 영역 사용자 명시 catch.
  const [reinforcingCluster, setReinforcingCluster] = useState<number | null>(null);
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
            // PR-B (Web Worker background offload, 2026-05-10): triggerAsync swap.
            // 사용자 catch 2026-05-09 [2]: stable-pose 영역 추론 trigger 영역 main
            // thread block 0 — hand-feature event loop 영역 즉시 unblock 영역
            // 다음 frame 영역 lag 0. 결과 영역 worker push event 영역 별도 emit.
            getLiveSnn().triggerAsync();
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

  // PR4 — Live 전용 R-STDP positive reward (사용자 명시 라벨 신호).
  // 현재 lastFeature 영역 setPattern + reinforce(gain=2.0) — 즉시 1 회 inject
  // + run + lab.save (가중치 영속). 학술 정합: Hebbian + reward modulation
  // (Florian 2007, Izhikevich 2007 R-STDP 정합).
  // PR #192 polish (UX-3 + QA FINDING-1/2 token-aware reset): pending reinforce
  // trialToken 영역 ref 영역 push event listener 영역 match catch — 직전
  // setTimeout 100ms race 영역 회피.
  const pendingReinforceTokenRef = useRef<number | null>(null);

  const reinforceLive = useCallback((clusterIdx: 0 | 1 | 2 | 3) => {
    if (lastFeatureRef.current === null) {
      setStatus({ kind: 'error', message: '카메라에 손을 보여주세요' });
      return;
    }
    setStatus({ kind: 'training', cluster: clusterIdx });
    setReinforcingCluster(clusterIdx);
    try {
      const live = getLiveSnn();
      // PR #171 audit fix (Fix 2): setSubstrate 호출 영역 제거 — input-mode
      // event 영역 LiveSnn 자체 substrate kind 영역 derive.
      live.setPattern(lastFeatureRef.current);
      // PR-B (Web Worker background offload, 2026-05-10): reinforceAsync swap.
      // 사용자 catch 2026-05-09 [2] 정정 — 즉시 return + 결과 영역 worker push
      // event 영역 별도 emit (NodeLearn / NodeInfer 영역 자동 sync).
      // PR #192 polish (UX-2): status 영역 진행형 ('보강 중…') swap.
      // PR #192 polish (UX-3 + QA FINDING-1/2): trialToken capture + listener.
      // QA CAUSE D fix (2026-05-10): rewardGain 2.0 → 0.8 — saturation overshoot
      // 회피 (1회 reinforce 영역 W_MAX 도달 영역 saturation 영역 root cause).
      const { trialToken } = live.reinforceAsync(clusterIdx, 0.8);
      pendingReinforceTokenRef.current = trialToken;
      // QA FINDING-2 fix (2026-05-10): safety-net 2000ms → 8000ms — worker
      // simulation (n13 ~848 neurons + ~100k synapses × 1500 steps × 3 repeats)
      // 영역 throttled CPU (mobile) 영역 ≥2s 가능 + worker bundle fail 영역
      // MainThreadTransport fallback 영역 main thread block 영역 catch.
      setTimeout(() => {
        if (pendingReinforceTokenRef.current === trialToken) {
          pendingReinforceTokenRef.current = null;
          setReinforcingCluster(null);
          // PR #196 polish (UX LOW-1): hint 영역 secondary line split — 모바일
          // 320px wrap 정합.
          setStatus((s) => s.kind === 'training'
            ? { kind: 'ok', message: `${GESTURE_LABELS[clusterIdx]} 보강 완료 *`, hint: '(timeout — 새로고침 권장)' }
            : s);
        }
      }, 8000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `보강 실패: ${msg}` });
      setReinforcingCluster(null);
      pendingReinforceTokenRef.current = null;
    }
  }, []);

  // PR #192 polish (UX-3 + QA FINDING-1/2): LiveTickDetail listener 영역 push
  // event 영역 trialToken match 영역 정확 reset (status copy + reinforcingCluster).
  useEffect(() => {
    if (engineMode !== 'live') return;
    return onLiveTick((d) => {
      if (d.source === 'reinforce' && d.trialToken !== undefined) {
        if (pendingReinforceTokenRef.current === d.trialToken) {
          pendingReinforceTokenRef.current = null;
          setReinforcingCluster(null);
          const tc = d.targetCluster;
          const label = (tc !== undefined && tc >= 0 && tc < GESTURE_LABELS.length)
            ? GESTURE_LABELS[tc]
            : '패턴';
          setStatus({ kind: 'ok', message: `${label} 보강 완료` });
        }
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
  const resetLearningLive = useCallback(async () => {
    if (engineMode !== 'live') return;
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        '학습 가중치 + 학습 횟수 영역 fresh build default 영역 restore 하시겠습니까?\n\n현재 학습 영역 모두 폐기 — 사용자 catch 영역 saturation escape 영역 mandatory.',
      );
      if (!confirmed) return;
    }
    setStatus({ kind: 'building' });
    try {
      const root = await getRootLocalSnnFor('gesture');
      await root.client.resetClusterWeights();
      await root.lab.save();
      clearExemplars('gesture');
      setStatus({ kind: 'ok', message: '학습 가중치 + 학습 횟수 영역 reset 완료' });
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

      <div className="snn-grid-presets">
        {GESTURE_LABELS.map((label, i) => (
          <div key={i} className="snn-grid-preset-row">
            {/* 사용자 catch 2026-05-09 [1]: gesture cluster preset button 영역
                disabled button 영역 noise (interactive disabled) → static span swap.
                gesture preset 영역 클릭 의미 0 (cluster slot label 영역만). */}
            <span className="snn-grid-preset-btn snn-grid-preset-btn--static" title={label}>
              <span className="snn-grid-preset-label">cluster {i}</span>
            </span>
            <button
              type="button"
              className="snn-grid-train-btn"
              onClick={
                isLiveMode
                  ? () => reinforceLive(i as 0 | 1 | 2 | 3)
                  : () => trainGesture(i as 0 | 1 | 2 | 3)
              }
              disabled={
                (isBusy && !isLiveMode) ||
                !cameraConnected ||
                (isLiveMode && reinforcingCluster !== null)
              }
              aria-busy={isLiveMode && reinforcingCluster === i}
              title={
                !cameraConnected
                  ? '카메라 미연결 — 카메라 버튼으로 활성화하세요'
                  : lastFeatureRef.current === null
                    ? '손이 인식되지 않음 — 카메라에 손을 보여주세요'
                    : isLiveMode
                      ? reinforcingCluster === i
                        ? `${label} 패턴 보강 진행 중…`
                        : reinforcingCluster !== null
                          ? '다른 cluster 패턴 보강 진행 중 — 잠시 대기'
                          : `${label} 현재 패턴 보강 (R-STDP gain ↑ — winner cluster boosting)`
                      : `${label} 학습 (R-STDP)`
              }
            >
              {/* 사용자 catch 2026-05-09 (QA HIGH-1): '강화' 영역 R-STDP cluster-
                  specific gradient 0 영역 정직 라벨 swap — '현재 패턴 보강'. */}
              {isLiveMode
                ? reinforcingCluster === i
                  ? '보강 중…'
                  : '현재 패턴 보강'
                : '학습'}
            </button>
          </div>
        ))}
      </div>

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
