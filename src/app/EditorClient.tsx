'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh w-dvw items-center justify-center bg-[#0a0a0c] text-white/50">
      <span className="font-mono text-xs tracking-wider">Loading editor…</span>
    </div>
  ),
});

export default function EditorClient() {
  return <Editor />;
}
