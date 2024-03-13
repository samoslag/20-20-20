import { ref } from 'vue'
import moment, { Moment } from 'moment'

export interface Options {
  timer?: number,
  updateInterval?: number
}

export const useTimer = (options?: Options) => {
  const isCounting = ref(false)

  const timer = ref(options?.timer || 0)
  const duration = ref(options?.timer || 0)
  const updateInterval = ref(options?.updateInterval || 1000)

  const setUpdateInterval = (ms: number) => {
    updateInterval.value = ms
  }

  const setTimer = (ms: number) => {
    timer.value = ms
    duration.value = ms
  }

  let deadline: Moment | undefined
  let interval: number | undefined

  const stopTimer = () => {
    clearInterval(interval)
    interval = undefined
    deadline = undefined
  }

  const pause = () => {
    isCounting.value = false
    stopTimer()
  }

  let onFinishCallback: (() => void) | undefined

  const onFinish = (callback?: () => void) => {
    onFinishCallback = callback
  }

  const finish = () => {
    pause()
    if (onFinishCallback) onFinishCallback()
  }

  const count = () => {
    if (!deadline) {
      finish()
      return
    }

    const now = moment()
    const diff = deadline.diff(now)
    timer.value = Math.max(diff, 0)

    const isOver = timer.value === 0
    if (isOver) {
      finish()
    }
  }

  const startTimer = () => {
    deadline = moment().add(timer.value / 1000, 'seconds')
    interval = setInterval(count, updateInterval.value)
  }

  const start = () => {
    isCounting.value = true
    startTimer()
  }

  return {
    start,
    pause,
    setTimer,
    setUpdateInterval,
    onFinish,
    isCounting,
    timer,
    duration,
    updateInterval
  }
}
