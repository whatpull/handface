import {
  HandLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { distance } from './utils/geometry';

/** MediaPipe Hand Landmark 인덱스 */
const LM = {
  WRIST: 0,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_TIP: 8,
  MIDDLE_TIP: 12,
  MIDDLE_MCP: 9,
} as const;

export type GestureType = 'pinch' | 'point' | 'two-finger' | 'open' | 'none';

export interface DetectionResult {
  gesture: GestureType;
  pinchDistance: number;
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
    private readonly pinchThreshold: number = 0.06,
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
    const thumbTip = lm[LM.THUMB_TIP];
    const indexTip = lm[LM.INDEX_TIP];
    const middleTip = lm[LM.MIDDLE_TIP];
    const indexMcp = lm[LM.INDEX_MCP];
    const middleMcp = lm[LM.MIDDLE_MCP];

    const pinchDistance = distance(thumbTip, indexTip);
    const indexExtended = indexTip.y < indexMcp.y;
    const middleExtended = middleTip.y < middleMcp.y;

    let gesture: GestureType;

    if (pinchDistance < this.pinchThreshold) {
      gesture = 'pinch';
    } else if (indexExtended && middleExtended) {
      gesture = 'two-finger';
    } else if (indexExtended) {
      gesture = 'point';
    } else {
      gesture = 'open';
    }

    return {
      gesture,
      pinchDistance,
      indexTip: { x: indexTip.x, y: indexTip.y },
      middleTip: { x: middleTip.x, y: middleTip.y },
    };
  }

  destroy(): void {
    this.landmarker?.close();
    this.landmarker = null;
  }
}
