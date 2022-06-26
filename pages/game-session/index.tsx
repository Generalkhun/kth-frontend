import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import useCountdownTimer from '../../hooks/useCountdownTimer';
import { MockParticipants } from '../../mockData'
import { Participant } from '../../models/ui-layer/model';
import { DisplayParticipantInGameCard } from '../../components/InGameInteraction/DisplayParticipantInGameCard'
import { withStyles } from '@material-ui/styles';
import { KillConfirmation } from '../../components/modal/KillConfirmation';
import GameSessionHeader from '../../components/GameSessionHeader';
import { GameStateContext } from '../../contextProviders/GameStateProvider';
import { WebSocketContext } from '../../contextProviders/WebSocketProviders';
import { mapPlayersToParticipants } from '../../utils/mapper';

type Props = {}

const useStyles = makeStyles({
    ParticipantsPlayableAreaContainer: {
        margin: '10px',
    },
    OuterContainer: {
        height: '75vh',
        borderRadius: '4px',
        backgroundColor: 'black'
    }
})
const index = (props: Props) => {
    const { roomDataState, myPlayerInfoState } = useContext(GameStateContext);
    const { eliminatePlayer } = useContext(WebSocketContext);
    const {
        displayTimeLeftMin,
        displayTimeLeftSecond,
        startCountdown,
        resetCountdown,
        pauseCountdown,
        isCountingdown,
    } = useCountdownTimer({
        startTimeSecond: roomDataState.limitTime,
    })

    const classes = useStyles()
    const [isRoundEnd, setIsRoundEnd] = useState<boolean>(false)
    // get participant data
    let participantsData: any = mapPlayersToParticipants(roomDataState.players, roomDataState.currentPlayerStatus);

    const onEliminatePeople = (participantId: string) => {
        eliminatePlayer({
            playerId: participantId,
        })
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
                <GameSessionHeader
                    round={roomDataState.currentRound}
                    displayTimeLeftMin={displayTimeLeftMin}
                    displayTimeLeftSecond={displayTimeLeftSecond}
                />
                {!isCountingdown && <button onClick={startCountdown}>Start</button>}
                <Grid container>
                    <Grid item md={1}>
                    </Grid>
                    <Grid item md={7}>
                        <Paper className={classes.OuterContainer}>
                            <Grid container className={classes.ParticipantsPlayableAreaContainer}>
                                {participantsData.map((participant: Participant, idx: number) => (
                                    <Grid key={idx} item md={4}>
                                        <DisplayParticipantInGameCard myPlayerId={myPlayerInfoState?.playerId} participant={participant} key={idx} onEliminatePeople={onEliminatePeople} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={4}>
                    </Grid>
                </Grid>
            </div>
        </>

    )
}

export default index