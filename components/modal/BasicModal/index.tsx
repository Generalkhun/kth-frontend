import { Box, Paper, styled, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const modalBodyStyle = {
  backgroundColor: 'white',
  width: '500px',
  height: '600px',

  borderRadius: '15px',
  padding: '15px',
};
const style = {
  // position: 'absolute' as 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,

  position: 'absolute',
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};


export const BasicModal = ({ show, onClose, children, title }: any) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <Box sx={style}>
      <Paper style={modalBodyStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Score board
        </Typography>
      </Paper>

    </Box>
    // <Paper style={{ backgroundColor: 'black'}}>
    //   <div>
    //     <div>
    //       <a href="#" onClick={handleCloseClick}>
    //         x
    //       </a>
    //     </div>
    //     <h2>{title}</h2>
    //     <div>{children}</div>
    //   </div>
    // </Paper>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("__next") as any
    );
  } else {
    return null;
  }
};
