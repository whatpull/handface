# L'Hopital Weighted Limits — Lemma 5.2 (λ ∈ {0, -1} Non-Uniform Null Verification)

**R&D ID**: hand-snn-l-hopital-weighted-limits
**Date**: 2026-05-31
**Status**: CLOSED-FORM LIMIT FORM DERIVATION — Lemma 5.2 proven, λ ∈ {0, -1} L'Hopital limits 의 non-uniform null weighted form 일관성 확인.

---

## 1. Background

직전 commit `8c80e40` 의 Theorem 5 (Lemma 5.1) 가 non-uniform null 환경의 weighted sufficient statistic form derivation:

```
T_λ(o; δ, p) = (2/(λ(λ+1))) × Σ_i E'_i × (r_i^{λ+1} - r_i)  for λ ∉ {0, -1}
```

단 §7 item 4 honest_limitation:

> **L'Hopital limits (λ ∈ {0, -1}) 의 weighted form 동등 작동 여부 별도 verify mandatory.**

본 R&D 는 이 limitation 의 직접 해결 — λ → 0 (G²) 과 λ → -1 (Modified LR) 의 L'Hopital limits 가 non-uniform null 환경에서 일관 작동함을 closed-form 으로 증명.

---

## 2. Setup

- N ∈ ℕ : sample size
- K ∈ ℕ : 카테고리 수
- p = (p_1, ..., p_K) ∈ ℝ_{>0}^K with Σ_i p_i = 1 (non-uniform null)
- δ > 0 : continuity correction
- O' = O + δ𝟙, E'_i = N × p_i + δ
- r_i = O'_i / E'_i

핵심 invariant: Σ_i E'_i = Σ_i (N × p_i + δ) = N × Σ p_i + Kδ = N + Kδ = Σ_i O'_i.

---

## 3. Lemma 5.2 (L'Hopital limits in non-uniform null)

### 3.1 Statement

**Lemma 5.2**:
For non-uniform null p and smoothed counts (O', E', δ > 0):

```
T_0(o; δ, p)    = lim_{λ → 0}  T_λ(o; δ, p)   = 2 × Σ_i O'_i × ln(O'_i / E'_i)        (G² weighted limit)
T_{-1}(o; δ, p) = lim_{λ → -1} T_λ(o; δ, p)   = 2 × Σ_i E'_i × ln(E'_i / O'_i)        (Modified LR weighted limit)
```

This is the **same structural form as uniform null** (Lemma 1 of `1c5d717`) — single difference: E'_i is now i-dependent (non-uniform).

### 3.2 Proof — λ → 0 (G² limit)

Starting from Lemma 5.1 (commit 8c80e40):

```
T_λ(o; δ, p) = (2/(λ(λ+1))) × Σ_i E'_i × (r_i^{λ+1} - r_i)
```

At λ = 0:
- **Numerator**: Σ_i E'_i × (r_i^1 - r_i) = Σ_i E'_i × 0 = 0
- **Denominator**: λ × (λ+1) = 0 × 1 = 0
- → 0/0 indeterminate form → L'Hopital applies.

Differentiate numerator w.r.t. λ:
```
d/dλ [E'_i × (r_i^{λ+1} - r_i)] = E'_i × r_i^{λ+1} × ln(r_i)
                                = O'_i × r_i^λ × ln(r_i)   [since O'_i = r_i × E'_i]
```

At λ = 0: O'_i × ln(r_i) = O'_i × ln(O'_i / E'_i).

Differentiate denominator w.r.t. λ:
```
d/dλ [λ × (λ+1)] = 2λ + 1
```

At λ = 0: 1.

Therefore (prefactor 2 from T_λ = (2/(λ(λ+1))) × N_λ 가 limit 에서 그대로 유지, N_λ = Σ E'_i × (r_i^{λ+1} - r_i) 의 derivative ratio 적용):
```
T_0(o; δ, p) = lim_{λ → 0} (2 × Σ_i E'_i × r_i^{λ+1} × ln(r_i)) / (2λ + 1)
             = (2 × Σ_i O'_i × ln(O'_i / E'_i)) / 1
             = 2 × Σ_i O'_i × ln(O'_i / E'_i)
```

QED (G² limit).

### 3.3 Proof — λ → -1 (Modified LR limit)

At λ = -1:
- **Numerator**: Σ_i E'_i × (r_i^0 - r_i) = Σ_i E'_i × (1 - r_i) = Σ_i E'_i - Σ_i O'_i = (N+Kδ) - (N+Kδ) = 0
- **Denominator**: λ × (λ+1) = (-1) × 0 = 0
- → 0/0 indeterminate form → L'Hopital applies.

Differentiate numerator w.r.t. λ (using previous calculation):
```
d/dλ [E'_i × (r_i^{λ+1} - r_i)] = E'_i × r_i^{λ+1} × ln(r_i)
```

At λ = -1: E'_i × r_i^0 × ln(r_i) = E'_i × ln(r_i) = E'_i × ln(O'_i / E'_i).

Differentiate denominator: 2λ + 1. At λ = -1: -1.

Therefore:
```
T_{-1}(o; δ, p) = lim_{λ → -1} (2 × Σ_i E'_i × ln(r_i)) / (-1)
                = -2 × Σ_i E'_i × ln(O'_i / E'_i)
                = 2 × Σ_i E'_i × ln(E'_i / O'_i)
```

QED (Modified LR limit).

### 3.4 Consistency with uniform null limit forms

When p_i = 1/K (uniform null):
- E'_i = N/K + δ (constant in i, denoted E')
- T_0(o; δ, uniform) = 2 × Σ O'_i × ln(O'_i / E') = 2 × Σ O'_i × ln(O'_i) - 2 × ln(E') × Σ O'_i
  - Since Σ O'_i = N + Kδ (constant), the second term is o-invariant.
  - ψ_0(v) ordering = Σ O'_i × ln(O'_i) ordering — recovers uniform null form (Lemma 1 of 1c5d717).
