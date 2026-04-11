/**
 * Tiny character-level neural language model (n-gram MLP).
 * Pure JS, no dependencies, ~50k parameters.
 *
 * Architecture: context_chars × embed_dim → H1 → H2 → H3 → vocab logits
 * Loss: cross-entropy on next-character prediction
 * Optimizer: SGD with momentum
 *
 * Designed so each layer's activations can be sampled directly into the
 * 3D viz (the viz has 5 layers and so does this network).
 */

const PAD_TOKEN = '\x00';

function rand(stddev) { return (Math.random() * 2 - 1) * stddev; }

function createMatrix(rows, cols, stddev) {
  const m = new Array(rows);
  for (let i = 0; i < rows; i++) {
    const row = new Float32Array(cols);
    if (stddev > 0) {
      for (let j = 0; j < cols; j++) row[j] = rand(stddev);
    }
    m[i] = row;
  }
  return m;
}

function softmaxInPlace(arr, len) {
  let max = -Infinity;
  for (let i = 0; i < len; i++) if (arr[i] > max) max = arr[i];
  let sum = 0;
  for (let i = 0; i < len; i++) {
    arr[i] = Math.exp(arr[i] - max);
    sum += arr[i];
  }
  const inv = 1 / sum;
  for (let i = 0; i < len; i++) arr[i] *= inv;
}

export class NeuralLM {
  constructor(opts = {}) {
    this.MAX_VOCAB = opts.maxVocab ?? 220;
    this.CTX       = opts.contextLen ?? 8;    // wider context → smarter predictions
    this.EMB       = opts.embedDim ?? 16;
    this.H1        = opts.h1 ?? 112;
    this.H2        = opts.h2 ?? 96;
    this.H3        = opts.h3 ?? 64;
    this.lr        = opts.lr ?? 0.035;
    this.momentum  = opts.momentum ?? 0.9;

    const V = this.MAX_VOCAB;
    const ctxDim = this.CTX * this.EMB;

    // Vocab (dynamic — chars added on demand)
    this.vocab    = new Map();
    this.invVocab = [];
    this.addChar(PAD_TOKEN);

    // Weights — embedding + 4 dense layers
    this.embed = createMatrix(V, this.EMB, 0.12);
    this.W1 = createMatrix(ctxDim,  this.H1, 0.08);
    this.b1 = new Float32Array(this.H1);
    this.W2 = createMatrix(this.H1, this.H2, 0.10);
    this.b2 = new Float32Array(this.H2);
    this.W3 = createMatrix(this.H2, this.H3, 0.12);
    this.b3 = new Float32Array(this.H3);
    this.W4 = createMatrix(this.H3, V, 0.10);
    this.b4 = new Float32Array(V);

    // Velocity buffers (momentum)
    this.vEmbed = createMatrix(V, this.EMB, 0);
    this.vW1 = createMatrix(ctxDim,  this.H1, 0); this.vb1 = new Float32Array(this.H1);
    this.vW2 = createMatrix(this.H1, this.H2, 0); this.vb2 = new Float32Array(this.H2);
    this.vW3 = createMatrix(this.H2, this.H3, 0); this.vb3 = new Float32Array(this.H3);
    this.vW4 = createMatrix(this.H3, V,       0); this.vb4 = new Float32Array(V);

    // Forward pass cache (exposed for viz)
    this.lastX      = new Float32Array(ctxDim);
    this.lastH1     = new Float32Array(this.H1);
    this.lastH2     = new Float32Array(this.H2);
    this.lastH3     = new Float32Array(this.H3);
    this.lastLogits = new Float32Array(V);
    this.lastProbs  = new Float32Array(V);

    // Stats
    this.totalSteps = 0;
    this.lossEMA    = null;
  }

  // ─── Vocab management ──────────────────────────
  addChar(ch) {
    if (this.vocab.has(ch)) return this.vocab.get(ch);
    if (this.vocab.size >= this.MAX_VOCAB) return 0;
    const idx = this.vocab.size;
    this.vocab.set(ch, idx);
    this.invVocab.push(ch);
    return idx;
  }

