/**
 * Gesture layer — 4 아이콘 (☝️ 🖐 👍 ✌️) highlight.
 * Source: index.js 가 control.on(name, ...) 4-gesture event 받아 highlightGesture 호출.
 */

const GESTURES = [
  { name: 'pointing', icon: '☝️', label: 'Point' },
  { name: 'openpalm', icon: '🖐',  label: 'Open'  },
  { name: 'thumbsup', icon: '👍', label: 'Thumb' },
  { name: 'victory',  icon: '✌️', label: 'Vict.' },
];

let icons = null;
const activeTimers = new Map();

export function mountGesture(layerBody) {
  const grid = document.createElement('div');
  grid.className = 'snn-gesture-icons';

  icons = {};
  for (const g of GESTURES) {
    const cell = document.createElement('div');
    cell.className = 'snn-gesture-icon';
    cell.dataset.gesture = g.name;
    cell.innerHTML = `<div class="snn-gesture-icon-emoji">${g.icon}</div><div class="snn-gesture-icon-label">${g.label}</div>`;
    grid.appendChild(cell);
    icons[g.name] = cell;
  }

  layerBody.appendChild(grid);
}

export function highlightGesture(name) {
  if (!icons || !icons[name]) return;
  icons[name].classList.add('active');
  if (activeTimers.has(name)) clearTimeout(activeTimers.get(name));
  activeTimers.set(name, setTimeout(() => {
    if (icons[name]) icons[name].classList.remove('active');
    activeTimers.delete(name);
  }, 800));
}
