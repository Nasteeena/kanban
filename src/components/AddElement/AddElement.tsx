import { db } from '@/firebase';
import { useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore'; 
import useAuth from '@/hooks/useAuth';
import { nanoid } from 'nanoid';
import {Box, Typography, Modal, IconButton} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from './addElement.module.css';
import ButtonComponent from '../Button/Button';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center'
};

// Перенести функцию добавления в другой компонент

const AddElementModal = ({path, add, openModal, setOpen}) => {
    const name = useRef();
    const { id } = useAuth();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addElement = async (e) => {
        e.preventDefault();
        try {
            const newId = nanoid();
            const docRef = doc(db, path, newId);
            await setDoc(docRef, {
                title: name?.current?.value,
                id: newId
            });
            e.target.reset();
            add();
            handleClose();
            const docRef2 = doc(db, `tasks/${id}`);
            await setDoc(docRef2, {
                id
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddCircleOutlineIcon />
            </IconButton>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Create a project
                    </Typography>
                    <form className={styles.form} onSubmit={addElement}>
                        <input ref={name} className={styles.input} placeholder='Project name' type="text"/>
                        <ButtonComponent type='submit'>Add a new project</ButtonComponent>
                    </form>
                </Box>
            </Modal>
    </div>
    );
};

export default AddElementModal;

{/* <form onSubmit={addElement}>
<input placeholder='Project name' type="text" ref={name}/>
<button type="submit">Add</button>
</form> */}

// setDoc(docRef, {
        //     title: name?.current?.value,
        //     id: newId
        // })
        // .then(() => {
        //     e.target.reset();
        //     add();
        // })
        // .then(() => {
        //     const docRef2 = doc(db, `tasks/${id}`);
        //     setDoc(docRef2, {
        //         id
        //     });
        // });