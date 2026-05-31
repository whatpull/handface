# Hand SNN R&D — Non-Uniform Prior Practical Motivation Document

**R&D ID**: hand-snn-non-uniform-prior-practical-motivation
**Date**: 2026-05-31
**Status**: PRACTICAL APPLICATION GUIDE — Theorem 5 + 6.3 + 7.1 의 Hand SNN R&D 적용 motivation 식별 + recommendation framework.

---

## 1. Background

직전 mathematical R&D 시리즈 (commits a6aa72a → 7b263b3) 가 Cressie-Read power divergence statistic T_λ 의 non-uniform null 환경의 closed-form framework 완성:

- Theorem 5 (`8c80e40`) + Lemma 5.2 (`8f0e34d`): non-uniform null 의 weighted form derivation
- Theorem 6.3 (`bc7e84a`): r-space chain regime characterization (closed-form for regimes A-D)
- Theorem 7.1 (`b1e3b1e`): Conjecture 5 (⇐) direction closed-form proof
- Lemma 6.4 (`7b263b3`): (N=6, K=3) explicit f_λ formulas

본 R&D 는 위 framework 의 **Hand SNN R&D 의 practical application motivation** 식별 + recommendation document.

---

## 2. Hand SNN R&D 의 Current Setup (recap)

### 2.1 Architectural setup

- **4 손동작 cluster**: open_palm, closed_fist, thumbs_up, peace_sign
- **K = 4** (number of clusters)
- **Architectural mean prior**: p = (1/4, 1/4, 1/4, 1/4) = **uniform null**
- **Sample sizes**: N=5 (Phase A, B) / N=3 (Phase C)
- **Method**: Cressie-Read T_λ exact p-value via multinomial enumeration

### 2.2 Current R&D regime classification (Theorem 6.3)

Hand SNN R&D 의 현재 regime:
- (N=5, K=4, p uniform, δ ∈ {0.1, 0.5, 1.0}) ∈ **Regime (B)** (Theorem 3 직접 응용)
- → **r-space chain 유지** → method-agnostic 결론 (모든 λ 동일 결과)

이는 commit `0f3acf0` 의 189/189 byte-identical empirical 결과의 mathematical foundation.

---

## 3. Non-Uniform Prior 도입의 Practical Motivations

### 3.1 Motivation A: Cluster Activation 실측 데이터

**Source**: Hand SNN 의 학습 phase 의 cluster activation rate 측정.

**Example scenario**:
- 학습 데이터에서 cluster 1 (open_palm) 의 활성화 빈도 = 40%
- cluster 2 (closed_fist) = 30%
- cluster 3 (thumbs_up) = 20%
- cluster 4 (peace_sign) = 10%
- → p = (0.4, 0.3, 0.2, 0.1) (commit f446675 의 Test case 2 p4 와 일치)

**Implication (Theorem 6.3)**:
- (N=5, K=4, p=(0.4, 0.3, 0.2, 0.1), δ) ∈ **Regime (D)** (f446675 enumeration verified)
- → r-space **NOT chain** → method (λ) 선택 결정적
- → single λ 결과의 신뢰도 손실 risk

**Recommendation**:
- 다수 λ 의 cross-check (예: λ ∈ {0.5, 1, 2, 0, -1}) 결과 모두 보고
- 또는 weighted-comparable pairs 한정 보고 (incomparable pairs 의 결과 명시)

### 3.2 Motivation B: Domain Knowledge Prior

**Source**: 사용자 행동 모델 또는 도메인 전문가 지식.

**Example scenarios**:
- 모바일 카메라 사용 시 open_palm 이 가장 자주 발생 (시작 트리거)
- 게임 컨트롤러 시 thumbs_up 이 dominant
- 음악 컨트롤 시 peace_sign 이 dominant

**각 prior 의 Regime classification**:
- p_mobile = (0.7, 0.1, 0.1, 0.1): **Regime (D)** (f446675 의 p3 extreme 와 유사) → not chain
- p_gaming = (0.1, 0.1, 0.7, 0.1): **Regime (D)** (permutation of p3) → not chain
- p_music = (0.1, 0.1, 0.1, 0.7): **Regime (D)** → not chain

**모든 도메인-specific prior 가 Regime (D) 에 속함** — method-agnostic 결론 보장 안 됨.

### 3.3 Motivation C: Bayesian Hierarchical Prior

**Source**: 사용자 모집단의 hand gesture preference distribution.

**Setup**:
- Dirichlet hyperprior: p ~ Dir(α_1, ..., α_K)
- 학습 data 로 α 추정 → posterior mean p̂_i

**Example posterior mean estimates**:
- p̂ = (0.35, 0.28, 0.22, 0.15) (예시)

**Regime classification**:
- (N=5, K=4, p̂ non-uniform, δ) ∈ **Regime (D)** → not chain

→ Bayesian setup 에서도 method-agnostic 결론 보장 안 됨.

---

## 4. Practical Recommendation Framework

### 4.1 Decision tree for Hand SNN R&D 의 method choice

