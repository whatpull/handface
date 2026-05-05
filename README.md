# HandFace — Neural Mesh Editor

Bio-SNN (Spiking Neural Network) 시각화 + 노드 에디터. Next.js 15 + TypeScript + Tailwind 기반. MediaPipe Hand 통합으로 카메라 → 16-feature → SNN 자극 흐름을 실시간 시각화.

## 현재 기능 (2026-05-05, N3 cortical + 5-phase state machine)

| 영역 | 기능 |
|---|---|
| 캔버스 | drawflow 기반 노드/시냅스 시각화 (population 당 12 sampling), pan/wheel zoom, edit mode, overlap-prevent (`preventOverlap()`) |
| 뷰 | Region (4 카드) ↔ Neuron (~50 노드) 토글 |
| 회로 | N3 feature16 preset — 472 neurons (default 200 v1_l4e_count 또는 50 슬림 모드) / OUT 32 cluster (4×8) / WTA mutual inhibition / NMDA on |
| 학습 | 5-phase state machine: UNTRAINED → LEARNING → PARTIAL → TRAINED → INFERENCE. 자동 학습 (gestureStableCount ≥ 5 + conf ≥ 0.85) → cluster_train_supervised (batch) → cluster 30 frame 도달 시 cluster_lock 자동 |
| 발화 시각화 | inject 시 fired neuron 1500ms 빛남 + 시냅스 cyan glow, hover/fired 강조 |
| MediaPipe | dual-tracker — HandLandmarker (16-feature 입력) + GestureRecognizer (정답 라벨, supervisor) |
| Custom 라벨 | OutNodeOverlay 가 OUT 노드 위 ✎ rename + count 표시 |
| 카메라 | CameraQuickControls (start/stop/quality), src_camera 미연결 시 시냅스 dim+dashed |
| 회로 관리 | **Reset** (DELETE + 재생성 → base preset 재구성), Save/Load 는 백엔드 snapshot endpoint 직접 사용 |
| 모바일 | bottom-bar 3-slot (Save/Reset/View) + View 시트 (Region/Neuron 토글), 핀치줌 + pan 충돌 방지 |

## 개발

```bash
npm install
npm run dev      # http://localhost:3000 (Turbopack)
npm run verify   # tsc + eslint (.next 안 건드림)
npm run build    # production export → out/
```

배포: `main` push 시 GitHub Actions 가 자동 배포 (`output: 'export'`, basePath `/handface`).

## 백엔드

[neuronface](https://github.com/whatpull/neuronface) FastAPI 가 SNN 시뮬레이션 담당. 기본 endpoint `https://whatpull-neuronface.hf.space` (HF Spaces).
사이드바 ⚙ → endpoint + API key 설정.

핵심 라우트:
- `POST /networks` → 신규 네트워크 생성
- `POST /networks/{id}/presets/feature16` → N3 cortical preset 로드
- `POST /networks/{id}/inject_feature16` → 16-dim 자극 + cascade fire
- `POST /networks/{id}/cluster_train_supervised` → cluster prefix `out_{c}_` 8 OUT 모두 supervisor batch 학습 (★ N3 핵심)
- `POST /networks/{id}/cluster_lock` → TRAINED 후 cluster 8 OUT incoming 시냅스 freeze
- `POST /networks/{id}/snapshot-weights` + `/rstdp-pulse` → R-STDP 2-step reward-modulated
- `POST /networks/{id}/astrocytes/homeostasis_step` (`per_neuron=true`) → V_th regulation (silence escape)

## 구조

```
src/
  app/                  # Next.js App Router
  components/
    Editor.tsx          # 최상위 (toolbar/sidebar/canvas/panels)
    snn/
      Canvas.tsx        # drawflow + 발화 시각화
      Toolbar.tsx       # 데스크톱 — Region/Neuron + Reset (3 버튼)
      MobileBottomBar.tsx  # 모바일 — Save/Reset + View 시트
      Sidebar.tsx       # 좌측 고정 패널
      SettingsPanel.tsx # endpoint + apiKey
      ModeIndicator.tsx # 5-phase 상태 표시
      OutNodeOverlay.tsx  # OUT 노드 위 ✎ rename + count
      CameraQuickControls.tsx + HandTrackerHost.tsx  # MediaPipe 통합
    snn-canvas.css
  lib/
    backend/
      client.ts         # NeuronFaceClient
      events.ts         # neuron-firing/circuit-changed 이벤트 버스
      settings.ts       # endpoint/apiKey localStorage
    snn/
      actions.ts            # 공유 액션 팩토리
      drawflow-helpers.ts   # 순수 함수 (renderNodeHtml/fitToView/...)
      layout.ts             # snapshot → drawflow 좌표 + preventOverlap()
      positions.ts          # 노드 위치 영구화
      state-payload.ts      # 5-phase state machine 영역 영역
      use-hand-control.ts   # MediaPipe + 자동 학습 hook
      auto-snapshot.ts      # 자동 저장
      train-counts.ts       # cluster 별 frame count
      out-exemplars.ts + community-baseline.ts + llm-client.ts
      data.ts               # weightColor 유틸
  mediapipe/
    hand-tracker.ts + feature-encoder.ts + landmark.ts  # MediaPipe Hand 21 landmarks → 16-feature
  types/
    drawflow.d.ts       # drawflow UMD 타입 선언
```

## 사용 시나리오

1. **Settings** → 백엔드 endpoint + API key 입력 → Save + Test
2. **Reset** → 회로 초기화 (N3 feature16 preset 재생성)
3. **카메라 시작** → MediaPipe Hand 자동 추적 → gesture stable + conf ≥ 0.85 시 자동 학습 진입 (LEARNING)
4. cluster 별 30 frame 도달 → cluster_lock 자동 (TRAINED) → INFERENCE 모드 진입 시 STDP off

GESTURE_LABEL_TO_CLUSTER: Pointing_Up→0, Open_Palm→1, Closed_Fist→2, Victory→3

## 롤백 브랜치

이전 vanilla JS + Vite 구현은 `main-rollback-snn-viz` 에 보존.

## 추후 계획

- Vectorized backend 활성화 (시뮬레이션 단축, neuronface `modules/vectorized.py` 활성 여부 확인)
- 시냅스 weight 시각화 강도 (선 굵기)
