'use client';

// CameraInput — Hand SNN 용 webcam input + landmark detection 시각화
// (Phase 3.2, 2026-06-03).
//
// 정직 한계:
//   - SSR 에서 webcam / MediaPipe WASM 미지원 → 'use client' mandatory.
//   - Phase 3.1 의 landmarker library setup 위에서 동작 — 본 컴포넌트는
//     webcam preview + landmark visualization 만 담당.
//   - 학습 trigger (orientation-hand substrate 와의 wire) 는 Phase 3.4
//     에서 추가 — 본 cycle 은 webcam + landmark 시각화 까지.
//   - 사용자 webcam permission deny 시 graceful fallback (안내 message).
//
// 사용자 view:
//   webcam video preview + 21 landmarks (점 + 손가락 연결 선)
//   ↓
//   "이 자세 학습" button (Phase 3.4 부터 활성화)

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import {
  attachWebcamToVideo,
  createHandLandmarker,
  detectLandmarks,
  disposeHandLandmarker,
  stopWebcamStream,
  type HandLandmark,
} from '@/lib/hand-tracking/landmarker';
import { encodeHandToFeatureVector } from '@/lib/snn-runtime/hand-spike-encoder';
import { getLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import {
  loadExemplars,
  removeClusterExemplar,
  setExemplarLabel,
  subscribeExemplars,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import { classifyGesture } from '@/lib/hand-tracking/gesture-classifier';
import { onBackendEvent, type ClusterSpawnedDetail } from '@/lib/backend/events';
import { showDialog } from '@/components/ui/Dialog';
import { showToast } from '@/components/ui/Toast';
import { downloadHandLearning, triggerImportDialog } from '@/lib/snn/hand-learning-export';
import { usePipelineEvents } from './PipelineEventContext';

const HAND_SUBSTRATE = 'orientation-hand' as const;

type CameraStatus =
  | { kind: 'idle' }
  | { kind: 'initializing' }
  | { kind: 'ready' }
  | { kind: 'error'; message: string };

// 21-keypoint 사이의 손가락 연결을 line 으로 시각화.
const FINGER_CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  // Thumb: wrist → CMC → MCP → IP → TIP
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index: wrist → MCP → PIP → DIP → TIP
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle: MCP → PIP → DIP → TIP (wrist 직결 없음 — index MCP 경유)
  [5, 9], [9, 10], [10, 11], [11, 12],
  // Ring: MCP → PIP → DIP → TIP
  [9, 13], [13, 14], [14, 15], [15, 16],
  // Pinky: wrist → MCP → PIP → DIP → TIP
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

export default function CameraInput() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Phase 3.9 v37 (2026-06-03): capacity pill 클릭 → 자세 list 영역으로 scroll.
  const clustersRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameTsRef = useRef<number>(0);

  const [status, setStatus] = useState<CameraStatus>({ kind: 'idle' });
  const [handDetected, setHandDetected] = useState<boolean>(false);
  // Phase 3.9 v39 (2026-06-04): MediaPipe handedness 표시.
  // 좌우 손 모두 동일 cluster 영역 학습 가능 — 사용자 mental model 영역
  // "어느 손 인식 중" catch 가능. 직전 silent path.
  const [handedness, setHandedness] = useState<'Left' | 'Right' | null>(null);
  // Phase 3.9 v41 (2026-06-04): relative time tick — cluster row "마지막: N전"
  // 표시 영역 매 10초 영역 re-render. lastAt 영역 Date.now() 차이 영역 직접 계산.
  const [, setRelativeTimeTick] = useState<number>(0);
  useEffect(() => {
    const id = setInterval(() => setRelativeTimeTick((t) => t + 1), 10000);
    return () => clearInterval(id);
  }, []);
  // Phase 3.9 v52 (2026-06-04): stability threshold 사용자 조정.
  // 빠른 손 (민감) / 보통 / 안정 (느린 손) — wrist variance threshold 조정.
  const STABILITY_KEY = 'handface.camera.stability-mode.v1';
  type StabilityMode = 'sensitive' | 'normal' | 'strict';
  const STABILITY_THRESHOLD_MAP: Record<StabilityMode, number> = {
    sensitive: 0.0010,  // 더 큰 변동 허용
    normal: 0.0004,     // 기본 (v16)
    strict: 0.00015,    // 더 엄격
  };
  const [stabilityMode, setStabilityMode] = useState<StabilityMode>(() => {
    if (typeof window === 'undefined') return 'normal';
    try {
      const raw = window.localStorage.getItem(STABILITY_KEY);
      if (raw === 'sensitive' || raw === 'normal' || raw === 'strict') return raw;
    } catch { /* noop */ }
    return 'normal';
  });
  const handleStabilityModeChange = useCallback((mode: StabilityMode): void => {
    setStabilityMode(mode);
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem(STABILITY_KEY, mode); } catch { /* noop */ }
    }
  }, []);
  const stabilityThresholdRef = useRef(STABILITY_THRESHOLD_MAP[stabilityMode]);
  useEffect(() => {
    stabilityThresholdRef.current = STABILITY_THRESHOLD_MAP[stabilityMode];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stabilityMode]);
  // Phase 3.4: 학습 trigger 가 마지막 landmarks 를 ref 로 보존 (button click 시 사용).
  const latestLandmarksRef = useRef<HandLandmark[] | null>(null);
  // Phase 3.9 v16 (2026-06-03): stability detection — 흔들리는 손에서 spawn 회피.
  // 직전 5 frame 의 wrist 위치 (latest 5 entries ring buffer). variance 작으면
  // stable 로 판단 → auto-mode 가 stable 시에만 trigger.
  const recentWristRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const [isStable, setIsStable] = useState<boolean>(false);
  const [triggerStatus, setTriggerStatus] = useState<string | null>(null);
  // Phase 3.5: 학습된 hand cluster exemplars + label.
  const [exemplars, setExemplars] = useState<OutExemplars>(() =>
    typeof window === 'undefined' ? {} : loadExemplars(HAND_SUBSTRATE),
  );

  // Phase 3.8 (2026-06-03): 실시간 인식 indicator — usePipelineEvents 의
  // winnerCluster + exemplars 의 label 을 결합해 "→ 인식: cluster N (label)" 표시.
  // Phase 3.9 v14 (2026-06-03): isAutoLearning 도 같이 destructure — auto-mode
  // 가 학습 진행 중 trigger skip.
  const { winnerCluster, consecutiveWinnerCount, isAutoLearning, handCosineSim, handSyncStatus } = usePipelineEvents();
  // Phase 3.9 v30 (2026-06-03): sync pill auto-hide — 'done' 상태 5초 후
  // 자동 fade-out (사용자가 영구 표시 원치 않음). 'syncing' / 'failed' 는
  // 유지 (사용자가 catch 해야 하는 상태).
  const [showSyncPill, setShowSyncPill] = useState<boolean>(true);
  useEffect(() => {
    if (!handSyncStatus) return;
    if (handSyncStatus.phase === 'syncing' || handSyncStatus.phase === 'failed') {
      setShowSyncPill(true);
      return;
    }
    // 'done' — 5초 후 자동 hide.
    setShowSyncPill(true);
    const timer = setTimeout(() => setShowSyncPill(false), 5000);
    return () => clearTimeout(timer);
  }, [handSyncStatus]);
  // cluster 인덱스 → 그 cluster 의 첫 번째 exemplar label 추출
  // (exemplars 는 outKey=out_N_M 단위 — 동일 cluster 의 모든 neuron 은 공통 label 가정).
  const labelByCluster = useMemo(() => {
    const map: Record<number, string> = {};
    for (const [outKey, ex] of Object.entries(exemplars)) {
      const m = /^out_(\d+)_/.exec(outKey);
      if (!m) continue;
      const ci = Number(m[1]);
      if (ex.label && !map[ci]) map[ci] = ex.label;
    }
    return map;
  }, [exemplars]);
  const winnerLabel = winnerCluster !== null ? labelByCluster[winnerCluster] : null;

  // 메인 frame loop — RAF 로 frame 마다 landmark detection + canvas 시각화.
  const startDetectionLoop = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const landmarker = await createHandLandmarker();

    const loop = () => {
      if (!videoRef.current || !canvasRef.current) return;
      const v = videoRef.current;
      const c = canvasRef.current;
      const ctx = c.getContext('2d');
      if (!ctx) return;

      // canvas 크기를 video 해상도에 맞춤.
      if (c.width !== v.videoWidth || c.height !== v.videoHeight) {
        c.width = v.videoWidth || 640;
        c.height = v.videoHeight || 480;
      }

      // landmark detection.
      const ts = performance.now();
      if (ts - lastFrameTsRef.current > 30) { // 30ms throttle (~33fps max)
        lastFrameTsRef.current = ts;
        const result = detectLandmarks(v, landmarker, ts);

        // canvas clear.
        ctx.clearRect(0, 0, c.width, c.height);

        if (result && result.landmarks.length > 0) {
          setHandDetected(true);
          const hand: HandLandmark[] = result.landmarks[0];
          latestLandmarksRef.current = hand;
          // v39: handedness 가 변경된 경우만 state update (불필요 re-render 회피).
          const detectedHandedness = result.handedness?.[0] ?? null;
          setHandedness((prev) => prev === detectedHandedness ? prev : detectedHandedness);
          drawLandmarks(ctx, hand, c.width, c.height);

          // Phase 3.9 v16: stability check — 직전 5 frame 의 wrist 위치 variance.
          const wrist = hand[0];
          const buf = recentWristRef.current;
          buf.push({ x: wrist.x, y: wrist.y, t: ts });
          // Keep only last 5 entries within 600ms window.
          while (buf.length > 5 || (buf.length > 0 && ts - buf[0].t > 600)) {
            buf.shift();
          }
          if (buf.length >= 3) {
            let meanX = 0, meanY = 0;
            for (const p of buf) { meanX += p.x; meanY += p.y; }
            meanX /= buf.length; meanY /= buf.length;
            let variance = 0;
            for (const p of buf) {
              variance += (p.x - meanX) ** 2 + (p.y - meanY) ** 2;
            }
            variance /= buf.length;
            // v52: stability threshold 영역 사용자 조정 (sensitive/normal/strict).
            setIsStable(variance < stabilityThresholdRef.current);
          } else {
            setIsStable(false);
          }
        } else {
          setHandDetected(false);
          setHandedness(null);
          latestLandmarksRef.current = null;
          recentWristRef.current = [];
          setIsStable(false);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const triggerLearn = useCallback((): void => {
    const landmarks = latestLandmarksRef.current;
    if (!landmarks || landmarks.length !== 21) {
      setTriggerStatus('⚠ landmarks 미감지');
      return;
    }
    try {
      // Phase 3.4: hand landmarks (21 × {x,y,z}) → encodeHandToFeatureVector
      // → 95-dim feature vector → triggerWithVigilance.
      // Phase 3.9 v12 (2026-06-03): v7 cosine override 가 vigilance 결정 →
      // 여기 vigilance 는 worker fallback path 만 사용.
      const featureVec = encodeHandToFeatureVector(landmarks);
      const live = getLiveSnn();
      const { trialToken } = live.triggerWithVigilance(featureVec, 0.3);
      setTriggerStatus(`✓ trigger (token ${trialToken})`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setTriggerStatus(`✗ trigger 실패: ${msg}`);
    }
  }, []);

  // Phase 3.9 v13 (2026-06-03): 자동 trigger 모드.
  // 사용자 요청 "이제 학습/인식 버튼 없이 그냥 새로운 자세면 인식하면 안되나요?"
  // → 매 N초마다 자동 trigger. v7 cosine override:
  //   - 같은 자세 (cos > threshold) → MATCH, no spawn, winner 인식
  //   - 새 자세 (cos < threshold) → SPAWN, 자동 학습
  // Phase 3.9 v14 (2026-06-03 사용자 catch): 직전 1초 interval → SNN 학습 진행
  // 중에 다음 trigger 발사 → spawn race → cluster pool 빠르게 exhausted. 정정:
  //   1. interval 1초 → 2.5초 (학습 진행 여유)
  //   2. isAutoLearning 체크 — 학습 진행 중이면 trigger skip
  const [autoMode, setAutoMode] = useState<boolean>(true);
  // Phase 3.9 v38 (2026-06-04): auto interval 사용자 조정 — 빠름 1s / 보통 2.5s
  // / 느림 5s. localStorage persist (다음 session 도 유지). 직전 2.5s 고정.
  const AUTO_INTERVAL_KEY = 'handface.camera.auto-interval-ms.v1';
  type IntervalMode = 'fast' | 'normal' | 'slow';
  const INTERVAL_MS_MAP: Record<IntervalMode, number> = { fast: 1000, normal: 2500, slow: 5000 };
  const [intervalMode, setIntervalMode] = useState<IntervalMode>(() => {
    if (typeof window === 'undefined') return 'normal';
    try {
      const raw = window.localStorage.getItem(AUTO_INTERVAL_KEY);
      if (raw === 'fast' || raw === 'normal' || raw === 'slow') return raw;
    } catch { /* noop */ }
    return 'normal';
  });
  const handleIntervalModeChange = useCallback((mode: IntervalMode): void => {
    setIntervalMode(mode);
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem(AUTO_INTERVAL_KEY, mode); } catch { /* noop */ }
    }
  }, []);
  useEffect(() => {
    if (!autoMode) return;
    if (status.kind !== 'ready') return;
    const intervalMs = INTERVAL_MS_MAP[intervalMode];
    const interval = setInterval(() => {
      if (isAutoLearning) return; // 학습 진행 중 — 다음 cycle 까지 대기
      if (!isStable) return; // Phase 3.9 v16: 흔들리는 손에서 trigger skip
      if (latestLandmarksRef.current && latestLandmarksRef.current.length === 21) {
        triggerLearn();
      }
    }, intervalMs);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMode, status, triggerLearn, isAutoLearning, isStable, intervalMode]);

  const initialize = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setStatus({ kind: 'initializing' });
    try {
      const stream = await attachWebcamToVideo(video);
      streamRef.current = stream;
      await startDetectionLoop();
      setStatus({ kind: 'ready' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: msg });
    }
  }, [startDetectionLoop]);

  useEffect(() => {
    // mount 시 자동 초기화 없음 — 사용자 명시 click 으로 활성화 (privacy 정합).
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      stopWebcamStream(streamRef.current);
      streamRef.current = null;
      disposeHandLandmarker();
    };
  }, []);

  // Phase 3.5: exemplars subscribe — 학습 / label 변경 시 자동 갱신.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unsubscribe = subscribeExemplars(HAND_SUBSTRATE, (next) => {
      setExemplars(next);
    });
    return unsubscribe;
  }, []);

  // Phase 3.9 v40 (2026-06-04): cluster-spawned 시점 영역 rule-based gesture
  // classify → 의미 있는 라벨 자동 적용 (직전 "자세 N" numbering overwrite).
  // classify null 영역 fallback "자세 N" 그대로 유지.
  useEffect(() => {
    return onBackendEvent<ClusterSpawnedDetail>('cluster-spawned', (d) => {
      const lm = latestLandmarksRef.current;
      if (!lm || lm.length !== 21) return;
      const result = classifyGesture(lm);
      if (!result) return; // well-known 자세 매칭 안 됨 — manual 입력
      const outKey = `out_${d.clusterIdx}_0`;
      setExemplarLabel(outKey, HAND_SUBSTRATE, result.label);
      console.log(`[hand-gesture-classify] cluster ${d.clusterIdx} → "${result.label}" (kind=${result.kind}, conf=${result.confidence.toFixed(2)})`);
      showToast({
        kind: 'success',
        message: `자세 자동 인식: "${result.label}" — 이름 편집 버튼으로 변경 가능`,
      });
    });
  }, []);

  const handlePurge = useCallback((): void => {
    showDialog({
      kind: 'confirm',
      title: '학습된 제스처 전체 초기화',
      message: '모든 hand cluster 학습 데이터가 삭제됩니다 (IndexedDB + localStorage). 이 작업은 되돌릴 수 없습니다.',
      confirmLabel: '전체 초기화',
      cancelLabel: '취소',
      onConfirm: () => {
        void purgeAllLearningData();
      },
    });
  }, []);

  // Phase 3.9 v32 (2026-06-03): export / import 학습 데이터.
  const handleExport = useCallback((): void => {
    const result = downloadHandLearning();
    if (result.clusterCount === 0) {
      showToast({ kind: 'info', message: '학습 데이터가 비어있습니다 — 먼저 자세를 학습하세요.' });
      return;
    }
    showToast({
      kind: 'success',
      message: `백업 완료: ${result.clusterCount} 자세 (${(result.bytes / 1024).toFixed(1)} KB)`,
    });
  }, []);

  const handleImport = useCallback((): void => {
    showDialog({
      kind: 'confirm',
      title: '학습 데이터 복원',
      message: '백업 JSON 파일을 선택하세요. 현재 학습 데이터는 덮어쓰기 됩니다. 복원 후 페이지를 새로고침하면 자동 적용됩니다.',
      confirmLabel: '파일 선택',
      cancelLabel: '취소',
      onConfirm: () => {
        void triggerImportDialog().then((result) => {
          if (!result.ok) {
            showToast({ kind: 'error', message: result.message });
            return;
          }
          const warnText = result.warnings.length > 0 ? ` (경고 ${result.warnings.length}건)` : '';
          showToast({
            kind: 'success',
            message: `${result.message}${warnText} — 새로고침 후 반영됩니다.`,
          });
          for (const w of result.warnings) console.warn(`[hand-import]`, w);
        });
      },
    });
  }, []);

  const handleEditLabel = useCallback((outKey: string, currentLabel: string | null): void => {
    showDialog({
      kind: 'input',
      title: '제스처 이름 지정',
      message: '이 자세에 부여할 이름을 입력하세요 (예: 엄지척 / 주먹 / 손바닥)',
      defaultValue: currentLabel ?? '',
      placeholder: '제스처 이름',
      confirmLabel: '저장',
      cancelLabel: '취소',
      onSubmit: (value) => {
        const trimmed = value.trim();
        setExemplarLabel(outKey, HAND_SUBSTRATE, trimmed.length > 0 ? trimmed : null);
      },
    });
  }, []);

  // Phase 3.9 v35 (2026-06-03): drag-drop import — UX 보완 (file picker 외).
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      showToast({ kind: 'error', message: 'JSON 파일만 지원됩니다.' });
      return;
    }
    showDialog({
      kind: 'confirm',
      title: '학습 데이터 복원',
      message: `"${file.name}" 파일에서 학습 데이터를 복원합니다. 현재 학습 데이터는 덮어쓰기 됩니다.`,
      confirmLabel: '복원',
      cancelLabel: '취소',
      onConfirm: () => {
        const reader = new FileReader();
        reader.onload = async () => {
          const text = String(reader.result);
          const { importHandLearningFromJSON } = await import('@/lib/snn/hand-learning-export');
          const result = importHandLearningFromJSON(text);
          if (!result.ok) {
            showToast({ kind: 'error', message: result.message });
            return;
          }
          showToast({
            kind: 'success',
            message: `${result.message} — 새로고침 후 반영됩니다.`,
          });
          for (const w of result.warnings) console.warn('[hand-import]', w);
        };
        reader.onerror = () => showToast({ kind: 'error', message: '파일 읽기 실패' });
        reader.readAsText(file);
      },
    });
  }, []);

  // Phase 3.9 v33 (2026-06-03): per-cluster 삭제 — 19 자세 도달 시 일부만 지우기.
  const handleDeleteCluster = useCallback((clusterId: number, label: string | null): void => {
    const displayName = label ?? `cluster ${clusterId} (이름 없음)`;
    showDialog({
      kind: 'confirm',
      title: '자세 삭제',
      message: `"${displayName}" 자세를 삭제합니다. 이 작업은 되돌릴 수 없습니다.`,
      confirmLabel: '삭제',
      cancelLabel: '취소',
      onConfirm: () => {
        const live = getLiveSnn();
        const result = live.deleteHandCluster(clusterId);
        removeClusterExemplar(clusterId, HAND_SUBSTRATE);
        if (result.deleted) {
          showToast({
            kind: 'success',
            message: `"${displayName}" 삭제 완료 (남은 자세: ${result.remaining})`,
          });
        } else {
          showToast({ kind: 'info', message: '이미 삭제된 자세입니다.' });
        }
      },
    });
  }, []);

  return (
    <div className="snn-camera-input">
      <div className="snn-camera-preview">
        <video ref={videoRef} muted playsInline className="snn-camera-video" />
        <canvas ref={canvasRef} className="snn-camera-overlay" />{/* landmark overlay */}
        {status.kind === 'idle' && (
          <div className="snn-camera-overlay-msg">
            <button
              type="button"
              className="snn-camera-start-btn"
              onClick={initialize}
            >
              카메라 시작 (webcam permission 필요)
            </button>
          </div>
        )}
        {status.kind === 'initializing' && (
          <div className="snn-camera-overlay-msg">
            <span>초기화 중... MediaPipe 모델 로딩 (약 5-10초)</span>
          </div>
        )}
        {status.kind === 'error' && (
          <div className="snn-camera-overlay-msg snn-camera-error">
            <strong>카메라 사용 불가</strong>
            <small>{status.message}</small>
          </div>
        )}
      </div>

      <div className="snn-camera-status">
        {status.kind === 'ready' && (
          <span className={handDetected ? 'snn-camera-detected' : 'snn-camera-undetected'}>
            {handDetected ? '✓ Hand 감지됨 — 21 landmarks 추적 중' : '⚠ Hand 미감지 — 화면 안에 손을 보여주세요'}
          </span>
        )}
      </div>

      <div className="snn-camera-trigger">
        <label className="snn-camera-auto-toggle">
          <input
            type="checkbox"
            checked={autoMode}
            onChange={(e) => setAutoMode(e.target.checked)}
          />
          <span>자동 인식 / 학습 ({(INTERVAL_MS_MAP[intervalMode] / 1000).toFixed(1)}초 마다)</span>
        </label>
        {autoMode && (
          <>
            <div className="snn-camera-interval-toggle" aria-label="자동 trigger 간격">
              {(['fast', 'normal', 'slow'] as IntervalMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`snn-camera-interval-btn${intervalMode === mode ? ' snn-camera-interval-btn-active' : ''}`}
                  onClick={() => handleIntervalModeChange(mode)}
                  title={mode === 'fast' ? '빠른 학습 (1초) — 자세 자주 변경 시' : mode === 'normal' ? '보통 (2.5초) — 기본' : '느린 학습 (5초) — 한 자세 안정화'}
                >
                  {mode === 'fast' ? '빠름 1s' : mode === 'normal' ? '보통 2.5s' : '느림 5s'}
                </button>
              ))}
            </div>
            <div className="snn-camera-interval-toggle" aria-label="안정성 임계값">
              {(['sensitive', 'normal', 'strict'] as StabilityMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`snn-camera-interval-btn${stabilityMode === mode ? ' snn-camera-interval-btn-active' : ''}`}
                  onClick={() => handleStabilityModeChange(mode)}
                  title={mode === 'sensitive' ? '민감 — 손 영역 약간 흔들려도 trigger (빠른 손)' : mode === 'normal' ? '보통 — 기본 임계' : '안정 — 손 영역 매우 안정해야 trigger (정확도 ↑)'}
                >
                  {mode === 'sensitive' ? '민감' : mode === 'normal' ? '보통' : '안정'}
                </button>
              ))}
            </div>
          </>
        )}
        {!autoMode && (
          <button
            type="button"
            className="snn-camera-trigger-btn"
            disabled={status.kind !== 'ready' || !handDetected}
            onClick={triggerLearn}
          >
            이 자세 학습 / 인식
          </button>
        )}
        {autoMode && (
          <small className="snn-camera-auto-status">
            {status.kind === 'ready' && handDetected && isStable
              ? '◉ 자세 안정 — 자동 학습 / 인식 진행 중'
              : status.kind === 'ready' && handDetected
                ? '⚠ 손 흔들림 감지 — 자세 안정 시 자동 trigger'
                : status.kind === 'ready'
                  ? '⚠ Hand 미감지 — 화면 안에 손을 보여주세요'
                  : '카메라 준비 중...'}
          </small>
        )}
        {handDetected && handedness && (
          <small className={`snn-camera-handedness snn-camera-handedness-${handedness.toLowerCase()}`}>
            {handedness === 'Left' ? '왼손' : '오른손'} 인식 중
          </small>
        )}
        {triggerStatus && <small className="snn-camera-trigger-msg">{triggerStatus}</small>}
        {winnerCluster !== null && (
          <small className="snn-camera-winner-msg">
            → 인식: cluster {winnerCluster}
            {winnerLabel ? ` (${winnerLabel})` : ' (이름 없음)'}
            {consecutiveWinnerCount > 1 && (
              <span className="snn-camera-winner-stable"> · {consecutiveWinnerCount}회 연속</span>
            )}
          </small>
        )}
        {handCosineSim && (
          <small className={`snn-camera-sim-msg snn-camera-sim-${handCosineSim.strict ? 'strict' : handCosineSim.weak ? 'weak' : 'spawn'}`}>
            cosine sim: {handCosineSim.sim.toFixed(3)} · {handCosineSim.strict ? 'MATCH' : handCosineSim.weak ? '~MATCH' : 'NEW'}
          </small>
        )}
        {handSyncStatus && showSyncPill && (() => {
          const isCapacity = handSyncStatus.phase === 'failed' && (handSyncStatus.error?.includes('capacity') ?? false);
          const isSelfHeal = handSyncStatus.phase === 'failed' && handSyncStatus.error === 'self-heal';
          const pillClass = isCapacity ? 'capacity' : isSelfHeal ? 'selfheal' : handSyncStatus.phase;
          const msg = handSyncStatus.phase === 'syncing'
            ? `학습 데이터 sync 중 (${handSyncStatus.restoredFeatures} cluster)`
            : handSyncStatus.phase === 'done'
              ? handSyncStatus.syncedToWorker > 0
                ? `정상 (${handSyncStatus.syncedToWorker} cluster sync${handSyncStatus.fallbackCount > 0 ? `, ${handSyncStatus.fallbackCount} 복원` : ''})`
                : handSyncStatus.restoredFeatures === 0
                  ? '학습 데이터 없음 — 새 자세 학습 가능'
                  : '정상'
              : isCapacity
                ? `최대 ${handSyncStatus.restoredFeatures} 자세 도달 — 기존 자세 삭제 후 추가 가능`
                : isSelfHeal
                  ? '학습 데이터 자동 복구 중 — 잠시 후 정상 동작'
                  : `sync 실패: ${handSyncStatus.error ?? '알 수 없음'}`;
          return (
            <small className={`snn-camera-sync-msg snn-camera-sync-${pillClass}`}>
              {msg}
              {isCapacity && (
                <button
                  type="button"
                  className="snn-camera-sync-action"
                  onClick={() => clustersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
                  title="학습된 자세 목록으로 이동"
                >
                  자세 관리 ↓
                </button>
              )}
            </small>
          );
        })()}
      </div>

      <div
        ref={clustersRef}
        className={`snn-camera-clusters${isDragOver ? ' snn-camera-clusters-dragover' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="snn-camera-clusters-header">
          <span className="snn-camera-clusters-title">
            학습된 제스처
            {(() => {
              const clusterCount = new Set(Object.keys(exemplars).map(parseClusterId)).size;
              if (clusterCount === 0) return null;
              const max = 19;
              const ratioClass = clusterCount >= max ? 'full' : clusterCount >= max * 0.75 ? 'near' : 'ok';
              return (
                <>
                  <span className={`snn-camera-clusters-count snn-camera-clusters-count-${ratioClass}`}>
                    {' '}({clusterCount}/{max})
                  </span>
                  {/* v46: dot bar — 19 자세 영역 직관 visual progress. */}
                  <span className="snn-camera-clusters-dots" title={`${clusterCount}/${max} 자세 학습됨`}>
                    {Array.from({ length: max }, (_, i) => (
                      <span
                        key={i}
                        className={`snn-camera-clusters-dot${i < clusterCount ? ` snn-camera-clusters-dot-filled snn-camera-clusters-dot-${ratioClass}` : ''}`}
                      />
                    ))}
                  </span>
                </>
              );
            })()}
          </span>
          <div className="snn-camera-clusters-actions">
            <button
              type="button"
              className="snn-camera-clusters-action-btn"
              onClick={handleImport}
              title="JSON 백업 파일에서 학습 데이터 복원"
            >
              복원
            </button>
            {Object.keys(exemplars).length > 0 && (
              <button
                type="button"
                className="snn-camera-clusters-action-btn"
                onClick={() => {
                  getLiveSnn().forceHandSync();
                  showToast({ kind: 'info', message: '학습 데이터 동기화 중...' });
                }}
                title="학습 데이터 영역 worker 영역 강제 sync — stuck state catch 시"
              >
                동기화
              </button>
            )}
            {Object.keys(exemplars).length > 0 && (
              <>
                <button
                  type="button"
                  className="snn-camera-clusters-action-btn"
                  onClick={handleExport}
                  title="현재 학습된 자세를 JSON 파일로 백업"
                >
                  백업
                </button>
                <button
                  type="button"
                  className="snn-camera-clusters-purge-btn"
                  onClick={handlePurge}
                  title="모든 hand cluster 학습 데이터 삭제"
                >
                  전체 초기화
                </button>
              </>
            )}
          </div>
        </div>
        {Object.keys(exemplars).length === 0 ? (
          <small className="snn-camera-clusters-empty">아직 학습된 제스처가 없습니다. 손 자세를 보여주고 &lsquo;이 자세 학습&rsquo; 버튼을 누르세요.</small>
        ) : (
          <ul className="snn-camera-clusters-list">
            {Object.entries(exemplars)
              .sort(([aKey, aEx], [bKey, bEx]) => {
                // v48 (2026-06-04): 최근 자세 위 — lastAt desc 정합.
                // lastAt 영역 영역 영역 (학습 직후 0 사실 가능) outKey natural sort fallback.
                const aLast = aEx.lastAt || 0;
                const bLast = bEx.lastAt || 0;
                if (aLast !== bLast) return bLast - aLast;
                return aKey.localeCompare(bKey);
              })
              .map(([outKey, ex]) => {
                const clusterId = parseClusterId(outKey);
                return (
                  <li key={outKey} className="snn-camera-cluster-row">
                    <span className="snn-camera-cluster-id">cluster {clusterId}</span>
                    <span className="snn-camera-cluster-label">
                      {ex.label ?? <em>이름 없음</em>}
                    </span>
                    <span className="snn-camera-cluster-count">
                      {ex.count}회
                      {ex.lastAt > 0 && (
                        <span className="snn-camera-cluster-last">
                          {' · '}{formatRelativeTime(Date.now() - ex.lastAt)}
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      className="snn-camera-cluster-edit-btn"
                      onClick={() => handleEditLabel(outKey, ex.label)}
                    >
                      이름 편집
                    </button>
                    <button
                      type="button"
                      className="snn-camera-cluster-delete-btn"
                      onClick={() => handleDeleteCluster(Number(clusterId), ex.label ?? null)}
                      title="이 자세만 삭제"
                    >
                      삭제
                    </button>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}

// Phase 3.9 v41 (2026-06-04): cluster lastAt 영역 사용자 친화 한국어 relative.
// "5초 전" / "3분 전" / "2시간 전" / "어제" / "3일 전" 영역 mental model 정합.
function formatRelativeTime(elapsedMs: number): string {
  if (elapsedMs < 0) return '방금';
  const sec = Math.floor(elapsedMs / 1000);
  if (sec < 10) return '방금';
  if (sec < 60) return `${sec}초 전`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day === 1) return '어제';
  if (day < 30) return `${day}일 전`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month}개월 전`;
  return `${Math.floor(month / 12)}년 전`;
}

// outKey 형식: out_{clusterId}_{neuronIndex}. clusterId 만 추출.
function parseClusterId(outKey: string): string {
  const match = /^out_(\d+)_/.exec(outKey);
  return match ? match[1] : '?';
}

function drawLandmarks(
  ctx: CanvasRenderingContext2D,
  hand: HandLandmark[],
  w: number,
  h: number,
): void {
  // Phase 3.9 v15 (2026-06-03): video element 숨김 + skeleton 강조 시각화.
  // 검은 배경 위에 손가락 별 색상 + glow 효과 + 큰 keypoint dot.
  const FINGER_COLORS: Record<string, string> = {
    thumb: '#fbbf24',   // amber
    index: '#a78bfa',   // purple
    middle: '#60a5fa',  // blue
    ring: '#34d399',    // green
    pinky: '#f472b6',   // pink
  };
  // Connection 의 finger 별 grouping.
  // FINGER_CONNECTIONS 의 순서 — thumb [0..3], index [4..7], middle [8..11], ring [12..15], pinky [16..20].
  const FINGER_GROUPS: Array<{ name: string; range: [number, number] }> = [
    { name: 'thumb',  range: [0, 4] },
    { name: 'index',  range: [4, 8] },
    { name: 'middle', range: [8, 12] },
    { name: 'ring',   range: [12, 16] },
    { name: 'pinky',  range: [16, 21] },
  ];

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Skeleton lines — finger 별 색상 + glow.
  for (const { name, range } of FINGER_GROUPS) {
    const color = FINGER_COLORS[name];
    // Outer glow.
    ctx.strokeStyle = color + '40'; // 25% alpha
    ctx.lineWidth = 8;
    ctx.beginPath();
    for (let k = range[0]; k < range[1]; k += 1) {
      const conn = FINGER_CONNECTIONS[k];
      if (!conn) continue;
      const la = hand[conn[0]];
      const lb = hand[conn[1]];
      if (!la || !lb) continue;
      ctx.moveTo(la.x * w, la.y * h);
      ctx.lineTo(lb.x * w, lb.y * h);
    }
    ctx.stroke();
    // Inner sharp line.
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let k = range[0]; k < range[1]; k += 1) {
      const conn = FINGER_CONNECTIONS[k];
      if (!conn) continue;
      const la = hand[conn[0]];
      const lb = hand[conn[1]];
      if (!la || !lb) continue;
      ctx.moveTo(la.x * w, la.y * h);
      ctx.lineTo(lb.x * w, lb.y * h);
    }
    ctx.stroke();
  }

  // Keypoints — 흰색 큰 dot + glow.
  for (const lm of hand) {
    const cx = lm.x * w, cy = lm.y * h;
    // Glow.
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
    // Sharp dot.
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Wrist 강조 (landmark 0).
  if (hand[0]) {
    const cx = hand[0].x * w, cy = hand[0].y * h;
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
