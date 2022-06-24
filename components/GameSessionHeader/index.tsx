import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React from 'react'

type Props = {
    round: number
    displayTimeLeftMin: number
    displayTimeLeftSecond: number
}

const useStyles = makeStyles({
    gameSessionHeaderContainer: {
        width: '600px',
        height: '76px',
        backgroundColor: '#262626',
        marginTop: '80px',
        marginLeft: '260px',
        borderRadius: '43.475px',
    },
    clockContainer: {
        backgroundColor: '#262626',
        width: '143px',
        height: '143px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-40px',
        marginLeft: '30px',
        position: 'relative',
    },
    clockRedPart: {
        backgroundColor: '#E2515A',
        width: '112px',
        height: '112px',
        borderRadius: '50%',
        position: 'absolute',
        display: `inline-block`,
        linearGradient: '(90deg, #FFFFFF 50%, transparent 50%)',
    },
    clockWhitePart: {
        backgroundColor: '#FFFFFF',
        width: '112px',
        height: '112px',
        borderRadius: '50%',
        position: 'absolute',
        linearGradient: '(90deg, #d1d1d1 50%, transparent 50%)',
    },
    gameSessionHeaderTxtRound: {
        color: 'white',
        fontSize: 35,
        fontWeight: 700,
        marginTop: '10px',
        marginLeft: '60px',
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
}: Props) => {
    console.log("🚀 ~ file: index.tsx ~ line 57 ~ round", round)
    const classes = useStyles()
    return (
        <Paper className={classes.gameSessionHeaderContainer}>
            <Grid container>
                <Grid item md={4} >
                    <Typography className={classes.gameSessionHeaderTxtRound} >{`Round ${round}`}</Typography>
                </Grid>
                <Grid item md={4}>
                    <Paper className={classes.clockContainer}>
                        <Paper className={classes.clockRedPart}></Paper>
                        {/* <Paper className={classes.clockWhitePart}></Paper> */}
                    </Paper>
                </Grid>
                <Grid item md={4}>
                    <Typography className={classes.gameSessionHeaderTxtTime} >{`${displayTimeLeftMin}.${displayTimeLeftSecond}`}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default GameSessionHeader