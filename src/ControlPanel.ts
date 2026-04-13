import type { GestureMapper } from './GestureMapper';
import { formatKeyLabel } from './GestureMapper';
import { GESTURE_META, type GestureName } from './types';

const P = 'hf-'; // CSS class prefix (스타일 충돌 방지)

const CONFIGURABLE: GestureName[] = ['fist', 'openpalm', 'victory', 'thumbsup', 'thumbsdown', 'iloveyou'];
const BUILTIN: GestureName[]      = ['pointing'];

/** 핸드페이스 플로팅 설정 패널 */
export class ControlPanel {
  private root: HTMLElement;
  private fab:  HTMLButtonElement;
  private panel: HTMLElement;
  private styleEl: HTMLStyleElement;
  private isOpen = false;
  private capturingGesture: GestureName | null = null;
  private captureHandler: ((e: KeyboardEvent) => void) | null = null;
  private detectedGesture: GestureName | null = null;

  constructor(private readonly mapper: GestureMapper) {
    this.styleEl = this.injectStyles();
    this.fab     = this.createFab();
    this.panel   = this.createPanel();

    this.root = document.createElement('div');
    this.root.setAttribute('data-handface', '');
    this.root.appendChild(this.fab);
    this.root.appendChild(this.panel);
    document.body.appendChild(this.root);

    this.fab.addEventListener('click', () => this.toggle());
  }

  /** HandControl 에서 매 프레임 호출 — 현재 감지 제스처 표시 */
  setDetected(gesture: GestureName | null, confidence: number): void {
    if (!this.isOpen) return;
    if (this.detectedGesture === gesture) return;
    this.detectedGesture = gesture;

    this.panel.querySelectorAll<HTMLElement>(`.${P}row[data-gesture]`).forEach((row) => {
      const g = row.dataset.gesture as GestureName;
      row.classList.toggle(`${P}active`, g === gesture && confidence > 0.6);
    });
  }

  destroy(): void {
    this.stopCapture();
    this.styleEl.remove();
    this.root.remove();
  }

  // ─────────────────────────────────────────
  // Panel open / close
  // ─────────────────────────────────────────

  private toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  private open(): void {
    this.isOpen = true;
    this.renderRows();
    this.panel.classList.add(`${P}open`);
    this.fab.classList.add(`${P}fab-open`);
  }

  private close(): void {
    this.isOpen = false;
    this.stopCapture();
    this.panel.classList.remove(`${P}open`);
    this.fab.classList.remove(`${P}fab-open`);
  }

  // ─────────────────────────────────────────
  // Key capture
  // ─────────────────────────────────────────

  private startCapture(gesture: GestureName): void {
    this.stopCapture();
    this.capturingGesture = gesture;

    this.captureHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      // 단독 수정자 키는 무시
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
        document.addEventListener('keydown', this.captureHandler!, { once: true, capture: true });
        return;
      }

