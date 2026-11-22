<script setup lang="ts">
// The drag mode for the theorem of Thales: the learner drags C along the half circle over AB (pointer or arrow keys) and
// reads the three angles of the triangle ABC. The page says what to watch; the figure only measures.
import { computed, ref } from "vue";
import { angles, clampT, fill, tForKey, tFromPointer } from "./Zugmodus.ts";

const props = defineProps<{
  /** The label of the handle for screen readers, with the keys it answers to. */
  handle: string;
  /** What a screen reader says about the position, with {α}, {β} and {γ}. */
  position: string;
  /** The line under the figure with the measured angles, with {α}, {β} and {γ}. */
  measure: string;
  /** The label of the reset button. */
  reset: string;
}>();

const start = 60;
const t = ref(start);
const dragging = ref(false);
const svg = ref<SVGSVGElement | null>(null);

const measured = computed(() => angles(t.value));
// the figure: M at (160, 160), radius 130, so A = (30, 160) and B = (290, 160)
const c = computed(() => ({
  x: 160 + 130 * Math.cos((t.value * Math.PI) / 180),
  y: 160 - 130 * Math.sin((t.value * Math.PI) / 180),
}));

function onKey(event: KeyboardEvent): void {
  const next = tForKey(t.value, event.key);
  if (next === undefined) return;
  event.preventDefault();
  t.value = next;
}

function move(event: PointerEvent): void {
  if (!dragging.value || !svg.value) return;
  const box = svg.value.getBoundingClientRect();
  const scale = 320 / box.width;
  t.value = tFromPointer((event.clientX - box.left) * scale - 160, 160 - (event.clientY - box.top) * scale);
}

function down(event: PointerEvent): void {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  move(event);
}

function resetPosition(): void {
  t.value = clampT(start);
}
</script>

<template>
  <div class="zugmodus">
    <svg
      ref="svg"
      viewBox="0 0 320 190"
      class="zugmodus-figure"
      aria-hidden="true"
      @pointermove="move"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <path d="M 30 160 A 130 130 0 0 1 290 160" class="zugmodus-circle" />
      <line x1="30" y1="160" x2="290" y2="160" class="zugmodus-line" />
      <polygon :points="`30,160 290,160 ${c.x},${c.y}`" class="zugmodus-triangle" />
      <text x="14" y="182" class="zugmodus-label">A</text>
      <text x="294" y="182" class="zugmodus-label">B</text>
      <text :x="c.x + 8" :y="c.y - 8" class="zugmodus-label">C</text>
      <text x="48" y="152" class="zugmodus-angle">α</text>
      <text x="262" y="152" class="zugmodus-angle">β</text>
      <circle :cx="c.x" :cy="c.y" r="22" class="zugmodus-hit" @pointerdown="down" />
    </svg>
    <div
      class="zugmodus-handle"
      role="slider"
      tabindex="0"
      :aria-label="handle"
      aria-valuemin="10"
      aria-valuemax="170"
      :aria-valuenow="t"
      :aria-valuetext="fill(position, measured)"
      @keydown="onKey"
    >
      {{ handle }}
    </div>
    <p class="zugmodus-measure" aria-live="polite">{{ fill(measure, measured) }}</p>
    <button type="button" class="zugmodus-reset" @click="resetPosition">{{ reset }}</button>
  </div>
</template>

<style scoped>
.zugmodus-figure {
  display: block;
  width: 100%;
  max-width: 28rem;
  touch-action: none;
}

.zugmodus-circle,
.zugmodus-line {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 2;
}

.zugmodus-triangle {
  fill: var(--page-surface);
  stroke: var(--page-accent);
  stroke-width: 2.5;
  fill-opacity: 0.5;
}

.zugmodus-label {
  fill: var(--page-text);
  font-size: 15px;
  font-style: italic;
}

.zugmodus-angle {
  fill: var(--page-accent);
  font-size: 15px;
  font-style: italic;
}

.zugmodus-hit {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 2;
  cursor: grab;
}

.zugmodus-handle {
  display: inline-block;
  min-height: 44px;
  padding: 0.6rem 0.9rem;
  border: 2px solid var(--page-accent);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
}

.zugmodus-handle:focus-visible {
  outline: 3px solid var(--page-accent);
  outline-offset: 2px;
}

.zugmodus-measure {
  margin: 0.75rem 0;
  font-weight: 600;
}

.zugmodus-reset {
  min-height: 44px;
  margin-top: 0.5rem;
}
</style>
