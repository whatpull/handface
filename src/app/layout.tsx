import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HandFace — Neural Mesh Editor',
  description: 'Bio-SNN visualization & node editor framework',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-[#0a0a0c] text-white">{children}</body>
    </html>
  );
}
