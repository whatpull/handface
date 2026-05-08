'use client';
// useLocalSnn — LocalSNN 라이프사이클을 React state 로 노출.
//
// 단일 hook 으로 build / status / firingRates / inject + run 호출 + cleanup
// 보장. transport 는 default 로 MainThreadTransport (Worker 번들 부담 없이
// 시작), 향후 실 Worker 로 swap 시 옵션 변경.

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  LocalSNN,
  LocalStorageSink,
  MainThreadTransport,
  SNNWorkerClient,
  type ClusterFiringRatesPayload,
  type ClusterFiringRatesResult,
  type ExpandClusterPayload,
  type ExpandClusterResult,
  type FiringRatesPayload,
  type FiringRatesResult,
  type LocalSNNStatus,
  type WorkerLike,
} from '@/lib/snn-runtime';
import type { InjectEvent } from '@/lib/snn-runtime';
import { createSnnWebWorker } from '@/lib/snn-runtime/create-web-worker';

export interface UseLocalSnnOptions {
  netId: string;
  // 외부 transport 주입 — 미지정 시 MainThreadTransport.
  transport?: WorkerLike;
  // useWorker=true 면 실 Web Worker 시도, 실패 시 MainThreadTransport fallback.
  // transport 가 명시되면 본 옵션 무시.
  useWorker?: boolean;
  seed?: number;
  clusterActiveInputs?: number[][];
}

export interface UseLocalSnnApi {
  status: LocalSNNStatus | null;
  ready: boolean;
  error: string | null;
  // 실제 사용된 transport 종류 — UI 에서 표시 가능.
  transportKind: 'main-thread' | 'web-worker' | null;
  inject(events: InjectEvent[]): Promise<void>;
  run(payload: { durationMs: number; dtMs?: number; stdpEnabled?: boolean; stdpGain?: number }): Promise<void>;
  firingRates(payload: FiringRatesPayload): Promise<FiringRatesResult>;
  clusterFiringRates(payload: ClusterFiringRatesPayload): Promise<ClusterFiringRatesResult>;
  expandCluster(payload: ExpandClusterPayload): Promise<ExpandClusterResult | null>;
  save(): Promise<void>;
  reset(): Promise<void>;
  client: SNNWorkerClient | null;
}

export function useLocalSnn(opts: UseLocalSnnOptions): UseLocalSnnApi {
  const [status, setStatus] = useState<LocalSNNStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transportKind, setTransportKind] = useState<'main-thread' | 'web-worker' | null>(null);
  const labRef = useRef<LocalSNN | null>(null);
  const clientRef = useRef<SNNWorkerClient | null>(null);
  const transportRef = useRef<WorkerLike | null>(null);

  useEffect(() => {
    let cancelled = false;
    let transport: WorkerLike;
    let kind: 'main-thread' | 'web-worker';
    if (opts.transport) {
      transport = opts.transport;
      kind = 'main-thread';
    } else if (opts.useWorker) {
      try {
        transport = createSnnWebWorker() as unknown as WorkerLike;
        kind = 'web-worker';
      } catch (e) {
        console.warn('[useLocalSnn] Web Worker 생성 실패, MainThread 로 fallback:', e);
        transport = new MainThreadTransport();
        kind = 'main-thread';
      }
    } else {
      transport = new MainThreadTransport();
      kind = 'main-thread';
    }
    setTransportKind(kind);
    const client = new SNNWorkerClient(transport);
    const sink = new LocalStorageSink();
    const lab = new LocalSNN({
      netId: opts.netId,
      client,
      sink,
      seed: opts.seed,
      clusterActiveInputs: opts.clusterActiveInputs,
    });
    transportRef.current = transport;
    clientRef.current = client;
    labRef.current = lab;

    lab
      .init()
      .then((s) => {
        if (!cancelled) setStatus(s);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });

    return () => {
      cancelled = true;
      client.dispose();
      labRef.current = null;
      clientRef.current = null;
      transportRef.current = null;
      setTransportKind(null);
    };
    // netId / seed / useWorker / transport 변경 시 새 인스턴스 — react-hooks/exhaustive-deps 정합.
    // (clusterActiveInputs 는 인자 객체 reference 변경마다 reset 되지 않게
    //  의도적으로 deps 에 포함 X — 호출자가 stable reference 유지 책임.)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.netId, opts.seed, opts.transport, opts.useWorker]);

  const inject = useCallback(async (events: InjectEvent[]) => {
    const c = clientRef.current;
    if (!c) return;
    await c.inject(events);
  }, []);

  const run = useCallback(
    async (p: { durationMs: number; dtMs?: number; stdpEnabled?: boolean; stdpGain?: number }) => {
      const c = clientRef.current;
      if (!c) return;
      await c.run(p);
    },
    [],
  );

  const firingRates = useCallback(async (p: FiringRatesPayload): Promise<FiringRatesResult> => {
    const c = clientRef.current;
    if (!c) return { rates: [] };
    return c.firingRates(p);
  }, []);

  const clusterFiringRates = useCallback(
    async (p: ClusterFiringRatesPayload): Promise<ClusterFiringRatesResult> => {
      const c = clientRef.current;
      if (!c)
        return {
          rates: [],
          winner: -1,
          share: 0,
          margin: 0,
          layer: p.layer ?? 'OUT',
        };
      return c.clusterFiringRates(p);
    },
    [],
  );

  const expandCluster = useCallback(
    async (p: ExpandClusterPayload): Promise<ExpandClusterResult | null> => {
      const c = clientRef.current;
      const lab = labRef.current;
      if (!c) return null;
      const result = await c.expandCluster(p);
      // 위상 변경 — sink 의 토폴로지를 즉시 갱신해 새로고침 round-trip 보장.
      if (lab) {
        await lab.persistTopology();
        setStatus(lab.status());
      }
      return result;
    },
    [],
  );

  const save = useCallback(async () => {
    const lab = labRef.current;
    if (!lab) return;
    await lab.save();
    setStatus(lab.status());
  }, []);

  const reset = useCallback(async () => {
    const c = clientRef.current;
    const lab = labRef.current;
    if (!c || !lab) return;
    await c.reset();
    const fresh = await lab.init();
    setStatus(fresh);
  }, []);

  return {
    status,
    ready: status !== null,
    error,
    transportKind,
    inject,
    run,
    firingRates,
    clusterFiringRates,
    expandCluster,
    save,
    reset,
    client: clientRef.current,
  };
}
