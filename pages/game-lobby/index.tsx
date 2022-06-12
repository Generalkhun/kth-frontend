import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { ParticipantsDisplayListOnLobby } from '../../components/gameLobby/ParticipantsDisplayListOnLobby';
import { GameStateContext } from '../../contextProviders/GameStateProvider';
import { WebSocketContext } from '../../contextProviders/WebSocketProviders';
import { useGameSetting } from '../../hooks/useGameSetting';
import { playersToParticipantsMapper } from '../../utils/mapper';
//import { MockParticipants } from '../../mockData';

type Props = {}

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
    },
    optionValueSettingContainer: {
        paddingTop: '30px',

    },
    /** @todo style not correct */
    optionValue: {
        borderWidth: '2px',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '20px',
        paddingRight: '15px',
        marginTop: '3px',
        borderRadius: '24px',
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
        width: '420px',
        height: '50px',
        marginLeft: '60px',
        marginTop: '-5px'
    },
    startGameTxt: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
    },
    playersTxt: {
        color: 'white',
        paddingTop: '24px',
        marginLeft: '24px'
    }
})

const index = (props: Props) => {
    const classes = useStyles();
    const { gameState } = useContext(GameStateContext);
    /** handle data from game state */
    const players = gameState.players;
    const participants = playersToParticipantsMapper(players)

    const {
        round,
        increaseRound,
        decreaseRound,
        displayTimePerRound,
        increaseTimePerRound,
        decreaseTimePerRound,
    } = useGameSetting()

    const startGame = () => {

    }
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
                                <Grid item md={2}>
                                    <Button className={classes.decreaseBtn} onClick={decreaseRound}></Button>
                                </Grid>
                                <Grid item md={8}>
                                    <TextField className={classes.optionValue} fullWidth variant="outlined" type='text' disabled value={round}></TextField>
                                </Grid>
                                <Grid item md={2}>
                                    <Button className={classes.increaseBtn} onClick={increaseRound}></Button>

                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item md={6}>
                            <Typography className={classes.optionText}>
                                เวลาต่อรอบ:
                            </Typography>
                            <Grid container className={classes.optionValueSettingContainer}>
                                <Grid item md={2}>
                                    <Button className={classes.decreaseBtn} onClick={decreaseTimePerRound}></Button>
                                </Grid>
                                <Grid item md={8}>
                                    <TextField className={classes.optionValue} fullWidth variant="outlined" type='text' disabled value={displayTimePerRound}></TextField>
                                </Grid>
                                <Grid item md={2}>
                                    <Button className={classes.increaseBtn} onClick={increaseTimePerRound}></Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>


            </Grid>
            <Grid item md={4}>
                <Paper className={classes.participantsListContainer}>
                    <Typography className={classes.playersTxt}>Players: 6</Typography>
                    <ParticipantsDisplayListOnLobby participants={participants} />
                </Paper>
                <Link href='/game-session'>
                    <Button className={classes.startGameBtn}>
                        <Typography className={classes.startGameTxt}>เล่นเลย!</Typography>
                    </Button>
                </Link>

            </Grid>

        </Grid>

    )
}

export default index