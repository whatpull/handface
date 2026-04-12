/**
 * WebLLMBackend — Qwen2.5-1.5B via WebGPU (MLC AI).
 *
 * · GPU-accelerated inference in the browser (~10-15 tok/s)
 * · Models hosted on MLC CDN — no auth, no gating issues
 * · RAG memory for "learning" effect
 * · Shadow NLM for 3D viz activation
 * · Free, no API key, Korean + English
 */

import { NeuralLM } from './nlm.js';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const MODEL_ID = 'Qwen2.5-1.5B-Instruct-q4f32_1-MLC';
const STORAGE_KEY = 'handface-webllm-v1';

const SYSTEM_PROMPT =
  'You are a brain AI that learns from the user. ' +
  'Respond concisely in the same language the user uses (Korean or English). ' +
  'Keep responses under 3 sentences. Be helpful and friendly.';

// ─── RAG Memory ─────────────────────────────────
class RAGMemory {
  constructor() { this.entries = []; }

  add(text) {
    if (!text || text.length < 2) return;
    this.entries.push({ text, ts: Date.now() });
    if (this.entries.length > 500) this.entries.shift();
  }

  search(query, topK = 5) {
    if (this.entries.length === 0 || !query) return [];
    const qG = this._bigrams(query);
    if (qG.size === 0) return this.entries.slice(-topK);
    const scored = this.entries.map(e => {
      const eG = this._bigrams(e.text);
      let shared = 0;
      for (const g of qG) if (eG.has(g)) shared++;
      return { text: e.text, score: shared / Math.max(1, Math.sqrt(qG.size * eG.size)) };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK).filter(e => e.score > 0.05);
  }

  _bigrams(t) {
    const s = new Set();
    for (let i = 0; i < t.length - 1; i++) s.add(t[i] + t[i + 1]);
    return s;
  }

  get size() { return this.entries.length; }
  serialize() { return this.entries; }
  loadFrom(d) { if (Array.isArray(d)) this.entries = d; }
}

// ─── WebLLMBackend ──────────────────────────────
export class WebLLMBackend {
  constructor() {
    this.engine   = null;
    this.loaded   = false;
    this.memory   = new RAGMemory();
    this.shadow   = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.025, clipGrad: 1.0,
    });
    this.history   = [];
    this.handlers  = new Set();
    this.busy      = false;
    this.tokenCount = 0;
    this._loadHistory();
  }

  onEvent(fn) { this.handlers.add(fn); return () => this.handlers.delete(fn); }
  emit(ev)    { for (const fn of this.handlers) fn(ev); }
  get model() { return this.shadow; }

  get stats() {
    return {
      vocabSize:  this.shadow.vocab.size,
      maxVocab:   this.shadow.MAX_VOCAB,
      totalSteps: this.shadow.totalSteps,
      lossEMA:    this.shadow.lossEMA,
      messages:   this.history.length,
      memories:   this.memory.size,
      tokenCount: this.tokenCount,
      model:      'Qwen2.5-1.5B',
    };
  }

  get modelState() {
    return {
      h1: this.shadow.lastH1, h2: this.shadow.lastH2,
      h3: this.shadow.lastH3, probs: this.shadow.lastProbs,
      vocabSize: this.shadow.vocab.size, embed: this.shadow.lastX,
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
    return [avg(this.shadow.W1), avg(this.shadow.W2),
            avg(this.shadow.W3), avg(this.shadow.W4)];
  }

  // ─── Model Loading ────────────────────────────
  async _ensureModel() {
    if (this.loaded) return;
    this.emit({ type: 'loading', message: `Loading ${MODEL_ID} (~800MB, first time only)...` });

    this.engine = await CreateMLCEngine(MODEL_ID, {
      initProgressCallback: (report) => {
        const pct = Math.round((report.progress || 0) * 100);
        this.emit({ type: 'loading-progress', progress: pct, file: report.text || '' });
      },
    });

    this.loaded = true;
    this.emit({ type: 'loading-done' });
  }

  // ─── Main entry ───────────────────────────────
  async send(message) {
    if (this.busy) return;
    this.busy = true;
    try {
      await this._ensureModel();

      this.history.push({ role: 'user', text: message });
      this.memory.add(message);

      // Shadow NLM: train for viz (yield to let CSS animations keep running)
      this.emit({ type: 'training-start', message });
      const stepsBefore = this.shadow.totalSteps;
      await new Promise(r => setTimeout(r, 0));   // yield before CPU work
      this.shadow.trainOnText(message, 6);
      await new Promise(r => setTimeout(r, 0));   // yield after CPU work
      this.emit({
        type: 'training-end',
        avgLoss: this.shadow.lossEMA ?? 4,
        stepsRun: this.shadow.totalSteps - stepsBefore,
        totalSteps: this.shadow.totalSteps,
      });

      // RAG: retrieve memories
      const memories = this.memory.search(message, 5);

      // Build messages for Qwen2.5
      const systemContent = this._buildSystem(memories);
      const chatMessages = [
        { role: 'system', content: systemContent },
        ...this.history.slice(-8).map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      ];

      // Generate with streaming (each token triggers a viz wave)
      const stream = await this.engine.chat.completions.create({
        messages: chatMessages,
        max_tokens: 200,
        temperature: 0.7,
        stream: true,
      });

      let response = '';
      for await (const chunk of stream) {
        const delta = chunk.choices?.[0]?.delta?.content || '';
        if (delta) {
          response += delta;
          this.emit({ type: 'generate-token', token: delta, partial: response });
        }
        if (chunk.usage) {
          this.tokenCount += (chunk.usage.prompt_tokens || 0) + (chunk.usage.completion_tokens || 0);
        }
      }
      if (!response) response = '...';

      this.memory.add(response);
      this.shadow.trainOnText(response, 4);

      this.history.push({ role: 'ai', text: response });
      this.emit({ type: 'generate-end', text: response });
      this.emit({ type: 'state', stats: this.stats });
      this._saveHistory();
      return response;
    } catch (err) {
      const errMsg = `Error: ${err.message}`;
      this.history.push({ role: 'ai', text: errMsg });
      this.emit({ type: 'generate-end', text: errMsg });
      return errMsg;
    } finally {
      this.busy = false;
    }
  }

  _buildSystem(memories) {
    let s = SYSTEM_PROMPT;
    if (memories.length > 0) {
      s += '\n\nYou remember these things the user told you:\n';
      for (const m of memories) s += `- "${m.text}"\n`;
      s += 'Use these memories to give personalized, relevant responses.';
    }
    return s;
  }

  async testConnection() {
    try {
      await this._ensureModel();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  reset() {
    this.shadow = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.025, clipGrad: 1.0,
    });
    this.memory = new RAGMemory();
    this.history.length = 0;
    this.tokenCount = 0;
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    this.emit({ type: 'state', stats: this.stats });
  }

  _saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        history: this.history.slice(-40),
        memory:  this.memory.serialize(),
        tokenCount: this.tokenCount,
      }));
    } catch {}
  }

  _loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.history)    this.history    = d.history;
      if (d.memory)     this.memory.loadFrom(d.memory);
      if (d.tokenCount) this.tokenCount = d.tokenCount;
    } catch {}
  }
}
