'use client';

import { useEffect, useState } from 'react';
import { onBackendEvent, type NeuronFiringDetail } from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';

const OUT_LABELS: Record<string, string> = {
  out_0: 'Pointing',
  out_1: 'Open palm',
  out_2: 'Thumbs up',
  out_3: 'Victory',
};
const RL_WINNER_HZ = 5;

export default function RlFeedbackPanel() {
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerRate, setWinnerRate] = useState<number>(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const rates = d.rates || {};
      let w: string | null = null;
      let max = 0;
      for (const [k, v] of Object.entries(rates)) {
        if (k.startsWith('out_') && v >= RL_WINNER_HZ && v > max) { max = v; w = k; }
      }
      if (w) {
        setWinner(w);
        setWinnerRate(max);
        setMsg('');
      }
    });
    return off;
  }, []);

  const sendFeedback = async (correct: boolean) => {
    if (!winner) return;
    setBusy(true);
    setMsg(correct ? '✓ feedback +1…' : 'choose target…');
    let target = winner;
    if (!correct) {
      const sel = window.prompt(
        `winner ${winner} 가 틀렸습니다. 정답 OUT (out_0/out_1/out_2/out_3) 입력:`,
        'out_0',
      );
      if (!sel || !/^out_[0-3]$/.test(sel)) {
        setMsg('cancelled');
        setBusy(false);
        return;
      }
      target = sel;
    }
    const client = getClient();
    const reward = correct ? +1.0 : -1.0;
    const r = await fetch(`${client.endpoint}/networks/${client.networkId}/rl/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(client.apiKey ? { 'x-api-key': client.apiKey } : {}),
      },
      body: JSON.stringify({ reward, target_out: target, observe_ms: 30, supervisor_weight: 60 }),
    });
    setMsg(r.ok ? `✓ ${correct ? '+1' : '-1'} → ${OUT_LABELS[target] || target}` : `✗ ${r.status}`);
    setBusy(false);
    if (r.ok) setTimeout(() => { setWinner(null); setMsg(''); }, 2000);
  };

  if (!winner) return null;
  return (
    <div className="pointer-events-auto absolute bottom-12 left-1/2 z-20 -translate-x-1/2 rounded-md border border-violet-400/30 bg-[#0f1117]/95 px-3 py-2 shadow-2xl">
      <div className="flex items-center gap-3 font-mono text-[11px]">
        <span className="text-white/50">Winner:</span>
        <span className="font-semibold text-violet-200">
          {OUT_LABELS[winner] || winner} ({winnerRate.toFixed(0)} Hz)
        </span>
        <button
          type="button"
          disabled={busy}
          onClick={() => sendFeedback(true)}
          className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-200 ring-1 ring-emerald-400/40 hover:bg-emerald-500/30 disabled:opacity-50"
        >
          ✅ 맞음
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => sendFeedback(false)}
          className="rounded bg-rose-500/20 px-2 py-0.5 text-rose-200 ring-1 ring-rose-400/40 hover:bg-rose-500/30 disabled:opacity-50"
        >
          ❌ 틀림
        </button>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setWinner(null)}
          className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>
      {msg && <div className="mt-1 text-[10px] text-white/50">{msg}</div>}
    </div>
  );
}
