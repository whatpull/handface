import P213Panel from '@/components/research/P213Panel';

// /research — HandFace Research Lab landing.
// 정합: output: 'export' + basePath '/handface' 영역 정합 → static export 영역
// '/research/' 영역 별도 page.
export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">HandFace Research Lab</h1>
          <p className="mt-1 text-sm text-[#8888aa]">SNN 성능 측정 및 연구 모듈</p>
        </header>
        <P213Panel />
      </div>
    </main>
  );
}
