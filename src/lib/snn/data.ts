// SNN 시각화에서 시냅스 weight 를 색감으로 매핑.
// inhibitory (w<0): red — V1 L4_I → V1 L4_E
// weak (0~50):     cyan
// mid (50~100):    yellow
// strong (>=100):  purple — V1 L23_E → V2 L4_E
export function weightColor(weight: number): string {
  if (weight < 0)   return '#e76f6f';
  if (weight < 50)  return '#4dd0e1';
  if (weight < 100) return '#f5b842';
  return '#b794f4';
}
