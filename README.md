# HandFace

4×4 그리드 패턴 → SNN 학습 → 추론 시각화.

브라우저의 4×4 orientation 그리드로 그린 패턴을 Spiking Neural Network 가 직접 학습하고, 그 추론 결과를 5-노드 파이프라인 UI 로 시각화하는 실험용 프론트엔드.

> **정직 한계 명시 (먼저 읽으세요):** 본 프로젝트는 학술 검증된 분류기가 아닙니다. SNN 의 패턴 분류는 STDP / WTA / population coding 기반 비교적 단순한 셋업이며 — 학습 안정성, 일반화, 노이즈 강건성은 환경에 따라 다를 수 있습니다. 이 README 는 사용자 onboarding 만 다루며, 분류 정확도 / 동작 보장은 **0** 입니다.

라이브: <https://whatpull.github.io/handface/>

---

## 1. What is HandFace?

5 개 노드의 horizontal pipeline 으로 SNN 학습/추론 흐름을 그대로 노출합니다.

```
  ┌────────┐    ┌───────┐    ┌───────┐    ┌──────┐
  │ INPUT  │ →  │ LEARN │ →  │ INFER │ →  │ OUT  │
  │4×4 그리드│   │진행상황│    │추론   │    │결과값│
  └────────┘    └───────┘    └───────┘    └──────┘
   16-dim feat   autoTrain    WTA          rename
   orientation   max 5 pat.   margin       Validation
   grid          30 frame     winner       Panel
```

| 노드 | 역할 |
|---|---|
| **INPUT** | 4×4 orientation 그리드 (16 셀, 각 셀 4방향 toggle) → 16-dim feature 벡터. 셀 클릭으로 패턴 직접 입력. |
| **LEARN** | `autoTrainOrSpawn` 기반 자동 학습 — max 5 패턴, 패턴당 30 frame 캡처. 5-phase state machine (`untrained` → `learning` → `partial` / `trained` → `inference`), cluster 별 frame 카운트, Δw 합계, V1/V2 cortical region cascade strip. |
| **INFER** | OUT cluster mean rate, WTA winner + margin, 최근 winner timeline (sparkline), saturation 경고. |
| **OUT** | winner cluster 라벨 (✎ rename 가능), cluster 별 누적 카운트. **Validation Panel** 내장 (재현율 / 노이즈 / 부분단서 / Confusion Matrix). |

### SNN 학술 배경 (정직 명시)

- **STDP** — Spike-Timing Dependent Plasticity. pre/post 발화 timing 차이로 weight 갱신.
- **WTA** — Winner-Take-All. cluster 간 lateral inhibition 으로 single winner 선택. margin `(max-second)/max ≥ 0.10` 일 때만 winner 인정 (그 외 "WTA tie").
- **Population coding** — 한 cluster 당 여러 OUT 뉴런 (prefix `out_{c}_`) 이 평균 rate 로 응답.
- **Homeostatic scaling** — per-neuron `V_th` 조정으로 monopoly 회피 (silence escape).
- **autoTrainOrSpawn** — vigilance 기반 자동 cluster 할당/학습. 기존 cluster 에 가까우면 reinforce, 멀면 신규 cluster spawn. max 5 패턴 hard limit.

> **패턴 분류는 nontrivial 합니다.** 일반 ANN/CNN 대비 학습 효율, 정확도, 안정성 모두 떨어집니다. 본 프로젝트의 목표는 *분류 정확도 경쟁* 이 아니라 *SNN(STDP) 학습/추론 흐름의 시각화 + 연구용 demo* 입니다.

