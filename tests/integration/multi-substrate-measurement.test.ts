// 자동 측정 mandate (사용자 2026-05-25) — 다중 substrate (4×4 + 5×5 + 6×6)
// 영역 영역 실제 SNN 시뮬레이션 + Mega ensemble weighted vote 검증.
//
// 시나리오:
//   1. 4×4 substrate (n13_orientation) — 4 패턴
//   2. 5×5 substrate (n14_extended) — 4 패턴
//   3. 6×6 substrate (n15_extended_6x6) — 4 패턴
//   4. Phase D — 영역 substrate 영역 weight 산출 → weighted vote ensemble
//   5. 영역 결과 JSON 영역 저장

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink,
  N13Pools, N14Pools,
  SNNWorkerClient, SNNWorkerCore,
  buildClusterRegistryFromN13,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { N15Pools } from '@/lib/snn-runtime/builders/n15-extended-6x6';
import { wtaWinner } from '@/lib/snn-runtime/self-supervised';
import { weightedMajorityVote } from '@/lib/research/p219-hybrid';
import { analyzeClusterMap, tuneHyperparameters } from '@/lib/snn-runtime/meta-plasticity';

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

// 4 paired 활성 input set — 영역 substrate dim 영역 정합.
const ACTIVE_4X4 = [
  [4, 5, 6, 7],   // H (4×4 row 1)
  [1, 5, 9, 13],  // V (4×4 col 1)
  [0, 5, 10, 15], // MainDiag
  [3, 6, 9, 12],  // AntiDiag
];
const ACTIVE_5X5 = [
  [0, 1, 2, 3, 4],       // top row (cells 0-4)
  [0, 5, 10, 15, 20],    // left col
  [0, 6, 12, 18, 24],    // main diag
  [4, 8, 12, 16, 20],    // anti diag
];
const ACTIVE_6X6 = [
  [0, 1, 2, 3, 4, 5],     // top row (cells 0-5)
  [0, 6, 12, 18, 24, 30], // left col
  [0, 7, 14, 21, 28, 35], // main diag
  [5, 10, 15, 20, 25, 30],// anti diag
];

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

interface MeasureResult {
  recall: number;
  avgMargin: number;
  weight: number;
  clusterMap: number[];
  cleanWinners: number[];
}

