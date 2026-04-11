import { defineConfig } from 'vite';

// 데모 페이지 전용 빌드 설정 (GitHub Pages 배포용)
export default defineConfig({
  root: 'demo',
  base: '/handface/',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
  },
});
