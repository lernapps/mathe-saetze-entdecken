// Logic for the special lines of a triangle: A = (−2, 0) and B = (2, 0) stay, the learner moves C. The point where the
// perpendicular bisectors (circumcentre), the angle bisectors (incentre) or the altitudes (orthocentre) meet is
// computed, and the distances that should be equal are measured. Lengths in cm. Pure functions.
export type Pt = { x: number; y: number };
export type Kind = "umkreis" | "inkreis" | "hoehen";

export const A: Pt = { x: -2, y: 0 };
export const B: Pt = { x: 2, y: 0 };
export const X_RANGE = [-2.5, 2.5] as const;
export const Y_RANGE = [1.5, 3] as const;
export const STEP = 0.25;

export function clampC(p: Pt): Pt {
  const snap = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.round(v / STEP) * STEP));
  return { x: snap(p.x, X_RANGE[0], X_RANGE[1]), y: snap(p.y, Y_RANGE[0], Y_RANGE[1]) };
}

const dist = (p: Pt, q: Pt): number => Math.hypot(p.x - q.x, p.y - q.y);

/** The distance of p from the line through q and r. */
export function distToLine(p: Pt, q: Pt, r: Pt): number {
  return Math.abs((r.x - q.x) * (p.y - q.y) - (r.y - q.y) * (p.x - q.x)) / dist(q, r);
}

export function circumcentre(c: Pt): Pt {
  const d = 2 * (A.x * (B.y - c.y) + B.x * (c.y - A.y) + c.x * (A.y - B.y));
  const sq = (p: Pt) => p.x * p.x + p.y * p.y;
  return {
    x: (sq(A) * (B.y - c.y) + sq(B) * (c.y - A.y) + sq(c) * (A.y - B.y)) / d,
    y: (sq(A) * (c.x - B.x) + sq(B) * (A.x - c.x) + sq(c) * (B.x - A.x)) / d,
  };
}

export function incentre(c: Pt): Pt {
  const a = dist(B, c);
  const b = dist(c, A);
  const k = dist(A, B);
  const s = a + b + k;
  return { x: (a * A.x + b * B.x + k * c.x) / s, y: (a * A.y + b * B.y + k * c.y) / s };
}

export function orthocentre(c: Pt): Pt {
  const u = circumcentre(c);
  return { x: A.x + B.x + c.x - 2 * u.x, y: A.y + B.y + c.y - 2 * u.y };
}

/** Whether the point lies inside the triangle ABC. */
export function inside(p: Pt, c: Pt): boolean {
  const side = (q: Pt, r: Pt) => (r.x - q.x) * (p.y - q.y) - (r.y - q.y) * (p.x - q.x);
  const s = [side(A, B), side(B, c), side(c, A)];
  return s.every((v) => v > 1e-9) || s.every((v) => v < -1e-9);
}

export type Measures = { point: Pt; values: [number, number, number]; inside: boolean; radius: number };

export function measure(kind: Kind, c: Pt): Measures {
  if (kind === "umkreis") {
    const u = circumcentre(c);
    return { point: u, values: [dist(u, A), dist(u, B), dist(u, c)], inside: inside(u, c), radius: dist(u, A) };
  }
  if (kind === "inkreis") {
    const i = incentre(c);
    const values: [number, number, number] = [distToLine(i, A, B), distToLine(i, B, c), distToLine(i, c, A)];
    return { point: i, values, inside: inside(i, c), radius: values[0] };
  }
  const h = orthocentre(c);
  // distance of H to the altitude from each vertex: the component of H − vertex along the opposite side
  const along = (v: Pt, q: Pt, r: Pt) => Math.abs((h.x - v.x) * (r.x - q.x) + (h.y - v.y) * (r.y - q.y)) / dist(q, r);
  const values: [number, number, number] = [along(A, B, c), along(B, c, A), along(c, A, B)];
  return { point: h, values, inside: inside(h, c), radius: 0 };
}

function num(value: number): string {
  const r = Math.round(value * 10) / 10;
  return String(Math.abs(r) < 0.05 ? 0 : r).replace(".", ",");
}

/** Fill {w1}, {w2}, {w3} (the three distances) and {lage} (inside or outside). */
export function fill(template: string, kind: Kind, c: Pt, insideWord: string, outsideWord: string): string {
  const m = measure(kind, c);
  return template
    .replaceAll("{w1}", num(m.values[0]))
    .replaceAll("{w2}", num(m.values[1]))
    .replaceAll("{w3}", num(m.values[2]))
    .replaceAll("{lage}", m.inside ? insideWord : outsideWord);
}

export function cornerForKey(c: Pt, key: string): Pt | undefined {
  switch (key) {
    case "ArrowRight":
      return clampC({ x: c.x + STEP, y: c.y });
    case "ArrowLeft":
      return clampC({ x: c.x - STEP, y: c.y });
    case "ArrowUp":
      return clampC({ x: c.x, y: c.y + STEP });
    case "ArrowDown":
      return clampC({ x: c.x, y: c.y - STEP });
    default:
      return undefined;
  }
}
