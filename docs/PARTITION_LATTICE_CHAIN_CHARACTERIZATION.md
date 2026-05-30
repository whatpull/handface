# Partition Lattice Chain Characterization — Closed-Form Result

**R&D ID**: hand-snn-partition-lattice-chain-characterization
**Date**: 2026-05-31
**Status**: CLOSED-FORM COMBINATORIAL THEOREM — Theorem 3 proven, resolving the open problem from commit `1c5d717` (§7 honest_limitations item 7).

---

## 1. Background

직전 commit `1c5d717` 의 Theorem 2 (Power divergence ordering ⟺ majorization) 에서 다음 corollary 가 도출되었다:

> Conjecture 1 (power divergence ordering preservation across all λ) 이 specific (N, K) 에 대해 성립할 condition 은 partition lattice 가 chain (totally ordered by majorization) 인 것이다.

그러나 commit `1c5d717` 에서 다음 open problem 이 남았다:

> **Open problem (from `1c5d717` §7 item 7)**: 어떤 (N, K) 에 대해 partition lattice 가 chain 인가? 추측: K=2 의 경우 모든 N, K ≥ 3 의 경우 small N 까지.

본 R&D 는 이 open problem 의 **explicit closed-form characterization** 을 도출한다.

---

## 2. Setup

### 2.1 Partition lattice

For N ∈ ℕ, K ∈ ℕ, the **partition lattice** P(N, K) 는 N 을 K 개 이하의 non-negative integer parts 로 분할하는 모든 partitions 의 집합 (parts sorted descending, 즉 multiset 으로 식별):

```
P(N, K) = { (λ_1, λ_2, ..., λ_K) ∈ ℕ^K : λ_1 ≥ λ_2 ≥ ... ≥ λ_K ≥ 0, Σ_i λ_i = N }
```

### 2.2 Majorization (HLP 1934, recap from `1c5d717` §2.1)

For v, w ∈ P(N, K):
```
v majorizes w  (v ≻ w)
⟺  Σ_{i=1}^{k} v_i ≥ Σ_{i=1}^{k} w_i  for all k = 1, ..., K-1
```

### 2.3 Chain

A poset is a **chain** if every pair of elements is comparable. P(N, K) is a chain if for all v, w ∈ P(N, K), either v ≻ w or w ≻ v.

---

## 3. Theorem 3 (Main Closed-Form Result)

### 3.1 Statement

**Theorem 3 (Chain characterization of partition lattice)**:
For N ∈ ℕ, K ∈ ℕ:

```
P(N, K) is a chain  ⟺  K ≤ 2  ∨  N ≤ 5
```

Equivalently:

```
P(N, K) is NOT a chain  ⟺  K ≥ 3  ∧  N ≥ 6
```

### 3.2 Proof

본 proof 는 세 방향으로 분해된다.

#### Direction (A): K ≤ 2 ⟹ chain (for all N)

For K = 1: P(N, 1) = {(N)} — single element, trivially chain.

For K = 2: P(N, 2) = {(N-i, i) : 0 ≤ i ≤ ⌊N/2⌋}. For any two partitions (N-i, i), (N-j, j) with i < j (즉 N-i > N-j ≥ j > i):

partial sum at k=1: (N-i) ≥ (N-j) (since i < j → N-i > N-j) ✓
partial sum at k=2: N = N ✓

So (N-i, i) ≻ (N-j, j). P(N, 2) is linearly ordered. ✓

QED for (A).

#### Direction (B): N ≤ 5 ⟹ chain (for all K)

이는 enumeration 으로 증명 (case analysis):

**N = 0**: P(0, K) = {(0, ..., 0)} — single element, trivially chain.

**N = 1**: P(1, K) = {(1, 0, ..., 0)} — single element, trivially chain.

**N = 2**: P(2, K) = {(2, 0, ...), (1, 1, 0, ...)} (K ≥ 2 일 때). 
- partial sums: (2, 2, 2, ..., 2) vs (1, 2, 2, ..., 2). 2 ≥ 1 ✓. chain.

**N = 3**: P(3, K) = {(3, 0, ...), (2, 1, 0, ...), (1, 1, 1, 0, ...)} where (1, 1, 1, 0, ...) 는 K ≥ 3 일 때만 존재 (K = 2 의 경우 P(3, 2) = {(3, 0), (2, 1)} 두 partition 만).
- (3,0,...) vs (2,1,0,...): partial (3, 3, ...) vs (2, 3, ...). 3 ≥ 2 ✓
- (2,1,0,...) vs (1,1,1,0,...): partial (2, 3, 3, ...) vs (1, 2, 3, 3, ...). 2 ≥ 1, 3 ≥ 2 ✓
- chain.

