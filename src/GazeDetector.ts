import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';

/**
 * Head-pose landmarks for yaw/pitch computation.
 * Uses well-separated face points for robust angle estimation.
 */
const LM = {
  NOSE_TIP:   1,
  CHIN:       152,
  FOREHEAD:   10,
  LEFT_EAR:   234,   // left tragion (이미지 기준 왼쪽)
  RIGHT_EAR:  454,   // right tragion
  LEFT_EYE:   33,
  RIGHT_EYE:  263,
} as const;

export interface GazeResult {
  /**
   * Head yaw mapped to 0~1 range.
   * 0.5 = 정면, <0.5 = 이미지 좌측(사용자 우측), >0.5 = 이미지 우측(사용자 좌측)
   */
  gazeX: number;
  /**
   * Head pitch mapped to 0~1 range.
   * 0.5 = 정면, <0.5 = 위, >0.5 = 아래
   */
  gazeY: number;
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const FACE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

export class GazeDetector {
  private landmarker: FaceLandmarker | null = null;

  constructor(private readonly wasmPath: string = DEFAULT_WASM_PATH) {}

  async init(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(this.wasmPath);
    this.landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: FACE_MODEL_URL,
        delegate: 'GPU',
      },
      outputFaceBlendshapes: false,
      runningMode: 'VIDEO',
      numFaces: 1,
    });
  }

  detect(video: HTMLVideoElement, timestampMs: number): GazeResult | null {
    if (!this.landmarker) return null;
    const result = this.landmarker.detectForVideo(video, timestampMs);
    if (!result.faceLandmarks?.length) return null;
    return this.analyze(result.faceLandmarks[0]);
  }

  private analyze(lm: NormalizedLandmark[]): GazeResult {
    // ── Yaw (좌우 회전): 코끝이 양쪽 귀 사이 어디에 있는지 ──
    // 머리가 오른쪽(이미지 좌측)으로 돌면 코끝이 왼쪽 귀에 가까워짐
    const noseX   = lm[LM.NOSE_TIP].x;
    const leftX   = lm[LM.LEFT_EAR].x;
    const rightX  = lm[LM.RIGHT_EAR].x;
    const earSpan = Math.abs(rightX - leftX);
    const gazeX   = earSpan > 0.01
      ? (noseX - leftX) / earSpan
      : 0.5;

    // ── Pitch (상하 기울기): 코끝이 이마-턱 사이 어디에 있는지 ──
    // 머리를 숙이면 코끝이 턱에 가까워짐 (gazeY ↑)
    const noseY      = lm[LM.NOSE_TIP].y;
    const foreheadY  = lm[LM.FOREHEAD].y;
    const chinY      = lm[LM.CHIN].y;
    const faceHeight = Math.abs(chinY - foreheadY);
    const gazeY      = faceHeight > 0.01
      ? (noseY - foreheadY) / faceHeight
      : 0.5;

    return {
      gazeX: Math.max(0, Math.min(1, gazeX)),
      gazeY: Math.max(0, Math.min(1, gazeY)),
    };
  }

  destroy(): void {
    this.landmarker?.close();
    this.landmarker = null;
  }
}
