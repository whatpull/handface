'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  loadExemplars, subscribeExemplars, setExemplarLabel, displayLabel,
  type OutExemplar, type OutExemplars,
} from '@/lib/snn/out-exemplars';
import { getClient } from '@/lib/backend/client';

// N3 본격 회로 = 4 cluster × 8 OUT (out_{ci}_{idx}). cluster 의 첫 OUT (out_X_0) 에만
// 라벨/count UI mount — cluster 대표 영역. backward compat 으로 out_0..3 도 인식.
const OUT_KEYS = [
  'out_0_0', 'out_1_0', 'out_2_0', 'out_3_0',
  'out_0', 'out_1', 'out_2', 'out_3',
];

// 4개 OUT 노드 안 .snn-out-label-mount 에 React portal 로 라벨 + count + ✎ rename UI 마운트.
// 발견된 패턴에 사용자가 의미 부여 (예: "Pattern #2" → "Pointing").
export default function OutNodeOverlay() {
  const [hosts, setHosts] = useState<Record<string, HTMLElement>>({});
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars());

  useEffect(() => subscribeExemplars(setExemplars), []);

  // mount poll — drawflow 노드 생성 후 등장.
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const tick = () => {
      if (cancelled) return;
      const found: Record<string, HTMLElement> = {};
      document.querySelectorAll<HTMLElement>('.snn-out-label-mount').forEach((el) => {
        const key = el.dataset.outKey;
        if (key && OUT_KEYS.includes(key)) found[key] = el;
      });
      if (Object.keys(found).length === OUT_KEYS.length) {
        setHosts(found);
      } else if (attempts < 300) {
        attempts += 1;
        requestAnimationFrame(tick);
      } else if (Object.keys(found).length > 0) {
        setHosts(found);
      }
    };
    tick();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {Object.entries(hosts).map(([key, host]) => (
        createPortal(
          <OutLabelEditor key={key} outKey={key} ex={exemplars[key]} />,
          host,
        )
      ))}
    </>
  );
}

interface EditorProps {
  outKey: string;
  ex: OutExemplar | undefined;
}

function OutLabelEditor({ outKey, ex }: EditorProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      setDraft(ex?.label ?? '');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing, ex?.label]);

  const commit = () => {
    const trimmed = draft.trim();
    const newLabel = trimmed.length === 0 ? null : trimmed;
    setExemplarLabel(outKey, newLabel);
    setEditing(false);
    // 라벨이 있으면 D1 community 에 기여 — 라벨링된 패턴은 가치가 높음.
    if (newLabel && ex && ex.lastFeature.length > 0) {
      const cid = readContributorId();
      void getClient().contributeExemplar(outKey, ex.lastFeature, newLabel, cid).catch(() => null);
    }
  };

  const cancel = () => setEditing(false);

  const label = displayLabel(outKey, ex);
  const count = ex?.count ?? 0;

  return (
    <div className="snn-out-label">
      {editing ? (
        <div className="snn-out-label-edit">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            maxLength={32}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); commit(); }
              else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
            }}
            className="snn-out-label-input"
            placeholder="이름..."
          />
        </div>
      ) : (
        <button
          type="button"
          className={`snn-out-label-display ${ex?.label ? 'snn-out-label-display--named' : ''}`}
          onClick={() => setEditing(true)}
          title="클릭하여 이름 변경"
        >
          <span className="snn-out-label-text">{label}</span>
          {count > 0 && <span className="snn-out-label-count">{count}</span>}
          <svg className="snn-out-label-pen" width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2 10v-2l6-6 2 2-6 6H2z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

function readContributorId(): string {
  if (typeof window === 'undefined') return 'anon';
  try {
    return localStorage.getItem('handface.community.contributor.id') || 'anon';
  } catch { return 'anon'; }
}
