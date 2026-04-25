/**
 * Dashboard panel — V1 firing rate timeseries (T_viz-MVP-Phase2).
 *
 * Lifecycle:
 *   mount(container):
 *     1. Build DOM (header + canvas + status footer)
 *     2. GET /networks to auto-pick network id (per user decision)
 *     3. If network found: create DataFetcher + subscribe + start polling
 *     4. If no network: show "No network on server" message, no polling
 *   unmount():
 *     - fetcher.stop() and unsubscribe
 *     - clear container
 *     - drop ring buffer
 *
 * Chart specs (per user decision):
 *   - Polling: 2000 ms
 *   - Window: last 60 seconds rolling (≈ 30 points at 2s interval)
 *   - Y-axis: V1 region rate only (response.by_region.V1)
 *   - Plain Canvas, dark theme aligned with handface
 *
 * Auth / endpoint: inherits from handface NeuronFace Settings via DataFetcher
 * (option 라 + α + δ). Settings change requires page reload.
 *
 * Error states surfaced in footer:
 *   - "Server unreachable"
 *   - "Auth failed (check NeuronFace Settings)"
 *   - "Network not found: <id>"
 *   - "V1 not in by_region"
 *   - generic "Error: <msg>"
 */

import { DataFetcher } from '../framework/data-fetcher.js';
import { loadNeuronFaceSettings } from '../neuronface-backend.js';

const POLL_INTERVAL_MS = 2000;
const WINDOW_MS = 60_000;            // 60 seconds
const MAX_POINTS = Math.ceil(WINDOW_MS / POLL_INTERVAL_MS) + 5;
const REGION_KEY = 'V1';
const CHART_HEIGHT_PX = 300;
const LINE_COLOR = '#7DD3FC';
const GRID_COLOR = 'rgba(255, 255, 255, 0.08)';
const LABEL_COLOR = 'rgba(255, 255, 255, 0.55)';

