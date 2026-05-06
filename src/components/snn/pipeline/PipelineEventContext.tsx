'use client';

// PipelineEventContext — 단일 neuron-firing listener 영역 4 중복 catch 제거 (UX 4th HIGH).
//
// 배경:
//  fc5ae62 영역 5 노드 영역 각각 onBackendEvent('neuron-firing') 구독 영역 6 listener 영역
//  중첩 (PipelineCanvas + NodeLearn x2 + NodeInfer + NodeLlm + NodeOut). 영역 deriveWinner /
//  cluster mean 산출 영역 4회 일부 — 동일 frame 영역 중복 비용. 본 Provider 영역 상위
//  영역 단일 listener 일부, 모든 derived state 영역 context value 영역 hoist.
//
// 정직 한계 명시:
//  - Provider 영역 mount 영역 시점 영역 listener 1회 등록 / unmount 영역 1회 해제.
//  - context value 영역 React reference 영역 — 매 frame 영역 새 객체 대부분 자손
//    consumer 영역 re-render 사실. 변경 일부 frame 영역 (memoize 회피 — N=4 child 영역
//    일부 비용 영역 측정 0 영역 단순 보존).
//  - Δw (NodeLearn) 영역 prev weight cache 영역 ref 기반 영역 — 본 provider 영역 raw detail
//    영역 expose, 자손 영역 자체 useEffect 영역 detail 변경 영역 처리.
//  - winnerCluster 영역 deriveWinner 영역 단일 source — PipelineCanvas 직전 코드 영역 정합.
//
// API:
//   const { winnerCluster, clusterRates, ... lastDetail } = usePipelineEvents();
//   detail === null 일부 backend 영역 첫 frame 영역 미수신.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  onBackendEvent,
  type NeuronFiringDetail,
} from '@/lib/backend/events';
import { deriveWinner, type WinnerResult } from '@/lib/snn/winner-derivation';
import { WINNER_MARGIN } from './shared';

export interface PipelineEventState {
  /** Last neuron-firing payload (raw) — null 영역 미수신. */
  lastDetail: NeuronFiringDetail | null;
  /** 영역 frame 영역 timestamp (Date.now). null 영역 미수신. */
  lastFiringTimestamp: number | null;
  /** deriveWinner 결과 — backend cluster_rates / winner 영역 우선 활용. */
  winner: WinnerResult;
  /** alias — winner.cluster (4 consumer 일부 사용 영역 추출). */
  winnerCluster: number | null;
  /** alias — winner.clusterRates. */
  clusterRates: number[];
  /** alias — winner.margin. */
  margin: number;
  /** active_neurons_by_region — NodeLearn 영역 V1/V2 cascade strip 영역 사용. */
  activeByRegion: Record<string, string[]>;
}

const EMPTY_WINNER: WinnerResult = {
  cluster: null,
  clusterRates: [0, 0, 0, 0],
  clusterCounts: [0, 0, 0, 0],
  confidence: 0,
  margin: 0,
  max: 0,
  total: 0,
  source: 'fallback',
};

const PipelineEventContext = createContext<PipelineEventState>({
  lastDetail: null,
  lastFiringTimestamp: null,
  winner: EMPTY_WINNER,
  winnerCluster: null,
  clusterRates: [0, 0, 0, 0],
  margin: 0,
  activeByRegion: {},
});

export function PipelineEventProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<NeuronFiringDetail | null>(null);
  const [ts, setTs] = useState<number | null>(null);
  // listener 영역 1회 등록 — provider mount 한정.
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      setDetail(d);
      setTs(Date.now());
    });
    // 사용자 catch 2026-05-06: no hand 상태 → 추론 결과 초기화. hand-feature event 의
    // hasHand=false 시점에 detail/ts 초기화하여 NodeInfer winner stale 잔존 catch 회피.
    const offHand = onBackendEvent<{ hasHand?: boolean }>('hand-feature', (d) => {
      if (d && d.hasHand === false) {
        setDetail(null);
        setTs(null);
      }
    });
    // training-cleared (Reset) 시점에도 명시 초기화.
    const offCleared = onBackendEvent('training-cleared', () => {
      setDetail(null);
      setTs(null);
    });
    return () => {
      off();
      offHand();
      offCleared();
      mountedRef.current = false;
    };
  }, []);

  // winner 영역 detail 영역 도출 — useMemo 영역 frame 단위 영역 1회 산출.
  const winner = useMemo<WinnerResult>(() => {
    if (!detail) return EMPTY_WINNER;
    return deriveWinner(detail.out_rates || {}, {
      marginThreshold: WINNER_MARGIN,
      clusterRates: detail.cluster_rates,
      winnerCluster: detail.winner_cluster,
      winnerMargin: detail.winner_margin,
    });
  }, [detail]);

  const value = useMemo<PipelineEventState>(() => ({
    lastDetail: detail,
    lastFiringTimestamp: ts,
    winner,
    winnerCluster: winner.cluster,
    clusterRates: winner.clusterRates,
    margin: winner.margin,
    activeByRegion: detail?.active_neurons_by_region || {},
  }), [detail, ts, winner]);

  return (
    <PipelineEventContext.Provider value={value}>
      {children}
    </PipelineEventContext.Provider>
  );
}

export function usePipelineEvents(): PipelineEventState {
  return useContext(PipelineEventContext);
}