**N = 4**: P(4, K) = {(4,0,...), (3,1,0,...), (2,2,0,...), (2,1,1,0,...), (1,1,1,1,0,...)} (K dependent).
- (4) ≻ (3,1) ≻ (2,2) ≻ (2,1,1) ≻ (1,1,1,1) by direct partial sum verification (each step descreases by majorization).
- chain.

**N = 5**: P(5, K) = {(5,...), (4,1,...), (3,2,...), (3,1,1,...), (2,2,1,...), (2,1,1,1,...), (1,1,1,1,1)}.
- (5) ≻ (4,1) ≻ (3,2) ≻ (3,1,1) ≻ (2,2,1) ≻ (2,1,1,1) ≻ (1,1,1,1,1):
  - (5) partial: (5, 5, ...)
  - (4,1) partial: (4, 5, ...) → 5 ≥ 4
  - (3,2) partial: (3, 5, ...) → 4 ≥ 3
  - (3,1,1) partial: (3, 4, 5, ...) → (3, 5) ≥ (3, 4) componentwise
  - (2,2,1) partial: (2, 4, 5, ...) → (3, 4, 5) ≥ (2, 4, 5)
  - (2,1,1,1) partial: (2, 3, 4, 5, ...) → (2, 4, 5) ≥ (2, 3, 4)
  - (1,1,1,1,1) partial: (1, 2, 3, 4, 5) → (2, 3, 4, 5) ≥ (1, 2, 3, 4)
- chain. ✓

QED for (B).

**Critical verification**: N = 5 에서 의심스러운 pair (3, 1, 1) vs (2, 2, 1) — partial sums (3, 4, 5) vs (2, 4, 5):
- k=1: 3 ≥ 2 ✓
- k=2: 4 = 4 ✓
- k=3: 5 = 5 ✓
- (3, 1, 1) ≻ (2, 2, 1). Comparable ✓.

이 pair 는 §3.2 (C) 의 N=6 counter-example 와 매우 유사한 형태 — 그러나 N=5 의 경우 chain 유지 (partial sum 강화).

#### Direction (C): K ≥ 3 ∧ N ≥ 6 ⟹ NOT chain

**Explicit counter-example**: For any K ≥ 3 and any N ≥ 6, consider the following two partitions (padded with zeros to length K):

```
v_a = (4, 1, 1, 0, ..., 0)  (with N - 6 additional zeros if N = 6, or replace 4 with 4 + (N - 6) to absorb extra mass)
v_b = (3, 3, 0, 0, ..., 0)
```

**Simplest case (N = 6, K = 3)**:
- v_a = (4, 1, 1), v_b = (3, 3, 0)
- partial sums: v_a = (4, 5, 6), v_b = (3, 6, 6)
- k=1: 4 > 3 — v_a wins
- k=2: 5 < 6 — v_b wins
- Incomparable ✓ (commit `1c5d717` Corollary 1 의 (N=6, K=4) counter-example 의 K=3 analog)

**General (K ≥ 3, N ≥ 6)**: Construct
- v_a = (4 + (N - 6), 1, 1, 0, ..., 0) — first part absorbs extra mass
- v_b = (3 + (N - 6), 3, 0, 0, ..., 0)

For N = 6: v_a = (4, 1, 1, 0, ..., 0), v_b = (3, 3, 0, 0, ..., 0).
- partial sums: v_a = (4, 5, 6, 6, ..., 6), v_b = (3, 6, 6, 6, ..., 6)
- k=1: 4 > 3 — v_a partial 큼
- k=2: 5 < 6 — v_b partial 큼
- Incomparable ✓

For N > 6 (e.g., N = 10): v_a = (8, 1, 1, 0, ..., 0), v_b = (7, 3, 0, 0, ..., 0).
- partial sums: v_a = (8, 9, 10, 10, ...), v_b = (7, 10, 10, 10, ...)
- k=1: 8 > 7 — v_a partial 큼
- k=2: 9 < 10 — v_b partial 큼
- Incomparable ✓

이 construction 은 모든 (K ≥ 3, N ≥ 6) 에 대해 작동.

QED for (C).

Combining (A), (B), (C):
- (A) covers K ≤ 2 (chain)
- (B) covers N ≤ 5 (chain)
- (C) covers K ≥ 3 ∧ N ≥ 6 (NOT chain)
- 따라서 chain ⟺ K ≤ 2 ∨ N ≤ 5.

QED (Theorem 3).

---

## 4. Implications for Hand SNN R&D — Boundary Condition Identified

### 4.1 본 R&D 의 (N, K) 환경

| Phase | N | K | Chain? | Method-agnostic statistical conclusion? |
|---|---|---|---|---|
| Phase A | 5 | 4 | YES (Theorem 3) | YES (all λ ∈ ℝ 동일 결론) |
| Phase B | 5 | 4 | YES | YES |
| Phase C | 3 | 4 | YES | YES |

