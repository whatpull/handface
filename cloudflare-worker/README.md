# SNN D1 Worker

Cloudflare Workers + D1 백엔드 — SNN 가중치 + 토폴로지 영속화. 모든 사용자가 같은 D1 풀을 공유해 학습 결과를 서로 누적할 수 있는 토대.

> **무료 plan**: Workers 100K req/day, D1 5GB / 5M reads / 100K writes per day. 단일 사용자 데모 ~ 소규모 다중 사용자에 충분.

## 아키텍처

```
brower (handface)  ──HTTP──▶  Cloudflare Worker  ──prepared statements──▶  D1 SQLite
   |                              |
   |                              ├─ /api/v1/networks                 (list)
   |                              ├─ /api/v1/networks/:netId          (delete)
   |                              ├─ /api/v1/networks/:netId/topology (get/put)
   |                              ├─ /api/v1/networks/:netId/weights  (get latest, put)
   |                              ├─ /api/v1/networks/:netId/deltas   (get, post)
   └── D1Sink (src/lib/snn-runtime/sinks/d1-sink.ts)
```

`D1Sink` 는 `SnapshotSink` 인터페이스 구현체. `LocalStorageSink` 와 swap 만으로 사용자 가중치가 D1 으로 영속화됨.

## 적용 절차

### 1. 사전 요구사항

```bash
# Cloudflare 계정 (무료) 가입 후
npm install -g wrangler
wrangler login
```

### 2. 본 디렉토리에서

```bash
cd cloudflare-worker
npm install

# D1 database 생성 — 출력의 database_id UUID 를 wrangler.toml 에 반영
wrangler d1 create snn-weights

# wrangler.toml 의 REPLACE_WITH_YOUR_D1_DATABASE_ID 를 위 UUID 로 교체

# schema 적용 — 로컬 테스트 / 원격 배포 양쪽
npm run schema:local
npm run schema:remote

# (선택) auth token 등록 — 보안 강화
wrangler secret put SNN_AUTH_TOKEN
# 입력 prompt 에 토큰 문자열 입력
```

### 3. 배포

```bash
# 개발 모드 (로컬 dev server)
npm run dev

# production 배포
npm run deploy
```

배포 후 `https://snn-d1-worker.<your-subdomain>.workers.dev` 형태로 endpoint URL 발급. 본 URL 을 frontend `D1Sink` 의 `baseUrl` 옵션으로 전달:

```ts
import { D1Sink, LocalSNN, SNNWorkerClient, ... } from '@/lib/snn-runtime';

const sink = new D1Sink({
  baseUrl: 'https://snn-d1-worker.<subdomain>.workers.dev',
  token: '<SNN_AUTH_TOKEN, optional>',
});
const lab = new LocalSNN({ netId: 'global', client, sink });
await lab.init();
```

## REST API

| Method | Path | 동작 |
|--------|------|------|
| `GET` | `/health` | 서비스 health check (open) |
| `GET` | `/api/v1/networks` | 등록된 netId 목록 |
| `DELETE` | `/api/v1/networks/:netId` | 네트워크 전체 삭제 |
| `GET` | `/api/v1/networks/:netId/topology` | NetworkSnapshot |
| `PUT` | `/api/v1/networks/:netId/topology` | NetworkSnapshot 저장 (upsert) |
| `GET` | `/api/v1/networks/:netId/weights/latest` | 최신 WeightSnapshot |
| `PUT` | `/api/v1/networks/:netId/weights` | WeightSnapshot 저장 (rev upsert) |
| `GET` | `/api/v1/networks/:netId/deltas` | WeightDelta[] (rev 오름차순) |
| `POST` | `/api/v1/networks/:netId/deltas` | WeightDelta append |
| `POST` | `/api/v1/networks/:netId/compact` | `{ keepLastN }` — 직전 N rev 만 보존 |

`SNN_AUTH_TOKEN` 환경변수 설정 시 모든 요청에 `Authorization: Bearer <token>` 필요.

## 무료 plan 부하 추정

학습 1회당 가중치 snapshot ~30K floats × 8 bytes ≈ 240 KB JSON. 압축 미사용 시:

- `PUT /weights` 1 회 = 1 write + ~240 KB.
- 100K writes/day → 사용자 별 daily 100 회 학습 가능 (1000 사용자 기준).
- D1 5GB → ~20K snapshots 보존 (압축 없이).

운영 시 `compact` 자동 호출 + delta 인코딩으로 storage 효율화 권장.

## 보안

- `SNN_AUTH_TOKEN` 미설정 시 누구나 read/write 가능 — 데모 / 단일 사용자 한정.
- 운영 시 토큰 등록 + frontend 가 `D1Sink({ token })` 에 주입.
- D1 자체는 Cloudflare 계정 보호 — Worker 가 유일한 access path.

## 검증

```bash
# 단위 테스트 (handface root)
npm run verify
# → tests/unit/d1-sink.test.ts: D1Sink mock-fetch 동작 검증

# Worker 직접 실행
cd cloudflare-worker
npm run dev
# → http://localhost:8787/health
```
