// Phase M — Creativity (완벽한 인공지능 8 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 8 단계.
// Phase L Language 다음 — 창의성 / 신규 idea 생성.
//
// 학술 정합:
//   - Boden 2004 — The Creative Mind: combinatorial / exploratory / transformational.
//   - Mednick 1962 — Remote Associates Theory.
//   - Guilford 1967 — Divergent thinking.
//   - Sternberg 1985 — Triarchic theory (creative intelligence).
//   - Wiggins 2006 — Computational creativity framework.

// ── 1. Combinatorial Creativity (Boden 2004) ──

// 영역 existing concept 영역 새로운 영역 영역 → 새 concept 생성.
// 학술 정합: Mednick 1962 — remote associates.
export interface ConceptBlend {
  parents: string[];
  childConcept: string;
  novelty: number;       // 0..1
  appropriateness: number; // 0..1 — meaningful 영역
}

// 두 개 영역 영역 concept 영역 blend (Fauconnier & Turner 2002 conceptual blending).
export function blendConcepts(
  a: string, b: string,
  conceptDistance: number, // 0..1 — 영역 영역 영역 영역 distance
): ConceptBlend {
  // 영역 distance 영역 → 영역 novelty + 영역 appropriateness (trade-off).
  return {
    parents: [a, b],
    childConcept: `${a}_${b}`,
    novelty: conceptDistance,
    appropriateness: 1 - conceptDistance,
  };
}

// 영역 candidate blend 영역 best balance (novelty × appropriateness) 영역.
// 학술 정합: Boden 2004 — creative product = novel + useful.
export function pickBestBlend(
  blends: ReadonlyArray<ConceptBlend>,
): ConceptBlend | null {
  if (blends.length === 0) return null;
  let best = blends[0];
  let bestScore = best.novelty * best.appropriateness;
  for (let i = 1; i < blends.length; i += 1) {
    const score = blends[i].novelty * blends[i].appropriateness;
    if (score > bestScore) { bestScore = score; best = blends[i]; }
  }
  return best;
}

// ── 2. Exploratory Creativity (Boden 2004) ──

// 영역 conceptual space 영역 unexplored region 영역 영역.
// 학술 정합: Lehman & Stanley 2008 — novelty search (Phase A 정합).
export interface ConceptualSpace {
  explored: ReadonlyArray<number[]>; // 영역 visited point in space
  dimensions: number;
}

// 새 point 영역 가장 가까운 explored point 까지 distance 영역.
export function explorationNovelty(
  point: ReadonlyArray<number>,
  space: ConceptualSpace,
): number {
  if (space.explored.length === 0) return 1.0;
  let minDist = Infinity;
  for (const past of space.explored) {
    let d = 0;
    for (let i = 0; i < Math.min(point.length, past.length); i += 1) {
      d += (point[i] - past[i]) ** 2;
    }
    const dist = Math.sqrt(d);
    if (dist < minDist) minDist = dist;
  }
  const normalize = Math.sqrt(space.dimensions);
  return Math.min(1.0, minDist / (normalize > 0 ? normalize : 1));
}

// ── 3. Transformational Creativity ──

// 영역 conceptual space 영역 영역 영역 변형 — paradigm shift.
// 학술 정합: Boden 2004 transformational — 영역 영역 영역 영역 영역 새 공간 영역.
export interface SpaceTransformation {
  oldDimensions: number;
  newDimensions: number;
  reason: string;
}

// 영역 trigger: existing space exhausted (모든 영역 영역 영역) → 새 dim 추가.
export function proposeTransformation(
  exploredRatio: number, // 0..1 — 얼마나 영역
  currentDimensions: number,
): SpaceTransformation | null {
  if (exploredRatio < 0.9) return null; // 영역 영역 영역 영역 → 영역 영역 영역
  return {
    oldDimensions: currentDimensions,
    newDimensions: currentDimensions + 1, // 영역 dim 추가 (paradigm shift)
    reason: `space ${(exploredRatio * 100).toFixed(0)}% explored → 영역 dimension 추가`,
  };
}

// ── 4. Divergent Thinking (Guilford 1967) ──

// 영역 prompt 영역 영역 다양한 응답 영역 (영역 답 영역 영역).
// 학술 정합: Guilford 1967 — fluency / flexibility / originality / elaboration.
export interface DivergentResponse {
  ideas: string[];
  fluency: number;        // 영역 idea 영역
  flexibility: number;    // 영역 카테고리 영역
  originality: number;    // 영역 영역 idea 영역
}

export function evaluateDivergentThinking(
  ideas: ReadonlyArray<string>,
  categorizer: (idea: string) => string,
  commonalityMap: ReadonlyMap<string, number>, // idea → 영역 빈도 (common 영역)
): DivergentResponse {
  const categories = new Set<string>();
  let rare = 0;
  for (const idea of ideas) {
    categories.add(categorizer(idea));
    const commonality = commonalityMap.get(idea) ?? 0;
    if (commonality < 0.1) rare += 1; // 영역 영역 idea
  }
  return {
    ideas: [...ideas],
    fluency: ideas.length,
    flexibility: categories.size,
    originality: ideas.length > 0 ? rare / ideas.length : 0,
  };
}

// ── 5. Creative Insight (Aha! moment) ──

// 영역 영역 영역 → 갑자기 영역 결합 영역 영역 → insight.
// 학술 정합: Köhler 1925 — productive thinking (Gestalt).
export interface InsightEvent {
  problem: string;
  solution: string;
  remoteConnection: { from: string; to: string; conceptualLeap: number };
}

// 영역 unrelated concepts 영역 영역 영역 영역 → 영역 insight.
export function generateInsight(
  problem: string,
  remoteConceptA: string, remoteConceptB: string,
  conceptualDistance: number,
  solution: string,
): InsightEvent {
  return {
    problem,
    solution,
    remoteConnection: { from: remoteConceptA, to: remoteConceptB, conceptualLeap: conceptualDistance },
  };
}

// Insight quality — distance 영역 + appropriateness 영역.
export function insightQuality(insight: InsightEvent, solutionFitness: number): number {
  return insight.remoteConnection.conceptualLeap * solutionFitness;
}
