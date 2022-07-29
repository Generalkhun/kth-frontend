import { Typography, Paper, Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { MIDDLE_MAX_SCREEN_SIZE, MOBILE_MAX_SCREEN_SIZE } from '../../../config/constants'
import useIsSmallerWidthThan from '../../../hooks/useIsSmallerWidthThan'
import { Participant } from '../../../models/ui-layer/model'
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
        //height: '30vh',
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
        backgroundColor: 'transparent',
        marginTop: '10px',
        textAlign: 'center',
        maxWidth: '250px',
    },
    avatarImgPlayCardContainer: {
        maxWidth: '23vh',
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
        backgroundColor: '#6ADEBC',
        position: 'absolute',
    },
    guessingWordContainer: {
        position: 'absolute',
        maxWidth: '180px',
        width: '50%',
        height: '50px',
        backgroundColor: '#FFFFFF',
        bottom: '70%', /*your word position*/
        //right: '13%', /*your word position*/
    },
    guessingWord: {
        fontWeight: 'bold',
        fontSize: '30px',
        fontFamily: 'Kanit',
        textAlign: 'center'
    },
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
    const classes = useStyles()
    const isShowGuessingWord = !isMeThisParticipant ? true : (isEliminated || isShowGuessedAnswerCard)
    const isHideEliminateButton = isEliminated || isGuessingTime || isMeThisParticipant || isForceDisableEliminatedBtn || isShowGuessedAnswerCard;
    const displayGuessingWord = isShowGuessingWord ? participant.guessingWord : ''
    const isShowingGreenFilter = (playerIdGuessing === participantId) && !isShowGuessedAnswerCard
    const isMobile = useIsSmallerWidthThan(MOBILE_MAX_SCREEN_SIZE);
    const isSmallerThanMiddleScreenSize = useIsSmallerWidthThan(MIDDLE_MAX_SCREEN_SIZE);
    const [XmarkRenderer] = useShakingXMark({ isEliminated });

    return (
        <div 
        style={{ height: isMobile ? '25vh' :  '30vh'}}
        className={classes.ParticipantCardContainer}>
            <div className={classes.avatarImgPlayCardContainer}>
                {isShowingGreenFilter && <div className={classes.guessingPlayerGreenFilter}></div>}
                <img
                    className={isEliminated ? classes.avatarImgPlayCardEliminated : classes.avatarImgPlayCardAlive}
                    src={avatarUrl}
                />
                {isEliminated && XmarkRenderer()}

            </div>
            <Paper style={{ 
                filter: isEliminated ? 'brightness(50%)' : undefined,
                right: isSmallerThanMiddleScreenSize? '25%' : '39%',
                
                }} className={classes.guessingWordContainer}>
                <Typography className={classes.guessingWord}>
                    {displayGuessingWord}
                </Typography>
            </Paper>

            {!isHideEliminateButton && <Button onClick={() => { onEliminatePeople(participantId) }} className={classes.eliminateBtn}>
                <img height='20px' src='./error-failure-10382.svg' />
            </Button>}
            {!isShowGuessedAnswerCard &&
                <div className={classes.nameContainer}>
                    <Typography className={classes.nameTxt}>
                        {name}
                    </Typography>
                </div>
            }
        </div>

    )
}
