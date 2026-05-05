// 클라이언트 → UI 발화/학습 이벤트 버스. EventTarget 기반.
// Canvas 가 'neuron-firing' 구독 → fired class + synapse pulse 토글.

export type BackendEventType = 'neuron-firing' | 'circuit-changed' | 'training-changed' | 'hand-feature';

export interface HandFeatureDetail {
  feature: number[];          // 16-dim (smoothed)
  raw: number[];              // 16-dim (unsmoothed)
  hasHand: boolean;
}

export interface NeuronFiringDetail {
  gesture?: string;
  intensity?: number;
  rates?: Record<string, number>;
  rates_by_region?: Record<string, number>;
  active_neurons_by_region?: Record<string, string[]>;
  out_rates?: Record<string, number>;
  synapses?: Array<{ pre: string; post: string; weight: number }>;
}

export interface BackendEvent<T = unknown> extends CustomEvent<T> {
  type: BackendEventType;
}

const bus = typeof window !== 'undefined' ? new EventTarget() : null;

export function emitBackendEvent<T>(type: BackendEventType, detail: T) {
  if (!bus) return;
  bus.dispatchEvent(new CustomEvent(type, { detail }) as BackendEvent<T>);
}

export function onBackendEvent<T>(
  type: BackendEventType,
  handler: (detail: T) => void,
): () => void {
  if (!bus) return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<T>).detail);
  bus.addEventListener(type, listener);
  return () => bus.removeEventListener(type, listener);
}
