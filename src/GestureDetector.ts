import {
  GestureRecognizer,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { distance } from './utils/geometry';
import type { GestureName } from './types';

const LM = {
  WRIST:      0,
  THUMB_TIP:  4,
  INDEX_TIP:  8,
  MIDDLE_TIP: 12,
  INDEX_MCP:  5,
  MIDDLE_MCP: 9,
  RING_MCP:   13,
  PINKY_MCP:  17,
} as const;

const PALM_INDICES = [LM.WRIST, LM.INDEX_MCP, LM.MIDDLE_MCP, LM.RING_MCP, LM.PINKY_MCP] as const;

const MP_GESTURE_MAP: Record<string, GestureName> = {
  Pointing_Up:  'pointing',
  Closed_Fist:  'fist',
  Open_Palm:    'openpalm',
  Thumb_Up:     'thumbsup',
  Thumb_Down:   'thumbsdown',
  Victory:      'victory',
  ILoveYou:     'iloveyou',
};

/**
 * GestureDetector 는 원시 데이터만 반환합니다.
 * 이벤트 결정(click/drag/scroll)은 HandControl의 상태 머신이 담당합니다.
 */
export interface DetectionResult {
  /** GestureRecognizer 원본 제스처 */
  gestureName: GestureName | null;
  gestureConfidence: number;
  /** 엄지 ↔ 검지 끝 거리 (클릭 핀치 감지용) */
  thumbIndexDist: number;
  /** 엄지 ↔ 중지 끝 거리 (우클릭 핀치 감지용) */
  thumbMiddleDist: number;
  /** 검지 끝 위치 */
  indexTip: { x: number; y: number };
  /** 손목 위치 */
  wrist: { x: number; y: number };
  /** 손바닥 중심 위치 */
  palmCenter: { x: number; y: number };
  /** 양손 박수 감지 */
  clap: boolean;
  /** 양손 간 거리 (null = 한 손만 감지). 0 = 닿음, ~0.8 = 최대 벌림 */
  twoHandDist: number | null;
  /** 전체 21개 손 랜드마크 */
  landmarks: Array<{ x: number; y: number; z: number }> | null;
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';

const CLAP_DISTANCE = 0.10;
const CLAP_COOLDOWN = 600;

export class GestureDetector {
  private recognizer: GestureRecognizer | null = null;
  private wasHandsClose = false;
  private lastClapMs    = 0;

  constructor(
    private readonly wasmPath: string = DEFAULT_WASM_PATH,
    private readonly handednessFilter: 'Left' | 'Right' | null = null,
  ) {}

  async init(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(this.wasmPath);
    this.recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: 'GPU',
      },
      numHands: this.handednessFilter ? 2 : 1,
      runningMode: 'VIDEO',
    });
  }

  detect(video: HTMLVideoElement, timestampMs: number): DetectionResult | null {
    if (!this.recognizer) return null;
    const result = this.recognizer.recognizeForVideo(video, timestampMs);
    if (!result.landmarks || result.landmarks.length === 0) return null;

    // ── 양손 감지: 박수 + 거리 측정 ──
    let clap = false;
    let twoHandDist: number | null = null;
    if (result.landmarks.length >= 2) {
      const p1 = result.landmarks[0][LM.MIDDLE_MCP];
      const p2 = result.landmarks[1][LM.MIDDLE_MCP];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      twoHandDist = dist;

      const isClose = dist < CLAP_DISTANCE;
      if (isClose && !this.wasHandsClose) {
        const now = performance.now();
        if (now - this.lastClapMs > CLAP_COOLDOWN) {
          this.lastClapMs = now;
          clap = true;
        }
      }
      this.wasHandsClose = isClose;
    } else {
      this.wasHandsClose = false;
    }

    // 핸드니스 필터
    let handIdx = 0;
    if (this.handednessFilter) {
      const idx = result.handedness.findIndex(
        (cats) => cats[0]?.categoryName === this.handednessFilter,
      );
      if (idx === -1) {
        if (clap) return {
          gestureName: null, gestureConfidence: 0,
          thumbIndexDist: 1, thumbMiddleDist: 1,
          indexTip: {x:0.5,y:0.5}, wrist: {x:0.5,y:0.5},
          palmCenter: {x:0.5,y:0.5}, clap, twoHandDist, landmarks: null,
        };
        return null;
      }
      handIdx = idx;
    }

    const categories = result.gestures[handIdx] ?? [];
    const det = this.analyze(result.landmarks[handIdx], categories);
    det.clap = clap;
    det.twoHandDist = twoHandDist;
    det.landmarks = result.landmarks[handIdx].map(lm => ({ x: lm.x, y: lm.y, z: lm.z }));
    return det;
  }

  private analyze(
    lm: NormalizedLandmark[],
    categories: Array<{ categoryName: string; score: number }>,
  ): DetectionResult {
    const thumbTip  = lm[LM.THUMB_TIP];
    const indexTip  = lm[LM.INDEX_TIP];
    const middleTip = lm[LM.MIDDLE_TIP];
    const wrist     = lm[LM.WRIST];

    const palmCenter = {
      x: PALM_INDICES.reduce((s, i) => s + lm[i].x, 0 as number) / PALM_INDICES.length,
      y: PALM_INDICES.reduce((s, i) => s + lm[i].y, 0 as number) / PALM_INDICES.length,
    };

    // 원시 거리 — 이벤트 결정은 HandControl 상태 머신에서
    const thumbIndexDist  = distance(thumbTip, indexTip);
    const thumbMiddleDist = distance(thumbTip, middleTip);

    const topCat = categories[0];
    const gestureName: GestureName | null =
      topCat ? (MP_GESTURE_MAP[topCat.categoryName] ?? null) : null;
    const gestureConfidence = topCat?.score ?? 0;

    return {
      gestureName,
      gestureConfidence,
      thumbIndexDist,
      thumbMiddleDist,
      indexTip:    { x: indexTip.x,  y: indexTip.y },
      wrist:       { x: wrist.x,     y: wrist.y },
      palmCenter,
      clap: false,
      twoHandDist: null,
      landmarks: null,
    };
  }

  destroy(): void {
    this.recognizer?.close();
    this.recognizer = null;
  }
}
