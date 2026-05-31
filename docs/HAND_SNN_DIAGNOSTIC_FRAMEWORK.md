# Hand SNN Diagnostic Framework — Catastrophic Forgetting + Cluster Pool Analysis

**R&D ID**: hand-snn-diagnostic-framework
**Date**: 2026-05-31
**Status**: DIAGNOSTIC R&D — Catastrophic forgetting metric design + cluster pool visualization framework + recommended architectural parameter changes. Production observation 의 systematic diagnosis.

---

## 1. Background — Production Observation

사용자 production observation (handface.whatpull.com, 2026-05-31):

**Screenshot 1 evidence**:
- Toast: "신규 패턴 — 자동 학습 시작 / vigilance miss — 신규 cluster spawn + 30회 R-STDP"
- Console log: "cluster 1 spawn — disjoint sub-pool 고갈 fallback (claimed 18 features). 학습 중 cluster 의 weight overlap 가능 — 패턴을 더 명확하게 권장."
- V1 256/256, V2 144/144 ~66Hz

**Screenshot 2 evidence**:
- V1 512/512, V2 288/288 ~60Hz (pool 확장됨)
- 학습 #107 · winner 패턴 4 EXACT
- 패턴 1, 2: 60Hz active / 패턴 3: 0Hz / 패턴 4: 학습 중 11/30
- self-verify 10/15 correct (87%) — noisy held-out (n=5/cluster, σ=0.05 feature-noise)
- DB: 학습 진행 — 4 패턴 학습 (영속 대기)

**사용자 보고 3 현상**:
1. **같은 패턴 재학습** 발생
2. **비슷한 패턴 인식 실패**
3. **이전보다 인식률 저하** (가장 우려)

---

## 2. Diagnostic Framework Overview

### 2.1 4 핵심 metric

본 framework 는 4 가지 catastrophic forgetting / cluster pool metric 도입:

| Metric | 측정 대상 | 목적 |
|---|---|---|
| **CFM-1** (Per-Pattern Forgetting) | 학습 epoch 별 each pattern 의 self-verify accuracy | Catastrophic forgetting 시간 시퀀스 측정 |
| **CFM-2** (Cluster Drift) | 학습 epoch 별 each cluster 의 winner weight L2 distance | Weight 의 drift 정도 측정 |
| **CPM-1** (Cluster Pool Usage) | V1, V2 의 spawned cluster 수 + sub-pool overlap matrix | Pool 포화 상태 시각화 |
| **CPM-2** (Weight Overlap Matrix) | All cluster pairs 의 weight cosine similarity | Disjoint topology 위반 정도 |

### 2.2 핵심 hypothesis

**H1 (vigilance threshold strict)**: Vigilance threshold 가 너무 strict → 비슷한 입력에도 vigilance miss → "재학습" 처럼 보임.

**H2 (sub-pool exhaustion)**: 누적 학습이 진행되면서 V1 sub-pool 이 고갈 → fallback 으로 weight overlap 가능한 cluster spawn → "인식률 저하" 의 root cause.

**H3 (catastrophic forgetting)**: 새 cluster (패턴 4) 학습 시 R-STDP 가 기존 cluster weights 를 미세하게 흔듦 → 패턴 1, 2, 3 의 자체 정확도 점진적 저하.

**H4 (sparse code overlap)**: forced-disjoint top-K 가 fallback 모드로 entered → cluster 간 active inputs 의 Jaccard > 0 → similar inputs 가 multiple clusters 활성화 → "인식 실패" 의 원인.

각 hypothesis 의 검증을 위해 metric CFM-1, CFM-2, CPM-1, CPM-2 활용.

---

## 3. CFM-1 (Per-Pattern Forgetting Metric)

### 3.1 정의

```
CFM-1(pattern p, epoch t) := self_verify_accuracy(pattern p, after epoch t)
```

각 학습 epoch t 마다 모든 기존 학습 패턴의 self-verify accuracy 측정.

### 3.2 측정 방법

- 학습 패턴 p ∈ {1, 2, ..., P} (현재 P=4)
- Held-out test set: n=5/cluster, σ=0.05 feature-noise (현재 사용 환경)
- 매 R-STDP epoch 후 모든 패턴 자체에 대한 self-verify 실행

### 3.3 Forgetting indicator

