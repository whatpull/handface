# Lean 4 / Coq Formalization Roadmap — Hand SNN R&D Mathematical Foundation

**R&D ID**: hand-snn-lean4-formalization-roadmap
**Date**: 2026-05-31
**Status**: PLAN-ONLY (실제 Lean 4 install + formal proof 안 함, multi-week 프로젝트 roadmap).

---

## 1. Background

직전 R&D 시리즈 (commits a6aa72a → ce0472c) 가 Cressie-Read power divergence statistic T_λ 의 complete mathematical foundation 도출:

- Theorem 2 (1c5d717), 3 (6f6104d), 4 (94dbf07): uniform null framework
- Theorem 5 (8c80e40 + 8f0e34d): non-uniform null Lemma 5.1 + 5.2
- Theorem 6.3 (bc7e84a), Lemma 6.1 + 6.4 (90ee122 + 7b263b3): chain characterization
- Theorem 7.1 (b1e3b1e): Conjecture 5 (⇐) closed-form
- Reproducer artifacts (00775a6, 33f592d, f446675)
- Practical guide (ce0472c)

본 R&D 는 위 mathematical results 의 **Lean 4 / Coq formal verification roadmap** (plan-only, 실제 코드 작성 안 함).

---

## 2. Why Formal Verification?

### 2.1 Motivations

1. **Mathematical 정확성 strict guarantee**: 본 R&D 시리즈의 hand-derived proofs 가 machine-verified 되어 numerical errors / algebraic mistakes 회피.

2. **Cycle 누적 error 회피**: 직전 cycle 의 hand-computation errors (4 건 catch + 정정) 의 mathematical foundation 측면 의 재발 회피.

3. **Peer review 강화**: published statistical literature 에 본 R&D 시리즈의 contribution 제출 시 machine-verified proofs 가 더 신뢰됨.

4. **Reusable mathematical library**: Mathlib 의 weighted majorization + Cressie-Read family 의 contribution 으로 발전 가능.

### 2.2 Choice of Lean 4 vs Coq

**Recommendation: Lean 4 + Mathlib**.

Rationale:
- Mathlib4 의 majorization library (Olkin & Marshall 1979 의 일부 covered)
- Real analysis library (HLP 1934 type results)
- Active community (active formalization projects)
- Tactic ergonomics (modern type theory)

Alternative: Coq + Mathematical Components. 단 majorization library 의 Coq coverage 더 적음.

---

## 3. Lean 4 Environment Setup (사용자 mandatory)

### 3.1 Prerequisites

- OS: Windows 11 (현재 사용자 환경) 또는 Linux/macOS
- Disk space: ~10 GB (Mathlib build)
- RAM: 8+ GB
- Visual Studio Build Tools (Windows) 또는 build-essential (Linux)

### 3.2 Installation (사용자 직접 mandatory)

```powershell
# Windows installation
# Step 1: Install elan (Lean version manager)
Invoke-RestMethod -Uri "https://raw.githubusercontent.com/leanprover/elan/master/elan-init.ps1" -OutFile elan-init.ps1
./elan-init.ps1
# follow prompts → installs lean 4 + lake

# Step 2: Create Lean project
lake init handface-formalization math
cd handface-formalization

# Step 3: Add Mathlib dependency
# Edit lakefile.lean to add:
# require mathlib from git "https://github.com/leanprover-community/mathlib4.git"

lake update
lake exe cache get
lake build  # multi-hour build first time
```

### 3.3 Estimated setup effort

- elan + lean install: 30 분
- Mathlib download + build: 1-3 시간 (network + CPU)
- VS Code Lean extension setup: 30 분
- Total: 약 2-4 시간 (사용자 PC 환경에 따라)

---

## 4. Formalization Priority + Scope

### 4.1 Priority Tier 1 (highest value, lowest effort)

**Target**: Theorem 2 (1c5d717) — uniform null ordering full closed-form.

