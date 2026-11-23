<script setup lang="ts">
// "Which triangles fit three pieces?": the learner chooses the kind of pieces (modes), moves the free piece with a
// slider and sees every triangle that fits. The page says what to watch; the figure only draws and counts.
import { computed, ref } from "vue";
import { RANGE, fill, sideLength, triangles, type Mode, type Triangle } from "./Dreiecksstuecke.ts";

const props = defineProps<{
  /** The modes offered, in order: "sss", "sws", "wsw", "ssa" or "www". */
  modes: string[];
  /** The label of each mode, in the order of modes. */
  labels: string[];
  /** The given pieces of each mode, with {v} for the free piece. */
  given: string[];
  /** The label of the slider of each mode. */
  slider: string[];
  /** The line under the figure, with {n} for the number of triangles. */
  result: string;
  /** The words for the number: none, one, two, many. */
  words: string[];
  /** The legend of the choice of the mode. */
  legend: string;
}>();

const index = ref(0);
const mode = computed(() => (props.modes[index.value] ?? "sss") as Mode);
const range = computed(() => RANGE[mode.value]);
const value = ref(RANGE[(props.modes[0] ?? "sss") as Mode].start);

const found = computed<Triangle[]>(() => triangles(mode.value, value.value));
const wordMap = computed(() => ({
  "0": props.words[0] ?? "",
  "1": props.words[1] ?? "",
  "2": props.words[2] ?? "",
  many: props.words[3] ?? "",
}));
const unit = 20;
const px = (p: { x: number; y: number }) => ({ x: 30 + unit * p.x, y: 165 - unit * p.y });
const shapes = computed(() =>
  found.value.map((t) => {
    const a = px(t.a);
    const b = px(t.b);
    const c = px(t.c);
    return { points: `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`, b, c, side: sideLength(t.a, t.b) };
  }),
);

function choose(i: number): void {
  index.value = i;
  value.value = RANGE[(props.modes[i] ?? "sss") as Mode].start;
}
</script>

<template>
  <div class="stuecke">
    <fieldset class="stuecke-modes">
      <legend>{{ legend }}</legend>
      <label v-for="(m, i) in modes" :key="m" class="stuecke-mode">
        <input type="radio" name="stuecke-mode" :checked="i === index" @change="choose(i)" />
        {{ labels[i] }}
      </label>
    </fieldset>
    <p class="stuecke-given">{{ fill(given[index] ?? "", value, wordMap, mode) }}</p>
    <label class="stuecke-slider">
      {{ slider[index] }}
      <input v-model.number="value" type="range" :min="range.min" :max="range.max" :step="range.step" />
    </label>
    <svg viewBox="0 0 330 190" class="stuecke-figure" aria-hidden="true">
      <line x1="30" y1="165" x2="320" y2="165" class="stuecke-axis" />
      <g v-for="(s, k) in shapes" :key="k">
        <polygon :points="s.points" class="stuecke-shape" :class="{ 'stuecke-second': k === 1 }" />
        <circle :cx="s.c.x" :cy="s.c.y" r="4" class="stuecke-dot" />
      </g>
      <text x="14" y="182" class="stuecke-label">A</text>
    </svg>
    <p class="stuecke-result" aria-live="polite">{{ fill(result, value, wordMap, mode) }}</p>
  </div>
</template>

<style scoped>
.stuecke-modes {
  margin: 0 0 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--page-border);
}

.stuecke-mode {
  display: inline-block;
  min-height: 44px;
  margin-right: 1rem;
  line-height: 44px;
}

.stuecke-slider {
  display: block;
  margin: 0.5rem 0;
}

.stuecke-slider input {
  display: block;
  width: 100%;
  max-width: 24rem;
  min-height: 44px;
}

.stuecke-figure {
  display: block;
  width: 100%;
  max-width: 30rem;
}

.stuecke-axis {
  stroke: var(--page-border);
  stroke-width: 1;
}

.stuecke-shape {
  fill: var(--page-surface);
  fill-opacity: 0.5;
  stroke: var(--page-accent);
  stroke-width: 2.5;
}

.stuecke-second {
  stroke: var(--page-text);
  stroke-dasharray: 6 4;
}

.stuecke-dot {
  fill: var(--page-text);
}

.stuecke-label {
  fill: var(--page-text);
  font-size: 15px;
  font-style: italic;
}

.stuecke-result {
  margin: 0.75rem 0;
  font-weight: 600;
}
</style>