```
Forgetting_p(t) := CFM-1(p, t_0) - CFM-1(p, t)
```

where t_0 = pattern p 학습 완료 직후의 epoch.

- Forgetting_p(t) > 0 → pattern p 의 catastrophic forgetting 발생
- Forgetting_p(t) > 0.1 (10%p drop) → significant forgetting, intervention mandatory

### 3.4 Production data 추정

Screenshot 2 의 87% self-verify (n=15 total = 10/15 correct):
- 4 패턴 × n=5/cluster = 20 expected, 단 표시는 15 — 일부 cluster 미포함 가능
- 87% 가 noisy held-out 환경 한정 — noiseless 환경에서는 더 높을 것
- 단 specific pattern 별 self-verify 표시 안 됨 → **CFM-1 implementation 시 per-pattern breakdown 표시 mandatory**

---

## 4. CFM-2 (Cluster Drift Metric)

### 4.1 정의

```
CFM-2(cluster c, epoch t) := ||W_c(t) - W_c(t_0)||_2
```

각 cluster c 의 weight vector W_c 의 L2 distance 학습 epoch t 와 t_0 (cluster c 학습 완료 직후) 사이.

### 4.2 측정 의미

- CFM-2 = 0: cluster c 의 weights 가 freeze (catastrophic forgetting 발생 X)
- CFM-2 > threshold: cluster c 의 weights 가 drift → forgetting risk

### 4.3 Threshold 권장

- Threshold = 0.05 × ||W_c(t_0)||_2 (5% drift)
- 이 이상이면 catastrophic forgetting risk

---

## 5. CPM-1 (Cluster Pool Usage Metric)

### 5.1 정의

```
CPM-1.spawn_count := |{c : c is spawned cluster}|
CPM-1.sub_pool_overlap_matrix[i][j] := |sub_pool_i ∩ sub_pool_j| / |sub_pool_i ∪ sub_pool_j|  (Jaccard)
```

- Spawn count: 학습 진행에 따라 누적되는 cluster 수
- Sub-pool overlap matrix: K × K matrix, forced-disjoint 가 정상 작동 시 모두 0

### 5.2 Visualization 권장

- Bar chart: V1, V2 의 spawned cluster count over time
- Heatmap: K × K sub-pool overlap matrix
- Color scale: 0 (정상) ~ 1 (완전 fallback)

### 5.3 Production 추정 (Screenshot 1 console)

"cluster 1 spawn — disjoint sub-pool 고갈 fallback (claimed 18 features)":
- 즉 cluster 1 의 sub-pool 이 18 features 만 claimed (총 256 features 중)
- Fallback 으로 다른 cluster 와 overlap 가능 → sub_pool_overlap_matrix[1][others] > 0 가능

→ **이건 H2 (sub-pool exhaustion) 의 strong evidence**.

---

## 6. CPM-2 (Weight Overlap Matrix)

### 6.1 정의

```
CPM-2[i][j] := cos(W_i, W_j) = (W_i · W_j) / (||W_i|| × ||W_j||)
```

각 cluster pair (i, j) 의 weight cosine similarity.

### 6.2 측정 의미

- CPM-2 = 0: 두 cluster weights orthogonal (정상 분리)
- CPM-2 ≈ 1: 두 cluster weights 거의 동일 (redundant cluster, weight overlap)

### 6.3 Threshold 권장

- Threshold = 0.3 (30% similarity)
- 이 이상이면 redundant cluster, merge 권장

---

## 7. Recommended Architectural Parameter Changes

본 4 metric 의 측정 결과에 따른 권장 조정:

### 7.1 Vigilance Threshold

**Current behavior**: Vigilance miss 가 자주 발생 (Screenshot 1 toast).

**Recommended adjustment**:
- 만약 H1 confirmed (CFM-1 stable but vigilance miss high) → vigilance threshold 약간 완화 (예: 0.85 → 0.80)
- 만약 H1 NOT confirmed (CFM-1 drop with vigilance miss) → vigilance threshold 유지, catastrophic forgetting 별도 처리

### 7.2 Sub-Pool Allocation

**Current behavior**: "claimed 18 features" — 매우 작은 sub-pool 사용.

