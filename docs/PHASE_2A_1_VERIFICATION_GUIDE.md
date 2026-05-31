# Phase 2A.1 Verification Guide — Substrate Upgrade Effect Measurement

**R&D ID**: hand-snn-phase-2a-1-verification
**Date**: 2026-05-31
**Status**: VERIFICATION GUIDE — 직전 commit 4e739b5 의 substrate upgrade (orientation → orientation-5x5) 의 production effect 측정 framework. 사용자 production 데이터 수집 + before/after comparison.

---

## 1. Background

직전 commit `4e739b5` 가 substrate hardcoded `orientation` (n13, 32-dim) → `orientation-5x5` (n14, 50-dim) production hotfix deploy.

본 R&D 는 deploy 후 사용자가 production 데이터를 수집해서 H2/H4 완화 효과를 측정하는 verification guide.

---

## 2. Verification Procedure (사용자 step-by-step)

### Step 1: Production deploy 적용 확인

- handface.whatpull.com 접속 (Vercel auto-deploy 가 4e739b5 commit push 후 약 1-2분 후 적용)
- Chrome DevTools 열기 (F12)
- **Console tab** 활성화

### Step 2: 학습 reset

- "학습 reset" 버튼 클릭
- 다음 toast 메시지 확인:
  > "학습 substrate 가 5×5 (50 features) 로 갱신되었습니다. 기존 학습 데이터는 무효 — 다시 학습해 주세요."
- Console 에 다음 info 메시지 확인:
  > Substrate spec change disclosure (Phase 2A.1)

### Step 3: 4 패턴 학습 (또는 2 패턴 점진 추가)

권장:
1. **2 패턴 부터** 시작 — visually distinct (예: 좌상 quadrant vs 우하 quadrant)
2. 각 패턴 학습 완료 (vigilance pass 또는 spawn) 까지 대기
3. self-verify 확인 후 다음 패턴 추가
4. 모든 4 패턴 학습 완료 까지 반복

### Step 4: Console log 수집

학습 진행 중 다음 log 캡처:

**spawn 시점**:
```
[CPM-1 spawn cluster=N]
  sub-pool: ▓▓▓▓▓░░░░░ X/50 (Y%) [is_fallback: false/true]
  overlap matrix max: Z
  full K×K Jaccard matrix
```

**자동 학습 완료 시점**:
```
[CFM-1] epoch=N total=X%
  per-pattern breakdown
[CPM-1 auto-learn-complete cluster=N]
  ...
```

**P218 syn cN log (cluster spawn 직후)**:
```
[P218 syn cN] IN→V1L4 n=X w=[a, b] mean=c
  | V2L5→OUT n=Y ...
  | activeInputs=[...] seed=Z
```

### Step 5: Before/after comparison

본 R&D 의 **§3 expected metrics** 와 사용자의 실제 console log 비교.

---

## 3. Expected Metrics (Before vs After Phase 2A.1)

### 3.1 Sub-pool capacity

| Metric | Before (n13, 32-dim) | After (n14, 50-dim, expected) |
|---|---|---|
| Total features | 32 | **50** (+56%) |
| c0 claimed features 평균 | 18 (56%) | **약 25-35 (50-70%)** 예상 |
| Unclaimed pool 남은 | 14 (44%) | **약 15-25 (30-50%)** 예상 |
| Disjoint constraint 가능성 | 매우 제한적 (c1+ fallback) | **점진적 가능** (c1, 가능하면 c2 도 disjoint) |

### 3.2 Cluster Jaccard overlap

| Metric | Before | After (expected) |
|---|---|---|
| c0↔c1 Jaccard | 0.833 (severe) | **< 0.5** 예상 |
| c0↔c2 Jaccard | 0.556 | **< 0.4** 예상 |
| c1↔c2 Jaccard | 0.667 | **< 0.4** 예상 |
| CPM-2 threshold 위반 | 모든 pair | **부분만** (또는 없음) |

### 3.3 Fallback frequency

