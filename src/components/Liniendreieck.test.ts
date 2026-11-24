import { expect, test } from "vite-plus/test";
import {
  A,
  B,
  circumcentre,
  clampC,
  cornerForKey,
  fill,
  incentre,
  inside,
  measure,
  orthocentre,
} from "./Liniendreieck.ts";

const positions = [
  { x: 0, y: 2 },
  { x: 1, y: 3 },
  { x: -2.5, y: 1.5 },
  { x: 2.5, y: 2 },
  { x: -1.25, y: 1.75 },
];

test("the circumcentre is equally far from A, B and C", () => {
  for (const c of positions) {
    const [a, b, k] = measure("umkreis", c).values;
    expect(b).toBeCloseTo(a, 9);
    expect(k).toBeCloseTo(a, 9);
  }
  expect(circumcentre({ x: 0, y: 2 })).toEqual({ x: 0, y: 0 });
});

test("the incentre is equally far from the three sides", () => {
  for (const c of positions) {
    const [a, b, k] = measure("inkreis", c).values;
    expect(b).toBeCloseTo(a, 9);
    expect(k).toBeCloseTo(a, 9);
    expect(inside(incentre(c), c)).toBe(true);
  }
});

test("the orthocentre lies on all three altitudes; it is outside for an obtuse triangle", () => {
  for (const c of positions) for (const v of measure("hoehen", c).values) expect(v).toBeCloseTo(0, 9);
  expect(orthocentre({ x: 0, y: 2 })).toEqual({ x: 0, y: 2 });
  expect(measure("hoehen", { x: -2.5, y: 1.5 }).inside).toBe(false);
  expect(measure("hoehen", { x: 0, y: 3 }).inside).toBe(true);
  expect(A.x + B.x).toBe(0);
});

test("C stays in range, keys move one step, texts are filled", () => {
  expect(clampC({ x: 9, y: 0 })).toEqual({ x: 2.5, y: 1.5 });
  expect(cornerForKey({ x: 0, y: 2 }, "ArrowRight")).toEqual({ x: 0.25, y: 2 });
  expect(cornerForKey({ x: 0, y: 2 }, "q")).toBeUndefined();
  expect(fill("{w1} | {w2} | {w3} | {lage}", "umkreis", { x: 0, y: 3 }, "innen", "außen")).toBe(
    "2,2 | 2,2 | 2,2 | innen",
  );
});
