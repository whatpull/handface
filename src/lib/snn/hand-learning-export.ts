// Phase 3.9 v32 (2026-06-03) — 학습 데이터 export / import.
//
// 사용자 가치: device 변경 / browser cache reset 시 학습한 자세 보존.
// 19 자세 학습은 시간 투자 — JSON 백업 + 복원으로 보호.
//
// 정직 한계:
//   - localStorage 만 export (worker IndexedDB 의 SNN weight 는 export 안 함).
//     LiveSnn 의 cluster features + activeInputs 만 보존 — page reload 시
//     v26 sync 가 worker 를 재구성하므로 SNN weight 는 자동 복원.
//   - exemplars (label / count) 도 포함 — 사용자가 부여한 이름 보존.
//   - schemaVersion 으로 future migration 정합.

const FEATURES_KEY = 'handface.live-snn.hand-cluster-feats.v1';
const ACTIVE_KEY = 'handface.live-snn.hand-cluster-active.v1';
const EXEMPLARS_KEY = 'handface.out.exemplars.v1.orientation-hand';

const SCHEMA_VERSION = 1;

export interface HandLearningExport {
  schemaVersion: number;
  exportedAt: string;            // ISO timestamp
  version: string;               // app phase version
  substrate: 'orientation-hand';
  clusterFeatures: Array<[number, number[]]>;       // [[clusterId, 95-dim feat], ...]
  clusterActiveInputs: Array<[number, number[]]>;   // [[clusterId, [idx, ...]], ...]
  exemplars: Record<string, unknown>;                // outKey → { label, count, ... }
}

export interface ImportResult {
  ok: boolean;
  message: string;
  imported: {
    features: number;
    activeInputs: number;
    exemplars: number;
  };
  warnings: string[];
}

function readJSON(key: string): unknown {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeJSON(key: string, value: unknown): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
}

/**
 * 현재 localStorage 의 hand learning 데이터를 export object 로 직렬화.
 * Empty (학습 데이터 없음) 인 경우에도 valid object 반환 (clusterFeatures = []).
 */
export function buildHandLearningExport(): HandLearningExport {
  const features = readJSON(FEATURES_KEY);
  const actives = readJSON(ACTIVE_KEY);
  const exemplars = readJSON(EXEMPLARS_KEY);

  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: '2026-06-03T00:00:00.000Z', // SSR 정합 — caller 가 final timestamp 정합
    version: 'phase-3.9-v32',
    substrate: 'orientation-hand',
    clusterFeatures: Array.isArray(features) ? (features as Array<[number, number[]]>) : [],
    clusterActiveInputs: Array.isArray(actives) ? (actives as Array<[number, number[]]>) : [],
    exemplars: (exemplars && typeof exemplars === 'object') ? (exemplars as Record<string, unknown>) : {},
  };
}

/**
 * Browser download trigger. 사용자가 파일 다운로드 dialog 통해 저장.
 */
