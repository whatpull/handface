import { EventEmitter } from './EventEmitter';
import { GestureDetector } from './GestureDetector';
import { lerp } from './utils/geometry';
import type {
  HandControlEventMap,
  HandControlOptions,
  MoveEvent,
  ClickEvent,
} from './types';

const PINCH_RELEASE_HYSTERESIS = 0.09;
const CLICK_COOLDOWN_MS = 600;

export class HandControl extends EventEmitter<HandControlEventMap> {
  private video: HTMLVideoElement;
  private detector: GestureDetector;
  private rafId: number | null = null;
  private stream: MediaStream | null = null;

  // gesture state
  private isPinching = false;
  private lastClickMs = 0;
  private prevTwoFingerY = 0;

  // smoothed cursor position
  private smoothX = 0.5;
  private smoothY = 0.5;

  // 핀치 시작 시 고정된 커서 위치 (핀치 중 커서 흔들림 방지)
  private frozenX = 0.5;
  private frozenY = 0.5;

  private readonly threshold: number;
  private readonly smoothing: number;
  private readonly flipHorizontal: boolean;
  private readonly ownedVideo: boolean;

  constructor(options: HandControlOptions = {}) {
    super();
    this.threshold = options.threshold ?? 0.05;
    this.smoothing = options.smoothing ?? 0.6;
    this.flipHorizontal = options.flipHorizontal ?? true;

    if (options.video) {
      this.video = options.video;
      this.ownedVideo = false;
    } else {
      this.video = this.createHiddenVideo();
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
    if (this.ownedVideo) {
      this.video.remove();
    }
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

    // 위치 계산 (flipHorizontal → 거울 효과)
    const rawX = this.flipHorizontal ? 1 - result.indexTip.x : result.indexTip.x;
    const rawY = result.indexTip.y;

    // 핀치 중에는 커서 위치 갱신 중단 → 흔들림 방지
    if (!this.isPinching) {
      this.smoothX = lerp(this.smoothX, rawX, 1 - this.smoothing);
      this.smoothY = lerp(this.smoothY, rawY, 1 - this.smoothing);
    }

    const screenX = Math.round(this.smoothX * window.innerWidth);
    const screenY = Math.round(this.smoothY * window.innerHeight);

    const pos: Pick<MoveEvent, 'x' | 'y' | 'screenX' | 'screenY'> = {
      x: this.smoothX,
      y: this.smoothY,
      screenX,
      screenY,
    };

    // move 이벤트는 항상 발생
    this.emit('move', pos);

    // 핀치 → click
    if (result.gesture === 'pinch') {
      if (!this.isPinching) {
        // 핀치 시작 순간의 위치를 고정
        this.frozenX = this.smoothX;
        this.frozenY = this.smoothY;
        this.isPinching = true;
        const nowMs = Date.now();
        if (nowMs - this.lastClickMs > CLICK_COOLDOWN_MS) {
          this.lastClickMs = nowMs;
          this.emit('click', {
            x: this.frozenX,
            y: this.frozenY,
            screenX: Math.round(this.frozenX * window.innerWidth),
            screenY: Math.round(this.frozenY * window.innerHeight),
          } as ClickEvent);
        }
      }
    } else if (result.pinchDistance > PINCH_RELEASE_HYSTERESIS) {
      this.isPinching = false;
    }

    // 두 손가락 수직 이동 → scroll
    if (result.gesture === 'two-finger') {
      const currentY = result.indexTip.y;
      if (this.prevTwoFingerY !== 0) {
        const deltaY = (currentY - this.prevTwoFingerY) * 1000;
        this.emit('scroll', { deltaY });
      }
      this.prevTwoFingerY = currentY;
    } else {
      this.prevTwoFingerY = 0;
    }
  }
}
