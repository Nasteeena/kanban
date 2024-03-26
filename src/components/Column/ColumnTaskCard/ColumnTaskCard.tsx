import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { ColumnTaskCardProps } from '@/models/column.interface';
import { FormControl, FormLabel, FormGroup } from '@mui/material';
import CustomCheckBox from '@/components/CustomCheckbox/CustomCheckbox';
import ButtonComponent from '@/shared/Button/Button';
import styles from './columnTaskCard.module.css';

const ColumnTaskCard = ({
	open,
	setOpen,
	title,
	handleCheckedChange,
	checkedList,
	deleteTask,
	itemId,
	returnTask,
}: ColumnTaskCardProps) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Dialog
				sx={{
					'& .MuiDialog-container': {
						background: 'rgba(255, 255, 255, 0.1)',
					},
				}}
				PaperProps={{
					sx: {
						backgroundColor: 'white',
						width: '350px',
						height: '350px',
						p: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
				}}
				open={open}
				onClose={handleClose}
			>
				{!itemId ? (
					<div className={styles.deleted__card}>
						<div>
							Task <span className={styles.title__span}>{title}</span> has been deleted
						</div>
						<ButtonComponent onClick={returnTask}>Return the task</ButtonComponent>
					</div>
				) : (
					<>
						<DialogTitle sx={{ p: '15px' }}>Card: {title}</DialogTitle>
						<FormControl
							sx={{
								m: '10px',
								p: '10px',
								border: '1px solid black',
								borderRadius: '7px',
							}}
						>
							<FormLabel>Tags</FormLabel>
							<FormGroup>
								<CustomCheckBox
									value="red"
									label="Important"
									handleChange={handleCheckedChange}
									checkedList={checkedList}
									color="red"
								/>
								<CustomCheckBox
									value="yellow"
									label="Essential"
									handleChange={handleCheckedChange}
									checkedList={checkedList}
									color="yellow"
								/>
								<CustomCheckBox
									value="blue"
									label="Irrelevant"
									handleChange={handleCheckedChange}
									checkedList={checkedList}
									color="blue"
								/>
							</FormGroup>
						</FormControl>
						<ButtonComponent onClick={deleteTask} appearance="small" classname={styles.delete__btn}>
							Delete task
						</ButtonComponent>
					</>
				)}
			</Dialog>
		</>
	);
};

export default ColumnTaskCard;
