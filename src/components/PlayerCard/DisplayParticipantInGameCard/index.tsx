import { Card, CardActionArea, CardMedia, CardContent, Typography, Paper, Button, makeStyles, IconButton } from '@material-ui/core'
import React from 'react'
import { Participant } from '../../../models/ui-layer/model'

type Props = {
    participant: Participant
    onEliminatePeople: (participantId: string) => void
    myPlayerId: string
    isGuessingTime: boolean
    playerIdGuessing: string
    displayImgOnly?: boolean
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
        backgroundColor: '#262626',
        position: 'relative'
    },
    avatarImgPlayCardAlive: {
        maxWidth: '100%',
        height: 'auto',
    },
    avatarImgPlayCardEliminated: {
        maxWidth: '100%',
        height: 'auto',
        filter: 'brightness(50%)',
    },
    guessingPlayerGreenFilter: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
        backgroundColor: '#78E038',
        position: 'absolute',
    },
    guessingWordContainer: {
        position: 'absolute',
        width: '180px',
        height: '80px',
        backgroundColor: '#FFFFFF',
        bottom: '100px', /*your button position*/
        right: '-20px', /*your button position*/
    },
    guessingWord: {
        fontWeight: 'bold',
        fontSize: '30px'
    }

})
export const DisplayParticipantInGameCard = ({
    participant,
    onEliminatePeople,
    myPlayerId,
    isGuessingTime,
    playerIdGuessing,
    displayImgOnly,
}: Props) => {
    const avatarUrl = participant.avatarUrl || ''
    const name = participant.name
    const participantId = participant.participantId
    const isMeThisParticipant = myPlayerId === participantId
    const isEliminated = participant.isEliminated
    const classes = useStyles()
    const isShowGuessingWord = !isMeThisParticipant ? true : (isEliminated)
    const isHideEliminateButton = isGuessingTime || isMeThisParticipant
    const displayGuessingWord = isShowGuessingWord ? participant.guessingWord : ''
    const isGuessingPlayer = playerIdGuessing === participantId

    return (
        <div className={classes.ParticipantCardContainer}>

            {!displayImgOnly ? <>
                <div className={classes.avatarImgPlayCardContainer}>
                    {isGuessingPlayer && <div className={classes.guessingPlayerGreenFilter}></div>}
                    <img
                        className={isEliminated ? classes.avatarImgPlayCardEliminated : classes.avatarImgPlayCardAlive}
                        src={avatarUrl}
                    />

                </div>
                <Paper className={classes.guessingWordContainer}>
                    <Typography className={classes.guessingWord}>
                        {displayGuessingWord}
                    </Typography>
                </Paper>

                {!isHideEliminateButton && <Button onClick={() => { onEliminatePeople(participantId) }} className={classes.eliminateBtn}>
                    <img height='20px' src='./error-failure-10382.svg' />
                </Button>}
                <Paper className={classes.nameContainer}>
                    <Typography>
                        {name}
                    </Typography>
                </Paper>
            </>
                : <>
                    <div className={classes.avatarImgPlayCardContainer}>
                        <img
                            className={classes.avatarImgPlayCardAlive}
                            src={avatarUrl}
                        />

                    </div>

                </>
            }

        </div>
    )
}
