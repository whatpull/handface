import { EventEmitter } from './EventEmitter';
import { GestureDetector } from './GestureDetector';
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
  private gazeDetector: GazeDetector | null = null;
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

  // 캘리브레이션 상태 (절대 모드용)
  private calibrated = false;
  private zoneX0 = 0;
  private zoneX1 = 1;
  private zoneY0 = 0;
  private zoneY1 = 1;

  // 옵션
  private readonly flipHorizontal: boolean;
  private readonly cursorSource: 'hand' | 'gaze';
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
    this.cursorSource   = options.cursorSource   ?? 'hand';
    this.cursorAnchor   = options.cursorAnchor   ?? 'palm';      // 손바닥 중심 (안정적)
    this.cursorMode     = options.cursorMode      ?? 'absolute';  // 절대 위치 (직관적)
    this.sensitivity    = options.sensitivity     ?? 2.5;
    this.gestureGated   = options.gestureGated    ?? false;       // 제스처 무관 커서 이동

    // gaze 모드: 홍채 이동 범위가 손보다 훨씬 좁으므로 기본 activeZone을 좁게 설정
    // gaze 모드: 눈소켓 정규화 좌표(0~1 비율) 기준 ±0.15 범위가 편안한 시선 이동
    const defaultZone: [number, number, number, number] =
      this.cursorSource === 'gaze' ? [0.35, 0.35, 0.65, 0.65] : [0.3, 0.1, 0.95, 0.85];
    this.activeZone = options.activeZone ?? defaultZone;
    // 초기 zone 변수 설정 (캘리브레이션 전 기본값)
    [this.zoneX0, this.zoneY0, this.zoneX1, this.zoneY1] = this.activeZone;

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

    if (this.cursorSource === 'gaze') {
      this.gazeDetector = new GazeDetector(options.wasmPath);
    }
  }

  /** 카메라 열고 감지 시작 */
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

  /** 감지 중지 및 리소스 해제 */
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

  /**
   * 캘리브레이션을 초기화합니다.
   * 다음 손 감지 시 그 위치가 화면 중앙으로 재설정됩니다.
   * cursorMode: 'absolute' 일 때만 동작합니다.
   */
  recalibrate(): void {
    this.calibrated = false;
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

    // ── 제스처 감지 (항상 실행 — 클릭/스크롤 소스) ──
    const gestureResult = this.detector.detect(this.video, now);

    // ── 커서 소스 결정 ──
    let rawX: number;
    let rawY: number;

    if (this.gazeDetector) {
      // 시선 추적 모드: 홍채 위치 → 커서
      const gaze = this.gazeDetector.detect(this.video, now);
      if (!gaze) {
        // 얼굴 미감지 시 제스처 이벤트만 처리하고 커서 유지
        if (gestureResult) this.handleGestureEvents(gestureResult, this.currentPos());
        return;
      }
      rawX = this.flipHorizontal ? 1 - gaze.gazeX : gaze.gazeX;
      rawY = gaze.gazeY;
    } else {
      // 손 추적 모드: 손 위치 → 커서
      if (!gestureResult) return;
      const anchor =
        this.cursorAnchor === 'index' ? gestureResult.indexTip :
        this.cursorAnchor === 'palm'  ? gestureResult.palmCenter :
        gestureResult.wrist;
      rawX = this.flipHorizontal ? 1 - anchor.x : anchor.x;
      rawY = anchor.y;
    }

    // ─────────────────────────────────────────────────────────────
    // 커서 이동 조건:
    //   - 클릭 중이면 커서 고정 (클릭+이동 동시 방지)
    //   - gaze 모드에서는 gestureGated 무시 (시선은 항상 이동 가능)
    //   - hand 모드 + gestureGated=true 이면 pointing 제스처만 이동
    // ─────────────────────────────────────────────────────────────
    const canMove =
      !this.isClicking &&
      (this.gazeDetector !== null ||
        !this.gestureGated ||
        gestureResult?.gestureName === 'pointing');

    if (canMove) {
      let targetX: number;
      let targetY: number;

      if (this.cursorMode === 'relative') {
        // 상대 이동 모드
        if (!this.wasMovingCursor) {
          this.prevRawX = rawX;
          this.prevRawY = rawY;
        }
        const dx = (rawX - this.prevRawX) * this.sensitivity;
        const dy = (rawY - this.prevRawY) * this.sensitivity;
        targetX = Math.max(0, Math.min(1, this.smoothX + dx));
        targetY = Math.max(0, Math.min(1, this.smoothY + dy));
      } else {
        // 절대 모드 + Active Zone 리매핑
        // 첫 감지 시 현재 위치를 zone 중심으로 자동 캘리브레이션
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

      // 적응형 스무딩
      const speed = Math.hypot(rawX - this.prevRawX, rawY - this.prevRawY);
      const t     = Math.min(speed / ADAPTIVE_SPEED_THRESHOLD, 1);
      const alpha = ADAPTIVE_MIN_ALPHA + t * (ADAPTIVE_MAX_ALPHA - ADAPTIVE_MIN_ALPHA);

      this.smoothX = lerp(this.smoothX, targetX, alpha);
      this.smoothY = lerp(this.smoothY, targetY, alpha);
    }

    this.prevRawX        = rawX;
    this.prevRawY        = rawY;
    this.wasMovingCursor = canMove;

    const pos = this.currentPos();
    this.emit('move', pos);

    // 제스처 결과가 있으면 클릭/스크롤/이벤트 처리
    if (gestureResult) {
      this.handleGestureEvents(gestureResult, pos);
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

  private handleGestureEvents(
    result: import('./GestureDetector').DetectionResult,
    pos: Pick<MoveEvent, 'x' | 'y' | 'screenX' | 'screenY'>,
  ): void {
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

    // ── 박수: 양손 손바닥이 가까워지는 순간 ──
    if (result.clap) {
      this.emit('clap', { gesture: 'pointing' as GestureName, ...pos, confidence: 1 });
    }
  }
}
