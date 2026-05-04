'use client';

import { useEffect, useState } from 'react';

const ENDPOINT_KEY = 'handface.settings.endpoint';
const APIKEY_KEY   = 'handface.settings.apikey';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('not tested');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setEndpoint(localStorage.getItem(ENDPOINT_KEY) ?? 'https://whatpull-neuronface.hf.space');
    setApiKey(localStorage.getItem(APIKEY_KEY) ?? '');
  }, []);

  const save = () => {
    localStorage.setItem(ENDPOINT_KEY, endpoint);
    localStorage.setItem(APIKEY_KEY, apiKey);
    setStatus('saved');
  };

  const test = async () => {
    setStatus('testing…');
    try {
      const r = await fetch(`${endpoint.replace(/\/$/, '')}/health`, {
        headers: apiKey ? { 'x-api-key': apiKey } : {},
      });
      setStatus(r.ok ? `✓ ${r.status}` : `✗ ${r.status}`);
    } catch (e) {
      setStatus(`✗ ${(e as Error).message}`);
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
          <span className="text-xs font-semibold tracking-wider text-violet-300">SETTINGS</span>
          <button
            type="button"
            aria-label="Close settings"
            onClick={onClose}
            className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/50">Endpoint</span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm text-white outline-none focus:border-violet-400/50"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/50">API Key</span>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="new-password"
              spellCheck={false}
              className="w-full rounded border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm text-white outline-none focus:border-violet-400/50"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              className="flex-1 rounded bg-violet-500/20 px-3 py-1.5 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30"
            >
              Save
            </button>
            <button
              type="button"
              onClick={test}
              className="flex-1 rounded bg-white/5 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 hover:bg-white/10"
            >
              Test
            </button>
          </div>
          <div className="text-[11px] font-mono text-white/50">{status}</div>
        </div>
      </div>
    </div>
  );
}
