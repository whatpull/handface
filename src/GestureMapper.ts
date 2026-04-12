import type { GestureName, GestureKeyBinding } from './types';

const STORAGE_KEY = 'handface_key_bindings';

/** KeyboardEvent.key → 화면 표시용 레이블 */
export function formatKeyLabel(key: string): string {
  const MAP: Record<string, string> = {
    ' ':           'Space',
    ArrowUp:       '↑',
    ArrowDown:     '↓',
    ArrowLeft:     '←',
    ArrowRight:    '→',
    Escape:        'Esc',
    Backspace:     '⌫',
    Delete:        'Del',
    Enter:         '↵',
    Tab:           'Tab',
    PageUp:        'PgUp',
    PageDown:      'PgDn',
    Home:          'Home',
    End:           'End',
  };
  return MAP[key] ?? key;
}

/** 단축키 바인딩 + 키보드 이벤트 디스패치 엔진 */
export class GestureMapper {
  private bindings = new Map<GestureName, GestureKeyBinding>();

  constructor() {
    this.load();
  }

  bind(gesture: GestureName, key: string, modifiers?: GestureKeyBinding['modifiers']): void {
    this.bindings.set(gesture, { gesture, key, modifiers });
    this.save();
  }

  unbind(gesture: GestureName): void {
    this.bindings.delete(gesture);
    this.save();
  }

  getBinding(gesture: GestureName): GestureKeyBinding | undefined {
    return this.bindings.get(gesture);
  }

  getAll(): GestureKeyBinding[] {
    return [...this.bindings.values()];
  }

  /**
   * 제스처에 바인딩된 키보드 동작을 실행합니다.
   *
   * 브라우저 보안 정책상 dispatchEvent로 생성한 KeyboardEvent는
   * isTrusted: false라서 네이티브 동작(F5 새로고침, Ctrl+C 등)을
   * 트리거하지 못합니다.
   *
   * 따라서 두 가지 경로로 처리합니다:
   *  1) 알려진 키 조합 → 대응하는 브라우저 API를 직접 호출
   *  2) 그 외 → 기존 KeyboardEvent dispatch (앱 레벨 리스너용)
   */
  trigger(gesture: GestureName): void {
    const binding = this.bindings.get(gesture);
    if (!binding) return;

    const key = binding.key;
    const mod = binding.modifiers ?? {};

    // 알려진 키 조합 → 네이티브 동작 직접 실행
    if (this.execNative(key, mod)) return;

    // 그 외: KeyboardEvent dispatch (앱 리스너용)
    const init: KeyboardEventInit = {
      key,
      bubbles:    true,
      cancelable: true,
      ctrlKey:    mod.ctrl  ?? false,
      altKey:     mod.alt   ?? false,
      shiftKey:   mod.shift ?? false,
      metaKey:    mod.meta  ?? false,
    };
    document.dispatchEvent(new KeyboardEvent('keydown', init));
    document.dispatchEvent(new KeyboardEvent('keyup',   init));
  }

  /** 알려진 키 → 네이티브 브라우저 동작 직접 호출 */
  private execNative(
    key: string,
    mod: Partial<NonNullable<GestureKeyBinding['modifiers']>>,
  ): boolean {
    const k = key.toLowerCase();

    // F5 / Ctrl+R → 새로고침
    if (k === 'f5' || (k === 'r' && mod.ctrl)) {
      location.reload();
      return true;
    }
    // Escape
    if (k === 'escape') {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      return true;
    }
    // F11 → 전체화면 토글
    if (k === 'f11') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
      return true;
    }
    // Ctrl+Plus / Ctrl+Minus → 줌
    if (mod.ctrl && (k === '+' || k === '=')) {
      document.body.style.zoom = String(parseFloat(document.body.style.zoom || '1') + 0.1);
      return true;
    }
    if (mod.ctrl && k === '-') {
      document.body.style.zoom = String(Math.max(0.5, parseFloat(document.body.style.zoom || '1') - 0.1));
      return true;
    }
    // Ctrl+0 → 줌 리셋
    if (mod.ctrl && k === '0') {
      document.body.style.zoom = '1';
      return true;
    }
    // Alt+Left / Alt+Right → 뒤로/앞으로
    if (mod.alt && k === 'arrowleft')  { history.back();    return true; }
    if (mod.alt && k === 'arrowright') { history.forward();  return true; }

    return false;
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.bindings.entries()]));
    } catch {
      // localStorage 접근 불가 환경 무시
    }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.bindings = new Map(JSON.parse(raw) as [GestureName, GestureKeyBinding][]);
    } catch {
      // 파싱 실패 무시
    }
  }
}
