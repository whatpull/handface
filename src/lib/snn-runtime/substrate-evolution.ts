// Phase A — Substrate-Level Self-Evolution (영원 진화 완성).
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 5 단계 마지막.
// Phase D (weighted ensemble) + C (meta-plasticity) + E (EWC) + B (self-supervised
// features) 다음. open-ended evolution 시스템 영역 영역.
//
// 목표: substrate (4×4 / 5×5 / 6×6 등) 영역 hand-defined 영역 영역 영역 →
//   학습 statistics 영역 자기 spawn / merge / prune. 새 입력 distribution
//   감지 시 새 substrate 자동 생성. 영원 영역 무한 적응 가능 영역 영역.
//
// 본 모듈 영역 building blocks:
//   1. Novelty detection — 입력 distribution 영역 기존 substrate 범위 영역
//      벗어났는지 감지.
//   2. Substrate spawn proposal — input statistics 영역 영역 새 substrate
//      spec 제안 (dim, pool 크기).
//   3. Substrate prune detection — 영역 substrate (학습 실패 + 사용 안 됨)
//      영역 prune 영역 영역 영역.
//   4. Substrate merge proposal — 비슷한 substrate 두 개 영역 merge 영역
//      영역 영역.
//   5. Open-ended evolution 정체 회피 — novelty search + quality-diversity
//      + curiosity score.
//
// 학술 정합:
//   - NEAT (Stanley & Miikkulainen 2002) — Neuroevolution of Augmenting
//     Topologies.
//   - Developmental neural networks (Risi & Stanley 2014).
//   - Novelty Search (Lehman & Stanley 2008) — 새로움 자체 보상.
//   - Quality-Diversity (Pugh, Soros, Stanley 2016) — 다양성 보존 algorithm.
//   - Curiosity-Driven Exploration (Schmidhuber 1991) — 예측 오류 영역
//     탐색 가속.
//   - Bedau 1998 — Open-ended evolution criteria.

// ── 1. Input Distribution Statistics ──

export interface InputStats {
  meanActivity: number;     // average bit activation (0..1)
  activeBitCount: number;   // total active bits
  inputDim: number;
  // Spatial entropy — uniform distribution (high) vs concentrated (low).
  spatialEntropy: number;
}

// 입력 batch 영역 distribution statistics 영역 산출.
// 단순 raw bit pattern 영역 entropy + activation level 영역 영역.
export function computeInputStats(inputs: ReadonlyArray<ReadonlyArray<number>>): InputStats {
  if (inputs.length === 0 || inputs[0].length === 0) {
    return { meanActivity: 0, activeBitCount: 0, inputDim: 0, spatialEntropy: 0 };
  }
  const dim = inputs[0].length;
  let totalActive = 0;
  const positionCounts = new Array<number>(dim).fill(0);
  for (const input of inputs) {
    for (let i = 0; i < dim; i += 1) {
      if (input[i] > 0.5) {
        totalActive += 1;
        positionCounts[i] += 1;
      }
    }
  }
  const meanActivity = totalActive / (inputs.length * dim);
  const activeBitCount = Math.round(totalActive / inputs.length);

  // Spatial entropy — 각 position 영역 activation 분포 영역 Shannon entropy.
  let entropy = 0;
  for (const c of positionCounts) {
    if (c > 0) {
      const p = c / (inputs.length * dim);
      if (p > 0) entropy -= p * Math.log2(p);
    }
  }
  const maxEntropy = Math.log2(dim);
  const spatialEntropy = maxEntropy > 0 ? entropy / maxEntropy : 0;
  return { meanActivity, activeBitCount, inputDim: dim, spatialEntropy };
}

// ── 2. Novelty Detection ──

export interface SubstrateProfile {
  kind: string;
  inputDim: number;
  trainedStats: InputStats;
}

