import ResearchTabs from '@/components/research/ResearchTabs';
import { HandFaceLogo } from '@/components/handface-logo';

// /research — HandFace Research Lab landing.
// 정합: output: 'export' + basePath '/handface' 정합 → static export
// '/research/' 별도 page.
// UX P3-3 (2026-05-20): 헤더 brand 일관성 — HandFaceLogo + 'HandFace' span
// 메인 앱 헤더 (Editor.tsx L210-216) 동일 패턴 적용.
export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <HandFaceLogo size={24} />
            <span className="text-sm font-semibold tracking-wider">HandFace</span>
            <span className="hidden sm:inline text-[11px] text-white/40">Research Lab</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">HandFace Research Lab</h1>
          <p className="mt-1 text-sm text-[#8888aa]">SNN 성능 측정 및 연구 모듈 — P213/P214 series</p>
        </header>
        <ResearchTabs />
      </div>
    </main>
  );
}