  encode(text) {
    const out = [];
    for (const ch of text) {
      const idx = this.addChar(ch);
      out.push(idx);
    }
    return out;
  }

  // ─── Forward pass ─────────────────────────────
  forward(context) {
    const { CTX, EMB, H1, H2, H3, lastX, lastH1, lastH2, lastH3, lastLogits, lastProbs } = this;
    const V = this.vocab.size;

    // Embedding lookup → flat context vector
    for (let i = 0; i < CTX; i++) {
      const idx = context[i] | 0;
      const emb = this.embed[idx];
      for (let d = 0; d < EMB; d++) lastX[i * EMB + d] = emb[d];
    }

    // H1 = ReLU(x · W1 + b1)
    for (let i = 0; i < H1; i++) {
      let s = this.b1[i];
      for (let j = 0; j < lastX.length; j++) s += lastX[j] * this.W1[j][i];
      lastH1[i] = s > 0 ? s : 0;
    }
    // H2 = ReLU(H1 · W2 + b2)
    for (let i = 0; i < H2; i++) {
      let s = this.b2[i];
      for (let j = 0; j < H1; j++) s += lastH1[j] * this.W2[j][i];
      lastH2[i] = s > 0 ? s : 0;
    }
    // H3 = ReLU(H2 · W3 + b3)
    for (let i = 0; i < H3; i++) {
      let s = this.b3[i];
      for (let j = 0; j < H2; j++) s += lastH2[j] * this.W3[j][i];
      lastH3[i] = s > 0 ? s : 0;
    }
    // logits = H3 · W4 + b4
    for (let i = 0; i < V; i++) {
      let s = this.b4[i];
      for (let j = 0; j < H3; j++) s += lastH3[j] * this.W4[j][i];
      lastLogits[i] = s;
      lastProbs[i]  = s;
    }
    softmaxInPlace(lastProbs, V);
    return lastProbs;
  }

