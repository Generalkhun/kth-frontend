import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Grid, Paper, makeStyles, Typography, Avatar, Button } from '@material-ui/core';
import ParticipantScore from '../../src/components/ParticipantScore';
import { isEmpty } from 'lodash';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { useRouter } from 'next/router';
import { usePrevious } from '../../src/hooks/usePrevious';
import { MIDDLE_MAX_SCREEN_SIZE, MOBILE_MAX_SCREEN_SIZE } from '../../src/config/constants';
import useIsSmallerWidthThan from '../../src/hooks/useIsSmallerWidthThan';

const useStyles = makeStyles({
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#28264F',
        height: '100vh'
    },
    contentContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    scoreBoardContainer: {
        background: '#4C467D',
        borderRadius: '24px',
        maxHeight: '77vh',
        minWidth: '450px',
        paddingBottom: '20px',
        top: '10%',
        position: 'absolute',
        width: '83%',
        maxWidth: '1200px'
    },
    scoreBoardRoundContainer: {
        overflow: 'scroll',
        maxHeight: '49vh',
    },
    scoreBoardSummaryContainer: {
        marginTop: '0px',
    },
    scoreBoardHeaderContainer: {
        top: '1%',
        borderRadius: '40px',
        minWidth: '500px',
        position: 'absolute',
        zIndex: 4,
        height: '8%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scoreBoardTxt: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingTop: '3px',
        fontFamily: 'Kanit',
    },
    AvatarRowWrapper: {
        minWidth: '400px',
        maxWidth: '10000px',
        backgroundColor: 'transparent',
        height: '80px',
        borderRadius: '90px',
        marginBottom: '10px',
        marginRight: '50px',
        marginLeft: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        textAlign: 'center',
        marginTop: '3%',
        paddingLeft: '4%',
    },
    nextRoundBtn: {
        width: '300px',
        height: '60px',
        backgroundColor: '#E2515A',
        borderRadius: '40px',
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'white',
        top: '90%',
        fontFamily: 'Kanit',
    },
    waitingForHostToProceedInfoContainer: {
        width: '420px',
        height: '60px',
        backgroundColor: '#D9D9D9 !important',
        borderRadius: '40px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#262626 !important',
        top: '90%',
        fontFamily: 'Kanit',
    }
});

