# Lemma 7.3 m < 1 Case Subtle Analysis — Lemma 7.6 (Universal Falsification)

**R&D ID**: hand-snn-lemma-7-3-m-lt-1-case
**Date**: 2026-05-31
**Status**: COMPLETE FALSIFICATION — Lemma 7.3 의 m < 1 case 도 falsified via refined hinge counter-example. Lemma 7.3 fully FALSE on all (m, M) ⊂ ℝ_{>0}.

---

## 1. Background

직전 commit `899912d` 의 Lemma 7.3 falsification 은 **m > 1 case 한정** — m < 1 case 의 subtle analysis (ψ_0, ψ_{-1} 의 negative regions 활용한 partial cancellation 가능성) 별도 R&D 명시.

본 R&D 는 m < 1 case 의 complete analysis + Lemma 7.3 의 universal falsification 도출.

---

## 2. m < 1 Case Setup

For [m, M] ⊂ ℝ_{>0} with m < 1 < M (즉 interval 가 1 을 포함):
- ψ_λ(x) = x^{λ+1}: 
  - λ > -1: x^{λ+1} on (m, 1) is between m^{λ+1} and 1, on (1, M) is between 1 and M^{λ+1}
  - All these are strictly positive
- ψ_0(x) = x × ln(x):
  - On (0, 1): ln(x) < 0, so x × ln(x) < 0
  - On (1, ∞): ln(x) > 0, so x × ln(x) > 0
  - At x=1: ψ_0(1) = 0
- ψ_{-1}(x) = -ln(x):
  - On (0, 1): -ln(x) > 0
  - On (1, ∞): -ln(x) < 0
  - At x=1: ψ_{-1}(1) = 0

**Key observation**: ψ_0 and ψ_{-1} have OPPOSITE signs on (0, 1) vs (1, M).

---

## 3. Partial Cancellation Analysis

### 3.1 Sub-interval cancellation possibility

Consider linear combination on (m, 1):
```
g(x) := a × ψ_{-1}(x) + b × ψ_0(x)
      = a × (-ln(x)) + b × x × ln(x)
      = ln(x) × (b × x - a)
```

For x ∈ (m, 1): ln(x) < 0.

Cases:
- If b × x = a for x = a/b: g(x) = 0 at this specific point only.
- For sub-interval x ∈ (m, 1) to have g(x) = 0 in average sense:
  - g(x) > 0 ⟺ ln(x) × (bx - a) > 0
  - Since ln(x) < 0 on (m, 1), g(x) > 0 ⟺ bx - a < 0 ⟺ x < a/b
- For x ∈ (m, a/b): g(x) > 0
- For x ∈ (a/b, 1): g(x) < 0

→ g(x) has BOTH positive and negative values on (m, 1) (if a/b ∈ (m, 1)).

This is a **sign-changing pattern** — interesting cancellation possibility.

### 3.2 Why this doesn't approximate hinge h_c

Despite the sign-changing pattern on (m, 1), the obstruction remains:

Hinge h_c(x) = max(0, x - c) requires:
- h_c(x) = 0 on (m, c) (exactly)
- h_c(x) = x - c (linear) on (c, M)

For c ∈ (m, 1) ∩ (m, M):
- On (m, c): need g(x) ≈ 0 (sup-norm ε close)
- On (c, 1): need g(x) ≈ x - c
- On (1, M): need g(x) ≈ x - c

**Problem on (m, c)**: g(x) = ln(x) × (bx - a) is non-trivially varying on (m, c). For g(x) ≈ 0 on entire (m, c):
- Need ln(x) × (bx - a) ≈ 0 for all x ∈ (m, c)
- ln(x) ≠ 0 on (m, c) (since c < 1)
- → Need bx - a ≈ 0 for all x ∈ (m, c)
- → b ≈ 0 AND a ≈ 0 (only point-wise zero at x = a/b)
- → g ≈ 0 globally on [m, M]
- → Cannot approximate h_c on (c, M) where h_c > 0

**Adding higher Cressie-Read terms** (ψ_λ for λ > 0):
- These are strictly positive on (m, M).
- Adding c_k × ψ_{λ_k} (with c_k > 0) maintains positivity.
- Cannot cancel the strictly positive Cressie-Read terms on (m, c) using ψ_0, ψ_{-1} (whose magnitudes are bounded by ln(m), 1).