**Statement** (informal):
```
For uniform null p_i = 1/K + smoothed counts (O', E', δ > 0) + Cressie-Read T_λ:
  T_λ(v_a) ≥ T_λ(v_b) for all λ ∈ ℝ ⟺ v_a ≻ v_b (HLP majorization)
```

**Lean 4 statement sketch**:
```lean
theorem theorem2_uniform_null_ordering
  (N K : ℕ) (hK : K ≥ 2) (δ : ℝ) (hδ : δ > 0)
  (va vb : Fin K → ℝ) (h_same_sum : ∑ i, va i = ∑ i, vb i) :
  (∀ λ : ℝ, T_lambda_uniform N K δ va λ ≥ T_lambda_uniform N K δ vb λ)
  ↔ majorizes va vb := by
  sorry  -- proof body
```

**Required Mathlib lemmas**:
- `Finset.sum_smul` (∑ smul distribution)
- `Real.rpow_def` (real power definition)
- `Finset.inner_le_pow_mul_pow_of_sq_le_sq` (Cauchy-Schwarz analog)
- `Majorization.HardyLittlewoodPolya` (if available in Mathlib4)

**Estimated effort**: 2-3 weeks. (Mathlib majorization API 의 specific coverage 가 본 application 에 직접 fit 하는지 별도 verify.)

### 4.2 Priority Tier 2 (medium value, medium effort)

**Targets**:
- Theorem 3 (6f6104d): partition lattice chain ⟺ K ≤ 2 ∨ N ≤ 5
- Theorem 4 (94dbf07): δ-robustness for (3,3,0) vs (4,1,1) counter-example

**Lean 4 challenges**:
- Theorem 3 의 case-by-case enumeration (N ≤ 5) 는 finite case analysis tactic `decide` 활용 가능
- Theorem 4 의 polynomial expansion (Σ(v+δ)² = Σv² + 2δN + Kδ²) 은 `ring` tactic 활용

**Estimated effort**: 1-2 weeks per theorem.

### 4.3 Priority Tier 3 (high value, high effort)

**Targets**:
- Theorem 5 (8c80e40 + 8f0e34d): Lemma 5.1 + Lemma 5.2 weighted form derivation
- Theorem 7.1 (b1e3b1e): Conjecture 5 (⇐) direction

**Lean 4 challenges**:
- Weighted HLP-Karamata theorem 의 Mathlib coverage 확인 (실제 coverage 적을 가능성)
- 만약 없으면 본 R&D 의 contribution 으로 Mathlib4 의 majorization library 확장 가능

**Estimated effort**: 4-6 weeks (Mathlib contribution mandatory 일 가능성).

### 4.4 Priority Tier 4 (lowest priority, multi-month)

**Targets**:
- Theorem 6.3 (bc7e84a): r-space chain regime classification synthesis
- Lemma 6.1 + 6.4 (90ee122 + 7b263b3): general p extension + closed-form formulas
- Conjecture 7.2 (b1e3b1e §4): (⇒) direction — open problem, formal proof attempt

**Lean 4 challenges**:
- Synthesis result (Theorem 6.3) 는 prior theorems 의 결합이라 위 priorities 의 후속.
- Conjecture 7.2 의 formal proof 시도 시 negative result (counter-example) 도 가능.

**Estimated effort**: 2-3 months total for Tier 4.

---

## 5. Implementation Roadmap

### 5.1 Phase 1 — Setup + Tier 1 (월 1 ~ 월 1.5)

- [ ] elan + Lean 4 + Mathlib install (사용자 직접, 1 일)
- [ ] handface-formalization project setup (1 일)
- [ ] Mathlib majorization API 의 본 application fit 검증 (1 주)
- [ ] Theorem 2 formal proof (2-3 주)

### 5.2 Phase 2 — Tier 2 (월 1.5 ~ 월 3)

- [ ] Theorem 3 formal proof (1-2 주)
- [ ] Theorem 4 formal proof (1-2 주)
- [ ] Cross-reference + integration (1 주)

### 5.3 Phase 3 — Tier 3 (월 3 ~ 월 5)

