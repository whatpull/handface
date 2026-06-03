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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  setExemplarLabel,
  subscribeExemplars,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import { showDialog } from '@/components/ui/Dialog';
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
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameTsRef = useRef<number>(0);

  const [status, setStatus] = useState<CameraStatus>({ kind: 'idle' });
  const [handDetected, setHandDetected] = useState<boolean>(false);
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
  const { winnerCluster, consecutiveWinnerCount, isAutoLearning } = usePipelineEvents();
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
            // Threshold: 0.0004 (정규화 좌표 기준 약 2% 이내 변동 = stable).
            setIsStable(variance < 0.0004);
          } else {
            setIsStable(false);
          }
        } else {
          setHandDetected(false);
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
  useEffect(() => {
    if (!autoMode) return;
    if (status.kind !== 'ready') return;
    const AUTO_INTERVAL_MS = 2500;
    const interval = setInterval(() => {
      if (isAutoLearning) return; // 학습 진행 중 — 다음 cycle 까지 대기
      if (!isStable) return; // Phase 3.9 v16: 흔들리는 손에서 trigger skip
      if (latestLandmarksRef.current && latestLandmarksRef.current.length === 21) {
        triggerLearn();
      }
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [autoMode, status, triggerLearn, isAutoLearning, isStable]);

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
          <span>자동 인식 / 학습 (1초 마다)</span>
        </label>
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
      </div>

      <div className="snn-camera-clusters">
        <div className="snn-camera-clusters-header">
          <span className="snn-camera-clusters-title">학습된 제스처</span>
          {Object.keys(exemplars).length > 0 && (
            <button
              type="button"
              className="snn-camera-clusters-purge-btn"
              onClick={handlePurge}
              title="모든 hand cluster 학습 데이터 삭제"
            >
              전체 초기화
            </button>
          )}
        </div>
        {Object.keys(exemplars).length === 0 ? (
          <small className="snn-camera-clusters-empty">아직 학습된 제스처가 없습니다. 손 자세를 보여주고 &lsquo;이 자세 학습&rsquo; 버튼을 누르세요.</small>
        ) : (
          <ul className="snn-camera-clusters-list">
            {Object.entries(exemplars)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([outKey, ex]) => {
                const clusterId = parseClusterId(outKey);
                return (
                  <li key={outKey} className="snn-camera-cluster-row">
                    <span className="snn-camera-cluster-id">cluster {clusterId}</span>
                    <span className="snn-camera-cluster-label">
                      {ex.label ?? <em>이름 없음</em>}
                    </span>
                    <span className="snn-camera-cluster-count">{ex.count}회</span>
                    <button
                      type="button"
                      className="snn-camera-cluster-edit-btn"
                      onClick={() => handleEditLabel(outKey, ex.label)}
                    >
                      이름 편집
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
