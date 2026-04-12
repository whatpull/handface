import {
  GestureRecognizer,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { distance } from './utils/geometry';
import type { GestureName } from './types';

/** 클릭 핀치 + 커서 앵커에 사용하는 랜드마크 인덱스 */
const LM = {
  WRIST:      0,
  THUMB_TIP:  4,
  INDEX_TIP:  8,  // 클릭(엄지+검지 핀치) + 커서 앵커 공용
  MIDDLE_TIP: 12, // 현재 미사용 (이전 클릭 방식)
  // palm center 계산용 (손목 + 각 손가락 MCP)
  INDEX_MCP:  5,
  MIDDLE_MCP: 9,
  RING_MCP:   13,
  PINKY_MCP:  17,
} as const;

const PALM_INDICES = [LM.WRIST, LM.INDEX_MCP, LM.MIDDLE_MCP, LM.RING_MCP, LM.PINKY_MCP] as const;

/** MediaPipe categoryName → 내부 GestureName 매핑 */
const MP_GESTURE_MAP: Record<string, GestureName> = {
  Pointing_Up:  'pointing',
  Closed_Fist:  'fist',
  Open_Palm:    'openpalm',
  Thumb_Up:     'thumbsup',
  Thumb_Down:   'thumbsdown',
  Victory:      'victory',
  ILoveYou:     'iloveyou',
};

export type DetectedGesture = GestureName | 'click' | 'none';

export interface DetectionResult {
  /** 최우선 결정된 제스처 (click 핀치 > GestureRecognizer 결과) */
  gesture: DetectedGesture;
  /** GestureRecognizer 원본 결과 (null = None 또는 미감지) */
  gestureName: GestureName | null;
  gestureConfidence: number;
  /** 엄지 확장 거리 (엄지 끝 ↔ 검지 MCP). 값이 클수록 엄지가 펴진 상태 */
  thumbExtension: number;
  /** 검지 끝 위치 (cursorAnchor: 'index' 용) */
  indexTip: { x: number; y: number };
  /** 손목 위치 (cursorAnchor: 'wrist' 용) */
  wrist: { x: number; y: number };
  /** 손바닥 중심 위치 (cursorAnchor: 'palm' 용) */
  palmCenter: { x: number; y: number };
  /** 양손 박수 감지 (두 손바닥이 가까워지는 순간 true) */
  clap: boolean;
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';

const CLAP_DISTANCE = 0.10;   // 양 손바닥 간 거리 임계값 (정규화 좌표)
const CLAP_COOLDOWN = 600;    // 박수 사이 최소 간격 (ms)

export class GestureDetector {
  private recognizer: GestureRecognizer | null = null;
  private wasHandsClose = false;
  private lastClapMs    = 0;

  constructor(
    private readonly wasmPath: string = DEFAULT_WASM_PATH,
    private readonly clickThreshold: number = 0.14,
    private readonly handednessFilter: 'Left' | 'Right' | null = null,
  ) {}

  async init(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(this.wasmPath);
    this.recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: 'GPU',
      },
      // 핸드니스 필터링을 위해 2개 감지 후 선택
      numHands: this.handednessFilter ? 2 : 1,
      runningMode: 'VIDEO',
    });
  }

  detect(video: HTMLVideoElement, timestampMs: number): DetectionResult | null {
    if (!this.recognizer) return null;

    const result = this.recognizer.recognizeForVideo(video, timestampMs);
    if (!result.landmarks || result.landmarks.length === 0) return null;

    // ── 양손 박수 감지 ──
    let clap = false;
    if (result.landmarks.length >= 2) {
      const p1 = result.landmarks[0][LM.MIDDLE_MCP];
      const p2 = result.landmarks[1][LM.MIDDLE_MCP];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
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

    // 핸드니스 필터: 원하는 손 인덱스 찾기
    let handIdx = 0;
    if (this.handednessFilter) {
      const idx = result.handedness.findIndex(
        (cats) => cats[0]?.categoryName === this.handednessFilter,
      );
      if (idx === -1) {
        // 원하는 손이 없어도 박수 결과는 반환
        if (clap) return { gesture: 'none', gestureName: null, gestureConfidence: 0,
          thumbExtension: 0, indexTip: {x:0.5,y:0.5}, wrist: {x:0.5,y:0.5},
          palmCenter: {x:0.5,y:0.5}, clap };
        return null;
      }
      handIdx = idx;
    }

    const categories = result.gestures[handIdx] ?? [];
    const det = this.analyze(result.landmarks[handIdx], categories);
    det.clap = clap;
    return det;
  }

  private analyze(
    lm: NormalizedLandmark[],
    categories: Array<{ categoryName: string; score: number }>,
  ): DetectionResult {
    const thumbTip = lm[LM.THUMB_TIP];
    const indexTip = lm[LM.INDEX_TIP];
    const wrist    = lm[LM.WRIST];

    // 손바닥 중심 (손목 + 4개 MCP 평균)
    const palmCenter = {
      x: PALM_INDICES.reduce((s, i) => s + lm[i].x, 0 as number) / PALM_INDICES.length,
      y: PALM_INDICES.reduce((s, i) => s + lm[i].y, 0 as number) / PALM_INDICES.length,
    };

    // 엄지 확장 거리 (검지 가리키기 중 엄지를 펴면 클릭)
    const thumbExtension = distance(thumbTip, lm[LM.INDEX_MCP]);

    // GestureRecognizer 최상위 결과
    const topCat = categories[0];
    const gestureName: GestureName | null =
      topCat ? (MP_GESTURE_MAP[topCat.categoryName] ?? null) : null;
    const gestureConfidence = topCat?.score ?? 0;

    // 클릭: 검지 가리키기(pointing) 상태에서 엄지를 펴면 클릭
    const gesture: DetectedGesture =
      (gestureName === 'pointing' && thumbExtension > this.clickThreshold)
        ? 'click'
        : (gestureName ?? 'none');

    return {
      gesture,
      gestureName,
      gestureConfidence,
      thumbExtension,
      indexTip:  { x: indexTip.x,  y: indexTip.y },
      wrist:     { x: wrist.x,     y: wrist.y },
      palmCenter,
      clap: false,
    };
  }

  destroy(): void {
    this.recognizer?.close();
    this.recognizer = null;
  }
}
