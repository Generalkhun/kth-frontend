import { Button, Grid, Input, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
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
        marginLeft: '20px',
        width: '100%',
        backgroundColor: '#EFEEEE',
        height: '85vh',
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