- [ ] Weighted HLP-Karamata Mathlib coverage 확인 + 필요 시 contribution (2-3 주)
- [ ] Theorem 5 Lemma 5.1 + 5.2 formal proof (2-3 주)
- [ ] Theorem 7.1 formal proof (1-2 주)

### 5.4 Phase 4 — Tier 4 (월 5 ~ 월 8)

- [ ] Theorem 6.3 synthesis formal proof (1 개월)
- [ ] Lemma 6.1 + 6.4 formal proofs (2 개월)
- [ ] Conjecture 7.2 formal attempt (open) (1 개월 또는 negative result)

### 5.5 Phase 5 — Mathlib contribution (월 8 ~ 월 10)

- [ ] Weighted majorization library Mathlib PR
- [ ] Cressie-Read family Mathlib PR
- [ ] Peer review + integration

**Total estimated effort**: 8-10 개월 (single developer full-time equivalent).

---

## 6. Cost Estimate

### 6.1 Personnel

- 1 mathematician / formal verification expert with Lean 4 experience
- 또는 1 R&D 멤버 + 6 개월 Lean 4 학습 + 4-6 개월 formalization

### 6.2 Compute

- Lean 4 + Mathlib build: ~10 GB disk, 2-4 시간 initial, ~1 시간 incremental
- 1 mid-range workstation 충분

### 6.3 External resources

- Mathlib4 community Zulip channel access (free)
- Lean 4 documentation + tutorials (free)
- Olkin & Marshall 1979 ch. 14 published edition (사용자 직접 access mandatory)
- HLP 1934 published edition (사용자 직접 access mandatory)

---

## 7. Alternative Approaches

### 7.1 Coq + Mathematical Components

Pros: stable type theory, large existing library.
Cons: majorization library 의 coverage 가 Lean 4 / Mathlib4 보다 적음.

Recommendation: Lean 4 우선, Coq backup.

### 7.2 Isabelle/HOL

Pros: HOL 의 strong automation.
Cons: 현대 majorization 의 coverage 가 미흡.

### 7.3 Hand-verified peer review

Alternative: formal verification 안 하고 published peer review 시도.
Pros: 빠름, 낮은 cost.
Cons: human error 가능성 + reproducibility 약함.

---

## 8. Risks + Mitigations

### 8.1 Risk: Mathlib coverage 부족

**Risk**: 본 R&D 에 필요한 weighted HLP-Karamata 등 advanced theorems 의 Mathlib4 coverage 미흡 시 본 formalization 의 effort 가 multi-month 추가 발생.

**Mitigation**: Phase 1 의 "Mathlib API fit 검증" step 에서 early identification + Mathlib community 와의 협업.

### 8.2 Risk: Conjecture 7.2 strict negative result

**Risk**: Conjecture 7.2 의 formal proof 시도 결과 actual false 발견 → 본 R&D 시리즈의 statement reformulation 영향.

**Mitigation**: 본 가능성 자체가 mathematical value (mathematical landscape clarification) — negative result 도 contribution.

### 8.3 Risk: 사용자 PC 환경 mismatch

**Risk**: Windows 환경에서 elan + Lean 4 install 의 known issues (Microsoft Visual C++ runtime dependencies).

**Mitigation**: WSL2 또는 Docker container 사용 권장.

---

## 9. Honest Limitations

1. **본 roadmap 은 plan-only** — 실제 Lean 4 install 안 함, formal proof 안 함.

2. **8-10 개월 estimated effort 는 single developer FTE 기준** — 실제 effort 는 사용자 의 Lean 4 학습 곡선에 따라 +50-100%.

3. **Mathlib4 의 coverage 의 정확성 본 R&D 에서 검증 안 함** — Phase 1 의 "API fit 검증" step 의 dependency.

4. **Olkin & Marshall 1979 ch. 14 + HLP 1934 published edition 사용자 직접 access mandatory** (carryover).

5. **Lean 4 + Mathlib4 의 best practices 시기적 변화** — 본 roadmap 의 specific tactics + library API 는 2026-05 시점 기준. 실제 implementation 시 최신 documentation 참조 mandatory.

