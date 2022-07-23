import { Grid, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { SPLASH_PAGE_SHOWING_MILLISECOND } from '../../src/config/constants';
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';

const useStyle = makeStyles({
    topContainer: {
        backgroundColor: '#262626',
        height: '100vh',
    },
    imgContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        objectFit: 'cover',
        height: '800px'
    }
})
const index = () => {
    const classes = useStyle();
    //const { roomDataState } = useContext(GameStateContext)
    const router = useRouter();
    //const currentRound = roomDataState.currentRound

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
                <div className={classes.imgContainer}>
                    <img className={classes.img} src='roundx.png' />
                </div>
            </Grid>
            <Grid item md={3}></Grid>


        </Grid>
    )
}

export default index