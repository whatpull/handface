/**
 * SNN viz state — 데이터/뷰 분리의 데이터 영역.
 */
export const state = {
  // 7-layer DOM containers (mount 시 채움)
  containers: {
    camera: null,
    hand: null,
    gesture: null,
    input: null,
    v1: null,
    v2: null,
    out: null,
  },
  // Region dot overlays (panel 밖 sibling, panel stacking context 우회)
  dotOverlays: {
    input: null,
    v1: null,
    v2: null,
    out: null,
  },

  // 회로 데이터 (snapshot)
  neurons: [],
  synapses: [],

  // 노드 위치 (편집 가능, localStorage 저장)
  positions: new Map(),

  // 모드: 'normal' | 'edit'
  mode: 'normal',

  // 손 landmark
  handLandmarks: null,
  handLandmarksAll: null,

  // gesture
  currentGesture: null,
  gestureConfidence: 0,

  // 최근 fire (neuron-firing event 시 갱신)
  lastFire: null,
  // 최근 fire 의 full response (D42, T5.1-1: tooltip / popover 영역에서 rate 등 활용)
  lastFireResponse: null,
};

const POSITIONS_KEY = 'snn-viz-positions';

export function loadPositions() {
  try {
    const raw = localStorage.getItem(POSITIONS_KEY);
    if (!raw) return;
    const obj = JSON.parse(raw);
    state.positions = new Map(Object.entries(obj));
  } catch (e) {
    console.warn('[snn-viz] loadPositions failed:', e);
  }
}

export function savePositions() {
  try {
    const obj = Object.fromEntries(state.positions);
    localStorage.setItem(POSITIONS_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn('[snn-viz] savePositions failed:', e);
  }
}

export function setNodePosition(name, x, y) {
  state.positions.set(name, { x, y });
  savePositions();
}

export function getNodePosition(name) {
  return state.positions.get(name) || null;
}

export function isEditMode() {
  return state.mode === 'edit';
}
