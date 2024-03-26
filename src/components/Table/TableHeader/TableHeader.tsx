import EditIcon from '@mui/icons-material/Edit';
import styles from './tableHeader.module.css';
import ChangeElement from '@/features/ChangeElement/ChangeElement';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dataBaseUse from '@/utils/databaseUse';
import useTitleEdit from '@/hooks/useTitleEdit';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import useAuth from '@/hooks/useAuth';
import { ListItemProps } from '@mui/material';
import { TABLE } from '@/utils/constants';

const TableHeader = ({ projects }: { projects: ListItemProps[] }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { id } = useAuth();
	const { projectId } = useParams();
	const projectName = projects?.find((item: ListItemProps) => item.id === projectId)?.title;
	const { value, setValue, textChange } = useTitleEdit(projectName || '');
	const messageRefDoc = doc(db, `tasks/${id}/children/${projectId}`);

	useEffect(() => {
		if (projectName) {
			setValue(projectName);
		}
	}, [projectId, projects, projectName, setValue]);

	const handleFormTable = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dataBaseUse.updateTitle(messageRefDoc, value);
		setOpen(false);
	};

	const changeTitle = () => setOpen(true);

	return (
		<>
			<ChangeElement
				handleSubmit={handleFormTable}
				value={value}
				textChange={textChange}
				open={open}
				changeTitle={changeTitle}
				classname={styles.header}
				tag={{ tag: 'h1' }}
			>
				{projectName ? (
					<>
						{TABLE.HEADER} {projectName} <EditIcon />
					</>
				) : null}
			</ChangeElement>
		</>
	);
};

export default TableHeader;
