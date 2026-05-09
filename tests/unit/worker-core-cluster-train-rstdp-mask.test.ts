// QA CAUSE A fix (2026-05-10): clusterTrainRStdp 영역 synapse cluster mask
// 영역 swap-restore 검증.
//
// 사용자 catch 2026-05-09 ("패턴보강 엉망"):
// 직전 reward pass 영역 GLOBAL stdpGain 영역 적용 → 모든 cluster 영역 LTP →
// cross-cluster strengthen → margin 약화 → wrong winner lock-in 영역 root cause.
//
// 정정 (Florian 2007 R-STDP / Izhikevich 2007 DA-STDP region-specific gating):
// reward run 직전 영역 모든 synapse 영역 stdpGainMultiplier 영역 cluster mask:
//   - target cluster 영역 incoming synapse (V1/V2 sub-pool + OUT cluster) → 1.0
//   - 그 외 → 0.0 (effectively LTP gate off — applyPairStdp 영역 synGain=0)
// reward 후 영역 1.0 (원본) 영역 restore — in-place swap-restore (worker thread
// sequential FIFO 영역 정합 — race 0).
//
// M1: applyClusterRewardMask(targetCi=1) — V1/V2 cluster 1 sub-pool + OUT cluster_1
//     영역 multiplier=1, 그 외 영역 0.
// M2: restoreClusterRewardMask — multiplier 영역 1.0 (원본) 영역 restore.
// M3: handleClusterTrainRStdp — reward 후 영역 모든 synapse multiplier=1.0 영역
//     restore 검증 (race 영역 0 영역 swap-restore 정합).
// M4: 다른 cluster 영역 incoming synapse 영역 weight 영역 변경 0 — wrong-cluster
//     LTP gate off 검증.

import { describe, expect, it } from 'vitest';

import { SNNWorkerCore } from '@/lib/snn-runtime';

const VERTICAL_PATTERN = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];

function makeCore(seed = 57): SNNWorkerCore {
  const core = new SNNWorkerCore();
  const buildRes = core.handle({ id: 1, type: 'build', payload: { preset: 'n13_orientation', seed } });
  expect(buildRes.ok).toBe(true);
  return core;
}

// post neuron 영역 cluster id 추론 helper — worker-core inferPostCluster 정합.
function postCluster(name: string, region: string | null, population: string | null): number | null {
  if (region === 'INPUT') return null;
  if (region === 'OUT') {
    const m = /^out_(\d+)_(\d+)$/.exec(name);
    return m ? Number(m[1]) : null;
  }
  if (population && population.endsWith('_I')) return null;
  const me = /^c(\d+)_/.exec(name);
  if (me) return Number(me[1]);
  const baseMatch = /^(v1_L4_E|v1_L23_E|v2_L4_E|v2_L23_E|v2_L5_E)_(\d+)$/.exec(name);
  if (!baseMatch) return null;
  const layer = baseMatch[1];
  const idx = Number(baseMatch[2]);
  // n13 V1_L4_E=128, V1_L23_E=128, V2_L4_E=128, V2_L23_E=96, V2_L5_E=64 / 4 cluster.
  let perSub: number;
  switch (layer) {
    case 'v1_L4_E': perSub = 32; break;
    case 'v1_L23_E': perSub = 32; break;
    case 'v2_L4_E': perSub = 32; break;
    case 'v2_L23_E': perSub = 24; break;
    case 'v2_L5_E': perSub = 16; break;
    default: return null;
  }
  return Math.floor(idx / perSub);
}

