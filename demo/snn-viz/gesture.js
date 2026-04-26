/**
 * Gesture layer — 4 아이콘 (☝️ 🖐 👍 ✌️) highlight.
 * - mediapipe single-path (1단계): control.on(name) → highlightGesture (.active 800ms)
 * - button multi-path (2단계 D29): click → toggleGesture (.selected toggle, persistent)
 * 두 path 공존 (d-3 정합).
 */

// T5.2 2단계 (D29): disabled flag = 회로 INPUT 부재 GESTURE (M14 정합).
// thumbsup → in_thumbsup, victory → in_victory mapping 이 server-side 에 박혀있으나
// 회로 wiring (network.py:284) 의 6 INPUT 에 부재 → button click 차단 + opacity 약화.
const GESTURES = [
  { name: 'pointing', icon: '☝️', label: 'Point', disabled: false },
  { name: 'openpalm', icon: '🖐',  label: 'Open',  disabled: false },
  { name: 'thumbsup', icon: '👍', label: 'Thumb', disabled: true  },
  { name: 'victory',  icon: '✌️', label: 'Vict.', disabled: true  },
];

let icons = null;
const activeTimers = new Map();
const selectedGestures = new Set();
const toggleHandlers = [];

export function mountGesture(layerBody) {
  const grid = document.createElement('div');
  grid.className = 'snn-gesture-icons';

  icons = {};
  for (const g of GESTURES) {
    const cell = document.createElement('div');
    cell.className = 'snn-gesture-icon';
    if (g.disabled) cell.classList.add('disabled');
    cell.dataset.gesture = g.name;
    cell.innerHTML = `<div class="snn-gesture-icon-emoji">${g.icon}</div><div class="snn-gesture-icon-label">${g.label}</div>`;
    cell.addEventListener('click', () => toggleGesture(g.name));
    grid.appendChild(cell);
    icons[g.name] = cell;
  }

  layerBody.appendChild(grid);
}

// mediapipe single-path (1단계 정합) — .active 800ms transient highlight
export function highlightGesture(name) {
  if (!icons || !icons[name]) return;
  icons[name].classList.add('active');
  if (activeTimers.has(name)) clearTimeout(activeTimers.get(name));
  activeTimers.set(name, setTimeout(() => {
    if (icons[name]) icons[name].classList.remove('active');
    activeTimers.delete(name);
  }, 800));
}

// button multi-path (2단계 D29) — .selected persistent toggle
export function toggleGesture(name) {
  const gesture = GESTURES.find(g => g.name === name);
  if (!gesture || gesture.disabled) return false;
  if (!icons || !icons[name]) return false;

  if (selectedGestures.has(name)) {
    selectedGestures.delete(name);
    icons[name].classList.remove('selected');
  } else {
    selectedGestures.add(name);
    icons[name].classList.add('selected');
  }
  for (const handler of toggleHandlers) {
    handler(Array.from(selectedGestures));
  }
  return true;
}

export function getSelectedGestures() {
  return Array.from(selectedGestures);
}

export function onGestureToggle(handler) {
  if (typeof handler === 'function') {
    toggleHandlers.push(handler);
  }
}
