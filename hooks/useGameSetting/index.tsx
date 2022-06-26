import React, { useContext, useEffect, useState } from 'react'
import { MAX_ROUND, MAX_TIME_PER_ROUND_SEC } from '../../config/constants'
import { GameStateContext } from '../../contextProviders/GameStateProvider'
import { WebSocketContext } from '../../contextProviders/WebSocketProviders'

type Props = {}

export const useGameSetting = () => {
    const { updateRoomSetting } = useContext(WebSocketContext)
    const { roomDataState } = useContext(GameStateContext)
    const totalRound = roomDataState.totalRound
    const limitTime = roomDataState.limitTime
    const [round, setRound] = useState<number>(5)
    const [timePerRoundSecond, setTimePerRoundSecond] = useState<number>(120)

    // update to ws server
    useEffect(() => {
        if(!!round && !!timePerRoundSecond)
        updateRoomSetting({
            totalRound: round,
            limitTime: timePerRoundSecond,
        })
    }, [round, timePerRoundSecond])

    // update from ws server
    useEffect(() => {
        setRound(totalRound);
        setTimePerRoundSecond(limitTime);
    }, [totalRound, limitTime])

    const displayTimePerRound = `${Math.floor(timePerRoundSecond / 60)} : ${timePerRoundSecond % 60}`

    const increaseRound = () => {
        setRound((prev) => prev === MAX_ROUND ? prev : prev + 1)
    }
    const decreaseRound = () => {
        setRound((prev) => prev === 0 ? prev : prev - 1)
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