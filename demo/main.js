import { PanelShell } from './framework/panel-shell.js';
import { scenePanel } from './panels/scene-panel.js';
import { dashboardPanel } from './panels/dashboard-panel.js';

const tabsEl = document.getElementById('panel-tabs');
const hostEl = document.getElementById('panel-container');

if (!tabsEl || !hostEl) {
  throw new Error('[tviz] #panel-tabs or #panel-container missing in index.html');
}

const shell = new PanelShell({ tabsEl, hostEl });
shell.register(scenePanel);
shell.register(dashboardPanel);

shell.activate('scene').catch((err) => {
  console.error('[tviz] initial activate(scene) failed:', err);
});

window.__tvizShell = shell;
