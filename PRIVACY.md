# 개인정보처리방침 (Privacy Policy)

**최종 업데이트**: 2026-05-26

본 문서는 handface (https://handface.whatpull.com) 서비스의 개인정보 처리에 관한 사항을 안내합니다.

## 1. 처리하는 개인정보

### 1.1 자동 수집되지 않는 정보

handface 는 **모든 처리를 브라우저 내부에서 수행** 합니다. 다음 정보는 **서버로 전송되지 않습니다**:

- 사용자가 그린 패턴 데이터
- SNN 학습 결과 (weight, cluster activation)
- MediaPipe Hand 영상/landmark 데이터 (Hand SNN 기능 사용 시)

### 1.2 사용자 디바이스에 저장되는 정보

브라우저의 LocalStorage / IndexedDB 에 다음 정보가 저장될 수 있습니다:

- SNN 가중치 snapshot (학습된 패턴 기억)
- 사용자 설정 (UI preferences)

→ 사용자가 브라우저 데이터를 삭제하면 즉시 제거됩니다.

### 1.3 카메라 권한 (Hand SNN 기능 사용 시)

MediaPipe Hand 기반 손 제스처 인식 기능을 사용할 경우:

- 브라우저가 사용자에게 **카메라 사용 권한** 을 요청합니다
- 영상 frame 은 **브라우저 내부에서만 처리** 되며 서버로 전송되지 않습니다
- 추출된 hand landmark (21 points × 3 coords) 만 SNN 학습에 사용됩니다
- 영상 원본은 메모리에 일시 보관되며 즉시 폐기됩니다

## 2. 생체정보 처리 (한국 개인정보보호법 정합)

손 형상 / 제스처는 한국 개인정보보호법상 **민감정보 (생체정보)** 에 해당할 수 있습니다. 본 서비스는:

- 카메라 권한 요청 시 사용자에게 명시적 동의를 요구합니다
- 영상/landmark 데이터를 **서버에 저장하지 않습니다**
- 사용자는 언제든 브라우저 데이터를 삭제하여 모든 정보를 제거할 수 있습니다

## 3. 제3자 제공

handface 는 사용자 데이터를 **어떠한 제3자에게도 제공하지 않습니다**.

## 4. 외부 의존성

본 서비스는 다음 외부 리소스를 사용합니다:

- **MediaPipe Hand** (Google) — 카메라 frame 처리를 위한 client-side library. 영상은 사용자 디바이스 내에서만 처리됩니다.
- **Vercel** — 정적 파일 호스팅. Vercel 의 자체 로그 (IP, User-Agent) 정책이 적용됩니다 — [Vercel Privacy Policy](https://vercel.com/legal/privacy-policy)

## 5. 사용자 권리

사용자는 언제든지:

- 브라우저 데이터 삭제로 모든 SNN 학습 데이터를 제거할 수 있습니다
- 카메라 권한을 브라우저 설정에서 거부할 수 있습니다
- 서비스 사용을 중단할 수 있습니다

## 6. 변경사항

본 방침의 변경 사항은 본 문서의 git history 로 추적됩니다.

## 7. 문의

문의 또는 우려 사항: GitHub Issues — https://github.com/whatpull/handface/issues

---

**중요**: 본 서비스는 **연구/데모용** 입니다. Production 인증/보안 시스템 또는 의료/법률/금융 등 critical decision 에 사용하지 마십시오. SNN 인식 정확도는 100% 가 보장되지 않습니다.
