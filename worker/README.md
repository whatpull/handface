# handface-training Worker (Phase 2 D1 scaffold)

handface localStorage training snapshot 을 Cloudflare D1 으로 영구 저장하는 Worker.
사용자 직접 deploy 하기 전까지는 미가동 상태 — code-only scaffold.

## 사용자 직접 실행 단계

```bash
cd worker

# 1. wrangler 로그인 (브라우저 OAuth)
npx wrangler login

# 2. D1 database 생성 → 출력값에서 database_id 복사
npx wrangler d1 create handface-training

# 3. wrangler.toml 의 database_id 갱신

# 4. schema 적용 (remote = 실제 D1)
npx wrangler d1 execute handface-training --file=./schema.sql --remote

# 5. Worker 배포
npx wrangler deploy
```

배포 후 Worker URL (예: `https://handface-training.<subdomain>.workers.dev`) 을
handface 클라이언트의 backend mirror endpoint 로 등록 (별도 turn).

## API

- `GET  /networks/{id}/training/snapshot` — 저장된 weight 조회
- `POST /networks/{id}/training/snapshot` — 저장 / 갱신 (body: `{weights: [...], meta?: {...}}`)

## Schema

`training_snapshots` 단일 table — network_id PK + weights JSON + updated_at + optional meta.
복수 anchor / multi-network 모두 단일 table 에 누적 (network_id 단위 replace).
