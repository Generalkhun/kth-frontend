import React, { useCallback, useContext, useEffect, useMemo } from 'react'
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
        marginTop: '35px',
        zIndex: 4,
        height: '8%',
        textAlign: 'center'
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
    const classes = useStyles()
    const { roomDataState, myPlayerInfoState, getPlayerAvatarFromPlayerId, getPlayerNameFromId } = useContext(GameStateContext);
    const { startRound } = useContext(WebSocketContext);
    const gameInfos = roomDataState.scores
    const isShowNextRoundBtn = roomDataState.host === myPlayerInfoState.playerId
    const previous = usePrevious({ currentRound: roomDataState.currentRound })
    const onNextRoundStart = () => {
        startRound({
            roomId: '123'
        })
    }

    /**
     * game session starting based on the gameState
     * if current round is increased from previous render,
     * navigate to game-session to play next round
     */
    const router = useRouter();
    useEffect(() => {
        if (roomDataState.currentRound === previous?.currentRound + 1) {

            router.push('/game-session')
        }
    }, [roomDataState.currentRound])

    const calculateEachPlayerTotalScore = useCallback(
        (gameInfos: any) => {
            if (isEmpty(gameInfos)) {
                return {};
            }
            return gameInfos.reduce((carry: any, current: any, index: number) => {
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
        [gameInfos],
    )
    const eachPlayerTotalScore = calculateEachPlayerTotalScore(gameInfos);
    const playerIds = Object.keys(gameInfos[0])

    return (
        <Grid container className={classes.topContainer}>
            <Paper className={classes.scoreBoardHeaderContainer}>
                <Typography className={classes.scoreBoardTxt}>SCORE BOARD</Typography>
            </Paper>

            <Grid item md={10} className={classes.contentContainer}>
                <Paper className={classes.scoreBoardContainer}>
                    <>
                        <div className={classes.AvatarRowWrapper}>
                            {playerIds.map((playerId: string) => {
                                return <Avatar className={classes.imgAvatar} alt="ME" src={getPlayerAvatarFromPlayerId(playerId)} />
                            })}
                        </div>


                        {gameInfos.map((gameInfoEachRound: Record<string, number>, idx: number) => (
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
                            gameInfoEachRound={eachPlayerTotalScore}
                            rowOption={'summaryRow'}
                            rowName={'PTH'}
                        />
                    </>
                </Paper>

                {isShowNextRoundBtn ?
                    <Button onClick={onNextRoundStart} className={classes.nextRoundBtn}>
                        เล่นรอบต่อไป
                    </Button> :
                    <Button disabled className={classes.waitingForHostToProceedInfoContainer}>
                        <img height='40px' src='./sandClockIcon.svg'/>
                        {` รอ ${getPlayerNameFromId(roomDataState.host)} เพื่อเริ่มเกมส์ต่อไป`}
                    </Button>
                }
            </Grid>


        </Grid>
    )
}

export default index