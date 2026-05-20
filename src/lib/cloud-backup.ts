// Device UUID 관리 + neuronface D1 백업 API

const DEVICE_ID_KEY = 'handface.device.id';
const BACKUP_API = 'https://whatpull-neuronface.hf.space/handface/backup';

export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    // UUID v4 생성
    id = 'hf_' + crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export async function saveBackup(
  exemplars: Record<string, unknown>,
  patternCount: number,
): Promise<boolean> {
  const deviceId = getOrCreateDeviceId();
  try {
    const res = await fetch(BACKUP_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: deviceId, exemplars, pattern_count: patternCount }),
    });
    return res.ok;
  } catch { return false; }
}

export async function loadBackup(deviceId?: string): Promise<{
  found: boolean;
  exemplars?: Record<string, unknown>;
  patternCount?: number;
  updatedAt?: string;
} | null> {
  const id = deviceId || getOrCreateDeviceId();
  if (!id) return null;
  try {
    // Security LOW fix (2026-05-20): encodeURIComponent → path injection 회피.
    // restoreCode 영역 user-supplied path segment 영역 special char (/, ?, #)
    // 영역 escape mandatory.
    const res = await fetch(`${BACKUP_API}/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const data = await res.json() as { found: boolean; exemplars?: Record<string, unknown>; pattern_count?: number; updated_at?: string };
    if (!data.found) return { found: false };
    return {
      found: true,
      exemplars: data.exemplars,
      patternCount: data.pattern_count,
      updatedAt: data.updated_at,
    };
  } catch { return null; }
}

export async function deleteBackup(): Promise<boolean> {
  const id = getOrCreateDeviceId();
  try {
    // Security LOW fix (2026-05-20): encodeURIComponent — 정합 path
    // (loadBackup 영역 동일 패턴).
    const res = await fetch(`${BACKUP_API}/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return res.ok;
  } catch { return false; }
}
