// vitest 설정 — jsdom 환경 + @/ alias + setup file.
//
// 정직 한계 박음:
//  - jsdom 영역 MediaPipe (WASM / GestureRecognizer) 영역 mock 영역 — 실제 카메라/모델
//    영역 테스트 영역. unit test 영역 영역 lib/* (pure logic) 영역 만 cover.
//  - @testing-library/react 영역 React 19 / jest-dom matcher 영역 jsdom 영역 동작.
//  - vitest 4.x — workspaces / pool 영역 default. TypeScript path mapping 영역
//    tsconfig paths plugin 영역 미사용 — 직접 alias 박음.

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    css: false,
  },
});
