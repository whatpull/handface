// Pure TypeScript SNN runtime — 브라우저/Worker 에서 LIF + pair STDP 직접 실행.
// 백엔드 의존 없이 가중치 진화를 수행하여 D1 영속화 + 지속 학습의 토대.
//
// 구성:
//  - constants.ts                       생물학 / STDP 파라미터 (Python 정합)
//  - neuron.ts                          Neuron + Synapse (LIF + pair STDP + NMDA + homeostatic)
//  - network.ts                         NeuralNetwork (run / inject / snapshot / restore)
//  - monitor.ts                         SpikeMonitor (ring buffer + firing rate)
//  - persistence.ts                     SnapshotSink / LocalStorageSink / delta 인코딩
//  - prng.ts                            결정론 의사난수 (mulberry32)
//  - builders/n13-orientation.ts        rev15 정합 4 cluster slot 회로 빌더

export * from './constants';
export { Neuron, Synapse, type SpikeListener } from './neuron';
export {
  NeuralNetwork,
  type InjectEvent,
  type NetworkOptions,
  type NetworkSnapshot,
  type SnapshotSynapse,
} from './network';
export { SpikeMonitor } from './monitor';
export {
  PERSIST_SCHEMA_VERSION,
  type WeightSnapshot,
  type WeightDelta,
  type PersistedRecord,
  type SnapshotSink,
  type PersistController,
  extractWeights,
  applyWeights,
  buildWeightSnapshot,
  diffWeightSnapshots,
  applyWeightDelta,
  LocalStorageSink,
  createPersistController,
} from './persistence';
export { SeededRandom } from './prng';
export {
  buildN13OrientationPreset,
  N13Names,
  N13Pools,
  type N13PresetOptions,
  type N13PresetResult,
} from './builders/n13-orientation';
export {
  DEFAULT_ART_CONFIG,
  type ARTConfig,
  type ClusterRegistry,
  type ClusterSlot,
  type ExpandOptions,
  type ExpandResult,
  type MatchScore,
  type VigilanceResult,
  buildClusterRegistryFromN13,
  computeMatchScore,
  evaluateVigilance,
  expandCluster,
  inferClusterRegistry,
} from './art';
export {
  type WorkerRequest,
  type WorkerResponse,
  type BuildPayload,
  type RunPayload,
  type FiringRatesPayload,
  type BuildResult,
  type RunResult,
  type SnapshotResult,
  type FiringRatesResult,
  type ExpandClusterPayload,
  type ExpandClusterResult,
  type ClusterFiringRatesPayload,
  type ClusterFiringRatesResult,
  type RestoreSnapshotPayload,
  type RestoreSnapshotResult,
} from './worker-protocol';
export { SNNWorkerCore } from './worker-core';
export { SNNWorkerClient, type WorkerLike } from './worker-client';
export { LocalSNN, type LocalSNNOptions, type LocalSNNStatus } from './local-snn';
export { MainThreadTransport } from './main-thread-transport';
export {
  HFDatasetSink,
  HFNotFound,
  type HFDatasetSinkOptions,
  type HealthStatus,
} from './sinks/hf-dataset-sink';
