import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useConntdownTimer from '../../hooks/useCountdownTimer';
import { MockParticipants } from '../../mockData'
import { Participant } from '../../models/ui-layer/model';
import { DisplayParticipantInGameCard } from '../../components/InGameInteraction/DisplayParticipantInGameCard'
import { withStyles } from '@material-ui/styles';
import { KillConfirmation } from '../../components/modal/KillConfirmation';

type Props = {}

const useStyles = makeStyles({
    ParticipantsPlayableAreaContainer: {
        margin: '10px',
    },
    OuterContainer: {
        height: '70vh',
        borderRadius: '4px',
        backgroundColor: 'black'
    }
})
const index = (props: Props) => {
    const {
        displayTimeLeftMin,
        displayTimeLeftSecond,
        startCountdown,
        resetCountdown,
        pauseCountdown,
        isCountingdown,
    } = useConntdownTimer({
        startTimeSecond: 5
    })

    const classes = useStyles()
    const [isRoundEnd, setIsRoundEnd] = useState<boolean>(false)
    const [showKillModal, setShowKillModal] = useState<boolean>(false)
    const [killingParticipantIdModalDisplay, setKillingParticipantIdModalDisplay] = useState<string>('')
    // get participant data
    let participantsData: any = MockParticipants;

    const onEliminatePeople = (participantId: string) => {
        setShowKillModal(true);
        setKillingParticipantIdModalDisplay(participantId);
    }

    useEffect(() => {
        if (displayTimeLeftMin === 0 && displayTimeLeftSecond === 0) {
            console.log('end');
            pauseCountdown()
            setIsRoundEnd(true)
        }
    }, [displayTimeLeftMin, displayTimeLeftSecond, setIsRoundEnd])


    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1>Game 1</h1>
                <div style={{ fontSize: '50px' }}>
                    <span>เวลาที่เหลือ</span><span>{displayTimeLeftMin} นาที</span><span>{displayTimeLeftSecond} วินาที</span>

                </div>
                {!isCountingdown && <button onClick={startCountdown}>Start</button>}
                <Grid container>
                    <Grid item md={3}>
                    </Grid>
                    <Grid item md={6}>
                        <Paper className={classes.OuterContainer}>
                            <Grid container className={classes.ParticipantsPlayableAreaContainer}>
                                {participantsData.map((participant: Participant, idx: number) => (
                                    <Grid key={idx} item md={4}>
                                        <DisplayParticipantInGameCard participant={participant} key={idx} onEliminatePeople={onEliminatePeople} />
                                    </Grid>

                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                    </Grid>
                </Grid>
                <KillConfirmation open={showKillModal} participantId={killingParticipantIdModalDisplay} handleClose={() => setShowKillModal(false)}/>
            </div>
        </>

    )
}

export default index