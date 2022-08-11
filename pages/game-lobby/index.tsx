import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { ParticipantsDisplayListOnLobby } from '../../src/components/gameLobby/ParticipantsDisplayListOnLobby';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { useGameSetting } from '../../src/hooks/useGameSetting';
import { mapPlayersToParticipants } from '../../src/utils/mapper';
import { useRouter } from 'next/router'
import useIsSmallerWidthThan from '../../src/hooks/useIsSmallerWidthThan';
import { MOBILE_MAX_SCREEN_SIZE } from '../../src/config/constants';

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#28264F',
        height: '100vh',
    },
    setupGameContainer: {
        marginTop: '50px',
        marginBottom: '30px',
        marginLeft: '5%',
        width: '100%',
        backgroundColor: '#4C467D',
        height: '90vh',
        borderRadius: '24px 24px 24px 24px',
    },
    setupGameHeader: {
        backgroundColor: '#8175C1',
        textAlign: 'center',
        height: '106px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24px 24px 0px 0px',
    },
    setupAGame: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Kanit',
    },
    decreaseBtn: {
        width: 0,
        height: 0,
        borderTop: '30px solid transparent',
        borderBottom: '30px solid transparent',
        borderRight: '30px solid #262626',
        padding: 0,
    },
    increaseBtn: {
        width: 0,
        height: 0,
        borderTop: '30px solid transparent',
        borderBottom: '30px solid transparent',
        borderLeft: '30px solid #262626',
        padding: 0,
    },
    optionText: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Kanit',
    },
    optionValueSettingContainer: {
        paddingTop: '30px',
    },
    optionValue: {
        backgroundColor: 'white',
        borderColor: '#262626',
        borderWidth: '2px',
        paddingRight: '15px',
        marginTop: '3px',
        borderRadius: '24px',
        fontSize: '40px',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        width: '80%',
        fontFamily: 'Kanit',
    },
    btnArrowcontainer: {
        paddingTop: '7px',
        display: 'flex',
        justifyContent: 'space-around'
    },
    optionValueContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    participantsListContainer: {
        borderRadius: '24px',
        marginRight: '2%',
        backgroundColor: '#4C467D',
        marginTop: '50px',
        marginBottom: '30px',
        height: '80vh',
        overflow: 'scroll',
        marginLeft: '14%',
    },
    participantsListMobileModeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        padding: '10px',
    },
    participantMobileModeWrapper: {
        backgroundColor: '#262626',
        padding: '10px',
        margin: '10px',
    },
    participantNameMobileMode: {
        color: 'white',
        margin: '1%',
        fontFamily: 'Kanit',
    },
    startGameBtn: {
        backgroundColor: '#E2515A',
        borderRadius: '40px',
        width: '84%',
        height: '50px',
        marginLeft: '14%',
        marginTop: '-5px',
        marginRight: '2%'
    },
    startGameBtnMobileMode: {
        backgroundColor: '#E2515A',
        borderRadius: '40px',
        width: '88%',
        height: '50px',
        marginLeft: '2%',
        position: 'absolute',
        top: '88%'
    },
    startGameTxt: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Kanit',
    },
    playersTxt: {
        color: 'white',
        paddingTop: '24px',
        marginLeft: '24px',
        fontFamily: 'Kanit',
    },
    backBtn: {
        backgroundColor: '#D9D9D9',
        color: '#262626',
        borderRadius: '40px',
        height: '26px',
        position: 'absolute',
        top: '2%',
        left: '1%',
    }
})

