/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import ColumnHeader from '@/components/Column/ColumnHeader/ColumnHeader';
import { Box, IconButton } from '@mui/material';
import { ColumnContainerProps } from '@/models/column.interface';
import { useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import dataBaseUse from '@/utils/databaseUse';
import AddElementList from '@/features/AddElementList/AddElementList';
import useProjectList from '@/hooks/useProjectList';
import ColumnTask from '@/components/Column/ColumnTask/ColumnTask';
import ColumnList from '@/components/Column/ColumnList/ColumnList';
import useTitleEdit from '@/hooks/useTitleEdit';
import ColumnTaskCard from '@/components/Column/ColumnTaskCard/ColumnTaskCard';
import { TASK } from '@/utils/constants';
import { MenuItem, ListItemIcon, Divider } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import styles from './columnContainer.module.css';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { ListItemProps } from '@/models/project.interface';

const ColumnContainer = ({ columnName, columnId }: ColumnContainerProps) => {
	const { projectId } = useParams();
	const { id } = useAuth();
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [taskValue, setTaskValue] = useState<string>('');
	const [openTaskId, setOpenTaskId] = useState<string | null>(null);
	const [cardData, setCardData] = useState<ListItemProps>({});
	const [contextMenu, setContextMenu] = useState<string | null>('');
	const { value, textChange, setValue } = useTitleEdit('');
	const taskRef = `tasks/${id}/children/${projectId}/columns/${columnId}`;
	const { columns } = useProjectList();
	const columnChoosen: ListItemProps[] = columns.filter(
		(item: ListItemProps) => item.id === columnId,
	);
	const [open, setOpen] = useState(false);
	const [deletedItem, setDeletedItem] = useState<ListItemProps>();

	const handleCheckedChange = async (e: React.ChangeEvent<HTMLInputElement>, cardId: string) => {
		const checked = e.target.value;
		await dataBaseUse.updateCardTags(taskRef, cardId, checked);
	};

	const openAddForm = () => {
		setOpenForm(true);
	};
	const closeAddForm = () => setOpenForm(false);
	const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => setTaskValue(e.target.value);
	const closeContextMenu = () => setContextMenu(null);

	const deleteTask = async (taskId: string) => {
		setDeletedItem({
			title: cardData.title,
			id: cardData.id,
			tags: columnChoosen?.flatMap((item) => item.tasks).find((card: any) => card.id === taskId)
				?.tags,
		});
		await dataBaseUse.deleteTask(taskRef, taskId);
	};

	const addTask = async (e: any) => {
		e.preventDefault();
		await dataBaseUse.addTask(taskRef, taskValue);
		setTaskValue('');
		setOpenForm(false);
	};

	const handleEditTaskSubmit = async (e: React.MouseEvent<HTMLButtonElement>, taskId: string) => {
		e.preventDefault();
		await dataBaseUse.updateTaskName(taskRef, taskId, value);
		setOpenTaskId(null);
	};

	const getTaskData = (column: ListItemProps, taskId: string) => {
		const cardTitle = column
			?.flatMap((item: ListItemProps) => item.tasks)
			.find((item: ListItemProps) => item.id === taskId)?.title;
		const cardId = column
			?.flatMap((item: ListItemProps) => item.tasks)
			.find((item: ListItemProps) => item.id === taskId)?.id;
		const cardTags = column
			?.flatMap((item: ListItemProps) => item.tasks)
			.find((card: ListItemProps) => card.id === taskId)?.tags;

		return {
			cardTitle,
			cardId,
			cardTags,
		};
	};

	const handleClickOpen = (taskId: string) => {
		setOpen(true);
		const cardTitle = getTaskData(columnChoosen, taskId).cardTitle;
		const cardId = getTaskData(columnChoosen, taskId).cardId;
		const cardTags = getTaskData(columnChoosen, taskId).cardTags;
		setCardData({
			title: cardTitle,
			id: cardId,
			tags: cardTags,
		});
	};

	const showContextMenu = (e: any, itemId: string) => {
		e.preventDefault();
		setContextMenu(itemId);
	};

	const openCard = (taskId: string) => {
		setOpen(true);
		handleClickOpen(taskId);
	};

	const returnTask = async (data: ListItemProps) => {
		if (data) {
			await dataBaseUse.returnTask(taskRef, data);
		}
	};

	return (
		<Box
			sx={{
				p: '15px',
				m: '10px 15px',
				backgroundColor: '#aed7e3',
				borderRadius: '5px',
				display: 'flex',
				flexDirection: 'column',
				width: '180px',
				height: 'fit-content',
			}}
		>
			<ColumnHeader columnName={columnName} columnId={columnId} />
			<Droppable droppableId={columnId}>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<ColumnList>
							{columnChoosen &&
								columnChoosen.map((item) =>
									item?.tasks?.map((item: ListItemProps, index: number) => (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided) => (
												<div
													{...provided.dragHandleProps}
													{...provided.draggableProps}
													ref={provided.innerRef}
												>
													<ColumnTask
														key={item.id}
														task={item}
														handleEditTaskSubmit={handleEditTaskSubmit}
														openTaskId={openTaskId}
														textChange={textChange}
														setValue={setValue}
														value={value}
														setOpenTaskId={setOpenTaskId}
														openCard={() => handleClickOpen(item.id)}
														showContextMenu={(e) => showContextMenu(e, item.id)}
														contextMenu={contextMenu}
														tags={getTaskData(columnChoosen, item.id).cardTags}
													>
														<div className={styles.context__menu}>
															<div className={styles.icon}>
																<IconButton onClick={closeContextMenu}>
																	<CloseIcon fontSize="small" />
																</IconButton>
															</div>
															<MenuItem onClick={() => openCard(item.id)}>
																<ListItemIcon>
																	<OpenInFullIcon fontSize="small" />
																</ListItemIcon>
																Open card
															</MenuItem>
															<Divider />
															<MenuItem onClick={() => deleteTask(item.id)}>
																<ListItemIcon>
																	<DeleteOutlineIcon fontSize="small" />
																</ListItemIcon>
																Delete task
															</MenuItem>
														</div>
													</ColumnTask>
												</div>
											)}
										</Draggable>
									)),
								)}
							{provided.placeholder}
						</ColumnList>
					</div>
				)}
			</Droppable>
			<ColumnTaskCard
				deleteTask={() => deleteTask(cardData.id)}
				itemId={getTaskData(columnChoosen, cardData.id).cardId}
				open={open}
				setOpen={setOpen}
				title={cardData.title}
				handleCheckedChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleCheckedChange(e, cardData.id)
				}
				checkedList={getTaskData(columnChoosen, cardData.id).cardTags}
				returnTask={() => returnTask(deletedItem)}
			/>
			<AddElementList
				open={openForm}
				handleOpen={openAddForm}
				handleClose={closeAddForm}
				value={taskValue}
				inputLabel={TASK.TYPE_NEW_TITLE}
				addElement={addTask}
				handleChange={handleAddChange}
			/>
		</Box>
	);
};

export default ColumnContainer;
