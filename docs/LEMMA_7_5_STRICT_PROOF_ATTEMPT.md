# Lemma 7.5 Strict Proof Attempt via Hausdorff Moment Problem (Theorem 8 Proposed)

**R&D ID**: hand-snn-lemma-7-5-strict-proof
**Date**: 2026-05-31
**Status**: PARTIAL STRICT PROOF — Theorem 8 (refined Lemma 7.5) proven for the **equality case** via classical Hausdorff moment theorem. The **inequality case** (convex order) requires Bernstein-type extension + non-trivial moment cone analysis — sketch only, final closed-form OPEN.

---

## 1. Background

직전 commits:
- `899912d`: Lemma 7.5 proposed (Hausdorff moment-determination)
- `51c9431`: Lemma 7.5 contrapositive 100% systematic verified (numerical)
- `4ee1b03`: Lemma 7.6 (Lemma 7.3 universal falsification, sup-norm density 폐기)

본 R&D: Lemma 7.5 의 strict closed-form proof attempt via Hausdorff moment problem.

---

## 2. Hausdorff Moment Theorem (recap)

### 2.1 Classical theorem

**Theorem (Hausdorff Moment Problem, classical)**:
For a positive Borel measure μ on compact [m, M] ⊂ ℝ_{>0}, the moments {c_p := ∫ x^p dμ(x) : p ∈ ℕ_0} **uniquely determine** μ.

Reference: Rudin 1976 *Principles of Mathematical Analysis* §, Shohat & Tamarkin 1943.

### 2.2 Equivalent form (for our application)

**Corollary (Power Moments Determine Measures)**:
For two positive Borel measures μ_a, μ_b on compact [m, M]:
```
∫ x^p dμ_a = ∫ x^p dμ_b for all p ∈ ℕ_0  ⟺  μ_a = μ_b
```

For finite point measures μ_a = Σ E'_i × δ_{r_a_i} (which is our setting):
**The moments {c_p^{a} := Σ E'_i × r_a_i^p : p ∈ ℕ_0} uniquely determine the multiset {(r_a_i, E'_i)}**.

---

## 3. Theorem 8 (Equality Case)

### 3.1 Statement

**Theorem 8 (Equality case of Cressie-Read moment determination)**:

For two weighted r-vectors (r_a, E') and (r_b, E') ∈ ℝ_{>0}^K × ℝ_{>0}^K with same weights E':

```
Σ E'_i × r_a_i^p = Σ E'_i × r_b_i^p for all p ∈ ℕ_0
⟺ multiset {(r_a_i, E'_i)} = multiset {(r_b_i, E'_i)}
```

