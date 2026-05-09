'use client';

import { useEffect, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { emitBackendEvent } from '@/lib/backend/events';
import {
  loadBackendSettings, normalizeEndpoint, saveBackendSettings,
} from '@/lib/backend/settings';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  // UX Polish PR1 Fix 2 (HIGH [H1], 2026-05-09): 한국어 status 일관 정합.
  const [status, setStatus] = useState('미시험');

  useEffect(() => {
    const s = loadBackendSettings();
    setEndpoint(s.endpoint);
    setApiKey(s.apiKey);
  }, []);

  const save = async () => {
    const url = normalizeEndpoint(endpoint);
    if (url !== endpoint) setEndpoint(url);
    saveBackendSettings({ endpoint: url, apiKey });
    getClient().setSettings(url, apiKey);
    // 연결 성공 검증 → 성공 시 캔버스에 회로 갱신 신호.
    setStatus(`저장됨 (${url}) — 시험 중…`);
    const r = await getClient().health();
    if (r.ok) {
      setStatus(`✓ 저장 + 연결 성공 (${url})`);
      // Canvas remount → 새 endpoint 의 회로 로드.
      emitBackendEvent('circuit-changed', {});
    } else {
      setStatus(`저장됨. 연결 실패: ${r.reason}`);
    }
  };

  const test = async () => {
    setStatus('시험 중…');
    const url = normalizeEndpoint(endpoint);
    if (url !== endpoint) setEndpoint(url);
    const client = getClient();
    client.setSettings(url, apiKey);
    const r = await client.health();
    if (r.ok) {
      setStatus(`✓ ${url}`);
      emitBackendEvent('circuit-changed', {});
    } else {
      setStatus(`✗ ${r.reason}`);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="m-4 w-[360px] max-w-full rounded border border-white/10 bg-[#0f1117] p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-violet-300">설정</span>
          <button
            type="button"
            aria-label="설정 닫기"
            onClick={onClose}
            className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/50">엔드포인트</span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm text-white outline-none focus:border-violet-400/50 focus-visible:ring-2 focus-visible:ring-violet-300/60"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/50">API 키</span>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="new-password"
              spellCheck={false}
              className="w-full rounded border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm text-white outline-none focus:border-violet-400/50 focus-visible:ring-2 focus-visible:ring-violet-300/60"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              className="flex-1 rounded bg-violet-500/20 px-3 py-1.5 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
            >
              저장
            </button>
            <button
              type="button"
              onClick={test}
              className="flex-1 rounded bg-white/5 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
            >
              연결 시험
            </button>
          </div>
          <div className="break-all text-[11px] font-mono text-white/50">{status}</div>
        </div>
      </div>
    </div>
  );
}
