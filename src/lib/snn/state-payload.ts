// 5-node pipeline 영역 LLM payload builder.
//
// PipelineCanvas 영역 OUT/LLM 노드 영역 외부 endpoint 영역 송출 payload 정합.
// 사용자 영역 명시: { winner, confidence, cluster_rates, history, gesture_name, timestamp }.
//
// 정직 한계 박음:
//  - 본 파일 영역 = 데이터 직렬화 영역만. 실제 송신 영역 llm-client.ts 영역.
//  - winnerLabel 영역 OUT exemplar 라벨 영역 우선, 없으면 cluster id 영역 fallback.
//  - history 영역 = 최근 winner 전이 영역 timeline (max 32).

import { CLUSTER_TO_LABEL } from './use-hand-control';
import { loadExemplars } from './out-exemplars';

export type Phase = 'untrained' | 'learning' | 'partial' | 'trained' | 'inference';

export interface WinnerHistoryEntry {
  winner: string;       // 예: 'cluster_2' 또는 'out_2_0'
  label: string | null; // 사용자 영역 라벨 (있으면)
  confidence: number;
  ts: number;
}

export interface StatePayload {
  phase: Phase;
  winner: string | null;       // 예: 'cluster_2' / null
  winnerLabel: string | null;  // 사용자 영역 라벨 / cluster 영역 default 라벨
  confidence: number;          // 0..1
  margin: number;              // 0..1 (max-second)/max
  clusterRates: number[];      // [4] mean Hz 영역 cluster 별
  clusterCounts: number[];     // [4] cluster 별 학습 frame 수 (target 30)
  history: WinnerHistoryEntry[];
  gestureName: string | null;  // MediaPipe label
  gestureScore: number;        // 0..1
  timestamp: number;           // ms
}

export interface StatePayloadInputs {
  phase: Phase;
  winnerCluster: number | null;
  confidence: number;
  margin: number;
  clusterRates: number[];
  clusterCounts: number[];
  history: WinnerHistoryEntry[];
  gestureName: string | null;
  gestureScore: number;
}

export function buildStatePayload(i: StatePayloadInputs): StatePayload {
  const winner = i.winnerCluster !== null ? `cluster_${i.winnerCluster}` : null;
  let winnerLabel: string | null = null;
  if (i.winnerCluster !== null) {
    const ex = loadExemplars();
    // OUT exemplar 영역 라벨 영역 cluster 대표 OUT 영역 (out_{ci}_0 또는 out_{ci}) 영역.
    const candidates = [`out_${i.winnerCluster}_0`, `out_${i.winnerCluster}`];
    for (const k of candidates) {
      if (ex[k]?.label) { winnerLabel = ex[k]!.label!; break; }
    }
    if (!winnerLabel) winnerLabel = CLUSTER_TO_LABEL[i.winnerCluster] ?? `cluster ${i.winnerCluster}`;
  }
  return {
    phase: i.phase,
    winner,
    winnerLabel,
    confidence: clamp01(i.confidence),
    margin: clamp01(i.margin),
    clusterRates: i.clusterRates.slice(0, 4),
    clusterCounts: i.clusterCounts.slice(0, 4),
    history: i.history.slice(-32),
    gestureName: i.gestureName,
    gestureScore: clamp01(i.gestureScore),
    timestamp: Date.now(),
  };
}

function clamp01(v: number): number {
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}
