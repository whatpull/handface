/**
 * HuggingFaceBackend — SmolLM2 (browser-local) + RAG memory + shadow NLM.
 *
 * · SmolLM2-135M-Instruct: ~80MB 1회 다운로드 후 브라우저 캐시, 완전 무료
 * · RAG memory: 유저가 가르친 내용을 기억해 프롬프트에 주입 ("가짜 학습"이지만 효과는 진짜)
 * · Shadow NLM: 3D viz 구동 (실제 backprop 학습)
 * · API 키 불필요, 오프라인 가능 (캐시 후)
 */

import { NeuralLM } from './nlm.js';

const STORAGE_KEY = 'handface-hf-v1';

// ─────────────────────────────────────────
// RAG Memory — 유저 가르침을 저장하고 검색
// ─────────────────────────────────────────
class RAGMemory {
  constructor() {
    this.entries = []; // { text, timestamp }
  }

  add(text) {
    if (!text || text.length < 2) return;
    this.entries.push({ text, ts: Date.now() });
    if (this.entries.length > 500) this.entries.shift();
  }

  search(query, topK = 5) {
    if (this.entries.length === 0 || !query) return [];
    const qGrams = this._bigrams(query);
    if (qGrams.size === 0) return this.entries.slice(-topK);

    const scored = this.entries.map(e => {
      const eGrams = this._bigrams(e.text);
      let shared = 0;
      for (const g of qGrams) if (eGrams.has(g)) shared++;
      const score = shared / Math.max(1, Math.sqrt(qGrams.size * eGrams.size));
      return { text: e.text, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK).filter(e => e.score > 0.05);
  }

  _bigrams(text) {
    const s = new Set();
    for (let i = 0; i < text.length - 1; i++) s.add(text[i] + text[i + 1]);
    return s;
  }

  get size() { return this.entries.length; }
  serialize() { return this.entries; }
  loadFrom(data) { if (Array.isArray(data)) this.entries = data; }
}

// ─────────────────────────────────────────
// HuggingFaceBackend
// ─────────────────────────────────────────
export class HuggingFaceBackend {
  constructor() {
    this.worker    = null;
    this.loaded    = false;
    this.memory    = new RAGMemory();
    this.shadow    = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.025, clipGrad: 1.0,
    });
    this.history     = [];
    this.handlers    = new Set();
    this.busy        = false;
    this.loadedModel = '';
    this._pendingResolve = null;
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
      model:      this.loadedModel || 'loading...',
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

  // ─── Worker-based model loading (off main thread) ──────
  _initWorker() {
    if (this.worker) return;
    this.worker = new Worker(new URL('./hf-worker.js', import.meta.url), { type: 'module' });
    this.worker.onmessage = (e) => this._onWorkerMessage(e.data);
  }

  _onWorkerMessage(msg) {
    if (msg.type === 'load-progress') {
      this.emit({ type: 'loading-progress', progress: msg.progress, file: msg.file });
    } else if (msg.type === 'load-done') {
      this.loadedModel = msg.modelId;
      this.loaded = true;
      this.emit({ type: 'loading-done' });
      if (this._pendingResolve) { this._pendingResolve(); this._pendingResolve = null; }
    } else if (msg.type === 'load-error') {
      if (this._pendingResolve) { this._pendingResolve(new Error(msg.error)); this._pendingResolve = null; }
    } else if (msg.type === 'generate-done') {
      if (this._pendingResolve) { this._pendingResolve(msg.text); this._pendingResolve = null; }
    } else if (msg.type === 'generate-error') {
      if (this._pendingResolve) { this._pendingResolve(new Error(msg.error)); this._pendingResolve = null; }
    }
  }

  async _ensureModel() {
    if (this.loaded) return;
    this._initWorker();
    this.emit({ type: 'loading', message: 'Loading model in background...' });
    return new Promise((resolve, reject) => {
      this._pendingResolve = (err) => err instanceof Error ? reject(err) : resolve();
      this.worker.postMessage({ type: 'load' });
    });
  }

  async _generateInWorker(prompt) {
    return new Promise((resolve, reject) => {
      this._pendingResolve = (result) => result instanceof Error ? reject(result) : resolve(result);
      this.worker.postMessage({ type: 'generate', prompt });
    });
  }

  // ─── Main entry ───────────────────────────────
  async send(message) {
    if (this.busy) return;
    this.busy = true;
    try {
      // Lazy-load model on first send
      await this._ensureModel();

      this.history.push({ role: 'user', text: message });
      this.memory.add(message);

      // Shadow NLM: train (for viz)
      this.emit({ type: 'training-start', message });
      const stepsBefore = this.shadow.totalSteps;
      this.shadow.trainOnText(message, 8);
      this.emit({
        type: 'training-end',
        avgLoss: this.shadow.lossEMA ?? 4,
        stepsRun: this.shadow.totalSteps - stepsBefore,
        totalSteps: this.shadow.totalSteps,
      });

      // RAG: retrieve relevant memories
      const memories = this.memory.search(message, 5);

      // Build prompt + generate in Web Worker (main thread stays free for 3D)
      const prompt = this._buildPrompt(memories);
      const response = await this._generateInWorker(prompt) || '(thinking...)';

      // Store response in memory too
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

  _buildPrompt(memories) {
    // Text-completion format that works with any model (instruct or base)
    let prompt = 'You are a helpful brain AI. Respond concisely in the user\'s language.\n';
    if (memories.length > 0) {
      prompt += 'You remember: ' + memories.map(m => m.text).join('; ') + '\n';
    }
    prompt += '\n';
    // Add recent conversation
    const recent = this.history.slice(-6);
    for (const m of recent) {
      prompt += (m.role === 'user' ? 'User' : 'AI') + ': ' + m.text + '\n';
    }
    prompt += 'AI:';
    return prompt;
  }

  async testConnection() {
    try {
      await this._ensureModel();
      return { ok: this.loaded };
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
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    this.emit({ type: 'state', stats: this.stats });
  }

  _saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        history: this.history.slice(-40),
        memory:  this.memory.serialize(),
      }));
    } catch {}
  }

  _loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.history) this.history = d.history;
      if (d.memory)  this.memory.loadFrom(d.memory);
    } catch {}
  }
}
