# Hand SNN MediaPipe 통합 Roadmap

**최종 업데이트**: 2026-06-03 (Phase 2A 완전 closure 후 잔존 backlog 영역 단계별 정리)

본 문서는 handface 영역 핵심 미완성 기능 — **MediaPipe Hand 인식 + SNN 학습 통합** — 영역 단계별 진행 roadmap.

## 0. 현재 상태 (2026-06-03)

### 0.1 Backend 완성 영역

✓ **n16-hand substrate builder** (`src/lib/snn-runtime/builders/n16-hand.ts`)
- 75-dim input feature (hand landmark 영역 인코딩 결과)
- 4 cluster 영역 base + dynamic expansion 가능

✓ **hand-snn-trainer** (`src/lib/snn-runtime/hand-snn-trainer.ts`)
- multi-shot supervised training path

✓ **hand-spike-encoder** (`src/lib/snn-runtime/hand-spike-encoder.ts`)
- 21 hand landmarks → 75-dim feature vector
- top-K sparse code 영역 distinctiveness 강화

✓ **Worker-core 영역 'orientation-hand' substrate handling**
- buildPresetForKind('orientation-hand') → 'n16_hand'

✓ **LocalSNN + LiveSnn 영역 substrate kind 지원**
- input-mode event listener 영역 'camera' → 'gesture' substrate
- Note: 직전 코드 영역 'gesture' (16-dim legacy) — 'orientation-hand' (75-dim) 영역 영역 영역 wire 변경 필요

### 0.2 UI 통합 영역 없음

✗ **NodeInput.tsx 영역 GRID 전용** (line 3: "// 카메라 입력 제거")
- 21 lines, GridInput 영역 만 render
- camera tab / button / mode toggle 없음
- subtitle "4×4 orientation" — stale (현재 6×6 production)

✗ **MediaPipe HandLandmarker library 영역 import 없음**
- `package.json` 영역 `@mediapipe/tasks-vision` 영역 dependency 없음
- 별도 setup 필요

✗ **camera input 영역 trigger path 없음**
- input-mode event 영역 'camera' 영역 emit 영역 컴포넌트 없음
- live-snn 영역 setSubstrate('orientation-hand') 영역 trigger 없음

### 0.3 직전 production observation (HONEST_LIMITATIONS.md)

⚠ Hand SNN (MediaPipe Hand):
- 1-shot 25% accuracy
- multi-shot oscillating
- ART/EWC 통합 미완성

→ research lib (`p219-camera-sim.ts`) 영역 mock 시나리오 영역 측정 결과. **production UI 영역 통합 안 됨** 영역 사용자 영역 실제 측정 0.

## 1. 단계별 Roadmap

### Phase 3.1: MediaPipe Library Setup

**목표**: HandLandmarker library 영역 webcam input 확보

**작업**:
- `npm install @mediapipe/tasks-vision` (또는 동등 library)
- public 영역 model weights (`hand_landmarker.task`) 다운로드 + 호스팅
- HandLandmarker initialization helper 영역 작성:
  ```ts
  // src/lib/hand-tracking/landmarker.ts
  export async function createHandLandmarker(): Promise<HandLandmarker>;
  export async function detectLandmarks(video: HTMLVideoElement): Promise<HandLandmarks | null>;
  ```

**검증**:
- webcam → HandLandmarker → 21 landmarks output 영역 확인
- frame rate 영역 30fps 영역 유지

**위험**:
- library 크기 (~3MB+) → bundle 크기 영역 영역
- 사용자 webcam permission deny 영역 안내 dialog 필요

### Phase 3.2: NodeInput UI — Camera Mode 추가

**목표**: 사용자가 GRID / CAMERA 영역 선택 가능

**작업**:
- `NodeInput.tsx` 영역 tab 영역 추가 (GRID / CAMERA)
- CameraInput.tsx 신규 컴포넌트:
  - webcam preview (video element)
  - HandLandmarker frame loop
  - landmark visualization (21 points overlay)
  - 학습 trigger button ("이 자세 학습")

**검증**:
- GRID / CAMERA toggle 영역 동작
- 카메라 활성 시 hand landmarks 영역 실시간 표시

