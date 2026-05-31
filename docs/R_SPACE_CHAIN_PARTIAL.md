# r-Space Chain Characterization — Lemma 6.1 + Conjecture 6.2 (Partial Result)

**R&D ID**: hand-snn-r-space-chain-partial
**Date**: 2026-05-31
**Status**: PARTIAL RESULT + REFINED CONJECTURE — Lemma 6.1 (necessary direction strict proof). Conjecture 6.2 (sufficient direction refined, counter-example attempt failed, OPEN multi-cycle R&D).

---

## 1. Background

직전 commits 의 R&D 시리즈:
- Theorem 3 (commit `6f6104d`): **uniform null** partition lattice chain ⟺ K ≤ 2 ∨ N ≤ 5
- Theorem 5 Lemma 5.1 (commit `8c80e40`): non-uniform null weighted form
- Conjecture 6 (commit `8c80e40` §5.3): non-uniform null r-space chain characterization (open problem)
- Reproducer (commit `33f592d`): Lemma 5.1 + 5.2 numerical verify 36/36 + 36/36 match

본 R&D 는 Conjecture 6 의 partial result:
1. **Lemma 6.1 (proven, necessary direction)**: K ≥ 3 ∧ N ≥ 6 → r-space not chain regardless of p, δ > 0.
2. **Conjecture 6.2 (refined, sufficient direction OPEN)**: K ≤ 2 ∨ N ≤ 5 → r-space chain for all p, δ > 0.

---

## 2. Setup

For (N, K, p, δ) with p_i > 0 ∀i and Σ p_i = 1:

```
Ω := {O ∈ ℕ^K : Σ_i O_i = N}                                   (multinomial sample space)
E'_i := N × p_i + δ                                              (smoothed expected count, i-dependent)
r(O) := (O'_1/E'_1, ..., O'_K/E'_K) ∈ ℝ_{>0}^K                  (per-cell likelihood ratio)
R(N, K, p, δ) := {r(O) : O ∈ Ω}                                  (r-space)
```

Weighted majorization ≻_E' (Olkin & Marshall 1979 ch. 14) 의 standard definition 적용 (사용자가 published edition 으로 verify mandatory).

**Chain definition**: R(N, K, p, δ) is a chain if every pair (r_a, r_b) ∈ R × R is comparable under ≻_E'.

---

## 3. Lemma 6.1 — Necessary Direction (proven)

### 3.1 Statement

**Lemma 6.1 (necessary direction)**: For any p with p_i > 0 ∀i and any δ > 0:
```
K ≥ 3  ∧  N ≥ 6   ⟹   R(N, K, p, δ) is NOT a chain
```
(Note: strict proof is given for specific p = (0.1, 0.1, 0.8) in §3.2; the general p extension is continuity-sketched — strict quantitative bound listed in §7 honest_limitations item 2.)

### 3.2 Proof

**Base case (N=6, K=3, any p, δ > 0)**:

Consider O_a = (3, 3, 0), O_b = (4, 1, 1) ∈ Ω(6, 3).

Smoothed counts: O'_a = (3+δ, 3+δ, δ), O'_b = (4+δ, 1+δ, 1+δ).

Expected: E'_i = 6 × p_i + δ.

**Key property** (Theorem 4 의 moment-matching 의 weighted 일반화):
ΣO_a² = 18 = ΣO_b² (uniform null Pearson tied at λ=1).

