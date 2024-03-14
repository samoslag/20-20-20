<template>
  <div
    class="button"
    :class="{'button--small': props.small}"
  >
    <button
      class="button__btn"
      :title="props.title"
      @click="emit('click')"
    >
      <FontAwesomeIcon
        :icon="props.icon"
        class="button__icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export interface Props {
  small?: boolean
  title?: string
  icon: any
}

const props = defineProps<Props>()

export interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()

</script>

<style lang="scss">
.button {
  $shadowSize: 15px;

  background-color: black;
  padding: 6px;
  border-radius: 50%;
  position: relative;
  box-shadow:
    0 ($shadowSize * -1) $shadowSize lighten($bg, 1.25%),
    0 2px 0 rgba(white, 0.04),
    0 $shadowSize $shadowSize darken($bg, 1.25%);
  animation: button-appear 0.2s;

  @keyframes button-appear {
    from {
      transform: scale(0.965);
      opacity: 0.85;
    }
  }

  .button__btn {
    $size: 68px;

    position: relative;
    z-index: 2;
    width: $size;
    min-width: $size;
    height: $size;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, lighten($bg, 3.5%), lighten($bg, 2.5%));
    border: none;
    border-radius: 50%;
    box-shadow: inset 0 2px 0 rgba(white, 0.04);

    .button__icon {
      font-size: 26px;
      color: rgba(whitesmoke, 0.9);

      &[data-icon="play"] {
        transform: translateX(10%);
      }
    }

    &:hover {
      cursor: pointer;
      background: linear-gradient(to bottom, lighten($bg, 5%), lighten($bg, 4%));

      .button__icon {
        color: white
      }
    }

    &:active {
      background: lighten($bg, 2%);
      transform: scale(0.95);

      .button__icon {
        color: rgba(whitesmoke, 0.6);
      }
    }
  }
}
</style>
