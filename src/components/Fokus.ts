// After a reset button disables itself, the keyboard focus would fall to the page. This puts it back on the movable point
// of the same figure. Browser globals are used only inside the click handler, never while the server renders.
export function focusHandle(event: Event): void {
  const button = event.currentTarget as HTMLElement | null;
  const figure = button?.closest("div");
  const handle = figure?.querySelector<HTMLElement>("[role=slider]");
  handle?.focus();
}
