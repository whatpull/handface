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

const CLICK_RELEASE_HYSTERESIS = 0.09;
const CLICK_COOLDOWN_MS        = 600;
/** 주먹/펼침 상태일 때 프레임당 scroll deltaY 크기 */
const SCROLL_DELTA             = 12;
/** 동일 제스처 이벤트 최소 발화 간격 (ms) */
const GESTURE_COOLDOWN_MS      = 900;

/**
 * 사용자 handedness 옵션 → MediaPipe categoryName 변환.
 * MediaPipe GestureRecognizer는 정면 카메라를 내부적으로 보정하므로
 * 반환되는 handedness가 실제 손과 일치한다.
 *   사용자의 오른손 → MediaPipe 'Right'
 *   사용자의 왼손  → MediaPipe 'Left'
 */
function toMPHandedness(h: HandControlOptions['handedness']): 'Left' | 'Right' | null {
  if (h === 'right') return 'Right';
  if (h === 'left')  return 'Left';
  return null;
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
  /** GestureName → 마지막 발화 타임스탬프 */
  private lastGestureMs = new Map<GestureName, number>();

  // 스무딩된 커서 위치
  private smoothX = 0.5;
  private smoothY = 0.5;

  private readonly smoothing: number;
  private readonly flipHorizontal: boolean;
  private readonly cursorAnchor: 'wrist' | 'palm' | 'index';
  private readonly ownedVideo: boolean;

  /** 단축키 바인딩 엔진 — 직접 접근 가능 */
  readonly mapper = new GestureMapper();

  constructor(options: HandControlOptions = {}) {
    super();
    this.smoothing      = options.smoothing       ?? 0.6;
    this.flipHorizontal = options.flipHorizontal  ?? true;
    this.cursorAnchor   = options.cursorAnchor    ?? 'wrist';

    const threshold     = options.threshold       ?? 0.05;

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

    this.smoothX = lerp(this.smoothX, rawX, 1 - this.smoothing);
    this.smoothY = lerp(this.smoothY, rawY, 1 - this.smoothing);

    const screenX = Math.round(this.smoothX * window.innerWidth);
    const screenY = Math.round(this.smoothY * window.innerHeight);

    const pos: Pick<MoveEvent, 'x' | 'y' | 'screenX' | 'screenY'> = {
      x: this.smoothX,
      y: this.smoothY,
      screenX,
      screenY,
    };

    this.emit('move', pos);

    // ── 클릭: 엄지+중지 핀치 ──
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

    // ── 제스처 이벤트 (개발자 API) + 단축키 트리거 (일반 사용자) ──
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
  }
}
