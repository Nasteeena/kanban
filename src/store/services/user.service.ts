import { createAsyncThunk } from '@reduxjs/toolkit';
import dataBaseUse from '@/utils/databaseUse';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export const logIn = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		const userData = await signInWithEmailAndPassword(auth, params.email, params.password);
		const user: any = userData.user;
		await dataBaseUse.updateUserName(user.displayName);

		return {
			email: user.email,
			id: user.uid,
			displayName: user.displayName,
		};
	},
);

export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string; userName: string }) => {
		const userData = await createUserWithEmailAndPassword(auth, params.email, params.password);
		const user = userData.user;
		await dataBaseUse.updateUserName(params.userName);

		return {
			email: user.email,
			id: user.uid,
			displayName: user.displayName,
		};
	},
);

export const updateName = createAsyncThunk('user/updateName', async (updatedName: string) => {
	await dataBaseUse.updateUserName(updatedName);

	return {
		userName: auth.currentUser?.displayName,
	};
});
