# HandFace

손 자세 → SNN 학습 → LLM 연동.

브라우저 카메라로 잡은 손 제스처를 Spiking Neural Network 가 직접 학습하고, 그 추론 결과(JSON state payload)를 사용자가 지정한 외부 endpoint(LLM 등) 로 흘려보내는 실험용 프론트엔드.

> **정직 한계 박음 (먼저 읽으세요):** 본 프로젝트는 학술 검증된 분류기가 아닙니다. SNN 의 4-way 제스처 분류는 STDP / R-STDP / WTA / population coding 기반 비교적 단순한 셋업이며 — 학습 안정성, 일반화, 노이즈 강건성은 보장되지 않습니다. 동작은 환경(카메라/조명/손 위치/MediaPipe 신뢰도)에 민감합니다. 이 README 는 사용자 onboarding 만 다루며, 분류 정확도 / endpoint 호환성 / 동작 보장은 **0** 입니다.

라이브: <https://whatpull.github.io/handface/>

---

## 1. What is HandFace?

5 개 노드의 horizontal pipeline 으로 SNN 학습/추론 흐름을 그대로 노출합니다.

```
  ┌────────┐    ┌───────┐    ┌───────┐    ┌──────┐    ┌──────┐
  │ INPUT  │ →  │ LEARN │ →  │ INFER │ →  │ OUT  │ →  │ LLM  │
  │제스처  │    │진행상황│    │추론   │    │결과값│    │외부  │
  └────────┘    └───────┘    └───────┘    └──────┘    └──────┘
   MediaPipe     5-phase      WTA          rename     endpoint
   16-dim feat   STDP+RSTDP   margin       export     auto stream
```

| 노드 | 역할 |
|---|---|
| **INPUT** | MediaPipe Hand Landmarker 21 landmarks → 16-dim feature → 카메라/skeleton 라이브 표시. Gesture name + confidence 같이 표시. |
| **LEARN** | 5-phase state machine (`untrained` → `learning` → `partial` / `trained` → `inference`), cluster 별 frame 카운트 (target 30), Δw 합계, teacher 신뢰도. |
| **INFER** | OUT cluster mean rate, WTA winner + margin, 최근 winner timeline (sparkline), saturation 경고. |
| **OUT** | winner cluster 라벨 (✎ rename 가능 — 예: "Pointing" → "다음 슬라이드"), 4 cluster 별 누적 카운트, JSON export. |
| **LLM** | endpoint URL + API key (localStorage), state payload preview, manual Test send, auto stream toggle (winner 변경 시점만 POST). |

### SNN 학술 배경 (정직 박음)

- **STDP** — Spike-Timing Dependent Plasticity. pre/post 발화 timing 차이로 weight 갱신.
- **R-STDP** — STDP 에 dopamine reward signal 을 추가한 supervised 변형. teacher gesture 가 N=5 frame 안정 + conf ≥ 0.85 일 때 `target_post_prefix` 로 reward pulse 인가.
- **WTA** — Winner-Take-All. cluster 간 lateral inhibition 으로 single winner 선택. margin `(max-second)/max ≥ 0.10` 일 때만 winner 인정 (그 외 "WTA tie").
- **Population coding** — 한 cluster 당 여러 OUT 뉴런(prefix `out_{c}_`)이 평균 rate 로 응답.
- **Homeostatic scaling** — N=30 tick 마다 synaptic scaling + per-neuron `V_th` 조정으로 monopoly(한 cluster 가 모든 입력 지배) 회피.

> **4-way SNN 분류는 nontrivial 합니다.** 일반 ANN/CNN 대비 학습 효율, 정확도, 안정성 모두 떨어집니다. 본 프로젝트의 목표는 *분류 정확도 경쟁*이 아니라 *SNN 학습/추론 흐름의 시각화 + LLM agent 연동의 실험적 demo* 입니다.

