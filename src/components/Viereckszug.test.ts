import { expect, test } from "vite-plus/test";
import { clampPoint, fill, isConvex, measure, pointForKey } from "./Viereckszug.ts";

const corners = {
  quadrat: { c: { x: 5, y: 5 }, d: { x: 0, y: 5 } },
  rechteck: { c: { x: 5, y: 3 }, d: { x: 0, y: 3 } },
  raute: { c: { x: 8, y: 4 }, d: { x: 3, y: 4 } },
  parallelogramm: { c: { x: 7, y: 3 }, d: { x: 2, y: 3 } },
  drachen: { c: { x: 6, y: 3 }, d: { x: 3, y: 4 } },
  trapez: { c: { x: 4, y: 3 }, d: { x: 1, y: 3 } },
};

test("a square has four right angles, equal sides, two pairs of parallels and four axes", () => {
  const m = measure(corners.quadrat);
  expect(m.sides).toEqual([5, 5, 5, 5]);
  expect([m.parallelPairs, m.rightAngles, m.axes, m.pointSymmetric]).toEqual([2, 4, 4, true]);
});

test("rectangle, rhombus, parallelogram, kite, trapezium", () => {
  expect(measure(corners.rechteck)).toMatchObject({ parallelPairs: 2, rightAngles: 4, axes: 2, pointSymmetric: true });
  expect(measure(corners.raute)).toMatchObject({ parallelPairs: 2, rightAngles: 0, axes: 2, pointSymmetric: true });
  expect(measure(corners.parallelogramm)).toMatchObject({
    parallelPairs: 2,
    rightAngles: 0,
    axes: 0,
    pointSymmetric: true,
  });
  expect(measure(corners.drachen)).toMatchObject({ parallelPairs: 0, axes: 1, pointSymmetric: false });
  expect(measure(corners.trapez)).toMatchObject({ parallelPairs: 1, rightAngles: 0, axes: 1, pointSymmetric: false });
});

test("only convex quadrilaterals count; positions stay on the grid", () => {
  expect(Object.values(corners).every(isConvex)).toBe(true);
  expect(isConvex({ c: { x: 1, y: 1 }, d: { x: 4, y: 3 } })).toBe(false);
  expect(clampPoint({ x: 20, y: -3 })).toEqual({ x: 9, y: 1 });
  expect(pointForKey({ x: 2, y: 2 }, "ArrowUp")).toEqual({ x: 2, y: 3 });
  expect(pointForKey({ x: 2, y: 2 }, "q")).toBeUndefined();
});

test("texts are filled with decimal commas", () => {
  expect(fill("{seiten} | {parallel} | {recht} | {achsen} | {punkt}", corners.drachen, "ja", "nein")).toBe(
    "5 cm · 3,2 cm · 3,2 cm · 5 cm | 0 | 1 | 1 | nein",
  );
});
