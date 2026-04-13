import { EventEmitter } from './EventEmitter';
import { GestureDetector } from './GestureDetector';
import type { DetectionResult } from './GestureDetector';
import { GazeDetector } from './GazeDetector';
import { GestureMapper } from './GestureMapper';
import { ControlPanel } from './ControlPanel';
import { lerp } from './utils/geometry';
import type {
  HandControlEventMap,
  HandControlOptions,
  MoveEvent,
  ClickEvent,
  GestureEvent,
  GestureName,
} from './types';

// ─── 상태 머신 상수 ───────────────────────────────
const PINCH_IN_THRESHOLD  = 0.06;   // 핀치 시작 (손가락 닿음)
const PINCH_OUT_THRESHOLD = 0.10;   // 핀치 해제 (손가락 벌어짐)
const CLICK_MAX_HOLD_MS   = 300;    // 이 시간 이내 핀치→해제 = click
const DBLCLICK_WINDOW_MS  = 500;    // click 간격 이내면 dblclick
const DRAG_MIN_DIST_PX    = 8;      // 이 픽셀 이상 이동하면 drag
const HOVER_STILL_MS      = 500;    // 정지 시간 이상이면 hover
const HOVER_MOVE_PX       = 50;     // 이 이상 움직이면 hover 해제
const SCROLL_SENSITIVITY  = 120;    // 스크롤 속도 계수
const GESTURE_COOLDOWN_MS = 900;
const CLICK_COOLDOWN_MS   = 200;    // 연타 방지

// ─── 적응형 스무딩 파라미터 ─────────────────────
const ADAPTIVE_SPEED_THRESHOLD = 0.022;
const ADAPTIVE_MIN_ALPHA       = 0.04;
const ADAPTIVE_MAX_ALPHA       = 0.65;

type PointerState = 'idle' | 'mousedown' | 'dragging' | 'scrolling';

function toMPHandedness(h: HandControlOptions['handedness']): 'Left' | 'Right' | null {
  if (h === 'right') return 'Right';
  if (h === 'left')  return 'Left';
  return null;
}

function remapZone(v: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (v - min) / (max - min)));
}

export class HandControl extends EventEmitter<HandControlEventMap> {
  private video: HTMLVideoElement;
  private detector: GestureDetector;
  private gazeDetector: GazeDetector | null = null;
  private rafId: number | null = null;
  private stream: MediaStream | null = null;
  private panel: ControlPanel | null = null;

  // ── 상태 머신 ──
  private pointerState: PointerState = 'idle';
  private wasPinching     = false;
  private wasRightPinching = false;
  private mouseDownTime   = 0;
  private mouseDownPos    = { x: 0, y: 0 };
  private lastClickTime   = 0;
  private lastGestureMs   = new Map<GestureName, number>();

  // ── 드래그 시 실제 손 위치 추적 (커서 고정과 무관) ──
  private rawHandX = 0.5;
  private rawHandY = 0.5;
  private _lastLandmarks: Array<{x:number; y:number; z:number}> | null = null;

  /** 현재 프레임의 21개 손 랜드마크 (3D 스켈레톤 표시용) */
  get handLandmarks() { return this._lastLandmarks; }

  // ── hover 감지 ──
  private hoverTimer: ReturnType<typeof setTimeout> | null = null;
  private isHovering   = false;
  private lastMovePos  = { x: 0, y: 0 };

  // ── 스크롤 상태 ──
  private prevScrollY = 0.5;
  private scrollGraceMs = 0;       // victory 깜빡임 대응 grace period

  // ── 커서 상태 ──
  private smoothX = 0.5;
  private smoothY = 0.5;
  private prevRawX = 0.5;
  private prevRawY = 0.5;

  // ── 캘리브레이션 ──
  private calibrated = false;
  private zoneX0 = 0;
  private zoneX1 = 1;
  private zoneY0 = 0;
  private zoneY1 = 1;

  // ── 옵션 ──
  private readonly flipHorizontal: boolean;
  private readonly cursorSource: 'hand' | 'gaze';
  private readonly cursorAnchor: 'wrist' | 'palm' | 'index';
  private readonly cursorMode: 'absolute' | 'relative';
  private readonly sensitivity: number;
  private readonly activeZone: [number, number, number, number];
  private readonly ownedVideo: boolean;

