import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import useAuth from '@/hooks/useAuth';
import TableHeader from '@/components/Table/TableHeader/TableHeader';
import dataBaseUse from '@/utils/databaseUse';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useProjectList from '@/hooks/useProjectList';
import { setColumnsList } from '@/store/slices/columns.slice';
import TableList from '@/components/Table/TableList/TableList';
import AddElementList from '@/features/AddElementList/AddElementList';
import styles from './tableContainer.module.css';
import { TABLE } from '@/utils/constants';
import { DropResult } from '@hello-pangea/dnd';
import { ListItemProps } from '@/models/project.interface';

const TableContainer = () => {
	const { projectId } = useParams();
	const { id } = useAuth();
	const dispatch = useDispatch();
	const collectionRef = `tasks/${id}/children/${projectId}/columns`;
	const messageRefCollection = collection(db, collectionRef);
	const { projects, columns } = useProjectList();
	const [openAddForm, setOpenAddForm] = useState<boolean>(false);
	const [snapshots] = useCollectionData(messageRefCollection);
	const [columnValue, setColumnValue] = useState<string>('');

	useEffect(() => {
		dispatch(setColumnsList(snapshots));
	}, [snapshots, dispatch]);

	const handleOpen = () => setOpenAddForm(true);
	const handleClose = () => setOpenAddForm(false);
	const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setColumnValue(e.target.value);

	const addElement = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await dataBaseUse.addToDatabase(collectionRef, columnValue, true);
		setColumnValue('');
		setOpenAddForm(false);
	};

	const handleDragDrop = async (result: DropResult) => {
		const { source, destination, type } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && source.index === destination.index)
			return;

		if (type === 'group') {
			const updatedColumnList = [...columns];
			const sourceIndex = source.index;
			const destinationIndex = destination.index;

			const [sourceItem] = updatedColumnList.splice(sourceIndex, 1);
			updatedColumnList.splice(destinationIndex, 0, sourceItem);
			await dataBaseUse.updateColumnsList(collectionRef, updatedColumnList);
		}

		const updatedTasks: ListItemProps[] = [...columns];
		const sourceIndex = source.index;
		const destinationIndex = destination.index;

		const foundIndexSource = columns.findIndex(
			(item: ListItemProps) => item.id === source.droppableId,
		);
		const foundIndexDestination = columns.findIndex(
			(item: ListItemProps) => item.id === destination.droppableId,
		);

		const newSourceItems: ListItemProps[] = [...columns[foundIndexSource].tasks];
		const newDestinationItems =
			source.droppableId !== destination.droppableId
				? [...columns[foundIndexDestination].tasks]
				: newSourceItems;

		const [deletedItem] = newSourceItems.splice(sourceIndex, 1);
		newDestinationItems.splice(destinationIndex, 0, deletedItem);

		updatedTasks[foundIndexSource] = {
			...updatedTasks[foundIndexSource],
			tasks: newSourceItems,
		};

		updatedTasks[foundIndexDestination] = {
			...updatedTasks[foundIndexDestination],
			tasks: newDestinationItems,
		};

		await dataBaseUse.updateTasksList(collectionRef, updatedTasks);
	};

	return (
		<Box sx={{ height: '100vh' }}>
			<TableHeader projects={projects} />
			<TableList handleDragDrop={handleDragDrop} columns={columns}>
				<AddElementList
					buttonStyles={styles.add__button}
					open={openAddForm}
					handleOpen={handleOpen}
					handleClose={handleClose}
					inputLabel={TABLE.TYPE_NEW_TITLE}
					addElement={addElement}
					value={columnValue}
					handleChange={handleColumnChange}
				/>
			</TableList>
		</Box>
	);
};

export default TableContainer;
