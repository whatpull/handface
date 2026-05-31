# Honest Limitations & Disclaimer

**최종 업데이트**: 2026-05-31 (Phase 2A.1 H3 mitigation 종결)

본 문서는 handface 저장소의 **정직한 한계** 와 학술적 framing 을 명시합니다.

## 1. 본 저장소의 실제 상태

### 1.1 검증된 production 작동 부분

| 영역 | 상태 |
|------|------|
| 4×4 grid 패턴 인식 (N=3) | ✅ 100% 정확도, browser-only 작동 |
| 4×4 grid 패턴 인식 (N=5) | ✅ 100% 재현 / 100% 노이즈 / ~20% 부분단서 |
| 5×5 substrate (N=4 Phase 2A.1) | ✅ 90% noisy accuracy (commit 8da3cbe 후 2nd+ spawn 90 trials) |
| 5×5 substrate (N=6 scaling) | ✅ 90% noisy accuracy |
| 5×5 substrate (N=5) | ⚠️ 88% (Guide 임계 -2%p, c3 영역 40%) |
| 5×5 substrate (N=8) | ⚠️ 70% (다중 under-allocated cluster — c3/c6/c7) |
| 5×5 substrate (N=8, lucky seed 86) | ✅ 100% recall, 88% noise (P218) |
| Mega 9-substrate Ensemble | ✅ 100% recall / 88% noise / 100% partial / 96% WTA margin (commit 1102b3a) |

### 1.2 실험 단계 / 미해결 부분

| 영역 | 한계 |
|------|------|
| 6×6 substrate "Bottom row" 패턴 | ⚠️ 4 시드 모두 학습 실패 (-1) — 원인 미파악 |
| Hand SNN (MediaPipe Hand) | ⚠️ 1-shot 25% accuracy, multi-shot oscillating, ART/EWC 통합 미완성 |
| 학습 안정화 N>5 (4×4) | ⚠️ catastrophic forgetting 영향 (5×5 영역 N=4 영역 commit 8da3cbe 영역 완화) |
| 5×5 substrate 영역 N>=7 영역 | ⚠️ 다중 under-allocated cluster 영역 fix 영역 부족 (Phase 2A.2 6×6 substrate 72-dim 후보) |
| H2 (sub-pool exhaustion) — 5×5 N=4 | ↓ Guide expected 50-70% 영역 측정 42% (under-utilization, no harm) |
| H3 catastrophic forgetting — 5×5 N=4 | ✅ commit 8da3cbe 영역 75% → 90% (2nd+ spawn 90 trials) |
| H4 sparse code overlap — 5×5 N=4 | ✅ Jaccard 0.55-0.83 → 0.23 (Phase 2A.1 substrate upgrade 효과) |

### 1.3 Pure functions 만 (실제 SNN 통합 안 됨)

다음 26개 "phase" modules 는 **algorithm building blocks 의 TypeScript pure functions + 단위 테스트** 만 작성된 상태입니다. **실제 작동하는 SNN 시스템과 통합되지 않았습니다**.

영원 진화 (D, C, E, B, A — 5):
- D Weighted Ensemble (AdaBoost-style)
- C Meta-Plasticity (BCM rule)
- E Continual Learning (EWC — Kirkpatrick 2017)
- B Self-Supervised Features (Diehl & Cook 2015)
- A Substrate Evolution (NEAT-style)

인간 뇌 cognitive functions (F~Z — 21):
- F Multi-Modality, G "Consciousness" (GWT), H Embodiment, I Social Cognition
- J "Meta-Cognition", K Emotion/Affect, L Language/Symbolic, M Creativity
- N Memory Systems, O Reasoning/Logic, P Planning
- Q Imitation Learning, R Counterfactual, S Cultural Cognition
- T Aesthetics, U Humor, V Morality, W "Self-Recognition"
- X "Free Will", Y Spirituality, Z Mortality

## 2. Cognitive Module 명명에 대한 정직한 framing

학술 인지과학 / 철학 용어를 module 이름으로 사용했지만, 실제 implementation 은 해당 이론의 **simplified algorithmic approximations** 입니다. **실제 의식·자유의지·도덕적 판단·종교적 체험을 가진 AI 가 아닙니다.**

| Module | 학술 reference | Implementation 실체 |
|--------|---------------|---------------------|
| G Consciousness | Baars 1988 (GWT), Tononi 2008 (IIT) | winner-take-all + integrated information proxy (`(active fraction × avg activity)`) |
| J Meta-Cognition | Flavell 1979, Fleming & Lau 2014 | Brier score + Type 2 discrimination metric |
| W Self-Recognition | Gallup 1970 (mirror test) | Cosine similarity + boolean flag composition |
| X Free Will | Libet 1985, Wegner 2002 | Drift-diffusion accumulator + condition satisfaction |
| Y Spirituality | James 1902, Keltner & Haidt 2003 (awe) | `vastness × accommodation` arithmetic |
| Z Mortality | Becker 1973, Heidegger 1927 | Boolean field composition |
| V Morality | Kohlberg 1969, Haidt 2001 | Weighted utility vs deontology threshold |

→ **각 module 은 해당 분야의 학술 이론을 numerical / boolean 으로 단순화한 algorithm 입니다. 실제 cognitive ability 아님.**

