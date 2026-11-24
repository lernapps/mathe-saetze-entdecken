import { expect, test } from "vite-plus/test";
import { T_MAX, T_MIN, angles, clampT, fill, formatAngle, pointC, tForKey, tFromPointer } from "./Zugmodus.ts";

test("the angle at C is 90° at every position of C on the half circle (Thales)", () => {
  for (let t = T_MIN; t <= T_MAX; t += 5) {
    const a = angles(t);
    expect(a.gamma).toBeCloseTo(90, 6);
    expect(a.alpha + a.beta + a.gamma).toBeCloseTo(180, 6);
    expect(a.alpha).toBeCloseTo(t / 2, 6);
  }
});

test("C stays on the circle and t stays on the half circle", () => {
  for (let t = T_MIN; t <= T_MAX; t += 7) expect(Math.hypot(pointC(t).x, pointC(t).y)).toBeCloseTo(1, 9);
  expect(clampT(-40)).toBe(T_MIN);
  expect(clampT(400)).toBe(T_MAX);
  expect(clampT(90.4)).toBe(90);
});

test("angles are written with a decimal comma and without a useless ,0", () => {
  expect(formatAngle(90)).toBe("90");
  expect(formatAngle(37.34)).toBe("37,3");
  expect(fill("γ = {γ}°, α = {α}°", angles(60))).toBe("γ = 90°, α = 30°");
});

test("keys and pointer move C, other keys do nothing", () => {
  expect(tForKey(90, "ArrowLeft")).toBe(95);
  expect(tForKey(90, "ArrowRight")).toBe(85);
  expect(tForKey(T_MAX, "ArrowLeft")).toBe(T_MAX);
  expect(tForKey(90, "Home")).toBe(T_MIN);
  expect(tForKey(90, "a")).toBeUndefined();
  expect(tFromPointer(0, 1)).toBe(90);
  expect(tFromPointer(1, -1)).toBe(T_MIN);
});
