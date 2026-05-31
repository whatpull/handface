# r-Space Chain Synthesis — Theorem 6.3 (Theorem 3 + f446675 falsification 결합)

**R&D ID**: hand-snn-r-space-chain-synthesis
**Date**: 2026-05-31
**Status**: CLOSED-FORM SYNTHESIS for known regimes — Theorem 3 (uniform null chain), Lemma 6.1 (general K ≥ 3 ∧ N ≥ 6 not chain), f446675 (non-uniform N=5, K=4 not chain) 의 결합. 일부 small (N ≤ 5, K ≥ 3, p non-uniform) regimes 는 open.

---

## 1. Background

직전 R&D 의 연쇄 결과:
- Theorem 3 (commit `6f6104d`): **uniform null** partition lattice chain ⟺ K ≤ 2 ∨ N ≤ 5
- Lemma 6.1 (commit `90ee122`): K ≥ 3 ∧ N ≥ 6 → r-space NOT chain for any p (necessary direction)
- Conjecture 6.2 (commit `90ee122`): K ≤ 2 ∨ N ≤ 5 → r-space chain for all p (proposed sufficient direction)
- **f446675**: Conjecture 6.2 NUMERICALLY FALSIFIED at (N=5, K=4) for non-uniform p — 12/15 cells (4 non-uniform p × 3 δ) all NOT_chain

본 R&D 는 위 결과를 결합한 mathematical synthesis. Conjecture 6.2 의 reformulated 정확 statement (Theorem 6.3) 도출.

---

## 2. Setup (recap)

For (N, K, p, δ) with p_i > 0 ∀i, Σp_i = 1, δ > 0:
- Ω(N, K) := {O ∈ ℕ^K : ΣO_i = N}
- E'_i = N × p_i + δ (i-dependent for non-uniform p)
- r(O) = (O'_1/E'_1, ..., O'_K/E'_K)
- R(N, K, p, δ) := {r(O) : O ∈ Ω}
- "Chain" iff every pair (r_a, r_b) ∈ R × R is weighted-majorization comparable.

---

## 3. Theorem 6.3 — Closed-form Chain Synthesis

### 3.1 Statement

**Theorem 6.3 (r-space chain characterization, closed-form for known regimes)**:

For r-space R(N, K, p, δ) with p_i > 0 ∀i and δ > 0:

```
Regime (A) — Trivially chain:
  K ≤ 2  ⟹  R(N, K, p, δ) is chain     (any N, any p, any δ)

Regime (B) — Uniform null chain (Theorem 3 직접 적용):
  K ≥ 3  ∧  N ≤ 5  ∧  p = (1/K, ..., 1/K)  ⟹  R(N, K, p, δ) is chain

Regime (C) — Not chain (Lemma 6.1):
  K ≥ 3  ∧  N ≥ 6  ⟹  R(N, K, p, δ) is NOT chain     (any p, any δ)

Regime (D) — Non-uniform N=5, K=4 not chain (f446675 numerical verify):
  K = 4  ∧  N = 5  ∧  p ∈ NU_5_4   ⟹   R(5, 4, p, δ) is NOT chain
  where NU_5_4 = {p2, p3, p4, p5} verified configurations:
    p2 = (0.5, 0.3, 0.15, 0.05)
    p3 = (0.7, 0.1, 0.1, 0.1)
    p4 = (0.4, 0.3, 0.2, 0.1)
    p5 = (0.4, 0.4, 0.1, 0.1)
```

**Open regimes (multi-cycle R&D)**:
- (N ≤ 5, K = 3, p non-uniform): unverified
- (N ≤ 5, K = 4, p non-uniform ∉ NU_5_4): un-systematically verified — 4 verified configurations 만
- (N = 3 or 4, K = 4, p non-uniform): unverified
- (N = 5, K ≥ 5, p any): unverified (Theorem 3 의 partition lattice chain condition 은 K ≥ 5 에서도 N ≤ 5 의 경우 chain)

### 3.2 Proof outline

**Regime (A)**: Theorem 3 의 Direction (A) (K ≤ 2 trivial chain) 의 직접 응용. Weighted majorization 도 K ≤ 2 에서는 linearly ordered (max-element rule).

