// LLM 외부 endpoint 영역 client.
//
// PipelineCanvas LLM 노드 영역 사용 — 사용자 영역 endpoint URL + (옵션) API key 영역
// localStorage 영역 영구. winner 변경 시점 영역 auto stream 영역 또는 manual test send.
//
// 정직 한계 명시:
//  - 본 파일 영역 = HTTP POST wrapper 영역만. 실제 endpoint 영역 사용자 환경 영역.
//  - 응답 schema 영역 보장 0 — 그대로 string 영역 paste 영역 표시.
//  - CORS 차단 가능성 — 사용자 영역 endpoint 영역 'Access-Control-Allow-Origin' 정합 필요.

import type { StatePayload } from './state-payload';

const KEY_ENDPOINT = 'handface.llm.endpoint';
const KEY_APIKEY   = 'handface.llm.apikey';
const KEY_AUTO     = 'handface.llm.auto';

export interface LlmConfig {
  endpoint: string;
  apiKey: string;
  auto: boolean;
}

export function loadLlmConfig(): LlmConfig {
  if (typeof window === 'undefined') return { endpoint: '', apiKey: '', auto: false };
  try {
    return {
      endpoint: localStorage.getItem(KEY_ENDPOINT) || '',
      apiKey: localStorage.getItem(KEY_APIKEY) || '',
      auto: localStorage.getItem(KEY_AUTO) === '1',
    };
  } catch { return { endpoint: '', apiKey: '', auto: false }; }
}

export function saveLlmConfig(c: Partial<LlmConfig>) {
  if (typeof window === 'undefined') return;
  try {
    if (c.endpoint !== undefined) localStorage.setItem(KEY_ENDPOINT, c.endpoint);
    if (c.apiKey !== undefined)   localStorage.setItem(KEY_APIKEY, c.apiKey);
    if (c.auto !== undefined)     localStorage.setItem(KEY_AUTO, c.auto ? '1' : '0');
  } catch { /* noop */ }
}

export interface LlmSendResult {
  ok: boolean;
  status: number;            // HTTP status (0 영역 fetch fail)
  latencyMs: number;
  body: string;              // 응답 본문 영역 raw (JSON 영역 string 영역)
  error?: string;
}

export async function sendStateToLlm(
  cfg: LlmConfig,
  payload: StatePayload,
): Promise<LlmSendResult> {
  const url = (cfg.endpoint || '').trim();
  if (!url) {
    return { ok: false, status: 0, latencyMs: 0, body: '', error: 'endpoint 영역 미입력' };
  }
  const t0 = performance.now();
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;
    const r = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const text = await r.text().catch(() => '');
    const latencyMs = Math.round(performance.now() - t0);
    return {
      ok: r.ok,
      status: r.status,
      latencyMs,
      body: text.slice(0, 4096),
      error: r.ok ? undefined : `HTTP ${r.status}`,
    };
  } catch (e) {
    const latencyMs = Math.round(performance.now() - t0);
    return {
      ok: false,
      status: 0,
      latencyMs,
      body: '',
      error: (e as Error).message || 'fetch failed',
    };
  }
}