**Recommended adjustment** (H2 confirmed via CPM-1):
- V1 sub-pool size 확장: K=4 patterns × 32 features = 128 보다 큰 V1 pool 권장
- 현재 V1=256 (Screenshot 1) → 512 (Screenshot 2) 로 이미 확장됨, 단 18 features 만 claimed 라면 allocation algorithm 문제 가능성

### 7.3 R-STDP Learning Rate

**Current behavior**: 30회 R-STDP 마다 새 cluster spawn.

**Recommended adjustment** (H3 confirmed via CFM-2):
- 만약 cluster drift > threshold → R-STDP learning rate 감소 (catastrophic forgetting 완화)
- 또는 elastic weight consolidation (EWC) 도입 (advanced technique)

### 7.4 Sparse Code Constraint

**Current behavior**: Forced-disjoint top-K with fallback.

**Recommended adjustment** (H4 confirmed via CPM-2):
- Forced-disjoint constraint 강화 (fallback 회피)
- 또는 soft-disjoint 도입 (overlap penalty term)

---

## 8. Implementation Recommendations (Production-Ready Pseudo-Code)

### 8.1 CFM-1 implementation

```typescript
// Per-pattern catastrophic forgetting metric
interface CFM1Result {
  pattern_id: number;
  epoch: number;
  self_verify_accuracy: number;
  forgetting_indicator: number; // = baseline - current
}

function measureCFM1(
  patterns: Pattern[],
  state: SNNState,
  baseline: Map<number, number>, // pattern_id → baseline accuracy
): CFM1Result[] {
  return patterns.map(p => {
    const current = selfVerify(p, state);
    return {
      pattern_id: p.id,
      epoch: state.epoch,
      self_verify_accuracy: current,
      forgetting_indicator: (baseline.get(p.id) ?? current) - current,
    };
  });
}
```

### 8.2 CPM-1 implementation

```typescript
// Cluster pool usage metric
interface CPM1Result {
  spawn_count_V1: number;
  spawn_count_V2: number;
  sub_pool_overlap_matrix: number[][]; // K × K Jaccard
  fallback_clusters: number[]; // cluster IDs in fallback mode
}

function measureCPM1(state: SNNState): CPM1Result {
  const fallbackClusters = state.clusters.filter(c => c.subPoolFallback);
  const matrix = state.clusters.map((c1, i) =>
    state.clusters.map((c2, j) =>
      jaccard(c1.subPool, c2.subPool)
    )
  );
  return {
    spawn_count_V1: state.V1.clusters.length,
    spawn_count_V2: state.V2.clusters.length,
    sub_pool_overlap_matrix: matrix,
    fallback_clusters: fallbackClusters.map(c => c.id),
  };
}
```

### 8.3 Visualization recommendation

**Recommended UI additions**:
1. **Per-pattern accuracy chart**: line chart of CFM-1 over training epochs.
2. **Sub-pool overlap heatmap**: K × K cell grid with Jaccard values.
3. **Weight similarity matrix**: K × K cell grid with CPM-2 cosine values.
4. **Spawn timeline**: bar chart of clusters spawned per epoch.

**Existing UI** (Screenshot 2): 패턴 1/2/3/4 의 simple bar chart (60Hz/0Hz indicator) — improvement to per-pattern accuracy chart 권장.

---

## 9. Connection to Mathematical R&D Series

### 9.1 Mathematical R&D 영향

본 mathematical R&D 시리즈 (commits a6aa72a → 97cda88) 의 Theorem 2-9 + Lemma 5.1-7.6 + Theorem 8, 8' + Theorem 9 는 **statistical inference framework** (Cressie-Read T_λ exact p-value).

본 diagnostic framework 는 **architectural behavior diagnostic** — directly mathematical theorems 와 무관.

### 9.2 정직한 분리

- Mathematical R&D: "Hand SNN 의 4/4=100% accuracy claim 의 통계적 정직성" 검증 → 완성됨.
- 본 diagnostic R&D: "Hand SNN 의 longitudinal training behavior diagnostics" → 별도 R&D scope.

본 issue 해결 시도는 mathematical R&D 와 orthogonal 한 architecture parameter tuning + UI/UX 개선 scope.

---

## 10. Honest Limitations

1. **본 framework 는 design document 한정** — implementation 별도 handface-frontend / neuronface-backend agent cycle mandatory.

2. **4 metric 의 정확한 threshold values 는 production data 의존** — 본 권장 thresholds (10% forgetting, 5% drift, 30% similarity) 는 baseline 추정, 사용자 환경 data 로 calibration mandatory.

