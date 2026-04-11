export interface Point2D {
  x: number;
  y: number;
}

export function distance(a: Point2D, b: Point2D): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function lerp(current: number, target: number, alpha: number): number {
  return current + alpha * (target - current);
}
