/**
 * dashboard-panel — Phase-1 placeholder.
 *
 * Phase-1 just proves the panel-switch surface works (R2-검증가능 from D17).
 * Phase-2 (T_viz-MVP-C) replaces the body with a V1 firing-rate timeseries
 * driven by a data-fetcher polling the neuronface monitor endpoint.
 */

let _root = null;

export const dashboardPanel = {
  id: 'dashboard',
  label: 'Dashboard',

  mount(host) {
    if (!_root) {
      _root = document.createElement('div');
      _root.className = 'tviz-dashboard';
      _root.innerHTML = `
        <div class="tviz-dashboard-header">T_viz · Dashboard</div>
        <div class="tviz-dashboard-body">
          <p class="tviz-placeholder">No data sources connected.</p>
          <p class="tviz-placeholder">Phase-1 placeholder — timeseries lands in T_viz-MVP-C.</p>
          <p class="tviz-placeholder">Mounted at <span data-tviz-ts></span>.</p>
        </div>
      `;
      host.appendChild(_root);
    }
    _root.style.display = '';
    const tsEl = _root.querySelector('[data-tviz-ts]');
    if (tsEl) tsEl.textContent = new Date().toISOString();
  },

  unmount() {
    if (_root) _root.style.display = 'none';
  },
};
