// 카메라 기반 학습 + Live Predict 공유 훅 — PredictPanel / CameraQuickControls 가 동시 사용.
// hand-feature 이벤트 구독 + featRef 보유 + train(N frame supervised) + live tick.

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { featuresToInputs } from '@/lib/mediapipe/input-mapper';

export const HAND_GESTURES = [
  { id: 'pointing', label: 'Pointing',  short: 'P', out: 'out_0' },
  { id: 'openpalm', label: 'Open palm', short: 'O', out: 'out_1' },
  { id: 'thumbsup', label: 'Thumbs up', short: 'T', out: 'out_2' },
  { id: 'victory',  label: 'Victory',   short: 'V', out: 'out_3' },
];

export interface LivePredictResult {
  winner: string | null;
  rates: Record<string, number>;
  confidence: number;
}

const TRAIN_FRAMES = 30;
const TRAIN_INTERVAL_MS = 80;
const PREDICT_INTERVAL_MS = 600;

export function useHandControl(cameraConnected: boolean) {
  const [hasHand, setHasHand] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [trainStatus, setTrainStatus] = useState<string>('');
  const [livePredict, setLivePredict] = useState(false);
  const [liveResult, setLiveResult] = useState<LivePredictResult | null>(null);

  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);

  // hand-feature 이벤트 구독 → 최신 feature ref + UI state 동기.
  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      featRef.current = d.feature;
      hasHandRef.current = d.hasHand;
      setHasHand(d.hasHand);
    });
    return off;
  }, []);

  // N frame 캡처 → supervised STDP.
  const train = async (gestureId: string, targetOut: string, label: string) => {
    if (busy || !cameraConnected) return;
    setBusy(gestureId);
    setTrainStatus(`${label} 학습 시작 — 손 자세 유지`);
    const patterns: number[][] = [];
    for (let i = 0; i < TRAIN_FRAMES; i += 1) {
      let waited = 0;
      while (!hasHandRef.current || !featRef.current) {
        if (waited > 3000) break;
        await new Promise((r) => setTimeout(r, 50));
        waited += 50;
      }
      if (!hasHandRef.current || !featRef.current) {
        setTrainStatus(`✗ ${label}: 손 미감지 (${i}/${TRAIN_FRAMES})`);
        break;
      }
      patterns.push(featuresToInputs(featRef.current));
      setTrainStatus(`${label} 캡처 ${i + 1}/${TRAIN_FRAMES}…`);
      await new Promise((r) => setTimeout(r, TRAIN_INTERVAL_MS));
    }
    if (patterns.length === 0) { setBusy(null); return; }
    setTrainStatus(`${label} 학습 진행 ${patterns.length} 패턴…`);
    const r = await getClient().trainHandGesture(patterns, targetOut, (done, total) => {
      setTrainStatus(`${label} 학습 ${done}/${total}…`);
    });
    setTrainStatus(r.ok ? `✓ ${label} 학습 완료 (${r.data.trained} 패턴)` : `✗ ${label}: ${r.reason}`);
    setBusy(null);
  };

  // Live predict — 600ms 주기 inject_pattern.
  useEffect(() => {
    if (!livePredict || !cameraConnected) return;
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      if (hasHandRef.current && featRef.current) {
        const pattern = featuresToInputs(featRef.current);
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (cancelled) return;
        if (r.ok) {
          const rates = (r.data.out_rates || {}) as Record<string, number>;
          let winner: string | null = null;
          let max = 0;
          let total = 0;
          for (const [k, v] of Object.entries(rates)) {
            total += v;
            if (v > max) { max = v; winner = k; }
          }
          setLiveResult({ winner, rates, confidence: total > 0 ? max / total : 0 });
        }
      } else {
        setLiveResult(null);
      }
      if (!cancelled) setTimeout(tick, PREDICT_INTERVAL_MS);
    };
    tick();
    return () => { cancelled = true; };
  }, [livePredict, cameraConnected]);

  return {
    hasHand,
    busy,
    trainStatus,
    livePredict,
    liveResult,
    train,
    setLivePredict,
    setTrainStatus,
  };
}
