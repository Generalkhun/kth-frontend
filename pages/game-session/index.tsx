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
import { useRouter } from 'next/router';

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
    const [isGuessingModalOpened, setIsGuessingModalOpened] = useState<boolean>(false)
    const {
        guessingTimeState,
        onStartGuessingTime,
        playerIdGuessing,
        isGuessingTime,
        isMyTurnToGuess,
        showingResultParticipant
    } = useGuessingTime()
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
    const isImDead = !!roomDataState.currentPlayerStatus[myPlayerId] ? roomDataState.currentPlayerStatus[myPlayerId] === 'ELIMINATED' : false;
    let participantsData: any = mapPlayersToParticipants(roomDataState.players, roomDataState.currentPlayerStatus, roomDataState.currentWords);

    // Guessing time
    const showingResultPlayerStatus = roomDataState.currentPlayerStatus[guessingTimeState.playerIdShowingResult]
    const guessedResultColor = showingResultPlayerStatus === 'WRONG' ? '#E2515A' : (showingResultPlayerStatus === 'CORRECT' ? '#009245' : 'grey')
    const guessedResultTextInfo = showingResultPlayerStatus === 'WRONG' ? 'ผิด +0' : (showingResultPlayerStatus === 'CORRECT' ? 'ถูก +1' : '...')

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
    
    // effect to start first guessing
    useEffect(() => {
        if(displayTimeLeftMin === null || displayTimeLeftSecond === null) {
            return;
        }
        if (displayTimeLeftMin <= 0 && displayTimeLeftSecond <= 0) {
            pauseCountdown()
            console.log('paused countdown');
            
            onStartGuessingTime();
        }
    }, [displayTimeLeftMin, displayTimeLeftSecond])

    //effect to open the guessing modal (will not open if still showing the previous guessed result)
    useEffect(() => {
        if (!isMyTurnToGuess || guessingTimeState.isShowingGuessedResult) {
            return;
        }
        setIsGuessingModalOpened(true);
    }, [isMyTurnToGuess, guessingTimeState.isShowingGuessedResult])


    // effect to navigate to scoreboard page after the guessing time is over
    const router = useRouter()
    useEffect(() => {
        //if still showing last player's results, wait for next effect when isShowingGuessedResult => false before go to score board
        if (guessingTimeState.isShowingGuessedResult) {
            return;
        }

        if (roomDataState.isViewingScoreBoard) {
            router.push('/game-score-summary')
        }
    }, [roomDataState.isViewingScoreBoard, guessingTimeState.isShowingGuessedResult])


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
                                        isForceDisableEliminatedBtn={isImDead}
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
                            isShowGuessedAnswer
                        />
                        <TimeoutBar
                            timeout={SHOWING_GUESSED_RESULT_MILLISECCOND}
                            progressBarColor={guessedResultColor}
                        />
                        <Typography style={{ color: guessedResultColor }}>{`${getPlayerNameFromId(guessingTimeState.playerIdShowingResult)} ตอบ${guessedResultTextInfo}`}</Typography>
                    </>}
                    {(isGuessingTime && !guessingTimeState.isShowingGuessedResult) && <Typography>รอ {`${getPlayerNameFromId(playerIdGuessing)} ทายคำตอบ`}</Typography>}
                </Grid>
            </Grid>
            {/* Modals */}
            {(isGuessingModalOpened) && <GuessWord
                open={isMyTurnToGuess}
                onSubmitGuessingAnswer={onSubmitGuessingAnswer}
                playerAvatarUrl={myAvatarUrl}
            />}
        </div>

    )
}

export default index