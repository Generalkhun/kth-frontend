import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { SPLASH_PAGE_SHOWING_MILLISECOND } from '../../src/config/constants';
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
const index = () => {
    const classes = useStyle();
    const { roomDataState } = useContext(GameStateContext)
    const router = useRouter();
    const currentRound = roomDataState.currentRound

    useEffect(() => {
        setTimeout(() => {
            router.push('/game-session')
        }, SPLASH_PAGE_SHOWING_MILLISECOND);
    }, [])

    return (
        <Grid container className={classes.topContainer}>
            <Grid item md={3}>
            </Grid>
            <Grid item md={6}>

                <div className={classes.contentContainer}>
                    <Typography className={classes.startTxt}>START</Typography>
                    <Typography className={classes.roundTxt}>{`ROUND ${currentRound}`}</Typography>
                    <img className={classes.img} src='monkey-splash-screen.png' />
                    <Typography className={classes.hintTxt}>{currentRound % 2 === 1 ? 'Think before you speak' : 'Try your best to make they say their word'}</Typography>
                </div>
            </Grid>
            <Grid item md={3}></Grid>


        </Grid>
    )
}

export default index