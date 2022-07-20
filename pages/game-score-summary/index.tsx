import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Grid, Paper, makeStyles, Typography, Avatar, Button, Divider } from '@material-ui/core';
import { MockParticipantsGameInfo } from '../../src/mockData'
import ParticipantScore from '../../src/components/ParticipantScore';
import { isEmpty } from 'lodash';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { useRouter } from 'next/router';
import { usePrevious } from '../../src/hooks/usePrevious';

const useStyles = makeStyles({
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#FFFFF3',
        height: '100vh'
    },
    contentContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    scoreBoardContainer: {
        background: '#FFD589',
        borderRadius: '24px',
        height: '77vh',
        minWidth: '450px',
        display: 'flex',
        justifyContent: 'end',
        flexDirection: 'column',
        paddingBottom: '20px',
        top: '10%',
        position: 'absolute',
        width: '83%',
        maxWidth: '12x00px'
    },
    scoreBoardHeaderContainer: {
        top: '1%',
        backgroundColor: '#262626',
        borderRadius: '40px',
        minWidth: '500px',
        position: 'absolute',
        marginTop: '50px',
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
        fontSize: '35px',
        paddingTop: '3px'
    },
    AvatarRowWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        minWidth: '400px',
        maxWidth: '10000px',
        height: '11.5%',
        marginBottom: '1%',
        marginLeft: '19%',
        marginRight: '8.5%',
        gap: '7%'
    },
    imgAvatar: {
        width: '70px',
        height: '70px',
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
    }
});


type Props = {

}

const index = (props: Props) => {
    const classes = useStyles();
    const router = useRouter();
    const { roomDataState, myPlayerInfoState, getPlayerAvatarFromPlayerId, getPlayerNameFromId, setSortedPlayerIdByTotalScore } = useContext(GameStateContext);
    const [totalScore, setTotalScore] = useState<Record<string, number>>({})
    const { startRound } = useContext(WebSocketContext);

    const scoresEachRound = roomDataState.scores
    const isShowNextRoundBtn = roomDataState.host === myPlayerInfoState.playerId
    const previous = usePrevious({ currentRound: roomDataState.currentRound })
    const isLastRound = roomDataState.currentRound === roomDataState.totalRound
    const onNextRoundStart = () => {
        startRound({
            roomId: '123'
        })
    }

    //calculate total score if updated
    useEffect(() => {
        setTotalScore(
            calculateEachPlayerTotalScore(scoresEachRound)
        )
    }, [scoresEachRound])


    /**
     * game session starting based on the gameState
     * if current round is increased from previous render,
     * navigate to game-session to play next round
     */
    useEffect(() => {
        if (roomDataState.currentRound === previous?.currentRound + 1) {
            router.push('/game-session')
        }
    }, [roomDataState.currentRound])

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
                    if(a.totalScore > b.totalScore) {
                        return -1
                    }
                    return 1
                })
                .map((player,index) => ({...player, rank: index}))
        )
        //navigate tp winner page
        router.push('/game-winner')
    }, [roomDataState.isFinish])


    const calculateEachPlayerTotalScore = useCallback(
        (scoresEachRound: any) => {
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
        },
        [scoresEachRound],
    )
    //const eachPlayerTotalScore = calculateEachPlayerTotalScore(scoresEachRound);
    const playerIds = Object.keys(scoresEachRound[0])

    return (
        <Grid container className={classes.topContainer}>
            <Paper className={classes.scoreBoardHeaderContainer}>
                <Typography className={classes.scoreBoardTxt}>SCORE BOARD</Typography>
            </Paper>

            <Grid item md={10} className={classes.contentContainer}>
                <Paper className={classes.scoreBoardContainer}>
                    <>
                        <div className={classes.AvatarRowWrapper}>
                            {playerIds.map((playerId: string, idx: number) => {
                                return <Avatar key={idx} className={classes.imgAvatar} alt="ME" src={getPlayerAvatarFromPlayerId(playerId)} />
                            })}
                        </div>


                        {scoresEachRound.map((gameInfoEachRound: Record<string, number>, idx: number) => (
                            <ParticipantScore
                                key={idx}
                                gameInfoEachRound={gameInfoEachRound}
                                rowOption={idx === roomDataState.currentRound - 1 ? 'currentRoundRow' : 'normalRoundRow'}
                                rowName={`Round ${idx + 1}`}
                                isAvatarOntop={idx === 0}
                            />
                        ))}
                        <ParticipantScore
                            key={'summary'}
                            gameInfoEachRound={totalScore}
                            rowOption={'summaryRow'}
                            rowName={'PTH'}
                        />
                    </>
                </Paper>

                {isShowNextRoundBtn ?
                    <Button onClick={onNextRoundStart} className={classes.nextRoundBtn}>
                        {isLastRound ? 'จบเกมส์' : 'เล่นรอบต่อไป'}
                    </Button> :
                    <Button disabled className={classes.waitingForHostToProceedInfoContainer}>
                        <img height='40px' src='./sandClockIcon.svg' />
                        {` รอ ${getPlayerNameFromId(roomDataState.host)} เพื่อ ${isLastRound ? 'จบเกมส์' : 'เริ่มเกมส์ต่อไป'}`}
                    </Button>
                }
            </Grid>
        </Grid>
    )
}

export default index