const GameScoreSummary = () => {
    const classes = useStyles();
    const router = useRouter();
    const { roomDataState, myPlayerInfoState, getPlayerAvatarFromPlayerId, getPlayerNameFromId, setSortedPlayerIdByTotalScore } = useContext(GameStateContext);
    const [totalScore, setTotalScore] = useState<Record<string, number>>({})
    const { startRound } = useContext(WebSocketContext);
    const ref = useRef(null) as any

    const scoresEachRound = roomDataState.scores
    const isShowNextRoundBtn = roomDataState.host === myPlayerInfoState.playerId
    const previous = usePrevious({ currentRound: roomDataState.currentRound })
    const isLastRound = roomDataState.currentRound === roomDataState.totalRound
    const isMobile = useIsSmallerWidthThan(MOBILE_MAX_SCREEN_SIZE);
    const isSmallerThanMiddleScreenSize = useIsSmallerWidthThan(MIDDLE_MAX_SCREEN_SIZE);
    const onNextRoundStart = () => {
        startRound({
            //roomId: '123'
            roomId: process.env.NEXT_PUBLIC_DEFAULT_ROOM_ID,
        })
    }

    //If user not having a playerId yet, send back to home
    useEffect(() => {
        if (!myPlayerInfoState?.playerId) {
            window.location.assign('/')
        }
    }, [myPlayerInfoState?.playerId])

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        ref.current.scrollTo({
            top: (roomDataState.currentRound - 3) > 0 ? 81 * (roomDataState.currentRound - 3) : 0,
            behavior: 'smooth',
        })
    }, [roomDataState])

    const calculateEachPlayerTotalScore = useCallback(
        () => {
            if (isEmpty(scoresEachRound)) {
                return {};
            }
            return scoresEachRound.reduce((carry: any, current: any, index: number) => {
                const playerIds = Object.keys(current)

                // increment
                playerIds.forEach((playerId) => {
                    if (!carry[playerId]) {
                        carry[playerId] = 0;
                    }
                    carry[playerId] += current[playerId]
                })
                return carry
            }, {})
        }, [scoresEachRound])

    //calculate total score if updated
    useEffect(() => {
        setTotalScore(
            calculateEachPlayerTotalScore()
        )
    }, [scoresEachRound, calculateEachPlayerTotalScore])

    /**
     * game session starting based on the gameState
     * if current round is increased from previous render,
     * navigate to game-session to play next round
     */
    useEffect(() => {
        if (roomDataState.currentRound === previous?.currentRound + 1) {
            router.push('/game-splash-screen')
        }
    }, [roomDataState.currentRound, previous, router])

    /**End game effect: navigate to winner page */
    useEffect(() => {
        if (!roomDataState.isFinish) {
            return;
        }
        // Calculate winner and save to game state
        setSortedPlayerIdByTotalScore(
            Object.keys(totalScore)
                .map((playerId: string) => {
                    return {
                        playerId: playerId,
                        totalScore: totalScore[playerId],
                    }
                })
                .sort((a, b) => {
                    if (a.totalScore > b.totalScore) {
                        return -1
                    }
                    return 1
                })
                .map((player, index) => ({ ...player, rank: index }))
        )
        //navigate tp winner page
        router.push('/game-winner')
    }, [roomDataState.isFinish, router, setSortedPlayerIdByTotalScore, totalScore])

    const playerIds = Object.keys(scoresEachRound[0])

    return (
        <Grid container className={classes.topContainer}>
            <Paper elevation={isMobile ? 0 : 1} style={{
                backgroundColor: isMobile ? 'transparent' : '#8175C1',
                marginTop: isMobile ? '0px' : '30px',
            }} className={classes.scoreBoardHeaderContainer}>
                <Typography style={{
                    fontSize: isMobile ? '25px' : '35px'
                }} className={classes.scoreBoardTxt}>SCORE BOARD</Typography>
            </Paper>

            <Grid item md={10} sm={12} className={classes.contentContainer}>
                <Paper className={classes.scoreBoardContainer}>
                    <>
                        <div style={{
                            gap: isMobile ? '2%' : '7%',
                            paddingTop: isSmallerThanMiddleScreenSize ? '2%' : '0%'
                        }} className={classes.AvatarRowWrapper}>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                            {playerIds.map((playerId: string, idx: number) => {
                                return <Avatar style={{
                                    width: isSmallerThanMiddleScreenSize ? '50px' : '70px',
                                    height: isSmallerThanMiddleScreenSize ? '50px' : '70px',
                                }} key={idx}
                                    alt="ME" src={getPlayerAvatarFromPlayerId(playerId)} />
                            })}
                        </div>

                        <div ref={ref} className={classes.scoreBoardRoundContainer}>
                            {scoresEachRound.map((gameInfoEachRound: Record<string, number>, idx: number) => (
                                <ParticipantScore
                                    key={idx}
                                    gameInfoEachRound={gameInfoEachRound}
                                    rowOption={idx === roomDataState.currentRound - 1 ? 'currentRoundRow' : 'normalRoundRow'}
                                    rowName={`Round ${idx + 1}`}
                                    isAvatarOntop={idx === 0}
                                />
                            ))}
                        </div>

                        <div className={classes.scoreBoardSummaryContainer}>
                            <ParticipantScore
                                key={'summary'}
                                gameInfoEachRound={totalScore}
                                rowOption={'summaryRow'}
                                rowName={'PTH'}
                            />
                        </div>
                    </>
                </Paper>

                {isShowNextRoundBtn ?
                    <Button onClick={onNextRoundStart} className={classes.nextRoundBtn}>
                        {isLastRound ? 'จบเกมส์' : 'เล่นรอบต่อไป'}
                    </Button> :
                    <Button disabled className={classes.waitingForHostToProceedInfoContainer}>
                        <img alt='https://www.clipartmax.com/png/middle/205-2051464_hourglass-free-icon-hourglass.png' height='40px' src='./sandClockIcon.svg' />
                        {` รอ ${getPlayerNameFromId(roomDataState.host)} เพื่อ ${isLastRound ? 'จบเกมส์' : 'เริ่มเกมส์ต่อไป'}`}
                    </Button>
                }
            </Grid>
        </Grid>
    )
}

export default GameScoreSummary