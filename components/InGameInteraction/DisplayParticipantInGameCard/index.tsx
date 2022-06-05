import { Card, CardActionArea, CardMedia, CardContent, Typography, Paper, Button, makeStyles, IconButton } from '@material-ui/core'
import { fontSize, height, textAlign } from '@mui/system'
import React from 'react'
import { Participant } from '../../../utils/gameSession/model'
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    participant: Participant

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
        bottom: '10px', /*your button position*/
        right: '5px', /*your button position*/
        borderRadius: '50%',
        textAlign: 'center',
    },
    nameContainer: {
        color: 'white',
        backgroundColor: 'black',
        marginTop: '10px',
        position: 'absolute',
        bottom: '-30px', /*your button position*/
        right: '80px', /*your button position*/
    },
    avatarImgPlayCardContainer:{
        width: '150',
        minHeight: '180px',
        maxHeight: '250px',
        margin: '3px',
        padding: '3px',
    },
    avatarImgPlayCard: {
        maxWidth: '100%', 
        height: 'auto',
    }

})
export const DisplayParticipantInGameCard = ({ participant }: Props) => {
    const avatarUrl = participant.avatarUrl || ''
    const name = participant.name
    const classes = useStyles()

    return (
        <div className={classes.ParticipantCardContainer}>
            <div className={classes.avatarImgPlayCardContainer}>
            <img
            className={classes.avatarImgPlayCard}
                src={avatarUrl}
            />
            </div>
            
            <Button className={classes.eliminateBtn}>
                <img height='20px'src='./error-failure-10382.svg'/>
            </Button>
            <Paper className={classes.nameContainer}>
                <Typography>
                    {name}
                </Typography>
            </Paper>
        </div>
    )
}
