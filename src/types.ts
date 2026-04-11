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
   */
  handedness?: 'right' | 'left' | 'any';
  /**
   * 커서 추적 기준점 (default 'wrist')
   * - 'wrist' : 손목 — 손 전체 위치 기반
   * - 'palm'  : 손바닥 중심
   * - 'index' : 검지 끝 (기존 동작)
   */
  cursorAnchor?: 'wrist' | 'palm' | 'index';
  /**
   * 커서 위치 소스 (default 'hand')
   * - 'hand' : 손 위치로 커서 이동
   * - 'gaze' : 홍채(시선)로 커서 이동 — 손 제스처는 클릭/스크롤 전용
   */
  cursorSource?: 'hand' | 'gaze';
  /**
   * 커서 이동 방식 (default 'absolute')
   * - 'absolute' : 손 위치 → 화면 좌표 직접 매핑 (권장)
   * - 'relative' : 손의 이동량만큼 커서 이동 (마우스처럼)
   */
  cursorMode?: 'absolute' | 'relative';
  /**
   * 상대 모드 커서 감도 (default 2.5)
   * 값이 클수록 작은 손 움직임으로 넓은 범위를 이동
   */
  sensitivity?: number;
  /**
   * 절대 모드 유효 감지 영역 [x0, y0, x1, y1] 0~1 비율 (default [0.3, 0.1, 0.95, 0.85])
   * 오른손 기준: 자연스러운 오른쪽 위치가 화면 전체에 매핑되도록 우측 편향
   */
  activeZone?: [number, number, number, number];
  /**
   * 제스처 게이팅: pointing 제스처일 때만 커서 이동 (default false)
   * true면 검지를 펼쳤을 때만 커서가 움직이고, 다른 제스처 시 커서 고정
   */
  gestureGated?: boolean;
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
