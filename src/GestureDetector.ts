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
  INDEX_TIP:  8,
  MIDDLE_TIP: 12,
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
  /** 클릭 감지용 엄지 ↔ 중지 거리 */
  clickPinchDistance: number;
  /** 검지 끝 위치 (cursorAnchor: 'index' 용) */
  indexTip: { x: number; y: number };
  /** 손목 위치 (cursorAnchor: 'wrist' 용) */
  wrist: { x: number; y: number };
  /** 손바닥 중심 위치 (cursorAnchor: 'palm' 용) */
  palmCenter: { x: number; y: number };
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';

export class GestureDetector {
  private recognizer: GestureRecognizer | null = null;

  /**
   * @param handednessFilter
   *   MediaPipe 카테고리 이름 기준. 정면 카메라의 raw (비반전) 피드를 사용할 때:
   *   - 사용자의 오른손 → MediaPipe 'Left'
   *   - 사용자의 왼손  → MediaPipe 'Right'
   *   null = 필터 없음 (감지된 첫 번째 손 사용)
   */
  constructor(
    private readonly wasmPath: string = DEFAULT_WASM_PATH,
    private readonly clickThreshold: number = 0.06,
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

    // 핸드니스 필터: 원하는 손 인덱스 찾기
    let handIdx = 0;
    if (this.handednessFilter) {
      const idx = result.handedness.findIndex(
        (cats) => cats[0]?.categoryName === this.handednessFilter,
      );
      if (idx === -1) return null; // 원하는 손이 감지되지 않음
      handIdx = idx;
    }

    const categories = result.gestures[handIdx] ?? [];
    return this.analyze(result.landmarks[handIdx], categories);
  }

  private analyze(
    lm: NormalizedLandmark[],
    categories: Array<{ categoryName: string; score: number }>,
  ): DetectionResult {
    const thumbTip  = lm[LM.THUMB_TIP];
    const indexTip  = lm[LM.INDEX_TIP];
    const middleTip = lm[LM.MIDDLE_TIP];
    const wrist     = lm[LM.WRIST];

    // 손바닥 중심 (손목 + 4개 MCP 평균)
    const palmCenter = {
      x: PALM_INDICES.reduce((s, i) => s + lm[i].x, 0 as number) / PALM_INDICES.length,
      y: PALM_INDICES.reduce((s, i) => s + lm[i].y, 0 as number) / PALM_INDICES.length,
    };

    // 엄지 ↔ 중지 핀치 거리 (클릭 감지)
    const clickPinchDistance = distance(thumbTip, middleTip);

    // GestureRecognizer 최상위 결과
    const topCat = categories[0];
    const gestureName: GestureName | null =
      topCat ? (MP_GESTURE_MAP[topCat.categoryName] ?? null) : null;
    const gestureConfidence = topCat?.score ?? 0;

    // 클릭이 최우선
    const gesture: DetectedGesture =
      clickPinchDistance < this.clickThreshold ? 'click' : (gestureName ?? 'none');

    return {
      gesture,
      gestureName,
      gestureConfidence,
      clickPinchDistance,
      indexTip:  { x: indexTip.x,  y: indexTip.y },
      wrist:     { x: wrist.x,     y: wrist.y },
      palmCenter,
    };
  }

  destroy(): void {
    this.recognizer?.close();
    this.recognizer = null;
  }
}
