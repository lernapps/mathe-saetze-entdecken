import { expect, test } from "vite-plus/test";
import { RADIUS, chordLength, clampD, commonPoints, dForKey, fill } from "./Kreisgerade.ts";

test("two common points inside the radius, one at the radius (tangent), none outside", () => {
  expect([0, 1, 3].map(commonPoints)).toEqual([2, 2, 2]);
  expect(commonPoints(RADIUS)).toBe(1);
  expect([5, 6].map(commonPoints)).toEqual([0, 0]);
});

test("the chord is the diameter through the centre and shrinks to 0 at the tangent", () => {
  expect(chordLength(0)).toBe(8);
  expect(chordLength(3)).toBeCloseTo(2 * Math.sqrt(7), 9);
  expect(chordLength(RADIUS)).toBe(0);
  expect(chordLength(6)).toBe(0);
});

test("d stays in range and keys move one centimetre", () => {
  expect(clampD(-2)).toBe(0);
  expect(clampD(9)).toBe(6);
  expect(dForKey(3, "ArrowUp")).toBe(4);
  expect(dForKey(0, "ArrowDown")).toBe(0);
  expect(dForKey(3, "End")).toBe(6);
  expect(dForKey(3, "q")).toBeUndefined();
});

test("texts are filled with a decimal comma", () => {
  expect(fill("d = {d} cm, {n} Punkte, Sehne {s} cm", 3)).toBe("d = 3 cm, 2 Punkte, Sehne 5,3 cm");
});