// 새 입력 영역 기존 substrate 영역 trained distribution 영역 영역 영역지 감지.
// 학술 정합: Lehman & Stanley 2008 — behavioral distance 영역 novelty.
// 입력 dim 영역 다르면 영역 novel — 새 substrate 영역 영역.
// 영역 dim 영역 entropy 영역 activity level 영역 영역 영역 차이 > threshold
//   영역 novel — distribution shift 감지.
export function detectNovelty(
  newStats: InputStats,
  existingProfiles: ReadonlyArray<SubstrateProfile>,
  threshold: number = 0.3,
): { isNovel: boolean; reason: string; maxSimilarity: number } {
  if (existingProfiles.length === 0) {
    return { isNovel: true, reason: 'no existing substrate', maxSimilarity: 0 };
  }
  let maxSim = 0;
  let closest = existingProfiles[0];
  for (const profile of existingProfiles) {
    if (profile.inputDim !== newStats.inputDim) continue; // dim 다르면 skip (자동 novel)
    const activitySim = 1 - Math.abs(newStats.meanActivity - profile.trainedStats.meanActivity);
    const entropySim = 1 - Math.abs(newStats.spatialEntropy - profile.trainedStats.spatialEntropy);
    const sim = (activitySim + entropySim) / 2;
    if (sim > maxSim) { maxSim = sim; closest = profile; }
  }
  // dim 영역 영역 substrate 영역 영역 → novel.
  const hasDimMatch = existingProfiles.some((p) => p.inputDim === newStats.inputDim);
  if (!hasDimMatch) {
    return {
      isNovel: true,
      reason: `dim=${newStats.inputDim} 영역 기존 substrate 영역 영역 (${existingProfiles.map(p => p.inputDim).join(', ')})`,
      maxSimilarity: 0,
    };
  }
  const isNovel = maxSim < (1 - threshold);
  return {
    isNovel,
    reason: isNovel
      ? `distribution shift: activity/entropy 영역 ${closest.kind} 영역 similarity=${maxSim.toFixed(2)} < ${(1 - threshold).toFixed(2)}`
      : `similar to ${closest.kind} (sim=${maxSim.toFixed(2)})`,
    maxSimilarity: maxSim,
  };
}

// ── 3. Substrate Spawn Proposal ──

export interface SubstrateSpec {
  kind: string;
  inputDim: number;
  estimatedClusters: number;     // 예상 cluster 수
  v1L4PoolSize: number;          // V1_L4 pool size 추천
  v2L5PoolSize: number;          // V2_L5 pool size 추천
  reasoning: string;
}

// Input statistics 영역 새 substrate spec 영역 제안.
// 학술 정합: NEAT 영역 augmenting topology — input characteristic 영역 적합한
//   architecture 영역 propose.
// 휴리스틱:
//   - inputDim 영역 raw + derived 영역 정합 (derived = raw 약 같은 수준).
//   - cluster 수 = expected pattern 수 (활성 bit 영역 영역 영역 영역 영역 예상).
//   - pool size = dim 영역 비례 (P218/P220 영역 영역 정합).
export function proposeSpawn(stats: InputStats, expectedPatterns: number = 8): SubstrateSpec {
  const rawDim = stats.inputDim;
  const totalDim = Math.round(rawDim * 2); // raw + derived (Phase B 영역 영역 영역 자기 학습 derived)
  const estimatedClusters = Math.max(expectedPatterns, 4);
  // Pool size — P218 영역 영역 비례. n13 32→40, n14 50→48~56, n15 72→56.
  // 영역 영역 totalDim × 0.8 (sub-linear scaling)
  const v1L4PoolSize = Math.round(totalDim * 0.8);
  const v2L5PoolSize = Math.round(totalDim * 0.45);
  return {
    kind: `auto_${rawDim}dim_${Date.now()}`,
    inputDim: totalDim,
    estimatedClusters,
    v1L4PoolSize,
    v2L5PoolSize,
    reasoning: `raw dim=${rawDim}, totalDim=${totalDim} (raw + derived), expected clusters=${estimatedClusters}, V1_L4=${v1L4PoolSize}, V2_L5=${v2L5PoolSize}`,
  };
}

// ── 4. Substrate Prune Detection ──

export interface SubstrateUsageStats {
  kind: string;
  voteWeight: number;           // Phase D weight (recall × WTA margin)
  recallCount: number;          // 이 substrate 영역 inference 호출 영역
  totalRecallCount: number;     // 전체 ensemble inference 영역
  lastUsedTimestamp: number;    // 마지막 inference 시각 (Unix ms)
}