3. **H1-H4 4 hypotheses 의 truth 확정 안 됨** — production data 의 measurement 후 어느 hypothesis 가 dominant cause 식별.

4. **§7 의 recommended architectural changes 의 정확성**: vigilance threshold + sub-pool allocation + R-STDP learning rate + sparse code constraint 의 정확한 parameter values 는 본 R&D scope 외 (별도 cycle).

5. **§8 의 pseudo-code 는 sketch** — production-ready TypeScript implementation 별도 R&D + audit mandatory.

6. **본 framework 는 architectural behavior diagnostic 한정** — mathematical R&D 시리즈의 결론 (Theorem 2-9) 영향 없음.

7. **EWC (Elastic Weight Consolidation) 도입 (§7.3)** 은 advanced technique 추천 — 본 cycle 의 scope 외, 별도 multi-cycle R&D.

8. **본 R&D 의 production data dependence** — 실제 implementation 후 metric measurement 의 결과 의존.

9. **Self-verify accuracy 의 noisy environment 한정** (σ=0.05) — noiseless environment 정확도 별도 측정.

10. **사용자 reported 3 현상 의 frequency 측정 안 됨** — 본 framework 의 measurement 후 빈도 quantification.

11. **Hand SNN architecture parameters 의 documentation 확인 mandatory** — 본 cycle 에서 직접 verify 안 함.

12. **Cluster pool visualization UI changes** 별도 ux-designer + handface-frontend audit cycle mandatory.

13. **본 R&D 의 측정 결과의 mathematical R&D 시리즈 (Theorem 9 Regime B) 적용**: Phase 1 (uniform null) 의 method-agnostic conclusion 영향 없음 — diagnostic 는 별도 scope.

14. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate (carryover).

15. **Olkin & Marshall 1979 + Cressie-Read 1984 + HLP 1934 + Rudin 1976 + Shaked & Shanthikumar 2007 + Shohat-Tamarkin 1943 published PDF 사용자 직접 verify mandatory** (mathematical R&D carryover).

---

## 11. Recommended Next Steps

### 11.1 Phase 1: Measurement Implementation (한 cycle)

- [ ] handface-frontend agent 위임 — CFM-1 implementation (per-pattern accuracy 측정)
- [ ] handface-frontend agent 위임 — CPM-1 implementation (cluster pool 시각화)

### 11.2 Phase 2: Hypothesis Confirmation (한 cycle)

- [ ] Production data collection — H1-H4 의 evidence-based identification
- [ ] Dominant cause identification

### 11.3 Phase 3: Architectural Adjustment (multi-cycle)

- [ ] Vigilance threshold + sub-pool + R-STDP rate + sparse code 조정
- [ ] Audit + production verification

### 11.4 Phase 4: UI/UX Enhancement (별도 cycle)

- [ ] ux-designer audit — diagnostic visualizations
- [ ] handface-frontend implementation — chart + heatmap UI

---

## 12. Conclusion

**본 R&D 의 contribution**:
- 4 diagnostic metric (CFM-1, CFM-2, CPM-1, CPM-2) 설계.
- 4 hypothesis (H1-H4) 도출 — production observation 의 systematic root cause analysis.
- §7 architectural parameter change recommendations.
- §8 implementation pseudo-code.
- §11 4-phase recommended roadmap.

**다음 follow-up candidates**:
- Phase 1 (Measurement implementation) — handface-frontend agent 위임 권장 first
- Phase 2-4 sequential

---

## 13. References

- Mathematical R&D series (commits a6aa72a → 97cda88) — statistical framework
- Hand SNN architecture (Bio-SNN Pattern) — `handface.whatpull.com`
- Carpenter & Grossberg 1987 — ART vigilance
- Olshausen & Field 1996 — Sparse coding
- Kirkpatrick et al. 2017 — Elastic Weight Consolidation (EWC) — future reference for advanced solutions
- Goodfellow et al. 2014 — Catastrophic Forgetting in neural networks

---

## 14. Related Commits

- `97cda88` (2026-05-31): Mathematical R&D ultra final summary
- `15e5bd9` (2026-05-31): Theorem 9 final chain synthesis
- 본 commit (현재): Diagnostic framework R&D

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
