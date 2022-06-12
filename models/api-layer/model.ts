export interface WebsocketJoinRoomData {
    playerName: string
    roomId: string
}

export interface WebsocketExitRoomData {
    roomId: string
}

export interface WebsocketUpdateRoomData {
    roomId: string;
    totalRound: number;
    timeLimit: number;
}

export interface WebsocketStartRoundData {
    roomId: string;
}

export interface WebsocketEliminatePlayerData {
    playerName: string,
    roomId: string
}

/**
 * Message to back-end ws service
 * 1. JOIN_ROOM: used when a player join the room (on a lobby)
 * 2. EXIT_ROOM: used when a player exit the room (on a lobby)
 * 3. UPDATE_ROOM: for now, used when settings on the game lobby were updated
 * 4. START_ROUND: used when new round is started
 * 5. ELIMITNATE_PLAYER: used when player eliminated
 */
//  type Method = RoomMethod | PlayerMethod | GameMethod;
//  type RoomMethod = 'ADD_PLAYER' | 'REMOVE_PLAYER' | 'UPDATE_ROOM_SETTING' | 'SYNC_ROOM_DATA';
//  type PlayerMethod = 'SYNC_PLAYER_DATA' | 'JOIN_ROOM' | 'EXIT_ROOM' | 'GUESS_WORD';
//  type GameMethod = 'START_ROUND' | 'ELIMITNATE_PLAYER' | 'END_GAME';    
export enum MethodSend {
    JOIN_ROOM = 'JOIN_ROOM',    
    EXIT_ROOM = 'EXIT_ROOM',
    UPDATE_ROOM_SETTING = 'UPDATE_ROOM_SETTING',
    START_ROUND = 'START_ROUND',
    ELIMITNATE_PLAYER = 'ELIMITNATE_PLAYER',
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
 * 7. UPDATE_DEAD:
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
    UPDATE_DEAD = 'UPDATE_DEAD',
    END_GAME = 'END_GAME',
}

export type Player = {
    playerId: string;
    roomId: string;
    playerName: string;
    playerStatus: string;
    playerAvatarUrl: string;
}
/** GameState store */
export interface GameState {
    roomId: string;
    currentPlayerId: string;
    hostId: string;
    players: Player[];
    totalRound: number;
    currentRound: number;
    timeLimit: number;
    isPlaying: boolean;
    isFinish: boolean;
    //scores: Record<string, number[]>
}