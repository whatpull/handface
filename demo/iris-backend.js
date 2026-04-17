/**
 * iris-backend.js — IRIS 전용 백엔드 (IRIS FastAPI 연동)
 */

// ── RAG 메모리 ─────────────────────────────────────────────
class RAGMemory {
  constructor(maxItems = 200) {
    this.items = [];
    this.maxItems = maxItems;
  }
  add(text) {
    this.items.push(text);
    if (this.items.length > this.maxItems) this.items.shift();
  }
  search(query, k = 3) {
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

// ── IRIS 백엔드 ────────────────────────────────────────────
export class IRISBackend {
  constructor() {
    this._listeners  = [];
    this._history    = [];
    this._memory     = new RAGMemory(200);
    this._apiKey     = '';
    this._endpoint   = 'https://whatpull-iris-assistant.hf.space';
    this._sessionId  = null;
    this.busy        = false;

    // 성장 데이터 (IRIS /health 응답에서 갱신)
    this._growthData = {
      version:            'v1.0',
      conversation_count: 0,
      rlaif_count:        0,
      dpo_count:          0,
      growth_score:       0,
    };

    // Shadow model (triggerPass 호환용 더미)
    this.model = this._makeDummyModel();

    // .env 빌드 설정 자동 로드 (build-env.mjs 가 생성하는 iris-config.js)
    const cfg = typeof window !== 'undefined' ? window.__IRIS_CONFIG__ : null;
    if (cfg?.apiKey)   this._apiKey   = cfg.apiKey;
    if (cfg?.endpoint) this._endpoint = cfg.endpoint;

    this._loadLocal();
  }

  // triggerPass() 가 호출하는 model 인터페이스 더미
  _makeDummyModel() {
    const VOCAB_SIZE = 64;
    const H = 32;
    const randRow = (cols) => Float32Array.from(
      { length: cols }, () => (Math.random() - 0.5) * 0.6
    );
    const randMat = (rows, cols) => Array.from(
      { length: rows }, () => randRow(cols)
    );
    return {
      CTX: 8,
      vocab: { size: VOCAB_SIZE },
      encode: (text) => {
        // 문자 → 0~63 인덱스 변환
        return [...text].map(c => c.charCodeAt(0) % VOCAB_SIZE);
      },
      forward: (ctx) => {
        // 랜덤 활성화 생성 (viz용)
        this.model.lastX     = Float32Array.from({ length: H },
          () => Math.random() * 0.8 + 0.1);
        this.model.lastH1    = Float32Array.from({ length: H },
          () => Math.random() * 0.8 + 0.1);
        this.model.lastH2    = Float32Array.from({ length: H },
          () => Math.random() * 0.8 + 0.1);
        this.model.lastH3    = Float32Array.from({ length: H },
          () => Math.random() * 0.8 + 0.1);
        this.model.lastProbs = Float32Array.from({ length: VOCAB_SIZE },
          () => Math.random());
      },
      lastX:     new Float32Array(H),
      lastH1:    new Float32Array(H),
      lastH2:    new Float32Array(H),
      lastH3:    new Float32Array(H),
      lastProbs: new Float32Array(VOCAB_SIZE),
      // scene.js syncEdgeWeightsFromModel() 이 요구하는 가중치 행렬 (2D array)
      W1: randMat(H, H),
      W2: randMat(H, H),
      W3: randMat(H, H),
      W4: randMat(VOCAB_SIZE, H),
      // CharNLMBackend 호환용: invVocab (문자열 배열)
      invVocab: Array.from({ length: VOCAB_SIZE }, (_, i) => String.fromCharCode(i + 32)),
    };
  }

  // ── 공통 surface ──────────────────────────────────────────
  onEvent(fn) { this._listeners.push(fn); }

  emit(ev) { this._listeners.forEach(fn => fn(ev)); }

  // scene.js 호환용: 내부 {role:'user'|'assistant', content} → {role:'user'|'ai', text}
  get history() {
    return this._history.map(m => ({
      role: m.role === 'assistant' ? 'ai' : m.role,
      text: typeof m.text === 'string' ? m.text
          : typeof m.content === 'string' ? m.content
          : '',
    }));
  }

  get stats() {
    return {
      vocabSize:  64,
      totalSteps: this._history.length,
      lossEMA:    0,
      label:      'IRIS',
    };
  }

  get modelState() {
    return {
      embed: this.model.lastX,
      h1:    this.model.lastH1,
      h2:    this.model.lastH2,
      h3:    this.model.lastH3,
      probs: this.model.lastProbs,
    };
  }

  layerWeightAverages() { return [0.5, 0.5, 0.5]; }

  reset() {
    this._history   = [];
    this._memory    = new RAGMemory(200);
    this._sessionId = null;
    this.model      = this._makeDummyModel();
    this._saveLocal();
    this.emit({ type: 'state', stats: this.stats });
  }

  setApiKey(key) {
    this._apiKey = key.trim();
    this._saveLocal();
  }

  setEndpoint(url) {
    if (url && url.startsWith('http')) {
      this._endpoint = url.trim().replace(/\/$/, '');
      this._saveLocal();
    }
  }

  // ── 메인 send() ───────────────────────────────────────────
  async send(message) {
    if (this.busy) return;

    if (!this._apiKey) {
      this.emit({
        type: 'generate-end',
        text: '⚠️ IRIS API Key가 설정되지 않았습니다.\nSettings(⚙️)에서 X-API-Key를 입력해주세요.',
      });
      return;
    }

    this.busy = true;
    this.emit({ type: 'training-start' });

    // dummy model 활성화 (viz 즉시 반응)
    this.model.forward([]);

    try {
      const t0 = Date.now();
      const res = await fetch(`${this._endpoint}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key':    this._apiKey,
        },
        body: JSON.stringify({
          message,
          max_tokens: 256,
          session_id: this._sessionId,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }

      const data             = await res.json();
      const reply            = (data.response || '').trim();
      const attentionLayers  = data.attention_layers || [];
      this._sessionId        = data.session_id || this._sessionId;
      this._lastLatency      = Date.now() - t0;

      // 히스토리 + 메모리 저장
      this._history.push({ role: 'user',      content: message });
      this._history.push({ role: 'assistant', content: reply   });
      this._memory.add(message);
      this._memory.add(reply);
      this._saveLocal();

      // 응답 후 model 활성화 갱신 (viz 반응)
      this.model.forward([]);

      // 성장 데이터 갱신 (10회 대화마다)
      if (this._history.length % 10 === 0) {
        this._fetchGrowthData();
      }

      // partial 포함 — scene.js 스트리밍 UI 가 ev.partial 을 읽음
      this.emit({
        type:             'generate-token',
        token:            reply,
        partial:          reply,
        attention_layers: attentionLayers,
      });
      this.emit({
        type:             'generate-end',
        text:             reply,
        attention_layers: attentionLayers,
      });
      this.emit({ type: 'state', stats: this.stats });

    } catch (e) {
      console.error('[IRIS]', e);
      const isWarmup = e.message?.includes('503') ||
                       e.message?.includes('Service Unavailable') ||
                       e.message?.includes('warming');
      const msg = isWarmup
        ? 'IRIS가 깨어나는 중입니다, 주인님.\n잠시 후 다시 시도해주세요. (콜드스타트 약 30~60초)'
        : `IRIS 연결 오류: ${e.message}`;

      this.emit({ type: 'generate-end', text: msg });
    }

    this.busy = false;
    // payload 포함 — scene.js training-end 핸들러 ev.avgLoss.toFixed() 크래시 방지
    this.emit({ type: 'training-end', avgLoss: 0, stepsRun: 0, totalSteps: this._history.length });
  }

  // ── Test Connection ────────────────────────────────────────
  async testConnection() {
    if (!this._apiKey)
      return { ok: false, msg: 'API Key를 입력해주세요.' };
    try {
      const res = await fetch(`${this._endpoint}/health`, {
        headers: { 'X-API-Key': this._apiKey },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.growth) {
          this._growthData = {
            version:            data.version ?? 'v1.0',
            conversation_count: data.growth.conversation_count ?? 0,
            rlaif_count:        data.growth.rlaif_count ?? 0,
            dpo_count:          data.growth.dpo_count ?? 0,
            growth_score:       data.growth.growth_score ?? 0,
          };
        }
        return {
          ok:  true,
          msg: `IRIS ${data.version ?? 'v1.0'} 온라인 | 대화: ${data.growth?.conversation_count ?? 0}건 | RLAIF: ${data.growth?.rlaif_count ?? 0}건 | 성장: ${data.growth?.growth_score ?? 0}점`,
        };
      }
      return { ok: false, msg: `HTTP ${res.status}` };
    } catch (e) {
      return { ok: false, msg: `연결 실패: ${e.message}` };
    }
  }

  // ── 성장 데이터 조회 (주기적으로 호출됨) ─────────────────────
  async _fetchGrowthData() {
    try {
      const res = await fetch(`${this._endpoint}/health`, {
        headers: { 'X-API-Key': this._apiKey },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.growth) {
        this._growthData = {
          version:            data.version ?? 'v1.0',
          conversation_count: data.growth.conversation_count ?? 0,
          rlaif_count:        data.growth.rlaif_count ?? 0,
          dpo_count:          data.growth.dpo_count ?? 0,
          growth_score:       data.growth.growth_score ?? 0,
        };
        this.emit({
          type:   'growth-update',
          growth: this._growthData,
        });
        console.log('[IRIS] 성장 데이터 갱신:', this._growthData);
      }
    } catch (e) {
      console.warn('[IRIS] 성장 데이터 조회 실패:', e.message);
    }
  }

  get growthData() { return this._growthData; }

  // ── 로컬 저장 ─────────────────────────────────────────────
  _saveLocal() {
    try {
      localStorage.setItem('handface-iris-v1', JSON.stringify({
        history:    this._history.slice(-40),
        memory:     this._memory.items,
        sessionId:  this._sessionId,
        endpoint:   this._endpoint,
      }));
    } catch (_) {}
  }

  _loadLocal() {
    try {
      const raw = localStorage.getItem('handface-iris-v1');
      if (!raw) return;
      const d = JSON.parse(raw);
      this._history      = d.history   ?? [];
      this._memory.items = d.memory    ?? [];
      this._sessionId    = d.sessionId ?? null;
      if (d.endpoint) this._endpoint = d.endpoint;
    } catch (_) {}
  }
}