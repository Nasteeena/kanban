import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import { setToLocal } from '@/utils/localStore';
import projectsSlice from './slices/projects.slice';
import columnsSlice from './slices/columns.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		projects: projectsSlice,
		columns: columnsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
	setToLocal('email', store.getState().user.email);
	setToLocal('userId', store.getState().user.id);
	setToLocal('userName', store.getState().user.displayName);
});
