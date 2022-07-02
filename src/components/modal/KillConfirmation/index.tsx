import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');

type Props = {
    open: boolean,
    participantId: string,
    handleClose: () => void,
}

const useStyles = makeStyles({
    modalHeader: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: '64px',
        backgroundColor: '#E2515A',
        borderRadius: '0px',
        border: '0px solid rgb(204, 204, 204)',
    },
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
export const KillConfirmation = ({
    open,
    handleClose,
    participantId
}: Props) => {
    let subtitle: any;
    const classes = useStyles();
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    return (
        <Modal
            isOpen={open}
            onAfterOpen={afterOpenModal}
            onRequestClose={handleClose}
            //className={classes.modalContainer}
            style={customStyles}
            contentLabel="killing-comfirmation-modal"
        >
            <Paper className={classes.modalHeader}>
                <h2 style={{ color: 'white' }} ref={(_subtitle) => (subtitle = _subtitle)}>WORD DETECTED</h2>
            </Paper>


            <p>{`ผมได้ยิน ${participantId}`}</p>
            <button onClick={handleClose}>close</button>

        </Modal>
    )
}
