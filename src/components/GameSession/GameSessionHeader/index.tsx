import { Grid, Paper, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import useIsMobile from '../../../hooks/useIsMobile'

type Props = {
    round: number
    displayTimeLeftMin: number | null
    displayTimeLeftSecond: number | null
    displayRatioTimeLeft: number
}

const useStyles = makeStyles({
    gameSessionHeaderContainer: {
        maxWidth: '600px',
        width: '100%',
        height: '76px',
        backgroundColor: '#262626',
        //marginLeft: '22%',
        borderRadius: '43.475px',
    },
    clockContainer: {
        backgroundColor: '#262626',
        // width: '143px',
        // height: '143px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: '-40px',
        marginLeft: '30px',
        position: 'relative',
    },
    clockBody: {
        backgroundColor: '#FFFFFF',
        // width: '112px',
        // height: '112px',
        borderRadius: '50%',
        position: 'absolute',
        display: `inline-block`,
    },
    gameSessionHeaderTxtRound: {
        color: 'white',
        fontSize: 35,
        fontWeight: 700,
        marginTop: '10px',
        marginLeft: '60px',
        fontFamily: 'Kanit',
    },
    gameSessionHeaderTxtTime: {
        color: 'white',
        fontSize: 35,
        fontWeight: 700,
        marginTop: '10px',
        marginRight: '60px',
    }
})
const GameSessionHeader = ({
    round,
    displayTimeLeftMin,
    displayTimeLeftSecond,
    displayRatioTimeLeft,
}: Props) => {
    const isMobile = useIsMobile();
    const classes = useStyles()
    const displayTxtTime = (displayTimeLeftMin === null || displayTimeLeftSecond === null) ? '' : `${displayTimeLeftMin}.${displayTimeLeftSecond}`
    return (
        <Paper style={{ marginLeft: isMobile ? '0px' : '22%' }} className={classes.gameSessionHeaderContainer}>
            <Grid container>
                <Grid item md={4} >
                    <Typography className={classes.gameSessionHeaderTxtRound} >{`Round ${round}`}</Typography>
                </Grid>
                <Grid item md={4}>
                    <Paper style={{
                        width: isMobile ? '80px' : '143px',
                        marginTop: isMobile ? '37px' : '40px',
                    }} className={classes.clockContainer}>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(${displayRatioTimeLeft < 0.5 ? -90 : 90}deg, ${displayRatioTimeLeft < 0.5 ? '#FFFFFF' : '#E2515A'} 50%, transparent 50%),linear-gradient(${-90 + 360 * (1 - displayRatioTimeLeft)}deg, #E2515A 50%, transparent 50%)`,
                                width: isMobile ? '64px' : '112px',
                                height: isMobile ? '64px' : '112px',
                            }}
                            className={classes.clockBody}></div>
                    </Paper>
                </Grid>
                <Grid item md={4}>
                    <Typography className={classes.gameSessionHeaderTxtTime} >{displayTxtTime}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default GameSessionHeader