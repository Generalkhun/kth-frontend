import { createContext, useCallback, useEffect, useReducer } from "react";

const initialState = {
    id: null,
    players: [], // playerId , playerName , isDead
    totalRound: 5,
    currentRound: null,
    timeLimit: 120,
    isPlaying: false,
    isFinish: false,
}
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'addPlayer':
            return { ...state, players: action.payload }
        case 'setTotalRound':
            return { ...state, totalRound: action.payload }
        case 'setTimePerRound':
            return { ...state, timeLimit: action.payload }
        case 'updateIsPlaying':
            return { ...state, isPlaying: action.payload }
        case 'updateIsFinish':
            return { ...state, isFinish: action.payload }
        default:
            return state
    }
}

export const GameStateContext = createContext({} as any);

export const GameStateProviders = ({ children }: any) => {
    /** Data store */
    const [state, dispatch] = useReducer(reducer, initialState)

    // send update to ws if game state changed
    const updateGameStateToServer = useCallback(
      () => {
        console.log('update game state to ws');
        
      },
      [],
    )
    
    useEffect(() => {
        //updateGameStateToServer(state)
    }, [state])
    
    return (
        <GameStateContext.Provider
            value={
                {
                    gameState: state,
                    gameStateDispatch: dispatch
                }
            }
        >
            {children}
        </GameStateContext.Provider>
    );

}