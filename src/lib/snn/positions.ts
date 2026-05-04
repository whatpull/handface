// localStorage 기반 노드 위치 영구 저장 (사용자 드래그 결과).

const KEY = 'handface.positions.v1';
let cache = new Map<string, { x: number; y: number }>();
let loaded = false;

function ensureLoaded() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) cache = new Map(Object.entries(JSON.parse(raw)));
  } catch (e) {
    console.warn('[snn] loadPositions failed:', e);
  }
}

export function getPosition(name: string) {
  ensureLoaded();
  return cache.get(name) || null;
}

export function setPosition(name: string, x: number, y: number) {
  ensureLoaded();
  cache.set(name, { x, y });
  try {
    localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(cache)));
  } catch (e) {
    console.warn('[snn] savePositions failed:', e);
  }
}
