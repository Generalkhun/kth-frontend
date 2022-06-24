import { createContext, useReducer, useState } from "react";
import { GameState, MethodRecieve } from "../models/api-layer/model";

const initialState: GameState = {
    roomId: '',
    currentPlayerId: '',
    hostId: '',
    players: [], // playerId , playerName , isDead
    totalRound: 5,
    currentRound: 0,
    timeLimit: 120,
    isPlaying: false,
    isFinish: false,
}
const reducer = (state: GameState, action: any) => {
    switch (action.type) {
        case MethodRecieve.SYNC_ROOM_DATA:
            return {
                ...state,
                roomid: action.payload.id,
                hostid: action.payload.host,
                totalRound: action.payload.totalRound,
                currentRound: action.payload.currentRound,
                timeLimit: action.payload.timeLimit,
                players: action.payload.players,
            }
        case MethodRecieve.SYNC_PLAYER_DATA:
            return { ...state, currentPlayerId: action.payload.playerId }
        case MethodRecieve.ADD_PLAYER:
            return { ...state, players: [...state.players, action.payload] }
        case MethodRecieve.REMOVE_PLAYER:
            return { ...state, players: state.players.filter((player: any) => player.playerId !== action.payload.playerId) }
        case MethodRecieve.UPDATE_ROOM_SETTING:
            return { ...state, totalRound: action.payload.totalRound, timeLimit: action.payload.timeLimit }
        case MethodRecieve.START_ROUND:
            return { ...state, isPlaying: true, currentRound: action.payload.currentRound }
        case MethodRecieve.UPDATE_DEAD:
            return { ...state, isFinish: action.payload }
        // case MethodRecieve.END_ROUND:
        //     return { ...state, isPlaying: false, currentRound: action.payload.currentRound, isFinish: action.payload }
        default:
            return state
    }
}

export const GameStateContext = createContext({} as any);

export const GameStateProviders = ({ children }: any) => {
    /** Data store */
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GameStateContext.Provider
            value={
                {
                    gameState: state,
                    gameStateDispatch: dispatch,
                }
            }
        >
            {children}
        </GameStateContext.Provider>
    );

}