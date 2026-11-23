import { expect, test } from "vite-plus/test";
import { MODES, RANGE, count, fill, sideLength, triangles } from "./Dreiecksstuecke.ts";

const words = { "0": "keins", "1": "eins", "2": "zwei", many: "viele" };

test("SSS: a triangle exists only when the third side is shorter than the other two together and longer than their difference", () => {
  expect([1, 2, 3].map((c) => count("sss", c))).toEqual(["0", "0", "1"]);
  expect([9, 10, 11].map((c) => count("sss", c))).toEqual(["1", "0", "0"]);
  const [t] = triangles("sss", 5);
  expect(sideLength(t!.a, t!.c)).toBeCloseTo(6, 9);
  expect(sideLength(t!.b, t!.c)).toBeCloseTo(4, 9);
});

test("SWS fits exactly one triangle for every angle; WSW needs α + β below 180°", () => {
  for (let v = RANGE.sws.min; v <= RANGE.sws.max; v += RANGE.sws.step) expect(triangles("sws", v)).toHaveLength(1);
  expect([120, 130, 140, 150].map((b) => count("wsw", b))).toEqual(["1", "0", "0", "0"]);
});

test("SSA: none, two or one triangle depending on the side opposite the given angle", () => {
  expect(count("ssa", 3)).toBe("0");
  expect(count("ssa", 4)).toBe("2");
  expect(count("ssa", 5)).toBe("1");
  expect(count("ssa", 7)).toBe("1");
  const two = triangles("ssa", 4);
  expect(two).toHaveLength(2);
  for (const t of two) expect(sideLength(t.b, t.c)).toBeCloseTo(4, 9);
});

test("WWW fits triangles of every size; texts are filled", () => {
  expect(count("www", 3)).toBe("many");
  expect(sideLength(triangles("www", 2)[0]!.a, triangles("www", 2)[0]!.b)).toBe(2);
  expect(fill("c = {v} cm: {n}", 4.5, words, "ssa")).toBe("c = 4,5 cm: zwei");
  expect(MODES).toHaveLength(5);
});
