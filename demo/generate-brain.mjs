/**
 * 뇌 OBJ 생성 — 양반구 각각 전체 구(360°)에서 안쪽면만 평탄화.
 * 실행: node demo/generate-brain.mjs
 */
import { writeFileSync } from 'fs';

const SEGS = 64, RINGS = 48;
const R = 1.0, SX = 1.30, SY = 0.78, SZ = 1.02;
const CLEFT = 0.05;

function brainNoise(x, y, z) {
  return 0.50 * Math.sin(x*2.3 + y*3.7 + z*1.9 + Math.cos(y*1.3))
       + 0.25 * Math.sin(x*5.1 + y*7.3 + z*4.7 + Math.sin(z*2.1))
       + 0.13 * Math.sin(x*11.3 + y*13.7 + z*9.1)
       + 0.06 * Math.sin(x*23.7 + y*29.3 + z*19.9);
}

function deform(nx, ny, nz) {
  let yScale = 1.0;
  if (ny < -0.25) yScale = 0.6 + 0.4 * ((ny + 1) / 0.75);
  const tw = ny > 0 ? 1 + 0.08 * ny : 1;

  let bulge = 1.0;
  if (nx > 0.2 && ny > -0.4) bulge += 0.25 * Math.max(0, nx-0.2) * (1.2 - Math.abs(ny));
  if (ny > 0.35) bulge += 0.15 * (ny - 0.35);
  if (nx < -0.35 && ny > -0.3) bulge += 0.18 * Math.pow(Math.abs(nx)-0.35, 0.7);
  if (Math.abs(nz) > 0.3 && ny < 0.15) bulge += 0.22 * (Math.abs(nz)-0.3) * (0.6-ny);
  if (nx < -0.15 && ny < -0.3) bulge += 0.35 * Math.max(0, Math.abs(nx+0.15)+Math.abs(ny+0.3)-0.08);

  const fold = 0.10 * brainNoise(nx*6, ny*6, nz*6);
  const cs = (Math.abs(nx)<0.12 && ny>0.1) ? -0.08*(1-Math.abs(nx)/0.12)*ny : 0;
  const ls = (Math.abs(nz)>0.25 && ny>-0.15 && ny<0.25) ? -0.06*Math.max(0,Math.abs(nz)-0.25) : 0;

  const fr = bulge * (1 + fold + cs + ls);
  return {
    x: nx * R * SX * fr * tw,
    y: ny * R * SY * fr * yScale,
    z: nz * R * SZ * fr * tw,
  };
}

let obj = '# Brain mesh — two closed hemispheres\n';
let globalV = 0;

for (const sign of [1, -1]) {
  obj += `g hemisphere_${sign > 0 ? 'right' : 'left'}\n`;
  const vBase = globalV;

  for (let j = 0; j <= RINGS; j++) {
    const lat = (j / RINGS) * Math.PI;
    const sinL = Math.sin(lat), cosL = Math.cos(lat);
    for (let i = 0; i <= SEGS; i++) {
      const lon = (i / SEGS) * 2 * Math.PI;  // 전체 360°
      let nx = sinL * Math.cos(lon);
      const ny = cosL;
      let nz = sinL * Math.sin(lon);

      // 안쪽면 평탄화 (완전 닫힌 형태, 내측면만 살짝 눌림)
      if (sign > 0 && nz < 0) nz *= 0.12;
      if (sign < 0 && nz > 0) nz *= 0.12;

      const d = deform(nx, ny, nz);
      d.z += sign * CLEFT;

      obj += `v ${d.x.toFixed(5)} ${d.y.toFixed(5)} ${d.z.toFixed(5)}\n`;
      globalV++;
    }
  }

  for (let j = 0; j < RINGS; j++) {
    for (let i = 0; i < SEGS; i++) {
      const a = vBase + j * (SEGS + 1) + i + 1;
      const b = a + 1;
      const c = a + SEGS + 1;
      const d = c + 1;
      if (sign > 0) {
        obj += `f ${a} ${c} ${b}\nf ${b} ${c} ${d}\n`;
      } else {
        obj += `f ${a} ${b} ${c}\nf ${b} ${d} ${c}\n`;  // 반전 (법선 바깥)
      }
    }
  }
}

writeFileSync('demo/brain.obj', obj);
console.log(`brain.obj: ${(obj.length / 1024).toFixed(0)} KB, ${globalV} vertices`);