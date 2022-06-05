import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Link from 'next/link'
import React from 'react'
import { useGameSetting } from '../../hooks/useGameSetting';
import { MockParticipants } from '../../mockData';

type Props = {}

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#E5E5E5',
    },
    setupGameContainer: {
        marginTop: '80px',
        width: '90%',
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: '#EFEEEE',
        borderRadius: '24px',
        height: '90vh'
    },
    setupGameHeader: {
        backgroundColor: '#262626',
        textAlign: 'center',
        height: '106px',
        borderRadius: '24px',
    },
    setupAGame: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: 'white',
    },
    decreaseBtn: {
        // width: '65px',
        // height: '65px',
        // backgroundColor: '#262626',
        // borderRadius: '4px',
        // transform: 'rotate(-90deg)',
        width: 0, 
        height: 0,
        borderTop: '65px solid transparent',
        borderBottom: '65px solid transparent',
        borderRight: '65px solid #262626',
        //         width: 65px;
        // height: 65px;

        // background: #262626;
        // border-radius: 4px;
        // transform: rotate(-90deg);

        // /* Inside auto layout */

        // flex: none;
        // order: 0;
        // flex-grow: 0;
        // z-index: 0;
    },
    increaseBtn: {
        // width: '65px',
        // height: '65px',
        // backgroundColor: '#262626',
        // borderRadius: '4px',
        // transform: 'rotate(90deg)',
        width: 0, 
        height: 0,
        borderTop: '65px solid transparent',
        borderBottom: '65px solid transparent',
        borderLeft: '65px solid #262626',
        //         width: 65px;
        // height: 65px;

        // background: #262626;
        // border-radius: 4px;
        // transform: rotate(-90deg);

        // /* Inside auto layout */

        // flex: none;
        // order: 0;
        // flex-grow: 0;
        // z-index: 0;
    }
})

const index = (props: Props) => {
    const classes = useStyles();
    /**@todo remove mock participants after connect with the server */
    const mockParticipants = MockParticipants;
    const {
        round,
        increaseRound,
        decreaseRound,
        displayTimePerRound,
        increaseTimePerRound,
        decreaseTimePerRound,
    } = useGameSetting()

    return (
        <Grid container className={classes.topContainer}>
            <Grid item md={8}>
                <Paper className={classes.setupGameContainer}>
                    <Paper className={classes.setupGameHeader} >
                        <Typography className={classes.setupAGame}>SET UP A GAME</Typography>
                    </Paper>
                    <Grid container>
                        <Grid item md={6}>
                            <div>จำนวนรอบ:</div>
                            <Grid container>
                                <Grid item md={2}>
                                    <Button className={classes.decreaseBtn} onClick={decreaseRound}></Button>
                                </Grid>
                                <Grid item md={8}>
                                    <div>{round}</div>

                                </Grid>
                                <Grid item md={2}>
                                    <Button className={classes.increaseBtn} onClick={increaseRound}></Button>

                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item md={6}>
                            <Grid container>
                                <Grid item md={2}>
                                    <Button className={classes.decreaseBtn} onClick={decreaseTimePerRound}></Button>
                                </Grid>
                                <Grid item md={8}>
                                    <div>{displayTimePerRound}</div>

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

            </Grid>
            {/* <div>Game Lobby</div>
            <Link href='/'><button>Back</button></Link>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '70%', height: '90vh', paddingRight: '20px', backgroundColor: 'grey' }}>
                    <h4>Setting</h4>
                </div>
                <div style={{ width: '30%', color: 'white', height: '90vh', paddingLeft: '20px', backgroundColor: 'black' }}>
                    <h4>Participants</h4>
                    <Link href='/game-session'>
                        <button>Start Game !!</button>
                    </Link>

                </div>

            </div> */}

        </Grid>

    )
}

export default index