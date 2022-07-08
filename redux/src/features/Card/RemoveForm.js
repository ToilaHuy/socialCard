import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import images from '../../assest/images';
import { useDispatch } from 'react-redux';
import { destroyCard, fetchCards } from './cardsSlice';
import './CardsEx.css';
import { addRevert } from '../revert/revertSlice';

const RemoveForm = ({ remove, handleClickClose, deleteId }) => {
    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch(addRevert(deleteId));
        dispatch(destroyCard(deleteId));
        handleClickClose();
    };
    return (
        <Dialog
            className="dialog-remove"
            id="popup-dialog"
            open={remove}
            onClose={handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ width: '472px', marginBottom: '30px !important' }} id="alert-dialog-title ">
                {'Your about to delete a item'}
            </DialogTitle>
            <DialogContent style={{ paddingBottom: '16px !important' }}>
                <Stack direction="column" alignItems="center" textAlign="center" spacing={2}>
                    <div>
                        <img src={images.bigtrash} alt="" />
                    </div>
                    <div style={{ fontSize: '16px', color: '#000000', marginTop: '12px' }}>
                        This will delete your item form list <br /> Are you sure?
                    </div>
                </Stack>

                <span className="hr" styles={{ marginTop: '20px ' }}></span>
            </DialogContent>

            <DialogActions mb={10}>
                <Button id="btn_save" variant="contained" onClick={handleClickDelete}>
                    Delete
                </Button>
                <Button id="btn_cancel" variant="contained" onClick={handleClickClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveForm;
