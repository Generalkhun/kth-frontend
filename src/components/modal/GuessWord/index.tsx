import { Avatar, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import Modal from 'react-modal';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');

type Props = {
    open: boolean,
    playerAvatarUrl: string,
    onSubmitGuessingAnswer: (word: string) => void,
}

const useStyles = makeStyles({
    modalHeader: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '64px',
        backgroundColor: '#E2515A',
        borderRadius: '0px',
        border: '0px solid rgb(204, 204, 204)',
    },
    headerTxt : {
        color: 'white !important',
        fontSize:'22px',
        fontWeight: 'bold',
    },
    imgAvatar: {
        width: '80px',
        height: '80px',
        // marginTop: '10px',
        // marginLeft: '34px'
    },
    modalContentContainer: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'
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
        width: '551px',
        height: '380px',
        padding: '0px',
        borderRadius: '20px'
    },
};
export const GuessWord = ({
    open,
    onSubmitGuessingAnswer,
    playerAvatarUrl
}: Props) => {
    let subtitle: any;
    const classes = useStyles();
    const [guessInputWord, setGuessInputWord] = useState<string>('')
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'white';
    }
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuessInputWord(e.target.value)
    }
    const onAnswer = () => {
        onSubmitGuessingAnswer(guessInputWord)
    }
    return (
        <Modal
            isOpen={open}
            onAfterOpen={afterOpenModal}
            style={customStyles}
            contentLabel="guessing-word-modal" 
        >
            <Paper className={classes.modalHeader}>
                <Typography className={classes.headerTxt} ref={(_subtitle) => (subtitle = _subtitle)}>TIME UP! GUESS WORD</Typography>
            </Paper>

            <div className={classes.modalContentContainer}>
                <Avatar className={classes.imgAvatar} alt={'ME'} src={playerAvatarUrl} />
                <Typography>คิดว่าตัวเองได้คำว่าอะไร</Typography>
                <input onChange={onChangeInput} value={guessInputWord} type={'text'}>
                </input>
                <Button onClick={onAnswer}>ตอบ</Button>
            </div>


        </Modal>
    )
}
