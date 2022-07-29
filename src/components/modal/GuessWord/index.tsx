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
        justifyContent: 'center'
    },
    imgAvatar: {
        width: '80px',
        height: '80px',
        marginTop: '40px',
        marginBottom: '30px',
        // marginLeft: '34px'
    },
    txtAboveInput: {
        marginBottom: '20px',
        color: '#262626',
        fontFamily: 'Kanit',
    },
    form: {
        /* This bit sets up the horizontal layout */
        display: 'flex',
        flexDirection: 'row',

        /* This bit draws the box around it */
        border: '1px solid #262626',

        /* I've used padding so you can see the edges of the elements. */
        padding: '5px',
        width: '95%',
        borderRadius: '40px',
        height: '50px',
        position: 'absolute',
        top: '86%',
        fontSize: '20px',
        paddingLeft: 30,
        zIndex: 10,
    },
    inputBox: {
        flexGrow: 2,
        border: 'none',
        fontSize: '20px',
        fontFamily: 'Kanit',
        ['&:focus']: {
            border: 'none',
            outline: 'none',
        }

    },
    submitGuessingWordBtn: {
        backgroundColor: '#E2515A',
        borderRadius: '100px',
        width: '80px',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Kanit'
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
        height: '52%',
        maxWidth: '400px',
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
        if (!!subtitle?.style) {
            subtitle.style.color = 'white';
        }
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
                <Typography className={classes.txtAboveInput}>คิดว่าตัวเองได้คำว่าอะไร</Typography>


                <form className={classes.form}>
                    <input className={classes.inputBox} onChange={onChangeInput} value={guessInputWord} type={'text'} />
                    <Button className={classes.submitGuessingWordBtn} onClick={onAnswer}>ตอบ</Button>
                </form>



            </div>


        </Modal>
    )
}
