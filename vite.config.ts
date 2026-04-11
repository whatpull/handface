import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => ({
  plugins: [
    // 라이브러리 빌드 시에만 dts 생성
    ...(command === 'build' ? [dts({ include: ['src'] })] : []),
  ],
  // dev 서버에서 demo/index.html을 루트로 사용
  root: command === 'serve' ? 'demo' : '.',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Handface',
      fileName: 'handface',
    },
    rollupOptions: {
      // MediaPipe는 번들에서 제외 (peer dependency)
      external: ['@mediapipe/tasks-vision'],
      output: {
        globals: {
          '@mediapipe/tasks-vision': 'MediaPipeTasks',
        },
      },
    },
  },
}));
