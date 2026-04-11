import {
  GestureRecognizer,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { distance } from './utils/geometry';
import type { GestureName } from './types';

/** 클릭 핀치 감지에만 사용하는 랜드마크 인덱스 */
const LM = {
  THUMB_TIP:  4,
  INDEX_TIP:  8,
  MIDDLE_TIP: 12,
} as const;

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
  indexTip: { x: number; y: number };
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';

export class GestureDetector {
  private recognizer: GestureRecognizer | null = null;

  constructor(
    private readonly wasmPath: string = DEFAULT_WASM_PATH,
    private readonly clickThreshold: number = 0.06,
  ) {}

  async init(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(this.wasmPath);
    this.recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: 'GPU',
      },
      numHands: 1,
      runningMode: 'VIDEO',
    });
  }

  detect(video: HTMLVideoElement, timestampMs: number): DetectionResult | null {
    if (!this.recognizer) return null;

    const result = this.recognizer.recognizeForVideo(video, timestampMs);
    if (!result.landmarks || result.landmarks.length === 0) return null;

    const categories = result.gestures[0] ?? [];
    return this.analyze(result.landmarks[0], categories);
  }

  private analyze(
    lm: NormalizedLandmark[],
    categories: Array<{ categoryName: string; score: number }>,
  ): DetectionResult {
    const thumbTip  = lm[LM.THUMB_TIP];
    const indexTip  = lm[LM.INDEX_TIP];
    const middleTip = lm[LM.MIDDLE_TIP];

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
      indexTip: { x: indexTip.x, y: indexTip.y },
    };
  }

  destroy(): void {
    this.recognizer?.close();
    this.recognizer = null;
  }
}