**위험**:
- 모바일 device 영역 camera permission API 영역
- 사용자 UX — GRID 영역 익숙한 영역 영역 CAMERA 영역 안내 필요

### Phase 3.3: input-mode wire — 'camera' → 'orientation-hand' substrate

**목표**: CAMERA mode 활성 시 live-snn 영역 orientation-hand substrate 영역 setSubstrate

**작업**:
- `live-snn.ts` 영역 input-mode listener:
  ```ts
  this._unsubscribeInputMode = onBackendEvent<InputModeDetail>('input-mode', (d) => {
    const next: SubstrateKind = d.mode === 'camera' ? 'orientation-hand' : 'orientation-6x6';
    void this.setSubstrate(next);
  });
  ```
  (직전: 'gesture' (16-dim) → 'orientation-hand' (75-dim) 영역 wire 변경)
- NodeInput Camera tab 영역 mount 시 `emitBackendEvent('input-mode', { mode: 'camera' })` 영역 emit

**검증**:
- CAMERA mode → live-snn substrate 'orientation-hand' 영역 전환 확인
- GRID 영역 복귀 시 'orientation-6x6' 영역 복원

**위험**:
- 사용자 학습 데이터 substrate 별 namespace 영역 — 영역 별도 reset path 영역 필요할 수도

### Phase 3.4: hand landmarks → 75-dim feature vector + triggerWithVigilance

**목표**: 실시간 hand landmarks 영역 SNN 학습 input 영역 변환

**작업**:
- HandLandmarker output (21 landmarks × 3 coords = 63 values) → hand-spike-encoder 영역 통과
- 75-dim feature vector 영역 LiveSnn.triggerWithVigilance() 영역 호출

**검증**:
- hand 영역 영역 자세 (open palm / closed fist / thumbs up / peace sign) 영역 cluster spawn
- vigilance threshold 영역 영역 자세 영역 reinforce
- subset 인식 (commit b90c103) 영역 영역 자세 noise 영역 영역 영역

**위험**:
- hand landmarks 영역 noise 영역 큼 (조명 / 거리 / 각도)
- 직전 P218 noise sweep 영역 영역 시나리오 영역 영역 영역 — production noise 영역 별도 측정 필요

### Phase 3.5: Gesture Label 영역 winner cluster 영역 학습 결과 표시

**목표**: 학습된 cluster 영역 사용자 영역 명명 (예: "엄지척" "주먹") + 인식 시 표시

**작업**:
- NodeOut.tsx 영역 cluster label 영역 사용자 입력 (dialog input)
- INFER 영역 현재 winner cluster 영역 label 영역 표시 ("엄지척 95%")

**검증**:
- 4 자세 학습 후 인식률 측정 (self-verify)
- 사용자 mental model 영역 catch — "이 자세 영역 영역 학습되었나?"

### Phase 3.6: 측정 + 최적화 (⚠️ 부분 완료, 2026-06-03)

**목표**: production accuracy 측정 + ART/EWC 통합

**완료 작업**:
- ✅ 4 자세 anatomical mock + production clusterTrainRStdp + 정직 inference 측정 — **30% accuracy** (open_palm 60%, closed_fist 0%, thumbs_up 0%, peace_sign 60%; σ=0.05)
- ✅ HONEST_LIMITATIONS.md 정정 — 직전 1-shot 25% → 30% (marginal 개선만)
- ✅ Phase 2A fix chain 자동 적용 확인:
  - subset 인식 ✓ (commit b90c103)
  - 1st 30 / 2nd+ 90 trials ✓ (commit 8da3cbe)
  - rawActiveInputs ✓ (commit 4deb9bc)
  - auto-purge ✓ (commit 6e3b574)
- ✅ 직전 hand-snn-cluster-rstdp.json 100% 는 oracle inference (applySparseTopK(fv, topKIndices[g]) → ground truth leak) 임을 인정 명시

**핵심 발견 (encoder.ts:237-256 자체 진단 인용)**:
> "4 gesture pairwise Jaccard distinctiveness 0.0185 (=98% overlap). R-STDP/ART/EWC 어떤 mechanism도 이 overlap 위에서는 분리 불가능."

