<script setup lang="ts">
// The drag mode for quadrilaterals: A and B stay, the learner moves C and D on a grid of 1 cm (arrow keys or drag) and
// reads the sides, the parallel pairs, the right angles and the symmetries of the quadrilateral ABCD.
import { computed, ref } from "vue";
import { clampPoint, fill, isConvex, pointForKey, type P } from "./Viereckszug.ts";

defineProps<{
  /** The label of the handle of C for screen readers, with the keys it answers to. */
  handleC: string;
  /** The label of the handle of D for screen readers, with the keys it answers to. */
  handleD: string;
  /** The line under the figure, with {seiten}, {parallel}, {recht}, {achsen} and {punkt}. */
  measure: string;
  /** What the line says when ABCD is no convex quadrilateral. */
  notConvex: string;
  /** The words for "yes" and "no" in {punkt}. */
  yes: string;
  no: string;
  /** The label of the reset button. */
  reset: string;
}>();

const start = { c: { x: 6, y: 3 }, d: { x: 1, y: 4 } };
const c = ref<P>({ ...start.c });
const d = ref<P>({ ...start.d });
const dragging = ref<"c" | "d" | null>(null);
const svg = ref<SVGSVGElement | null>(null);

// 26 px per cm, A = (40, 172)
const px = (p: P) => ({ x: 40 + 26 * p.x, y: 172 - 26 * p.y });
const grid = Array.from({ length: 10 * 7 }, (_, i) => px({ x: i % 10, y: Math.floor(i / 10) }));
const pa = px({ x: 0, y: 0 });
const pb = px({ x: 5, y: 0 });
const pc = computed(() => px(c.value));
const pd = computed(() => px(d.value));
const convex = computed(() => isConvex({ c: c.value, d: d.value }));
const line = (m: string, n: string, y: string, no: string) =>
  convex.value ? fill(m, { c: c.value, d: d.value }, y, no) : n;

function onKey(which: "c" | "d", event: KeyboardEvent): void {
  const target = which === "c" ? c : d;
  const next = pointForKey(target.value, event.key);
  if (next === undefined) return;
  event.preventDefault();
  target.value = next;
}

function move(event: PointerEvent): void {
  if (!dragging.value || !svg.value) return;
  const box = svg.value.getBoundingClientRect();
  const k = 330 / box.width;
  const p = clampPoint({
    x: ((event.clientX - box.left) * k - 40) / 26,
    y: (172 - (event.clientY - box.top) * k) / 26,
  });
  (dragging.value === "c" ? c : d).value = p;
}

function down(which: "c" | "d", event: PointerEvent): void {
  dragging.value = which;
  (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  move(event);
}

function resetPosition(): void {
  c.value = { ...start.c };
  d.value = { ...start.d };
}
</script>

<template>
  <div class="viereckszug">
    <svg
      ref="svg"
      viewBox="0 0 330 190"
      class="viereckszug-figure"
      @pointermove="move"
      @pointerup="dragging = null"
      @pointercancel="dragging = null"
    >
      <g aria-hidden="true">
        <circle v-for="(g, i) in grid" :key="i" :cx="g.x" :cy="g.y" r="1.5" class="viereckszug-grid" />
        <polygon
          :points="`${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y} ${pd.x},${pd.y}`"
          class="viereckszug-shape"
          :class="{ 'viereckszug-invalid': !convex }"
        />
        <text :x="pa.x - 14" :y="pa.y + 14" class="viereckszug-label">A</text>
        <text :x="pb.x + 6" :y="pb.y + 14" class="viereckszug-label">B</text>
        <text :x="pc.x + 18" :y="pc.y - 6" class="viereckszug-label">C</text>
        <text :x="pd.x - 24" :y="pd.y - 6" class="viereckszug-label">D</text>
      </g>
      <circle
        :cx="pc.x"
        :cy="pc.y"
        r="13"
        class="viereckszug-hit"
        role="slider"
        tabindex="0"
        :aria-label="handleC"
        aria-valuemin="0"
        aria-valuemax="9"
        :aria-valuenow="c.x"
        :aria-valuetext="`C: von A aus ${c.x}\u00A0cm nach rechts, ${c.y}\u00A0cm nach oben`"
        @pointerdown="down('c', $event)"
        @keydown="onKey('c', $event)"
      />
      <circle
        :cx="pd.x"
        :cy="pd.y"
        r="13"
        class="viereckszug-hit"
        role="slider"
        tabindex="0"
        :aria-label="handleD"
        aria-valuemin="0"
        aria-valuemax="9"
        :aria-valuenow="d.x"
        :aria-valuetext="`D: von A aus ${d.x}\u00A0cm nach rechts, ${d.y}\u00A0cm nach oben`"
        @pointerdown="down('d', $event)"
        @keydown="onKey('d', $event)"
      />
    </svg>
    <p class="viereckszug-measure" aria-live="polite">{{ line(measure, notConvex, yes, no) }}</p>
    <button type="button" class="viereckszug-reset" @click="resetPosition">{{ reset }}</button>
  </div>
</template>

<style scoped>
.viereckszug-figure {
  display: block;
  width: 100%;
  max-width: 30rem;
  touch-action: none;
}

.viereckszug-shape {
  fill: var(--page-surface);
  stroke: var(--page-accent);
  stroke-width: 2.5;
  fill-opacity: 0.5;
}

.viereckszug-grid {
  fill: var(--page-muted);
}

.viereckszug-invalid {
  stroke: var(--page-wrong);
  stroke-dasharray: 6 4;
}

.viereckszug-label {
  fill: var(--page-text);
  font-size: 15px;
  font-style: italic;
}

.viereckszug-hit {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 2;
  cursor: grab;
}

.viereckszug-hit:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 3px;
}

.viereckszug-measure {
  margin: 0.75rem 0;
  font-weight: 600;
}

.viereckszug-reset {
  min-height: 44px;
  margin-top: 0.5rem;
}
</style>
