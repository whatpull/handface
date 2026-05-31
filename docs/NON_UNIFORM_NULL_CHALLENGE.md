# Non-Uniform Null Challenge — Theorem 5 (Partial Framework + Open Problem)

**R&D ID**: hand-snn-non-uniform-null-challenge
**Date**: 2026-05-31
**Status**: PARTIAL FRAMEWORK + OPEN PROBLEM — Challenge identification + weighted HLP majorization (Olkin & Marshall 1979 ch. 14) framework introduction. Full closed-form proof 는 multi-cycle R&D 로 정직히 open.

---

## 1. Background

직전 cycle 의 R&D series (Theorem 2-4) 의 모든 mathematical foundation 은 **uniform null 가정**:

```
p_i = 1/K  for all i ∈ {1, ..., K}
```

이로 인해 다음 simplification 이 가능했다:
- E_i = N/K (constant in i)
- E'_i = (N + Kδ)/K (constant in i, smoothed)
- T_λ(o; δ) 의 sufficient statistic reduction (Lemma 1, commit a6aa72a / 1c5d717): ψ_λ(v) = Σ_i v_i^{λ+1} (E'_i 가 i-invariant 이므로 factoring out 가능)

이 simplification 은 **uniform null 한정** — non-uniform null 에서는 작동하지 않는다.

본 R&D 는:
1. Non-uniform null 환경에서 simple sufficient statistic reduction 의 실패를 명시적으로 증명
2. Weighted HLP majorization (Olkin & Marshall 1979 ch. 14) framework 를 도입하여 어느 부분이 closed-form 가능한지 식별
3. 본격 closed-form proof 는 multi-cycle R&D 로 정직히 open

---

## 2. Setup — Non-Uniform Null

### 2.1 Probability prior + smoothed counts

- N ∈ ℕ : sample size
- K ∈ ℕ : 카테고리 수
- **p = (p_1, ..., p_K) ∈ ℝ_{>0}^K** with Σ_i p_i = 1, **non-uniform** (즉 not all p_i 동일)
- E_i = N × p_i (varies with i)
- δ > 0 : continuity correction
- E'_i = E_i + δ = N × p_i + δ (varies with i)
- O = (O_1, ..., O_K), O'_i = O_i + δ

### 2.2 Cressie-Read statistic in non-uniform regime

```
T_λ(o; δ, p) = (2 / (λ(λ+1))) × Σ_i O'_i × ((O'_i / E'_i)^λ - 1)         for λ ∉ {0, -1}
T_0(o; δ, p)  = 2 × Σ_i O'_i × log(O'_i / E'_i)                          (G² L'Hopital)
T_{-1}(o; δ, p) = 2 × Σ_i E'_i × log(E'_i / O'_i)                        (Modified LR L'Hopital)
```

### 2.3 Key technical change vs uniform null

```
(O'_i / E'_i)^λ = ((O_i + δ) / (N × p_i + δ))^λ
```

E'_i = N × p_i + δ 는 **i 의존** (p_i 가 i 에 의존하므로). 따라서 uniform null 에서의 "factor out E'^{-λ}" 가 작동하지 않는다.

---

## 3. Lemma 5.1 (Failure of Lemma 1 reduction in non-uniform null)

### 3.1 Statement

**Lemma 5.1**: Non-uniform null 환경에서 T_λ(o; δ, p) 는 **simple "ψ_λ(v) = Σ_i v_i^{λ+1}" form** 으로 환원되지 **않는다**. 다음 weighted form 이 정확한 환원:

```
T_λ(o; δ, p) = (2 / (λ(λ+1))) × Σ_i E'_i × ((O'_i/E'_i)^{λ+1} - O'_i/E'_i)
            = (2 / (λ(λ+1))) × Σ_i E'_i × (r_i^{λ+1} - r_i)
```

where r_i := O'_i / E'_i (per-cell likelihood ratio).

### 3.2 Derivation

직접 계산:
```
T_λ(o; δ, p) = (2/(λ(λ+1))) × Σ_i O'_i × ((O'_i/E'_i)^λ - 1)
            = (2/(λ(λ+1))) × Σ_i O'_i × (r_i^λ - 1)
            = (2/(λ(λ+1))) × Σ_i (r_i × E'_i) × (r_i^λ - 1)        [O'_i = r_i × E'_i]
            = (2/(λ(λ+1))) × Σ_i E'_i × r_i × (r_i^λ - 1)
            = (2/(λ(λ+1))) × Σ_i E'_i × (r_i^{λ+1} - r_i)
```

QED (Lemma 5.1).

### 3.3 Implication

**Sufficient statistic ψ_λ^w(r; p) := Σ_i E'_i × (r_i^{λ+1} - r_i)** 의 ordering 이 T_λ ordering 을 결정 (with A_λ sign tracking from Lemma 2 of commit 1c5d717).

이는 **weighted form** — E'_i = N × p_i + δ 가 weight 역할. Uniform null 의 경우 E'_i 가 i-invariant 이라 weight 가 사라져 simple ψ_λ(v) = Σ v_i^{λ+1} 형태로 환원되었으나, non-uniform null 에서는 weight 가 본질적으로 남는다.

---

## 4. Weighted HLP Majorization Framework (Olkin & Marshall 1979 ch. 14)

### 4.1 Weighted majorization (definition, w-majorization)

For w = (w_1, ..., w_K) ∈ ℝ_{>0}^K (positive weights) and v, u ∈ ℝ^K with Σ_i w_i v_i = Σ_i w_i u_i (same weighted sum):

```
v ≻_w u  (v weighted-majorizes u)
⟺ ∃ doubly w-stochastic matrix D (i.e., Σ_j D_{ij} = 1 with weight-w consistency) such that u = D × v
⟺ Σ_i w_i φ(v_i) ≥ Σ_i w_i φ(u_i) for all continuous convex φ : ℝ → ℝ      (weighted HLP-Karamata theorem)
```

Reference: Olkin & Marshall 1979 *Inequalities: Theory of Majorization* ch. 14 (사용자가 published edition 으로 verify mandatory).

### 4.2 Application to non-uniform Cressie-Read

Apply weighted HLP-Karamata to ψ_λ^w(r; p) = Σ_i E'_i × (r_i^{λ+1} - r_i):

Define:
- weights: w_i = E'_i = N × p_i + δ
- variable: r_i = O'_i / E'_i

For φ(x) = x^{λ+1} - x:
- λ ≥ 0: φ''(x) = (λ+1)λ × x^{λ-1} ≥ 0 on x > 0 → convex
- -1 < λ < 0: φ''(x) = (λ+1)λ × x^{λ-1} (sign depends on λ vs 0 boundary)
  - For 0 < x < 1: x^{λ-1} > 0, and λ(λ+1) < 0 → φ''(x) < 0 (concave)
  - For x > 1: same
- λ ≤ -1: φ''(x) = (λ+1)λ × x^{λ-1}, sign analysis: (λ+1) ≤ 0, λ < 0 → (λ+1)λ ≥ 0, x^{λ-1} > 0 → φ''(x) ≥ 0 (convex on x > 0)

**Result**: φ(x) = x^{λ+1} - x is convex for λ ∈ (-∞, -1] ∪ [0, +∞), concave for λ ∈ [-1, 0].

(주의 1: λ ∈ {0, -1} 의 boundary 에서는 φ''(x) = 0 → φ 는 linear 가 되어 degenerate convex 와 degenerate concave 양쪽 valid. 본 표기의 closed interval inclusion 은 이를 의도.)

(주의 2: φ(x) = x^{λ+1} - x 의 convexity 는 x^{λ+1} 의 convexity 와 동일 — linear term -x 는 convexity 에 영향 없음.)

By weighted HLP-Karamata, the ordering of ψ_λ^w(r; p) for varying r (with constraint Σ_i w_i r_i = constant) is determined by **weighted majorization** with weight vector w = E' (= N×p + δ).

---

## 5. Open Problem (multi-cycle R&D)

### 5.1 Conjecture 5 (proposed, NOT proven in this R&D)

**Conjecture 5 (non-uniform null analog of Theorem 2)**: For non-uniform null p and smoothed counts (O', E') with weights w = E':

```
T_λ(o_a; δ, p) ≥ T_λ(o_b; δ, p)  for all λ ∈ ℝ
⟺  r(o_a) ≻_w r(o_b)  (weighted majorization with weights w = E')
```

where r(o) = (O'_1/E'_1, ..., O'_K/E'_K).

**Status**: 본 R&D 의 §3 + §4 framework 가 partial evidence 를 주지만, full proof 는 다음을 추가로 필요:
1. (⇐) direction: weighted HLP-Karamata 의 정확한 statement 적용 verify (φ convex/concave region 별 sign tracking)
2. (⇒) direction: weighted HLP 의 bidirectional form (Conjecture 5 의 contrapositive 에 대한 explicit construction algorithm)
3. Boundary behavior at λ ∈ {0, -1} (L'Hopital limits) verify
4. Chain characterization analog of Theorem 3 (어떤 (N, K, p) 의 경우 r-space 의 weighted-majorization total order?)

### 5.2 Why this is multi-cycle

Non-uniform null R&D 는 다음 이유로 한 cycle 안에 완료 어려움:
1. **Weighted HLP-Karamata 의 published edition (Olkin & Marshall 1979 ch. 14) 정확한 statement transcription 은 사용자 직접 verify mandatory** — uniform HLP (commit 1c5d717) 보다 텍스트 길이 + complexity 가 훨씬 큼.
2. **Doubly w-stochastic matrix 개념의 도입** — standard majorization (uniform stochastic) 의 일반화로 framework 자체가 더 복잡.
3. **r-space (likelihood ratios) 가 partition lattice 와 다른 structure** — Theorem 3 (partition lattice chain characterization) 의 analog 가 r-space 에서 어떻게 작동하는지 별도 enumeration + 분석 mandatory.
4. **Hand SNN R&D context 와의 정합 확인** — 본 프로젝트의 default 가 uniform null (architectural mean prior) 이므로 non-uniform null R&D 의 실제 사용 case 는 제한적. 별도 motivation 검토 mandatory.

### 5.3 Conjecture 6 (chain characterization analog)

**Conjecture 6 (non-uniform null partition-equivalent chain condition)**: r-space (= {(O'_1/E'_1, ..., O'_K/E'_K) : O ∈ Ω}) 가 weighted majorization 으로 totally ordered chain 일 조건은 **K ≤ 2 ∨ N ≤ N_critical(p)** 형태일 가능성이 있으나, N_critical(p) 의 정확한 closed-form 은 별도 R&D mandatory.

Theorem 3 의 uniform null result (chain ⟺ K ≤ 2 ∨ N ≤ 5) 는 본 conjecture 의 p = (1/K, ..., 1/K) special case 에 해당 (N_critical(uniform) = 5).

---

## 6. Hand SNN R&D Implication

본 R&D 의 (Hand SNN architectural mean = uniform null 1/4) 와 non-uniform null R&D 의 관계:

- **현재 Hand SNN R&D 는 uniform null 한정** — 모든 Theorem 2-4 가 그대로 적용.
- **만약 사전 지식이 non-uniform prior 를 제공하면** (예: 클러스터 별 사용 빈도 데이터): 본 framework 의 Conjecture 5-6 이 적용되어 method (λ) 선택의 robustness 가 r-space majorization 으로 결정.
- **Practical recommendation**: Hand SNN R&D 의 future scaling 시 uniform null 가정 유지 권장 (Theorem 2-4 의 closed-form 결과 활용 가능). Non-uniform null 도입은 별도 motivation + weighted majorization framework 정리 mandatory.

---

## 7. Honest Limitations

본 partial framework 의 정직 한계:

1. **Conjecture 5 의 closed-form proof 안 됨** — §3 + §4 의 framework 는 partial evidence 만. Full proof 는 multi-cycle R&D mandatory.

2. **Olkin & Marshall 1979 ch. 14 weighted majorization transcription 은 사용자 직접 verify mandatory** — 본 R&D 의 weighted HLP-Karamata statement 는 standard textbook form 추정.

3. **Direction (⇒) 의 explicit construction 안 함** — Conjecture 5 의 contrapositive (incomparable r-vectors 에 대한 explicit λ_1, λ_2 construction) 는 본 R&D scope 외.

4. **L'Hopital limits (λ ∈ {0, -1}) 의 weighted form 별도 정리 안 함** — uniform null 의 G² / Modified LR limit form 이 non-uniform null 에서도 동등 작동하는지 별도 verify.

5. **Conjecture 6 (chain characterization analog) 은 conjecture 단계** — Theorem 3 (uniform null) 의 analog 의 정확한 N_critical(p) closed-form 은 별도 R&D.

6. **r-space (likelihood ratio space) 의 structure 분석 안 함** — Discrete Ω 의 r-vector image 가 어떤 partial order structure 를 갖는지 (예: Macdonald 1995 의 dominance order analog) 별도 R&D.

7. **Hand SNN R&D 의 실제 non-uniform prior motivation 안 함** — 본 R&D 는 mathematical extension scope. Practical application 의 prior 결정 (예: architectural learning data 분석) 은 별도.

8. **Formal verification (Lean 4 / Coq) 안 됨** — Mathlib 의 weighted majorization library 활용 formalization 은 별도 multi-week R&D.

9. **Cressie & Read 1984 §2.5 non-uniform null treatment 는 사용자 verify mandatory** — 본 R&D 의 statistic definition 은 표준 transcription 추정.

10. **Hand SNN R&D context 의 robustness 손실 안 함** — 본 R&D 가 Hand SNN 의 uniform null 한정 결론 (Theorem 2-4) 을 약화시키지 않음. 본 R&D 는 별도 mathematical extension 한정 scope.

11. **.env.snn-backup HIGH carryover (security)** — 사용자 직접 rotate mandatory (carryover).

12. **HLP 1934 + Cressie-Read 1984 + Macdonald 1995 published PDF user verify mandatory** (carryover).

13. **Peer review 안 됨** — published statistical literature cross-check 사용자 mandatory.

14. **본 partial framework 의 future R&D 의향 mandatory** — Hand SNN R&D 의 실제 sample size scaling + non-uniform prior 사용 motivation 이 명확히 식별되어야 본 R&D 의 follow-up 가치 평가 가능.

15. **Type: documentation-only — code/test artifact 없음**. Reproducer script (commit 00775a6) 는 uniform null 한정 — non-uniform null reproducer 는 별도 R&D.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- §3 Lemma 5.1: Non-uniform null 의 weighted form 정확 derivation (T_λ = (2/(λ(λ+1))) × Σ E'_i × (r_i^{λ+1} - r_i))
- §4: Weighted HLP-Karamata (Olkin & Marshall 1979 ch. 14) framework 도입 + convex/concave region 식별
- §5 Conjecture 5: Non-uniform null analog of Theorem 2 (open problem)
- §5.3 Conjecture 6: Chain characterization analog of Theorem 3 (open problem)
- §6 Hand SNN R&D implication: uniform null 한정 유지 권장

**Status grade**:
- Empirical → Partial → Full → Chain → δ-Robustness → Reproducer (commits 0f3acf0 → 94dbf07 → 00775a6)
- **Non-uniform null challenge identification + partial framework** (current commit)
- Full closed-form: multi-cycle R&D mandatory

**다음 follow-up candidates**:
- Conjecture 5 의 (⇐) direction strict proof (weighted HLP-Karamata 정확 적용)
- Conjecture 6 의 chain characterization (r-space majorization structure)
- L'Hopital limits 의 weighted form verify
- Hand SNN R&D 의 non-uniform prior motivation 식별 + practical case study
- Lean 4 mathlib weighted majorization formalization

---

## 9. References

- **Olkin, I. & Marshall, A. W. (1979)**. *Inequalities: Theory of Majorization and Its Applications*. Academic Press.
  - ch. 14: Weighted majorization + weighted HLP-Karamata theorem
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press. §2.18-§2.22.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
- Read, T. R. C. & Cressie, N. A. C. (1988). *Goodness-of-Fit Statistics for Discrete Multivariate Data*. Springer.
- Macdonald, I. G. (1995). *Symmetric Functions and Hall Polynomials*. Oxford University Press.

**사용자 직접 verify mandatory** (carryover + 신규):
- Olkin & Marshall 1979 **ch. 14 weighted majorization + weighted HLP-Karamata theorem** (본 R&D 의 source-of-truth)
- HLP 1934 §2.18-§2.22 (carryover)
- Cressie-Read 1984 §2.5 non-uniform null treatment

---

## 10. Related Commits

- `1d6d4e7` (2026-05-31): UX MEDIUM 2 fix (GridInput a11y)
- `00775a6` (2026-05-31): Reproducer artifact + Theorem 4 additional fix
- `94dbf07` (2026-05-31): Theorem 4 (δ-robustness)
- `6f6104d` (2026-05-31): Theorem 3 (chain characterization)
- `1c5d717` (2026-05-31): Theorem 2 (HLP majorization full closed-form)
- `a6aa72a` (2026-05-30): Partial proof (Lemma 1-4 restricted)
- `0f3acf0` (2026-05-30): Empirical 189/189

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
**License**: Same as parent repository