이 모든 메커니즘은 백엔드 [neuronface](https://github.com/whatpull/neuronface) (FastAPI + N3 SNN) 안에서 돌아가며, 본 프론트엔드는 시각화 + 사용자 제어만 담당합니다.

---

## 2. Quick Start (사용자 onboarding)

### 1) 페이지 접속

<https://whatpull.github.io/handface/>

(로컬 개발: `npm install && npm run dev` → <http://localhost:3000>)

### 2) Backend endpoint 설정

사이드바 ⚙ Settings → endpoint + (옵션) API key 입력 → **Save** → **Test**.

기본 endpoint 는 `https://whatpull-neuronface.hf.space` (HF Spaces 인스턴스). 직접 띄우려면 [neuronface 레포](https://github.com/whatpull/neuronface) 의 FastAPI 절차를 따르세요.

> Test 가 실패하면 endpoint URL / CORS / cold-start 지연을 확인하세요.

### 3) 그리드에 패턴 그리기

INPUT 노드의 4×4 그리드에서 셀을 클릭하여 orientation 을 선택합니다 (horizontal / vertical / diag-back / diag-fore). 셀을 반복 클릭하면 방향이 순환되며, 빈 셀(off) 포함 16-dim feature 가 즉시 구성됩니다.

### 4) 자동 학습 진행

그리드 패턴이 입력되면 **autoTrainOrSpawn** 이 자동으로 cluster 를 할당하고 30 frame 학습을 시작합니다.

- cluster 별 30 frame 캡처가 채워지면 ✓ 표시 + green bar.
- max **5 패턴** 까지 자동 spawn. 이후 추가 spawn 은 차단됩니다 (toast 알림).
- 패턴 삭제 후 재학습으로 슬롯을 비울 수 있습니다.
- 모든 등록 cluster 가 채워지면 phase = `trained`.

### 5) 추론

`trained` 이후 자동으로 phase = `inference` 로 전환. INFER 노드에 WTA winner 가 표시됩니다. OUT 노드에서 winner 라벨을 ✎ 클릭하여 사용자 지정 이름으로 rename 가능합니다.

### 6) Validation Panel

OUT 노드 하단의 **Validation** 버튼으로 학습된 패턴의 품질을 검사합니다.

| 항목 | 내용 |
|---|---|
| **재현율 (Reproduction)** | 원본 패턴 그대로 추론 — 자신의 cluster 를 winner 로 선택하는지 확인 |
| **노이즈 (Noise)** | 원본 패턴에 노이즈를 섞어 추론 — 노이즈 강건성 |
| **부분단서 (Partial Cue)** | 원본 패턴의 일부만 제시 — completion 능력 |
| **Confusion Matrix** | cluster 간 혼동 행렬 |

3 패턴 기준 재현율 / 노이즈 / 부분단서 모두 **100%** 달성 확인 (2026-05-13 기준 Live 측정).

---

## 3. Architecture

```
┌─────────────── Browser (Next.js static export) ───────────────┐
│                                                                │
│   4×4 Grid (orientation click) ── 16-dim feature              │
│                                          │                     │
│                                          PipelineCanvas        │
│                                   ┌──────────────────────┐    │
│                                   │ INPUT│LEARN│INFER│OUT│    │
│                                   └──────────┬───────────┘    │
│                                              │ HTTP POST       │
└──────────────────────────────────────────────┼────────────────┘
                                               ▼
                              ┌──────────────────────────────┐
                              │ neuronface (FastAPI + N3 SNN)│
                              │  autoTrainOrSpawn            │
                              │  inject_feature16            │
                              │  cluster_train_supervised    │
                              │  cluster_lock                │
                              │  homeostasis_step            │
                              └──────────────────────────────┘
                                          winner_cluster, rates,
                                          cluster_rates, phase
                                          → PipelineCanvas 렌더
```

### B+4 Cortical 아키텍처

```
INPUT (16-dim)
  → V1_L4_E  (excitatory, orientation tuning)
  → V1_L4_I  (inhibitory, per-cluster lateral suppression) ← B+4 추가
  → V1_L23_E → V2_L4_E → V2_L23_E → V2_L5_E
  → OUT cluster_X  (population coding, WTA readout)
```

- **B+4** — V1_L4 에 per-cluster inhibitory pool (`v1_L4_I`) 추가. cluster 간 경쟁을 피질 초기단에서 강화하여 학습 안정성 향상.
- `autoTrainOrSpawn` 응답에 `cluster_rates` / `winner_cluster` / `winner_margin` 직접 동봉 → 별도 state_payload round-trip 불필요 (phase / trained_clusters 등 5-phase 신호는 별도 state_payload 사용).
- **Vectorized 학습** — cluster_train_supervised 호출이 인터리브 방식으로 배치 처리.

### Frontend

- **Next.js 15** (App Router, static export, basePath `/handface`)
- **React 19** + TypeScript + Tailwind 3
- **PipelineCanvas** ([src/components/snn/PipelineCanvas.tsx](src/components/snn/PipelineCanvas.tsx)) — 5-node pipeline UI (단일 view)
- **GridInput** ([src/components/snn/pipeline/GridInput.tsx](src/components/snn/pipeline/GridInput.tsx)) — 4×4 orientation 그리드 입력 + autoTrainOrSpawn 연동
- **ValidationPanel** (NodeOut.tsx 내장) — 재현율 / 노이즈 / 부분단서 / Confusion Matrix

### Backend

- **neuronface** ([whatpull/neuronface](https://github.com/whatpull/neuronface)) — FastAPI + N3 SNN
- **HF Spaces**: `https://whatpull-neuronface.hf.space`
- 통신: REST + 클라이언트 측 이벤트 버스 (`neuron-firing`, `synapses_changed`, `training-phase`)
- 회로 size: `v1_l4e_count=50` 기준 배포. neuronface backend default (`v1_l4e_count=200`) 와 다름 — 직접 호출 시 주의.
- 핵심 라우트:
  - `POST /networks/{id}/autoTrainOrSpawn` — vigilance-aware cluster 할당 + interleave 학습 (B+4)
  - `POST /networks/{id}/inject_feature16` — 16-dim 자극 + cascade fire (추론)
  - `POST /networks/{id}/cluster_train_supervised` — cluster-specific supervisor batch 학습
  - `POST /networks/{id}/cluster_lock` — TRAINED 후 cluster incoming 시냅스 freeze
  - `POST /networks/{id}/astrocytes/homeostasis_step` — per-neuron `V_th` regulation

---

## 4. Development

```bash
npm install
npm run dev        # http://localhost:3000 (Turbopack)
npm run verify     # tsc --noEmit && eslint
npm run build      # production export → out/
```

배포: `main` push 시 GitHub Actions 가 `output: 'export'`, basePath `/handface` 로 자동 배포.

핵심 파일:

```
src/
  components/
    Editor.tsx                              # 최상위 (toolbar/sidebar/canvas/panels)
    snn/
      PipelineCanvas.tsx                    # ★ 5-node pipeline UI (단일 view)
      Toolbar.tsx
      MobileBottomBar.tsx
      Sidebar.tsx + SettingsPanel.tsx
      pipeline/
        GridInput.tsx                       # 4×4 orientation 그리드 + autoTrainOrSpawn
        NodeShell.tsx + Arrow.tsx           # Pipeline 카드 + 연결선
        NodeInput.tsx / NodeLearn.tsx       # INPUT / LEARN 노드
        NodeInfer.tsx / NodeOut.tsx         # INFER / OUT 노드 (ValidationPanel 포함)
  lib/
    backend/
      client.ts                             # NeuronFaceClient (REST, autoTrainOrSpawn)
      events.ts                             # 이벤트 버스
      settings.ts                           # endpoint/apiKey localStorage
    snn/
      live-snn.ts                           # Live 모드 in-browser N3 SNN runtime
      use-hand-control.ts                   # autoCapture / autoLive driver
      out-exemplars.ts                      # OUT 라벨 영구화
      auto-snapshot.ts                      # 학습 weight localStorage snapshot
      actions.ts + winner-derivation.ts     # backend action wrapper + WTA winner 도출
  lib/snn-runtime/
    builders/n13-orientation.ts             # B+4 cortical 회로 빌더
    worker-core.ts                          # in-browser SNN worker (Live 모드)
```

이전 vanilla JS + Vite 구현은 `main-rollback-snn-viz` 브랜치에 보존되어 있습니다.

---

## 5. License

MIT.

---

## 정직 한계 명시 (반복)

- 패턴 분류조차 SNN 으로는 학술적으로 nontrivial — 본 프로젝트는 **검증된 분류기가 아니라** 학습/추론 흐름의 *시각화 + 연구용 demo* 입니다.
- Validation 100% 수치는 특정 패턴/환경 기준 측정값이며, 패턴 복잡도 / cluster 수 / 노이즈 강도에 따라 달라집니다.
- 학습 weight 는 `localStorage` 에 저장되지만, 브라우저 storage 정책 / 시크릿 모드 / 사이트 데이터 삭제 등으로 휘발될 수 있습니다.
- HF Spaces 백엔드는 cold-start 지연 / rate limit 가능 — 본격 사용 시 자체 호스팅 권장.
- max 5 패턴 hard limit 은 회로 안정성(monopoly 방지) 목적이며, 추후 확장 시 homeostasis 파라미터 재조정 필요.
