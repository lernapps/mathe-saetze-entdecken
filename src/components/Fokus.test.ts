import { expect, test } from "vite-plus/test";
import { focusHandle } from "./Fokus.ts";

test("focusHandle finds the movable point next to the button and focuses it", () => {
  let focused = false;
  const handle = { focus: () => (focused = true) };
  const figure = { querySelector: (selector: string) => (selector === "[role=slider]" ? handle : null) };
  const button = { closest: (selector: string) => (selector === "div" ? figure : null) };
  focusHandle({ currentTarget: button } as unknown as Event);
  expect(focused).toBe(true);
});

test("focusHandle does nothing when there is no figure around the button", () => {
  expect(() => focusHandle({ currentTarget: null } as unknown as Event)).not.toThrow();
  expect(() => focusHandle({ currentTarget: { closest: () => null } } as unknown as Event)).not.toThrow();
});
