// LLM 연동 영역 type 정의 — symbol grounding payload + 응답 schema.
// 본격 신경-symbolic 정합 — SNN cluster output 영역 grounded symbol 영역
// LLM prompt context 정합. Harnad 1990 / Garcez 2019 정합.

import { ORIENTATION_LABELS } from '@/components/snn/pipeline/GridInput';

export type ClusterId = 0 | 1 | 2 | 3;

/** SNN cluster output 영역 grounded symbol payload — LLM prompt 정합. */
export interface SymbolPayload {
  /** cluster id (0..3 또는 향후 dynamic expansion 시 N). */
  cluster: number;
  /** human-readable label (ORIENTATION_LABELS 정합 또는 사용자 rename). */
  label: string;
  /** winner margin 0..1 (sparse population code 신뢰도). */
  margin: number;
  /** confidence 0..1 (cluster_rates max / sum). */
  confidence: number;
  /** cluster 별 fire rate (0..N). */
  cluster_rates: number[];
  /** event source — narration 영역 context 정합. */
  source: 'inference' | 'training-finished' | 'training-progress' | 'manual';
  /** ISO 8601 timestamp. */
  timestamp: string;
}

/** LLM endpoint config — 사용자 입력 (settings panel). */
export interface LlmConfig {
  /** webhook 또는 LLM API URL. */
  endpoint: string;
  /** Bearer token (optional). */
  apiKey?: string;
  /** auto stream — winner change 시점 영역 자동 호출. */
  autoStream: boolean;
  /** mode — narration (자연어 설명) / action (webhook 호출). */
  mode: 'narration' | 'action';
}

/** LLM response — 자연어 또는 action result. */
export interface LlmResponse {
  ok: boolean;
  text?: string;
  error?: string;
  status?: number;
  /** elapsed ms — 부하 측정 정합. */
  elapsedMs: number;
}

/** narration mode 영역 prompt template — symbol → 자연어 설명. */
export function buildNarrationPrompt(payload: SymbolPayload): string {
  const ratesStr = payload.cluster_rates
    .map((r, i) => `${ORIENTATION_LABELS[i] ?? `c${i}`}: ${r.toFixed(0)}`)
    .join(', ');
  return [
    `SNN (Spiking Neural Network) 영역 4×4 픽셀 orientation 분류 결과:`,
    `- winner cluster: ${payload.label} (id=${payload.cluster})`,
    `- margin: ${(payload.margin * 100).toFixed(0)}%`,
    `- confidence: ${(payload.confidence * 100).toFixed(0)}%`,
    `- cluster fire rates: ${ratesStr}`,
    `- event: ${payload.source}`,
    ``,
    `위 결과를 자연어로 1-2 문장 설명 (학술 정합 — Hubel & Wiesel 1962`,
    `V1 simple cell orientation selectivity / Diehl & Cook 2015 unsupervised STDP).`,
  ].join('\n');
}