본 R&D 의 모든 phase 는 chain region (N ≤ 5) 에 위치 → method-agnostic conclusion 가능. Commit `0f3acf0` 의 153/153 byte-identical 은 우연이 아닌 Theorem 3 의 mathematical inevitable.

### 4.2 Boundary warning — **N=5 가 chain region 의 정확한 경계**

본 R&D 의 Phase A, B 의 N=5 는 chain region 의 **정확한 boundary**. 만약:
- Sample size 가 N ≥ 6 으로 증가 → P(N, K) NOT chain → method (λ) 선택 결정적
- Hand SNN R&D 의 statistical robustness 는 N=5 boundary 의 luck

### 4.3 Future Hand SNN R&D recommendation

- Sample size 확장 (N ≥ 6) 시 **single λ 결과만 보고하는 것은 위험** — multiple λ 결과 cross-check 필요
- 또는 majorization-comparable pairs 만 선별해서 보고
- 또는 sample size 를 N = 5 로 의도적으로 유지 (단 statistical power 감소 trade-off)

### 4.4 Cross-reference with prior commits

- `0f3acf0` (empirical 189/189): explained by Theorem 3 (N=5/3, K=4 both chain)
- `a6aa72a` (partial proof): refined by Theorem 2 + Theorem 3
- `1c5d717` (Theorem 2 + Conjecture 1 disproved): completed by Theorem 3 (precise boundary identified)

---

## 5. Honest Limitations

본 closed-form theorem 의 정직한 한계:

1. **Hardy-Littlewood-Polya 1934 transcription**: 본 R&D 의 majorization framework 는 `1c5d717` 의 HLP 1934 §2.18-§2.22 transcription 에 의존. 사용자가 published edition 으로 verify mandatory.

2. **Direction (B) 의 enumeration**: N ≤ 5 의 case analysis 는 explicit하게 5 cases 만 verify. Strict 한 일반 N ≤ 5 proof 는 enumeration certificate (가능한 모든 partitions 수가 N=5 일 때 7개 한정) 로 cover됨. 단 strict mathematical proof 는 enumeration 외 algebraic argument 도 가능 — future R&D.

3. **Direction (C) 의 counter-example construction**: 본 R&D 는 specific (4, 1, 1, 0, ...) vs (3, 3, 0, 0, ...) family 만 사용. 다른 incomparable construction (예: (5, 1, 0, 0, ...) vs (3, 2, 1, 0, ...) for some N) 도 가능하나 verify 안 함 — 단 chain 이 아님을 보이는 데 한 counter-example 충분.

4. **Padding-invariance**: v_a, v_b 를 K 길이로 padding (zeros 추가) 했을 때 majorization 관계 invariance 는 standard 결과이나 본 R&D 에서 strict하게 증명 안 함. 사용자가 majorization textbook (Olkin & Marshall 1979) 으로 확인 mandatory.

5. **Connection to Theorem 2 (`1c5d717`)**: 본 Theorem 3 은 Theorem 2 와 결합되어 다음 complete characterization 을 준다:
   > T_λ ordering preservation across all λ ∈ ℝ 가 모든 (o_a, o_b) ∈ Ω × Ω 쌍에 대해 성립 ⟺ K ≤ 2 ∨ N ≤ 5.
   
   본 combined result 의 explicit 명시는 §6 에서.

6. **N=0 edge case**: P(0, K) = {(0, ..., 0)} — single element, trivially chain. 본 proof 는 N ≥ 1 가정에서 case analysis. N=0 은 trivially OK.

7. **K=0 edge case**: P(N, 0) = ∅ if N > 0, {()} if N = 0. Either way trivially chain. 본 proof scope 외이나 정직 명시.

8. **Larger (N, K) 의 detailed lattice structure**: 본 R&D 는 chain ⟺ K ≤ 2 ∨ N ≤ 5 라는 boundary 만 식별. NOT-chain regime 의 detailed structure (incomparable pair 의 수, antichain size 등) 는 별도 R&D.

9. **Formal verification (Lean 4 / Coq)**: 본 proof 의 case analysis 는 machine-verified 안 됨. Mathlib 의 partition lattice + majorization library 활용 formalization 은 future R&D.

10. **.env.snn-backup HIGH carryover (security)**: 사용자 직접 rotate + OS secret store 이전 mandatory. 본 R&D scope 외.

11. **Olkin & Marshall 1979 cross-reference**: 본 R&D 의 chain characterization 결과는 Olkin & Marshall 1979 *Inequalities: Theory of Majorization* 의 Chapter on partition orders 에 covered 되어 있을 가능성. 사용자가 직접 cross-check mandatory.

