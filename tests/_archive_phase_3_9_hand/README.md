# Phase 3.9 Hand SNN — Archive

본 디렉토리는 **Phase 3.9 final (2026-06-05)** 에서 폐기 결정된 **Hand SNN (MediaPipe + spike-based hand pose classification)** path 의 학술 측정 기록입니다.

## 폐기 사유

자세한 내용은 [`docs/HAND_SNN_PHASE_3_9_FINAL.md`](../../docs/HAND_SNN_PHASE_3_9_FINAL.md) 참조.

요약:
1. MediaPipe HandLandmarker 가 이미 CNN 학습된 모델 — 그 출력을 다시 SNN 으로 재학습하는 것은 정보 손실 + 비효율
2. MediaPipe GestureRecognizer (pre-trained CNN) 가 7 known gestures 이미 분류 가능
3. SNN spike rate-coding 은 static spatial pose 분류에 본질 weak
4. Encoder cross-pose sim margin 0.066 — cosine threshold 만으로 자세 분리 불가능

## 보존 가치

- 학술 검증 기록 (cluster R-STDP, EWC, multinomial bootstrap CI, Cressie-Read 등)
- 측정 결과 JSON 보존 (`tests/integration/measurements/` 에서 archive 시점 데이터)
- git history 영역 완전한 reproducibility 보존
- 향후 SNN 기반 다른 application 영역 참고 자료

## CI 처리

vitest config 의 exclude pattern (`**/_archive_*/**`) 으로 production verify 에서 제외됩니다. R&D nightly cron 도 동일하게 skip.

## tag

`phase-3.9-final` git tag 시점에 frozen된 측정 기록입니다.
