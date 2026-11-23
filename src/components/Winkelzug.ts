// Logic of the drag mode for angle theorems: kind "parallelen" (a line across two parallels, the learner changes its
// slope) and kind "dreieck" (the corner C of a triangle ABC moves, A and B stay). Angles are measured from the
// geometry, never stated. Pure functions, no browser globals.
import { formatAngle } from "./Zugmodus.ts";

export type Kind = "parallelen" | "dreieck";
export type Parallel = { phi: number };
export type Corner = { x: number; y: number };

export const PHI_MIN = 40;
export const PHI_MAX = 140;
export const PHI_STEP = 5;
export const C_X = [-3, 3] as const;
export const C_Y = [0.5, 3] as const;
export const C_STEP = 0.25;

export function clampPhi(phi: number): number {
  return Math.min(PHI_MAX, Math.max(PHI_MIN, Math.round(phi / PHI_STEP) * PHI_STEP));
}

export function clampCorner(c: Corner): Corner {
  const snap = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.round(v / C_STEP) * C_STEP));
  return { x: snap(c.x, C_X[0], C_X[1]), y: snap(c.y, C_Y[0], C_Y[1]) };
}

function between(ux: number, uy: number, vx: number, vy: number): number {
  const cos = (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI;
}

/** Two parallels y = 0 and y = 1, a line through O = (0, 0) with slope phi. α at O (right, up), β at U (right, up),
 *  γ at U (left, down), δ at O (left, up): measured between the directions of the rays. */
export function parallelAngles(phi: number): { alpha: number; beta: number; gamma: number; delta: number } {
  const r = (phi * Math.PI) / 180;
  const up = [Math.cos(r), Math.sin(r)] as const;
  return {
    alpha: between(1, 0, up[0], up[1]),
    beta: between(1, 0, up[0], up[1]),
    gamma: between(-1, 0, -up[0], -up[1]),
    delta: between(-1, 0, up[0], up[1]),
  };
}

/** The angles of the triangle A = (−2, 0), B = (2, 0), C, each rounded to one decimal; γ is the rest to 180°, so the
 *  shown angles add up to exactly 180°. */
export function triangleAngles(c: Corner): { alpha: number; beta: number; gamma: number } {
  const alpha = Math.round(between(4, 0, c.x + 2, c.y) * 10) / 10;
  const beta = Math.round(between(-4, 0, c.x - 2, c.y) * 10) / 10;
  return { alpha, beta, gamma: Math.round((180 - alpha - beta) * 10) / 10 };
}

export function fillAngles(template: string, values: Record<string, number>): string {
  let out = template;
  for (const [key, value] of Object.entries(values)) out = out.replaceAll(`{${key}}`, formatAngle(value));
  return out;
}

export function phiForKey(phi: number, key: string): number | undefined {
  switch (key) {
    case "ArrowRight":
    case "ArrowUp":
      return clampPhi(phi + PHI_STEP);
    case "ArrowLeft":
    case "ArrowDown":
      return clampPhi(phi - PHI_STEP);
    case "Home":
      return PHI_MIN;
    case "End":
      return PHI_MAX;
    default:
      return undefined;
  }
}

export function cornerForKey(c: Corner, key: string): Corner | undefined {
  switch (key) {
    case "ArrowRight":
      return clampCorner({ x: c.x + C_STEP, y: c.y });
    case "ArrowLeft":
      return clampCorner({ x: c.x - C_STEP, y: c.y });
    case "ArrowUp":
      return clampCorner({ x: c.x, y: c.y + C_STEP });
    case "ArrowDown":
      return clampCorner({ x: c.x, y: c.y - C_STEP });
    default:
      return undefined;
  }
}
