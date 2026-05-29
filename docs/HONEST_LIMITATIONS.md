# Honest Limitations & Disclaimer

**최종 업데이트**: 2026-05-26

본 문서는 handface 저장소의 **정직한 한계** 와 학술적 framing 을 명시합니다.

## 1. 본 저장소의 실제 상태

### 1.1 검증된 production 작동 부분

| 영역 | 상태 |
|------|------|
| 4×4 grid 패턴 인식 (N=3) | ✅ 100% 정확도, browser-only 작동 |
| 4×4 grid 패턴 인식 (N=5) | ✅ 100% 재현 / 100% 노이즈 / ~20% 부분단서 |
| 5×5 substrate (N=8, lucky seed 86) | ✅ 100% recall, 88% noise (P218) |
| Mega 9-substrate Ensemble | ✅ 100% recall / 88% noise / 100% partial / 96% WTA margin (commit 1102b3a) |

### 1.2 실험 단계 / 미해결 부분

| 영역 | 한계 |
|------|------|
| 6×6 substrate "Bottom row" 패턴 | ⚠️ 4 시드 모두 학습 실패 (-1) — 원인 미파악 |
| Hand SNN (MediaPipe Hand) | ⚠️ 1-shot 25% accuracy, multi-shot oscillating, ART/EWC 통합 미완성 |
| 학습 안정화 | ⚠️ N>5 패턴에서 catastrophic forgetting 영향 |

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

## 문의

학술 정합성 / framing 에 관한 의견: GitHub Issues — https://github.com/whatpull/handface/issues
