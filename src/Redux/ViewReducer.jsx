import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MyAxios from '../Interceptor/MyAxios';
import { SelectedView } from './BoardReducer';

export const updateViewSharing = createAsyncThunk(
	"board/updateViewSharing",
	async (data) => {
		const response = await MyAxios.put("/view/sharing/" + data._id, data);
		return response;
	}
);

export const creteView = createAsyncThunk("board/createView", async (data) => {
	const response = await MyAxios.post("/view/view", data);
	return response;
});

export const updateView = createAsyncThunk("board/updateView", async (data) => {
	const response = await MyAxios.put("/view/view/" + data._id, data);
	return response;
});

export const deleteView = createAsyncThunk("board/deleteView", async (data) => {
	const response = await MyAxios.delete("/view/view/" + data);
	return response;
});

export const getViews = createAsyncThunk("board/getViews", async (data) => {
	const response = await MyAxios.get("/board/view/" + data);
	return response;
});

export const getViewsFromBoard = createAsyncThunk("board/getViewsFromBoard", async (data) => {
	const response = await MyAxios.get("/view/board/" + data + "/view");
	return response;
});


const viewSlice = createSlice({
	name: 'view',
	initialState: {
		currentView: null,
		viewList: [],
		selectedView: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		selectedView: (state, action) => {
			state.selectedView = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(creteView.pending, (state) => {
			state.status = 'loading';
		})
			.addCase(creteView.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.viewList.push(action.payload);
			})
			.addCase(creteView.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateView.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateView.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.viewList = state.viewList.map((view) =>
					view._id === action.payload._id ? action.payload : view
				);
			})
			.addCase(updateView.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deleteView.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteView.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.viewList = state.viewList.filter((view) => view._id !== action.payload);
			})
			.addCase(deleteView.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getViews.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getViews.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.viewList = action.payload;
			})
			.addCase(getViews.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getViewsFromBoard.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getViewsFromBoard.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.viewList = action.payload;
			})
			.addCase(getViewsFromBoard.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateViewSharing.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateViewSharing.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.viewList = state.viewList.map((view) =>
					view._id === action.payload._id ? action.payload : view
				);
			})
			.addCase(updateViewSharing.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export const { selectedView } = viewSlice.actions;
export default viewSlice.reducer;
