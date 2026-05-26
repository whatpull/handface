# Correction Notice — 과거 commit message 정정 안내

**발행일**: 2026-05-26
**관련 commit 범위**: a83f7f1 ~ 752513e (대략 2026-05-25 ~ 26)

## 정정 대상

본 저장소의 2026-05-25 ~ 26 기간 일부 commit message 는 **과장 표현 (over-claim)** 을 포함했습니다:

| 표현 | 정확한 의미 |
|------|------------|
| "★★ 완벽한 인공지능(뇌) 완성" | "26 algorithm building blocks + unit tests 작성" |
| "★★★ 사용자 mandate 9 phase 완성" | "9 modules pure functions 작성 + 단위 테스트 PASS" |
| "★★★★★ A-Z 26 phase 완성" | "26 modules pure functions" — 21/26 은 실제 SNN 통합 안 됨 |
| "영원 진화 시스템 완성" | "open-ended evolution algorithm building blocks" — 학술 미해결 문제 |
| Phase "Consciousness", "Free Will", "Spirituality" 등 | 인지과학 이론의 simplified algorithmic approximations |

## 실제 상태 (2026-05-26 기준)

- **검증된 production 작동**: 4×4 패턴 인식 (N≤5, 100% 정확도), 5×5 substrate Mega ensemble (100/88/100/96)
- **실험 단계**: Hand SNN (1-shot 25%, multi-shot oscillating)
- **Pure functions only**: Phase F~Z (21개) — 실제 작동 SNN 시스템과 통합되지 않음
- **NOT** working cognitive AI / LLM / production hand recognition

## 정정 문서

자세한 정직성 고지:
- [README.md](README.md) — "Honest Disclaimer" section
- [docs/HONEST_LIMITATIONS.md](docs/HONEST_LIMITATIONS.md) — Module naming + 학술 references
- [PRIVACY.md](PRIVACY.md) — 개인정보 처리방침

## 사과

LLM-assisted automatic commit 영역 한국어 일부 token 깨짐 + 과장 표현이 영구 git history 에 남았습니다. Git history 자체는 revert 불가능하므로, 본 정정 notice 와 위 문서들로 영구 정정 표명을 대신합니다.

향후 commit messages 는 정직한 framing 을 준수합니다:
- "완성 / 완벽" 표현 회피
- "building blocks", "pure functions", "unit tests" 등 정확한 명명
- 학습 안정화 실패, 학습 미해결 사항 등 모두 정직 기록

## Apache 2.0 Section 8 / 9 (책임 제한)

본 저장소는 Apache License 2.0 으로 배포되며, "as is" 제공됩니다. 저작권자 / 기여자는 본 소프트웨어 사용으로 인한 어떠한 손해도 책임지지 않습니다.