  readonly mapper = new GestureMapper();

  constructor(options: HandControlOptions = {}) {
    super();
    this.flipHorizontal = options.flipHorizontal ?? true;
    this.cursorSource   = options.cursorSource   ?? 'hand';
    this.cursorAnchor   = options.cursorAnchor   ?? 'palm';
    this.cursorMode     = options.cursorMode      ?? 'absolute';
    this.sensitivity    = options.sensitivity     ?? 2.5;

    const defaultZone: [number, number, number, number] =
      this.cursorSource === 'gaze' ? [0.35, 0.35, 0.65, 0.65] : [0.3, 0.1, 0.95, 0.85];
    this.activeZone = options.activeZone ?? defaultZone;
    [this.zoneX0, this.zoneY0, this.zoneX1, this.zoneY1] = this.activeZone;

    if (options.video) {
      this.video      = options.video;
      this.ownedVideo = false;
    } else {
      this.video      = this.createHiddenVideo();
      this.ownedVideo = true;
    }

    this.detector = new GestureDetector(
      options.wasmPath,
      toMPHandedness(options.handedness ?? 'right'),
    );

    if (this.cursorSource === 'gaze') {
      this.gazeDetector = new GazeDetector(options.wasmPath);
    }
  }

  async start(): Promise<void> {
    await this.detector.init();
    if (this.gazeDetector) await this.gazeDetector.init();
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video.srcObject = this.stream;
    await new Promise<void>((resolve) => {
      this.video.onloadedmetadata = () => {
        this.video.play();
        resolve();
      };
    });
    this.loop();
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.detector.destroy();
    this.gazeDetector?.destroy();
    this.gazeDetector = null;
    this.panel?.destroy();
    this.panel = null;
    if (this.ownedVideo) this.video.remove();
    this.removeAllListeners();
  }

  recalibrate(): void {
    this.calibrated = false;
  }

  createPanel(): ControlPanel {
    if (!this.panel) {
      this.panel = new ControlPanel(this.mapper);
    }
    return this.panel;
  }

  private createHiddenVideo(): HTMLVideoElement {
    const v = document.createElement('video');
    v.style.cssText =
      'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(v);
    return v;
  }

  private loop(): void {
    this.rafId = requestAnimationFrame(() => {
      this.tick();
      if (this.rafId !== null) this.loop();
    });
  }

