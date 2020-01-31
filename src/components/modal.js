import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';  
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
  modal:{
    scrollBehavior: 'smooth',
    zIndex: '800',
    right: '0px',
    bottom: '0px',
    alignItcems: 'center',
    justifyContent: 'center',
    display: 'flex',
    top: '0',
    position: 'relative',
    left: '0',
    
  },

  buttonSign: {
    fontWeight: 'bold',
    textTransform: 'initial',
    textDecoration:'none', 
    color:'white',
  },

  modalContent:{
    alignSelf:'center', 
    justifyContent:'center', 
    backgroundColor: '#F4E1E1',
    width:'400px'
  },
}))


const ModalSign = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div>
      <Button className={classes.buttonSign} onClick={handleOpen}>
        <h2>{props.buttonText}</h2>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid className={classes.modalContent}>
            {props.Component}
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalSign;