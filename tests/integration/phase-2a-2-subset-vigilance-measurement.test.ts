// Phase 2A.2 subset 인식 vigilance fix production effect 측정 (2026-06-03).
//
// 직전 fix chain (commit 4174898 → 4deb9bc → b90c103) 적용 후 사용자
// production 시나리오 시뮬레이션:
//   1. exact match (정확히 같은 cells): vigilance pass → reinforce
//   2. subset (T ⊆ I, 추가 cells 포함): vigilance pass → reinforce (신규 동작)
//   3. partial overlap (cells 일부 누락): vigilance miss → spawn
//   4. disjoint (완전 다른 cells): vigilance miss → spawn
//
// 측정 metrics:
//   - 각 시나리오 영역 inputMatch (computeExactInputMatch 결과)
//   - vigilance pass / miss 영역 ratio
//   - subset 인식 영역 production effect (직전 strict 대비 신규 pass case)
//
// 본 file 'measurement' pattern → nightly cron 분류.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink,
  SNNWorkerClient, SNNWorkerCore,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { compute72DimFeature } from '@/lib/snn-runtime/builders/n15-extended-6x6';

class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string): string | null { return this.store.get(k) ?? null; }
  setItem(k: string, v: string): void { this.store.set(k, v); }
  removeItem(k: string): void { this.store.delete(k); }
}
class InProcessTransport implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];
  constructor(private core: SNNWorkerCore) {}
  postMessage(req: unknown): void {
    const res = this.core.handle(req as WorkerRequest);
    queueMicrotask(() => { const ev = { data: res } as MessageEvent; for (const l of this.listeners) l(ev); });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l); if (i >= 0) this.listeners.splice(i, 1);
  }
  terminate(): void { this.listeners = []; }
}

function rawToFullActive(raw: number[]): number[] {
  const raw36 = new Array<number>(36).fill(0);
  for (const i of raw) raw36[i] = 1;
  const full72 = compute72DimFeature(raw36);
  const active: number[] = [];
  for (let i = 0; i < full72.length; i += 1) if (full72[i] > 0.5) active.push(i);
  return active;
}

function applyForceDisjoint(patterns: number[][]): number[][] {
  const claimed = new Set<number>();
  const result: number[][] = [];
  for (const pattern of patterns) {
    const filtered = pattern.filter((i) => !claimed.has(i));
    const final = filtered.length > 0 ? filtered : pattern.slice();
    for (const i of final) claimed.add(i);
    result.push(final);
  }
  return result;
}

// 4 base patterns (6×6 grid raw cells).
const BASE_PATTERNS = [
  [0, 1, 2, 3, 4, 5],         // c0 row 0
  [0, 6, 12, 18, 24, 30],     // c1 col 0
  [0, 7, 14, 21, 28, 35],     // c2 diag-back
  [5, 10, 15, 20, 25, 30],    // c3 diag-fore
];

// Test scenarios — 사용자 production 영역 발생 가능한 패턴 영역 시나리오.
interface TestScenario {
  name: string;
  description: string;
  rawCells: number[];          // 사용자가 그린 raw cells
  expectedVsCluster: number;   // 비교 대상 cluster id (0~3)
  expectedRelationship: 'exact' | 'subset' | 'superset' | 'partial' | 'disjoint';
}

const SCENARIOS: TestScenario[] = [
  // 1. Exact match — 정확히 같은 cells.
  {
    name: 'exact-c0',
    description: 'c0 (row 0) 와 정확히 같은 cells 그림 → vigilance pass (exact)',
    rawCells: [0, 1, 2, 3, 4, 5],
    expectedVsCluster: 0,
    expectedRelationship: 'exact',
  },
  // 2. Subset — cluster cells + 추가 cells (사용자가 약간 더 그림).
  {
    name: 'subset-c0-plus-1',
    description: 'c0 cells + 1개 추가 cell → vigilance pass (subset, commit b90c103 신규)',
    rawCells: [0, 1, 2, 3, 4, 5, 6],
    expectedVsCluster: 0,
    expectedRelationship: 'subset',
  },
  {
    name: 'subset-c3-plus-2',
    description: 'c3 (diag-fore) cells + 2개 추가 cells → vigilance pass (subset)',
    rawCells: [5, 10, 15, 20, 25, 30, 11, 16],
    expectedVsCluster: 3,
    expectedRelationship: 'subset',
  },
  // 3. Partial — cells 일부 누락 (superset 영역 사용자 영역 의도).
  {
    name: 'partial-c0-missing-1',
    description: 'c0 cells 영역 1개 누락 → vigilance miss → spawn',
    rawCells: [0, 1, 2, 3, 4],
    expectedVsCluster: 0,
    expectedRelationship: 'superset',
  },
  // 4. Disjoint — 완전 다른 cells.
  {
    name: 'disjoint-bottom-row',
    description: 'bottom row (c0~c3 와 무관) → vigilance miss → spawn',
    rawCells: [30, 31, 32, 33, 34, 35],
    expectedVsCluster: -1,
    expectedRelationship: 'disjoint',
  },
];

interface ScenarioResult {
  scenario: TestScenario;
  patternFeatures: number[];
  clusterRaws: number[][];
  intersections: number[];
  inputMatches: number[];
  winnerCluster: number;
  winnerInputMatch: number;
  classification: 'pass-exact' | 'pass-subset' | 'miss-spawn';
}

