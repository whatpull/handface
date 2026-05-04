'use client';

interface StatsData {
  region_summary?: Record<string, {
    neuron_count?: number;
    avg_rate?: number;
    avg_v?: number;
  }>;
  // backend 가 다른 형식 반환 시 raw 표시.
  [k: string]: unknown;
}

interface StatsPanelProps {
  open: boolean;
  data: StatsData | null;
  onClose: () => void;
}

export default function StatsPanel({ open, data, onClose }: StatsPanelProps) {
  if (!open) return null;
  const summary = (data?.region_summary as StatsData['region_summary']) || null;

  return (
    <div
      className="absolute right-0 top-0 z-30 h-full w-[320px] max-w-[90vw] overflow-y-auto border-l border-white/10 bg-[#0f1117]/95 p-4 shadow-2xl"
      role="dialog"
      aria-label="Stats panel"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-violet-300">CIRCUIT STATS</span>
        <button
          type="button"
          aria-label="Close stats"
          onClick={onClose}
          className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>
      {!data && (
        <div className="font-mono text-[11px] text-white/50">No stats yet — Stats 버튼 클릭.</div>
      )}
      {summary && (
        <div className="space-y-2">
          {Object.entries(summary).map(([region, s]) => (
            <div
              key={region}
              className="rounded border border-white/10 bg-black/20 px-3 py-2 font-mono text-[11px]"
            >
              <div className="mb-1 text-[10px] font-semibold tracking-wider text-violet-300">
                {region}
              </div>
              <div className="flex justify-between text-white/70">
                <span>neurons</span>
                <span>{s.neuron_count ?? '—'}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>avg rate</span>
                <span>{s.avg_rate?.toFixed(2) ?? '—'} Hz</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>avg V</span>
                <span>{s.avg_v?.toFixed(2) ?? '—'} mV</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {data && !summary && (
        <pre className="overflow-x-auto rounded border border-white/10 bg-black/30 p-2 text-[10px] text-white/70">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
