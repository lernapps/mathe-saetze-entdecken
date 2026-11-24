<script setup lang="ts">
// The drag mode for the theorem of Thales: the learner drags C along the half circle over AB (pointer or arrow keys) and
// reads the three angles of the triangle ABC. The page says what to watch; the figure only measures.
import { computed, ref } from "vue";
import { focusHandle } from "./Fokus.ts";
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
  /** What stands beside the reset button while everything is at the start. */
  atStart: string;
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

// the label of γ inside the triangle, a little from C towards M
const gamma = computed(() => ({
  x: c.value.x + (160 - c.value.x) * 0.2 - 4,
  y: c.value.y + (160 - c.value.y) * 0.2 + 12,
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

function resetPosition(event: Event): void {
  t.value = clampT(start);

  focusHandle(event);
}
</script>

<template>
  <div class="zugmodus">
    <svg
      ref="svg"
      viewBox="0 0 320 190"
      class="zugmodus-figure"
      @pointermove="move"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <path aria-hidden="true" d="M 30 160 A 130 130 0 0 1 290 160" class="zugmodus-circle" />
      <line aria-hidden="true" x1="30" y1="160" x2="290" y2="160" class="zugmodus-line" />
      <polygon aria-hidden="true" :points="`30,160 290,160 ${c.x},${c.y}`" class="zugmodus-triangle" />
      <circle aria-hidden="true" cx="160" cy="160" r="3" class="zugmodus-dot" />
      <text aria-hidden="true" x="14" y="182" class="zugmodus-label">A</text>
      <text aria-hidden="true" x="294" y="182" class="zugmodus-label">B</text>
      <text aria-hidden="true" x="156" y="182" class="zugmodus-label">M</text>
      <text aria-hidden="true" :x="c.x + 16" :y="c.y - 12" class="zugmodus-label">C</text>
      <text aria-hidden="true" x="48" y="152" class="zugmodus-angle">α</text>
      <text aria-hidden="true" x="262" y="152" class="zugmodus-angle">β</text>
      <text aria-hidden="true" :x="gamma.x" :y="gamma.y" class="zugmodus-angle">γ</text>
      <circle
        :cx="c.x"
        :cy="c.y"
        r="18"
        class="zugmodus-hit"
        role="slider"
        tabindex="0"
        :aria-label="handle"
        aria-valuemin="10"
        aria-valuemax="170"
        :aria-valuenow="t"
        :aria-valuetext="fill(position, measured)"
        @pointerdown="down"
        @keydown="onKey"
      />
    </svg>
    <p class="zugmodus-measure" aria-live="polite">{{ fill(measure, measured) }}</p>
    <button type="button" class="zugmodus-reset" :disabled="t === start" @click="resetPosition($event)">
      {{ reset }}
    </button>
    <span v-if="t === start" class="zugmodus-note">{{ atStart }}</span>
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

.zugmodus-dot {
  fill: var(--page-text);
}

.zugmodus-hit:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 3px;
}

.zugmodus-hit {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 2;
  cursor: grab;
}

.zugmodus-measure {
  margin: 0.75rem 0;
  font-weight: 600;
}

.zugmodus-reset {
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

.zugmodus-reset:disabled {
  cursor: default;
  opacity: 0.6;
}

.zugmodus-reset:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.zugmodus-note {
  margin-left: 0.5rem;
  color: var(--page-muted);
  font-size: 0.9375rem;
}
</style>
