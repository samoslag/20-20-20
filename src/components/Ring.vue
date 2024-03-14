<template>
  <div
    class="ring"
    :class="{'ring--paused': props.isPaused}"
  >
    <div class="ring__progress" :style="`--progress: ${props.progress}%`">
      <div class="ring__outer">
        <div class="ring__inner">
          <slot/>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

export interface Props {
  progress: number
  isPaused: boolean
}

const props = defineProps<Props>()

</script>

<style lang="scss">
.ring {
  $size: 330px;
  $shadowSize: 30px;
  $offset: 2px;
  $stroke: 6px;

  width: $size;
  min-width: $size;
  height: $size;
  border-radius: 50%;
  position: relative;
  background-color: black;
  box-shadow:
    0 ($shadowSize * -1) $shadowSize lighten($bg, 1.25%),
    0 2px 0 rgba(white, 0.04),
    0 $shadowSize $shadowSize darken($bg, 1.25%);

  &::before {
    content: "";
    z-index: 1;
    position: absolute;
    left: $offset;
    top: $offset;
    width: calc(100% - #{$offset * 2});
    height: calc(100% - #{$offset * 2});
    background: conic-gradient($gradient);
    border-radius: 50%;
    transition: opacity 0.15s;
  }

  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    top: $offset + $stroke;
    left: $offset + $stroke;
    width: calc(100% - ((#{$offset} + #{$stroke}) * 2));
    height: calc(100% - ((#{$offset} + #{$stroke}) * 2));
    background-color: black;
    border-radius: 50%;
  }

  .ring__progress {
    z-index: 2;
    background: conic-gradient(transparent var(--progress), black var(--progress));
    padding: $stroke + $offset * 2;
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    top: 0;
    border-radius: 50%;
  }

  .ring__outer {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(to bottom, lighten($bg, 1.25%), lighten($bg, 0.25%));
    padding: 48px;
    box-shadow: inset 0 2px 0 rgba(white, 0.04);
  }

  .ring__inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid 2px black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    box-shadow:
      inset 0 2px 0 rgba(white, 0.04),
      0 2px 0 rgba(white, 0.04);
    background: lighten($bg, 1.25%);
  }

  &--paused {
    &::before {
      opacity: 0.65;
    }
  }
}
</style>
