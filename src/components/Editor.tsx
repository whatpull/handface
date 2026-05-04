'use client';

import { useState } from 'react';
import Sidebar from '@/components/snn/Sidebar';
import Toolbar from '@/components/snn/Toolbar';
import Canvas from '@/components/snn/Canvas';
import SettingsPanel from '@/components/snn/SettingsPanel';
import './snn-canvas.css';

export default function Editor() {
  const [editMode, setEditMode] = useState(false);
  const [cameraConnected, setCameraConnected] = useState(false);
  const [view, setView] = useState<'region' | 'neuron'>('neuron');
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-dvh w-dvw flex-col bg-[#0a0a0c] text-white">
      <header className="flex items-center justify-between border-b border-white/5 bg-[#0d0d10]/95 px-4 py-2">
        <span className="text-sm font-semibold tracking-wider">HandFace</span>
        <span className="text-[11px] text-white/40">Neural Mesh Editor</span>
      </header>
      <div className="flex flex-1 min-h-0">
        <Sidebar
          cameraConnected={cameraConnected}
          onToggleCamera={() => setCameraConnected((v) => !v)}
          editMode={editMode}
          onToggleEdit={() => setEditMode((v) => !v)}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <main className="relative flex flex-1 flex-col min-w-0">
          <Toolbar view={view} onViewChange={setView} />
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <Canvas editMode={editMode} cameraConnected={cameraConnected} />
          </div>
        </main>
      </div>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
