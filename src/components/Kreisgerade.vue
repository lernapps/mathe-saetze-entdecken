<script setup lang="ts">
// The drag mode for a line and a circle: the learner moves a line away from the centre M (arrow keys or drag) and reads
// the distance and the number of common points. The figure only measures; the page says what to watch.
import { computed, ref } from "vue";
import { RADIUS, chordLength, clampD, commonPoints, dForKey, fill } from "./Kreisgerade.ts";

defineProps<{
  /** The label of the handle for screen readers, with the keys it answers to. */
  handle: string;
  /** What a screen reader says about the position, with {d}, {n} and {s}. */
  position: string;
  /** The line under the figure, with {d}, {n}, {s} and {r}. */
  measure: string;
  /** The label of the reset button. */
  reset: string;
  /** What stands beside the reset button while everything is at the start. */
  atStart: string;
}>();

const start = 2;
const d = ref(start);
const dragging = ref(false);
const svg = ref<SVGSVGElement | null>(null);

// 17 px per cm, M at (160, 118)
const scale = 17;
const y = computed(() => 118 - scale * d.value);
const half = computed(() => (chordLength(d.value) / 2) * scale);
const points = computed(() => {
  const n = commonPoints(d.value);
  if (n === 2) return [160 - half.value, 160 + half.value];
  return n === 1 ? [160] : [];
});

function onKey(event: KeyboardEvent): void {
  const next = dForKey(d.value, event.key);
  if (next === undefined) return;
  event.preventDefault();
  d.value = next;
}

function move(event: PointerEvent): void {
  if (!dragging.value || !svg.value) return;
  const box = svg.value.getBoundingClientRect();
  d.value = clampD((118 - (event.clientY - box.top) * (190 / box.height)) / scale);
}

function down(event: PointerEvent): void {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  move(event);
}
</script>

<template>
  <div class="kreisgerade">
    <svg
      ref="svg"
      viewBox="0 0 320 190"
      class="kreisgerade-figure"
      @pointermove="move"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <g aria-hidden="true">
        <circle cx="160" cy="118" :r="RADIUS * scale" class="kreisgerade-circle" />
        <circle cx="160" cy="118" r="3" class="kreisgerade-dot" />
        <text x="166" y="134" class="kreisgerade-label">M</text>
        <line x1="10" :y1="y" x2="310" :y2="y" class="kreisgerade-line" />
        <circle v-for="x in points" :key="x" :cx="x" :cy="y" r="4.5" class="kreisgerade-point" />
        <line x1="160" y1="118" x2="160" :y2="y" class="kreisgerade-radius" />
      </g>
      <circle
        cx="296"
        :cy="y"
        r="14"
        class="kreisgerade-hit"
        role="slider"
        tabindex="0"
        :aria-label="handle"
        aria-valuemin="0"
        aria-valuemax="6"
        :aria-valuenow="d"
        :aria-valuetext="fill(position, d)"
        @pointerdown="down"
        @keydown="onKey"
      />
    </svg>
    <p class="kreisgerade-measure" aria-live="polite">{{ fill(measure, d) }}</p>
    <button type="button" class="kreisgerade-reset" :disabled="d === start" @click="d = start">{{ reset }}</button>
    <span v-if="d === start" class="kreisgerade-note">{{ atStart }}</span>
  </div>
</template>

<style scoped>
.kreisgerade-figure {
  display: block;
  width: 100%;
  max-width: 28rem;
  touch-action: none;
}

.kreisgerade-circle {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 2;
}

.kreisgerade-dot {
  fill: var(--page-text);
}

.kreisgerade-line {
  stroke: var(--page-accent);
  stroke-width: 2.5;
}

.kreisgerade-radius {
  stroke: var(--page-muted);
  stroke-width: 1.5;
  stroke-dasharray: 5 4;
}

.kreisgerade-point {
  fill: var(--page-text);
}

.kreisgerade-label {
  fill: var(--page-text);
  font-size: 15px;
  font-style: italic;
}

.kreisgerade-hit {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 2;
  cursor: grab;
}

.kreisgerade-hit:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 3px;
}

.kreisgerade-measure {
  margin: 0.75rem 0;
  font-weight: 600;
}

.kreisgerade-reset {
  font: inherit;
  min-height: 2.75rem;
  margin-top: 0.5rem;
  padding: 0.375rem 0.875rem;
  border: 2px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-background);
  color: var(--page-accent);
  cursor: pointer;
}

.kreisgerade-reset:disabled {
  cursor: default;
  opacity: 0.6;
}

.kreisgerade-reset:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.kreisgerade-note {
  margin-left: 0.5rem;
  color: var(--page-muted);
  font-size: 0.9375rem;
}
</style>
