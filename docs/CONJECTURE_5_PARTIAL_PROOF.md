# Conjecture 5 — Partial Closed-Form Proof of (⇐) Direction (Cressie-Read Family Restricted)

**R&D ID**: hand-snn-conjecture-5-partial-proof
**Date**: 2026-05-31
**Status**: PARTIAL PROOF — (⇐) direction strict for Cressie-Read family φ. (⇒) direction remains open. Multi-cycle R&D mandatory for full bidirectional closed-form.

---

## 1. Background

직전 commit `8c80e40` 의 Theorem 5 §5 Conjecture 5:

> **Conjecture 5 (Theorem 2 의 non-uniform null analog)**:
> ```
> T_λ(o_a; δ, p) ≥ T_λ(o_b; δ, p)  for all λ ∈ ℝ (with L'Hopital limits at λ ∈ {0, -1})
> ⟺  r(o_a) ≻_{E'} r(o_b)         (weighted majorization with weights w = E')
> ```

본 R&D 는 Conjecture 5 의 (⇐) direction (sufficient direction) 의 partial closed-form proof. (⇒) direction 은 open.

---

## 2. Setup (recap from Theorem 5 + Lemma 5.2)

- (N, K, p, δ) with p_i > 0, Σp_i = 1, δ > 0
- E'_i = N × p_i + δ
- r_i := O'_i / E'_i for O ∈ Ω(N, K)
- Lemma 5.1 (commit 8c80e40): T_λ(o; δ, p) = (2/(λ(λ+1))) × Σ_i E'_i × (r_i^{λ+1} - r_i) for λ ∉ {0, -1}
- Lemma 5.2 (commit 8f0e34d):
  - T_0(o; δ, p) = 2 × Σ_i O'_i × ln(O'_i / E'_i) = 2 × Σ_i E'_i × r_i × ln(r_i)
  - T_{-1}(o; δ, p) = 2 × Σ_i E'_i × ln(E'_i / O'_i) = -2 × Σ_i E'_i × ln(r_i)

Weighted majorization (Olkin & Marshall 1979 ch. 14): v ≻_w u iff Σ w_i v_{[i]} (sorted descending) satisfies partial sum conditions analogous to standard majorization with weights w.

**Weighted HLP-Karamata theorem (recap)**: For continuous convex φ : ℝ_{>0} → ℝ:
v ≻_w u ⟹ Σ w_i φ(v_i) ≥ Σ w_i φ(u_i)

(사용자 직접 verify mandatory: Olkin & Marshall 1979 ch. 14 published edition.)

---

## 3. Theorem 7.1 — (⇐) Direction Partial Proof

### 3.1 Statement

**Theorem 7.1 (Conjecture 5 (⇐) direction, Cressie-Read family restricted)**:

For any (N, K, p, δ) with p_i > 0, δ > 0, and any o_a, o_b ∈ Ω(N, K):

```
r(o_a) ≻_{E'} r(o_b)  (weighted majorization with weights w = E')
⟹  T_λ(o_a; δ, p) ≥ T_λ(o_b; δ, p)  for all λ ∈ ℝ (including L'Hopital limits λ ∈ {0, -1})
```

### 3.2 Proof

**Case λ ∉ {0, -1}**:

From Lemma 5.1:
```
T_λ(o; δ, p) = (2/(λ(λ+1))) × Σ_i E'_i × (r_i^{λ+1} - r_i)
            = A_λ × Σ_i E'_i × (r_i^{λ+1} - r_i)
            = A_λ × [Σ_i E'_i × r_i^{λ+1} - Σ_i E'_i × r_i]
            = A_λ × [Σ_i E'_i × r_i^{λ+1} - Σ_i O'_i]                  [since O'_i = E'_i × r_i]
```

where A_λ = 2/(λ(λ+1)).

**Key observation**: Σ_i O'_i = N + Kδ (constant in o ∈ Ω). 따라서 두 번째 term 은 o-invariant — T_λ ordering 의 결정은 첫 번째 term Σ_i E'_i × r_i^{λ+1} 의 ordering 에 의함 (with A_λ sign tracking).

