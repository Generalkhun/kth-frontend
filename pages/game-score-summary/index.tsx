import React from 'react'
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import { MockParticipantsGameInfo } from '../../src/mockData'
import ParticipantScore from '../../src/components/ParticipantScore';

const useStyles = makeStyles({
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    },
    contentContainer: {
        paddingTop: '70px',
        position: 'relative',

    },
    scoreBoardContainer: {
        background: '#FFD589',
        borderRadius: '24px',
        height: '75vh',
        minWidth: '450px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '100px',
    },
    scoreBoardHeaderContainer: {
        backgroundColor: '#262626',
        borderRadius: '40px',
        minWidth: '500px',
        position: 'absolute',
        marginTop: '35px',
        zIndex: 4,
        height: '60px',
        textAlign: 'center'
    },
    scoreBoardTxt: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '35px',
        paddingTop: '3px'
    }
});


type Props = {

}

const index = (props: Props) => {
    const classes = useStyles()
    const gameInfos = MockParticipantsGameInfo
    const mockParticipantAvatarUrl = 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA'

    return (
        <Grid container className={classes.topContainer}>
            <Paper className={classes.scoreBoardHeaderContainer}>
                <Typography className={classes.scoreBoardTxt}>SCORE BOARD</Typography>
            </Paper>
            <Grid item md={10} className={classes.contentContainer}>
                <Paper className={classes.scoreBoardContainer}>
                    {gameInfos.map((gameInfoEachRound, idx) => (
                        <ParticipantScore key={idx} gameInfoEachRound={gameInfoEachRound} />
                    ))}
                    {/* <ParticipantScore key={'summary'} gameInfoEachRound={gameInfoSummary} summmary /> */}
                </Paper>
            </Grid>

        </Grid>
    )
}

export default index