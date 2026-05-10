// 사용자 catch 2026-05-11 (coherence-overhaul-learn-infer-out): 정합 path
// 통합 regression — HIGH 6 + MEDIUM 5 fix 영역 정합 검증.
//
// 시나리오:
//  1. INITIAL — fresh circuit + clusterCount=0 영역 LEARN/INFER/OUT 영역 통일 wording.
//  2. EMPTY_WINNER zero-init — clusterRates 영역 빈 배열 정합 (Fix #19 base 4 폐기).
//  3. winner 단일 source — PipelineEventContext.winner 영역 LEARN/INFER 영역 동일 source.
//  4. OUT count 정의 inline hint + isAutoLearning amber row.
//  5. INFER cluster_rates Hz suffix.
//  6. fresh wording 통일 — "FRESH CIRCUIT — 학습 0회 / 입력 대기".

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, act } from '@testing-library/react';

const eventListeners = new Map<string, Array<(d: unknown) => void>>();

vi.mock('@/lib/backend/events', () => ({
  onBackendEvent: vi.fn((name: string, handler: (d: unknown) => void) => {
    const arr = eventListeners.get(name) ?? [];
    arr.push(handler);
    eventListeners.set(name, arr);
    return () => {
      const next = (eventListeners.get(name) ?? []).filter((h) => h !== handler);
      eventListeners.set(name, next);
    };
  }),
}));

import {
  PipelineEventProvider,
  usePipelineEvents,
} from '@/components/snn/pipeline/PipelineEventContext';
import NodeOut from '@/components/snn/pipeline/NodeOut';

function emit(name: string, detail: unknown) {
  const arr = eventListeners.get(name) ?? [];
  for (const h of arr) h(detail);
}

beforeEach(() => {
  // localStorage clear — out-exemplars 영역 fresh state.
  if (typeof localStorage !== 'undefined') localStorage.clear();
});

afterEach(() => {
  cleanup();
  eventListeners.clear();
});

function WinnerProbe() {
  const { winner, isAutoLearning } = usePipelineEvents();
  return (
    <div>
      <span data-testid="cluster">{winner.cluster ?? 'null'}</span>
      <span data-testid="rates-len">{winner.clusterRates.length}</span>
      <span data-testid="rates">{JSON.stringify(winner.clusterRates)}</span>
      <span data-testid="counts-len">{winner.clusterCounts.length}</span>
      <span data-testid="auto">{isAutoLearning ? 'yes' : 'no'}</span>
    </div>
  );
}

describe('HIGH #3 — EMPTY_WINNER zero-init (Fix #19 base 4 폐기 정합)', () => {
  it('detail===null 영역 clusterRates 영역 빈 배열 (length 0)', () => {
    render(
      <PipelineEventProvider>
        <WinnerProbe />
      </PipelineEventProvider>,
    );
    expect(screen.getByTestId('cluster').textContent).toBe('null');
    expect(screen.getByTestId('rates-len').textContent).toBe('0');
    expect(screen.getByTestId('rates').textContent).toBe('[]');
    expect(screen.getByTestId('counts-len').textContent).toBe('0');
  });
});

describe('HIGH #1 — winner 단일 source (PipelineEventContext.winner)', () => {
  it('neuron-firing 영역 cluster_rates 영역 winner 동봉 시점 영역 winner 정합', () => {
    render(
      <PipelineEventProvider>
        <WinnerProbe />
      </PipelineEventProvider>,
    );
    act(() => {
      emit('neuron-firing', {
        cluster_rates: [10, 50, 5, 5],
        winner_cluster: 1,
        winner_margin: 0.8,
        out_rates: { out_0_0: 10, out_1_0: 50 },
      });
    });
    expect(screen.getByTestId('cluster').textContent).toBe('1');
    // Hz suffix 영역 NodeInfer RateBar 영역 별도 검증 (UI render).
    expect(JSON.parse(screen.getByTestId('rates').textContent ?? '[]')).toEqual([10, 50, 5, 5]);
  });
});

describe('HIGH #6 — OUT count inline hint + isAutoLearning amber row', () => {
  it('NodeShell subtitle 영역 "winner 누적" 영역 정의 명시', () => {
    render(
      <PipelineEventProvider>
        <NodeOut />
      </PipelineEventProvider>,
    );
    // subtitle 영역 NodeShell 영역 header 영역 inline 영역 표시.
    expect(screen.getByText(/winner 누적/)).toBeTruthy();
  });

  it('isAutoLearning=true 영역 amber row "학습 중 — count 갱신 대기" 표시', async () => {
    render(
      <PipelineEventProvider>
        <NodeOut />
      </PipelineEventProvider>,
    );
    // auto-learn-progress 영역 progress < total 영역 add → isAutoLearning true.
    act(() => {
      emit('auto-learn-progress', {
        clusterId: 0,
        progress: 1,
        total: 30,
        trialToken: 1,
      });
    });
    expect(screen.getByText(/학습 중 — count 갱신 대기/)).toBeTruthy();
  });

  it('auto-learn 완료 (progress >= total) 영역 isAutoLearning false → amber row hide', () => {
    render(
      <PipelineEventProvider>
        <NodeOut />
      </PipelineEventProvider>,
    );
    act(() => {
      emit('auto-learn-progress', { clusterId: 0, progress: 1, total: 30, trialToken: 1 });
    });
    expect(screen.queryByText(/학습 중 — count 갱신 대기/)).toBeTruthy();
    act(() => {
      emit('auto-learn-progress', { clusterId: 0, progress: 30, total: 30, trialToken: 1 });
    });
    expect(screen.queryByText(/학습 중 — count 갱신 대기/)).toBeNull();
  });
});
