# handface — Research Results

## 1. Project Overview

handface is a browser-native Spiking Neural Network (SNN) demonstration that learns and infers hand-drawn patterns on a 4x4 grid.

**Architecture family**: B+4 cortical layered SNN  
**Feature dimension**: 32-dim (raw 16-dim grid + 16-dim derived: row sums, col sums, quadrant activations, diagonal activations)  
**Runtime**: Live mode via local Web Worker — no server round-trip for inference

### Core circuit layers

| Layer | Role |
|---|---|
| IN (32 units) | Input encoding — one unit per feature dimension |
| V1_L4_E (32 units) | Excitatory relay from IN |
| V1_L4_I (per-cluster) | Inhibitory pool, one per OUT cluster — B+4 addition that eliminates cross-cluster interference |
| V2_L5_E (32 units) | Second excitatory stage |
| OUT (N clusters) | Winner-take-all output, one cluster per learned pattern |

---

## 2. Validation Results (3-pattern baseline)

All results measured with the built-in ValidationPanel (100 trials per condition).

| Condition | Accuracy |
|---|---|
| Clean recall | 100% |
| 20% uniform noise | 100% |
| 25% cell masking | 100% |

**Confusion matrix**: perfect diagonal — no off-diagonal activations observed across all tested trial sets.

---

## 3. Architecture Details

### B+4: v1_L4_I per-cluster inhibitory pool

Previous designs (B+3 and earlier) used a single shared inhibitory pool across all OUT clusters. This caused cross-cluster interference when patterns overlapped in the feature space. B+4 introduces a dedicated `v1_L4_I` pool for each OUT cluster, so inhibition is cluster-local. Competing clusters no longer suppress each other's feature detectors during learning.

### 32-dim feature vector

```
raw[0..15]   = grid cell activations (4x4 flattened)
row[0..3]    = per-row activation sums (normalised)
col[0..3]    = per-column activation sums (normalised)
quad[0..3]   = per-quadrant sums (normalised)
diag[0..3]   = main diagonal, anti-diagonal, sub-diagonals (normalised)
```

Doubling the input dimensionality increases pattern separation without adding new neuron populations.

### Vectorized training loop (P211)

Weight update runs over `Float32Array` Structure-of-Arrays (SoA) layout. The hot inner loop avoids object allocation and JS property lookups:

- STDP traces stored as contiguous `Float32Array` — one array per synapse population
- Triplet STDP (Pfister & Gerstner 2006) computed in a single pass
- Homeostatic weight normalisation applied after each epoch (Diehl & Cook 2015)

Measured throughput: ~10x over the previous Array-of-Objects layout on V8.

### autoTrainOrSpawn

On each inference call the system checks whether the winner cluster margin exceeds a confidence threshold. If not (novel input), it:

1. Spawns a new OUT cluster (up to capacity)
2. Runs 30 reinforcement steps with the current input
3. Emits a `patternLearned` event to the UI

---

## 4. Known Limitations

| Constraint | Detail |
|---|---|
| Max patterns | 5 (B+4 circuit capacity per current weight budget) |
| Partial-cue accuracy at 4 patterns | ~50% (25% masking condition) |
| Partial-cue accuracy at 5 patterns | ~20% (25% masking condition) |
| Pattern design | Patterns with heavily overlapping active cells degrade separation; using distinct cell sets per pattern is recommended |

The partial-cue degradation at higher pattern counts is expected: the winner-take-all mechanism relies on margin between cluster potentials, and that margin shrinks as more clusters compete over shared feature dimensions.

---

## 5. Academic References

| Citation | Relevance |
|---|---|
| Bi, G. & Poo, M. (1998). Synaptic modifications in cultured hippocampal neurons. *J. Neurosci.* | Foundational STDP rule |
| Pfister, J.-P. & Gerstner, W. (2006). Triplets of spikes in a model of spike timing-dependent plasticity. *J. Neurosci.* | Triplet STDP used in the hot loop |
| Diehl, P. U. & Cook, M. (2015). Unsupervised learning of digit recognition using STDP. *Front. Comput. Neurosci.* | Weight normalisation / homeostatic scaling |
| Turrigiano, G. G. et al. (1998). Activity-dependent scaling of quantal amplitude in neocortical neurons. *Nature* | Homeostatic plasticity motivation |

---

## 6. Demo

**URL**: https://whatpull.github.io/handface

### Steps

1. Open the URL on desktop or mobile
2. Draw a pattern on the 4x4 grid (tap or click cells)
3. Press **Infer** — the system reports the winning cluster (or spawns a new one)
4. Press **Train** (or let autoTrainOrSpawn handle it) to reinforce the pattern
5. Open **Validation** panel — set trial count, run, inspect the confusion matrix
