<template>
  <div class="timer">
    <Ring :progress="progress">
      <Time
        :minutes="time.minutes"
        :seconds="time.seconds"
      />
    </Ring>

    <div class="timer__controls">
      <Button
        v-if="!isCounting && (isInProgress || active === 'second')"
        :icon="faRotateLeft"
        title="Reset"
        @click="setFirstTimer()"
      />

      <Button
        v-if="!isCounting && !isOver"
        :key="`start-btn-${isInProgress}`"
        :icon="faPlay"
        title="Start"
        @click="start()"
      />

      <Button
        v-if="isCounting"
        :icon="faPause"
        title="Pause"
        @click="pause()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Ring from '@/components/Ring.vue'
import Time from '@/components/Time.vue'
import Button from '@/components/Button.vue'
import { faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { useTimer } from '@/composables/timer'
import { computed, watchEffect, ref } from 'vue'
import { format } from '@/helpers/time'

const FIRST_TIMER_DURATION = 10 * 1000
const SECOND_TIMER_DURATION = 2 * 1000

const {
  start,
  pause,
  setTimer,
  isCounting,
  timer,
  duration,
  setUpdateInterval,
  onFinish
} = useTimer({
  timer: FIRST_TIMER_DURATION,
  updateInterval: 1000
})

const active = ref<'first' | 'second'>('first')

const setFirstTimer = () => {
  active.value = 'first'
  setTimer(FIRST_TIMER_DURATION)
  setUpdateInterval(1000)
}

const setSecondTimer = () => {
  active.value = 'second'
  setTimer(SECOND_TIMER_DURATION)
  setUpdateInterval(10)
}

const time = computed(() => ({
  minutes: Math.floor(timer.value / 1000 / 60),
  seconds: Math.ceil(timer.value / 1000) % 60
}))

const progress = computed(() => 100 - (timer.value * 100 / duration.value))
const isInProgress = computed(() => duration.value !== timer.value)
const isOver = computed(() => !isCounting.value && active.value === 'second' && timer.value === 0)

watchEffect(() => {
  const min = format(time.value.minutes)
  const s = format(time.value.seconds)
  document.title = `${min}:${s} | 20-20-20`
})

onFinish(() => {
  if (active.value === 'first') {
    setSecondTimer()
  }
})

</script>

<style lang="scss">
.timer {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 80px;

  .ring {
    margin: 30px 0 60px 0;
  }

  .timer__controls {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
  }
}
</style>
