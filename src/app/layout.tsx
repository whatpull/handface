import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

// Roboto — 사용자 명시 (2026-05-05): 전체 글씨체 Google Fonts Roboto 통일.
// next/font/google 영역 build-time fetch + woff2 self-host — output: 'export' 정합.
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'HandFace — Neural Network Editor',
  description: 'Bio-SNN visualization & node editor framework',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={roboto.variable}>
      <body className="antialiased bg-[#0a0a0c] text-white">{children}</body>
    </html>
  );
}
