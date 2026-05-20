// 동적 OG image — Next.js 15 ImageResponse API (next/og)
// build 시점에 PNG 로 생성되어 `/opengraph-image` 경로로 export 된다.
// output: 'export' 정합 — static export 빌드에서도 PNG 산출.
//
// 한국어 폰트 fallback 주의: next/og 의 ImageResponse 는 기본 시스템 폰트만 사용 가능.
// build 환경(GitHub Actions Ubuntu)에 한국어 글리프가 없을 가능성이 있어
// 본 OG image 의 메인 카피는 영문(brand 표기)으로 작성한다. 한국어 카피가 필요할 경우
// `fonts: [{ name, data, weight }]` 옵션에 NotoSansKR woff 를 fetch 해 주입해야 한다.

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HandFace — Bio-SNN Pattern Recognition';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(ellipse at 20% 20%, #1e1b3a 0%, #0a0a0f 60%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row — logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* 4-grid logo (favicon 정합) */}
          <svg width="96" height="96" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="#7c3aed" />
            <rect x="7" y="7" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="17" y="7" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.4" />
            <rect x="7" y="17" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.4" />
            <rect x="17" y="17" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.9" />
          </svg>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            HandFace
          </div>
        </div>

        {/* Center — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            Bio-SNN Pattern
            <br />
            Recognition
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: '#a78bfa',
              letterSpacing: '-0.01em',
            }}
          >
            Browser-native spiking neural network with STDP learning
          </div>
        </div>

        {/* Bottom row — metric pills */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {[
            { label: '8 patterns', accent: '#a78bfa' },
            { label: '100% recall', accent: '#a78bfa' },
            { label: 'STDP learning', accent: '#a78bfa' },
            { label: '0 AI deps', accent: '#a78bfa' },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 24px',
                borderRadius: 999,
                border: `1px solid ${m.accent}`,
                fontSize: 26,
                fontWeight: 500,
                color: '#ffffff',
                background: 'rgba(124, 58, 237, 0.12)',
              }}
            >
              {m.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
