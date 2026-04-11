import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';

/** 홍채 중심 랜드마크 인덱스 (Face Mesh 478점 중 iris refinement) */
const IRIS_LEFT  = 468; // 이미지 기준 왼쪽 홍채 중심 (사용자 기준 오른쪽 눈)
const IRIS_RIGHT = 473; // 이미지 기준 오른쪽 홍채 중심 (사용자 기준 왼쪽 눈)

export interface GazeResult {
  /** 0~1, 이미지 좌표계 수평 (flipHorizontal 적용 전) */
  gazeX: number;
  /** 0~1, 수직 */
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
    // 양쪽 홍채 중심 좌표 평균 → 시선 기준점
    const gazeX = (lm[IRIS_LEFT].x + lm[IRIS_RIGHT].x) / 2;
    const gazeY = (lm[IRIS_LEFT].y + lm[IRIS_RIGHT].y) / 2;
    return { gazeX, gazeY };
  }

  destroy(): void {
    this.landmarker?.close();
    this.landmarker = null;
  }
}