async function trainAndMeasureSubstrate(
  preset: 'n13_orientation' | 'n14_extended' | 'n15_extended_6x6',
  activeInputs: number[][],
  netId: string,
  seed: number,
  pools: { OUT_PER_CLUSTER: number },
): Promise<MeasureResult> {
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: 'measure' });
  const lab = new LocalSNN({ netId, client, sink, seed, clusterActiveInputs: activeInputs, preset });
  await lab.init();

  // Sequential STDP train.
  for (const inputs of activeInputs) {
    await client.inject(
      inputs.map((i) => ({
        neuron: `in_feat_${i}`, weight: 30,
        time: 0, durationMs: 80, stepMs: 0.1,
      })),
    );
    await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
  }
  await lab.save();

  // Trained inference.
  const reg = buildClusterRegistryFromN13(activeInputs, preset);
  const cleanWinners: number[] = [];
  let marginSum = 0;
  const clusterMap: number[] = [];

  for (let ci = 0; ci < activeInputs.length; ci += 1) {
    await client.inject(
      activeInputs[ci].map((i) => ({
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
      clusterRates.push(sum / pools.OUT_PER_CLUSTER);
    }
    const winner = wtaWinner(clusterRates);
    const sorted = [...clusterRates].sort((a, b) => b - a);
    const margin = sorted[0] > 0 ? (sorted[0] - (sorted[1] ?? 0)) / sorted[0] : 0;
    cleanWinners.push(winner);
    clusterMap.push(winner);
    marginSum += margin;
  }

  let correctCount = 0;
  for (let i = 0; i < cleanWinners.length; i += 1) {
    if (cleanWinners[i] === i) correctCount += 1;
  }
  const recall = correctCount / activeInputs.length;
  const avgMargin = marginSum / activeInputs.length;
  return { recall, avgMargin, weight: recall * avgMargin, clusterMap, cleanWinners };
}

describe('Multi-Substrate Measurement (자동 측정 mandate 2026-05-25)', () => {
  it('★ 3 substrate (4×4 + 5×5 + 6×6) 영역 영역 실제 SNN 측정 + Phase D weighted ensemble', async () => {
    const measure4 = await trainAndMeasureSubstrate(
      'n13_orientation', ACTIVE_4X4, 'meas-4x4', 57, N13Pools,
    );
    const measure5 = await trainAndMeasureSubstrate(
      'n14_extended', ACTIVE_5X5, 'meas-5x5', 86, N14Pools,
    );
    const measure6 = await trainAndMeasureSubstrate(
      'n15_extended_6x6', ACTIVE_6X6, 'meas-6x6', 1, N15Pools,
    );

    // Phase D — 3-sub weighted ensemble (single round per pattern).
    const N = ACTIVE_4X4.length;
    const weights = [measure4.weight, measure5.weight, measure6.weight];

    let weightedCorrect = 0;
    let uniformCorrect = 0;
    for (let i = 0; i < N; i += 1) {
      const preds = [measure4.cleanWinners[i], measure5.cleanWinners[i], measure6.cleanWinners[i]];
      const margs = [measure4.avgMargin, measure5.avgMargin, measure6.avgMargin];
      const w = weightedMajorityVote(preds, margs, weights);
      const u = weightedMajorityVote(preds, margs, [1, 1, 1]);
      if (w === i) weightedCorrect += 1;
      if (u === i) uniformCorrect += 1;
    }
    const ensembleWeighted = weightedCorrect / N;
    const ensembleUniform = uniformCorrect / N;

    // Phase C meta-plasticity suggestion 시나리오.
    const baseHP = { vigilance: 0.15, v1L4Weight: 11.0, v2L5OutWeight: 16.0 };
    const tuning6x6 = tuneHyperparameters(
      { ...baseHP, v1L4Weight: 14.0 }, // 6×6 hand-tuned baseline
      {
        recall: measure6.recall, noise: 0.5, partial: 0.5,
        wtaMargin: measure6.avgMargin,
        ...analyzeClusterMap(measure6.clusterMap),
      },
    );

    const measurement = {
      timestamp: new Date().toISOString(),
      scenario: 'multi-substrate-3sub-ensemble',
      substrates: {
        '4x4': { recall: measure4.recall, margin: measure4.avgMargin, weight: measure4.weight, clusterMap: measure4.clusterMap },
        '5x5': { recall: measure5.recall, margin: measure5.avgMargin, weight: measure5.weight, clusterMap: measure5.clusterMap },
        '6x6': { recall: measure6.recall, margin: measure6.avgMargin, weight: measure6.weight, clusterMap: measure6.clusterMap },
      },
      ensemble: { weighted: ensembleWeighted, uniform: ensembleUniform, advantage: ensembleWeighted - ensembleUniform },
      phaseCSuggestion6x6: tuning6x6,
    };
    saveMeasurement('multi-substrate-3sub-ensemble', measurement);

    // 최소 검증 — 모든 substrate 영역 영역 1 패턴 영역 영역 학습.
    expect(measure4.recall).toBeGreaterThan(0);
    expect(measure5.recall).toBeGreaterThan(0);
    expect(measure6.recall).toBeGreaterThan(0);
    // weighted vote ≥ uniform (영역 시드 영역 영역 영역 marginal 또는 동등).
    expect(ensembleWeighted).toBeGreaterThanOrEqual(ensembleUniform - 0.01); // floating point tolerance

    console.log(`[Multi-Substrate] 4×4: recall=${(measure4.recall * 100).toFixed(0)}% margin=${(measure4.avgMargin * 100).toFixed(0)}%`);
    console.log(`[Multi-Substrate] 5×5: recall=${(measure5.recall * 100).toFixed(0)}% margin=${(measure5.avgMargin * 100).toFixed(0)}%`);
    console.log(`[Multi-Substrate] 6×6: recall=${(measure6.recall * 100).toFixed(0)}% margin=${(measure6.avgMargin * 100).toFixed(0)}%`);
    console.log(`[Multi-Substrate] Ensemble: weighted=${(ensembleWeighted * 100).toFixed(0)}%, uniform=${(ensembleUniform * 100).toFixed(0)}% (+${((ensembleWeighted - ensembleUniform) * 100).toFixed(0)}%p)`);
  });
});
