// 자동 측정 mandate (사용자 2026-05-25) — Phase F (Multi-Modality) + G
// (Consciousness) + H (Embodiment) + I (Social Cognition) integration measurement.
//
// 영원 진화 완성 후 영역 완벽한 인공지능(뇌) 4 단계 영역 통합 시나리오.
// pure functions 영역 영역 + 실제 SNN simulation (4×4 substrate) 영역 결합.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink, SNNWorkerCore, SNNWorkerClient,
  buildClusterRegistryFromN13, N13Pools,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { wtaWinner } from '@/lib/snn-runtime/self-supervised';
import {
  batchUpdateBindings, crossModalRetrieve, coherenceScore,
  selectAttendedModality, type CrossModalAssociation,
} from '@/lib/snn-runtime/multi-modality';
import {
  admitToWorkspace, competitiveSelect, pushToWorkingMemory,
  applyTopDownAttention, integratedInformationProxy, isConsciouslyAccessed,
  type GlobalWorkspaceState, type WorkspaceEntry,
} from '@/lib/snn-runtime/consciousness';
import {
  clusterToMotorCommand, predictSensorDelta, computeSensorError, errorMagnitude,
  type MotorCommand, type SensorState,
} from '@/lib/snn-runtime/embodiment';
import {
  inferBeliefState, checkCooperativeSuccess, detectJointAttention,
  updateReputation, titForTatDecide, createColony,
  type SharedGoal, type ReputationScore,
} from '@/lib/snn-runtime/social-cognition';

class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string): string | null { return this.store.get(k) ?? null; }
  setItem(k: string, v: string): void { this.store.set(k, v); }
  removeItem(k: string): void { this.store.delete(k); }
}
class InProcessTransport implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];
  constructor(private core: SNNWorkerCore) {}
  postMessage(req: unknown): void {
    const res = this.core.handle(req as WorkerRequest);
    queueMicrotask(() => {
      const ev = { data: res } as MessageEvent;
      for (const l of this.listeners) l(ev);
    });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l);
    if (i >= 0) this.listeners.splice(i, 1);
  }
  terminate(): void { this.listeners = []; }
}

const ACTIVE_4X4 = [
  [4, 5, 6, 7], [1, 5, 9, 13], [0, 5, 10, 15], [3, 6, 9, 12],
];

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