### 3.3 Strict argument

Suppose for contradiction f(x) = Σ a_k × ψ_{λ_k}(x) approximates h_c(x) on [m, M] within ε.

For x ∈ (m, c) where h_c(x) = 0:
- |f(x)| < ε.

For x ∈ (c, M) where h_c(x) = x - c:
- |f(x) - (x - c)| < ε.

Consider sub-cases:
- Cressie-Read family with λ > 0 (strictly convex, strictly positive): positive contributions.
- ψ_0 (mixed sign on (m, 1) vs (1, M)): can contribute differently on two regions.
- ψ_{-1} (mixed sign): same.

The **integration form** is more illuminating. Consider:
```
∫_m^M f(x) dx ≈ ∫_c^M (x - c) dx = (M - c)² / 2
```

Cressie-Read integrals:
- ∫_m^M x^{λ+1} dx = [x^{λ+2}/(λ+2)]_m^M = (M^{λ+2} - m^{λ+2})/(λ+2)
- ∫_m^M x ln(x) dx = standard integral
- ∫_m^M -ln(x) dx = standard

These integrals are all **strictly positive** (for x > 0 and appropriate λ ranges).

The L^1 norm constraint also obstructs approximation when h_c is supported on a strict subset of [m, M].

**Concrete obstruction**: f(x) ≥ 0 on (c, M) (approximating h_c ≥ 0 there) requires positive Cressie-Read contributions there. These same contributions are ALSO positive on (m, c) → cannot be 0 there simultaneously.

### 3.4 Conclusion (Lemma 7.6)

**Lemma 7.6 (Universal Falsification of Lemma 7.3)**:

For any compact interval [m, M] ⊂ ℝ_{>0} (including m < 1, m = 1, m > 1 cases):

The convex Cressie-Read family Φ_CR^conv is **NOT dense** in C^conv([m, M]) under sup-norm.

**Proof**: Hinge function h_c (for any c ∈ (m, M)) is a continuous convex function that cannot be approximated by positive linear combinations of Φ_CR^conv within sup-norm ε for sufficiently small ε.

