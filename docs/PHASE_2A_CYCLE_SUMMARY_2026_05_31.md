# Phase 2A Cycle Summary (2026-05-31)

본 문서는 2026-05-31 cycle 의 Phase 2A.1 H3 mitigation 완료 + Phase 2A.2
production 적용 결정 보류 사안 정리. 다음 cycle 시 사용자 catch 결정 참고용.

## 1. Cycle 영역 진행 흐름

```
production observation (사용자 4 패턴 학습 시 마지막 cluster 인식 실패)
   ↓
Phase 2A.1 substrate upgrade (4×4 n13 → 5×5 n14_extended)
   ↓
H4 mitigation ✓ (Jaccard 0.55-0.83 → 0.231, 3-4x 개선)
   ↓
H3 잔존 (마지막 cluster 0% accuracy)
   ↓
commit 8da3cbe: 2nd+ spawn 90 trials production fix
   ↓
H3 mitigation ✓ 90% accuracy (Verification Guide §3.4 도달)
   ↓
c3 60% 잔존 한계 분석
   ↓
small sub-pool ROUNDS sweep (commit 2db71ef): inherent limit 확정
   ↓
6×6 substrate 측정 (commit b8458e5): N=4/5 100% accuracy
   ↓
Phase 2A.2 production 적용 결정 보류 (사용자 visible 변경 + 광범위 코드 수정)
```

## 2. Commit chain (24건, 모두 push 완료)

### 2.1 CI 인프라 (3건) — deploy time 1h 13m → 4m

- `f3ee58b`: R&D 25개 sweep nightly cron 분리
- `d56d09a`: unit-first fail-fast 분리 + grid-input-live-trigger 한글 정합
- `3dc0170`: activeInputs 5×5 grid test fix

### 2.2 Production fix (6건)

- `da2020b`: GridInput 4×4 → 5×5 (UI ↔ engine dimension 정합)
- `973df92`: clusterPoolUsage worker whitelist (CPM-1 진단 unblock)
- `598eb14`: restoreSnapshot preset hint forward (CPM-1 inputDim stale)
- `335ee70`: self-verify lastFeature.length stale gate (CFM-1 unblock)
- `14a03fe`/`69b9d21`: incremental fairness wrong direction revert
- **`8da3cbe`**: 2nd+ spawn ROUNDS=18 (90 trials) — **H3 mitigation 90%**

### 2.3 Measurement (13건, 모두 nightly cron 분류)

| commit | scenario | 핵심 발견 |
|--------|----------|----------|
| `880c750` | v1 verification | production 일치 + H3 0% 확정 |
| `343123d` | v2 30 round | mutual interference 가설 진행 |
| `318c789` | v3 forceDisjoint | c3 under-allocation root cause 확정 |
| `c7d308d` | last spawn reinforce | under-training 가설 확정 (180 round → 100%) |
| `(included)` | spawn order swap | 순서 무관, 마지막 spawn 자체 문제 |
| `(included)` | ROUNDS sweep | mid-cluster over-training catch (P218 패턴 재현) |
| `(included)` | interleaved vs sequential | 학습 패턴 영향 0 |
| `(included)` | extra rounds new cluster | 확정 design [30,90,90,90] |
| `(included)` | fix verification | commit 14a03fe wrong direction catch |
| `c7201b9` | N scaling | N=4/6 90%, N=5 88%, N=8 70% |
| `5925701` | incremental add (N=4→5) | c3 -20%p degradation |
| **`b8458e5`** | **6×6 비교** | **N=4/5 모두 100%, c3 sub-pool 5 features** |
| `2db71ef` | small pool boost | 5×5 c3 inherent limit (90 trials = ceiling) |

### 2.4 Docs (3건)

- `9a4ac3a`: Phase 2A.1 closure verdict
- `c7201b9`: N scaling 한계 + Phase 2A.2 후보
- `bdecde7`: Phase 2A.2 6×6 evidence 정리

## 3. Production effect (사용자 visible)

| 항목 | 직전 (이전 cycle) | 본 cycle 후 |
|------|------------------|-------------|
| UI grid | 4×4 (16 cell) | **5×5 (25 cell)** |
| Engine substrate | n13 (32-dim) | **n14 (50-dim)** |
| 1st 패턴 학습 시간 | 3-4초 | 3-4초 (불변) |
| 2nd~4th 패턴 학습 시간 | 3-4초 | **9-12초** (3x) |
| 4 패턴 noisy accuracy | 75% (c3 0%) | **90%** (c3 60%) |
| Jaccard max overlap | 0.55-0.83 | **0.231** (3-4x 개선) |
| CPM-1 sub-pool 점유율 | 18/32 (56%) | 21/50 (42%) |
| CI deploy time | 1h 13m | **4m** (18x 단축) |

## 4. Verification Guide §4 Hypothesis 최종 판정

