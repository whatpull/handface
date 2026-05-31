// vitest 설정 — jsdom 환경 + @/ alias + setup file.
//
// 정직 한계 명시:
//  - jsdom 에서 MediaPipe (WASM / GestureRecognizer) 는 mock 처리 — 실제 카메라/
//    모델 테스트 불가. unit test 는 lib/* (pure logic) 만 cover.
//  - @testing-library/react 는 React 19 / jest-dom matcher 와 jsdom 에서 동작.
//  - vitest 4.x — workspaces / pool 은 default. TypeScript path mapping 은
//    tsconfig paths plugin 미사용 — 직접 alias 박음.
//
// R&D / production 분리 (2026-05-31):
//   - 본 config = production (deploy 블로킹) — unit + light integration
//   - R&D 25개 측정 sweep 은 vitest.config.rd.ts (nightly cron 전용)
//   - 분리 사유: 직전 사용자 catch — 매 push verify 1h 13m 영역 deploy 차단

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// R&D 측정 sweep 패턴 — vitest.config.rd.ts include 와 1:1 거울.
// 추가/수정 시 양쪽 동시 갱신 필요 (drift 방지).
export const RD_TEST_PATTERNS = [
  'tests/integration/**/*sweep*.test.{ts,tsx}',
  'tests/integration/**/*variance*.test.{ts,tsx}',
  'tests/integration/**/*measurement*.test.{ts,tsx}',
  'tests/integration/**/*analysis*.test.{ts,tsx}',
  'tests/integration/**/*outside-log*.test.{ts,tsx}',
  'tests/integration/**/*exact-multinomial*.test.{ts,tsx}',
  'tests/integration/**/*input-vs-feature*.test.{ts,tsx}',
  'tests/integration/**/*joint-criterion*.test.{ts,tsx}',
  'tests/integration/**/*multi-k*.test.{ts,tsx}',
  'tests/integration/**/*williams-formal*.test.{ts,tsx}',
];

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
    // R&D 25개 sweep 은 nightly cron 만 — production verify 영역 제외.
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      ...RD_TEST_PATTERNS,
    ],
    css: false,
    // 사용자 catch 2026-05-09: clusterTrainRStdp / ART expansion 등 heavy
    // SNN simulation 영역 default 5s 초과 catch — 30s 영역 안전 margin.
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
