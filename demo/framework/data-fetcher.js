/**
 * Data fetcher — polling primitive for T_viz framework.
 *
 * F2-단순 (D15) second primitive. Generic enough to bind any panel to a
 * polling-driven HTTP source.
 *
 * Usage:
 *   import { DataFetcher } from '../framework/data-fetcher.js';
 *
 *   const fetcher = new DataFetcher({
 *     path: '/networks/{id}/monitor/rates',
 *     intervalMs: 2000,
 *   });
 *
 *   const unsubscribe = fetcher.subscribe((event) => {
 *     // event: {type: 'data', data, receivedAt} | {type: 'error', error, receivedAt}
 *   });
 *
 *   fetcher.start();
 *   // ...
 *   fetcher.stop();
 *   unsubscribe();
 *
 * Authentication (per option 라): reads handface NeuronFace settings from
 * localStorage at construction; uses Bearer header. Reload page to apply
 * Settings changes — same as NeuronFaceBackend (option α).
 *
 * Endpoint override (per option δ): if `endpoint` option is provided, it
 * overrides the localStorage-resolved endpoint. Default = Settings endpoint.
 *
 * @typedef {Object} DataEvent
 * @property {'data'} type
 * @property {*} data        - parsed JSON response body
 * @property {number} receivedAt   - Date.now() at receive
 *
 * @typedef {Object} ErrorEvent
 * @property {'error'} type
 * @property {Error} error
 * @property {number} receivedAt
 *
 * @typedef {(event: DataEvent | ErrorEvent) => void} Listener
 */

import { loadNeuronFaceSettings } from '../neuronface-backend.js';

export class DataFetcher {
  /**
   * @param {Object} opts
   * @param {string} opts.path         - URL path (relative to endpoint, e.g. '/networks/abc/monitor/rates')
   * @param {number} [opts.intervalMs=2000]
   * @param {string} [opts.endpoint]   - override endpoint URL (default = Settings)
   * @param {string} [opts.apiKey]     - override API key (default = Settings)
   */
  constructor(opts) {
    if (!opts || typeof opts.path !== 'string') {
      throw new Error('DataFetcher: opts.path is required');
    }
    this._path = opts.path;
    this._intervalMs = (typeof opts.intervalMs === 'number' && opts.intervalMs > 0)
      ? opts.intervalMs
      : 2000;

    // Resolve credentials at construction time (option α: reload to apply Settings changes).
    const settings = loadNeuronFaceSettings();
    this._endpoint = (opts.endpoint || settings.endpoint || '').replace(/\/$/, '');
    this._apiKey = (opts.apiKey !== undefined) ? opts.apiKey : settings.apiKey;

    /** @type {Set<Listener>} */
    this._listeners = new Set();
    /** @type {number|null} */
    this._timerId = null;
    /** @type {boolean} */
    this._inFlight = false;
  }

  /**
   * @param {Listener} listener
   * @returns {() => void} unsubscribe
   */
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('DataFetcher.subscribe: listener must be a function');
    }
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  /**
   * Start polling. Idempotent — calling start when already running is a no-op.
   */
  start() {
    if (this._timerId !== null) return;
    // Fetch immediately on start (don't wait for first interval).
    this._tick();
    this._timerId = setInterval(() => this._tick(), this._intervalMs);
  }

  /**
   * Stop polling. Idempotent.
   */
  stop() {
    if (this._timerId !== null) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }

  /**
   * Internal: one polling cycle. Skips if previous request still in flight
   * (avoids overlap when server is slow).
   */
  async _tick() {
    if (this._inFlight) return;
    this._inFlight = true;
    try {
      const url = `${this._endpoint}${this._path}`;
      const headers = { 'Content-Type': 'application/json' };
      if (this._apiKey) {
        headers['Authorization'] = `Bearer ${this._apiKey}`;
      }
      const response = await fetch(url, { method: 'GET', headers });
      let data = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        // body wasn't JSON; still surface as error
        throw new Error(`HTTP ${response.status}: non-JSON response`);
      }
      if (!response.ok) {
        const detail = (data && data.detail) || `HTTP ${response.status}`;
        throw new Error(detail);
      }
      this._emit({ type: 'data', data, receivedAt: Date.now() });
    } catch (err) {
      this._emit({
        type: 'error',
        error: err instanceof Error ? err : new Error(String(err)),
        receivedAt: Date.now(),
      });
    } finally {
      this._inFlight = false;
    }
  }

  /**
   * @param {DataEvent | ErrorEvent} event
   */
  _emit(event) {
    for (const listener of this._listeners) {
      try {
        listener(event);
      } catch (err) {
        console.error('[data-fetcher] listener threw:', err);
      }
    }
  }
}
