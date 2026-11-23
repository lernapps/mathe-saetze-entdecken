// Logic of the drag mode for a line and a circle: a circle with radius 4 cm and a horizontal line at the distance d
// from the centre, d = 0 to 6 cm in steps of 1 cm. The number of common points is computed, never stated.
// Pure functions, no browser globals.
export const RADIUS = 4;
export const D_MAX = 6;

export function clampD(d: number): number {
  return Math.min(D_MAX, Math.max(0, Math.round(d)));
}

/** The number of common points of the circle and the line at distance d from M: 2, 1 or 0. */
export function commonPoints(d: number): 0 | 1 | 2 {
  if (d < RADIUS) return 2;
  return d === RADIUS ? 1 : 0;
}

/** The length of the chord the line cuts from the circle, in cm; 0 for a tangent or no common point. */
export function chordLength(d: number): number {
  return d >= RADIUS ? 0 : 2 * Math.sqrt(RADIUS * RADIUS - d * d);
}

export function formatNumber(value: number): string {
  return String(Math.round(value * 10) / 10).replace(".", ",");
}

export function fill(template: string, d: number): string {
  return template
    .replaceAll("{d}", String(d))
    .replaceAll("{n}", String(commonPoints(d)))
    .replaceAll("{s}", formatNumber(chordLength(d)))
    .replaceAll("{r}", String(RADIUS));
}

export function dForKey(d: number, key: string): number | undefined {
  switch (key) {
    case "ArrowUp":
    case "ArrowRight":
      return clampD(d + 1);
    case "ArrowDown":
    case "ArrowLeft":
      return clampD(d - 1);
    case "Home":
      return 0;
    case "End":
      return D_MAX;
    default:
      return undefined;
  }
}
