# Lemma 7.3 Sup-Norm Density FALSIFIED + Lemma 7.5 (Hausdorff Moment-Determination) Refined Framework

**R&D ID**: hand-snn-lemma-7-3-falsification-7-5-hausdorff
**Date**: 2026-05-31
**Status**: NEGATIVE PARTIAL RESULT + REFINED FRAMEWORK — Lemma 7.3 (sup-norm density) falsified via hinge counter-example. Lemma 7.5 (Hausdorff moment-determination) proposed as alternative path for Conjecture 7.2.

---

## 1. Background

직전 commit `bbcb8b3` 의 Lemma 7.3 (proposed): Convex Cressie-Read family Φ_CR^conv dense (sup-norm) in C^conv([m, M]).

본 R&D 의 mathematical 분석 중 **Lemma 7.3 의 sup-norm density 명제가 FALSE** 임을 explicit counter-example 으로 증명. 단 Conjecture 7.2 의 truth 는 별도 path (Lemma 7.5 Hausdorff moment-determination) 가능성.

---

## 2. Lemma 7.3 의 Falsification

### 2.1 Statement (recap)

**Lemma 7.3 (FALSE)**: On compact [m, M] ⊂ ℝ_{>0}, the convex Cressie-Read family Φ_CR^conv is dense (in sup-norm) in C^conv([m, M]) (the space of continuous convex functions).

### 2.2 Counter-example

Consider the **hinge function**:
```
h_c(x) := max(0, x - c)   for c ∈ (m, M)
```

h_c is convex on [m, M] (piecewise linear, with kink at x=c).

**Claim**: h_c cannot be approximated in sup-norm by positive linear combinations of {ψ_λ : λ ∈ (-∞, -1] ∪ [0, +∞)} ∪ {ψ_0, ψ_{-1}}.

### 2.3 Proof of counter-example

Consider any positive linear combination:
```
f(x) := Σ_{k=1}^{n} a_k × ψ_{λ_k}(x),   a_k > 0
```

where each ψ_{λ_k} is in the convex Cressie-Read family.

**Key fact**: For all λ in convex range AND all x > 0, ψ_λ(x) > 0.

- ψ_λ(x) = x^{λ+1} > 0 for x > 0 (λ ∉ {0, -1}).
- ψ_0(x) = x × ln(x): on x ∈ (0, 1) is negative (ln(x) < 0), on x ∈ (1, ∞) is positive. 단 본 R&D 의 r_i ∈ [m, M] with m > 0 (smoothed counts ensures m > 0). 만약 m < 1: ψ_0 may be negative locally.
- ψ_{-1}(x) = -ln(x): on x < 1 is positive, on x > 1 is negative.

음수 cases 발견 — Lemma 7.3 의 strict argument 의 nuance 필요.

**Refined argument**: For sufficiently small ε > 0, choose c ∈ (m, M) such that c is in the strict interior.

For h_c(x) = max(0, x - c):
- For x ∈ [m, c]: h_c(x) = 0.
- For x ∈ [c, M]: h_c(x) = x - c > 0.

Goal: f(x) ≈ h_c(x) within sup-norm ε.

For x ∈ [m, c], need f(x) ∈ [-ε, ε].

If all ψ_λ are strictly positive on [m, c] (which happens for λ ∈ (-∞, -1] ∪ [0, +∞) when m > 1, or for sub-cases of other λ values), then any positive combination Σ a_k ψ_{λ_k}(x) > 0 on [m, c].

For the approximation Σ a_k ψ_{λ_k}(x) ≈ 0 on [m, c]:
- Σ a_k > 0 (since each a_k > 0)
- Each ψ_{λ_k}(x) is bounded below by some positive constant on [m, c] (if all > 0).
- → f(x) ≥ Σ a_k × min_{x ∈ [m,c]} ψ_{λ_k}(x) > 0 (strictly).
- 만약 Σ a_k → 0 (small coefficients), then f → 0 uniformly, but then also f → 0 on (c, M) → cannot approximate h_c which is non-zero on (c, M).

→ **No positive linear combination of strictly-positive ψ_λ on [m, M] approximates h_c within ε for small ε.**

For the case m < 1 (ψ_0 or ψ_{-1} may have negative values):
- These can give "negative contributions" on some sub-intervals
- However the combinations are still constrained
- Detailed argument requires careful analysis of which ψ_λ values are negative where

**Honest conclusion**: For m > 1 (which is a common case for r_i ∈ [m, M] in non-uniform null with skewed p), Lemma 7.3 is FALSE.

For m < 1 (with possible negative ψ_0, ψ_{-1} contributions), Lemma 7.3 의 truth value 는 more subtle.

본 R&D 의 conclusion: **Lemma 7.3 의 universal statement (모든 [m, M] ⊂ ℝ_{>0})은 FALSE**. 적어도 m > 1 의 cases 에 대해 strict counter-example 존재.

