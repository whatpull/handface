// 백엔드 endpoint + API key 영구 저장 (localStorage). SettingsPanel 과 client 양쪽이 사용.

export const ENDPOINT_KEY = 'handface.settings.endpoint';
export const APIKEY_KEY   = 'handface.settings.apikey';

export const DEFAULT_ENDPOINT = 'https://whatpull-neuronface.hf.space';

export interface BackendSettings {
  endpoint: string;
  apiKey: string;
}

// localhost 는 TLS 인증서가 없어 https 로 들어오면 핸드셰이크 실패 → http 로 강등.
export function normalizeEndpoint(raw: string): string {
  let url = (raw || '').trim().replace(/\/$/, '');
  if (!url) return DEFAULT_ENDPOINT;
  if (!/^https?:\/\//.test(url)) url = `http://${url}`;
  if (/^https:\/\/(localhost|127\.0\.0\.1)/i.test(url)) {
    url = url.replace(/^https:/, 'http:');
  }
  return url;
}

export function loadBackendSettings(): BackendSettings {
  if (typeof window === 'undefined') return { endpoint: DEFAULT_ENDPOINT, apiKey: '' };
  return {
    endpoint: normalizeEndpoint(localStorage.getItem(ENDPOINT_KEY) || DEFAULT_ENDPOINT),
    apiKey: localStorage.getItem(APIKEY_KEY) || '',
  };
}

export function saveBackendSettings(s: BackendSettings) {
  if (typeof window === 'undefined') return;
  const url = normalizeEndpoint(s.endpoint);
  localStorage.setItem(ENDPOINT_KEY, url);
  localStorage.setItem(APIKEY_KEY, s.apiKey);
}