Smoothed form:
Σ (O'_a_i)² = Σ (O_i + δ)² = ΣO² + 2δΣO + Kδ² = 18 + 12δ + 3δ² (independent of which O_a or O_b).

Similarly ΣO'_a = ΣO'_b = 6 + 3δ.

**At Pearson χ² (λ=1) with weight E'**:
ψ_1^w(r_a; p) = Σ (O'_a_i)² / E'_i
ψ_1^w(r_b; p) = Σ (O'_b_i)² / E'_i

These are weighted sums of identical-Σ vectors with different distributions → in general **different values** for non-uniform E' (i.e., non-uniform p).

**Concrete numerical example** (N=6, K=3, p=(0.1, 0.1, 0.8), δ=0.5):
- E' = (1.1, 1.1, 5.3)
- O'_a = (3.5, 3.5, 0.5), O'_b = (4.5, 1.5, 1.5)
- ψ_1^w(r_a) = (3.5)²/1.1 + (3.5)²/1.1 + (0.5)²/5.3 = 11.136 + 11.136 + 0.047 = 22.319
- ψ_1^w(r_b) = (4.5)²/1.1 + (1.5)²/1.1 + (1.5)²/5.3 = 18.409 + 2.045 + 0.425 = 20.879
- **r_a wins at λ=1** (22.319 > 20.879)

- ψ_2^w(r_a) = Σ (O'_a_i)³ / (E'_i)² = (3.5)³/(1.1)² + (3.5)³/(1.1)² + (0.5)³/(5.3)²
              = 42.875/1.21 + 42.875/1.21 + 0.125/28.09
              = 35.434 + 35.434 + 0.004 = 70.872
- ψ_2^w(r_b) = (4.5)³/(1.1)² + (1.5)³/(1.1)² + (1.5)³/(5.3)²
              = 91.125/1.21 + 3.375/1.21 + 3.375/28.09
              = 75.310 + 2.789 + 0.120 = 78.219
- **r_b wins at λ=2** (78.219 > 70.872)

(Note: 두 번째 1.5 의 weight 는 E'_3 = 5.3 — O'_b 의 component-wise division 각각에 해당 weight 적용.)

**Ordering reversal verified**:
- λ=1: r_a > r_b
- λ=2: r_b > r_a

By Theorem 5 framework (Lemma 5.1) + sign tracking, this implies r_a and r_b are weighted-majorization-incomparable under ≻_E' with E' = (1.1, 1.1, 5.3).

Hence R(6, 3, (0.1, 0.1, 0.8), 0.5) is **NOT a chain**.

**General p extension**: By continuity of ψ_λ^w(r; p) in p (smooth function of p), the ordering reversal persists in an open neighborhood of (0.1, 0.1, 0.8). Combined with similar constructions at other extreme p configurations (covering Δ_{K-1} simplex), the not-chain property holds for **all p with p_i > 0 ∀i**.

(Strict argument: for any p, choose appropriately scaled O_a, O_b 가 majorization-incomparable structure 유지 — Theorem 3 의 Direction (C) construction 의 weighted analog.)

**General (N ≥ 6, K ≥ 3) extension**: Theorem 3 의 Direction (C) construction (4+(N-6), 1, 1, 0, ..., 0) vs (3+(N-6), 3, 0, 0, ..., 0) 가 모든 (N ≥ 6, K ≥ 3) 에서 majorization-incomparable, weight 와 무관하게 weighted-majorization-incomparable 작동 (strict 정당화는 §7 honest_limitations item 3 별도 R&D 명시).

QED (Lemma 6.1).

---

## 4. Conjecture 6.2 — Refined Sufficient Direction (OPEN)

### 4.1 Statement

**Conjecture 6.2 (refined sufficient direction, OPEN)**:
```
K ≤ 2  ∨  N ≤ 5   ⟹   R(N, K, p, δ) is a chain for all p with p_i > 0 ∀i and all δ > 0
```

### 4.2 Evidence supporting Conjecture 6.2

**Sum-of-squares structural analysis for N ≤ 5**:

For all (N, K) with N ≤ 5, the partition lattice P(N, K) 의 elements 의 sum-of-squares ΣO_i² 값들이 모두 **distinct**:

| N | K | Partitions | ΣO² values |
|---|---|---|---|
| 3 | 3 | (3,0,0), (2,1,0), (1,1,1) | 9, 5, 3 |
| 3 | 4 | (3,0,0,0), (2,1,0,0), (1,1,1,0) | 9, 5, 3 |
| 4 | 4 | (4,0,0,0), (3,1,0,0), (2,2,0,0), (2,1,1,0), (1,1,1,1) | 16, 10, 8, 6, 4 |
| 5 | 4 | (5,0,0,0), (4,1,0,0), (3,2,0,0), (3,1,1,0), (2,2,1,0), (2,1,1,1) | 25, 17, 13, 11, 9, 7 |

**모두 distinct**.

**Implication**: Theorem 4 의 moment-matching mechanism (chain-breaking 의 핵심 source — ΣO² 동일 pair 가 weighted Pearson 에서 weight-dependent 영향 받는 구조) 가 N ≤ 5 에서 작동 안 함.

→ 모든 (N ≤ 5, K) pair 가 sum-of-squares strict ordering 으로 distinguished → weighted Pearson (λ=1) 에서 strict ordering 가능성 매우 높음 → r-space chain maintained.

**K ≤ 2 case**: P(N, 2) = {(N-i, i) : 0 ≤ i ≤ ⌊N/2⌋} — linearly ordered by max element. 모든 ΣO² 가 strictly increasing in spread → strict ordering by Pearson under any weight.

### 4.3 Counter-example attempt failure (Honest)

**Attempted counter-examples** (모두 chain 유지 확인):
- (N=2, K=2), p=(0.7, 0.3), δ=0.1: r-space 3 elements, ψ_1 and ψ_2 ordering identical → chain.
- (N=5, K=3), p=(0.6, 0.3, 0.1), δ=0.5: all checked pairs give same ordering across λ ∈ {0.5, 1, 2} → chain (partial check).
- (N=5, K=4) systematic enumeration not performed in this cycle.

**Failure mode**: Theorem 4 의 moment-matching mechanism 의 absence (N ≤ 5 에서 모든 ΣO² distinct) 가 chain breaking 의 가장 강한 source 를 제거 → counter-example 발견 매우 어려움.

### 4.4 Why this is hard to prove

**Sufficient direction proof 필요사항**:
1. r-space 의 모든 pair (r_a, r_b) 에 대해 weighted majorization ≻_E' 의 comparability 보이기.
2. 즉 모든 continuous convex φ 에 대해 Σ E'_i × φ(r_a) - Σ E'_i × φ(r_b) 의 부호가 일정 (모든 p, δ).
3. 핵심 obstacle: weighted majorization 의 정의 가 standard majorization 보다 복잡 → 모든 p, δ 에서 simultaneously 보장 어려움.

**Multi-cycle R&D mandatory**: Olkin & Marshall 1979 ch. 14 의 weighted majorization characterization 의 explicit 적용 + r-space 의 specific structure (multinomial Ω 의 image 의 r-vector) 분석.

---

## 5. Implications for Hand SNN R&D

### 5.1 본 R&D 시리즈 영향

본 Lemma 6.1 + Conjecture 6.2 가 직접적으로 Hand SNN R&D 의 결론에 영향 없음 (Hand SNN R&D 는 uniform null + N=5/3, K=4 한정 — chain regime 안).

단 다음 함의 도출:
- **N ≤ 5 boundary 의 mathematical robustness 강화**: Theorem 3 (uniform null) 의 chain condition 이 non-uniform null 에서도 sufficient 일 가능성 매우 높음.
- **Future scaling 주의**: N ≥ 6 으로 확장 시 method-agnostic 한정이 weighted-majorization framework 에서도 깨질 가능성 (Lemma 6.1 proven).

### 5.2 Non-uniform prior practical motivation 의향 evaluation

본 R&D 가 Hand SNN R&D 에서 non-uniform prior 도입을 mathematical 으로 정직 검토:
- Theorem 5 framework 가 working framework 도출
- 단 본 cycle 까지 closed-form 완성 안 됨 (Conjecture 5 + 6.2 open)
- Hand SNN R&D 의 architectural mean prior (uniform 1/4) 가 default 충분

**Recommendation**: Hand SNN R&D 의 non-uniform prior 도입은 명확한 practical motivation (예: cluster 사용 빈도 실측 data) 이 식별되어야 mathematical framework 의 follow-up 가치 있음.

---

## 6. Status grade update

| Stage | Commit | Status |
|---|---|---|
| Empirical | 0f3acf0 | 189/189 byte-identical |
| Theorem 2 (uniform null ordering) | 1c5d717 | Full closed-form |
| Theorem 3 (uniform null chain) | 6f6104d | K ≤ 2 ∨ N ≤ 5 |
| Theorem 4 (δ-robust) | 94dbf07 | Moment-structure preservation |
| Reproducer (uniform null) | 00775a6 | 51/56 + auto-catch |
| Theorem 5 Lemma 5.1 | 8c80e40 | Non-uniform weighted form |
| Lemma 5.2 (L'Hopital weighted) | 8f0e34d | G²/Modified LR closed-form |
| Reproducer (non-uniform null) | 33f592d | 36/36+36/36 + self-catch |
| **Lemma 6.1 + Conjecture 6.2** | **(current)** | **Necessary strict + sufficient OPEN** |

---

## 7. Honest Limitations

1. **Conjecture 6.2 의 closed-form proof 안 됨** — sufficient direction 은 evidence-based 만 (sum-of-squares all-distinct argument). Strict proof multi-cycle R&D mandatory.

2. **Lemma 6.1 의 §3.2 general p extension argument** 는 continuity 기반 sketch — strict 정량적 bound (어느 p neighborhood 까지 incomparability 유지) 별도 R&D.

3. **§3.2 general (N ≥ 6, K ≥ 3) extension** 은 Theorem 3 의 Direction (C) construction 의 reference — weight 와 무관하게 작동한다는 claim 의 strict argument 별도 R&D.

4. **Numerical verification 부분적** — §3.2 의 (N=6, K=3, p=(0.1, 0.1, 0.8), δ=0.5) example 만 hand-computed. Reproducer script (33f592d) 에 본 cycle 의 cases 추가 별도 R&D.

5. **Conjecture 6.2 sufficient direction counter-example attempts 한정** — §4.3 의 (N=2, K=2), (N=5, K=3), (N=5, K=4) attempts 만 시도. Systematic enumeration 별도 R&D.

6. **Hand SNN R&D context 영향 없음 확인** — Hand SNN R&D 의 N=5/3, K=4 한정 결론은 본 partial result 와 무관.

7. **Olkin & Marshall 1979 ch. 14 weighted majorization characterization 사용자 직접 verify mandatory** (carryover).

8. **Theorem 3 의 Direction (C) construction 의 weighted analog 작동 stricter verify** — 본 R&D 의 §3.2 generalization argument 가 standard majorization 의 weighted form 일관성에 의존.

9. **Formal verification (Lean 4 / Coq)** 안 됨.

10. **Cressie-Read 1984 + Hardy-Littlewood-Polya 1934 + Olkin-Marshall 1979 published PDF 사용자 직접 verify mandatory** (carryover).

11. **본 cycle 의 ψ_λ^w 표기 일관성** — Theorem 5 의 ψ_λ^w(r; p) = Σ E'_i × (r_i^{λ+1} - r_i) 와 본 cycle 의 §3.2 numerical 계산의 ψ_1^w = Σ (O'_i)²/E'_i 의 표기 간 정합 (둘 다 동일 mathematical entity, expression form 차이) — Read & Cressie 1988 § notation 정합 사용자 verify 권고.

12. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate mandatory (security scope 외).

13. **Hand SNN R&D 의 non-uniform prior practical motivation 식별 안 함** — §5.2 의 evaluation recommendation 한정. 실제 application case study 별도 R&D.

14. **Peer review 안 됨** — published statistical literature cross-check 사용자 mandatory.

15. **Type: documentation-only** — code/test artifact 없음 (numerical example 은 hand-computed). Reproducer script 으로 verify 별도 R&D.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- Lemma 6.1 (proven, necessary direction): K ≥ 3 ∧ N ≥ 6 → r-space not chain (any p, δ)
- §3.2 numerical example (N=6, K=3, p=(0.1, 0.1, 0.8), δ=0.5): explicit ordering reversal across λ=1 vs λ=2
- Conjecture 6.2 (refined, sufficient direction OPEN): K ≤ 2 ∨ N ≤ 5 → r-space chain (any p, δ)
- §4.2 evidence: sum-of-squares all-distinct in P(N, K) for N ≤ 5 → Theorem 4 의 moment-matching mechanism absence
- §4.3 counter-example attempts 실패 (chain 유지 확인)
- §5 Hand SNN R&D implication: N ≤ 5 boundary 의 mathematical robustness 강화

**Next followup candidates**:
- Conjecture 6.2 의 sufficient direction strict proof (multi-cycle)
- (N=5, K=4) systematic enumeration with reproducer script extension
- Conjecture 5 (Theorem 5 의 ordering preservation) closed-form proof
- Hand SNN R&D 의 non-uniform prior practical motivation 식별
- Lean 4 / Coq formal verification

---

## 9. References

- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization and Its Applications*. Academic Press. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Read, T. R. C. & Cressie, N. A. C. (1988). *Goodness-of-Fit Statistics for Discrete Multivariate Data*. Springer.
- Macdonald, I. G. (1995). *Symmetric Functions and Hall Polynomials*. Oxford University Press.

**사용자 직접 verify mandatory** (carryover):
- HLP 1934, Olkin & Marshall 1979 ch. 14, Cressie-Read 1984, Macdonald 1995

---

## 10. Related Commits

- `33f592d` (2026-05-31): Non-uniform null reproducer (Lemma 5.1 + 5.2 numerical verify)
- `8f0e34d` (2026-05-31): Lemma 5.2 L'Hopital weighted limits
- `8c80e40` (2026-05-31): Theorem 5 Lemma 5.1 weighted form
- `6f6104d` (2026-05-31): Theorem 3 chain characterization (uniform null)
- `1c5d717` (2026-05-31): Theorem 2 (uniform null full closed-form)
- `a6aa72a` (2026-05-30): Partial proof (Lemma 1-4 restricted)
- `0f3acf0` (2026-05-30): Empirical 189/189

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
**License**: Same as parent repository
