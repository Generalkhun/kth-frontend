import React, { useEffect, useState } from 'react'
import { useStopwatch } from 'react-timer-hook'

type Props = {
    startTimeMin?: number
    startTimeSecond?: number
}

const useCountdownTimer = ({ startTimeMin, startTimeSecond }: Props) => {
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

    const [totalTimePerRondSecond, setTotalTimePerRondSecond] = useState<number>(0);
    const [displayTimeLeftMin, setDisplayTimeLeftMin] = useState<number>(0);
    const [displayTimeLeftSecond, setDisplayTimeLeftSecond] = useState<number>(0);
    const [displayRatioTimeLeft, setDisplayRatioTimeLeft] = useState<number>(1);

    useEffect(() => {
        const timePerRoundMin = startTimeMin || 0
        const timePerRoundSecond = startTimeSecond || 0
        setTotalTimePerRondSecond(timePerRoundMin * 60 + timePerRoundSecond)
    }, [startTimeMin, startTimeSecond])


    useEffect(() => {
        const timeLeftSecond = totalTimePerRondSecond - (seconds + (minutes * 60))
        setDisplayTimeLeftMin(Math.floor(timeLeftSecond / 60))
        setDisplayTimeLeftSecond(timeLeftSecond % 60)
        setDisplayRatioTimeLeft(timeLeftSecond/totalTimePerRondSecond)
    }, [seconds, minutes])

    const startCountdown = () => start()
    const resetCountdown = () => reset()
    const pauseCountdown = () => pause()

    return {
        displayTimeLeftMin,
        displayTimeLeftSecond,
        isCountingdown: isRunning,
        displayRatioTimeLeft,
        startCountdown,
        resetCountdown,
        pauseCountdown,
    }
}

export default useCountdownTimer
