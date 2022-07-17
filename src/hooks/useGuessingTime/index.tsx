import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SHOWING_GUESSED_RESULT_MILLISECCOND } from '../../config/constants';
import { GameStateContext } from '../../contextProviders/GameStateProvider';
import { Participant } from '../../models/ui-layer/model';
import { mapPlayersToParticipants } from '../../utils/mapper';
import { usePrevious } from '../usePrevious';

type Props = {}
interface GuessingTimeState {
    isGuessingTime: boolean,
    isShowingGuessedResult: boolean,
    playerIdGuessing: string,
    playerIdShowingResult: string,
}
const useGuessingTime = () => {
    const { roomDataState, myPlayerInfoState } = useContext(GameStateContext);
    const [guessingTimeState, setGuessingTimeState] = useState<GuessingTimeState>({
        isGuessingTime: false,
        isShowingGuessedResult: false,
        playerIdGuessing: '',
        playerIdShowingResult: '',
    })
    const [isMyTurnToGuess, setIsMyTurnToGuess] = useState<boolean>(false)
    let participantsData: any = mapPlayersToParticipants(roomDataState.players, roomDataState.currentPlayerStatus, roomDataState.currentWords);
    const myPlayerId = myPlayerInfoState?.playerId
    const isGuessingTime = guessingTimeState?.isGuessingTime;
    const playerIdGuessing = guessingTimeState?.playerIdGuessing;
    const guessingPlayerStatus = roomDataState.currentPlayerStatus[playerIdGuessing]
    const previous = usePrevious({ guessingPlayerStatus })
    const showingResultParticipant = participantsData.filter((participant: Participant) => participant.participantId === guessingTimeState.playerIdShowingResult)[0] as Participant;

    const onStartGuessingTime = useCallback(
        () => {
            // find a player that is their current turn
            const playerGuessing = Object.keys(roomDataState.currentPlayerStatus)
                .map(playerId => (
                    {
                        playerId,
                        status: roomDataState.currentPlayerStatus[playerId]
                    }
                ))
                .filter(player => player.status === 'GUESSING')
            [0]

            setGuessingTimeState(prev => ({
                ...prev,
                isGuessingTime: true,
                isShowingGuessedResult: false,
                playerIdGuessing: playerGuessing?.playerId,
                playerIdShowingResult: '',
            }))
        },
        [roomDataState.currentPlayerStatus],
    )

    const onStartShowingGuessedResult = () => {

        setGuessingTimeState(prev => ({
            ...prev,
            playerIdGuessing: '',
            playerIdShowingResult: prev.playerIdGuessing,
            isShowingGuessedResult: true,
        }));
    }

    // effect to check is myturn to guess
    useEffect(() => {
        if (!guessingTimeState.isGuessingTime || !guessingTimeState.playerIdGuessing) {
            return;
        }
        if (guessingTimeState.playerIdGuessing === myPlayerId) {
            setIsMyTurnToGuess(true);
        } else {
            setIsMyTurnToGuess(false);
        }
    }, [guessingTimeState.playerIdGuessing, guessingTimeState.isGuessingTime, myPlayerId])


    useEffect(() => {
        if (!!guessingTimeState.playerIdShowingResult) {
            setIsMyTurnToGuess(false)
            // Start count down to end the showing result phase
            setTimeout(() => {
                setGuessingTimeState(prev => ({
                    ...prev,
                    isShowingGuessedResult: false,
                }))
            }, SHOWING_GUESSED_RESULT_MILLISECCOND);
        }
    }, [guessingTimeState.playerIdShowingResult])


    /**guessingPlayerStatus is updated from guessing to wrong/correct => should show the result by calling onStartShowingGuessedResult*/
    useEffect(() => {
        if (previous?.guessingPlayerStatus === 'GUESSING' && ['WRONG', 'CORRECT'].includes(guessingPlayerStatus)) {

            // update guessing player to showing result player
            onStartShowingGuessedResult()
        }
    }, [guessingPlayerStatus, onStartShowingGuessedResult])

    /**
* Will start the guessing again to update guessing player only if not showing guessing result
* On first player guessing, isShowGuessingResult will be false for sure.
*/
    useEffect(() => {
        if (guessingTimeState.isGuessingTime && !guessingTimeState.isShowingGuessedResult && guessingTimeState.playerIdShowingResult && !guessingTimeState.playerIdGuessing) {
            onStartGuessingTime();
        }
    }, [
        roomDataState.currentPlayerStatus,
        guessingTimeState.isShowingGuessedResult,
        guessingTimeState.playerIdShowingResult,
        guessingTimeState.playerIdGuessing,
    ])

    /**Reset all guessing state if it is score board viewing state and isShowingGuessedResult is changed to false after the settimeout of viewing guessed result */
    useEffect(() => {
        if (!roomDataState.isViewingScoreBoard || guessingTimeState.isShowingGuessedResult) {
            return;
        }
        // reset guessing time state
        setGuessingTimeState({
            isGuessingTime: false,
            isShowingGuessedResult: false,
            playerIdGuessing: '',
            playerIdShowingResult: '',
        })
    }, [roomDataState.isViewingScoreBoard, guessingTimeState.isShowingGuessedResult])



    return ({
        onStartGuessingTime,
        onStartShowingGuessedResult,
        guessingTimeState,
        playerIdGuessing,
        isGuessingTime,
        isMyTurnToGuess,
        showingResultParticipant,

    })
}

export default useGuessingTime