// Phase N — Memory Systems (완벽한 인공지능 9 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 9 단계.
// Phase M Creativity 다음. multiple memory systems — episodic / semantic /
// procedural / associative.
//
// 학술 정합:
//   - Tulving 1985 — multiple memory systems (episodic vs semantic).
//   - Squire 1992 — declarative vs non-declarative (procedural).
//   - Hopfield 1982 — content-addressable associative memory.
//   - McGaugh 2000 — memory consolidation (STM → LTM).
//   - Diekelmann & Born 2010 — sleep-dependent consolidation.

// ── 1. Episodic Memory (Tulving 1985) ──

export interface EpisodicTrace {
  id: string;
  when: number;       // timestamp
  where: string;      // location / context
  what: string;       // event description
  associatedNeurons: number[]; // SNN neuron pattern
  emotionalValence: number;    // -1..1 (from Phase K affect)
}

export interface EpisodicMemory {
  traces: EpisodicTrace[];
  capacity: number;
}

export function createEpisodicMemory(capacity: number = 1000): EpisodicMemory {
  return { traces: [], capacity };
}

export function recordEpisode(memory: EpisodicMemory, trace: EpisodicTrace): EpisodicMemory {
  const newTraces = [...memory.traces, trace];
  // 영역 영역 → 영역 영역 영역 영역 (FIFO + emotion bias).
  if (newTraces.length > memory.capacity) {
    // Emotional traces 영역 영역 (high |valence| → keep).
    newTraces.sort((a, b) => Math.abs(b.emotionalValence) - Math.abs(a.emotionalValence));
    return { ...memory, traces: newTraces.slice(0, memory.capacity) };
  }
  return { ...memory, traces: newTraces };
}

// Recall by context — when / where / what 영역 query.
export function recallEpisodes(
  memory: EpisodicMemory,
  query: { whenRange?: [number, number]; where?: string; whatContains?: string },
): EpisodicTrace[] {
  return memory.traces.filter((t) => {
    if (query.whenRange && (t.when < query.whenRange[0] || t.when > query.whenRange[1])) return false;
    if (query.where && t.where !== query.where) return false;
    if (query.whatContains && !t.what.includes(query.whatContains)) return false;
    return true;
  });
}

// ── 2. Semantic Memory (Concept Graph) ──

export interface SemanticConcept {
  id: string;
  name: string;
  relations: Map<string, string[]>; // relation type → related concept ids
}

export interface SemanticNetwork {
  concepts: Map<string, SemanticConcept>;
}

export function createSemanticNetwork(): SemanticNetwork {
  return { concepts: new Map() };
}

export function addConcept(
  net: SemanticNetwork,
  id: string, name: string,
): SemanticNetwork {
  const newConcepts = new Map(net.concepts);
  if (!newConcepts.has(id)) {
    newConcepts.set(id, { id, name, relations: new Map() });
  }
  return { concepts: newConcepts };
}

export function addRelation(
  net: SemanticNetwork,
  fromId: string, relation: string, toId: string,
): SemanticNetwork {
  const newConcepts = new Map(net.concepts);
  const concept = newConcepts.get(fromId);
  if (!concept) return net;
  const newRelations = new Map(concept.relations);
  const existing = newRelations.get(relation) ?? [];
  newRelations.set(relation, [...existing, toId]);
  newConcepts.set(fromId, { ...concept, relations: newRelations });
  return { concepts: newConcepts };
}

// Spreading activation — concept 영역 영역 영역 영역 영역 (Collins & Loftus 1975).
export function spreadingActivation(
  net: SemanticNetwork,
  startId: string,
  maxDepth: number = 2,
): Map<string, number> {
  const activations = new Map<string, number>();
  activations.set(startId, 1.0);
  let frontier: { id: string; depth: number; act: number }[] = [{ id: startId, depth: 0, act: 1.0 }];
  while (frontier.length > 0) {
    const next: typeof frontier = [];
    for (const node of frontier) {
      if (node.depth >= maxDepth) continue;
      const concept = net.concepts.get(node.id);
      if (!concept) continue;
      for (const related of concept.relations.values()) {
        for (const r of related) {
          const decayedAct = node.act * 0.5; // decay
          const existing = activations.get(r) ?? 0;
          if (decayedAct > existing) {
            activations.set(r, decayedAct);
            next.push({ id: r, depth: node.depth + 1, act: decayedAct });
          }
        }
      }
    }
    frontier = next;
  }
  return activations;
}

// ── 3. Procedural Memory (Skill Learning) ──

export interface Procedure {
  name: string;
  steps: string[];                // sequential actions
  repetitions: number;             // 학습 횟수
  proficiency: number;             // 0..1
}

export function createProcedure(name: string, steps: ReadonlyArray<string>): Procedure {
  return { name, steps: [...steps], repetitions: 0, proficiency: 0 };
}

// Practice — 반복 시 proficiency ↑ (power law of practice, Newell & Rosenbloom 1981).
export function practiceProcedure(proc: Procedure): Procedure {
  const newReps = proc.repetitions + 1;
  // Power law: proficiency ≈ 1 - exp(-k × reps)
  const k = 0.1;
  const proficiency = 1 - Math.exp(-k * newReps);
  return { ...proc, repetitions: newReps, proficiency };
}

// ── 4. Associative Memory (Hopfield 1982) ──

// Pattern 영역 weight matrix 영역 영역 — outer product rule.
export interface AssociativeMemory {
  patterns: number[][]; // stored patterns (bipolar -1/+1)
  size: number;
}

export function createAssociativeMemory(size: number): AssociativeMemory {
  return { patterns: [], size };
}

export function storePattern(mem: AssociativeMemory, pattern: ReadonlyArray<number>): AssociativeMemory {
  // Pattern 영역 size 영역 정합.
  if (pattern.length !== mem.size) return mem;
  return { ...mem, patterns: [...mem.patterns, [...pattern]] };
}

// Recall — partial cue → 영역 영역 stored pattern 영역 영역 (Hamming distance min).
export function recallPattern(
  mem: AssociativeMemory,
  cue: ReadonlyArray<number>,
): number[] | null {
  if (mem.patterns.length === 0) return null;
  let bestPattern = mem.patterns[0];
  let bestDist = Infinity;
  for (const p of mem.patterns) {
    let dist = 0;
    for (let i = 0; i < Math.min(p.length, cue.length); i += 1) {
      if (p[i] !== cue[i]) dist += 1;
    }
    if (dist < bestDist) { bestDist = dist; bestPattern = p; }
  }
  return [...bestPattern];
}

// ── 5. Memory Consolidation (McGaugh 2000) ──

// Short-term memory → long-term — emotionally significant + repeated traces 영역.
export interface ConsolidationCriteria {
  minRepetitions: number;
  minEmotionalSignificance: number;
}

export const DEFAULT_CONSOLIDATION: ConsolidationCriteria = {
  minRepetitions: 3,
  minEmotionalSignificance: 0.5,
};

export function shouldConsolidate(
  trace: EpisodicTrace,
  occurrenceCount: number,
  criteria: ConsolidationCriteria = DEFAULT_CONSOLIDATION,
): boolean {
  if (occurrenceCount >= criteria.minRepetitions) return true;
  if (Math.abs(trace.emotionalValence) >= criteria.minEmotionalSignificance) return true;
  return false;
}
