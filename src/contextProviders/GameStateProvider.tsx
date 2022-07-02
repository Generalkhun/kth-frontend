import { createContext, useReducer, useState } from "react";
import { MethodRecieve, RoomDataState, WebsocketSyncPlayerData } from "../models/api-layer/model";

const initialRoomDataState: RoomDataState = {
    id: '',
    host: '',
    currentRound: 0,
    totalRound: 5,
    remainingTime: 120,
    limitTime: 120,
    isPlaying: false,
    isFinish: false,
    scores: [], 
    currentWords: {},
    currentPlayerStatus: {},
    players: [],
}



const roomDataStateReducer = (state: RoomDataState, action: any) => {
    switch (action.type) {
        case MethodRecieve.SYNC_ROOM_DATA:
            return {
                ...state,
                id: action.payload.id,
                host: action.payload.host,
                totalRound: action.payload.totalRound,
                currentRound: action.payload.currentRound,
                limitTime: action.payload.limitTime,
                players: action.payload.players,
            }
        // case MethodRecieve.SYNC_PLAYER_DATA:
        //     return currentPlayerInfoState({ id:  })
        case MethodRecieve.ADD_PLAYER:
            return { ...state, players: [...state.players, action.payload] }
        case MethodRecieve.REMOVE_PLAYER:
            return { ...state, players: state.players.filter((player: any) => player.playerId !== action.payload.playerId) }
        case MethodRecieve.UPDATE_ROOM_SETTING:
            return { ...state, totalRound: action.payload.totalRound, limitTime: action.payload.limitTime }
        case MethodRecieve.START_ROUND:
            return { ...state, isPlaying: true, currentRound: action.payload.currentRound, currentWords: action.payload.currentWords }
        case MethodRecieve.UPDATE_PLAYER_STATUS:
            return { ...state, currentPlayerStatus: action.payload.currentPlayerStatus }
        // case MethodRecieve.END_ROUND:
        //     return { ...state, isPlaying: false, currentRound: action.payload.currentRound, isFinish: action.payload }
        default:
            return state
    }
}

export const GameStateContext = createContext({} as any);

export const GameStateProviders = ({ children }: any) => {
    /** Data store of game state*/
    const [roomDataState, roomDataDispatch] = useReducer(roomDataStateReducer, initialRoomDataState)
    const [myPlayerInfoState, setMyPlayerInfoState] = useState<WebsocketSyncPlayerData>({
        playerId: '',
        playerAvatarUrl: 'https://res.amazingtalker.com/users/images/no-avatar.png',
    })

    const onSyncPlayerData = (data: WebsocketSyncPlayerData) => {
        setMyPlayerInfoState(data)
    }


    return (
        <GameStateContext.Provider
            value={
                {
                    roomDataState,
                    roomDataDispatch,
                    myPlayerInfoState,
                    onSyncPlayerData,
                }
            }
        >
            {children}
        </GameStateContext.Provider>
    );

}