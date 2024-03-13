<template>
  <div class="time">
    <div
      v-if="time.minutes"
      class="time__value"
    >
      <span
        v-for="i in time.minutes.length"
        :key="`min-${i}`"
        class="time__char"
      >{{ time.minutes.charAt(i - 1) }}</span>
    </div>

    <span
      v-if="time.minutes.length"
      class="time__char"
    >:</span>

    <div
      v-if="time.seconds"
      class="time__value"
    >
      <span
        v-for="i in time.seconds.length"
        :key="`s-${i}`"
        class="time__char"
      >{{ time.seconds.charAt(i - 1) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { format } from '@/helpers/time'

export interface Props {
  minutes?: number
  seconds?: number
}

const props = defineProps<Props>()

const time = computed(() => {
  if (!props.minutes && !props.seconds) {
    return {
      minutes: '00',
      seconds: '00'
    }
  }

  return {
    minutes: String(props.minutes || ''),
    seconds: format(props.seconds)
  }
})

</script>

<style lang="scss">
.time {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  .time__value {
    display: flex;
    justify-content: center;
    align-items: center;

    & + .time__char {
      transform: translateY(-8%);
    }
  }

  .time__char {
    color: rgba(whitesmoke, 0.95);
    font-size: 49px;
    line-height: 1;
    user-select: none;
    width: 29px;
    text-align: center;
    text-shadow: 0 1px 3px black;
  }
}
</style>