describe('SNNWorkerCore — clusterTrainRStdp synapse cluster mask (QA CAUSE A 2026-05-10)', () => {
  it('M1+M2+M3: handleClusterTrainRStdp 후 영역 모든 synapse multiplier=1.0 영역 restore', () => {
    const core = makeCore();
    const net = core.getNetForTest();
    expect(net).not.toBeNull();
    if (!net) return;

    // initial state — 모든 multiplier 영역 1.0.
    for (const syn of net.synapses) {
      expect(syn.stdpGainMultiplier).toBe(1.0);
    }

    // R-STDP supervised — targetCluster=1 (vertical).
    const res = core.handle({
      id: 100,
      type: 'clusterTrainRStdp',
      payload: {
        patterns: [VERTICAL_PATTERN],
        targetCluster: 1,
        observeMs: 50,
        stimulusDurationMs: 20,
        intensity: 25,
        rewardGain: 0.8,
        punishGain: 0,
      },
    });
    expect(res.ok).toBe(true);

    // reward 후 영역 모든 multiplier=1.0 영역 restore (swap-restore 정합).
    for (const syn of net.synapses) {
      expect(syn.stdpGainMultiplier).toBe(1.0);
    }
  });

  it('M4: target cluster 영역 incoming synapse 영역만 LTP — 다른 cluster 영역 weight 변경 0', () => {
    const core = makeCore();
    const net = core.getNetForTest();
    expect(net).not.toBeNull();
    if (!net) return;

    // weight snapshot — reward 직전 영역 모든 synapse 영역 weight 영역 catch.
    const before = net.synapses.map((s) => s.weight);

    // R-STDP supervised — targetCluster=1.
    // target cluster 영역 V1/V2 sub-pool + OUT cluster_1 영역만 LTP.
    // 그 외 cluster (0/2/3) 영역 incoming synapse 영역 weight unchanged.
    const res = core.handle({
      id: 100,
      type: 'clusterTrainRStdp',
      payload: {
        patterns: [VERTICAL_PATTERN],
        targetCluster: 1,
        observeMs: 50,
        stimulusDurationMs: 20,
        intensity: 25,
        rewardGain: 2.0, // 강한 LTP — 충분 weight 변화 catch.
        punishGain: 0,
      },
    });
    expect(res.ok).toBe(true);

    // verify — non-target cluster (0/2/3) incoming synapse 영역 weight 변경 0.
    // target cluster (1) incoming synapse 영역 weight 영역 변경 가능 (LTP 또는 unchanged
    // 단 fire 시점 영역 정합 catch 영역 — 본 test 영역 non-target 영역만 strict).
    let changedCount = 0;
    let nonTargetChanged = 0;
    for (let i = 0; i < net.synapses.length; i += 1) {
      const syn = net.synapses[i];
      const ci = postCluster(syn.post.name, syn.post.region, syn.post.population);
      const weightChanged = Math.abs(syn.weight - before[i]) > 1e-9;
      if (weightChanged) {
        changedCount += 1;
        // non-target cluster 영역 weight 변경 영역 mask 영역 깨짐 영역 catch.
        if (ci !== null && ci !== 1) {
          nonTargetChanged += 1;
        }
      }
    }
    // target cluster 영역 적어도 일부 weight 영역 변화 — fire 정합 (정직 한계:
    // measure pass 영역 silent 영역 reward 영역 punishGain=0 영역 0 변화 가능 —
    // 본 test 영역 changedCount > 0 강제 0 catch 영역 — non-target=0 strict).
    expect(nonTargetChanged).toBe(0);
    void changedCount;
  });

  it('M5: targetCluster=0 영역 cluster 1/2/3 incoming synapse 영역 weight 변경 0', () => {
    const core = makeCore();
    const net = core.getNetForTest();
    expect(net).not.toBeNull();
    if (!net) return;

    const before = net.synapses.map((s) => s.weight);

    // horizontal pattern + targetCluster=0.
    const res = core.handle({
      id: 100,
      type: 'clusterTrainRStdp',
      payload: {
        patterns: [[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]],
        targetCluster: 0,
        observeMs: 50,
        stimulusDurationMs: 20,
        intensity: 25,
        rewardGain: 2.0,
        punishGain: 0,
      },
    });
    expect(res.ok).toBe(true);

    let nonTargetChanged = 0;
    for (let i = 0; i < net.synapses.length; i += 1) {
      const syn = net.synapses[i];
      const ci = postCluster(syn.post.name, syn.post.region, syn.post.population);
      const weightChanged = Math.abs(syn.weight - before[i]) > 1e-9;
      if (weightChanged && ci !== null && ci !== 0) {
        nonTargetChanged += 1;
      }
    }
    expect(nonTargetChanged).toBe(0);
  });
});
