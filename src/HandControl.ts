import { EventEmitter } from './EventEmitter';
import { GestureDetector } from './GestureDetector';
import { lerp } from './utils/geometry';
import type {
  HandControlEventMap,
  HandControlOptions,
  MoveEvent,
  ClickEvent,
} from './types';

const CLICK_RELEASE_HYSTERESIS = 0.09;
const CLICK_COOLDOWN_MS = 600;

/** 주먹/펼침 상태일 때 프레임당 scroll deltaY 크기 */
const ZOOM_DELTA = 12;

export class HandControl extends EventEmitter<HandControlEventMap> {
  private video: HTMLVideoElement;
  private detector: GestureDetector;
  private rafId: number | null = null;
  private stream: MediaStream | null = null;

  // gesture state
  private isClicking = false;
  private lastClickMs = 0;

  // smoothed cursor position (검지 끝 추적)
  private smoothX = 0.5;
  private smoothY = 0.5;

  private readonly threshold: number;
  private readonly smoothing: number;
  private readonly flipHorizontal: boolean;
  private readonly ownedVideo: boolean;

  constructor(options: HandControlOptions = {}) {
    super();
    this.threshold      = options.threshold      ?? 0.05;
    this.smoothing      = options.smoothing       ?? 0.6;
    this.flipHorizontal = options.flipHorizontal  ?? true;

    if (options.video) {
      this.video     = options.video;
      this.ownedVideo = false;
    } else {
      this.video     = this.createHiddenVideo();
      this.ownedVideo = true;
    }

    this.detector = new GestureDetector(options.wasmPath, this.threshold);
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
    if (this.ownedVideo) this.video.remove();
    this.removeAllListeners();
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

    // 커서: 검지 끝 추적 (클릭 제스처와 완전히 독립)
    const rawX = this.flipHorizontal ? 1 - result.indexTip.x : result.indexTip.x;
    const rawY = result.indexTip.y;

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

    // 클릭: 엄지 + 중지 핀치
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

    // 줌: 주먹 → 줌 인 / 펼친 손 → 줌 아웃 (클릭 중에는 무시)
    if (!this.isClicking) {
      if (result.gesture === 'fist') {
        this.emit('scroll', { deltaY: ZOOM_DELTA });
      } else if (result.gesture === 'open-palm') {
        this.emit('scroll', { deltaY: -ZOOM_DELTA });
      }
    }
  }
}
