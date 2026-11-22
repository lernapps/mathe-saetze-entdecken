// Logic of the drag mode (Zugmodus): a point C on the half circle over the diameter AB. The angles of the triangle ABC
// are measured, never stated: the learner sees what stays the same. Pure functions, no browser globals.

/** The first and the last position of C on the half circle, in degrees from B (0°) over the top to A (180°). */
export const T_MIN = 10;
export const T_MAX = 170;
export const T_STEP = 5;

export type Angles = { alpha: number; beta: number; gamma: number };

/** Keep t on the half circle, away from A and B, where there is no triangle. */
export function clampT(t: number): number {
  return Math.min(T_MAX, Math.max(T_MIN, Math.round(t)));
}

/** C on the unit circle around M = (0, 0) with A = (−1, 0) and B = (1, 0); y points up. */
export function pointC(t: number): { x: number; y: number } {
  const r = (t * Math.PI) / 180;
  return { x: Math.cos(r), y: Math.sin(r) };
}

function angleBetween(ux: number, uy: number, vx: number, vy: number): number {
  const cos = (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI;
}

/** The measured angles at A, B and C of the triangle ABC with C = pointC(t), in degrees. */
export function angles(t: number): Angles {
  const c = pointC(t);
  return {
    alpha: angleBetween(2, 0, c.x + 1, c.y),
    beta: angleBetween(-2, 0, c.x - 1, c.y),
    gamma: angleBetween(-1 - c.x, -c.y, 1 - c.x, -c.y),
  };
}

/** An angle as text with a decimal comma and without a useless ",0": 90 → "90", 37.34 → "37,3". */
export function formatAngle(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return String(rounded).replace(".", ",");
}

/** Fill {α}, {β} and {γ} of a text with the measured angles. */
export function fill(template: string, a: Angles): string {
  return template
    .replaceAll("{α}", formatAngle(a.alpha))
    .replaceAll("{β}", formatAngle(a.beta))
    .replaceAll("{γ}", formatAngle(a.gamma));
}

/** The position t for a pointer at (x, y) relative to the centre M, y pointing up. */
export function tFromPointer(x: number, y: number): number {
  return clampT((Math.atan2(y, x) * 180) / Math.PI);
}

/** The next position for a key, or undefined for a key that does nothing. */
export function tForKey(t: number, key: string): number | undefined {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return clampT(t - T_STEP);
    case "ArrowLeft":
    case "ArrowUp":
      return clampT(t + T_STEP);
    case "Home":
      return T_MIN;
    case "End":
      return T_MAX;
    default:
      return undefined;
  }
}
