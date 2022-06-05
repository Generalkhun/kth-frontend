import React from 'react'
import { useStopwatch } from 'react-timer-hook'

type Props = {
    startTimeMin?: number
    startTimeSecond?: number
}

const useConntdownTimer = ({ startTimeMin, startTimeSecond }: Props) => {
    /**
     * please look at https://www.npmjs.com/package/react-timer-hook
     */
    const {
        seconds,
        minutes,
        isRunning,
        start,
        reset,
        pause,
    } = useStopwatch({ autoStart: false });
    const timePerRoundMin = startTimeMin || 0
    const timePerRoundSecond = startTimeSecond || 0
    const timeLeftSecond = (timePerRoundMin * 60 + timePerRoundSecond) - (seconds + (minutes * 60))
    const displayTimeLeftMin = Math.floor(timeLeftSecond / 60)
    const displayTimeLeftSecond = timeLeftSecond % 60

    const startCountdown = () => start()
    const resetCountdown =() => reset()
    const pauseCountdown = () => pause()
    return {
        displayTimeLeftMin,
        displayTimeLeftSecond,
        isCountingdown: isRunning,
        startCountdown,
        resetCountdown,
        pauseCountdown,
    }
}

export default useConntdownTimer
