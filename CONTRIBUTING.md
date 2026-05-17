# Contributing to HandFace

## 환영합니다!
HandFace는 브라우저에서 동작하는 Bio-SNN 패턴 인식 엔진입니다.
패턴 인식, 신경망 구조, UX/UI, 문서화 등 다양한 방면의 기여를 환영합니다.

## 기여 방법
1. 이슈 확인 (`good first issue` 레이블부터 시작)
2. Fork → 브랜치 생성 → 변경 → PR
3. `npm run verify` 통과 확인 (tsc + eslint)

## 개발 환경 세팅
```bash
npm install && npm run dev  # localhost:3000
```

백엔드(neuronface)가 필요한 경우: [whatpull/neuronface](https://github.com/whatpull/neuronface) 참조.
기본 endpoint `https://whatpull-neuronface.hf.space` 를 Settings 에서 지정할 수 있습니다.

## 연구 방향 (함께 탐구하고 싶은 것들)
- 더 많은 패턴 지원 (현재 최대 5개 → 확장)
- Triplet STDP 실제 학습 효과 측정
- WebGPU/WASM 가속 (현재 TypedArray SoA, 다음 단계)
- 다양한 입력 방식 (터치, 마우스 제스처 등)
- 다국어 UI

## 커밋 컨벤션
```
feat / fix / refactor / docs / test / perf
예: feat(snn): add triplet STDP mode
```

## PR 가이드라인
- 하나의 PR = 하나의 목적
- `npm run verify` (`tsc --noEmit` + `eslint`) 통과 필수
- SNN 동작 변경 시 README 의 "정직 한계 명시" 섹션도 함께 업데이트
- 스크린샷 / 동작 영상 첨부 권장 (UI 변경 시)

## 질문 / 토론
GitHub Discussions 또는 이슈로 자유롭게 문의하세요.