**Regime (B)**: p uniform → E'_i = N/K + δ (constant in i) → weights all equal → weighted majorization = standard majorization (scaled). Theorem 3 의 Direction (B) (N ≤ 5 enumeration) 의 직접 응용.

**Regime (C)**: Lemma 6.1 (commit `90ee122`) 의 proven necessary direction.

**Regime (D)**: f446675 의 systematic enumeration 결과 — 12 cells (4 p × 3 δ) 모두 strict counter-example 확인.

QED for the closed-form regimes (A)-(D). Open regimes 별도 R&D mandatory.

### 3.3 Implication

**핵심 mathematical fact (본 synthesis 의 contribution)**:

r-space chain regime 은 weights (즉 prior p) 에 **explicitly 의존** — Conjecture 6.2 의 "K ≤ 2 ∨ N ≤ 5 → chain" 의 universal-p claim 은 false.

직접 시사:
- Theorem 3 (uniform null 한정) 의 chain condition 은 non-uniform null 으로 직접 확장 안 됨.
- N ≤ 5 의 chain regime 은 uniform p 한정의 special case.
- Non-uniform p 의 chain condition 은 r-space 의 weighted majorization structure 의 case-by-case 분석 mandatory.

---

## 4. Hand SNN R&D Implication

### 4.1 직접 영향

Hand SNN R&D 의 current regime (N=5/3, K=4, uniform null p=(0.25, 0.25, 0.25, 0.25), δ ∈ {0.1, 0.5, 1.0}):
- Theorem 6.3 의 **Regime (B)** 에 속함 → **chain 유지** (method-agnostic).
- 즉 Hand SNN R&D 의 결론 (Theorem 2-4) 그대로 유효.

### 4.2 Future Hand SNN R&D 의 critical warning

만약 사전 지식 (예: cluster 별 사용 빈도 실측 data) 으로 non-uniform prior 도입 시도하면:
- Hand SNN 의 (N=5, K=4) regime 이 **Theorem 6.3 의 Regime (D) 로 이동 가능성**
- f446675 의 strict counter-example 이 모든 non-uniform p ∈ NU_5_4 에서 not chain 증명
- → **method (λ) 선택이 다시 결정적 영향** — single method 결과의 robustness 손실

**Recommendation**: Hand SNN R&D 의 non-uniform prior 도입 시 multiple λ cross-check 또는 weighted majorization comparable pairs 선별 보고 mandatory.

---

## 5. Status grade update

