<script setup lang="ts">
// The drag mode for the special lines of a triangle: the learner moves C (arrow keys or drag); the perpendicular
// bisectors (kind "umkreis"), the angle bisectors ("inkreis") or the altitudes ("hoehen") are drawn and the distances
// that should be equal are measured. The figure only measures; the page says what to watch.
import { computed, ref } from "vue";
import { A, B, clampC, cornerForKey, fill, incentre, measure as measureOf, type Pt } from "./Liniendreieck.ts";

const props = defineProps<{
  /** "umkreis", "inkreis" or "hoehen". */
  kind: "umkreis" | "inkreis" | "hoehen";
  /** The label of the handle of C for screen readers, with the keys it answers to. */
  handle: string;
  /** What a screen reader says about the position, with {w1}, {w2}, {w3} and {lage}. */
  position: string;
  /** The line under the figure, with {w1}, {w2}, {w3} and {lage}. */
  measure: string;
  /** The words for "inside the triangle" and "outside the triangle". */
  inside: string;
  outside: string;
  /** The label of the reset button. */
  reset: string;
}>();

const c = ref<Pt>({ x: 0.5, y: 2.5 });
const dragging = ref(false);
const svg = ref<SVGSVGElement | null>(null);

// 26 px per cm, origin at (160, 150)
const s = 26;
const px = (p: Pt) => ({ x: 160 + s * p.x, y: 150 - s * p.y });
const pa = px(A);
const pb = px(B);
const pc = computed(() => px(c.value));
const m = computed(() => measureOf(props.kind, c.value));
const point = computed(() => px(m.value.point));
const radius = computed(() => s * m.value.radius);

type Seg = { x1: number; y1: number; x2: number; y2: number };
const lineThrough = (p: Pt, dir: Pt, len = 6): Seg => {
  const n = Math.hypot(dir.x, dir.y);
  const a = px({ x: p.x - (dir.x / n) * len, y: p.y - (dir.y / n) * len });
  const b = px({ x: p.x + (dir.x / n) * len, y: p.y + (dir.y / n) * len });
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
};
const mid = (p: Pt, q: Pt): Pt => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
const lines = computed<Seg[]>(() => {
  const k = c.value;
  if (props.kind === "umkreis") {
    const perp = (p: Pt, q: Pt): Pt => ({ x: -(q.y - p.y), y: q.x - p.x });
    return [lineThrough(mid(A, B), perp(A, B)), lineThrough(mid(B, k), perp(B, k)), lineThrough(mid(k, A), perp(k, A))];
  }
  if (props.kind === "hoehen") {
    return [
      lineThrough(A, { x: -(k.y - B.y), y: k.x - B.x }),
      lineThrough(B, { x: -(A.y - k.y), y: A.x - k.x }),
      lineThrough(k, { x: -(B.y - A.y), y: B.x - A.x }),
    ];
  }
  const i = incentre(k);
  const toI = (v: Pt): Seg => {
    const a = px(v);
    const b = px(i);
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  };
  return [toI(A), toI(B), toI(k)];
});

const text = (template: string) => fill(template, props.kind, c.value, props.inside, props.outside);

function onKey(event: KeyboardEvent): void {
  const next = cornerForKey(c.value, event.key);
  if (next === undefined) return;
  event.preventDefault();
  c.value = next;
}

function move(event: PointerEvent): void {
  if (!dragging.value || !svg.value) return;
  const box = svg.value.getBoundingClientRect();
  const k = 320 / box.width;
  c.value = clampC({ x: ((event.clientX - box.left) * k - 160) / s, y: (150 - (event.clientY - box.top) * k) / s });
}

function down(event: PointerEvent): void {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  move(event);
}
</script>

<template>
  <div class="linien">
    <svg
      ref="svg"
      viewBox="0 0 320 190"
      class="linien-figure"
      @pointermove="move"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <g aria-hidden="true">
        <circle v-if="kind !== 'hoehen'" :cx="point.x" :cy="point.y" :r="radius" class="linien-circle" />
        <line v-for="(l, k) in lines" :key="k" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" class="linien-line" />
        <polygon :points="`${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y}`" class="linien-triangle" />
        <circle :cx="point.x" :cy="point.y" r="4" class="linien-dot" />
        <text :x="pa.x - 14" :y="pa.y + 14" class="linien-label">A</text>
        <text :x="pb.x + 6" :y="pb.y + 14" class="linien-label">B</text>
        <text :x="pc.x + 18" :y="pc.y - 6" class="linien-label">C</text>
      </g>
      <circle
        :cx="pc.x"
        :cy="pc.y"
        r="13"
        class="linien-hit"
        role="slider"
        tabindex="0"
        :aria-label="handle"
        aria-valuemin="-250"
        aria-valuemax="250"
        :aria-valuenow="Math.round(c.x * 100)"
        :aria-valuetext="text(position)"
        @pointerdown="down"
        @keydown="onKey"
      />
    </svg>
    <p class="linien-measure" aria-live="polite">{{ text(measure) }}</p>
    <button type="button" class="linien-reset" @click="c = { x: 0.5, y: 2.5 }">{{ reset }}</button>
  </div>
</template>

<style scoped>
.linien-figure {
  display: block;
  width: 100%;
  max-width: 28rem;
  touch-action: none;
}

.linien-triangle {
  fill: var(--page-surface);
  fill-opacity: 0.5;
  stroke: var(--page-accent);
  stroke-width: 2.5;
}

.linien-line {
  stroke: var(--page-muted);
  stroke-width: 1.5;
  stroke-dasharray: 5 4;
}

.linien-circle {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 1.5;
}

.linien-dot {
  fill: var(--page-text);
}

.linien-label {
  fill: var(--page-text);
  font-size: 15px;
  font-style: italic;
}

.linien-hit {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 2;
  cursor: grab;
}

.linien-hit:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 3px;
}

.linien-measure {
  margin: 0.75rem 0;
  font-weight: 600;
}

.linien-reset {
  min-height: 44px;
  margin-top: 0.5rem;
}
</style>
