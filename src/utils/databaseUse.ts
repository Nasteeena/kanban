import { doc, deleteDoc, setDoc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { updateProfile, getAuth } from 'firebase/auth';
import { db } from '@/firebase';
import handleAsyncError from './network/handleError';
import { nanoid } from 'nanoid';
import { ListItemProps } from '@/models/project.interface';
import { DocumentReference } from 'firebase/firestore';

const dataBaseUse = {
	deleteFromDataBase: (url: string) => {
		return handleAsyncError(async () => {
			await deleteDoc(doc(db, url));
		});
	},

	addToDatabase: (url: string, value: string, addTasks: boolean) => {
		return handleAsyncError(async () => {
			const newId = nanoid();
			const docRef = doc(db, url, newId);
			const data: ListItemProps = {
				title: value,
				id: newId,
			};

			if (addTasks) {
				data.tasks = [];
			}

			await setDoc(docRef, data);
		});
	},

	updateColumnsList: (url: string, updatedList: ListItemProps[]) => {
		return handleAsyncError(async () => {
			const collectionRef = collection(db, url);
			const querySnapshot = await getDocs(collectionRef);

			querySnapshot.docs.map((doc, index) => {
				const newData = updatedList[index];
				const updatedData = { ...newData, id: doc.id };
				setDoc(doc.ref, updatedData);
			});
		});
	},

	updateTasksList: (url: string, updatedList: ListItemProps[]) => {
		return handleAsyncError(async () => {
			const collectionRef = collection(db, url);
			const querySnapshot = await getDocs(collectionRef);

			querySnapshot.docs.map((doc, index) => {
				const newData = updatedList[index];
				setDoc(doc.ref, newData);
			});
		});
	},

	updateTitle: (url: DocumentReference<unknown, { title: string }>, title: string) => {
		return handleAsyncError(async () => {
			await updateDoc(url, {
				title,
			});
		});
	},

	updateUserName: (updatedName: string) => {
		return handleAsyncError(async () => {
			const auth = getAuth();
			if (auth.currentUser) {
				await updateProfile(auth.currentUser, {
					displayName: updatedName,
				});
			}
		});
	},

	updateTaskName: (url: string, taskId: string, title: string) => {
		return handleAsyncError(async () => {
			const docRef = doc(db, url);
			const docSnapshot = await getDoc(docRef);
			let updatedTaskList;

			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				updatedTaskList = data.tasks.map((item: ListItemProps) => {
					if (item.id === taskId)
						return {
							...item,
							title,
						};
					return item;
				});

				await updateDoc(docRef, {
					tasks: updatedTaskList,
				});
			}
		});
	},

	addTask: (url: string, title: string) => {
		return handleAsyncError(async () => {
			const docRef = doc(db, url);
			const docSnapshot = await getDoc(docRef);
			const id = nanoid();
			let updatedTaskList;

			if (docSnapshot.exists()) {
				const data = docSnapshot.data();

				updatedTaskList = [
					...data.tasks,
					{
						id,
						title,
						tags: [],
					},
				];

				await updateDoc(docRef, {
					tasks: updatedTaskList,
				});
			}
		});
	},

	deleteTask: (url: string, taskId: string) => {
		return handleAsyncError(async () => {
			const docRef = doc(db, url);
			const docSnapshot = await getDoc(docRef);
			let updatedTaskList;

			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				updatedTaskList = data.tasks.filter((item: ListItemProps) => item.id !== taskId);

				await updateDoc(docRef, {
					tasks: updatedTaskList,
				});
			}
		});
	},

	updateCardTags: (url: string, cardId: string, checkedValue: string) => {
		return handleAsyncError(async () => {
			const docRef = doc(db, url);
			const docSnapshot = await getDoc(docRef);
			let updatedTaskList;

			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				const taskToUpdate = data.tasks.find((item: ListItemProps) => item.id === cardId);

				if (!taskToUpdate.tags.includes(checkedValue)) {
					taskToUpdate.tags = [...taskToUpdate.tags, checkedValue];
					updatedTaskList = data.tasks;
				} else {
					taskToUpdate.tags = taskToUpdate.tags.filter((item: string) => item !== checkedValue);
					updatedTaskList = data.tasks;
				}

				await updateDoc(docRef, {
					tasks: updatedTaskList,
				});
			}
		});
	},

	returnTask: (url: string, taskData: ListItemProps) => {
		return handleAsyncError(async () => {
			const docRef = doc(db, url);
			const docSnapshot = await getDoc(docRef);
			let updatedTaskList;

			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				updatedTaskList = [...data.tasks, taskData];

				await updateDoc(docRef, {
					tasks: updatedTaskList,
				});
			}
		});
	},
};

export default dataBaseUse;
