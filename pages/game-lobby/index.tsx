import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { ParticipantsDisplayListOnLobby } from '../../src/components/gameLobby/ParticipantsDisplayListOnLobby';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { useGameSetting } from '../../src/hooks/useGameSetting';
import { mapPlayersToParticipants } from '../../src/utils/mapper';
import { useRouter } from 'next/router'
import useIsMobile from '../../src/hooks/useIsMobile';

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#28264F',
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
        paddingTop: '50px',
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
        width: '84%',
        height: '50px',
        marginLeft: '14%',
        marginTop: '-5px',
        marginRight: '2%'
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
    }
})

const index = () => {
    const classes = useStyles();
    const { roomDataState, myPlayerInfoState } = useContext(GameStateContext);
    const { startRound } = useContext(WebSocketContext);
    /** handle data from game state */
    const players = roomDataState.players;
    const participants = mapPlayersToParticipants(players, roomDataState.currentPlayerStatus)
    const numberOfParticipants = participants.length
    const isIamHost = roomDataState.host === myPlayerInfoState.playerId
    const isMobile = useIsMobile();

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
            roomId: '123'
        })
    }

    // game session starting based on the gameState 
    const router = useRouter()
    useEffect(() => {
        if (roomDataState.currentRound === 1) {
            router.push('/game-splash-screen')
        }
    }, [roomDataState.currentRound])
    console.log('screen.width', screen.width)
    return (
        <Grid container className={classes.topContainer}>
            <Grid item xs={11} sm={6} md={7}>
                <Paper className={classes.setupGameContainer}>
                    <Paper className={classes.setupGameHeader} >
                        <Typography className={classes.setupAGame}>SET UP A GAME</Typography>
                    </Paper>
                    <Grid container>
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
                        {
                            isMobile &&
                            <>
                                <div className={classes.participantsListMobileModeContainer}>
                                    {participants.map(participant => (
                                        <Paper className={classes.participantMobileModeWrapper}>
                                            <Avatar src={participant.avatarUrl} />
                                            <Typography className={classes.participantNameMobileMode}>{participant.name}</Typography>
                                        </Paper>

                                    ))}

                                </div>
                                <Button onClick={onStartGame} className={classes.startGameBtnMobileMode}>
                                    <Typography className={classes.startGameTxt}>เล่นเลย!</Typography>
                                </Button>
                            </>

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
            {/* <Grid item xs={1} sm={6} md={5}>

                <Paper className={classes.participantsListContainer}>
                    <Typography className={classes.playersTxt}>Players: {numberOfParticipants}</Typography>
                    <ParticipantsDisplayListOnLobby participants={participants} />
                </Paper>
                <Button onClick={onStartGame} className={classes.startGameBtn}>
                    <Typography className={classes.startGameTxt}>เล่นเลย!</Typography>
                </Button>

            </Grid> */}

        </Grid>

    )
}

export default index