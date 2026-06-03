# Hand Landmark Fixture Format (Phase 3.7)

Phase 3.6 측정은 synthetic anatomical mock 으로 30% accuracy 만 달성. 실제 인체 hand variation 측정을 위해 사용자가 webcam 으로 캡처한 landmarks 를 JSON 으로 저장 후 measurement 를 재실행할 수 있다.

## 사용 방법

1. `tests/integration/fixtures/hand-real-2026-XX-XX.json` 파일 생성 (아래 schema)
2. 환경변수와 함께 측정 재실행:
   ```bash
   HANDFACE_HAND_FIXTURE=tests/integration/fixtures/hand-real-2026-XX-XX.json \
     npx vitest run --config vitest.config.rd.ts \
     tests/integration/phase-3-hand-snn-production-measurement.test.ts
   ```
3. 결과는 `tests/integration/measurements/hand-snn-phase-3-production-measurement.json` 에 저장 — `dataSource` 필드에 fixture 경로 기록됨.

## JSON Schema

```json
{
  "gestures": [
    {
      "name": "open_palm",
      "frames": [
        [
          {"x": 0.5, "y": 0.9, "z": 0.0},
          {"x": 0.35, "y": 0.78, "z": 0.0},
          ... 21개 landmark
        ],
        ... N개 frame (frame 별 21 landmark)
      ]
    },
    ... 4개 gesture
  ]
}
```

- 각 frame 은 정확히 21 개 landmark (MediaPipe HandLandmarker 의 21-keypoint convention).
- 각 landmark 의 `{x, y, z}` 는 정규화 좌표 (`x, y` 는 0~1, `z` 는 손바닥 기준 signed depth).
- 권장: gesture 당 N=10 frames 이상 (Phase 3.6 측정은 평균 landmarks 사용).

## Capture 도구

현재 webcam 캡처용 dedicated 도구는 없음. 사용자가 `src/components/snn/pipeline/CameraInput.tsx` 의 RAF 루프 (`latestLandmarksRef.current`) 를 활용하여 콘솔 로그 또는 별도 dev UI 로 frame 들을 추출 가능. 추후 Phase 3.7+ 에서 dedicated capture 도구를 별도 구현 가능.
