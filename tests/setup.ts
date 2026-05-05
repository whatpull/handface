// vitest setup — @testing-library/jest-dom matchers + localStorage mock 정합.
//
// jsdom 영역 localStorage 영역 영역 동작 영역 — 별도 mock 영역. 단, 영역 테스트 영역
// 영역 정합 영역 isolation 영역 mandatory → beforeEach 영역 wipe.

import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

beforeEach(() => {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
});
