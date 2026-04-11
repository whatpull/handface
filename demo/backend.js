/**
 * NeuralBackend abstraction layer.
 *
 * The viz/UI talks only to this interface — never directly to a model.
 * Today: tiny in-browser CharNLM (real backprop, real continual learning).
 * Later: drop in a CloudLLMBackend / WebLLMBackend with the same surface.
 *
 * Event types emitted via onEvent(handler):
 *   { type: 'training-start', message }
 *   { type: 'training-step',  step, loss }
 *   { type: 'training-end',   avgLoss, totalSteps }
 *   { type: 'generate-token', token, layerActivations }
 *   { type: 'generate-end',   text }
 *   { type: 'state',          stats }
 */

import { NeuralLM } from './nlm.js';

const STORAGE_KEY = 'handface-nlm-v1';

export class CharNLMBackend {
  constructor() {
    this.model = new NeuralLM({
      maxVocab: 220, contextLen: 6, embedDim: 16,
      h1: 96, h2: 96, h3: 64, lr: 0.04,
    });
    this.history    = [];   // { role: 'user'|'ai', text }
    this.handlers   = new Set();
    this.busy       = false;
    this.autoSaveOn = true;
    this._tryLoad();
  }

  onEvent(fn)  { this.handlers.add(fn);    return () => this.handlers.delete(fn); }
  emit(ev)     { for (const fn of this.handlers) fn(ev); }

  // ─── Stats getters (used by HUD) ───────────────
  get stats() {
    return {
      vocabSize:  this.model.vocab.size,
      maxVocab:   this.model.MAX_VOCAB,
      totalSteps: this.model.totalSteps,
      lossEMA:    this.model.lossEMA,
      messages:   this.history.length,
    };
  }

  // ─── Direct model access (for viz mapping) ─────
  get modelState() {
    return {
      h1: this.model.lastH1,
      h2: this.model.lastH2,
      h3: this.model.lastH3,
      probs: this.model.lastProbs,
      vocabSize: this.model.vocab.size,
      embed: this.model.lastX,
    };
  }

  /** Public layer-weight averages (for HUD bars) */
  layerWeightAverages() {
    const avg = (mat) => {
      let s = 0, c = 0;
      for (const row of mat) for (let i = 0; i < row.length; i++) {
        s += Math.abs(row[i]); c++;
      }
      return c > 0 ? s / c : 0;
    };
    return [
      avg(this.model.W1),
      avg(this.model.W2),
      avg(this.model.W3),
      avg(this.model.W4),
    ];
  }

  // ─── Main entry: user sends a message ─────────
  async send(message) {
    if (this.busy) return;
    this.busy = true;
    try {
      this.history.push({ role: 'user', text: message });
      this.emit({ type: 'training-start', message });

      // Train on the user's message + recent history (sliding window)
      const trainCorpus = this._buildTrainCorpus();
      const stepsBefore = this.model.totalSteps;
      const avgLoss     = this.model.trainOnText(trainCorpus, 4);
      const stepsRun    = this.model.totalSteps - stepsBefore;

      this.emit({
        type: 'training-end',
        avgLoss,
        stepsRun,
        totalSteps: this.model.totalSteps,
      });

      // Yield to the browser so viz can repaint between training and generation
      await new Promise((r) => setTimeout(r, 16));

      // Generate a response, seeded by the user's message
      const seed     = message.length > 0 ? message : ' ';
      const response = this.model.sample(seed, 50, 0.85);
      const cleaned  = response.length > 0 ? response : '...';

      this.history.push({ role: 'ai', text: cleaned });
      this.emit({ type: 'generate-end', text: cleaned });
      this.emit({ type: 'state', stats: this.stats });

      if (this.autoSaveOn) this._trySave();
      return cleaned;
    } finally {
      this.busy = false;
    }
  }

  /** Build the text the model trains on this turn. */
  _buildTrainCorpus() {
    // Use the last N messages (concatenated with separators) so the model
    // gets some chat-like sequencing, not just isolated sentences.
    const N = 8;
    const recent = this.history.slice(-N);
    return recent.map(m => m.text).join('\n') + '\n';
  }

  // ─── Reset / persistence ──────────────────────
  reset() {
    this.model = new NeuralLM({
      maxVocab: 220, contextLen: 6, embedDim: 16,
      h1: 96, h2: 96, h3: 64, lr: 0.04,
    });
    this.history.length = 0;
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    this.emit({ type: 'state', stats: this.stats });
  }

  _trySave() {
    try {
      const blob = JSON.stringify({
        model:   this.model.serialize(),
        history: this.history.slice(-30),
      });
      localStorage.setItem(STORAGE_KEY, blob);
    } catch {
      // Quota exceeded or unavailable — silently ignore
    }
  }

  _tryLoad() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.model)   this.model.loadFrom(data.model);
      if (data.history) this.history = data.history;
    } catch {
      // Corrupt or missing — start fresh
    }
  }
}