  // ─── Backward + SGD update ───────────────────
  backward(context, target) {
    const probs = this.forward(context);
    const { CTX, EMB, H1, H2, H3, lr, momentum } = this;
    const V = this.vocab.size;
    const x = this.lastX, h1 = this.lastH1, h2 = this.lastH2, h3 = this.lastH3;

    const loss = -Math.log(Math.max(probs[target], 1e-9));

    // dLogits = probs - one_hot(target)   (only first V entries valid)
    const dLogits = new Float32Array(V);
    for (let i = 0; i < V; i++) dLogits[i] = probs[i];
    dLogits[target] -= 1;

    // dW4 / db4
    for (let i = 0; i < H3; i++) {
      const hi = h3[i];
      const W4i = this.W4[i], vW4i = this.vW4[i];
      for (let j = 0; j < V; j++) {
        const g = hi * dLogits[j];
        vW4i[j] = momentum * vW4i[j] - lr * g;
        W4i[j] += vW4i[j];
      }
    }
    for (let j = 0; j < V; j++) {
      this.vb4[j] = momentum * this.vb4[j] - lr * dLogits[j];
      this.b4[j] += this.vb4[j];
    }

    // dh3 = (dLogits · W4ᵀ) ⊙ relu'(h3)
    const dh3 = new Float32Array(H3);
    for (let i = 0; i < H3; i++) {
      if (h3[i] <= 0) continue;
      let s = 0;
      const W4i = this.W4[i];
      for (let j = 0; j < V; j++) s += W4i[j] * dLogits[j];
      dh3[i] = s;
    }

    // dW3 / db3
    for (let i = 0; i < H2; i++) {
      const hi = h2[i];
      const W3i = this.W3[i], vW3i = this.vW3[i];
      for (let j = 0; j < H3; j++) {
        const g = hi * dh3[j];
        vW3i[j] = momentum * vW3i[j] - lr * g;
        W3i[j] += vW3i[j];
      }
    }
    for (let j = 0; j < H3; j++) {
      this.vb3[j] = momentum * this.vb3[j] - lr * dh3[j];
      this.b3[j] += this.vb3[j];
    }

    // dh2
    const dh2 = new Float32Array(H2);
    for (let i = 0; i < H2; i++) {
      if (h2[i] <= 0) continue;
      let s = 0;
      const W3i = this.W3[i];
      for (let j = 0; j < H3; j++) s += W3i[j] * dh3[j];
      dh2[i] = s;
    }

    // dW2 / db2
    for (let i = 0; i < H1; i++) {
      const hi = h1[i];
      const W2i = this.W2[i], vW2i = this.vW2[i];
      for (let j = 0; j < H2; j++) {
        const g = hi * dh2[j];
        vW2i[j] = momentum * vW2i[j] - lr * g;
        W2i[j] += vW2i[j];
      }
    }
    for (let j = 0; j < H2; j++) {
      this.vb2[j] = momentum * this.vb2[j] - lr * dh2[j];
      this.b2[j] += this.vb2[j];
    }

    // dh1
    const dh1 = new Float32Array(H1);
    for (let i = 0; i < H1; i++) {
      if (h1[i] <= 0) continue;
      let s = 0;
      const W2i = this.W2[i];
      for (let j = 0; j < H2; j++) s += W2i[j] * dh2[j];
      dh1[i] = s;
    }

    // dW1 / db1 + dx (for embedding gradient)
    const ctxDim = CTX * EMB;
    const dx = new Float32Array(ctxDim);
    for (let i = 0; i < ctxDim; i++) {
      let s = 0;
      const W1i = this.W1[i], vW1i = this.vW1[i];
      const xi = x[i];
      for (let j = 0; j < H1; j++) {
        s += W1i[j] * dh1[j];
        const g = xi * dh1[j];
        vW1i[j] = momentum * vW1i[j] - lr * g;
        W1i[j] += vW1i[j];
      }
      dx[i] = s;
    }
    for (let j = 0; j < H1; j++) {
      this.vb1[j] = momentum * this.vb1[j] - lr * dh1[j];
      this.b1[j] += this.vb1[j];
    }

    // dEmbed (sparse update — only the chars in this context)
    for (let i = 0; i < CTX; i++) {
      const idx = context[i] | 0;
      const emb = this.embed[idx], vemb = this.vEmbed[idx];
      const off = i * EMB;
      for (let d = 0; d < EMB; d++) {
        const g = dx[off + d];
        vemb[d] = momentum * vemb[d] - lr * g;
        emb[d] += vemb[d];
      }
    }

    this.totalSteps++;
    this.lossEMA = this.lossEMA === null ? loss : this.lossEMA * 0.98 + loss * 0.02;
    return loss;
  }

  // ─── Training: sliding window over text ──────
  trainOnText(text, repeats = 3) {
    const indices = this.encode(text);
    if (indices.length < 2) return 0;
    let total = 0, count = 0;
    for (let r = 0; r < repeats; r++) {
      for (let i = 1; i < indices.length; i++) {
        const ctx = new Array(this.CTX);
        for (let k = 0; k < this.CTX; k++) {
          const pos = i - this.CTX + k;
          ctx[k] = pos >= 0 ? indices[pos] : 0;
        }
        total += this.backward(ctx, indices[i]);
        count++;
      }
    }
    return count > 0 ? total / count : 0;
  }

