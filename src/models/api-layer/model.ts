/**@note please update latest version of kth-type to make things working! */
import {
    JoinRoomData,
    UpdateRoomSettingData,
    Player as PlayerFromBE,
    RoomData as RoomDataFromBE,
    BasePlayerData,
    GuessWordData,
} from 'kth-type'

/**
 * Message to back-end ws service
 * 1. JOIN_ROOM: used when a player join the room (on a lobby)
 * 2. EXIT_ROOM: used when a player exit the room (on a lobby)
 * 3. UPDATE_ROOM: for now, used when settings on the game lobby were updated
 * 4. START_ROUND: used when new round is started
 * 5. ELIMITNATE_PLAYER: used when player eliminated
 */
export enum MethodSend {
    JOIN_ROOM = 'JOIN_ROOM',
    EXIT_ROOM = 'EXIT_ROOM',
    UPDATE_ROOM_SETTING = 'UPDATE_ROOM_SETTING',
    START_ROUND = 'START_ROUND',
    ELIMITNATE_PLAYER = 'ELIMITNATE_PLAYER',
    GUESS_WORD = 'GUESS_WORD'
}

export type WebsocketJoinRoomData = JoinRoomData;

export interface WebsocketExitRoomData {
    roomId: string
}

export type WebsocketUpdateRoomData = UpdateRoomSettingData;

export interface WebsocketStartRoundData {
    roomId: string;
}

export interface WebsocketEliminatePlayerData {
    playerId: string
}

/** 
 * Message recieved from backend ws
 * 1. SYNC_ROOM_DATA: 
 * 2. ADD_PLAYER: 
 * 3. REMOVE_PLAYER:
 * 4. UPDATE_ROOM_SETTING:
 * 5. SYNC_PLAYER_DATA: get player id for this game session
 * 
 * 6. START_ROUND:
 * 7. UPDATE_PLAYER_STATUS: used to update player status from BE including 'PLAYING' | 'ELIMINATED' | 'CORRECT' | 'WRONG';
 * 8. END_GAME:
 */
export enum MethodRecieve {
    /** update game room on game-lobby */
    SYNC_ROOM_DATA = 'SYNC_ROOM_DATA',
    ADD_PLAYER = 'ADD_PLAYER',
    REMOVE_PLAYER = 'REMOVE_PLAYER',
    UPDATE_ROOM_SETTING = 'UPDATE_ROOM_SETTING',
    SYNC_PLAYER_DATA = 'SYNC_PLAYER_DATA',

    /** update game room in game-session  */
    START_ROUND = 'START_ROUND',
    ROUND_TIME_UP = 'ROUND_TIME_UP',
    UPDATE_PLAYER_STATUS = 'UPDATE_PLAYER_STATUS',
    END_ROUND = 'END_ROUND',
    END_GAME = 'END_GAME',
}

export interface WebsocketSyncPlayerData {
    playerId: string
    playerAvatarUrl: string
}

export type WebsocketGuessWordData = GuessWordData;
/**Other data */

/**@todo add playerAvatarUrl to BE */
export type Player = PlayerFromBE;

export interface RoomDataState extends RoomDataFromBE {
    players: BasePlayerData[]
    isViewingScoreBoard: boolean
}