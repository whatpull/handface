import {
  HandLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { distance } from './utils/geometry';

/** MediaPipe Hand Landmark 인덱스 */
const LM = {
  THUMB_TIP:  4,
  INDEX_MCP:  5,
  INDEX_TIP:  8,
  MIDDLE_MCP: 9,
  MIDDLE_TIP: 12,
  RING_MCP:   13,
  RING_TIP:   16,
  PINKY_MCP:  17,
  PINKY_TIP:  20,
} as const;

export type GestureType = 'click' | 'fist' | 'open-palm' | 'point' | 'open';

export interface DetectionResult {
  gesture: GestureType;
  /** 클릭 감지용: 엄지 ↔ 중지 거리 */
  clickPinchDistance: number;
  indexTip: { x: number; y: number };
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
    const ringTip   = lm[LM.RING_TIP];
    const ringMcp   = lm[LM.RING_MCP];
    const pinkyTip  = lm[LM.PINKY_TIP];
    const pinkyMcp  = lm[LM.PINKY_MCP];

    // 클릭: 엄지 ↔ 중지 거리
    const clickPinchDistance = distance(thumbTip, middleTip);
    const clickClearlyReleased = clickPinchDistance > this.clickThreshold * 2.5;

    // 각 손가락 펴짐 여부 (tip.y < mcp.y → 위로 뻗음)
    const indexExt  = indexTip.y  < indexMcp.y;
    const middleExt = middleTip.y < middleMcp.y;
    const ringExt   = ringTip.y   < ringMcp.y;
    const pinkyExt  = pinkyTip.y  < pinkyMcp.y;

    const allFolded   = !indexExt && !middleExt && !ringExt && !pinkyExt;
    const allExtended =  indexExt &&  middleExt &&  ringExt &&  pinkyExt;

    let gesture: GestureType;

    if (clickPinchDistance < this.clickThreshold) {
      // 클릭이 최우선
      gesture = 'click';
    } else if (allFolded) {
      // 주먹: 모든 손가락 오무림 → 줌 인
      gesture = 'fist';
    } else if (allExtended && clickClearlyReleased) {
      // 펼친 손: 모든 손가락 펼침 → 줌 아웃
      gesture = 'open-palm';
    } else if (indexExt) {
      // 검지만 펼침 → 커서 이동
      gesture = 'point';
    } else {
      gesture = 'open';
    }

    return {
      gesture,
      clickPinchDistance,
      indexTip: { x: indexTip.x, y: indexTip.y },
    };
  }

  destroy(): void {
    this.landmarker?.close();
    this.landmarker = null;
  }
}
