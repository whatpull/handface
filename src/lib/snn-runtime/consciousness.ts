// Phase G — Consciousness Architecture (완벽한 인공지능 2 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 2 단계.
// Phase F (Multi-Modality) 다음. Global Workspace Theory (Baars 1988) 정합
// architecture — 단일 percept emergence + working memory + attention modulation.
//
// 본 모듈 building blocks (pure functions):
//   1. Global Workspace — 한 시점 영역 winner 영역 영역 영역 broadcast.
//   2. Competitive Selection — substrate / modality 들 영역 attention 영역 경쟁.
//   3. Working Memory — 최근 N 시점 winner 영역 sustained activation buffer.
//   4. Top-down Attention — task context 영역 영역 input gating modulation.
//   5. Integrated Information (Φ) — Tononi IIT 정합 metric.
//
// 학술 정합:
//   - Baars 1988 — Global Workspace Theory.
//   - Dehaene & Naccache 2001 — Global neuronal workspace.
//   - Tononi 2008 — Integrated Information Theory (IIT).
//   - Posner & Petersen 1990 — Attention network.
//   - Cowan 2001 — Working memory capacity (~4 chunks).

// ── 1. Global Workspace ──

export interface WorkspaceEntry {
  source: string;          // 어느 substrate / modality 영역 emit (예: '4x4', 'audio')
  content: number;         // winner cluster id 또는 pattern id
  salience: number;        // 영역 정도 (0..1)
  timestamp: number;       // 발생 시점 (ms)
}

export interface GlobalWorkspaceState {
  currentBroadcast: WorkspaceEntry | null;
  history: WorkspaceEntry[];   // working memory buffer
}

// 새 candidate 영역 workspace 영역 입장 — 영역 broadcast 영역 비교 후 winner 영역.
// 학술 정합: Dehaene & Naccache 2001 — global ignition (winner 영역 영역
//   propagated to all areas).
export function admitToWorkspace(
  state: GlobalWorkspaceState,
  candidate: WorkspaceEntry,
): GlobalWorkspaceState {
  if (state.currentBroadcast === null || candidate.salience > state.currentBroadcast.salience) {
    // 영역 strong candidate → workspace 점유 + history 영역 영역 broadcast 영역 영역.
    const newHistory = state.currentBroadcast ? [...state.history, state.currentBroadcast] : state.history;
    return {
      currentBroadcast: candidate,
      history: newHistory,
    };
  }
  return state;
}

// ── 2. Competitive Selection ──

export interface SubstrateCandidate {
  source: string;
  content: number;
  salience: number;
}

// 여러 substrate 후보 → workspace winner 영역 선출.
// 학술 정합: Lamme 2006 — recurrent processing 영역 winner emergence.
//   highest salience candidate 영역 winner. tied → 첫 candidate.
export function competitiveSelect(
  candidates: ReadonlyArray<SubstrateCandidate>,
): SubstrateCandidate | null {
  if (candidates.length === 0) return null;
  let winner = candidates[0];
  for (let i = 1; i < candidates.length; i += 1) {
    if (candidates[i].salience > winner.salience) winner = candidates[i];
  }
  return winner;
}

// ── 3. Working Memory ──

export const WORKING_MEMORY_CAPACITY = 4; // Cowan 2001 — ~4 chunks (magical number).

// Sliding window — 최근 capacity 개 entry 만 유지.
export function pushToWorkingMemory(
  buffer: ReadonlyArray<WorkspaceEntry>,
  entry: WorkspaceEntry,
  capacity: number = WORKING_MEMORY_CAPACITY,
): WorkspaceEntry[] {
  const next = [...buffer, entry];
  if (next.length > capacity) return next.slice(next.length - capacity);
  return next;
}

// Decay — 오래된 entry 영역 영역 영역 영역 (Atkinson & Shiffrin 1968 short-term
// memory decay). 영역 entry 영역 timestamp 영역 영역 (now - ts) > decayMs 영역 제거.
export function decayWorkingMemory(
  buffer: ReadonlyArray<WorkspaceEntry>,
  now: number,
  decayMs: number = 5000,
): WorkspaceEntry[] {
  return buffer.filter((e) => (now - e.timestamp) < decayMs);
}

// Recall — 특정 source 영역 가장 최근 entry 영역 영역.
export function recallFromMemory(
  buffer: ReadonlyArray<WorkspaceEntry>,
  source: string,
): WorkspaceEntry | null {
  for (let i = buffer.length - 1; i >= 0; i -= 1) {
    if (buffer[i].source === source) return buffer[i];
  }
  return null;
}

// ── 4. Top-down Attention (task context → input gating) ──

export interface TaskContext {
  attendedSources: ReadonlyArray<string>; // 어느 substrate / modality 영역 집중할지
  gainBoost: number;                       // 영역 source 영역 salience boost factor
}

// task context 영역 candidate salience 영역 영역 — attended source 영역 boost.
// 학술 정합: Reynolds & Heeger 2009 — normalization model of attention (gain
//   modulation).
export function applyTopDownAttention(
  candidates: ReadonlyArray<SubstrateCandidate>,
  context: TaskContext,
): SubstrateCandidate[] {
  const attendedSet = new Set(context.attendedSources);
  return candidates.map((c) => ({
    ...c,
    salience: attendedSet.has(c.source) ? c.salience * context.gainBoost : c.salience,
  }));
}

// ── 5. Integrated Information (Φ) ──

// Tononi 2008 IIT 영역 핵심 metric — system 영역 영역 영역 영역 영역
// information 영역 part 영역 영역 영역 합산 영역 영역 영역 정보 영역 영역.
// 정확 Φ 계산 영역 NP-hard — 본 모듈 영역 simplified proxy 영역.
//
// Proxy: 영역 다양한 source 영역 동시에 활성 + 영역 영역 영역 통합된 영역 영역
// 영역 → 더 높은 Φ. 단순 entropy 영역 영역 영역 영역 영역.
//
// 입력: 여러 source 영역 활성도 (firing rate 영역).
// 출력: Φ proxy [0,1] — 0 = isolated, 1 = fully integrated.
export function integratedInformationProxy(
  sourceActivities: ReadonlyArray<{ source: string; activity: number }>,
): number {
  if (sourceActivities.length === 0) return 0;
  if (sourceActivities.length === 1) return 0; // single source 영역 integration 영역.
  let totalActivity = 0;
  let active = 0;
  for (const s of sourceActivities) {
    totalActivity += s.activity;
    if (s.activity > 0.1) active += 1;
  }
  const avgActivity = totalActivity / sourceActivities.length;
  // Φ proxy: (active sources fraction) × (avg activity)
  //   많은 source 가 동시 활성 + 평균 활성도 ↑ → integration ↑.
  return (active / sourceActivities.length) * Math.min(1, avgActivity);
}

// ── 6. Conscious Access Threshold ──

// Dehaene 2014 — conscious access threshold: salience 영역 임계 영역 영역 영역
// 영역 percept 영역 conscious access 영역. 영역 영역 → unconscious processing.
export const CONSCIOUS_ACCESS_THRESHOLD = 0.5;

export function isConsciouslyAccessed(entry: WorkspaceEntry, threshold: number = CONSCIOUS_ACCESS_THRESHOLD): boolean {
  return entry.salience >= threshold;
}