      this.mapper.bind(gesture, e.key, {
        ctrl:  e.ctrlKey  || undefined,
        alt:   e.altKey   || undefined,
        shift: e.shiftKey || undefined,
        meta:  e.metaKey  || undefined,
      });
      this.capturingGesture = null;
      this.captureHandler   = null;
      this.renderRows();
    };

    document.addEventListener('keydown', this.captureHandler, { once: true, capture: true });
    this.renderRows();
  }

  private stopCapture(): void {
    if (this.captureHandler) {
      document.removeEventListener('keydown', this.captureHandler, { capture: true });
      this.captureHandler   = null;
      this.capturingGesture = null;
    }
  }

  // ─────────────────────────────────────────
  // DOM construction
  // ─────────────────────────────────────────

  private createFab(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = `${P}fab`;
    btn.title = 'handface 제스처 설정';
    btn.innerHTML = '✋';
    return btn;
  }

  private createPanel(): HTMLElement {
    const el = document.createElement('div');
    el.className = `${P}panel`;
    el.innerHTML = `
      <div class="${P}header">
        <span class="${P}title">✋ handface</span>
        <button class="${P}close-btn" title="닫기">✕</button>
      </div>
      <div class="${P}body">
        <div class="${P}section-label">기본 동작</div>
        <div class="${P}builtin-rows"></div>
        <div class="${P}section-label" style="margin-top:10px">단축키 바인딩</div>
        <div class="${P}binding-rows"></div>
      </div>
    `;
    el.querySelector<HTMLButtonElement>(`.${P}close-btn`)!
      .addEventListener('click', () => this.close());
    return el;
  }

  private renderRows(): void {
    this.renderBuiltin();
    this.renderBindings();
  }

  private renderBuiltin(): void {
    const container = this.panel.querySelector<HTMLElement>(`.${P}builtin-rows`)!;
    container.innerHTML = '';

    container.appendChild(this.makeReadonlyRow('🤏', '엄지+검지 핀치 (빠르게)', '클릭', null));
    container.appendChild(this.makeReadonlyRow('🤏', '핀치 유지 + 이동', '드래그', null));
    container.appendChild(this.makeReadonlyRow('🖖', '엄지+중지 핀치', '우클릭', null));
    container.appendChild(this.makeReadonlyRow('🤲', '양손 벌리기/모으기', '줌', null));

    for (const g of BUILTIN) {
      const meta = GESTURE_META[g];
      container.appendChild(
        this.makeReadonlyRow(meta.icon, meta.labelKo, meta.builtinAction!, g),
      );
    }
  }

  private renderBindings(): void {
    const container = this.panel.querySelector<HTMLElement>(`.${P}binding-rows`)!;
    container.innerHTML = '';

    for (const g of CONFIGURABLE) {
      const meta    = GESTURE_META[g];
      const binding = this.mapper.getBinding(g);
      const isCapturing = this.capturingGesture === g;
      container.appendChild(
        this.makeBindingRow(g, meta.icon, meta.labelKo, binding?.key ?? null, isCapturing),
      );
    }
  }

  private makeReadonlyRow(
    icon: string,
    nameKo: string,
    action: string,
    gesture: GestureName | null,
  ): HTMLElement {
    const row = document.createElement('div');
    row.className = `${P}row`;
    if (gesture) row.dataset.gesture = gesture;
    row.innerHTML = `
      <span class="${P}icon">${icon}</span>
      <span class="${P}name">${nameKo}</span>
      <span class="${P}badge">${action}</span>
    `;
    return row;
  }

  private makeBindingRow(
    gesture: GestureName,
    icon: string,
    nameKo: string,
    key: string | null,
    capturing: boolean,
  ): HTMLElement {
    const row = document.createElement('div');
    row.className = `${P}row`;
    row.dataset.gesture = gesture;

    const keyLabel = key ? this.buildKeyLabel(this.mapper.getBinding(gesture)!) : null;

    if (capturing) {
      row.innerHTML = `
        <span class="${P}icon">${icon}</span>
        <span class="${P}name">${nameKo}</span>
        <span class="${P}capture-hint">단축키 입력...</span>
        <button class="${P}cancel-btn">취소</button>
      `;
      row.querySelector<HTMLButtonElement>(`.${P}cancel-btn`)!
        .addEventListener('click', () => {
          this.stopCapture();
          this.renderRows();
        });
    } else {
      row.innerHTML = `
        <span class="${P}icon">${icon}</span>
        <span class="${P}name">${nameKo}</span>
        ${keyLabel
          ? `<span class="${P}key-tag">${keyLabel}</span>
             <button class="${P}bind-btn ${P}clear-btn" data-gesture="${gesture}" title="제거">✕</button>`
          : `<span class="${P}no-bind">—</span>`
        }
        <button class="${P}bind-btn ${P}edit-btn" data-gesture="${gesture}" title="단축키 설정">✎</button>
      `;
      row.querySelector<HTMLButtonElement>(`.${P}edit-btn`)!
        .addEventListener('click', () => this.startCapture(gesture));
      row.querySelector<HTMLButtonElement>(`.${P}clear-btn`)
        ?.addEventListener('click', () => {
          this.mapper.unbind(gesture);
          this.renderRows();
        });
    }
    return row;
  }

  private buildKeyLabel(binding: import('./types').GestureKeyBinding): string {
    const parts: string[] = [];
    if (binding.modifiers?.ctrl)  parts.push('Ctrl');
    if (binding.modifiers?.alt)   parts.push('Alt');
    if (binding.modifiers?.shift) parts.push('Shift');
    if (binding.modifiers?.meta)  parts.push('⌘');
    parts.push(formatKeyLabel(binding.key));
    return parts.join('+');
  }

  // ─────────────────────────────────────────
  // Styles
  // ─────────────────────────────────────────

  private injectStyles(): HTMLStyleElement {
    const style = document.createElement('style');
    style.dataset.handface = 'styles';
    style.textContent = `
      .${P}fab {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c6af7, #5b4dd4);
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(124,106,247,0.45);
        z-index: 999998;
        transition: transform 0.18s, box-shadow 0.18s;
        user-select: none;
      }
      .${P}fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(124,106,247,0.65); }
      .${P}fab-open  { transform: rotate(20deg) scale(1.05); }

      .${P}panel {
        position: fixed;
        right: 20px;
        bottom: 76px;
        width: 272px;
        background: rgba(10, 10, 20, 0.97);
        border: 1px solid rgba(124,106,247,0.28);
        border-radius: 16px;
        z-index: 999999;
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
        box-shadow: 0 12px 48px rgba(0,0,0,0.55);
        color: #ddddf5;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px;
        opacity: 0;
        transform: translateY(10px) scale(0.97);
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      .${P}open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      .${P}header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px 11px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .${P}title {
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: -0.01em;
      }
      .${P}close-btn {
        background: none;
        border: none;
        color: rgba(221,221,245,0.45);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 2px 4px;
        border-radius: 4px;
        transition: color 0.12s;
      }
      .${P}close-btn:hover { color: #ddddf5; }

      .${P}body {
        padding: 12px 14px 14px;
      }
      .${P}section-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        opacity: 0.35;
        margin-bottom: 7px;
      }

      .${P}row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 6px;
        border-radius: 8px;
        margin-bottom: 3px;
        transition: background 0.15s;
      }
      .${P}row.${P}active {
        background: rgba(124,106,247,0.18);
      }

      .${P}icon { font-size: 1rem; width: 22px; text-align: center; flex-shrink: 0; }
      .${P}name { flex: 1; opacity: 0.8; font-size: 0.76rem; }

      .${P}badge {
        font-size: 0.65rem;
        background: rgba(124,106,247,0.25);
        color: #9d8dff;
        padding: 2px 7px;
        border-radius: 99px;
        white-space: nowrap;
      }

      .${P}key-tag {
        font-size: 0.65rem;
        font-family: 'SF Mono', 'Fira Code', monospace;
        background: rgba(78,205,196,0.15);
        color: #4ecdc4;
        padding: 2px 7px;
        border-radius: 6px;
        white-space: nowrap;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .${P}no-bind {
        font-size: 0.72rem;
        opacity: 0.3;
      }

      .${P}bind-btn {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 5px;
        font-size: 0.75rem;
        transition: background 0.12s, color 0.12s;
        flex-shrink: 0;
      }
      .${P}edit-btn  { color: rgba(221,221,245,0.45); }
      .${P}edit-btn:hover  { background: rgba(124,106,247,0.2); color: #9d8dff; }
      .${P}clear-btn { color: rgba(221,221,245,0.3); }
      .${P}clear-btn:hover { background: rgba(255,80,80,0.15); color: #ff6b6b; }

      .${P}capture-hint {
        flex: 1;
        font-size: 0.7rem;
        color: #ffd166;
        animation: ${P}blink 1s step-end infinite;
      }
      .${P}cancel-btn {
        background: none;
        border: 1px solid rgba(255,80,80,0.3);
        color: rgba(255,100,100,0.7);
        border-radius: 5px;
        padding: 2px 7px;
        font-size: 0.65rem;
        cursor: pointer;
        flex-shrink: 0;
      }
      .${P}cancel-btn:hover { background: rgba(255,80,80,0.1); }

      @keyframes ${P}blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);
    return style;
  }
}
