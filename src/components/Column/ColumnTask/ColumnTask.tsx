import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './columnTask.module.css';
import IconButton from '@mui/material/IconButton/IconButton';
import useHover from '@/hooks/useHover';
import ButtonComponent from '@/shared/Button/Button';
import { ColumnTaskProps } from '@/models/column.interface';

const ColumnTask = ({
	task,
	value,
	textChange,
	handleEditTaskSubmit,
	openTaskId,
	setValue,
	setOpenTaskId,
	openCard,
	showContextMenu,
	contextMenu,
	children,
	tags,
}: ColumnTaskProps) => {
	const { elementEnter, elementLeave, hoveredElementId } = useHover();

	const openEditForm = (
		e: React.MouseEvent<HTMLButtonElement>,
		taskId: string,
		taskTitle: string,
	) => {
		e.stopPropagation();
		setOpenTaskId(taskId);
		setValue(taskTitle);
	};

	const closeForm = () => setOpenTaskId(null);

	return (
		<>
			{openTaskId === task.id ? (
				<form className={styles.form__container}>
					<TextField
						value={value}
						onChange={textChange}
						autoFocus={true}
						size="small"
						variant="filled"
						sx={{ '& input': { padding: '5px' }, margin: '20px 0px 27px 20px' }}
					/>
					<ButtonComponent onClick={closeForm} classname={styles.formButton}>
						X
					</ButtonComponent>
					<ButtonComponent onClick={(e) => handleEditTaskSubmit(e, task.id)} type="submit">
						Submit
					</ButtonComponent>
				</form>
			) : (
				<>
					<div className={styles.tags}>
						{tags &&
							tags.map((item: string, index: number) => (
								<div
									key={index}
									style={{
										backgroundColor: item,
										width: '30px',
										height: '7px',
										margin: '3px',
										borderRadius: '5px',
									}}
								></div>
							))}
					</div>

					<div
						className={styles.column__header}
						key={task.id}
						onMouseEnter={() => elementEnter(task.id)}
						onMouseLeave={() => elementLeave(task.id)}
						onClick={openCard}
						onContextMenu={showContextMenu}
					>
						<span className={styles.column__span}>{task.title}</span>
						{hoveredElementId === task.id && (
							<IconButton
								onClick={(e) => openEditForm(e, task.id, task.title)}
								sx={{ height: '20px' }}
							>
								<EditIcon fontSize="small" />
							</IconButton>
						)}
					</div>
					{contextMenu === task.id && showContextMenu && children}
				</>
			)}
		</>
	);
};

export default ColumnTask;