| Metric | Before | After (expected) |
|---|---|---|
| c1 spawn fallback | mandatory | **선택적** (sufficient unclaimed features 있으면 disjoint) |
| c2 spawn fallback | mandatory | **선택적** |
| c3 spawn fallback | mandatory (50 features 부족 가능성) | **선택적** (남은 capacity 의존) |

### 3.4 Recognition accuracy (long-term effect)

| Metric | Before | After (expected) |
|---|---|---|
| self-verify (noisy held-out) | 87% | **>= 90%** 예상 (overlap 감소 효과) |
| Catastrophic forgetting (CFM-1 drop) | likely | **mitigated** (cluster 가 더 disjoint → weight drift 감소) |
| Vigilance miss frequency | 빈번 | **감소** 예상 |

### 3.5 MAX_CLUSTERS side benefit

| Metric | Before | After |
|---|---|---|
| MAX_CLUSTERS | 8 | **12** (n14_extended 의 자동 설정) |
| 학습 가능 패턴 수 | 최대 약 4-6 (overlap 발생) | **최대 8-12 가능** 예상 |

---

## 4. Comparison Analysis Framework

### 4.1 H2 (sub-pool exhaustion) 완화 측정

**Strong success indicator**:
```
[handleExpandCluster] forceDisjoint fallback ...  ← Before: 빈번 발생
                                                   After: 거의 발생 안 함
```

만약 fallback 메시지 빈도가 50% 이하로 감소 → **H2 완화 confirmed**.
만약 fallback 메시지 여전히 빈번 → **substrate upgrade 부족** → Phase 2B (sparse code top-K 감소) 필요.

### 4.2 H4 (sparse code overlap) 완화 측정

**Strong success indicator**:
```
[CPM-1 ...] overlap matrix max: 0.X  ← Before: 0.5+ 자주 발생
                                       After: 0.3 이하 다수 (가끔만 0.4-0.5)
```

만약 Jaccard max 가 cluster pair 의 50% 에서 0.3 이하 → **H4 완화 confirmed**.

### 4.3 H3 (catastrophic forgetting) 완화 측정

**Indirect indicator** (CFM-1 time series):
- 패턴 1, 2 학습 후 self-verify accuracy 기록
- 패턴 3, 4 추가 학습 후 패턴 1, 2 의 self-verify accuracy 비교
- 5% 이하 drop → **H3 완화 confirmed**
- 5%+ drop → catastrophic forgetting persistent → Phase 2D (EWC) 권장

### 4.4 H1 (vigilance threshold) 완화 측정

**Indirect indicator**:
- Vigilance miss toast 빈도 변화
- 50% 이하 감소 → H1 부분 완화 (H2/H4 의 consequence 였음)
- 변화 없음 → vigilance threshold 자체 조정 별도 cycle 필요

---

## 5. Decision Tree (Phase 2 추가 fix 필요 여부)

```
After Phase 2A.1 production 적용 + 학습 데이터 수집:

H2 fallback 빈도?
├─ 50%+ 감소 → H2 mitigated ✓
│   H4 Jaccard 50%+ pairs < 0.3?
│   ├─ YES → H4 mitigated ✓
│   │   H3 catastrophic forgetting < 5% drop?
│   │   ├─ YES → 모든 root cause mitigated → 추가 fix 불필요
│   │   └─ NO → Phase 2D (EWC) 권장
│   └─ NO → Phase 2B (sparse code top-K 감소) 권장
└─ 변화 없음 또는 작음 → Phase 2B (sparse code) + Phase 2A.2 (orientation-6x6 72-dim 추가 upgrade) 권장
```

---

## 6. Data Collection Template (사용자 제공 권장 format)

사용자가 console log 캡처 시 다음 format 으로 보고 권장:

```
=== Phase 2A.1 Production Test ===
Deploy commit: 4e739b5
Substrate: orientation-5x5 (n14_extended, 50 features)
Test date: YYYY-MM-DD

Patterns trained: N (예: 4)
Pattern visual descriptions:
  Pattern 1: [좌상 quadrant]
  Pattern 2: [우상 quadrant]
  ...

Console log captures:
  [P218 syn c0] activeInputs=[...] (N features)
  [P218 syn c1] activeInputs=[...] (M features) [fallback: yes/no]
  ...
  [CPM-1 spawn cluster=N] sub-pool X/50, overlap max Y, is_fallback Z
  [CFM-1 epoch=N] total=X%, per-pattern: 1:Y%, 2:Z%, ...

User-perceived behavior:
  - 같은 패턴 재학습 frequency: [increased/same/decreased]
  - 비슷한 패턴 인식: [improved/same/degraded]
  - 인식률 변화: [improved/same/degraded]
```

---

## 7. Honest Limitations

1. **본 verification guide 는 사용자 직접 production 데이터 수집 mandatory** — 본 R&D scope 외.

2. **§3 의 expected metrics 는 mathematical 추정** — 실제 값 사용자 패턴 활용 방식 의존.

3. **§4 success indicator threshold (50% 감소, 0.3 이하, 5% drop)** 는 baseline 추정 — 사용자 환경 calibration mandatory.

4. **Catastrophic forgetting 측정의 time series 요구**: §4.3 의 H3 측정은 학습 시퀀스 의존 — 사용자가 여러 학습 epoch 추적 mandatory.

5. **§5 의 decision tree 는 single visit 한정** — 장기적 production 동작 별도 monitoring mandatory.

6. **Mathematical R&D series 영향 0** (carryover).

7. **.env.snn-backup HIGH carryover**.

8. **Cosmetic '영역' 단어 cleanup follow-up cycle pending** (commit 4e739b5 의 agent 16 instances + historical codebase ~1421 instances).

9. **Phase 2A.2 (substrate 선택 UI dropdown)** 별도 cycle — 사용자가 다른 substrate (orientation-6x6, orientation-hand) 을 직접 선택 가능 path 없음.

10. **Type: documentation-only — verification guide 한정**. Production 데이터 수집 + analysis 는 사용자 + 본 R&D team coordination.

11. **Olkin & Marshall 1979 + Cressie-Read 1984 + HLP 1934 + Rudin 1976 + Shaked & Shanthikumar 2007 + Shohat-Tamarkin 1943 published PDF user verify mandatory** (carryover).

12. **본 verification 의 성공 indicator 가 모두 mitigation 결과 → H2/H4/H3 모두 substrate upgrade 만으로 완전 해결**. 단 negative result (mitigation 부족) 시 Phase 2B, 2A.2, 2D 등 다음 fix 권장.

13. **본 guide 의 mathematical 정확성**: §3 의 expected metrics 의 정확한 계산 (예: 50 features × N patterns × Jaccard distribution) 별도 R&D — 본 guide 는 directional 추정.

14. **Peer review 안 됨**.

15. **Type: documentation-only — verification guide R&D 한정**.

---

## 8. Conclusion

**본 R&D 의 contribution**:
- §2 step-by-step verification procedure.
- §3 expected metrics (5 categories, before vs after).
- §4 comparison analysis framework (4 hypotheses).
- §5 decision tree (Phase 2 추가 fix 필요 판단).
- §6 data collection template.

**다음 follow-up**:
- 사용자 production 데이터 수집 + 본 guide § 3-5 비교 분석.
- §5 decision tree 의 결과에 따라 다음 Phase (2B, 2A.2, 2D) 진행.

---

## 9. References

- Production hotfix: commit 4e739b5
- Deep analysis: commit 2afca91
- Phase 1 diagnostic implementation: commit 7dd386a
- Diagnostic framework: commit 8fed0e3

---

## 10. Related Commits

- `4e739b5` (2026-05-31): Phase 2A.1 substrate upgrade
- `2afca91` (2026-05-31): Diagnostic deep analysis
- `7dd386a` (2026-05-31): Phase 1 diagnostic implementation
- `8fed0e3` (2026-05-31): Diagnostic framework design
- `97cda88` (2026-05-31): Mathematical R&D ultra final summary

---

**Generated**: 2026-05-31
**Author**: handface project R&D team