12. **Partition lattice의 well-known structural results**: Combinatorics literature 의 Young's lattice, dominance order, Bruhat order 와의 connection 은 본 R&D 에서 다루지 않음 — 단 본 Theorem 3 가 classical 결과의 special case 일 가능성. 사용자 cross-reference mandatory.

13. **Hand SNN R&D 의 practical robustness recommendation (§4.3) 은 mathematical proof 가 아닌 derived advice** — 실제 future R&D 의 method selection 은 별도 careful 결정 mandatory.

14. **Type: documentation-only** — code/test artifact 없음. Verification 은 hand analysis + commit `0f3acf0` enumeration certificate 결합.

15. **Peer review 안 됨** — published peer review 는 미수행. Statistical / combinatorics literature 와의 cross-check 는 사용자 mandatory.

---

## 6. Combined Result with `1c5d717` Theorem 2

**Corollary (Combined characterization)**:
For uniform null + smoothed counts (δ > 0), the Cressie-Read T_λ statistic produces byte-identical exact p-values across ALL λ ∈ ℝ (for all observed o ∈ Ω) ⟺ K ≤ 2 ∨ N ≤ 5.

Proof: Direct combination of:
- Theorem 2 (`1c5d717`): T_λ ordering preserved ⟺ Ω totally ordered by majorization.
- Theorem 3 (current): Ω = P(N, K) totally ordered by majorization ⟺ K ≤ 2 ∨ N ≤ 5.

QED.

이로써 본 R&D 시리즈는 다음을 mathematically 완성한다:
1. **Sufficient condition** for method-agnostic statistical conclusion: K ≤ 2 ∨ N ≤ 5.
2. **Necessary condition** (the same): K ≥ 3 ∧ N ≥ 6 ⟹ method (λ) choice 결정적.

---

## 7. Status grade and R&D series summary

| Stage | Commit | Status |
|---|---|---|
| Empirical | 0f3acf0 | 189/189 byte-identical for (N=5/3, K=4) |
| Partial theoretical | a6aa72a | Lemma 1-4 restricted, Conjecture 1 open |
| Full closed-form (ordering ⟺ majorization) | 1c5d717 | Theorem 2 proven, Conjecture 1 disproved, chain condition introduced |
| **Chain characterization** | **(current)** | **Theorem 3 proven (closed-form K ≤ 2 ∨ N ≤ 5 boundary). Combined result with Theorem 2 gives complete characterization.** |

본 R&D 시리즈는 이제 **완전한 closed-form mathematical foundation** 을 갖춤. 직전 commit `1c5d717` 의 남은 open problem (general (N, K) chain condition) 가 해결됨.

---

## 8. References

- **Hardy, G. H., Littlewood, J. E., & Polya, G. (1934)**. *Inequalities*. Cambridge University Press. §2.18-§2.22.
- **Olkin, I. & Marshall, A. W. (1979)**. *Inequalities: Theory of Majorization and Its Applications*. Academic Press.
- **Macdonald, I. G. (1995)**. *Symmetric Functions and Hall Polynomials*. Oxford University Press. (Young's lattice / dominance order standard reference)
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.

**사용자 직접 verify mandatory**:
- HLP 1934 §2.18-§2.22 published edition
- Olkin & Marshall 1979 partition order chapters
- Macdonald 1995 dominance order definitions
- Cressie & Read 1984 §2.5, §3, Theorem 3.1

---

## 9. Next followup candidates

| # | 항목 | 우선도 |
|---|---|---|
| 1 | NOT-chain regime 의 detailed structure (antichain size, incomparable pair count) | 중간 |
| 2 | δ > 0 counter-example robustness explicit numeric verification | 중간 |
| 3 | Larger (N=10/15, K=4) enumeration with majorization analysis | 중간 |
| 4 | Non-uniform null separate proof | 높음 |
| 5 | Lean 4 / Coq formal verification | 별도 multi-week 프로젝트 |
| 6 | Macdonald 1995 / Olkin & Marshall 1979 cross-reference | 사용자 mandatory |
| 7 | UX HIGH 2 fix (Toolbar aria-label + Editor h1) | 별도 |
| — | HLP 1934 + Cressie-Read 1984 published PDF verify | 사용자 mandatory |
| — | .env.snn-backup rotate | 사용자 mandatory |

---

## 10. Related Commits

- `1c5d717` (2026-05-31): Full closed-form ordering theorem — Theorem 2 proven via HLP majorization, Conjecture 1 disproved
- `a6aa72a` (2026-05-30): Partial mathematical proof — Lemma 1-4 rigorous (restricted)
- `0f3acf0` (2026-05-30): Power divergence continuous λ sweep — 189/189 byte-identical empirical (enumeration certificate for Theorem 3 (B) verification)
- 직전 5+ commits: individual λ value verify R&D cycle

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
**License**: Same as parent repository
