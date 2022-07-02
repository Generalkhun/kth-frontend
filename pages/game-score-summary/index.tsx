import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core';
import {MockParticipantsGameInfo} from '../../src/mockData'
import ParticipantScore from '../../src/components/ParticipantScore';

const useStyles = makeStyles({
    scoreBoardContainer: {
        background: 'lightgrey',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: '40vh',
        padding: '0 30px',
    },
});


type Props = {

}

const index = (props: Props) => {
    const classes = useStyles()
    const participantsGameSummaryInfo = MockParticipantsGameInfo
    return (
        <div>
            <div>SCORE BOARD</div>
            <Paper className={classes.scoreBoardContainer}>
                <Grid container>
                    {participantsGameSummaryInfo.map((participantGameSummaryInfo, idx) => (
                        <ParticipantScore key={idx} participantGameSummaryInfo={participantGameSummaryInfo}/>
                    ))}
                </Grid>
            </Paper>
        </div>




    )
}

export default index