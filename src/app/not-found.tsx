'use client';
// /snn-lab 영역 폐기 안내 (Live 5차, 2026-05-09).
// Next.js static export 영역 redirect 영역 미지원 — useEffect 영역 setTimeout
// + 사용자 안내 + 명시적 click target. gh-pages 영역 basePath '/handface/' 정합.

import { useEffect } from 'react';

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
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md text-center space-y-3">
        <div className="text-2xl font-semibold">페이지 없음 / Page not found</div>
        <p className="text-sm text-white/70">
          /snn-lab 라우트 영역 폐기 (Live 5차, 2026-05-09) — 모든 기능 영역 root /handface/ 영역 Live 모드 영역 통합.
        </p>
        <p className="text-xs text-white/50">
          The /snn-lab route was removed. All features are now integrated into the root /handface/ Live mode pipeline.
        </p>
        <div className="text-xs text-white/40 pt-2">2.5초 후 자동 이동 / Redirecting…</div>
        <a
          href="/handface/"
          className="inline-block mt-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
        >
          지금 이동 / Go now →
        </a>
      </div>
    </main>
  );
}
