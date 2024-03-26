import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	columns: [],
};

export const columnsSlice = createSlice({
	name: 'columnsSlice',
	initialState,
	reducers: {
		setColumnsList: (state, action) => {
			state.columns = action.payload;
		},
	},
});

export const { setColumnsList } = columnsSlice.actions;
export default columnsSlice.reducer;
