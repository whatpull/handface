// 로컬 SNN 라이프사이클 — Worker + Persistence + (선택) ART 를 묶은 고수준 API.
//
// 목적: 호출자(UI / 테스트)가 한 번의 init 으로 "회로 빌드 + 자극 큐잉 + STDP
// 시뮬레이션 + 가중치 영속화" 흐름을 다루도록 함. SNNWorkerClient (Phase C4) 와
// LocalStorageSink (Phase C3) 와 buildN13OrientationPreset (Phase C5a) 의 결합점.
//
// 영속 정책:
//   - 토폴로지(NetworkSnapshot) 와 가중치(WeightSnapshot) 를 모두 저장.
//   - 첫 init 에 toplogy 가 sink 에 있으면 가중치만 swap (상속 학습),
//     없으면 새 빌드 후 저장.
//   - save() 호출 시 마다 가중치 snapshot 갱신 + 변화 시 delta 누적.

import { diffWeightSnapshots, type SnapshotSink, type WeightSnapshot } from './persistence';
import type { NetworkSnapshot } from './network';
import type { SNNWorkerClient } from './worker-client';

export interface LocalSNNOptions {
  netId: string;
  client: SNNWorkerClient;
  sink: SnapshotSink;
  // n13 빌드 인자 (default = 4 orientation cluster).
  preset?: 'n13_orientation';
  vThreshold?: number;
  clusterActiveInputs?: number[][];
  seed?: number;
  // delta 누적 보존 한도. 초과 시 sink.compact() 로 제거.
  maxDeltaHistory?: number;
  // weight delta 미세 잡음 임계.
  deltaEps?: number;
}

export interface LocalSNNStatus {
  netId: string;
  rev: number;
  // build 시 반환된 토폴로지 메타.
  neurons: number;
  synapses: number;
  // 가장 최근 save 시점 (epoch ms) 또는 init 후 미저장 시 null.
  lastSavedAt: number | null;
}

// 본 클래스는 worker 와 sink 를 inject 받아 lifecycle 만 조율한다.
// — 자극 inject / run / firingRates 등 raw RPC 는 client 에 직접 위임.
export class LocalSNN {
  private opts: LocalSNNOptions;
  private rev = 0;
  private prevWeights: WeightSnapshot | null = null;
  private neuronsCount = 0;
  private synapsesCount = 0;
  private lastSavedAt: number | null = null;

  constructor(opts: LocalSNNOptions) {
    this.opts = opts;
  }

  // 첫 호출. sink 에 보존된 토폴로지 + 가중치가 있으면 그대로 restore
  // (cluster expansion 까지 보존). 없으면 새 빌드 + 첫 저장.
  async init(): Promise<LocalSNNStatus> {
    const { client, sink, netId } = this.opts;
    const persistedTopology = await sink.loadTopology(netId);
    const persistedWeights = await sink.loadWeights(netId);

    if (persistedTopology && persistedWeights && this.topologyMatchesPreset(persistedTopology)) {
      // 토폴로지 그대로 restore — expansion 까지 round-trip.
      const restored = await client.restoreSnapshot({
        snapshot: persistedTopology,
        clusterActiveInputs: this.opts.clusterActiveInputs,
      });
      this.neuronsCount = restored.neurons;
      this.synapsesCount = restored.synapses;
      // 가중치 길이 정합 — restore 한 토폴로지의 synapse 수가 같은 sink 에서
      // 함께 저장됐다면 맞아야 함.
      if (persistedWeights.weights.length === this.synapsesCount) {
        await client.applyWeights(persistedWeights.weights);
        this.rev = persistedWeights.rev;
        this.prevWeights = persistedWeights;
        this.lastSavedAt = persistedWeights.savedAt;
      } else {
        // 가중치 길이 mismatch — 토폴로지/가중치 schema 불일치. fresh build.
        await this.persistFreshBuild();
      }
    } else {
      const built = await client.build({
        preset: this.opts.preset ?? 'n13_orientation',
        vThreshold: this.opts.vThreshold,
        clusterActiveInputs: this.opts.clusterActiveInputs,
        seed: this.opts.seed,
      });
      this.neuronsCount = built.neuronsAdded;
      this.synapsesCount = built.synapsesAdded;
      await this.persistFreshBuild();
    }
    return this.status();
  }

