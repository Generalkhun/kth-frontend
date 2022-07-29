import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import useCountdownTimer from '../../src/hooks/useCountdownTimer';
import { Participant } from '../../src/models/ui-layer/model';
import { DisplayParticipantInGameCard } from '../../src/components/PlayerCard/DisplayParticipantInGameCard'
import GameSessionHeader from '../../src/components/GameSession/GameSessionHeader';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { mapPlayersToParticipants } from '../../src/utils/mapper';
import { GuessWord } from '../../src/components/modal/GuessWord';
import { TimeoutBar } from '../../src/components/GameSession/TimeoutBar';
import useGuessingTime from '../../src/hooks/useGuessingTime';
import { MIDDLE_MAX_SCREEN_SIZE, MOBILE_MAX_SCREEN_SIZE, SHOWING_GUESSED_RESULT_MILLISECCOND } from '../../src/config/constants';
import { useRouter } from 'next/router';
import useIsSmallerWidthThan from '../../src/hooks/useIsSmallerWidthThan';
import { GuessResultForMiddleScreen } from '../../src/components/modal/GuessResultForMiddleScreen';

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#28264F',
        height: '100vh',
        paddingTop: '4%'
    },
    ParticipantsPlayableAreaContainer: {
        margin: '10px',
    },
    OuterContainer: {
        borderRadius: '23px',
        overflow: 'scroll',
        backgroundColor: '#8175C1',
    },
    gameMotto: {
        marginTop: '2.5%',
        fontSize: '40px',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Kanit',
    },
    guessedResultContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
        marginTop: '10%'
    },
    guessingTxt: {
        position: 'absolute',
        top: '70%',
        left: '82%',
        fontFamily: 'Kanit',
        color: 'white',
    }
})
const index = () => {
    const { roomDataState, myPlayerInfoState, getPlayerNameFromId, countSurvivedPlayers } = useContext(GameStateContext);
    const [isGuessingModalOpened, setIsGuessingModalOpened] = useState<boolean>(false)
    const {
        guessingTimeState,
        onStartGuessingTime,
        readyForGuessingTimeChecker,
        playerIdGuessing,
        isGuessingTime,
        isMyTurnToGuess,
        showingResultParticipant
    } = useGuessingTime()
    const { eliminatePlayer, guessWord } = useContext(WebSocketContext);
    const {
        displayTimeLeftMin,
        setDisplayTimeLeftMin,
        displayTimeLeftSecond,
        setDisplayTimeLeftSecond,
        displayRatioTimeLeft,
        startCountdown,
        resetCountdown,
        pauseCountdown,
        isCountingdown,
    } = useCountdownTimer({
        startTimeSecond: roomDataState.limitTime,
    })

    const isMobile = useIsSmallerWidthThan(MOBILE_MAX_SCREEN_SIZE);
    const isSmallerThanMiddleScreenSize = useIsSmallerWidthThan(MIDDLE_MAX_SCREEN_SIZE);

    const classes = useStyles()
    const myPlayerId = myPlayerInfoState?.playerId
    const myAvatarUrl = myPlayerInfoState?.playerAvatarUrl
    const currentRound = roomDataState.currentRound;
    const isImDead = !!roomDataState.currentPlayerStatus[myPlayerId] ? roomDataState.currentPlayerStatus[myPlayerId] === 'ELIMINATED' : false;
    const participantsData: any = mapPlayersToParticipants(roomDataState.players, roomDataState.currentPlayerStatus, roomDataState.currentWords);
    const totalSurvivedPlayers = countSurvivedPlayers();

    // Guessing time
    const showingResultPlayerStatus = roomDataState.currentPlayerStatus[guessingTimeState.playerIdShowingResult]
    const guessedResultColor = showingResultPlayerStatus === 'WRONG' ? '#E2515A' : (showingResultPlayerStatus === 'CORRECT' ? '#6ADEBC' : 'grey')
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

    /**
     * effect to start first guessing, when time is up or isPlaying is already changed to false (from ws)
     * Since this is used only for the first player to start guessing (game is not enter guessingTime state yet), 
     * if the game already enter the guessingTime, it should not excecuted.
     */
    useEffect(() => {
        if (displayTimeLeftMin === null || displayTimeLeftSecond === null || !readyForGuessingTimeChecker() || isGuessingTime) {
       
            return;
        }
        if (displayTimeLeftMin <= 0 && displayTimeLeftSecond <= 0) {
            console.log("🚀 ~ file: index.tsx ~ line 116 ~ useEffect ~ isGuessingTime", isGuessingTime)
            console.log("🚀 ~ file: index.tsx ~ line 119 ~ useEffect ~ displayTimeLeftSecond", displayTimeLeftSecond)
            console.log("🚀 ~ file: index.tsx ~ line 119 ~ useEffect ~ displayTimeLeftMin", displayTimeLeftMin)
            console.log('readyForGuessingTimeChecker()',readyForGuessingTimeChecker());
            
            pauseCountdown()
            onStartGuessingTime();
        }
    }, [displayTimeLeftMin, displayTimeLeftSecond, roomDataState.isPlaying, readyForGuessingTimeChecker, isGuessingTime])

    /**If only a single player servived, end the time*/
    useEffect(() => {
      if(totalSurvivedPlayers === 1) {
        console.log("🚀 ~ file: index.tsx ~ line 133 ~ useEffect ~ totalSurvivedPlayers", totalSurvivedPlayers)
        pauseCountdown();
        setDisplayTimeLeftMin(0);
        setDisplayTimeLeftSecond(0);
      }
    }, [totalSurvivedPlayers])
    

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


    const guessingResultRenderer = () => {
        return (
            <>
                {guessingTimeState?.isShowingGuessedResult && <>
                    <Grid container>
                        <Grid item md={2}>

                        </Grid>
                        <Grid item md={8}>
                            <div className={classes.guessedResultContainer}>
                                <DisplayParticipantInGameCard
                                    isGuessingTime={isGuessingTime}
                                    playerIdGuessing={guessingTimeState?.playerIdShowingResult}
                                    myPlayerId={myPlayerId}
                                    participant={showingResultParticipant}
                                    onEliminatePeople={onEliminatePeople}
                                    isShowGuessedAnswerCard
                                />
                            </div>
                            <Grid container>
                                <Grid item md={3}></Grid>
                                <Grid item md={7}>
                                    <TimeoutBar
                                        timeout={SHOWING_GUESSED_RESULT_MILLISECCOND}
                                        progressBarColor={guessedResultColor}
                                    />
                                </Grid>
                                <Grid item md={2}></Grid>

                            </Grid>

                            <Typography className={classes.guessingTxt} style={{ color: guessedResultColor }}>{`${getPlayerNameFromId(guessingTimeState.playerIdShowingResult)} ตอบ${guessedResultTextInfo}`}</Typography>
                        </Grid>
                        <Grid item md={2}>

                        </Grid>
                    </Grid>
                </>}
                {(isGuessingTime && !guessingTimeState.isShowingGuessedResult) && <Typography className={classes.guessingTxt}>◌ รอ {`${getPlayerNameFromId(playerIdGuessing)} ทายคำตอบ`}</Typography>}
            </>
        )
    }

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
                <Grid item md={7} xs={12}>
                    {!isMobile && < Typography className={classes.gameMotto}>คำต้องห้าม ใครพูดตาย!</Typography>}
                    <Paper style={{ height: isSmallerThanMiddleScreenSize ? '85vh' : '65vh' }} className={classes.OuterContainer}>
                        <Grid container className={classes.ParticipantsPlayableAreaContainer}>
                            {participantsData.map((participant: Participant, idx: number) => (
                                <Grid key={idx} item md={4}>
                                    <DisplayParticipantInGameCard
                                        isGuessingTime={isGuessingTime}
                                        playerIdGuessing={playerIdGuessing === '' ? guessingTimeState?.playerIdShowingResult : playerIdGuessing}
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
                    {/* {
                        Show guessing result + guessingTxt
                        - If screen width > 960px => Show besides
                        - If < 960px => Show as modal instead
                    } */}
                    {!isSmallerThanMiddleScreenSize && guessingResultRenderer()}
                </Grid>
            </Grid>
            {/* Modals */}
            {
                <>
                    {(isGuessingModalOpened) && <GuessWord
                        open={isMyTurnToGuess}
                        onSubmitGuessingAnswer={onSubmitGuessingAnswer}
                        playerAvatarUrl={myAvatarUrl}
                    />}

                    {(guessingTimeState?.isShowingGuessedResult && isSmallerThanMiddleScreenSize) && <GuessResultForMiddleScreen
                        open={true}
                        isGuessingTime={isGuessingTime}
                        playerIdShowingResult={guessingTimeState?.playerIdShowingResult}
                        myPlayerId={myPlayerId}
                        showingResultParticipant={showingResultParticipant}
                        isCorrect={showingResultPlayerStatus !== 'WRONG'}
                    />}
                </>


            }
        </div >

    )
}

export default index