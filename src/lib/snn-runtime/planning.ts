// Phase P — Planning (완벽한 인공지능 11 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 11 단계.
// Phase O Reasoning 다음. goal-directed planning + HTN (Hierarchical Task Network).
//
// 학술 정합:
//   - Sacerdoti 1975 — A structure for plans and behavior.
//   - Erol et al. 1994 — HTN planning complexity.
//   - Russell & Norvig — AIMA planning (STRIPS, PDDL).
//   - Newell & Simon 1972 — Human Problem Solving (means-ends analysis).
//   - Schank & Abelson 1977 — Scripts (stereotypical action sequences).

// ── 1. Goal Representation ──

export interface PlanState {
  facts: Set<string>; // current world state (predicates)
}

export interface Goal {
  desiredFacts: string[];   // 영역 영역 영역 facts (모두 true 영역)
  forbiddenFacts: string[]; // 영역 영역 영역 facts (모두 false 영역)
}

export function isGoalSatisfied(state: PlanState, goal: Goal): boolean {
  for (const f of goal.desiredFacts) if (!state.facts.has(f)) return false;
  for (const f of goal.forbiddenFacts) if (state.facts.has(f)) return false;
  return true;
}

// ── 2. Action (STRIPS, Fikes & Nilsson 1971) ──

export interface Action {
  name: string;
  preconditions: string[]; // facts 영역 영역 영역 영역
  addEffects: string[];    // 실행 후 추가 영역 facts
  removeEffects: string[]; // 실행 후 영역 영역 facts
  cost: number;
}

export function canApply(state: PlanState, action: Action): boolean {
  for (const pre of action.preconditions) if (!state.facts.has(pre)) return false;
  return true;
}

export function applyAction(state: PlanState, action: Action): PlanState {
  const newFacts = new Set(state.facts);
  for (const f of action.removeEffects) newFacts.delete(f);
  for (const f of action.addEffects) newFacts.add(f);
  return { facts: newFacts };
}

// ── 3. Forward Search Planner (BFS, optimal) ──

export interface Plan {
  actions: Action[];
  totalCost: number;
  goalReached: boolean;
}

export function planForward(
  initial: PlanState,
  goal: Goal,
  actions: ReadonlyArray<Action>,
  maxDepth: number = 10,
): Plan | null {
  if (isGoalSatisfied(initial, goal)) {
    return { actions: [], totalCost: 0, goalReached: true };
  }
  // BFS — guarantees shortest plan (optimal).
  const queue: { state: PlanState; path: Action[]; cost: number }[] = [
    { state: initial, path: [], cost: 0 },
  ];
  const visited = new Set<string>();
  visited.add([...initial.facts].sort().join('|'));
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node.path.length >= maxDepth) continue;
    for (const action of actions) {
      if (!canApply(node.state, action)) continue;
      const nextState = applyAction(node.state, action);
      const stateKey = [...nextState.facts].sort().join('|');
      if (visited.has(stateKey)) continue;
      visited.add(stateKey);
      const newPath = [...node.path, action];
      const newCost = node.cost + action.cost;
      if (isGoalSatisfied(nextState, goal)) {
        return { actions: newPath, totalCost: newCost, goalReached: true };
      }
      queue.push({ state: nextState, path: newPath, cost: newCost });
    }
  }
  return null;
}

// ── 4. HTN Planning (Sacerdoti 1975) ──

export interface HTNTask {
  name: string;
  isPrimitive: boolean;
  subTasks?: string[]; // composite task → sub-task names
  primitiveAction?: Action; // primitive task → executable action
}

// HTN decomposition — composite task 영역 sub-tasks 영역 영역.
// 학술 정합: hierarchical decomposition.
export function decomposeHTN(
  taskName: string,
  taskRegistry: ReadonlyMap<string, HTNTask>,
): Action[] | null {
  const task = taskRegistry.get(taskName);
  if (!task) return null;
  if (task.isPrimitive) {
    return task.primitiveAction ? [task.primitiveAction] : null;
  }
  if (!task.subTasks) return [];
  const result: Action[] = [];
  for (const sub of task.subTasks) {
    const subActions = decomposeHTN(sub, taskRegistry);
    if (!subActions) return null;
    result.push(...subActions);
  }
  return result;
}

// ── 5. Means-Ends Analysis (Newell & Simon 1972) ──

// 영역 영역 영역 (goal facts not in state) 영역 영역 영역 action 영역.
// 학술 정합: GPS (General Problem Solver) 1959 origins.
export function findRelevantActions(
  state: PlanState,
  goal: Goal,
  actions: ReadonlyArray<Action>,
): Action[] {
  const missing = goal.desiredFacts.filter((f) => !state.facts.has(f));
  if (missing.length === 0) return [];
  return actions.filter((a) => a.addEffects.some((eff) => missing.includes(eff)));
}

// ── 6. Plan Execution Monitoring ──

export interface ExecutionResult {
  step: number;
  action: string;
  succeeded: boolean;
  resultingState: PlanState;
}

export function executePlan(
  initial: PlanState,
  plan: Plan,
  simulationStep: (s: PlanState, a: Action) => PlanState = applyAction,
): ExecutionResult[] {
  const results: ExecutionResult[] = [];
  let state = initial;
  for (let i = 0; i < plan.actions.length; i += 1) {
    const action = plan.actions[i];
    if (!canApply(state, action)) {
      results.push({ step: i, action: action.name, succeeded: false, resultingState: state });
      break;
    }
    state = simulationStep(state, action);
    results.push({ step: i, action: action.name, succeeded: true, resultingState: state });
  }
  return results;
}
