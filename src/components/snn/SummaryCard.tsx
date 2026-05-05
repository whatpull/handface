'use client';

// SummaryCard — dashboard panel (visual signature redesign 2026-05-05).
//
// 본격 redesign (사용자 명시 99점 path):
//   - 3 카드 (CLUSTERS / MARGIN / FRAMES) 영역 icon SVG + mini sparkline + gradient bg.
//   - value font 28px (직전 24px) + tracking -0.025em + tabular-nums (number tick 영역 정합).
//   - delta pill 영역 우측 상단 flex absolute (사용자 catch — "delta indicator").
//   - sparkline 영역 SVG path (값 대부분 영역 누적 영역) — flat 0 영역 polish ↑.
//   - hover translateY-2 + tone glow ↑ (snn-canvas.css 정합).
//
// 정직 한계 명시:
//  - sparkline 영역 sliding window (last 20 sample) 영역 — 누적 0 영역 idle 영역 flat 영역.
//  - delta % 영역 직전 sample 일부 — backend 영역 절대 정확도 영역 0 (margin proxy).

import { useEffect, useRef, useState } from 'react';
import { onBackendEvent, type TrainingPhaseDetail } from '@/lib/backend/events';
import { usePipelineEvents } from './pipeline/PipelineEventContext';
import { CLUSTER_TARGET } from './pipeline/shared';

const SPARK_WINDOW = 20;
const SPARK_W = 64;
const SPARK_H = 18;

export default function SummaryCard() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);

  const { winner, lastFiringTimestamp } = usePipelineEvents();

  const [firings, setFirings] = useState(0);
  useEffect(() => {
    if (lastFiringTimestamp !== null) setFirings((n) => n + 1);
  }, [lastFiringTimestamp]);

  // sparkline history — last 20 sample (clusters / margin / frames).
  const [clusterHist, setClusterHist] = useState<number[]>([]);
  const [marginHist, setMarginHist] = useState<number[]>([]);
  const [framesHist, setFramesHist] = useState<number[]>([]);

  const trainedCount = phase
    ? Object.values(phase.clusterFrames).filter((f) => f >= (phase.target || CLUSTER_TARGET)).length
    : 0;
  const accuracy = winner.cluster !== null ? Math.round(winner.margin * 1000) / 10 : 0;

  // sample tick — every firing (or phase change) 영역 sparkline buffer 영역 push.
  const lastFiringRef = useRef<number | null>(null);
  useEffect(() => {
    if (lastFiringTimestamp === lastFiringRef.current) return;
    lastFiringRef.current = lastFiringTimestamp;
    setClusterHist((h) => [...h.slice(-SPARK_WINDOW + 1), trainedCount]);
    setMarginHist((h) => [...h.slice(-SPARK_WINDOW + 1), accuracy]);
    setFramesHist((h) => [...h.slice(-SPARK_WINDOW + 1), firings]);
  }, [lastFiringTimestamp, trainedCount, accuracy, firings]);

  const phaseTag = phase?.phase || 'untrained';

  return (
    <div className="snn-summary-cards" aria-label="HandFace pipeline summary">
      <SummaryCardItem
        tone="cyan"
        label="Clusters"
        value={`${trainedCount}/4`}
        delta={trainedCount === 4 ? 'TRAINED' : `${4 - trainedCount} pending`}
        deltaCls={trainedCount === 4 ? 'is-up' : 'is-warn'}
        icon={<IconClusters />}
        spark={clusterHist}
        sparkMax={4}
      />
      <SummaryCardItem
        tone="amber"
        label="Margin"
        value={`${accuracy.toFixed(1)}%`}
        delta={winner.cluster !== null ? `→ C${winner.cluster}` : 'no winner'}
        deltaCls={accuracy >= 50 ? 'is-up' : accuracy >= 20 ? 'is-warn' : 'is-down'}
        icon={<IconMargin />}
        spark={marginHist}
        sparkMax={100}
      />
      <SummaryCardItem
        tone="violet"
        label="Frames"
        value={firings.toLocaleString()}
        delta={phaseTag}
        deltaCls="is-up"
        icon={<IconFrames />}
        spark={framesHist}
        sparkMax={Math.max(1, ...framesHist)}
      />
    </div>
  );
}

interface ItemProps {
  tone: 'cyan' | 'amber' | 'violet';
  label: string;
  value: string;
  delta: string;
  deltaCls: 'is-up' | 'is-warn' | 'is-down';
  icon: React.ReactNode;
  spark: number[];
  sparkMax: number;
}

function SummaryCardItem({ tone, label, value, delta, deltaCls, icon, spark, sparkMax }: ItemProps) {
  return (
    <article className={`snn-summary-card snn-summary-card--${tone}`}>
      <div className="snn-summary-card-head">
        <div className="snn-summary-card-icon" aria-hidden>{icon}</div>
        <div className="snn-summary-card-label">{label}</div>
        <div className={`snn-summary-card-delta ${deltaCls}`}>{delta}</div>
      </div>
      <div className="snn-summary-card-value">{value}</div>
      <Sparkline data={spark} max={sparkMax} tone={tone} />
    </article>
  );
}

function Sparkline({ data, max, tone }: { data: number[]; max: number; tone: 'cyan' | 'amber' | 'violet' }) {
  if (data.length < 2) {
    return (
      <svg className="snn-summary-card-spark" viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1={SPARK_H - 1} x2={SPARK_W} y2={SPARK_H - 1}
          stroke={`var(--spark-${tone})`} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    );
  }
  const m = max <= 0 ? 1 : max;
  const step = SPARK_W / Math.max(1, data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = SPARK_H - 1 - (Math.min(v, m) / m) * (SPARK_H - 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = `M${pts.join(' L')}`;
  const areaPath = `M0,${SPARK_H} L${pts.join(' L')} L${SPARK_W},${SPARK_H} Z`;
  return (
    <svg className="snn-summary-card-spark" viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} preserveAspectRatio="none" aria-hidden>
      <path d={areaPath} fill={`var(--spark-${tone}-fill)`} opacity="0.35" />
      <path d={linePath} fill="none" stroke={`var(--spark-${tone})`} strokeWidth="1.4"
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function IconClusters() {
  // 4 cell grid icon — cluster 4 영역 visual signature.
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}
function IconMargin() {
  // triangle chevron — margin/confidence indicator.
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2 L12 11 L2 11 Z" stroke="currentColor" strokeWidth="1.2"
        strokeLinejoin="round" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}
function IconFrames() {
  // clock/timer — frames counter.
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4 L7 7 L9.5 8.4" stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
