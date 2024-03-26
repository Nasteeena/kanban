import { useDispatch } from 'react-redux';
import { removeUser } from '@/store/slices/user.slice';
import { Typography, IconButton } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import ButtonComponent from '@/shared/Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { SIDEBAR } from '@/utils/constants';
import ProjectList from '@/components/Project/ProjectList/ProjectList';
import useProjectList from '@/hooks/useProjectList';
import dataBaseUse from '@/utils/databaseUse';
import { setProjectsList } from '@/store/slices/projects.slice';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ProjectSubHeader from '@/components/Project/ProjectHeader/ProjectHeader';
import AddElementModal from '@/features/AddProject/AddProject';
import Header from '@/shared/Header/Header';
import styles from './sidebarContainer.module.css';
import homePicture from '../../assets/home.png';
import { useParams, useNavigate } from 'react-router-dom';
import ROUTER from '@/router/routerVariables';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FormEvent } from 'react';

const SidebarContainer = () => {
	const dispatch = useDispatch();
	const { email, id } = useAuth();
	const messageRef = collection(db, `tasks/${id}/children`);
	const { projects } = useProjectList();
	const [open, setOpen] = useState<boolean>(false);
	const [snapshots, loading] = useCollectionData(messageRef);
	const [formValue, setFormValue] = useState<string>('');
	const { projectId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setProjectsList(snapshots));
	}, [snapshots, dispatch]);

	const remove = () => dispatch(removeUser());
	const returnToMain = () => navigate(ROUTER.ROOT);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	const deleteItem = async (elementId: string) => {
		await dataBaseUse.deleteFromDataBase(`tasks/${id}/children/${elementId}`);
	};

	const addElement = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValue.trim().length) {
			await dataBaseUse.addToDatabase(`tasks/${id}/children`, formValue, false);
			handleClose();
			const docRef2 = doc(db, `tasks/${id}`);
			await setDoc(docRef2, {
				id,
			});
			setFormValue('');
		}
	};

	return (
		<div className={styles.container}>
			<Header classname={styles.header} tag={{ tag: 'h1' }}>
				{SIDEBAR.HEADER}
			</Header>
			<AccountCircleIcon />
			<Typography fontSize="15px" margin="10px 0" variant="h4">
				{email}
			</Typography>
			<ProjectSubHeader>
				<IconButton onClick={handleOpen}>
					<AddCircleOutlineIcon />
				</IconButton>
				<AddElementModal
					open={open}
					handleForm={addElement}
					setValue={setFormValue}
					value={formValue}
					handleClose={handleClose}
					title="Add a new project"
					placeHolder="Type project name"
				/>
			</ProjectSubHeader>
			<ProjectList
				projectList={projects}
				loading={loading}
				appearance="sidebar"
				deleteItem={deleteItem}
			/>
			<ButtonComponent
				style={{ position: 'absolute', bottom: 10 }}
				appearance="big"
				onClick={remove}
			>
				Log out
			</ButtonComponent>
			<ButtonComponent onClick={returnToMain} classname={styles.img}>
				{projectId && <img className={styles.img} src={homePicture} />}
			</ButtonComponent>
		</div>
	);
};

export default SidebarContainer;
