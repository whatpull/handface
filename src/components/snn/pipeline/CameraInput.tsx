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
import { getLiveSnn } from '@/lib/snn/live-snn';

const GESTURE_LABELS = [
  'Pointing',
  'Open Palm',
  'Closed Fist',
  'Victory',
] as const;
// 사용자 catch 2026-05-09: 직전 emoji glyph (☝︎ ✋︎ ✊︎ ✌︎) 영역 VS-15
// 적용해도 platform 별 컬러 emoji 로 렌더 — cluster 0 만 다른 모양 catch.
// orientation glyph (─│╲╱) 영역 GRID 모드 영역 정합 + 모든 platform 영역
// 동일 monochrome 렌더 보장. cluster slot 개념 영역 추상 — 의미 영역
// GESTURE_LABELS 영역 전달.
const GESTURE_GLYPHS = ['─', '│', '╲', '╱'] as const;

type Status =
  | { kind: 'idle' }
  | { kind: 'building' }
  | { kind: 'training'; cluster: number }
  | { kind: 'inferring' }
  | { kind: 'ok'; message: string }
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

  // hand-feature event listen → sharpened feature 보존.
  // PR4: Live 모드 시 즉시 LiveSnn.setPattern 영역 push (200ms tick 영역 inject).
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
  // 새 빈 네트워크를 만든 시점. substrate 재빌드 gate 를 다시 열어 다음 학습
  // 호출이 자동으로 gesture mapping 정합 substrate 를 빌드하도록 함.
  useEffect(() => onBackendEvent('circuit-changed', () => {
    substrateBuiltRef.current = false;
    setStatus({ kind: 'idle' });
  }), []);

  // PR4 — Live 모드 mount/unmount: LiveSnn start/stop 만.
  // PR #171 audit fix (Fix 2 — QA HIGH): substrate='gesture' 명시 setSubstrate
  // 호출 영역 제거 — LiveSnn 자체 input-mode event listener 영역 derive 영역
  // GridInput / CameraInput 동시 mount race 회피.
  useEffect(() => {
    if (engineMode !== 'live') return;
    // NodeInput input-mode emit 영역 LiveSnn 미초기화 시점 영역 missed catch —
    // CameraInput Live mount 시 idempotent re-emit 영역 substrate sync 보장.
    emitBackendEvent<InputModeDetail>('input-mode', { mode: 'camera' });
    const live = getLiveSnn();
    try {
      live.start();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `Live 시작 실패: ${msg}` });
    }
    return () => {
      try {
        live.stop();
      } catch {
        // ignore
      }
    };
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

  const buildSubstrate = useCallback(async () => {
    setStatus({ kind: 'building' });
    const r = await getClient().presetOrientation({
      overwrite: true,
      clusterActiveInputs: GESTURE_CLUSTER_ACTIVE_INPUTS,
    });
    if (r.ok) {
      substrateBuiltRef.current = true;
      setStatus({ kind: 'ok', message: '회로 빌드 완료 (gesture mapping)' });
    } else {
      setStatus({ kind: 'error', message: `회로 빌드 실패: ${r.reason}` });
    }
  }, []);

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
      message: `${GESTURE_GLYPHS[clusterIdx]} ${acc}% (${totalCorrect}/${totalTrained})`,
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
  const reinforceLive = useCallback(async (clusterIdx: 0 | 1 | 2 | 3) => {
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
      // PR audit fix (Fix 1 — MEDIUM): reinforce 영역 saveFailed flag 영역 read
      // 영역 user-visible warning 표시 — 직전 silent fail catch.
      const result = await live.reinforce(clusterIdx, 2.0);
      // PR audit fix (Fix 3 — MEDIUM): 'reinforced' 영역 한국어 swap.
      if (result.saveFailed) {
        setStatus({
          kind: 'ok',
          message: `${GESTURE_GLYPHS[clusterIdx]} 강화 +1 (저장 실패 — 새로고침 전 다시 강화 권장)`,
        });
      } else {
        setStatus({
          kind: 'ok',
          message: `${GESTURE_GLYPHS[clusterIdx]} 강화 +1`,
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `강화 실패: ${msg}` });
    } finally {
      setReinforcingCluster(null);
    }
  }, []);

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
      case 'training': return `${GESTURE_GLYPHS[status.cluster]} 학습 중 (${TRAIN_FRAMES} frame)…`;
      case 'inferring': return '추론 중…';
      case 'ok': return status.message;
      case 'error': return status.message;
    }
  }, [status, cameraConnected, isLiveMode]);

  return (
    <div className="snn-grid-input">
      {!isLiveMode && (
        <button
          type="button"
          className="snn-grid-build-btn"
          onClick={buildSubstrate}
          disabled={isBusy || !cameraConnected}
        >
          회로 빌드 (gesture)
        </button>
      )}
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
            <button
              type="button"
              className="snn-grid-preset-btn"
              disabled
              title={label}
            >
              <span className="snn-grid-preset-glyph">{GESTURE_GLYPHS[i]}</span>
              <span className="snn-grid-preset-label">cluster {i}</span>
            </button>
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
              aria-busy={isLiveMode && reinforcingCluster === i ? true : false}
              title={
                !cameraConnected
                  ? '카메라 미연결 — 카메라 버튼으로 활성화하세요'
                  : lastFeatureRef.current === null
                    ? '손이 인식되지 않음 — 카메라에 손을 보여주세요'
                    : isLiveMode
                      ? reinforcingCluster === i
                        ? `${label} 강화 진행 중…`
                        : reinforcingCluster !== null
                          ? '다른 cluster 강화 진행 중 — 잠시 대기'
                          : `${label} 강화 (R-STDP 보상)`
                      : `${label} 학습 (R-STDP)`
              }
            >
              {isLiveMode
                ? reinforcingCluster === i
                  ? '강화 중…'
                  : '강화'
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

      <div className={`snn-grid-status snn-grid-status--${status.kind}`}>
        <span>{statusLine}</span>
      </div>
    </div>
  );
}
