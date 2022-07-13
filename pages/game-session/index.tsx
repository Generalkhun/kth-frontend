import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react'
import useCountdownTimer from '../../src/hooks/useCountdownTimer';
import { MockParticipants } from '../../src/mockData'
import { Participant } from '../../src/models/ui-layer/model';
import { DisplayParticipantInGameCard } from '../../src/components/PlayerCard/DisplayParticipantInGameCard'
import { withStyles } from '@material-ui/styles';
import { KillConfirmation } from '../../src/components/modal/KillConfirmation';
import GameSessionHeader from '../../src/components/GameSession/GameSessionHeader';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { mapPlayersToParticipants } from '../../src/utils/mapper';
import { GuessWord } from '../../src/components/modal/GuessWord';
import { TimeoutBar } from '../../src/components/GameSession/TimeoutBar';
import { usePrevious } from '../../src/hooks/usePrevious';
import useGuessingTime from '../../src/hooks/useGuessingTime';
import { SHOWING_GUESSED_RESULT_MILLISECCOND } from '../../src/config/constants';

type Props = {}

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#FFFFF3',
    },
    ParticipantsPlayableAreaContainer: {
        margin: '10px',
    },
    OuterContainer: {
        height: '75vh',
        borderRadius: '4px',
        backgroundColor: 'black'
    }
})
const index = (props: Props) => {
    const { roomDataState, myPlayerInfoState, getPlayerNameFromId } = useContext(GameStateContext);
    const {
        guessingTimeState,
        onStartGuessingTime,
        playerIdGuessing,
        isGuessingTime,
        isMyTurnToGuess,
        showingResultParticipant
    } = useGuessingTime()
    console.log("🚀 ~ file: index.tsx ~ line 43 ~ index ~ guessingTimeState", guessingTimeState)
    const { eliminatePlayer, guessWord } = useContext(WebSocketContext);
    const {
        displayTimeLeftMin,
        displayTimeLeftSecond,
        displayRatioTimeLeft,
        startCountdown,
        resetCountdown,
        pauseCountdown,
        isCountingdown,
    } = useCountdownTimer({
        startTimeSecond: roomDataState.limitTime,
    })

    const classes = useStyles()
    const myPlayerId = myPlayerInfoState?.playerId
    const myAvatarUrl = myPlayerInfoState?.playerAvatarUrl
    const currentRound = roomDataState.currentRound;
    let participantsData: any = mapPlayersToParticipants(roomDataState.players, roomDataState.currentPlayerStatus, roomDataState.currentWords);

    // Guessing time
    const showingResultPlayerStatus = roomDataState.currentPlayerStatus[guessingTimeState.playerIdShowingResult]
    const guessingPlayerStatusColor = showingResultPlayerStatus === 'WRONG' ? '#E2515A' : (showingResultPlayerStatus === 'CORRECT' ? '#009245' : 'grey')
    const guessingPlayerStatusTextInfo = showingResultPlayerStatus === 'WRONG' ? 'ผิด +0' : (showingResultPlayerStatus === 'CORRECT' ? 'ถูก +1' : '...')

    const onEliminatePeople = (participantId: string) => {
        eliminatePlayer({
            playerId: participantId,
        })
    }

    const onSubmitGuessingAnswer = (word: string) => {
        guessWord({
            word
        })
    }

    // first effect to start first guessing
    useEffect(() => {
        if (displayTimeLeftMin === 0 && displayTimeLeftSecond === 0) {
            pauseCountdown()
            onStartGuessingTime();
        }
    }, [displayTimeLeftMin, displayTimeLeftSecond])

    return (
        <div className={classes.topContainer} style={{ textAlign: 'center' }}>
            <GameSessionHeader
                round={currentRound}
                displayTimeLeftMin={displayTimeLeftMin}
                displayTimeLeftSecond={displayTimeLeftSecond}
                displayRatioTimeLeft={displayRatioTimeLeft}
            />

            <Grid container>
                <Grid item md={1}>
                </Grid>
                <Grid item md={7}>
                    <Paper className={classes.OuterContainer}>
                        <Grid container className={classes.ParticipantsPlayableAreaContainer}>
                            {participantsData.map((participant: Participant, idx: number) => (
                                <Grid key={idx} item md={4}>
                                    <DisplayParticipantInGameCard
                                        isGuessingTime={isGuessingTime}
                                        playerIdGuessing={playerIdGuessing}
                                        myPlayerId={myPlayerId}
                                        participant={participant}
                                        key={idx}
                                        onEliminatePeople={onEliminatePeople} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item md={4}>
                    {/* Word guessing result */}
                    {guessingTimeState?.isShowingGuessedResult && <>
                        <DisplayParticipantInGameCard
                            isGuessingTime={isGuessingTime}
                            playerIdGuessing={guessingTimeState?.playerIdShowingResult}
                            myPlayerId={myPlayerId}
                            participant={showingResultParticipant}
                            onEliminatePeople={onEliminatePeople}
                            displayImgOnly
                        />
                        <TimeoutBar
                            timeout={SHOWING_GUESSED_RESULT_MILLISECCOND}
                            progressBarColor={guessingPlayerStatusColor}
                        />
                        <Typography>{`<${getPlayerNameFromId(guessingTimeState.playerIdShowingResult)}> ตอบ${guessingPlayerStatusTextInfo}`}</Typography>
                    </>}
                    {(isGuessingTime && !guessingTimeState.isShowingGuessedResult) && <Typography>รอ {`<${getPlayerNameFromId(playerIdGuessing)}> ทายคำตอบ`}</Typography>}
                </Grid>
            </Grid>
            {/* Modals */}
            {(isMyTurnToGuess && !guessingTimeState.isShowingGuessedResult) && <GuessWord
                open={isMyTurnToGuess}
                onSubmitGuessingAnswer={onSubmitGuessingAnswer}
                playerAvatarUrl={myAvatarUrl}
            />}
        </div>

    )
}

export default index