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

// OG image — public/og-image.png (1200×630). SVG source 영역 public/og-image.svg
// 영역 stage 영역 — PNG export 영역 외부 도구 (Figma / Inkscape / online converter) 영역.
// PNG 영역 production 영역 social card 영역 표시.
const OG_IMAGE_PATH = '/og-image.png';

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
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={roboto.variable}>
      <body className="antialiased bg-[#0a0a0c] text-white">
        {children}
        {/* Honest Disclaimer Footer — Apache 2.0 + 학술 정직성 + 개인정보보호법 정합 안내. */}
        <footer className="fixed bottom-2 right-2 z-50 text-[10px] text-[#666] bg-[#0a0a0c]/80 px-2 py-1 rounded backdrop-blur-sm pointer-events-auto">
          <span className="text-[#888]">⚠️ 연구/데모용</span>
          {' · '}
          <a href="https://github.com/whatpull/handface/blob/main/docs/HONEST_LIMITATIONS.md" target="_blank" rel="noopener noreferrer" className="text-[#aaa] hover:text-cyan-300 underline">한계 고지</a>
          {' · '}
          <a href="https://github.com/whatpull/handface/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer" className="text-[#aaa] hover:text-cyan-300 underline">개인정보</a>
        </footer>
      </body>
    </html>
  );
}
