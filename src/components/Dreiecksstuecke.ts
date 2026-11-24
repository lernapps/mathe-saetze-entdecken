// Logic for "which triangles fit three given pieces?": the modes SSS, SWS, WSW, SSA and WWW. One piece is free (a
// slider); the triangles that fit are computed, never stated. Lengths in cm, angles in degrees. Pure functions.
export type Mode = "sss" | "sws" | "wsw" | "ssa" | "www";
export type Pt = { x: number; y: number };
export type Triangle = { a: Pt; b: Pt; c: Pt };

export const MODES: Mode[] = ["sss", "sws", "wsw", "ssa", "www"];

/** The range of the free piece per mode: min, max, step, start. */
export const RANGE: Record<Mode, { min: number; max: number; step: number; start: number }> = {
  sss: { min: 1, max: 11, step: 1, start: 5 },
  sws: { min: 20, max: 160, step: 10, start: 60 },
  wsw: { min: 10, max: 150, step: 10, start: 60 },
  ssa: { min: 1, max: 10, step: 0.5, start: 4 },
  www: { min: 2, max: 8, step: 2, start: 4 },
};

const rad = (deg: number): number => (deg * Math.PI) / 180;
const EPS = 1e-9;

/** All triangles A, B, C (A at the origin, B on the x axis) that fit the pieces of the mode with the free piece v. */
export function triangles(mode: Mode, v: number): Triangle[] {
  const A: Pt = { x: 0, y: 0 };
  switch (mode) {
    case "sss": {
      // a = BC = 4, b = AC = 6, c = AB = v
      const a = 4;
      const b = 6;
      if (!(v > Math.abs(a - b) + EPS && v < a + b - EPS)) return [];
      const x = (b * b + v * v - a * a) / (2 * v);
      return [{ a: A, b: { x: v, y: 0 }, c: { x, y: Math.sqrt(b * b - x * x) } }];
    }
    case "sws": {
      // b = AC = 5, c = AB = 6, alpha = v
      return [{ a: A, b: { x: 6, y: 0 }, c: { x: 5 * Math.cos(rad(v)), y: 5 * Math.sin(rad(v)) } }];
    }
    case "wsw": {
      // c = AB = 6, alpha = 50°, beta = v
      if (50 + v >= 180 - EPS) return [];
      const b = (6 * Math.sin(rad(v))) / Math.sin(rad(50 + v));
      return [{ a: A, b: { x: 6, y: 0 }, c: { x: b * Math.cos(rad(50)), y: b * Math.sin(rad(50)) } }];
    }
    case "ssa": {
      // b = AC = 5, alpha = 40°, a = BC = v
      const c = { x: 5 * Math.cos(rad(40)), y: 5 * Math.sin(rad(40)) };
      if (v < c.y - EPS) return [];
      const d = Math.sqrt(Math.max(0, v * v - c.y * c.y));
      const xs = d < EPS ? [c.x] : [c.x - d, c.x + d];
      return xs.filter((x) => x > EPS).map((x) => ({ a: A, b: { x, y: 0 }, c }));
    }
    case "www": {
      // alpha = 50°, beta = 60°, gamma = 70°, c = AB = v
      const c = v;
      const b = (c * Math.sin(rad(60))) / Math.sin(rad(70));
      return [{ a: A, b: { x: c, y: 0 }, c: { x: b * Math.cos(rad(50)), y: b * Math.sin(rad(50)) } }];
    }
  }
}

/** The number of different triangles for the pieces: 0, 1, 2, or "many" for WWW (every size fits). */
export function count(mode: Mode, v: number): "0" | "1" | "2" | "many" {
  if (mode === "www") return "many";
  return String(triangles(mode, v).length) as "0" | "1" | "2";
}

function num(value: number): string {
  return String(Math.round(value * 10) / 10).replace(".", ",");
}

export function fill(template: string, v: number, words: Record<"0" | "1" | "2" | "many", string>, mode: Mode): string {
  return template.replaceAll("{v}", num(v)).replaceAll("{n}", words[count(mode, v)]);
}

export function sideLength(p: Pt, q: Pt): number {
  return Math.hypot(p.x - q.x, p.y - q.y);
}
