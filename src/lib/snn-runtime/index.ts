// Pure TypeScript SNN runtime — 브라우저/Worker 에서 LIF + pair STDP 직접 실행.
// 백엔드 의존 없이 가중치 진화를 수행하여 D1 영속화 + 지속 학습의 토대.
//
// 구성:
//  - constants.ts  생물학 / STDP 파라미터 (Python 정합)
//  - neuron.ts     Neuron + Synapse (LIF + pair STDP)
//  - network.ts    NeuralNetwork (run / inject / snapshot / restore)
//  - monitor.ts    SpikeMonitor (ring buffer + firing rate)

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
