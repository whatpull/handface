/**
 * GeminiBackend — Google Gemini Flash API (free tier).
 *
 * Free: 15 req/min, 1500 req/day, no credit card needed.
 * Shadow NLM runs alongside for 3D viz activation.
 * Same event interface as CharNLMBackend / ClaudeAPIBackend.
 */

import { NeuralLM } from './nlm.js';

const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const MAX_TOKENS   = 200;

const SYSTEM_PROMPT =
  'You are the brain AI powering the handface neural mesh demo. ' +
  'Respond concisely in the user\'s language (usually Korean). ' +
  'Keep responses under 3 sentences. Be helpful and friendly.';

export class GeminiBackend {
  constructor({ apiKey } = {}) {
    this.apiKey   = apiKey;
    this.history  = [];
    this.handlers = new Set();
    this.busy     = false;

    this.shadow = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.035,
    });

    this.tokenCount = 0;
    this._loadHistory();
  }

  onEvent(fn) { this.handlers.add(fn); return () => this.handlers.delete(fn); }
  emit(ev)    { for (const fn of this.handlers) fn(ev); }

  get stats() {
    return {
      vocabSize:  this.shadow.vocab.size,
      maxVocab:   this.shadow.MAX_VOCAB,
      totalSteps: this.shadow.totalSteps,
      lossEMA:    this.shadow.lossEMA,
      messages:   this.history.length,
      tokenCount: this.tokenCount,
      model:      'gemini-flash',
    };
  }

  get modelState() {
    return {
      h1: this.shadow.lastH1,
      h2: this.shadow.lastH2,
      h3: this.shadow.lastH3,
      probs: this.shadow.lastProbs,
      vocabSize: this.shadow.vocab.size,
      embed: this.shadow.lastX,
    };
  }

  layerWeightAverages() {
    const avg = (mat) => {
      let s = 0, c = 0;
      for (const row of mat) for (let i = 0; i < row.length; i++) {
        s += Math.abs(row[i]); c++;
      }
      return c > 0 ? s / c : 0;
    };
    return [
      avg(this.shadow.W1), avg(this.shadow.W2),
      avg(this.shadow.W3), avg(this.shadow.W4),
    ];
  }

  async send(message) {
    if (this.busy) return;
    this.busy = true;
    try {
      this.history.push({ role: 'user', text: message });

      this.emit({ type: 'training-start', message });
      const stepsBefore = this.shadow.totalSteps;
      this.shadow.trainOnText(message, 8);
      const stepsRun = this.shadow.totalSteps - stepsBefore;
      this.emit({
        type: 'training-end',
        avgLoss: this.shadow.lossEMA ?? 4,
        stepsRun,
        totalSteps: this.shadow.totalSteps,
      });

      const response = await this._callGemini();

      this.shadow.trainOnText(response, 4);
      this.history.push({ role: 'ai', text: response });
      this.emit({ type: 'generate-end', text: response });
      this.emit({ type: 'state', stats: this.stats });

      this._saveHistory();
      return response;
    } catch (err) {
      const errMsg = `API Error: ${err.message}`;
      this.history.push({ role: 'ai', text: errMsg });
      this.emit({ type: 'generate-end', text: errMsg });
      return errMsg;
    } finally {
      this.busy = false;
    }
  }

  async _callGemini() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${this.apiKey}`;

    // Build contents array (Gemini format: alternating user/model roles)
    const contents = [];

    // System instruction as first user turn
    contents.push({ role: 'user', parts: [{ text: SYSTEM_PROMPT }] });
    contents.push({ role: 'model', parts: [{ text: 'Understood.' }] });

    // Conversation history (last 10 turns)
    const recent = this.history.slice(-10);
    for (const m of recent) {
      contents.push({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      });
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: MAX_TOKENS,
          temperature: 0.8,
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${res.status} — ${body.slice(0, 200)}`);
    }

    const data = await res.json();
    if (data.usageMetadata) {
      this.tokenCount += (data.usageMetadata.promptTokenCount || 0)
                       + (data.usageMetadata.candidatesTokenCount || 0);
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '...';
    return text;
  }

  async testConnection() {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${this.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
          generationConfig: { maxOutputTokens: 5 },
        }),
      });
      if (res.ok) return { ok: true };
      const body = await res.text();
      return { ok: false, error: `${res.status}: ${body.slice(0, 150)}` };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  reset() {
    this.shadow = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.035,
    });
    this.history.length = 0;
    this.tokenCount = 0;
    try { localStorage.removeItem('handface-gemini-history'); } catch {}
    this.emit({ type: 'state', stats: this.stats });
  }

  _saveHistory() {
    try {
      localStorage.setItem('handface-gemini-history', JSON.stringify({
        history: this.history.slice(-40),
        tokenCount: this.tokenCount,
      }));
    } catch {}
  }

  _loadHistory() {
    try {
      const raw = localStorage.getItem('handface-gemini-history');
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.history)    this.history    = d.history;
      if (d.tokenCount) this.tokenCount = d.tokenCount;
    } catch {}
  }
}
