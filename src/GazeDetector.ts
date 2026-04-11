import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';

/**
 * 눈 소켓 기준 랜드마크 인덱스
 * 머리 이동 시 홍채 + 코너가 함께 이동하므로 비율이 유지됨 (머리 자세 보상)
 */
const EYE = {
  // 이미지 기준 왼쪽 눈 (사용자 기준 오른쪽 눈)
  L_OUTER: 33,   // 관자놀이 코너 (x 작음)
  L_INNER: 133,  // 코쪽 코너    (x 큼)
  L_TOP:   159,  // 위 눈꺼풀
  L_BOT:   145,  // 아래 눈꺼풀
  // 이미지 기준 오른쪽 눈 (사용자 기준 왼쪽 눈)
  R_INNER: 362,  // 코쪽 코너    (x 작음)
  R_OUTER: 263,  // 관자놀이 코너 (x 큼)
  R_TOP:   386,  // 위 눈꺼풀
  R_BOT:   374,  // 아래 눈꺼풀
} as const;

/** 홍채 중심 (Face Mesh iris refinement, 인덱스 468–477) */
const IRIS_L = 468; // 이미지 왼쪽 홍채 중심
const IRIS_R = 473; // 이미지 오른쪽 홍채 중심

export interface GazeResult {
  /**
   * 눈 소켓 기준 수평 시선 비율 (0~1)
   * 0.5 = 정면, <0.5 = 이미지 좌측 응시, >0.5 = 이미지 우측 응시
   */
  gazeX: number;
  /**
   * 눈꺼풀 기준 수직 시선 비율 (0~1)
   * 0.5 = 정면, <0.5 = 위, >0.5 = 아래
   */
  gazeY: number;
}

const DEFAULT_WASM_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const FACE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

/** 0 나누기 방지 */
function safeRatio(num: number, denom: number): number {
  return Math.abs(denom) < 1e-6 ? 0.5 : num / denom;
}

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
    // ── 수평: 홍채가 눈 소켓 내 어디에 있는지 비율로 계산 ──
    // 머리가 좌우로 이동해도 홍채+코너가 함께 이동 → 비율 유지
    const leftH  = safeRatio(lm[IRIS_L].x - lm[EYE.L_OUTER].x,
                             lm[EYE.L_INNER].x - lm[EYE.L_OUTER].x);
    const rightH = safeRatio(lm[IRIS_R].x - lm[EYE.R_INNER].x,
                             lm[EYE.R_OUTER].x - lm[EYE.R_INNER].x);
    const gazeX = (leftH + rightH) / 2; // ~0.5 = 정면

    // ── 수직: 홍채가 위/아래 눈꺼풀 사이 어디에 있는지 ──
    const leftV  = safeRatio(lm[IRIS_L].y - lm[EYE.L_TOP].y,
                             lm[EYE.L_BOT].y - lm[EYE.L_TOP].y);
    const rightV = safeRatio(lm[IRIS_R].y - lm[EYE.R_TOP].y,
                             lm[EYE.R_BOT].y - lm[EYE.R_TOP].y);
    const gazeY = (leftV + rightV) / 2; // ~0.5 = 정면

    return { gazeX, gazeY };
  }

  destroy(): void {
    this.landmarker?.close();
    this.landmarker = null;
  }
}