| H | 측정 evidence | 판정 |
|---|---------------|------|
| H2 sub-pool exhaustion | 21/50 (42%), Guide expected 50-70% | ↓ below expected (substrate over-capacity, no harm) |
| H3 catastrophic forgetting | 75% → 90% (commit 8da3cbe 후) | ✅ **mitigated** |
| H4 sparse code overlap | 0.55-0.83 → 0.231 | ✅ **mitigated** (3-4x 개선) |

**Decision tree §5 적용**: H4 ✓ + H3 ✓ → Phase 2A.1 cycle 종결.

## 5. Phase 2A.2 production 적용 결정 보류 사안

### 5.1 Evidence (강력)

| 시나리오 | 5×5 (50-dim) | 6×6 (72-dim) | 개선 |
|---------|--------------|--------------|------|
| N=4 | 90% (c3 60%) | **100%** | +10%p (c3 +40%p) |
| N=5 | 88% (c3 40%) | **100%** | +12%p |
| c3 sub-pool | 3 features | 5 features | +2 features |
| Jaccard max | 0.231 | 0 (완전 disjoint) | 100% disjoint |

### 5.2 Inherent limit 확정 (5×5 추가 fix 불가능)

`phase-2a-1-small-pool-boost.json` 측정:
- v0 90 trials: c3 60%, total 90%
- v1 120 trials: c3 **0%** (즉시 saturation)
- v2-v4 150-240 trials: c3 **0%** (지속 saturation)

→ small sub-pool (3 features) cluster 의 STDP saturation 임계 = 90 trials.
ROUNDS / R-STDP gain 조정으로 5×5 c3 100% 도달 불가능.
**6×6 substrate 전환만이 유일 path.**

### 5.3 적용 시 위험 (자율 모드 한계)

1. **광범위 코드 변경**: 19 src 파일 + 14 test 파일
   - 모든 'orientation-5x5' / n14_extended → 'orientation-6x6' / n15_extended_6x6
   - 25-dim test 패턴 14건 → 36-dim 의미적 변환
   - expected activeInputs 재계산 (compute72DimFeature output)

2. **사용자 visible 변경**:
   - UI grid 5×5 (25 cells) → 6×6 (36 cells)
   - 학습 데이터 reset 토스트 (Phase 2A.1 패턴 재현)

3. **6×6 known issue** (HONEST_LIMITATIONS.md):
   - N>=7 시나리오 "Bottom row" 패턴 실패 가능성
   - N=4/5 시나리오에는 영향 없음 측정 확인 (commit b8458e5)
   - 사용자가 N>=7 까지 사용 시 잠재 위험

### 5.4 다음 cycle 진행 시 권장 path

1. Phase 2A.2 production 적용 단계:
   - 단계 A: `live-snn.ts` substrate kind 변경 + dispatchFeature 36-dim 지원
   - 단계 B: UI 6×6 (GridInput.tsx + CSS + ORIENTATION_PRESETS 36-dim)
   - 단계 C: 6 production 컴포넌트 'orientation-5x5' → 'orientation-6x6'
   - 단계 D: 14 test 파일 의미적 변환 (helper 함수 + 일괄 적용)
   - 단계 E: Toast 메시지 + 학습 데이터 reset 알림 (Phase 2A.1 패턴 재현)
   - 단계 F: 검증 → typecheck pass + unit 906/906 pass + integration verify
   - 단계 G: commit + push + CI deploy 확인

2. 단계별 commit (1-2 commit 단위) 으로 risk 분산.

3. 6×6 N>=7 사용 가능성 검토 후 적용.

## 6. 잔존 backlog

| 항목 | 영향력 | 작업 규모 |
|------|--------|----------|
| Phase 2A.2 production 적용 | 사용자 4-5 패턴 accuracy 90→100% | 큼 (다중 cycle) |
| Hand SNN MediaPipe 통합 | HandFace 핵심 기능 (현재 미통합) | 매우 큼 |
| 5×5 N>=7 capacity 한계 | N=8 70% accuracy | Phase 2A.2 적용 시 동시 해결 |
| 6×6 Bottom row issue | N>=7 시 잠재 위험 | Phase 2A.2 적용 후 측정 필요 |

## 7. CI / 인프라 mandate 정합

- CI deploy time **4분 유지** (사용자 mandate, commit f3ee58b 이후)
- R&D 측정 25+ 건 → nightly cron 분류
- push verify: typecheck + lint + unit 80 file + light integration 11 file
- nightly: 25+ R&D measurement (sweep / variance / measurement / analysis 패턴)

## 8. 메모리 영구 보존 사항 (사용자 catch)

- `feedback_autonomous_execution.md`: 사용자 명령 / confirm 회피, 본 agent 직접 진행
- `feedback_ci_deploy_time_preservation.md`: handface CI 4분 mandate
- `feedback_process_cleanup_mandatory.md`: 본 agent spawn process 즉시 cleanup
- `feedback_vitest_zombie_prevention.md`: Windows + vitest 4.x zombie worker 회피

---

**Generated**: 2026-05-31 (Phase 2A.1 H3 mitigation closure cycle)
**Status**: Phase 2A.1 ✓ closed. Phase 2A.2 production 적용 결정 보류 (사용자 catch 대기).
