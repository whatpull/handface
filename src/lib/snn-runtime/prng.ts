// 결정론 의사난수 — Python `random.Random(seed)` 의 TS 등가.
//
// Python random.Random(57) 와 비트 단위 동일 시퀀스를 만드는 게 아님 — 그건
// Mersenne Twister 풀 포팅이 필요해 비용 대비 가치 낮음. 대신 같은 인터페이스
// (random / uniform / range) 와 같은 결정론 (seed 같으면 같은 시퀀스) 만 보장.
// 학습 가중치는 STDP 로 진화하므로 초기값 차이는 수렴에 영향 미미.
//
// 알고리즘: mulberry32 — 고품질 64-비트 mix, 32-비트 출력.

export class SeededRandom {
  private state: number;

  constructor(seed: number) {
    // 32-bit unsigned wrap.
    this.state = seed >>> 0;
  }

  // [0, 1) — Python random.random() 등가.
  random(): number {
    let t = (this.state += 0x6d2b79f5);
    this.state = t >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // [a, b] inclusive 부동소수점 — Python random.uniform.
  uniform(a: number, b: number): number {
    return a + (b - a) * this.random();
  }

  // [a, b) 정수 — Python random.randrange / range 정합.
  range(a: number, b: number): number {
    return a + Math.floor(this.random() * (b - a));
  }
}
