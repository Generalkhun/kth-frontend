import { createContext, useReducer, useState } from "react";
import { MethodRecieve, MyPlayerInfo, RoomDataState } from "../models/api-layer/model";

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
            return { ...state, isPlaying: true, currentRound: action.payload.currentRound }
        case MethodRecieve.UPDATE_PLAYER_STATUS:
            return { ...state, currentPlayerStatus: Object.assign(state.currentPlayerStatus, action.payload.playerStatusMapping)}
        // case MethodRecieve.UPDATE_DEAD:
        //     return { ...state, isFinish: action.payload }
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
    console.log("🚀 ~ file: GameStateProvider.tsx ~ line 59 ~ GameStateProviders ~ roomDataState", roomDataState)
    const [myPlayerInfoState, setMyPlayerInfoState] = useState<MyPlayerInfo>({
        id: ''
    })

    const onSyncPlayerData = (id: string) => {
        setMyPlayerInfoState({id})
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