  // 토폴로지를 다시 저장 — expandCluster 등 위상 변경 후 호출자가 명시 트리거.
  // 가중치 길이가 바뀌므로 prevWeights / 누적 delta 는 reset (다음 save 가 baseline).
  async persistTopology(): Promise<void> {
    const { client, sink, netId } = this.opts;
    const { snapshot } = await client.snapshot();
    await sink.saveTopology(netId, snapshot);
    this.neuronsCount = snapshot.neurons.length;
    this.synapsesCount = snapshot.synapses.length;
    // 위상 변경 → 직전 가중치 vector 길이 mismatch — diff 무효, 누적 delta 도 폐기.
    this.prevWeights = null;
    // 새 baseline 가중치 즉시 저장 (rev 유지).
    const weights = await client.extractWeights();
    const baseline: WeightSnapshot = {
      schema: 1,
      netId,
      rev: this.rev,
      t: snapshot.t,
      savedAt: Date.now(),
      weights,
    };
    await sink.saveWeights(baseline);
    this.prevWeights = baseline;
    this.lastSavedAt = baseline.savedAt;
    // 누적 delta 폐기 (이전 위상 기반 → 적용 불가).
    await sink.compact(netId, 0);
  }

  private topologyMatchesPreset(topo: NetworkSnapshot): boolean {
    // 단순 sanity — neurons.length 가 0 이상이면 통과. 더 엄격한 검증은 향후
    // (예: input dim, cluster 수 비교) 추가 가능.
    if (topo.neurons.length === 0) return false;
    // 사용자 catch 2026-05-09 (Fix B) — schema:1 (legacy v1) 영역 stale cache
    // 영역 reject → fresh n13 build 강제. v1 snapshot 영역 NMDA / homeostatic
    // 7 필드 drop 영역 default off 영역 적용 → INPUT EPSP 영역 V_th 미달 →
    // fire 0 → 학습 fail. network.ts 영역 v1 hydrate 영역 default reapply
    // (Fix A) 와 함께 defense in depth — schema:1 영역 직전 가중치 영역 폐기
    // (NMDA off 영역 학습 효과 0 영역 폐기 영역 손실 0).
    if (topo.schema === 1) return false;
    return true;
  }

  private async persistFreshBuild(): Promise<void> {
    const { client, sink, netId } = this.opts;
    const { snapshot } = await client.snapshot();
    await sink.saveTopology(netId, snapshot);
    const weights = await client.extractWeights();
    const initial: WeightSnapshot = {
      schema: 1,
      netId,
      rev: 0,
      t: snapshot.t,
      savedAt: Date.now(),
      weights,
    };
    await sink.saveWeights(initial);
    this.rev = 0;
    this.prevWeights = initial;
    this.lastSavedAt = initial.savedAt;
  }

  // 현재 가중치를 sink 에 저장. 직전 대비 delta 누적 (변화 있으면).
  async save(): Promise<number> {
    const { client, sink, netId } = this.opts;
    const weights = await client.extractWeights();
    const next: WeightSnapshot = {
      schema: 1,
      netId,
      rev: this.rev + 1,
      t: 0, // worker.t 를 별도로 가져오는 RPC 추가 시 채움.
      savedAt: Date.now(),
      weights,
    };
    if (this.prevWeights) {
      const delta = diffWeightSnapshots(
        this.prevWeights,
        next,
        this.opts.deltaEps ?? 1e-9,
      );
      if (delta.indices.length > 0) {
        await sink.appendDelta(delta);
        // 사용자 catch 2026-05-09: localStorage quota exceeded 정정 — n13
        // substrate 영역 ~28k synapse 영역 delta 영역 ~50-100KB/건. 32건 * 2
        // substrate ≈ 6MB → quota 5-10MB 초과. 4건 영역 default — latest snapshot
        // 영역 full state 영역 보존 시점 영역 delta 영역 단순 journal 역할.
        await sink.compact(netId, this.opts.maxDeltaHistory ?? 4);
      }
    }
    await sink.saveWeights(next);
    this.rev = next.rev;
    this.prevWeights = next;
    this.lastSavedAt = next.savedAt;
    return this.rev;
  }

  status(): LocalSNNStatus {
    return {
      netId: this.opts.netId,
      rev: this.rev,
      neurons: this.neuronsCount,
      synapses: this.synapsesCount,
      lastSavedAt: this.lastSavedAt,
    };
  }

  // 진단용 — 외부에서 buildWeightSnapshot 직접 만들 때 사용.
  currentWeights(): Promise<number[]> {
    return this.opts.client.extractWeights();
  }
}
