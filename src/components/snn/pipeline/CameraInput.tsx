'use client';

// CameraInput — MediaPipe hand 자세 → SNN 학습 / 추론.
// 사용자 catch 2026-05-08 (제스처 검증 path Y' 정합):
//   - hand-feature event → sharpenForGesture (binary cluster-exclusive)
//   - 회로 빌드 시점 영역 GESTURE_CLUSTER_ACTIVE_INPUTS 영역 substrate
//   - 학습/추론 path 영역 GridInput 영역 동일 (cluster_train_rstdp /
//     inject_feature16) 단 input source 영역 카메라.
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
} from '@/lib/backend/events';
import {
  GESTURE_CLUSTER_ACTIVE_INPUTS,
  sharpenForGesture,
} from '@/lib/mediapipe/feature-encoder';

const GESTURE_LABELS = [
  'Pointing',
  'Open Palm',
  'Closed Fist',
  'Victory',
] as const;
// Unicode VS-15 (U+FE0E) — text presentation 강제. ☝ 가 platform 따라
// 컬러 emoji 로 렌더되는 catch (사용자 catch 2026-05-09: cluster 0 만
// 모양이 다른 catch). 4 글리프 모두 동일 텍스트 스타일 통일.
const GESTURE_GLYPHS = ['☝︎', '✋︎', '✊︎', '✌︎'] as const;

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

  // hand-feature event listen → sharpened feature 보존.
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
    if (d.hasHand && d.feature && d.feature.length >= 16) {
      lastFeatureRef.current = sharpenForGesture(d.feature);
    } else {
      lastFeatureRef.current = null;
    }
  }), []);

  // circuit-changed event — HF Spaces 컨테이너 재시작 등으로 backend 가
  // 새 빈 네트워크를 만든 시점. substrate 재빌드 gate 를 다시 열어 다음 학습
  // 호출이 자동으로 gesture mapping 정합 substrate 를 빌드하도록 함.
  useEffect(() => onBackendEvent('circuit-changed', () => {
    substrateBuiltRef.current = false;
    setStatus({ kind: 'idle' });
  }), []);

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

  const statusLine = useMemo(() => {
    switch (status.kind) {
      case 'idle': return cameraConnected ? '카메라 준비됨 — 자세를 취하세요' : '카메라 미연결 (좌측 카메라 아이콘)';
      case 'building': return '회로 빌드 중…';
      case 'training': return `${GESTURE_GLYPHS[status.cluster]} 학습 중 (${TRAIN_FRAMES} frame)…`;
      case 'inferring': return '추론 중…';
      case 'ok': return status.message;
      case 'error': return status.message;
    }
  }, [status, cameraConnected]);

  return (
    <div className="snn-grid-input">
      <button
        type="button"
        className="snn-grid-build-btn"
        onClick={buildSubstrate}
        disabled={isBusy || !cameraConnected}
      >
        회로 빌드 (gesture)
      </button>

      <div className={`snn-pipeline-cam ${cameraConnected ? 'is-active' : 'is-empty'}`}>
        <video id="snn-cam-video" className="snn-camera-mirror snn-cam-video" playsInline muted />
        <canvas id="snn-cam-skel" className="snn-camera-mirror snn-cam-skel" width={640} height={480} />
        <div id="snn-cam-empty" className="snn-pipeline-cam-empty">
          <span>Camera off — enable from sidebar</span>
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
              onClick={() => trainGesture(i as 0 | 1 | 2 | 3)}
              disabled={isBusy || !cameraConnected}
              title={`R-STDP 학습 — ${label}`}
            >
              학습
            </button>
          </div>
        ))}
      </div>

      <div className="snn-grid-actions">
        <button
          type="button"
          className="snn-grid-infer-btn"
          onClick={runInfer}
          disabled={isBusy || !cameraConnected}
        >
          추론
        </button>
      </div>

      <div className={`snn-grid-status snn-grid-status--${status.kind}`}>
        <span>{statusLine}</span>
      </div>
    </div>
  );
}
