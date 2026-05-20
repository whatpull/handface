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

const SITE_URL = 'https://handface.whatpull.com';
const SITE_TITLE = 'HandFace — Bio-SNN Pattern Recognition';
const SITE_DESCRIPTION =
  '브라우저 기반 스파이킹 신경망 (Bio-SNN) + STDP 학습. 8 패턴 용량 · 100% 재현율 · AI 의존 0.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'HandFace',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
