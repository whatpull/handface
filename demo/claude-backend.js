/**
 * ClaudeAPIBackend — Anthropic Claude API를 브라우저에서 직접 호출.
 *
 * API 키는 localStorage에만 저장되며 anthropic.com으로만 HTTPS 전송됩니다.
 * Shadow NLM (기존 CharNLM)을 병행해 3D viz 활성화를 구동합니다.
 *
 * 같은 이벤트 인터페이스(onEvent, send, stats)를 구현하므로
 * scene.js에서 CharNLMBackend와 드롭인 교체 가능합니다.
 */

import { NeuralLM } from './nlm.js';

const API_URL     = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';
const MAX_TOKENS  = 200;

const SYSTEM_PROMPT =
  'You are the brain AI powering the handface neural mesh demo. ' +
  'Respond concisely in the user\'s language (usually Korean). ' +
  'Keep responses under 3 sentences. Be helpful and friendly.';

export class ClaudeAPIBackend {
  constructor({ apiKey, model = 'claude-haiku-4-5-20251001' } = {}) {
    this.apiKey  = apiKey;
    this.model   = model;
    this.history = [];      // { role: 'user'|'ai', text }
    this.handlers = new Set();
    this.busy     = false;

    // Shadow NLM — viz 구동 전용 (응답 생성에는 관여 안 함)
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
      model:      this.model,
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
      avg(this.shadow.W1),
      avg(this.shadow.W2),
      avg(this.shadow.W3),
      avg(this.shadow.W4),
    ];
  }

  // ─── Main entry ───────────────────────────────
  async send(message) {
    if (this.busy) return;
    this.busy = true;
    try {
      this.history.push({ role: 'user', text: message });

      // Shadow NLM: train on user message (drives viz)
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

      // Call Claude API
      const apiMessages = this._buildMessages();
      const response = await this._callClaude(apiMessages);

      // Shadow NLM: also train on Claude's response (viz evolves with conversation)
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

  async _callClaude(messages) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': API_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${res.status} — ${body.slice(0, 200)}`);
    }

    const data = await res.json();
    // Track token usage
    if (data.usage) {
      this.tokenCount += (data.usage.input_tokens || 0) + (data.usage.output_tokens || 0);
    }
    const text = data.content?.[0]?.text || '...';
    return text;
  }

  _buildMessages() {
    // Send last 10 turns as context (to keep token cost down)
    const recent = this.history.slice(-10);
    return recent.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));
  }

  // ─── API key test ─────────────────────────────
  async testConnection() {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': API_VERSION,
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'hi' }],
        }),
      });
      if (res.ok) return { ok: true };
      const body = await res.text();
      return { ok: false, error: `${res.status}: ${body.slice(0, 150)}` };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  // ─── Persistence ──────────────────────────────
  reset() {
    this.shadow = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.035,
    });
    this.history.length = 0;
    this.tokenCount = 0;
    try { localStorage.removeItem('handface-claude-history'); } catch {}
    this.emit({ type: 'state', stats: this.stats });
  }

  _saveHistory() {
    try {
      localStorage.setItem('handface-claude-history', JSON.stringify({
        history: this.history.slice(-40),
        tokenCount: this.tokenCount,
      }));
    } catch {}
  }

  _loadHistory() {
    try {
      const raw = localStorage.getItem('handface-claude-history');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.history)    this.history    = data.history;
      if (data.tokenCount) this.tokenCount = data.tokenCount;
    } catch {}
  }
}
