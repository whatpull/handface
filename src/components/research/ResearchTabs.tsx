'use client';

// ResearchTabs — P213 / P214a / P214b / P214c / P218 통합 탭 컨테이너.
// P218 (2026-05-20) — 5×5 capacity (n14_extended) 영역 추가.

import { type ReactNode, useState } from 'react';
import P213Panel from './P213Panel';
import P214aPanel from './P214aPanel';
import P214bPanel from './P214bPanel';
import P214cPanel from './P214cPanel';
import P218Panel from './P218Panel';

type Tab = 'p213' | 'p214a' | 'p214b' | 'p214c' | 'p218';

interface TabBtnProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

function TabButton({ active, onClick, children }: TabBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ' +
        (active
          ? 'border-violet-500 text-white'
          : 'border-transparent text-[#8888aa] hover:text-[#ccc]')
      }
    >
      {children}
    </button>
  );
}

export default function ResearchTabs() {
  const [tab, setTab] = useState<Tab>('p213');
  return (
    <div>
      <div className="flex gap-2 mb-4 border-b border-[#2a2a38] flex-wrap">
        <TabButton active={tab === 'p213'} onClick={() => setTab('p213')}>P213 — 표준 패턴</TabButton>
        <TabButton active={tab === 'p214a'} onClick={() => setTab('p214a')}>P214a — 유사 패턴</TabButton>
        <TabButton active={tab === 'p214b'} onClick={() => setTab('p214b')}>P214b — 확장 N</TabButton>
        <TabButton active={tab === 'p214c'} onClick={() => setTab('p214c')}>P214c — 강도 sweep</TabButton>
        <TabButton active={tab === 'p218'} onClick={() => setTab('p218')}>P218 — 5×5 capacity</TabButton>
      </div>
      {tab === 'p213' && <P213Panel />}
      {tab === 'p214a' && <P214aPanel />}
      {tab === 'p214b' && <P214bPanel />}
      {tab === 'p214c' && <P214cPanel />}
      {tab === 'p218' && <P218Panel />}
    </div>
  );
}
