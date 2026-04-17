import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath   = resolve(__dirname, '../.env');              // 루트 .env 사용
const outDir    = resolve(__dirname, 'public');               // vite publicDir
const outPath   = resolve(outDir, 'iris-config.js');

// ── 모드 판별 ────────────────────────────────────────────────
// --local 플래그가 있어야 .env 값을 embed. 그 외엔 항상 빈 키 (공개 배포 안전)
const INCLUDE_SECRETS = process.argv.includes('--local');

let IRIS_API_KEY  = '';
let IRIS_ENDPOINT = 'https://whatpull-iris-assistant.hf.space';

if (INCLUDE_SECRETS) {
  // 로컬 개발: .env 읽어서 키 embed
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...val] = line.split('=');
      if (key?.trim() === 'IRIS_API_KEY')
        IRIS_API_KEY = val.join('=').trim();
      if (key?.trim() === 'IRIS_ENDPOINT')
        IRIS_ENDPOINT = val.join('=').trim();
    });
    console.log('[build-env] --local 모드: .env 로드 완료');
    console.log(`  IRIS_API_KEY: ${IRIS_API_KEY ? '***embed됨***' : '비어있음'}`);
    console.log(`  IRIS_ENDPOINT: ${IRIS_ENDPOINT}`);
  } else {
    console.warn('[build-env] --local 모드지만 .env 없음 - 빈 키로 생성');
  }
} else {
  // 배포 모드: 키 embed 안 함. 사용자는 Settings UI 에서 직접 입력
  console.log('[build-env] 배포 모드: iris-config.js 는 빈 키로 생성 (공개 배포 안전)');
  console.log(`  IRIS_API_KEY: (비어있음 - 방문자가 Settings 에서 입력)`);
  console.log(`  IRIS_ENDPOINT: ${IRIS_ENDPOINT}`);
}

// iris-config.js 생성
const configContent = `
// IRIS 자동 생성 설정 파일 (build-env.mjs 에 의해 생성됨)
// 이 파일은 git 에 포함되지 않으며, 배포 모드에서는 apiKey 가 비어있습니다.
window.__IRIS_CONFIG__ = {
  apiKey:   '${IRIS_API_KEY}',
  endpoint: '${IRIS_ENDPOINT}',
};
console.log('[IRIS] 자동 설정 로드 완료' + (${IRIS_API_KEY ? 'true' : 'false'} ? ' (키 embed됨)' : ' (Settings 입력 필요)'));
`.trim();

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, configContent);
console.log('[build-env] demo/public/iris-config.js 생성 완료');
