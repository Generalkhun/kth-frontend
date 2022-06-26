import { Card, CardActionArea, CardMedia, CardContent, Typography, Paper, Button, makeStyles, IconButton } from '@material-ui/core'
import { fontSize, height, textAlign } from '@mui/system'
import React from 'react'
import { Participant } from '../../../models/ui-layer/model'

type Props = {
    participant: Participant
    onEliminatePeople: (participantId: string) => void

}

const useStyles = makeStyles({
    ParticipantCardContainer: {
        position: 'relative',
        height: '30vh',
        width: '200px',
        backgroundColor: 'black',
        paddingTop: '20px',
        marginBottom: '30px',
    },
    eliminateBtn: {
        position: 'absolute',
        bottom: '-50px', /*your button position*/
        right: '-50px', /*your button position*/
        borderRadius: '50%',
        textAlign: 'center',
    },
    nameContainer: {
        color: 'white',
        backgroundColor: 'black',
        marginTop: '10px',
        position: 'absolute',
        bottom: '-30px', /*your button position*/
        right: '125px', /*your button position*/
    },
    avatarImgPlayCardContainer: {
        width: '250px',
        height: '250px',
        margin: '3px',
        padding: '3px',
        backgroundColor: '#262626'
    },
    avatarImgPlayCardAlive: {
        maxWidth: '100%',
        height: 'auto',
    },
    avatarImgPlayCardEliminated: {
        maxWidth: '100%',
        height: 'auto',
        brightness: 50,
    }

})
export const DisplayParticipantInGameCard = ({ participant, onEliminatePeople }: Props) => {
    const avatarUrl = participant.avatarUrl || ''
    console.log("🚀 ~ file: index.tsx ~ line 56 ~ DisplayParticipantInGameCard ~ participant", participant)
    const name = participant.name
    const classes = useStyles()

    return (
        <div className={classes.ParticipantCardContainer}>
            <div className={classes.avatarImgPlayCardContainer}>
                <img
                    className={participant.isEliminated ? classes.avatarImgPlayCardEliminated : classes.avatarImgPlayCardAlive}
                    src={avatarUrl}
                />
            </div>

            <Button onClick={() => onEliminatePeople(participant.participantId)} className={classes.eliminateBtn}>
                <img height='20px' src='./error-failure-10382.svg' />
            </Button>
            <Paper className={classes.nameContainer}>
                <Typography>
                    {name}
                </Typography>
            </Paper>
        </div>
    )
}
