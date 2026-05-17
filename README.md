# HandFace

[![MIT License](https://img.shields.io/badge/License-MIT-violet)](LICENSE)
[![npm](https://img.shields.io/npm/v/@whatpull/patternkey-sdk)](https://www.npmjs.com/package/@whatpull/patternkey-sdk)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

> 브라우저에서 동작하는 Bio-SNN 기반 패턴 인식 엔진.
> **패턴이 서버에 전송되지 않습니다** — 모든 학습과 추론이 브라우저 내부에서 실행됩니다.

라이브: <https://handface.whatpull.com>

---

## 무엇인가요?

4×4 그리드에 패턴을 그리면 **Spiking Neural Network(SNN)** 이 브라우저에서 직접 학습하고 추론합니다.

서버에 패턴 데이터를 전송하지 않는 **on-device 인증 위젯** 으로도 활용할 수 있습니다 → [PatternKey SDK](https://www.npmjs.com/package/@whatpull/patternkey-sdk)

```
INPUT → LEARN → INFER → OUT
4×4    자동학습  WTA     결과
그리드  (30회)   추론    Validation
```

---

## 빠른 시작

```bash
# 접속
open https://handface.whatpull.com

# 로컬 개발
npm install && npm run dev   # http://localhost:3000
```

**사용 방법:**
1. 4×4 그리드에서 셀을 클릭해 패턴을 그립니다
2. **추론** 버튼을 누릅니다 → SNN이 자동으로 30회 학습
3. 다른 패턴을 추가하거나 (최대 5개), Validation으로 정확도를 확인합니다

---

## 아키텍처

```
Browser
  ├── GridInput (4×4 orientation)
  │     └── 32-dim feature 추출 (raw 16 + 파생 16)
  │
  ├── Live SNN Worker (Web Worker)
  │     ├── LIF 뉴런 시뮬레이션
  │     ├── STDP / Triplet STDP 학습
  │     ├── WTA (Winner-Take-All) 추론
  │     └── autoTrainOrSpawn (최대 5 패턴)
  │
  └── PipelineCanvas UI
        └── INPUT / LEARN / INFER / OUT 노드

외부 의존성: 없음 (완전 오프라인 동작)
```

### B+4 Cortical 회로

```
INPUT (32-dim)
  → V1_L4_E_cX  (cluster별 excitatory, orientation tuning)
  → V1_L4_I_cX  (cluster별 inhibitory, cross-cluster 간섭 차단) ← B+4
  → V1_L23_E → V2_L4_E → V2_L23_E → V2_L5_E
  → OUT cluster_X  (population coding, WTA readout)
```

**B+4 핵심**: `v1_L4_I` 를 cluster 별로 분리 → cluster 간 간섭 제거 → 패턴 분류 안정성 향상

### 32-dim Feature Engineering

```
raw 16-dim (그리드 셀) + 파생 16-dim
  └── row sums (4), col sums (4), quadrant (4), diagonal (4)
= 32-dim → 수직/수평/대각 패턴 더 명확한 분리
```

---

## PatternKey 연동 (embed 모드)

외부 사이트에 **패턴 인증 위젯** 으로 임베드할 수 있습니다.

```html
<!-- 사용자 인증 위젯 -->
<iframe src="https://handface.whatpull.com/?embed=true&mode=auth" />

<!-- 개발자 파이프라인 뷰 -->
<iframe src="https://handface.whatpull.com/?embed=true" />
```

```js
import PatternKey from '@whatpull/patternkey-sdk';

const pk = new PatternKey();
pk.mount('#widget')
  .on('PK_VERIFIED', ({ confidence, similarity }) => {
    // 인증 완료 처리
  });
```

**postMessage API:**
- `PK_READY` — 위젯 로드 완료
- `PK_REGISTERED` — 패턴 등록 완료 (첫 방문)
- `PK_VERIFIED` — 인증 성공 `{ confidence, similarity }`
- `PK_FAILED` — 패턴 불일치 `{ similarity }`

---

## Validation 결과

3 패턴 기준 (2026-05 측정):

| 항목 | 결과 |
|---|---|
| 재현율 (Reproduction) | **100%** |
| 노이즈 내성 (±20% noise) | **100%** |
| 부분단서 (75% masking) | **100%** |
| Confusion Matrix 대각선 | 완벽 |

> 5 패턴에서는 재현율/노이즈 100%, 부분단서 약 20% (패턴 증가시 자연 저하).

---

## 개발

```bash
npm install
npm run dev        # Turbopack dev server (port 3000)
npm run verify     # tsc --noEmit && eslint && vitest run
npm run build      # production static export → out/
```

**주요 파일:**

```
src/
  components/
    AuthWidget.tsx              # 인증 전용 위젯 (?embed=true&mode=auth)
    Editor.tsx                  # 최상위 레이아웃
    snn/
      PipelineCanvas.tsx        # 4-node pipeline UI
      pipeline/
        GridInput.tsx           # 4×4 그리드 입력
        NodeLearn/Infer/Out.tsx # 각 노드 UI
  lib/
    snn/
      live-snn.ts               # in-browser SNN Web Worker 관리
      use-hand-control.ts       # 학습/추론 흐름 제어
      worker-core.ts            # SNN 핵심 연산 (LIF, STDP, WTA)
    snn-runtime/
      builders/n13-orientation.ts  # B+4 cortical 회로 빌더
    embed-mode.ts               # embed 모드 + postMessage API
    backend/
      client.ts                 # neuronface REST client (research 모드)
```

**배포:** `main` push → GitHub Actions → GitHub Pages (`handface.whatpull.com`)

---

## 기여하기

버그 리포트, 기능 제안, 연구 아이디어, PR 모두 환영합니다.

- [CONTRIBUTING.md](CONTRIBUTING.md) — 기여 방법 + 개발 환경 + 연구 방향
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — 행동 강령
- Issues: [Bug](.github/ISSUE_TEMPLATE/bug_report.md) / [Feature](.github/ISSUE_TEMPLATE/feature_request.md) / [Research](.github/ISSUE_TEMPLATE/research_idea.md)
- Labels: `good first issue` / `research` / `help wanted`

---

## 관련 프로젝트

| 프로젝트 | 설명 |
|---|---|
| [neuronface](https://github.com/whatpull/neuronface) | FastAPI + Pure Python SNN 백엔드 (research 모드) |
| [@whatpull/patternkey-sdk](https://www.npmjs.com/package/@whatpull/patternkey-sdk) | PatternKey 연동 SDK |

---

## 한계 및 정직 명시

- 본 프로젝트는 **검증된 분류기가 아니라** SNN 학습/추론 흐름의 시각화 + 연구용 demo입니다
- Validation 100% 수치는 특정 패턴/환경 기준이며, 패턴 복잡도/수에 따라 달라집니다
- 학습 weight는 `IndexedDB`에 저장되며, 브라우저 데이터 삭제 시 휘발됩니다
- 최대 5 패턴 hard limit은 회로 안정성 목적입니다

---

## License

MIT © 2026 [whatpull](https://github.com/whatpull)