| Stage | Commit | Status |
|---|---|---|
| Empirical | 0f3acf0 | 189/189 byte-identical |
| Theorem 2 (uniform null ordering) | 1c5d717 | Full closed-form |
| Theorem 3 (uniform null chain) | 6f6104d | K ≤ 2 ∨ N ≤ 5 |
| Theorem 4 (δ-robust) | 94dbf07 | Moment-structure preservation |
| Uniform null reproducer | 00775a6 | 51/56 + auto-catch |
| Theorem 5 Lemma 5.1 | 8c80e40 | Non-uniform weighted form |
| Lemma 5.2 (L'Hopital) | 8f0e34d | G²/Modified LR weighted |
| Non-uniform reproducer | 33f592d | 36/36 + self-catch |
| Lemma 6.1 + Conjecture 6.2 | 90ee122 | Necessary proven + sufficient OPEN |
| (N=5, K=4) enumeration | f446675 | Conjecture 6.2 FALSIFIED at non-uniform p |
| **Theorem 6.3 synthesis** | **(current)** | **Closed-form for known regimes (A)-(D), open regimes 명시** |

---

## 6. Honest Limitations

1. **Regime (D) 의 NU_5_4 한정**: f446675 의 enumeration 은 4 specific non-uniform p configurations 한정. 다른 non-uniform p (NU_5_4 외) 의 chain 여부는 별도 verify mandatory.

2. **Open regimes 다수**: (N ≤ 5, K = 3, p non-uniform), (N = 3 또는 4, K = 4, p non-uniform), (N = 5, K ≥ 5, p non-uniform) 모두 unverified. Systematic enumeration extension 별도 R&D.

3. **Theorem 6.3 의 Regime (D) 의 closed-form universal statement 안 됨** — "K = 4 ∧ N = 5 ∧ p ∈ NU_5_4" 는 specific configurations 한정. 일반 "K ≥ 3 ∧ N ≤ 5 ∧ p non-uniform → not chain" 의 universal claim 은 미증명.

4. **f446675 의 numerical evidence 만** — strict mathematical proof 별도 R&D (예: weighted HLP-Karamata 의 explicit application).

5. **Hand SNN R&D 의 Theorem 6.3 Regime (B) 적용 정직성**: 현재 uniform null 한정 결론 (Theorem 2-4) 유효 단 future non-uniform prior 도입 시 Regime (D) 이동 가능성.

6. **Reformulated Conjecture 6.2' (uniform-p 한정) 은 Theorem 3 의 직접 재진술** — 새 mathematical 결과 아님. 본 R&D 의 contribution 은 Theorem 3 의 non-uniform extension 의 systematic limit identification.

7. **Olkin & Marshall 1979 ch. 14 weighted majorization characterization 사용자 직접 verify mandatory** (carryover).

8. **Formal verification (Lean 4 / Coq) 안 됨** (carryover).

9. **HLP 1934 + Cressie-Read 1984 + Olkin-Marshall 1979 + Macdonald 1995 published PDF 사용자 직접 verify mandatory** (carryover).

10. **Peer review 안 됨** — published statistical literature cross-check 사용자 mandatory.

11. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate mandatory (security scope 외).

12. **Type: documentation-only — synthesis 한정**. f446675 numerical artifact + 6f6104d Theorem 3 + 90ee122 Lemma 6.1 + 결합.

13. **본 synthesis 의 mathematical 가치 정직 평가**: Conjecture 6.2 의 reformulation + 정확한 boundary 명시 + open regimes 식별. Strict 새 mathematical theorem 보다 mathematical landscape clarification 의 가치.

14. **(N=5, K=5) 등 다른 K case 의 partition lattice chain 의 weights extension** 별도 R&D — Theorem 3 의 Direction (B) 의 K ≥ 5 case 의 weighted form 직접 verify.

15. **r-space chain 의 weighted majorization 정의의 strict equivalence with T_λ sign-consistency rule** 사용자 verify mandatory (Lemma 5.1 + 5.2 framework 의 implicit assumption).

---

## 7. Conclusion

**본 R&D 의 contribution**:
- Theorem 6.3 (closed-form for known regimes): Regimes (A)-(D) 의 strict statement
- f446675 결과의 mathematical synthesis (Conjecture 6.2 의 정직한 reformulation)
- Hand SNN R&D 의 future non-uniform prior 도입 시 critical warning
- Open regimes 식별 (multi-cycle R&D 후보)

**다음 follow-up candidates (multi-cycle)**:
- Regime (D) 의 universal claim ("K ≥ 3 ∧ N ≤ 5 ∧ p non-uniform → not chain") 의 strict proof
- (N ≤ 5, K = 3, p non-uniform) systematic enumeration
- Theorem 6.3 의 Regime (B) 의 Olkin & Marshall 1979 ch. 14 weighted majorization characterization 의 explicit 일관성 verify
- Lean 4 / Coq formal verification of Theorem 6.3

---

## 8. References

- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press.
- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization and Its Applications*. Academic Press. Ch. 14.
- Macdonald, I. G. (1995). *Symmetric Functions and Hall Polynomials*. Oxford University Press.

**사용자 직접 verify mandatory** (carryover):
- HLP 1934, Olkin & Marshall 1979 ch. 14, Cressie-Read 1984, Macdonald 1995

---

## 9. Related Commits

- `f446675` (2026-05-31): (N=5, K=4) enumeration — Conjecture 6.2 falsified at non-uniform p
- `90ee122` (2026-05-31): Lemma 6.1 + Conjecture 6.2 partial
- `33f592d` (2026-05-31): Non-uniform null reproducer
- `8f0e34d` (2026-05-31): Lemma 5.2 L'Hopital weighted limits
- `8c80e40` (2026-05-31): Theorem 5 Lemma 5.1 weighted form
- `6f6104d` (2026-05-31): Theorem 3 (uniform null chain)
- `1c5d717` (2026-05-31): Theorem 2 (uniform null full closed-form)
- `a6aa72a` (2026-05-30): Partial proof
- `0f3acf0` (2026-05-30): Empirical 189/189

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
**License**: Same as parent repository
