import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Scoreboard } from '../../components/modal/Scoreboard';
import useConntdownTimer from '../../hooks/useCountdownTimer';
import { MockParticipants, MockParticipantsGameInfo } from '../../mockData'
import Modal from '@mui/material/Modal';
import { BasicModal } from '../../components/modal/BasicModal';
import { Participant } from '../../utils/gameSession/model';
import {DisplayParticipantInGameCard} from '../../components/InGameInteraction/DisplayParticipantInGameCard'

type Props = {}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


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

    const [isRoundEnd, setIsRoundEnd] = useState<boolean>(false)
    const [showScoreBoard, setShowScoreBoard] = useState<boolean>(false)
    const onGoNextRound = () => {
        setIsRoundEnd(false)
        // go to next round
    }
    // get participant data
    let participantsData: any = MockParticipants;

    useEffect(() => {
        if (displayTimeLeftMin === 0 && displayTimeLeftSecond === 0) {
            console.log('end');
            pauseCountdown()
            setIsRoundEnd(true)
        }
    }, [displayTimeLeftMin, displayTimeLeftSecond, setIsRoundEnd])

    useEffect(() => {
        if (isRoundEnd) {
            setShowScoreBoard(true)
            /** @todo set condition to end the game if current ended round is equal to total round */
        }
    }, [isRoundEnd])


    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1>Game 1</h1>
                <div style={{ fontSize: '50px' }}>
                    <span>เวลาที่เหลือ</span><span>{displayTimeLeftMin} นาที</span><span>{displayTimeLeftSecond} วินาที</span>

                </div>
                {!isCountingdown && <button onClick={startCountdown}>Start</button>}
                <Grid container>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={8}>
                        <Paper style={{ backgroundColor: 'lightgrey', height: '70vh' }}>

                            {participantsData.map((participant: Participant, idx: number) => (
                                <DisplayParticipantInGameCard participant={participant} key={idx} />
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item md={2}>
                    </Grid>

                </Grid>
            </div>
        </>

    )
}

export default index