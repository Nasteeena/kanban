import useAuth from '@/hooks/useAuth';
import ProjectList from '@/components/Project/ProjectList/ProjectList';
import { useState, useEffect } from 'react';
import MainHeading from '@/components/Main/MainHeading/MainHeading';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import useProjectList from '@/hooks/useProjectList';
import MainSubHeader from '@/components/Main/MainSubHeader/MainSubHeader';
import { ChangeEvent } from 'react';
import AddElementModal from '@/features/AddProject/AddProject';
import { useDispatch } from 'react-redux';
import { updateName } from '@/store/services/user.service';
import { clearLoader } from '@/store/slices/user.slice';
import { ListItemProps } from '@/models/project.interface';
import { FormEvent } from 'react';

const MainContainer = () => {
	const { id } = useAuth();
	const [inputValue, setInputValue] = useState<string>('');
	const { projects } = useProjectList();
	const [projectsList, setProjectsList] = useState<ListItemProps[]>([]);
	const { displayName, email } = useAuth();
	const displayUser = displayName ? displayName : email;
	const messageRef = collection(db, `tasks/${id}/children`);
	const [_, loading] = useCollectionData(messageRef);
	const [openAddForm, setOpenAddForm] = useState<boolean>(false);
	const [formValue, setFormValue] = useState<string>('');
	const dispatch = useDispatch();

	const openSettings = () => setOpenAddForm(true);
	const handleClose = () => setOpenAddForm(false);

	useEffect(() => {
		if (inputValue.trim().length) {
			const res = projects?.filter((item: ListItemProps) =>
				item.title.toLowerCase().includes(inputValue.toLowerCase()),
			);
			setProjectsList(res);
		} else {
			setProjectsList(projects);
		}
	}, [inputValue, projects]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

	const changeName = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(clearLoader());
		dispatch(updateName(formValue)).then(() => {
			dispatch(clearLoader());
		});
	};

	return (
		<>
			<MainHeading
				inputValue={inputValue}
				handleChange={handleChange}
				userName={displayUser}
				openSettings={openSettings}
			>
				{openAddForm && (
					<AddElementModal
						value={formValue}
						setValue={setFormValue}
						open={openAddForm}
						handleForm={changeName}
						handleClose={handleClose}
						title="Settings"
						placeHolder="Type name"
					/>
				)}
			</MainHeading>
			<MainSubHeader userName={displayName} loading={loading} projectList={projects} />
			<ProjectList projectList={projectsList} appearance="main" loading={loading} />
		</>
	);
};

export default MainContainer;
