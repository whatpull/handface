// SpikeMonitor — modules/monitoring.py 의 ring buffer + firing-rate 계산.
// Neuron.addSpikeListener 로 부착되는 순수 관찰자.

import type { Neuron } from './neuron';

export class SpikeMonitor {
  private spikesByName = new Map<string, number[]>();
  private maxLen: number;

  constructor(maxLen: number = 10000) {
    this.maxLen = maxLen;
  }

  attach(neuron: Neuron): void {
    if (!this.spikesByName.has(neuron.name)) {
      this.spikesByName.set(neuron.name, []);
    }
    neuron.addSpikeListener((n, t) => this.record(n.name, t));
  }

  attachAll(neurons: Neuron[]): void {
    for (const n of neurons) this.attach(n);
  }

  private record(name: string, t: number): void {
    const arr = this.spikesByName.get(name);
    if (!arr) return;
    arr.push(t);
    if (arr.length > this.maxLen) arr.shift();
  }

  spikes(name: string): readonly number[] {
    return this.spikesByName.get(name) ?? [];
  }

  // window 내 발화율 (Hz). now / windowMs 모두 ms 단위.
  firingRate(name: string, now: number, windowMs: number): number {
    const arr = this.spikesByName.get(name);
    if (!arr || arr.length === 0 || windowMs <= 0) return 0;
    const cutoff = now - windowMs;
    let count = 0;
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i] >= cutoff) count += 1;
      else break;
    }
    return (count * 1000) / windowMs;
  }

  reset(): void {
    for (const arr of this.spikesByName.values()) arr.length = 0;
  }
}
