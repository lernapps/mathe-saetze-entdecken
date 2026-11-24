// Logic of the drag mode for quadrilaterals: A = (0, 0) and B = (5, 0) stay, the learner moves C and D on a grid of
// 1\u00A0cm. The properties of the quadrilateral ABCD are computed from the corners, never stated. Pure functions.
export type P = { x: number; y: number };
export type Corners = { c: P; d: P };

export const B: P = { x: 5, y: 0 };
export const X_RANGE = [0, 9] as const;
export const Y_RANGE = [1, 6] as const;

export function clampPoint(p: P): P {
  return {
    x: Math.min(X_RANGE[1], Math.max(X_RANGE[0], Math.round(p.x))),
    y: Math.min(Y_RANGE[1], Math.max(Y_RANGE[0], Math.round(p.y))),
  };
}

const A: P = { x: 0, y: 0 };
const sub = (p: P, q: P): P => ({ x: p.x - q.x, y: p.y - q.y });
const cross = (u: P, v: P): number => u.x * v.y - u.y * v.x;
const dot = (u: P, v: P): number => u.x * v.x + u.y * v.y;
const len2 = (u: P): number => u.x * u.x + u.y * u.y;
const at = (list: P[], i: number): P => list[i] ?? A;

/** Whether ABCD (in this order) is a convex quadrilateral: all turns go the same way. */
export function isConvex({ c, d }: Corners): boolean {
  const v = [A, B, c, d];
  for (let i = 0; i < 4; i++) {
    const a = sub(at(v, (i + 1) % 4), at(v, i));
    const b = sub(at(v, (i + 2) % 4), at(v, (i + 1) % 4));
    if (cross(a, b) <= 0) return false;
  }
  return true;
}

export type Measures = {
  sides: number[];
  parallelPairs: number;
  rightAngles: number;
  axes: number;
  pointSymmetric: boolean;
};

function reflect(p: P, through: P, dir: P): P {
  const t = dot(sub(p, through), dir) / len2(dir);
  const foot = { x: through.x + dir.x * t, y: through.y + dir.y * t };
  return { x: 2 * foot.x - p.x, y: 2 * foot.y - p.y };
}

function sameSet(a: P[], b: P[]): boolean {
  return a.every((p) => b.some((q) => Math.abs(p.x - q.x) < 1e-9 && Math.abs(p.y - q.y) < 1e-9));
}

export function measure({ c, d }: Corners): Measures {
  const v = [A, B, c, d];
  const edges = v.map((p, i) => sub(at(v, (i + 1) % 4), p));
  const sides = edges.map((e) => Math.sqrt(len2(e)));
  const parallelPairs =
    (cross(at(edges, 0), at(edges, 2)) === 0 ? 1 : 0) + (cross(at(edges, 1), at(edges, 3)) === 0 ? 1 : 0);
  let rightAngles = 0;
  for (let i = 0; i < 4; i++) if (dot(at(edges, i), at(edges, (i + 1) % 4)) === 0) rightAngles++;
  // candidate axes: the diagonals and the perpendicular bisectors of AB and BC
  const mid = (p: P, q: P): P => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const perp = (e: P): P => ({ x: -e.y, y: e.x });
  const axes = [
    { through: A, dir: sub(c, A) },
    { through: B, dir: sub(d, B) },
    { through: mid(A, B), dir: perp(at(edges, 0)) },
    { through: mid(B, c), dir: perp(at(edges, 1)) },
  ].filter(({ through, dir }) =>
    sameSet(
      v.map((p) => reflect(p, through, dir)),
      v,
    ),
  ).length;
  const m1 = mid(A, c);
  const m2 = mid(B, d);
  return { sides, parallelPairs, rightAngles, axes, pointSymmetric: m1.x === m2.x && m1.y === m2.y };
}

function num(value: number): string {
  return String(Math.round(value * 10) / 10).replace(".", ",");
}

/** Fill {seiten}, {parallel}, {recht}, {achsen} and {punkt} of a text. */
export function fill(template: string, corners: Corners, yes: string, no: string): string {
  const m = measure(corners);
  return template
    .replaceAll("{seiten}", m.sides.map((s, i) => `${["AB", "BC", "CD", "DA"][i]} ${num(s)}\u00A0cm`).join(" · "))
    .replaceAll("{parallel}", String(m.parallelPairs))
    .replaceAll("{recht}", String(m.rightAngles))
    .replaceAll("{achsen}", String(m.axes))
    .replaceAll("{punkt}", m.pointSymmetric ? yes : no);
}

/** The next position of a point for a key: one cm per arrow key, undefined for any other key. */
export function pointForKey(p: P, key: string): P | undefined {
  switch (key) {
    case "ArrowRight":
      return clampPoint({ x: p.x + 1, y: p.y });
    case "ArrowLeft":
      return clampPoint({ x: p.x - 1, y: p.y });
    case "ArrowUp":
      return clampPoint({ x: p.x, y: p.y + 1 });
    case "ArrowDown":
      return clampPoint({ x: p.x, y: p.y - 1 });
    default:
      return undefined;
  }
}