export const dashboardPanel = {
  id: 'dashboard',
  label: '📊 Dashboard',

  _container: null,
  _wrap: null,
  _canvas: null,
  _ctx: null,
  _headerValue: null,
  _headerUpdated: null,
  _footer: null,
  _fetcher: null,
  _unsubscribe: null,
  _points: [],
  _animFrame: null,
  _resizeListener: null,

  async mount(container) {
    this._container = container;
    this._points = [];

    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding: 24px; color: #ddd; font-family: monospace;';
    this._wrap = wrap;

    const headerLine = document.createElement('div');
    headerLine.style.cssText = 'display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;';
    const title = document.createElement('div');
    title.textContent = 'V1 firing rate (Hz)';
    title.style.cssText = 'font-size: 14px; letter-spacing: 0.05em; color: #ccc;';
    const valueWrap = document.createElement('div');
    valueWrap.style.cssText = 'display: flex; gap: 16px; font-size: 12px;';
    this._headerValue = document.createElement('span');
    this._headerValue.textContent = '— Hz';
    this._headerValue.style.cssText = 'color: ' + LINE_COLOR + ';';
    this._headerUpdated = document.createElement('span');
    this._headerUpdated.textContent = 'no data';
    this._headerUpdated.style.cssText = 'color: ' + LABEL_COLOR + ';';
    valueWrap.appendChild(this._headerValue);
    valueWrap.appendChild(this._headerUpdated);
    headerLine.appendChild(title);
    headerLine.appendChild(valueWrap);
    wrap.appendChild(headerLine);

    this._canvas = document.createElement('canvas');
    this._canvas.style.cssText = 'width: 100%; display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px;';
    wrap.appendChild(this._canvas);

    this._footer = document.createElement('div');
    this._footer.style.cssText = 'margin-top: 8px; font-size: 12px; color: ' + LABEL_COLOR + '; min-height: 1em;';
    this._footer.textContent = 'Connecting...';
    wrap.appendChild(this._footer);

    container.appendChild(wrap);

    this._resizeCanvas();
    this._resizeListener = () => this._resizeCanvas();
    window.addEventListener('resize', this._resizeListener);

    let networkId;
    try {
      networkId = await this._discoverNetworkId();
    } catch (err) {
      this._setFooter(this._friendlyError(err));
      return;
    }

    if (!networkId) {
      this._setFooter('No network on server. Open SCENE → click START to initialize, then return to DASHBOARD.');
      return;
    }

    this._fetcher = new DataFetcher({
      path: `/networks/${networkId}/monitor/rates`,
      intervalMs: POLL_INTERVAL_MS,
    });
    this._unsubscribe = this._fetcher.subscribe((event) => this._onEvent(event));
    this._fetcher.start();
    this._setFooter('Polling /networks/' + networkId.slice(0, 8) + '…/monitor/rates @ ' + POLL_INTERVAL_MS + 'ms');
    this._scheduleDraw();
  },

  unmount() {
    if (this._fetcher) {
      this._fetcher.stop();
      this._fetcher = null;
    }
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._animFrame !== null) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
    if (this._resizeListener) {
      window.removeEventListener('resize', this._resizeListener);
      this._resizeListener = null;
    }
    if (this._wrap && this._wrap.parentNode) {
      this._wrap.parentNode.removeChild(this._wrap);
    }
    this._points = [];
    this._container = null;
    this._wrap = null;
    this._canvas = null;
    this._ctx = null;
    this._headerValue = null;
    this._headerUpdated = null;
    this._footer = null;
  },

  // --- internal ---

  async _discoverNetworkId() {
    const settings = loadNeuronFaceSettings();
    const endpoint = (settings.endpoint || '').replace(/\/$/, '');
    const headers = { 'Content-Type': 'application/json' };
    if (settings.apiKey) {
      headers['Authorization'] = `Bearer ${settings.apiKey}`;
    }
    const response = await fetch(`${endpoint}/networks`, { method: 'GET', headers });
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`HTTP ${response.status}: non-JSON response`);
    }
    if (!response.ok) {
      const detail = (data && data.detail) || `HTTP ${response.status}`;
      throw new Error(detail);
    }
    const ids = (data && Array.isArray(data.ids)) ? data.ids : [];
    return ids[0] || null;
  },

  _onEvent(event) {
    if (event.type === 'error') {
      this._setFooter(this._friendlyError(event.error));
      return;
    }
    const body = event.data;
    const v1 = (body && body.by_region) ? body.by_region[REGION_KEY] : undefined;
    if (typeof v1 !== 'number') {
      this._setFooter(`V1 not in by_region (regions: ${
        body && body.by_region ? Object.keys(body.by_region).join(', ') || '(none)' : 'n/a'
      })`);
      return;
    }
    this._points.push({ t: event.receivedAt, v: v1 });
    const cutoff = event.receivedAt - WINDOW_MS;
    while (this._points.length > 0 && this._points[0].t < cutoff) {
      this._points.shift();
    }
    if (this._points.length > MAX_POINTS) {
      this._points.splice(0, this._points.length - MAX_POINTS);
    }
    this._headerValue.textContent = v1.toFixed(3) + ' Hz';
    this._headerUpdated.textContent = 'updated ' + new Date(event.receivedAt).toLocaleTimeString();
    this._setFooter('');
    this._scheduleDraw();
  },

  _scheduleDraw() {
    if (this._animFrame !== null) return;
    this._animFrame = requestAnimationFrame(() => {
      this._animFrame = null;
      this._draw();
    });
  },

  _resizeCanvas() {
    if (!this._canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = this._canvas.clientWidth || (this._container && this._container.clientWidth) || 600;
    const cssHeight = CHART_HEIGHT_PX;
    this._canvas.style.height = cssHeight + 'px';
    this._canvas.width = Math.round(cssWidth * dpr);
    this._canvas.height = Math.round(cssHeight * dpr);
    this._ctx = this._canvas.getContext('2d');
    this._ctx.scale(dpr, dpr);
    this._scheduleDraw();
  },

  _draw() {
    if (!this._canvas || !this._ctx) return;
    const ctx = this._ctx;
    const dpr = window.devicePixelRatio || 1;
    const w = this._canvas.width / dpr;
    const h = this._canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);

    const M = { top: 16, right: 16, bottom: 24, left: 48 };
    const innerW = w - M.left - M.right;
    const innerH = h - M.top - M.bottom;

    let yMax = 1.0;
    for (const p of this._points) {
      if (p.v > yMax / 1.2) yMax = p.v * 1.2;
    }

    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';
    ctx.fillStyle = LABEL_COLOR;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 4; i++) {
      const yVal = (yMax / 4) * (4 - i);
      const yPx = M.top + (innerH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(M.left, yPx);
      ctx.lineTo(M.left + innerW, yPx);
      ctx.stroke();
      ctx.fillText(yVal.toFixed(1), M.left - 6, yPx);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i <= 6; i++) {
      const xPx = M.left + (innerW / 6) * i;
      const secondsAgo = (WINDOW_MS / 1000) * (1 - i / 6);
      const label = secondsAgo === 0 ? 'now' : `-${secondsAgo.toFixed(0)}s`;
      ctx.fillText(label, xPx, M.top + innerH + 4);
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(M.left, M.top);
    ctx.lineTo(M.left, M.top + innerH);
    ctx.lineTo(M.left + innerW, M.top + innerH);
    ctx.stroke();

    if (this._points.length === 0) return;

    const tNow = Date.now();
    const tStart = tNow - WINDOW_MS;
    const xOf = (t) => M.left + ((t - tStart) / WINDOW_MS) * innerW;
    const yOf = (v) => M.top + (1 - v / yMax) * innerH;

    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const p of this._points) {
      const x = xOf(p.t);
      const y = yOf(p.v);
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.fillStyle = LINE_COLOR;
    for (const p of this._points) {
      const x = xOf(p.t);
      const y = yOf(p.v);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  _setFooter(msg) {
    if (this._footer) {
      this._footer.textContent = msg;
    }
  },

  _friendlyError(err) {
    const msg = err && err.message ? err.message : String(err);
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
      return 'Server unreachable (check NeuronFace Settings endpoint, ensure server is running)';
    }
    if (msg.includes('401')) {
      return 'Auth failed (check NeuronFace Settings API Key)';
    }
    if (msg.includes('404')) {
      return 'Network not found on server';
    }
    return 'Error: ' + msg;
  },
};