export function downloadHandLearning(filename?: string): { bytes: number; clusterCount: number } {
  if (typeof window === 'undefined') return { bytes: 0, clusterCount: 0 };
  const data = buildHandLearningExport();
  data.exportedAt = new Date().toISOString();
  const json = JSON.stringify(data, null, 2);
  const bytes = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(bytes);
  const a = document.createElement('a');
  a.href = url;
  const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  a.download = filename ?? `handface-learning-${ts}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { bytes: bytes.size, clusterCount: data.clusterFeatures.length };
}

/**
 * JSON text 를 parse + 검증 + localStorage 에 저장.
 * 사용자 가치: 이전 export 한 파일을 가져와서 학습 데이터 복원.
 *
 * 정직 한계:
 *   - localStorage 만 write — worker SNN weight 는 substrate switch 시
 *     v26 sync 가 expandCluster 호출하여 자동 재구성.
 *   - 기존 localStorage 데이터는 overwrite (merge 아님) — 명시 catch 정합.
 */
export function importHandLearningFromJSON(jsonText: string): ImportResult {
  const warnings: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch (e) {
    return {
      ok: false,
      message: `JSON parse 실패: ${e instanceof Error ? e.message : String(e)}`,
      imported: { features: 0, activeInputs: 0, exemplars: 0 },
      warnings,
    };
  }

  if (!parsed || typeof parsed !== 'object') {
    return {
      ok: false,
      message: 'JSON 구조 정합 실패 (root object 없음)',
      imported: { features: 0, activeInputs: 0, exemplars: 0 },
      warnings,
    };
  }
  const obj = parsed as Partial<HandLearningExport>;

  if (typeof obj.schemaVersion !== 'number') {
    warnings.push('schemaVersion 없음 — best-effort import 진행');
  } else if (obj.schemaVersion > SCHEMA_VERSION) {
    return {
      ok: false,
      message: `미지원 schemaVersion ${obj.schemaVersion} (현재 ${SCHEMA_VERSION})`,
      imported: { features: 0, activeInputs: 0, exemplars: 0 },
      warnings,
    };
  }
  if (obj.substrate && obj.substrate !== 'orientation-hand') {
    warnings.push(`substrate ${obj.substrate} 비 hand — best-effort 진행`);
  }

  let featuresCount = 0;
  let activesCount = 0;
  let exemplarsCount = 0;

  if (Array.isArray(obj.clusterFeatures)) {
    // Validate each entry: [number, number[]] with length 95.
    let valid = obj.clusterFeatures.filter((e): e is [number, number[]] =>
      Array.isArray(e) && e.length === 2 &&
      typeof e[0] === 'number' && Array.isArray(e[1]) && e[1].length === 95 &&
      e[1].every((v) => typeof v === 'number' && Number.isFinite(v)),
    );
    if (valid.length !== obj.clusterFeatures.length) {
      warnings.push(`clusterFeatures: ${obj.clusterFeatures.length - valid.length} entries 손상 — skip`);
    }
    // Phase 3.9 v49 (2026-06-04): 19 cluster 초과 catch — 한계 (v30/v31) 정합.
    // import 한 데이터 영역 19 초과 영역 영역 fallback skip 영역 silent 영역 사용자
    // catch 안 됨. 영역 sort by clusterId 영역 첫 19 영역 사용 + 영역 영역 warning.
    const MAX_CAP = 19;
    if (valid.length > MAX_CAP) {
      warnings.push(`clusterFeatures: ${valid.length} cluster 영역 한계 ${MAX_CAP} 초과 — 첫 ${MAX_CAP} 영역 사용 (cluster id sort)`);
      valid = valid.sort((a, b) => a[0] - b[0]).slice(0, MAX_CAP);
    }
    if (valid.length > 0) {
      writeJSON(FEATURES_KEY, valid);
      featuresCount = valid.length;
    } else {
      warnings.push('clusterFeatures 유효 entry 없음');
    }
  } else {
    warnings.push('clusterFeatures 없음 — 학습 데이터 비어있음');
  }

  if (Array.isArray(obj.clusterActiveInputs)) {
    const valid = obj.clusterActiveInputs.filter((e): e is [number, number[]] =>
      Array.isArray(e) && e.length === 2 &&
      typeof e[0] === 'number' && Array.isArray(e[1]) &&
      e[1].every((v) => typeof v === 'number' && Number.isInteger(v) && v >= 0 && v < 95),
    );
    if (valid.length !== obj.clusterActiveInputs.length) {
      warnings.push(`clusterActiveInputs: ${obj.clusterActiveInputs.length - valid.length} entries 손상 — skip`);
    }
    if (valid.length > 0) {
      writeJSON(ACTIVE_KEY, valid);
      activesCount = valid.length;
    }
  }

  if (obj.exemplars && typeof obj.exemplars === 'object') {
    writeJSON(EXEMPLARS_KEY, obj.exemplars);
    exemplarsCount = Object.keys(obj.exemplars).length;
  }

  if (featuresCount === 0 && exemplarsCount === 0) {
    return {
      ok: false,
      message: '유효한 학습 데이터 없음 — JSON 구조 확인',
      imported: { features: 0, activeInputs: 0, exemplars: 0 },
      warnings,
    };
  }

  return {
    ok: true,
    message: `복원 완료: ${featuresCount} cluster features${activesCount > 0 ? ` + ${activesCount} activeInputs` : ''}${exemplarsCount > 0 ? ` + ${exemplarsCount} exemplars` : ''}`,
    imported: { features: featuresCount, activeInputs: activesCount, exemplars: exemplarsCount },
    warnings,
  };
}

/**
 * <input type="file"> 통해 사용자가 JSON 선택 → import.
 * Promise 로 결과 반환 (UI 가 토스트 표시).
 */
export function triggerImportDialog(): Promise<ImportResult> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve({ ok: false, message: 'SSR 환경 — import 불가', imported: { features: 0, activeInputs: 0, exemplars: 0 }, warnings: [] });
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) {
        resolve({ ok: false, message: '파일 선택 취소', imported: { features: 0, activeInputs: 0, exemplars: 0 }, warnings: [] });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result);
        resolve(importHandLearningFromJSON(text));
      };
      reader.onerror = () => {
        resolve({ ok: false, message: '파일 읽기 실패', imported: { features: 0, activeInputs: 0, exemplars: 0 }, warnings: [] });
      };
      reader.readAsText(file);
    });
    input.click();
  });
}
