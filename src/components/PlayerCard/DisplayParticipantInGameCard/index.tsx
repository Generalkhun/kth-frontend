import { Card, CardActionArea, CardMedia, CardContent, Typography, Paper, Button, makeStyles, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { usePrevious } from '../../../hooks/usePrevious'
import { Participant } from '../../../models/ui-layer/model'
import { ShakeRotate } from 'reshake'
import useShakingXMark from './useShakingXMark'

type Props = {
    participant: Participant
    onEliminatePeople: (participantId: string) => void
    myPlayerId: string
    isGuessingTime: boolean
    playerIdGuessing: string
    isShowGuessedAnswerCard?: boolean
    isForceDisableEliminatedBtn?: boolean
}

const useStyles = makeStyles({
    ParticipantCardContainer: {
        position: 'relative',
        height: '30vh',
        maxWidth: '250px',
    },
    eliminateBtn: {
        position: 'absolute',
        bottom: '13%', /*your button position*/
        right: '-4%', /*your button position*/
        borderRadius: '50%',
        textAlign: 'center',
    },
    nameContainer: {
        color: 'white',
        backgroundColor: 'black',
        marginTop: '10px',
        textAlign: 'center',
        maxWidth: '250px',
    },
    avatarImgPlayCardContainer: {
        maxWidth: '250px',
        height: '250px',
        margin: '3px',
        padding: '3px',
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
        height: '50px',
        backgroundColor: '#FFFFFF',
        bottom: '70%', /*your word position*/
        right: '13%', /*your word position*/
    },
    guessingWord: {
        fontWeight: 'bold',
        fontSize: '30px',
        fontFamily: 'Kanit',
    },
    // X: {
    //     color: '#E2515A',
    //     fontWeight: 'bold',
    //     fontSize: '160px',
    //     zIndex: 0,
    //     left: '33%',
    //     top: '13%',
    //     position: 'absolute',
    //     fontFamily: 'Kanit',
    // },
    // shakingXContainer: {
    //     left: '33%',
    //     top: '13%',
    //     position: 'absolute',
    // },
    nameTxt: {
        fontFamily: 'Kanit',
    }

})
export const DisplayParticipantInGameCard = ({
    participant,
    onEliminatePeople,
    myPlayerId,
    isGuessingTime,
    playerIdGuessing,
    isShowGuessedAnswerCard,
    isForceDisableEliminatedBtn,
}: Props) => {
    const avatarUrl = participant.avatarUrl || '??'
    const name = participant.name
    const participantId = participant.participantId
    const isMeThisParticipant = myPlayerId === participantId
    const isEliminated = participant.isEliminated
    const previous = usePrevious({ isEliminated })
    const classes = useStyles()
    const isShowGuessingWord = !isMeThisParticipant ? true : (isEliminated || isShowGuessedAnswerCard)
    const isHideEliminateButton = isGuessingTime || isMeThisParticipant || isForceDisableEliminatedBtn || isShowGuessedAnswerCard;
    const displayGuessingWord = isShowGuessingWord ? participant.guessingWord : ''
    const isShowingGreenFilter = (playerIdGuessing === participantId) && !isShowGuessedAnswerCard

    const [XmarkRenderer] = useShakingXMark({isEliminated});


    // // Eliminated Mark shaking effect
    // const [isXmarkShaking, setIsXmarkShaking] = useState<boolean>(false)
    // const onShakeXMark = () => {
    //     setIsXmarkShaking(true)
    //     setTimeout(() => {
    //         setIsXmarkShaking(false)
    //     }, 400);
    // }
    // useEffect(() => {
    //     if (previous?.isEliminated === false && isEliminated === true && !isXmarkShaking) {
    //         onShakeXMark();
    //     }
    // }, [isEliminated, isXmarkShaking])
    // const XmarkRenderer = () => {
    //     return (isXmarkShaking ?
    //         <ShakeRotate className={classes.shakingXContainer} fixed>
    //             <Typography className={classes.X}>X</Typography>
    //         </ShakeRotate>
    //         :
    //         <Typography className={classes.X}>X</Typography>)
    // }


    return (
        <div className={classes.ParticipantCardContainer}>
            <div className={classes.avatarImgPlayCardContainer}>
                {isShowingGreenFilter && <div className={classes.guessingPlayerGreenFilter}></div>}
                <img
                    className={isEliminated ? classes.avatarImgPlayCardEliminated : classes.avatarImgPlayCardAlive}
                    src={avatarUrl}
                />
                {isEliminated && XmarkRenderer()}

            </div>
            <Paper style={{ filter: isEliminated ? 'brightness(50%)' : undefined }} className={classes.guessingWordContainer}>
                <Typography className={classes.guessingWord}>
                    {displayGuessingWord}
                </Typography>
            </Paper>

            {!isHideEliminateButton && <Button onClick={() => { onEliminatePeople(participantId) }} className={classes.eliminateBtn}>
                <img height='20px' src='./error-failure-10382.svg' />
            </Button>}
            {!isShowGuessedAnswerCard &&
                <Paper className={classes.nameContainer}>
                    <Typography className={classes.nameTxt}>
                        {name}
                    </Typography>
                </Paper>}
        </div>

    )
}
