// PipelineEventContext — training-cleared 영역 lastDetail reset 검증.
// 카메라/input-mode swap 테스트 제거 (카메라 입력 제거 2026-05-14).
// hand-feature reset 제거 (hand-feature listener 제거됨).

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';

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

function emit(name: string, detail: unknown) {
  const arr = eventListeners.get(name) ?? [];
  for (const h of arr) h(detail);
}

function Probe() {
  const { winnerCluster, lastDetail } = usePipelineEvents();
  return (
    <div>
      <span data-testid="winner">{winnerCluster ?? 'null'}</span>
      <span data-testid="hasDetail">{lastDetail ? 'yes' : 'no'}</span>
    </div>
  );
}

afterEach(() => {
  cleanup();
  eventListeners.clear();
});

describe('PipelineEventContext — training-cleared reset', () => {
  it('PE3: training-cleared 영역 detail/winner reset', () => {
    render(
      <PipelineEventProvider>
        <Probe />
      </PipelineEventProvider>,
    );
    act(() => {
      emit('neuron-firing', {
        cluster_rates: [0, 12, 0, 0],
        winner_cluster: 1,
        winner_margin: 1.0,
      });
    });
    expect(screen.getByTestId('winner').textContent).toBe('1');

    act(() => {
      emit('training-cleared', {});
    });
    expect(screen.getByTestId('winner').textContent).toBe('null');
    expect(screen.getByTestId('hasDetail').textContent).toBe('no');
  });
});
