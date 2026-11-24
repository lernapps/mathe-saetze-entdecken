import { expect, test } from "vite-plus/test";
import {
  clampCorner,
  clampPhi,
  cornerForKey,
  fillAngles,
  parallelAngles,
  phiForKey,
  triangleAngles,
} from "./Winkelzug.ts";

test("at parallels, Stufenwinkel and Wechselwinkel are equal and Nebenwinkel add up to 180°", () => {
  for (let phi = 40; phi <= 140; phi += 5) {
    const a = parallelAngles(phi);
    expect(a.alpha).toBeCloseTo(phi, 6);
    expect(a.beta).toBeCloseTo(a.alpha, 6);
    expect(a.gamma).toBeCloseTo(a.alpha, 6);
    expect(a.alpha + a.delta).toBeCloseTo(180, 6);
  }
});

function triangleAnglesExact(x: number, y: number): number {
  const u = Math.atan2(y, x + 2);
  const v = Math.atan2(y, 2 - x);
  return 180 - (u * 180) / Math.PI - (v * 180) / Math.PI;
}

test("the angles of every triangle add up to 180°", () => {
  for (let x = -3; x <= 3; x += 0.25)
    for (let y = 0.5; y <= 3; y += 0.25) {
      const t = triangleAngles({ x, y });
      expect(t.alpha + t.beta + t.gamma).toBeCloseTo(180, 9);
      expect(Math.abs(t.gamma - triangleAnglesExact(x, y))).toBeLessThan(0.11);
    }
});

test("positions stay in range and keys move one step", () => {
  expect(clampPhi(10)).toBe(40);
  expect(clampPhi(200)).toBe(140);
  expect(clampCorner({ x: 9, y: -1 })).toEqual({ x: 3, y: 0.5 });
  expect(phiForKey(90, "ArrowRight")).toBe(95);
  expect(phiForKey(90, "x")).toBeUndefined();
  expect(cornerForKey({ x: 0, y: 1 }, "ArrowUp")).toEqual({ x: 0, y: 1.25 });
  expect(cornerForKey({ x: 0, y: 1 }, "Home")).toBeUndefined();
});

test("angles are filled with a decimal comma", () => {
  expect(fillAngles("α = {a}°", { a: 37.34 })).toBe("α = 37,3°");
});