- T_{-1}(o; δ, uniform) = 2 × Σ E' × ln(E' / O'_i) = 2 × K × E' × ln(E') - 2 × E' × Σ ln(O'_i)
  - First term is o-invariant. Second term is -2 × E' × Σ ln(O'_i), ordering = -Σ ln(O'_i).
  - ψ_{-1}(v) ordering = -Σ ln(v) — recovers uniform null form.

→ **Lemma 5.2 is consistent with uniform null Lemma 1** (commit 1c5d717) as a special case. ✓

QED (Lemma 5.2 closed-form).

---

## 4. Sufficient statistic decomposition in non-uniform null

### 4.1 G² (λ=0) decomposition

```
T_0(o; δ, p) = 2 × Σ_i O'_i × ln(O'_i / E'_i)
            = 2 × Σ_i O'_i × ln(O'_i) - 2 × Σ_i O'_i × ln(E'_i)
```

Let:
- ψ_0^A(o) := Σ_i O'_i × ln(O'_i)         (concentration term, same as uniform null ψ_0 form)
- ψ_0^B(o; p) := Σ_i O'_i × ln(E'_i)      (cross-coupling term, non-uniform null specific)

→ T_0(o; δ, p) = 2 × (ψ_0^A(o) - ψ_0^B(o; p)) → ordering 한정으로 prefactor 2 영향 없음, ψ_0^A - ψ_0^B 형태에 의해 결정.

**Uniform null case**: ψ_0^B(o; uniform) = ln(E') × (N+Kδ) = constant → ordering 결정 안 함. → ψ_0^A 한정 (uniform null Lemma 1).

**Non-uniform null case**: ψ_0^B(o; p) = Σ_i O'_i × ln(E'_i) — ln(E'_i) 가 i-dependent → o-dependent weighted linear function. Ordering 영향 있음.

### 4.2 Modified LR (λ=-1) decomposition

```
T_{-1}(o; δ, p) = 2 × Σ_i E'_i × ln(E'_i / O'_i)
                = 2 × Σ_i E'_i × ln(E'_i) - 2 × Σ_i E'_i × ln(O'_i)
```

Let:
- ψ_{-1}^A(o; p) := -2 × Σ_i E'_i × ln(O'_i)    (weighted log term)
- ψ_{-1}^B(p) := 2 × Σ_i E'_i × ln(E'_i)         (o-invariant constant)

→ T_{-1}(o; δ, p) ordering = ψ_{-1}^A(o; p) ordering = -Σ_i E'_i × ln(O'_i) ordering (with sign).

