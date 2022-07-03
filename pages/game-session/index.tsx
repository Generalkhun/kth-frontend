import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react'
import useCountdownTimer from '../../src/hooks/useCountdownTimer';
import { MockParticipants } from '../../src/mockData'
import { Participant } from '../../src/models/ui-layer/model';
import { DisplayParticipantInGameCard } from '../../src/components/InGameInteraction/DisplayParticipantInGameCard'
import { withStyles } from '@material-ui/styles';
import { KillConfirmation } from '../../src/components/modal/KillConfirmation';
import GameSessionHeader from '../../src/components/GameSessionHeader';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { mapPlayersToParticipants } from '../../src/utils/mapper';
import { GuessWord } from '../../src/components/modal/GuessWord';

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
    const { roomDataState, myPlayerInfoState, guessingTimeState, onStartGuessingTime, getPlayerNameFromId } = useContext(GameStateContext);
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
    const isGuessingTime = guessingTimeState?.isGuessingTime;
    const playerIdGuessing = guessingTimeState?.playerIdGuessing;
    const isMyTurnToGuess = playerIdGuessing === myPlayerId
    let participantsData: any = mapPlayersToParticipants(roomDataState.players, roomDataState.currentPlayerStatus, roomDataState.currentWords);

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

    useEffect(() => {
        if (displayTimeLeftMin === 0 && displayTimeLeftSecond === 0) {
            pauseCountdown()
            onStartGuessingTime();
        }
    }, [displayTimeLeftMin, displayTimeLeftSecond])

    useEffect(() => {
        if(isGuessingTime) {
            onStartGuessingTime();
        }
    }, [roomDataState.currentPlayerStatus])
    

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
                    {isGuessingTime && <div>รอ {`<${getPlayerNameFromId(playerIdGuessing)}> ทายคำตอบ`}</div>}
                </Grid>
            </Grid>
            {/* Modals */}
            {isMyTurnToGuess && <GuessWord
                open={isMyTurnToGuess}
                onSubmitGuessingAnswer={onSubmitGuessingAnswer}
                playerAvatarUrl={myAvatarUrl}
            />}
        </div>

    )
}

export default index