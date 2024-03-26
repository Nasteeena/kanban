import ButtonComponent from '@/shared/Button/Button';
import styles from './addElement.module.css';
import cn from 'classnames';

interface AddElementList {
	inputLabel: string;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	open: boolean;
	handleOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
	addElement: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
	buttonStyles?: string;
}

const AddElementList = ({
	inputLabel,
	value,
	handleChange,
	open,
	handleOpen,
	handleClose,
	addElement,
	buttonStyles,
}: AddElementList) => {
	return (
		<>
			{!open ? (
				<ButtonComponent onClick={handleOpen} classname={cn(styles.button, buttonStyles)}>
					Add new item
				</ButtonComponent>
			) : (
				<form className={styles.form}>
					<input
						className={styles.input}
						placeholder={inputLabel}
						type="text"
						value={value}
						onChange={handleChange}
					/>
					<div className={styles.buttonDiv}>
						<ButtonComponent onClick={addElement} classname={styles.formAddButton}>
							Add
						</ButtonComponent>
						<ButtonComponent className={styles.formCloseButton} onClick={handleClose}>
							X
						</ButtonComponent>
					</div>
				</form>
			)}
		</>
	);
};

export default AddElementList;
