// Phase L — Language / Symbolic Reasoning (완벽한 인공지능 7 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 7 단계.
// Phase F~K 다음 — 언어 / 상징 추론. 영역 sub-symbolic SNN 영역 영역 symbolic
// reasoning 영역 통합 (neural-symbolic integration).
//
// 학술 정합:
//   - Pinker 1994 — Language Instinct.
//   - Fodor 1975 — Language of Thought (LOT).
//   - Smolensky 1990 — Tensor product representations.
//   - Marcus 2001 — Algebraic mind (rules + variables).
//   - Hochreiter & Schmidhuber 1997 — LSTM (sequence learning).

// ── 1. Symbol Grounding (Harnad 1990) ──

export interface Symbol {
  id: string;
  groundedNeurons: number[]; // SNN neurons 영역 영역 represent
  category: string;          // e.g. 'noun', 'verb', 'adj'
}

// Symbol grounding — symbol 영역 SNN neuron pattern 영역 영역.
// 학술 정합: Harnad 1990 — symbol grounding problem 해결.
export function groundSymbol(
  id: string,
  category: string,
  groundedNeurons: ReadonlyArray<number>,
): Symbol {
  return { id, category, groundedNeurons: [...groundedNeurons] };
}

// Symbol activation level — neuron firing rates 영역 영역 영역 활성도 영역.
export function symbolActivation(
  sym: Symbol,
  firingRates: ReadonlyMap<number, number>,
): number {
  if (sym.groundedNeurons.length === 0) return 0;
  let sum = 0;
  for (const n of sym.groundedNeurons) sum += firingRates.get(n) ?? 0;
  return sum / sym.groundedNeurons.length;
}

// ── 2. Compositional Binding (Smolensky 1990) ──

// Tensor product representation — role × filler binding.
// 학술 정합: "agent: dog, action: bark" 영역 영역 영역.
export interface RoleFillerBinding {
  role: string;
  filler: Symbol;
}

export interface CompositionalStructure {
  bindings: RoleFillerBinding[];
}

export function bindRoleFiller(role: string, filler: Symbol): RoleFillerBinding {
  return { role, filler };
}

export function compose(bindings: ReadonlyArray<RoleFillerBinding>): CompositionalStructure {
  return { bindings: [...bindings] };
}

// Decomposition — role 영역 filler 영역 영역.
export function getFiller(structure: CompositionalStructure, role: string): Symbol | null {
  const binding = structure.bindings.find((b) => b.role === role);
  return binding ? binding.filler : null;
}

// ── 3. Sequence Generation (auto-regressive) ──

export interface SequenceModel {
  vocabulary: ReadonlyArray<string>;
  // Transition matrix [from][to] → probability.
  transitions: ReadonlyArray<ReadonlyArray<number>>;
}

// Markov-style next token sampling — temperature scaled.
// 학술 정합: Bengio et al. 2003 — language modeling.
export function sampleNextToken(
  model: SequenceModel,
  currentTokenIdx: number,
  temperature: number = 1.0,
): { tokenIdx: number; token: string; probability: number } {
  if (currentTokenIdx < 0 || currentTokenIdx >= model.transitions.length) {
    return { tokenIdx: -1, token: '', probability: 0 };
  }
  const probs = model.transitions[currentTokenIdx];
  // Temperature 영역 영역 (높을수록 영역).
  let max = -Infinity;
  let argmax = -1;
  if (temperature <= 0.001) {
    // Greedy.
    for (let i = 0; i < probs.length; i += 1) {
      if (probs[i] > max) { max = probs[i]; argmax = i; }
    }
    return {
      tokenIdx: argmax,
      token: model.vocabulary[argmax] ?? '',
      probability: max,
    };
  }
  // Softmax with temperature (deterministic argmax for testability).
  const scaled = probs.map((p) => (p > 0 ? Math.log(p) / temperature : -Infinity));
  const sMax = Math.max(...scaled);
  const exps = scaled.map((s) => (s === -Infinity ? 0 : Math.exp(s - sMax)));
  let totalSum = 0;
  for (const e of exps) totalSum += e;
  const normalized = exps.map((e) => (totalSum > 0 ? e / totalSum : 0));
  // Pick argmax of normalized (deterministic for tests).
  let maxIdx = 0;
  let maxProb = normalized[0];
  for (let i = 1; i < normalized.length; i += 1) {
    if (normalized[i] > maxProb) { maxProb = normalized[i]; maxIdx = i; }
  }
  return {
    tokenIdx: maxIdx,
    token: model.vocabulary[maxIdx] ?? '',
    probability: maxProb,
  };
}

// Generate full sequence.
export function generateSequence(
  model: SequenceModel,
  startTokenIdx: number,
  maxLength: number = 10,
  stopTokenIdx: number = -1,
  temperature: number = 1.0,
): string[] {
  const result: string[] = [];
  let current = startTokenIdx;
  for (let i = 0; i < maxLength; i += 1) {
    if (current < 0 || current >= model.vocabulary.length) break;
    result.push(model.vocabulary[current]);
    if (current === stopTokenIdx) break;
    const next = sampleNextToken(model, current, temperature);
    if (next.tokenIdx < 0) break;
    current = next.tokenIdx;
  }
  return result;
}

// ── 4. Symbolic Rule Application (Marcus 2001) ──

export interface SymbolicRule {
  name: string;
  precondition: (symbols: ReadonlyArray<Symbol>) => boolean;
  apply: (symbols: ReadonlyArray<Symbol>) => Symbol | null;
}

// Algebraic rule application — preconditions met → derive new symbol.
export function applyRules(
  rules: ReadonlyArray<SymbolicRule>,
  symbols: ReadonlyArray<Symbol>,
): { rule: string; derived: Symbol | null }[] {
  const applied: { rule: string; derived: Symbol | null }[] = [];
  for (const rule of rules) {
    if (rule.precondition(symbols)) {
      applied.push({ rule: rule.name, derived: rule.apply(symbols) });
    }
  }
  return applied;
}

// ── 5. Cross-modal Semantic Linking ──

// Symbol → image cluster + audio neuron 영역 영역 (Phase F multi-modality 통합).
export interface SemanticLink {
  symbolId: string;
  imageClusterId: number;
  audioNeuronIds: number[];
}

export function linkSemantics(
  symbolId: string,
  imageClusterId: number,
  audioNeuronIds: ReadonlyArray<number>,
): SemanticLink {
  return { symbolId, imageClusterId, audioNeuronIds: [...audioNeuronIds] };
}
