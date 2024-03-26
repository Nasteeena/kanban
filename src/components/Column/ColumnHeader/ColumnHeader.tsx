import ChangeElement from '@/features/ChangeElement/ChangeElement';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dataBaseUse from '@/utils/databaseUse';
import useTitleEdit from '@/hooks/useTitleEdit';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import useAuth from '@/hooks/useAuth';
import styles from './columnHeader.module.css';
import { ColumnContainerProps } from '@/models/column.interface';
import { MenuItem, ListItemIcon, Divider } from '@mui/material';
import BurgerButton from '@/shared/BurgerButton/BurgerButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ColumnHeader = ({ columnName, columnId }: ColumnContainerProps) => {
	const { value, textChange, setValue } = useTitleEdit(columnName);
	const [open, setOpen] = useState<boolean>(false);
	const { id } = useAuth();
	const { projectId } = useParams();
	const messageRef = `tasks/${id}/children/${projectId}/columns/`;
	const messageRefDoc = doc(db, messageRef + columnId);

	const handleFormTable = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dataBaseUse.updateTitle(messageRefDoc, value);
		setOpen(false);
	};

	const changeTitle = () => setOpen(true);
	// const closeForm = () => {
	// 	setOpen(false);
	// 	setValue(columnName);
	// };

	const deleteColumn = async (itemId: string) => {
		await dataBaseUse.deleteFromDataBase(messageRef + itemId);
	};

	return (
		<div className={styles.container}>
			<ChangeElement
				handleSubmit={handleFormTable}
				value={value}
				textChange={textChange}
				open={open}
				changeTitle={changeTitle}
				tag={{ tag: 'h3' }}
				classname={styles.header}
				// closeForm={closeForm}
			>
				{columnName ? columnName : null}
			</ChangeElement>
			<BurgerButton buttonIcon="visible">
				<MenuItem onClick={() => deleteColumn(columnId)}>
					<ListItemIcon>
						<DeleteOutlineIcon fontSize="small" />
					</ListItemIcon>
					Delete
				</MenuItem>
				<Divider />
				<MenuItem onClick={changeTitle}>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					Edit
				</MenuItem>
			</BurgerButton>
		</div>
	);
};

export default ColumnHeader;
