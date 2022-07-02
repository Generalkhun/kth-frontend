import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');

type Props = {
    open: boolean,
    startingRound: string,
    handleClose: () => void,
}

// const useStyles = makeStyles({
//     modalHeader: {
//         textAlign: 'center',
//         display: 'flex',
//         justifyContent: 'center',
//         height: '64px',
//         backgroundColor: '#E2515A',
//         borderRadius: '0px',
//         border: '0px solid rgb(204, 204, 204)',
//     },
// })
const customStyles = {
    content: {
        top: '0',
        left: '0',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '100vh',
        height: '100vh',
        padding: '0px',
        backgroundColor: 'black'
    },
};
export const KillConfirmation = ({
    open,
    handleClose,
    startingRound,
}: Props) => {
    let subtitle: any;
    //const classes = useStyles();
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
           <img height='100%'src='./splash-img-round1.png'/>
        </Modal>
    )
}
