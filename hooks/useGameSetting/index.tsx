import React, { useContext, useEffect, useState } from 'react'
import { MAX_ROUND, MAX_TIME_PER_ROUND_SEC } from '../../config/constants'
import { GameStateContext } from '../../contextProviders/GameStateProvider'
import { WebSocketContext } from '../../contextProviders/WebSocketProviders'

type Props = {}

export const useGameSetting = () => {
    const { updateRoomSetting } = useContext(WebSocketContext)
    const { gameState } = useContext(GameStateContext)
    const totalRoundFromGameState = gameState.totalRound
    const timeLimitFromGameState = gameState.timeLimit
    const [round, setRound] = useState<number>(5)
    const [timePerRoundSecond, setTimePerRoundSecond] = useState<number>(120)

    // update to ws server
    useEffect(() => {
        updateRoomSetting({
            roomId: gameState.roomId,
            totalRound: round,
            timeLimit: timePerRoundSecond,
        })
    }, [round, timePerRoundSecond])

    // update from ws server
    useEffect(() => {
        setRound(totalRoundFromGameState);
        setTimePerRoundSecond(timeLimitFromGameState);
    }, [totalRoundFromGameState, timeLimitFromGameState])

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