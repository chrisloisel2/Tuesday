import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentView: 'home',
};

export const createView = createAsyncThunk("auth/login", async (data) => {
	const response = await MyAxios.post("/auth/connexion", data);
	return response;
});


const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView: (state, action) => {
			state.currentView = action.payload;
		},
	},
});

export const { setView } = viewSlice.actions;

export default viewSlice.reducer;
