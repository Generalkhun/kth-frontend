import { BasePlayerData } from "kth-type";
import { isEmpty } from "lodash";
import { createContext, useReducer, useState } from "react";
import { MethodRecieve, RoomDataState, WebsocketSyncPlayerData } from "../models/api-layer/model";
import { createInitalScoreObj, updateScores } from "../utils/scoresCalculator";

interface GuessingTimeState {
    isGuessingTime: boolean,
    playerIdGuessing: string,
}

const initialRoomDataState: RoomDataState = {
    id: '',
    host: '',
    currentRound: 0,
    totalRound: 5,
    remainingTime: 120,
    limitTime: 120,
    isPlaying: false,
    isFinish: false,
    isViewingScoreBoard: false,
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
            return { ...state, scores: createInitalScoreObj(state.totalRound, [...state.players, action.payload]), players: [...state.players, action.payload] }
        case MethodRecieve.REMOVE_PLAYER:
            return { ...state, players: state.players.filter((player: any) => player.playerId !== action.payload.playerId) }
        case MethodRecieve.UPDATE_ROOM_SETTING:
            return {
                ...state,
                scores: createInitalScoreObj(action.payload.totalRound, state.players),
                totalRound: action.payload.totalRound,
                limitTime: action.payload.limitTime
            }
        case MethodRecieve.START_ROUND:
            return { ...state, isPlaying: true, currentRound: action.payload.currentRound, currentWords: action.payload.currentWords }
        case MethodRecieve.UPDATE_PLAYER_STATUS:
            return { ...state, currentPlayerStatus: action.payload.currentPlayerStatus }
        case MethodRecieve.ROUND_TIME_UP:
            return { ...state, isPlaying: false }
        case MethodRecieve.END_ROUND:
            return { ...state, isViewingScoreBoard: true, scores: updateScores(state.scores, action.payload.scores) }
        default:
            return state
    }
}

export const GameStateContext = createContext({} as any);

export const GameStateProviders = ({ children }: any) => {
    /** Data store of game state*/
    const [roomDataState, roomDataDispatch] = useReducer(roomDataStateReducer, initialRoomDataState)
    console.log("🚀 ~ file: GameStateProvider.tsx ~ line 62 ~ GameStateProviders ~ roomDataState", roomDataState)
    const [myPlayerInfoState, setMyPlayerInfoState] = useState<WebsocketSyncPlayerData>({
        playerId: '',
        playerAvatarUrl: 'https://res.amazingtalker.com/users/images/no-avatar.png',
    })

    const onSyncPlayerData = (data: WebsocketSyncPlayerData) => {
        setMyPlayerInfoState(data)
    }

    const getPlayerNameFromId = (id: string) => {
        const foundPlayer = roomDataState.players.filter((player: BasePlayerData) => player.playerId === id);
        if (isEmpty(foundPlayer)) {
            return 'undefined player'
        }
        return foundPlayer[0].playerName
    }

    const getPlayerAvatarFromPlayerId = (id: string) => {
        const foundPlayer = roomDataState.players.filter((player: BasePlayerData) => player.playerId === id);
        if (isEmpty(foundPlayer)) {
            return 'undefined player'
        }
        return foundPlayer[0].playerAvatarUrl
    }


    return (
        <GameStateContext.Provider
            value={
                {
                    roomDataState,
                    roomDataDispatch,
                    myPlayerInfoState,
                    onSyncPlayerData,
                    getPlayerNameFromId,
                    getPlayerAvatarFromPlayerId
                }
            }
        >
            {children}
        </GameStateContext.Provider>
    );

}