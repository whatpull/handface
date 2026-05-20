'use client';
// /snn-lab 폐기 안내 (Live 5차, 2026-05-09).
// Next.js static export — redirect 미지원, useEffect setTimeout + 사용자
// 안내 + 명시적 click target. gh-pages basePath '/handface/' 정합.
//
// UX P2-2 (2026-05-20): 시각 정체성 복원 — HandFaceLogo + violet accent +
// #0a0a0f globals.css 배경 정합. 직전 `bg-black` 단색 영역 브랜드 단절 정정.

import { useEffect } from 'react';
import { HandFaceLogo } from '@/components/handface-logo';

export default function NotFound() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // gh-pages basePath 정합 — '/handface/' (next.config.ts:7-11).
    const root = window.location.pathname.startsWith('/handface')
      ? '/handface/'
      : '/';
    const t = setTimeout(() => {
      window.location.href = root;
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="flex justify-center mb-2">
          <HandFaceLogo size={48} />
        </div>
        <div className="text-2xl font-semibold tracking-wide">
          <span className="text-violet-300">404</span>
          <span className="text-white/70"> · </span>
          <span className="text-white">페이지 없음</span>
        </div>
        <p className="text-sm text-white/70">
          /snn-lab 라우트는 폐기되었습니다 (Live 5차, 2026-05-09) — 모든 기능은 root /handface/ Live 모드로 통합되었습니다.
        </p>
        <p className="text-xs text-white/50">
          The /snn-lab route was removed. All features are now integrated into the root /handface/ Live mode pipeline.
        </p>
        <div className="text-xs text-white/40 pt-1">2.5초 후 자동 이동 / Redirecting…</div>
        <a
          href="/handface/"
          className="inline-block mt-2 px-4 py-2 min-h-[40px] rounded bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
        >
          지금 이동 / Go now →
        </a>
      </div>
    </main>
  );
}