**Uniform null case**: E'_i = E' (constant) → ψ_{-1}^A(o; uniform) = -E' × Σ ln(O'_i) → ordering = -Σ ln(O'_i) — uniform null Lemma 1 정합. ✓

**Non-uniform null case**: E'_i 가 i-dependent weight → ordering = weighted Σ E'_i × ln(O'_i) — weighted majorization framework (Theorem 5 §4) 적용 mandatory.

---

## 5. Implication for Conjecture 5 (Theorem 5)

본 R&D 는 Conjecture 5 의 closed-form proof 를 직접 도달하지 않지만, **L'Hopital boundary cases 의 일관성** 을 확인 — 즉 Conjecture 5 의 statement 가 λ ∈ {0, -1} 에서도 well-defined.

**Implication**:
- Conjecture 5 의 "T_λ ordering preservation for all λ ∈ ℝ ⟺ r-vector weighted majorization" claim 이 λ ∈ {0, -1} L'Hopital limits 를 포함해서 일관 형성 가능.
- 단 Conjecture 5 의 strict proof 는 §4 의 decomposition 이 weighted HLP-Karamata (Olkin & Marshall 1979 ch. 14) 와 어떻게 결합되는지 명시적 verify mandatory — multi-cycle R&D.

---

## 6. Status grade update

| Stage | Commit | Status |
|---|---|---|
| Empirical | 0f3acf0 | 189/189 byte-identical |
| Partial theoretical | a6aa72a | Lemma 1-4 restricted |
| Full closed-form ordering | 1c5d717 | Theorem 2 (uniform null) |
| Chain characterization | 6f6104d | Theorem 3 (K ≤ 2 ∨ N ≤ 5) |
| δ-Robustness | 94dbf07 | Theorem 4 (moment-structure) |
| Reproducer artifact | 00775a6 | 51/56 + auto-catch |
| Non-uniform null framework | 8c80e40 | Theorem 5 Lemma 5.1 (weighted form) |
| **L'Hopital weighted limits** | **(current)** | **Lemma 5.2 (λ ∈ {0, -1} boundary consistency)** |

---

## 7. Honest Limitations

1. **Conjecture 5 의 closed-form proof 안 됨 (carryover from 8c80e40)** — 본 R&D 의 Lemma 5.2 는 boundary cases 의 consistency 만 verify. Full proof 별도 multi-cycle R&D mandatory.

2. **§4 의 decomposition (ψ_0^A / ψ_0^B / ψ_{-1}^A / ψ_{-1}^B)** 은 mathematical 정의 한정 — 실제 ordering preservation 의 strict closed-form connection 은 별도 R&D.

3. **Olkin & Marshall 1979 ch. 14 weighted HLP-Karamata theorem 의 boundary case (λ ∈ {0, -1}) 적용 verify** — 본 R&D 는 limit forms 만 derive, framework 적용 strict proof 별도 R&D.

4. **본 derivation 의 L'Hopital strict justification**: 본 derivation 은 standard textbook calculus 적용 — strict 한 measure-theoretic justification (dominated convergence theorem 등) 은 별도 R&D. 단 본 case 의 연속성 + 미분 가능성은 명백.

5. **Cressie & Read 1984 §2.5 + §3 published PDF 의 L'Hopital limit form 정확성** 은 사용자 직접 verify mandatory — 본 derivation 은 standard form 추정.

6. **Hand SNN R&D 의 uniform null 한정 결론 (Theorem 2-4)** 약화 0 — 본 R&D 는 mathematical extension scope 한정, practical R&D 측면 영향 없음.

7. **Formal verification (Lean 4 / Coq)** 안 됨 — Mathlib L'Hopital + weighted majorization library 활용 formalization future R&D.

8. **본 R&D 의 numerical verification 안 함** — Reproducer script (commit 00775a6) 는 uniform null 한정. Non-uniform null L'Hopital limit forms 의 numerical verify 는 별도 R&D.

9. **.env.snn-backup HIGH carryover (security)** — 사용자 직접 rotate + OS secret store 이전 mandatory.

10. **HLP 1934 + Olkin & Marshall 1979 + Cressie-Read 1984 + Macdonald 1995 published PDF 사용자 직접 verify mandatory** (carryover).

11. **Peer review 안 됨** — published statistical literature cross-check 사용자 mandatory.

12. **Type: documentation-only** — code/test artifact 없음.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- Lemma 5.2 (proven, closed-form): λ ∈ {0, -1} L'Hopital limits 의 non-uniform null weighted form 정확 derivation
- §4 decomposition: G² (λ=0) + Modified LR (λ=-1) 의 sufficient statistic form 의 ψ^A / ψ^B 분해
- §3.4 consistency: uniform null case 에서 L'Hopital limits 가 uniform null Lemma 1 form 으로 정확 환원 (special case 정합)
- §5: Conjecture 5 (Theorem 5) 의 statement 가 λ ∈ {0, -1} 에서도 well-defined 확인
- 직전 commit 8c80e40 §7 item 4 honest_limitation 해결

**다음 follow-up candidates**:
- Conjecture 5 의 (⇐) direction strict proof (weighted HLP-Karamata + boundary cases 일관 적용)
- Conjecture 6 의 chain characterization (r-space weighted majorization structure)
- Non-uniform null reproducer script (Lemma 5.1 + 5.2 numerical verify)
- Hand SNN R&D 의 non-uniform prior practical motivation 식별
- Lean 4 mathlib L'Hopital + weighted majorization formalization

---

## 9. References

- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization and Its Applications*. Academic Press. Ch. 14.
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. Cambridge University Press.
- Cressie, N. & Read, T. R. C. (1984). "Multinomial Goodness-of-Fit Tests". JRSS-B, 46(3), 440-464.
  - §2.5 + §3: L'Hopital limit forms for λ ∈ {0, -1}
- Read, T. R. C. & Cressie, N. A. C. (1988). *Goodness-of-Fit Statistics for Discrete Multivariate Data*. Springer.

**사용자 직접 verify mandatory** (carryover):
- HLP 1934, Olkin & Marshall 1979 ch. 14, Cressie-Read 1984 §2.5 + §3, Macdonald 1995

---

## 10. Related Commits

- `8c80e40` (2026-05-31): Theorem 5 partial framework (Lemma 5.1 weighted form)
- `00775a6` (2026-05-31): Reproducer artifact (uniform null한정)
- `94dbf07` (2026-05-31): Theorem 4 (δ-robustness)
- `6f6104d` (2026-05-31): Theorem 3 (chain characterization)
- `1c5d717` (2026-05-31): Theorem 2 (HLP majorization full closed-form, uniform null)
- `a6aa72a` (2026-05-30): Partial proof (Lemma 1-4 restricted)
- `0f3acf0` (2026-05-30): Empirical 189/189

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
**License**: Same as parent repository
