// Phase R — Counterfactual Reasoning (완벽한 인공지능 13 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 13 단계.
// Phase Q Imitation 다음. Pearl 2009 — causal hierarchy: associational (P(y|x))
// → interventional (P(y|do(x))) → counterfactual (P(y_x | x', y')).
//
// 학술 정합:
//   - Pearl 2009 — Causality (3-level hierarchy).
//   - Pearl & Mackenzie 2018 — The Book of Why.
//   - Lewis 1973 — Counterfactuals (possible worlds semantics).
//   - Roese 1997 — Counterfactual Thinking in psychology.
//   - Halpern & Pearl 2005 — Actual causation.

// ── 1. Causal Graph ──

export interface CausalEdge {
  cause: string;
  effect: string;
  strength: number; // 0..1
}

export interface CausalGraph {
  nodes: Set<string>;
  edges: CausalEdge[];
}

export function createCausalGraph(): CausalGraph {
  return { nodes: new Set(), edges: [] };
}

export function addCausalEdge(graph: CausalGraph, edge: CausalEdge): CausalGraph {
  const newNodes = new Set(graph.nodes);
  newNodes.add(edge.cause);
  newNodes.add(edge.effect);
  return { nodes: newNodes, edges: [...graph.edges, edge] };
}

// ── 2. Associational Reasoning (Level 1) ──

// P(effect | cause = observed) — simple correlation propagation.
export function correlationStrength(
  graph: CausalGraph,
  cause: string, effect: string,
): number {
  // Direct edge.
  const direct = graph.edges.find(e => e.cause === cause && e.effect === effect);
  if (direct) return direct.strength;
  // Transitive path search (DFS, multiplicative strength).
  const visited = new Set<string>();
  function dfs(current: string, depth: number): number {
    if (current === effect) return 1.0;
    if (depth > 5 || visited.has(current)) return 0;
    visited.add(current);
    let best = 0;
    for (const edge of graph.edges) {
      if (edge.cause === current) {
        const sub = dfs(edge.effect, depth + 1);
        if (sub > 0) {
          const combined = edge.strength * sub;
          if (combined > best) best = combined;
        }
      }
    }
    visited.delete(current);
    return best;
  }
  return dfs(cause, 0);
}

// ── 3. Interventional Reasoning (Level 2 — do-calculus) ──

// do(X = x) — intervention 영역 X 영역 fix, parents 영역 영역 edge 영역 cut.
// 학술 정합: Pearl do-operator.
export function intervene(
  graph: CausalGraph,
  variable: string,
): CausalGraph {
  // Remove edges INTO the intervened variable (mutilation).
  return {
    ...graph,
    edges: graph.edges.filter(e => e.effect !== variable),
  };
}

// P(effect | do(cause)) — interventional probability.
export function interventionalEffect(
  graph: CausalGraph,
  cause: string, effect: string,
): number {
  const mutilated = intervene(graph, cause);
  return correlationStrength(mutilated, cause, effect);
}

// ── 4. Counterfactual Reasoning (Level 3) ──

export interface CounterfactualQuery {
  actualState: Map<string, boolean>;     // 실제 영역 (X=x, Y=y)
  counterfactualCause: string;            // 만약 X 가 영역 영역 영역
  counterfactualValue: boolean;
  targetEffect: string;                   // ?
}

// Counterfactual probability — 3-step procedure (Pearl 2009):
//   1. Abduction: 영역 evidence 영역 영역 latent factors infer.
//   2. Action: counterfactual intervention 적용.
//   3. Prediction: 영역 distribution 영역 영역 target 영역.
// Simplified: difference between counterfactual outcome vs actual outcome.
export function counterfactualEffect(
  graph: CausalGraph,
  query: CounterfactualQuery,
): { wouldHaveBeen: number; actuallyWas: boolean | null; counterfactualDelta: number } {
  const actualEffect = query.actualState.get(query.targetEffect) ?? null;
  const actualEffectVal = actualEffect === true ? 1 : 0;
  // If counterfactual cause = true, predicted effect prob.
  // If counterfactual cause = false, predicted effect prob from baseline.
  const counterfactualProb = query.counterfactualValue
    ? correlationStrength(graph, query.counterfactualCause, query.targetEffect)
    : 1 - correlationStrength(graph, query.counterfactualCause, query.targetEffect);
  return {
    wouldHaveBeen: counterfactualProb,
    actuallyWas: actualEffect,
    counterfactualDelta: counterfactualProb - actualEffectVal,
  };
}

// ── 5. Actual Causation (Halpern & Pearl 2005) ──

// 영역 cause 영역 actual effect 영역 영역 영역 → 영역 cause 영역.
// 영역 cause 영역 영역 (영역 가설), effect 영역 영역 → causal contribution 영역.
export function isActualCause(
  graph: CausalGraph,
  candidateCause: string,
  effect: string,
  effectActuallyOccurred: boolean,
): { isCause: boolean; counterfactualReasoning: string } {
  if (!effectActuallyOccurred) {
    return { isCause: false, counterfactualReasoning: 'effect 영역 영역 → cause 영역 영역' };
  }
  // 영역 cause 영역 영역 영역 effect 영역 영역 → cause 영역.
  // 단순화: if removing cause 영역 prob significantly drops → causal.
  const withCause = correlationStrength(graph, candidateCause, effect);
  const mutilated = { ...graph, edges: graph.edges.filter(e => e.cause !== candidateCause) };
  const withoutCause = correlationStrength(mutilated, candidateCause, effect);
  const delta = withCause - withoutCause;
  return {
    isCause: delta > 0.2,
    counterfactualReasoning: `with cause: ${withCause.toFixed(2)}, without: ${withoutCause.toFixed(2)}, delta=${delta.toFixed(2)}`,
  };
}

// ── 6. Counterfactual Regret (Roese 1997 psychology) ──

// 영역 알았다면 영역 행동 영역 영역 영역 영역 → regret intensity.
export function counterfactualRegret(
  actualOutcome: number,        // 0..1
  bestAvailableOutcome: number, // 0..1, 영역 영역 영역
): number {
  return Math.max(0, bestAvailableOutcome - actualOutcome);
}
