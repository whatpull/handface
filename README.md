# HandFace — Neural Mesh Editor

Bio-SNN 시각화 + 노드 에디터 프레임워크. Next.js 15 + TypeScript + Tailwind 기반의 GitHub Pages 정적 배포 SPA.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # → out/ (정적 export)
npm run lint
```

## 배포

`main` 브랜치 push 시 `.github/workflows/deploy.yml` 가 자동으로 GitHub Pages 에 배포합니다.

수동 배포:

```bash
npm run deploy   # gh-pages 브랜치로 푸시
```

## 스택

- Next.js 15 (App Router, `output: 'export'`)
- React 19
- TypeScript (strict)
- Tailwind CSS v3
- drawflow (노드 캔버스)

## 구조

```
src/
  app/              # Next.js App Router (page.tsx, layout.tsx, globals.css)
  components/
    Editor.tsx      # 최상위 오케스트레이터
    snn/
      Canvas.tsx    # drawflow 통합 (7-layer SNN 시각화)
      Toolbar.tsx   # 상단 툴바 (Region/Neuron, Train/Eval/Reset, Save/Load)
      Sidebar.tsx   # 좌측 사이드바 (Camera/Edit/Settings)
      SettingsPanel.tsx
    snn-canvas.css  # drawflow 노드 카드 + 시냅스 스타일
  lib/snn/
    data.ts         # NEURON_NODES + SOURCE_EDGES + PRESET_SYNAPSES
    positions.ts    # localStorage 위치 영구화
  types/
    drawflow.d.ts   # drawflow UMD 타입 선언
```

## 롤백 브랜치

이전 (vanilla JS + Vite) 구현은 `main-rollback-snn-viz` 브랜치에 보존됩니다.