  private tick(): void {
    const now = performance.now();

    // ── 제스처 감지 (항상 실행) ──
    const gestureResult = this.detector.detect(this.video, now);

    // ── landmarks 즉시 업데이트 (early return 이전 — 프리즈 방지) ──
    this._lastLandmarks = gestureResult?.landmarks ?? null;

    // ── 커서 소스 결정 ──
    let rawX: number;
    let rawY: number;

    if (this.gazeDetector) {
      const gaze = this.gazeDetector.detect(this.video, now);
      if (!gaze) {
        if (gestureResult) this.processStateMachine(gestureResult, this.currentPos());
        return;
      }
      rawX = this.flipHorizontal ? 1 - gaze.gazeX : gaze.gazeX;
      rawY = gaze.gazeY;
    } else {
      if (!gestureResult) return;
      const anchor =
        this.cursorAnchor === 'index' ? gestureResult.indexTip :
        this.cursorAnchor === 'palm'  ? gestureResult.palmCenter :
        gestureResult.wrist;
      rawX = this.flipHorizontal ? 1 - anchor.x : anchor.x;
      rawY = anchor.y;
    }
    if (gestureResult) {
      const handAnchor =
        this.cursorAnchor === 'index' ? gestureResult.indexTip :
        this.cursorAnchor === 'palm'  ? gestureResult.palmCenter :
        gestureResult.wrist;
      this.rawHandX = this.flipHorizontal ? 1 - handAnchor.x : handAnchor.x;
      this.rawHandY = handAnchor.y;
    }

    // ── 커서 이동 (드래그 중이면 커서 고정) ──
    const canMove = this.pointerState !== 'dragging';

    if (canMove) {
      let targetX: number;
      let targetY: number;

      if (this.cursorMode === 'relative') {
        const dx = (rawX - this.prevRawX) * this.sensitivity;
        const dy = (rawY - this.prevRawY) * this.sensitivity;
        targetX = Math.max(0, Math.min(1, this.smoothX + dx));
        targetY = Math.max(0, Math.min(1, this.smoothY + dy));
      } else {
        if (!this.calibrated) {
          const halfW = (this.activeZone[2] - this.activeZone[0]) / 2;
          const halfH = (this.activeZone[3] - this.activeZone[1]) / 2;
          this.zoneX0 = rawX - halfW;
          this.zoneX1 = rawX + halfW;
          this.zoneY0 = rawY - halfH;
          this.zoneY1 = rawY + halfH;
          this.smoothX = 0.5;
          this.smoothY = 0.5;
          this.calibrated = true;
        }
        targetX = remapZone(rawX, this.zoneX0, this.zoneX1);
        targetY = remapZone(rawY, this.zoneY0, this.zoneY1);
      }

      const speed = Math.hypot(rawX - this.prevRawX, rawY - this.prevRawY);
      const t     = Math.min(speed / ADAPTIVE_SPEED_THRESHOLD, 1);
      const alpha = ADAPTIVE_MIN_ALPHA + t * (ADAPTIVE_MAX_ALPHA - ADAPTIVE_MIN_ALPHA);
      this.smoothX = lerp(this.smoothX, targetX, alpha);
      this.smoothY = lerp(this.smoothY, targetY, alpha);
    }

    this.prevRawX = rawX;
    this.prevRawY = rawY;

    const pos = this.currentPos();
    this.emit('move', pos);

    // ── hover 감지 (정지 500ms) ──
    const moveDist = Math.hypot(
      pos.screenX - this.lastMovePos.x,
      pos.screenY - this.lastMovePos.y,
    );
    if (moveDist > HOVER_MOVE_PX) {
      this.lastMovePos = { x: pos.screenX, y: pos.screenY };
      if (this.isHovering) {
        this.isHovering = false;
      }
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      this.hoverTimer = setTimeout(() => {
        this.isHovering = true;
        this.emit('hover', this.currentPos());
      }, HOVER_STILL_MS);
    }

    // ── 상태 머신 ──
    if (gestureResult) {
      this.processStateMachine(gestureResult, pos);
    }
  }

  private currentPos(): Pick<MoveEvent, 'x' | 'y' | 'screenX' | 'screenY'> {
    return {
      x: this.smoothX,
      y: this.smoothY,
      screenX: Math.round(this.smoothX * window.innerWidth),
      screenY: Math.round(this.smoothY * window.innerHeight),
    };
  }

