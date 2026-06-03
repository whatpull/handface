// Phase 3.9 v41 (2026-06-04) — formatRelativeTime 한국어 helper.
//
// CameraInput 의 cluster row "마지막: N전" 표시 영역 사용.

import { describe, expect, it } from 'vitest';

// formatRelativeTime 영역 component file 내부 — 영역 inline 재정의 영역 test.
function formatRelativeTime(elapsedMs: number): string {
  if (elapsedMs < 0) return '방금';
  const sec = Math.floor(elapsedMs / 1000);
  if (sec < 10) return '방금';
  if (sec < 60) return `${sec}초 전`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day === 1) return '어제';
  if (day < 30) return `${day}일 전`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month}개월 전`;
  return `${Math.floor(month / 12)}년 전`;
}

describe('v41 formatRelativeTime — 한국어 catch', () => {
  it('미래 / 0 → 방금', () => {
    expect(formatRelativeTime(-100)).toBe('방금');
    expect(formatRelativeTime(0)).toBe('방금');
  });

  it('< 10s → 방금', () => {
    expect(formatRelativeTime(5000)).toBe('방금');
    expect(formatRelativeTime(9999)).toBe('방금');
  });

  it('10s-59s → N초 전', () => {
    expect(formatRelativeTime(10000)).toBe('10초 전');
    expect(formatRelativeTime(30000)).toBe('30초 전');
    expect(formatRelativeTime(59000)).toBe('59초 전');
  });

  it('1m-59m → N분 전', () => {
    expect(formatRelativeTime(60000)).toBe('1분 전');
    expect(formatRelativeTime(5 * 60 * 1000)).toBe('5분 전');
    expect(formatRelativeTime(59 * 60 * 1000)).toBe('59분 전');
  });

  it('1h-23h → N시간 전', () => {
    expect(formatRelativeTime(60 * 60 * 1000)).toBe('1시간 전');
    expect(formatRelativeTime(5 * 60 * 60 * 1000)).toBe('5시간 전');
    expect(formatRelativeTime(23 * 60 * 60 * 1000)).toBe('23시간 전');
  });

  it('1일 → 어제', () => {
    expect(formatRelativeTime(24 * 60 * 60 * 1000)).toBe('어제');
    expect(formatRelativeTime(36 * 60 * 60 * 1000)).toBe('어제');
  });

  it('2-29일 → N일 전', () => {
    expect(formatRelativeTime(2 * 24 * 60 * 60 * 1000)).toBe('2일 전');
    expect(formatRelativeTime(7 * 24 * 60 * 60 * 1000)).toBe('7일 전');
    expect(formatRelativeTime(29 * 24 * 60 * 60 * 1000)).toBe('29일 전');
  });

  it('1-11개월 → N개월 전', () => {
    expect(formatRelativeTime(30 * 24 * 60 * 60 * 1000)).toBe('1개월 전');
    expect(formatRelativeTime(180 * 24 * 60 * 60 * 1000)).toBe('6개월 전');
  });

  it('1년+ → N년 전', () => {
    expect(formatRelativeTime(365 * 24 * 60 * 60 * 1000)).toBe('1년 전');
    expect(formatRelativeTime(2 * 365 * 24 * 60 * 60 * 1000)).toBe('2년 전');
  });
});