## 3. 학술 인용 + 사용된 references (30+)

### Bio-SNN core
- Carpenter & Grossberg 1987 — ART
- Bi & Poo 1998 — STDP
- Diehl & Cook 2015 — STDP MNIST 95%
- Hopfield 1982 — Associative memory

### Continual learning + Meta-learning
- Kirkpatrick et al. 2017 — EWC
- Zenke et al. 2017 — Synaptic Intelligence
- Bienenstock, Cooper, Munro 1982 — BCM rule
- Jaderberg et al. 2017 — Population-Based Training
- Freund & Schapire 1995 — AdaBoost
- Stanley & Miikkulainen 2002 — NEAT
- Lehman & Stanley 2008 — Novelty Search

### Cognitive science / philosophy (Phase F~Z reference)
- Baars 1988, Dehaene & Naccache 2001 (Consciousness)
- Tononi 2008 (IIT), Cowan 2001 (working memory)
- Flavell 1979, Fleming & Lau 2014 (Metacognition)
- Russell 1980, Damasio 1994 (Affect)
- Boden 2004 (Creativity)
- Premack & Woodruff 1978, Tomasello 1999 (ToM, culture)
- Kohlberg 1969, Haidt 2001 (Morality)
- Gallup 1970, Metzinger 2003 (Self)
- Libet 1985, Wegner 2002 (Free Will)
- James 1902 (Religious experience)
- Becker 1973, Heidegger 1927 (Mortality)
- Pearl 2009 (Causal hierarchy)
- Tulving 1985 (Memory systems)
- Sacerdoti 1975 (HTN planning)

## 4. 잘못된 marketing 으로부터 보호

본 저장소는 다음 용도로 **사용하지 마십시오**:

- ❌ "AI 의식 / 자유의지" 라는 marketing
- ❌ 의료 진단 / 법률 판단 / 금융 결정 도구
- ❌ Production-grade hand gesture authentication
- ❌ LLM 대체재 또는 자연어 처리 시스템
- ❌ Safety-critical 시스템

## 5. 권장 사용

- ✅ Bio-SNN 학술 연구 building blocks
- ✅ STDP / ART / WTA 알고리즘 데모
- ✅ 4×4 grid 패턴 인식 교육 자료
- ✅ MediaPipe Hand + SNN 통합 prototype
- ✅ 인지과학 algorithm 의 TypeScript reference implementation

## 6. 책임의 한계

본 저장소는 **Apache License 2.0** 으로 배포됩니다. 저작권자 / 기여자는 본 소프트웨어 사용으로 인한 어떠한 손해도 책임지지 않습니다 (Apache 2.0 Section 8 / 9 참조).

## 7. 자동 commit 영역 정직성

본 저장소의 일부 commit message 는 LLM-assisted 자동 작성되었으며, 이전에 일부 commit 영역 과장 표현 (예: "완벽한 인공지능 완성") 이 사용된 사실이 있습니다.

→ **본 문서로 정정합니다**. 실제로는 "26 algorithm building blocks (pure functions + unit tests)" 이며, 완성된 cognitive AI 시스템이 아닙니다.

### 7.1 해당 commit 영역 정정 reference

git history 영역 보존 (force push 영역 collaborator 충돌 + downstream SHA cross-reference 영역 breakage 회피) 한 채, 본 문서 영역 정정 reference 영역 통합:

- **"완벽한 인공지능 N 단계" (N=5..21) 영역 표기** (예: `0f8085d Phase Z — Death Awareness / Mortality (완벽한 인공지능 21 단계) + 14 unit tests`)
  → **읽을 때 "cognitive AI algorithm block N" 로 해석**. 실제로는 인지과학 phenomenon 영역 pure function reference implementation + unit tests 영역 학습 알고리즘 building block.

- **"★★★★★★ 영원 진화 + 완벽한 인공지능 26 phase 완성"** 류 표현
  → **읽을 때 "iterative refinement + 26 algorithm building blocks (pure functions + unit tests)" 로 해석**. 완성된 AI 시스템 / sentience / generality / self-awareness claim 아님 — 학술 paper 영역 simplified algorithmic approximation 영역 TypeScript reference implementation.

- **"완벽한 인공지능 완성 선언"** 류 표현
  → **읽을 때 "cognitive AI algorithm blocks 완료" 로 해석**. "완성" 영역 algorithm building block 영역 unit test 영역 통과 (pure function level) — production-deployable cognitive AI 영역 아님.

- **"★" symbol** (다중 별표 prefix)
  → **decorative emphasis 영역 — quality/completeness claim 아님**. star count 영역 implementation milestone 영역 아니라 LLM-assisted commit message 영역 formatting artifact.

### 7.2 향후 commit message guideline

- "완벽한" / "완성" / "완전한" / "perfect" / "complete" 영역 absolute claim 영역 영역 영역 영역
- "★" symbol prefix 영역 영역 영역 영역
- 학술 정합 영역 reference implementation / building block / approximation 영역 정확 표기 영역
- Section 1-6 영역 한계 (4 gestures, mock anatomical landmarks, simulated noise only, MediaPipe runtime capture 미검증 등) 영역 commit message 영역 reflect 영역

## 문의

학술 정합성 / framing 에 관한 의견: GitHub Issues — https://github.com/whatpull/handface/issues