  // ────────────────────────────────────────────────────────
  // 상태 머신: 핀치 전환 + 이동 여부 + 시간으로 이벤트 결정
  // ────────────────────────────────────────────────────────
  private processStateMachine(
    result: DetectionResult,
    pos: Pick<MoveEvent, 'x' | 'y' | 'screenX' | 'screenY'>,
  ): void {
    const now = Date.now();

    // ── 핀치 Transition 감지 ──
    const isPinching = result.thumbIndexDist < PINCH_IN_THRESHOLD;
    const pinchReleased = !isPinching && result.thumbIndexDist > PINCH_OUT_THRESHOLD;
    const pinchIn  = isPinching && !this.wasPinching;
    const pinchOut = pinchReleased && this.wasPinching;
    this.wasPinching = isPinching || (this.wasPinching && !pinchReleased);

    // ── 우클릭 (중지+엄지 핀치) Transition ──
    const isRightPinch = result.thumbMiddleDist < PINCH_IN_THRESHOLD;
    const rightPinchIn = isRightPinch && !this.wasRightPinching;
    this.wasRightPinching = isRightPinch;

    if (rightPinchIn && this.pointerState === 'idle') {
      this.emit('contextmenu', pos as ClickEvent);
    }

    // ── 상태별 처리 ──
    switch (this.pointerState) {
      case 'idle':
        if (pinchIn) {
          this.pointerState  = 'mousedown';
          this.mouseDownTime = now;
          this.mouseDownPos  = { x: pos.screenX, y: pos.screenY };
          this.emit('mousedown', pos as ClickEvent);
        }
        // 두 손가락 (victory) → 스크롤 모드
        if (result.gestureName === 'victory') {
          this.pointerState  = 'scrolling';
          this.prevScrollY   = this.rawHandY;  // 실제 손 위치 기준
          this.scrollGraceMs = now;
        }
        break;

      case 'mousedown':
        if (pinchOut) {
          // 핀치 해제
          this.emit('mouseup', pos as ClickEvent);
          const holdTime = now - this.mouseDownTime;
          if (holdTime < CLICK_MAX_HOLD_MS && now - this.lastClickTime > CLICK_COOLDOWN_MS) {
            this.emit('click', pos as ClickEvent);
            // dblclick 체크
            if (now - this.lastClickTime < DBLCLICK_WINDOW_MS) {
              this.emit('dblclick', pos as ClickEvent);
            }
            this.lastClickTime = now;
          }
          this.pointerState = 'idle';
        } else if (isPinching) {
          // 핀치 유지 중 이동 → 드래그
          const dx = pos.screenX - this.mouseDownPos.x;
          const dy = pos.screenY - this.mouseDownPos.y;
          if (Math.hypot(dx, dy) > DRAG_MIN_DIST_PX) {
            this.pointerState = 'dragging';
            // dragstart도 실제 손 위치 사용 (drag 이벤트와 동일 좌표계)
            this.emit('dragstart', {
              x: this.rawHandX,
              y: this.rawHandY,
              screenX: Math.round(this.rawHandX * window.innerWidth),
              screenY: Math.round(this.rawHandY * window.innerHeight),
            } as ClickEvent);
          }
        }
        break;

      case 'dragging':
        if (pinchOut) {
          this.emit('dragend', pos as ClickEvent);
          this.emit('mouseup', pos as ClickEvent);
          this.pointerState = 'idle';
        } else {
          // 드래그: 고정 커서가 아닌 실제 손 위치를 전달 (회전 delta 계산용)
          this.emit('drag', {
            x: this.rawHandX,
            y: this.rawHandY,
            screenX: Math.round(this.rawHandX * window.innerWidth),
            screenY: Math.round(this.rawHandY * window.innerHeight),
          } as ClickEvent);
        }
        break;

      case 'scrolling': {
        const isVictory = result.gestureName === 'victory';
        if (isVictory) this.scrollGraceMs = now;

        // grace period (300ms): victory 깜빡임에도 스크롤 유지
        if (!isVictory && now - this.scrollGraceMs > 300) {
          this.pointerState = 'idle';
        } else {
          // 실제 손 Y 위치로 스크롤 delta 계산 (커서 스무딩 무관)
          const deltaY = (this.rawHandY - this.prevScrollY) * SCROLL_SENSITIVITY;
          if (Math.abs(deltaY) > 0.3) {
            this.emit('scroll', { deltaY });
          }
          this.prevScrollY = this.rawHandY;
        }
        break;
      }
    }

    // ── 제스처 이벤트 (개발자 API) + 단축키 ──
    const gestureName = result.gestureName;
    if (gestureName) {
      this.panel?.setDetected(gestureName, result.gestureConfidence);
      const lastFire = this.lastGestureMs.get(gestureName) ?? 0;
      if (now - lastFire > GESTURE_COOLDOWN_MS) {
        this.lastGestureMs.set(gestureName, now);
        const gestureEvent: GestureEvent = {
          gesture: gestureName,
          ...pos,
          confidence: result.gestureConfidence,
        };
        this.emit(gestureName, gestureEvent);
        this.mapper.trigger(gestureName);
      }
    } else {
      this.panel?.setDetected(null, 0);
    }

    // ── 박수 ──
    if (result.clap) {
      this.emit('clap', { gesture: 'pointing' as GestureName, ...pos, confidence: 1 });
    }
  }
}
