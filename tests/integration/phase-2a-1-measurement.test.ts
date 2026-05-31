// Phase 2A.1 verification measurement (사용자 catch 2026-05-31).
//
// 사용자 production capture 영역 자동화 replacement — production console log
// (CPM-1 + CFM-1) 영역 측정값 영역 headless 영역 동일 시나리오 영역 직접 산출.
//
// 시나리오 (Verification Guide §2 영역 fresh reset 후 4 패턴 학습 등가):
//   1. n14_extended substrate build + 4 cluster (orientation-5x5 preset 정합)
//   2. 각 cluster 영역 R-STDP train (production 의 vigilance + auto-learn 등가)
//   3. CPM-1: clusterPoolUsage RPC → inputDim / per-cluster sub-pool / K×K Jaccard
//   4. CFM-1: noise-perturbed self-verify (N=5/cluster, σ=0.05) → confusion matrix
//   5. 측정 결과 영역 JSON artifact + Guide §3 expected metrics 영역 비교 출력
//
// 본 file 영역 nightly-rd.yml 영역 분류 — 파일명 영역 'measurement' 패턴
// 영역 vitest.config.ts RD_TEST_PATTERNS 영역 자동 매칭. push verify 영역 0
// (CI deploy time 5분 보존, feedback_ci_deploy_time_preservation 정합).
//
// 학술 정합:
//   - Carpenter & Grossberg 1987 ART vigilance — cluster spawn + disjoint
//   - Bishop 1995 noise-perturbed evaluation — generalization estimate
//   - Diehl & Cook 2015 STDP topology-fixed weight robustness

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink,
  N14Pools,
  SNNWorkerClient, SNNWorkerCore,
  buildClusterRegistryFromN13,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { compute50DimFeature } from '@/lib/snn-runtime/builders/n14-extended';
import { SeededGaussian, addFeatureNoise } from '@/lib/snn-runtime/hand-noise';
import { wtaWinner } from '@/lib/snn-runtime/self-supervised';

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
    queueMicrotask(() => {
      const ev = { data: res } as MessageEvent;
      for (const l of this.listeners) l(ev);
    });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l);
    if (i >= 0) this.listeners.splice(i, 1);
  }
  terminate(): void { this.listeners = []; }
}

// 사용자 production observation 영역 actual 4 패턴 raw cells (production
// log catch 2026-05-31, run #514) — raw 5×5 cell index (5-element each):
//   c0: row 0 horizontal [0,1,2,3,4]
//   c1: col 0 vertical [0,5,10,15,20]
//   c2: diag-back [0,6,12,18,24]
//   c3: diag-fore [4,8,12,16,20]
const PHASE_2A_1_RAW_PATTERNS_5X5: number[][] = [
  [0, 1, 2, 3, 4],       // c0 row 0 horizontal
  [0, 5, 10, 15, 20],    // c1 col 0 vertical
  [0, 6, 12, 18, 24],    // c2 diag-back
  [4, 8, 12, 16, 20],    // c3 diag-fore
];

// Production 영역 cluster slot.activeInputs 영역 raw 5 + derived 영역 포함
// — compute50DimFeature 영역 산출 영역 50-dim full feature 영역 active idx.
// 본 값 영역 clusterActiveInputs 영역 전달 → worker.clusterPoolUsage 영역
// production 영역 정합 sub-pool size 영역 (production log catch:
//   c0: [0,1,2,3,4,25] 6 features
//   c1: [0,5,10,15,20,30] 6 features
//   c2: [0,6,12,18,24,39,43,49] 8 features
//   c3: [4,8,12,16,20,40,43,49] 8 features
//   sum unique = 21 / 50 (42%)).
function rawToFullActive(raw: number[]): number[] {
  const raw25 = new Array<number>(25).fill(0);
  for (const i of raw) raw25[i] = 1;
  const full50 = compute50DimFeature(raw25);
  const active: number[] = [];
  for (let i = 0; i < full50.length; i += 1) if (full50[i] > 0.5) active.push(i);
  return active;
}
const PHASE_2A_1_FULL_ACTIVE_5X5: number[][] = PHASE_2A_1_RAW_PATTERNS_5X5.map(rawToFullActive);

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

