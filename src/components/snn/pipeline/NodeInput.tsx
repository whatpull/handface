'use client';

// NodeInput — INPUT 노드 (제스처 입력).
// HandTrackerHost 영역 mount 영역 selector (#snn-cam-video / #snn-cam-skel /
// .snn-feat-bars) 영역 보존 — 본 노드 영역 DOM 영역 동일.
// MediaPipe gesture name + conf 표시.

import { useEffect, useState } from 'react';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { FEATURE_LABELS } from '@/lib/mediapipe/feature-encoder';
import NodeShell from './NodeShell';

export default function NodeInput({ cameraConnected }: { cameraConnected: boolean }) {
  const [feat, setFeat] = useState<HandFeatureDetail | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  // feature 막대 ref — HandTrackerHost 영역 .snn-feat-bars 영역 selector 로 직접 갱신.

  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => setFeat(d));
    return off;
  }, []);

  // tooltip 부여 — bars 영역 mount 후 1회.
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>('.snn-pipeline-input .snn-feat-bar');
    bars.forEach((bar, i) => { bar.title = FEATURE_LABELS[i] || `feat ${i}`; });
  }, []);

  const gestureLine = feat
    ? (feat.hasHand
        ? (feat.gestureName ? `${feat.gestureName} (${((feat.gestureScore || 0) * 100).toFixed(0)}%)` : 'no gesture')
        : 'no hand')
    : (cameraConnected ? 'starting…' : 'camera off');

  return (
    <NodeShell title="INPUT" subtitle="제스처 입력" tone="input"
      collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}>
      <div className="snn-pipeline-input">
        <div className="snn-pipeline-cam">
          <video id="snn-cam-video" className="snn-camera-mirror snn-cam-video" playsInline muted />
          <canvas id="snn-cam-skel" className="snn-camera-mirror snn-cam-skel" width={640} height={480} />
          <div id="snn-cam-empty" className="snn-pipeline-cam-empty">
            <div>Camera disabled</div>
            <div className="snn-pipeline-cam-hint">Enable from sidebar</div>
          </div>
        </div>
        <div className="snn-pipeline-row">
          <span className="snn-pipeline-row-label">gesture</span>
          <span className="snn-pipeline-row-value">{gestureLine}</span>
        </div>
        <div className="snn-pipeline-feat-wrap">
          <div className="snn-pipeline-feat-title">16-dim feature</div>
          <div className="snn-feat-bars snn-pipeline-feat-bars">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="snn-feat-bar" data-i={i}>
                <div className="snn-feat-bar-fill" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </NodeShell>
  );
}
