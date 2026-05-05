'use client';

// React Error Boundary — Editor.tsx 영역 wrap.
// 자식 컴포넌트 영역 render 영역 throw 영역 catch → fallback UI 영역.
// crash 영역 흰 화면 / 무반응 catch path. Reload button 영역 즉시 복구.

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // 개발 / 프로덕션 영역 console 영역 root cause stack 정합.
    console.error('[ErrorBoundary] caught:', error, info.componentStack);
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  reload = (): void => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback(this.state.error, this.reset);
      return (
        <div
          role="alert"
          className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-[#0a0a0c] p-6 text-center text-white"
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-wider text-rose-300">에디터 오류</h1>
            <p className="max-w-md text-sm text-white/80">
              예기치 못한 오류로 화면을 그리지 못했습니다.
              <br />
              아래 메시지를 확인하고 다시 시도해주세요.
            </p>
          </div>
          <pre className="max-w-xl overflow-auto rounded border border-rose-400/30 bg-rose-950/30 px-3 py-2 text-left font-mono text-[11px] text-rose-200">
            {this.state.error.message || String(this.state.error)}
          </pre>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={this.reset}
              className="rounded bg-violet-500/30 px-4 py-1.5 text-xs text-violet-100 ring-1 ring-violet-400/50 hover:bg-violet-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
            >
              다시 시도
            </button>
            <button
              type="button"
              onClick={this.reload}
              className="rounded bg-white/10 px-4 py-1.5 text-xs text-white/90 ring-1 ring-white/15 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
