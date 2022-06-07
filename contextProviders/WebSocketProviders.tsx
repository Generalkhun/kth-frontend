import { useState, useEffect, createContext, useRef } from "react";
import { WEB_SOCKET_ENDPOINT } from "../config/url";
import { WebsocketJoinRoomData } from "../models/api-layer/model";

enum Method {
    JOIN_ROOM = 'JOIN_ROOM',
    EXIT_ROOM = 'EXIT_ROOM',
    UPDATE_ROOM = 'UPDATE_ROOM',
    START_ROUND = 'START_ROUND',
}

export const WebSocketContext = createContext({} as any);

type Props = {}

export const WebSocketProviders = ({ children }: any) => {
    //const [isPaused, setPause] = useState<boolean>(false);
    const [wsMessage, setWsMessage] = useState<string>('');
    const ws = useRef(null) as any;
    /** Effects */
    useEffect(() => {
        ws.current = new WebSocket(WEB_SOCKET_ENDPOINT);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = (msg: { method: Method, data: string }) => {
            setWsMessage(msg.data)
        }

        // return () => {
        //     wsCurrent.close();
        // };
    }, []);

    // useEffect(() => {
    //     if (!ws.current) return;
    //     ws.current.onmessage = (e: any) => {
    //         if (isPaused) return;
    //         const message = JSON.parse(e.data);
    //         console.log("e", message);
    //     };
    // }, [isPaused]);

    // process a message recieved from a socket
    useEffect(() => {
        // const { data, method } = JSON.parse(wsMessage)
        // switch (method) {
        //     case Method.UPDATE_ROOM :

        // }
        console.log("🚀 ~ file: webSocketProviders.tsx ~ line 51 ~ WebSocketProviders ~ wsMessage", wsMessage)


    }, [wsMessage])



    /**
     * Web socket handlers
     */

    // const pauseWebSocketConnection = () => {
    //     setPause(true)
    // }

    const joinRoom = (data: WebsocketJoinRoomData) => {
        if (!ws.current) return;
        ws.current.send(
            JSON.stringify({
                method: Method.JOIN_ROOM,
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
                }
            }
        >
            {children}
        </WebSocketContext.Provider>
    );
}