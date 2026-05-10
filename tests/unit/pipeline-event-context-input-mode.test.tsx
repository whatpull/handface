// PipelineEventContext — input-mode swap 영역 lastDetail reset 검증 (Fix 3).
//
// 사용자 catch 2026-05-09 [1]: GRID 추론 winner 영역 CAMERA mode 영역 carry-over.
// root cause — PipelineEventContext 영역 input-mode listener 0 → 자손 (NodeOut /
// NodeInfer / NodeLearn) 영역 stale winner 표시.
//
// PE1: neuron-firing emit 후 input-mode swap 영역 detail/winner 영역 reset.
// PE2: hand-feature hasHand=false 영역 reset (직전 path 영역 보존 검증).
// PE3: training-cleared 영역 reset (직전 path 영역 보존 검증).

import { afterEach, describe, expect, it, vi } from 'vitest';
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

describe('PipelineEventContext — input-mode reset (Fix 3)', () => {
  it('PE1: neuron-firing 후 input-mode swap 영역 detail/winner 영역 reset', () => {
    render(
      <PipelineEventProvider>
        <Probe />
      </PipelineEventProvider>,
    );
    expect(screen.getByTestId('winner').textContent).toBe('null');
    expect(screen.getByTestId('hasDetail').textContent).toBe('no');

    // neuron-firing emit — winner=2 영역 set.
    act(() => {
      emit('neuron-firing', {
        cluster_rates: [0, 0, 12, 0],
        winner_cluster: 2,
        winner_margin: 1.0,
      });
    });
    expect(screen.getByTestId('winner').textContent).toBe('2');
    expect(screen.getByTestId('hasDetail').textContent).toBe('yes');

    // input-mode swap (GRID → CAMERA) 영역 detail/winner reset.
    act(() => {
      emit('input-mode', { mode: 'camera' });
    });
    expect(screen.getByTestId('winner').textContent).toBe('null');
    expect(screen.getByTestId('hasDetail').textContent).toBe('no');
  });

  it('PE2: hand-feature hasHand=false 영역 reset (regression catch — 직전 path)', () => {
    render(
      <PipelineEventProvider>
        <Probe />
      </PipelineEventProvider>,
    );
    act(() => {
      emit('neuron-firing', {
        cluster_rates: [12, 0, 0, 0],
        winner_cluster: 0,
        winner_margin: 1.0,
      });
    });
    expect(screen.getByTestId('winner').textContent).toBe('0');

    act(() => {
      emit('hand-feature', { hasHand: false });
    });
    expect(screen.getByTestId('winner').textContent).toBe('null');
    expect(screen.getByTestId('hasDetail').textContent).toBe('no');
  });

  it('PE3: training-cleared 영역 reset (regression catch — 직전 path)', () => {
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
  });

  it('PE4: input-mode swap (CAMERA → GRID) 영역 동일 reset path', () => {
    render(
      <PipelineEventProvider>
        <Probe />
      </PipelineEventProvider>,
    );
    act(() => {
      emit('neuron-firing', {
        cluster_rates: [0, 0, 0, 12],
        winner_cluster: 3,
        winner_margin: 1.0,
      });
    });
    expect(screen.getByTestId('winner').textContent).toBe('3');

    act(() => {
      emit('input-mode', { mode: 'grid' });
    });
    expect(screen.getByTestId('winner').textContent).toBe('null');
  });
});
