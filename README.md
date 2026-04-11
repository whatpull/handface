# handface

> MediaPipe 기반 핸드 제스처 → 마우스 이벤트 제어 웹 라이브러리

[![npm version](https://img.shields.io/npm/v/@whatpull/handface?color=cb3837&logo=npm)](https://www.npmjs.com/package/@whatpull/handface)
[![npm downloads](https://img.shields.io/npm/dm/@whatpull/handface?color=cb3837)](https://www.npmjs.com/package/@whatpull/handface)
[![license](https://img.shields.io/github/license/whatpull/handface)](https://github.com/whatpull/handface/blob/main/LICENSE)
[![demo](https://img.shields.io/badge/demo-live-6e40c9?logo=github)](https://whatpull.github.io/handface/)

손동작으로 마우스 클릭, 커서 이동, 스크롤을 제어할 수 있는 **프레임워크 독립(framework agnostic)** npm 라이브러리입니다.  
React, Vue, Svelte, 바닐라 JS 어디서든 동일하게 동작합니다.

**[라이브 데모 →](https://whatpull.github.io/handface/)**

---

## 설치

```bash
npm install @whatpull/handface @mediapipe/tasks-vision
```

> `@mediapipe/tasks-vision`은 peer dependency입니다.

---

## 빠른 시작

```typescript
import { HandControl } from '@whatpull/handface';

const control = new HandControl();

await control.start(); // 카메라 권한 요청 + MediaPipe 초기화

control.on('move', (e) => {
  cursor.style.left = `${e.screenX}px`;
  cursor.style.top  = `${e.screenY}px`;
});

control.on('click', (e) => {
  console.log('클릭!', e.screenX, e.screenY);
});

control.on('scroll', (e) => {
  window.scrollBy(0, e.deltaY);
});

// 종료
control.stop();
```

---

## API

### `new HandControl(options?)`

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `video` | `HTMLVideoElement` | 자동 생성 | 사용할 video 엘리먼트 |
| `threshold` | `number` | `0.05` | 핀치 감지 임계값 (0~1) |
| `flipHorizontal` | `boolean` | `true` | 좌우 반전 (거울 효과) |
| `smoothing` | `number` | `0.6` | 위치 스무딩 (0=즉각, 1=고정) |
| `wasmPath` | `string` | CDN | MediaPipe wasm 파일 경로 |

### `control.start()` → `Promise<void>`

카메라를 열고 MediaPipe 모델을 로드한 뒤 감지를 시작합니다.

### `control.stop()`

감지를 중지하고 카메라 스트림과 리소스를 해제합니다.

### `control.on(event, listener)` / `control.off(event, listener)`

이벤트를 구독/해제합니다.

---

## 이벤트

| 이벤트 | 제스처 | 페이로드 |
|--------|--------|---------|
| `move` | 검지 손가락 이동 | `{ x, y, screenX, screenY }` |
| `click` | 엄지+검지 핀치 | `{ x, y, screenX, screenY }` |
| `scroll` | 검지+중지 수직 이동 | `{ deltaY }` |
| `rightclick` | (예정) | - |
| `drag` / `dragstart` / `dragend` | (예정) | - |

### 제스처 가이드

| 제스처 | 동작 |
|--------|------|
| ☝️ 검지만 펴기 | 커서 이동 (`move`) |
| 🤏 엄지+검지 붙이기 | 클릭 (`click`) |
| ✌️ 검지+중지 위아래 | 스크롤 (`scroll`) |

---

## 프레임워크 예시

### React

```tsx
import { useEffect, useRef } from 'react';
import { HandControl } from '@whatpull/handface';

export function useHandControl() {
  const controlRef = useRef<HandControl | null>(null);

  useEffect(() => {
    const control = new HandControl();
    controlRef.current = control;
    control.start();
    control.on('click', (e) => console.log('click', e));
    return () => control.stop();
  }, []);

  return controlRef;
}
```

### Vue 3

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { HandControl } from '@whatpull/handface';

const control = new HandControl();

onMounted(async () => {
  await control.start();
  control.on('move', (e) => { /* ... */ });
});

onUnmounted(() => control.stop());
</script>
```

---

## 개발

```bash
npm run dev        # Vite dev 서버 (데모 페이지)
npm run build      # 라이브러리 빌드 → dist/
npm run typecheck  # TypeScript 타입 체크
```

---

## 개발 로그

### v0.1.0 — 2026-04-11

**초기 구현**

- MediaPipe Tasks Vision API 기반 손 감지 통합 (`@mediapipe/tasks-vision`)
- `HandControl` 클래스: event-based API (`on` / `off` / `emit`)
- 감지 이벤트: `move`, `click` (핀치), `scroll` (두 손가락)
- TypeScript + Vite library mode 셋업
- 위치 스무딩(lerp) 및 좌우 반전(거울 모드) 지원
- 프레임워크 독립 설계 (React, Vue, Svelte, 바닐라 JS 모두 지원)
- 데모 페이지 (`demo/index.html`)

---

## 라이선스

Apache 2.0