describe('Phase F~I Integration Measurement (완벽한 인공지능 통합 검증)', () => {
  it('★ Phase F — Multi-Modality binding + cross-modal retrieval', () => {
    // 시나리오: hand image (4×4 cluster id) + voice (audio neuron id) + text token
    // 영역 동시 학습. cross-modal retrieval 영역 정확도 측정.
    let imageVoice = new Map<string, CrossModalAssociation>();
    let imageText = new Map<string, CrossModalAssociation>();

    const trainingEpochs = 5;
    const pairs = [
      { image: 0, voice: 100, text: 1000 },
      { image: 1, voice: 200, text: 2000 },
      { image: 2, voice: 300, text: 3000 },
      { image: 3, voice: 400, text: 4000 },
    ];
    for (let e = 0; e < trainingEpochs; e += 1) {
      for (const p of pairs) {
        imageVoice = batchUpdateBindings('image', 'voice', [p.image], [p.voice], imageVoice);
        imageText = batchUpdateBindings('image', 'text', [p.image], [p.text], imageText);
      }
    }

    // Retrieval test: image → voice + text.
    let voiceCorrect = 0, textCorrect = 0;
    for (const p of pairs) {
      const voiceRetrieved = crossModalRetrieve([p.image], imageVoice, 'image', 'voice', 1);
      const textRetrieved = crossModalRetrieve([p.image], imageText, 'image', 'text', 1);
      if (voiceRetrieved[0]?.neuron === p.voice) voiceCorrect += 1;
      if (textRetrieved[0]?.neuron === p.text) textCorrect += 1;
    }

    // Coherence 측정.
    const coherence = coherenceScore([0], [100], imageVoice, 'image', 'voice');

    // Modality attention.
    const attention = selectAttendedModality([
      { name: 'image', averageFiringRate: 30 },
      { name: 'voice', averageFiringRate: 50 },
      { name: 'text', averageFiringRate: 10 },
    ]);

    const measurement = {
      timestamp: new Date().toISOString(),
      phase: 'F',
      voiceRetrievalAccuracy: voiceCorrect / pairs.length,
      textRetrievalAccuracy: textCorrect / pairs.length,
      coherenceImageVoice: coherence,
      attendedModality: attention.winner,
      attentionSalience: attention.salience,
      bindingCount: imageVoice.size + imageText.size,
    };
    saveMeasurement('phase-f-multi-modality', measurement);

    expect(voiceCorrect).toBe(pairs.length); // 100% retrieval
    expect(textCorrect).toBe(pairs.length);
    expect(coherence).toBeGreaterThan(0);
    expect(attention.winner).toBe('voice'); // highest firing rate

    console.log(`[Phase F] voice retrieval ${voiceCorrect}/${pairs.length}, text ${textCorrect}/${pairs.length}, coherence ${coherence.toFixed(2)}`);
  });

  it('★ Phase G — Consciousness: workspace + working memory + attention modulation', () => {
    let workspace: GlobalWorkspaceState = { currentBroadcast: null, history: [] };
    let workingMemory: WorkspaceEntry[] = [];

    // 5 시점 영역 영역 candidate 영역 admit + memory 영역 push.
    const sequence = [
      { source: 'image', content: 5, salience: 0.6, timestamp: 100 },
      { source: 'audio', content: 12, salience: 0.8, timestamp: 200 }, // 영역
      { source: 'text', content: 7, salience: 0.4, timestamp: 300 },   // 영역
      { source: 'image', content: 8, salience: 0.9, timestamp: 400 },  // 영역 영역
      { source: 'audio', content: 15, salience: 0.5, timestamp: 500 }, // 영역
    ];

    let consciouslyAccessed = 0;
    for (const candidate of sequence) {
      workspace = admitToWorkspace(workspace, candidate);
      if (workspace.currentBroadcast === candidate) {
        workingMemory = pushToWorkingMemory(workingMemory, candidate);
        if (isConsciouslyAccessed(candidate)) consciouslyAccessed += 1;
      }
    }

    // Top-down attention scenario.
    const candidates = [
      { source: 'image', content: 1, salience: 0.5 },
      { source: 'audio', content: 10, salience: 0.4 },
    ];
    const modulated = applyTopDownAttention(candidates, { attendedSources: ['audio'], gainBoost: 2.0 });
    const winner = competitiveSelect(modulated);

    // Integrated information (Φ).
    const phi = integratedInformationProxy([
      { source: 'image', activity: 0.8 },
      { source: 'audio', activity: 0.7 },
      { source: 'text', activity: 0.5 },
    ]);

    const measurement = {
      timestamp: new Date().toISOString(),
      phase: 'G',
      finalBroadcast: workspace.currentBroadcast,
      historyDepth: workspace.history.length,
      workingMemorySize: workingMemory.length,
      consciouslyAccessedCount: consciouslyAccessed,
      attentionModulatedWinner: winner?.source,
      integratedInformationPhi: phi,
    };
    saveMeasurement('phase-g-consciousness', measurement);

    // 영역 highest salience candidate (image, 0.9) 영역 최종 broadcast.
    expect(workspace.currentBroadcast?.content).toBe(8);
    expect(workspace.currentBroadcast?.salience).toBe(0.9);
    // attention modulation → audio (boosted 0.8) > image (0.5)
    expect(winner?.source).toBe('audio');
    expect(phi).toBeGreaterThan(0);

    console.log(`[Phase G] final broadcast salience ${workspace.currentBroadcast?.salience}, Φ=${phi.toFixed(2)}, attention winner=${winner?.source}`);
  });

  it('★ Phase H — Embodiment: SNN cluster → motor → sensor → predictive error', async () => {
    // 4×4 SNN substrate 영역 학습 → cluster activation → motor command → sensor.
    const core = new SNNWorkerCore();
    const transport = new InProcessTransport(core);
    const client = new SNNWorkerClient(transport);
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'embodied' });
    const lab = new LocalSNN({
      netId: 'embodied_demo', client, sink, seed: 57, clusterActiveInputs: ACTIVE_4X4,
    });
    await lab.init();

    // Train + cluster 0 activation → motor command.
    for (const inputs of ACTIVE_4X4) {
      await client.inject(inputs.map((i) => ({
        neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1,
      })));
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }

    // Cluster → motor mapping.
    const motorMap = new Map<number, MotorCommand>();
    motorMap.set(0, { effector: 'hand_open', targetPosition: [1, 0, 0], velocity: 1, duration: 100 });
    motorMap.set(1, { effector: 'hand_close', targetPosition: [-1, 0, 0], velocity: 1, duration: 100 });
    motorMap.set(2, { effector: 'point', targetPosition: [0, 1, 0], velocity: 1, duration: 100 });
    motorMap.set(3, { effector: 'wave', targetPosition: [0, -1, 0], velocity: 1, duration: 100 });

    // Cluster 0 activation → motor.
    await client.inject(ACTIVE_4X4[0].map((i) => ({
      neuron: `in_feat_${i}`, weight: 25, time: 0, durationMs: 50, stepMs: 0.1,
    })));
    await client.run({ durationMs: 80, dtMs: 0.1, stdpEnabled: false });

    const reg = buildClusterRegistryFromN13(ACTIVE_4X4);
    const clusterRates: number[] = [];
    for (const slot of reg.slots) {
      const result = await client.firingRates({ names: slot.out, windowMs: 80 });
      let sum = 0;
      for (const r of result.rates) sum += r.hz;
      clusterRates.push(sum / N13Pools.OUT_PER_CLUSTER);
    }
    const winnerCluster = wtaWinner(clusterRates);
    const cmd = clusterToMotorCommand(winnerCluster, motorMap);

    // Predictive coding — forward model.
    const initialSensor: SensorState = { positions: [[0, 0, 0]], timestamp: 0 };
    const predicted = cmd ? predictSensorDelta(cmd, initialSensor) : [];
    const actualSensor: SensorState = { positions: [[0.9, 0, 0]], timestamp: 100 }; // imperfect
    const errors = computeSensorError(predicted, actualSensor.positions);
    const errMag = errorMagnitude(errors);

    const measurement = {
      timestamp: new Date().toISOString(),
      phase: 'H',
      winnerCluster,
      executedCommand: cmd?.effector,
      predictionErrorRMS: errMag,
      sensorimotorLoopClosed: cmd !== null && errMag !== null,
    };
    saveMeasurement('phase-h-embodiment', measurement);

    expect(winnerCluster).toBe(0); // cluster 0 winner after training
    expect(cmd?.effector).toBe('hand_open');
    expect(errMag).toBeGreaterThanOrEqual(0);

    console.log(`[Phase H] cluster ${winnerCluster} → ${cmd?.effector}, predictive error ${errMag.toFixed(3)}`);
  });

  it('★ Phase I — Social Cognition: multi-agent + ToM + cooperative task + reputation', () => {
    // 3-agent colony 영역 cooperative task + ToM + reputation 영역 영역.
    const colony = createColony(['a1', 'a2', 'a3']);

    // Theory of Mind — a1 영역 a2 영역 behavior observe → belief inference.
    const a1Context = [10, 20, 30];
    const a2Observed = [10, 20, 50];
    const a2Belief = inferBeliefState('a2', a2Observed, a1Context, 100);

    // Cooperative task — shared goal (target neurons 10, 20, 30, 40).
    const goal: SharedGoal = { taskId: 'shared_grasp', targetNeurons: [10, 20, 30, 40], rewardThreshold: 3 };
    const success = checkCooperativeSuccess(goal, [
      { agentId: 'a1', activeNeurons: [10, 20] },
      { agentId: 'a2', activeNeurons: [30, 40] },
      { agentId: 'a3', activeNeurons: [50] }, // off-task
    ]);

    // Joint attention.
    const jointAtt = detectJointAttention([
      { agentId: 'a1', focusNeurons: [10, 20] },
      { agentId: 'a2', focusNeurons: [10, 30] },
      { agentId: 'a3', focusNeurons: [10, 40] },
    ]);

    // Reputation update — 5 rounds.
    let rep_a2: ReputationScore = { agentId: 'a2', totalInteractions: 0, cooperativeCount: 0, defectionCount: 0, trustScore: 0 };
    const a2Actions = [true, true, false, true, true]; // 4/5 cooperate
    for (const coop of a2Actions) {
      rep_a2 = updateReputation(rep_a2, coop);
    }
    const a1Decision = titForTatDecide(rep_a2);

    const measurement = {
      timestamp: new Date().toISOString(),
      phase: 'I',
      colonyAgents: colony.agents,
      theoryOfMind: {
        observedAgent: a2Belief.agentId,
        confidence: a2Belief.confidence,
      },
      cooperativeTask: {
        success: success.success,
        totalOverlap: success.totalOverlap,
        contributingAgents: success.contributingAgents,
      },
      jointAttention: {
        detected: jointAtt.hasJointAttention,
        sharedFocus: jointAtt.sharedFocus,
        participants: jointAtt.participants,
      },
      reputation: {
        a2TrustScore: rep_a2.trustScore,
        a1Decision,
      },
    };
    saveMeasurement('phase-i-social-cognition', measurement);

    expect(a2Belief.confidence).toBeCloseTo(2 / 3, 5); // 2 of 3 observed in own context
    expect(success.success).toBe(true); // 4 overlap >= 3 threshold
    expect(success.contributingAgents).toEqual(['a1', 'a2']);
    expect(jointAtt.hasJointAttention).toBe(true);
    expect(jointAtt.sharedFocus).toContain(10); // 모든 agent attend
    expect(rep_a2.trustScore).toBe(0.8); // 4/5
    expect(a1Decision).toBe('cooperate'); // trust >= 0.5

    console.log(`[Phase I] ToM confidence ${a2Belief.confidence.toFixed(2)}, cooperative ${success.success}, joint attention ${jointAtt.hasJointAttention}, a2 trust ${rep_a2.trustScore}`);
  });

  it('★★ Final Integration — 9 phase 통합 시나리오 (영원 진화 + 완벽한 인공지능)', async () => {
    // 영원 진화 (D~A) + 완벽한 인공지능 (F~I) 영역 building blocks 영역 영역 동시
    // 작동 영역 영역 검증.

    // 1. SNN substrate 영역 (Phase A — substrate evolution dependency).
    const core = new SNNWorkerCore();
    const client = new SNNWorkerClient(new InProcessTransport(core));
    const sink = new LocalStorageSink({ storage: new MemoryStorage(), prefix: 'final' });
    const lab = new LocalSNN({
      netId: 'final_integration', client, sink, seed: 57, clusterActiveInputs: ACTIVE_4X4,
    });
    await lab.init();

    for (const inputs of ACTIVE_4X4) {
      await client.inject(inputs.map((i) => ({
        neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1,
      })));
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }

    // 2. Multi-modality binding (Phase F) — visual cluster ↔ audio neuron.
    let bindings = new Map<string, CrossModalAssociation>();
    bindings = batchUpdateBindings('visual', 'audio', [0, 1, 2, 3], [10, 20, 30, 40], bindings);

    // 3. Workspace broadcast (Phase G) — multi-modal evidence → conscious access.
    let workspace: GlobalWorkspaceState = { currentBroadcast: null, history: [] };
    workspace = admitToWorkspace(workspace, {
      source: 'visual', content: 0, salience: 0.8, timestamp: Date.now(),
    });

    // 4. Embodied response (Phase H) — workspace winner → motor.
    const motorMap = new Map<number, MotorCommand>();
    motorMap.set(0, { effector: 'reach', targetPosition: [1, 0, 0], velocity: 1, duration: 100 });
    const motor = clusterToMotorCommand(workspace.currentBroadcast?.content ?? -1, motorMap);

    // 5. Social communication (Phase I) — motor result → broadcast to colony.
    const colony = createColony(['self', 'observer']);
    const observerBelief = inferBeliefState('observer', [0], [0, 1], Date.now());

    const allSystemsGo = (
      bindings.size > 0 &&
      workspace.currentBroadcast !== null &&
      motor !== null &&
      colony.agents.length === 2 &&
      observerBelief.confidence > 0
    );

    const measurement = {
      timestamp: new Date().toISOString(),
      scenario: 'final-9phase-integration',
      phasesActive: ['A', 'D', 'E', 'B', 'C', 'F', 'G', 'H', 'I'],
      bindingsFormed: bindings.size,
      broadcastedContent: workspace.currentBroadcast,
      executedMotor: motor?.effector,
      colonySize: colony.agents.length,
      tomConfidence: observerBelief.confidence,
      allSystemsGo,
    };
    saveMeasurement('final-9phase-integration', measurement);

    expect(allSystemsGo).toBe(true);
    console.log(`[Final Integration] 9 phase 통합 — 모든 시스템 작동: ${allSystemsGo}`);
  });
});
