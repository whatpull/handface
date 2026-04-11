import { EventEmitter } from './EventEmitter';
import { GestureDetector } from './GestureDetector';
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

const CLICK_RELEASE_HYSTERESIS = 0.10;
const CLICK_COOLDOWN_MS        = 1000; // 반복 클릭 방지 (600 → 1000ms)
const SCROLL_DELTA             = 12;
const GESTURE_COOLDOWN_MS      = 900;

// ③ 적응형 스무딩 파라미터 (정지 시 안정 / 이동 시 반응)
const ADAPTIVE_SPEED_THRESHOLD = 0.022;
const ADAPTIVE_MIN_ALPHA       = 0.04;  // 정지: 강한 스무딩
const ADAPTIVE_MAX_ALPHA       = 0.65;  // 빠른 이동: 적당한 반응

function toMPHandedness(h: HandControlOptions['handedness']): 'Left' | 'Right' | null {
  if (h === 'right') return 'Right';
  if (h === 'left')  return 'Left';
  return null;
}

/** ② 절대 모드용: active zone → 0~1 리매핑 (clamp 포함) */
function remapZone(v: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (v - min) / (max - min)));
}

export class HandControl extends EventEmitter<HandControlEventMap> {
  private video: HTMLVideoElement;
  private detector: GestureDetector;
  private rafId: number | null = null;
  private stream: MediaStream | null = null;
  private panel: ControlPanel | null = null;

  // 제스처 상태
  private isClicking = false;
  private lastClickMs = 0;
  private lastGestureMs = new Map<GestureName, number>();

  // 커서 상태
  private smoothX = 0.5;
  private smoothY = 0.5;
  private prevRawX = 0.5;
  private prevRawY = 0.5;
  private wasMovingCursor = false;

  // 옵션
  private readonly flipHorizontal: boolean;
  private readonly cursorAnchor: 'wrist' | 'palm' | 'index';
  private readonly cursorMode: 'absolute' | 'relative';
  private readonly sensitivity: number;
  private readonly activeZone: [number, number, number, number];
  private readonly gestureGated: boolean;
  private readonly ownedVideo: boolean;

  /** 단축키 바인딩 엔진 — 직접 접근 가능 */
  readonly mapper = new GestureMapper();

  constructor(options: HandControlOptions = {}) {
    super();
    this.flipHorizontal = options.flipHorizontal ?? true;
    this.cursorAnchor   = options.cursorAnchor   ?? 'palm';      // 손바닥 중심 (안정적)
    this.cursorMode     = options.cursorMode      ?? 'absolute';  // 절대 위치 (직관적)
    this.sensitivity    = options.sensitivity     ?? 2.5;
    this.activeZone     = options.activeZone      ?? [0.3, 0.1, 0.95, 0.85];
    this.gestureGated   = options.gestureGated    ?? false;       // 제스처 무관 커서 이동

    const threshold = options.threshold ?? 0.05;

    if (options.video) {
      this.video      = options.video;
      this.ownedVideo = false;
    } else {
      this.video      = this.createHiddenVideo();
      this.ownedVideo = true;
    }

    this.detector = new GestureDetector(
      options.wasmPath,
      threshold,
      toMPHandedness(options.handedness ?? 'right'),
    );
  }

  /** 카메라 열고 감지 시작 */
  async start(): Promise<void> {
    await this.detector.init();
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

  /** 감지 중지 및 리소스 해제 */
  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.detector.destroy();
    this.panel?.destroy();
    this.panel = null;
    if (this.ownedVideo) this.video.remove();
    this.removeAllListeners();
  }

  /**
   * 플로팅 설정 패널을 생성하고 document.body 에 주입합니다.
   * 이미 생성된 경우 기존 인스턴스를 반환합니다.
   */
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
    const result = this.detector.detect(this.video, now);
    if (!result) return;

    // ── 커서 앵커 선택 ──
    const anchor =
      this.cursorAnchor === 'index' ? result.indexTip :
      this.cursorAnchor === 'palm'  ? result.palmCenter :
      result.wrist;