```
Is the prior p uniform (= 1/K for all i)?
├─ YES → Regime (B) (if K≥3 ∧ N ≤ 5) → chain → method-agnostic ✓
│        Default: any λ (e.g., Pearson λ=1) 결과 신뢰
│
└─ NO  → Regime (D) (if K=4 ∧ N=5) 또는 unverified
         → method-dependent → multiple λ cross-check mandatory
         
         Recommended strategy:
         (a) Report all λ ∈ {0.5, 1, 2, 0, -1} results
         (b) Identify weighted-majorization-comparable pair subset (via §5 Theorem 7.1)
         (c) Final conclusion 만 comparable subset 한정
```

### 4.2 Implementation guidance

**For software pipeline**:

```javascript
// Pseudo-code for Hand SNN R&D non-uniform prior pipeline
function statisticalAnalysis(O_observed, N, K, p_prior, delta) {
  const isUniform = p_prior.every(p => Math.abs(p - 1/K) < 1e-9);
  
  if (isUniform) {
    // Regime (B) — single method sufficient
    return cressieReadPValue(O_observed, N, K, p_prior, delta, /* lambda */ 1);
  } else {
    // Regime (D) — multi-lambda cross-check mandatory
    const lambdas = [0.5, 1, 2, 0, -1];
    const results = lambdas.map(l =>
      cressieReadPValue(O_observed, N, K, p_prior, delta, l)
    );
    
    // Honest reporting: all results + agreement summary
    return {
      perLambdaResults: results,
      methodAgnosticConclusion: detectAgreement(results),
      flagged: !detectAgreement(results) ? "method-dependent" : null,
    };
  }
}
```

### 4.3 User-facing recommendation

Hand SNN UI 또는 report 에서 non-uniform prior 사용 시:
1. **Method choice 명시**: 어떤 λ 사용했는지 표시
2. **Cross-check disclosure**: 다른 λ 의 결과가 다른 경우 경고
3. **Comparable subset framing**: weighted-majorization-comparable pair 만 final conclusion 에 포함

---

## 5. Connection to Theorem 7.1 (Conjecture 5 (⇐) direction)

### 5.1 Practical 의미