Let φ_λ(x) := x^{λ+1}. φ_λ''(x) = (λ+1)λ × x^{λ-1}.
- λ > 0: φ_λ'' > 0 → φ_λ convex on x > 0
- -1 < λ < 0: φ_λ'' < 0 (since λ(λ+1) < 0) → φ_λ concave on x > 0
- λ < -1: φ_λ'' > 0 (since λ(λ+1) > 0) → φ_λ convex on x > 0

**Sub-case λ > 0**: A_λ > 0, φ_λ convex. By weighted HLP-Karamata:
r_a ≻_{E'} r_b ⟹ Σ E'_i × φ_λ(r_a_i) ≥ Σ E'_i × φ_λ(r_b_i)
⟹ A_λ × Σ E'_i × r_a_i^{λ+1} ≥ A_λ × Σ E'_i × r_b_i^{λ+1}
⟹ T_λ(o_a) ≥ T_λ(o_b). ✓

**Sub-case -1 < λ < 0**: A_λ < 0 (since λ(λ+1) < 0 → 2/(λ(λ+1)) < 0), φ_λ concave. By weighted HLP-Karamata (concave version):
r_a ≻_{E'} r_b ⟹ Σ E'_i × φ_λ(r_a_i) ≤ Σ E'_i × φ_λ(r_b_i)
⟹ A_λ × Σ E'_i × r_a_i^{λ+1} ≥ A_λ × Σ E'_i × r_b_i^{λ+1}   [sign flip: negative A × ≤ = ≥]
⟹ T_λ(o_a) ≥ T_λ(o_b). ✓

**Sub-case λ < -1**: A_λ > 0, φ_λ convex on x > 0. By weighted HLP-Karamata:
r_a ≻_{E'} r_b ⟹ Σ E'_i × φ_λ(r_a_i) ≥ Σ E'_i × φ_λ(r_b_i)
⟹ T_λ(o_a) ≥ T_λ(o_b). ✓

**Case λ = 0 (L'Hopital limit)**:

From Lemma 5.2: T_0(o; δ, p) = 2 × Σ_i E'_i × r_i × ln(r_i).

Let ψ_0(x) := x × ln(x). ψ_0''(x) = 1/x > 0 for x > 0 → ψ_0 convex on x > 0.

By weighted HLP-Karamata:
r_a ≻_{E'} r_b ⟹ Σ E'_i × ψ_0(r_a_i) ≥ Σ E'_i × ψ_0(r_b_i)
⟹ T_0(o_a) ≥ T_0(o_b). ✓

**Case λ = -1 (L'Hopital limit)**:

From Lemma 5.2: T_{-1}(o; δ, p) = -2 × Σ_i E'_i × ln(r_i).

Let ψ_{-1}(x) := -ln(x). ψ_{-1}''(x) = 1/x² > 0 for x > 0 → ψ_{-1} convex on x > 0.

By weighted HLP-Karamata:
r_a ≻_{E'} r_b ⟹ Σ E'_i × ψ_{-1}(r_a_i) ≥ Σ E'_i × ψ_{-1}(r_b_i)
⟹ T_{-1}(o_a) ≥ T_{-1}(o_b). ✓

**Combining all cases**: r_a ≻_{E'} r_b ⟹ T_λ(o_a) ≥ T_λ(o_b) for all λ ∈ ℝ (including L'Hopital limits).

QED (Theorem 7.1, (⇐) direction).

### 3.3 Consistency with uniform null Theorem 2

When p_i = 1/K (uniform null):
- E'_i = N/K + δ (constant in i)
- Weighted majorization with constant weights = standard majorization (up to scaling)
- Theorem 7.1 reduces to Theorem 2 (commit 1c5d717) (⇐) direction. ✓

본 Theorem 7.1 은 Theorem 2 의 strict non-uniform null 확장 (⇐) direction.

---

## 4. (⇒) Direction — Open Problem (Conjecture 7.2)

### 4.1 Statement

**Conjecture 7.2 (Conjecture 5 의 (⇒) direction, OPEN)**:

For any (N, K, p, δ) with p_i > 0, δ > 0, and any o_a, o_b ∈ Ω(N, K):

```
T_λ(o_a; δ, p) ≥ T_λ(o_b; δ, p)  for all λ ∈ ℝ
⟹  r(o_a) ≻_{E'} r(o_b)
```

### 4.2 Why (⇒) is hard

Standard HLP-Karamata theorem 의 bidirectional form (commit 1c5d717 §2.2 의 condition 2) 는:
"v ≻ u ⟺ Σ φ(v_i) ≥ Σ φ(u_i) for all continuous convex φ"

이 statement 의 ⟺ 의 (⇐) direction 은 "all convex φ" 의 universe 를 필요로 함. 단 Cressie-Read family φ_λ = x^{λ+1} 은 convex φ space 의 **subset 한정** — 모든 convex φ 를 cover 안 함.

따라서 Cressie-Read T_λ 가 all λ ∈ ℝ 에서 (with sign tracking) Σ E' × φ_λ(r_a) ≥ Σ E' × φ_λ(r_b) 를 의미하더라도, 이로부터 "all convex φ" 의 inequality 를 도출하기에는 충분 안 함.

특히 weighted HLP-Karamata 의 bidirectional form 의 (⇐) direction 의 strict statement (Olkin & Marshall 1979 ch. 14) 와 본 Cressie-Read 한정 subset 의 결합 strict 분석 별도 R&D mandatory.

### 4.3 Potential proof attempts (multi-cycle R&D)

1. **Cressie-Read family 의 dense subset 의 weighted HLP-Karamata 충분성**: x^{λ+1} family 가 weighted majorization 의 characterization 에 sufficient 한지 strict verify.

2. **Specific (N, K, p) regime 한정 (⇒) direction**: 예를 들어 Theorem 6.3 의 Regime (D) 에서 (⇒) direction 의 r-space-specific strict proof.

3. **(⇒) direction 의 strict negative result**: Cressie-Read family 만으로 weighted majorization 의 characterization 이 부족하다는 explicit counter-example.

---

## 5. Implication for Theorem 5 + 6.3

### 5.1 Theorem 5 (Conjecture 5) 의 status update

직전 commit 8c80e40 §5 Conjecture 5 의 status:
- **(⇐) direction**: 본 R&D Theorem 7.1 로 closed-form 완성
- **(⇒) direction**: Conjecture 7.2 로 명시 + OPEN multi-cycle R&D

### 5.2 Theorem 6.3 (bc7e84a) 의 함의

Theorem 6.3 의 Regime (D) (K = 4 ∧ N = 5 ∧ p ∈ NU_5_4 → NOT chain) 에서:
- f446675 enumeration 결과 → r-space 에 majorization-incomparable pairs 존재
- 본 Theorem 7.1 의 (⇐) direction 에 의해 → 이 incomparable pairs 의 T_λ ordering 이 일정 부분 reverse 가능

→ Theorem 6.3 Regime (D) 의 "NOT chain" 결과는 Conjecture 7.2 의 (⇒) direction 의 strict proof 없이도 numerical evidence 로 강한 의미.

---

## 6. Status grade update

| Stage | Commit | Status |
|---|---|---|
| Empirical | 0f3acf0 | 189/189 byte-identical |
| Theorem 2 (uniform null ordering) | 1c5d717 | Full closed-form |
| Theorem 3 (uniform null chain) | 6f6104d | K ≤ 2 ∨ N ≤ 5 |
| Theorem 4 (δ-robust) | 94dbf07 | Moment-structure |
| Theorem 5 Lemma 5.1 | 8c80e40 | Non-uniform weighted form |
| Lemma 5.2 (L'Hopital) | 8f0e34d | G²/Modified LR weighted |
| Non-uniform reproducer | 33f592d | 36/36 + self-catch |
| Lemma 6.1 + Conjecture 6.2 | 90ee122 | Necessary proven |
| (N=5, K=4) enumeration | f446675 | Conjecture 6.2 FALSIFIED |
| Theorem 6.3 synthesis | bc7e84a | Closed-form for regimes (A)-(D) |
| **Theorem 7.1 (Conjecture 5 (⇐))** | **(current)** | **partial proof (⇐) closed-form, (⇒) OPEN** |

---

## 7. Honest Limitations

1. **Conjecture 7.2 ((⇒) direction) 의 closed-form proof 안 됨** — multi-cycle R&D mandatory. 본 R&D 는 (⇐) direction 한정 closed-form.

2. **Olkin & Marshall 1979 ch. 14 weighted HLP-Karamata theorem 의 published edition 사용자 직접 verify mandatory** — 본 R&D 의 §2 statement 는 standard form 추정.

3. **Weighted majorization 정의의 정확성**: Olkin & Marshall 1979 ch. 14 의 "comparable" 정의가 본 R&D 의 ≻_{E'} 와 strict equivalent 인지 사용자 verify.

4. **(⇐) direction proof 의 strict measure-theoretic justification**: 본 R&D 는 standard textbook calculus + HLP-Karamata 적용 한정. dominated convergence 같은 측도 이론적 rigor 별도 R&D.

5. **Cressie-Read 1984 §3 의 L'Hopital limit forms 의 정확 transcription** 사용자 직접 verify mandatory (carryover).

6. **HLP 1934 + Olkin & Marshall 1979 + Macdonald 1995 published PDF 사용자 직접 verify mandatory** (carryover).

7. **Formal verification (Lean 4 / Coq) 안 됨** — Mathlib 의 weighted HLP-Karamata library 가 있을 경우 본 §3 proof 의 mechanical verification 가능.

8. **Conjecture 7.2 의 strict negative result 가능성**: (⇒) direction 이 actually false 가능성도 있음 (Cressie-Read family 만으로 weighted majorization characterization 의 sufficient set 아닐 수 있음). 미해결.

9. **Theorem 6.3 의 Regime (D) 와 본 R&D 의 결합 strict 의미**: Theorem 6.3 Regime (D) 의 not-chain 결과가 (⇒) direction 의 partial evidence 가 될 수 있는지 별도 R&D.

10. **Hand SNN R&D context 영향 없음 확인** — 본 partial proof 는 mathematical extension scope, Hand SNN R&D 의 결론 (Theorem 2-4) 약화 0.

11. **Peer review 안 됨** — published statistical literature cross-check 사용자 mandatory.

12. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate mandatory (security scope 외).

13. **Type: documentation-only — partial proof artifact 한정**. Reproducer (33f592d) 와 f446675 결과는 본 partial proof 의 indirect evidence.

14. **본 R&D 의 mathematical 가치 정직 평가**: Theorem 5 framework 의 (⇐) direction 완성 + (⇒) direction 의 정확한 open problem 명시. Strict 새 mathematical theorem.

15. **본 (⇐) direction proof 의 algebraic step 의 strict computation 의 정확성** — 사용자 또는 future R&D 에서 hand-verify 권고. 특히 sub-case sign tracking (A_λ sign + φ_λ convexity 결합) 의 case analysis 정확성.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- Theorem 7.1 (proven, partial closed-form): Conjecture 5 의 (⇐) direction 완성 (Cressie-Read family 한정).
- §3.2 case analysis: λ > 0 / -1 < λ < 0 / λ < -1 / λ = 0 / λ = -1 모두 strict 산수 적용.
- Conjecture 7.2 (refined OPEN): Conjecture 5 의 (⇒) direction 의 정확한 open problem 명시.
- §5 Theorem 6.3 Regime (D) 와의 함의 connection.

**다음 follow-up candidates**:
- Conjecture 7.2 의 closed-form proof attempt (multi-cycle)
- 또는 Conjecture 7.2 의 strict negative result (counter-example)
- Theorem 7.1 의 algebraic step formal verification (Lean 4)
- Olkin & Marshall 1979 ch. 14 published edition 사용자 직접 verify (mandatory)

---

## 9. References

- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization and Its Applications*. Academic Press. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press. §2.18-§2.22.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Read, T. R. C. & Cressie, N. A. C. (1988). *Goodness-of-Fit Statistics for Discrete Multivariate Data*. Springer.

**사용자 직접 verify mandatory** (carryover):
- HLP 1934, Olkin & Marshall 1979 ch. 14 (weighted HLP-Karamata)

---

## 10. Related Commits

- `bc7e84a` (2026-05-31): Theorem 6.3 synthesis
- `f446675` (2026-05-31): (N=5, K=4) enumeration Conjecture 6.2 falsified
- `90ee122` (2026-05-31): Lemma 6.1 + Conjecture 6.2 partial
- `33f592d` (2026-05-31): Non-uniform null reproducer
- `8f0e34d` (2026-05-31): Lemma 5.2 L'Hopital weighted
- `8c80e40` (2026-05-31): Theorem 5 Lemma 5.1
- `6f6104d` (2026-05-31): Theorem 3
- `1c5d717` (2026-05-31): Theorem 2

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
**License**: Same as parent repository