// compute72DimFeature output 영역 cluster 영역 inputMatch 영역 정합 영역
// (vigilance check 영역 동일 path).
function computeExactInputMatch(intersection: number, inputSize: number, templateSize: number): number {
  // commit b90c103 (subset 인식 추가).
  if (templateSize > 0 && intersection === templateSize) return 1.0;
  if (inputSize !== templateSize) return 0;
  if (intersection !== inputSize) return 0;
  return 1.0;
}

describe('Phase 2A.2 subset 인식 vigilance production effect (2026-06-03)', () => {
  it('★ 사용자 시나리오별 vigilance pass / miss + subset 인식 효과 측정', async () => {
    // 4 cluster build (forceDisjoint 적용 영역 production 정합).
    const baseFullActive = BASE_PATTERNS.map(rawToFullActive);
    const disjoint = applyForceDisjoint(baseFullActive);

    // cluster slot 영역 rawActiveInputs (commit 4deb9bc): forceDisjoint 전
    // candidate 보존. vigilance check 영역 사용.
    const clusterRaws = baseFullActive; // forceDisjoint 전 candidate

    const core = new SNNWorkerCore();
    const transport = new InProcessTransport(core);
    const client = new SNNWorkerClient(transport);
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'subset-vig-meas' });
    const lab = new LocalSNN({
      netId: 'subset-vig-meas', client, sink, seed: 42,
      clusterActiveInputs: disjoint, preset: 'n15_extended_6x6',
    });
    await lab.init();

    // 각 cluster 학습 (production fix 영역 정합).
    for (let ci = 0; ci < 4; ci += 1) {
      const rounds = ci === 0 ? 30 : 90;
      for (let r = 0; r < rounds; r += 1) {
        await client.inject(
          disjoint[ci].map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
        );
        await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
      }
    }
    await lab.save();

    // 각 시나리오 평가.
    const results: ScenarioResult[] = [];
    for (const scenario of SCENARIOS) {
      const fullActive = rawToFullActive(scenario.rawCells);
      const intersections: number[] = [];
      const inputMatches: number[] = [];
      let winnerCluster = -1;
      let winnerInputMatch = 0;

      for (let ci = 0; ci < clusterRaws.length; ci += 1) {
        const templateRaw = clusterRaws[ci]; // commit 4deb9bc — raw 사용
        const patternSet = new Set(fullActive);
        let intersection = 0;
        for (const ai of templateRaw) if (patternSet.has(ai)) intersection += 1;
        const im = computeExactInputMatch(intersection, fullActive.length, templateRaw.length);
        intersections.push(intersection);
        inputMatches.push(im);
        if (im > winnerInputMatch) {
          winnerInputMatch = im;
          winnerCluster = ci;
        }
      }

      const classification: ScenarioResult['classification'] =
        winnerInputMatch === 1.0
          ? (fullActive.length === clusterRaws[winnerCluster]?.length && intersections[winnerCluster] === fullActive.length
              ? 'pass-exact'
              : 'pass-subset')
          : 'miss-spawn';

      results.push({
        scenario, patternFeatures: fullActive, clusterRaws,
        intersections, inputMatches, winnerCluster, winnerInputMatch, classification,
      });
    }

    // Aggregate metrics.
    const summary = {
      total: results.length,
      passExact: results.filter((r) => r.classification === 'pass-exact').length,
      passSubset: results.filter((r) => r.classification === 'pass-subset').length,
      missSpawn: results.filter((r) => r.classification === 'miss-spawn').length,
      subsetRecoveredCount: results.filter((r) =>
        r.classification === 'pass-subset' && r.scenario.expectedRelationship === 'subset'
      ).length,
    };

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-2-subset-vigilance.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-2-subset-vigilance-effect',
      substrate: 'n15_extended_6x6 (72-dim)',
      productionFix: [
        'commit 4174898: Phase 2A.2 substrate 6×6',
        'commit 4deb9bc: rawActiveInputs 별도 store',
        'commit b90c103: subset 인식 추가 (T ⊆ I → 1.0)',
      ],
      basePatterns: BASE_PATTERNS,
      clusterRaws,
      results: results.map((r) => ({
        name: r.scenario.name,
        description: r.scenario.description,
        rawCells: r.scenario.rawCells,
        expectedRelationship: r.scenario.expectedRelationship,
        patternFeatures: r.patternFeatures,
        inputMatches: r.inputMatches,
        winnerCluster: r.winnerCluster,
        winnerInputMatch: r.winnerInputMatch,
        classification: r.classification,
      })),
      summary,
      subsetVerdict: summary.subsetRecoveredCount === results.filter((r) => r.scenario.expectedRelationship === 'subset').length
        ? '✓ subset 인식 모두 vigilance pass — commit b90c103 production effect 정합'
        : '⚠ subset case 영역 영역 vigilance miss — 추가 분석 필요',
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 2A.2 subset 인식 vigilance production effect ====');
    for (const r of results) {
      const tag = r.classification === 'pass-exact' ? '✓ EXACT' :
                  r.classification === 'pass-subset' ? '✓ SUBSET' : '✗ MISS';
      console.log(`  ${tag} ${r.scenario.name}: winner=c${r.winnerCluster} match=${r.winnerInputMatch.toFixed(3)}`);
    }
    console.log('');
    console.log(`Summary: ${summary.passExact} exact + ${summary.passSubset} subset + ${summary.missSpawn} miss = ${summary.total}`);
    console.log(`Subset recovered: ${summary.subsetRecoveredCount} / ${SCENARIOS.filter((s) => s.expectedRelationship === 'subset').length} subset scenarios`);
    console.log('');

    expect(summary.total).toBe(SCENARIOS.length);
    expect(summary.passSubset).toBeGreaterThan(0); // subset 인식 영역 적용 확인
  }, 600_000);
});
