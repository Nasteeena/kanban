import { Modal } from '@mui/material';
import styles from './addProject.module.css';
import ButtonComponent from '../../shared/Button/Button';
import Header from '@/shared/Header/Header';
import { FormEvent } from 'react';

interface AddElementModalProps {
	open: boolean;
	handleForm: (e: FormEvent<HTMLFormElement>) => void;
	setValue: (value: string) => void;
	value: string;
	handleClose: () => void;
	title: string;
	placeHolder: string;
}

const AddElementModal = ({
	open,
	handleForm,
	setValue,
	value,
	handleClose,
	title,
	placeHolder,
}: AddElementModalProps) => {
	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<div className={styles.container}>
					<Header tag={{ tag: 'h2' }}>{title}</Header>
					<form className={styles.form} onSubmit={handleForm}>
						<input
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className={styles.input}
							placeholder={placeHolder}
							type="text"
						/>
						<ButtonComponent type="submit">Submit</ButtonComponent>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default AddElementModal;
