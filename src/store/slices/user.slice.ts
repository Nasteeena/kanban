import { createSlice } from '@reduxjs/toolkit';
import { getFromLocal } from '@/utils/localStore';
import { userInterface } from '@/models/user.interface';
import { logIn, register, updateName } from '../services/user.service';

const initialState: userInterface = {
	email: getFromLocal('email'),
	id: getFromLocal('userId'),
	displayName: getFromLocal('userName'),
	loginErrorMessage: undefined,
	registerErrorMessage: undefined,
	nameLoading: false,
};

export const userSlice = createSlice({
	name: 'userAuth',
	initialState,
	reducers: {
		removeUser: (state) => {
			state.email = null;
			state.id = null;
			state.displayName = null;
		},

		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},

		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		},

		clearLoader: (state) => {
			state.nameLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logIn.fulfilled, (state, action) => {
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.displayName = action.payload.displayName;
		});

		builder.addCase(logIn.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.displayName = action.payload.displayName;
		});

		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});

		builder.addCase(updateName.fulfilled, (state, action) => {
			state.displayName = action.payload.userName ?? null;
		});

		builder.addCase(updateName.pending, (state) => {
			state.nameLoading = true;
		});
	},
});

export const { removeUser, clearLoginError, clearRegisterError, clearLoader } = userSlice.actions;
export default userSlice.reducer;
