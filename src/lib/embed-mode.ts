// embed-mode.ts — Phase 1 postMessage API
//
// embed 모드 진입: ?embed=true URL 파라미터.
// 외부 site (parent frame) ↔ handface iframe 통신 채널.
//
// Inbound (parent → handface):
//   PK_INIT     | config 초기화 — 현재 PK_READY 재송출로 응답.
//   PK_RESET    | training-cleared dispatch (학습 데이터 전체 초기화).
//   PK_REQUEST_VERIFY | 마지막 추론 결과 재송출 (미추론 시 PK_UNVERIFIED).
//
// Outbound (handface → parent):
//   PK_READY           | 앱 마운트 완료.
//   PK_PATTERN_LEARNED | cluster-spawned (신규 패턴 형성) 시.
//   PK_VERIFIED        | grid-infer finished + winner 확정 시.
//   PK_UNVERIFIED      | grid-infer error 또는 winner null 시.
//
// 보안: window.parent !== window 체크 (iframe 내부에서만 전송).
//        origin 화이트리스트는 Phase 2에서 추가 (현재 '*').

export type OutboundMessage =
  | { type: 'PK_READY' }
  | { type: 'PK_PATTERN_LEARNED'; patternId: number; label: string }
  | { type: 'PK_VERIFIED'; patternId: number; label: string; confidence: 'EXACT' | 'STABLE' }
  | { type: 'PK_UNVERIFIED'; reason: string };

export type InboundMessage =
  | { type: 'PK_INIT'; config?: { theme?: 'dark'; maxPatterns?: number } }
  | { type: 'PK_RESET' }
  | { type: 'PK_REQUEST_VERIFY' };

export function isEmbedMode(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('embed') === 'true';
}

export function postToParent(msg: OutboundMessage): void {
  if (typeof window === 'undefined') return;
  if (window.parent !== window) {
    window.parent.postMessage(msg, '*');
  }
}
