export interface MoveEvent {
  /** 0~1 normalized (horizontal, mirrored) */
  x: number;
  /** 0~1 normalized (vertical) */
  y: number;
  /** screen pixel X */
  screenX: number;
  /** screen pixel Y */
  screenY: number;
}

export interface ClickEvent {
  x: number;
  y: number;
  screenX: number;
  screenY: number;
}

export interface ScrollEvent {
  /** positive = down, negative = up */
  deltaY: number;
}

export interface DragEvent {
  x: number;
  y: number;
  screenX: number;
  screenY: number;
}

export type HandControlEventMap = {
  click: ClickEvent;
  rightclick: ClickEvent;
  move: MoveEvent;
  scroll: ScrollEvent;
  drag: DragEvent;
  dragstart: ClickEvent;
  dragend: ClickEvent;
};

export interface HandControlOptions {
  /** 기존 video 엘리먼트를 전달하면 그것을 사용, 없으면 자동 생성 */
  video?: HTMLVideoElement;
  /** 핀치 감지 임계값 (0~1, default 0.05) */
  threshold?: number;
  /** 좌우 반전 여부 (default true, 거울 효과) */
  flipHorizontal?: boolean;
  /** 위치 스무딩 계수 (0~1, 클수록 부드럽지만 느림, default 0.6) */
  smoothing?: number;
  /** MediaPipe wasm 파일 경로 (CDN 기본값 제공) */
  wasmPath?: string;
}
