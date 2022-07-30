import { Grid, makeStyles, Typography } from '@material-ui/core';
import { sample } from 'lodash';
import { useRouter } from 'next/router';
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { HINTS_SPLASH_SCREEN, SPLASH_PAGE_SHOWING_MILLISECOND } from '../../src/config/constants';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';

const useStyle = makeStyles({
    topContainer: {
        backgroundColor: '#28264F',
        height: '100vh',
    },
    contentContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '30%',
        objectFit: 'cover',
    },
    startTxt: {
        color: 'white',
        fontFamily: 'Kanit',
        fontWeight: 'bold',
        fontSize: '45px'
    },
    roundTxt: {
        color: 'white',
        fontFamily: 'Kanit',
        fontSize: '38px'
    },
    hintTxt: {
        color: 'white',
        fontFamily: 'Kanit',
        fontSize: '14px',
        paddingTop: '40px'
    }

})
const GameSplashScreen = () => {
    const classes = useStyle();
    const { roomDataState } = useContext(GameStateContext)
    const router = useRouter();
    const currentRound = roomDataState.currentRound
    const hint = sample(HINTS_SPLASH_SCREEN);

    useEffect(() => {
        setTimeout(() => {
            router.push('/game-session')
        }, SPLASH_PAGE_SHOWING_MILLISECOND);
    }, [router])

    return (
        <Grid container className={classes.topContainer}>
            <Grid item md={3}>
            </Grid>
            <Grid item md={6}>

                <div className={classes.contentContainer}>
                    <Typography className={classes.startTxt}>START</Typography>
                    <Typography className={classes.roundTxt}>{`ROUND ${currentRound}`}</Typography>
                    <Image alt='Dont say it' className={classes.img} src='monkey-splash-screen.png' />
                    <Typography className={classes.hintTxt}>{`hint: ${hint}`}</Typography>
                </div>
            </Grid>
            <Grid item md={3}></Grid>


        </Grid>
    )
}

export default GameSplashScreen