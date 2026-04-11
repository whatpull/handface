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

/** MediaPipe GestureRecognizer 제스처 이름 */
export type GestureName =
  | 'pointing'
  | 'fist'
  | 'openpalm'
  | 'thumbsup'
  | 'thumbsdown'
  | 'victory'
  | 'iloveyou';

export interface GestureEvent {
  gesture: GestureName;
  x: number;
  y: number;
  screenX: number;
  screenY: number;
  confidence: number;
}

export interface GestureKeyBinding {
  gesture: GestureName;
  key: string;
  modifiers?: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  };
}

export type HandControlEventMap = {
  // Mouse emulation
  click: ClickEvent;
  rightclick: ClickEvent;
  move: MoveEvent;
  scroll: ScrollEvent;
  drag: DragEvent;
  dragstart: ClickEvent;
  dragend: ClickEvent;
  // Gesture events (개발자 API)
  pointing:   GestureEvent;
  fist:       GestureEvent;
  openpalm:   GestureEvent;
  thumbsup:   GestureEvent;
  thumbsdown: GestureEvent;
  victory:    GestureEvent;
  iloveyou:   GestureEvent;
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
  /**
   * 감지할 손 방향 (default 'right')
   * 정면 카메라 raw 피드 기준. 기기/환경에 따라 'left'로 전환 필요할 수 있음.
   */
  handedness?: 'right' | 'left' | 'any';
  /**
   * 커서 추적 기준점 (default 'wrist')
   * - 'wrist'  : 손목 (손 전체 위치 기반)
   * - 'palm'   : 손바닥 중심
   * - 'index'  : 검지 끝 (기존 동작)
   */
  cursorAnchor?: 'wrist' | 'palm' | 'index';
}

/** 제스처 표시 메타데이터 */
export const GESTURE_META: Record<
  GestureName,
  { icon: string; label: string; labelKo: string; builtin: boolean; builtinAction?: string }
> = {
  pointing:   { icon: '☝️',  label: 'Pointing Up',  labelKo: '검지 가리키기',   builtin: true,  builtinAction: '커서 이동' },
  fist:       { icon: '✊',  label: 'Closed Fist',   labelKo: '주먹',            builtin: true,  builtinAction: '스크롤 다운' },
  openpalm:   { icon: '🖐️',  label: 'Open Palm',    labelKo: '펼친 손',         builtin: true,  builtinAction: '스크롤 업' },
  thumbsup:   { icon: '👍',  label: 'Thumbs Up',    labelKo: '엄지 위',         builtin: false },
  thumbsdown: { icon: '👎',  label: 'Thumbs Down',  labelKo: '엄지 아래',       builtin: false },
  victory:    { icon: '✌️',  label: 'Victory',      labelKo: '브이',            builtin: false },
  iloveyou:   { icon: '🤟',  label: 'I Love You',   labelKo: '아이 러브 유',    builtin: false },
};