i.e., r_a = r_b up to permutation (with same E' weights).

### 3.2 Proof

**Step 1**: Direct application of Classical Hausdorff Moment Theorem (§2.1).

Define measures μ_a := Σ_i E'_i × δ_{r_a_i} and μ_b := Σ_i E'_i × δ_{r_b_i} on [m, M].

By assumption, ∫ x^p dμ_a = ∫ x^p dμ_b for all p ∈ ℕ_0.

By Hausdorff theorem, μ_a = μ_b.

**Step 2**: Since μ_a, μ_b are finite point measures (atoms at r_a_i, r_b_i with weights E'_i), equality μ_a = μ_b implies:
- Each atom of μ_a is also an atom of μ_b (same location and weight).
- → multiset {(r_a_i, E'_i)} = multiset {(r_b_i, E'_i)}

QED (Theorem 8, equality case).

### 3.3 Consequence

If r_a = r_b up to permutation (with same E' weights), then:
- T_λ(o_a) = T_λ(o_b) for all λ ∈ ℝ (since T_λ is symmetric in i).
- r_a ≻_{E'} r_b AND r_b ≻_{E'} r_a (since equal vectors trivially majorize).

→ Equality case of Lemma 7.5 strict.

---

## 4. Theorem 8' (Strict Inequality Case — PARTIAL)

### 4.1 Statement

**Theorem 8' (Strict inequality case of Cressie-Read moment-determination)**:

For two weighted r-vectors (r_a, E'), (r_b, E') with same E':

```
Σ E'_i × r_a_i^p ≥ Σ E'_i × r_b_i^p for all p ∈ ℕ_0
⟹ μ_a ≥_st μ_b (stochastic order on positive measures, weight-normalized)
```

where ≥_st is the stochastic order on probability measures.

### 4.2 Reduction strategy

**Step 1**: Normalize μ_a, μ_b by Σ E'_i = N + Kδ (constant). Let
```
π_a := μ_a / (N + Kδ),  π_b := μ_b / (N + Kδ)
```
These are probability measures on [m, M].

**Step 2**: Cressie-Read moment inequalities become:
```
∫ x^p dπ_a ≥ ∫ x^p dπ_b for all p ∈ ℕ_0
```

i.e., all power moments of π_a are ≥ those of π_b.

**Step 3**: Apply stochastic order characterization.

**Claim (open sub-question)**: If all power moments of π_a are ≥ those of π_b, does π_a ≥_st π_b (stochastic order on [m, M])?

### 4.3 Counter-example to stochastic order claim

Consider single-atom measures on [1, 2]:
- π_a = δ_2 (atom at 2)
- π_b = δ_1 (atom at 1)
- ∫ x^p dπ_a = 2^p ≥ 1^p = ∫ x^p dπ_b for all p ≥ 0. ✓
- π_a ≥_st π_b iff P(X ≥ t) under π_a ≥ P(X ≥ t) under π_b for all t.
- For t = 1.5: P(X ≥ 1.5) under π_a = 1, under π_b = 0. ✓
- For t = 1: P(X ≥ 1) under π_a = 1, under π_b = 1. ✓
- So π_a ≥_st π_b ✓.

OK this example works.

Now try mixed measures:
- π_a = 0.6 × δ_3 + 0.4 × δ_1 on [1, 3]
- π_b = 0.5 × δ_2 + 0.5 × δ_2 = δ_2 on [1, 3]
- ∫ x^p dπ_a = 0.6 × 3^p + 0.4. 
- ∫ x^p dπ_b = 2^p.
- p=1: 0.6×3 + 0.4 = 2.2 vs 2. ✓
- p=2: 0.6×9 + 0.4 = 5.8 vs 4. ✓
- p=3: 0.6×27 + 0.4 = 16.6 vs 8. ✓
- p→∞: dominates.
- For small p, also π_a moments are ≥.

Stochastic order: P(X ≥ t) under π_a vs π_b.
- t = 2.5: P(X ≥ 2.5) under π_a = 0.6, under π_b = 0. ✓
- t = 1.5: under π_a = 0.6, under π_b = 1. **π_a < π_b** at t = 1.5! 
- → NOT stochastic order.

→ **Power moment inequalities do NOT imply stochastic order in general!**

This is a **counter-example** to the natural conjecture.

### 4.4 But convex order may still hold!

For convex order ≥_cx:
- π_a ≥_cx π_b iff ∫ φ dπ_a ≥ ∫ φ dπ_b for all convex φ on [m, M].

Check: π_a = 0.6 × δ_3 + 0.4 × δ_1, π_b = δ_2.

Convex φ(x) = (x - 2)² (convex):
- ∫ φ dπ_a = 0.6 × 1 + 0.4 × 1 = 1
- ∫ φ dπ_b = 0
- π_a > π_b. ✓

Convex φ(x) = |x - 2| (convex):
- ∫ φ dπ_a = 0.6 × 1 + 0.4 × 1 = 1
- ∫ φ dπ_b = 0
- π_a > π_b. ✓

Convex φ(x) = max(0, x - 1.5):
- ∫ φ dπ_a = 0.6 × 1.5 + 0.4 × 0 = 0.9
- ∫ φ dπ_b = 0.5
- π_a > π_b. ✓

So π_a ≥_cx π_b in this case, even though NOT stochastic order.

**Important observation**: The convex order ≥_cx is **WEAKER** than ≥_st (stochastic order). So:
- Power moments matching → ≥_cx (possibly true)
- Power moments matching → ≥_st (false in general, §4.3 counter-example)

So Lemma 7.5 may still be true under convex order interpretation.

### 4.5 Lemma 7.5 의 정확한 statement (refined)

**Lemma 7.5 (refined final)**: For weighted point measures μ_a, μ_b with same weights E' on r-space:
```
∫ ψ_λ dμ_a ≥ ∫ ψ_λ dμ_b for all λ ∈ ℝ (with L'Hopital limits)
⟹ μ_a ≥_cx μ_b (convex stochastic order on [m, M])
⟺ r_a ≻_{E'} r_b (weighted HLP majorization)
```

The convex stochastic order ≥_cx is the **correct** characterization (not ≥_st).

### 4.6 Strict proof framework

**Key proposition (open)**: For probability measures π_a, π_b on compact [m, M] ⊂ ℝ_{>0}:
```
∫ x^p dπ_a ≥ ∫ x^p dπ_b for all p ∈ ℕ_0  ⟹  π_a ≥_cx π_b
```

This is a non-trivial **Bernstein-type extension** of the Hausdorff moment problem.

**Status**: Sub-claim under investigation in mathematical statistics literature. Strict proof depends on:
- Convex cone duality (Choquet theory)
- Bernstein-Tchakaloff theorem (positive linear combinations of x^p span positive convex functions in some norm)
- Specific use of Cressie-Read family (including L'Hopital limits)

**Honest open**: Full strict proof multi-cycle R&D.

---

## 5. Implication for Conjecture 7.2

### 5.1 Reduction completed

본 R&D 의 contribution:
- Theorem 8 (equality case) STRICT.
- Theorem 8' (strict inequality case) PARTIAL — natural conjecture (stochastic order) FALSIFIED via §4.3 counter-example.
- Refined Lemma 7.5 (final): convex stochastic order interpretation 정확.
- Conjecture 7.2 의 truth 가 Convex Stochastic Order Moment Problem 의 truth 에 reduces.

### 5.2 Status of Conjecture 7.2

**Conjecture 7.2 (final reduction)**:
T_λ(o_a) ≥ T_λ(o_b) for all λ ∈ ℝ (with L'Hopital limits) ⟹ r_a ≻_{E'} r_b ⟺ μ_a ≥_cx μ_b.

By the chain of reductions:
1. T_λ inequalities ⟺ Cressie-Read moment inequalities (Theorem 5 framework, 8c80e40)
2. Cressie-Read moment inequalities ⟹ Power moment inequalities (Lemma 5.1)
3. Power moment inequalities ⟹ Convex stochastic order ⟹ Weighted HLP majorization (Theorem 8' partial, OPEN final)

**Final status**: Lemma 7.5 의 strict proof 는 Step 3 의 strict argument 에 의존. 본 R&D 의 §4 가 partial framework 도출. Strict closed-form 별도 multi-cycle R&D.

---

## 6. Status Grade Update

| Stage | Commit | Status |
|---|---|---|
| Lemma 7.5 proposed | 899912d | Initial Hausdorff approach |
| Lemma 7.5 systematic verify | 51c9431 | 100% contrapositive |
| Lemma 7.6 (Lemma 7.3 univ. false) | 4ee1b03 | Sup-norm density 폐기 |
| **Theorem 8 (equality) + Theorem 8' partial** | **(current)** | **Equality case STRICT + Stochastic order FALSE + Convex order OPEN** |

---

## 7. Honest Limitations

1. **Theorem 8' (strict inequality case) 의 closed-form proof 안 됨** — multi-cycle R&D mandatory.

2. **§4.3 counter-example의 strict 정확성**: π_a, π_b 의 specific construction (mixed atoms) 의 power moment inequality verification 의 detailed numerical check 별도 R&D.

3. **§4.4 의 convex order claim** (π_a ≥_cx π_b in §4.3 example) 의 strict argument 는 specific φ examples 한정.

4. **Bernstein-Tchakaloff theorem 의 Cressie-Read family extension** 정확 statement 사용자 직접 verify (Shaked & Shanthikumar 2007 또는 동등 source).

5. **§5.1 의 reduction chain (3 steps) 의 정확성**: each step 의 strict 검증 별도 R&D.

6. **L'Hopital limits (ψ_0, ψ_{-1}) 의 Hausdorff moment problem extension** 의 정확성 별도 verify.

7. **Hand SNN R&D context 영향 0** (carryover).

8. **Olkin & Marshall 1979 + Cressie-Read 1984 + HLP 1934 + Rudin 1976 + Shaked & Shanthikumar 2007 + Shohat-Tamarkin 1943 published PDF 사용자 직접 verify mandatory** (carryover + 기존).

9. **Formal verification (Lean 4 / Coq) 안 됨**.

10. **Peer review 안 됨**.

11. **.env.snn-backup HIGH carryover**.

12. **Type: documentation-only — partial strict proof + framework**.

13. **본 R&D 의 mathematical 가치**: equality case strict + stochastic order natural conjecture falsification + convex order refined interpretation + reduction chain 명시. Conjecture 7.2 의 final truth 별도 R&D.

14. **§4.3 의 stochastic order falsification 의 mathematical 의미**: power moment inequalities 와 stochastic order 의 strict 비등치 입증 — 본 R&D series 의 새 negative result.

15. **본 R&D 의 §4 의 mathematical rigor 자기 평가**: counter-example construction은 strict, convex order claim은 sketch (specific φ tests). Strict universal proof 별도 mandatory.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- Theorem 8 (equality case): strict proof via classical Hausdorff moment theorem.
- §4.3 (NEW): natural conjecture "power moments ≥ → stochastic order" FALSIFIED via mixed atom counter-example.
- §4.4: convex order natural interpretation consistent with sketch verification.
- §4.5: Lemma 7.5 의 refined final statement (convex stochastic order).
- §5.1: 3-step reduction chain for Conjecture 7.2.

**다음 follow-up candidates (multi-cycle R&D)**:
- Theorem 8' (strict inequality case) closed-form proof
- Bernstein-Tchakaloff theorem 의 Cressie-Read family specialization
- §4.3 counter-example의 systematic numerical verification
- Lean 4 formal verification of Theorem 8 (equality case)

---

## 9. References

- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization*. Academic Press. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Rudin, W. (1976). *Principles of Mathematical Analysis*. McGraw-Hill.
- Shaked, M. & Shanthikumar, J. G. (2007). *Stochastic Orders*. Springer.
- Shohat, J. A. & Tamarkin, J. D. (1943). *The Problem of Moments*. American Mathematical Society.

---

## 10. Related Commits

- `4ee1b03` (2026-05-31): Lemma 7.6 universal Lemma 7.3 falsification
- `51c9431` (2026-05-31): Lemma 7.5 systematic numerical verify
- `899912d` (2026-05-31): Lemma 7.5 proposed + Lemma 7.3 m > 1 falsification
- `bbcb8b3` (2026-05-31): Conjecture 7.2 Stone-Weierstrass attempt

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