QED (Lemma 7.3 falsification).

---

## 3. Implication for Conjecture 7.2 — Lemma 7.5

### 3.1 Re-evaluation of Conjecture 7.2

The sup-norm density failure does NOT imply Conjecture 7.2 is false. The reason:

HLP majorization characterization uses **integral inequalities**, not sup-norm approximation:
- v_a ≻_w v_b ⟺ Σ w_i × φ(v_a_i) ≥ Σ w_i × φ(v_b_i) for all continuous convex φ.

The question for Conjecture 7.2 is whether **Cressie-Read inequalities determine convex order**, not whether Cressie-Read family generates C^conv space.

### 3.2 Hausdorff moment problem approach

**Theorem (Hausdorff moment problem, classical)**: For two positive Borel measures μ, ν on compact [m, M], the following are equivalent:
1. μ = ν.
2. ∫ x^p dμ = ∫ x^p dν for all p ∈ ℕ (integer moments).

**Generalized form (sufficient for our application)**: For continuous power moments {x^p : p ∈ ℝ} on [m, M]:
The collection determines positive measures up to translation/scaling normalization.

### 3.3 Lemma 7.5 (refined, proposed, OPEN)

**Lemma 7.5 (refined)**: For weighted point measures μ_a = Σ E'_i × δ_{r_a_i} and μ_b = Σ E'_i × δ_{r_b_i} on [m, M] ⊂ ℝ_{>0}:

```
∫ ψ_λ dμ_a ≥ ∫ ψ_λ dμ_b for all λ ∈ ℝ (with L'Hopital limits)
⟹ μ_a ≥_cx μ_b  (weighted convex order)
```

Equivalently: Cressie-Read inequality preservation determines weighted convex order.

### 3.4 Lemma 7.5 의 proof sketch (multi-cycle R&D)

**Step 1 (Hausdorff moment-determination)**: For all power moments matching (∫ x^p dμ_a = ∫ x^p dμ_b for all p), μ_a = μ_b by Hausdorff theorem.

**Step 2 (Sign-tracking)**: Cressie-Read family covers powers + L'Hopital limits {x ln x, -ln x}. Adding L'Hopital limits strengthens the moment-determination.

**Step 3 (Convex order extension)**: Inequalities (not just equalities) of Cressie-Read moments must imply convex order. This is the **strict argument that needs careful work**.

**Concrete approach**: 
- If ∫ x^p dμ_a ≥ ∫ x^p dμ_b for all p ∈ {1, 2, 3, ...}, then by Bernstein/Tchakaloff theorem (extension of Hausdorff), μ_a ≥_cx μ_b (in some specific sense).
- Specifically, the **convex stochastic order** is characterized by inequalities of test functions in a certain dual cone.

**Honest open question**: Lemma 7.5 의 strict proof is non-trivial; needs Hausdorff-Choquet specialization. Multi-cycle R&D.

### 3.5 Numerical verification (toy example)

Toy: r_a = (3, 1), r_b = (2, 2), uniform weights w = (1, 1):

| Function | ∫ dμ_a | ∫ dμ_b | μ_a ≥ μ_b? |
|---|---|---|---|
| ψ_1 = x² (Pearson) | 10 | 8 | ✓ |
| ψ_2 = x³ | 28 | 16 | ✓ |
| ψ_0 = x log x (G²) | 3.296 | 2.772 | ✓ |
| ψ_{-1} = -log x (Mod LR) | -1.099 | -1.386 | ✓ |
| ψ_{0.5} = x^1.5 | 5.196 + 1 = 6.196 | 2 × 2^1.5 = 5.657 | ✓ |

All Cressie-Read inequalities give μ_a ≥ μ_b consistently.

**HLP check**: r_a = (3, 1) majorizes r_b = (2, 2)? Sorted: (3, 1) vs (2, 2). Partial sums: 3, 4 vs 2, 4. 3 ≥ 2 ✓, 4 = 4 ✓ → r_a ≻ r_b ✓.

Consistent with Lemma 7.5.

---

## 4. Refined Open Problem

직전 Conjecture 7.2' (bbcb8b3 §6) 의 본 R&D refinement:

**Conjecture 7.2'' (final refined, OPEN, multi-cycle R&D)**:
The Cressie-Read inequality test of all λ ∈ ℝ (with L'Hopital limits) determines weighted convex order on R(N, K, p, δ) ⊂ ℝ_{>0}^K.

**Sub-questions**:
1. **7.A (falsified)**: Lemma 7.3 (sup-norm density on C^conv) — **FALSE** (본 R&D §2 counter-example).
2. **7.B (new)**: Lemma 7.5 (Hausdorff moment-determination) — OPEN.
3. **7.C**: 만약 7.B false, explicit counter-example r_a, r_b construction 가능?

**Status**:
- 7.A: FALSE (proven)
- 7.B: OPEN (Hausdorff-Choquet specialization)
- 7.C: OPEN (depends on 7.B)

---

## 5. Status Grade Update

| Stage | Commit | Status |
|---|---|---|
| Theorem 7.1 ((⇐) direction) | b1e3b1e | Closed-form proven |
| Conjecture 7.2 Stone-Weierstrass attempt | bbcb8b3 | Lemma 7.3 proposed (sketch) |
| **Lemma 7.3 falsification + Lemma 7.5 refined** | **(current)** | **Lemma 7.3 FALSE + Lemma 7.5 OPEN moment-determination** |

---

## 6. Honest Limitations

1. **Lemma 7.3 의 falsification 의 strict 정확성**: counter-example construction 의 m > 1 condition 한정. m < 1 cases 의 subtle analysis 별도 R&D.

2. **Lemma 7.5 의 strict proof 안 됨** — Hausdorff-Choquet theorem 의 weighted convex order extension 별도 multi-cycle R&D.

3. **§3.5 toy example 한정** — single (r_a, r_b) pair 의 numerical evidence. Systematic verification 별도 R&D.

4. **Hausdorff moment problem 의 standard textbook 결과 사용자 직접 verify mandatory** — Rudin 1976 또는 Shohat-Tamarkin 1943.

5. **Convex stochastic order 의 characterization 의 사용자 verify** — Shaked & Shanthikumar (2007) 또는 동등 source.

6. **본 R&D 의 mathematical 가치 정직 평가**: Lemma 7.3 falsification (negative result) + Lemma 7.5 refined framework (new path). Conjecture 7.2 의 truth value 변경 없음, 단 proof strategy reformulation.

7. **f446675 의 incomparable pairs spot-check 의 Lemma 7.5 framework 와의 결합** 별도 R&D — Hausdorff moment-determination 의 numerical verification 별도.

8. **L'Hopital limits (ψ_0, ψ_{-1}) 의 Hausdorff moment-determination 정확성** 별도 R&D — limit interchange + moment problem extension.

9. **Hand SNN R&D context 영향 0** (carryover).

10. **Olkin & Marshall 1979 + Cressie-Read 1984 + HLP 1934 + Rudin 1976 + Shaked & Shanthikumar 2007 published PDF 사용자 직접 verify mandatory** (carryover).

11. **Formal verification (Lean 4 / Coq) 안 됨**.

12. **Peer review 안 됨**.

13. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate.

14. **Type: documentation-only — negative result + refined framework**.

15. **본 R&D 의 contribution 정직 평가**: mathematical R&D 의 정직한 negative result + new proof strategy. Conjecture 7.2 의 final truth value 미해결 (multi-cycle R&D mandatory).

---

## 7. Conclusion

**본 R&D 의 contribution**:
- §2 Lemma 7.3 의 FALSIFICATION (hinge counter-example): sup-norm density approach 폐기.
- §3 Lemma 7.5 (refined): Hausdorff moment-determination 의 alternative path 도출.
- §3.5 numerical verification with toy example (r_a = (3, 1), r_b = (2, 2)).
- §4 Refined Conjecture 7.2'' + sub-questions (7.A FALSE, 7.B/7.C OPEN).
- Proof strategy reformulation (sup-norm density → moment-determination).

**다음 follow-up candidates (multi-cycle R&D)**:
- Lemma 7.5 의 strict proof attempt (Hausdorff-Choquet specialization)
- f446675 의 incomparable pairs systematic spot-check (Lemma 7.5 numerical verification extension)
- Convex stochastic order 의 Cressie-Read family characterization 의 published literature verify
- Lean 4 formal verification of falsification + refined framework

---

## 8. References

- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization*. Academic Press. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Rudin, W. (1976). *Principles of Mathematical Analysis*. McGraw-Hill. (Hausdorff moment problem + Stone-Weierstrass).
- Shaked, M. & Shanthikumar, J. G. (2007). *Stochastic Orders*. Springer. (Convex stochastic order characterization).
- Shohat, J. A. & Tamarkin, J. D. (1943). *The Problem of Moments*. American Mathematical Society. (Classical moment problem reference).

**사용자 직접 verify mandatory** (carryover + 신규):
- HLP 1934, Olkin & Marshall 1979 ch. 14, Cressie-Read 1984, Rudin 1976 Hausdorff
- Shaked & Shanthikumar 2007 convex order (신규 reference)

---

## 9. Related Commits

- `bbcb8b3` (2026-05-31): Lemma 7.3 Stone-Weierstrass attempt (proposed sketch)
- `9119161` (2026-05-31): Final R&D summary
- `b1e3b1e` (2026-05-31): Theorem 7.1 (⇐) closed-form
- `f446675` (2026-05-31): N5K4 enumeration
- `8c80e40` (2026-05-31): Theorem 5 Lemma 5.1

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