interface PerClusterCpm {
  clusterId: number;
  subPoolSize: number;
  subPoolPct: number;
  activeInputs: number[];
}

interface Cpm1Result {
  inputDim: number;
  totalClaimedFeatures: number;
  totalClaimedPct: number;
  perCluster: PerClusterCpm[];
  overlapMatrix: number[][];
  jaccardMaxOffDiagonal: number;
  jaccardMaxPair: [number, number];
}

interface Cfm1Result {
  matrix: number[][];
  perPatternAccuracy: Array<{ clusterId: number; correct: number; total: number; accuracy: number }>;
  totalAccuracy: number;
}

describe('Phase 2A.1 measurement (사용자 catch 2026-05-31 — Verification Guide §3)', () => {
  it('★ orientation-5x5 (n14_extended) 영역 CPM-1 + CFM-1 직접 측정', async () => {
    const core = new SNNWorkerCore();
    const transport = new InProcessTransport(core);
    const client = new SNNWorkerClient(transport);
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'phase-2a-1-measurement' });
    const lab = new LocalSNN({
      netId: 'phase-2a-1',
      client,
      sink,
      seed: 42,
      clusterActiveInputs: PHASE_2A_1_FULL_ACTIVE_5X5,
      preset: 'n14_extended',
    });
    await lab.init();

    // R-STDP train (production 영역 vigilance + auto-learn 30 reinforce 등가).
    for (const inputs of PHASE_2A_1_FULL_ACTIVE_5X5) {
      await client.inject(
        inputs.map((i) => ({
          neuron: `in_feat_${i}`, weight: 30,
          time: 0, durationMs: 80, stepMs: 0.1,
        })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }
    await lab.save();

    // CPM-1: clusterPoolUsage RPC 영역 직접 호출.
    const usage = await client.clusterPoolUsage();
    let jaccardMax = 0;
    let jaccardPair: [number, number] = [-1, -1];
    for (let i = 0; i < usage.overlapMatrix.length; i += 1) {
      for (let j = 0; j < usage.overlapMatrix[i].length; j += 1) {
        if (i === j) continue;
        if (usage.overlapMatrix[i][j] > jaccardMax) {
          jaccardMax = usage.overlapMatrix[i][j];
          jaccardPair = [i, j];
        }
      }
    }
    const cpm1: Cpm1Result = {
      inputDim: usage.inputDim,
      totalClaimedFeatures: usage.totalClaimedFeatures,
      totalClaimedPct: usage.inputDim > 0 ? usage.totalClaimedFeatures / usage.inputDim : 0,
      perCluster: usage.perCluster.map((c) => ({
        clusterId: c.clusterId,
        subPoolSize: c.subPoolSize,
        subPoolPct: usage.inputDim > 0 ? c.subPoolSize / usage.inputDim : 0,
        activeInputs: c.activeInputs,
      })),
      overlapMatrix: usage.overlapMatrix,
      jaccardMaxOffDiagonal: jaccardMax,
      jaccardMaxPair: jaccardPair,
    };

    // CFM-1: noise-perturbed self-verify (production NodeLearn 등가).
    // σ=0.05 feature-noise, N=5/cluster — Goodfellow 2014 정합.
    const SAMPLES_PER_CLUSTER = 5;
    const FEATURE_NOISE_SIGMA = 0.05;
    const baseSeed = 3000;
    const N = PHASE_2A_1_FULL_ACTIVE_5X5.length;
    const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

    const reg = buildClusterRegistryFromN13(PHASE_2A_1_FULL_ACTIVE_5X5, 'n14_extended');
    for (let ci = 0; ci < N; ci += 1) {
      // raw 25-dim pattern → 50-dim feature (production lastFeature 등가).
      // raw cell indices 영역 0..24 — derived features 영역 compute50DimFeature
      // 영역 산출 영역 RAW_PATTERNS 영역 사용 (FULL_ACTIVE 영역 25+ derived idx
      // 영역 raw25 size out-of-bounds).
      const raw25 = new Array<number>(25).fill(0);
      for (const idx of PHASE_2A_1_RAW_PATTERNS_5X5[ci]) raw25[idx] = 1;
      const fullFeat50 = compute50DimFeature(raw25);

      const gaussian = new SeededGaussian(baseSeed + ci * 1000);
      for (let s = 0; s < SAMPLES_PER_CLUSTER; s += 1) {
        const noisy = addFeatureNoise(fullFeat50, FEATURE_NOISE_SIGMA, gaussian);
        // 추론: noisy feature 영역 inject + run (STDP off) + cluster rate 영역 winner.
        const activeIdx: number[] = [];
        for (let k = 0; k < noisy.length; k += 1) if (noisy[k] > 0.5) activeIdx.push(k);
        await client.inject(
          activeIdx.map((i) => ({
            neuron: `in_feat_${i}`, weight: 25,
            time: 0, durationMs: 50, stepMs: 0.1,
          })),
        );
        await client.run({ durationMs: 80, dtMs: 0.1, stdpEnabled: false });

        const clusterRates: number[] = [];
        for (const slot of reg.slots) {
          const result = await client.firingRates({ names: slot.out, windowMs: 80 });
          let sum = 0;
          for (const r of result.rates) sum += r.hz;
          clusterRates.push(sum / N14Pools.OUT_PER_CLUSTER);
        }
        const predicted = wtaWinner(clusterRates);
        if (predicted >= 0 && predicted < N) matrix[ci][predicted] += 1;
      }
    }
    let diagonalSum = 0;
    let totalSum = 0;
    const perPatternAccuracy: Cfm1Result['perPatternAccuracy'] = [];
    for (let i = 0; i < N; i += 1) {
      const correct = matrix[i][i];
      perPatternAccuracy.push({
        clusterId: i,
        correct,
        total: SAMPLES_PER_CLUSTER,
        accuracy: correct / SAMPLES_PER_CLUSTER,
      });
      diagonalSum += correct;
      totalSum += SAMPLES_PER_CLUSTER;
    }
    const cfm1: Cfm1Result = {
      matrix,
      perPatternAccuracy,
      totalAccuracy: totalSum > 0 ? diagonalSum / totalSum : 0,
    };

    // Verification Guide §3 expected vs measured 비교.
    const expected = {
      'sub-pool capacity': '25-35/50 (50-70%)',
      'jaccard max off-diagonal': '< 0.3-0.5',
      'recognition accuracy noisy': '>= 90%',
    };
    const measured = {
      'sub-pool capacity': `${cpm1.totalClaimedFeatures}/${cpm1.inputDim} (${(cpm1.totalClaimedPct * 100).toFixed(0)}%)`,
      'jaccard max off-diagonal': cpm1.jaccardMaxOffDiagonal.toFixed(3),
      'recognition accuracy noisy': `${(cfm1.totalAccuracy * 100).toFixed(0)}%`,
    };

    // H2/H3/H4 mitigation 판정 (Verification Guide §4).
    const h2Mitigated = cpm1.totalClaimedPct >= 0.5 && cpm1.totalClaimedPct <= 0.7;
    const h2BelowExpected = cpm1.totalClaimedPct < 0.5;
    const h4Mitigated = cpm1.jaccardMaxOffDiagonal < 0.5;
    const h3Mitigated = cfm1.totalAccuracy >= 0.9;

    const measurement = {
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-orientation-5x5-verification',
      substrate: 'n14_extended',
      seed: 42,
      rawPatterns: PHASE_2A_1_RAW_PATTERNS_5X5,
      fullActivePatterns: PHASE_2A_1_FULL_ACTIVE_5X5,
      cpm1,
      cfm1,
      verificationGuide: { expected, measured },
      hypothesisMitigation: {
        h2_subPoolExhaustion: {
          mitigated: h2Mitigated,
          belowExpected: h2BelowExpected,
          subPoolPct: cpm1.totalClaimedPct,
          note: h2BelowExpected
            ? '50% 미만 — substrate 영역 capacity 영역 disjoint sub-pool 영역 너무 sparse 영역 cluster 영역 영역 영역 영역 (potential under-utilization)'
            : h2Mitigated
              ? 'Guide expected 50-70% 영역 mitigated'
              : '70% 초과 — sub-pool exhaustion 영역 미완화',
        },
        h4_sparseCodeOverlap: {
          mitigated: h4Mitigated,
          jaccardMax: cpm1.jaccardMaxOffDiagonal,
          pair: cpm1.jaccardMaxPair,
          note: h4Mitigated
            ? 'Guide expected < 0.5 영역 mitigated'
            : '0.5 이상 — sparse code overlap 영역 미완화',
        },
        h3_catastrophicForgetting: {
          mitigated: h3Mitigated,
          accuracy: cfm1.totalAccuracy,
          note: h3Mitigated
            ? 'Guide expected >= 90% noisy 영역 mitigated'
            : '90% 미만 — noisy 영역 generalization 영역 부족',
        },
      },
    };
    saveMeasurement('hand-snn-phase-2a-1-verification', measurement);

    // Console 영역 measurement 영역 요약 출력 (사용자 production console 등가).
    console.log('');
    console.log('==== Phase 2A.1 Verification Measurement ====');
    console.log(`substrate: n14_extended (orientation-5x5, 50-dim feature)`);
    console.log(`patterns: ${PHASE_2A_1_FULL_ACTIVE_5X5.length} cluster`);
    console.log('');
    console.log('-- CPM-1 (cluster pool usage) --');
    console.log(`  inputDim=${cpm1.inputDim} totalClaimed=${cpm1.totalClaimedFeatures}/${cpm1.inputDim} (${(cpm1.totalClaimedPct * 100).toFixed(0)}%)`);
    for (const c of cpm1.perCluster) {
      console.log(`  cluster ${c.clusterId}: ${c.subPoolSize}/${cpm1.inputDim} (${(c.subPoolPct * 100).toFixed(0)}%) activeInputs=[${c.activeInputs.join(',')}]`);
    }
    console.log(`  Jaccard max off-diagonal: ${cpm1.jaccardMaxOffDiagonal.toFixed(3)} between c${cpm1.jaccardMaxPair[0]} & c${cpm1.jaccardMaxPair[1]}`);
    console.log(`  full K×K Jaccard matrix:`);
    for (let i = 0; i < cpm1.overlapMatrix.length; i += 1) {
      console.log(`    ${cpm1.overlapMatrix[i].map((v) => v.toFixed(3)).join('  ')}`);
    }
    console.log('');
    console.log('-- CFM-1 (noisy self-verify σ=0.05, N=5/cluster) --');
    console.log(`  total accuracy: ${(cfm1.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`  per-pattern breakdown:`);
    for (const p of cfm1.perPatternAccuracy) {
      console.log(`    cluster ${p.clusterId}: ${p.correct}/${p.total} (${(p.accuracy * 100).toFixed(0)}%)`);
    }
    console.log('');
    console.log('-- Verification Guide §3 expected vs measured --');
    for (const k of Object.keys(expected) as Array<keyof typeof expected>) {
      console.log(`  ${k}: expected ${expected[k]} → measured ${measured[k]}`);
    }
    console.log('');
    console.log('-- Hypothesis mitigation (Guide §4) --');
    console.log(`  H2 (sub-pool exhaustion): ${h2Mitigated ? '✓ mitigated' : h2BelowExpected ? '↓ below expected (under-utilization)' : '✗ not mitigated'}`);
    console.log(`  H3 (catastrophic forgetting): ${h3Mitigated ? '✓ mitigated' : '✗ not mitigated'}`);
    console.log(`  H4 (sparse code overlap): ${h4Mitigated ? '✓ mitigated' : '✗ not mitigated'}`);
    console.log('==============================================');
    console.log('');

    // 최소 검증 — measurement 영역 valid (실제 값 영역 outcome 영역 분석 영역 별도).
    expect(cpm1.inputDim).toBe(50);
    expect(cpm1.perCluster).toHaveLength(PHASE_2A_1_FULL_ACTIVE_5X5.length);
    expect(cfm1.matrix).toHaveLength(PHASE_2A_1_FULL_ACTIVE_5X5.length);
  }, 120_000);
});
