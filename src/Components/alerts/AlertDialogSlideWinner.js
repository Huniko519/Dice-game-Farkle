import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import './diaglog.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlideWinner(props) {
    const [open, setOpen] = React.useState(props.openDialog);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload(false);
        return false;
    };

    const ShowWinner = () => {
        return props.winner === 1 ?
            <p> Congratulations player One!</p>
            :
            <p> Congratulations player two!</p>
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <ShowWinner />
                </DialogContent>
                <DialogActions className="dialog-btn">
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Play Again
                    </Button>

                </DialogActions>
            </Dialog>
        </div >
    );
}