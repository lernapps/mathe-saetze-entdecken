<script setup lang="ts">
// The drag mode for angle theorems. kind "parallelen": a line across two parallels, the learner changes its slope
// (arrow keys or drag) and reads four angles. kind "dreieck": the corner C of the triangle ABC moves and the three
// angles are read. The figure only measures; the page says what to watch.
import { computed, ref } from "vue";
import {
  clampCorner,
  clampPhi,
  cornerForKey,
  fillAngles,
  parallelAngles,
  phiForKey,
  triangleAngles,
} from "./Winkelzug.ts";

const props = defineProps<{
  /** "parallelen" or "dreieck". */
  kind: "parallelen" | "dreieck";
  /** The label of the handle for screen readers, with the keys it answers to. */
  handle: string;
  /** What a screen reader says about the position, with the names of the measures in braces. */
  position: string;
  /** The line under the figure with the measured angles. */
  measure: string;
  /** The label of the reset button. */
  reset: string;
}>();

const phi = ref(60);
const corner = ref({ x: 1, y: 2 });
const dragging = ref(false);
const svg = ref<SVGSVGElement | null>(null);

const values = computed<Record<string, number>>(() =>
  props.kind === "parallelen" ? parallelAngles(phi.value) : triangleAngles(corner.value),
);
const sum = computed(() => ({ sum: 180 }));
const text = (template: string) => fillAngles(template, { ...values.value, ...sum.value });

// figure for the parallels: O = (160, 140) on the lower line, U on the upper line at y = 50
const o = { x: 160, y: 140 };
const u = computed(() => {
  const r = (phi.value * Math.PI) / 180;
  return { x: o.x + 90 / Math.tan(r), y: 50 };
});
const ext = computed(() => {
  const r = (phi.value * Math.PI) / 180;
  const dx = Math.cos(r);
  const dy = -Math.sin(r);
  return { x1: o.x - 28 * dx, y1: o.y - 28 * dy, x2: u.value.x + 28 * dx, y2: u.value.y + 28 * dy };
});
// figure for the triangle: A = (−2, 0), B = (2, 0), 50 px per unit, origin at (160, 150)
const px = (v: { x: number; y: number }) => ({ x: 160 + 50 * v.x, y: 150 - 50 * v.y });
const cPx = computed(() => px(corner.value));
const handlePx = computed(() => (props.kind === "parallelen" ? u.value : cPx.value));

function onKey(event: KeyboardEvent): void {
  if (props.kind === "parallelen") {
    const next = phiForKey(phi.value, event.key);
    if (next === undefined) return;
    event.preventDefault();
    phi.value = next;
  } else {
    const next = cornerForKey(corner.value, event.key);
    if (next === undefined) return;
    event.preventDefault();
    corner.value = next;
  }
}

function move(event: PointerEvent): void {
  if (!dragging.value || !svg.value) return;
  const box = svg.value.getBoundingClientRect();
  const scale = 320 / box.width;
  const x = (event.clientX - box.left) * scale;
  const y = (event.clientY - box.top) * scale;
  if (props.kind === "parallelen") {
    phi.value = clampPhi((Math.atan2(o.y - 50, x - o.x) * 180) / Math.PI);
  } else {
    corner.value = clampCorner({ x: (x - 160) / 50, y: (150 - y) / 50 });
  }
}

function down(event: PointerEvent): void {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  move(event);
}

function resetPosition(): void {
  phi.value = 60;
  corner.value = { x: 1, y: 2 };
}
</script>

<template>
  <div class="winkelzug">
    <svg
      ref="svg"
      viewBox="0 0 320 190"
      class="winkelzug-figure"
      @pointermove="move"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <g v-if="kind === 'parallelen'" aria-hidden="true">
        <line x1="10" y1="50" x2="310" y2="50" class="winkelzug-line" />
        <line x1="10" y1="140" x2="310" y2="140" class="winkelzug-line" />
        <line :x1="ext.x1" :y1="ext.y1" :x2="ext.x2" :y2="ext.y2" class="winkelzug-accent" />
        <text :x="o.x + 14" :y="o.y - 6" class="winkelzug-angle">α</text>
        <text :x="o.x - 24" :y="o.y - 6" class="winkelzug-angle">δ</text>
        <text :x="u.x + 14" :y="u.y - 6" class="winkelzug-angle">β</text>
        <text :x="u.x - 24" :y="u.y + 18" class="winkelzug-angle">γ</text>
        <text x="296" y="44" class="winkelzug-label">g</text>
        <text x="296" y="134" class="winkelzug-label">h</text>
      </g>
      <g v-else aria-hidden="true">
        <polygon
          :points="`${px({ x: -2, y: 0 }).x},150 ${px({ x: 2, y: 0 }).x},150 ${cPx.x},${cPx.y}`"
          class="winkelzug-triangle"
        />
        <text x="96" y="170" class="winkelzug-label">A</text>
        <text x="216" y="170" class="winkelzug-label">B</text>
        <text :x="cPx.x + 16" :y="cPx.y - 12" class="winkelzug-label">C</text>
        <text x="118" y="143" class="winkelzug-angle">α</text>
        <text x="194" y="143" class="winkelzug-angle">β</text>
        <text :x="cPx.x - 4" :y="cPx.y + 24" class="winkelzug-angle">γ</text>
      </g>
      <circle
        :cx="handlePx.x"
        :cy="handlePx.y"
        r="14"
        class="winkelzug-hit"
        role="slider"
        tabindex="0"
        :aria-label="handle"
        aria-valuemin="-300"
        aria-valuemax="300"
        :aria-valuenow="kind === 'parallelen' ? phi : Math.round(corner.x * 100)"
        :aria-valuetext="text(position)"
        @pointerdown="down"
        @keydown="onKey"
      />
    </svg>
    <p class="winkelzug-measure" aria-live="polite">{{ text(measure) }}</p>
    <button type="button" class="winkelzug-reset" @click="resetPosition">{{ reset }}</button>
  </div>
</template>

<style scoped>
.winkelzug-figure {
  display: block;
  width: 100%;
  max-width: 28rem;
  touch-action: none;
}

.winkelzug-line {
  stroke: var(--page-text);
  stroke-width: 2;
}

.winkelzug-accent {
  stroke: var(--page-accent);
  stroke-width: 2.5;
}

.winkelzug-triangle {
  fill: var(--page-surface);
  stroke: var(--page-accent);
  stroke-width: 2.5;
  fill-opacity: 0.5;
}

.winkelzug-label {
  fill: var(--page-text);
  font-size: 15px;
  font-style: italic;
}

.winkelzug-angle {
  fill: var(--page-accent);
  font-size: 15px;
  font-style: italic;
}

.winkelzug-hit {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 2;
  cursor: grab;
}

.winkelzug-hit:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 3px;
}

.winkelzug-measure {
  margin: 0.75rem 0;
  font-weight: 600;
}

.winkelzug-reset {
  min-height: 44px;
  margin-top: 0.5rem;
}
</style>