Theorem 7.1 의 (⇐) direction (proved in commit b1e3b1e):
> r(o_a) ≻_{E'} r(o_b) ⟹ T_λ(o_a) ≥ T_λ(o_b) for all λ ∈ ℝ.

이 의미 (practical):
- 만약 두 outcome 의 r-vector 가 weighted-majorization comparable 이면 (즉 ≻_{E'} 관계 존재) → 모든 method (λ) 가 같은 ordering 결과 → method-agnostic
- 비교 불가 pair (incomparable) 만 method 선택 영향 받음

**Implementation**: comparable pair 와 incomparable pair 의 식별 algorithm — weighted majorization partial sum check (Olkin & Marshall 1979 ch. 14).

```javascript
// Pseudo-code for weighted majorization check
function isWeightedMajorizationComparable(r_a, r_b, weights_E_prime) {
  // Sort r_a, r_b descending (with weights)
  const sortedA = sortDescByWeightedR(r_a, weights_E_prime);
  const sortedB = sortDescByWeightedR(r_b, weights_E_prime);
  
  // Check partial sum conditions (Olkin & Marshall 1979 ch. 14)
  let aMajorizesB = true;
  let bMajorizesA = true;
  for (let k = 0; k < r_a.length - 1; k++) {
    const partialA = partialSum(sortedA, k);
    const partialB = partialSum(sortedB, k);
    if (partialA < partialB) aMajorizesB = false;
    if (partialB < partialA) bMajorizesA = false;
  }
  
  return aMajorizesB || bMajorizesA;
}
```

### 5.2 Performance estimate

For Ω(5, 4) = 56 outcomes:
- Total pairs = C(56, 2) = 1540
- f446675 결과: 다양한 p 에서 incomparable pairs 수 (115 ~ 319 range)
- 따라서 comparable pairs 도 충분히 많음 (1221 ~ 1425 range)
- Practical use: 약 80-90% pairs 가 comparable → 대부분 method-agnostic, 일부 (10-20%) 만 method-dependent

---

## 6. Hand SNN R&D 의 Realistic Use Case Recommendation

### 6.1 Phase 1 R&D (current): Uniform null 유지 권장

**현재 상태**:
- Hand SNN R&D 의 architectural prior 가 uniform (1/4) — 별다른 사전 지식 없는 default
- Theorem 6.3 Regime (B) 적용 → chain → method-agnostic ✓
- 본 framework 의 default state

**권장**: 본 phase 에서는 non-uniform prior 도입 motivation 충분 안 함. uniform null 유지 + Theorem 2-4 결과 활용.

### 6.2 Phase 2 R&D (future): Non-uniform prior 도입 motivation 식별 후

**전제 조건**:
1. **명확한 motivation**: §3 의 Motivation A/B/C 중 하나 명확 식별
2. **Data 또는 expert knowledge** 으로 p 정확 추정
3. **Method-dependent 결과 framing 의 정직 처리** 의 framework 준비

**권장 시퀀스**:
1. Cluster activation data 수집 (Motivation A) 또는 domain expert interview (Motivation B)
2. p_prior 추정 + 95% confidence interval 함께
3. §4 Decision tree 적용 → Regime classification
4. Regime (D) 적용 시 §4.2 Implementation guidance 의 multi-lambda cross-check 적용
5. Final report 의 method-dependent disclosure

### 6.3 본 R&D framework 의 future readiness

본 R&D 시리즈 (a6aa72a → 7b263b3) 의 mathematical foundation 이 Hand SNN R&D 의 Phase 2 non-uniform prior 도입의 **prerequisite framework** 모두 완성:

- T_λ 의 non-uniform weighted form: Theorem 5 (8c80e40 + 8f0e34d)
- Chain regime classification: Theorem 6.3 (bc7e84a)
- Method-agnostic 조건: Theorem 7.1 (b1e3b1e)
- Boundary analysis: Lemma 6.4 (7b263b3)
- Numerical verification: 33f592d + f446675 reproducers

**Phase 2 R&D 시 본 framework 직접 활용 가능** — 추가 mathematical groundwork 없이 practical implementation 가능.

---

## 7. Honest Limitations

1. **본 motivation document 는 Hand SNN R&D 의 Phase 2 의 hypothetical scenarios** — 실제 cluster activation data 수집 + 실제 user research 별도 R&D.

2. **§4.2 의 implementation guidance 는 pseudo-code** — 실제 production-ready implementation 별도 R&D + audit cycle 필요.

3. **§5.1 의 weighted majorization check algorithm** 의 정확성 (Olkin & Marshall 1979 ch. 14 의 partial sum conditions 정확 transcription) 사용자 직접 verify mandatory.

4. **§6.2 의 95% confidence interval 함께 추정** 권장 — 정확 statistical methodology 별도 R&D (Bayesian credible interval 권장).

5. **Theorem 6.3 Regime (D) 의 unverified configurations**: p_mobile, p_gaming, p_music 모두 Regime (D) 추정이지만 실제 enumeration 별도 verify (f446675 enumeration 의 p3 extreme 와 permutation 동등성으로 추정).

6. **Phase 2 R&D 의 시기 안 정해짐** — 본 document 의 권장은 명확 motivation 식별 후 적용. 즉시 도입 권장 안 함.

7. **Hand SNN R&D 의 actual production status 영향 0** — 본 document 는 R&D framework 의 future application guide. 현재 4/4 = 100% accuracy + uniform null 결론 (Theorem 2-4) 그대로 유효.

8. **Olkin & Marshall 1979 ch. 14 published edition 사용자 직접 verify mandatory** (carryover).

9. **Cressie-Read 1984 + HLP 1934 + Macdonald 1995 published PDF 사용자 verify** (carryover).

10. **Formal verification (Lean 4 / Coq) of implementation algorithm** 안 됨.

11. **Peer review** 안 됨.

12. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate.

13. **Type: documentation-only — practical motivation + recommendation framework**.

14. **본 R&D 의 mathematical 정합성**: Theorem 7.1 의 (⇐) direction 한정 strict — (⇒) direction 의 strict proof (Conjecture 7.2) 없이는 weighted-comparable pair 식별 의 strict 완성도 partial.

15. **본 document 의 future Hand SNN UI/report integration** 은 ux-designer + handface-frontend agent 별도 cycle.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- §3 의 Hand SNN non-uniform prior 도입의 3 가지 motivations 식별 (Cluster activation / Domain knowledge / Bayesian hierarchical)
- §4 의 Decision tree + Implementation guidance + User-facing recommendation
- §5 의 Theorem 7.1 의 practical 의미 + weighted majorization comparable check algorithm
- §6 의 Phase 1 (current) vs Phase 2 (future) recommendation

**다음 follow-up candidates**:
- Hand SNN 의 actual cluster activation data 수집 (Phase 2 motivation A 정량화)
- §4.2 implementation 의 production-ready coding + audit cycle
- §5.1 weighted majorization check 의 Lean 4 formal verification
- Hand SNN UI/report 의 method-dependent disclosure framework integration

---

## 9. References

본 R&D 의 mathematical foundation:
- Theorem 5 (commit 8c80e40 + 8f0e34d): Non-uniform null weighted form
- Theorem 6.3 (commit bc7e84a): r-space chain regime classification
- Theorem 7.1 (commit b1e3b1e): Conjecture 5 (⇐) closed-form proof
- Lemma 6.4 (commit 7b263b3): (N=6, K=3) explicit f_λ formulas

External references:
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests".
- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization*. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*.

---

## 10. Related Commits

- `7b263b3` (2026-05-31): Lemma 6.4
- `b1e3b1e` (2026-05-31): Theorem 7.1
- `bc7e84a` (2026-05-31): Theorem 6.3
- `f446675` (2026-05-31): N5K4 enumeration
- `90ee122` (2026-05-31): Lemma 6.1 + Conjecture 6.2 partial
- `8c80e40` (2026-05-31): Theorem 5 Lemma 5.1
- `8f0e34d` (2026-05-31): Lemma 5.2 L'Hopital

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