// 약하고 사용 안 되는 substrate 영역 prune 영역 영역지 판단.
// 학술 정합: NEAT 영역 species 영역 stagnation 영역 영역 prune.
// 조건:
//   1. voteWeight < 0.10 (영역 substrate, ensemble 기여도 거의 0)
//   2. recallCount / totalRecallCount < 0.05 (사용 빈도 극히 낮음)
//   3. 마지막 사용 후 > 1 시간 (active inactive)
export function shouldPrune(
  stats: SubstrateUsageStats,
  nowTimestamp: number = Date.now(),
  inactiveThresholdMs: number = 3600 * 1000,
): { shouldPrune: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (stats.voteWeight < 0.10) reasons.push(`voteWeight=${stats.voteWeight.toFixed(2)} < 0.10`);
  const usageRatio = stats.totalRecallCount > 0 ? stats.recallCount / stats.totalRecallCount : 0;
  if (usageRatio < 0.05) reasons.push(`usage ratio=${usageRatio.toFixed(2)} < 0.05`);
  const inactiveMs = nowTimestamp - stats.lastUsedTimestamp;
  if (inactiveMs > inactiveThresholdMs) reasons.push(`inactive ${(inactiveMs / 60000).toFixed(0)}분`);
  // 3 조건 영역 영역 만족 영역 prune (모두 충족 영역 영역 영역 영역).
  return { shouldPrune: reasons.length >= 2, reasons };
}

// ── 5. Substrate Merge Proposal ──

// 두 substrate 영역 매우 비슷 (input dim 동일 + trained stats 비슷)할 때 merge.
// 학술 정합: NEAT 영역 species merge — redundancy 제거 영역 efficiency.
export function shouldMerge(
  a: SubstrateProfile,
  b: SubstrateProfile,
  similarityThreshold: number = 0.90,
): { shouldMerge: boolean; similarity: number; reason: string } {
  if (a.inputDim !== b.inputDim) {
    return { shouldMerge: false, similarity: 0, reason: 'inputDim 영역 영역' };
  }
  const activitySim = 1 - Math.abs(a.trainedStats.meanActivity - b.trainedStats.meanActivity);
  const entropySim = 1 - Math.abs(a.trainedStats.spatialEntropy - b.trainedStats.spatialEntropy);
  const sim = (activitySim + entropySim) / 2;
  return {
    shouldMerge: sim >= similarityThreshold,
    similarity: sim,
    reason: sim >= similarityThreshold
      ? `${a.kind} ↔ ${b.kind} sim=${sim.toFixed(2)} ≥ ${similarityThreshold} → merge 영역`
      : `sim=${sim.toFixed(2)} < ${similarityThreshold} → 영역 영역`,
  };
}

// ── 6. Open-Ended Evolution — Novelty Search Score ──

// 영역 behavior 영역 archived behaviors 영역 영역 영역 영역 영역 영역 영역 평균.
// 학술 정합: Lehman & Stanley 2008 — novelty score = avg distance to k nearest
//   archived behaviors. 영역 novelty score 영역 영역 새 substrate spawn 영역 영역.
export function noveltyScore(
  behavior: ReadonlyArray<number>,
  archive: ReadonlyArray<ReadonlyArray<number>>,
  k: number = 5,
): number {
  if (archive.length === 0) return 1.0; // 영역 archive → 영역 novel
  const distances: number[] = [];
  for (const past of archive) {
    if (past.length !== behavior.length) continue;
    let d = 0;
    for (let i = 0; i < behavior.length; i += 1) {
      d += (behavior[i] - past[i]) ** 2;
    }
    distances.push(Math.sqrt(d));
  }
  if (distances.length === 0) return 1.0;
  distances.sort((a, b) => a - b);
  const kNearest = distances.slice(0, Math.min(k, distances.length));
  const avgDist = kNearest.reduce((a, b) => a + b, 0) / kNearest.length;
  // Normalize: typical distance scale 영역 √dim 영역 영역 가정 → divide.
  const normalize = Math.sqrt(behavior.length);
  return Math.min(1.0, avgDist / (normalize > 0 ? normalize : 1));
}

// ── 7. Curiosity Score (예측 오류 영역 탐색 가속) ──

// 예측 오류 = |predicted output - actual output|.
// 학술 정합: Schmidhuber 1991 — large prediction error → curiosity ↑ → 탐색 가속.
// 본 시스템 정합: substrate 영역 inference 영역 영역 영역 영역 영역 영역
//   spawn 영역 영역.
export function curiosityScore(predicted: ReadonlyArray<number>, actual: ReadonlyArray<number>): number {
  if (predicted.length !== actual.length || predicted.length === 0) return 0;
  let error = 0;
  for (let i = 0; i < predicted.length; i += 1) {
    error += (predicted[i] - actual[i]) ** 2;
  }
  return Math.sqrt(error / predicted.length); // RMS error
}
