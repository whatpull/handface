// vitest R&D 측정 sweep 전용 config (2026-05-31).
//
// 본 config 의 testRun 은 nightly cron (.github/workflows/nightly-rd.yml)
// 전용 — push verify 영역 무관 (deploy 비차단).
//
// R&D 분리 사유:
//   직전 사용자 catch — 매 push verify 1h 13m 영역 deploy 차단 영역 매우 불편.
//   R&D 25개 sweep 영역 nightly 1회 만 돌리고 measurement JSON 영역 artifact
//   upload. 자동 측정 mandate (2026-05-25) 영역 mandate 본질 (사용자 PC 없이
//   measurement 데이터 수집) 영역 유지 — 주기 만 매 push → 1일 1회 변경.
//
// 본 config 추가/수정 시 vitest.config.ts 의 RD_TEST_PATTERNS 도 1:1 동시 갱신.

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { RD_TEST_PATTERNS } from './vitest.config';

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
    include: RD_TEST_PATTERNS,
    css: false,
    // R&D 측정 영역 단일 test 가 10분+ 영역 — 30분 안전 margin.
    // (예: hand-snn-multi-k-boundary.test.ts 영역 18분 측정.)
    testTimeout: 30 * 60_000,
    hookTimeout: 30 * 60_000,
  },
});