    const rawX = this.flipHorizontal ? 1 - anchor.x : anchor.x;
    const rawY = anchor.y;

    // ─────────────────────────────────────────────────────────────
    // ④ 커서 이동 조건:
    //    - 클릭 중(isClicking)이면 커서 고정 → 클릭+이동 동시 방지
    //    - gestureGated: true 일 때만 pointing 제스처 추가 체크
    // ─────────────────────────────────────────────────────────────
    const canMove =
      !this.isClicking &&
      (!this.gestureGated || result.gestureName === 'pointing');

    if (canMove) {
      let targetX: number;
      let targetY: number;

      if (this.cursorMode === 'relative') {
        // ① 상대 이동 모드
        if (!this.wasMovingCursor) {
          this.prevRawX = rawX;
          this.prevRawY = rawY;
        }
        const dx = (rawX - this.prevRawX) * this.sensitivity;
        const dy = (rawY - this.prevRawY) * this.sensitivity;
        targetX = Math.max(0, Math.min(1, this.smoothX + dx));
        targetY = Math.max(0, Math.min(1, this.smoothY + dy));
      } else {
        // ② 절대 모드 + Active Zone 리매핑
        const [x0, y0, x1, y1] = this.activeZone;
        targetX = remapZone(rawX, x0, x1);
        targetY = remapZone(rawY, y0, y1);
      }

      // ③ 적응형 스무딩
      const speed = Math.hypot(rawX - this.prevRawX, rawY - this.prevRawY);
      const t     = Math.min(speed / ADAPTIVE_SPEED_THRESHOLD, 1);
      const alpha = ADAPTIVE_MIN_ALPHA + t * (ADAPTIVE_MAX_ALPHA - ADAPTIVE_MIN_ALPHA);

      this.smoothX = lerp(this.smoothX, targetX, alpha);
      this.smoothY = lerp(this.smoothY, targetY, alpha);
    }

    this.prevRawX        = rawX;
    this.prevRawY        = rawY;
    this.wasMovingCursor = canMove;

    // ── move 이벤트 ──
    const screenX = Math.round(this.smoothX * window.innerWidth);
    const screenY = Math.round(this.smoothY * window.innerHeight);
    const pos: Pick<MoveEvent, 'x' | 'y' | 'screenX' | 'screenY'> = {
      x: this.smoothX,
      y: this.smoothY,
      screenX,
      screenY,
    };
    this.emit('move', pos);

    // ── 클릭: 엄지+검지 핀치 (OK 제스처) ──
    if (result.gesture === 'click') {
      if (!this.isClicking) {
        this.isClicking = true;
        const nowMs = Date.now();
        if (nowMs - this.lastClickMs > CLICK_COOLDOWN_MS) {
          this.lastClickMs = nowMs;
          this.emit('click', pos as ClickEvent);
        }
      }
    } else if (result.clickPinchDistance > CLICK_RELEASE_HYSTERESIS) {
      this.isClicking = false;
    }

    // ── 스크롤: 주먹 → 다운 / 펼친 손 → 업 (클릭 중 무시) ──
    if (!this.isClicking) {
      if (result.gestureName === 'fist') {
        this.emit('scroll', { deltaY: SCROLL_DELTA });
      } else if (result.gestureName === 'openpalm') {
        this.emit('scroll', { deltaY: -SCROLL_DELTA });
      }
    }

    // ── 제스처 이벤트 (개발자 API) + 단축키 트리거 ──
    const gestureName = result.gestureName;
    if (gestureName) {
      this.panel?.setDetected(gestureName, result.gestureConfidence);
      const nowMs = Date.now();
      const lastFire = this.lastGestureMs.get(gestureName) ?? 0;
      if (nowMs - lastFire > GESTURE_COOLDOWN_MS) {
        this.lastGestureMs.set(gestureName, nowMs);
        const gestureEvent: GestureEvent = { gesture: gestureName, ...pos, confidence: result.gestureConfidence };
        this.emit(gestureName, gestureEvent);
        this.mapper.trigger(gestureName);
      }
    } else {
      this.panel?.setDetected(null, 0);
    }
  }
}
