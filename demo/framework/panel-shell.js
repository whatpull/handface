/**
 * PanelShell — P2-단일 (one panel at a time) panel manager.
 *
 * Renders tab buttons into `tabsEl` and asks panels to mount/unmount against
 * `hostEl`. Re-entrancy is blocked while a switch is in flight so a rapid
 * tab-double-click cannot interleave a stale unmount with a fresh mount.
 *
 * Per D16 (P3-기존 진입점): the shell lives inside the existing handface entry,
 * not at a separate route.
 */
export class PanelShell {
  constructor({ tabsEl, hostEl }) {
    if (!tabsEl) throw new Error('[PanelShell] tabsEl is required');
    if (!hostEl) throw new Error('[PanelShell] hostEl is required');
    this._tabsEl = tabsEl;
    this._hostEl = hostEl;
    this._panels = new Map();
    this._activeId = null;
    this._switching = false;
  }

  register(panel) {
    if (!panel || !panel.id) {
      throw new Error('[PanelShell] panel must have an id');
    }
    if (this._panels.has(panel.id)) {
      throw new Error(`[PanelShell] duplicate panel id: ${panel.id}`);
    }
    this._panels.set(panel.id, panel);
    this._renderTabs();
  }

  async activate(id) {
    if (!this._panels.has(id)) {
      throw new Error(`[PanelShell] unknown panel: ${id}`);
    }
    if (this._switching) return;
    if (this._activeId === id) return;
    this._switching = true;
    try {
      if (this._activeId) {
        const prev = this._panels.get(this._activeId);
        await prev.unmount();
      }
      const next = this._panels.get(id);
      await next.mount(this._hostEl);
      this._activeId = id;
      this._renderTabs();
    } finally {
      this._switching = false;
    }
  }

  get activeId() {
    return this._activeId;
  }

  _renderTabs() {
    this._tabsEl.innerHTML = '';
    for (const [id, panel] of this._panels) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tviz-tab' + (id === this._activeId ? ' tviz-tab-active' : '');
      btn.textContent = panel.label || id;
      btn.dataset.panelId = id;
      btn.addEventListener('click', () => {
        this.activate(id).catch((err) => {
          console.error(`[tviz] activate(${id}) failed:`, err);
        });
      });
      this._tabsEl.appendChild(btn);
    }
  }
}
