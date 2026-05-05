'use client';

import { useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { emitBackendEvent } from '@/lib/backend/events';

interface BrainBuilderDialogProps {
  open: boolean;
  onClose: () => void;
}

// 백엔드 build 라우트 카탈로그 — 제스처 연구 관련 3개만 노출.
// (basal_ganglia: action selection / cerebellum: 정밀 타이밍 / dorsal_stream: where 경로)
const BUILDERS: Array<{ category: string; items: Array<{ id: string; label: string; path: string; body?: object }> }> = [
  {
    category: 'Gesture-relevant',
    items: [
      { id: 'bg',     label: 'Basal Ganglia (action selection)', path: '/basal_ganglia/build' },
      { id: 'crb',    label: 'Cerebellum (정밀 타이밍)',          path: '/cerebellum/build' },
      { id: 'dorsal', label: 'Dorsal stream (where/how)',         path: '/dorsal_stream/build' },
    ],
  },
];

export default function BrainBuilderDialog({ open, onClose }: BrainBuilderDialogProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  // 라디오 선택 — 한 번에 1개만.
  const [selected, setSelected] = useState<string | null>(null);

  if (!open) return null;

  const pushLog = (line: string) => {
    setLog((l) => [line, ...l].slice(0, 30));
  };

  // 선택된 항목 lookup.
  const selectedItem = selected
    ? BUILDERS.flatMap((c) => c.items).find((it) => it.id === selected) || null
    : null;

  const applySelected = async () => {
    if (!selectedItem) return;
    if (!confirm(
      `${selectedItem.label} 회로를 추가합니다.\n\n` +
      `회로를 base cortical preset 으로 초기화한 뒤 선택한 region 만 추가합니다.\n` +
      `(누적 빌드 방지 — 항상 "base + 1 region" 조합 유지)\n\n` +
      `· 학습된 weight 손실\n· 다른 Brain Builder 로 추가한 region 폐기\n\n계속할까요?`,
    )) return;
    setBusy(selectedItem.id);
    pushLog(`… rebuild → ${selectedItem.label}`);
    // 1. 회로를 base 로 초기화.
    const rb = await getClient().rebuildToBaseline();
    if (!rb.ok) {
      pushLog(`✗ rebuild: ${rb.reason}`);
      setBusy(null);
      return;
    }
    pushLog(`✓ rebuild (base cortical preset)`);
    setBusy(null);
    // 2. 선택한 region 만 추가.
    await buildOne(selectedItem.id, selectedItem.label, selectedItem.path, selectedItem.body);
  };

  const buildOne = async (id: string, label: string, path: string, body: object = {}) => {
    setBusy(id);
    pushLog(`… ${label}`);
    const client = getClient();
    const net = await client.ensureNetwork();
    if (!net.ok) {
      pushLog(`✗ ${label}: ${net.reason}`);
      setBusy(null);
      return;
    }
    try {
      const r = await fetch(`${client.endpoint}/networks/${net.data}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(client.apiKey ? { 'x-api-key': client.apiKey } : {}),
        },
        body: JSON.stringify(body),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        const added = (data.neurons_added ?? data.synapses_added ?? '?');
        pushLog(`✓ ${label} +${added}`);
        emitBackendEvent('circuit-changed', {});
      } else {
        pushLog(`✗ ${label}: HTTP ${r.status} ${(data.detail || data.reason || '').toString().slice(0, 80)}`);
      }
    } catch (e) {
      pushLog(`✗ ${label}: ${(e as Error).message}`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brain-dialog-title"
        className="m-4 flex max-h-[90vh] w-[720px] max-w-full flex-col overflow-hidden rounded border border-white/10 bg-[#0f1117] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <span id="brain-dialog-title" className="text-xs font-semibold tracking-wider text-violet-300">
              🧠 BRAIN BUILDER
            </span>
            <span className="text-[11px] text-white/40">
              {selectedItem ? `→ ${selectedItem.label}` : '라디오 선택 후 Apply'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applySelected}
              disabled={!selectedItem || !!busy}
              className="rounded bg-violet-500/20 px-3 py-1 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 disabled:opacity-40"
            >
              Apply
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="rounded px-2 text-white/50 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-4">
            {BUILDERS.map((cat) => (
              <div key={cat.category} className="mb-4">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {cat.category}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {cat.items.map((it) => (
                    <label
                      key={it.id}
                      className={
                        `flex items-center gap-2 rounded border px-2.5 py-1.5 text-left text-[11px] cursor-pointer transition-colors ` +
                        (selected === it.id
                          ? 'border-violet-400/60 bg-violet-500/15 text-violet-200'
                          : 'border-white/10 bg-white/5 text-white/80 hover:border-violet-400/40 hover:bg-violet-500/5') +
                        (busy ? ' pointer-events-none opacity-50' : '')
                      }
                    >
                      <input
                        type="radio"
                        name="brain-region"
                        value={it.id}
                        checked={selected === it.id}
                        onChange={() => setSelected(it.id)}
                        disabled={!!busy}
                        className="h-3 w-3 accent-violet-400"
                      />
                      <span className="flex-1 truncate">
                        {busy === it.id ? '⏳ ' : ''}{it.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[260px] shrink-0 border-l border-white/10 bg-black/20 p-3">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">Log</div>
            <div className="max-h-[60vh] overflow-y-auto font-mono text-[10px] text-white/60">
              {log.length === 0
                ? <div className="text-white/30">none yet</div>
                : log.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
