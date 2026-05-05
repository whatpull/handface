import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Inter — pipeline node 영역 'Inter' family 정합 (자체 호스팅).
// next/font/google 영역 build-time fetch + woff2 self-host — output: 'export' 정합.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'HandFace — Neural Network Editor',
  description: 'Bio-SNN visualization & node editor framework',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="antialiased bg-[#0a0a0c] text-white">{children}</body>
    </html>
  );
}