const GameLobby = () => {
    const classes = useStyles();
    const { roomDataState, myPlayerInfoState } = useContext(GameStateContext);
    const { startRound } = useContext(WebSocketContext);
    /** handle data from game state */
    const myPlayerId = myPlayerInfoState.playerId;
    const players = roomDataState.players;
    const participants = mapPlayersToParticipants(players, roomDataState.currentPlayerStatus)
    const numberOfParticipants = participants.length
    const isIamHost = roomDataState.host === myPlayerId
    const isMobile = useIsSmallerWidthThan(MOBILE_MAX_SCREEN_SIZE);

    const {
        round,
        increaseRound,
        decreaseRound,
        displayTimePerRound,
        increaseTimePerRound,
        decreaseTimePerRound,
    } = useGameSetting()

    const onStartGame = () => {
        startRound({
            //roomId: '123'
            roomId: process.env.NEXT_PUBLIC_DEFAULT_ROOM_ID,
        })
    }

    const onBack = () => {
        window.location.assign('/')
    }

    //If user not having a playerId yet, send back to home
    useEffect(() => {
        if (!myPlayerId) {
            onBack()
        }
    }, [onBack])

    // game session starting based on the gameState 
    const router = useRouter()
    useEffect(() => {
        if (roomDataState.currentRound === 1) {
            router.push('/game-splash-screen')
        }
    }, [roomDataState.currentRound, router])
    return (
        <Grid container className={classes.topContainer}>
            <Grid item xs={11} sm={6} md={7}>
                <Paper className={classes.setupGameContainer}>
                    <Paper className={classes.setupGameHeader} >
                        <Typography className={classes.setupAGame}>SET UP A GAME</Typography>
                    </Paper>
                    {
                        isMobile &&
                        <div className={classes.participantsListMobileModeContainer}>
                            {participants.map(participant => (
                                <Paper className={classes.participantMobileModeWrapper} key={participant.participantId}>
                                    <Avatar src={participant.avatarUrl} />
                                    <Typography className={classes.participantNameMobileMode}>{participant.name}</Typography>
                                </Paper>

                            ))}

                        </div>

                    }
                    <Grid container style={{ paddingTop: isMobile ? '0px' : '50px' }}>
                        <Grid item md={6}>
                            <Typography className={classes.optionText}>
                                จำนวนรอบ:
                            </Typography>
                            <Grid container className={classes.optionValueSettingContainer}>
                                <Grid item xs={1} md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.decreaseBtn} onClick={decreaseRound}></Button>}
                                </Grid>
                                <Grid item xs={10} md={8} className={classes.optionValueContainer}>
                                    <input className={classes.optionValue} type='text' disabled value={round} />
                                </Grid>
                                <Grid item xs={1} md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.increaseBtn} onClick={increaseRound}></Button>}

                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item md={6}>
                            <Typography className={classes.optionText}>
                                เวลาต่อรอบ:
                            </Typography>
                            <Grid container className={classes.optionValueSettingContainer}>
                                <Grid item xs={1} md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.decreaseBtn} onClick={decreaseTimePerRound}></Button>}
                                </Grid>
                                <Grid item xs={10} md={8} className={classes.optionValueContainer}>
                                    <input className={classes.optionValue} type='text' disabled value={displayTimePerRound} />
                                </Grid>
                                <Grid item xs={1} md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.increaseBtn} onClick={increaseTimePerRound}></Button>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button className={classes.backBtn} onClick={onBack}>Back</Button>
                        {
                            isMobile &&
                            <Button onClick={onStartGame} className={classes.startGameBtnMobileMode}>
                                <Typography className={classes.startGameTxt}>เล่นเลย!</Typography>
                            </Button>

                        }
                    </Grid>
                </Paper>
            </Grid>
            {!isMobile &&
                <Grid item sm={6} md={5}>
                    <Paper className={classes.participantsListContainer}>
                        <Typography className={classes.playersTxt}>Players: {numberOfParticipants}</Typography>
                        <ParticipantsDisplayListOnLobby participants={participants} />
                    </Paper>
                    <Button onClick={onStartGame} className={classes.startGameBtn}>
                        <Typography className={classes.startGameTxt}>เล่นเลย!</Typography>
                    </Button>
                </Grid>
            }
        </Grid>

    )
}

export default GameLobby