import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import projectSlice from './slices/project.slice';
import { setToLocal } from '@/utils/localStore';

export const store = configureStore({
    reducer: {
        user: userSlice,
        project: projectSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(()=>{
    setToLocal('email', store.getState().user.email);
    setToLocal('userId', store.getState().user.id);
    setToLocal('userName', store.getState().user.displayName);
});
