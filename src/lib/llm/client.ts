// LLM client — webhook / API endpoint 호출 + 부하 정합 (throttle/debounce/timeout).
//
// 부하 정합 mindset:
// 1. throttle — 동일 cluster 영역 짧은 간격 내 중복 호출 X (debounce).
// 2. timeout — fetch hang 영역 차단 (AbortController, default 15s).
// 3. streaming 폐기 — 단순 fetch (LLM streaming 영역 차후).
// 4. silent error — UI 안정성 정합 (사용자 미설정 endpoint 영역 silent).
// 5. 호출 횟수 제한 — 60s window 영역 max 30회 (rate limit guard).

import type { LlmConfig, LlmResponse, SymbolPayload } from './types';
import { buildNarrationPrompt } from './types';

const FETCH_TIMEOUT_MS = 15000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const DEBOUNCE_MS = 800; // 동일 cluster winner 영역 800ms 내 중복 호출 X.

let lastInvokedAt = 0;
let lastClusterId: number | null = null;
const recentInvocations: number[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  while (recentInvocations.length > 0 && now - recentInvocations[0] > RATE_LIMIT_WINDOW_MS) {
    recentInvocations.shift();
  }
  return recentInvocations.length >= RATE_LIMIT_MAX;
}

function shouldDebounce(payload: SymbolPayload): boolean {
  const now = Date.now();
  if (lastClusterId === payload.cluster && now - lastInvokedAt < DEBOUNCE_MS) {
    return true;
  }
  return false;
}

/**
 * LLM endpoint 호출 — narration 또는 action mode.
 * 부하 정합 — debounce + rate limit + timeout.
 */
export async function callLlm(
  payload: SymbolPayload,
  config: LlmConfig,
): Promise<LlmResponse> {
  const startedAt = Date.now();
  if (!config.endpoint || config.endpoint.trim() === '') {
    return { ok: false, error: 'endpoint 미설정', elapsedMs: 0 };
  }
  if (shouldDebounce(payload)) {
    return { ok: false, error: 'debounced (동일 cluster 짧은 간격)', elapsedMs: 0 };
  }
  if (isRateLimited()) {
    return { ok: false, error: `rate limit (${RATE_LIMIT_MAX}/min 초과)`, elapsedMs: 0 };
  }
  recentInvocations.push(startedAt);
  lastInvokedAt = startedAt;
  lastClusterId = payload.cluster;

  // narration mode — prompt 영역 wrapping. action mode — payload 그대로 POST.
  const body = config.mode === 'narration'
    ? { prompt: buildNarrationPrompt(payload), context: payload }
    : payload;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (config.apiKey && config.apiKey.trim() !== '') {
    headers['Authorization'] = `Bearer ${config.apiKey.trim()}`;
  }

  const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = ctrl ? setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS) : null;
  try {
    const r = await fetch(config.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: ctrl?.signal,
    });
    if (timeoutId) clearTimeout(timeoutId);
    const elapsedMs = Date.now() - startedAt;
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      return {
        ok: false,
        status: r.status,
        error: `HTTP ${r.status} ${txt.slice(0, 100)}`,
        elapsedMs,
      };
    }
    // 응답 — narration mode 영역 text, action mode 영역 ack 등 다양 형식.
    // 안전 path — text() → JSON parse 시도 → 실패 시 raw text 보존.
    const raw = await r.text();
    let text = raw;
    try {
      const parsed = JSON.parse(raw);
      // 일반 LLM response 영역 { text, content, response, message } 다양.
      text = parsed.text ?? parsed.content ?? parsed.response ?? parsed.message ?? raw;
      if (typeof text !== 'string') text = JSON.stringify(text);
    } catch {
      // raw text 그대로 보존 (webhook 응답 등).
    }
    return { ok: true, text: text.slice(0, 2000), elapsedMs };
  } catch (e) {
    if (timeoutId) clearTimeout(timeoutId);
    const err = e as Error;
    const elapsedMs = Date.now() - startedAt;
    const isAbort = err.name === 'AbortError';
    return {
      ok: false,
      error: isAbort ? `timeout (>${FETCH_TIMEOUT_MS}ms)` : err.message,
      elapsedMs,
    };
  }
}

/** 테스트 / 디버깅용 — 호출 history 초기화. */
export function resetLlmGuards(): void {
  lastInvokedAt = 0;
  lastClusterId = null;
  recentInvocations.length = 0;
}
