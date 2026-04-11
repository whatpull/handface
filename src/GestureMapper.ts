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

  /** 제스처에 바인딩된 키보드 이벤트 디스패치 */
  trigger(gesture: GestureName): void {
    const binding = this.bindings.get(gesture);
    if (!binding) return;

    const init: KeyboardEventInit = {
      key:      binding.key,
      bubbles:  true,
      cancelable: true,
      ctrlKey:  binding.modifiers?.ctrl  ?? false,
      altKey:   binding.modifiers?.alt   ?? false,
      shiftKey: binding.modifiers?.shift ?? false,
      metaKey:  binding.modifiers?.meta  ?? false,
    };
    document.dispatchEvent(new KeyboardEvent('keydown', init));
    document.dispatchEvent(new KeyboardEvent('keyup',   init));
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
