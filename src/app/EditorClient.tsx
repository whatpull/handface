'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  // 모듈 로드 중 빈 다크 배경만 — 'Loading editor…' 텍스트 노출 안 함.
  loading: () => <div className="h-dvh w-dvw bg-[#0a0a0c]" />,
});

export default function EditorClient() {
  return <Editor />;
}