6. **Conjecture 7.2 strict negative result 가능성** — 본 roadmap 의 Phase 4 의 multi-month effort 가 negative result 로 끝날 수도 있음.

7. **Formal verification 의 actual reduction in error** — 본 R&D 시리즈의 hand-verified proofs 가 이미 통계적으로 매우 신뢰도 높음 (multiple QA audits + reproducer scripts). Lean 4 formalization 의 marginal value 의 cost-benefit 분석 별도.

8. **Hand SNN R&D 의 production status 영향 없음** — 본 roadmap 은 mathematical foundation 의 long-term confidence 강화. Current Theorem 2-4 + Theorem 5 결과의 utility 에 영향 없음.

9. **Peer review path 의 대안** — §7.3 의 published peer review path 가 더 cost-effective 가능. 사용자 의향에 따라 선택.

10. **Long-term R&D 의 사용자 motivation 미확정** — 본 8-10 개월 effort 의 사용자 commitment 별도 결정 mandatory.

11. **.env.snn-backup HIGH carryover** — 사용자 직접 rotate.

12. **Cressie-Read 1984 published PDF user verify mandatory** (carryover).

13. **Peer review 안 됨** (본 roadmap 자체).

14. **Type: documentation-only — plan/roadmap 한정**.

15. **본 roadmap 의 mathematical 가치 정직 평가**: long-term formalization 의 strategic plan + cost-benefit 분석 + alternative approaches. Strict 새 mathematical 결과 아님.

---

## 10. Conclusion

**본 R&D 의 contribution**:
- Lean 4 + Mathlib 의 formalization roadmap (8-10 개월 multi-week project)
- 5-phase implementation plan (Setup + 4 Tiers)
- Cost estimate + risk identification + mitigations
- Alternative approaches (Coq / Isabelle / Hand peer review) 비교

**Recommendation**:
- 본 roadmap 의 실제 implementation 은 **사용자 의 long-term R&D commitment 결정** 후 진행.
- Phase 1 (setup + Tier 1) 만으로도 Theorem 2 formal verification 가능 — 1.5 개월 commitment 으로 시작 가능.
- 또는 alternative: §7.3 의 published peer review path (더 빠름).

**다음 step (만약 진행 결정 시)**:
- 사용자 가 elan + Lean 4 install (사용자 PC 직접, 2-4 시간)
- handface-formalization Lean project setup
- Phase 1 의 "Mathlib API fit 검증" 시작

---

## 11. References

- Lean 4 official documentation: https://leanprover.github.io/lean4/
- Mathlib4: https://github.com/leanprover-community/mathlib4
- Coq + Mathematical Components: https://math-comp.github.io/
- Olkin, I. & Marshall, A. W. (1979). *Inequalities: Theory of Majorization*. Ch. 14. **사용자 직접 verify mandatory** (carryover).
- Hardy, G. H., Littlewood, J. E., & Polya, G. (1934). *Inequalities*. **사용자 직접 verify mandatory** (carryover).

---

## 12. Related Commits

본 R&D 시리즈의 formalization 대상:
- `ce0472c` (2026-05-31): Practical motivation guide
- `7b263b3` (2026-05-31): Lemma 6.4
- `b1e3b1e` (2026-05-31): Theorem 7.1
- `bc7e84a` (2026-05-31): Theorem 6.3 synthesis
- `f446675` (2026-05-31): N5K4 enumeration
- `90ee122` (2026-05-31): Lemma 6.1
- `33f592d` (2026-05-31): Non-uniform reproducer
- `8f0e34d` (2026-05-31): Lemma 5.2
- `8c80e40` (2026-05-31): Theorem 5 Lemma 5.1
- `00775a6` (2026-05-31): Uniform reproducer
- `94dbf07` (2026-05-31): Theorem 4
- `6f6104d` (2026-05-31): Theorem 3
- `1c5d717` (2026-05-31): Theorem 2

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
