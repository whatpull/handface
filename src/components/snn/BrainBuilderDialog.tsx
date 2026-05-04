'use client';

import { useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { emitBackendEvent } from '@/lib/backend/events';

interface BrainBuilderDialogProps {
  open: boolean;
  onClose: () => void;
}

// 백엔드 build 라우트 카탈로그. 카드 카테고리별 그룹화.
const BUILDERS: Array<{ category: string; items: Array<{ id: string; label: string; path: string; body?: object }> }> = [
  {
    category: 'Hippocampus',
    items: [
      { id: 'hippo',    label: 'Hippocampus (CA3 + CA1)', path: '/hippocampus/build' },
      { id: 'dg',       label: 'Dentate Gyrus',          path: '/hippocampus/dg_build' },
      { id: 'ec',       label: 'Entorhinal Cortex',       path: '/entorhinal/build' },
      { id: 'spatial',  label: 'Place + Grid cells',      path: '/spatial/build' },
    ],
  },
  {
    category: 'Cortex',
    items: [
      { id: 'pfc',     label: 'PFC',                     path: '/pfc/build' },
      { id: 'acc',     label: 'ACC',                     path: '/acc/build' },
      { id: 'insula',  label: 'Insula',                  path: '/insula/build' },
      { id: 'sma',     label: 'SMA',                     path: '/sma/build' },
      { id: 'premotor', label: 'Premotor',               path: '/premotor/build' },
      { id: 'm1',      label: 'M1 (motor)',              path: '/m1/build' },
      { id: 's1',      label: 'S1 (somatosensory)',      path: '/s1/build' },
      { id: 'fef',     label: 'FEF (frontal eye field)', path: '/fef/build' },
      { id: 'tpj',     label: 'TPJ',                     path: '/tpj/build' },
      { id: 'rsc',     label: 'RSC',                     path: '/rsc/build' },
      { id: 'ofc',     label: 'OFC',                     path: '/ofc/build' },
      { id: 'mirror',  label: 'Mirror neurons',          path: '/mirror_neurons/build' },
    ],
  },
  {
    category: 'Visual',
    items: [
      { id: 'ventral',  label: 'Ventral stream',         path: '/ventral_stream/build' },
      { id: 'dorsal',   label: 'Dorsal stream',          path: '/dorsal_stream/build' },
      { id: 'lgn',      label: 'LGN',                    path: '/lgn/build' },
      { id: 'v4_color', label: 'V4 color',               path: '/v4_color/build' },
    ],
  },
  {
    category: 'Subcortical',
    items: [
      { id: 'amg',      label: 'Amygdala',               path: '/amygdala/build' },
      { id: 'bg',       label: 'Basal Ganglia',          path: '/basal_ganglia/build' },
      { id: 'crb',      label: 'Cerebellum',             path: '/cerebellum/build' },
      { id: 'thal',     label: 'Thalamus',               path: '/thalamus/build' },
      { id: 'hypo',     label: 'Hypothalamus',           path: '/hypothalamus/build' },
      { id: 'striatum', label: 'Striatum tail',          path: '/striatum_tail/build' },
      { id: 'caudate',  label: 'Caudate-Putamen',        path: '/caudate-putamen/build' },
      { id: 'gp',       label: 'Globus Pallidus',        path: '/globus-pallidus/build' },
      { id: 'stn',      label: 'Subthalamic Nucleus',    path: '/stn/build' },
      { id: 'snc',      label: 'SNc',                    path: '/snc/build' },
      { id: 'mb',       label: 'Mammillary Body',        path: '/mb/build' },
      { id: 'habenula', label: 'Habenula',               path: '/habenula/build' },
      { id: 'sc',       label: 'Superior Colliculus',    path: '/sc/build' },
    ],
  },
  {
    category: 'Brainstem & Modulators',
    items: [
      { id: 'brainstem',label: 'Brainstem',              path: '/brainstem/build' },
      { id: 'lc',       label: 'Locus Coeruleus (NE)',   path: '/lc/build' },
      { id: 'bf',       label: 'Basal Forebrain (ACh)',  path: '/bf/build' },
      { id: 'raphe',    label: 'Raphe (5-HT)',           path: '/raphe/build' },
      { id: 'reward',   label: 'Reward (VTA)',           path: '/reward/build' },
      { id: 'reticular',label: 'Reticular',              path: '/reticular/build' },
    ],
  },
  {
    category: 'Other',
    items: [
      { id: 'spinal',   label: 'Spinal Cord',            path: '/spinal/build' },
      { id: 'auditory', label: 'Auditory Cortex',        path: '/auditory_cortex/build' },
      { id: 'olfactory',label: 'Olfactory',              path: '/olfactory/build' },
      { id: 'language', label: 'Language',               path: '/language/build' },
      { id: 'astro',    label: 'Astrocytes',             path: '/astrocytes/build' },
      { id: 'sn',       label: 'Substantia Nigra',       path: '/sn/build' },
      { id: 'dmn',      label: 'Default Mode Network',   path: '/dmn/build' },
    ],
  },
];

export default function BrainBuilderDialog({ open, onClose }: BrainBuilderDialogProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  if (!open) return null;

  const buildOne = async (id: string, path: string, body: object = {}) => {
    setBusy(id);
    const client = getClient();
    const net = await client.ensureNetwork();
    if (!net.ok) {
      setLog((l) => [...l, `✗ ${id}: ${net.reason}`]);
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
        setLog((l) => [...l, `✓ ${id} +${added}`]);
        emitBackendEvent('circuit-changed', {});
      } else {
        setLog((l) => [...l, `✗ ${id}: HTTP ${r.status} ${(data.detail || data.reason || '').toString().slice(0, 60)}`]);
      }
    } catch (e) {
      setLog((l) => [...l, `✗ ${id}: ${(e as Error).message}`]);
    } finally {
      setBusy(null);
    }
  };

  const buildAll = async () => {
    for (const cat of BUILDERS) {
      for (const item of cat.items) {
        await buildOne(item.id, item.path, item.body);
      }
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
          <span id="brain-dialog-title" className="text-xs font-semibold tracking-wider text-violet-300">
            🧠 BRAIN BUILDER
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={buildAll}
              disabled={!!busy}
              className="rounded bg-violet-500/20 px-3 py-1 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 disabled:opacity-50"
            >
              Build All
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
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => buildOne(it.id, it.path, it.body)}
                      disabled={!!busy}
                      className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-left text-[11px] text-white/80 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200 disabled:opacity-50"
                    >
                      {busy === it.id ? '⏳ ' : '+ '}{it.label}
                    </button>
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
