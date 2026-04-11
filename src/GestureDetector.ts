import {
  HandLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { distance } from './utils/geometry';

/** MediaPipe Hand Landmark 인덱스 */
const LM = {
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_TIP: 12,
} as const;

export type GestureType = 'click' | 'point' | 'two-finger' | 'open' | 'none';

export interface DetectionResult {
  gesture: GestureType;
  /** 클릭 감지용: 엄지 ↔ 중지 거리 */
  clickPinchDistance: number;
  indexTip: { x: number; y: number };
  middleTip: { x: number; y: number };
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

export class GestureDetector {
  private landmarker: HandLandmarker | null = null;

  constructor(
    private readonly wasmPath: string = DEFAULT_WASM_PATH,
    private readonly clickThreshold: number = 0.06,
  ) {}

  async init(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(this.wasmPath);
    this.landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: 'GPU',
      },
      numHands: 1,
      runningMode: 'VIDEO',
    });
  }

  detect(video: HTMLVideoElement, timestampMs: number): DetectionResult | null {
    if (!this.landmarker) return null;

    const { landmarks } = this.landmarker.detectForVideo(video, timestampMs);
    if (!landmarks || landmarks.length === 0) return null;

    return this.analyze(landmarks[0]);
  }

  private analyze(lm: NormalizedLandmark[]): DetectionResult {
    const thumbTip  = lm[LM.THUMB_TIP];
    const indexTip  = lm[LM.INDEX_TIP];
    const indexMcp  = lm[LM.INDEX_MCP];
    const middleTip = lm[LM.MIDDLE_TIP];
    const middleMcp = lm[LM.MIDDLE_MCP];

    // 클릭: 엄지 ↔ 중지 (검지는 커서 추적 전용으로 분리)
    const clickPinchDistance = distance(thumbTip, middleTip);

    const indexExtended  = indexTip.y < indexMcp.y;
    const middleExtended = middleTip.y < middleMcp.y;

    let gesture: GestureType;

    if (clickPinchDistance < this.clickThreshold) {
      gesture = 'click';
    } else if (indexExtended && middleExtended) {
      gesture = 'two-finger';
    } else if (indexExtended) {
      gesture = 'point';
    } else {
      gesture = 'open';
    }

    return {
      gesture,
      clickPinchDistance,
      indexTip:  { x: indexTip.x,  y: indexTip.y  },
      middleTip: { x: middleTip.x, y: middleTip.y },
    };
  }

  destroy(): void {
    this.landmarker?.close();
    this.landmarker = null;
  }
}
