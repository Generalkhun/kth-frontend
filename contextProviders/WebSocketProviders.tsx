import { useState, useEffect, createContext, useRef, useContext } from "react";
import { WEB_SOCKET_ENDPOINT } from "../config/url";
import { MethodRecieve, MethodSend, WebsocketEliminatePlayerData, WebsocketExitRoomData, WebsocketJoinRoomData, WebsocketStartRoundData, WebsocketUpdateRoomData } from "../models/api-layer/model";
import { GameStateContext } from "./GameStateProvider";



export const WebSocketContext = createContext({} as any);

type Props = {}

export const WebSocketProviders = ({ children }: any) => {
    const ws = useRef(null) as any;
    const { gameState, gameStateDispatch } = useContext(GameStateContext)
    const gameStateContext = useContext(GameStateContext)
    /** Effects */
    useEffect(() => {
        ws.current = new WebSocket(WEB_SOCKET_ENDPOINT);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = (msg: { data: string }) => {
            const msgData = JSON.parse(msg.data);
            console.log("🚀 ~ file: webSocketProviders.tsx ~ line 36 ~ useEffect ~ msgData", msgData)
            gameStateDispatch({
                type: msgData.method,
                payload: msgData.data
            })

            //setWsMessage(msg.data)
        }

        // return () => {
        //     wsCurrent.close();
        // };
    }, []);



    /**
     * Web socket handlers
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

    const updateRoomSetting = (data: WebsocketUpdateRoomData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: MethodSend.UPDATE_ROOM_SETTING,
                data
            })
        )
    }

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
                }
            }
        >
            {children}
        </WebSocketContext.Provider>
    );
}