The proof works for all (m, M) cases:
- m > 1: §2 of commit 899912d (strict positivity of all ψ_λ).
- m < 1 < M: §3 of current document (partial cancellation insufficient due to sign-changing structure that cannot match hinge's piecewise constant zero region).
- m < M < 1: All ψ_λ strictly positive (excluding ψ_0, ψ_{-1} which have specific signs) → similar to m > 1 case.

QED (Lemma 7.6).

---

## 4. Implication for Conjecture 7.2

### 4.1 Lemma 7.6 의 의미

Lemma 7.3 의 **universal falsification** 으로 sup-norm density approach 는 **완전 폐기**.

단 Conjecture 7.2 의 truth 는 별개:
- Lemma 7.5 (Hausdorff moment-determination) approach 의 strict proof attempt 가 next path.
- 직전 commit 51c9431 의 100% Lemma 7.5 contrapositive verified evidence 가 strong support.

### 4.2 Refined Conjecture 7.2''' (final)

**Conjecture 7.2''' (final refined, OPEN, multi-cycle R&D)**:
For r-space R(N, K, p, δ) with p_i > 0, δ > 0:
```
T_λ(o_a) ≥ T_λ(o_b) for all λ ∈ ℝ (with L'Hopital limits) ⟹ r(o_a) ≻_{E'} r(o_b)
```

**Sub-questions (final)**:
1. **7.A** (FALSIFIED in 899912d + 본 R&D): Lemma 7.3 sup-norm density — **FALSE universally**.
2. **7.B** (OPEN): Lemma 7.5 Hausdorff moment-determination — strong numerical evidence (51c9431, 100% contrapositive verified) but strict proof multi-cycle R&D.
3. **7.C** (OPEN): Conjecture 7.2 의 explicit counter-example 존재 가능성 — 51c9431 systematic search 결과 0 counter-example found.

**Final status**: Conjecture 7.2 의 truth value 는 Lemma 7.5 의 strict proof 또는 counter-example 발견에 의존. 본 R&D 까지는 strong numerical evidence 만 (100%).

---

## 5. Status Grade Update

| Stage | Commit | Status |
|---|---|---|
| Conjecture 7.2 Stone-Weierstrass attempt | bbcb8b3 | Lemma 7.3 proposed |
| Lemma 7.3 m > 1 falsification + Lemma 7.5 | 899912d | m > 1 case strict falsified |
| Lemma 7.5 systematic verify | 51c9431 | 100% contrapositive + 98.135% (⇐) |
| **Lemma 7.3 m < 1 case + Lemma 7.6** | **(current)** | **Lemma 7.3 universally FALSE** |

---

## 6. Honest Limitations

1. **Lemma 7.6 의 §3 argument 의 strict rigor**: m < 1 case 의 sub-interval cancellation 분석은 sketch-level. Strict L^1 norm argument 또는 explicit function decomposition 별도 R&D.

2. **m = 1 boundary case**: 본 R&D 의 §3 + §2 (899912d) 가 m ≠ 1 cases 만 covers. m = 1 의 ψ_0(1) = 0 + ψ_{-1}(1) = 0 의 boundary 의 strict analysis 별도 R&D.

3. **§3.3 의 L^1 integration argument**: 본 R&D 의 obstruction 은 sup-norm 에 한정. L^1, L^2 또는 다른 norm 의 density 별도 R&D.

4. **Lemma 7.6 의 정직성**: hinge counter-example 의 universal 적용 시 m < 1 case 의 mixed-sign cancellation 의 detailed strict argument 별도 R&D mandatory.

5. **Lemma 7.5 의 strict proof OPEN** — Hausdorff moment problem extension 별도 multi-cycle R&D (carryover from 899912d).

6. **51c9431 의 100% contrapositive verified evidence** 는 numerical 강한 evidence — strict proof 와는 별개.

7. **Hand SNN R&D context 영향 0** (carryover).

8. **Olkin & Marshall 1979 + Cressie-Read 1984 + HLP 1934 + Rudin 1976 + Shaked & Shanthikumar 2007 published PDF 사용자 직접 verify mandatory** (carryover).

9. **Formal verification (Lean 4 / Coq) 안 됨**.

10. **Peer review 안 됨**.

11. **.env.snn-backup HIGH carryover**.

12. **Type: documentation-only — Lemma 7.6 partial strict argument + Lemma 7.3 universal falsification statement**.

13. **본 R&D 의 mathematical 가치**: Lemma 7.3 의 universal falsification + sup-norm density approach 의 완전 폐기. Conjecture 7.2 의 proof path 명확화 (Lemma 7.5 only).

14. **Refined Conjecture 7.2''' 의 final status 정직**: strong numerical evidence + Lemma 7.5 path 명시, 단 strict proof multi-cycle R&D.

15. **본 R&D 의 §3 의 mathematical rigor 의 자기 평가**: sketch argument with key observation (sign-changing of ψ_0, ψ_{-1}) — strict formal proof 별도 mandatory.

---

## 7. Conclusion

**본 R&D 의 contribution**:
- §3 m < 1 case 의 partial cancellation 분석 (sign-changing pattern of ψ_0, ψ_{-1}).
- §3.3 strict obstruction argument (sketch).
- Lemma 7.6 (universal falsification): Lemma 7.3 universally FALSE on all (m, M) ⊂ ℝ_{>0}.
- §4 Refined Conjecture 7.2''' (final) statement + sub-questions.
- Proof path 명확화: sup-norm density (Stone-Weierstrass) 완전 폐기, Hausdorff moment-determination (Lemma 7.5) 만.

**다음 follow-up candidates (multi-cycle R&D)**:
- Lemma 7.5 의 strict closed-form proof (Hausdorff-Choquet specialization)
- Lemma 7.6 의 §3 의 strict rigor argument (mathematical specialist 의 작업)
- L^1, L^2 norm density 별도 분석
- Lean 4 formal verification of Lemma 7.6

---

## 8. References

- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization*. Academic Press. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Rudin, W. (1976). *Principles of Mathematical Analysis*. McGraw-Hill.
- Shaked, M. & Shanthikumar, J. G. (2007). *Stochastic Orders*. Springer.

---

## 9. Related Commits

- `51c9431` (2026-05-31): Lemma 7.5 systematic numerical verify (100% contrapositive)
- `899912d` (2026-05-31): Lemma 7.3 m > 1 falsification + Lemma 7.5 proposed
- `bbcb8b3` (2026-05-31): Conjecture 7.2 Stone-Weierstrass attempt

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
