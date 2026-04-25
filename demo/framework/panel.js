/**
 * T_viz Panel — F2-단순 primitive (D15).
 *
 * @typedef {Object} Panel
 * @property {string} id
 *   Stable identifier; used in PanelShell.activate(id) and as data-panel-id.
 * @property {string} label
 *   Tab text shown to the user.
 * @property {(host: HTMLElement) => Promise<void> | void} mount
 *   Called when this panel becomes active. Receives the shared host element
 *   (panel-container). Idempotent: may be called many times across switches —
 *   panels should cache their first-time setup internally.
 * @property {() => Promise<void> | void} unmount
 *   Called when this panel is leaving active state. Should hide its DOM and
 *   stop expensive work (timers, fetchers). Per D16, scene-panel intentionally
 *   keeps MediaPipe alive across unmount.
 */

export {};
