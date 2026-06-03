# Hand SNN v7~v9 Architecture (Phase 3.9, 2026-06-03)

자율 iteration 결과 — Hand SNN 의 vigilance / matching 알고리즘이 어떻게 진화했는지 정리.

## 진화 타임라인

| 버전 | 알고리즘 | captured fixture test accuracy | 핵심 변경 |
|---|---|---|---|
| v6 | mean-subtracted top-K + Jaccard | 50% | training-side mean-sub, worker-side plain top-K (basis mismatch) |
| v7 | cosine similarity vs stored features | **100%** | LiveSnn 가 cluster training feature snapshot 저장, cosine sim 으로 vigilance override |
| v8 | + EMA cluster centroid update | 100% | cosine match 시 cluster feature 를 (1-α)·old + α·new (α=0.1) 로 EMA update |
| v9 | + R-STDP reinforcement | 100% | cosine match 시 reinforceAsync(cluster_id, 0.3) 호출 — SNN cluster weights 동기화 |

## v7 핵심 — Cosine Similarity Matching

### LiveSnn 신규 state

```ts
private _handClusterFeatures: Map<number, number[]>;  // clusterId → 95-dim training feature
private _handCosineWinner: Map<number, { clusterId: number; sim: number }>;  // token → pre-computed winner
```

### Flow

```
CameraInput → triggerWithVigilance(pattern, vigilance=0.3)
  ↓
LiveSnn._maybeRecordHandCosineWinner(token, pattern):
  for each (clusterId, storedFeat) in _handClusterFeatures:
    sim = cosine(pattern, storedFeat)
  if max sim >= 0.97:
    _handCosineWinner.set(token, {clusterId, sim})
  ↓
Worker triggerBackground (SNN simulation)
  ↓
Worker emits triggerComplete (winner cluster + inputMatch)
  ↓
LiveSnn.handleTriggerComplete:
  cosineWinner = _handCosineWinner.get(token)
  vigilanceMismatch = cosineWinner !== undefined
    ? false  // cosine override: familiar pose, no spawn
    : (worker decision: inputMatch < vigilance ? miss : pass)
```

### Persistence

- localStorage key: `handface.live-snn.hand-cluster-feats.v1`
- Format: `Array<[number, number[]]>` (cluster ID → 95-dim feature pairs)
- Save: spawn 직후 + EMA update 시
- Load: constructor 에서 자동 복원
- Clear: `resetTrigger()` 에서 wipe + storage 삭제

## v8 핵심 — EMA Cluster Centroid Update

```ts
if (cosineWinner !== undefined) {
  const existing = _handClusterFeatures.get(cosineWinner.clusterId);
  const ALPHA = 0.1;
  const updated = existing.map((v, i) => v * (1 - ALPHA) + patternRef[i] * ALPHA);
  _handClusterFeatures.set(cosineWinner.clusterId, updated);
  saveHandClusterFeats(_handClusterFeatures);
}
```

### Effect

- 사용자 가 같은 자세를 반복 표시 → cluster centroid 가 사용자 실제 자세 분포로 수렴
- jitter robustness: 같은 자세의 자연 변동이 cluster 학습에 반영
- 테스트 검증: 10 EMA updates 후 cluster feature 가 새 sample 으로 명확 수렴 (diff 0.017 → 0.009)

## v9 핵심 — R-STDP Reinforcement on Match

```ts
if (cosineWinner !== undefined) {
  // ... EMA update ...
  void this.reinforceAsync(cosineWinner.clusterId, 0.3);  // ← v9
}
```

### Effect

- cosine match (LiveSnn-side 결정) 가 SNN cluster weights 도 강화
- 매 매칭마다 R-STDP 호출 → cluster 의 neuron weights 가 강화
- 장기적으로 SNN winner detection 와 cosine sim 매칭이 동기화

## Migration

NodeLearn 에 v7 auto-purge:

```ts
const V7_FLAG = 'handface.phase3.9.v7-cosine-sim.notified.v1';
if (window.localStorage.getItem(V7_FLAG) !== '1') {
  if (hasHandLegacy) {
    void purgeAllLearningData();  // 1회 wipe
    showToast({ kind: 'success', message: '...' });
  }
  window.localStorage.setItem(V7_FLAG, '1');
}
```

직전 v5/v6 cluster 들은 training features storage 없음 → 다음 page reload 시 1회 wipe.

## 테스트 인프라

| Test 파일 | 검증 항목 |
|---|---|
| `phase-3-v5-mean-subtracted-validation.test.ts` | v5 training-side mean-sub 동작 + v6 inference 미완성 catch |
| `phase-3-v7-cosine-similarity-iter.test.ts` | v7a cosine vs v7b dot product vs v7c L2 distance 비교 (100% / 25% / 100%) |
| `phase-3-v7-threshold-tuning.test.ts` | σ jitter 별 same-pose / cross-pose distribution 측정 |
| `phase-3-v7-persistence-reload.test.ts` | localStorage save/load/reset 검증 |
| `phase-3-v8-end-to-end-user-flow.test.ts` | 4 e2e scenarios — same gesture twice, EMA convergence, 4 poses training, inference accuracy |

## Synthetic Limit (Stick Figure)

- stick figure 4 poses: closed_fist vs thumbs_up = cos 0.99, open_palm vs peace_sign = cos 0.987
- 본질 한계: 단순 stick figure 가 thumb position 만 다른 자세를 비슷하게 렌더링
- 실제 인체 hand 사진은 finger position / curl / depth 가 훨씬 다양 → cross-pose cosine 가 훨씬 낮을 것으로 예상
- 검증: MediaPipe 공식 sample `woman_hands.jpg` 에서 21 landmarks 정상 추출 ✓

## 다음 가능 iteration

1. 진짜 인체 사진 (Pexels CC0, Wikimedia Commons 등) 의 4 자세 fixture 캡처 → v7 cosine accuracy 측정
2. cosine threshold 0.97 vs 0.95 vs 0.99 production A/B
3. cluster 수 scaling (8+ gestures) 시 cosine sim 성능
4. UI: confusion matrix 표시 (현재 winner + 안정도 + history)
5. v5/v6 dead code cleanup (v7+ 가 vigilance override)

## 참조 commits

- v6 (0029b8a): mean-subtracted pre-sparsify
- v7 (077a7b1): cosine similarity matching
- v7 docs (fa03419): HONEST_LIMITATIONS 업데이트
- v8 (0549f38): EMA cluster centroid update + e2e test
- URL capture (0f0384b): real photo path 확보
- v9 (3a3f99e): R-STDP reinforcement + persistence test

## 결론

자율 iteration 5단계 (v5 → v6 → v7 → v8 → v9) 통해 synthetic captured fixture 에서 50% → 100% accuracy 달성. 진짜 webcam 의 더 큰 cross-pose variance 가 production 에서 더 좋은 결과 예상. 인프라 완비 — 향후 real photo / 추가 iteration 즉시 가능.