→ sparse forced-disjoint top-K=5 가 *claimed indices* 의 Jaccard 0 을 보장하지만, claimed indices 에서의 input value 가 4 mock gestures 에 걸쳐 동등 → 정직한 inference 에서는 WTA random-like.

**검증 미충족**:
- ❌ Hand SNN production self-verify ≥ 90% — synthetic mock 으로는 도달 불가 (본질 한계)
- ❌ 사용자 production 에서 4 자세 정확 인식 — 실제 webcam 측정 미진행 (Phase 3.7 대상)

**측정 데이터**: tests/integration/measurements/hand-snn-phase-3-production-measurement.json

### Phase 3.7: 실제 webcam fixture 측정 (deferred — 사용자 협업 필요)

**목표**: synthetic mock 한계 극복 — 실제 인체 hand variation 으로 production accuracy 측정

**작업**:
- 사용자 webcam 으로 4 자세 × N=10 frames record → JSON fixture 로 save
- Phase 3.6 measurement test 에 fixture path env var 추가 — synthetic mock 을 real landmarks 로 전환
- 동일 path (clusterTrainRStdp + 정직 inference) 로 real data accuracy 측정

**검증**:
- 실제 hand variation 에서 production accuracy ≥ 90% (synthetic 한계 와 비교)
- 또는: 실제 data 에서도 비슷한 indistinguishability — 95-dim encoder 자체의 한계 확인

**위험**:
- 사용자 협업 필수 (autonomous 진행 불가)
- real landmark variation 이 mock 과 전혀 다른 distribution → 새 fix chain 필요 가능

## 2. 우선순위 / 추정 시간

| Phase | 우선순위 | 작업 cycle | 위험 |
|-------|--------|----------|------|
| 3.1 MediaPipe setup | high (필수) | 1 cycle | medium (library 크기) |
| 3.2 NodeInput UI | high | 1-2 cycle | low |
| 3.3 input-mode wire | high | 1 cycle | low |
| 3.4 landmarks → SNN | high | 1-2 cycle | high (noise) |
| 3.5 Gesture Label UI | medium | 1 cycle | low |
| 3.6 측정 + 최적화 | high | 2-3 cycle | medium |

**총 예상**: 7-10 cycles (단계별 진행, 사용자 catch 영역 영역 영역 영역)

## 3. 잔존 backlog 영역 관계

본 Hand SNN 통합 영역 handface 영역 잔존 핵심 backlog. 완료 시:
- HONEST_LIMITATIONS.md §1.2 영역 Hand SNN 항목 영역 ✅ 영역 영역 영역
- handface 영역 핵심 기능 (이름 "HandFace") 영역 활성화

## 4. Phase 2A 영역 응용

직전 Phase 2A 영역 fix chain 영역 Hand SNN 영역 직접 영역 영역:

| Phase 2A fix | Hand SNN 영역 영역 |
|--------------|-----------------|
| 2nd+ spawn 90 trials | 사용자 영역 학습 자세 영역 충분 reinforce |
| rawActiveInputs 보존 | forceDisjoint 영역 영역 영역 인식 영역 (영역 자세 영역 영역 인식) |
| subset 인식 (T ⊆ I) | 영역 noise 영역 영역 자세 영역 영역 영역 영역 영역 영역 |
| dialog UX | cluster pool 고갈 영역 안내 |
| auto-purge | substrate switch 시 자동 reset |

→ Hand SNN 영역 별도 fix 없이 Phase 2A 영역 모두 자동 적용.

## 5. 참고 — 직전 research 영역 evidence

- `p219-camera-sim.ts` — mock simulation
- `p218-capacity-5x5` — substrate capacity 영역 측정
- `phase-2a-2-6x6-N=4~8` — 6×6 substrate 영역 N=8 까지 100% (commit a7d4192)

Hand SNN (75-dim n16) 영역 더 큰 capacity → N=10+ 자세 영역 영역 안전 영역 가능.

---

**Status**: Phase 2A ✓ closed. Hand SNN 통합 영역 다음 phase (Phase 3). 본 roadmap 영역 단계별 진행 path 영역 사용자 catch 영역 진행 가능.
