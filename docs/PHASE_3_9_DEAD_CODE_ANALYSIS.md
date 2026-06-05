# Phase 3.9 Dead Code Analysis (2026-06-06)

handface phase-3.9-final 의 Hand SNN UI 폐기 후 잔존하는 import / 분기의 도달가능성 분석.

## 검증 결과

### A. `src/lib/snn-runtime/hand-noise.ts` — **LIVE (유지 필요)**

| 호출자 | 위치 | 도달가능성 |
|---|---|---|
| `NodeLearn.tsx` (self-verification batch) | line 761-763 | ✓ **substrate-independent** — n13/n14/n15/n16 모두에서 호출됨. Grid SNN 의 confusion matrix self-verification 영역 사용 |

**판정:** 유지. Grid path 의 self-verification 영역 활용 중.

### B. `src/lib/snn-runtime/hand-spike-encoder.ts` — **부분 DEAD**

#### B.1 `selectTopKActive` + `HAND_SPARSE_TOP_K_DEFAULT`

| 호출자 | 위치 | 도달가능성 |
|---|---|---|
| `live-snn.ts:1571,1575,1585` | `_handFeatMean` 관련 disjoint top-K | **DEAD** — 모두 hand substrate 분기 내부, Camera tab 폐기 후 `substrateKind === 'orientation-hand'` set path 없음 |
| `live-snn.ts:2273` | `isHand = substrateKind === 'orientation-hand'` 명시 분기 | **DEAD** — 동일 사유 |
| `worker-core.ts:45,55` | `dispatchFeature` 의 95-dim path | **DEAD** — pattern.length === HAND_FEAT_DIM 분기, hand substrate worker 영역만 도달 |

#### B.2 `encodeHandToFeatureVector`, `applySparseTopK`, `HAND_FEAT_DIM`, `HandLandmark`

`worker-core.ts:40-56` 의 `dispatchFeature` 영역만 사용 — 위와 동일하게 hand substrate path 에서만 reach. **DEAD.**

**판정:** 라이브러리 자체는 보존 가치 (학술 정합 + 향후 SNN encoder 재사용 가능성), 단 caller 측 dead 분기 제거 시 import 도 정리 가능.

### C. `src/lib/snn-runtime/builders/n16-hand.ts` — **부분 DEAD**

| 호출자 | 위치 | 도달가능성 |
|---|---|---|
| `art.ts:23` (`N16Pools`, `N_INPUT_N16`) | ART vigilance 의 substrate-specific 분기 | **DEAD** — n16 substrate (hand) 영역만 도달 |
| `worker-core.ts:16` (`buildN16HandPreset`, `RAW_DIM_N16`) | substrate switching path | **DEAD** — input-mode='camera' 이벤트가 fire 안 함 |

**판정:** n16-hand builder 는 전체 dead. 단 builder 패턴 자체는 학술 정합 + 다른 substrate (n13/n14/n15) 와 일관성 영역 보존.

## Cleanup roadmap (future option)

### Option 1: 보수적 (현재 채택) — `import` 유지 + 분기 dead 표시
- 큰 refactor 회피
- live-snn.ts / worker-core.ts / art.ts 의 hand-specific 분기에 `// DEAD (Phase 3.9 final)` 주석만 추가
- 라이브러리 그대로 보존

### Option 2: 중간 — dead 분기 제거, library 유지
- live-snn.ts 의 `substrateKind === 'orientation-hand'` 분기 모두 제거 (~50-100 lines)
- worker-core.ts 의 hand pattern length 분기 제거
- art.ts 의 N16Pools 분기 제거
- hand-spike-encoder.ts / n16-hand.ts / hand-noise.ts (NodeLearn 외) 는 보존 (학술 정합)
- 위험도: 중간 — 1015 tests retain 검증 필요

### Option 3: 완전 — hand 관련 모두 제거
- builders/n16-hand.ts, hand-spike-encoder.ts 도 제거
- worker-core.ts 의 HAND_FEAT_DIM 검증 path 제거
- 큰 refactor, git history 영역 학술 기록은 phase-3.9-final tag 영역 보존
- 위험도: 높음

## 권장

**현재는 Option 1 (보수적)** — handface 가 frozen state 라서 추가 refactor 의 ROI 낮음. hippoface 가 본격 SNN runtime 활용 path 라면 거기서 fresh start.

새 프로젝트 (hippoface) 의 lib 영역 재사용 시 학술 정합 layer (DG / CA3 / LIF / STDP) 만 가져왔으므로 handface 의 deprecated dependency 영역 무관.
