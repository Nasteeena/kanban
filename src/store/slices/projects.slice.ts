import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	projects: [],
};

export const projectsSlice = createSlice({
	name: 'projectsSlice',
	initialState,
	reducers: {
		setProjectsList: (state, action) => {
			state.projects = action.payload;
		},
	},
});

export const { setProjectsList } = projectsSlice.actions;
export default projectsSlice.reducer;
