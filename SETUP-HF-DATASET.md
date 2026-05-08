# HF Dataset 영속화 셋업 가이드

`/snn-lab` 의 **HF Dataset 영속화** 토글을 실제로 동작시키기 위한 1회 셋업 절차.

## 전제

- HuggingFace 계정 (이미 `whatpull/neuronface` Spaces 운영 중인 동일 계정)
- 로컬에 `huggingface_hub` 또는 `huggingface-cli` 설치 (둘 중 하나)

## 1. HF Dataset 생성

웹 UI 또는 CLI 한 가지로 생성합니다.

### 1-A. CLI 방법

```bash
pip install huggingface_hub          # huggingface-cli 함께 설치
huggingface-cli login                # token 입력 (write 권한 필요)
huggingface-cli repo create snn-weights --type dataset
# → https://huggingface.co/datasets/whatpull/snn-weights
```

### 1-B. 웹 UI 방법

1. https://huggingface.co/new-dataset 접속
2. Owner: `whatpull`, Dataset name: `snn-weights`, Visibility: `Public` 또는 `Private`
3. Create dataset 클릭

> Public 권장 — `whatpull-neuronface` Spaces 가 read 시 token 없이 접근 가능. write 는 `HF_TOKEN` 으로 인증되므로 무관.

## 2. HF Token 발급 (write 권한)

1. https://huggingface.co/settings/tokens 접속
2. **New token** → Name: `snn-weights-write`, Type: `Write`, Repository: `whatpull/snn-weights` (또는 All)
3. **Generate** → 출력 token 복사 (`hf_xxxxxxxxxxx...`)

## 3. HF Spaces secrets 등록

1. https://huggingface.co/spaces/whatpull/neuronface/settings 접속
2. **Variables and secrets** 섹션
3. **New secret** 두 개 추가:

| Name | Value | Type |
|------|-------|------|
| `HF_PERSIST_REPO` | `whatpull/snn-weights` | Variable (또는 Secret) |
| `HF_TOKEN` | (위 2단계 token) | **Secret** |

4. 등록 후 자동 restart (또는 수동 **Restart space**) — Docker 컨테이너 재빌드 → 새 image 에 환경변수 반영.

## 4. 검증

### 4-A. backend health endpoint

```bash
curl https://whatpull-neuronface.hf.space/persist/health \
  -H "X-API-Key: $NEURONFACE_API_KEY"
```

기대 응답:
```json
{
  "backend": "hf",
  "repo_id": "whatpull/snn-weights",
  "persistent": true
}
```

`backend: "memory"` 가 나오면 secret 등록 / restart 가 반영 안 됨.

### 4-B. frontend `/snn-lab` UI

1. https://whatpull.github.io/handface/snn-lab/ 접속
2. 헤더 우측 **HF Dataset 영속화** 체크박스 ON
3. 즉시 emerald 표시 확인:
   ```
   ✓ HF Dataset 영속 (whatpull/snn-weights)
   ```
4. amber 경고 표시 시 → 3단계 secret 재확인 + Spaces restart

### 4-C. 영속 round-trip 검증

1. `/snn-lab` 에서 4×4 grid 패턴 그리기 (예: ─ horizontal)
2. **Train ─** 6 회 → cluster 0 가중치 진화
3. **Save** → 콘솔 로그 `save → rev=1` 확인
4. **다른 브라우저** (또는 시크릿 모드) 로 같은 URL 접속, 같은 토글 ON
5. **Infer** ─ → cluster 0 winner (share > 0.5) 확인 — 가중치가 dataset 에서 복원됨

### 4-D. HF Dataset 직접 확인

https://huggingface.co/datasets/whatpull/snn-weights/tree/main/snapshots

```
snapshots/
  snn-lab-default/
    topology.json    NetworkSnapshot
    weights.json     WeightSnapshot (latest)
    deltas.jsonl     WeightDelta append-only
```

## 트러블슈팅

| 증상 | 원인 / 조치 |
|------|------------|
| amber 경고 (`backend MemoryStore`) | `HF_PERSIST_REPO` 미설정 또는 Spaces restart 미반영. Settings 재확인 + Factory rebuild |
| rose 에러 (`health 확인 실패: ...`) | Network/CORS/auth 실패. backend `/persist/health` 직접 curl 로 확인 |
| 토글 ON 했는데 가중치 복원 안 됨 | (1) `HF_TOKEN` 이 write 권한 없음 → 4-A health 는 hf 로 보고되지만 실제 upload 실패. backend 로그 확인. (2) Dataset visibility = Private 인데 read 시 token 미사용 → public 으로 변경 또는 read-token 옵션 추가 |
| HF Hub commit 느림 (수 초) | 정상. 무료 plan 의 latency. `Save` 빈도를 낮추거나 학습 chunk 끝에만 save |

## 비용

**완전 무료**. HF Hub Datasets 는 일일 한도가 사실상 없음 (rate limit 은 분단위 ~수백 req/min, 본 use-case 부하 무시 가능).

스토리지: 대용량 dataset 도 무료 (LFS 한도 매우 관대). 본 SNN 가중치는 압축 시 ~수십 KB 수준 — 무한 가까이 저장 가능.

## 보안 메모

- `HF_TOKEN` 은 **Secret** 으로 등록 (Variable 아님) — Spaces 로그/UI 에 노출 안 됨
- frontend 는 token 직접 안 가짐 — 모든 write 는 backend 경유
- public dataset 의 write 권한 없는 사용자는 read-only — 가중치 변조 불가
- backend 의 `_verify` 가 `NEURONFACE_API_KEY` 로 추가 보호 (선택)