이 모든 메커니즘은 백엔드 [neuronface](https://github.com/whatpull/neuronface) (FastAPI + N3 SNN) 안에서 돌아가며, 본 프론트엔드는 시각화 + 사용자 제어 + LLM 송출만 담당합니다.

---

## 2. Quick Start (사용자 onboarding)

### 1) 페이지 접속

<https://whatpull.github.io/handface/>

(로컬 개발: `npm install && npm run dev` → <http://localhost:3000>)

### 2) Backend endpoint 설정

사이드바 ⚙ Settings → endpoint + (옵션) API key 입력 → **Save** → **Test**.

기본 endpoint 는 `https://whatpull-neuronface.hf.space` (HF Spaces 인스턴스). 직접 띄우려면 [neuronface 레포](https://github.com/whatpull/neuronface) 의 FastAPI 절차를 따르세요.

> Test 가 실패하면 endpoint URL / CORS / cold-start 지연을 확인하세요.

### 3) Camera 켜기 + 손 보여주기

사이드바 Camera 토글 → 브라우저 권한 허용 → INPUT 노드 안에 비디오 + skeleton overlay 가 나타납니다. 16-dim feature 막대가 라이브로 갱신됩니다.

### 4) 자동 학습 진행

INPUT 노드에 손이 잡히고 MediaPipe gesture (`Pointing_Up` / `Open_Palm` / `Closed_Fist` / `Victory`) 가 conf ≥ 0.85 로 N=5 frame 연속 안정되면, LEARN 노드 phase 가 `untrained` → `learning` 으로 자동 전환됩니다.

cluster 별로 30 frame 캡처가 채워지면 ✓ 표시 + green bar. 4 cluster 모두 채워지면 phase = `trained`. 일부만 채워지면 `partial`.

### 5) 추론

`trained` 이후 자동으로 phase = `inference` 로 전환 (STDP off + cluster mean readout). INFER 노드에 winner 가 표시되며, OUT 노드에서 winner 라벨을 ✎ 클릭하여 사용자 지정 이름으로 rename 가능.

### 6) LLM 연동

LLM 노드에서:
- **endpoint** = state payload 를 받을 사용자 정의 URL (자체 LLM gateway / n8n webhook / Cloud Function / OpenAI-호환 wrapper 등 — 사용자 환경)
- **api key** = (옵션) `Authorization: Bearer <key>` 헤더로 첨부
- **auto stream** = winner cluster 가 변경될 때마다 1 회 POST
- **Test send** = 현재 state 즉시 송신

> **정직 한계 박음:** endpoint 의 CORS 허용 / rate limit / 응답 schema / 비용은 전적으로 사용자 환경 책임입니다. 본 프로젝트는 단순 `fetch(POST, JSON)` wrapper 만 제공합니다.

---

## 3. Architecture

```
┌─────────────── Browser (Next.js static export) ───────────────┐
│                                                                │
│   MediaPipe Hands ── 21 landmarks ── feature-encoder ── 16-dim │
│                                                          │     │
│                                          PipelineCanvas  │     │
│                                          ┌───────────────▼───┐ │
│                                          │ INPUT │ LEARN │...│ │
│                                          └─────────┬─────────┘ │
│                                                    │ HTTP POST │
└────────────────────────────────────────────────────┼───────────┘
                                                     ▼
                              ┌──────────────────────────────┐
                              │ neuronface (FastAPI + N3 SNN)│
                              │  inject_feature16            │
                              │  cluster_train_supervised    │
                              │  cluster_lock                │
                              │  rstdp-pulse / homeostasis   │
                              └──────────────┬───────────────┘
                                             │ winner_cluster, rates,
                                             │ synapses_changed, phase
                                             ▼
                              ┌──────────────────────────────┐
                              │ User-defined LLM endpoint    │
                              │  (CORS / auth / schema —     │
                              │   사용자 환경 책임)         │
                              └──────────────────────────────┘
```

### Frontend

- **Next.js 15** (App Router, static export, basePath `/handface`)
- **React 19** + TypeScript + Tailwind 3
- **drawflow** — Region / Neuron view 의 노드 그래프 (legacy, optional view)
- **MediaPipe Tasks Vision** — Hand Landmarker (CDN ESM 런타임)
- **PipelineCanvas** ([src/components/snn/PipelineCanvas.tsx](src/components/snn/PipelineCanvas.tsx)) — Pipeline view 의 5-node UI (default view)

### Backend

- **neuronface** ([whatpull/neuronface](https://github.com/whatpull/neuronface)) — FastAPI + N3 SNN
- 통신: REST + 클라이언트 측 이벤트 버스 (`neuron-firing`, `synapses_changed`, `training-phase`, `hand-feature`)
- **회로 size (정직 박음)**: handface client 는 `v1_l4e_count=50` 으로 deploy 하므로 실제 회로는 **322 neurons** (= 16 input + 50 V1_L4_E + 32 V1_L4_I + 64 V1_L23_E + 64 V2_L4_E + 32 V2_L23_E + 32 V2_L5_E + 32 OUT). neuronface backend 의 `feature16` preset default (`v1_l4e_count=200`) 로 직접 호출하면 **472 neurons**. neuronface README 의 "472 neurons" 표기는 backend default 기준이며, handface 가 띄우는 회로와 다릅니다.
- 핵심 라우트:
  - `POST /networks/{id}/inject_feature16` — 16-dim 자극 + cascade fire
  - `POST /networks/{id}/cluster_train_supervised` — cluster prefix `out_{c}_` 8 OUT 모두 supervisor batch 학습 (N3 핵심)
  - `POST /networks/{id}/cluster_lock` — TRAINED 후 cluster 8 OUT incoming 시냅스 freeze
  - `POST /networks/{id}/rstdp-pulse` — R-STDP 2-step reward-modulated
  - `POST /networks/{id}/astrocytes/homeostasis_step` — per-neuron `V_th` regulation (silence escape)

---

## 4. LLM 연동 — state payload schema

LLM 노드가 사용자 endpoint 로 POST 하는 JSON 형식 ([src/lib/snn/state-payload.ts](src/lib/snn/state-payload.ts)):

```json
{
  "phase": "inference",
  "winner": "cluster_2",
  "winnerLabel": "Fist",
  "confidence": 0.78,
  "margin": 0.42,
  "clusterRates": [12.3, 8.1, 145.2, 6.5],
  "clusterCounts": [30, 30, 30, 30],
  "history": [
    { "winner": "cluster_0", "label": "Pointing", "confidence": 0.71, "ts": 1746400000000 },
    { "winner": "cluster_2", "label": "Fist",     "confidence": 0.78, "ts": 1746400003200 }
  ],
  "gestureName": "Closed_Fist",
  "gestureScore": 0.91,
  "timestamp": 1746400003500
}
```

| 필드 | 설명 |
|---|---|
| `phase` | `untrained` / `learning` / `partial` / `trained` / `inference` |
| `winner` | `cluster_<0..3>` 또는 `null` (WTA tie / 미학습) |
| `winnerLabel` | OUT 노드에서 사용자가 rename 한 라벨 (없으면 default cluster 라벨) |
| `confidence` | `winnerRate / totalRate` (0..1) |
| `margin` | `(max - second) / max` (0..1, ≥ 0.10 일 때만 winner 인정) |
| `clusterRates` | cluster 별 평균 OUT firing rate (Hz) |
| `clusterCounts` | cluster 별 학습 frame 수 (target 30) |
| `history` | 최근 32 개 winner 전이 timeline |
| `gestureName` | MediaPipe 가 인식한 gesture 이름 (teacher 신호) |
| `gestureScore` | MediaPipe gesture 신뢰도 (0..1) |
| `timestamp` | 송신 시각 (ms) |

송신은 단순 `fetch(POST, JSON)` ([src/lib/snn/llm-client.ts](src/lib/snn/llm-client.ts)). API key 가 있으면 `Authorization: Bearer <key>` 헤더로 붙습니다. 응답은 raw text 4096 byte 까지 LLM 노드에 그대로 표시됩니다 — schema parsing 은 하지 않습니다.

`GESTURE_LABEL_TO_CLUSTER`: `Pointing_Up→0`, `Open_Palm→1`, `Closed_Fist→2`, `Victory→3`.

---

## 5. Development

```bash
npm install
npm run dev        # http://localhost:3000 (Turbopack)
npm run verify     # tsc --noEmit && eslint
npm run build      # production export → out/
npm run deploy     # gh-pages -d out
```

배포: `main` push 시 GitHub Actions 가 `output: 'export'`, basePath `/handface` 로 자동 배포.

핵심 파일:

```
src/
  components/
    Editor.tsx                              # 최상위 (toolbar/sidebar/canvas/panels)
    snn/
      PipelineCanvas.tsx                    # ★ 5-node pipeline UI (default view)
      Canvas.tsx                            # drawflow Region / Neuron view (legacy)
      Toolbar.tsx                           # Pipeline / Region / Neuron 토글
      MobileBottomBar.tsx
      Sidebar.tsx + SettingsPanel.tsx
      ModeIndicator.tsx                     # 5-phase 상태 표시
      OutNodeOverlay.tsx                    # OUT 노드 ✎ rename + count
      CameraQuickControls.tsx + HandTrackerHost.tsx
  lib/
    backend/
      client.ts                             # NeuronFaceClient (REST)
      events.ts                             # 이벤트 버스
      settings.ts                           # endpoint/apiKey localStorage
    snn/
      state-payload.ts                      # ★ LLM payload builder
      llm-client.ts                         # ★ endpoint POST wrapper
      use-hand-control.ts                   # autoCapture / autoLive driver
      out-exemplars.ts                      # OUT 라벨 영구화
      drawflow-helpers.ts + layout.ts + positions.ts
      auto-snapshot.ts + train-counts.ts
      community-baseline.ts
  mediapipe/
    hand-tracker.ts + feature-encoder.ts + landmark.ts  # 21 landmarks → 16-dim
```

이전 vanilla JS + Vite 구현은 `main-rollback-snn-viz` 브랜치에 보존되어 있습니다.

---

## 6. License

MIT.

---

## 정직 한계 박음 (반복)

- 4-way 제스처 분류조차 SNN 으로는 학술적으로 nontrivial — 본 프로젝트는 **검증된 분류기가 아니라** 학습/추론 흐름의 *시각화 + LLM agent 연동 실험* 입니다.
- 5-node Pipeline view 는 진행 중인 redesign 이며, 일부 fragment(Region/Neuron view 의 legacy 패널, drawflow 좌표 캐시, deprecated client wrapper 등)가 코드에 잔존합니다.
- LLM endpoint 의 CORS / auth / schema / rate limit / 비용은 전적으로 사용자 환경 책임입니다. 본 프로젝트는 단순 fetch wrapper 만 제공.
- 학습 weight 는 `localStorage` 에 저장되지만, 브라우저 storage 정책 / 시크릿 모드 / 사이트 데이터 삭제 등으로 휘발될 수 있습니다.
- HF Spaces 백엔드는 cold-start 지연 / rate limit 가능 — 본격 사용 시 자체 호스팅 권장.