  // ─── Sampling: generate text given seed ──────
  sample(seed = '', maxLength = 80, temperature = 0.85, opts = {}) {
    const minLength = opts.minLength ?? 14;   // force at least N chars before any termination
    const indices = this.encode(seed);
    const out = [];
    const ctx = new Array(this.CTX);
    for (let k = 0; k < this.CTX; k++) {
      const pos = indices.length - this.CTX + k;
      ctx[k] = pos >= 0 ? indices[pos] : 0;
    }

    const V = this.vocab.size;
    const tempProbs = new Float32Array(V);

    // Token indices we never want to sample (always banned)
    const padIdx = 0;                              // PAD_TOKEN
    const nlIdx  = this.vocab.get('\n') ?? -1;     // newline — purely structural

    // Tokens we ban only in the first `minLength` chars (force minimum output length)
    const earlyBanIdxs = ['.', '!', '?', ',', '。', '?', '!']
      .map(c => this.vocab.get(c) ?? -1)
      .filter(i => i >= 0);

    for (let step = 0; step < maxLength; step++) {
      const probs = this.forward(ctx);

      // Apply temperature
      let sum = 0;
      for (let i = 0; i < V; i++) {
        tempProbs[i] = Math.pow(probs[i] + 1e-9, 1 / temperature);
        sum += tempProbs[i];
      }

      // Always ban PAD and newline — these are structural tokens, not output
      if (padIdx < V) tempProbs[padIdx] = 0;
      if (nlIdx >= 0 && nlIdx < V) tempProbs[nlIdx] = 0;
      // Ban end-of-sentence chars before minLength to force a useful response
      if (step < minLength) {
        for (const idx of earlyBanIdxs) {
          if (idx >= 0 && idx < V) tempProbs[idx] = 0;
        }
      }

      // Re-normalize after bans
      sum = 0;
      for (let i = 0; i < V; i++) sum += tempProbs[i];
      if (sum < 1e-9) break;  // safety: nothing left to sample
      const inv = 1 / sum;

      // Multinomial sample
      let r = Math.random();
      let pick = 0;
      for (let i = 0; i < V; i++) {
        r -= tempProbs[i] * inv;
        if (r <= 0) { pick = i; break; }
      }

      const ch = this.invVocab[pick];
      if (!ch || ch === PAD_TOKEN) break;
      out.push(ch);

      // Slide context window
      for (let k = 0; k < this.CTX - 1; k++) ctx[k] = ctx[k + 1];
      ctx[this.CTX - 1] = pick;

      // Allow natural sentence break only after the minimum length
      if (step >= minLength && (ch === '.' || ch === '!' || ch === '?' || ch === '。')) break;
    }
    return out.join('');
  }

  // ─── Persistence ─────────────────────────────
  serialize() {
    return {
      vocab:  Array.from(this.vocab.entries()),
      embed:  this.embed.map(r => Array.from(r)),
      W1: this.W1.map(r => Array.from(r)), b1: Array.from(this.b1),
      W2: this.W2.map(r => Array.from(r)), b2: Array.from(this.b2),
      W3: this.W3.map(r => Array.from(r)), b3: Array.from(this.b3),
      W4: this.W4.map(r => Array.from(r)), b4: Array.from(this.b4),
      totalSteps: this.totalSteps,
      lossEMA:    this.lossEMA,
    };
  }

  loadFrom(data) {
    if (!data || !data.vocab) return false;
    this.vocab.clear();
    this.invVocab.length = 0;
    for (const [ch, idx] of data.vocab) {
      this.vocab.set(ch, idx);
      this.invVocab[idx] = ch;
    }
    const copy = (dst, src) => {
      for (let i = 0; i < src.length; i++) {
        if (Array.isArray(src[i])) {
          for (let j = 0; j < src[i].length; j++) dst[i][j] = src[i][j];
        } else {
          dst[i] = src[i];
        }
      }
    };
    copy(this.embed, data.embed);
    copy(this.W1, data.W1); copy(this.b1, data.b1);
    copy(this.W2, data.W2); copy(this.b2, data.b2);
    copy(this.W3, data.W3); copy(this.b3, data.b3);
    copy(this.W4, data.W4); copy(this.b4, data.b4);
    this.totalSteps = data.totalSteps || 0;
    this.lossEMA    = data.lossEMA ?? null;
    return true;
  }
}
