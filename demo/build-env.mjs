import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '.env');

let IRIS_API_KEY = '';
let IRIS_ENDPOINT = 'https://whatpull-iris-assistant.hf.space';

// .env 파일 읽기
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key?.trim() === 'IRIS_API_KEY')
      IRIS_API_KEY = val.join('=').trim();
    if (key?.trim() === 'IRIS_ENDPOINT')
      IRIS_ENDPOINT = val.join('=').trim();
  });
  console.log('[build-env] .env 로드 완료');
  console.log(`  IRIS_API_KEY: ${IRIS_API_KEY ? '***설정됨***' : '없음'}`);
  console.log(`  IRIS_ENDPOINT: ${IRIS_ENDPOINT}`);
} else {
  console.warn('[build-env] .env 파일 없음 - API Key 없이 빌드');
}

// iris-config.js 생성 (브라우저에서 읽을 설정 파일)
const configContent = `
// IRIS 자동 생성 설정 파일 (build-env.mjs 에 의해 생성됨)
// 이 파일은 git에 포함되지 않습니다.
window.__IRIS_CONFIG__ = {
  apiKey:   '${IRIS_API_KEY}',
  endpoint: '${IRIS_ENDPOINT}',
};
console.log('[IRIS] 자동 설정 로드 완료');
`.trim();

writeFileSync(resolve(__dirname, 'iris-config.js'), configContent);
console.log('[build-env] demo/iris-config.js 생성 완료');