import React, { useState } from 'react'
import { MAX_ROUND, MAX_TIME_PER_ROUND_SEC } from '../../config/constants'

type Props = {}

export const useGameSetting = () => {
    const [round, setRound] = useState<number>(5)
    const [timePerRoundSecond, setTimePerRoundSecond] = useState<number>(120)
    const displayTimePerRound = `${Math.floor(timePerRoundSecond/60)} : ${timePerRoundSecond % 60}`

    const increaseRound = () => {
        setRound((prev) => prev === MAX_ROUND ? prev : prev + 1)
    }
    const decreaseRound = () => {
        setRound((prev) => prev === 0 ? prev : prev-1)
    }
    const increaseTimePerRound = () => {
        setTimePerRoundSecond(prev => prev === MAX_TIME_PER_ROUND_SEC ? prev : prev + 30)
    }
    const decreaseTimePerRound = () => {
        setTimePerRoundSecond(prev => prev === 0 ? prev : prev - 30)
    }

  return ({
    round,
    increaseRound,
    decreaseRound,
    timePerRoundSecond,
    displayTimePerRound,
    increaseTimePerRound,
    decreaseTimePerRound,
  })
}