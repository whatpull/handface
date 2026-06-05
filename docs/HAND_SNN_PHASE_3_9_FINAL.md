# Hand SNN Phase 3.9 — Final Decision (2026-06-05)

## 사용자 catch (정직 보고)

**Hand gesture 인식 path 폐기 결정.** 학술 + 공학적 catch:

### 근본 한계
1. **MediaPipe HandLandmarker 가 이미 CNN 으로 학습된 모델** — 그 출력 (21 landmarks) 을 다시 SNN 으로 재학습하는 것은 정보 손실 + 비효율 + 학술 정합 없음.
2. **MediaPipe GestureRecognizer (CNN, pre-trained)** 가 7 known gestures (open_palm / closed_fist / thumbs_up / peace_sign / pointing_up / OK / ILoveYou) 즉시 분류 가능 — SNN 으로 재학습 가치 0.
3. **SNN spike-based rate-coding 은 static spatial pose 학습에 본질적으로 weak.** Temporal / dynamic 신호에 강점.
4. **Encoder catch (v47 measurement):** wrist-relative + palm-size normalize → 자세 cross-pose sim 0.927-0.990 (margin 0.066). Cosine threshold 만으로 자세 분리 불가능.

### Phase 3.9 진행 결과 (v26-v58)
- v26-v27: worker sync + fallback (initial production catch path)
- v28-v36: sustained simulation, capacity stress, log throttle
- v37-v41: UX (interval / handedness / gesture classifier / relative time)
- v42-v44: CRITICAL — setSubstrate idempotent (production 15:18 catch)
- v45-v51: self-heal sync (다층 defense)
- v52-v56: UX polish (stability mode, force sync, onboarding)
- v57: CI lint fix (deploy 정상화)
- **v58: cosine threshold 강화 — fix 자체는 작동, 단 근본 한계 catch**

### 학술 결론
**Hand pose classification SNN 시도는 학술적으로 부적합 path.** 본 phase 의 가치 = SNN architecture (LIF + R-STDP + ART vigilance + cluster pool) 의 production-grade 검증 — 새 프로젝트 (Hippocampus-like episodic memory + LLM) 에서 재사용.

## 정리 결정
1. **Hand mode UI 폐기** — Camera tab + Hand SNN substrate path 제거 또는 deprecated 처리
2. **Grid SNN (orientation-6x6) demo 만 유지** — SNN 학습 visualization 가치 보존
3. **SNN lib (`src/lib/snn-runtime/` + `src/lib/snn/`) 보존** — 새 프로젝트 재사용 가능 형태
4. **phase-3.9-final tag** — current stable snapshot

## 새 프로젝트 전환
**Hippocampus-like Episodic Memory for LLM** — SNN 본질 강점 (sparse spike code + pattern completion + temporal sequence + continuous learning) 을 LLM 의 context window / RAG vector DB 한계 영역 대안으로 활용.
