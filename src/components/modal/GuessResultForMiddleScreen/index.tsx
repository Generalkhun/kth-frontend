import { Avatar, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import Modal from 'react-modal';
import { SHOWING_GUESSED_RESULT_MILLISECCOND } from '../../../config/constants';
import { Participant } from '../../../models/ui-layer/model';
import { TimeoutBar } from '../../GameSession/TimeoutBar';
import { DisplayParticipantInGameCard } from '../../PlayerCard/DisplayParticipantInGameCard';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');

type Props = {
    open: boolean,
    isGuessingTime: boolean,
    playerIdShowingResult: string,
    myPlayerId: string,
    showingResultParticipant: Participant,
    isCorrect: boolean,
}

const useStyles = makeStyles({
    modalHeader: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '64px',
        backgroundColor: '#8175C1',
        borderRadius: '0px',
        border: '0px solid rgb(204, 204, 204)',
    },
    headerTxt: {
        color: 'white !important',
        fontSize: '22px',
        fontWeight: 'bold',
        fontFamily: 'Kanit',
    },
    modalContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8175C1',
        position: 'relative',
    },
    nameContainer: {
        color: 'white',
        backgroundColor: '#8175C1',
        marginTop: '10px',
        textAlign: 'center',
        maxWidth: '250px',
    },
    nameTxt: {
        fontFamily: 'Kanit',
    },
    pointChangeContainer: {
        width: '100%',
        display: 'flex',
        paddingTop: '20%',
        paddingLeft: '75%',
        position: 'absolute',
    },
    pointChange: {
        borderRadius: '50%',
        height: '30px',
        width: '30px',
        paddingLeft: '5px',
        border: '1px solid #FFFFFF',
        color: 'white'
    }

})
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        maxWidth: '400px',
        height: '50%',
        padding: '0px',
        borderRadius: '20px'
    },
};
export const GuessResultForMiddleScreen = ({
    open,
    isGuessingTime,
    playerIdShowingResult,
    myPlayerId,
    showingResultParticipant,
    isCorrect
}: Props) => {
    let subtitle: any;
    const classes = useStyles();
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        if (!!subtitle?.style) {
            subtitle.style.color = 'white';
        }
    }
    const guessedResultColor = isCorrect ? '#6ADEBC' : '#E2515A';
    return (
        <Modal
            isOpen={open}
            onAfterOpen={afterOpenModal}
            style={customStyles}
            contentLabel="guessing-word-modal"
        >
            <Paper className={classes.modalHeader}>
                <Typography className={classes.headerTxt} ref={(_subtitle) => (subtitle = _subtitle)}>{isCorrect ? 'CORRECT' : 'WRONG'}</Typography>
            </Paper>

            <div className={classes.modalContentContainer}>
                <DisplayParticipantInGameCard
                    isGuessingTime={isGuessingTime}
                    playerIdGuessing={playerIdShowingResult}
                    myPlayerId={myPlayerId}
                    participant={showingResultParticipant}
                    onEliminatePeople={() => { }}
                    isShowGuessedAnswerCard
                />
                <div className={classes.nameContainer}>
                    <Typography className={classes.nameTxt}>
                        {showingResultParticipant.name}
                    </Typography>
                </div>

                <div className={classes.pointChangeContainer}>
                    <div
                        className={classes.pointChange}
                        style={{
                            backgroundColor: guessedResultColor
                        }}>
                        {isCorrect ? '+1' : '-1'}
                    </div>
                </div>

                <div style={{ width: '100%', paddingLeft: '20%', height: '15vh' }}>
                    <TimeoutBar
                        timeout={SHOWING_GUESSED_RESULT_MILLISECCOND}
                        progressBarColor={guessedResultColor}
                    />
                </div>


            </div>


        </Modal>
    )
}
