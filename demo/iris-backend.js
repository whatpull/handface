/**
 * iris-backend.js
 * IRIS FastAPI (HuggingFace Spaces) 백엔드
 * Shadow NLM으로 3D viz 구동 (hf-backend.js 패턴 재사용)
 */

import { NeuralLM } from './nlm.js';

const IRIS_ENDPOINT = 'https://whatpull-iris-assistant.hf.space';

// ── RAG 메모리 (hf-backend.js 패턴 재사용) ─────────────────
class RAGMemory {
  constructor(maxItems = 200) {
    this.items = [];
    this.maxItems = maxItems;
  }

  add(text) {
    this.items.push(text);
    if (this.items.length > this.maxItems)
      this.items.shift();
  }

  search(query, k = 5) {
    const qBigrams = this._bigrams(query.toLowerCase());
    return this.items
      .map(item => ({
        item,
        score: this._similarity(qBigrams, this._bigrams(item.toLowerCase()))
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .filter(x => x.score > 0)
      .map(x => x.item);
  }

  _bigrams(str) {
    const s = new Set();
    for (let i = 0; i < str.length - 1; i++)
      s.add(str.slice(i, i + 2));
    return s;
  }

  _similarity(a, b) {
    let inter = 0;
    for (const g of a) if (b.has(g)) inter++;
    return inter / (Math.sqrt(a.size) * Math.sqrt(b.size) + 1e-9);
  }
}

// ── IRIS 백엔드 메인 클래스 ────────────────────────────────
export class IRISBackend {
  constructor() {
    this._listeners = [];
    this._history  = [];
    this._memory   = new RAGMemory(200);
    this._apiKey   = '';
    this._sessionId = null;

    // Shadow NLM (3D viz 전용) — NeuralLM API 시그니처에 맞춤
    this._shadow = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.025, clipGrad: 1.0,
    });

    this._loadLocal();
  }

  // ── 공통 surface ──────────────────────────────────────────
  onEvent(fn) { this._listeners.push(fn); }

  emit(ev) { this._listeners.forEach(fn => fn(ev)); }

  get stats() {
    return {
      vocabSize:  0,
      totalSteps: this._history.length,
      lossEMA:    0,
      label:      'IRIS',
    };
  }

  get modelState() {
    if (!this._shadow) return {
      embed: [], h1: [], h2: [], h3: [], probs: []
    };
    return {
      embed: this._shadow.lastX     ?? [],
      h1:    this._shadow.lastH1    ?? [],
      h2:    this._shadow.lastH2    ?? [],
      h3:    this._shadow.lastH3    ?? [],
      probs: this._shadow.lastProbs ?? [],
    };
  }

  layerWeightAverages() {
    if (!this._shadow) return [0, 0, 0];
    try {
      return this._shadow.layerWeightAverages?.()
        ?? [0, 0, 0];
    } catch (_) {
      return [0, 0, 0];
    }
  }

  reset() {
    this._history  = [];
    this._memory   = new RAGMemory(200);
    this._sessionId = null;
    this._shadow   = new NeuralLM({
      maxVocab: 220, contextLen: 8, embedDim: 16,
      h1: 112, h2: 96, h3: 64, lr: 0.025, clipGrad: 1.0,
    });
    this._saveLocal();
    this.emit({ type: 'state', stats: this.stats });
  }

  setApiKey(key) {
    this._apiKey = key.trim();
    this._saveLocal();
  }

  // ── 메인 send() ───────────────────────────────────────────
  async send(message) {
    if (!this._apiKey) {
      this.emit({
        type: 'generate-end',
        text: '⚠️ IRIS API Key가 설정되지 않았습니다. Settings에서 X-API-Key를 입력해주세요.',
      });
      return;
    }

    // 1. Shadow NLM 학습 (viz 구동)
    this._trainShadow(message);

    // 2. RAG 메모리 검색
    const memories = this._memory.search(message, 3);

    // 3. IRIS API 호출
    this.emit({ type: 'training-start' });

    try {
      const body = {
        message,
        max_tokens: 256,
        session_id: this._sessionId,
      };

      const res = await fetch(`${IRIS_ENDPOINT}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this._apiKey,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.response || '';
      this._sessionId = data.session_id || this._sessionId;

      // 4. 히스토리 + 메모리 저장
      this._history.push({ role: 'user',      content: message });
      this._history.push({ role: 'assistant', content: reply   });
      this._memory.add(message);
      this._memory.add(reply);

      // 5. Shadow NLM 재학습 (응답 반영)
      this._trainShadow(reply);

      // 6. 저장
      this._saveLocal();

      // 7. 이벤트 발행
      this.emit({ type: 'generate-end', text: reply });
      this.emit({ type: 'state', stats: this.stats });

    } catch (e) {
      console.error('[IRIS]', e);

      // 콜드스타트 메시지
      const msg = e.message?.includes('503') || e.message?.includes('warming')
        ? 'IRIS가 깨어나는 중입니다, 주인님. 잠시 후 다시 시도해주세요. (콜드스타트 약 30초)'
        : `IRIS 연결 오류: ${e.message}`;

      this.emit({ type: 'generate-end', text: msg });
    }

    this.emit({ type: 'training-end' });
  }

  // ── Test Connection ────────────────────────────────────────
  async testConnection() {
    if (!this._apiKey) return { ok: false, msg: 'API Key를 입력해주세요.' };
    try {
      const res = await fetch(`${IRIS_ENDPOINT}/health`, {
        headers: { 'X-API-Key': this._apiKey },
      });
      if (res.ok) {
        const data = await res.json();
        const loaded = data.model_loaded ? '✅' : '⏳';
        return {
          ok: true,
          msg: `${loaded} IRIS 시스템 온라인 | RLAIF 데이터: ${data.rlaif_data_count ?? 0}건`,
        };
      }
      return { ok: false, msg: `HTTP ${res.status}` };
    } catch (e) {
      return { ok: false, msg: `연결 실패: ${e.message}` };
    }
  }

  // ── Shadow NLM 학습 (viz 전용) ─────────────────────────────
  _trainShadow(text) {
    if (!text || !this._shadow) return;
    try {
      this._shadow.trainOnText(text, 1);
    } catch (_) {}
  }

  // ── 로컬 저장 ─────────────────────────────────────────────
  _saveLocal() {
    try {
      localStorage.setItem('handface-iris-v1', JSON.stringify({
        history:   this._history.slice(-40),
        memory:    this._memory.items,
        sessionId: this._sessionId,
      }));
    } catch (_) {}
  }

  _loadLocal() {
    try {
      const raw = localStorage.getItem('handface-iris-v1');
      if (!raw) return;
      const d = JSON.parse(raw);
      this._history   = d.history   ?? [];
      this._memory.items = d.memory ?? [];
      this._sessionId = d.sessionId ?? null;
    } catch (_) {}
  }
}