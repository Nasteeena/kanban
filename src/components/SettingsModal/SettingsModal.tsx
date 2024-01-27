import CloseIcon from '@mui/icons-material/Close';
import { SettingsModalProps } from './settingsModal.interface';
import {  
    IconButton, 
    DialogContent,
    DialogTitle, 
    Dialog, 
    Box
} from "@mui/material";
import TextElement from '../TextElement/TextElement';
import ButtonComponent from '../Button/Button';
import { useDispatch } from 'react-redux';
import { updateName, clearLoader } from '@/store/slices/user.slice';
import useAuth from '@/hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const SettingsModal = ({ open, setOpen }: SettingsModalProps) => {    
    const dispatch = useDispatch();
    const { nameLoading } = useAuth();
    const notify = () => toast("Wow so easy !");

    const handleClose = () => {
        setOpen(false);
    };

    const changeName = async(e) => {
        e.preventDefault();
        dispatch(clearLoader());
        const { name } = e.target;
        const nameValue = name.value;
        dispatch(updateName(nameValue))
            .then(() => {
                dispatch(clearLoader());
            })
    }

    return (
        <>
            <Dialog
                onClose={handleClose}
                open={open}
                onClick={(e) => e.stopPropagation()}
            >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Account Settings
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Box sx={{display: 'flex', gap: '5px', alignItems: 'baseline'}}>
                    <form onSubmit={changeName}>
                        <TextElement 
                            label='Change your name'
                            name='name'
                        />
                        <ButtonComponent>Confirm</ButtonComponent>
                    </form>
                </Box>
            </DialogContent>
            </Dialog>
        </>
        );
    }

export default SettingsModal



