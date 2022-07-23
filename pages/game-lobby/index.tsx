import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { ParticipantsDisplayListOnLobby } from '../../src/components/gameLobby/ParticipantsDisplayListOnLobby';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';
import { WebSocketContext } from '../../src/contextProviders/WebSocketProviders';
import { useGameSetting } from '../../src/hooks/useGameSetting';
import { mapPlayersToParticipants } from '../../src/utils/mapper';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#FFFFF3',
    },
    setupGameContainer: {
        marginTop: '50px',
        marginBottom: '30px',
        marginLeft: '40px',
        width: '100%',
        backgroundColor: '#EFEEEE',
        height: '90vh',
        borderRadius: '24px 24px 24px 24px',
    },
    setupGameHeader: {
        backgroundColor: '#262626',
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
        backgroundColor: '#262626',
        marginTop: '50px',
        marginBottom: '30px',
        marginLeft: '60px',
        height: '80vh',
        overflow: 'scroll'
    },
    startGameBtn: {
        backgroundColor: '#E2515A',
        borderRadius: '40px',
        width: '90%',
        height: '50px',
        marginLeft: '60px',
        marginTop: '-5px'
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

    return (
        <Grid container className={classes.topContainer}>
            <Grid item md={7}>
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
                                <Grid item md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.decreaseBtn} onClick={decreaseRound}></Button>}
                                </Grid>
                                <Grid item md={8} className={classes.optionValueContainer}>
                                    <input className={classes.optionValue} type='text' disabled value={round} />
                                </Grid>
                                <Grid item md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.increaseBtn} onClick={increaseRound}></Button>}

                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item md={6}>
                            <Typography className={classes.optionText}>
                                เวลาต่อรอบ:
                            </Typography>
                            <Grid container className={classes.optionValueSettingContainer}>
                                <Grid item md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.decreaseBtn} onClick={decreaseTimePerRound}></Button>}
                                </Grid>
                                <Grid item md={8} className={classes.optionValueContainer}>
                                    <input className={classes.optionValue} type='text' disabled value={displayTimePerRound} />
                                </Grid>
                                <Grid item md={2} className={classes.btnArrowcontainer}>
                                    {isIamHost && <Button className={classes.increaseBtn} onClick={increaseTimePerRound}></Button>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item md={4}>
                <Paper className={classes.participantsListContainer}>
                    <Typography className={classes.playersTxt}>Players: {numberOfParticipants}</Typography>
                    <ParticipantsDisplayListOnLobby participants={participants} />
                </Paper>
                <Button onClick={onStartGame} className={classes.startGameBtn}>
                    <Typography className={classes.startGameTxt}>เล่นเลย!</Typography>
                </Button>

            </Grid>

        </Grid>

    )
}

export default index