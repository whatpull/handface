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

const STORAGE_KEY = 'handface-nlm-v2';   // bumped: model arch changed (CTX 6→8, H1 96→112)
const REPLAY_CAP  = 300;                 // full user-message history cap

export class CharNLMBackend {
  constructor() {
    this.model = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.035,
    });
    this.history      = [];   // { role: 'user'|'ai', text } — full chat log for UI
    this.userMessages = [];   // replay buffer: ALL user messages, for continual training
    this.handlers     = new Set();
    this.busy         = false;
    this.autoSaveOn   = true;
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
      this.userMessages.push(message);
      if (this.userMessages.length > REPLAY_CAP) this.userMessages.shift();

      this.emit({ type: 'training-start', message });
      const stepsBefore = this.model.totalSteps;
      let totalLoss = 0, lossCount = 0;

      // ── Phase 1: focused training on the new message (heavy) ──
      // Teach the model what the user JUST said.
      const loss1 = this.model.trainOnText(message + '\n', 12);
      if (loss1 > 0) { totalLoss += loss1; lossCount++; }

      // ── Phase 2: replay from full user history (prevents forgetting) ──
      // Randomly sample older messages and retrain on them. Without this the
      // model forgets what you taught it 10 turns ago.
      const poolSize = this.userMessages.length - 1;   // exclude the just-added
      if (poolSize > 0) {
        const replayN = Math.min(15, poolSize);
        for (let i = 0; i < replayN; i++) {
          const idx = Math.floor(Math.random() * poolSize);
          const loss = this.model.trainOnText(this.userMessages[idx] + '\n', 3);
          if (loss > 0) { totalLoss += loss; lossCount++; }
        }
      }

      // ── Phase 3: joint training on random concatenation ──
      // Mix 3 random messages together so the model learns to string patterns
      // across messages, not just memorize isolated ones.
      if (this.userMessages.length >= 3) {
        const joint = [];
        for (let i = 0; i < 3; i++) {
          const idx = Math.floor(Math.random() * this.userMessages.length);
          joint.push(this.userMessages[idx]);
        }
        const loss = this.model.trainOnText(joint.join('\n') + '\n', 2);
        if (loss > 0) { totalLoss += loss; lossCount++; }
      }

      const stepsRun = this.model.totalSteps - stepsBefore;
      const avgLoss  = lossCount > 0 ? totalLoss / lossCount : 0;

      this.emit({
        type: 'training-end',
        avgLoss,
        stepsRun,
        totalSteps: this.model.totalSteps,
      });

      // Yield to the browser so viz can repaint between training and generation
      await new Promise((r) => setTimeout(r, 16));

      // ── Sampling with adaptive temperature ──
      // Untrained model (loss ~4): temp 0.9 (diverse)
      // Well-trained   (loss ~1): temp 0.55 (confident, reveals learned patterns)
      const loss     = this.model.lossEMA ?? 4;
      const temp     = Math.max(0.55, Math.min(0.95, 0.45 + loss * 0.12));
      const seed     = message.length > 0 ? message : ' ';
      const response = this.model.sample(seed, 60, temp);
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

  // ─── Reset / persistence ──────────────────────
  reset() {
    this.model = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.035,
    });
    this.history.length      = 0;
    this.userMessages.length = 0;
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    this.emit({ type: 'state', stats: this.stats });
  }

  _trySave() {
    try {
      const blob = JSON.stringify({
        model:        this.model.serialize(),
        history:      this.history.slice(-40),
        userMessages: this.userMessages,
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
      if (data.model)        this.model.loadFrom(data.model);
      if (data.history)      this.history      = data.history;
      if (data.userMessages) this.userMessages = data.userMessages;
    } catch {
      // Corrupt or missing — start fresh
    }
  }
}
