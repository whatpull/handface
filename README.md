# HandFace — Neural Mesh Editor

Bio-SNN (Spiking Neural Network) 시각화 + 노드 에디터. Next.js 15 + TypeScript + Tailwind 기반.

## 현재 기능

| 영역 | 기능 |
|---|---|
| 캔버스 | drawflow 기반 노드/시냅스 시각화 (sample 12 per population), pan/wheel zoom, edit mode |
| 뷰 | Region (4 카드) ↔ Neuron (~50 노드 sampling) 토글 |
| 학습 | **Train** — 4 gestures × 3 trials supervised STDP (`/handface_train_supervised`) |
| 평가 | **Eval** — decode 정확도 측정, **Predict** — 단일 입력 예측 + 신뢰도 시각화 |
| 회로 변형 | **Brain Builder** — Hippocampus/PFC/Cerebellum 등 35+ region 라디오 선택 추가 (base + 1 region) |
| 회로 관리 | **Reset** (base cortical preset 재구성), **Save/Load** (학습 weight localStorage), **Export/Import** (회로 JSON) |
| 발화 시각화 | Train 시 매 trial 마다 fired neuron 카드 빛남 + 시냅스 cyan pulse |
| 카메라 토글 | src_camera/src_gesture 시냅스 dim+dashed (실제 MediaPipe 통합은 미구현) |
| 모바일 | bottom-bar 5-slot (Train/Eval/Save/Reset/More) |

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # tsc + eslint (.next 안 건드림)
npm run build    # production export → out/
```

배포: `main` push 시 GitHub Actions 가 자동 배포 (`/handface` basePath).

## 백엔드

[neuronface](https://github.com/whatpull/neuronface) FastAPI 가 SNN 시뮬레이션 담당.
사이드바 ⚙ → endpoint + API key 설정.

## 구조

```
src/
  app/                  # Next.js App Router
  components/
    Editor.tsx          # 최상위 오케스트레이터 (toolbar/sidebar/canvas/panels)
    snn/
      Canvas.tsx        # drawflow 통합 + 발화 시각화 + view 분기
      Toolbar.tsx       # Region/Neuron 토글, Train/Eval/Predict/Reset/Brain/Stats/Save/Load/Export/Import
      Sidebar.tsx       # Camera/Edit/Settings
      SettingsPanel.tsx # endpoint + API key
      StatsPanel.tsx    # region_summary 카드
      PredictionPanel.tsx  # 단일 gesture 예측 + winner + 4 OUT 막대 그래프
      BrainBuilderDialog.tsx  # 35+ region 라디오 선택
      MobileBottomBar.tsx
    snn-canvas.css      # drawflow 노드/시냅스 디자인
  lib/
    backend/
      client.ts         # NeuronFaceClient (initialize/predict/train/eval/reset 등)
      events.ts         # neuron-firing/circuit-changed 이벤트 버스
      settings.ts       # endpoint/apiKey localStorage
    snn/
      actions.ts        # Toolbar/MobileBottomBar 공유 액션 팩토리
      data.ts           # weightColor 유틸
      drawflow-helpers.ts  # drawflow 통합 순수 함수 (renderNodeHtml/fitToView/...)
      layout.ts         # backend snapshot → 드로우플로우 좌표 변환
      positions.ts      # localStorage 영구화
  types/
    drawflow.d.ts       # drawflow UMD 타입 선언
```

## 사용 시나리오

1. **Settings** → 백엔드 endpoint + API key 입력 → Save + Test
2. **Reset** → 회로 초기화 (base cortical preset 적용)
3. **Train** → 4 gestures × 3 trials supervised 학습
4. **Predict** → gesture 선택 → 예측 결과 (winner + confidence) 확인
5. (선택) **Brain Builder** → 추가 region 1개 선택 → Apply (base + 1 region 으로 재구성)

## 롤백 브랜치

이전 vanilla JS + Vite 구현은 `main-rollback-snn-viz` 에 보존.

## 추후 계획

- MediaPipe Hand 통합 → 21 landmarks → 8-dim feature → SNN inject (실제 카메라 → AI 분류 흐름)
- Custom gesture 라벨링 (사용자 정의 OUT 매핑)
- Vectorized backend mode 활성화 (시뮬레이션 추가 단축)
