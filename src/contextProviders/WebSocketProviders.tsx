import { debounce } from "lodash";
import { useEffect, createContext, useRef, useContext } from "react";
import { WEB_SOCKET_ENDPOINT } from "../config/url";
import { MethodRecieve, MethodSend, WebsocketEliminatePlayerData, WebsocketExitRoomData, WebsocketGuessWordData, WebsocketJoinRoomData, WebsocketStartRoundData, WebsocketUpdateRoomData } from "../models/api-layer/model";
import { GameStateContext } from "./GameStateProvider";

export const WebSocketContext = createContext({} as any);

export const WebSocketProviders = ({ children }: any) => {
    const ws = useRef(null) as any;
    const { roomDataDispatch, onSyncPlayerData } = useContext(GameStateContext)
    /** Effects */
    useEffect(() => {
        ws.current = new WebSocket(WEB_SOCKET_ENDPOINT);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = (msg: { data: string }) => {
            const msgData = JSON.parse(msg.data);
            /**@note open this log for dev to easier to see the ws signal */
            //console.log("🚀 ~ file: WebSocketProviders.tsx ~ line 20 ~ useEffect ~ msgData", msgData)
            if (msgData.method === MethodRecieve.SYNC_PLAYER_DATA) {
                onSyncPlayerData(msgData.data)
                return
            }
            roomDataDispatch({
                type: msgData.method,
                payload: msgData.data
            })
        }

        // return () => {
        //     wsCurrent.close();
        // };
    }, []);

    /**
     * Web socket send data to BE handlers 
     */
    /**
     * @todo refactor these handlers to use the same function
     */

    const joinRoom = (data: WebsocketJoinRoomData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: MethodSend.JOIN_ROOM,
                data
            })
        )
    }

    const updateRoomSetting = debounce((data: WebsocketUpdateRoomData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: MethodSend.UPDATE_ROOM_SETTING,
                data
            })
        )
    },500)

    const startRound = (data: WebsocketStartRoundData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: MethodSend.START_ROUND,
                data
            })
        )
    }

    const eliminatePlayer = (data: WebsocketEliminatePlayerData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: MethodSend.ELIMITNATE_PLAYER,
                data
            })
        )
    }

    const guessWord = (data: WebsocketGuessWordData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: MethodSend.GUESS_WORD,
                data
            })
        )
    }

    return (
        <WebSocketContext.Provider
            value={
                {
                    ws,
                    //pauseWebSocketConnection,
                    joinRoom,
                    updateRoomSetting,
                    startRound,
                    eliminatePlayer,
                    guessWord,
                }
            }
        >
            {children}
        </WebSocketContext.Provider>
    );
}